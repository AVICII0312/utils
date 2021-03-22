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
              if (item.id == items.id) {
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
  }
})