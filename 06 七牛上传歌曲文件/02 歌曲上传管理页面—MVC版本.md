# 歌曲上传管理页面 MVC版本

目录

1 [预读文档](#1)

2 [main部分- MVC](#2)

3.1 [aside— title部分— MVC](#3.1)

3.2 [aside— songlist部分— MVC](#3.2)

3.3 [aside— upload部分— MVC](#3.3)


## <span id="1"> 一 预读文档 </span>

阅读文档

1 [admin 页面](https://xiedaimala.com/tasks/154ed19d-c52e-4654-a488-5e9961c9b6d0)

阅读原因: admin页面的完成参考


## <span id="2"> 二 main部分- MVC </span>

1 Q: 如何用MVC渲染 main部分

A: S1 新建并进入 songForm.js

S2 创建局部作用域以形成 模块化

S3 创建MVC3个对象 + 调用C的 init方法

S4.1 view的属性和方法有: el属性 + template属性 + render方法

S4.2 model的属性和方法有: fetch方法 + update方法等

S4.3 controller属性方法有: 引入view + model属性 + init方法


2 具体代码，可参考 [网易音乐- main部分 MVC](https://github.com/gmYuan/163-music/blob/master/src/js/songForm.js)


## <span id="3">  3.1 aside— title部分— MVC </span>

1 Q: 如何用MVC渲染 aside— title部分

A: S1 新建并进入 songTitle.js

S2 创建局部作用域以形成 模块化

S3 创建MVC3个对象 + 调用C的 init方法

S4.1 view的属性和方法有: el属性 + template属性 + render方法

S4.2 model的属性和方法有: fetch方法 + update方法等

S4.3 controller属性方法有: 引入view + model属性 + init方法


2 具体代码，可参考 [网易音乐- asideTitle部分 MVC](https://github.com/gmYuan/163-music/blob/master/src/js/songTitle.js)


## <span id="3">  3.2 aside— songlist部分— MVC </span>

1 Q: 如何用MVC渲染 aside— songlist部分

A: S1 新建并进入 songList.js

S2 创建局部作用域以形成 模块化

S3 创建MVC3个对象 + 调用C的 init方法

S4.1 view的属性和方法有: el属性 + template属性 + render方法

S4.2 model的属性和方法有: fetch方法 + update方法等

S4.3 controller属性方法有: 引入view + model属性 + init方法


2 具体代码，可参考 [网易音乐- aside-songlist部分 MVC](https://github.com/gmYuan/163-music/blob/master/src/js/songList.js)


## <span id="3">  3.3 aside— songUpload部分— MVC </span>

1 Q: 如何用MVC渲染 aside— songupload部分

A: S1 新建并进入 songUpload.js

S2 创建局部作用域以形成 模块化

S3 创建MVC3个对象 + 调用C的 init方法

S4.1 view的属性和方法有: el属性

S4.2 model的属性和方法有: fetch方法 + update方法等

S4.3 controller属性方法有: 引入view + model属性 + init方法 + initQiniu()方法


2 具体代码，可参考 [网易音乐- aside-songlist部分 MVC](https://github.com/gmYuan/163-music/blob/master/src/js/songUpload.js)