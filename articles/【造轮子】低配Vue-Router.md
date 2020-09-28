# 【造轮子】低配Vue-Router

Vue Router 是 [Vue.js](http://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

本文将从零实现一个低配的Vue-Router，了解Vue-Router的核心原理。



## 目前完成的功能

* 核心原理（hash）：Router 状态的监听与变化
* router-view 组件



## 运行时流程

http://naotu.baidu.com/file/a6ec3b1b3c2168fa09b5950e1070adfa?token=951c78297a167f6a



## 编写 install 方法



## 编写 createMatcher 方法



## 编写 createRouteMap 方法



## 编写浏览器历史相关代码



## 编写 Router-Link & Router-view



## beforeEach 实现

current：当前路由信息对象，

_route：响应式的当前路由信息对象，被router-view所引用