/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const dfs = (x, y) => {
    if (x > m || y > n) return 0;
    else if (x === m && y === n) return 1;

    return dfs(x + 1, y) + dfs(x, y + 1);
  };

  return dfs(1, 1);
};

console.log(uniquePaths(23, 12));
