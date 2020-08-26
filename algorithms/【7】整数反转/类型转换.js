/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let mark = "";

  x = x.toString().split("");

  if (x[0] === "-") {
    x = x.slice(1);
    mark = "-";
  }

  x = Number(mark + x.reverse().join(""));

  if (x < -(2 ** 31) || x > 2 ** 31 - 1) {
    return 0;
  }

  return x;
};

console.log(reverse(1534236469));
