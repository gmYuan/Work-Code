# 读取本地JSON文件方法

## 前言

本篇博文是读取本地JSON文件方法 的小结，仅做自己记录之用。

目录

1 [实现思路](#1)

2 [具体实现](#2)


## <span id="1">一 实现思路</span>

1 Q: 如何获取其他网站的AJAX接口的JSON文件

A: S1 通过 Chrome开发工具—— network—— XHR下目标文件—— Response,放入JSON文件夹的 rec.json文件中


2 Q: 如何读取本地的JSON文件内容

A: S1 fetch全局方法读取本地文件路径 + 调用res.json()方法以把网络响应转为话JSON格式

S2 读取返回的json文件对应的属性值`json.data.slider`, 通过map()方法返回一个 新对象slides

S3 render函数中还调用了 Slider类，从而创建类的实例


## <span id="2">二 具体实现</span>

1 JS部分

```js
(function () {
  fetch("../json/rec.json")
    .then( (response) => response.json() )
    .then(render)

  function render(json) {      // json是上一步骤的传入的
    let slides = json.data.slider.map(slide => {
      return { link:slide.linkUrl, image:slide.picUrl }
    })

    new Slider({
      el: document.querySelector("#slider"),
      slides: slides
    })

  }

})()
```