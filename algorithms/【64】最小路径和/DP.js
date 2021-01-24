/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const x = grid.length;

  for (let i = x - 1; i >= 0; i--) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (i === x - 1 && j === grid[i].length - 1) continue;
      else if (i === x - 1) grid[i][j] += grid[i][j + 1];
      else if (j === grid[i].length - 1) grid[i][j] += grid[i + 1][j];
      else grid[i][j] += Math.min(grid[i][j + 1], grid[i + 1][j]);
    }
  }

  return grid[0][0];
};
