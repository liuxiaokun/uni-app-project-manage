<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in functionData" :key="index">
				<view class="uni-media-list" @tap="goFunctionDetail(item.id)">
					<image class="uni-media-list-logo" :src="functionIcon"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top uni-ellipsis">{{ item.name }}</view>
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
import urlConfig from '@/common/config.js'
import { uniTag, uniLoadMore } from '@dcloudio/uni-ui';
export default {
	components: {
		uniTag,
		uniLoadMore
	},
	data() {
		return {
			functionIcon: '/static/task/function.png',
			projectId: '',
			navTitle:'',
			onlyMe: true,
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
		this.projectId = option.id ? option.id : '';
		this.onlyMe = option.onlyMe ? option.onlyMe : true
		this.navTitle = option.title ? option.title : '需求列表'
		this.loadFunction(this.projectId);
		uni.setNavigationBarTitle({
			title: this.navTitle
		});
	},
	onReachBottom() {
		console.log('onReachBottom...');
		uni.showNavigationBarLoading();
		this.loadMore(this.projectId, this.pc.pageIndex + 1);
	},
	onPullDownRefresh() {
		this.loadFunction(this.projectId);
		uni.stopPullDownRefresh();
	},
	methods: {
		goFunctionDetail(functionId) {
			uni.navigateTo({
			    url: '/pages/function/detail/detail?id=' + functionId,
			});
		},
		loadFunction(projectId) {
			uni.request({
				method: 'GET',
				url: urlConfig + 'function',
				header:{
					"Authorization": uni.getStorageSync('token')
				},
				data:{
					projectId:projectId,
					scs:'created_date(desc)',
					s:this.pc.pageSize,
					p:this.pc.pageIndex,
					onlyMe: this.onlyMe
				},
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.functionData = dataObj.data;
					this.pc = dataObj.pc;
				}
			});
		},

		loadMore(projectId, pageIndex) {
			console.log('before total:' + this.pc.total + '~length:' + this.functionData.length);
			if (this.pc.total <= this.functionData.length) {
				this.status = 'noMore';
				uni.hideNavigationBarLoading();
				return;
			}
			this.status = 'loading';
			uni.request({
				method: 'GET',
				url: urlConfig + 'function',
				data:{
					projectId:projectId,
					scs:'created_date(desc)',
					s:this.pc.pageSize,
					p:pageIndex
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
