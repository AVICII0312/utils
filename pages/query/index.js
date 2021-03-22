const listPull = require('../../utils/listPull')
const App = getApp()
Component({
  behaviors: [listPull],
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    listUrl: App.UrlList.GroupOrderList,
    selected: 0,
    tabList: [{
      text: '组合工单'
    }, {
      text: '隐患单'
    }, {
      text: '零星工单'
    }]
  },
  observers: {
    'selected': function (selected) {
      this.setData({
        listUrl: selected === 1 ? App.UrlList.GetDoneDangerList : selected == 2 ? App.UrlList.GetDoneSporadicList : App.UrlList.GroupOrderList
      }, () => {
        if (this.data.selected == 0) {
          this.getListGet({
            listType: this.data.type
          })
        } else {
          this.getList()
        }
      })
    }
  },
  methods: {
    onLoad(options) {
      this.setData(options)

    },
    onShow() {
      let _this = this
      if (this.data.selected === 0) {
        this.setData({
          list: [],
          page: 1
        }, () => {
          this.getListGet()
        })
      } else {
        this.setData({
          list: [],
          page: 1
        }, () => {
          _this.getList()
        })
      }

    },
       //键盘搜索事件
       onConfirm(e){
        this.setData({
          list: [],
          page: 1
        }, ()=>{
          if(this.selected == 0){
            this.getListGet({meterNum:e.detail.value})
          }else {
            this.getList({meterNum:e.detail.value})
          }
        })
    },
    tabChange(e) {
      this.setData({
        selected: e.currentTarget.dataset.index,
        list: [],
        page: 1
      })
    },
    navigateTo(event) {
      wx.navigateTo({
        url: `${event.currentTarget.dataset.url}?id=${event.currentTarget.dataset.id}`,
      })
    }
  }
})