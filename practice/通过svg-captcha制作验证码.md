# 通过 svg-captcha 制作验证码

```js
const svgCaptcha = require("svg-captcha");

// 创建验证码
const newCaptcha = svgCaptcha.create({
  size: 4,
  ignoreChars: '0oO1ilLI',
  color: true,
  noise: Math.floor(Math.random() * 5),
  width: 150,
  height: 38
});

// 两个关键属性
newCaptcha.data // 验证码svg图片
newCaptcha.text // 图片上验证文字
```

**关键配置属性**

* `size`：字符数量
* `ignoreChars`：混淆字符过滤
* `color`：是否开始颜色
* `noise`：干扰线条
* `width`：svg图片宽度
* `height`：svg图片高度 