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

class Compile {
  constructor(el, vm) {
    this.el = this.isEle(el) ? el : document.querySelector(el);
    this.vm = vm;

    // 创建文档碎片对象，放入内存
    const fragment = this.node2Fragment(this.el);
    // 编译模板
    this.compile(fragment);
    // 追加到根元素
    this.el.appendChild(fragment);
  }

  compile(node) {
    // 获取子节点
    const childNodes = node.childNodes;
    [...childNodes].forEach((child) => {
      if (this.isEle(child)) {
        this.compileEle(child);
      } else {
        this.compileText(child);
      }

      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }

  compileEle(node) {
    const attributes = node.attributes;
    [...attributes].forEach((attr) => {
      const { name, value } = attr;

      // v- 开头的指令处理
      if (this.isDirective(name)) {
        const [, directive] = name.split("-");
        const [dirName, eventName] = directive.split(":");

        // 更新数据
        compileUtil[dirName](node, value, this.vm, eventName);

        // 删除标签上的指令属性
        node.removeAttribute(name);
      }
      // @click 为例的事件绑定
      else if (this.isEventAttr(name)) {
        let [, eventName] = name.split("@");
        compileUtil["on"](node, value, this.vm, eventName);
      }
    });
  }

  compileText(node) {
    const content = node.textContent;

    // 筛选 {{ ... }}
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil["text"](node, content, this.vm);
    }
  }

  isDirective(attrName) {
    return attrName.startsWith("v-");
  }

  isEventAttr(attrName) {
    return attrName.startsWith("@");
  }

  node2Fragment(node) {
    // 创建文档碎片
    const f = document.createDocumentFragment();

    while (node.firstChild) {
      f.appendChild(node.firstChild);
    }

    return f;
  }

  isEle(node) {
    return node.nodeType === 1;
  }
}

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
