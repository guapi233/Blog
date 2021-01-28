/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 1) return nums[0] || 0;
  const cache = Array(nums.length)
    .fill(0)
    .map(() => []);
  let max = 0;

  cache[0][0] = 0;
  cache[0][1] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    cache[i][0] = Math.max(cache[i - 1][0], cache[i - 1][1]);
    cache[i][1] = cache[i - 1][0] + nums[i];

    max = Math.max(max, Math.max(cache[i][0], cache[i][1]));
  }

  return max;
};
