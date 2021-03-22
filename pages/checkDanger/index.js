import siteinfo from '../../siteinfo'
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
    radio: '1',
    material: '',
    show: false,
    icon: {
      normal: '../../assets/images/radio.svg',
      active: '../../assets/images/radio_active.svg',
    },
    titles: [],
    selectInfo: {

    }
  },

  methods: {
    onLoad(options) {
      let keys = ['duty_type', 'result_type']
      keys.forEach(item => {
        this.getSelect(item)
      })
      this.setData(options)
      this.getInfo(options.id)
    },
    onChange(event) {
      this.setData({
        activeName: event.detail,
      });
    },
    onChangeRadio(event) {
      console.log(event)
      this.setData({
        radio: event.detail,
      });
    },
    dangerChange(event) {
      console.log(event)
    },
    menuShow(res) {
      const {
        titles
      } = this.data
      if (titles[res.currentTarget.dataset.idx].info) {
        titles[res.currentTarget.dataset.idx].info.push({
          idx: titles[res.currentTarget.dataset.idx].info.length + 1
        })
      } else {
        titles[res.currentTarget.dataset.idx].info = [{
          idx: 1
        }]
      }
      this.setData({
        titles
      })
    },
    menuHidden(event) {
      const { titles } = this.data
      const boxIdx = event.currentTarget.dataset.boxIdx
      const itemIdx = event.currentTarget.dataset.itemIdx
      titles[boxIdx].info.splice(itemIdx, 1)
      this.setData({
        titles
      })
    },
    dangerChange(event) {
      const { titles } = this.data
      const tag = event.currentTarget.dataset.tag
      const name = event.currentTarget.dataset.name
      const boxIdx = event.currentTarget.dataset.boxIdx
      const itemIdx = event.currentTarget.dataset.itemIdx

      if (event.currentTarget.dataset.tag == 'dDangerId') {
        titles[boxIdx].info[itemIdx][tag] = event.currentTarget.dataset.range[event.detail.value].tag
        titles[boxIdx].info[itemIdx][name] = event.currentTarget.dataset.range[event.detail.value].title
      } else {
        titles[boxIdx].info[itemIdx][tag] = this.data[event.currentTarget.dataset.range][event.detail.value].dictCd
        titles[boxIdx].info[itemIdx][name] = this.data[event.currentTarget.dataset.range][event.detail.value].dictNm
      }
      this.setData({
        titles: titles
      })
    },
    dangerInput(event) {
      const { titles } = this.data
      const tag = event.currentTarget.dataset.tag
      const boxIdx = event.currentTarget.dataset.boxIdx
      const itemIdx = event.currentTarget.dataset.itemIdx
      titles[boxIdx].info[itemIdx][tag] = event.detail.value
      this.setData({
        titles: titles
      })
    },
    takeDangerPictures(event) {
      let _this = this
      const { titles } = this.data
      const tag = event.currentTarget.dataset.tag
      const boxIdx = event.currentTarget.dataset.boxIdx
      const itemIdx = event.currentTarget.dataset.itemIdx
      wx.chooseImage({
        success(res) {
          const tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: siteinfo.siteroot + App.UrlList.UploadImg,
            filePath: tempFilePaths[0],
            name: 'file',
            success(result) {
              const data = JSON.parse(result.data)
              if (data.success) {
                if (titles[boxIdx].info[itemIdx][tag] != null) {
                  const {
                    oldImgPath
                  } = _this.data
                  oldImgPath.push(titles[boxIdx].info[itemIdx][tag])
                  _this.setData({
                    oldImgPath
                  })
                }
                titles[boxIdx].info[itemIdx][tag] = data.data.path
                _this.setData({
                  titles: titles
                })

                wx.showToast({
                  title: data.msg,
                })
              } else {
                wx.showModal({
                  content: '上传失败请重新上传',
                  showCancel: false,
                })
              }

            },
            fail(res) {
              wx.showModal({
                content: '上传失败请重新上传',
                showCancel: false,
              })
            }
          })

        }
      })
    },
    getInfo(id) {
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
        setTimeout(() => { wx.navigateBack() }, 1000)
      })
    },
  }
})