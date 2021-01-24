/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const cache = Array(m).fill(Array(n));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 || j === n - 1) cache[i][j] = 1;
      else cache[i][j] = cache[i + 1][j] + cache[i][j + 1];
    }
  }

  return cache[0][0];
};
