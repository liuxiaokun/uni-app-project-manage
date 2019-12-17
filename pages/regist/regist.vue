<template>
    <view class="content">
        <view><input class="uni-input" placeholder="名字" confirm-type="next" v-model="name" /></view>
        <view class="line"></view>
        <view><input type="number" class="uni-input" placeholder="手机号" maxlength="11" confirm-type="next" v-model="mobile" /></view>
        <view class="line"></view>
        <view><input password="true" class="uni-input" placeholder="密码" confirm-type="next" v-model="password" /></view>
        <view class="line"></view>
        <view><input password="true" class="uni-input" placeholder="重复密码" confirm-type="done" v-model="repeatPassword" /></view>
        <view class="line"></view>
        <button class=".regist" type="primary" @click="regist">立即注册</button>
    </view>
</template>

<script>
import urlConfig from '@/common/config.js';
export default {
    data() {
        return {
            name: '',
            mobile: '',
            password: '',
            repeatPassword: ''
        };
    },
    methods: {
        regist() {
            if ('' === this.mobile || this.mobile.length !== 11) {
                uni.showToast({
                    title: '非法的手机号',
                    duration: 1000
                });
                return;
            }

            if ('' === this.password) {
                uni.showToast({
                    title: '密码不能为空',
                    duration: 1000
                });
                return;
            }

            if (this.password !== this.repeatPassword) {
                uni.showToast({
                    title: '两次密码不一致',
                    duration: 1000
                });
                return;
            }

            uni.request({
                url: urlConfig + 'register',
                method: 'POST',
                data: {
                    name: this.name,
                    mobile: this.mobile,
                    password: this.password
                },
                success: res => {
                    if (res.data.success) {
                        uni.showToast({
                            title: '注册成功',
                            duration: 1000
                        });
                        setTimeout(function() {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1000);

                        
                    } else {
                        uni.showToast({
                            title: res.data.message,
                            duration: 1000
                        });
                    }
                },
                fail: () => {
                    uni.showToast({
                        title: '注册失败',
                        duration: 1000
                    });
                }
            });
        }
    }
};
</script>

<style>
.uni-input {
    margin-left: 15px;
    margin-right: 15px;
    height: 40px;
    line-height: 10px;
    border: none;
    color: #333333;
    font-size: 18px;
}

.line {
    margin-left: 15px;
    height: 1px;
    background-color: #e8eaec;
    line-height: 1px;
    clear: both;
    display: block;
    overflow: hidden;
}

.regist {
    height: 50px;
    font-size: 18px;
    font-family: '微软雅黑';
    font-weight: bold;
    line-height: 50px;
    border-radius: 8px;
    color: #ffffff;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
    background: #05be01;
}
</style>
