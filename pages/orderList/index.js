const listPull = require('../../utils/listPull')
const App = getApp()
Component({
  behaviors: [listPull],
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    listUrl:App.UrlList.GroupOrderList,
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
      let url
      if (this.data.type == 1) {
        url = selected === 1 ? App.UrlList.GetTaskDangerList : selected == 2 ? App.UrlList.GetTaskSporadicList : App.UrlList.GroupOrderList
      } else if (this.data.type == 2) {
        url = selected === 1 ? App.UrlList.GetRejectDangerList : selected == 2 ? App.UrlList.GetRejectSporadicList : App.UrlList.GroupOrderList
      } else {
        url = selected === 1 ? App.UrlList.GetCurrentDangerList : selected == 2 ? App.UrlList.GetCurrentSporadicList : App.UrlList.GroupOrderList
      }
      this.setData({
        listUrl: url
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
          this.getListGet({
            listType: this.data.type
          })
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
      console.log(this.data.type)
      if (this.data.type == 1) {

        wx.navigateTo({
          url: `${event.currentTarget.dataset.url}?id=${event.currentTarget.dataset.id}&type=${event.currentTarget.dataset.type}`,
        })
      } else {
        if (event.currentTarget.dataset.public) {
          wx.navigateTo({
            url: `${event.currentTarget.dataset.public}?id=${event.currentTarget.dataset.id}&redisId=${event.currentTarget.dataset.redisid}`,
          })
        } else {
          wx.navigateTo({
            url: `/pages/order${event.currentTarget.dataset.type}/index?id=${event.currentTarget.dataset.id}&redisId=${event.currentTarget.dataset.redisid}`,
          })
        }
      }
    }
  }
})