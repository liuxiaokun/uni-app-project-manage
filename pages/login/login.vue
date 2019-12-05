<template>
	<view class="content">
		<view><input type="number" class="uni-input" placeholder="请输入手机号" maxlength="11" confirm-type="next" v-model="mobile" /></view>
		<view><input password="true" class="uni-input" placeholder="请输入密码" confirm-type="done" v-model="password" /></view>
		<button class=".button" type="primary" @click="login">登录</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '18521599183',
			password: '123456'
		};
	},
	methods: {
		login() {
			console.log(this.mobile);
			console.log(this.password);

			uni.request({
				url: 'http://192.168.2.246:3333/login',
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
					}
					let token = res.header.Authorization;
					console.log('token:' + token);
					uni.setStorageSync('token', token);
					uni.reLaunch({
						url: '/pages/index/index'
					});
				},
				fail: () => {
					console.log('fail');
					uni.showToast({
						title: '登陆失败',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style>
.uni-input {
	width: 100%;
	margin-left: 3px;
	margin-right: 3px;
	height: 50px;
	line-height: 16px;
	border-bottom: 1px #2c405a;
	color: #333333;
	font-size: 18px;
	background-color: #efefef;
}
.content {
	width: 100%;
	height: 100%;
	margin-top: 50%;
	text-align: left;
}

.button {
	height: 50px;
	width: 100%;
	font-size: 18px;
	font-family: '微软雅黑';
	font-weight: bold;
	line-height: 50px;
	border-radius: 5px;
	color: #ffffff;
	background-color: #37b4ca;
}
</style>
