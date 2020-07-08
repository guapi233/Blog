# 【造轮子】低配axios

😁：文章请结合[案例](https://github.com/guapi233/Blog/tree/master/demos/%E3%80%90%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%91%E4%BD%8E%E9%85%8Daxios)食用。

axios是一个基于promise的HTTP库，它的特性包括：

* 可以在浏览器中发送 XMLHttpRequests
* 可以在 node.js 发送 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求数据和响应数据
* 能够取消请求
* 自动转换 JSON 数据
* 客户端支持保护安全免受 XSRF 攻击

这些特性使得axios非常易用，在前端领域广受好评，从Vue放弃维护Vue resource转推axios这点就可以看出它的强大。

这篇文章会剖析axios最主要的部分，它们包括：

* axios是如何使用Promise来处理HTTP请求的？
* axios中的拦截器是如何做到的？
* axios是如何中断请求的？



## Axios、axios、instance之间的关系

axios中存在3个最基本的”角色“，分别为`Axios`、 `axios`、`instance`，其中`axios`我们最为熟知，它是axios库暴露给我们用以发送请求的函数：

```js
// 发送 POST 请求（源自官方例子）
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

`instance`则是我们通过`axios.create()`创造出来的定制请求方法，它的功能和`axios`一样，用来发送请求，我们可以在创建`instance`时提前设置好一些固定配置项：

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

而`Axios`则比较隐蔽，它属于axios库中的内部角色。`Axios`是一个“类”角色，规定了一系列关于请求的属性和方法，其中最为重要的是一个叫`request`的方法，该方法是请求的入口函数，所有的请求都从该方法开始。

三者的关系为：

* Axios：与请求相关的属性和方法都定义在该类上
* instance：Axios的“实例”
* axios：Axios的“实例” + 特殊配置

之所以“实例”打引号是因为后二者从语法层面并不是`Axios`的真正实例，我们知道类的实例化结果只能为一个对象，而`axios`和`instance`却是两个可执行的函数类型。它们被称为`Axios`“实例”的原因是从逻辑层面获得了`Axios`规定了所有的属性和方法。

而`axios`和`instance`本质上都是相同的，它们都是`Axios`规定的`request()`的拓展，只不过`axios`作为默认使用的对象，身上有一些`instance`没有的配置，是一个特殊的`instance`。比如`axios.create`，`create()`因为不是`Axios`类上定义的，而是单独给`axios`添加的，所以`instance`身上没有该方法。

```js
// axios和instance都是被这个函数创造出来的
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  // 这里可以看出instance的本质就是将Axios.prototype.request单独拿出来进行“加工”
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance（将Axios原型上的属性方法复制到创建出的instance上）
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance（将Axios实例对象身上的属性方法复制到创建出的instance上）
  utils.extend(instance, context);

  return instance;
}
```



## axios的执行流程

上面我们得知`axios`和`instance`的本质就是就是`Axios.prototype.request()`，该方法是一切请求的入口，其实完整的axios执行流程为：`Axios.prototype.request()` --> `dispatchRequest()`  --> `xhrAdapter()`。

其中第一个函数是入口函数，主要功能是使用Promise串连起整条请求链，并在其中调用第二个函数；第二个函数则是主要对请求的请求数据格式和响应格式进行一定的处理，并在其中调用第三个函数；而第三个函数则是真正的发送请求，获得数据。



## 如何使用Promise串连请求

在`Axios.prototype.request()`中有一段重要的代码段：

```js
// ✨：串连整条Promise链
let chain = [dispatchRequest, undefined]; // undefined用来占位
let promise = Promise.resolve(config);

this.interceptors.request.forEach((interceptor) => {
  chain.unshift(interceptor.onResolved, interceptor.onRejected);
});

this.interceptors.response.forEach((interceptor) => {
  chain.push(interceptor.onResolved, interceptor.onRejected);
});

while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift()); // 一次弹出两个，不占位就会错位传入
}
```

axios会首先将设置的interceptors拦截器保存在数组中，在执行请求函数时，会将它们按规则填充到执行函数中（request拦截器晚设置早执行，response拦截器晚设置完执行），最后通过`Promise.prototype.then`本身的串连特性将这些处理函数进行串连执行。同时这也是为什么axios拦截的实现原理。用图表示这部分的逻辑为：

![](https://raw.githubusercontent.com/guapi233/Blog/master/images/【造轮子】低配axios/01.png)



## axios如何中断请求的

axios的中断是使用了`XMLHttpRequest`对象身上的`abort`方法，但是axios本身是基于Promise来构建的，而我们知道Promise一旦启动时不能中断的，所以axios执行中断后请求的Promise会变为rejected状态。

```js
// axios官方的取消例子
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

实现原理也很简，`CancelToken`实例化出的对象身上有一个Promise，而`executor`的参数`c`就是该Promise的`resolve`方法，而该Promise的成功回调就是将请求`abort`掉。

```js
// xhrAdapter.js
if (config.cancelToken) {
  config.cancelToken.promise.then((message) => {
    if (!request) return;

    request.abort();
    reject(message);

    request = null;
  });
}
```

