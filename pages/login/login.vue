<template>
	<view class="content">
		<view><input type="number" class="uni-input" placeholder="手机号" maxlength="11" confirm-type="next" v-model="mobile" /></view>
		<view class="line"></view>
		<view><input password="true" class="uni-input" placeholder="密码" confirm-type="done" v-model="password" /></view>
		<view class="line"></view>
		<button class=".button" type="primary" @click="login">确认登录</button>
		<!-- <button class=".wxButton" @click="login">微信登录</button> -->
	</view>
</template>

<script>
import urlConfig from '@/common/config.js';

export default {
	data() {
		return {
			mobile: '',
			password: ''
		};
	},
	methods: {
		login() {
			if (this.mobile.length !== 11) {
				uni.showToast({
					title: '手机号位数不对'
				});
				return;
			}
			if (this.password.length < 1) {
				uni.showToast({
					title: '密码不能为空'
				});
				return;
			}
			console.log('url:' + urlConfig + 'login');
			uni.request({
				url: urlConfig + 'login',
				method: 'POST',
				data: {
					mobile: this.mobile,
					password: this.password
				},
				success: res => {
					if (res.data.success) {
						uni.showToast({
							title: '登陆成功',
							duration: 1000
						});
						let token = res.header.Authorization;
						console.log('token:' + token);
						uni.setStorageSync('token', token);
						uni.reLaunch({
							url: '/pages/index/index'
						});
					} else {
						uni.showToast({
							title: '密码错误',
							duration: 2000
						});
					}
				},
				fail: () => {
					console.log('fail');
					uni.showToast({
						title: '网络开小差了'
					});
				}
			});
		}
	}
};
</script>

<style>
.uni-input {
	margin-left: 15px;
	margin-right: 15px;
	height: 40px;
	line-height: 10px;
	border: none;
	color: #333333;
	font-size: 18px;
}

.line {
	margin-left: 15px;
	height: 1px;
	background-color: #e8eaec;
	line-height: 1px;
	clear: both;
	display: block;
	overflow: hidden;
}
.content {
	width: 100%;
	height: 100%;
	margin-top: 50%;
	text-align: left;
}

.button {
	height: 50px;
	font-size: 18px;
	font-family: '微软雅黑';
	font-weight: bold;
	line-height: 50px;
	border-radius: 8px;
	color: #ffffff;
	margin-top: 100px;
	margin-left: 15px;
	margin-right: 15px;
}

.wxButton {
	height: 50px;
	font-size: 18px;
	font-family: '微软雅黑';
	font-weight: bold;
	line-height: 50px;
	border-radius: 8px;
	color: #ffffff;
	margin-top: 10px;
	margin-left: 15px;
	margin-right: 15px;
	background: #05be01;
}
</style>
