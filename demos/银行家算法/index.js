// 各进程所需的资源量
const Max = [
  [7, 5, 3],
  [3, 2, 2],
  [9, 0, 2],
  [2, 2, 2],
  [4, 3, 3],
];
// 已分配出的资源量
const allocation = [
  [0, 1, 0],
  [2, 0, 0],
  [3, 0, 2],
  [2, 1, 1],
  [0, 0, 2],
];
// 剩余待分配的资源量
const Need = [
  [7, 4, 3],
  [1, 2, 2],
  [6, 0, 0],
  [0, 1, 1],
  [4, 3, 1],
];
// 可分配的资源量
const Available = [3, 3, 2];
// 结果计数
let counter = Need.length;

// 是否可分配
const canPatch = (index) => {
  return Need[index].every((item, i) => item <= Available[i]);
};

// 分配资源
const patch = (index) => {
  for (let i in Available) {
    Available[i] += Max[index][i];
  }

  Need[index].unshift("*");
  counter--;
};

// 收回资源
const unpatch = (index) => {
  for (let i in Available) {
    Available[i] -= Max[index][i];
  }

  Need[index].shift();
  counter++;
};

const dfs = (index) => {
  let flag = true;

  for (let i in Need) {
    if (Need[i][0] === "*") continue;
    if (canPatch(i)) {
      flag = false;
      patch(i);
      dfs(i);
    }
  }

  if (!counter) return true;
  if (flag) {
    unpatch(index);
  }
};

const main = () => {
  for (let i in Need) {
    if (canPatch(i)) {
      patch(i);

      if (dfs(i)) return true;
    }
  }

  return false;
};

console.log(main());
