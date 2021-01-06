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
var inorderTraversal = function (root) {
  const stack = [],
    result = [];

  // 将第一次能压入的左节点都压入
  while (root) {
    stack.push(root);
    root = root.left;
  }

  while (stack.length) {
    let node = stack.pop();
    result.push(node);
    node = node.right;

    while (node) {
      stack.push(node);
      node = node.left;
    }
  }
};
