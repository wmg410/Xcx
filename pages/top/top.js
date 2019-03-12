// var douban = require('../../comm/script/fetch')
// var config = require('../../comm/script/config')
// Page({
// 	data: {
// 		hasMore: true,
// 		showLoading: true,
// 		start: 0
// 	},
// 	onLoad: function() {
// 		var that = this
// 		douban.fetchFilms.call(that, config.apiList.top, that.data.start)
// 	},
// 	onPullDownRefresh: function() {
// 		var that = this
// 		that.setData({
// 			films: [],
// 			hasMore: true,
// 			showLoading: true,
// 			start: 0
// 		})
// 		douban.fetchFilms.call(that, config.apiList.top, that.data.start)
// 	},
// 	onReachBottom: function() {
// 		var that = this
// 		if (!that.data.showLoading) {
// 			douban.fetchFilms.call(that, config.apiList.top, that.data.start)
// 		}
// 	}
// })



Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        url:'https://mp.weixin.qq.com/',
        message:'杭州创鑫时代广场店'
      },
      {
        message:'杭州人工智能小镇店'
      }
    ],
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',
      decs:''
    }],
    covers: [{
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
    }, {
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
      rotate: 180
    }],
    formatted_address: '',
    loading: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
  getLocation: function () {
    var that = this
    that.setData({
      loading: true
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // 设置地图
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude + '1'),
          markers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude + '1')
          }],
          covers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude + '1')
          }, {
            latitude: res.latitude,
            longitude: parseFloat(res.longitude + '1')
          }]
        })
        // 获取中文详细地址
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            adress: "星巴克",
            ak: config.baiduAK,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function (res) {
            // that.setData({
            //   markers: [{
            //     latitude: 0,
            //     longitude: 0,
            //     name: '我的位置',
            //     desc: "asdasdasd"
            //   }],
            //   formatted_address: "asdasdasd"
            // })
            that.setData({
              loading: false
            })
          },
          fail: function () {
            that.getLocation()
          }
        })
      }
    })
  },
  refreshLocation: function () {
    this.getLocation()
  }
})