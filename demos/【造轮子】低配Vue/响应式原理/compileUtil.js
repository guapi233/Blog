const compileUtil = {
  getVal(expr, vm) {
    return expr.split(".").reduce((data, currentKey) => {
      return data[currentKey];
    }, vm.$data);
  },
  getContent(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1].trim(), vm);
    });
  },
  setVal(expr, vm, val) {
    expr.split(".").reduce((data, currentKey) => {
      if (typeof data[currentKey] !== "object") {
        data[currentKey] = val;
      }

      return data[currentKey];
    }, vm.$data);
  },
  // 处理v-text或者{{}}
  text(node, expr, vm) {
    let value;
    // 处理{{}}插值或v-text插值
    if (expr.startsWith("{{") && expr.endsWith("}}")) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm, args[1].trim(), (newVal) => {
          this.updaters.textUpdater(node, this.getContent(expr, vm));
        });

        return this.getVal(args[1].trim(), vm);
      });
    } else {
      new Watcher(vm, expr, (newVal) => {
        this.updaters.textUpdater(node, newVal);
      });

      value = this.getVal(expr, vm);
    }

    this.updaters.textUpdater(node, value);
  },
  // 处理v-html
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);

    new Watcher(vm, expr, (newVal) => {
      this.updaters.htmlUpdater(node, newVal);
    });

    this.updaters.htmlUpdater(node, value);
  },
  // 处理v-model
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);

    new Watcher(vm, expr, (newVal) => {
      this.updaters.modelUpdater(node, newVal);
    });

    this.updaters.modelUpdater(node, value);

    node.addEventListener("input", (e) => {
      this.setVal(expr, vm, node.value);
    });
  },
  // 处理v-on
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm));
  },
  // 处理v-bind（未完成）
  bind(node, expr, vm, attrName) {
    if (attrName === "style") {
      expr[1] = "";
    }
  },
  updaters: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};
