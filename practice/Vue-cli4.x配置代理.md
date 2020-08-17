# Vue-cli4.x配置代理

在做一个音乐app项目时遇到了这个问题，因为API是用得QQ音乐的，所以无法直接访问。

之前是了解过代理相关的内容的，所以知道要用上代理了，但是一直没有实践过，而且4.x脚手架封装了一部分配置操作，搞得更不知道何从下手。



## 答案

好在网上有相关内容的博客，按照博客来编写，首先需要在`vue.config.js`中添加以下配置项：

```js
module.exports = {
  devServer: {
    proxy: {
      "/api/getDiscList": {
        target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
        changeOrigin: true,
      },
    },
  },
};
```

上面的配置项可以搭建一个最基本的代理，当有接口访问devServer的`/api/getDiscList`接口时，服务器就会将该请求代理至`target`服务器。`changeOrigin`为`true`的话会将代理服务器的`host`字段修改为`target`，可以躲避一些服务器的检测。



### 坑1.0

本来我是以为问题就这么被解决了，但是当我访问接口时却得到了404响应，在搜索引擎中没有得到想要的答案后，通过网友的提点，得知是缺少了`pathRewrite`字段：原来，代理服务器会默认将代理路由的`key`合并到`target`请求上发送出去，于是上面的请求发出去的`url`是`https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg/api/getDiscList`，这显然是错误的，而`pathRewrite`字段则可以通过正则的方式替换掉`key`，确保正确的`url`：

```js
module.exports = {
  devServer: {
    proxy: {
      "/api/getDiscList": {
        target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
        changeOrigin: true,
        pathRewrite: {
    	  "^/api/getDiscList": "",
        },
      },
    },
  },
};
```

上面是将开头为`/api/getDiscList`的`key`替换为空字符串，这样`target`与空字符串拼接也不会带来任何影响。



## 坑2.0

做完上面的工作后，发现请求是可以正常发出了，但是却得到了目的服务器那边错误的状态码，这是因为QQ音乐的这个接口不止检测`host`字段，还会对`referer` 字段进行判断，如果不为符合条件的值，则会打回这条请求。

解决方法并不困难，只需要让代理服务器在请求目的服务器时带上一个符合条件的`referer`属性即可，那么问题就是如果做到这件事，还是因为4.x脚手架做了封装的原因，我不知道如何以及何时为代理服务器的`request`对象挂载对应`header`。

最后是通过webpack的文档得知其使用了[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)这一代理服务器库，在通过该库的文档得知了合适的钩子函数，最后解决了问题。

```js
module.exports = {
  devServer: {
    proxy: {
      "/api/getDiscList": {
        target: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",
        changeOrigin: true,
        pathRewrite: {
          "^/api/getDiscList": "",
        },
        onProxyReq(onProxyReq, req, res) {
          onProxyReq.setHeader("referer", "https://c.y.qq.com/");
        },
      },
    },
  },
};
```



