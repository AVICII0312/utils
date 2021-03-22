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
    result: [],
  },

  methods: {
    onLoad(options) {
      this.setData(options)
      let keys = ['use_state', 'use_type', 'common_whethe', 'meter_type', 'check_state', 'meter_direction']
      keys.forEach(item => {
        this.getSelect(item)
      })
      if (options.id) {
        this.getInfo()
      }
      this.getDistrictList()
      this.getManufacturers()
    },
    onShow() {},
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
    districtChange(event) {
      let _this = this
      this.setData({
        [event.currentTarget.dataset.tag]: this.data[event.currentTarget.dataset.range][event.detail.value].id,
        [event.currentTarget.dataset.name]: this.data[event.currentTarget.dataset.range][event.detail.value].villages,
      });
    },
    manufacturersChange(event) {
      this.setData({
        [event.currentTarget.dataset.tag]: this.data[event.currentTarget.dataset.range][event.detail.value].id,
        [event.currentTarget.dataset.name]: this.data[event.currentTarget.dataset.range][event.detail.value].manufacturers,
      });
      this.getGasMater(this.data[event.currentTarget.dataset.range][event.detail.value].id)
    },
    gasMaterChange(event){
      this.setData({
        [event.currentTarget.dataset.tag]: this.data[event.currentTarget.dataset.range][event.detail.value].id,
        [event.currentTarget.dataset.name]: this.data[event.currentTarget.dataset.range][event.detail.value].meterVer,
      });
    },
    getInfo() {
      let _this = this
      App._post(App.UrlList.GetUserList, {
        id: this.data.id
      }).then(res => {
        _this.setData(res.data[0])
      })
    },
    getDistrictList() {
      let _this = this
      App._post(App.UrlList.GetDistrictList).then(res => {
        _this.setData({
          districtArr: res.data
        })
      })
    },
    getGasMater(id) {
      let _this = this
      App._post(App.UrlList.GetGasMater, {
        manufacturersId: id
      }).then(res => {
        _this.setData({
          gasMaterArr: res.data
        })
      })
    },
    getManufacturers() {
      let _this = this
      App._post(App.UrlList.GetManufacturers).then(res => {
        _this.setData({
          manufacturersArr: res.data
        })
      })
    },
    submitOrder(event) {
      let _this = this
      let rule = []
      this.formRule(rule).then(() => {
        App._post(this.data.add ? App.UrlList.AddUserList : App.UrlList.ModificationUserList, {
          ...this.data
        }).then(res => {
          wx.showToast({
            title: res.msg,
            success() {
              _this.navigateBack()
            }
          })
        })
      })
    },

  }
})