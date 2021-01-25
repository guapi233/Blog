/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];
  }

  return Math.max(nums);
};

// 或

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) nums[i] += nums[i - 1];
    max = Math.max(max, nums[i]);
  }

  return max;
};
