var config = require('../../comm/script/config')
var app = getApp();
Page({
  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gridList: [
      {enName:'setting', zhName:'设置'}
    ],
    skin: ''
  },
  
  onLoad:function(cb){
    var that = this
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    typeof cb == 'function' && cb()
  },
  getUserInfo: function (e) {
    var that = this
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShow:function(){
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res){
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url:data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "skin/skin"
		})
  }
})