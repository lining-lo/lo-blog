# 一、Linux目录结构

```
1.输入: cd /   ->    进入到最顶级根目录
2.输入: cd  -> 进入家目录(/home/用户名/)    
2.输入: pwd    ->    查看当前目录
3.输入: ll     ->    查看当前都有什么目录
```

| /           | 最顶级根目录                                                 |
| ----------- | ------------------------------------------------------------ |
| /etc(重要)  | 最重要:所有系统,软件配置文件                                 |
| /home(重要) | 普通用户的目录(每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的) cd home进入home目录 ll命令查看,有一个自己的账号名,存放当前用户在操作的时候产生的数据 |
| /root       | 超级管理员目录                                               |
| /bin        | 普通用户常用命令(ls,cd,cp,mv等)                              |
| /usr(重要)  | 安装软件,程序,工具(用户的很多应用程序和文件都放在这个目录下) |
| /var        | 日志,缓存,动态数据                                           |
| /tmp        | 临时文件,自动清理                                            |
| /mnt        | 手动挂载U盘,硬盘,共享文件                                    |

# 二、APT软件包管理器

```
1.概述:APT 是 Debian / Ubuntu 系列 Linux 的 软件包管理器
2.简单讲:window安装软件直接可以双击,但是在linux操作系统中安装软件就需要用APT软件包管理器
```

**apt常用命令**

| 命令                       | 说明                      |
| -------------------------- | ------------------------- |
| sudo apt list 软件包名     | 根据名称列出APT管理的软件 |
| sudo apt update            | 更新可用软件包列表        |
| sudo apt install net-tools | 使用APT安装软件           |
| sudo apt remove net-tools  | 使用APT卸载软件           |
| sudo apt search net-tools  | 使用APT搜索软件           |

> 注意:
>
> 1.net-tools是网络工具
>
> 2.net-tools安装后的作用:使用我们常用的关于网络的命令
>
>  a.ifconfig:查看IP地址
>
>  b.netstat:查看软件占用的端口

# 三、常用命令

## 1.帮助命令

| 命令                     | 说明                       |
| ------------------------ | -------------------------- |
| help                     | 查看所有的命令             |
| help 具体命令 -> help cd | 查看指定命令的说明以及使用 |

## 2.linux常用快捷键

| 常用快捷键        | 功能                                                         |
| ----------------- | ------------------------------------------------------------ |
| Ctrl + L          | 清屏；彻底清屏是：**clear**                                  |
| Ctrl + C 或 Q     | 停止进程 / 退出 ->比如安装某个软件到一半,不想安了,直接按ctrl+c |
| TAB键(一次或二次) | 1.补全文件或者文件夹名字 2.提示(更重要的是可以防止敲错)      |
| 上下键            | 查找执行过的命令                                             |
| Ctrl + U          | 清除当前敲的命令                                             |

## 3.文件目录类命令

### 3.1. pwd 查看当前工作的目录

| 命令 | 说明               |
| ---- | ------------------ |
| pwd  | 查看当前所在的目录 |

```sh
lining@lining:~$ pwd
/home/lining
```

### 3.2. ls 查看当前目录下的文件夹和文件

| 命令           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| ls             | 查看当前目录下的文件夹和文件                                 |
| ls -a          | 查看当前目录下的文件夹和文件包括隐藏项(横着展示)             |
| ls -l          | 查看当前目录下的文件夹以及文件的详细信息(包括权限,文件的属性等) |
| ls -al或者ll   | 查看当前目录下的文件夹和文件包括隐藏项(竖着展示)             |
| ls -R 文件夹名 | 递归的方式查看指定文件夹以及子文件夹下的内容                 |

```sh
lining@lining:~$ ls -al
lining@lining:~$ ll
```

> ll是ls -al的缩写,所以以后用ll命令即可

### 3.3. cd 切换目录

| 命令                 | 说明                         |
| -------------------- | ---------------------------- |
| cd 文件夹名          | 进入到指定文件夹             |
| cd 文件夹名/文件夹名 | 进入到多级文件夹             |
| cd /文件夹名         | 进入到根目录下的指定文件夹下 |
| cd …                 | 退到上一级目录               |
| cd /                 | 进入到根目录                 |
| cd ~ 或者 cd         | 回到家目录                   |

```sh
lining@lining:~$ cd aa
lining@lining:~/aa$ cd ..
lining@lining:~$ cd aa/bb
lining@lining:~/aa/bb$ cd /
lining@lining:/$ cd ~
lining@lining:~$ pwd
/home/lining
lining@lining:~$ cd /
lining@lining:/$ pwd
/
lining@lining:/$ cd
lining@lining:~$ cd /etc
lining@lining:/etc$ 
```

### 3.4. mkdir 创建文件夹

| 命令                       | 说明           |
| -------------------------- | -------------- |
| mkdir 文件夹名             | 创建单级文件夹 |
| mkdir -p 文件夹名/文件夹名 | 创建多级文件夹 |

```sh
lining@lining:~$ mkdir aa
lining@lining:~$ mkdir -p aa/bb/cc
```

### 3.5. touch 创建文件

| 命令                           | 说明                     |
| ------------------------------ | ------------------------ |
| touch 文件名                   | 创建文件                 |
| touch 文件夹名/文件夹名/文件名 | 在指定的文件夹中创建文件 |

```sh
lining@lining:~$ touch 1.txt
lining@lining:~$ touch aa/bb/cc/2.txt
```

### 3.6. cp 复制文件或文件夹

| 命令                               | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| cp 源文件夹名/文件名 目标文件夹名/ | 将指定源文件夹下的文件复制到指定目标文件夹下                 |
| cp -r 源文件夹 目标文件夹          | 使用递归的方式将指定的文件夹复制到指定目标文件夹里面 -r:代表递归方式复制 |

```sh
lining@lining:~$ cp aa/bb/cc/2.txt haha
lining@lining:~$ cp -r aa haha
```

### 3.7. rm 删除文件或文件夹

| 命令                      | 说明               |
| ------------------------- | ------------------ |
| rm -rf 文件夹名或者文件名 | 删除文件夹或者文件 |

```sh
lining@lining:~$ rm -rf aa
```

### 3.8. mv 移动文件或文件夹

| 命令                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| mv 文件名1 文件名2       | 将文件名1重命名为文件名2(两个文件必须在同一个目录中才是重命名) |
| mv 文件夹名1 文件夹名2   | 将文件夹名1重命名为文件夹名2(两个文件夹必须在同一个目录中,而且前提只有文件夹名1,文件夹名2不是提前有的,而是我们自己另外取的名字) |
| mv 原目录/资源 目标目录/ | 将指定原目录的资源移动到目标目录下                           |

```sh
lining@lining:~$ mv aa bb
lining@lining:~$ mv 1.txt haha.txt
lining@lining:~$ mv haha.txt haha/
```

### 3.9. cat 查看文件内容

| 命令          | 说明                                |
| ------------- | ----------------------------------- |
| cat 文件名    | 查看文件中的内容                    |
| cat -n 文件名 | 查看文件中的内容,并显示行号以及空行 |

```sh
lining@lining:~$ cat 清明雨上.txt 
lining@lining:~$ cat -n 清明雨上.txt 
```

### 3.10. echo 控制台输出

| 命令               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| echo “输出内容”    | 在控制台上输出指定的内容 注意:如果"“中有转义字符,默认转义字符不会生效 -> 比如"hello \n world” |
| echo -e “输出内容” | 如果""中有转义字符,转义字符会生效                            |

```sh
lining@lining:~$ echo "helloworld"
helloworld
lining@lining:~$ echo "hello \n world"
hello \n world
lining@lining:~$ echo -e "hello \n world"
hello 
 world
```

### 3.11. > 和 >> 重定向文件或者文件夹

```
1.  >  重定向到指定文件中(会覆盖)
2.  >> 重定向到指定文件中(不会覆盖,会追加)    
```

| 命令                      | 说明                                |
| ------------------------- | ----------------------------------- |
| echo “输出内容”>指定文件  | 重定向到指定文件中(会覆盖)          |
| echo “输出内容”>>指定文件 | 重定向到执行文件中(不会覆盖,会追加) |

```sh
lining@lining:~$ echo "helloword"> haha/2.txt

lining@lining:~$ cat haha/2.txt
helloword

lining@lining:~$ echo "helloword1"> haha/2.txt
lining@lining:~$ cat haha/2.txt
helloword1

lining@lining:~$ echo "helloword3">> haha/2.txt
lining@lining:~$ cat haha/2.txt
helloword1
helloword3
```

### 3.12. tail 输出文件尾部内容

| 命令           | 说明                                       |
| -------------- | ------------------------------------------ |
| tail 文件名    | 查看文件的后10行内容                       |
| tail -n 文件名 | 查看文件的后n行内容                        |
| tail -F 文件名 | 显示文件中最新追加的内容(可以监视文件变化) |

```sh
lining@lining:~/haha$ cd
lining@lining:~$ tail 清明雨上.txt 
远方有琴 愀然空灵 声声催天雨
涓涓心事说给自己听
月影憧憧 烟火几重 烛花红
红尘旧梦 梦断都成空
雨打湿了眼眶 年年倚井盼归堂
最怕不觉泪已拆两行
我在人间彷徨 寻不到你的天堂
东瓶西镜放 恨不能遗忘
又是清明雨上 折菊寄到你身旁
把你最爱的歌来轻轻唱
lining@lining:~$ tail -4 清明雨上.txt 
我在人间彷徨 寻不到你的天堂
东瓶西镜放 恨不能遗忘
又是清明雨上 折菊寄到你身旁
把你最爱的歌来轻轻唱
lining@lining:~$ echo "helloworld"> haha/2.txt
lining@lining:~$ tail -F haha/2.txt
helloworld

lining@lining:~$ echo "helloworld111">> haha/2.txt
lining@lining:~$ tail -F haha/2.txt
helloworld
helloworld111
```

### 3.13. ln 软连接

```
1.概述:说白了就是创建快捷方式->作用跟windows中的快捷方式一样
2.作用:在指定位置创建一个快捷方式,这样想看一个文件夹中的内容,就不用先找到这个文件夹进入查看了,直接操作快捷方式就行了    
```

| 命令                                  | 说明                                   |
| ------------------------------------- | -------------------------------------- |
| ln -s 文件名或者文件夹名 快捷方式名字 | 给指定的文件或者文件夹创建一个快捷方式 |
| rm 软连接名                           | 删除软连接 -> 和下面的unlink作用一样   |
| unlink 软连接名                       | 删除软连接                             |

```sh
lining@lining:~$ ln -s haha haha2
lining@lining:~$ rm haha2

lining@lining:~$ ln -s haha haha2
lining@lining:~$ unlink haha2
```

> 注意：千万不要用rm -rf 软连接名/ ->尤其不要加/ -> 加/会冲进原目录中直接将里面的东西删除

### 3.14. history 查看已经执行过历史命令

| 命令    | 说明                   |
| ------- | ---------------------- |
| history | 查看已经执行过历史命令 |

```
lining@lining:~$ history
```

## 4.vi和vim编辑器

```
windows中有记事本打开文本文档,然后编辑
linux中vi和vim就相当于记事本的作用了,可以打开文本文档,进行编辑
1.vi概述:是Linux中最通用的文本编辑器
2.vim概述:是vi发展出来的更加强大的文本编辑器
```

> 两个的区别可以向模型提问

### 4.1.安装vim编辑器

```
sudo apt install vim
lining@lining:~$ sudo apt install vim
```

### 4.2.使用vim_一般模式操作

| 命令       | 说明                  |
| ---------- | --------------------- |
| vim 文件名 | 打开文件,进入一般模式 |

```
1.注意:我们直接用vim打开一个文件,默认会进入到一般模式,在这个模式中是不能做任何编辑操作的,只能通过一些命令移动光标,删除字符,复制等操作,但是想插入操作是不行的
```

| 命令   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| yy     | 复制光标所在行,不过记住按完yy,需要按p才能完成复制粘贴        |
| y数字y | 复制一段(从光标所在行到后面的指定n行),需要按p才能完成复制粘贴 |
| p      | 箭头移动到目的行粘贴                                         |
| u      | 撤销上一步                                                   |
| dd     | 删除光标所在行                                               |
| d数字d | 删除光标所在行到后面的指定n行                                |

### 4.3.使用vim_编辑(插入)模式操作

```
1.先使用vim进入到要操作的文件中
2.使用命令来进入编辑(插入)模式进行操作    
```

| 命令 | 说明                                    |
| ---- | --------------------------------------- |
| i    | 进入到插入模式,在光标前插入             |
| a    | 进入到插入模式,在光标后插入             |
| o    | 进入到插入模式,在光标所在行的下一行插入 |
| I    | 进入到插入模式,在光标所在行最前面插入   |
| A    | 进入到插入模式,在光标所在行最后面插入   |
| O    | 进入到插入模式,在光标所在行的上一行插入 |

> 注意:以上操作,只需要记住i即可

### 4.4.使用vim_退出编辑模式

```
按ESC键
```

### 4.5.使用vim_保存并退出

```
1.作用:在我们编辑完之后,我们需要保存并退出vim编辑器模式
```

| 命令 | 说明                                             |
| ---- | ------------------------------------------------ |
| :wq  | 对于有写的权限的文件,编辑后,保存并退出           |
| :wq! | 对于没有写的权限的文件,编辑后,进行强制保存并退出 |

## 5.用户管理命令

### 5.1.root用户介绍

```
1.概述:root用户是超级管理员,拥有最高权限
2.特点:root 用户拥有系统的所有权限，可以对系统进行任何操作,但是由于权限太大,如果做了不当操作,会导致系统出现问题
3.注意:Ubuntu默认情况下,root用户是被锁定的,所以在安装Ubuntu系统的时候没有给root用户设置默认密码
      为了提高系统的安全性,鼓励用普通用户登录,并通过使用sudo命令来临时使用root权限
```

### 5.2.设置root密码&切换用户

| 命令             | 说明                                                     |
| ---------------- | -------------------------------------------------------- |
| sudo passwd root | 为root用户设置密码 ->这里设置成lining123                 |
| su 用户名称      | 切换用户,这个命令只能获取用户的执行权限,不能获取环境变量 |
| su - 用户名称    | 切换用户,这个命令能获取用户的执行权限和环境变量          |
| exit             | 退出root用户                                             |

```sh
lining@lining:~$ sudo passwd root
[sudo] lining 的密码：自己账户用的密码 
新的密码： lining123
重新输入新的密码：lining123
passwd：已成功更新密码
lining@lining:~$ su root
密码：lining123 
root@lining:/home/lining# exit
exit
lining@lining:~$ su - root
密码： 
root@lining:~# exit
注销
```

> 注意:虽然可以用命令直接操作root用户,但是还是推荐用sudo命令来暂时获取root用户权限
>
>  在命令前面加上sudo,比如安装软件
>
> ```
> sudo apt install 软件名称
> ```

### 5.2.锁定和解锁root用户

| 命令                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| sudo passwd -l root | 锁定 root 用户：如果你想再次锁定 root 用户，使其无法登录，可以使用这个命令 |
| sudo passwd -u root | 解锁 root 用户：若要解锁 root 用户，可以使用这个命令         |

```sh
lining@lining:~$ sudo passwd -l root
passwd：密码过期信息已更改。
lining@lining:~$ su
密码：lining123 
su: 认证失败
```

### 5.3.添加&删除&修改用户命令

| 命令                                      | 说明                                     |
| ----------------------------------------- | ---------------------------------------- |
| useradd -m 用户名                         | 创建新用户,并且创建一个新用户的目录      |
| id 用户名                                 | 查看用户是否存在                         |
| passwd 用户名                             | 给用户设置密码                           |
| userdel -r 用户名                         | 删除指定用户,并将用户的目录都删除        |
| usermod -l 新用户名 老用户名              | 修改用户名(但是home下的用户目录不会改变) |
| usermod -d /home/新用户目录名 -m 新用户名 | 修改home下的用户目录名                   |

```sh
lining@lining:~$ sudo useradd -m lining1
==========================================================
lining@lining:~$ ll /home/
总计 16
drwxr-xr-x  4 root     root     4096  5月  7 20:48 ./
drwxr-xr-x 20 root     root     4096  4月 27 08:05 ../
drwxr-x---  2 lining1 lining1 4096  5月  7 20:48 lining1/
drwxr-x--- 15 lining    lining    4096  5月  6 22:38 lining/
==========================================================
lining@lining:~$ id lining1
uid=1001(lining1) gid=1001(lining1) 组=1001(lining1)
==========================================================
lining@lining:~$ sudo userdel -r lining1
userdel：lining1 信件池 (/var/mail/lining1) 未找到
lining@lining:~$ id lining1
id: "lining1": 无此用户
lining@lining:~$ ll /home/
总计 12
drwxr-xr-x  3 root  root  4096  5月  7 20:49 ./
drwxr-xr-x 20 root  root  4096  4月 27 08:05 ../
drwxr-x--- 15 lining lining 4096  5月  6 22:38 lining/
==========================================================
lining@lining:~$ sudo useradd -m lining1
lining@lining:~$ id lining1
uid=1001(lining1) gid=1001(lining1) 组=1001(lining1)
lining@lining:~$ ll /home/
总计 16
drwxr-xr-x  4 root     root     4096  5月  7 20:58 ./
drwxr-xr-x 20 root     root     4096  4月 27 08:05 ../
drwxr-x---  2 lining1 lining1 4096  5月  7 20:58 lining1/
drwxr-x--- 15 lining    lining    4096  5月  6 22:38 lining/
==========================================================
lining@lining:~$ sudo usermod -l lining2 lining1
lining@lining:~$ id lining1
id: "lining1": 无此用户
lining@lining:~$ id lining2
uid=1001(lining2) gid=1001(lining1) 组=1001(lining1)
lining@lining:~$ ll /home/
总计 16
drwxr-xr-x  4 root     root     4096  5月  7 20:58 ./
drwxr-xr-x 20 root     root     4096  4月 27 08:05 ../
drwxr-x---  2 lining2 lining1 4096  5月  7 20:58 lining1/
drwxr-x--- 15 lining    lining    4096  5月  6 22:38 lining/
==========================================================
lining@lining:~$ sudo usermod -d /home/lining2 -m lining2
lining@lining:~$ ll /home/
总计 16
drwxr-xr-x  4 root     root     4096  5月  7 21:00 ./
drwxr-xr-x 20 root     root     4096  4月 27 08:05 ../
drwxr-x---  2 lining2 lining1 4096  5月  7 20:58 lining2/
drwxr-x--- 15 lining    lining    4096  5月  6 22:38 lining/
```

> 附:sudo设置普通用户具有root权限 -> 了解,不演示
>
> **1）******添加testu用户，并对其设置密码。\****
>
> root@ubuntu-1:~#useradd testu
>
> root@ubuntu-1:~#passwd testu
>
> **2）******修改配置文件\****
>
> lining@ubuntu-1:~$vi /etc/sudoers
>
> 修改 /etc/sudoers 文件，在root下面添加一行，如下所示：
>
> \## Allow root to run any commands anywhere
>
> root ALL=(ALL) ALL
>
> testu ALL=(ALL) ALL
>
> 或者配置成采用sudo命令时，不需要输入密码
>
> \## Allow root to run any commands anywhere
>
> root ALL=(ALL) ALL
>
> testu ALL=(ALL) NOPASSWD:ALL
>
> 修改完毕，通过:wq!退出编辑，然后可以用testu帐号登录，用命令 sudo ，即可获得root权限进行操作。不需要多次输入密码。

### 5.4.用户组管理命令

```
1.问题说明:如果一次性创建了多个用户,并需要为多个用户都分配权限,一个一个分配就太麻烦了
2.解决问题:所以我们可以将这些用户放到一个组中,然后针对这个组分配权限  
3.注意:linux系统中在创建用户的时候就已经自动创建好组了,组名和用户名一致    
```

| 命令                      | 说明                           |
| ------------------------- | ------------------------------ |
| groupadd 组名             | 新增组                         |
| groupmod -n 新组名 老组名 | 修改组                         |
| groupdel 组名             | 删除组                         |
| useradd -g 组名 用户名    | 创建新用户并将其添加到指定组中 |
| usermod -g 组名 用户名    | 修改用户组                     |
| cat /etc/group            | 查看创建了哪些组               |

```sh
lining@lining:~$ sudo groupadd qujing
lining@lining:~$ cat /etc/group
lining1:x:1001:
qujing:x:1002:

======================================================
lining@lining:~$ sudo groupmod -n xitianqujing qujing
lining@lining:~$ cat /etc/group
lining1:x:1001:
xitianqujing:x:1002:

======================================================
lining@lining:~$ sudo groupdel xitianqujing
lining@lining:~$ cat /etc/group
lining1:x:1001:

======================================================
lining@lining:~$ sudo groupadd qujing
lining@lining:~$ sudo useradd -g qujing sunwukong
lining@lining:~$ id sunwukong
uid=1002(sunwukong) gid=1002(qujing) 组=1002(qujing)

======================================================


lining@lining:~$ sudo groupadd qujing
[sudo] lining 的密码： 
lining@lining:~$ sudo useradd -m sunwukong
lining@lining:~$ id sunwukong
uid=1001(sunwukong) gid=1003(sunwukong) 组=1003(sunwukong)

lining@lining:~$ sudo usermod -g qujing sunwukong
lining@lining:~$ id sunwukong
uid=1001(sunwukong) gid=1002(qujing) 组=1002(qujing)

======================================================
lining@lining:~$ sudo groupdel qujing
groupdel：不能移除用户“sunwukong”的主组
lining@lining:~$ sudo userdel -r sunwukong
userdel：组“sunwukong”没有移除，因为它不是用户 sunwukong 的主组
userdel：sunwukong 信件池 (/var/mail/sunwukong) 未找到
lining@lining:~$ sudo groupdel qujing
lining@lining:~$ cat /etc/group
lining1:x:1001:
sunwukong:x:1003:     -> 将sunwukong用户删除之后,etc/group中还有刚开始创建sunwukong用户时默认创建的sunwukong组
lining@lining:~$ sudo groupdel sunwukong               -> 将刚开始创建sunwukong用户时自动创建的sunwukong组删除
lining@lining:~$ cat /etc/group
lining1:x:1001:
```

## 6.文件权限类命令

### 6.1.文件属性

```
1.概述:所谓的文件属性就是指文件类型以及操作权限的详情
2.划分:从左到右用10个字符表示
  a.第一个字符:表示文件类型
  b.后九个字符:表示操作权限
```

![image-20260509222729777](/image/image-20260509222729777.png)

```
1.[0]表示类型:在linux中第一个字符代表这个文件是目录,还是文件,还是链接等
  - :代表文件
  d :代表目录,文件夹 
  l :代表链接文档
      
2.[1-3]位:代表该文件的所有者(该文件的创建者)拥有的文件权限
   
3.[4-6]位:代表所有者的同组用户对该文件的权限
      
4.[7-9]位:代表其他用户有用该文件的权限
```

### 6.2.rwx ->对于文件和目录的含义

```
1.rwx针对于文件:
  a.[r]代表可读:可以读取,查看文件
  b.[w]代表可写入:可以修改
  c.[x]代表可执行:可以被系统作为程序或者脚本执行

2.rwx针对于目录:
  a.[r]代表可读:可以读取,可以使用ls等查看命令查看目录下的内容
  b.[w]代表可写:可以修改,比如目录内创建,删除,重命名目录操作
  c.[x]代表可执行:可以使用cd命令进入该目录
yutao@yutao:~$ ll
-rw-r--r--  1 yutao yutao  826  5月  6 22:38 清明雨上.txt
```

![image-20260509230525613](/image/image-20260509230525613.png)

```
-rw-r--r--

-:是一个文件
rw-      → 属主(文件创建者)可以读,写,但不是一个可执行文件
r--      → 所属组可读，不可写、不可执行
r--      → 其他人可读，不可写、不可执行
```

### 6.3.chmod命令_改变权限

![image-20260518092227660](/image/image-20260518092227660.png)

> 我们先将属主权限看成是u,属组权限看成是g,其他用户权限看成是o

| 命令                                           | 说明                                                   |
| ---------------------------------------------- | ------------------------------------------------------ |
| chmod u\|g\|o +\|-\|= r\|w\|x 指定目录或者文件 | 给指定目录或者文件的不同用户权限添加或者减去对应的权限 |

```
yutao@yutao:~$ sudo chmod g+w 清明雨上.txt 
[sudo] yutao 的密码： 输入你的密码
yutao@yutao:~$ ll
-rw-rw-r--  1 yutao yutao  826  5月  6 22:38 清明雨上.txt
===================================================================
yutao@yutao:~$ sudo chmod g-w 清明雨上.txt 
yutao@yutao:~$ ll
-rw-r--r--  1 yutao yutao  826  5月  6 22:38 清明雨上.txt
===================================================================
yutao@yutao:~$ sudo chmod g+w,o+w 清明雨上.txt 
yutao@yutao:~$ ll
-rw-rw-rw-  1 yutao yutao  826  5月  6 22:38 清明雨上.txt
```

### 6.4.chown命令_改变所有者和所属组

| 命令                            | 说明                                         |
| ------------------------------- | -------------------------------------------- |
| chown 用户名 目录名/文件名      | 将指定的目录或者文件改变指定的所有者         |
| chown 用户名:组名 目录名/文件名 | 将指定的目录或者文件改变指定的所有者和所属组 |

```
yutao@yutao:~$ sudo chown root 清明雨上.txt 
yutao@yutao:~$ ll
=============================================================
-rw-rw-rw-  1 root  yutao  826  5月  6 22:38 清明雨上.txt
=============================================================
yutao@yutao:~$ sudo chown root:root 清明雨上.txt 
yutao@yutao:~$ ll
-rw-rw-rw-  1 root  root   826  5月  6 22:38 清明雨上.txt
=============================================================
yutao@yutao:~$ sudo chown yutao:yutao 清明雨上.txt 
yutao@yutao:~$ ll
-rw-rw-rw-  1 yutao yutao  826  5月  6 22:38 清明雨上.txt
```

> 如果想将目录下所有的内容权限都改了, 就在chown后面加一个-R:
>
> ```
> sudo chown -R root:root test/
> ll -R test/
> ```