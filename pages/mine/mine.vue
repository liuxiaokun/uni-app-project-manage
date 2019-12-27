<template>
    <view>
        <view style="text-align:center;"><image src="../../static/default_avatar.png" class="avatar"></image></view>
        <view class="uni-list-cell">
            <view class="uni-list-cell-left">姓名</view>
            <view class="val">{{ user.name }}</view>
        </view>

        <view class="uni-list-cell">
            <view class="uni-list-cell-left">工号</view>
            <view class="val" @longpress="toAudio">{{ user.serialNumber }}</view>
        </view>

        <view class="uni-list-cell">
            <view class="uni-list-cell-left">岗位</view>
            <view class="val" @longpress="toDataReport">{{ user.position }}</view>
        </view>

        <view class="uni-list-cell">
            <view class="uni-list-cell-left">手机号</view>
            <view class="val" @tap="setClipboard">{{ user.mobile }}</view>
        </view>

        <view class="uni-list-cell">
            <view class="uni-list-cell-left">邮箱</view>
            <view class="val" @longpress="toVideo">{{ user.email }}</view>
        </view>

        <button type="primary" class="quit" @click="quit()">退出登录</button>
    </view>
</template>

<script>
import getUserInfo from '@/api/user.js';

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
            console.log('loadUser...');

            getUserInfo()
                .then(res => {
                    let nickName = res.name;
                    this.user = res;
                })
                .catch(error => {
                    console.log('catch');
                });
        },

        setClipboard() {
            console.log('clipboard ...');
            uni.vibrateShort({
                success: function() {
                    console.log('vibrate success');
                }
            });
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

        toDataReport() {
            uni.navigateTo({
                url: '/pages/dataReport/dataReport',
                animationType: 'slide-in-top',
                animationDuration: 400
            });
        },

        toAudio() {
            uni.navigateTo({
                url: '/pages/audio/audio',
                animationType: 'zoom-fade-out',
                animationDuration: 400
            });
        },

        toVideo() {
            uni.navigateTo({
                url: '/pages/video/video',
                animationType: 'slide-in-bottom',
                animationDuration: 400
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
