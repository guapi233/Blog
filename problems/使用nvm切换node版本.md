# 使用nvm切换node版本

本来我是不打算切换node版本的，但是在执行一段node脚本时出现了语法不识别报错，令我稍微有些惊讶，原来是不支持ES6 class语法的static属性，要知道我的node版本已经是10.x.x了，应该算是一个很高的版本了，在同学的12.16.3版本中测试正常，没想到这一特性的支持这么靠后。

于是我想反正要切换node版本，干脆下一个nvm来管理node版本好了，以后出现类似问题也不用重复卸载安装。



## 答案

首先从[nvm的github仓库](https://github.com/coreybutler/nvm-windows/releases)中下载并安装上nvm，然后执行指令`nvm install node版本`来安装想要使用node和npm，下载完成后nvm会提醒你使用`nvm use 版本`来切换node版本。



## 坑1.0

可能会出现由于网速的问题github仓库文件拉取失败的情况，可以在nvm的安装路径下找到`settings.txt`文件，在其中加上：

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

来配置淘宝镜像，从而加速下载。



## 坑2.0

这个坑是基于1.0的，如果你配置了淘宝镜像，你要注意了，截止到2020-08-13，也就是这篇博客编写的时候，淘宝源上的npm包只包含了6.9.2版本及其以前的版本。如果你选择的node版本偏高，可能会出现nvm提示你安装成功但是仍无法使用的情况，比如我选择的12.16.3版本node需要6.14.4版本的npm，这就导致了上述的问题。

这种情况下只通过官网或其他方式手动下载。

