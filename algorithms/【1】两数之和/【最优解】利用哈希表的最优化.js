const nums = [2, 7, 11, 15],
  target = 26;

function search(arr, target) {
  let map = new Map(),
    l = arr.length;

  for (let i = 0; i < l; i++) {
    if (map.has(arr[i])) {
      return [map.get(arr[i]), i];
    } else {
      map.set(target - arr[i], i);
    }
  }

  return -1;
}

console.log(search(nums, target));
