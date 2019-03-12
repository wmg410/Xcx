 var config = require('comm/script/config')
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // 获取用户信息
    this.getUserInfo()
    //初始化缓存
    this.initStorage()
  },
  getUserInfo(cb) {
    var that = this
    wx.getSetting({
      success: res => {
        wx.login({
          success: res => {
            success: res => {
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getCity: function(cb) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            config.city = res.data.result.addressComponent.city.slice(0,-1)
            wx.setStorage({
              key: 'location',
              data: res.data.result.location
            })
            typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0,-1))
          },
          fail: function(res) {
            // 重新定位
            that.getCity();
          }
        })
      }
    })
  },
  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {                   
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  }
})