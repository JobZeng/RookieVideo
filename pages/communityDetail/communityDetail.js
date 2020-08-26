// pages/communityDetail/communityDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: app.globalData.height + app.globalData.top + 12,
    type: '',
    communityItem: [],
    windowHeight: 0,
    current: 0
  },

  getWindowsHeight: function() {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight
        })
        // console.log(res.windowHeight )
      },
    })
  },
  change: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 获取社区内容详情
  getCommunityDetail: function() {
    var that = this 
    wx.getStorage({
      key: 'community',
      success (res) {
        // console.log(res.data.data)
        that.setData({
          communityItem: res.data.data
          
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    var that = this 
    that.setData({
      type: options.type
    })
    that.getWindowsHeight(),
    that.getCommunityDetail()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})