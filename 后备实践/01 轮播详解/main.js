window.onload = function() {
	var slider = document.querySelector("#slider")
	var list = document.querySelector("#pic-wrap")
	var buttons = document.querySelectorAll("#paga > span")
	var prev = document.querySelector("#prev")
	var next = document.querySelector("#next")
	
	var buttonIndex = 1
	var picLength = 4
	var timer
	var interval = 3000
	var moved = false


	function animate (offset) {
		if (offset === 0) {
			return;
		}
		moved =true

		var newLeft = parseInt(list.style.left) + offset
		var duration = 300   //位移 一张图片的总时间
		var delay = 10       //位移 一帧所需的时间
		var speed = offset/(duration/delay)  // 每帧运动距离，距离/帧数

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, delay);//递归
            } else {
            	 list.style.left = newLeft + "px" 
					if (newLeft < -400 * picLength){
						list.style.left = "-400px"
					} else if (newLeft > -400) {
						list.style.left = `${-400 * picLength}px`
					}
				moved = false
				}
            }
        go()
	}

	function showButton() {
		for (var i = 0; i < buttons.length; i++){
			if (buttons[i].className = "on"){
				buttons[i].className = ""
			}
		}
		buttons[buttonIndex - 1].classList.add("on")
	}


	function autoplay(){
		timer = setInterval(function(){
			next.onclick()
		},3000)
	}

	function stop(){
		clearInterval(timer)
	}



	prev.onclick = function(){
		if (moved) {
			return
		}

		animate(400)

		buttonIndex -= 1
		if (buttonIndex < 1){
			buttonIndex = picLength
		}
		showButton()
	}

	next.onclick = function(){
		if (moved){
			return
		}

		animate(-400)

		buttonIndex += 1
		if (buttonIndex > picLength){
			buttonIndex = 1
		}
		showButton()
	}

	for (var i=0; i < buttons.length; i++){
		buttons[i].onclick = function(){
			if (moved){
				return;
			}

			if (this.className === "on"){
				return;
			}

			var goalButton = parseInt(this.dataset.index)
			var distance = -400 * (goalButton - buttonIndex)
			animate(distance)

			buttonIndex = goalButton
			showButton()
		}
	}

	slider.onmouseover = stop;
	slider.onmouseout = autoplay;
	
	autoplay();
}