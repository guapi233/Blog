# Vue3更新内容汇总

嗨呀，扭扭捏捏还是打算写来下来，加深印象。



## Vue2中存在的问题

1. 随着组件原来越大，功能项越来越多，可读性和可维护性急速下降
   * 最直接的表现就是**数据与行为的分离**，数据放`data`，行为放`method`，这样功能一多，加上其他的`watch、computed`等，会使代码看起来混乱不堪
2. 重用逻辑代码困难
   * mixins：来源不明，有被覆盖的可能
   * mixin factories：没用过，不过也存在问题，比如无法得知内部向外暴露的内容
   * 作用域插槽：代码可读性极差
3. 对TS支持有限



## composition API

**基于上面提到的1，2点，最重要的更新诞生了**



### setup与ref

* `ref`需要从`vue`中导入

* `setup`的生命周期被提到了第一位（早于`beforeCreate`）
* `ref()`返回一个Proxy对象，在js中访问内容必须要`.value`，模板中不用



### methods

* 可以在其他地方创建，只需要在`setup`中返回即可



### computed

* 需要从`vue`中导入 
* 是一个函数，接收一个回调参数，在其中编写计算内容



### reactive

* 需要从`vue`中引入
* 和`ref`作用类似，用来返回一个Proxy对象，不过它的参数是一个对象



### modularizing

利用composition API的特性，可以高效的实现模块化



### Lifecycle Hooks

* 更改：在`setup`中使用生命周期钩子，需要引入它们（名字前加on），是函数，接收回调参数
* 更改：`beforeDestroy`与`destroyed`改名为`beforeUnMount`与`unMounted`，前俩还能用，后面俩更语义化点
* 移除：`beforeCreate`与`created`不建议用了，没啥用了，原本用来存放逻辑调用已经api调用的作用，已经被`setup`代替了
* 新增：`renderTracked`和`renderTriggered`两个钩子，用于调试



### watch

* 需要从`vue`中引入
* 是一个函数，接收三个参数`(需要监听的变量，可以是数组 | 监听函数 | 配置)`



### suspense

用于解决数据未加载完毕时组件的展示状态，最主要的是，如果子组件的数据未加载完毕，那么父组件中的待机状态就不会结束，适合做骨架屏。

基本语法：

```vue
<Suspense>
	<template #default>
		我是真正的内容
    </template>
    <template #fallback>
		我在加载中...
    </template>
</Suspense>
```





### teleport

用于将一个元素传送至另一个指定元素下，不知道能干嘛





## 风格调整&api变化

* Vue3中，许多功能不再从`this`身上直接获取，而是通过模块引入的方式，这使得`Tree Shaking`更加方便

* 对`render`函数的第二个配置参数，进行了拍平，具体变化如下所示：

  ```js
  // Vue2
  render(h) {
      return h("div", {
          attrs: {
              id: "foo"
          },
          on: {
              click: this.onClick
          }
      }, ["hello", ....其他子节点])
  }
  
  // Vue3
  import { h } from "vue"; // 全局引入可以让你任意得拆分render()
  render() {
      return h("div", {
          id: "foo",
          onClick: this.onClick
      }, ["hello", ....其他子节点])
  }
  ```





## render函数应用

```js
<script
    crossorigin="anonymous"
    integrity="sha512-0S1Z4iGuXAsDTvbchysUduts51Ef0IXJnNeNsa9D7W+cotLVA/TJaN9xnipOLL+0Y2lkH+7Xbd8qJB1RIvEleQ=="
    src="https://lib.baomitu.com/vue/3.0.5/vue.global.js"
  ></script>
  <script>
    const { h, createApp } = Vue;

    const Stack = {
      props: {
        size: Number,
      },
      render() {
        const slot = this.$slots.default ? this.$slots.default() : [];

        return h(
          "div",
          { class: "stack" },
          slot.map((child) => {
            return h(child, { class: `mt-${this.$props.size}` });
          })
        );
      },
    };

    createApp({ components: { Stack } }).mount("#app");
 </script>
```



## Vue3渲染优化

* 静态节点提升，一旦被提升，这个节点就不会再变了，后面的更新会重用提升上去的储存
* 函数缓存，会对绑定的函数进行缓存，创建一个指针一直指向最新的函数，如果函数发生变化，更新该指针即可，而不需要对Vnode有所变更
* 主要的优化手段，在`compile`阶段向**模板**（注意，直接使用VDOM API不会享受到这种优化）打上许多`flag`，比如说就专门每个Vnode上就有一个专门用于存储动态子节点的数组，里面的元素都是存在变化可能的。这些`flag`来给予`compiler`更多的提示信息，告诉它什么是可能会变化的，什么是一定不会变化的，从而更能针对性的生成`render`函数，减少更新的工作量。