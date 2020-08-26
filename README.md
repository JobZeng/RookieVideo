- ## 前言

  这是我第一个真正意义上写的项目，代码是写的真的烂，但是功能都实现的差不多了。能写下来比之前那个遇到问题就放弃的我，成长了不少。在这个过程中，发现一个比较大的问题就是自己百度到的功能不会每一行去看去想为什么这么写，有优化的地方吗？我觉得这个是自己需要努力的地方。先把功能实现了，然后要逼着自己把性能也优化，这样自己会成长的快一点。

  还有遇到自己解决了很久没解决的问题，去问别人会解决的快一点，不要死撑着。死撑着效率慢，进度也跟不上，这么做比你憋着好多了。你态度好，嘴巴甜，别人是肯帮助你的。

  ## 正文

  ### 一.项目总览

  #### 1.技术栈

  wxml + wxss + wxs(第一次写没有使用框架)

  #### 2.关于数据接口

  ##### 2.1 分类

  [分类](http://baobab.kaiyanapp.com/api/v2/categories)

  [分类详情](http://baobab.kaiyanapp.com/api/v4/categories/detail/tab?id=14)

  ##### 2.2 精选

  [精选](http://baobab.kaiyanapp.com/api/v2/feed)

  视频详情的介绍和播放地址是缓存写的

  ##### 2.3 社区

  [社区推荐](http://baobab.kaiyanapp.com/api/v7/community/tab/rec)

  ##### 2.4 视频详情

  [类似视频](http://baobab.kaiyanapp.com/api/v4/video/related?id=196649) 在视频详情中会出现，详情的话是用缓存写的。

  [作者的视频](http://baobab.kaiyanapp.com/api/v4/pgcs/detail/index?id=2170) 作者页面会用到

  [视频评论](http://baobab.kaiyanapp.com/api/v2/replies/video?videoId=197472) 视频详情会用的

  #### 3.说明

  > emm，这个项目只用于学习，不会有商业行为

  > 所有的数据来源第三方，如有侵害第三方的权益，必删。

  > 代码写的不是很优美，会花一些时间把程序执行效率提高，把代码写的规范一些。

  > 如果有技术性的问题，可以在GitHub上，或者博客上交流

  > 最后希望大家可以在GitHub上给我一颗小星星，如果可以不胜感激。

  #### 4.效果演示

  体验版二维码，视频类的小程序要企业号才能上线

  <img src="https://img-blog.csdnimg.cn/20200826204903932.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />


  #### 5.部分截图

  发布页
  <img src="https://img-blog.csdnimg.cn/20200826204425950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />
  
  
  

  

  

  

  

  

  

  

  

  

  

  

  

  我的页面

  <img src="https://img-blog.csdnimg.cn/20200826204426407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%; " />

  分类页
  <img src="https://img-blog.csdnimg.cn/20200826204427693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />

  

  

  

  

  

  

  

  

  

  

  

  

  

  分类详情

  <img src="https://img-blog.csdnimg.cn/20200826204427889.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />

  精选页

  <img src="https://img-blog.csdnimg.cn/20200826204427831.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />

  精选详情

  <img src="https://img-blog.csdnimg.cn/2020082620442735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />

  社区页

  <img src="https://img-blog.csdnimg.cn/20200826204427727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />


  社区详情

  <img src="https://img-blog.csdnimg.cn/20200826204427233.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2VhZ2xlX3pjbA==,size_16,color_FFFFFF,t_70#pic_center" align="left" alt="在这里插入图片描述" style="zoom:67%;" />

  #### 6.项目布局

  ```
  .
  ├── app.js
  ├── app.json
  ├── app.wxss
  ├── components
  │   └── navbar
  │       ├── navbar.js
  │       ├── navbar.json
  │       ├── navbar.wxml
  │       └── navbar.wxss
  ├── images
  │   ├── add.png
  │   ├── index.png
  │   ├── index_press.png
  │   ├── logo.png
  │   ├── mine.png
  │   ├── mine_press.png
  │   └── qcode.jpg
  ├── pages
  │   ├── authorDetail
  │   │   ├── authorDetail.js
  │   │   ├── authorDetail.json
  │   │   ├── authorDetail.wxml
  │   │   └── authorDetail.wxss
  │   ├── canvasPoster
  │   │   ├── canvasPoster.js
  │   │   ├── canvasPoster.json
  │   │   ├── canvasPoster.wxml
  │   │   └── canvasPoster.wxss
  │   ├── categoryDetail
  │   │   ├── categoryDetail.js
  │   │   ├── categoryDetail.json
  │   │   ├── categoryDetail.wxml
  │   │   └── categoryDetail.wxss
  │   ├── communityDetail
  │   │   ├── communityDetail.js
  │   │   ├── communityDetail.json
  │   │   ├── communityDetail.wxml
  │   │   └── communityDetail.wxss
  │   ├── index
  │   │   ├── index.js
  │   │   ├── index.json
  │   │   ├── index.wxml
  │   │   └── index.wxss
  │   ├── loading
  │   │   ├── loading.gif
  │   │   ├── loading.js
  │   │   ├── loading.json
  │   │   ├── loading.wxml
  │   │   └── loading.wxss
  │   ├── logs
  │   │   ├── logs.js
  │   │   ├── logs.json
  │   │   ├── logs.wxml
  │   │   └── logs.wxss
  │   ├── mine
  │   │   ├── mine.js
  │   │   ├── mine.json
  │   │   ├── mine.wxml
  │   │   └── mine.wxss
  │   ├── publishWorks
  │   │   ├── publishWorks.js
  │   │   ├── publishWorks.json
  │   │   ├── publishWorks.wxml
  │   │   └── publishWorks.wxss
  │   ├── utils
  │   │   └── utils.wxs
  │   ├── videoDetail
  │   │   ├── videoDetail.js
  │   │   ├── videoDetail.json
  │   │   ├── videoDetail.wxml
  │   │   └── videoDetail.wxss
  │   └── videoList
  │       ├── loading.gif
  │       ├── videoList.js
  │       ├── videoList.json
  │       ├── videoList.wxml
  │       └── videoList.wxss
  ├── project.config.json
  ├── sitemap.json
  └── utils
      └── util.js
  
  
  ```

  ## 结束语

  可能写完这个项目，好几个月都不会去写新的项目了。要毕业了，还有很多琐碎的事情要去完成，还要把前端的底子给打牢。不过就算是不写项目了，还是欢迎你们和我来讨论这个项目如果是有你不懂的，我懂的我愿意去帮助你。谁都是从不懂到懂的，最后如果这个项目对你有帮助，希望你可以去GitHub上点个star。

  > 传送门

  - [项目地址](https://github.com/JobZeng/RookieVideo)
  - [GitHub](https://github.com/JobZeng)
  - [csdn](https://github.com/JobZeng/RookieVideo)
  - [简书](https://www.jianshu.com/u/454958bb52eb)