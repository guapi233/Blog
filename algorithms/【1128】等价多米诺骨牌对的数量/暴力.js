/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
  const len = dominoes.length;
  let count = 0;

  for (let i = 0; i < len; i++) {
    const tempIRe = [...dominoes[i]].reverse().join(""),
      tempI = dominoes[i].join("");

    for (let j = i + 1; j < len; j++) {
      const tempJ = dominoes[j].join("");
      if ([tempI, tempIRe].includes(tempJ)) count++;
    }
  }

  return count;
};
