var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		bannerList: config.bannerList,
    // 地图
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',
      desc: ''
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
	onLoad: function() {
		var that = this
		wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading()
		douban.fetchFilms.call(that, config.apiList.popular, that.data.start),

    this.getLocation();

	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		this.onLoad()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
		}
	},
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?id=" + data.id
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			// stype(searchType) 0:关键词, 1:类型标签
			var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
			wx.navigateTo({
				url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
			})
		}
	},
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
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