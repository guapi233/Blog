const nums = [2, 7, 11, 15],
  target = 26;

function search(arr, target) {
  let map = new Map(),
    l = arr.length;

  for (let i = 0; i < l; i++) {
    map.set(arr[i], i);
  }

  for (let i = 0; i < l; i++) {
    if (map.has(target - arr[i])) {
      return [i, map.get(target - arr[i])];
    }
  }

  return -1;
}

console.log(search(nums, target));
