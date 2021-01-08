/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  if (!root) return [];
  const result = [],
    stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (node && node.children.length) stack.push(...node.children);

    result.unshift(node.val);
  }

  return result;
};
