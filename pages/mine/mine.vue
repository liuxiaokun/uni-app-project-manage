<template>
	<view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">姓名</view>
			<view class="val">{{ user.name }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">工号</view>
			<view class="val">{{ user.serialNumber }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">手机号</view>
			<view class="val">{{ user.mobile }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">邮箱</view>
			<view class="val">{{ user.email }}</view>
		</view>
	</view>
</template>

<script>
import urlConfig from '@/common/config.js';
export default {
	data() {
		return {
			user:{}
		};
	},
	onLoad() {
		this.loadUser();
	},
	onPullDownRefresh() {
		this.loadUser();
	},
	methods: {
		loadUser() {
			console.log('loadUser')
			uni.request({
				url: urlConfig + 'user/info',
				method: 'GET',
				header: {
					Authorization: uni.getStorageSync('token')
				},
				data: {},
				success: res => {
					console.log(res.data)
					if (res.data.success) {
						console.log(res.data.data)
						let nickName = res.data.data.name;
						this.user = res.data.data
					}
				},
				complete() {
					uni.stopPullDownRefresh();
				}
			});
		},
		quit() {
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style>
.uni-list-cell {
	height: 50px;
}

.uni-list-cell-left {
	color: #17233d;
	font-size: 32upx;
}

.val {
	padding-right: 15px;
	font-size: 32upx;
	color: #808695;
}
</style>
