# Jest处理静态资源

一般像图片、CSS、字体这种静态文件我们是不希望Jest帮我们解析测试的，配置如下：

```js
// jest.config.js  
moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
},
```

且需要安装`identity-obj-proxy`。