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
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
  }
})