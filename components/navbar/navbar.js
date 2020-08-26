// components/navbar/navbar.js
const app = getApp()
Component({
  properties: {
    navbarData: {   
      type: Object,
      value: {showCapsule: 1,title:'开眼视频'},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {
    height: '',
    top: 0,
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height,
      top: app.globalData.top
    })
  },
  methods: {
  // 返回上一页面
    navback: function() {
      wx.navigateBack()
    },
  //返回到首页
    backHome() {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }
  }

})  