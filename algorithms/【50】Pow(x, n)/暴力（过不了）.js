/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n === 1) return x;

  let result = 1,
    count = n > 0 ? n : -n;

  for (let i = 0; i < count; i++) {
    result *= x;
  }

  return n > 1 ? result : 1 / result;
};

console.log(myPow(2, -2));
