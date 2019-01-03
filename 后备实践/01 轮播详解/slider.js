function Slider(ele, options = {}){
  
  // S1 定义默认配置，当未传入实参时调用 默认配置
  let defaults = {
    arrows: true,
    buttons: true,
    autoPlay: true,

    Picwidth: 400,  //一张图片宽度
    times: 3000,   // 切换图片 动作间隔时间
    interval: 10,  // 切换一张过程中，移动一帧的间隔时间
    speed: 20      // 1s内移动的 总帧数
  }

  for (let i in defaults){
    if (typeof options[i] === "undefined") {
      options[i] = defaults[i]
    }
  }

  // S2.1 设置变量
  this.params = options
  this.$el = document.querySelector(ele)
  this.slides = options.slides
  this.Picwidth = options.Picwidth
  this.length = this.slides.length   //轮播图片张数

  this.index = 1  //用于 分页器按钮索引
  
  this.isMove = false  // 用于防止连续多次点击 造成的问题
  this.timer = null   // 用于 自动播放时的 定时器

  this.init()
}

Slider.prototype = {

  // S2.2 设置要调用的方法&调用情况
  init: function(){
   this.render()
   this.clonePic()

   if (this.params.arrows) {
     this.showArrows()     //显示左右箭头
   }

   if (this.params.buttons) {
      this.createButton()    // 显示按钮元素
      this.showButton()      // 默认调用按钮显示
      this.ctrlButton() 
   }

   if (this.params.autoPlay) {
    this.autoPlay()         //自动轮播
   }


  },

  // S3 该方法 用于设置 容器图片部分
  render: function() {
    this.$el.innerHTML = `<div id="pic-wrap" class="pic-wrap" style="left: -400px"></div>`
    this.$wrap = this.$el.firstElementChild
    this.$wrap.style.width = `${(this.length + 2) * this.Picwidth}px`

    this.$wrap.innerHTML = this.slides.map(slide => 
      `<div class="slider-item">
        <a href="${slide.link}">
          <img src="${slide.image}">
        </a>
      </div>`
    ).join('')
  },

  // S4 该方法 用于复制&插入 首尾辅助图片
  clonePic: function() {
    let $firstPic = document.createElement("div")
    let $lastPic = document.createElement("div")

    $firstPic.className = "slider-item"
    $lastPic.className = "slider-item"

    $firstPic.innerHTML = this.$wrap.firstElementChild.innerHTML
    $lastPic.innerHTML = this.$wrap.lastElementChild.innerHTML

    this.$wrap.appendChild($firstPic)
    this.$wrap.insertBefore($lastPic, this.$wrap.firstElementChild)
  },


  // S5 该方法 用于实现按钮切换功能
  showArrows: function() {
    let $arrWrap = document.createElement("div")
    $arrWrap.className = "arr-wrap"
    $arrWrap.innerHTML = `
    <a href="javascript:;" class="arrow prev" id="prev">&lt;</a>
    <a href="javascript:;" class="arrow next" id="next">&gt;</a>
    `
    this.$el.appendChild($arrWrap)

    this.$prev = document.querySelector("#prev")
    this.$next = document.querySelector("#next")

    this.$prev.onclick = () => {
      if (!this.isMove) {
        this.animate(this.Picwidth)
    
        // 修复切换图片时按钮index无限增加的bug
        if (this.index === 1){
          this.index = this.length
        } else {
         this.index -= 1
        }
        // console.log("prev中："+this.index)
        this.showButton()
      }
    }

    this.$next.onclick = () => {
      if (!this.isMove) {
        this.animate(-this.Picwidth)

        // 修复切换图片时按钮index无限增加的bug
        if (this.index === this.length){
          this.index = 1
        } else {
          this.index += 1
        }
        // console.log("next中：" + this.index)
        this.showButton()
      }
    }

  },


  // S7.1 该方法用于实现  创建+插入分页器按钮元素
  createButton: function() {
    let paga = document.createElement("div")
    paga.className = "paga clearfix"
    paga.id = "paga"
    paga.innerHTML = `
      <span data-index="1" class="on"></span>
      <span data-index="2"></span>
      <span data-index="3"></span>
      <span data-index="4"></span>
    `
    this.$el.appendChild(paga)
    this.$buttons = document.querySelectorAll("#paga > span")   //初始化按钮
  },

  // S7.2 按钮跟随 图片切换显示
  showButton: function() {
    for (let i=0; i < this.$buttons.length; i++){
      if (this.$buttons[i].className === "on") {
        this.$buttons[i].className = ""
      }
    }
    this.$buttons[this.index - 1].className = "on"
  },

  // S7.3 实现按钮切换图片的 功能
  ctrlButton: function() {
    let self = this

    for (let i = 0; i < this.length; i++) {
      this.$buttons[i].onclick = function(){
        if (self.isMove){
          return;
        }
  
        if (this.className === "on"){
          return;
        }

        let goalIndex = parseInt(this.dataset.index)
        let distance = -self.Picwidth * (goalIndex - self.index)
        self.animate(distance)

        self.index = goalIndex
        // console.log("ctrl中：" + self.index)
        self.showButton()
      }
    }
  },

  // S8 实现自动播放图片的功能
  autoPlay: function() {
    let play = () => this.timer = setInterval(this.$next.onclick,this.params.times)
    let stop = () => clearInterval(this.timer)

    play()

    this.$el.onmouseover = stop
    this.$el.onmouseout = play
  },


    
  // S6 该方法用于 定义动画函数
  animate: function(offset) {
    let newLeft = parseInt(this.$wrap.style.left) + offset
  
    this.isMove = true
  
    if (offset < 0) {
      //加一个传入参数处理步骤，确保一定是正数数字
      this.params.speed = - Math.abs(this.params.speed) 
    } else {
      this.params.speed = Math.abs(this.params.speed)  
    }

    move = () => {
      if (offset < 0 && parseInt(this.$wrap.style.left) > newLeft || offset > 0 && parseInt(this.$wrap.style.left) < newLeft) {
        this.$wrap.style.left  = `${parseInt(this.$wrap.style.left) + this.params.speed}px`
        setTimeout(move,this.params.interval)  //未达之前不断调用

      } else {
        this.isMove = false

        this.$wrap.style.left = newLeft + 'px'
        // console.log( this.$wrap.style.left)
      
        if (newLeft < -this.length* this.Picwidth) {
          this.$wrap.style.left = `${-this.Picwidth}px`
        } else if (newLeft > -this.Picwidth) {
          this.$wrap.style.left = `${-this.length * this.Picwidth}px`
          }
      }
    }
    move()
  }


}