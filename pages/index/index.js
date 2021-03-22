import QQMapWX from '../../utils/qqmap-wx-jssdk';
const listPull = require('../../utils/listPull')
const App = getApp()
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'JS5BZ-I5TCF-TSDJF-JBPLQ-KPNY6-LSBQX' // 必填
});
Component({
  behaviors: [],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    markers: [],
    checkInStatus: false,
    markersSet: {
      iconPath: '/assets/icon/blue.png',
      width: '40rpx',
      height: '40rpx',
      customCallout: {
        display: 'BYCLICK',
        anchorX: 0,
        anchorY: -10
      },
    },
    goOffWork:"下班",
    markers: [],
  },
  methods: {
    onShow() {
      this.addressText()
      this.getCheckInStatus()
      this.getTodayPlan()
      this.getCheckList()
      this.getTodayRejectList()
    },
    checkIn(event) {
      let _this = this
      App._post(App.UrlList.CheckIn, {
        address: this.data.address,
        gisX: this.data.mapLongitude,
        gisY: this.data.mapLatitude
      }).then(res => {
        wx.showToast({
          title: res.msg,
          success() {
            _this.getCheckInStatus()
          }
        })

      })
    },
    //下班状态显示
    goWork(){
     this.setData({ goOffWork: "下班后" })
    },
    getCheckInStatus() {
      App._post(App.UrlList.CheckInStatus).then(res => {
        this.setData({
          checkInStatus: true
        })
      })
    },
    getTodayPlan() {
      let _this = this
      App._post(App.UrlList.TodayPlay).then(res => {
        _this.setData({
          plan: res.data
        })
      })
    },
    navigationTo(event) {
      let sort 
      if(event.currentTarget.dataset.type==2){
        sort = 'Danger'
      }else if(event.currentTarget.dataset.type==3){
        sort = 'Sporadic'
      }else if (event.currentTarget.dataset.type==1){
        sort = 'Public' 
      }
      wx.navigateTo({
        url: `/pages/order${event.currentTarget.dataset.type}/index?id=${event.currentTarget.dataset.id}`,
      })
    },
    onReset() {
      let _this = this
      wx.showLoading({
        title: '信息更新中',
        mask: true,
        success() {
          setTimeout(res => {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 1500)
        }
      })
    },
    addressText(e) {
      let _this = this;
      qqmapsdk.reverseGeocoder({
        location: '',
        success: function (res) { //成功后的回调
          _this.setData({
            address: res.result.address,
            mapLongitude: res.result.location.lng,
            mapLatitude: res.result.location.lat,
          })
        },
        fail: function (error) {
          console.error(error);
        }
      })
    },
    getCheckList() {
      let _this = this
      let newArr = []
      App._post(App.UrlList.UserCheckInList).then(res => {
        res.data.forEach(item => {
          let newObj = {
            ...item,
            ..._this.data.markersSet
          }
          newArr.push(newObj)
        })
        _this.setData({
          markers: newArr
        })
      })
    },
    getTodayRejectList(){
      let _this =this
      App._get(App.UrlList.TodayRejectList).then(res=>{
        _this.setData({
          rejectList:res.data
        })
      })
    }
  }
})