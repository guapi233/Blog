/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxNum = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const miner = Math.min(height[i], height[j]);
      if (miner * (j - i) > maxNum) {
        maxNum = miner * (j - i);
      }
    }
  }

  return maxNum;
};

let a = [1, 8, 6, 2, 5, 4, 8, 3, 7];

console.log(maxArea(a));
