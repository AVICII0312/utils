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
    materialName:[],
    result: [],
  },

  methods: {
    onLoad(options) {
      this.getMaterialList()
      let keys = ['enter_state', 'result_type', 'air_tightness_test', 'payment_method']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id, options.redisId)
    },
    onShow() {
      const {
        cusImgPath,
        cusImgPathPreview
      } = this.data
      this.setData({
        cusImgPath,
        cusImgPathPreview
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
        tbusMaterialUseLogListMianMap,
        materialName
      } = this.data
      event.detail.forEach(item => {
        if (!this.data.tbusMaterialUseLogListMianMap[item]) {
          tbusMaterialUseLogListMianMap.push(this.data.materialList[item])
          materialName.push(this.data.materialList[item].materialName)
        }
      })
      if (event.detail.length == 0) {
        tbusMaterialUseLogListMianMap = []
        materialName = []
      }
      this.setData({
        result: event.detail,
        tbusMaterialUseLogListMianMap: tbusMaterialUseLogListMianMap,
        materialName: materialName
      });
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
        tbusMaterialUseLogListMianMap,
        materialName,
        result
      } = this.data
      tbusMaterialUseLogListMianMap.splice(event.currentTarget.dataset.idx, 1)
      materialName.splice(event.currentTarget.dataset.idx, 1)
      result.splice(event.currentTarget.dataset.idx, 1)

      this.setData({
        tbusMaterialUseLogListMianMap,
        materialName,
        result
      })
    },
    useNumChange(event) {
      console.log(event)
      let _this = this
      const {
        tbusMaterialUseLogListMianMap
      } = this.data
      tbusMaterialUseLogListMianMap[event.currentTarget.dataset.idx].useNum = event.detail.value
      setTimeout(() => {
        App._post(App.UrlList.PriceCompute, {
          price: tbusMaterialUseLogListMianMap[event.currentTarget.dataset.idx].price,
          useNum: tbusMaterialUseLogListMianMap[event.currentTarget.dataset.idx].useNum
        }).then(res => {
          tbusMaterialUseLogListMianMap[event.currentTarget.dataset.idx].totalPrice = res.data
          _this.setData({
            tbusMaterialUseLogListMianMap
          })
        })
      }, 500)
    },
    changeRadio(event) {
      const tbusMaterialUseLogListMianMap = this.data.tbusMaterialUseLogListMianMap
      tbusMaterialUseLogListMianMap[event.currentTarget.dataset.idx].materialType = event.detail
      this.setData({
        tbusMaterialUseLogListMianMap
      })
    },
    getInfo(id, redisId) {
      let _this = this
      App._post(App.UrlList.GetDangerInfo, {
        id: this.data.id,
        redisId: this.data.redisId || ''
      }).then(res => {        
        _this.setData(res.data)
        if (res.data.tbusMaterialUseLogListMianMap.length) {
          let materialName = []
          let result = []
          res.data.tbusMaterialUseLogListMianMap.forEach(item => {
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
    getMaterialList() {
      let _this = this
      App._post(App.UrlList.GetMaterialList).then(res => {
        _this.setData({
          materialList: res.data
        })
      })
    },
    submitOrder(event) {
      let _this = this
      let rule = [{
        rule: 'enterState',
        title: '入户状态'
      }, {
        rule: 'resultType',
        title: '整改结果'
      }, {
        rule: 'disposeImgPath',
        title: '处理情况'
      }, {
        rule: 'rectifyImgPath',
        title: '整改照片'
      }, {
        rule: 'imgPath1',
        title: '影像信息'
      }, {
        rule: 'airSealType',
        title: '气密性测试'
      }, {
        rule: 'isPressure',
        title: '测压结果'
      }]
      if(event.currentTarget.dataset.tag === 'save'){rule=[]}
      this.formRule(rule).then(() => {
        App._post(event.currentTarget.dataset.tag === 'save' ? App.UrlList.SaveDangerOrder : App.UrlList.SubmitDangerOrder, {
          ...this.data,
          tBusMaterialUseLogList: this.data.tbusMaterialUseLogListMianMap ? JSON.stringify(this.data.tbusMaterialUseLogListMianMap) : ''
        }).then(res => {
          wx.showToast({
            title: res.msg,
            success() {
              _this.navigateBack('pages/orderList/index')
            }
          })
        })
      })
    },

  }
})