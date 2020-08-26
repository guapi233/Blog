/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let items = new Map(),
    len = 0,
    leftIndex = 0,
    rightIndex = 0;

  while (rightIndex !== s.length) {
    if (items.has(s[rightIndex])) {
      leftIndex = Math.max(items.get(s[rightIndex]) + 1, leftIndex);
    }

    len = Math.max(len, rightIndex - leftIndex + 1);
    items.set(s[rightIndex], rightIndex);
    rightIndex++;
  }

  return len;
};

let testItem = "abcchhatyvzxf";

console.log(lengthOfLongestSubstring(testItem));
