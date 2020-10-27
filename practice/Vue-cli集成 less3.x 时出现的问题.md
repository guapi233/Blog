# Vue-cli集成 less3.x 时出现的问题

less在升级到3.x后，在集成时可能会报出以下的错误：

![](https://user-images.githubusercontent.com/11534583/31714259-fef1d1a8-b3c5-11e7-8a35-a36731ddc4b0.png)



### 解决方案

在根目录下创建`vue.config.js`，在其中添加如下内容：

```js
module.exports = {
    css: {
        loaderOptions: {
            less: {
              lessOptions:{
                javascriptEnabled: true,
              }
            }
        }
    },
  }
```

**注意：不要将它创建成一个TS文件。**

