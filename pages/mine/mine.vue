<template>
	<view>
		<view style="text-align:center;"><image src="../../static/default_avatar.png" class="avatar"></image></view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">姓名</view>
			<view class="val">{{ user.name }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">工号</view>
			<view class="val">{{ user.serialNumber }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">岗位</view>
			<view class="val">{{ user.position }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">手机号</view>
			<view class="val" @tap="setClipboard">{{ user.mobile }}</view>
		</view>

		<view class="uni-list-cell">
			<view class="uni-list-cell-left">邮箱</view>
			<view class="val">{{ user.email }}</view>
		</view>

		<button type="primary" class="quit" @click="quit()">退出登录</button>
	</view>
</template>

<script>
import urlConfig from '@/common/config.js';
export default {
	data() {
		return {
			user: {}
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
			console.log('loadUser');
			uni.request({
				url: urlConfig + 'user/info',
				method: 'GET',
				header: {
					Authorization: uni.getStorageSync('token')
				},
				data: {},
				success: res => {
					console.log(res.data);
					if (res.data.success) {
						console.log(res.data.data);
						let nickName = res.data.data.name;
						this.user = res.data.data;
					}
				},
				complete() {
					uni.stopPullDownRefresh();
				}
			});
		},

		setClipboard() {
			console.log("clipboard ...");
			uni.setClipboardData({
				data: this.user.mobile,
				success: () => {
					console.log('success');
					uni.showToast({
					    title: '已复制',
					    duration: 1000
					});
				}
			});
		},
		quit() {
			uni.showModal({
				title: '操作确认',
				content: '您确定要退出登录吗？',
				success: res => {
					if (res.confirm) {
						console.debug('用户点击确定');
						uni.clearStorageSync();
						uni.reLaunch({
							url: '/pages/login/login'
						});
					} else if (res.cancel) {
						console.debug('用户点击取消');
					}
				}
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

.quit {
	margin-top: 20px;
	margin-left: 15px;
	margin-right: 15px;
}

.avatar {
	width: 80px;
	height: 80px;
	margin-top: 20px;
	margin-bottom: 10px;
}
</style>
