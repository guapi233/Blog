// 收集依赖的容器（一个属性对应一个容器）
class Dep {
  static target = null;

  constructor() {
    this.subscribes = [];
  }

  // 收集依赖
  depend() {
    this.subscribes.push(Dep.target);
  }

  // 触发依赖
  notify() {
    this.subscribes.forEach((sub) => sub());
  }
}

// 依赖
class Watcher {
  constructor(cb) {
    Dep.target = cb;
    Dep.target();
    Dep.target = null;
  }
}

const _data = {
  name: "Komikado",
  age: 20,
  favourite: "ultraman",
};

// 代替了defineReactive函数
const deps = new Map();
Object.keys(_data).forEach((key) => {
  deps.set(key, new Dep());
});
const data = new Proxy(_data, {
  get(target, key) {
    if (Dep.target) {
      deps.get(key).depend();
    }

    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    // 如果是新属性就创建个dep（这在原来是无法做到了，因为Proxy是对对象级别的拦截，而不只是属性
    if (!deps.get(key)) deps.set(key, new Dep());
    deps.get(key).notify();
  },
});

const computed = {
  introduce() {
    return `${data.name}，${data.age}，${data.favourite}`;
  },
};

// 这个introduce相当于就是有缓存的，平时直接访问introduce变量，一旦内部引用的响应式变量发生变化，introduce就会重新计算
let introduce = computed.introduce();
// 创建一个依赖
new Watcher(() => {
  introduce = computed.introduce();
});

console.log(introduce);
data.name = "Komikomi";
console.log(introduce);

// 新增属性测试（失败）---------------------------------------------
data.newProp = 1;
let newCount = data.newProp + 1;
new Watcher(() => (newCount = data.newProp + 1));

console.log(newCount);
data.newProp = 2;
// 新属性也改变了
console.log(newCount);
