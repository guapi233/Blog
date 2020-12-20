/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let i = 0,
    j = 0;
  while (j < nums.length) {
    const num = nums[i];
    if (num === 0) {
      nums.push(nums.splice(i, 1)[0]);
    } else {
      i++;
    }
    j++;
  }
};

let a = [0, 0, 1];

moveZeroes(a);
console.log(a);
