/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const q = new Set(),
    l = new Set(),
    r = new Set(),
    ret = [];

  dfs(n, 0, q, l, r, ret);
  return gener_checkerboard(ret);
};

// n, 层数（同时代表行）, 垂直列， 左撇，右撇, 结果
function dfs(n, level, q, l, r, ret) {
  if (level === n) {
    if (q.size === n) {
      ret.push([...q]);
    }
    return;
  }

  for (let i = 0; i < n; i++) {
    if (q.has(i) || l.has(i - level) || r.has(i + level)) continue;

    q.add(i);
    l.add(i - level);
    r.add(i + level);

    dfs(n, level + 1, q, l, r, ret);

    q.delete(i);
    l.delete(i - level);
    r.delete(i + level);
  }
}

// 结果处理函数
function gener_checkerboard(q) {
  const ret = [];
  for (let cols of q) {
    const checkerboard = [];

    for (let col of cols) {
      let row = new Array(cols.length).fill(".");
      row[col] = "Q";

      checkerboard.push(row.join(""));
    }

    ret.push(checkerboard);
  }

  return ret;
}

console.log(solveNQueens(4));
