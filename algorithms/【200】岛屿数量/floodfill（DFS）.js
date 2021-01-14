/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let landCount = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "0") continue;
      landCount += floodfill(x, y, grid);
    }
  }

  return landCount;
};

function floodfill(x, y, grid) {
  if (grid[x][y] === "0") return;

  grid[x][y] = "0";

  if (x + 1 < grid.length) floodfill(x + 1, y, grid);
  if (x - 1 >= 0) floodfill(x - 1, y, grid);

  if (y + 1 < grid[x].length) floodfill(x, y + 1, grid);
  if (y - 1 >= 0) floodfill(x, y - 1, grid);

  return 1;
}
