let view = new Vue({
  el: "#app",
  data: {
    seen: true
  },
  
  template: `
   <div>
     <button v-on:click="toggle"> 点我 </button>
     <p v-if="seen"> 你好你好 </p>
   </div>
  `,
  
  methods: {
    toggle(){
      this.seen = !this.seen
    }
  }  // 对应methods
})