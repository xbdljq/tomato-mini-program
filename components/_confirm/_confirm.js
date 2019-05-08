// components/_confirm/_confirm.js
Component({
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type: Boolean,
      value: false
    },
    
  },
  data: {
      value:""
  },
  methods: {
    confirm(){
      //向父组件传值
      this.triggerEvent('confirm',this.data.value)

    },
    cancel(){
      this.triggerEvent('cancel', "取消")
    },
    watchValue(event){
      this.data.value = event.detail.value

    }
  }
})