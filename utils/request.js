import siteinfo from '../siteinfo'
let loginUrl = 'api-user/wxapi/user/executeWX'
// 请求封装
function request(url, method, data, header) {
    wx.showNavigationBarLoading();
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    // 未登录拦截
    if (wx.getStorageSync('token') || url == loginUrl) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: siteinfo.siteroot + url,
                method: method,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "Authorization": wx.getStorageSync('token') || ''
                },
                data: data,
                success(res) {
                    if (res.data.success) {
                        resolve(res.data)
                    } else {
                        wx.showModal({
                            content: res.data.msg,
                            showCancel: false
                        })
                        
                        return
                    }
                },
                fail(_error) {
                    // 请求直接报错
                    console.log(_error)
                    wx.showToast({
                        icon: 'none',
                        title: '网络故障',
                        duration: 2000
                    })
                },
                complete(res) {
                    wx.hideLoading()
                    wx.hideNavigationBarLoading();
                }
            })
        })
    } else {
        wx.reLaunch({
            url: '/pages/login/index'
        })
    }
}
export function _get(url, data = {}) {
    return request(url, 'GET', data)
}
export function _post(url, data = {}) {
    return request(url, 'POST', data)
}