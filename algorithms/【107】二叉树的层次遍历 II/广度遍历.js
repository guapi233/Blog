/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  const queue = [root],
    resultQueue = [[root.val]];

  while (queue.length) {
    const levelCount = queue.length;
    let tempArr = [];

    for (let i = 0; i < levelCount; i++) {
      let node = queue.shift();

      if (node.left) {
        tempArr.push(node.left.val);
        queue.push(node.left);
      }

      if (node.right) {
        tempArr.push(node.right.val);
        queue.push(node.right);
      }
    }

    resultQueue.unshift(tempArr);
  }

  return resultQueue;
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (!root) return [];

  // queue：遍历用得队列， resultQueue：按照要求存储数据的数组
  const queue = [root],
    resultQueue = [[root.val]];

  while (queue.length) {
    const levelCount = queue.length;
    let tempArr = [];

    // 一次性将同层的节点全部添入一个数组中
    for (let i = 0; i < levelCount; i++) {
      let node = queue.shift();

      if (node.left) {
        tempArr.push(node.left.val);
        queue.push(node.left);
      }

      if (node.right) {
        tempArr.push(node.right.val);
        queue.push(node.right);
      }
    }

    // 将存有下一层节点的数组插入 resultQueue 的最前方
    if (tempArr[0] || tempArr[0] === 0) {
      resultQueue.unshift(tempArr);
    }
  }

  return resultQueue;
};
