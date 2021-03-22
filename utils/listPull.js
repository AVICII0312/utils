import {
    _post,
    _get
} from './request'
module.exports = Behavior({
    created() {
        wx.stopPullDownRefresh()
        this.setData({
            list: [],
            page: 1,
            pageSize: 10,
            isPage: true,
        })
    },
    methods: {
        listPull() {
            let _this = this
            return new Promise((resolve, reject) => {
                if ((_this.data.page * _this.data.pageSize) >= _this.data.total) {
                    _this.setData({
                        no_more: true,
                        isPage: false
                    })
                    reject()
                } else {
                    _this.setData({
                        page: ++_this.data.page,
                        isPage: true
                    })
                    resolve()
                }
            })
        },
        getList(data) {
            let _this = this
            return new Promise((resolve, reject) => {
                _post(this.data.listUrl, {
                    ...data,
                    limit: _this.data.pageSize,
                    page: _this.data.page,
                }).then(res => {
                    if (res.count == 0) {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                    } else {
                        let dataList = _this.data.list
                        let resList = res.data
                        if (_this.data.isPage) {
                            _this.setData({
                                list: dataList.concat(resList),
                                total: res.count
                            })
                        } else {
                            _this.setData({
                                list: resList,
                                total: res.count
                            })
                        }
                    }
                    resolve()
                })
            })
        },
        onReachBottom() {
            let _this = this
            this.listPull(this.data).then(res => {
                _this.getList()
            })
        },
        getListGet(data) {
            let _this = this
            return new Promise((resolve, reject) => {
                _get(this.data.listUrl, {
                    ...data,
                    limit: _this.data.pageSize,
                    page: _this.data.page,
                }).then(res => {
                    let dataList = _this.data.list
                    let resList = res.data
                    if (_this.data.isPage) {
                        _this.setData({
                            list: dataList.concat(resList),
                            total: res.count
                        })
                    } else {
                        _this.setData({
                            list: resList,
                            total: res.count
                        })
                    }
                    resolve()
                })
            })
        }
    }
})