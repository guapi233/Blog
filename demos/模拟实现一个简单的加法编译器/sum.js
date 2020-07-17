/**
 * 抽象语法树节点
 */
class ASTNode {
  constructor(command) {
    this.val = command; // 节点存储的原指令
    this.leftNode = null; // 左子节点
    this.rightNode = null; // 右子节点
  }

  /**
   * 设置节点的存储内容
   *
   * @param {String} val 原指令字符串
   */
  setVal(val) {
    this.val = val;
  }

  /**
   * 设置左子节点
   *
   * @param {String} command 原指令字符串
   */
  addLeft(command) {
    this.leftNode = new ASTNode(command);

    return this.leftNode;
  }

  /**
   * 设置右子节点
   *
   * @param {*} command 原指令字符串
   */
  addRight(command) {
    this.rightNode = new ASTNode(command);

    return this.rightNode;
  }
}

/**
 * 抽象语法树本树
 */
class AST {
  constructor(commands) {
    this.root = null; // 根节点，会在 parseCommand() 中得到值
    this.parseCommand(commands); // 解析指令，构建语法树
    this.compiledCommands = []; // 编译完成的指令集
  }

  /**
   * 解析方法，用于对拿到的源代码字符串进行解析，并将对应的指令加入抽象语法树中
   *
   * @param {String} commands 源代码字符串
   * @param {ASTNode} node 抽象语法树节点
   */
  parseCommand(commands, node) {
    let middle,
      leftArr = [],
      rightArr = [];

    if (commands.length > 1) {
      middle = Number(commands[Math.floor(commands.length / 2)])
        ? Math.floor(commands.length / 2) + 1
        : Math.floor(commands.length / 2);

      (leftArr = commands.slice(0, middle)),
        (rightArr = commands.slice(middle + 1, commands.length));
    }

    // debugger;
    if (!node) {
      this.root = middle
        ? (node = new ASTNode(commands[middle]))
        : (node = new ASTNode(commands[0]));

      node = this.root;
    } else {
      node.setVal(middle ? commands[middle] : commands[0]);
    }

    if (leftArr[0]) {
      let leftNode = node.addLeft(null);
      this.parseCommand(leftArr, leftNode);
    }

    if (rightArr[0]) {
      let rightNode = node.addRight(null);
      this.parseCommand(rightArr, rightNode);
    }
  }

  /**
   * 树的后序遍历
   * 后序遍历抽象语法树，拿到原指令调用 compile() 编译为目标指令
   *
   * @param {ASTNode} node 抽象语法树节点
   */
  backEach(node) {
    if (node.leftNode) {
      this.backEach(node.leftNode);
    }

    if (node.rightNode) {
      this.backEach(node.rightNode);
    }

    this.compile(node.val);

    return this.compiledCommands;
  }

  /**
   * 编译方法
   * 将原指令编译为目标指令，并添加到编译后指令集
   *
   * @param {String} val 原指令字符串
   */
  compile(val) {
    if (Number(val)) {
      this.compiledCommands.push(`push ${val}`);
    } else {
      this.compiledCommands.push("add");
    }
  }
}

/**
 * 前端编译
 * 拿到源代码字符串，用于解析并生成对应的抽象语法树
 *
 * @param {String} commands 源代码字符串
 */
function frontCompile(commands) {
  commands = commands.replace(/\s/g, "").split(/(\+)/g);

  if (commands.length % 2 === 0) throw new Error("Syntax Error");

  return new AST(commands);
}

/**
 * 后端编译
 * 拿到前端编译生成的抽象语法书，将其编译为目标代码（执行部分非必须）
 *
 * @param {AST} ast 抽象语法树
 */
function backCompile(ast) {
  let compiledCommands = ast.backEach(ast.root);

  let calculator = [];

  compiledCommands.forEach((command) => {
    // debugger;
    if (command === "add") {
      calculator.push(calculator.pop() + calculator.pop());
    } else {
      let [commandpush, val] = command.split(" ");

      calculator.push(Number(val));
    }
  });

  return calculator[0];
}

console.log(backCompile(frontCompile("1 + 2 +  3 + 10 + 7 + 6")));
