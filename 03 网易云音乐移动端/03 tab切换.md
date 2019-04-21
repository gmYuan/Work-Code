# Tab切换

目录

1 [需求描述 & 实现步骤](#1)


## <span id="1"> 1 需求描述 & 实现步骤 </span>

1 Q: Tab切换的有哪些功能需求

A: S0 标签高亮 + 内容替换

S1 点击tab标签，点击的标签高亮 + 其他标签不高亮

S2 点击tab标签，切换对应的 tab页面显示


2 Q: 如何实现 tab标签高亮

A: S0 事件委托 + 高亮态切换.active

S1 获取目标元素，用事件委托 监听标签的点击事件

S2 高亮态当前点击标签 + 去除其他所有兄弟的高亮态


3 Q: 如何实现 点击tab标签，页面内容切换到对应tab内容

A: S0 data-tabname属性钩子 + 内容激活态.show

S1 在每个tab标签上设置钩子data-tabname，其值分别和 对的应tab内容容器类名相同

S2.1 事件监听标签的 点击事件，获取该点击标签的 data-tabname值

S2.2 利用发布订阅，标签点击后，发布tabselect事件 传出data-tabname值

S2.3 各tab内容js文件分别订阅tabselect事件，根据传入的data-tabname值判断是否显示内容  

