const App = getApp()
const util = require('../../utils/util')
const eventBind = require('../../utils/eventBind')
Component({
  behaviors: [util, eventBind],

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: App.globalData.imgUrl,
    activeName: '1',
    show: false,
    icon: {
      normal: '../../assets/images/radio.svg',
      active: '../../assets/images/radio_active.svg',
    },
   
  },

  methods: {
    onLoad(options) {    
      let keys = ['security_type', 'utensils_install_type', 'stove_eject_smoke', 'hot_water_place','indoor_tube_type']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id)
      this.setData({
        nextStep: options.orderTypes.length ? true : false
      })
    },
    onShow() {
      
    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
    onChangeRadio(event) {
      this.setData({
        [event.currentTarget.dataset.tag]: event.detail,
      });
    },
    getInfo(id) {
      let _this = this
      App._get(App.UrlList.GetGroupOrderStep, {
        id: id,
        workType: 2
      }).then(res => {
        _this.setData(res.data)

      })
    },
    submitOrder(event) {
      let _this = this
      App._post(event.currentTarget.dataset.tag == 'save' ? App.UrlList.GroupOrderSave : App.UrlList.GroupOrderSubmit, {
        ...this.data,
      }).then(res => {
        wx.showToast({ title: res.msg })
        setTimeout(() => { _this.jumpOrder(_this.data.orderTypes) }, 1000)
      })
    },

  }
})