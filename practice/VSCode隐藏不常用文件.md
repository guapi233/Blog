# VSCode隐藏不常用文件

我们在使用VSCode进项项目开发时，经常会有一些文件不会经常打开，但是这些文件仍然会显示在文件目录中。尤其是工程项目的开发，经常会有一堆的工具配置文件，使得文件目录变得非常庞杂，这时候我们可以通过配置VSCode来**隐藏**这些文件。



## 解决方案

1. 在VSCode顶部菜单栏找到`查看`，点击并打开`命令面板`

2. 在输入栏中输入`settins`，选择`打开工作区设置`，注意是**工作区**，不是用户设置

3. 在设置中随意修改一项配置，不用真得修改，只需要将原来的值删除重新输入即可，这一步的目的是为了让VSCode在当前目录生成`.vscode`文件夹

4. 打开`.vscode`文件夹中的`settings.json`，在其中添加属性`files.exclude`，该属性的值是一个对象，对象的键是要隐藏的文件或目录，值为`true`的话就会隐藏该文件或目录，下面是一个Vue工程项目的隐藏配置，可以用于参考：

   ```js
   {
     "files.exclude": {
       "**/.git": true,
       "**/.svn": true,
       "**/.hg": true,
       "**/CVS": true,
       "**/.DS_Store": true,
       "**/README.md": true,
       "**/node_modules": true,
       "**/shims-tsx.d.ts": true,
       "**/shims-vue.d.ts": true,
       "**/.browserslistrc": true,
       "**/.eslintrc.js": true,
       "**/.gitignore": true,
       "**/babel.config.js": true,
       "**/package-lock.json": true,
       "**/tsconfig.json": true
     }
   }
   ```

   