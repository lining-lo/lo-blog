# 1.数据库介绍

## 1.1.数据库介绍

```mysql
1.概述:存储数据的仓库,可以永久性存储数据
2.为啥使用数据库存储数据:
  a.咱们之前在python的时候学了变量,但是变量一次性只能存一个数据,后来我们就学了容器,容器可以一次性存多个数据,但是容器存数据是临时性的,代码运行完毕之后,容器中的数据就没了,所以我们就又学了文件操作,可以将数据永久性保存到文件中,但是数据存到文件中没有格式,不好操作
      
  b.所以就需要数据库了,数据库有自己独特的sql语句,可以根据条件快速定位到指定的单元格中,原地修改,而且数据量如果超大,数据库能承受,而且操作也很方便 
      
3.数据库的作用:
  a.格式清晰
  b.操作数据方便
  c.永久存储
  d.能抗大量数据的压力
```

> 常见的关系型数据库:所谓的关系型数据库,需要有库,库中建表,数据存到表中
>
> mysql oracle

## 1.2.数据库管理系统

```mysql
1.概述:我们程序员操作数据库中的数据时,不是我们直接就去操作数据的,在程序员和数据库之间有一个"库管",这个"库管"就是数据库管理系统,这个数据库管理系统在安装数据库的时候就已经存在了,我们只不过感受不到
2.作用:
  保证数据库中的数据的安全性和稳定性
```

![image-20260618091543198](../image/image-20260618091543198.png)

## 1.3.数据库表

```mysql
1.概述:数据真正存储的位置,叫做表  -> table
2.表的组成部分:
  a.表名
  b.列名
  c.单元格:真正存储数据的地方
  d.每一列都有对应的数据类型
```

## 1.4.数据库表和python类的对应关系

```mysql
数据库的表和python类的对应关系:
  1.表名  ->  类名
  2.列名  ->  属性名
  3.一行数据   -> 对象
  4.单元格的数据  -> 属性值
```

![image-20260618092933537](../image/image-20260618092933537.png)

## 1.5.python类结合表的实际运用

```mysql
1.针对于添加:
  a.前端上填写了很多数据
  b.数据会发送给服务端
  c.服务端就要接收数据
  d.服务端有可能会接收到很多前端发送过来的数据
  e.我们服务端如何传递这些数据,最终将数据放到数据库中保存呢?
  f.我们可以将前端发送过来的数据,封装成python类对象,进行服务端的各个部分传递,最终将封装的数据添加到数据库中
      
      
2.针对于查询:
  可以将从数据库中查询出来的多条数据,封装成一个一个的python类对象,将这些对象返回给页面进行展示   
```

# 2.sql语言

## 2.1.sql语言介绍

```mysql
1.什么叫做sql语言:是所有关系型数据库语法的一个标准,规范
2.作用:规范了关系型数据库的语法以及一些关键字的使用: create drop insert select update等
3.注意:不同的关系型数据库在都遵守sql语言规范的基础上,会有一些差异,这些差异叫做sql方言
```

## 2.2.sql语言分类

```mysql
- 数据定义语言：简称DDL(Data Definition Language)，用来定义数据库对象：数据库，表，列等。关键字：create，alter，drop等

- 数据操作语言：简称DML(Data Manipulation Language)，用来对数据库中表的记录进行操作。关键字：insert，delete，update等

- 数据控制语言：简称DCL(Data Control Language)，用来定义数据库的访问权限和安全级别，及创建用户。

- 数据查询语言：简称DQL(Data Query Language)，用来查询数据库中表的记录。关键字：select，from，where等
```

## 2.3.sql语句的通用语法

```mysql
1.- SQL语句可以单行或多行书写，以分号结尾
2.- 可使用空格和缩进来增强语句的可读性:基本上一个单词就一个空格
3.- MySQL数据库的SQL语句不区分大小写，关键字建议使用大写
    
  - 例如：SELECT * FROM user。
4.- 同样可以使用/**/的方式完成注释 
    /*
     我是一个注释
    */
    #我也是一个注释
   -- 我也是一个注释
```

## 2.4.sql中的数据类型

| **类型名称**          | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| int                   | 整数类型                                                     |
| double                | 小数类型                                                     |
| decimal（m,d）        | 指定整数位与小数位长度的小数类型                             |
| date                  | 日期类型，格式为yyyy-MM-dd，包含年月日，不包含时分秒 2020-01-01 |
| datetime              | 日期类型，格式为 YYYY-MM-DD HH:mm:ss，包含年月日时分秒 到9999年 |
| timestamp             | 日期类型，时间戳 从1970年到2038年                            |
| varchar（字符串长度） | 文本类型， M为0~65535之间的整数                              |

```mysql
我们先学  mysql
```

# 3.mysql中语句

## 3.1.DDL之数据库操作：database

### 3.1.1 创建数据库

```mysql
语法:create database 库名
CREATE DATABASE `bj260528_1`;
```

> 强调:
>
> 我们写库名,表名,列名的时候,最好用``包裹

### 3.1.2 查看数据库(了解)

```mysql
语法: show databases
SHOW DATABASES;
```

### 3.1.3 删除数据库

```mysql
语法: drop database 库名
DROP DATABASE `bj260528_1`;
```

![image-20260618112549149](../image/image-20260618112549149.png)

### 3.1.4 使用数据库(切换数据库)

```mysql
语法:use 库名
注意:只有切换库之后,才能够在指定库下面去操作
USE `bj260528_1`;
```

## 3.2.DDL之表操作->table

### 3.2.1 创建表

```mysql
1.格式:
  create table 表名(
    列名 数据类型 (长度) [约束],
    列名 数据类型 (长度) [约束],  
    列名 数据类型 (长度) [约束]
  );

2.注意:
  如果在创建表的时候定义到最后一列了,后面没有其他的语句了,就不要加,
-- 创建表
CREATE TABLE products (
  pid INT,
  pname VARCHAR(10),
  price INT
)
```

### 3.2.3 查看表(了解)

```mysql
#查看所有表
show tables;

#查看表结构
desc 表名;
#查看所有表
SHOW TABLES

#查看表结构
DESC products
```

### 3.2.4 删除表

```mysql
1.语法:
  drop table 表名
DROP TABLE `products`;
```

### 3.2.5修改表结构(了解)

```mysql
alter table 表名 add 列名 类型(长度) [约束];
作用：添加列. 
ALTER TABLE products ADD pdesc VARCHAR(20);
alter table 表名 modify 列名 类型(长度) [约束];
  作用：修改列的类型,长度及约束.
ALTER TABLE products MODIFY pdesc INT;
ALTER TABLE products MODIFY pdesc VARCHAR(20);
  alter table 表名 change 旧列名 新列名 类型(长度) [约束]; 
  作用：修改列名.
ALTER TABLE products CHANGE pdesc miaoshu VARCHAR(20);
ALTER TABLE products CHANGE miaoshu pdesc VARCHAR(20);
  alter table 表名 drop 列名; 
  作用：删除列.
ALTER TABLE products DROP pdesc;
 rename table 表名 to 新表名; 
 作用：修改表名
RENAME TABLE products TO product;
```

## 3.3.DML之数据操作语言

### 3.3.1 插入数据

```mysql
1.关键字:insert into values
2.语法:
  a.insert into 表名 (列名1,列名2) values (值1,值2)
  b.insert into 表名 (列名1,列名2) values (值1,值2),(值1,值2),(值1,值2)...  ->一次性添加多条数据
  c.insert into 表名 values (值1,值2) -> 如果不写列名,后面的值必须要覆盖所有列
3.注意:
  varchar类型数据可以用双引号,也可以用单引号,但是建议用单引号
/*
  varchar类型数据可以用双引号,也可以用单引号,但是建议用单引号
  
  比如,将这个sql语句放到java代码中
  String sql = "INSERT INTO product (pid,pname,price) VALUES (1,"裤衩",50)"
  
  放python中也一样
*/
INSERT INTO product (pid,pname,price) VALUES (1,'裤衩',50);

INSERT INTO product (pid,pname,price) VALUES (2,'背心',100),(3,'袜子',10),(4,'拖鞋',10)

INSERT INTO product VALUES (5,'丝袜',50)
```

> 1.表名,库名,列名用``
>
> 2.varchar类型的数据用’’

### 3.3.2 删除数据

```mysql
1.关键字:delete from where
2.语法:
  a.delete from 表名  -> 一次性将所有数据都删除
  b.delete from 表名 where 条件  -> 根据条件删除数据
```

| python | mysql      |
| ------ | ---------- |
| ==     | =          |
| >      | >          |
| <      | <          |
| >=     | >=         |
| <=     | <=         |
| !=     | != 或者 <> |

```mysql
-- 删除pid为1的记录
-- 删除pid>=5的记录
-- 删除pid不等于3的记录
DELETE FROM product;
-- 删除pid为1的记录
DELETE FROM product WHERE pid = 1;
-- 删除pid>=5的记录
DELETE FROM product WHERE pid>=5;
-- 删除pid不等于3的记录
DELETE FROM product WHERE pid!=3;
DELETE FROM product WHERE pid<>3;
DELETE FROM product WHERE NOT(pid=3);
```

### 3.3.3 修改数据

```mysql
1.关键字:update set where
2.语法:
  a.update 表名 set 列名 = 新值  -> 将指定列中所有的数据都改成新值
  b.update 表名 set 列名 = 新值 where 条件
-- 将表中的裤衩改成内裤

-- 将pid为5的price改成25

-- 将pid不等于1的pname都改成睡衣
-- 将表中的裤衩改成内裤
UPDATE product SET pname = '内裤' WHERE pname = '裤衩';
-- 将pid为5的price改成25
UPDATE product SET price = 25 WHERE pid = 5;

-- 将pid不等于1的pname都改成睡衣
UPDATE product SET pname = '睡衣' WHERE pid!=1;
```

# 4.约束

```mysql
约束是对指定列的数据进行约束
```

## 4.1.主键约束

```mysql
1.关键字:primary key
2.特点:
  a.主键列中的数据是唯一的,不能重复
  b.主键列中的数据不能是NULL
  c.主键列中的数据可以代表一条数据 -> 相当于人的身份证号
  d.每张表都应该有一个主键列
```

### 4.1.1.添加方式1:在创建表时,在字段后面直接指定(重点)

```mysql
create table 表名(
  列名 数据类型(长度) primary key,
  列名 数据类型(长度),
  列名 数据类型(长度)  
);
-- 在创建表的时候直接指定约束
CREATE TABLE category(
  cid INT PRIMARY KEY,
  cname VARCHAR(10)
);

INSERT INTO category (cid,cname) VALUES (1,'蔬菜');
-- INSERT INTO category (cid,cname) VALUES (1,'水果');
-- INSERT INTO category (cid,cname) VALUES (null,'服装');
```

### 4.1.2.添加方式2:在constraint约束区域,去指定主键约束

```mysql
1.什么叫做constraint域
  创建表的时候,最后一列和右半个小括号之间的区域
2.语法:
  [constraint 名字] primary key (字段名)
3.注意:[constraint 名字]:可写可不写
CREATE TABLE category(
  cid INT,
  cname VARCHAR(10),
  PRIMARY KEY(cid)
);
```

![image-20260618153431145](../image/image-20260618153431145.png)

### 4.1.3.添加方式3:通过修改表结构的方式

```mysql
1.格式:ALTER TABLE 表名 ADD [CONSTRAINT 名称] PRIMARY KEY (字段列表)
2.注意:[CONSTRAINT 名称]可以省略不写
CREATE TABLE category(
  cid INT,
  cname VARCHAR(10)
);
ALTER TABLE category ADD PRIMARY KEY (cid);
```

### 4.1.4.联合主键

```mysql
1.概述:多个列合称为一个主键
2.使用场景:如果多个列中的数据不能完全重复,就可以设置成联合主键
3.特点:
  主键的多个列中的数据不能完全一样,不能为NULL
/*
  联合主键
*/
CREATE TABLE person(
  xing VARCHAR(10),
  ming VARCHAR(10),
  city VARCHAR(10),
  
  PRIMARY KEY(xing,ming)
);

INSERT INTO person (xing,ming,city) VALUES ('潘','金莲','山东');
INSERT INTO person (xing,ming,city) VALUES ('潘','仁美','河北')

-- INSERT INTO person (xing,ming,city) VALUES ('潘','金莲','河南');
```

### 4.1.5.删除主键约束

```mysql
ALTER TABLE 表名 DROP PRIMARY KEY->删除主键约束
ALTER TABLE person DROP PRIMARY KEY;
```

## 4.2.自增长约束

### 4.2.1.基本操作

```mysql
1.关键字:auto_increment
2.特点:
  a.都是配合主键约束使用
  b.主键自增长的列中的数据不用我们自己维护,mysql会自动维护
  c.如果删除最后一条数据,我们重新添加,不会重新生成最后那一条数据的编号,会继续往下编
CREATE TABLE category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(10)
);

INSERT INTO category (cname) VALUES ('蔬菜');

INSERT INTO category (cname) VALUES ('水果');

INSERT INTO category VALUES (NULL,'服装');

DELETE FROM category WHERE cid = 3;

INSERT INTO category VALUES (NULL,'箱包');

-- 摧毁表结构
TRUNCATE TABLE category;
```

> ```mysql
> /*
> 自增长是一个约束,操作起来和其他约束不太一样
> 
> 如果自增长约束和主键约束合起来使用想删除
> 
> 先删除自增长约束
> 再删除主键约束
> 
> */
> 
> drop table category;
> create table category(
> cid int primary key auto_increment,
> cname varchar(100)
> );
> 
> alter table category modify cid int;
> 
> alter table category drop primary key;
> ```

### 4.2.2.truncate和delete区别

```mysql
1.delete:如果是主键自增长,删除之后,再次添加,编号不会重新编号,会接着被删除的那个编号往下继续编
2.truncate:摧毁表结构,主键自增长列,会重新编号
```

![image-20260618160442832](../image/image-20260618160442832.png)

## 4.3.非空约束

```mysql
1.关键字:NOT NULL
2.特点:
  非空约束的列中的数据不能为NULL
CREATE TABLE category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(10) NOT NULL
);

INSERT INTO category (cname) VALUES ('蔬菜');

-- INSERT INTO category (cname) VALUES (null);

INSERT INTO category (cname) VALUES ('');

INSERT INTO category (cname) VALUES ('null');
```

## 4.4.唯一约束

```mysql
1.关键字:UNIQUE
2.特点:
  被唯一约束修饰的列中的数据不能重复
3.主键约束和唯一约束区别:
  a.相同点:都是唯一的
  b.不同点:
    一个表中能有多个唯一约束,而且可以存null
    一个表中只能有一个主键约束,而且主键约束代表一条数据,不能存null
DROP TABLE category;
CREATE TABLE category(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(10) UNIQUE
);

INSERT INTO category (cname) VALUES ('蔬菜');
-- INSERT INTO category (cname) VALUES ('蔬菜');

INSERT INTO category (cname) VALUES (NULL);
-- INSERT INTO category (cname) VALUES (NULL);
删除唯一约束:
 ALTER TABLE 表名 DROP INDEX 名称   [名称是CONSTRAINT后面的名称]
```