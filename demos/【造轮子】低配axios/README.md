# 简介

简单实现了下axios中比较核心的一部分代码，可以配置[这篇文章食用](https://github.com/guapi233/Blog/issues/3)。



## 目录

├── dist                                                 打包目录

├── lib                                                   核心代码

│   ├── Axios.js                                     Axios类相关内容

│   ├── CancelToken.js                        中断请求

│   ├── dispatchRequest.js                 分发请求

│   ├── InterceptorManager.js           拦截器

│   └── xhrAdapter.js                           请求函数

├── axios.js                                           入口文件

├── defaults.js                                      默认配置

├── package.json                                 模块信息

├── README.md                                  简介

├── webpack.config.js                         webpack配置文件



## 运行

1. 执行`npm install`安装依赖
2. 运行`npm run dev`进行测试