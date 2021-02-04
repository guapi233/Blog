/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const trie = new Trie();
  const dxys = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  const xLen = board.length,
    yLen = board[0].length;
  const cache = {};
  const ret = [];

  // 构建Trie
  for (let word of words) {
    trie.insert(word);
  }

  // DFS board
  const dfs = (x, y, node, str) => {
    if (node[board[x][y]].end) {
      ret.push(str + board[x][y]);
      // 置为false是为了不要阻碍后面的检索（比如两个单词 ca 和 caa，如果在检索到 ca 后不将其end取消掉，那么caa的检索将无法继续）
      node[board[x][y]].end = false;
    }

    // 处理本层状态
    node = node[board[x][y]];
    str += board[x][y];

    // 向四联通方向检索
    cache[x * 100 + y] = true;
    for (let [dx, dy] of dxys) {
      const newX = x + dx,
        newY = y + dy;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= xLen ||
        newY >= yLen ||
        !node[board[newX][newY]] ||
        cache[newX * 100 + newY]
      )
        continue;

      dfs(newX, newY, node, str);
    }
    cache[x * 100 + y] = false;
  };

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (trie.root[board[x][y]]) dfs(x, y, trie.root, "");
    }
  }

  return ret;
};

function Trie() {
  this.root = {};
}

Trie.prototype.insert = function (word) {
  let node = this.root;

  for (let letter of word) {
    if (!node[letter]) node[letter] = {};

    node = node[letter];
  }

  node.end = true;
};
console.log(
  findWords(
    [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"],
    ],
    [
      "oath",
      "pea",
      "eat",
      "rain",
      "oathi",
      "oathk",
      "oathf",
      "oate",
      "oathii",
      "oathfi",
      "oathfii",
    ]
  )
);
