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
