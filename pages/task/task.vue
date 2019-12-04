<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in functionData" :key="index">
				<view class="uni-media-list" @tap="goFunctionDetail(item.id)">
					<image class="uni-media-list-logo" :src="functionIcon"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.name }}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{ item.createdDate }}</view>
					</view>
					<uni-tag :text="item.currentStateName" type="default"></uni-tag>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :size="16" :content-text="contentText" />
	</view>
</template>

<script>
import { uniTag, uniLoadMore } from '@dcloudio/uni-ui';
export default {
	components: {
		uniTag,
		uniLoadMore
	},
	data() {
		return {
			functionIcon: '../../static/function.png',
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多需求',
				contentrefresh: '加载中',
				contentnomore: '没有更多需求了'
			},
			pc: {
				pageIndex: 1,
				pageSize: 13
			},
			functionData: []
		};
	},
	onLoad(option) {
		this.loadFunction();
	},
	onReachBottom() {
		console.log('onReachBottom...');
		uni.showNavigationBarLoading();
		this.loadMore(this.pc.pageIndex + 1);
	},
	onPullDownRefresh() {
		this.loadFunction();
		uni.stopPullDownRefresh();
	},
	methods: {
		goFunctionDetail(functionId) {
			uni.navigateTo({
			    url: '/pages/function/detail/detail?id=' + functionId,
			});
		},
		loadFunction() {
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/function',
				header:{
					"Authorization": uni.getStorageSync('token')
				},
				data:{
					scs:'created_date(desc)',
					s:this.pc.pageSize,
					p:this.pc.pageIndex,
					onlyMe: true
				},
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.functionData = dataObj.data;
					this.pc = dataObj.pc;
				}
			});
		},

		loadMore(pageIndex) {
			console.log('before total:' + this.pc.total + '~length:' + this.functionData.length);
			if (this.pc.total <= this.functionData.length) {
				this.status = 'noMore';
				uni.hideNavigationBarLoading();
				return;
			}
			this.status = 'loading';
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/function',
				data:{
					scs:'created_date(desc)',
					s:this.pc.pageSize,
					p:pageIndex,
					onlyMe: true
				},
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.functionData = this.functionData.concat(dataObj.data);
					this.pc = dataObj.pc;

					console.log('after total:' + this.pc.total + '~length:' + this.functionData.length);
					if (this.pc.total <= this.functionData.length) {
						this.status = 'noMore';
					}
					uni.hideNavigationBarLoading();
				}
			});
		}
	}
};
</script>
<style></style>
