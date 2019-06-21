import _ from 'lodash';

import add from './add.js'
import num from './number.js'

import './style.css'

let parent = document.querySelector('#app')
add()
num()

if (module.hot) {
  module.hot.accept('./number.js', function() {
    parent.removeChild(document.querySelector('#num'))
    num()
   
  })
}

