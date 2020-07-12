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
