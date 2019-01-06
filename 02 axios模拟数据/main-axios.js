
$('#addOne').on('click', function(){ 
  let number = + $('#number').text() + 1
  $('#number').text(number)
})

$('#minusOne').on('click', function(){
  let number = + $('#number').text() - 1
  $('#number').text(number)
})

$('#reset').on('click', function(){
  $('#number').text(0)
})

// 反思小结:
  // 1. 尽量避免使用全局变量，多使用局部变量
  // 2. 对于text()这种可赋值/可获取的方法，可以先获取存入变量，再通过对象方法赋值