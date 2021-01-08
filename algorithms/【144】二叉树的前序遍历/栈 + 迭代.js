/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const result = [],
    stack = [];

  while (root) {
    result.push(root.val);
    stack.push(root);
    root = root.left;
  }

  while (stack.length) {
    let node = stack.pop();
    node = node.right;

    while (node) {
      result.push(node.val);
      stack.push(node);
      node = node.left;
    }
  }

  return result;
};
