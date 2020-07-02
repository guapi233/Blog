module.exports = function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let requestData = config.data,
      requestHeaders = config.headers;

    // 创建XHR请求对象
    let request = new XMLHttpRequest();

    // 初始化XHR请求对象
    request.open(config.method.toUpperCase(), config.url, true);

    // 将config的配置应用于request身上
    request.timeout = config.timeout;

    // 设置请求头
    for (let key in requestHeaders) {
      request.setRequestHeader(key, requestHeaders[key]);
    }

    // 监听请求
    request.onreadystatechange = function () {
      if (!request || request.readyState !== 4) return;

      let response = {
        data: request.responseText,
        status: request.status,
        statusText: request.statusText,
      };

      if (request.status >= 200 && request.status < 300) {
        resolve(response);
      } else {
        let err = new Error(`请求出错了，状态码：${request.status}`);
        err.response = response;

        reject(err);
      }

      request = null;
    };

    // 监听超时
    request.ontimeout = function () {
      let err = new Error(`请求超时了，限定时长：${config.timeout}`);

      reject(err);

      request = null;
    };

    // 发送请求
    request.send(requestData);
  });
};
