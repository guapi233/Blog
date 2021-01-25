/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const cache = Array(amount + 1).fill(Infinity);
  cache[0] = 0;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      cache[i] = Math.min(cache[i], cache[i - coin] + 1);
    }
  }

  return cache[amount] === Infinity ? -1 : cache[amount];
};

console.log(coinChange([2, 5, 10, 1], 27));
