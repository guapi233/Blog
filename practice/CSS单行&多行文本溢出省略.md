# CSS单行&多行文本溢出省略

## 单行

```CSS
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
```



## 多行

```CSS
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2; // 行数
-webkit-box-orient: vertical;
```

- `-webkit-line-clamp`：`-webkit-line-clamp`是`webkit`的私有属性，是一个 不规范的属性`（unsupported WebKit property）`，它没有出现在 CSS 规范草案中。用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的`WebKit`属性。常见结合属性：
- [`display: -webkit-box;`](http://www.css88.com/book/css/properties/layout/display.htm) ：必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 
- [`-webkit-box-orient`](http://www.css88.com/book/css/properties/flexible-box/box-orient.htm) ：必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 
- [text-overflow](http://www.css88.com/book/css/properties/user-interface/text-overflow.htm)：可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。