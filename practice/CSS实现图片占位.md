# CSS实现图片占位

在我们实际开发过程中，图片加载之前通常需要一个元素来进行占位，否则无法保证页面结构的正常展示，一般我们都是通过监听图片加载完毕实现该工程，这里记录一个巧妙利用CSS特性实现的方法。



## 代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      img {
        position: relative;
        height: 100%;
        width: 100%;
      }

      img::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        /* 此处路径为任意 本地图片路径，用于占位 */
        background: url("./xx.png") no-repeat center;
      }
    </style>
  </head>

  <body>
    <div style="width: 300px; height: 300px"><img src="" /></div>
  </body>
  <script>
    setTimeout(function () {
      // 此处路径为 实际图片路径
      document.querySelectorAll("img")[0].src =
        "https://www.baidu.com/img/flexible/logo/pc/result.png";
    }, 3000);
  </script>
</html>

```



## 实现思路

利用after伪元素无法在img标签上使用的特性，在img加载完毕后会自动使自身上的after伪元素失去效果，通过这一原理实现加载完毕前的占位。