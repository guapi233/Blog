/**
 * 通过递归将所有路由信息扁平化拆分为 路由信息列表 及 路由信息映射对象
 * @param {Object} route 单个路由信息对象
 * @param {*} pathList 路径信息列表
 * @param {*} pathMap 路径信息映射对象
 * @param {*} parent 当前路由对象的父路由
 */
const addRouteRecord = (route, pathList, pathMap, parent) => {
  // 将 当前路径 与 父路径 拼接， 并生成与 当前路径 相映射的 路由信息对象
  let path =
    parent && parent.path !== "/" ? parent.path + route.path : route.path;
  let record = {
    path,
    component: route.component,
    parent,
  };

  // 如果 路由映射对象 中不存在 当前路径，则将其添加进 路径列表 与 映射对象 中
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }

  // 如果 当前路由 还存在 子路由，则递归调用当前函数将 子路由们 也添入 路径列表 与 映射对象 中
  if (route.children instanceof Array) {
    route.children.forEach((child) => {
      addRouteRecord(child, pathList, pathMap, route);
    });
  }
};

/**
 *
 * @param {Array} routes 用户传入的 路由信息 数组
 * @param {Array} oldPathList 已经存在的 路由路径列表，没有的话为 空数组
 * @param {Object} oldPathMap 已经存在的 路由映射对象，没有的话为 空对象
 * @returns {Object} 返回处理完毕的 路由路径列表 与 路由映射对象
 */
const createRouteMap = (
  routes = [],
  oldPathList = [],
  oldPathMap = Object.create(null)
) => {
  // 将用户传入的数据 进行格式化

  let pathList = [...oldPathList],
    pathMap = { ...oldPathMap };

  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    pathList,
    pathMap,
  };
};

export default createRouteMap;
