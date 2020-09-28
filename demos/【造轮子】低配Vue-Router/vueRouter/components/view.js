export default {
  functional: true, // 函数式组件标志
  render(h, { parent, data }) {
    let route = parent.$route; // 当前路由信息对象
    let matched = route.matched; // 与当前路径陆培的 路由信息
    data.routerView = true; // 为当前组件打上一个标识
    let depth = 0; // 组件嵌套深度

    // 通过向上查找 routerView 标志，判断当前组件在第几层嵌套中
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }

      parent = parent.$parent;
    }

    // 根据嵌套层数 选择匹配的路由信息对象
    let record = matched[depth];

    // 如果没有相匹配的 返回空模板
    if (!record) return h();

    // 将匹配到的模板与数据 交给渲染函数
    return h(record.component, data);
  },
};
