// pages/videoDetail/videoDetail.js
const app = getApp()
Page({
  data: {
    videoHeight: 0,
    videoItem: [],
    recommend: [],
    height: app.globalData.height + app.globalData.top + 12,  
    reply: [],
    isShow: false
  },
  print: function() {
    console.log(this.videoItem)
  },
  // 视频详情跳转视频详情 看起来有点扯 有点绕
  toDetail: function(e) {
    // 暂停上一个播放的视频
    var videoCtx = wx.createVideoContext('myVideo', this)
    videoCtx.pause()
    var obj = this.normalize(e.currentTarget.dataset.item.data)
    // console.log(obj)
    wx.setStorage({
      data: obj,
      key: 'desc',
    })
    var id = obj.id
    wx.navigateTo({
      url: '../videoDetail/videoDetail?id=' + id 
    })
  },
   // 整合数据
   normalize: function(item) {
    var obj = new Object()
    obj.id = item.id
    obj.likeNum = item.consumption.collectionCount
    obj.shareNum = item.consumption.shareCount
    obj.replyNum = item.consumption.replyCount
    obj.title = item.title
    obj.tag = item.category
    obj.duration = item.duration
    obj.playUrl = item.playUrl
    obj.desc = item.description
    return obj
  },
  // 获取手机高度  并且求出video的高
  getWidth: function() {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
          // console.log(res.windowWidth * 0.75 * 0.75)
          that.setData({
            videoHeight: res.windowWidth * 0.75 * 0.75
          })
      },
    })
  },
  // 获取播放链接
  getVideoDetail: function() {
    var that = this
    wx.getStorage({
      key: 'desc',
      success (res) {
        that.setData({
          videoItem: res.data
        })
      }
    })
  },
  // 推荐
  getRecommend: function (id) {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v4/video/related',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data.itemList)
        // that.recommend = res.data.itemList.slice(1,11)
        that.setData({
          recommend: res.data.itemList.slice(1,5)
        })
      }
    })
  },
  // 视频评论
  getReply: function(id) {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v2/replies/video',
      data: {
        videoId: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var tmp = res.data.itemList
        for (var index = 0; index < tmp.length; index++) {
          if(tmp[index].type != "reply") {
           
            tmp.splice(index, 1)
          }
          
        }
        that.setData({
          reply: tmp
        })
        console.log(tmp)
      }
    })
  },
  // 显示评论
  showReply: function() {
    var that = this
    that.setData({
      isShow: !that.data.isShow
    })
    console.log("显示")
  },
  // 关闭评论
  closeReply: function() {
    var that = this
    that.setData({
      isShow: !that.data.isShow
    })
  },
  onShareAppMessage: function () {
    console.log(222)
  },
  // onLoad函数
  onLoad: function(options) {
    var that = this
    var id = options.id
    that.getWidth()
    that.getRecommend(id)
    that.getReply(id)
    that.getVideoDetail()
  }
})
