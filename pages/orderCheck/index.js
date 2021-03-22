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
    sSpecialHumList: [],
    specialHumArr: [],
    result: [],
  },

  methods: {
    onLoad(options) {
      let keys = ['security_type', 'security_enter_state', 'special_hum', 'security_user_type']
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
    popupShow(res) {
      this.setData({
        show: !this.data.show
      })
    },
    checkChange(event) {
      console.log(event)
      let {
        specialHumArr,
        sSpecialHumList,
        sSpecialHum
      } = this.data
      event.detail.forEach((item, index) => {
        if (!this.data.specialHumArr[item]) {
          specialHumArr.push(this.data.special_humArr[item])
          sSpecialHumList.push(this.data.special_humArr[item].dictNm)
          sSpecialHum.push(this.data.special_humArr[item].dictCd)
        } else {
          specialHumArr.splice(index, 1)
          sSpecialHumList.splice(index, 1)
          sSpecialHum.splice(index, 1)
        }
      })
      if (event.detail.length == 0) {
        specialHumArr = []
        sSpecialHumList = []
        sSpecialHum = []
      }
      this.setData({
        result: event.detail,
        specialHumArr: specialHumArr,
        sSpecialHumList: sSpecialHumList,
        sSpecialHum: sSpecialHum
      });
    },
    toggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },
    getInfo(id) {
      let _this = this
      let { specialHumArr, result } = this.data
      App._get(App.UrlList.GetGroupOrderStep, {
        id: id,
        workType: 1
      }).then(res => {
        _this.setData(res.data)
        let specialHum = res.data.sSpecialHum.split(',')
        specialHum.forEach(item => {
          _this.data.special_humArr.forEach((subitem, index) => {
            if (subitem.dictCd == item) {
              specialHumArr.push(subitem)
              result.push(index + '')
            }
          })
        })
        _this.setData({ specialHumArr, result, sSpecialHum: specialHum })
      })
    },
    checkJump(event) {
      wx.navigateTo({
        url: `/pages/${event.currentTarget.dataset.tag}/index?id=${this.data.id}`
      })
    },
    submitOrder(event) {
      let _this = this
      if (typeof (this.data.sSpecialHum) == 'Array') {
        this.setData({ sSpecialHum: this.data.sSpecialHum.join(',') })
      }
      App._post(event.currentTarget.dataset.tag == 'save' ? App.UrlList.GroupOrderSave : App.UrlList.GroupOrderSubmit, {
        id:_this.data.id,
        sInspectStartTime: _this.data.sInspectStartTime,
        visitTimes: _this.data.visitTimes,
        sUseType: _this.data.sUseType,
        sSecurityType: _this.data.sSecurityType,
        sEnterState: _this.data.sEnterState,
        sIsSpecial: _this.data.sIsSpecial,
        sSpecialHum: _this.data.sSpecialHum,
        sIsConfirm: _this.data.sIsConfirm,
        sHumNum: _this.data.sHumNum,
      }).then(res => {
        wx.showToast({ title: res.msg })
        setTimeout(() => { _this.jumpOrder(_this.data.orderTypes) }, 1000)
      })

    },

  }
})