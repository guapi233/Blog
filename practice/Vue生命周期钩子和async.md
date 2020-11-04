# Vue生命周期钩子和async

## 问题描述

在`mounted`生命周期钩子中无法访问`$refs`。



## 原因

我对`created`添加了`async`标记，在其中使用了`await`。

Vue的生命周期钩子是不支持`async`的，所以在`created`还在`await`卡着的时候，`mounted`会提前到`created`执行，这时候，因为我的页面中`ref`元素包含`v-if、v-for`等依赖于异步数据的指令，还没有加载完成，所以在`mounted`中显示`undefined`。



**至于为什么不支持`async`？**

> 不支持，因为整个 diff 和 render 的算法都是基于组件生命周期同步执行的前提下的。而且任意一个组件的生命周期可能异步推迟最后的渲染完成是绝对不应该出现的设计。    ——yyx990803    [#7333](https://github.com/vuejs/vue/issues/7333)