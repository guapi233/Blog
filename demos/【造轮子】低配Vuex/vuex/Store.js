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

  // 利用 Class语法 的便利，将this.vm.state 代理给 this.state
  get state() {
    return this.vm.state;
  }
}
