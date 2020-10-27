# Vue-cli4.x配置Scss全局样式

本来以为只需要将存放全局变量的样式表直接导入`main.js`就可以了，结果惨遭打脸。



## 解决方案

在`vue.config.js`中配置如下配置即可，无需在`main.js`中引用：

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 替换路径即可
        prependData: `@import "./src/config/globalTheme.scss";`,
      },
    },
  },
};

```

