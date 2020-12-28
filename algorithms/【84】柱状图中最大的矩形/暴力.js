/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  if (heights.length < 2) return heights[0] || 0;

  let max = 0;

  for (let i = 0; i < heights.length; i++) {
    let minHeight = heights[i];
    max = Math.max(max, minHeight);

    for (let j = i + 1; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);

      max = Math.max(max, minHeight * (j - i + 1));
    }
  }

  return max;
};

/**
 * 需要考虑的测试样例
 * [2,1,5,6,2,3]
 * [0]
 * [1]
 * [1,1]
 * [0,9]
 */

largestRectangleArea([0, 9]);
