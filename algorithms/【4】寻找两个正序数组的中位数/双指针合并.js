/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let indexNums1 = 0, // 数组1的指针
    indexNums2 = 0, // 数组2的指针
    indexTemp = 0, // 临时数组的指针
    tempArr = [], // 临时存储用的数组
    middle = Math.floor((nums1.length + nums2.length) / 2); // 中间值

  // 双指针按序寻找两个数组总和一半的元素
  while (tempArr.length <= middle) {
    tempArr[indexTemp++] =
      nums1[indexNums1] < nums2[indexNums2]
        ? nums1[indexNums1++]
        : nums2[indexNums2++];
  }

  if (middle % 2 === 0) {
    return (tempArr[middle - 1] + tempArr[middle]) / 2;
  } else {
    return tempArr[middle];
  }
};

let nums1 = [1, 3],
  nums2 = [2],
  nums3 = [1, 2],
  nums4 = [3, 4];

console.log(findMedianSortedArrays(nums1, nums2));
console.log(findMedianSortedArrays(nums3, nums4));
