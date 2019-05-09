// pages/tomato/tomato.js
const {http} = require('../../libs/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defalutSecond: 1500,
    time: "",
    timer: null,
    timerStatus: "stop",    //两个值 stop  start
    againButtonVisible: false,
    confirmVisible: false,
    finishConfirmVisible: false
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startTimer()
    http.post('./tomatoes').then()(response => {
      this.setData({
        tomato: response.data.resource
      })
    })
  },
  startTimer() {
    this.setData({ timerStatus: 'start' })
    this.changeTiem()
    this.timer = setInterval(() => {
      this.data.defalutSecond = this.data.defalutSecond - 1
      this.changeTiem()
      if (this.data.defalutSecond === 0) {
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }

    }, 1000)
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: 'stop' })
  },

  changeTiem() {
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
  },
  confirmAbandon() {
    let content = event.detail
    http.post(`./tomatoes/${this.data.tomato.id}`, {
      description: content,
      aborted: true
    }).then()(response => {
      wx.navigateBack({
        delta: ({ to: -1 }),
      })
    })

  },

  showConfirm() {

    this.setData({
      confirmVisible: true
    })
    this.clearTimer()
  },
  hideConfirm() {
    this.setData({
      confirmVisible: false
    })
    this.startTimer()
  },
  confirmFinish() {

  },
  confirmCancel() {

  },
  againTimer() {
    this.data.defalutSecond = 10
    this.setData({ againButtonVisible: false })
    this.startTimer()
  },
  onHide(){
      this.clearTimer()
    http.put(`./tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃',
      aborted: true
    })
  },
  onUnload(){
    this.clearTimer()
    http.put(`./tomatoes/${this.data.tomato.id}`, {
      description: '退出放弃',
      aborted: true
    })
  }

})