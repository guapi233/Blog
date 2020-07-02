const defaults = require("../defaults");

/**
 * 对请求和响应信息格式化，并调用xhrAdapter发送请求
 *
 * @param {Object} config 请求配置
 * @return {Promise}
 */
module.exports = function dispatchRequest(config) {
  config.headers = config.headers || {};

  // 对请求信息进行格式化，这里只做一种最常用的
  if (config.data && isObject(config.data)) {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
  }

  let adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    (val) => {
      if (val.data) {
        try {
          val.data = JSON.parse(val.data);
        } catch (e) {
          /* 忽略错误 */
        }
      }

      return val;
    },
    (reason) => {
      if (reason.data) {
        try {
          val.data = JSON.parse(reason.data);
        } catch (e) {
          /* 忽略错误 */
        }
      }

      return Promise.reject(reason);
    }
  );
};

function isObject(val) {
  return val !== null && typeof val === "object";
}
