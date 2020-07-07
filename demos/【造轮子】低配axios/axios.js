const Axios = require("./lib/Axios");
const defaults = require("./defaults");

/**
 * 基于Axios.prototype.request创建一个函数，该函数作为Axios的实例来使用
 *
 * @param {Object} defaultConfig 默认配置
 * @return {Axios}  Axios的函数实例
 */
function createInstance(defaultConfig) {
  let context = new Axios(defaultConfig);
  let instance = context.request.bind(context);

  Reflect.ownKeys(Axios.prototype).forEach((key) => {
    if (key === "constructor") return;

    if (typeof Axios.prototype[key] === "function") {
      instance[key] = Axios.prototype[key].bind(context);
    } else {
      instance[key] = Axios.prototype[key];
    }
  });

  Reflect.ownKeys(context).forEach((key) => {
    if (typeof Axios.prototype[key] === "function") {
      instance[key] = context[key].bind(context);
    } else {
      instance[key] = context[key];
      console.log(instance, key);
    }
  });

  return instance;
}

// 创建对外导使用的axios函数，同时在逻辑上它也是Axios的实例
let axios = createInstance(defaults);

/**
 * 创建一个新“函数”实例
 *
 * @param {*} instanceConfig
 */
axios.create = function (instanceConfig) {
  let config = {};

  // 复制默认配置
  for (let key in axios.defaults) {
    config[key] = axios.defaults[key];
  }

  // 覆盖默认配置
  for (let key in instanceConfig) {
    config[key] = instanceConfig[key];
  }

  return createInstance(config);
};

module.exports = axios;

try {
  if (window) {
    window.axios = axios;
  }
} catch (e) {}
