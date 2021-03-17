import { _post } from './request'

export function uploadBase64(imageName, imgCode) {
  return _post('/fileUpload/uploadBase64', {
    'imgBase64List': JSON.stringify(
      [{ 'imgName': imageName, 'imgCode': imgCode }])
  })
}

export function base64(url, type) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, // 选择图片返回的相对路径
      encoding: 'base64', // 编码格式
      success: res => {
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
}
