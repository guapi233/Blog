/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let market = nums[nums.length - 1];

  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] === market) {
      nums.splice(i, 1);
    } else {
      market = nums[i];
    }
  }

  return nums.length;
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
