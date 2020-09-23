# 【造轮子】低配Vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。



## 测试Demo

本文所编写测试的Demo，可以在[这里](https://github.com/guapi233/Blog/tree/master/demos/%E3%80%90%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%91%E4%BD%8E%E9%85%8DVuex)获取。



## 为什么我们可以在Vue组件中使用Vuex中的数据？

在回答这个问题前，首先要先捋清楚Vue中父子组件的加载顺序：

```
父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
```

为什么这样设计这里不做过渡探讨，捋清楚这样的加载顺序后，我们就可以回答标题上的问题了，为什么我们可以在Vue组件中使用Vuex中的数据呢？

怀着这样的疑问我们打开了Vuex的install方法，这是Vue插件规定的安装函数，也是Vuex对Vue进行的拓展逻辑入口，在那里，我们发现了这样一句代码：`Vue.mixin({ beforeCreate: vuexInit });`。

`mixin`是Vue提供的用于复用功能的特性，会将提供的对象混入进组件对象中从而拓展组件对象的工作。这句代码的意思是，在全局内的每一个Vue组件中的`beforeCreated`生命周期中混入一个名为`vuexInit`的方法，这样代码中的所有Vue组件在执行`beforeCreate`钩子时都会自动执行该函数。

我们想要的答案好像就要找到了，进入`vueInit`函数，查看内部实现，我们发现了这样一段逻辑代码：

```js
// mixin.js

const options = this.$options;

if (options.store) {
  // 如果当前组件的 $options 中存在 $store, 直接添加
  this.$store =
    typeof options.store === "function" ? options.store() : options;
} else if (options.parent && options.parent.$sotre) {
  // 因为组件的加载顺序是先从父组件开始，所以可以从父组件上拿下来，
  // 这也是为什么需要在 main.js 中明确指定store的原因
  this.$store = options.parent.$store;
}
```

因为上文提到了，这段代码最终会被混入到组件中的`beforeCreate`中的，所以上下文中的`this`自然也就变成了当前组件的实例。那么`this.$options`是什么呢？它其实是Vue内部提供的用于收集定义于`data`外的属性的对象，即如果在组件对象上直接定义的属性会被该对象收集（`parent`属性时默认提供的）。

从上面的代码我们可以看出，这部分逻辑是想从当前组件上的`$options`对象中寻找名为`$store`的属性，如果没有找到则会去父组件上的`$options`寻找。

那么为什么会去父组件上找呢？你可能有些思绪了，没错，就是我们在上文提到的父子组件加载顺序。这是因为父组件的数据初始化是优先于子组件的，并且，使用过Vuex的你应该知道，我们在手动引入Vuex时，同Vue-router一样，需要在**main.js**中将我们写好的`store`配置数据传入到初始化对象中，这样一来，最外层的Vue组件就拥有了我们编写好的Vuex状态数据，那么顺着每个组件中的混入逻辑，最外层组件身上的**store**数据就可以一直传递到最内部的组件身上。

这样一来，所有组件身上都拥有了名为`$store`的属性。



## Vuex是如何实现数据响应式的

我们知道Vuex与全局对象以及`localStorage`的一个很重要的区别就是可以实现数据的响应式修改：只需要在其中一个组件中修改数据，其余应用到相关数据的组件都会产生响应。其实这个特性的底层实现非常简单，我们可以在Vuex的源码中发现这样一段逻辑：

```js
this._watherVM = new Vue();
```

是不是很惊讶，因为Vue已经将响应式数据比较完善的实现了，所以Vuex只需要拿来用即可。

知道了这一原理后，我们就可以开始着手编写`Store`构造函数了:

```js
// Store.js

//  引入Vue，用于构建数据响应中心
import Vue from "vue";

export default class Store {
  // options 为传入的构造对象，包括state、getters、mutation等规则
  constructor(options) {
    // 初始化 state
    this.vm = new Vue({
      data: {
        state: options.state,
      },
    });

    // 初始化 getters
    let getters = options.getters || {};
    this.getters = {};
    Object.keys(getters).forEach((key) => {
      // 在$store.getters上定义每个传入的getters，值为传入state的getters函数的调用结果
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.vm.state);
        },
      });
    });
  }

  // 利用 Class语法 的便利，将this.vm.state 代理给 this.state
  get state() {
    return this.vm.state;
  }
}

```

到目前为止，我们已经可以在Vue组件中使用`$store.state`和`$store.getters`啦。



## mutations & actions 实现

`mutations`和`actions`与上面的`state、getters`类似，只需要再多实现两个触发方法`commit、dispatch`即可，唯一一点需要注意的是：因为`dispatch`的第一个参数是Store对象本身，并且要在`dispatch`中通过Store对象调用其身上的`commit`的方法，如果用户没有用参数直接接受`Store`对象，而是使用结构语法直接拿到了`commit`方法，通过直接函数调用就会导致内部`this`的丢失。

```js
actions: {
  // 可以正常调用
  enNameLog(that, string) {
    that.commit("nameLog", string);
  },
  // 异常调用 this丢失
  enNameLog2({ commit }, string) {
    commit("nameLog", string);
  },
},
```

解决方法也很简单，在Store类中注册`dispatch`时，使用箭头函数保存`this`即可。

完整的代码如下：

```js
// Store.js
  constructor() {
  // ...other code    
      
  // 初始化 mutations
    let mutations = options.mutations || {};
    this.mutations = {};
    Object.keys(mutations).forEach((key) => {
      this.mutations[key] = mutations[key];
    });

    // 初始化 actions
    let actions = options.actions || {};
    this.actions = {};
    Object.keys(actions).forEach((key) => {
      this.actions[key] = actions[key];
    });
  }

  // dispatch方法
  dispatch = (method, ...payload) => {
    // 调用action
    this.actions[method](this, ...payload);
  };

  // commit方法
  commit = (method, ...payload) => {
    // 调用mutation
    this.mutations[method](this.state, ...payload);
  };
```

