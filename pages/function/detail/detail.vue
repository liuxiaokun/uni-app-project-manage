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
		<view class="operate">
			<progress :percent="functionData.completePercent" show-info stroke-width="20" active="true" activeColor="#19be6b" />
			<button :disabled="disabled" type="primary" style="width: 100%; margin-top: 20px;" @tap="markState">{{ buttonName }}</button>
		</view>
	</view>
</template>

<script>
import urlConfig from '@/common/config.js'
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			disabled: false,
			functionId: 0,
			functionData: {},
			userData:[],
			userNameData:[],
			nextFunctionState:{},
			buttonName:'标记为 '
		};
	},
	onLoad(option) {
		this.functionId = option.id;
		this.loadFunction(option.id);
		this.loadUser();
	},
	onPullDownRefresh() {
		this.loadFunction(this.functionId);
		console.log('load finish');
	},
	methods: {
		loadFunction(id) {
			uni.request({
				method: 'GET',
				url: urlConfig + 'function/' + id,
				dataType: 'JSON',
				success: res => {
					console.log('success');
					let dataObj = JSON.parse(res.data);
					this.functionData = dataObj.data;
					this.loadFunctionNextState(dataObj.data.currentStateId);
				},
				complete() {
					uni.stopPullDownRefresh();
				}
			});
		},
		loadFunctionNextState(currentStateId) {
			uni.request({
				method: 'GET',
				url: urlConfig + 'function/state/next/' + currentStateId,
				dataType: 'JSON',
				success: res => {
					console.log('loadFunctionNextState success' + res.data);
					let dataObj = JSON.parse(res.data);
					if (dataObj.success) {
						if (dataObj.data.id === null || dataObj.data.id === undefined) {
								this.buttonName = '已完成'
								this.disabled = true
						} else {
							this.nextFunctionState = dataObj.data
							this.buttonName = '标记为 ' + dataObj.data.name
						}
					}
				}
			});
		},
		loadUser() {
			uni.request({
				method: 'GET',
				url: urlConfig + 'user',
				header: {
					Authorization: uni.getStorageSync('token')
				},
				data: {
					scs: 'created_date(desc)',
				},
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.userData = dataObj.data;
					this.userNameData = this.userData.map(item => {
					    return item.name;
					})
					console.log(this.userNameData)
				}
			})
		},

		markState() {
			uni.showActionSheet({
			    itemList: this.userNameData,
			    success: res => {
					console.log('choose:' + this.userNameData[res.tapIndex]);
					uni.showModal({
					    title: '确认指派?',
					    content: '您将把任务指派给 ' + this.userNameData[res.tapIndex] + '?',
					    success: resp => {
					        if (resp.confirm) {
					            console.log('用户点击确定');
								uni.request({
									url: urlConfig + 'function/' + this.functionData.id,
									method: 'POST',
									data: {
										id: this.functionData.id,
										current_state_id: this.nextFunctionState.id,
										current_state_name: this.nextFunctionState.name,
										assigner: this.userData[res.tapIndex].id
									},
									header: {
										Authorization: uni.getStorageSync('token')
									},
									success: response => {
										console.log("mark success");
										uni.showToast({
										    title: '操作成功',
										    duration: 1000
										});
										this.disabled = true
									},
									fail: () => {},
								});
					        } else if (resp.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
			    },
			    fail: res => {
			        console.log(res.errMsg);
			    },
			});
		}
	}
};
</script>

<style>
.operate {
	display: flex;
	margin: 22upx;
	flex-direction: column;
}
</style>
