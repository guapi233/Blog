let arr1 = [1, 2, 3, 0, 0, 0];
let len1 = 3;
let arr2 = [2, 5, 6];
let len2 = 3;

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 空间复杂度O(m)版本（向后遍历）
var merge = function (nums1, m, nums2, n) {
  let mergedLen = 0;
  let index1 = 0,
    index2 = 0;
  let nums1Copy = [...nums1];

  while (index2 < n && index1 < m) {
    nums1[mergedLen++] =
      nums1Copy[index1] < nums2[index2] ? nums1Copy[index1++] : nums2[index2++];
  }

  while (index2 < n) {
    nums1[mergedLen++] = nums2[index2++];
  }

  while (index1 < m) {
    nums1[mergedLen++] = nums1Copy[index1++];
  }
};

merge(arr1, len1, arr2, len2);
console.log(arr1);

arr1 = [1, 2, 3, 0, 0, 0];
len1 = 3;
arr2 = [2, 5, 6];
len2 = 3;

// 空间复杂度O(1)版本（向前遍历）
var merge = function (nums1, m, nums2, n) {
  let mergedLen = m + n;

  while (n > 0) {
    if (m <= 0) {
      nums1[--mergedLen] = nums2[--n];
      continue;
    }

    nums1[--mergedLen] = nums1[m - 1] > nums2[n - 1] ? nums1[--m] : nums2[--n];
  }
};

merge(arr1, len1, arr2, len2);
console.log(arr1);
