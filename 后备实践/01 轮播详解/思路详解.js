window.onload = function(){

	// SO 全局使用变量
	var piclength = 4;       //轮播图片数量
	var buttonIndex = 1;     //分页器按钮数量
	var moving = false       //S4.4 动画运动状态，默认未移动

	var timer                // S5.1 全局变量 计时器
	var slider = document.querySelector("#slider")


	//S1 实现 点击箭头切换图片的效果
	var piclists = document.querySelector('#pic-wrap')     //S1.1 获取目标元素
	var perv = document.querySelector("#prev")
	var next = document.querySelector("#next")

	next.onclick = function (){    //S1.2 监听事件，切换图片容器 left值

		if (!moving){
			switchPic(-400)       // 只有未在移动中，即moving为假时，才 执行运动
		}

		if (buttonIndex === 4) {     //S2.4 修复buttonsIndex 一直增加bug
			buttonIndex = 1
		} else {
			buttonIndex += 1
		}
		showButton()
	}

	perv.onclick = function() {
		if (!moving){
			switchPic(400)
		}
	
		if (buttonIndex === 1) {     //S2.4 修复buttonsIndex 一直减少bug
			buttonIndex = 4
		} else {
			buttonIndex -= 1
		}
		showButton()
	}

	function switchPic(offset){    //S1.3 自动切换图片的函数
		var newLeft = parseInt(piclists.style.left) + offset

		moving = true

		var duration = 300   // S4.1 运动的总时长
		var delay = 10        // 每次运动的时长
		var frequency = duration / delay    // xxxms内可运动的次数，即频率
		var speed = offset / frequency     // 每次运动的长度 (每帧运动的长度)
		
		function go(){
			if (speed < 0 && newLeft < parseInt(piclists.style.left) || speed > 0 && newLeft > parseInt(piclists.style.left)){
				piclists.style.left = `${parseInt(piclists.style.left) + speed}px`
				setTimeout(go,delay)    //S4.2 逐次增加移动距离
			}
			else {
				piclists.style.left = `${newLeft}px`
	    
	    	if (newLeft < -400 * piclength) {   //S1.4 修复点击空白bug
	    		piclists.style.left = '-400px'
	    	}
	    	if (newLeft > -400) {
	    		piclists.style.left = `${-400 * piclength}px`
				}
				moving = false
			}
		}
		go()    //S4.3 移动图片时 默认调用动画效果
	}

	//S2 点击箭头时 圆点跟随切换
	var buttons = document.querySelectorAll("#paga > span") //S2.1 获取圆点元素
	function showButton(){
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].className === "on"){
				buttons[i].className = "";                  //S2.3 清除之前所有的状态属性
			}
		}

		buttons[buttonIndex - 1].className = "on"     //S2.2 当前分页器 添加属性状态 
	}


	// S3 点击圆点，随之切换图片
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(){  //S3.1 遍历按钮，监听每个圆点的事件
			if (this.className === "on"){    //S3.4 优化代码，避免多余执行
				return;
			}

			// console.log(this)，事件中的this指向触发事件的DOM元素
			var goalIndex = parseInt(this.dataset.index)
			var distance = -400 * (goalIndex - buttonIndex)
			// console.log(distance)   S3.2 获取切换图片的移动距离
			
			if (!moving){
				switchPic(distance)      //S3.3 移动图片+重置索引+亮起按钮
			}
			buttonIndex = goalIndex
			showButton()
		}
	}

	// S5 实现自动轮播功能
	function autoplay(){
		timer = setInterval(function(){
			next.onclick()
		},3000)
	}

	function stopplay(){
		clearInterval(timer);
	}

	slider.onmouseover = stopplay;
	slider.onmouseout = autoplay;
	autoplay();







}