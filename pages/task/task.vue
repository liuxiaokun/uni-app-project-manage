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
            status: 'more',
            contentText: {
                contentdown: '上拉加载更多',
                contentrefresh: '加载中',
                contentnomore: '没有更多数据了'
            },
            pc: {
                pageIndex: 1,
                pageSize: 13
            },
            taskData: [],
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
        this.loadTask();
    },
    onReachBottom() {
        console.log('onReachBottom...');
        uni.showNavigationBarLoading();
        this.loadMore(this.pc.pageIndex + 1);
    },
    onPullDownRefresh() {
        this.loadTask();
    },
    watch: {
        active(newValue, oldValue) {
            console.log('active', newValue, oldValue);
            if (newValue === 0) {
                this.nameIcon = '/static/task/function.png';
                this.loadFunction();
            } else if (newValue === 1) {
                this.nameIcon = '/static/task/bug.png';
                this.loadBug();
            } else {
                this.taskData = [];
            }
        }
    },
    methods: {
        loadTask() {
            console.log(this.active);
            if (this.active === 0) {
                this.loadFunction();
            } else if (this.active === 1) {
                this.loadBug();
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

        loadFunction() {
            console.log('load function ...');
            uni.request({
                method: 'GET',
                url: urlConfig + 'function',
                header: {
                    Authorization: uni.getStorageSync('token')
                },
                data: {
                    scs: 'created_date(desc)',
                    s: this.pc.pageSize,
                    p: this.pc.pageIndex,
                    onlyMe: true
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    this.taskData = dataObj.data;
                    this.pc = dataObj.pc;

                    if (this.pc.total === 0) {
                        this.status = 'noMore';
                    }
                },
                complete() {
                    uni.stopPullDownRefresh();
                }
            });
        },

        loadBug() {
            console.log('load bug...');
            uni.request({
                method: 'GET',
                url: urlConfig + 'bug',
                header: {
                    Authorization: uni.getStorageSync('token')
                },
                data: {
                    scs: 'created_date(desc)',
                    s: this.pc.pageSize,
                    p: this.pc.pageIndex,
                    onlyMe: true
                },
                dataType: 'JSON',
                success: res => {
                    let dataObj = JSON.parse(res.data);
                    this.taskData = dataObj.data;
                    this.pc = dataObj.pc;

                    if (this.pc.total === 0) {
                        this.status = 'noMore';
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
            uni.request({
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
            });
        }
    }
};
</script>
<style></style>
