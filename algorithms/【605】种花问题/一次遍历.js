/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let canCount = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    if (!flowerbed[i - 1] && !flowerbed[i] && !flowerbed[i + 1])
      canCount++, (flowerbed[i] = 1);
  }

  return canCount >= n;
};

/**
 * 执行用时：76 ms, 在所有 JavaScript 提交中击败了 97.88% 的用户
 * 内存消耗：39.9 MB, 在所有 JavaScript 提交中击败了 60.21% 的用户
 */
