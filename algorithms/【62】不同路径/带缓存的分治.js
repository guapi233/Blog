/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const cache = new Map();

  const dfs = (x, y) => {
    if (x === m - 1 && y === n - 1) return 1;
    if (x === m || y === n) return 0;

    let temp = 0,
      t = x * 100 + y;
    return cache.has(t)
      ? cache.get(t)
      : (cache.set(t, (temp = dfs(x + 1, y) + dfs(x, y + 1))), temp);
  };

  return dfs(0, 0);
};
