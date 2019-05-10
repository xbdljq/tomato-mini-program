// pages/me/me.js
const { http } = require('../../libs/http.js');

Page({
  data: {
    tab: "tomato",
    tomatoes: {},
    todos: {},
    me: {}
  },
  onShow: function () {
    this.fetchTomatoes()
    this.fetchTodos()
    this.setData({ me: wx.getStorageSync('me') })
  },
  //我完成的任务
  fetchTomatoes() {
    http.get('/tomatoes', { is_group: "yes" })
      .then(response => {
        console.log(response)
        this.setData({ todos: response.data.resources })
      })
  },
  //番茄历史
  fetchTodos() {
    http.get('/todos', { is_group: "yes" })
      .then(response => {
        this.setData({ tomatoes : response.data.resources })
      })
  },
  changeTab(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: name })
  }
})