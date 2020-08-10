/**
 * CVue类
 *
 * 引用了：Observer from "./Observer.js"    数据观察者相关代码
 * 引用了：Compile from "./Compile.js"      指令解析器相关代码
 */
class CVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    if (this.$el) {
      // 实现一个数据观察者
      new Observer(this.$data);
      // 实现一个指令解析器
      new Compile(this.$el, this);
      // 代理数据
      this.proxyData(this.$data);
      this.proxyData(this.$options.methods);
    }
  }

  proxyData(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        },
      });
    }
  }
}
