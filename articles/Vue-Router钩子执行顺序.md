# Vue-Router 钩子执行顺序

![](https://pic4.zhimg.com/80/v2-c3a67a5eb0b8da4936a6b57ef8c48783_720w.jpg)



## 路由守卫分类

* 全局的
* 单个路由独享的
* 组件内的



## 全局路由守卫

【全局的】：是指路由实例上直接操作的钩子函数，他的特点是所有路由配置的组件都会触发，直白点就是触发路由就会触发这些钩子函数，如下的写法。钩子函数按执行顺序包括`beforeEach`、`beforeResolve（2.5+）`、`afterEach`三个（以下的钩子函数都是按执行顺序讲解的）：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

[beforeEach]：在路由跳转前触发，参数包括to,from,next（参数会单独介绍）三个，这个钩子作用主要是用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚。

[beforeResolve]（2.5+）：这个钩子和`beforeEach`类似，也是路由跳转前触发，参数也是`to,from,next`三个，和`beforeEach`区别官方解释为：

> 区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

即在 `beforeEach` 和 组件内`beforeRouteEnter` 之后，`afterEach`之前调用。

[afterEach]：和`beforeEach`相反，他是在路由跳转完成后触发，参数包`括to,from`没有了`next`（参数会单独介绍）,他发生在`beforeEach`和`beforeResolve`之后，`beforeRouteEnter`（组件内守卫，后讲）之前。



## 单路由独享路由守卫

【路由独享的】是指在单个路由配置的时候也可以设置的钩子函数，其位置就是下面示例中的位置，也就是像Foo这样的组件都存在这样的钩子函数。目前他只有一个钩子函数`beforeEnter`：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

[beforeEnter]：和beforeEach完全相同，如果都设置则在beforeEach之后紧随执行，参数to、from、next



## 组件内路由守卫

【组件内的】：是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。钩子函数按执行顺序包括`beforeRouteEnter`、`beforeRouteUpdate (2.2+)`、`beforeRouteLeave`三个，执行位置如下：

```js
<template>
  ...
</template>
export default{
  data(){
    //...
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
<style>
  ...
</style>
```

[beforeRouteEnter]：路由进入之前调用，参数包括`to，from，next`。该钩子在全局守卫`beforeEach`和独享守卫`beforeEnter`之后，全局`beforeResolve`和全局`afterEach`之前调用，要注意的是该守卫内访问不到组件的实例，也就是`this`为`undefined`，也就是他在`beforeCreate`生命周期前触发。在这个钩子函数中，可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数，可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 `vm`访问组件实例进行赋值等操作，（`next`中函数的调用在`mounted`之后：为了确保能对组件实例的完整访问）。

```js
 beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

[beforeRouteUpdate] (v 2.2+)：在当前路由改变时，并且该组件被复用时调用，可以通过this访问实例。参数包括`to，from，next`。可能有的同学会疑问，what is 路由改变 or what is 组件被复用？

- 对于一个带有动态参数的路径 `/foo/:id`，在 `/foo/1` 和 `/foo/2` 之间跳转的时候，组件实例会被复用，该守卫会被调用
- 当前路由`query`变更时，该守卫会被调用

[beforeRouteLeave]：导航离开该组件的对应路由时调用，可以访问组件实例`this`，参数包括`to，from，next`。



至此，所有钩子函数介绍完毕。

屡一下哈：

**全局路由钩子：**

* **beforeEach(to,from, next)**
* **beforeResolve(to,from, next)**
* **afterEach(to,from)；**

**独享路由钩子：**

* **beforeEnter(to,from, next)；**

**组件内路由钩子：**

* **beforeRouteEnter(to,from, next)**
* **beforeRouteUpdate(to,from, next)**
* **beforeRouteLeave(to,from, next)**

不知道你是否还记得to、from、next这三个参数

下面请重头把这几个钩子函数的参数看一遍，细心的同学可以看见在afterEach钩子中参数没有next，为什么呢？

## **3.导航守卫回调参数**

to：目标路由对象；

from：即将要离开的路由对象；

next：他是最重要的一个参数，他相当于佛珠的线，把一个一个珠子逐个串起来。以下注意点务必牢记：

1. 但凡涉及到有next参数的钩子，必须调用next() 才能继续往下执行下一个钩子，否则路由跳转等会停止。

2. 如果要中断当前的导航要调用next(false)。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到`from`路由对应的地址。（主要用于登录验证不通过的处理）

3. 当然next可以这样使用，next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。意思是当前的导航被中断，然后进行一个新的导航。可传递的参数与[router.push](https://link.zhihu.com/?target=https%3A//router.vuejs.org/zh/guide/essentials/navigation.html)中选项一致。

4. 在beforeRouteEnter钩子中`next((vm)=>{})`内接收的回调函数参数为当前组件的实例`vm`，这个回调函数在生命周期mounted之后调用，也就是，他是所有导航守卫和生命周期函数最后执行的那个钩子。

5. next(error): (v2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。