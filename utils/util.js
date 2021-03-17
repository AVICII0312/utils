import { _post, _get } from './request'
const App = getApp()
module.exports = Behavior({
  data: {
    active: 0
  },
  methods: {
    /* 节流函数 */
    throttle(fn, time = 500) {
      // 可以执行的标识, 闭包保存该标识
      let flag = true
      // 传递参数
      return (...args) => {
        // 不许执行, 结束
        if (flag === false) {
          return
        }
        // 设置不许执行
        flag = false
        setTimeout(() => {
          // 回调 并用到这些参数
          fn.apply(this, args)
          flag = true
        }, time)
      }
    },
    getSelect(type){
      let _this =this      
      _post(App.UrlList.GetSelectList,{
        dictNm:type
      }).then(res=>{
        let keys = type+'Arr'
        let objArr = res.data   
        _this.setData({
          [keys]:objArr
        })
      })
    },
  }
})