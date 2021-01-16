/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 1) return x;

  let lo = 1,
    hi = x;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2),
      smid = mid * mid;

    if (smid === x) return mid;
    else if (smid > x) hi = mid - 1;
    else lo = mid + 1;
  }

  return hi;
};
