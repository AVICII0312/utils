const App = getApp()
Component({
  behaviors: [],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    username: '',
    password: ''
  },
  methods: {
    login() {
      if (this.data.username.length <= 0) {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none'
        })
        return
      }
      if (this.data.password.length <= 0) {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none'
        })
        return
      }
      console.log(App.UrlList)
      App._post(App.UrlList.Login, {
        username: this.data.username,
        password: this.data.password
      }).then(res => {
        wx.setStorageSync('token', res.data)
        wx.reLaunch({
          url: '/pages/index/index',
        })
      })

    }
  }
})