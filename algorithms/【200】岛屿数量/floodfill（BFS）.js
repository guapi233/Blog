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
  const q = [[x, y]];

  while (q.length) {
    const [x, y] = q.shift();
    if (grid[x][y] === "0") continue;

    grid[x][y] = "0";

    if (x + 1 < grid.length) q.push([x + 1, y]);
    if (x - 1 >= 0) q.push([x - 1, y]);
    if (y + 1 < grid[x].length) q.push([x, y + 1]);
    if (y - 1 >= 0) q.push([x, y - 1]);
  }

  return 1;
}

console.log(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
);
