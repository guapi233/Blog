# JS解析文章内容生成目录结构

```typescript
/*
 * articleBody: 内容区的父元素
 * articleContent: 内容区
*/
const articleBodyTop = this.articleBody.offsetTop;
// 1. 获取所有内容标签
const allNodes = this.articleContent.children[0].children;

// 2. 筛选h2、h3标签
const titleList = Array.from(allNodes).filter((node: any) => {
  return node.nodeName === "H2" || node.nodeName === "H3";
});

// 3. 组件目录结构
const h2List: any = [];
let current = 0;
titleList.forEach((node: any) => {
  if (node.nodeName === "H2" && !h2List[current]) {
    h2List[current] = {
      id: articleBodyTop + node.offsetTop - 84,
      val: node.textContent,
      children: [],
    };
  } else if (node.nodeName === "H2") {
    h2List[++current] = {
      id: articleBodyTop + node.offsetTop - 84,
      val: node.textContent,
      children: [],
    };
  } else if (node.nodeName === "H3" && !h2List[current]) {
    h2List[current] = {
      id: articleBodyTop + node.offsetTop - 84,
      val: "",
      children: [
        {
          id: articleBodyTop + node.offsetTop - 84,
          val: node.textContent,
        },
      ],
    };
  } else if (node.nodeName === "H3") {
    h2List[current].children.push({
      id: articleBodyTop + node.offsetTop - 84,
      val: node.textContent,
    });
  }
});

// 4. 渲染至页面
this.navList = h2List;
```



## 点击目录标题跳转至相关位置

因为目录结构中的`id`就是存的目的地的`top`值，所以只需要在（Vue）模板中循环时将该值传给对应的移动函数即可。

当然也可以利用**事件委托**进行优化，将`id`值绑定在有特定标识（例如`class`）的元素上，在触发最外层点击事件后，通过利用特定标识来筛选冒泡列表，拿到指定元素身上的`id`值，最后进行跳转即可。

示例代码：

```vue
  <div
    class="article-right-side"
    :class="`side-r-${sideBarPos}`"
    @click="toTitleHere"
  >
    <div class="directory-container" v-for="nav in navList" :key="nav.id">
      <!-- 通过自定义属性绑定位置数值 -->
      <div class="item" :data-top="nav.id">
        <div class="circle"></div>
        <div class="title">{{ nav.val }}</div>
      </div>
      <div class="sub-directory-container">
        <!-- 通过自定义属性绑定位置数值 -->
        <div
          class="item sub-directory"
          v-for="navChild in nav.children"
          :key="navChild.id"
          :data-top="navChild.id"
        >
          <div class="circle h3"></div>
          <div class="title">{{ navChild.val }}</div>
        </div>
      </div>
    </div>
  </div>
```

```typescript
// toTitleHere

// 1. 从冒泡路径上找到附带 data-set 的元素
const current = e.path.filter((target: any) => {
  return target.className && target.className.includes("item");
})[0];

// 2. 如果没找到则直接终止
if (!current) return;

// 3. 移动页面至 元素身上附带的自定义高度值那里
this.slider(Number(current.dataset.top));
```

