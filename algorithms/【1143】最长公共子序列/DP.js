/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length,
    n = text2.length;
  const cache = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) cache[i][j] = cache[i - 1][j - 1] + 1;
      else cache[i][j] = Math.max(cache[i - 1][j], cache[i][j - 1]);
    }
  }

  return cache[m][n];
};
