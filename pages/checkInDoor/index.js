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
    specialHumName: [],
    specialHumArr:[],
    result: [],
  },

  methods: {
    onLoad(options) {    
      let keys = ['meter_install_place', 'pipe_type', 'utensils_install_type','utensils_link_type','security_install_place','stove_link_type','kitchen_type','cus_evaluate_type','common_has']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id)
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
    getInfo(id, redisId) {
      let _this = this
      App._get(App.UrlList.GetGroupOrderStep, {
        id: id,
        workType: 1
      }).then(res => {
        _this.setData(res.data)

      })
    },
    save(event) {
      let _this = this
      App._post(App.UrlList.GroupOrderSave, {
        ...this.data,
        titles: JSON.stringify(this.data.titles)
      }).then(res => {
        wx.showToast({ title: res.msg })
        setTimeout(() => {wx.navigateBack() }, 1000)
      })
    },

  }
})