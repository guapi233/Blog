# 简介

手写Promise，面试常考的知识点。

> 在计算机行业，盛行着一种朴素还原论的迷思。即认为越接近底层，技术含量越高。每个程序员都有读懂底层源代码的追求。
>
> 这在一定程度上是正确的。不过，我们也应该看到，一旦底层和表层之间，形成了领域鸿沟。精通底层，并不能代表在表层的水平。
>
> 比如游戏的开发者，不一定是游戏中的佼佼者。这在 FPS 射击游戏或者格斗游戏里尤为明显，这些游戏里的绝大部分顶尖玩家，完全不会写代码。
>
> 如果将精通 promises 定义为，善于在各种异步场景中使用 promises 解决问题。
>
> 那么，能手写 promises 实现，对精通 promises 帮助不大。
>
> ——[100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)



## 大致思路

* 构造函数中要有：
  * 这个Promise的状态
  * 这个Promise要返回的数据/错误信息
  * 这个Promise在状态转变时所要触发的回调函数们
* 构造函数接收一个执行函数，并在执行函数中传入`resolve`和`reject`两个方法
* 需要在原型上挂一个`then`方法，一个Promise在`then`时有三种可能，如果是`fulfilled`或`rejected`，直接调用对应的回调即可，如果是`pending`，需要先将回调函数放到Promise构造函数中的存储器中，并在代码执行到开发者手动调用的`resolve`或`reject`时触发
* 调用回调函数的时候需要使用微队列，并且需要在执行函数和回调函数处添加错误捕获语句，一旦捕获到错误立马将当前状态转换为`rejected`
* 为了实现链式调用，`then`最后必须返回一个`Promise`，这个Promise的状态根据回调函数的执行结果来变更状态，如果回调函数正常执行，哪怕它是`rejected`回调函数，这个Promise也会变更为`fulfilled`，只有当回调函数出现报错时才会变为`rejected`。



## Promses/A+规范

* promise有3个状态，分别是`pending`、`fulfilled`、`rejected`
  * 在 `pending` 状态，promise 可以切换到 `fulfilled` 或 `rejected`
  * 在 `fulfilled` 状态，不能迁移到其它状态，必须有个不可变的 `value`
  * 在 `rejected` 状态，不能迁移到其它状态，必须有个不可变的 `reason`
* promise 必须有 then 方法，接受 `onFulfilled` 和 `onRejected` 参数
  * `onFulfilled` 和 `onRejected` 如果是函数，必须最多执行一次
  * `onFulfilled` 的参数是 `value`，`onRejected` 函数的参数是 `reason`
  * `then` 方法可以被调用很多次，每次注册一组 `onFulfilled` 和 `onRejected` 的 callback。它们如果被调用，必须按照注册顺序调用
  * 在执行上下文堆栈仅包含平台代码之前，不得调用`onFulfilled`或`onRejected`
* 当一些特殊的 `value` 被 `resolve` 时，要做特殊处理
  * 如果 `result` 是当前 promise 本身，就抛出 `TypeError` 错误
  * 如果 `result` 是另一个 promise，那么沿用它的 `state` 和 `result` 状态
  * 如果 `result` 是一个 `thenable` 对象。先取 `then` 函数，再 call `then` 函数，重新进入 The Promise Resolution Procedure 过程
  * 如果不是上述情况，这个 `result` 成为当前 promise 的 `result`