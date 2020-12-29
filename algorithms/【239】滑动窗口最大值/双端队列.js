/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const queue = [],
    maxers = [];

  for (let i = 0; i < nums.length; i++) {
    // 队列中不存比当前值小的数，因为是求最大值，这些小数没有留下来的必要了
    while (nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }

    // 将当前数值的索引放入
    queue.push(i);

    // 如果队列开头的数很大，但它已经出了比较范围时，将它移除队列
    if (queue[0] === i - k) {
      queue.shift();
    }

    // 至少在处理的数量等于 k要求数 时才开始将比较的结果放入最终结果数组
    if (i >= k - 1) {
      maxers.push(nums[queue[0]]);
    }
  }

  return maxers;
};

maxSlidingWindow([1, 3, -1], 1);
