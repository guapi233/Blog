# PV操作

PV算法是操作系统实现中一种很常用的算法，常被用来实现进程同步、进程互斥等操作，这里使用JS来模拟一下其的大概执行流程。

因为JS是单线程操作，不太方便模拟多进程并发的操作，在尝试了回调和Promise之后，最后选择用协程来模拟实现，JS中的协程实现是`generator`，所以就是用生成器来模拟了大致的执行流程。