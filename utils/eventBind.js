import siteinfo from '../siteinfo'
const App = getApp()
module.exports = Behavior({
    methods: {
        inputChange(e) {
            this.setData({
                [e.currentTarget.dataset.tag]: e.detail.value
            })
        },
        bindChange(event) {
            console.log(event)
            this.setData({
                [event.currentTarget.dataset.tag]: event.detail.value
            })
        },
        selectChange(event) {
            this.setData({
                [event.currentTarget.dataset.tag]: this.data[event.currentTarget.dataset.range][event.detail.value].dictCd,
                [event.currentTarget.dataset.name]: this.data[event.currentTarget.dataset.range][event.detail.value].dictNm,
            })
        },
        takePictures(event) {
            let _this = this
            wx.chooseImage({
                success(res) {
                    const tempFilePaths = res.tempFilePaths
                    let rule = new Promise((resolve, reject) => {
                        if (event.currentTarget.dataset.tag === "laterPressureImgPath") {
                            _this.manometryAfter().then(res => {
                                if (res.code == 900) {
                                    wx.showModal({
                                        showCancel: false,
                                        content: res.msg
                                    })
                                    reject()
                                } else {
                                    resolve()
                                }
                            })
                        } else {
                            resolve()
                        }
                    })
                    rule.then(() => {
                        wx.uploadFile({
                            url: siteinfo.siteroot + App.UrlList.UploadImg,
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success(result) {
                                const data = JSON.parse(result.data)
                                if (data.success) {
                                    if (_this.data[event.currentTarget.dataset.tag]!=null) {
                                        const {
                                            oldImgPath
                                        } = _this.data
                                        oldImgPath.push(_this.data[event.currentTarget.dataset.tag])
                                        _this.setData({
                                            oldImgPath
                                        })
                                    }
                                    if (event.currentTarget.dataset.tag === "agoPressureImgPath") {
                                        _this.manometryBefore(data.data.path).then(res => {
                                            _this.setData({
                                                [event.currentTarget.dataset.tag]: data.data.path,
                                                [event.currentTarget.dataset.preview]: [tempFilePaths[0]]
                                            })
                                        })
                                    } else {
                                        _this.setData({
                                            [event.currentTarget.dataset.tag]: data.data.path,
                                            [event.currentTarget.dataset.preview]: [tempFilePaths[0]]
                                        })
                                    }
                                    wx.showToast({
                                        title: data.msg,
                                    })
                                } else {
                                    wx.showModal({
                                        content: '上传失败请重新上传',
                                        showCancel: false,
                                    })
                                }

                            },
                            fail(res) {
                                wx.showModal({
                                    content: '上传失败请重新上传',
                                    showCancel: false,
                                })
                            }
                        })
                    })
                }
            })
        },
        preview(event) {
            wx.previewImage({
                urls: event.currentTarget.dataset.preview, // 当前显示图片的http链接
            })
        },
        takeVideo(event) {
            let _this = this
            wx.chooseVideo({
                sourceType: ['camera'],
                maxDuration: 15,
                success(res) {
                    const tempFilePaths = res.tempFilePath
                    wx.uploadFile({
                        url: siteinfo.siteroot + App.UrlList.UploadVideo,
                        filePath: tempFilePaths,
                        name: 'layuiVideo',
                        formData: {
                            'dir': 'media'
                        },
                        success(result) {
                            const data = JSON.parse(result.data)
                            if (data.success) {
                                if (_this.data[event.currentTarget.dataset.tag]) {
                                    const {
                                        oldImgPath
                                    } = _this.data
                                    oldImgPath.push(_this.data[event.currentTarget.dataset.tag])
                                    _this.setData({
                                        oldImgPath
                                    })
                                }
                                _this.setData({
                                    [event.currentTarget.dataset.tag]: data.data.url,
                                    [event.currentTarget.dataset.preview]: tempFilePaths
                                })
                                wx.showToast({
                                    title: data.msg,
                                })
                            } else {
                                wx.showModal({
                                    content: '上传失败请重新上传',
                                    showCancel: false,
                                })
                            }
                        },
                        fail(res) {
                            wx.showModal({
                                content: '上传失败请重新上传',
                                showCancel: false,
                            })
                        }
                    })
                },

            })
        },
        manometryBefore(path) {
            return new Promise((resolve, reject) => {
                App._post(App.UrlList.ManometryBefore, {
                    agoPressureImgPath: path
                }).then((res) => {
                    resolve()
                })
            })
        },
        manometryAfter(path) {
            return new Promise((resolve, reject) => {
                App._post(App.UrlList.ManometryAfter, {
                    agoPressureImgPath: this.data.agoPressureImgPath
                }).then(res => {
                    resolve(res)
                })
            })
        },
        takeCode(event) {
            let _this = this
            console.log(event.currentTarget.dataset.tag)
            wx.scanCode({
                success(res) {
                    console.log(res)
                    if (res.result) {
                        _this.setData({
                            [event.currentTarget.dataset.tag]: res.result
                        })
                    } else {
                        wx.showModal({
                            showCancel: false,
                            content: '条码未识别成功'
                        })
                    }
                },
                fail(err) {
                    wx.showModal({
                        showCancel: false,
                        content: '条码未识别成功'
                    })
                }
            })
        },
        formRule(grop) {
            let _this = this
            return new Promise((resolve, reject) => {
                let errorNm = ''
                grop.every(item => {
                    if (_this.data[item.rule] === null || _this.data[item.rule] === undefined || _this.data[item.rule] === '') {
                        errorNm = item.title
                        return false
                    } else {
                        return true
                    }
                }) ? resolve() : wx.showToast({
                    title: errorNm + '未填写',
                    icon: 'none',
                    success() {
                        reject()
                    }
                })
            })

        },
        fileDelete(file) {
            App._post(App.UrlList.FileDelete, {
                path: file
            }).then(res => {
                wx.showToast({
                    title: '替换成功',
                })
            })
        },
        navigateBack(url) {
            const page = getCurrentPages()
            page.forEach((item, index) => {
                if (item.route == url) {
                    wx.navigateBack({
                        delta: page.length - index - 1
                    })
                }
            })
        },
        jumpOrder(orderTypes) {

            const types = typeof( orderTypes)==Array?orderTypes:orderTypes.split(',')
            const urlTag = ['', 'Check', 'Swap', 'Change', 'Debug', 'Follow']
            types.splice(0, 1)
            console.log(types)
            wx.navigateTo({
                url: `/pages/order${urlTag[this.data.orderTypes[0]]}/index?orderTypes=${types}&&id=${this.data.id}`,
            })
        }
    }
})