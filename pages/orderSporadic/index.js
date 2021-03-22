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
      let keys = ['maintenance_items', 'air_tightness_test', 'payment_method']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.getMaterialList()
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
        listTBusMaterialUseLog,
        materialName
      } = this.data
      event.detail.forEach(item => {
        if (!this.data.listTBusMaterialUseLog[item]) {
          listTBusMaterialUseLog.push(this.data.materialList[item])
          materialName.push(this.data.materialList[item].materialName)
        }
      })
      if(event.detail.length==0){
        listTBusMaterialUseLog = []
        materialName = []
      }
      this.setData({
        result: event.detail,
        listTBusMaterialUseLog: listTBusMaterialUseLog,
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
        listTBusMaterialUseLog,
        materialName,
        result
      } = this.data
      listTBusMaterialUseLog.splice(event.currentTarget.dataset.idx, 1)
      materialName.splice(event.currentTarget.dataset.idx, 1)
      result.splice(event.currentTarget.dataset.idx, 1)

      this.setData({
        listTBusMaterialUseLog,
        materialName,
        result
      })
    },
    useNumChange(event) {
      console.log(event)
      let _this = this
      const {
        listTBusMaterialUseLog
      } = this.data
      listTBusMaterialUseLog[event.currentTarget.dataset.idx].useNum = event.detail.value
      setTimeout(() => {
        App._post(App.UrlList.PriceCompute, {
          price: listTBusMaterialUseLog[event.currentTarget.dataset.idx].price,
          useNum: listTBusMaterialUseLog[event.currentTarget.dataset.idx].useNum
        }).then(res => {
          listTBusMaterialUseLog[event.currentTarget.dataset.idx].totalPrice = res.data
          _this.setData({
            listTBusMaterialUseLog
          })
        })
      }, 500)
    },
    changeRadio(event) {
      const listTBusMaterialUseLog = this.data.listTBusMaterialUseLog
      listTBusMaterialUseLog[event.currentTarget.dataset.idx].materialType = event.detail
      this.setData({
        listTBusMaterialUseLog
      })
    },
    getInfo(id, redisId) {
      let _this = this
      App._post(App.UrlList.GetSporadicInfo, {
        id: id,
        redisId: redisId || ''
      }).then(res => {
        _this.setData(res.data)
        if (res.data.listTBusMaterialUseLog.length) {
          let materialName = []
          let result = []
          res.data.listTBusMaterialUseLog.forEach(item => {
            _this.data.materialList.forEach((items, index) => {
              if (item.materialId == items.materialId) {
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
      // let rule = [{
      //   rule: 'repairPro',
      //   title: '维修项目'
      // }, {
      //   rule: 'meterNum',
      //   title: '表具编号'
      // }, {
      //   rule: 'writeMeterNum',
      //   title: '表具编号2'
      // }, {
      //   rule: 'meterImgPath',
      //   title: '表具照片'
      // }, {
      //   rule: 'isAffirm',
      //   title: '是否确认用户'
      // }, {
      //   rule: 'isMeasure',
      //   title: '是否测压'
      // }, {
      //   rule: 'isFinish',
      //   title: '是否完成'
      // }]
      // if(event.currentTarget.dataset.tag === 'save'){rule=[]}
      // this.formRule(rule).then(() => {
        App._post(event.currentTarget.dataset.tag === 'save' ? App.UrlList.SaveSporadicOrder : App.UrlList.SubmitSporadicOrder, {
          ...this.data,
          tBusMaterialUseLogs: this.data.listTBusMaterialUseLog ? JSON.stringify(this.data.listTBusMaterialUseLog) : '',
          oldImgPath: this.data.oldImgPath ? this.data.oldImgPath.join(',') : ''
        }).then(res => {
          wx.showToast({
            title: res.msg,
            success() {
              wx.navigateBack()
            }
          })
        })
      // })
    }
  }
})