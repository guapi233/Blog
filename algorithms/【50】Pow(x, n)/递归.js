/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }

  return dfs(x, n);
};

function dfs(x, n) {
  if (!n) return 1;

  const half = dfs(x, parseInt(n / 2));

  return half * half * (n % 2 ? x : 1);
}
