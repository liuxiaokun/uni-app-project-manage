<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in functionData" :key="index">
				<view class="uni-media-list">
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
			projectId:0,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			pc: {
				pageIndex: 1,
				pageSize: 20
			},
			functionData: []
		};
	},
	onLoad(option) {
		this.projectId = option.id
		this.loadFunction(option.id);
		uni.setNavigationBarTitle({
			title: option.title
		});
	},
	onPullDownRefresh() {
		this.loadFunction(this.projectId)
		uni.stopPullDownRefresh();
	},
	methods: {
		loadFunction(projectId) {
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/function?s=' + this.pc.pageSize + '&p=' + this.pc.pageIndex + '&projectId=' + projectId,
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.functionData = dataObj.data;
					this.pc = dataObj.pc;
				}
			});
		}
	}
};
</script>
<style>
</style>
