export const createRoute = (record, location) => {
  let res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return {
    ...location,
    matched: res,
  };
};

export default class BaseModel {
  constructor(router) {
    this.router = router;

    this.current = createRoute(null, {
      path: "/",
    });
  }

  /**
   * 跳转的核心逻辑
   * @param {String} location 目标路径
   * @param {Function} onComplete 完成跳转后的回调
   */
  transitionTo(location, onComplete) {
    // 获取与路径相匹配的 路由信息对象集
    let route = this.router.match(location);

    // 如果与当前的相同 就没有跳转的必要
    if (
      route.path === this.current.path &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }

    // 更新当前路由
    this.updateRoute(route);
    onComplete && onComplete();
  }

  /**
   * 更新当前 current 对象信息
   * @param {Route} route route 信息对象
   */
  updateRoute(route) {
    // 同时更新 非响应式的current对象，以及被router-view所引用的 响应式_route对象
    this.current = route;
    this.cb && this.cb(route); // 路径变化会将最新路径传递给 listen 方法
  }

  /**
   * 将事件添加到监听队列中（伪）
   * @param {Function} cb 回调函数
   */
  listen(cb) {
    this.cb = cb;
  }
}
