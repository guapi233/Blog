/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  let pQueue = [p],
    qQueue = [q],
    result = true;

  while (pQueue.length > 0 && qQueue.length > 0) {
    let topNode1 = pQueue.shift(),
      topNode2 = qQueue.shift();

    if (!topNode1 && !topNode2) continue;

    if (!topNode1 || !topNode2) return false;

    if (topNode1.val !== topNode2.val) return false;

    pQueue.push(topNode1.left);
    qQueue.push(topNode2.left);

    pQueue.push(topNode1.right);
    qQueue.push(topNode2.right);
  }

  return result;
};
