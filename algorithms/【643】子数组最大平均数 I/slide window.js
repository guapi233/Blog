/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let ret = (sum = nums.slice(0, k).reduce((a, b) => a + b));

  for (let i = k; i < nums.length; i++) {
    sum = sum - nums[i - k] + nums[i];
    ret = Math.max(ret, sum);
  }

  return ret / k;
};

console.log(findMaxAverage([6, 8, 6, 8, 0, 4, 1, 2, 9, 9], 2));
