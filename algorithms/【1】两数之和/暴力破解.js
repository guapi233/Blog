const nums = [2, 7, 11, 15],
  target = 26;

function search(arr, target) {
  let l = arr.length;
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }

  return -1;
}

console.log(search(nums, target));
