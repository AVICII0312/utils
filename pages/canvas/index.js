const App = getApp()
Component({
  behaviors: [],

  /**
   * 页面的初始数据
   */
  data: {
    uploadUrl: App.globalData.uploadUrl
  },

  methods: {
    
    onLoad(options){
      this.setData(options)
    },
    onReady() {
      this.ctx = wx.createCanvasContext('sign')
      this.ctx.setLineWidth(4)
      this.ctx.setFillStyle('#fff')
      this.ctx.fillRect(0, 0, 375, 610)
    },
    drawChange(event) {
      let coords = event.touches[0]
     
      this.ctx.lineTo(coords.x, coords.y)
      this.ctx.stroke()
      setTimeout(() => {
        this.ctx.draw(true)
      }, 300)
    },
    drawStart(event) {
      let coords = event.touches[0]
      this.ctx.moveTo(coords.x, coords.y)
    },
    drawEnd() {
      this.ctx.draw(true)
    },
    removeCanvas() {
      this.ctx.clearRect(0, 0, 375, 610)
      this.ctx.draw(true)
    },
    confirm() {
      let _this = this
      this.ctx.draw(true, () => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 375,
          height: 610,
          canvasId: 'sign',
          success(res) {
            wx.uploadFile({
              url: _this.data.uploadUrl + App.UrlList.UploadImg,
              filePath: res.tempFilePath,
              name: 'file',
              success(result) {
                const data = JSON.parse(result.data)
                if (data.success) {
                  console.log(getCurrentPages())
                  const page = getCurrentPages()
                  page.forEach((item,index)=>{
                    if(item.route=='pages/orderDanger/index'){
                      page[index].data.cusImgPath = data.data.path
                      page[index].data.cusImgPathPreview = [res.tempFilePath]   
                     
                    }
                    if(item.route=='pages/orderPublic/index'){
                      page[index].data.signImgPath = data.data.path
                      page[index].data.signImgPathPreview = [res.tempFilePath]   
                     
                    }
                  })                             
                  wx.navigateBack()
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
      })
    }
  }
})