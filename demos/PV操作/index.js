// 打印机资源
const source = {
  name: "打印机",
  val: 0,
  waiting: [],
};

// 阻塞（并没啥作用， 没想到怎么做到主动阻塞一个函数）
const block = (process) => {
  source.waiting.push(process);
};
// 唤醒
const wakeup = (process) => {
  process.controller.next();
};

// 尝试获取资源
const P = (source, process) => {
  source.val--;

  if (source.val < 0) {
    block(process);
  } else {
    console.log(`${process.id}号进程拿到了设备...`);
    setTimeout(() => {
      process.controller.next();
    }, 0);
  }
};

// 释放资源
const V = (source) => {
  source.val++;

  if (source.val <= 0) {
    const process = source.waiting.shift();
    console.log(`${process.id}号进程拿到了设备...`);
    wakeup(process);
  } else {
    console.log("全部进程已执行结束，资源顺利归还");
  }
};

// 进程类
class Process {
  constructor(id) {
    this.id = id;
    this.controller = null;
  }

  setController(controller) {
    this.controller = controller;
  }

  run(s) {
    console.log(`${this.id}正在使用${s.name}设备...`);
    setTimeout(() => {
      this.controller.next();
    }, 2000);
  }
}

module.exports = {
  source,
  P,
  V,
  Process,
};
