import routerView from "./components/view";

export let _Vue;

/**
 * Vue-Router 安装方法
 * @param {*} Vue Vue全局对象
 */
function install(Vue) {
  _Vue = Vue;

  // 混入 根组件、router实例对象
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;

      if (options.router) {
        // 如果当前组件的 $options 中存在 $router, 直接添加
        this._routerRoot = this;
        this._router = options.router;

        // 路由初始化
        this._router.init(this);
        console.log(this);

        // 对关键的 当前路由信息对象 做响应式处理
        Vue.util.defineReactive(this, "_route", this._router.model.current);
      } else if (options.parent) {
        this._routerRoot = options.parent._routerRoot;
      }
    },
  });

  // 做下代理 方便调用
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });

  // 定义全局组件
  Vue.component("RouterView", routerView);
}

export default install;
