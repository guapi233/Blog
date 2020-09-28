import createRouteMap from "./create-route-map";
import { createRoute } from "./mode/base";

/**
 * 处理路由数据，返回包含 匹配路由 和 动态添加路由 等方法的对象
 * @param {Array} routes 用户传入的路由规则
 * @returns {Object} 包含 匹配路由方法 & 动态添加路由方法 的对象
 */
const createMatcher = (routes) => {
  // 扁平化用户传入的数据 创建路由映射表
  // ["/". "/a", "/a/b", "/a/b/c"]  { "/": "记录", "/a": "记录" }
  let { pathList, pathMap } = createRouteMap(routes); // 初始化配置

  // 动态添加路由 方法
  const addRoutes = (routes) => {
    createRouteMap(routes, pathList, pathMap);
  };

  // 用来匹配路由的方法
  const match = (location) => {
    let record = pathMap[location];
    let local = {
      path: location,
    };

    if (record) {
      return createRoute(record, local);
    }

    return createRoute(null, local);
  };

  return {
    match,
    addRoutes,
  };
};

export default createMatcher;
