// pages/tomato/tomato.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defalutSecond:1500
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
  changeTiem(){
    let m = Math.floor(this.data.defalutSecond / 60)
    let s = Math.floor(this.data.defalutSecond % 60)
    if (s === 0) {
      s = "00"
    }
    if ((s + "").length === 1) {
      s = "0" + s
    }
    if ((m + "").length === 1) {
      m = "0" + m
    }
    this.setData({ time: `${m}:${s}` })
  }

  


})