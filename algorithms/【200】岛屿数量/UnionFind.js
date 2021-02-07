/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const xLen = grid.length,
    yLen = grid[0].length;
  const unions = new UnionFind();
  const dxys = [
    [1, 0],
    [0, 1],
  ];

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (grid[x][y] === "1") unions.makeSet(x * 1000 + y);
    }
  }
  console.log(unions.count);

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      for (let [dx, dy] of dxys) {
        const newX = x + dx,
          newY = y + dy;
        if (
          grid[x][y] === "1" &&
          newX < xLen &&
          newY < yLen &&
          grid[newX][newY] === "1"
        )
          unions.union(x * 1000 + y, newX * 1000 + newY);
      }
    }
  }

  return unions.count;
};

function UnionFind() {
  this.count = 0;
  this.p = {};
}

UnionFind.prototype.makeSet = function (i) {
  this.p[i] = i;
  this.count++;
};

UnionFind.prototype.find = function (i) {
  let root = i;
  const p = this.p;

  while (p[root] !== root) root = p[root];

  // 压缩路径
  while (p[i] !== i) {
    const temp = i;
    i = p[i];
    p[temp] = root;
  }

  return root;
};

UnionFind.prototype.union = function (i, j) {
  const rootI = this.find(i),
    rootJ = this.find(j);
  if (rootI === rootJ) return;

  this.p[rootJ] = rootI;
  this.count--;
};

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
);
