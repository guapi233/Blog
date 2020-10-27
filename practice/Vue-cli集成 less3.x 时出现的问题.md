# Vue-cli集成 less3.x 时出现的问题

**项目背景**

CSS 预处理选择的是`sass`，但是UI组件库选择的是以`less`为基础的`view-design`，因为有主题定制的需求，所以只能手动集成`less`。



**问题**

`less`在升级到3.x后，在集成时可能会报出以下的错误：

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

