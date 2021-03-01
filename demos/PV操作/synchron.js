const { Process, P, V, source } = require("./index");

const p1 = new Process(1);
const p2 = new Process(2);

source.val = 0; // 资源控制变量至0

// 进程的同步模拟（先行操作后“V”，后行操作前“P”）
function* main1(p) {
  yield P(source, p);
  yield p.run(source);
}

function* main2(p) {
  yield p.run(source);
  V(source);
}

const process1 = main1(p1);
const process2 = main2(p2);

p1.setController(process1);
p2.setController(process2);

process2.next();
process1.next();
