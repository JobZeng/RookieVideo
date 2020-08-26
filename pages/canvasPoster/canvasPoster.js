// pages/canvasPoster/canvasPoster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpWidth: 0,
    cpHeight: 0,
    imgUrl: 'https://img.kaiyanapp.com/1c9b32f36eb0d3ae95baa94cc340263b.jpeg?imageMogr2/quality/60/format/jpg',
    loadImagePath: ''
  },
  // 获取图片信息
  getImginfo: function () {
    var that = this
    var url = that.data.imgUrl
    wx.getImageInfo({
      src: url, 
      success: function (res) {
        // console.log(res)
        that.setData({
          picUrl: res.path
        })
        // console.log(that.data.picUrl)

      },
      fail: function (res) {
        //失败回调
        console.log(res)
      }
    });
  },
  // 用画布
  creatCanvas: function () {
    console.log(111)
    var height = this.data.cpHeight
    var width = this.data.cpWidth
    // 设置logo距离顶部的高度
    var logoTop = height - 63
    // 设置小程序码距离左侧的距离
    var  picLeft = width - 20 - 75
    // 设置图片的长宽比
    var percent = width  / 1242
    var ImgHeight = 720 * percent
    // 创建画布
    var ctx = wx.createCanvasContext('canvasPoster')
    ctx.setFillStyle("#5c5855");
    ctx.fillRect(0, 0,width , height);
    // 绘制logo
    ctx.drawImage('../../images/logo.png',10,logoTop,95,33)
    // 绘制小程序码
    ctx.drawImage('../../images/qcode.jpg',picLeft,logoTop - 47,80,80)
    // 绘制在线图片
    ctx.drawImage(this.data.picUrl,0,0,width,ImgHeight)
    // 标题
    ctx.setFontSize(18);
    ctx.setFillStyle('#fff'); 
    var title = '标题'
    ctx.fillText(title,10,ImgHeight + 40,width - 20)
    // 标签
    var desc = '混音大神 T10MO 的保留项目，一年一度的夏日混音 remix。60 首大热单曲，你最喜欢哪一首呢？From T10MO'
    ctx.setFontSize(12);
    ctx.fillText(desc,10,ImgHeight + 60,width - 20)    
    ctx.draw(false, function () {
      wx.canvasToTempFilePath({
        canvasId: 'canvasPoster',
        success: function (res) {
          console.log(res.tempFilePath)
          wx.previewImage({
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
          })
        }
      })
    })
  },
  // 获取画布的大小
  getSize: function () {
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          cpHeight: 0.6 * res.screenHeight,
          cpWidth: res.screenWidth
        })
        
        that.getImginfo(that.data.imgUrl)
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getSize()
    setTimeout(function() {
      that.creatCanvas()
    },3000)
    
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