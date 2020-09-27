/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (str) {
  str = str.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
  let l = 0,
    r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) {
      return false;
    }
    l++;
    r--;
  }
  return true;
};
