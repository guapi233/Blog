/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;

  let queue = [root.left, root.right];

  while (queue.length) {
    let curNode1 = queue.shift(),
      curNode2 = queue.shift();

    // 判断
    if (!curNode1 && !curNode2) continue;
    if (!curNode1 || !curNode2) return false;
    if (curNode1.val !== curNode2.val) return false;

    // 向队列中按要求的顺序填充
    queue.push(curNode1.left);
    queue.push(curNode2.right);
    queue.push(curNode1.right);
    queue.push(curNode2.left);
  }

  // 扛过了过滤就返回true
  return true;
};
