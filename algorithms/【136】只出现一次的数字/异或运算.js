/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let singler = nums[0];

  for (let i = 1; i < nums.length; i++) {
    singler ^= nums[i];
  }

  return singler;
};

const tester = [1, 2, 2, 3, 3, 1, 5];

console.log(singleNumber(tester));
