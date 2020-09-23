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
var minDepth = function (root) {
  if (!root) return 0;

  // 如果树的左右子树都不存在，则为 1 层
  if (!root.left && !root.right) return 1;

  // 求出根节点的左右子树的深度，选出最小层数 + 根节点
  let ans = Number.MAX_SAFE_INTEGER;
  if (root.left) {
    ans = Math.min(minDepth(root.left), ans);
  }

  if (root.right) {
    ans = Math.min(minDepth(root.right), ans);
  }

  return 1 + ans;
};
