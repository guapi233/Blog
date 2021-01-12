/**
 * @param {string} digits
 * @return {string[]}
 */

const hash = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};
var letterCombinations = function (digits) {
  const ret = [];

  dfs(digits, "", 0, ret);

  return ret;
};

function dfs(digits, item, level, ret) {
  if (level === digits.length) {
    if (item.length === digits.length && digits.length) {
      ret.push(item);
    }

    return;
  }

  for (let str of hash[digits[level]].split("")) {
    dfs(digits, item + str, level + 1, ret);
  }
}
