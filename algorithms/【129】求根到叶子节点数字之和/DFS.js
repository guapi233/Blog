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
var sumNumbers = function (root) {
  if (!root) return [];

  let ret = 0;
  const r = [];

  const dfs = (node, num) => {
    if (node && !node.left && !node.right) {
      ret += parseInt(num + node.val);
      return;
    }

    num += node.val;

    node.left && dfs(node.left, num);
    node.right && dfs(node.right, num);
  };

  dfs(root, "");

  return ret;
};
