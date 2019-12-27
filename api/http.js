import urlConfig from '@/common/config.js';

let base = (type, uri, params) => {
    return new Promise((resolve, reject) => {
        let token = {}
        if (uni.getStorageSync('token')) {
            token = uni.getStorageSync('token')
        }
        console.log("token:" + token)
        console.log("url:" + urlConfig + uri)
        uni.request({
            url: urlConfig + uri,
            method: type,
            data: params,
            dataType: 'json',
            header: {
                'Authorization': token
            },
            success: (res) => {
                console.log("success: " + res.data.data)
                if (res.data.success) {
                    resolve(res.data.data)
                } else {
                    reject(res.data.data);
                }
            },
            fail() {
                console.log("fail")
                uni.showToast({
                	title: '网络开小差了'
                });
            },
            complete() {
                console.log("complete")
                uni.stopPullDownRefresh();
            }
        })
    })
}
let g = (url, params) => {
  return base('GET', url, params)
}

let p = (url, params) => {
  return base('POST', url, params)
}

let d = (url, params) => {
  return base('DELETE', url, params)
}

let u = (url, params) => {
  return base('PUT', url, params)
}
let pa = (url, params) => {
  return base('PATCH', url, params)
}

let op = (url, params) => {
  return base('OPTIONS', url, params)
}

// 查询用户是否已登录未登录调回登录页
let getToken = () => {

    if (!uni.getStorageSync('token')) {
        uni.reLaunch({
            url: '/pages/login/login.vue'
        })
    }
}

// 封装加载框
let loading = () => {
    uni.showLoading({
        title: '加载中...',
        mask: true
    });
}

// 封装toast弹窗
let toast = (msg) => {
    uni.showToast({
        title: msg,
        icon: 'none',
        position: 'bottom',
        mask: false
    })
}

module.exports = {
    base,
    g,
    p,
    d,
    u,
    pa,
    op
}
