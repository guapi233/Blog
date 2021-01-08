// 定义数据响应式
const defineReactive = (data) => {
  Object.keys(data).forEach((key) => {
    let value = data[key];
    const dep = new Dep();

    Object.defineProperty(data, key, {
      get() {
        if (Dep.target) {
          dep.depend();
        }

        return value;
      },
      set(newVal) {
        value = newVal;
        dep.notify();
      },
    });
  });
};

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

const data = {
  name: "Komikado",
  age: 20,
  favourite: "ultraman",
};

const computed = {
  introduce() {
    return `${data.name}，${data.age}，${data.favourite}`;
  },
};

// 响应式data
defineReactive(data);

// 这个introduce相当于就是有缓存的，平时直接访问introduce变量，一旦内部引用的响应式变量发生变化，introduce就会重新计算
let introduce = computed.introduce();
// 创建一个依赖
new Watcher(() => {
  introduce = computed.introduce();
});

console.log(introduce);
data.name = "Komikomi";
console.log(introduce);
