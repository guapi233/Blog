const minDepth = (root) => {
  if (root == null) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length) {
    const levelSize = queue.length;

    // 将本层中所有的节点抛出
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();

      // 如果左右子树都无节点，直接返回现有的层数
      if (cur.left == null && cur.right == null) {
        return depth;
      }

      // 哪边有添加那边，继续处理
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }

    depth++;
  }
};
