# 理解JavaScript执行上下文

## 什么是执行上下文

简而言之，执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。个人理解的是执行上下文就是一个隐形的对象，这个对象上面记录了程序当前执行所依赖的环境因素。

有些地方，比起上下文，我觉得**环境**这个词更容易让人理解，所以我在下文也会在合适的地方使用**环境**这个词语来代替上下文，因为任何一句代码执行，都需要一个执行时的环境，这个环境提供了一些代码执行所需的条件。就好像分析历史事件时，我们必不可少得要分析它所处的时代环境一样，对于代码也是如此。



## 执行上下文的分类

* **全局执行上下文**：是程序最外层的执行环境，当程序开始执行之前，这个执行环境就会被创建，直到程序执行结束才会被释放，且一个程序**至多有一个**全局执行环境
* **函数执行上下文**：每当遇到一个函数**调用**语句时，就会创建一个对应于该函数的执行环境，并且在该函数执行完毕后，该函数的执行环境就会被销毁，一个程序可以同时存在**多个**函数执行环境
* **`eval`执行上下文**：`eval`函数能将一段字符串文本当做程序语句执行，其内部有独特的执行环境，这里不做讨论。



## 执行上下文中的成员

* 变量对象VO（variable object)：

  VO用于存储当前执行环境中所拥有的**变量**以及**函数**，这些**变量**和**函数**可以被在**当前环境中执行**的代码所调用

* 作用域链 （scope chain）：

  作用域链用于规定当前环境下的变量以什么样的方式及顺序进行查找

* this

  this用于记录调用方法的对象



## 执行上下文栈

在了解执行执行上下文栈之前，先来看一道题目，请说出下面两段代码的执行结果，以及它们有何不同：

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

你可能很轻易得看出它们其实最后返回的都是`local scope`，那么它们到底有什么不同呢（老师，我知道，它们的写法不同，老师：爬），我们先来看一下**执行栈**这个玩意到底是啥。

我们知道万物运动发展总有个顺序，浏览器分析和执行代码也一样，总要按着个顺序来，最容易让人想到的是浏览器是按照行一行一行的分析代码并执行它们的，不过仔细一想这个结论就错了，因为语言中是存在作用域的：

```js
var a = 12;

function b () {
    var a = 13;
    console.log(a); // 浏览器咋知道这个a是函数b内的
}
console.log(a); // 浏览器咋知道这个a是全局的
```

如果想当然的按照一行一行的去分析和执行代码，那么代码中作用域早就乱套了，其实小伙伴们可能已经知道了，浏览器一行一行代码执行不假，但是在那之前浏览器还会按照以**段**为单位去分析代码，也就是在代码执行之前，浏览器已经将代码分为了一段一段的代码片段，然后有序的组织这些代码片段来完成程序运作。

那么这一个一个的代码块是啥呢，没错，其实就是我们上面提到的不同类型的执行上下文：**全局执行上下文**就是一个最大的代码片段，这个代码片段包括了程序中所有的代码，并且它其中还包括了以**函数执行上下文**分割出的一个一个的小的代码片段。这些代码片段身上都有一个执行上下文，而执行栈就是存放**执行上下文**的地方，浏览器按照执行顺序依次将**代码片段对应的执行上下文**放入执行栈中，并在一个**代码片段执行完毕后**将其弹出。

知道了执行顺序的原理，下面按照这样的原理分析一段js代码：

```js
function fun3() {
    return "没了，哈哈";
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```

按照全局执行上下文和函数执行上下文的定义，我们发现上面的代码中有`3`处函数调用，那么就表明这段代码一共产生了`3 + 1（全局）`个执行上下文，根据上面的执行顺序原理，来看看浏览器如何处理这些执行上下文：

```javascript
// 伪代码，由于我们还不知道执行上下文的内容是啥，所以用文字表示

// 创建执行栈（execution stack => ECStack）
const ECStack = [];

// 先将全局执行上下文放入执行栈，然后开始执行代码
ECStack.push(全局执行上下文)

// 遇到fun1()，创建fun1的上下文放入执行栈，然后开始执行fun1()
ECStack.push(fun1的执行上下文)

// 执行fun1时发现里面有fun2()，创建fun2的上下文放入执行栈，然后开始执行fun2()
ECStack.push(fun2的执行上下文)

// 执行fun2时发现里面有fun3()，创建fun3的上下文放入执行栈，然后开始执行fun3()
ECStack.push(fun3的执行上下文)

// 执行fun3时没有发现里面有函数调用，遇到return语句，fun3函数执行完毕，弹出执行栈
ECStack.pop()

// 因为fun3()执行完了，fun2中也没有其它代码，fun2函数执行完毕，弹出执行栈
ECStack.pop()

// 因为fun2()执行完了，fun1中也没有其它代码，fun1函数执行完毕，弹出执行栈
ECStack.pop()

// 因为fun1()执行完了，全局中耶没有其它代码，程序执行完毕，弹出执行栈
ECStack.pop()
```

那么最后我们再回到本小节开始提到的问题，以**执行栈变化**的角度来看一下两段代码的执行过程

第一段代码：

```js
// 执行checkscope函数
ECStack.push(checkscope的上下文)

// 发现checkscope函数最后执行了f函数
ECStack.push(f的上下文)

// f函数执行完毕
ECStack.pop()

// 因为f函数执行完毕，return语句成功返回，checkscope执行完毕
ECStack.pop()
```

```js
// 执行checkscope函数
ECStack.push(checkscope的上下文)

// return语句成功返回f函数，checkscope函数执行完毕
ECStack.pop()

// checkscope()执行完毕，后面的"()"开始执行checkscope函数返回的f函数
ECStack.push(f的上下文)

// f函数执行完毕
ECStack.pop()
```

是不是有些不一样呢？

理解了执行上下文栈其实就是理解了程序的运行流程，上面我们简单得介绍了执行上下文中的“成员”，下面我们就具体得介绍它们是什么，起到什么作用，如何运作。



## VO（variable object）

上面我们提到：

> VO用于存储当前执行环境中所拥有的**变量**以及**函数**，这些**变量**和**函数**可以被在**当前环境中执行**的代码所调用

在正式介绍VO之前，我们先了解一个老朋友，**全局对象**，以下内容引自[W3school](https://www.w3school.com.cn/jsref/jsref_obj_global.asp)：

> 全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。

> 在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。

> 例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

“通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性”，例如：

```js
console === window.console; // true
var a = 12;
function b() { console.log(a) };
console.log(this.a, window.a); // 12 12
this.b(); // 12
this === window; // true
```

我们可以通过`window`访问定义在全局的变量以及函数，这不正是VO所具有的特性吗，没错，**全局对象其实就是全局执行上下文的VO（变量对象）**。



### 函数上下文中的变量对象（AO）

函数上下文中的变量对象有点特殊，不是称为`variable object`，而是`activation object`，简称AO，其实二者没有本质区别，作用也相同，叫法不同将二者区别开来的原因是因为AO是一种特殊的VO，通过AO，不仅能访问函数中定义的变量和函数，还可以访问传进来的**参数**和特殊对象`arguments`，但是它们并不是一开始就能访问的，而是需要等到该函数开始执行时，函数上下文中的VO才会`activation`化为AO，简单得说：

`AO = VO + arguments + params`，AO就是函数上下文的变量对象，VO就是全局上下文的变量对象。



### VO的初始化流程

我们仍然将程序分为**分析**和**执行**两个阶段，VO的初始化是在代码的**分析**阶段：

1. **如果当前上下文是函数上下文**（再次提醒遇到函数**执行语句**时才会创建上下文），分析函数的所有形参：
   * 将形参名称与对应的值绑定到AO身上，并将值挂到对应位置的arguments上
   * 对于没对应实参的形参，值设为`undefined`
2. 函数声明
   * 如果遇到**函数声明语句**，将函数的名称与该函数的引用挂到当前上下文的VO身上
   * 如果VO身上已经存在与该函数名称相同的标识符，**覆盖**
3. 变量声明
   * 如果遇到`var`变量声明，将变量名与`undefined`挂到当前上下文的VO身上
   * 如果VO身上已经存在与该变量名称相同的标识符，**则忽略该`var`声明**

举个例子：

```js
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```

在执行完分析阶段后，函数`foo`执行上下文身上的AO为：

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c() {},
    d: undefined
}
```

当`foo`函数开始执行时，上面的对象就是其AO的初始状态，然后根据代码的执行，发生状态变化，比如当`foo`函数执行完毕后，AO对象最终的结果为：

```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c() {},
    d: reference to FunctionExpression "d"
}
```

这就是上下文中变量对象（VO/AO）的真面目了，正是因为它们的存在，我们才可以通过它们来访问我们定义的变量，同时也解释了为什么会有变量提升，以及为什么函数声明可以先调用后赋值的原因，最后总结本小节的内容，概括如下：

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值



##作用域链 

在开始正式解释作用域链之前，还是要提一些前置知识，我们知道函数在声明赋值的那一刻其作用域就已经决定了，而不是根据调用语句动态变化的，根据这一特性也拓展出了闭包这一概念，举个例子：

```js
var inner;

function wrapA() {
  var item = "我在wrapA中";

  inner = function () {
    console.log(item);
  };
}

function wrapB() {
  var item = "我在wrapB中";

  inner();
}

wrapA();
wrapB(); // 我在wrapA中
```

很显然，上面的例子就是一个典型的闭包代码，`inner`函数没有去拿`warpB`中的`item`就说明`inner`函数的父亲一开始就已经决定好了，完全不受`inner()`调用位置的影响。

综上所述，JavaScript中的函数是典型的静态作用域，或者说叫做**词法作用域**。



### 作用域链的构建过程

了解词法作用域对了解作用域链创建的过程有重大帮助，我们现在知道了函数的作用域受**函数静态声明赋值的地方**影响，那么js是如何创建出每一个函数中的作用域链，使得这些函数可以按着这条链条向上查询变量的呢？

托词法作用域的福，其实每个函数在声明赋值时身上都有一个`[[Scopes]]`隐藏属性，你可以见过这个属性，因为使用`console.dir`打印函数时可以看到这个属性，这个属性其实就记录了所有**父变量**的引用层级链，但是注意：`[[Scopes]]`并不代表完整的作用域链，具体的原因等我们待会再说。

下面我们举个例子来展示下`[[Scopes]]`大概的样子：

```js
function foo() {
    function bar() {
        ...
    }
}
```

函数创建时，各自的`[[Scopes]]`为：

```js
// 伪代码

foo.[[Scopes]] = [
    globalContext.VO
];

bar.[[Scopes]] = [
    fooContext.AO,
    globalContext.VO
];
```

上面我们提到了，`[[Scopes]]`并不是完整的作用域链，那么什么时候完整的作用域链会产生呢？其实不难想到，当我们在一个函数中使用一个变量时，会如何查找该变量的值呢？肯定是先去自身AO上找，找不到在沿着作用域链向上找，那么要构建完整的作用域链，就必须等到自身AO创建完毕后，下面我们就一起来看一下一条完整的作用域链是如何构建的：

```js
// 示例函数

var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

1. 浏览器遇到`function checkscope() {}`声明语句，保存当前的作用域链到其内部属性`[[Scopes]]`上

   ```js
   checkscope.[[Scopes]] = [
       globalContext.VO
   ];
   ```

2. 浏览器遇到`checkscope()`执行语句，创建该函数的执行上下文，激活AO，并将上下文压入执行栈

   ```js
   ECStack = [
       checkscopeContext,
       globalContext
   ];
   ```

3. 开始进行分析AO对象内容前的准备工作，使用`[[Scopes]]`属性创建上下文中的作用域链

   ```js
   checkscopeContext = {
       Scope: checkscope.[[Scopes]],
   }
   ```

4. 开始创建AO对象中的内容

   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope2: undefined
       }，
       Scope: checkscope.[[Scopes]],
   }
   ```

5. 将AO压入该函数的作用域链顶端

   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope2: undefined
       },
       Scope: [AO, [[Scopes]]]
   }
   ```

6. 分析工作结束，开始执行函数，并根据函数内部代码，修改对应的AO内容

   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope2: 'local scope'
       },
       Scope: [AO, [[Scopes]]]
   }
   ```

7. 根据`Scope`找到`scope2`的值，并将其返回，函数上下文从执行栈中弹出

   ```js
   ECStack = [
       globalContext
   ];
   ```

这样一条作用域链从构建到销毁的全过程就结束了，上面的过程虽然有好多细节上的不同，但是足够我们了解作用域链的大概了，比如为什么外面的代码没法访问函数中的变量，其实就是外面的执行上下文中的作用域链没有该函数的AO引用，理所当然也就拿不到AO中的变量引用了。

**V8优化细节：V8为了优化闭包，不会在`[[Scopes]]`存储一条完整的作用域链，而是只会将在内部函数中使用到，也就是产生了闭包的变量引用存下来，其他的变量都会虽然外部函数的结束而销毁。换句话说，如果你没有利用闭包引用外部函数中的变量，那么无论你这个函数嵌套了多少层，它的作用域链总是只有自身的AO和全局对象。**



## this

`this`内容略，这里推荐一篇[文章](https://github.com/mqyqingfeng/Blog/issues/7)，作者[冴羽](https://github.com/mqyqingfeng) ，大大通过ECMA规范实现的角度，讲解了一些例如`Reference、MemberExpression`等规范内属性，ECMA正是对`MemberExpression`进行求值，判断结果是否为`Reference`

类型，进行对应的this绑定。

大大这种写法的动机是这样的一句函数调用`(false || foo.bar)()`，我一开始认为最终调用中的`this`为`foo`，但其实它内部是`window`，其实`(false || foo.bar)`部分就是`MemberExpression`，对其求值后结果不为`Reference`类型，所以`this`隐式处理（严格为`undefined`，非严格为`window`）。

个人理解是`||`对`foo.bar`进行求值操作了，直接拿到了`bar()`的引用，包括`,`已经`=`这两个运算符，都对右侧操作对象进行了求值，而`(foo.bar)()`中的小括号运算符没有对其中内容运算的必要，所以`foo.bar`这条引用路径仍被保留，不过这些都是个人通过表象推测的，真正原理还是要通过规范来获取。



## 捋一下

还是下面这个例子，我们从头捋一下它们的执行上下文的构建过程（注意，下面的流程只是大概的过程，例如作用域链方面由于浏览器优化可能会与实际流程不同）：

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```



### 第一个

1. 首先创建全局执行上下文，将全局对象绑定到VO，并压入执行栈

   ```js
   ECStack = [
       globalContext
   ];
   ```

2. 遇到`function checkscope(){}`声明语句，记录该函数存在的词法作用域链

   ```js
   checkscope.[[Scopes]] = [
       globalContext.VO
   ]
   ```

3. 遇到`checkscope()`执行语句，压入执行栈并开始构建该函数的AO对象：

   ```js
   ECStack = [
       checkscopeContext,
       globalContext
   ]
   
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope: undefined,
           f: reference to function f(){},
       }
   }
   ```

4. 构建AO的途中发现`function f(){}`声明语句，记录该函数的词法作用域链：

   ```js
   f.[[Scopes]] = [
       checkscopeContext.AO,
       globalContext.VO
   ]
   ```

5. `checkscope`函数的AO构建完毕，开始通过`[[Scopes]]`连接作用域链：

   ```js
   checkscopeContext = {
       AO: {
           arguments: {
               length: 0
           },
           scope: undefined,
           f: reference to function f(){},
       },
       scope: [AO, [[Scopes]]] // [[Scopes]] = globalContext.VO
   }
   ```

6. 开始执行`checkscope()`，`this`设置为`window`（非严格）,并根据其中的代码更新AO对象：

   ```js
   AO.scope: undefined => "local scope";
   ```

7. 执行到`return`部分发现`f()`执行语句，压入执行栈并开始构建该函数的AO对象：

   ```js
   ECStack = [
       fContext,
       checkscopeContext,
       globalContext
   ]
   
   fContext = {
       AO: {
           arguments: {
               length: 0
           },
       }
   }
   ```

8. `f`函数的AO构建完毕，开始通过`[[Scopes]]`连接作用域：

   ```js
   fContext = {
       AO: {
           arguments: {
               length: 0
           },
       },
       scope: [AO, [[Scopes]]] // [[Scopes]] = checkscopeContext.AO, globalContext.VO
   }
   ```

9. `f`函数开始执行，`this`设置为`window`，执行`f`时发现自身的AO中没有`scope`变量，开始向上去`checkscopeContext.AO`中寻找，发现值为`local scope`，返回并结束函数执行，从执行栈中弹出

   ```js
   ECStack = [
       checkscopeContext,
       globalContext
   ]
   ```

10. `f()`执行完毕，`checkscope`顺利返回结果，执行完毕并弹出执行栈：

    ```js
    ECStack = [
        globalContext
    ]
    ```



## 第二个

第二段代码的执行过程和第一段代码的**前6步**相同，在**第7步**开始发生变化：

7. 执行到返回语句，顺利将函数`f`返回，结束执行并弹出执行栈：

   ```js
   ECStack = [
       globalContext
   ]
   ```

8. 返回的`f`函数继续通过后面的`()`开始调用，压入执行栈并开始构建该函数的AO对象：

   ```js
   ECStack = [
       fContext,
       globalContext
   ]
   
   fContext = {
       AO: {
           arguments: {
               length: 0
           },
       }
   }
   ```

9. `f`函数的AO构建完毕，开始通过`[[Scopes]]`连接作用域：

   ```js
   fContext = {
       AO: {
           arguments: {
               length: 0
           },
       },
       scope: [AO, [[Scopes]]] // [[Scopes]] = checkscopeContext.AO, globalContext.VO
       // 这里的checkscopeContext.AO通过闭包的形式被引用着（其实只有scope被引用)
   }
   ```

10. `f`函数开始执行，`this`设置为`window`，执行`f`时发现自身的AO中没有`scope`变量，开始向上去`checkscopeContext.AO`中寻找，发现值为`local scope`，返回并结束函数执行，从执行栈中弹出：

    ```js
    ECStack = [
        globalContext
    ]
    ```

