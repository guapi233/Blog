/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  if (bills[0] > 5) return false;
  let five = 0,
    ten = 0;

  for (let bill of bills) {
    if (bill === 5) five++;
    else if (bill === 10) {
      ten++;
      if (!five) return false;
      five--;
    } else {
      if (ten && five) ten--, five--;
      else if (five >= 3) five -= 3;
      else return false;
    }
  }

  return true;
};
