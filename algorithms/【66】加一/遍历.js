/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // 注意检查进位
  for (let i = digits.length - 1; i >= 0; i--) {
    // 每次迭代都会使当前位置加1
    digits[i] += 1;

    // 如果当前位置加1后需要进位，则将当前位置的值置为0，并进入下一次迭代
    if (digits[i] === 10) {
      digits[i] = 0;
    } else {
      // 如果加1之后不需要进位，则证明函数执行完毕，结束返回即可
      return digits;
    }
  }

  // 如果迭代完毕之后函数仍然没有结束，则证明最前方的数位也需要进位，则在前方加1个数位即可
  return [1, ...digits];
};

let arr = [9, 9];

console.log(plusOne(arr));
