# 左logo右列表的header样式

目录

1 [左logo右header的实现步骤](#1)

2 [代码参考](#2)



## <span id="1"> 1 左logo右header的实现步骤 </span>

1 Q: 左logo右header的实现步骤是什么

1 A: 

S0 html结构分别为:

```html

[header-wrap]

header
  .inner-wrap
    .logo-wrap
      a.logo
        img
    .lists
      ul
        li
	  a
	
````
S1 .header-wrap部分: 可选设置margin

S2 .header部分:      设置padding + width + 公有background

S3 .inner-wrap部分:  设置width&height + padding&margin +  布局flex&对齐方式 

S4 .logo-wrap部分:   设置margin + padding

S5 a.logo部分: 	     设置block + width&height&line-height + color

S6 img部分:          设置block + max-width: 100%


S7 .lists部分:        设置margin

S8 .lists ul部分:     设置flex水平排列

S9 .lists ul li部分:  设置 line-height

S10 li > a部分:       设置 block + padding + color部分



## <span id="2">2 代码参考 </span>

1 Q: 参考代码是什么

1 [cNode的 header部分]()

参考原因: 左logo+右列表的 样式显示








