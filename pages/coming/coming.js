var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
	data: {
		selected:true,
    selected1:false,
    bannerList: config.bannerList,
    currentIndex: 0
	},
  selected:function(e){
    var that = this
    that.setData({
      selected:true,
      selected1:false
    })
  },
  selected1:function(e){
    var that = this
    that.setData({
      selected:false,
      selected1:true
    })
  },
	onLoad: function() {
		var that = this
		douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
	},
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
		}
	}
})