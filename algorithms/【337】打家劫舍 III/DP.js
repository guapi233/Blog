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
var rob = function (root) {
  const dfs = (node) => {
    if (!node) return [0, 0];

    const left = dfs(node.left);
    const right = dfs(node.right);

    const excludeRootMax =
      Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    const includeRootMax = node.val + left[0] + right[0];

    return [excludeRootMax, includeRootMax];
  };

  return Math.max(...dfs(root));
};
