/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  nums1 = new Set(nums1);
  nums2 = new Set(nums2);
  const result = [];

  nums2.forEach((num) => {
    if (nums1.has(num)) result.push(num);
  });

  return result;
};
