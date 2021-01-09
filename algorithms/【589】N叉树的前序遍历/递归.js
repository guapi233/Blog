/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  const result = [];

  const helper = (node) => {
    if (!node) return;

    result.push(node.val);

    node.children.forEach((child) => {
      helper(child);
    });
  };

  helper(root);

  return result;
};
