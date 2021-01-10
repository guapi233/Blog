/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ret = [];

  const helper = (level, left, right, str) => {
    if (level >= n * 2) {
      ret.push(str);
      return;
    }

    if (left < n) helper(level + 1, left + 1, right, str + "(");
    if (left > right) helper(level + 1, left, right + 1, str + ")");
  };

  helper(0, 0, 0, "");
  return ret;
};
