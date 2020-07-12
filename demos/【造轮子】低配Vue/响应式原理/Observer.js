/**
 * Observer类 监听数据变化的入口
 *
 * 引用了：Dep from "./Dep.js" Watcher管理相关代码
 */
class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  defineReactive(data, key, val) {
    this.observer(val);
    const dep = new Dep();

    Object.defineProperty(data, key, {
      get() {
        // 订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);

        return val;
      },
      set: (newVal) => {
        this.observer(newVal);
        if (newVal !== val) {
          val = newVal;

          // 通知watcher变化
          dep.notify();
        }
      },
    });
  }
}
