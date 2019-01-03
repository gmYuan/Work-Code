# 用CSS制作不规则图形

## 前言

最近做了一个用CSS实现皮卡丘的项目，主要涉及了CSS制作一些不规则图形的知识点，所以对其做一个小结

目录

1 [实现思路](#1)

2 [具体实现](#2)


## <span id="1">一 实现思路</span>

1 Q: 如何制作皮卡丘的脸部

A: S1 重置默认样式: 去除margin、padding + 盒模型为border-box

S2 body部分: 高度全屏 + 黄色背景 + flex布局(让脸部绝对居中)

S3 整体face部分: 设置宽高(border调试大法) + 相对定位(以让脸部其他部分相对它绝对定位)


2 Q: 如何制作皮卡丘的`扇形鼻子`

A: S1 先设置一个宽高 + border设置 + 变成圆形(border-radius)

S2 绝对定位位置(水平居中方法 + 垂直方向距离)

S3 分别设置4个方向的border(单个方向的border-width的值约为 之前width的一半) + 去掉宽高 + 只保留一个方向颜色，其他变成透明色


3 Q: 如何制作皮卡丘的`双圆眼睛`

A: S1 先是一个单圆形 width + height + border-radius + background + border(修饰效果)

S2 再画圆里面的内部圆 ::before/::after伪类 + 步骤同上

S3 外圆和小圆的位置定位: 都使用绝对定位 + top等属性


4 Q: 如何制作皮卡丘的 `圆形脸颊`

A: S1 单圆形步骤即可: width + height + border-radius + background + border(修饰效果)

S2 位置定位: 绝对定位即可


5 Q: 如何制作皮卡丘的 `不规则弧度 上嘴唇`

A: S1 设置宽高 + border

S2 设置 border-bottom-left-radius & border-bottom-right-radius值 制作弧度 + 角度转化(transform)摆放位置

S3 利用 绝对定位 设置位置


6 Q: 如何制作皮卡丘的下嘴唇舌头 + 隐藏上嘴唇部分的舌头

A: S1 明确实现方法: 就是一个很长的 隐藏了部分形状的椭圆

S2 创建椭圆: width + height + border-radius + border + background（舌头颜色）

S3 隐藏多余椭圆部分: 父容器设置width + height + 绝对定位 + overflow &  舌头部分绝对定位 

S4 隐藏上嘴唇部分的舌头: 用上嘴唇的背全局背景色，挡住舌头部分颜色即可


7 Q: 如何制作皮卡丘内部的`半扇形小舌头`

A: S1 利用伪类制作椭圆(一般图形内部还有图形，优先考虑用伪类实现) + bg(小舌头颜色)

S2 椭圆后绝对定位 + 父元素(下嘴唇舌头)overflow即可


8 Q: 如何实现同步显示皮卡丘 代码区 + 效果区

A: S1 代码区部分(wrapper + code) + 效果区部分(wrapper + prview) + style部分(设置id)

S2 设置代码区上部分 + 展示区下部分(flex布局 + 100vh即可)

S3 创建`同步函数writeCode`


9 Q: 如何实现 代码区固定显示50% + 自动下拉滚动效果

A: S1 代码区高度100%(确保和父容器所占高度一样) + overflow: hidden +  scrolltop=scrollHeight即可

S2 设置code-wrap: padding美化一下代码区



10 Q: 如何增加代码区显示变速功能

A: S1 html新增按钮button

S2 设置按钮样式: 绝对定位 + flex纵列布局 + 内外间距 + 激活样式


11 Q: 如何让 当前点击的变速按钮添加激活态

A: S1 通过事件委托,监听document的点击事件 + 获取 当前点击元素 和  变速按钮集合(类数组对象)

S2 判断点击元素，如果不是变速按钮，则直接退出(data-speed)

S3 点击按钮时，先遍历并去除去除按钮节点的active类 + 给当前按钮加上.active类


12 Q: 如何实现 代码显示的变速效果

A: S1 因为setInterval只能读取一次间隔时间，所以 用延时递归 的setTimeout代替 setInterval

S2 设置间隔时间遍量duration，每次读取data-speed时，根据其值更改 duration值(通过switch语句)


## <span id="2">二 具体实现</span>

1 第一版: 完成皮卡丘的制作显示

01 [HTML部分](https://github.com/gmYuan/WorkCode/blob/v1.0/08%20%E7%94%A8CSS%E5%88%B6%E4%BD%9C%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2-%E7%9A%AE%E5%8D%A1%E4%B8%98/index.html)

02 [CSS部分](https://github.com/gmYuan/WorkCode/blob/v1.0/08%20%E7%94%A8CSS%E5%88%B6%E4%BD%9C%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2-%E7%9A%AE%E5%8D%A1%E4%B8%98/css/default.css)


2 第二版: 调速版皮卡丘

01 [HTML部分](https://github.com/gmYuan/WorkCode/blob/v2.0/08%20%E7%94%A8CSS%E5%88%B6%E4%BD%9C%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2-%E7%9A%AE%E5%8D%A1%E4%B8%98/index.html)

02 [CSS部分](https://github.com/gmYuan/WorkCode/blob/v2.0/08%20%E7%94%A8CSS%E5%88%B6%E4%BD%9C%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2-%E7%9A%AE%E5%8D%A1%E4%B8%98/css/default.css)

03 [JS部分](https://github.com/gmYuan/WorkCode/blob/v2.0/08%20%E7%94%A8CSS%E5%88%B6%E4%BD%9C%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2-%E7%9A%AE%E5%8D%A1%E4%B8%98/js/main.js)

