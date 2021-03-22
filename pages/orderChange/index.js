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
      let keys = ['replace_type', 'meter_property']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id)
      this.getManufacturers()
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
    gasMaterChange(event) {
      this.setData({
        [event.currentTarget.dataset.tag]: this.data[event.currentTarget.dataset.range][event.detail.value].id,
        [event.currentTarget.dataset.name]: this.data[event.currentTarget.dataset.range][event.detail.value].meterVer,
        rOldMeterVerName: this.data[event.currentTarget.dataset.range][event.detail.value].meterVerName,
        rOldMeterVerType: this.data[event.currentTarget.dataset.range][event.detail.value].meterVerType,
      });
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
    getInfo(id) {
      let _this = this
      App._get(App.UrlList.GetGroupOrderStep, {
        id: id,
        workType: 3
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