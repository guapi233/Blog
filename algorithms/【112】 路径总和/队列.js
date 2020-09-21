var hasPathSum = function (root, sum) {
  // 根节点为null 直接return
  if (!root) return false;

  // 队列中的每项存储 节点与节点携带的总值
  const queue = [[root, root.val]];

  while (queue.length) {
    const [curr, path] = queue.shift();

    // 拿出左右子节点
    const { left: l, right: r } = curr;

    // 如果总值已经等于要求，且无子节点，返回true
    if (path === sum && !l && !r) return true;

    // 否则将子节点与相加后的值添入队列中
    if (l) queue.push([l, path + l.val]);
    if (r) queue.push([r, path + r.val]);
  }

  // 循环结束依旧没有结果则返回false
  return false;
};
