let $number = $('#number')


$('#addOne').on('click', function(){ 
  $number.text(+$number.text() + 1)
})

$('#minusOne').on('click', function(){
  $number.text(+$number.text() - 1)
})

$('#reset').on('click', function(){
  $number.text(0)
})