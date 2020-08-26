// pages/categoryDetail/categoryDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 自定义导航栏有点烦
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '' //导航栏 中间的标题
    },
    // // 此页面 页面内容距最顶部的距离
    height: app.globalData.height + app.globalData.top + 12,  
    categoryItem: [],
    videoList: []
  },
  // 获取分类详情
  getCategoryDetail: function(id) {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v4/categories/detail/tab',
      data:{
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          categoryItem: res.data.categoryInfo
        })
        that.setData({
          navbarData: {showCapsule: 1,title: res.data.categoryInfo.name + '主页'}
        })
        // console.log(res.data.categoryInfo.name)
        // console.log(res.data.categoryInfo)
      }
    })
  },
  // 获取分类详情视频
  getVideoList: function(id) {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v4/categories/detail/index',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          videoList: res.data.itemList.slice(2,16)
        })
      }
    })
  },
  // 跳转到视频详情
  toVideoDetail: function (e) {
    var obj = e.detail
    wx.setStorage({
      data: obj,
      key: 'desc',
    })
    // // console.log(this.normalize(listItem))
    var id = obj.id
    wx.navigateTo({
      url: '../videoDetail/videoDetail?id=' + id 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options.id)
      this.getCategoryDetail(options.id)
      this.getVideoList(options.id)
     
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