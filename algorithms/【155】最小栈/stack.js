var MinStack = function () {
  this.q = [];
};

MinStack.prototype.push = function (x) {
  this.q.unshift([x, Math.min(this.q[0] ? this.q[0][1] : Infinity, x)]);
};

MinStack.prototype.pop = function () {
  this.q.shift();
};

MinStack.prototype.top = function () {
  return this.q[0][0];
};

MinStack.prototype.getMin = function () {
  return this.q[0][1];
};
