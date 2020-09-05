/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let l = 0,
    r = nums.length - 1,
    mid;

  while (l <= r) {
    mid = Math.floor((l + r) / 2);

    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else if (nums[mid] > target) {
      r = mid - 1;
    }
  }

  return l;
};

console.log(searchInsert([1, 3, 5, 6], 0));
