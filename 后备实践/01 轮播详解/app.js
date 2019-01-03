(function (){
  let slider = new Slider("#slider", {
    slides: [
      { link: '#1', image: './pic1.jpg' },
      { link: '#2', image: './pic2.jpg' },
      { link: '#3', image: './pic3.jpg' },
      { link: '#4', image: './pic4.jpg' }
    ]
  })  

  window.slider = slider
  
})()
