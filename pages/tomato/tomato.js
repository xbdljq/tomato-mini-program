// pages/tomato/tomato.js
const { http } = require('../../libs/http.js');

Page({
  timer: null,
  tomato: {},
  data: {
    defalutSecond: 1500,
    time: "",
    timerStatus: 'stop',
    confirmVisible: false,
    againButtonVisible: false,
    finishConfirmVisible: false,
    tomato: {}
  },
  onLoad() {
    wx.vibrateLong()
  },
  onShow: function () {
   // this.startTimer()
    http.post('/tomatoes').then(response => {
      this.setData({ tomato: response.data.resource })
    })
    if (this.data.defalutSecond) {
      this.startTimer()
    }
  },
  startTimer() {
    this.setData({ timerStatus: 'start' })
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.defalutSecond = this.data.defalutSecond - 1
      this.changeTime()
      if (this.data.defalutSecond <= 0) {
        wx.vibrateLong()
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    }, 1000)
  },
  againTimer() {
    this.setData({ defalutSecond: 1500 })
    this.setData({ againButtonVisible: false })
    this.startTimer()
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: 'stop' })
  },
  changeTime() {
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
  confirmAbandon(event) {
   
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content,
      aborted: true
    })
      .then(response => {
           wx.navigateBack({ to: -1 })
          //this.setData({finishConfirmVisible:false}) 
      })
  },
  //完成倒计时
  confirmFinish(event) {
    clearInterval(this.timer)
    
    let content = event.detail
    if(content){
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: content,
        aborted: false
      }).then(response => {
        this.setData({ finishConfirmVisible: false }) 
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
        //wx.reLaunch({ url: '/pages/home/home' })
      })
    }else{
      wx.showModal({
        title: '',
        content: '请输入完成的内容',
        showCancel:false
      })
    }
   
  },
  confirmCancel(event) {
    this.setData({ finishConfirmVisible: false })
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content,
      aborted: true
    })
      .then(response => {
        // wx.reLaunch({ url : '/pages/home/home'})
      })
  },
  showConfirm() {
    this.setData({ confirmVisible: true })
    this.clearTimer()
  },
  hideConfirm() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  onHide() {
    if (this.data.defalutSecond) {
      this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
    }
    
  },
  onUnload() {
    if (this.data.defalutSecond) {
      this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })

    }
    
  },
})