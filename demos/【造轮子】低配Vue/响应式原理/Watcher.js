/**
 * Watcher类 用于监听数据变化并执行传入的回调函数
 *
 * 引用了：Dep from "./Dep.js" Watcher管理相关代码
 */
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    Dep.target = this;
    this.oldVal = this.getVal();
    Dep.target = null;
  }

  getVal() {
    return compileUtil.getVal(this.expr, this.vm);
  }

  update() {
    let newVal = this.getVal();
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
}
