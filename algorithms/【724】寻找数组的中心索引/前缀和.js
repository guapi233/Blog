/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  let leftSum = 0;
  const sum = nums.reduce((pre, cur) => pre + cur, 0);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (sum - num - leftSum === leftSum) return i;

    leftSum += num;
  }

  return -1;
};
