const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    iconShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight:App.globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBack(){
      wx.navigateBack()
    }
  }
})
