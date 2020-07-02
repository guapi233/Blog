module.exports = {
  adapter: getDefaultAdapter(),
};

function getDefaultAdapter() {
  let adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    // 在浏览器中使用XHR请求适配器
    adapter = require("./lib/xhrAdapter");
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    // 在Node中使用http适配器（未实现）
    adapter = require("./lib/httpAdapter");
  }
  return adapter;
}
