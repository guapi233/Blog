# 关闭IE表单默认的清空与小眼睛样式

在做输入框组件的时候碰到了这个问题。

![](https://s1.ax1x.com/2020/09/05/wVCult.png)



## 解决方案

```CSS
::-ms-clear,
::-ms-reveal {
  display: none;
}
```

