# Tab组件实现详解

## 前言

最近实现了一个Tab组件功能，所以对其做一个小结

目录

1 [实现思路](#1)

2 [具体实现](#2)


## <span id="1">一 实现思路</span>

1 创建nav，其中包含:  ul + li 的tab头部标签，使其水平排列(flex布局)

2 创建div，内容包括 以后会切换显示的tab内容 + 默认隐藏其他tab内容

3 事件委托：

S1 监听整个文档的点击事件，如果当前触发事件元素不是指定的元素(通过data-role)，则直接退出以提高性能

S2 通过当前点击的tab标签，之后获取并展示对应的tab内容(和class相同的data-view) + 隐藏兄弟内容

S3 通过当前点击的tab标签，之后获取并激活对应的tab标签 + 去除兄弟标签样式


## <span id="2">二 具体实现</span>

1 HTML部分

```html
  <nav class="navbar">
    <ul class="bar-list">
      <li class="bar-item actived" data-role="tab" data-view=".rec-view">推荐</li>
      <li class="bar-item" data-role="tab" data-view=".rank-view" >排行榜</li>
      <li class="bar-item" data-role="tab" data-view=".search-view">搜索</li>
    </ul>
  </nav>

  <div>
    <div class="rec-view">
      <!-- 轮播部分｛ -->
      <div class="qq-slider" id="slider"></div>
    </div>

    <div class="rank-view hide">排行榜</div>
    <div class="search-view hide">搜索</div>
  </div>
```

2 SCSS部分

```scss
.navbar {
  & .bar-list {
    display: flex;
    justify-content: center;
    text-align: center;
    & .bar-item {
      position: relative;
      flex: 1;
      height: $bar-height;
      line-height: $bar-height;
      color: $bar-color;
      background: $bar-background;
      &.actived {
        color: $bar-active;
        &::after{
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: $bar-active;
        }
      }
    }
  }
}
```

3 JS部分

```js
document.addEventListener('click', function(e){
  let target = e.target

  if (target.dataset.role !== 'tab'){
    return          // 3.S1 如果当前触发事件元素 不是指定的元素(通过data-role)，则直接退出
  }
  
  // 3.S2 通过当前点击的tab标签，之后获取并展示对应的tab内容(和class相同的data-view) + 隐藏兄弟内容
  let tabContent = document.querySelector(target.dataset.view)
  if (tabContent){
    [].forEach.call(tabContent.parentElement.children, (child) => {
      child.style.display = "none"
    })
    tabContent.style.display = "block"
  }

  // 3.S3 通过当前点击的tab标签，之后获取并激活对应的tab标签 + 去除兄弟标签样式
  [].forEach.call(target.parentElement.children, tabLi=> {
    tabLi.classList.remove("actived")
  })
  target.classList.add("actived")

})
```









