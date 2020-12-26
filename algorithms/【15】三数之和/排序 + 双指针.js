/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const passed = [];

  const moveToR = (i) => {
    do {
      i++;
    } while (nums[i] === nums[i - 1]);

    return i;
  };
  const moveToL = (i) => {
    do {
      i--;
    } while (nums[i] === nums[i + 1]);

    return i;
  };

  for (let i = 0; i < nums.length - 2; ) {
    const target = nums[i];

    if (target > 0) break;

    for (let j = i + 1, k = nums.length - 1; j < k; ) {
      const result = target + nums[j] + nums[k];

      if (result === 0) {
        passed.push([target, nums[j], nums[k]]);
        j = moveToR(j);
        k = moveToL(k);
      } else if (result < 0) {
        j = moveToR(j);
      } else {
        k = moveToL(k);
      }
    }

    i = moveToR(i);
  }

  return passed;
};

const test = [-1, 0, 1, 2, -1, -4];

console.log(threeSum(test));
