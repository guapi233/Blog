# 在VSCode中自定义代码片段

好处就不用我多说了，可以快速生产一些重复且固定的代码片段。



## 执行步骤

1. 在VSCode顶部菜单栏找到【文件】——【首选项】——【用户片段】

2. 在输入框中输入你想要的代码片段生效的语言类型

3. 比如：输入`vue`，选择提示的`vue.json`，在其中仿照一下格式书写自定义代码片段：

   ```js
   {
   	"Vue Ts":{
   		"prefix":"tsvue", // 快捷指令名称
   		"body":[  // 代码片段
   			"<template>\n\t<div>\n\n\t</div>\n</template>\n\n",
   			"<script lang=\"ts\">\nimport{Component,Vue}from 'vue-property-decorator';\n\n@Component\nexport default class ${1:ClassName} extends Vue{\n$0\n}\n</script>\n\n",
   			"<style lang=\"scss\" scope>\n\n</style>\n"
   		],
   		"description":"生成vue文件"  // 提示信息
   	}
   }
   }
   ```

   