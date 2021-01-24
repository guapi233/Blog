/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const row = obstacleGrid.length,
    col = obstacleGrid[0].length;

  if (obstacleGrid[row - 1][col - 1]) return 0;
  const cache = Array(row)
    .fill(0)
    .map(() => Array(col).fill(0));
  cache[row - 1][col - 1] = 1;

  for (let i = row - 2; i >= 0; i--) {
    if (!obstacleGrid[i][col - 1]) cache[i][col - 1] = cache[i + 1][col - 1];
  }
  for (let i = col - 2; i >= 0; i--) {
    if (!obstacleGrid[row - 1][i]) cache[row - 1][i] = cache[row - 1][i + 1];
  }

  for (let i = row - 2; i >= 0; i--) {
    for (let j = col - 2; j >= 0; j--) {
      if (obstacleGrid[i][j]) continue;

      cache[i][j] += cache[i + 1][j] + cache[i][j + 1];
    }
  }

  return cache[0][0];
};

console.log(
  uniquePathsWithObstacles([
    [0, 0],
    [1, 1],
    [0, 0],
  ])
);
