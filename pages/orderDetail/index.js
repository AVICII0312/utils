const App = getApp()
Component({
  behaviors: [],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    activeName: '1',
  },

  methods: {
    onLoad(options) {
      console.log(options)
      this.setData(options)
      this.getInfo(options.id)
    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
    getInfo() {
      let _this = this
      if (this.data.type === 'Group') {
        App._get(App.UrlList.GetGroupOrderStep, {
          id: this.data.id,
          workType: 0
        }).then(res => {
          _this.setData(res.data)
        })
      } else {
        App._post(this.data.type === 'Danger' ? App.UrlList.GetDangerInfo : App.UrlList.GetSporadicInfo, {
          id: this.data.id
        }).then(res => {
          _this.setData(res.data)
        })
      }
    },
    getOrder() {
      let _this = this
      App._post(this.data.type === 'Danger' ? App.UrlList.GetDangerOrder : this.data.type === 'Group' ? App.UrlList.GetGroupOrder : App.UrlList.GetSporadicOrder, {
        id: this.data.id
      }).then(res => {
        wx.showToast({
          title: res.msg,
          icon: "none",
          success() {
            _this.navigateTo()
          }
        })
      })
    },
    navigateTo() {
      if (this.data.type === "Group") {
        wx.redirectTo({
          url: '/pages/orderPublic/index?id=' + this.data.id,
        })
      } else {
        wx.redirectTo({
          url: '/pages/order' + this.data.type + '/index' + '?id=' + this.data.id,
        })
      }
    }
  }
})