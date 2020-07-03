class CancelToken {
  /**
   * 用于中断一个请求
   *
   * @class
   * @param {Function} executor 执行器回调
   */
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }

    let resolvePromise;
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    // 调用执行器
    executor((message) => {
      if (this.reason) this.reason = message;
      resolvePromise(this.reason);
    });
  }
}
