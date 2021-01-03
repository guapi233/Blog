/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let volumn = 0;

  for (let i = 1; i < height.length - 1; i++) {
    let l = (r = height[i]);

    for (let j = i - 1; j >= 0; j--) {
      l = Math.max(l, height[j]);
    }

    for (let k = i + 1; k < height.length; k++) {
      r = Math.max(r, height[k]);
    }

    volumn += Math.min(l, r) - height[i];
  }

  return volumn;
};

const test = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(test));
