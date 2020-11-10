# textarea高度随内容变化

做项目遇到了这个需求，搜罗了一下，找到了3种较为靠谱的方案。



## div + contentEditable

这种方案实现起来非常简单，不是说`textarea`不好用吗，那就不用好了，直接使用`div`代替。而关键的`contentEditable`是DOM元素身上的一个属性，平常开发几乎不会用到，反而是在富文本领域很受欢迎，这里不做展开。在给`div`设置`div.contentEditable = true;`后，该`div`在页面展示时就拥有了接收输入的能力，同时因为`div`块状元素的特性，内容在超出宽度时就会换行导致`div`高度被撑开，如果内容被删除，高度还会自动回复。

缺点：我没有采用这种方案，所以不知道其他的缺陷。最明显的缺点，也是我pass掉这个方案的主要原因就是——无法使用输入框身上的特性，例如`placeHolder`，而靠自己模仿的话成本好像又有点太大。

下面放上方案的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 20px;
        background-color: #999;
      }

      .input-block {
        width: 100%;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="input-block"></div>
    </div>
  </body>
  <script>
    let box = document.querySelector(".input-block");

    box.contentEditable = true;
  </script>
</html>
```





## textarea + scrollHeight

该方案的原理是将`textarea`的`overflow-y`设置为`hidden`，并通过监听`textarea`的输入变化，来动态赋值`textarea`的高度。

缺点：该方案需要注意的事项非常多，由于是动态赋值的`textarea`的`scrollHeight`，而`scrollHeight`又不包含元素的`padding`和`border`，如果不添加`box-sizing: border-box;`就很容易导致元素高度失控。并且该方案不会监听元素高度的恢复，一旦撑开了就无法恢复了。

下面是该方案的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        background-color: #999;
      }

      .input-block {
        width: 100px;
        display: block;
        overflow-y: hidden;
        resize: none;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <textarea class="input-block"></textarea>
    </div>
  </body>
  <script>
    let box = document.querySelector(".input-block");
    let boxHeight = box.scrollHeight;

    box.addEventListener("input", (e) => {
      if (Number(e.target.scrollHeight) > Number(boxHeight)) {
        boxHeight = e.target.scrollHeight;
        box.style.height = boxHeight + "px";
      }
    });
  </script>
</html>
```



## div + textarea

那么有没有即可以使用输入框的特性，又可以自由响应内容的高度，并且坑还少的方案呢，其实是有的，该方案就是兼顾了上面两种方案的特性来实现的，原理：

1. 在一个外层`div`中放置一个`div`和`textarea`
2. 将外层`div`设置相对定位并且`textarea`绝对定位覆盖到表面，同时将内部`div`的`visibility`设置为`hidden`使其隐藏起来
3. 将输入框的高度设为`100%`，并且为内部`div`添加`word-break: break-all;`
4. 最后监听输入框的变化，将输入的值传递到隐藏起来的`div`中，这样内部的`div`就会因为内容的扩充而被撑开，从而导致外层`div`也被撑开。

缺点：还未发现什么大的缺陷，需要注意的一点是内部`div`要和输入框的字体大小及类型相同，以及`padding`和`border`也相同，确保二者的内容宽一样。

下面的该方案的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        background-color: #999;
        position: relative;
      }

      .hidden-block {
        font-family: monospace;
        visibility: hidden;
        word-break: break-all;
        padding: 2px;
        border: 1px solid;
        min-height: 20px;
        font-size: 16px;
      }

      .input-block {
        font-family: monospace;
        position: absolute;
        left: 0;
        top: 0;
        width: 100px;
        height: 100%;
        display: block;
        overflow-y: hidden;
        font-size: 16px;
        resize: none;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="hidden-block"></div>
      <textarea class="input-block"></textarea>
    </div>
  </body>
  <script>
    let box = document.querySelector(".input-block");
    let hiddenBox = document.querySelector(".hidden-block");

    box.addEventListener("input", (e) => {
      hiddenBox.innerHTML = e.target.value;
    });
  </script>
</html>
```



## 最后

记着将输入框的`keydown`中`enter`默认事件阻止掉，不然会因为换行而导致外层被错误撑开。