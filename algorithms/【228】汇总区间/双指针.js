var summaryRanges = function (nums) {
  const ret = [];
  let i = 0;
  const n = nums.length;

  while (i < n) {
    const low = i;
    i++;

    while (i < n && nums[i] === nums[i - 1] + 1) {
      i++;
    }

    const high = i - 1;
    let temp = `${nums[low]}`;

    if (low < high) {
      temp += `->${nums[high]}`;
    }
    ret.push(temp);
  }

  return ret;
};
