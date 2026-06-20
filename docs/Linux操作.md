# 一、Linux 学习路线

## 1.前期准备

### 1.1.Linux 环境

三种方案任选其一，推荐虚拟机：

1. VMware / VirtualBox 虚拟机（新手首选）

   发行版选：

   CentOS7 / CentOS Stream9 / Ubuntu 22.04

   - CentOS：企业服务器主流，运维必学
   - Ubuntu：桌面友好，开发、新手入门简单

2. WSL2（Windows 用户，不用装虚拟机）

   Win10/11 商店安装 Ubuntu，原生 Linux 终端，轻量方便

3. 云服务器（阿里云 / 腾讯云学生机）

   后期练项目用，前期学命令不推荐（删库风险高）

### 1.2.配套工具

- 连接工具：Xshell、FinalShell、SecureCRT、Windows Terminal
- 文件传输：Xftp、rz/sz 命令

## 2.Linux 基础

### 2.1.基础认知

- 区分 Linux 发行版：内核 vs 发行版
- 目录结构（必考）：`/ /root /home /etc /usr /var /tmp /boot /dev`
- 用户与权限：root 超级用户、普通用户，登录切换 `su / sudo`
- 文件类型：普通文件、目录、软链接、设备文件

### 2.2. 高频命令

#### 文件目录操作

```
cd ls pwd mkdir rm rmdir cp mv touch find tree
```

#### 文件查看编辑

```
cat more less head tail vi/vim nano
```

#### 文件权限

`chmod chown chgrp` 读懂 rwx 数字权限 755/644

#### 压缩解压

```
tar gzip zip unzip
```

#### 系统信息

```
hostname uname -a df -h free -m top who w date cal
```

#### 文本处理

```
grep sed awk sort uniq cut wc
```

#### 软件安装

Ubuntu：`apt install`

CentOS：`yum dnf install`

### 2.3. 重点难点

1. Vim 编辑器：三种模式（普通 / 编辑 / 末行），保存退出、复制粘贴、查找替换
2. 软硬链接区别
3. 通配符 `* ? []`、管道 `|`、重定向 `> >> 2>&1`

## 3.系统管理

### 3.1. 用户与组管理

```
useradd userdel usermod groupadd passwd
```

/etc/passwd/etc/shadow/etc/group 文件解析

### 3.2. 磁盘与挂载

- 磁盘分区：fdisk parted
- 格式化 mkfs，挂载 mount /etc/fstab 开机自动挂载
- 交换分区 swap

### 3.3. 进程管理

```
top htop ps kill killall nohup &
```

前台后台进程、守护进程、僵尸进程

### 3.4. 服务管理

- CentOS7+/Ubuntu：systemd systemctl（主流）
- 旧版：service chkconfig开机自启、启停、查看日志

### 3.5. 定时任务

`crontab -e` 分时日月周语法，系统定时 /etc/cron.*

### 3.6. 日志系统

日志存放 `/var/log/`，journalctl、logrotate 日志切割

## 4.网络 + 常用服务

### 4.1. 网络基础命令

```
ip addr ifconfig ping netstat ss route curl wget telnet
```

防火墙：firewalld /iptables 放行端口

### 4.2. 网络配置

静态 IP、DNS、主机名、hosts 本地解析

### 4.3. 服务实操

1. Nginx：静态网站、反向代理
2. SSH：免密登录、密钥认证
3. FTP/SFTP 文件传输
4. MySQL/MariaDB：数据库部署、授权、备份
5. Samba：Windows 共享 Linux 文件
6. NFS：服务器之间文件共享

## 5.进阶自动化

1. Shell 脚本编程

   变量、判断 if、循环 for/while、函数、数组、读取文件、定时备份脚本

2. 版本控制 Git + Linux 结合

3. 虚拟化与容器：Docker（现在必备）

4. 进阶工具：Ansible 自动化运维

5. 服务器调优：内存、磁盘、内核参数优化

## 6.学习方法

### 6.1. 拒绝只看视频，**每一条命令亲手敲**

看一遍很快忘，敲 3 次就能记住；遇到报错不要直接复制答案，看懂报错再解决。

### 6.2. 搭建个人笔记

分类记录：命令大全、配置文件模板、报错解决方案，后期面试直接复习。

### 6.3. 阶段性实战小项目

1. 基础：写 Shell 脚本实现服务器日志自动清理、数据库定时备份
2. 中级：搭建 LNMP 网站（Linux+Nginx+MySQL+PHP）
3. 进阶：Docker 部署前后端项目、配置 Nginx 反向代理多站点

### 6.4. 推荐学习资源

#### 6.4.1书籍

- 《Linux 命令行与 Shell 脚本编程大全》（入门到精通）
- 《鸟哥的 Linux 私房菜》（服务器篇，系统管理神器）

#### 6.4.2视频

- 尚硅谷 Linux、黑马 Linux（零基础友好）
- B 站大量免费全套教程

## 7.学习周期规划参考

- 0 基础，每天 1.5～2 小时：总耗时 2 个月左右可熟练使用
- 开发方向：重点学命令、Shell、Docker、Nginx、网络
- 运维方向：深入磁盘、权限、服务、防火墙、定时任务、Ansible

## 8.避坑提醒

1. 不要直接拿云服务器练手，误删文件损失大，先用虚拟机
2. 不要跳过 Vim，线上服务器没有图形编辑器
3. 权限、防火墙、开机自启是面试高频考点，一定要实操
4. 多记报错：端口占用、挂载失败、crontab 不执行等，都是工作常见问题