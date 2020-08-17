# 修改git的commit的注释信息

主要分为两种注释修改情况：

1. 还没push到远程仓库，只存在于本地的commit
2. 已经push到远程仓库的commit

两种commit的修改流程大致相似，只是第二种情况要多上一个步骤。



## 答案

### 修改最新的一次commit

这种情况最简单，只需要使用`git commit --amend`即可，执行指令后会弹出最新commit的修改界面，只需要修改保存即可。



### 修改之前的注释

如果要修改之前的注释，需要先执行`git rebase -i head~[想要展示的历史commit条数]`，执行指令后会出现之前的commit信息，且每条commit信息前都有一个**pick**标识，将你想修改的commit信息前的**pick**修改为**edit**，你可以同时设置多条commit信息，设置好之后，保存退出。

接下来再执行`git commit --amend`，这次git会找到你设置**edit**的最新一条commit，弹出其的修改页面，修改保存退出，在执行`git rebase continue`即可完成该条commit的更新（且该commit的状态变为pick）。

如果你设置了多条**edit**状态的commit，则可继续执行`git commit --amend`和`git rebase continue`，git会继续向前修改。



### 修改已经push到远程仓库的commit

前面的流程与本地仓库无异，只不过最后提交时需要加上`--force`，表示强制推送且覆盖远程仓库的commit，一般情况下，不建议使用该方法。



