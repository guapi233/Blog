const { Process, P, V, source } = require("./index");

const p1 = new Process(1);
const p2 = new Process(2);

source.val = 1;

// 进程的互斥模拟
function* main(p) {
  yield P(source, p);
  yield p.run(source);
  V(source);
}

const process1 = main(p1);
const process2 = main(p2);

p1.setController(process1);
p2.setController(process2);

process1.next();
process2.next();
