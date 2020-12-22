/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // j的左边全是非0数字
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (i !== j) {
        // 将此处的交换换成普通的第三变量交换，效率会大大提高
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }

      j++;
    }
  }
};

let a = [1, 2];

moveZeroes(a);
console.log(a);
