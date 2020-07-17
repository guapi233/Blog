# 简介

因为学习Vue源码的原因，且对编译原理很感兴趣，便尝试着接触了这门课。听完第一单元后，尝试着用JavaScript复现了一下课程中讲述的简易sum编译器。



## 主要对象

* AST	抽象语法树本树
* ASTNode    树节点
* frontCompile()    前端编译函数
* backCompile()    后端编译函数



## 执行流程

源代码  ==>  frontCompile()  ==>  抽象语法树  ==>  backCompile()  ==>  目标代码



## 参考课程

[网易云课堂 -- 编译原理 -- 华保健 -- 2020开课](https://mooc.study.163.com/course/1000002001?tid=2403024009&_trace_c_p_k2_=41e4b0bd9d444a85bc79295005fd31bd#/info)