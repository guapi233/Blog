/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let maxSub = nums[0] || 0,
    curSub = 0;

  nums.forEach((item) => {
    curSub = Math.max(curSub + item, item);

    maxSub = Math.max(maxSub, curSub);
  });

  return maxSub;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
