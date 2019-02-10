let view = new Vue({
  el: "#app",
  data: {
    transvalue: ''
  },
  
  template: `
   <div>
     <div class="wrap">
       <div class="slides" 
         v-bind:style = "{transform: transvalue}">
       </div>
     </div>
     <div>
       <button v-on:click = "go(0)">1</button>
       <button v-on:click = "go(1)">2</button>
       <button v-on:click = "go(2)">3</button>
     </div>
   </div>
  `,
  
  methods: {
   go(index){
     this.transvalue = `translate(${index * -100}px)`
  
    }
  }  // 对应methods
})