/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ret = [[]];

  for (let num of nums) {
    const len = ret.length;
    for (let i = 0; i < len; i++) {
      ret.push([...ret[i], num]);
    }
  }

  return ret;
};
