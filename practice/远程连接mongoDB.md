# 远程连接mongoDB

软件使用Robo 3T

1. 首先在创建连接处创建一条新连接
2. 选择SSH，添入远端服务器的Ip以及用户名密码
3. 如果远端数据库存在账号密码，则需要在填写数据库账号密码
4. **重要：在填写connection的address处无需填写服务器的公网Ip，因为选择SSH相当于你通过远端服务器来连接这个数据库，所以直接localhost就可以了**