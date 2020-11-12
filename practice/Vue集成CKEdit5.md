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

~~这里我采用得是另一种方法，其实CKEdit官网已经为我们提供了[傻瓜拖拽式的定制化功能](https://ckeditor.com/ckeditor-5/online-builder/)。~~（更新：这种方法经过验证存在不可预测的问题（直接覆盖`node_modules`在Edge中可以正常运行，但在Chrome就会崩掉，在项目中直接导入定制包会导致webpack热更新打包卡死），所以建议还是按照下面的**源码构建方法**进行操作）。

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



### 源码构建（强烈建议使用该方法进行集成）

[CKEdit5的文档](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs.html#using-ckeditor-from-source)已经详细记录了如果在Vue中进行自定义功能构建，大致步骤分为以下几步：

1. 在项目中安装必要依赖项：

   ```shell
   npm install --save \
       @ckeditor/ckeditor5-vue \
       @ckeditor/ckeditor5-dev-webpack-plugin \
       @ckeditor/ckeditor5-dev-utils \
       postcss-loader@3 \
       raw-loader@0.5.1
   ```

2. 配置`vue.config.js`（需要Vue-cli为3.x及以上）

   ```js
   const path = require( 'path' );
   const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
   const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
   
   module.exports = {
       // The source of CKEditor is encapsulated in ES6 modules. By default, the code
       // from the node_modules directory is not transpiled, so you must explicitly tell
       // the CLI tools to transpile JavaScript files in all ckeditor5-* modules.
       transpileDependencies: [
           /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
       ],
   
       configureWebpack: {
           plugins: [
               // CKEditor needs its own plugin to be built using webpack.
               new CKEditorWebpackPlugin( {
                   // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                   language: 'en',
   
                   // Append translations to the file matching the `app` name.
                   translationsOutputFile: /app/
               } )
           ]
       },
   
       // Vue CLI would normally use its own loader to load .svg and .css files, however:
       //	1. The icons used by CKEditor must be loaded using raw-loader,
       //	2. The CSS used by CKEditor must be transpiled using PostCSS to load properly.
       chainWebpack: config => {
           // (1.) To handle editor icons, get the default rule for *.svg files first:
           const svgRule = config.module.rule( 'svg' );
   
           // Then you can either:
           //
           // * clear all loaders for existing 'svg' rule:
           //
           //		svgRule.uses.clear();
           //
           // * or exclude ckeditor directory from node_modules:
           svgRule.exclude.add( path.join( __dirname, 'node_modules', '@ckeditor' ) );
   
           // Add an entry for *.svg files belonging to CKEditor. You can either:
           //
           // * modify the existing 'svg' rule:
           //
           //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
           //
           // * or add a new one:
           config.module
               .rule( 'cke-svg' )
               .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
               .use( 'raw-loader' )
               .loader( 'raw-loader' );
   
           // (2.) Transpile the .css files imported by the editor using PostCSS.
           // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
           config.module
               .rule( 'cke-css' )
               .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
               .use( 'postcss-loader' )
               .loader( 'postcss-loader' )
               .tap( () => {
                   return styles.getPostCssConfig( {
                       themeImporter: {
                           themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
                       },
                       minify: true
                   } );
               } );
       }
   };
   ```

3. 完成基础依赖项配置后，就可以选择需要集成的功能模块了，需要注意的是，源码构建版本所需的基础包不是`@ckeditor/ckeditor5-build-classic`而是`@ckeditor/ckeditor5-editor-classic`，如果你不清楚自己需要哪些依赖包，那么可以去官方提供的[傻瓜式在线构建](https://ckeditor.com/ckeditor-5/online-builder/)那里选择功能，完成在线构建并将打包后的包下载下来，根据其中`src/ckeditor.js`其中的依赖项进行安装。

4. 完成功能包下载后，就可以封装富文本组件了，这里同样不建议在全局已经导入`@ckeditor/ckeditor5-vue`，将其单独引入到一个组件中，完成对应的封装，其实就和上面快速集成的步骤一样，只不过需要修改一行代码，就是将`import ClassicEditor from "@ckeditor/ckeditor5-build-classic";`修改为`import ClassicEditor from "./editorCore.js";`，当然后面的路径你可以随意指定，主要是这个文件中需要填写什么，其实只需要参考在线构建包中的`src/ckeditor.js`即可，下面贴上我的`editorCore`配置，可以参考着进行配置：

   ```js
   /**
    * CKEdit5 核心构建文件
    * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
    * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
    */
   import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
   import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
   import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
   import Autosave from "@ckeditor/ckeditor5-autosave/src/autosave.js";
   import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
   import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
   import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
   import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
   import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
   import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
   import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
   import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
   import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
   import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
   import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
   
   import Image from "@ckeditor/ckeditor5-image/src/image.js";
   import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
   import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
   import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
   import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
   import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
   import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
   
   import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
   import Link from "@ckeditor/ckeditor5-link/src/link.js";
   import List from "@ckeditor/ckeditor5-list/src/list.js";
   import Markdown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown.js";
   import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
   import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
   import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
   import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
   import Table from "@ckeditor/ckeditor5-table/src/table.js";
   import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
   import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
   import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
   
   // 创建自定义编辑器 继承自 基础编辑器包
   class Editor extends ClassicEditor {}
   
   // 自定义功能插件
   Editor.builtinPlugins = [
     Alignment,
     Autoformat,
     Autosave,
     BlockQuote,
     Bold,
     CKFinder,
     CKFinderUploadAdapter,
     Code,
     CodeBlock,
     Essentials,
     FontBackgroundColor,
     FontColor,
     Heading,
     HorizontalLine,
     Image,
     ImageCaption,
     ImageInsert,
     ImageResize,
     ImageStyle,
     ImageToolbar,
     ImageUpload,
     Italic,
     Link,
     List,
     Markdown,
     MediaEmbed,
     Paragraph,
     PasteFromOffice,
     Strikethrough,
     Table,
     TableToolbar,
     TextTransformation,
     Underline,
   ];
   
   // 默认配置
   Editor.defaultConfig = {
     // 工具栏展示列表
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
       "redo",
     ],
     // ckfinder: {
     //   uploadUrl: config.baseUrl + "/uploadImg" // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段,
     // },
     language: "zh-cn",
     // 视频上传功能（CKEditor默认只支持一些外网视频，所以需要自定义）
     mediaEmbed: {
       providers: [
         {
           name: "myprovider",
           url: [/^lizzy.*\.com.*\/media\/(\w+)/, /^www\.lizzy.*/, /^.*/],
           html: (match) => {
             //获取媒体url
             const input = match["input"];
             //console.log('input' + match['input']);
             return (
               '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 70%;">' +
               `<iframe src="${input}" ` +
               'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
               'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
               "</iframe>" +
               "</div>"
             );
           },
         },
       ],
     },
     image: {
       toolbar: [
         "imageTextAlternative",
         "|",
         "imageStyle:alignLeft",
         "imageStyle:full",
         "imageStyle:alignRight",
       ],
       styles: ["full", "alignLeft", "alignRight"],
     },
     table: {
       contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
     },
   };
   
   export default Editor;
   
   ```

5. 最后一点无关紧要的建议，富文本组件可以使用以下结构，方便进行管理：

   ```shell
   - RichText  // 组件文件夹
    -- core // 核心构建文件
     --- ckeditor.js
    -- index.vue  // 组件
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

3. 后台以以下数据格式返回结果：

   ```js
   {
       uploaded: true,
       url: 图片路径
   }
   ```




## 自动保存功能

如果想使用该功能需要安装`@ckeditor/ckeditor5-autosave/src/autosave.js`插件，安装之后可在配置对象中添加`autosave`字段配置项:

```js
autosave: {
      waitingTime: 1500,  // 间隔时间
      save(editor: any) {  // 自动保存函数
        // 用于获取纯文本
        const contentArea: any = document.querySelector(".ck.ck-content");
	
        // 在Vue中可以对外暴露 save Prop，然后在这调用父组件传入的保存函数
        // this.save &&
        //   this.save({
        //     text: editor.getData(),
        //     plainText: contentArea.textContent,
        //   });
      },
}
```

注意：在`save`方法中由于上下文丢失的原因是无法访问在Vue中的`this`的，也就意味着无法拿到双向绑定的数据。这时候有两种解决方法：

1. 因为在对象中禁忌使用箭头函数（如果用了的话会导致双向绑定的数据失去效果），所以可以采用`that`法：在全局声明一个变量`that`，在组件初始化钩子里将组件实例赋值给`that`，并在`save`函数中使用`that`访问组件身上的属性方法
2. 如果只想获取输入的内容，无需调用组件的其他属性的话，可以采用上面示例代码中的方法，通过参数`editor`身上的`getData`获取内容





## 最后

~~如果代码使用git等版本控制工具管理，记着将定制后的包存放起来，因为一般情况下`node_modules`是不会推送到远程仓库的，如果其他地方需要拉取代码时需要重新覆盖`@ckeditor`下的文件。~~（更新：使用源码构建后就无须再关心这种情况）。



