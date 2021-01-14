# 模拟实现Promise/A+规范

Promise是ES2015中加入Javascript的一个相当受欢迎的特性，目的是为了解决js中令人厌恶的异步方式。Promise/A+是规定Promise的范文，这篇文章会通过Promise/A+规范，来模拟实现一个Promise，并借此来更深入的了解关于Promise的繁枝细节。

文章中的代码可以在[这里](https://github.com/guapi233/Blog/tree/master/demos/%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0Promise)获取。



## Promise解决了什么问题？

这篇文章假定您已经有了些许的Promise使用经验。关于Promise解决的问题，大多数文章值提出了“回调地狱”这一观点，诚然，这确实是Promise解决的一大问题，但是，关于Promise的亮点，还包括但不限于以下几方面：

* 解决回调函数的控制反转导致的信任问题：

  Promise提供了针对于第三方在调用回调函数时关于错误的调用时机，错误的调用次数等方面的解决方案，具体实现可以参考[《你不知道的Javascript》中卷](https://book.douban.com/subject/26854244/) 第二部分--第三章--3.3部分--Promise信任问题 相关内容。

* 指定回调函数的方式更加灵活：

  之前的异步方式必须要在启动之前指定回调函数，这是因为以前的异步方式无法保存异步状态，导致会在得到结果后就立马进入回调函数中进行处理，而Promise因为可以保存异步的执行状态和返回值，所以无论是在异步启动前，还是启动后，甚至在已经得到结果后再指定回调函数都是被允许的。





## 宏队列与微队列

Event Loop（事件循环）是JavaScript的执行模型，不过它并不是我们这篇文章要探讨的，我们要引用其中两个很重要的两个概念：Macrotask（宏队列）、Microtask（微队列），理解了这两个概念，可以解决我们在编写Promise中的一些疑惑。

首先先来看三段代码：

```js
// 第一段代码
setTimeout(() => {
  console.log(1); // 我后输出
}, 0)

console.log(2); // 我先输出
```

```js
// 第二段代码
Promise.resolve(1).then(resolved => console.log(resolved)); // 我后输出

console.log(2); // 我先输出
```

```js
// 第三段代码
setTimeout(() => {
  console.log(1); // 我第二个输出
  Promise.resolve(3).then((e) => console.log(e)); // 我第3个输出
}, 0);

setTimeout(() => {
  console.log(2); // 我最后输出
}, 0);
console.log(4); // 我先输出
```

从前面两段代码中，我们不难看出，`setTimeout`和`Promise.prototype.then`都会异步执行其中的代码片段，但是第三段代码中，在最后加入异步队列的`Promise.prototype.then`却排在了第二个`setTimeout`前面。

我们直接说结论，原因是在JavaScript的执行模型中，异步队列分为宏队列和微队列两种，其中`setTimeout`属于宏队列，`Promise.prototype.then`属于微队列。二者的共同点是都会等待JS执行栈全部pop空后才执行。

它们的区别是宏队列一次只会弹出一个回调函数执行，并且每一个宏队列函数执行完毕后，都会检测当前微队列中有无待执行函数，如果有会一次性将微队列中的全部待执行函数执行完毕。

带入到第三段代码中，Promise之所以会先于第二个定时器就是因为在第一个定时器执行完毕后，检测到微队列中包含一个Promise待执行函数，所以会将微队列的函数执行完后，再返回宏队列执行接下来的代码。

通过上面的小例子，如果您依然对宏队列以及微队列抱有疑惑，无法联想出相应的执行模型，笔者推荐您可以参考一下这个[2分钟了解 JavaScript Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln)视频，作者通过动画的方式，可以更加通俗易懂的了解其中的运作流程。

另外，为了通俗理解，笔者只是简单的介绍了一下两种队列的概念，上面的代码也只是运行于浏览器中的结果，node中并不遵循该执行模型，我会在另一篇文章中详细探讨一下关于Event Loop。



## 开始实现Promise

我们先看一段基本的Promise使用代码：

```js
let asyncCode = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  });
});

asyncCode.then(
  (resolved) => {
    console.log(resolved); // 1
  },
  (rejected) => {
    console.log(rejected);
  }
);
```

我们先列出从上面的代码中就可以看出的规范：

1. Promise是一个构造函数，构造一个Promise实例需要传入一个回调函数；
2. 传入的参数函数中包含两个参数，并且这两个参数也是函数；
3. 构造出的Promise实例身上包含`then`方法;
4. `then`方法中需要传入两个函数类型的参数，两个函数各有一个参数。

以上面的规则，我们就可以开始构建：

```js
(function (window) {
  function MyPromise(executor) {
    function resolve(value) {
        
    }
     
    function reject(reason) {
        
    }
    
    executor(resolve, reject)
  }

  MyPromise.prototype.then = function (onResolved, onRejected) {

  }
})(window)
```

仅仅根据上面的特征，我们发现工作无法顺利开展，于是我们需要通过阅读Promise/A+规范，来进行Promise的具体实现。



### 术语

- **解决（fulfill）**：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 `fulfill` 来表示解决，但在后世的 promise 实现多以 `resolve` 来指代之。
- **拒绝（reject）**：指一个 promise 失败时进行的一系列操作。
- **终值（eventual value）**：所谓终值，指的是 promise 被**解决**时传递给解决回调的值，由于 promise 有**一次性**的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
- **据因（reason）**：也就是拒绝原因，指在 promise 被**拒绝**时传递给拒绝回调的值。



### Promise构造函数编写

根据规范，一个 Promise 的当前状态必须为以下三种状态中的一种：**等待态（Pending）**、**执行态（Fulfilled）**和**拒绝态（Rejected）**。

**等待态（Pending）**

处于等待态时，promise 需满足以下条件：

- 可以迁移至执行态或拒绝态

**执行态（Fulfilled）**

处于执行态时，promise 需满足以下条件：

- 不能迁移至其他任何状态
- 必须拥有一个**不可变**的终值

**拒绝态（Rejected）**

处于拒绝态时，promise 需满足以下条件：

- 不能迁移至其他任何状态
- 必须拥有一个**不可变**的拒因

这里的不可变指的是恒等（即可用 `===` 判断相等），而不是意味着更深层次的不可变（盖指当 value 或 reason 不是基本值时，只要求其引用地址相等，但属性值可被更改）。

另外，ES2015中并没有选择”Fulfilled“作为执行态，而是选择与”rejected“相对应的“resolved”，我们的实现也遵从ES2015的实现。

```js
function MyPromise(executor) {
    // Promise当前的状态
    this.state = "pending";
    
    // 由于Promise只会有一种状态，所以我们利用一个属性来存储返回的终值或拒因
    this.data = undefined;
    
    // 使用数组是因为同一个Promise实例可能被多次调用then方法
    // 每个元素的结构：{onResolved() {}, onRejected() {}}
    this.callbacks = [];
    
    
    // ... other code
}
```

接下来我们再来实现需要传入`executor`中的`resolve`和`reject`方法，它们的逻辑包括：

1. 由于Promise只有一次更改状态的机会，所以只要当前的`state`不为`"pending"`，直接return；
2. `resolve`需要保存本次异步的终值，`reject`需要保存本次异步的拒因；
3. 由于浏览器并没有开放将代码push到微队列的接口，所以我们借用官方的`Promise.prototype.then`方法来实现合适的回调函数的调用时机。

```js
function MyPromise(executor) {
  // ... other code 
   
  function resolve(value) {
    if (this.state !== "pending") return;

    // 将状态改为resolved
    this.state = "resolved";

    // 保存value数据
    this.data = value;

    // 如果有待执行的回调函数，依次添加入异步队列中（此处用宏队列模拟微队列）
    if (this.callbacks.length > 0) {
      let _this = this;
      Promise.resolve(null).then((e) => {
        _this.callbacks.forEach((callbacksObj) => {
          callbacksObj.onResolved(value);
        });
      });
    }
  }

  function reject(reason) {
    if (this.state !== "pending") return;

    // 将状态改为rejected
    this.state = "rejected";

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
}
```

最后因为Promise的构建是同步执行的，所以我们在构造函数中立即执行传进来的构建器：

```js
// 立即执行executor
try {
  executor(resolve.bind(this), reject.bind(this));
} catch (error) {
  reject(error); // 如果执行器抛出异常，Promise为失败状态
}
```

构造函数的最终代码为：

```js
(function (window) {
  function MyPromise(executor) {
    // Promise当前的状态
    this.state = "pending";

    // 由于Promise只会有一种状态，所以我们利用一个属性来存储返回的终值或拒因
    this.data = undefined;

    // 使用数组是因为同一个Promise实例可能被多次调用then方法
    // 每个元素的结构：{onResolved() {}, onRejected() {}}
    this.callbacks = [];

    function resolve(value) {
      if (this.state !== "pending") return;

      // 将状态改为resolved
      this.state = "resolved";

      // 保存value数据
      this.data = value;

      // 如果有待执行的回调函数，依次添加入异步队列中（此处用宏队列模拟微队列）
      if (this.callbacks.length > 0) {
        let _this = this;
        Promise.resolve(null).then((e) => {
          _this.callbacks.forEach((callbacksObj) => {
            callbacksObj.onResolved(value);
          });
        });
      }
    }

    function reject(reason) {
      if (this.state !== "pending") return;

      // 将状态改为rejected
      this.state = "rejected";

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
  
  // 用于测试，暂时假定Promise的状态为pending
  MyPromise.prototype.then = function (onResolved, onRejected) {
    this.callbacks.push({ onResolved, onRejected });
  };

  window.MyPromise = MyPromise;
})(window);

```



## 实现Promise.prototype.then

`then`方法是Promise中最重要同时也是较为复杂的一部分逻辑，理解了`then`方法的执行逻辑，后面的Promise方法就显得通俗易懂了。

那么首先我们还是先通过规范，将`then`方法的行为准则列举出来：

1. promise 的 `then` 方法接受两个参数：

   ```js
   promise.then(onFulfilled, onRejected);
   ```

2. 如果 `onFulfilled、onRejected ` 不是函数，其必须被忽略

3. 如果 `onFulfilled` 是函数：

   - 当 `promise` 执行结束后其必须被调用，其第一个参数为 `promise` 的终值
   - 在 `promise` 执行结束前其不可被调用
   - 其调用次数不可超过一次

4. 如果 `onRejected` 是函数：

   - 当 `promise` 被拒绝执行后其必须被调用，其第一个参数为 `promise` 的据因
   - 在 `promise` 被拒绝执行前其不可被调用
   - 其调用次数不可超过一次

5. `then` 方法必须返回一个 `promise` 对象

   ```js
   promise2 = promise1.then(onFulfilled, onRejected);   
   ```

   > 理解上面的“返回”部分非常重要，即：**不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected**。

前两条规则比较容易理解，我们优先实现它们：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {
  // 如果传入的参数不为函数，我们为它们规定默认行为，分别为return拿到的终值和抛出拿到的拒因
  onResolved =
    typeof onResolved === "function" ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === "function" ? onRejected : (reason) => { throw reason; };
};
```

第三和第四条规定了Promise状态的更新以及回调函数的执行时机，相对容易理解，所以我们接着向下查看第五条规则：规定了`then`方法的返回值为一个新的Promise。那么我们的代码就可以这样来写：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {
  // ... other code
   
  // then()返回一个新的Promise用于链式调用
  return new MyPromise((resolve, reject) => {

  });
};
```

在编写里面的逻辑前，我们还需要再整理一下思绪，既然`then`方法的返回值是一个新的Promise，这不仅解释了Promise链式调用的原因，同时也带来的一个问题，这个Promise的状态如何决定？

首先，毋庸置疑的是这个Promise的返回值一定是根据`then`方法其中的`onResolved, onRejected`二者之一的执行结果来决定的。其次，根据`onResolved, onRejected`的返回值类型，要进行不同的处理，大致分为如下三种情况：

1. 如果在执行过程中出现异常，则直接变为rejected状态
2. 如果成功完成执行，且返回的值不为Promise类型，则直接变为`resolved`状态，并且将返回的值作为下一个`then`方法的值
3. 如果成功完成执行，但返回的值为新的Promise，则由这个Promise的执行结果来决定下一个`then`方法的状态

最后，由于Promise可以在任何时刻指定回调函数，所以会有当`then`方法调用时，Promise状态仍为`pending`的情况，这种情况下，我们将`onResolved, onRejected`添加到Promise的callbacks中，等待Promise中的异步执行完毕后，通过构造函数中相对应的方法来将回调函数推送到微队列中进行等待。

根据上面的所有规则，`then`方法的最终实现如下：

```js
MyPromise.prototype.then = function (onResolved, onRejected) {
  // 如果传入的参数不为函数，我们为它们规定默认行为，分别为return拿到的终值和抛出拿到的拒因
  onResolved =
    typeof onResolved === "function" ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === "function" ? onRejected : (reason) => { throw reason; };

  const SELF = this;

  // then()返回一个新的Promise用于链式调用
  return new MyPromise((resolve, reject) => {
    // 处理函数
    function handler(callback) {
      try {
        // 执行回调函数，获取结果，并根据不同的三种结果执行相应的逻辑
        let result = callback(SELF.data);
		
        // 如果执行结果是一个新的Promise，则以该Promise的执行结果作为结果
        if (result instanceof MyPromise) {
          result.then(resolve, reject);
        } else {
          // 如果执行结果是一个非Promise值，则直接将其作为终值返回
          resolve(result);
        }
      } catch (error) {
        // 如果在执行回调函数中捕获到异常，则将Promise更改为失败态，并将error作为拒因抛出
        reject(error);
      }
    }
	
   	// 根据三种不同的Promise状态，来决定对应的逻辑
    if (this.state === "pending") {
      // 如果执行then()时，Promise中的执行器还未产生结果，就暂时将回调函数存储起来

      this.callbacks.push({
        onResolved(value) {
          handler(onResolved);
        },
        onRejected(reason) {
          handler(onRejected);
        },
      });
    } else if (this.state === "resolved") {
      Promise.resolve(null).then((e) => {
        handler(onResolved);
      });
    } else {
      // rejected同resolved原理相同，只不过调用的是onRejected()
      Promise.resolve(null).then((e) => {
        handler(onRejected);
      });
    }
  });
};

```

注：上面代码中所使用的`Promise.resolve(null).then()`用于实现将代码推送到微队列的效果，如果使用`setTimeout`则只能将代码推送到宏队列，这与规范中的约定相违背。



## 实现Promise.prototype.catch

`catch`方法的实现非常简单，它的作用用于捕获一段Promise程序的异常，通常我们会将它放到Promise调用链的最下方。之所以说它非常简单因为这个作用已经被`then`方法实现了，所以我们只需要对`then`方法进行下包装即可：

```js
MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
```

如果您没有理解上面的实现，可以返回到上面构造函数和`then`方法实现中仔细查看一下回调函数的调用过程以及出现异常时的应对方法。关于`catch`方法的调用机制，我们以以下规则进行处理异常：

1. 如果Promise的执行状态为`rejected`，那么并不会直接决定接下来的Promise是否为`rejected`，而是同`resolved`状态一样，根据函数的执行结果决定。这条非常重要，我在这里再次重复一遍；
2. 我们在`then`方法中对传入的`onRejected`回调方法进行了判断，如果其不为一个函数，我们会规定它的默认行为为直接抛出拿到的拒因，这也是为什么Promise的拒因可以一直穿透到最下方的`catch`方法中的原因。但是，正如我们上一条规则所提到的，如果您一旦指定了`onRejected`，下方的`then`方法就会根据传入的回调函数的执行结果来决定执行状态。简单得说就是，如果在`catch`方法的上方，有其它`onRejected`对拿到的拒因进行了处理，并且该过程并没有发生或者主动抛出异常，最下方的`catch`是不会拿到拒因的。

我的文字描述可能不能直接让您理解这个理念，您可以结合下方这段代码来进行理解：

```js
let asyncCode = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 这里的失败态会调用第一个then方法中的onRejected()
    reject(1);
  });
});

asyncCode.then(
  (value) => {
    // 不会执行
    console.log(e);
  },
  (reason) => {
    // 我们覆盖了onRejected的默认行为，但是我们主动抛出了异常
    throw reason;
  }
).then(
  (value) => {
    // 这里的代码同样不会执行
  },
  (reason) => {  // *
    // 我们在这里对拿到的拒因进行了操作，并且这段代码不会抛出异常（尽管它看起来很蠢）
    console.log(reason + "2"); // 输出："12"
  }
).catch((e) => {
  // 所以这里的代码是不会执行的，因为上面的onRejected()执行结果（返回值）为undefined
  console.log(e + 1);
});
```

但是如果将标记`*`的失败处理函数删掉或者在其中使用`throw`主动抛出了错误，又或者是该函数中的逻辑代码出现了异常，下方的`catch`就会被执行。



## 实现Promise.resolve/reject

这两个方法直接挂载在Promise对象身上，用于快速指定一个带有预定状态的Promise实例，由于它们的实现简单且极其相似，我将它们直接放在这里一起带过。

不过，在实现之前，有一点需要注意的细节，请观察下方的代码，并思考执行结果：

```js
Promise.resolve(Promise.reject(1)).then(
  (v) => {
    console.log(0);
  },
  (e) => {
    console.log(e);
  }
);

Promise.reject(Promise.resolve(1)).then(
  (v) => {
    console.log(0);
  },
  (e) => {
    console.log(e);
  }
);
```

正确答案是：`1`和`状态为resolved的Promise实例`，看到了吗，这两个函数的执行逻辑有一些不同：如果`resolve`方法的参数是一个Promise实例，那么`resolve`方法会根据这个Promise实例的执行结果来改变状态；而`reject`方法则会直接将参数作为失败的拒因抛出。

其实很好理解，期待百分百的成功往往不现实，但期待百分百的失败倒是信手拈来。

```js
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    if (value instanceof MyPromise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
 };

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
}
```



## 实现Promise.all

`Promise.all`的实现同样不复杂，但是有一些小细节需要注意。该方法用于执行多个Promise代码，并返回一个新的Promise，这个Promise会根据所有的异步程序执行结束后返回相应的结果来改变状态：

1. 如果全部执行成功，则resolve，并按照执行的顺序返回一个终值数组；
2. 只要有一个执行失败，则立即reject，并返回当前失败的拒因。

根据要求，我们开始码实现：

```js
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
```

从上面的源码实现中，可以提取出几点关于实现时需要注意的小细节：

1. 如果传入的数组中包含非Promise实例对象的数据类型，则直接将其作为终值加入返回数组；
2. 因为要按照执行的顺序返回终值，且由于异步代码完成顺序不确定，所以不能使用`push`方法，而是使用脚标的方式进行设置；
3. 原因同第二点，在判断当前完成的Promise是否为最后一个时不能通过判断数组脚标的方式，上面代码使用了一个变量来进行计数，当完成的数量达到了数组的数量时，再进行resolve。



## 实现Promise.race

`Promise.race`相比`Promise.all`来说，逻辑简单了许多，只需要根据第一个完成执行的Promise对象的结果来决定返回状态，同时注意处理传入非Promise实例对象类型数据的情况即可。

```js
MyPromise.race = function (promises) {
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
```



## 实现Promise.prototype.finally

最后我们再来实现一下这个方法，这个方法实现起来是最简单的一个，它的执行逻辑也非常简单：这个方法无论上一个Promise的返回状态如何，都会执行回调函数中的内容。

```js
MyPromise.prototype.finally = function (callback) {
  return this.then(
    value => {
      callback();
      ,kreturn value;
    },
    reason => {
      callback();
      throw reason;
    }
  );
};
```



##  Promise的缺点

1.  promise一旦新建，就会立即执行，无法取消
2.  如果不设置回掉函数，promise内部抛出的错误就不会反应到外部
3.  处于pending状态时，是不能知道目前进展到哪个阶段的 



## 参考

[【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)

[Promise-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[为什么说Promise不能取消是一个缺点](https://segmentfault.com/q/1010000009781257)

