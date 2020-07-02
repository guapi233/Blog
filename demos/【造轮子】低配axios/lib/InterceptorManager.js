/**
 * 拦截器
 */
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(onResolved, onRejected) {
    this.handlers.push[
      {
        onResolved,
        onRejected,
      }
    ];
  }

  forEach(fn) {
    this.handlers.forEach((item) => {
      fn(item);
    });
  }
}

module.exports = InterceptorManager;
