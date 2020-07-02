# 【造轮子】低配axios



## Axios、axios、instance之间的关系



## axios的执行流程



## 实现Axios



## 实现axios()、axios.create()



## 实现Axios.prototype.request()

用于串连起整条Promise链，包括：

 【request拦截器】 -- 【dispatchRequest】 -- 【response拦截器】  --  【回调函数】



## 实现dispatchRequest

用于格式化请求信息以及响应信息，并调用xhrAdapter发送请求



## 实现xhrAdapter

用于发送请求



## 实现中止请求

