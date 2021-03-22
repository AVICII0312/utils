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
    read: 1,
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
      this.getMaterialList()
      this.getInfo(options.id, options.redisId)
    },
    onShow() {

    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
    getInfo(id, redisId) {
      let _this = this
      App._post(App.UrlList.GetDangerInfo, {
        id: id,
        redisId: redisId || '',
        read: 1
      }).then(res => {
        _this.setData(res.data)
        const ListMianMap = res.data.tbusMaterialUseLogListMianMap
        if (ListMianMap.length) {
          let materialName = []
          let result = []
          ListMianMap.forEach(item => {
            _this.data.materialList.forEach((items, index) => {
              if (item.materialId == items.materialId) {
                console.log(item)
                result.push(index + '')
                materialName.push(item.materialName)
              }
            })
          })
          _this.setData({
            materialName: materialName,
            result: result
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