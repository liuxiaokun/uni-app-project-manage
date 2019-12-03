<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in functionData" :key="index">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.img"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.name }}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{ item.createdDate }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pc: {
				pageIndex: 1,
				pageSize: 20
			},
			functionData: []
		};
	},
	onLoad(option) {
		console.log(option.id);
		this.loadFunction(option.id);
	},
	methods: {
		loadFunction(projectId) {
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/function?s=' + this.pc.pageSize + '&p=' + this.pc.pageIndex + '&projectId=' + projectId,
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					console.log(dataObj)
					this.functionData = dataObj.data;
					this.pc = dataObj.pc;
				}
			});
		}
	}
};
</script>

<style></style>
