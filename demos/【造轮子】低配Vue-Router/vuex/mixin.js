export default function(Vue) {
  // 混入$store对象
  Vue.mixin({ beforeCreate: vuexInit });
}

function vuexInit() {
  const options = this.$options;

  if (options.store) {
    // 如果当前组件的 $options 中存在 $store, 直接添加
    this.$store =
      typeof options.store === "function" ? options.store() : options.store;
  } else if (options.parent && options.parent.$store) {
    // 因为组件的加载顺序是先从父组件开始，所以可以从父组件上拿下来，这也是为什么需要在 main.js 中明确指定store的原因
    this.$store = options.parent.$store;
  }
}
