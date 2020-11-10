# Vue集成 CKEdit5

[CKEditor 5 - 官网](https://ckeditor.com/ckeditor-5/)

> CKEditor即大名鼎鼎的FCKeditor（文本编辑器），它终于在最近发布新版本了，与增加版本号不同，这次完全把它改名了，更名为CKeditor。这应该是和它的开发公司CKSource(波兰华沙的公司)的名字有关吧，该公司的另一个产品为CKFinder（一个Ajax文件管理器），这次可能为了保持一致，将FCK更改为CK，但是版本号继承了下来，为CKeditor3.0版。

做个人项目正好需要使用到富文本功能，之前没怎么接触过这方面，只听说web富文本中的水非常深。深知自己还是个小菜鸟，所以也不打算自己逞强造玩具轮子，然后就找到了这款**CKEdit**。

正巧CKEdit已经迭代到了5版本，已经支持了目前主流的web框架，大大减少了对接时带来繁琐步骤。



## 快速集成

在官方提供的 [CKEditor 5 demo](https://ckeditor.com/ckeditor-5/demo/) 中，有以下几个支持快速集成的版本，就是官方已经把功能模块都集成进去了，直接安装即可快速上手使用。

我安装的是最经典的`Classic`版本，想要在Vue中集成，除了安装`Classic`版本的核心包之外，还需要安装一个

名为`@ckeditor/ckeditor5-vue`的套件，这是官方提供的与 Vue 对接的编辑器框架，内部没有直接集成任何版本的 CKEditor ，但提供了对接任意版本 CKEditor 的接口，源码[在这](https://github.com/ckeditor/ckeditor5-vue)，其实就是将编辑器的初始化工作封装在了一个组件中，同时暴露出了必要的配置项。

```shell
npm install --save @ckeditor/ckeditor5-vue @ckeditor/ckeditor5-build-classic
```

安装完毕之后，官方文档中建议把 `ckeditor5-vue` 进行全局安装，也就是在 `main.js` 中引入，`ckeditor5-build-classic`组件内部引用，其实这就看自身需求情况了，一般情况下都建议声明一个独立的组件，将这两个包在该组件中引入，然后完成配置工作，封装成一个独立的组件供其他地方使用。

```vue
<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

Vue.use(CKEditor);

@Component
export default class Test extends Vue {
  private editor = ClassicEditor;
  private editorData = "<p>Content of the editor.</p>";
  private editorConfig = {
    ckfinder: {
      // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段,
      uploadUrl: "http://localhost:3000" + "/uploadFile" 
    },
    language: "zh-cn",
    image: {
      toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"]
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
    },
    licenseKey: ""
  };
}
</script>

<style lang="scss">
.ck-editor__editable {
  min-height: 100vh;
}
</style>

```



## 拓展CKEdit的功能

上面提到的快速集成虽然快捷方便，但是功能非常有限，并且最麻烦的是，快速集成之后，再想到进行功能拓展，实现起来就有较为麻烦了，所以一般情况下建议在源码层面集成所需的功能。

[这位老哥的文章](https://www.jianshu.com/p/9b4374e603f3)详细介绍了源码层面手动集成所需功能的步骤，非常详细具体。

这里我采用得是另一种方法，其实CKEdit官网已经为我们提供了[傻瓜拖拽式的定制化功能](https://ckeditor.com/ckeditor-5/online-builder/)。

1. 首先先将上面的快速集成做完。
2. 然后在官网将定制完成后的包下载下来后，在项目下的`node_modules`中找到`@ckeditor/ckeditor5-build-classic`，将定制包中的内容，主要是`build/`覆盖到此处。
3. 最后，定制包中下的`simple/`已经为我们提供了定制后的样例，按照样例中的配置，完成相关配置即可。

下面贴上我的配置：

```js
{
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "imageUpload",
      "imageInsert",
      "|",
      "blockQuote",
      "horizontalLine",
      "insertTable",
      "mediaEmbed",
      "|",
      "code",
      "codeBlock",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "alignment",
      "|",
      "undo",
      "redo"
    ],
    ckfinder: {
      // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段,
      uploadUrl: "http://localhost:3000" + "/uploadFile" 
    },
    language: "zh-cn",
    image: {
      toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"]
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
    },
    licenseKey: ""
  }
```



## 自定义图片上传

官方教程中上传图片有三种方法：

1. 使用CKEditor自带云服务,图片上传到CKEditor服务器
2. 使用CKFinder框架，在初始化CKEditor时，需要定义 ckfinder的uploadUrl参数，参数为上传到自己服务器的地址
3. 自己写上传功能，定义`UploadAdapter`类，实现`upload()`和 `abort()` 方法，并对`UploadAdapter`进行调用。

第一种方案一般情况下都会pass掉，第二、三种方案其实都可以，但是第三种方案更加灵活一些，更加容易结合业务。下面是第三种方案的操作步骤：

1. 创建`UploadAdapter`类，构造函数中接收一个`loader`参数，该参数由外部传入，身上存放着需要上传的文件，在类中实现`upload`方法，该方法返回一个Promise，在Promise中发送请求，并且返回结果

   ```js
   // 示例代码
   import axios from "@/utils/axios";
   
   export default class UploadAdapter {
     constructor(private loader: any) {}
   
     async upload() {
       const data = new FormData();
       data.append("file", await this.loader.file);
       data.append("allowSize", "10"); // 允许图片上传的大小/兆
   
       return new Promise((resolve, reject) => {
         axios.post("/uploadImg", data).then((data: any) => {
           if (data.res) {
             resolve({
               default: data.url,
             });
           } else {
             reject("上传失败");
           }
         });
       });
     }
   
     abort() {
       console.log("upload abort");
     }
   }
   ```

2. 在CKEdit5-vue提供的ready钩子中完成自定义的上传插件安装，安装步骤如下：

   ```ts
     private onReady(editor: any) {
       editor.plugins.get("FileRepository").createUploadAdapter = (
         loader: any
       ) => {
         return new UploadAdapter(loader);
       };
     }
   ```

   



## 最后

如果代码使用git等版本控制工具管理，记着将定制后的包存放起来，因为一般情况下`node_modules`是不会推送到远程仓库的，如果其他地方需要拉取代码时需要重新覆盖`@ckeditor`下的文件。

