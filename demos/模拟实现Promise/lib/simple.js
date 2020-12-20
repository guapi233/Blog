const PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected";

function Promise(f) {
  this.state = PENDING;
  this.data = null;
  this.cbs = [];
  let flag = false;

  const transformState = (state, data) => {
    if (this.state !== PENDING) return;

    this.state = state;
    this.data = data;
  };
  const execCbs = () => {
    this.cbs.forEach((cb) => {
      const { onFulfilled, onRejected, resolve, reject } = cb;

      setTimeout(() => {
        let result =
          this.state === FULFILLED
            ? onFulfilled
              ? onFulfilled(this.data)
              : undefined
            : onRejected
            ? onRejected(this.data)
            : undefined;

        // 校验特殊情况
        console.log(result, this);
        if (result === this) {
          console.log("??");
          throw Error("不能是自己");
        } else if (result instanceof Promise && result.then) {
          result.then(resolve, reject);
        } else {
          try {
            resolve(result);
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  };
  const resolve = (data) => {
    if (flag) return;
    flag = true;

    transformState(FULFILLED, data);
    execCbs();
  };
  const reject = (data) => {
    if (flag) return;
    flag = true;

    transformState(REJECTED, data);
    execCbs();
  };

  try {
    f(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const handleCb = (promise, cb) => {
  const { onFulfilled, onRejected, resolve, reject } = cb;

  if (promise.state === PENDING) {
    promise.cbs.push(cb);
  } else {
    let result =
      promise.state === FULFILLED
        ? onFulfilled(promise.data)
        : onRejected(promise.data);

    // 校验特殊情况
    if (result === this) throw Error("不能是自己");
    else if (result instanceof Promise && result.then) {
      result.then(resolve, reject);
    } else {
      try {
        setTimeout(() => resolve(result));
      } catch (err) {
        setTimeout(() => reject(err));
      }
    }
  }
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    const cb = { onFulfilled, onRejected, resolve, reject };

    handleCb(this, cb, resolve, reject);
  });
};

module.exports = Promise;
