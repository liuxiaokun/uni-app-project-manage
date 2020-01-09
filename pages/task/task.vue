<template>
    <view>
        <ms-tabs :list="list" v-model="active"></ms-tabs>
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in taskData" :key="index">
                <view class="uni-media-list" @tap="goDetail(item.id)">
                    <image class="uni-media-list-logo" :src="nameIcon"></image>
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
import urlConfig from '@/common/config.js';
import { uniTag, uniLoadMore, uniSwipeAction, uniSwipeActionItem } from '@dcloudio/uni-ui';
import msTabs from '../../components/ms-tabs/ms-tabs.vue';
export default {
    components: {
        uniTag,
        uniLoadMore,
        uniSwipeAction,
        uniSwipeActionItem,
        msTabs
    },
    data() {
        return {
            options: [
                {
                    text: '标记为完成',
                    style: {
                        backgroundColor: '#007aff'
                    }
                }
            ],
            nameIcon: '/static/task/function.png',
            bugstatus: 'more',
            functionStatus: 'more',
            contentText: {
                contentdown: '上拉加载更多',
                contentrefresh: '加载中',
                contentnomore: '没有更多数据了'
            },
            taskData: [],
            taskPc: {
                pageIndex: 1,
                pageSize: 13
            },
            functionData:[],
            functionPc: {
                pageIndex: 1,
                pageSize: 13
            },
            bugData:[],
            bugPc: {
                pageIndex: 1,
                pageSize: 13
            },
            userData: [],
            userNameData: [],
            list: [
                {
                    title: '需求'
                },
                {
                    title: '缺陷'
                },
                {
                    title: '商务'
                },
                {
                    title: '其他'
                }
            ],
            active: 0
        };
    },
    onLoad(option) {
        this.loadFunction(1, false)
        this.loadBug(1, false)
    },
    
    onReady() {
      this.taskData = this.functionData  
    },
    onReachBottom() {
        console.log('onReachBottom...');
        uni.showNavigationBarLoading();
        this.loadMore(this.pc.pageIndex + 1);
    },
    onPullDownRefresh() {
        this.loadTask(1, false);
    },
    watch: {
        active(newValue, oldValue) {
            console.log('active', newValue, oldValue);
            if (newValue === 0) {
                this.taskData = this.functionData;
                this.nameIcon = '/static/task/function.png';
                this.status = this.functionStatus
            } else if (newValue === 1) {
                this.taskData = this.bugData;
                this.nameIcon = '/static/task/bug.png';
                this.status = this.bugstatus
            } else {
                this.taskData = [];
            }
        }
    },
    methods: {
        loadTask(pageIndex, loadMore) {
            console.log(this.active);
            if (this.active === 0) {
                this.loadFunction(pageIndex, loadMore);
            } else if (this.active === 1) {
                this.loadBug(pageIndex, loadMore);
            } else {
                this.taskData = [];
            }
            uni.stopPullDownRefresh();
        },
        onClick(e) {
            console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text);
        },
        change(open) {
            console.log('当前开启状态：' + open);
        },
        goDetail(id) {
            if (this.active === 0) {
                uni.navigateTo({
                    url: '/pages/function/detail/detail?id=' + id
                });
            } else if (this.active === 1) {
                uni.navigateTo({
                    url: '/pages/bug/detail/detail?id=' + id
                });
            }
        },

        loadFunction(pageIndex, loadMore) {
            console.log('load function ...， pageIndex:' + pageIndex);
            uni.request({
                method: 'GET',
                url: urlConfig + 'function',
                header: {
                    Authorization: uni.getStorageSync('token')
                },
                data: {
                    scs: 'created_date(desc)',
                    s: this.functionPc.pageSize,
                    p: pageIndex,
                    onlyMe: true
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    if(loadMore) {
                        this.functionData = this.functionData.concat(dataObj.data);
                    } else {
                        this.functionData = dataObj.data;
                    }
                    this.functionPc = dataObj.pc;

                    if (this.functionPc.total === 0 || this.functionPc.total <= this.functionData.length) {
                        this.functionStatus = 'noMore';
                    }
                },
                complete() {
                    uni.stopPullDownRefresh();
                    uni.hideNavigationBarLoading();
                }
            });
        },

        loadBug(pageIndex, loadMore) {
            console.log('load bug...，pageIndex:' + pageIndex);
            uni.request({
                method: 'GET',
                url: urlConfig + 'bug',
                header: {
                    Authorization: uni.getStorageSync('token')
                },
                data: {
                    scs: 'created_date(desc)',
                    s: this.bugPc.pageSize,
                    p: pageIndex,
                    onlyMe: true
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    
                    if(loadMore) {
                        this.bugData = this.bugData.concat(dataObj.data);
                    } else {
                        this.bugData = dataObj.data;
                    }
                    this.bugPc = dataObj.pc;

                    if (this.bugPc.total === 0 || this.bugPc.total <= this.bugData.length) {
                        this.bugstatus = 'noMore';
                    }
                },
                complete() {
                    uni.stopPullDownRefresh();
                }
            });
        },

        loadMore(pageIndex) {
            console.log('before total:' + this.pc.total + '~length:' + this.taskData.length);
            if (this.pc.total <= this.taskData.length) {
                this.status = 'noMore';
                uni.hideNavigationBarLoading();
                return;
            }
            this.status = 'loading';
            this.loadTask(pageIndex, true)
            /* uni.request({
                method: 'GET',
                url: urlConfig + 'function',
                data: {
                    scs: 'created_date(desc)',
                    s: this.pc.pageSize,
                    p: pageIndex,
                    onlyMe: true
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    this.taskData = this.taskData.concat(dataObj.data);
                    this.pc = dataObj.pc;

                    console.log('after total:' + this.pc.total + '~length:' + this.taskData.length);
                    if (this.pc.total <= this.taskData.length) {
                        this.status = 'noMore';
                    }
                    uni.hideNavigationBarLoading();
                }
            }); */
        }
    }
};
</script>
<style></style>
