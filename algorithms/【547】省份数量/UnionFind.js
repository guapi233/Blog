var findCircleNum = function (isConnected) {
  const cityCount = isConnected.length;
  const unions = new UnionFind(cityCount);

  for (let i = 0; i < cityCount; i++) {
    for (let j = 0; j < isConnected[i].length; j++) {
      if (isConnected[i][j]) unions.union(i, j);
    }
  }

  return unions.count;
};

function UnionFind(n) {
  this.p = Array(n)
    .fill(0)
    .map((v, i) => i);
  this.count = n;
}

UnionFind.prototype.find = function (i) {
  let root = i;
  const p = this.p;

  while (p[root] != root) root = p[root];
  while (p[i] !== i) {
    const temp = i;
    i = p[i];
    p[temp] = root;
  }

  return root;
};

UnionFind.prototype.union = function (i, j) {
  const rootI = this.find(i),
    rootJ = this.find(j),
    p = this.p;

  if (rootI === rootJ) return;

  p[rootJ] = rootI;
  this.count--;
};

.