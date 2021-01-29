/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length <= 1) return nums[0] || 0;

  const helper = (tempArr) => {
    if (tempArr.length <= 1) return tempArr[0] || 0;

    tempArr[1] = Math.max(tempArr[0], tempArr[1]);
    for (let i = 2; i < tempArr.length; i++) {
      tempArr[i] = Math.max(tempArr[i - 1], tempArr[i - 2] + tempArr[i]);
    }

    return Math.max(...tempArr);
  };

  return Math.max(helper(nums.slice(0, -1)), helper(nums.slice(1)));
};
