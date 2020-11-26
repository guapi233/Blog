# Node.js相互引用模块执行**机制**

**A.js：**

```js
module.exports = 'A';

const B = require('./B');
console.log( 'A中的B:', B);

module.exports = 'AA';
```

**B.js**：

```js
module.exports = 'B';

const A = require('./A'); // "A"
console.log( 'B中的A:', A);

module.exports.test = 'BB';
```



## 以为的执行流程

如果A与B存在相互依赖、相互引用关系，不就形成了一个闭环或者说死循环？那程序怎么会继续解析呢？

[![DwUBsU.gif](https://s3.ax1x.com/2020/11/26/DwUBsU.gif)](https://imgchr.com/i/DwUBsU)



## 实际上的执行流程

很显然，运行结果告诉我们，nodejs引擎有自己的一套处理循环引用的机制。下面我们根据上述运行结果，来推演了两个module模块的执行顺序，以了解nodejs打破闭环的机制。

[![DwU0MT.gif](https://s3.ax1x.com/2020/11/26/DwU0MT.gif)](https://imgchr.com/i/DwU0MT)



## 执行机制

[![DwYqJ0.png](https://s3.ax1x.com/2020/11/26/DwYqJ0.png)](https://imgchr.com/i/DwYqJ0)



1. ①执行`modA`第一行，输出一个`test`接口

2. ②执行`modA`第二行，要引入`modB`此时断点产生了,即开始执行`modB`里的代码, 程序开始走`"breakpoint-out"`路线
3. ③执行`modB`第一行
4. ④执行`modB`第二行，要因为modA,此步骤为打破闭环的关键，此时将A里断点之前的执行结果输出给`modB`，如图里的蓝色虚线框标识的部分，此时在`modB`中打印`modA.test`，打印`'A'`
5. ⑤继续执行`modB`第三行
6. ⑥继续执行`modB`第四行，对外输出`test`接口('BB')，此后，`modB`执行完毕，主程序返回至断点处（modA中在②步骤产生的断点），将`modB`的执行结果保存在`'modB' const`变量中。
7. ⑦执行`modA`的第三行
8. ⑧执行`modA`的第四行，打印`'modB'`对象里的`test`接口，根据中指向结果可知，`'modB'`返回的`test`接口为`'BB'`，此，打印`'BB'`，程序结束。

如果`main.js`调用的是`'modB.js'`，分析过程完全一致，打印的结果将是`'B, AA'`。



根据上述分析可知，nodejs中的模块互相引用形成的**“闭环”**其实是用**“断点”**这一方式打开的，以断点为出口去执行其他模块，也以断点为入口进行返回，之后继续执行断点之后的代码。