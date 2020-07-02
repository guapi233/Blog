const InterceptorManager = require("./InterceptorManager");
const dispatchRequest = require("./dispatchRequest");

class Axios {
  /**
   * 用于构造Axios实例，此实例并不直接用于对外暴露
   *
   * @param {Object} instanceConfig 默认配置
   */
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  /**
   * 用于串连起整条Promise链
   * @param {Object} config 配置信息
   */
  request(config) {
    // axios.get("https://xxx.com")会进入第一条分支
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = config;
    } else {
      config = config || {};
    }

    // 设置请求方式
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = "get";
    }

    // ✨：串连整条Promise链
    let chain = [dispatchRequest, undefined];
    let promise = Promise.resolve(config);

    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor.onResolved, interceptor.onRejected);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor.onResolved, interceptor.onRejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
}

module.exports = Axios;
