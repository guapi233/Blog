### 二、IntersectionObserver

#### 1.1 API

```js
var io = new IntersectionObserver(callback, option);
复制代码
```

上面代码中，`IntersectionObserver`是浏览器原生提供的构造函数，接受两个参数：`callback`是可见性变化时的回调函数，`option`是配置对象（该参数可选）。

构造函数的返回值是一个观察器实例。实例的`observe`方法可以指定观察哪个 DOM 节点。

```js
// 开始观察
io.observe(document.getElementById("example"));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
复制代码
```

上面代码中，`observe`的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。

```js
io.observe(elementA);
io.observe(elementB);
复制代码
```

#### 1.2 Callback 参数

目标元素的可见性变化时，就会调用观察器的回调函数`callback`。

`callback`一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```js
var io = new IntersectionObserver((entries) => {
  console.log(entries);
});
复制代码
```

`callback`函数的参数（`entries`）是一个数组，每个成员都是一个`IntersectionObserverEntry`对象。如果同时有两个被观察的对象的可见性发生变化，`entries`数组就会有两个成员。

`IntersectionObserverEntry`对象提供目标元素的信息，一共有六个属性。

```js
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
复制代码
```

每个属性的含义如下。

- `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
- `target`：被观察的目标元素，是一个 DOM 节点对象
- `rootBounds`：根元素的矩形区域的信息，`getBoundingClientRect()`方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回`null`
- `boundingClientRect`：目标元素的矩形区域的信息
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
- `intersectionRatio`：目标元素的可见比例，即`intersectionRect`占`boundingClientRect`的比例，完全可见时为`1`，完全不可见时小于等于`0`

#### 1.3 Option 对象

`IntersectionObserver`构造函数的第二个参数是一个配置对象。它可以设置以下属性。

**1.3.1 threshold 属性:**

`threshold`属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为`[0]`，即交叉比例（`intersectionRatio`）达到`0`时触发回调函数。

```js
new IntersectionObserver(
  (entries) => {
    /* ... */
  },
  {
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }
);
复制代码
```

用户可以自定义这个数组。比如，`[0, 0.25, 0.5, 0.75, 1]`就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

**1.3.2 root 属性、rootMargin 属性:**

很多时候，目标元素不仅会随着窗口滚动，还会在容器里面滚动（比如在`iframe`窗口里滚动）。容器内滚动也会影响目标元素的可见性。

IntersectionObserver API 支持容器内滚动。`root`属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

```js
var opts = {
  root: document.querySelector(".container"),
  rootMargin: "500px 0px",
};

var observer = new IntersectionObserver(callback, opts);
复制代码
```

上面代码中，除了`root`属性，还有rootMargin属性。后者定义根元素的`margin`，用来扩展或缩小`rootBounds`这个矩形的大小，从而影响`intersectionRect`交叉区域的大小。它使用 CSS 的定义方法，比如`10px 20px 30px 40px`，表示 top、right、bottom 和 left 四个方向的值。

这样设置以后，不管是窗口滚动或者容器内滚动，只要目标元素可见性变化，都会触发观察器。