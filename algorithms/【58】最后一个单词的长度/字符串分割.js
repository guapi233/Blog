/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let wordArr = s.trim().split(" ");

  return (
    (wordArr[wordArr.length - 1] && wordArr[wordArr.length - 1].length) || 0
  );
};

let a = "a ";
console.log(lengthOfLastWord(a));
