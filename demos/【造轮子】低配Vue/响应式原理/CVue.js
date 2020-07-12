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
