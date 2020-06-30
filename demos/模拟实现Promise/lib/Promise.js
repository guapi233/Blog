(function (global) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";

  /**
   * @param {*} executor 构造Promise所需执行器
   */
  function MyPromise(executor) {
    this.state = PENDING; // Promise当前状态
    this.data = undefined; // 返回值
    this.callbacks = []; // 每个元素的结构：{onResolved() {}, onRejected() {}}

    /**
     * 任务正确执行函数，用于将Promise状态更改为正确完成状态
     */
    function resolve(value) {
      if (this.state !== PENDING) return;

      // 将状态改为resolved
      this.state = RESOLVED;

      // 保存value数据
      this.data = value;

      // 如果有待执行的回调函数，依次添加入异步队列中（此处用宏队列模拟微队列）
      if (this.callbacks.length > 0) {
        // setTimeout(() => {
        //   this.callbacks.forEach(callbacksObj => {
        //     callbacksObj.onResolved(value)
        //   })
        // })

        // 使用Promise.prototype.then来模拟为微队列效果
        Promise.resolve(null).then((e) => {
          this.callbacks.forEach((callbacksObj) => {
            callbacksObj.onResolved(value);
          });
        });
      }
    }

    /**
     * 任务错误执行函数，用于将Promise状态更改为失败完成状态
     */
    function reject(reason) {
      if (this.state !== PENDING) return;

      // 将状态改为rejected
      this.state = REJECTED;

      // 保存reason数据
      this.data = reason;

      // 如果有待执行的回调函数，依次添加入异步队列中（此处用宏队列模拟微队列）
      if (this.callbacks.length > 0) {
        // setTimeout(() => {
        //   this.callbacks.forEach((callbacksObj) => {
        //     callbacksObj.onRejected(reason);
        //   });
        // });

        // 使用Promise.prototype.then来模拟为微队列效果
        Promise.resolve(null).then((e) => {
          this.callbacks.forEach((callbacksObj) => {
            callbacksObj.onRejected(reason);
          });
        });
      }
    }

    // 立即执行executor
    try {
      executor(resolve.bind(this), reject.bind(this));
    } catch (error) {
      reject(error); // 如果执行器抛出异常，Promise为失败状态
    }
  }

  /**
   * Promise原型上的then()
   * @param {*} onResolved 执行成功后的回调函数
   * @param {*} onRejected 执行失败后的回调函数
   */
  MyPromise.prototype.then = function (onResolved, onRejected) {
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const SELF = this;

    // then()返回一个新的Promise用于链式调用
    return new MyPromise((resolve, reject) => {
      // 处理函数
      function handler(callback) {
        /**
         * 如果Promise状态为resolved，哪么下一个then()的执行状态由上一个onResolved()的返回值决定，其中有以下几种情况：
         * 1. 如果在执行过程中出现异常，则直接变为rejected状态
         * 2. 如果成功完成执行，且返回的值不为Promise类型，则直接变为resolved状态，并且将返回的值作为下一个then()的value
         * 3. 如果成功完成执行，但返回的值为新的Promise类型，则由这个Promise的执行结果来决定下一个then()的状态
         * 4. rejected状态与resolved状态的处理方式相同，只不过调用的是onRejected()
         */

        try {
          let result = callback(SELF.data);

          if (result instanceof MyPromise) {
            // result.then(
            //   value => {
            //     resolve(value)
            //   },
            //   reason => {
            //     reject(reason)
            //   }
            // )

            //  化简为 ↓

            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (this.state === PENDING) {
        // 如果执行then()时，Promise中的执行器还未产生结果，就暂时将回调函数存储起来

        this.callbacks.push({
          onResolved(value) {
            handler(onResolved);
          },
          onRejected(reason) {
            handler(onRejected);
          },
        });
      } else if (this.state === RESOLVED) {
        // setTimeout(() => {
        //   handler(onResolved);
        // });
        Promise.resolve(null).then((e) => {
          handler(onResolved);
        });
      } else {
        // rejected同resolved原理相同，只不过调用的是onRejected()
        // setTimeout(() => {
        //   handler(onRejected);
        // });
        Promise.resolve(null).then((e) => {
          handler(onRejected);
        });
      }
    });
  };

  /**
   * Promise原型上的catch()
   */
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  /**
   * Promise对象上的resolve()
   * @param {*} value 构造器执行成功所带回的值
   * 1. 如果参数为Promise实例，则其结果来决定是否resolve
   * 2. 如果参数为其它类型，则直接将其作为resolve的带回值
   */
  MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  /**
   * Promise对象上的reject()
   * @param {*} reason 构造器执行失败所带回的原因
   */
  MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };

  /**
   * Promise对象上的all()
   * @param {*} promises 需要执行的Promise数组
   */
  MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
      let successfulPromiseArr = [],
        successfulCount = 0; // 用于存在成功完成执行的Promise结果和数量

      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          successfulPromiseArr[index] = promise;

          successfulCount++;
        }

        promise.then(
          (value) => {
            successfulPromiseArr[index] = value;

            successfulCount++;

            if (successfulCount === promises.length) {
              resolve(successfulPromiseArr);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  /**
   * Promise对象上的race()
   */
  MyPromise.race = function (promises) {
    // let failedPromiseArr = [], failedPromiseCount = 0

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          resolve(promise);
        }

        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  // 向外暴露自定义Promise
  global.MyPromise = MyPromise;
})(window);
