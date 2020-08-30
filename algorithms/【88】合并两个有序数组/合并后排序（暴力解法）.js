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
// 不对原数组进行操作，返回新数组
var merge = function (nums1, m, nums2, n) {
  nums1 = nums1.slice(0, m);
  nums2 = nums2.slice(0, n);

  nums1 = nums1.concat(nums2);

  return nums1.sort((a, b) => a - b);
};

console.log(merge(arr1, len1, arr2, len2));

// 直接在原数组上进行修改，无返回值
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m);
  nums2.splice(n);

  nums1.push(...nums2);

  nums1.sort((a, b) => a - b);
};

merge(arr1, len1, arr2, len2);
console.log(arr1);
