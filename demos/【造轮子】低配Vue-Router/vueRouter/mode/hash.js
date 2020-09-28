import BaseModel from "./base";

/**
 * 获取当前路径Hash
 */
const getHash = () => {
  return window.location.hash.slice(1);
};

/**
 * 确保路径 至少有个 斜线 /
 */
const ensureSlash = () => {
  if (window.location.hash) return;
  window.location.hash = "/";
};

export default class HashModel extends BaseModel {
  constructor(router) {
    super(router);

    // 确保路径 至少有个 斜线 /
    ensureSlash();
  }

  /**
   * 获取当前定位
   */
  getCurrentLocation() {
    return getHash();
  }

  /**
   * Hash模式下通过 hashchange 事件来监听 路径栏 的变化，并根据该变化更改路由状态
   */
  setupListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  }
}
