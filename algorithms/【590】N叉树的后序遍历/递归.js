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
  const result = [];

  const helper = (nodeList) => {
    if (!nodeList || !nodeList.length) return;

    nodeList.forEach((node) => {
      if (!node) return;

      helper(node.children);
      result.push(node.val);
    });
  };

  helper([root]);

  return result;
};
