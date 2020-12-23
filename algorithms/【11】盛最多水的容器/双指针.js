/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxNum = 0;

  for (let i = 0, j = height.length - 1; i < j; ) {
    const minHeight = height[i] < height[j] ? height[i++] : height[j--];

    // +1 是因为上面将本次的宽度-1了
    maxNum = Math.max(maxNum, minHeight * (j - i + 1));
  }

  return maxNum;
};

let a = [1, 8, 6, 2, 5, 4, 8, 3, 7];

console.log(maxArea(a));
