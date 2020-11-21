# contentEditable实现支持EMOJI的输入框

尽可能为你提供一些思路。



## contentEditable

`contentEditable`是实现本功能的核心属性，在`div`什么开启此元素后，`div`便拥有了接收输入的功能。

```html
  <div contenteditable ></div>
```



## 如何实现placeholder效果？

虽然`div`拥有了接收输入的功能，但毕竟`placeholder`是输入框独有的特性，所以需要我们自行实现，`placeholder`具有以下特点：

* 在输入区无文本时显示
* 在输入区有文本时隐藏
* 不能被选中，不会被光标所捕获

分析了`placeholder`的特点，只需按照这个功能实现即可，方法也很简单，只需要创建一个元素，在其中输入`placeholder`的内容，将其定位到相应的位置即可。

```css
.placeholder {
  &::before {
    content: attr(placeholder);
    position: absolute;
    top: 0;
    left: 0;
    color: #99a2aa;
  }
}
```



## 光标是什么？如何记录光标的位置？ 

**注意：一下内容为非IE的解释方法，在IE中有部分API与内容中不同，如果想在IE中实现效果，只需替换成IE支持的API即可**

在HTML里面，光标是一个对象，光标对象是只有当你选中某个元素的时候才会出现的。最主要的两个对象分别为`selection`和`range`。

首先来说`selection`，它是保存浏览器中**当前光标**的信息对象（例如光标所处的元素，偏移位置等），通过`window.getSelection()`获取，理所当然，既然作为信息对象，那么它身上的属性是**只读**的。并且只是存储**当前光标**的信息，这是因为部分浏览器支持按住`ctrl`选中多个独立的区域，创建多个光标（chrome禁止了这个特性，所以一般情况下只有一个光标），那么如果修改光标的位置呢，这就需要我们找到真正的光标对象了。

`range`对象就是真正控制个体光标的对象了，可以通过`selection对象身上的getRangeAt(索引，一般为0)`，你可能有些疑惑，为什么不是`cursor`，而是`range`，这其实我们的输入光标不是一个点，而是一个片段区域，是有**开始点**和**结束点**的，我们对文字按下左键向右拉的时候，就看到了文字变成**蓝色**，那个就是光标的开始和结束，当我们直接点一下的时候，光标在**闪**，其实只是开始和结束点**重叠**了。而`range`对象中就包含了操作当前输入光标位置的[方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)。



## 插入文本/元素

想要往文本区插入内容不难，甚至可以说方法百出，但是这里真正需要注意的是**怎么在保持光标位置正常的情况下插入内容**

```ts
  private insertElm(element: any) {
    // 1. 判断光标存在的元素，根据不同类型的元素做出不同的处理（光标可能处于的节点类型在 focus 函数中有表明）
    this.cursorNode = this.cursorNode || this.ctextarea;

    if (this.cursorNode.nodeType !== 3) {
      // 1.1 在空的文本域中直接插入元素
      const textNode = document.createTextNode("");
      this.cursorNode.prepend(textNode);
      if (typeof element === "string") {
        this.cursorNode.insertAdjacentText("afterbegin", element);
      } else {
        this.cursorNode.insertAdjacentElement("afterbegin", element);
      }

      this.cursorNode = textNode;
      this.cursorPos = 0;
    } else {
      if (typeof element === "string") {
        this.cursorNode.insertData(this.cursorPos, element);
        this.cursorPos += element.length;
      } else {
        // 1.1 从光标处切割文本节点
        const afterNode = this.cursorNode.splitText(this.cursorPos);
        // 1.2 在切开的两个文本节点间插入元素
        this.cursorNode = afterNode;
        this.cursorPos = 0;
        afterNode.parentNode.insertBefore(element, afterNode);
      }
    }

    // 2. 提醒父组件内容状态变化 & 重新固定光标
    this.$emit("update:value", this.ctextarea.innerHTML);
  }
```

上面的代码一共分出了四种情况处理插入：

1. 在元素节点中插入文本节点
2. 在元素节点中插入元素节点
3. 在文本节点中插入文本节点
4. 在文本节点中插入元素节点

这四种情况使用的插入方式不同，且同步光标坐标的方式也不同。有两种插入数据格式不奇怪，但是为什么会有两种数据插入位置呢，这是因为当`div`中没有输入内容时，这时光标聚焦在`div`身上，而一旦`div`中输入了数据，光标就会聚焦到`div`中的文本节点身上，并且如果触发了回车换行事件，文本域`div`就会再创建一个内部`div`用于换行，这样就造成了光标要么处于`div`元素身上，要么处于文本节点身上。上面的代码给出的四种解决方案为：

1. 在元素节点中插入文本节点，首先插入一个空文本节点，在将文本节点插入到元素节点内部的最前面，最后将光标设置在空文本的0位置
2. 在元素节点中插入文本节点，首先插入一个空文本节点，在将元素节点插入到元素节点内部的最前面，最后将光标设置在空文本的0位置
3. 在文本节点中插入文本节点，直接插入文本节点，并延长光标位置为插入的长度
4. 在文本节点中插入元素节点，首先插入一个空文本节点，将文本节点沿着光标位置切割成两个新的文本节点，将元素节点插入到两个文本节点中间，最后将光标设置在切割完的第二个文本节点的0位置





