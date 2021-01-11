/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ret = [];
  dfs(nums, 0, [], ret);

  return ret;
};

function dfs(nums, dep, subs, ret) {
  if (dep === nums.length) {
    ret.push([...subs]);
    return;
  }

  dfs(nums, dep + 1, subs, ret);
  subs.push(nums[dep]);
  // console.log(subs);
  dfs(nums, dep + 1, subs, ret);

  subs.pop();
}

console.log(subsets([1, 2, 3]));
