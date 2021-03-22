import {_get,_post} from './utils/request.js'
import siteinfo from './siteinfo'
import UrlList from './urlList'

App({

  globalData: {
    statusBarHeight: null,
    imgUrl:siteinfo.imgUrl,
    uploadUrl:siteinfo.siteroot
    
  },
  onLaunch() {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.globalData.statusBarHeight = res.statusBarHeight;
      }
    })
  },
  _get,
  _post,
  UrlList
})