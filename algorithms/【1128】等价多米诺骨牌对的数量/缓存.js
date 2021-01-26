/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
  const cache = Array(100).fill(0);
  let count = 0;

  for (let domino of dominoes) {
    const [i, j] = domino;

    const temp = i > j ? i * 10 + j : j * 10 + i;
    count += cache[temp];
    cache[temp]++;
  }

  return count;
};
