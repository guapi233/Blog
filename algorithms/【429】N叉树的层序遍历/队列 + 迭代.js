/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let q = [root],
    result = [];

  while (q.length) {
    const newLevel = [];
    result.push([]);

    for (let node of q) {
      if (!node) continue;

      result[result.length - 1].push(node.val);
      newLevel.push(...node.children);
    }
    q = [];
    newLevel.length && (q = newLevel);
  }

  return result;
};
