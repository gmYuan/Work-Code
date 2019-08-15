
1 Q: 如何不通过第3方组件，实现tab切换

A:

S1 获取tab切换数组，用于遍历渲染: tabList

S2 动态显示激活态: 当前tabIndex === index  + 点击tab时，让tabIndex赋值等于 对应的index值即可

S3 tab内容，可以根据当前tabIndex的值来控制隐藏/显示


示例代码: