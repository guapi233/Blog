import install from "./install";
import createMatcher from "./create-matcher";
import HashModel from "./mode/hash";
import HistoryModel from "./mode/history";

export default class VueRouter {
  /**
   * VueRouter 的构造函数
   * @param {Object} options 传入的 router 配置对象
   */
  constructor(options) {
    // 1. 将用户传递的 routers 扁平化，方便维护与匹配
    this.matcher = createMatcher(options.routes || []);

    // 2. 根据配置的 mode 选择不同的路由模型
    this.mode = options.mode || "hash";
    this.model =
      this.mode === "history" ? new HistoryModel(this) : new HashModel(this);
  }

  /**
   * 初始化路由 包括监听路径变动
   * @param {Vue} app Vue实例 app对象
   */
  init(app) {
    // 初始化页面 将页面的状态初始化为当前路径对应的路由信息 并且添加 状态监听器
    const model = this.model;
    model.transitionTo(model.getCurrentLocation(), model.setupListener());

    // 监听 route 路由信息变化
    model.listen((route) => {
      app._route = route; // 视图就可以刷新了
    });
  }

  /**
   * 中转函数，实际上调用的是 router实例.matcher.match(匹配方法)
   * @param {*} location 路径
   */
  match(location) {
    return this.matcher.match(location);
  }
}

VueRouter.install = install;
