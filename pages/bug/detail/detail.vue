<template>
    <view>
        <uni-list>
            <uni-list-item title="所属需求" :note="bugData.functionName"></uni-list-item>
            <uni-list-item title="缺陷名称" :note="bugData.name"></uni-list-item>
            <uni-list-item title="详细描述" :note="bugData.desc"></uni-list-item>
            <uni-list-item title="当前状态" :note="bugData.currentStateName"></uni-list-item>
            <uni-list-item title="处理人" :note="bugData.currentHandlePerson"></uni-list-item>
            <uni-list-item title="责任人" :note="bugData.ownerName"></uni-list-item>
            <uni-list-item title="创建时间" :note="bugData.createdDate"></uni-list-item>
            <uni-list-item title="最后修改时间" :note="bugData.modifiedDate"></uni-list-item>
            <uni-list-item title="创建人" :note="bugData.createdName"></uni-list-item>
        </uni-list>
        <view class="operate">
            <progress :percent="bugData.completePercent" show-info stroke-width="20" active="true" activeColor="#19be6b" />
            <button :disabled="disabled" type="primary" style="width: 100%; margin-top: 20px;" @tap="markState">{{ buttonName }}</button>
        </view>
    </view>
</template>

<script>
import urlConfig from '@/common/config.js';
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
    components: {
    	uniList,
    	uniListItem
    },
    data() {
        return {
            disabled: false,
            bugId: 0,
            bugData: {},
            userData: [],
            userNameData: [],
            nextBugState: {},
            buttonName: '标记为 '
        };
    },

    onLoad(option) {
        this.bugId = option.id;
        this.loadBug(option.id);
        this.loadUser();
    },
    onPullDownRefresh() {
        this.loadBug(this.bugId);
        console.log('load finish');
    },
    methods: {
        loadBug(id) {
            uni.request({
                method: 'GET',
                url: urlConfig + 'bug/' + id,
                dataType: 'JSON',
                success: res => {
                    console.log('success');
                    let dataObj = JSON.parse(res.data);
                    this.bugData = dataObj.data;
                    this.loadBugNextState(dataObj.data.currentStateId);
                },
                complete() {
                    uni.stopPullDownRefresh();
                }
            });
        },

        loadBugNextState(currentStateId) {
        	uni.request({
        		method: 'GET',
        		url: urlConfig + 'bug/state/next/' + currentStateId,
        		dataType: 'JSON',
        		success: res => {
        			console.log('loadBugNextState success' + res.data);
        			let dataObj = JSON.parse(res.data);
        			if (dataObj.success) {
        				if (dataObj.data.id === null || dataObj.data.id === undefined) {
        						this.buttonName = '已完成'
        						this.disabled = true
        				} else {
        					this.nextBugState = dataObj.data
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
                    scs: 'created_date(desc)'
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    this.userData = dataObj.data;
                    this.userNameData = this.userData.map(item => {
                        return item.name;
                    });
                    console.log(this.userNameData);
                }
            });
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
        							url: urlConfig + 'bug/' + this.bugData.id,
        							method: 'POST',
        							data: {
        								id: this.bugData.id,
        								currentStateId: this.nextBugState.id,
        								currentStateName: this.nextBugState.name,
        								owner: this.userData[res.tapIndex].id
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

<style></style>
