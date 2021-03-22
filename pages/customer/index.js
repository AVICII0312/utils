const App = getApp()
const listPull = require('../../utils/listPull')
Component({
  behaviors: [listPull],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    listUrl:App.UrlList.GetUserList
  },

  methods: {
    navigateTo(event) {
      wx.navigateTo({
        url: '/pages/addUser/index?id='+event.currentTarget.dataset.id+'&amend=true'
      })
    },
    onShow(){
      this.setData({
        page:1,
        list:[]
      })
      this.getList()
    }
    
  }
})