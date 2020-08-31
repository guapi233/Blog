/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  nums1 = nums1.concat(nums2);

  nums1 = nums1.sort((a, b) => a - b);

  let middle = Math.floor(nums1.length / 2);

  if (nums1.length % 2 === 0) {
    return (nums1[middle - 1] + nums1[middle]) / 2;
  } else {
    return nums1[middle];
  }
};

let nums1 = [1, 3],
  nums2 = [2],
  nums3 = [1, 2],
  nums4 = [3, 4];

console.log(findMedianSortedArrays(nums1, nums2));
console.log(findMedianSortedArrays(nums3, nums4));
