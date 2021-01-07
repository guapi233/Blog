# 模拟实现一个async

`async/await`可以让一段异步代码同步执行，但是这段异步代码整体还是异步的：

```js
asyncFn(); // asyncFn是异步代码，但是它里面的内容可以同步执行
otherFn(); // 因为asyncFn是异步，所以otherFn()会先出结果（不是异步）
```



## 效果

直接上效果代码：

```js
const runner = main(function* (param) {
  console.log(param);
  let a = yield 3;
  let b = yield 4;
  let c = yield new Promise((resolve, reject) =>
    setTimeout(resolve, 3000, [5, 6, 7])
  );
  let d = yield Promise.resolve(6);

  return [a, b, c, d];
});

runner("ree").then((res) => {
  console.log(res); // [3, 4, [5, 6, 7], 6];
});
```



## 原理

```js
function main(fn) {
  return (...params) => {
    const gen = fn(...params);

    return new Promise((resolve, reject) => {
      function _next(...params) {
        step(gen, resolve, reject, _next, _throw, "next", params);
      }

      function _throw(err) {
        step(gen, resolve, reject, _next, _throw, "throw", [err]);
      }

      _next();
    });
  };
}

function step(gen, resolve, reject, _next, _throw, key, param) {
  const { value, done } = gen[key](...param);

  try {
    if (done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  } catch (err) {
    reject(err);
  }
}
```

原理就是运用了`generator`可以**中止**函数执行的特性，在遇到`yield`时退出等待异步执行完毕时再回到函数中继续向下执行，`async/await`只是作为一种语法糖，将我们需要手动调用`next`的步骤省略了。而且还给`async`函数本身套上了一层`Promise`，使这个函数能够“自个玩自个的”，不会阻塞函数外的代码。



## 参考

* [掘金——实现一个 async/await （typescript 版）](https://juejin.cn/post/6913393501262577672#heading-3)