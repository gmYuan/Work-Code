# 多重return含义

目录

1 [多重return含义](#1)


## <span id="1">一 多重return含义 </span>


1 Q: 一个函数里，返回一个函数，这个函数内部还有一个return，是什么意思

A: S1 如果没有外层return，默认函数返回值是 undefined

S2 如果没有内层return，内部函数返回值是 undefined

S3 所以，return的作用就是 给调用函数的变量一个值，而不是undefined

```js
test = {
  name: 'ygm',
  sayName(job){
    let foo = function(){
      return this.name + job
    }
    return foo  // S1~S2
  }

}

test.sayName(12)

// S1 无return，返回 undefined
// S2 有return，返回 foo内部函数
```