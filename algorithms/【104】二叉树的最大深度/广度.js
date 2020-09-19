/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;

  // 队列 总层数
  let queue = [root],
    count = 1;

  while (queue.length) {
    // 每层节点的数量
    let levelCount = queue.length,
      node;

    for (let i = 0; i < levelCount; i++) {
      node = queue.shift();

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    if (queue.length) count++;
  }

  return count;
};
