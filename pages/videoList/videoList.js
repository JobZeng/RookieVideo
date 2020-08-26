// pages/videoList/videoList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoList: {
      type: Array,
      value: []
    },
    model: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    currentIndex: -1,
    cpWidth: 0,
    cpHeight: 0,
    showItem: {},
    // imgUrl: 'https://img.kaiyanapp.com/1c9b32f36eb0d3ae95baa94cc340263b.jpeg?imageMogr2/quality/60/format/jpg',
    picUrl: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去视频详情
    goDetail: function (e) {
      var listItem = this.normalize(e.currentTarget.dataset.list.data)
      // console.log((listItem))
      this.triggerEvent('toDetail', listItem)
    },
    // 跳转到作者详情
    goAuthorDetail: function (e) {
      var authorDetailItem = e.currentTarget.dataset.athour
      // console.log(athourItem)
      wx.setStorage({
        data: authorDetailItem,
        key: 'author',
      })
      wx.navigateTo({
        url: '../authorDetail/authorDetail?id=' + authorDetailItem.id,
      })
    },
    // 整合数据
    normalize: function (item) {
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
    // 显示分享
    showSharemenu: function (e) {
      var index = e.currentTarget.dataset.index
      // console.log(index)
      var that = this
      that.setData({
        currentIndex: index
      })
    },
    // 取消分享
    cancelShare: function () {
      var that = this
      that.setData({
        currentIndex: -1
      })
    },
    /**
     * 以下是画布的逻辑
     *  */
    // 获取画布的大小
    getSize: function () {
      var that = this
      wx.getSystemInfo({
        success(res) {
          that.setData({
            cpHeight: 0.6 * res.screenHeight,
            cpWidth: res.screenWidth
          })
          // console.log(that.data.cpHeight)
          that.getImginfo(that.data.imgUrl)
        }
      })

    },
    // 获取图片信息
    getImginfo: function () {
      var that = this
      // var url = that.data.showItem.imgUrl
      // console.log(that.data.showItem.imgUrl)
      wx.getImageInfo({
        src: that.data.showItem.imgUrl,
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
    // 生成画布
    creatCanvas: function () {
      var that = this
      var height = that.data.cpHeight
      var width = that.data.cpWidth
      // 将loding变回原来
      
      // 设置logo距离顶部的高度
      var logoTop = height - 63
      // 设置小程序码距离左侧的距离
      var picLeft = width - 20 - 75
      // 设置图片的长宽比
      var percent = width / 1242
      var ImgHeight = 720 * percent

      // 创建画布
      var ctx = wx.createCanvasContext('canvasPoster', this)
      ctx.setFillStyle("#5c5855");
      ctx.fillRect(0, 0, width, height);
      // 绘制logo
      ctx.drawImage('../../images/logo.png', 10, logoTop, 95, 33)
      // 绘制小程序码
      ctx.drawImage('../../images/qcode.jpg', picLeft, logoTop - 47, 80, 80)
      // 绘制在线图片
      ctx.drawImage(that.data.picUrl, 0, 0, width, ImgHeight)
      // 标题
      ctx.setFontSize(20);
      ctx.setFillStyle('#fff');
      ctx.fillText(that.data.showItem.title, 10, ImgHeight + 40, width - 20)
      // 标签
      var content = '#' + that.data.showItem.category + ' / ' + that.data.showItem.interval
      ctx.setFontSize(12);
      ctx.fillText(content, 10, ImgHeight + 60, width - 20)

      // 描述
      that.noWrap(that.data.showItem.desc,ctx,ImgHeight)
      that.setData({
        isShow: false
      })
      ctx.draw(false, () => {
        wx.canvasToTempFilePath({
          canvasId: 'canvasPoster',
          success: function (res) {
            // console.log(res.tempFilePath)
            wx.previewImage({
              urls: [res.tempFilePath] // 需要预览的图片http链接列表
            })
          }
        }, this)
      })
    },
    // 去海报页面
    previewPoster: function (e) {
      var item = e.currentTarget.dataset.item.data
      // console.log(item)
      
      var that = this
      that.setData({
        isShow: true,
        showItem: {
          imgUrl: that.filterAddress(item.cover.feed),
          title: item.title,
          category: item.category,
          desc: item.description,
          interval: that.formatInterval(item.duration)
        }
      })
      // console.log(that.data.showItem)
      that.getSize()
      setTimeout(() => {
        that.creatCanvas()
      }, 3000)

    },
    /**
     * 以下是filter函数
     */
    // 处理时间
    formatInterval: function (interval) {
      var minute = this._pad(interval / 60 | 0)
      var second = this._pad(interval % 60)
      return minute + ":" + second
    },
    _pad: function (num, n = 2) {
      var len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    // 处理图片地址
    filterAddress: function (url) {
      var imgUrl = ''
      imgUrl = url
      return imgUrl.replace(/http/, 'https')
    },
    // 处理换行问题
    noWrap: function (text,context,ImgHeight) {
      var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      context.setFontSize(14)
      for (var a = 0; a < chr.length; a++) {
        if (context.measureText(temp).width < this.data.cpWidth - 30) {
          temp += chr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);
      //如果数组长度大于2 则截取前两个
      if (row.length > 2) {
        var rowCut = row.slice(0, 2);
        var rowPart = rowCut[1];
        var test = "";
        var empty = [];
        for (var a = 0; a < rowPart.length; a++) {
          if (context.measureText(test).width < 220) {
            test += rowPart[a];
          } else {
            break;
          }
        }
        empty.push(test);
        var group = empty[0] + "..." //这里只显示两行，超出的用...表示
        rowCut.splice(1, 1, group);
        row = rowCut;
      }
      for (var b = 0; b < row.length; b++) {
        context.fillText(row[b], 10, ImgHeight + 80 + b * 20, this.data.cpWidth - 30);
      }
    }

  },
  onShareAppMessage: function () {
    console.log(222)
  }
  
})