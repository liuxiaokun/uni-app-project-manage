<template>
	<view>
		<uni-list>
			<uni-list-item title="所属项目" :note="functionData.projectName"></uni-list-item>
			<uni-list-item title="需求名称" :note="functionData.name"></uni-list-item>
			<uni-list-item title="详细描述" :note="functionData.desc"></uni-list-item>
			<uni-list-item title="当前状态" :note="functionData.currentStateName"></uni-list-item>
			<uni-list-item title="处理人" :note="functionData.currentHandlePerson"></uni-list-item>
			<uni-list-item title="创建时间" :note="functionData.createdDate"></uni-list-item>
			<uni-list-item title="最后修改时间" :note="functionData.modifiedDate"></uni-list-item>
			<uni-list-item title="创建人" :note="functionData.createdName"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			functionId: 0,
			functionData: {}
		};
	},
	onLoad(option) {
		this.functionId = option.id;
		this.loadFunction(option.id);
	},
	onPullDownRefresh() {
		this.loadFunction(this.functionId);
		console.log('load finish');
		uni.stopPullDownRefresh();
	},
	methods: {
		loadFunction(id) {
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/function/' + id,
				dataType: 'JSON',
				success: res => {
					console.log("success")
					let dataObj = JSON.parse(res.data);
					this.functionData = dataObj.data;
				}
			});
		}
	}
};
</script>

<style></style>
