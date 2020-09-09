# 使用NodeJS遍历文件夹

使用NodeJS编写实现遍历文件夹获取所用文件名的代码。



## 涉及知识点

- 递归
- Node核心模块使用



## 解题思路

```js
const fs = require("fs");
const path = require("path");

const readDir = (entry) => {
  // 读取路径下所有的文件以及文件夹
  const dirInfo = fs.readdirSync(entry);

  dirInfo.forEach((item) => {
    // 拼接路径
    const location = path.join(entry, item);

    // 获取文件的信息
    const info = fs.statSync(location);

    // 如果是文件夹，则继续递归，否则输入路径
    if (info.isDirectory()) {
      console.log(`dir：${location}`);
      readDir(location);
    } else {
      console.log(`file：${location}`);
    }
  });
};

readDir(__dirname);
```

