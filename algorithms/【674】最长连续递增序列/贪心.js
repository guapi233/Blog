/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let maxLen = 0,
    start = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] <= nums[i - 1]) start = i;

    maxLen = Math.max(maxLen, i - start + 1);
  }

  return maxLen;
};
