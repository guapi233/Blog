/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [],
    hash = new Map();

  nums = nums.sort((a, b) => a - b);
  console.log(nums);
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      const diff = 0 - (nums[i] + nums[j]);

      for (let k = j + 1; k < nums.length; k++) {
        if (
          nums[k] === diff &&
          !hash.has([nums[i], nums[j], nums[k]].toString())
        ) {
          result.push([nums[i], nums[j], nums[k]]);
          hash.set([nums[i], nums[j], nums[k]].toString(), true);
        }
      }
    }
  }

  return result;
};

const test = [-1, 0, 1, 2, -1, -4];

console.log(threeSum(test));
