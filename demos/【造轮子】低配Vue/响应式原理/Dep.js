/**
 * Dep类 用于管理Watcher，并在数据改变时执行Watcher的更新方法
 *
 */
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach((w) => {
      w.update();
      console.log("我更新了");
    });
  }
}
