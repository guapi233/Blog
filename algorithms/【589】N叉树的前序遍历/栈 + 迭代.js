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
  const stack = [root],
    result = [];

  while (stack.length) {
    const node = stack.shift();
    if (!node) continue;

    result.push(node.val);
    stack.unshift(...node.children);
  }

  return result;
};
