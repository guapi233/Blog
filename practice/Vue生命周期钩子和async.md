# Vue生命周期钩子和async

## 问题描述

在`mounted`生命周期钩子中无法访问`$refs`。



## 原因

我对`created`添加了`async`标记，在其中使用了`await`。

Vue的生命周期钩子是不支持`async`的，所以在`created`还在`await`卡着的时候，`mounted`会提前到`created`执行，这时候，因为我的页面中`ref`元素包含`v-if、v-for`等依赖于异步数据的指令，还没有加载完成，所以在`mounted`中显示`undefined`。



**至于为什么不支持`async`？**

> 不支持，因为整个 diff 和 render 的算法都是基于组件生命周期同步执行的前提下的。而且任意一个组件的生命周期可能异步推迟最后的渲染完成是绝对不应该出现的设计。    ——yyx990803    [#7333](https://github.com/vuejs/vue/issues/7333)



## 解决方案

1. 首先，将存放有异步方法的代码片段和存放有`ref`的代码片段放到同一个生命周期中，`created / mounted`都可以，因为一旦给它们加上`async`，就会如上所述的完全脱离原来的执行顺序
2. 通过`await`阻塞异步方法后面的代码片段，等待异步执行结束后再进行`ref`访问
3. 异步执行完后也不能立马访问`ref`，这是因为数据和视图不是同步执行的（[具体参考JavaScript EventLoop](https://github.com/guapi233/Blog/issues/2)），所以需要使用Vue提供的`$nextTick`将含有`ref`的代码片段包裹起来，等待本次执行的视图渲染完毕后，就可以调用`ref`了

