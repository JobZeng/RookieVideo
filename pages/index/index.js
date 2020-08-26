//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbarData: {
      showCapsule: 0,
      title: '开眼视频'
    },
    height: app.globalData.height + app.globalData.top + 12,  
    // 切换tab栏
    currentIndex: 1,
    // 分类、精选、社区
    categories: [],
    featured: [],
    community: [],
    // 社区图片
    communityImgUrl: '',
    // 滚动高度
    scrollWidth: 0,
    // 下一个请求链接
    nextPageUrl: '',
    // 请求日期
    publishTime: 0,
    // 日期title
    toDay: 0,
    // 是否显示loading组件
    isShow: true,
    picNum:1
  },
  // 切换栏目
  switchItem: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentIndex: e.target.dataset.current
      })
    }
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
  // 跳转到作者详情
  // 跳转到分类详情
  toCategoryDetail: function(e) {
    var id = e.currentTarget.dataset.list.id
    wx.navigateTo({
      url: '../categoryDetail/categoryDetail?id=' + id,
    })
    // console.log(id)
  },
  // 获取分类
  getCategory: function () {
    var that = this
    // 求分类
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v2/categories',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          categories: res.data.slice(0, 16)
        })
      }
    })
  },
  // 获取精选的数据
  getFeatured: function () {
    var that = this
    var temp = []
    var featured = [{
      title:'今日开眼精选',
      list:[]
    }]
    // console.log(typeof(featured))
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v2/feed',
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        temp = res.data.issueList[0].itemList.slice(2)
        temp.forEach(item => {
          featured[0].list.push(item)
        });
        // 今天是星期几
        var toDay = new Date(res.data.issueList[0].publishTime)
        that.setData({
          publishTime: res.data.issueList[0].publishTime,
          featured: featured,
          toDay: toDay.getDay()
        })
      }
    })
  },
  // 获取社区数据
  getCommunity: function() {
    var that = this
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v7/community/tab/rec',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data.itemList[1].data.itemList[0].data)
        that.setData({
          nextPageUrl: res.data.nextPageUrl,
          community: res.data.itemList.slice(2,14),
          communityImgUrl: res.data.itemList[1].data.itemList[0].data.image
        })
        // console.log(that.data.nextPageUrl)
      }
    })
  },
  // 跳转详情 
  toCommunityDetail: function(e) {
    var content = e.currentTarget.dataset.content
    var type  = 'picture'
    if(content.type === 'ugcPicture' ) {
      if(content.data.urls.length > 1)
      type = 'pictures'
    } else {
     type = 'video'
    }
    wx.setStorage({
      data: content,
      key: 'community',
    })
    wx.navigateTo({
      url: '../communityDetail/communityDetail?type=' + type,
    })
  },
  // 获取滚动高度
  getScrollWidth: function() {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          scrollWidth: res.windowHeight 
        })
        // console.log(that.data.height)
      },
    })
  },
  
  // 更新精选
  refreshFeatured: function() {
    var that = this
    // publishTime是请求需要的
    var publishTime = that.data.publishTime - 86400000
    // 确定日期
    // console.log(that.data.toDay)
    var featuredDate = new Date(publishTime)
    if(featuredDate.getDay() < that.data.toDay) {
      featuredDate = that.ensureWeek(featuredDate.getDay())
    } else {

      var year =  featuredDate.getFullYear()
      var month = that._pad(featuredDate.getMonth() + 1)
      var day = that._pad(featuredDate.getDate())
      featuredDate = month + '/' + day + ' ' + year
    }
    // console.log(featuredDate)
    var featured = [{
      title: featuredDate,
      list:[]
    }]
    var temp = []
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v2/feed',
      data: {
        date: publishTime,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        temp = res.data.issueList[0].itemList.slice(2)
        temp.forEach(item => {
          featured[0].list.push(item)
        });
        temp = that.data.featured
        featured.forEach(item => {
          temp.push(item)
        });
        // console.log('')
        // console.log(temp)
       
        that.setData({
          featured: temp,
          publishTime: publishTime,
          
        })
        // console.log(that.data.featured)
      }
    })
  },
  // 更新社区
  refreshCommunity: function() {
    var that  = this
    var community = that.data.community
    var nextPageUrl = that.data.nextPageUrl
    // console.log(nextPageUrl)
    var startScore = that.splitParameter(nextPageUrl)
    wx.request({
      url: 'https://baobab.kaiyanapp.com/api/v7/community/tab/rec',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        startScore: startScore,
        pageCount: 2
      },
      success(res) {
        var temp = res.data.itemList
        temp.forEach(item => {
          community.push(item)
        });

        // console.log(community)
        that.setData({
          nextPageUrl: res.data.nextPageUrl,
          community: community
        })
        
      }
    })
    // console.log(temp)
  },
  splitParameter: function(str) {
    var ch = str.split("")
    var start = ch.indexOf("=") + 1
    var end = ch.indexOf("&") - 1
    var temp = ''
    for (let index = start; index <= end; index++) {
      temp += ch[index]
    }
    return temp
  },
  ensureWeek: function(num) {
    switch(num){
      case 0:
        return '星期天'
      case 1: 
        return '星期一'
        break
      case 2: 
        return '星期二'
        break
      case 3: 
        return '星期三'
        break
      case 4: 
        return '星期四'
        break
      case 5: 
        return '星期五'
        break
      case 6:
        return '星期六'
        break
    }
  },
  _pad: function(num, n = 2){
    var len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  },
  imageLoading: function() {
    var that = this
    var picNum = that.data.picNum + 1
    
    that.setData({
      picNum: picNum 
    })
    // console.log(picNum)
    if(picNum === 3) {
      that.setData({
        isShow: false,
      })
    }
  },
  // onload 函数
  onLoad: function () {
    this.getScrollWidth()
    this.getCategory()
    this.getFeatured()
    this.getCommunity()
  },

})