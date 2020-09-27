# VSCode对配置alias的支持

我们有时候会借助Webpack的alias功能来帮助我们优化相对路径的编写，但是这时就可能导致我们编辑器的提示功能失效，如果想要让VSCode识别alias，我们可以通过以下方法来进行解决。



## 方案

要解决这个问题，我们需要借助一个插件——`Node modules resolve`，可以在VSCode中的插件商店中找到它，安装之后，只需在我们的根目录下创建一个`jsconfig.json`文件，在其中编写以下配置即可：

```json
{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": false,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

