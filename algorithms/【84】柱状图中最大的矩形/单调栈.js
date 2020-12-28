/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let max = 0;
  const stack = [];
  // 前面的0用于防止栈pop空，最后的0用于防止[9,9,9,9]这种没有触发while的情况
  heights = [0, ...heights, 0];

  for (let i = 0; i < heights.length; i++) {
    while (heights[i] < heights[stack[stack.length - 1]]) {
      const topIndex = stack.pop();

      max = Math.max(
        max,
        heights[topIndex] * (i - stack[stack.length - 1] - 1) // 右边界 - 左边界 - 1(偏差值)
      );
    }

    stack.push(i);
  }

  return max;
};

console.log(largestRectangleArea([6, 7, 5, 2, 4, 5, 9, 3]));
