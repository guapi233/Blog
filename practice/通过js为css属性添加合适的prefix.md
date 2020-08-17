# 通过js为css属性添加合适的prefix

一般在通过webpack进行工程代码开发时，我们无需关心在**Style**中书写的样式的前缀问题，那是因为有专门的**prefix-loader**来完成这项工作，但是如果是在js代码中动态添加的css代码就享受不到这种便利了，于是可以通过下面封装的一个工具方法来实现自动检测补全css属性前缀。



## 答案

其实原生js就有对css属性支持的检测能力，我们可以通过下面的方法来检测某一个css属性应该添加哪种前缀：

```js
let elementStyle = document.createElement("div").style;

let vendor = (() => {
  // 各个浏览器厂商的前缀
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform",
  };

  // 不支持的前缀不会定义在dom元素的style属性上，为undefined
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  // 如果都不满足，那这个浏览器肯定有毛病
  return false;
})();
```

检测到css属性支持的浏览器前缀后，只需要做字符拼接就可以了：

```js
/**
 * css3属性添加前缀
 * @export
 * @param {any} style 样式
 * @returns 前缀+style
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
```



## 完整代码

```js
/**
 * 给dom元素添加类名
 * @param {dom} el dom
 * @param {string} className 类名
 */
export function addClass(el, className) {
  el.classList.add(className);
}

/**
 * 判断dom是否有这个类名
 * @param {dom} el dom对象
 * @param {string} className 类名
 */
export function hasClass(el, className) {
  return el.classlist.contains(className);
}

/**
 * 设置或者获取dom元素的data-属性
 * @param {dom} el dom
 * @param {属性} name
 * @param {*} val
 */
export function getData(el, name, val) {
  const prefix = "data-";
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  } else {
    return el.getAttribute(name);
  }
}

let elementStyle = document.createElement("div").style;

let vendor = (() => {
  // 各个浏览器厂商的前缀
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform",
  };

  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  // 如果都不满足，那这个浏览器肯定有毛病
  return false;
})();

/**
 * css3属性添加前缀
 * @export
 * @param {any} style 样式
 * @returns 前缀+style
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === "standard") {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

```

