# icon类型样式

## 目录

1 [预读文档](#1)

2 [icon类型样式](#2)
 
  - [2.1 逻辑步骤&代码实现](#2.1)



## <span id="1">一 预读文档 </span>

阅读文档有: 

01.1 [通俗地解析background属性](https://github.com/lulujianglab/blog/issues/25)

阅读原因: 具体分析了bg-size 和 bg-position难点

01.2 [MDN- background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)

阅读原因: 非常好的可读性，有具体示例


02 [CSS Background属性详解](https://github.com/junruchen/junruchen.github.io/wiki/CSS-Background%E5%B1%9E%E6%80%A7%E8%AF%A6%E8%A7%A3)

阅读原因: 知识点比较全面，但是可读性一般


03 [css3 background背景属性详解](http://jessyhong.top/2018/03/23/css-background/)

阅读原因: 介绍了多重背景图片的结合使用示例


04 [CSS Sprite雪碧图应用](http://vince.xin/article/5acc326d6b78214ab8ac58b3)

阅读原因: 介绍了雪碧图的相关知识和自动生成工具



## <span id="2">二 icon类型样式 </span>

### <span id="2.1"> 2.1 逻辑步骤&代码实现 </span>

1 Q: icon类型显示的逻辑步骤是什么

A: 主要是通过background-image相关属性设置的

S1 设置i为 块级+固定宽高+margin-right，以确定 bg-color的整个显示大小

S2 使用bg-image    以引入背景图片

S3 设置bg-size     以确定背景图的宽高(一般只有设一个值 + 数值是相对于背景图裁剪的)
  
S4 设置bg-repeat   以防止 容器宽度较大+背景图宽高较小时，会自动重复 显示背景图

S5 设置bg-pisition 以设置背景图左上角相对于容器左上角距离 / 雪碧图中某个图标的定位


2 Q: 如何在背景图上设置遮罩层

A: S1在图片容器设置 ::after

S2 设置content + absolute定位+z-index  + width&height: 100% 

S3 设置bg-image + bg-size + bg-repeat等背景属性



3 Q: 具体参考代码的实例

A: 可参考[QQ音乐移动端- rank页]()
