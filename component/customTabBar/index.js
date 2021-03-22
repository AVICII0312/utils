// component/customTabBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
        "path": "/pages/index/index",
        "icon": "/assets/icon/index_icon.png",
        "selectedIcon": "/assets/icon/index_icon_active.png"
      },
      {
        "path": "/pages/workOrder/index",
        "icon": "/assets/icon/order_icon.png",
        "selectedIcon": "/assets/icon/order_icon_active.png"
      },
      {
        "path": "/pages/customer/index",
        "icon": "/assets/icon/user_icon.png",
        "selectedIcon": "/assets/icon/user_icon_active.png"
      },
      {
        "path": "/pages/my/index",
        "icon": "/assets/icon/mine_icon.png",
        "selectedIcon": "/assets/icon/mine_icon_active.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
    
    }
  }
})