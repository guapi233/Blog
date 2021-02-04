/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  // 声明四联通数组 & 横纵长度 & 缓存
  const dxys = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  const xLen = board.length,
    yLen = board[0].length;
  const cache = Array(xLen)
    .fill(0)
    .map(() => Array(yLen).fill(false));

  // DFS
  const dfs = (x, y, i) => {
    // 因为会在上一层检测当前层的值是否正确，所以只要到达字符串最后一位即可满足条件脱出
    if (i === word.length - 1) return true;

    // 到达当前层即表示当前位置符合要求，为了避免产生回路造成当前层值复用，利用缓存将当前值锁定
    cache[x][y] = true;
    // 继续向四方向进行检索
    for (let [dx, dy] of dxys) {
      const newX = x + dx,
        newY = y + dy;

      if (
        newX >= xLen ||
        newY >= yLen ||
        newX < 0 ||
        newY < 0 ||
        board[newX][newY] !== word[i + 1] ||
        cache[newX][newY]
      )
        continue;
      const ret = dfs(newX, newY, i + 1);
      if (ret) return true;
    }
    // 从该位置出发的结果不符合要求，消除缓存回溯到上一层
    cache[x][y] = false;
  };

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (board[x][y] === word[0] && dfs(x, y, 0)) {
        return true;
      }
    }
  }

  return false;
};

console.log(
  exist(
    [
      ["C", "A", "A"],
      ["A", "A", "A"],
      ["B", "C", "D"],
    ],
    "AAB"
  )
);
