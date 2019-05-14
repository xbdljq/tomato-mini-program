//app.js
      // {
      //   "pagePath": "pages/test/test",
      //   "text": "数据统计",
      //   "iconPath": "images/total.png",
      //   "selectedIconPath": "images/total-active.png"
      // },
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    host: 'https://gp-server.hunger-valley.com',  //照抄
    test_host:'https://gp-server.hunger-valley.com',
    app_id: "wxc38bb67c0a8fd0c9",
    app_secret: "6e9859580d75e0ba67e63fd62d48f9eb",
    t_app_id: "CnVBJQzoJDkNVkXY1piA8ooy",
    t_app_secret: "REDfddGPyj1KtzeWP5DqFAjd"
  }
})