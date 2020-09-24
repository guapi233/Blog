/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices) return 0;

  // 记录 最大收益值 与 最小价格
  let max = 0,
    minprice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    minprice = Math.min(prices[i], minprice);
    max = Math.max(max, prices[i] - minprice);
  }
  return max;
};
