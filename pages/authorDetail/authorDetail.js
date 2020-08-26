// pages/authorDetail/authorDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航相关
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '' //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height + app.globalData.top + 12,
    // 作者信息
    authorItem: [],
    videoList:[]

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
  // 获取作者信息
  getAthour: function() {
    var that = this
    wx.getStorage({
      key: 'author',
      success (res) {
        // console.log(res.data)
        that.setData({
          authorItem: res.data,
          navbarData: {showCapsule: 1,title: res.data.name + '主页' }
        })
      }

    })

  },
  // 获取视频列表
  getVideoList: function(id) {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v4/pgcs/detail/index',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       var list = that.normalize(res.data.itemList)
       console.log(list)
       that.setData({
        videoList: list
       })
      }
    })
  },
  // 整理获取的数据
  normalize: function(list) {
    var ret = []
    list.forEach(item => {
      if(item.type === 'videoCollectionOfHorizontalScrollCard') {
       item.data.itemList.forEach(ele => {
         ret.push(ele)
       })
      } else if(item.type === 'video') {
        ret.push(item)
      }
    });
    return ret

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAthour()
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