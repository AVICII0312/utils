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
    materialName: [],
    result: [],
  },

  methods: {
    onLoad(options) {
      this.getMaterialList()
      let keys = ['use_state','payment_method', 'use_type', 'common_whethe', 'meter_type', 'check_state', 'meter_direction', 'meter_place','air_tightness_test']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id)     
      this.getManufacturers()
    },
    onShow() {
      const {
        signImgPath
      } = this.data
      this.setData({
        signImgPath
      })
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
        tbusMaterialUseLogListBean,
        materialName
      } = this.data
      event.detail.forEach(item => {
        if (!this.data.tbusMaterialUseLogListBean[item]) {
          tbusMaterialUseLogListBean.push(this.data.materialList[item])
          materialName.push(this.data.materialList[item].materialName)
        }
      })
      if (event.detail.length == 0) {
        tbusMaterialUseLogListBean = []
        materialName = []
      }
      this.setData({
        result: event.detail,
        tbusMaterialUseLogListBean: tbusMaterialUseLogListBean,
        materialName: materialName
      });
      console.log(this.data.result, this.data.tbusMaterialUseLogListBean, this.data.materialName)
    },
    toggle(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const checkbox = this.selectComponent(`.checkboxes-${index}`);
      checkbox.toggle();
    },
    deleteMaterial(event) {
      const {
        tbusMaterialUseLogListBean,
        materialName,
        result
      } = this.data
      tbusMaterialUseLogListBean.splice(event.currentTarget.dataset.idx, 1)
      materialName.splice(event.currentTarget.dataset.idx, 1)
      result.splice(event.currentTarget.dataset.idx, 1)

      this.setData({
        tbusMaterialUseLogListBean,
        materialName,
        result
      })
    },
    useNumChange(event) {
      console.log(event)
      let _this = this
      const {
        tbusMaterialUseLogListBean
      } = this.data
      tbusMaterialUseLogListBean[event.currentTarget.dataset.idx].useNum = event.detail.value
      setTimeout(() => {
        App._post(App.UrlList.PriceCompute, {
          price: tbusMaterialUseLogListBean[event.currentTarget.dataset.idx].price,
          useNum: tbusMaterialUseLogListBean[event.currentTarget.dataset.idx].useNum
        }).then(res => {
          tbusMaterialUseLogListBean[event.currentTarget.dataset.idx].totalPrice = res.data
          _this.setData({
            tbusMaterialUseLogListBean
          })
        })
      }, 500)
    },
    changeRadio(event) {
      const tbusMaterialUseLogListBean = this.data.tbusMaterialUseLogListBean
      tbusMaterialUseLogListBean[event.currentTarget.dataset.idx].materialType = event.detail
      this.setData({
        tbusMaterialUseLogListBean
      })
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
        meterVerName: this.data[event.currentTarget.dataset.range][event.detail.value].meterVerName,
        meterVerType: this.data[event.currentTarget.dataset.range][event.detail.value].meterVerType,

      });
    },
    getInfo(id, redisId) {
      let _this = this
      App._get(App.UrlList.GetGroupOrderStep, {
        id: id,
        workType: 0
      }).then(res => {
        _this.setData(res.data)
        _this.setData({
          orderTypes:res.data.workOrderTypes
        })
        const workOrderTypes = this.data.workOrderTypes.split(',')
        const urlTag = ['', 'Check', 'Swap', 'Change', 'Debug', 'Follow']
        workOrderTypes.forEach(item => {
          if (item == 1) {
            _this.setData({ Check: true })
          }
          if (item == 2) {
            _this.setData({ Swap: true })
          }
          if (item == 3) {
            _this.setData({ Change: true })
          }
        })
        if (res.data.tbusMaterialUseLogListBean.length) {
          let materialName = []
          let result = []
          res.data.tbusMaterialUseLogListBean.forEach(item => {
            _this.data.materialList.forEach((items, index) => {
              if (item.materialId == items.materialId) {
                console.log(item)
                result.push(index + '')
                materialName.push(item.materialName)
              }
            })
          })
          _this.setData({
            materialName,
            result
          })
        }
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
    getMaterialList() {
      let _this = this
      App._post(App.UrlList.GetMaterialList).then(res => {
        console.log(res.data)
        _this.setData({
          materialList: res.data
        })
      })
    },

    submitOrder(event) {
      let _this = this
     
      App._post(App.UrlList.GroupOrderSave, {
        ...this.data,
        tbusMaterialUseLogListBean: this.data.tbusMaterialUseLogListBean ? JSON.stringify(this.data.tbusMaterialUseLogListBean) : ''
      }).then(res => {
        wx.showToast({ title: res.msg })
        setTimeout(() => { _this.jumpOrder(_this.data.orderTypes) }, 1000)
      })

    },


  }
})