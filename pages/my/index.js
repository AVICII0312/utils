const App = getApp()
Component({
  behaviors: [],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:App.globalData.imgUrl
  },

  methods: {
    onShow(){
      this.getUserInfo()
    },
    signOut(){
      wx.clearStorageSync()
      wx.reLaunch({
        url: '/pages/login/index',
      })
    },
    getUserInfo(){
      let _this =this
      App._get(App.UrlList.GetUserInfo).then(res=>{
        _this.setData(res.data)
      })
    }
  }
})