# Vue集成highlight.js

## 一、安装highlight.js

```shell
npm install highlight.js --save 或 yarn add highlight.js
```



## 二、封装自定义指令

```typescript
import Hljs from "highlight.js";

export const highlight = (el: any) => {
  const blocks = el.querySelectorAll("pre code");

  blocks.forEach((block: any) => {
    Hljs.highlightBlock(block);
  });
};
```



## 三、引入指令和样式

```typescript
import { highlight } from "@/utils/directive";
Vue.directive("highlight", highlight);

// 样式文件在 node_modules/highlight.js/style/ 中可以找到
@import "../assets/atom-one-dark";
```



## 四丶使用指令

```vue
<div v-highlight v-html="articleDetail.content"></div>
```

