---
title: zabbixs
abbrlink: 8fb4d8dfs
date: 2023-02-02 09:43:57
tags: Linux
categories: 正文
sidebarDepth: 2
---



| 角色         | 主机名 | eth0       | 配置               |
| ------------ | ------ | ---------- | ------------------ |
| Zabbix服务端 | zbx    | 10.0.0.111 | 1C1G(实际推荐1C2G) |
| Zabbix服务端 | web01  | 10.0.0.112 | 1C1G               |
| Zabbix服务端 | db01   | 10.0.0.113 | 1C1G               |



## 1.nginx环境

```shell
cat >> /etc/yum.repos.d/nginx.repo<<EOF
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF
```

安装nginx

```
yum -y install nginx
```





## 2、​php

安装 EPEL 软件包：

```shell
yum install epel-release -y
```

安装 remi 源：

```shell
# https://dl.fedoraproject.org/pub/epel/
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y
```

安装 yum 扩展包：

```shell
yum install yum-utils -y
```

启用 remi 仓库：

```shell
yum-config-manager --enable remi-php72 -y
yum update -y
```

安装 php-fpm 和一些其他模块

```shell
yum install php72-php-cli php72-php-fpm php72-php-gd php72-php-mbstring php72-php-bcmath php72-php-xml php72-php-ldap php72-php-mysqlnd -y
```

安装结果

```shell
[root@zbx ~]# rpm -qa |egrep 'nginx|php72'
php72-runtime-2.0-1.el7.remi.x86_64
php72-php-mysqlnd-7.2.34-13.el7.remi.x86_64
php72-php-cli-7.2.34-13.el7.remi.x86_64
nginx-1.20.1-9.el7.x86_64
php72-php-json-7.2.34-13.el7.remi.x86_64
php72-php-pdo-7.2.34-13.el7.remi.x86_64
php72-php-gd-7.2.34-13.el7.remi.x86_64
php72-php-bcmath-7.2.34-13.el7.remi.x86_64
php72-php-fpm-7.2.34-13.el7.remi.x86_64
php72-php-mbstring-7.2.34-13.el7.remi.x86_64
nginx-filesystem-1.20.1-9.el7.noarch
php72-php-common-7.2.34-13.el7.remi.x86_64
php72-php-ldap-7.2.34-13.el7.remi.x86_64
php72-php-xml-7.2.34-13.el7.remi.x86_64

[root@zbx ~]# php72 -v
PHP 7.2.34 (cli) (built: Sep 27 2022 19:10:24) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
```



## 3、nginx+php

```shell
systemctl enable nginx php72-php-fpm
systemctl start nginx php72-php-fpm
```

nginx配置

```shell
cat >> /etc/nginx/conf.d/zabbix.conf<<'EOF'
    server {
        listen       80;
        server_name  zbx.oldboylinux.cn;
        root         /code/zabbix;
        location / {
            index index.php;
        }
        location ~ \.php$ {
            fastcgi_pass  127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include    fastcgi_params;
        }        
    }
EOF
```

检查重载nginx 

```shell
[root@zbx ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[root@zbx ~]# systemctl reload nginx
```

php 配置

修改php用户

```shell
[root@zbx ~]# sed -ri '/^(user|group)/s#apache#nginx#g' /etc/opt/remi/php72/php-fpm.d/www.conf
[root@zbx ~]# egrep '^(user|group)' /etc/opt/remi/php72/php-fpm.d/www.conf
user = nginx
group = nginx
```

创建php会话保持目录

```shell
[root@zbx ~]# grep '/var/opt/remi/php72/lib/php/session' /etc/opt/remi/php72/php-fpm.d/www.conf
php_value[session.save_path]    = /var/opt/remi/php72/lib/php/session
[root@zbx ~]# mkdir -p /var/opt/remi/php72/lib/php/session
[root@zbx ~]# chown nginx.nginx /var/opt/remi/php72/lib/php/session
[root@zbx ~]# systemctl reload php72-php-fpm.service
```

php+nginx测试

```shell
mkdir -p /code/zabbix
chown nginx.nginx /code/zabbix
```

创建php测试页

```shell
cat >> /code/zabbix/info.php<<'EOF'
<?php
  phpinfo();
?>
EOF
```

浏览器访问`zbx.oldboylinux.cn/info.php`



## 4、数据库

```shell
[root@zbx ~]# yum install -y mariadb-server
[root@zbx ~]# mysql_secure_installation
Y Y Y Y Y
[root@zbx ~]# mysql -uroot -p1
MariaDB [(none)]> select user,host from mysql.user;
MariaDB [(none)]> show databases;
MariaDB [(none)]> create database zabbix charset utf8 collate utf8_bin;
MariaDB [(none)]> grant all on zabbix.* to 'zabbix'@'localhost' identified by '1';
MariaDB [(none)]> grant all on zabbix.* to 'zabbix'@'10.0.0.%' identified by '1';
MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| zabbix             |
+--------------------+

MariaDB [(none)]> select user,host from mysql.user;
+--------+-----------+
| user   | host      |
+--------+-----------+
| zabbix | 10.0.0.%  |
| root   | 127.0.0.1 |
| root   | ::1       |
| root   | localhost |
| zabbix | localhost |
+--------+-----------+

```





## 5、zabbix-服务端

安装zabbix yum源

```shell
rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
```

替换zabbix源路径

```shell
sed 's#http://repo.zabbix.com#https://mirrors.tuna.tsinghua.edu.cn/zabbix#g' /etc/yum.repos.d/zabbix.repo
```

查看yum源的配置文件

```shell
[root@zbx ~]# cat /etc/yum.repos.d/zabbix.repo
[zabbix]
name=Zabbix Official Repository - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591

[zabbix-frontend]
name=Zabbix Official Repository frontend - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/frontend
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591

[zabbix-debuginfo]
name=Zabbix Official Repository debuginfo - $basearch
baseurl=http://repo.zabbix.com/zabbix/5.0/rhel/7/$basearch/debuginfo/
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
gpgcheck=1

[zabbix-non-supported]
name=Zabbix Official Repository non-supported - $basearch
baseurl=http://repo.zabbix.com/non-supported/rhel/7/$basearch/
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX
gpgcheck=1
```

安装 zabbix-server

```shell
[root@zbx ~]# yum install -y zabbix-server-mysql zabbix-agent2
```

zabbix 数据库导入数据

```shell
[root@zbx ~]# zcat /usr/share/doc/zabbix-server-mysql-5.0.28/create.sql.gz |mysql -uzabbix -p1 zabbix
```

zabbix 服务端 配置连接数据库

```shell
[root@zbx ~]# vim /etc/zabbix/zabbix_server.conf
DBHost=localhost
DBPassword=1
[root@zbx ~]# grep -n '^DB' /etc/zabbix/zabbix_server.conf
91:DBHost=localhost
100:DBName=zabbix
116:DBUser=zabbix
124:DBPassword=1
```

修改后 zabbix 服务端开启的功能（不用修改）

```shell
[root@zbx ~]# grep '^[a-Z]' /etc/zabbix/zabbix_server.conf
LogFile=/var/log/zabbix/zabbix_server.log
LogFileSize=0
PidFile=/var/run/zabbix/zabbix_server.pid
SocketDir=/var/run/zabbix
DBHost=localhost
DBName=zabbix
DBUser=zabbix
DBPassword=1
SNMPTrapperFile=/var/log/snmptrap/snmptrap.log
Timeout=4
AlertScriptsPath=/usr/lib/zabbix/alertscripts
ExternalScripts=/usr/lib/zabbix/externalscripts
LogSlowQueries=3000
StatsAllowedIP=127.0.0.1
```

启动 zabbix-server

```shell
systemctl enable zabbix-server
systemctl start zabbix-server
ss -lntup |grep zabbix
ps -ef |grep zabbix
```



## 6、zabbix前端页面准备

`https://www.zabbix.com/cn/download_sources`

```shell
#使用源码包
[root@zbx ~]# wget https://cdn.zabbix.com/zabbix/sources/stable/5.0/zabbix-5.0.28.tar.gz
[root@zbx ~]# tar xf zabbix-5.0.28.tar.gz
[root@zbx ~]# cd zabbix-5.0.28
[root@zbx zabbix-5.0.28]# cp -a ui/* /code/zabbix/
[root@zbx zabbix-5.0.28]# chown -R nginx.nginx /code/zabbix/
```



## 7、安装zabbix(zabbix前端页面连接数据库与zabbix-server)

php最后的配置

```shell
Minimum required size of PHP post is 16M (configuration option "post_max_size").
Minimum required limit on execution time of PHP scripts is 300 (configuration option "max_execution_time").
Minimum required limit on input parse time for PHP scripts is 300 (configuration option "max_input_time").
Time zone for PHP is not set (configuration parameter "date.timezone").
```

修改配置

```shell
[root@zbx ~]# vim /etc/opt/remi/php72/php.ini
[root@zbx ~]# egrep -n '^(max_|date.timezone|post_max)' /etc/opt/remi/php72/php.ini
385:max_execution_time = 300
395:max_input_time = 300
674:post_max_size = 16M
830:max_file_uploads = 20
905:date.timezone = Asia/Shanghai
```

重载服务

```shell
systemctl reload php72-php-fpm.service
systemctl restart php72-php-fpm.service
```

浏览器访问`zbx.oldboylinux.cn`，用户：Admin，密码：zabbix

![image-20221011221158574](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210112212675.png)

![image-20221011221403530](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210112214592.png)



问题

```sh
Zabbix server	Zabbix agent is not available (for 3m)
```

启动zabbix-agent2

```shell
systemctl enable zabbix-agent2.service
systemctl start zabbix-agent2.service
```





## Zabbix agent vs agent2

|          | zabbix agent     | zabbix agent2                                                |
| -------- | ---------------- | ------------------------------------------------------------ |
| 开发语言 | C语言            | Go语言，和C语言                                              |
| 性能     | 独立进程方式运行 | 1个进程多线程技术运行，减少资源消耗占用较少tcp资源，能够承受更高并发 |



## s

Linux安装与配置客户端

web添加与配置主机

:one:Liunx:在客户端安装zabbix-agent2(rpm)

:two:Liunx:修改配置文件指定Server为zabbix服务端

:three:web页面:配置-->主机中添加主机与关联模板

:four:web页面:添加后检测与检查数据



## zabbix服务端与客户端配置详解

zabbix 服务端 说明

```shell
[root@zbx ~]# rpm -qa |grep zabbix
zabbix-server-mysql-5.0.28-1.el7.x86_64    #zabbix yum源配置文件
zabbix-agent2-5.0.28-1.el7.x86_64    #server
zabbix-release-5.0-1.el7.noarch    #agent2
```



zabbix服务端

```shell
[root@zbx ~]# rpm -ql zabbix-server-mysql
/etc/logrotate.d/zabbix-server    #日志切割
/etc/zabbix/zabbix_server.conf    #zabbix服务端配置文件
/usr/lib/systemd/system/zabbix-server.service    #systemctl start/stop/restart 调用配置文件
/usr/lib/tmpfiles.d/zabbix-server.conf    #备份
/usr/lib/zabbix/alertscripts    #报警使用的脚本  存放处
/usr/lib/zabbix/externalscripts
```



## 监控客户端

安装zabbix-agent2

```shell
[root@web01 ~]# rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm
```

启动zabbix-agent2

```shell
systemctl enable zabbix-agent2.service
systemctl start zabbix-agent2.service
```

修改配置文件

```shell
[root@web01 ~]# vim /etc/zabbix/zabbix_agent2.conf
[root@web01 ~]# grep '^[a-Z]' /etc/zabbix/zabbix_agent2.conf
Server=10.0.0.111    #改为zabbix server的ip
[root@web01 ~]# systemctl restart zabbix-agent2.service
```



```shell
[root@zbx ~]# yum install -y zabbix-get
[root@zbx ~]# zabbix_get -s 10.0.0.112 -p 10050 -k system.hostname
web01
```



![image-20221012103255385](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121032535.png)

![image-20221012103459116](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121034173.png)





![image-20221012103824121](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121038201.png)

![image-20221012103941644](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121039721.png)



问题

```shell
Get value from agent failed: cannot connect to [[10.0.0.113]:10050]: [111] Connection refused
```

db01安装zabbix-agent2

```shell
[root@db01 ~]# rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm
```

配置zabbix-agent2

```shell
[root@db01 ~]# vim /etc/zabbix/zabbix_agent2.conf
Server=10.0.0.111
```

启动 zabbix-agent2

```shell
[root@db01 ~]# systemctl start zabbix-agent2.service && systemctl enable zabbix-agent2.service
```

zbx使用zabbix_get获取主机名

```shell
[root@zbx ~]# zabbix_get -s 10.0.0.113 -p 10050 -k system.hostname
db01
```





## Zabbix中文乱码问题

解决zabbix默认图形乱码问题

修改zabbix字体

Windows下目录**C:\Windows\Fonts**寻找字体

```bash
cd /code/zabbix/assets/fonts/
#上传一个中文的ttf字体  替换  zabbix自用的字体即可.
cp /code/zabbix/assets/fonts/DejaVuSans.ttf{,.bak}
cp msyh.ttc /code/zabbix/assets/fonts/DejaVuSans.ttf
```





# 自定义监控项流程

:one:Zabbix客户端，创建key（键值）与调试（自定义监控的核心）

​	书写监控命令/脚本

​	调试Debug命令与脚本

​	写入到zabbix客户端配置文件中 UserParameter=key,command或脚本  与调试  zabbix_get

:two:Zabbix服务端web页面-点点点

​	Web页面添加/修改模板

​	Web页面分组

​	:three:Web页面监控项-zabbix服务端是否可以获取数据

​	:four:Web页面触发器 trigger-什么时候报警

​	:five:Web页面图形





## zbx-自定义监控

### 1.需求：检查当前机器是否root远程登录

- :a:zbx-agent: web01 命令行
  - 书写满足要求的命令
- :b:zbx-server web页面
  - 命令行创建的键值与**监控项**关联起来



#### 1.1 Linux：命令

```shell
who |awk '$1=="root"' |wc -l  #数字大于1 表示有root远程登录.
```



#### 1.2 Linux：创建键值(zbx-server识别）

- key键值：zbx服务端内置，用户创建的命令，可以被zabbix服务端识别。服务端执行对应的键值就会获取对应的数据。

```shell
#在客户端配置文件中按照要求的格式书写即可.
[root@web01 ~]# vim /etc/zabbix/zabbix_agent2.d/web.conf
#UserParameter=键值名字,对应的命令或脚本
UserParameter=root.login, who |awk '$1=="root"' |wc -l
[root@web01 ~]# systemctl restart zabbix-agent2
```



#### 1.3 Linux：测试-zbx-服务端

```shell
[root@zbx ~]# zabbix_get -s 10.0.0.112 -p 10050 -k root.login
1
```



#### 1.4 web：创建监控项

更新间隔：线上环境推荐1m，不太重要10m 或1h

监控项：zbx服务端向客户端获取数据的一个方式    监控项与键值关联

![image-20221012130812319](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121308419.png)

![image-20221012130818226](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121308280.png)

![image-20221012131315748](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121313834.png)

历史数据：每个间隔获取的数据，不太推荐保留过长

趋势数据：每个小时，或者更长时间获取一次历史数据的平均值    可以长期保存

![image-20221012131542418](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121315496.png)

11：测试键值是否可用`.zabbix_get`

12：测试监控项(php调用键值)

![image-20221012131743405](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121317491.png)





#### 1.5 web：创建触发器

![image-20221012133339828](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121333929.png)

```shell
报警的条件：root登录的数量大于2

{web01:root.login.last()}    >        2
获取数据                      条件    条件对应的值(阈值)


{主机名:键值.函数功能}
函数功能：对应的不同的数据的处理方法
比如 last() 最新的值


比如 sum() 求和
min()  最小值
max()  最大值
avg()  平均值


分析：
{web01:system.uptime.last()}<10m #重启

```

![image-20221012133348388](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121333453.png)

![image-20221012133654668](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121336762.png)

![image-20221012133756900](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121337954.png)





#### 1.6 web：创建图形

![image-20221012134339670](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121343762.png)





### 2.创建模板：添加监控项，触发器，图形

#### 2.1 创建模板

![image-20221012152146465](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121521551.png)

![image-20221012153134787](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121531858.png)

![image-20221012152648458](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526553.png)

![image-20221012152653368](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526447.png)

![image-20221012152657195](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526289.png)

![image-20221012153606718](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121536809.png)





#### 2.2 模板关联主机

![image-20221012154437612](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121544705.png)

![image-20221012154441661](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121544752.png)

问题

```shell
Unknown metric root.login
```

web01拷贝配置文件到db01

```shell
[root@web01 ~]# scp /etc/zabbix/zabbix_agent2.d/web.conf 10.0.0.113:/etc/zabbix/zabbix_agent2.d/
```

db01重启zabbix-agent2

```shell
[root@db01 ~]# systemctl restart zabbix-agent2
```







# 监控报警

##  告警分类

| 报警方式                              | 企业应用场景                                         |
| ------------------------------------- | ---------------------------------------------------- |
| 发邮件        个人邮箱                | 企业邮箱，免费使用                                   |
| 企业微信-告警应用（机器人）           | 需要使用企业微信，免费                               |
| OA系统（钉钉）                        | 与阿里云，免费                                       |
| 短信                                  | 0.045元/条左右（阿里云短信服务）收费                 |
| 电话                                  | 收费                                                 |
| 第三方报警工具/平台：onealert（省事） | 只需要配置onealert的平台信息，免费使用（限制），收费 |





##  邮件报警

### 1）全流程

:one:个人邮箱/企业邮箱

:two:开启个人邮箱  smtp功能  获取授权码

:three:**发件人：**配置zabbix **报警媒介类型**

:four:**收件人：**配置用户接收报警

:five:**什么时候发邮件：**配置动作



### 2）个人邮箱准备（略）

配置个人邮箱



### 3）配置发件人

配置发件人-报警媒介

![image-20221012160151029](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121601187.png)

告警邮件内容：Messages template

```shell
#信息类型是：问题（发生故障）

主题： 故障名称: {EVENT.NAME}

消息：
故障始于时间: {EVENT.TIME}  日期: {EVENT.DATE}
故障名称: {EVENT.NAME}
故障主机: {HOST.NAME}
严重程度: {EVENT.SEVERITY}
额外信息: {EVENT.OPDATA}
故障ID: {EVENT.ID}
触发器地址: {TRIGGER.URL}


#信息类型是：Problem recov  故障解决的时候

主题： 故障解决 in {EVENT.DURATION}: {EVENT.NAME}

消息：
故障已经解决 时间：{EVENT.RECOVERY.TIME}  日期：{EVENT.RECOVERY.DATE}
故障名称：{EVENT.NAME}
故障持续时间：{EVENT.DURATION}
故障主机：{HOST.NAME}
故障级别：{EVENT.SEVERITY}
故障ID：{EVENT.ID}
{TRIGGER.URL}
```

![image-20221012160840506](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121608600.png)

![image-20221012160926854](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121609933.png)

![image-20221012161512055](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121615176.png)

![image-20221012163228149](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121632247.png)



## 微信报警

### 1）全流程

微信报警，短信，电话，钉钉自定义脚本报警

通过脚本(py,shell)，调用对方api接口（输入接口需要的信息，访问与使用api接口）

:one:企业微信

:two:企业微信id和告警机器人id

:three:使用脚本(shell/python)调用企业微信api接口：python  输入  收件人  信息

:four:发件人：报警媒介

:five:收件人：个人  媒体类型

:six:动作：已经完成



![image-20221012163311800](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121633888.png)

![image-20221012202210470](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122022668.png)

![image-20221012202218403](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122022504.png)

```shell
企业ID: ww5f8e5ba98e978c67
AgentId(机器人id): 1000002
Secret(机器人的密码): 7-Z-guGF6WEVfXVeTYBZv7cTTBKCJfmW1NAYkyLp8Zg
```

查看脚本目录

```shell
[root@zbx fonts]# rpm -ql zabbix-server-mysql |grep script
/usr/lib/zabbix/alertscripts
/usr/lib/zabbix/externalscripts
```



## 报错：No module named requests

```shell
[root@zbx ~]# python /usr/lib/zabbix/alertscripts/wechat.py
Traceback (most recent call last):
  File "/usr/lib/zabbix/alertscripts/wechat.py", line 7, in <module>
    import requests
ImportError: No module named requests

#python是通过各种模块实现目标与需求.

requests  #实现客户--->服务端发出  http请求  curl/wget

yum/apt
#安装python模块
yum install -y python-pip
pip install requests -i https://mirrors.aliyun.com/pypi/simple/
```



## 执行报错`pip install request`

[参考](https://blog.csdn.net/Cynthialearn/article/details/124754685)

```shell
[root@zbx ~]# pip install requests
Collecting requests
  Using cached https://files.pythonhosted.org/packages/a5/61/a867851fd5ab77277495a8709ddda0861b28163c4613b011bc00228cc724/requests-2.28.1.tar.gz
    Complete output from command python setup.py egg_info:
    
    ==========================
    Unsupported Python version
    ==========================
    This version of Requests requires at least Python 3.7, but
    you're trying to install it on Python 2.7. To resolve this,
    consider upgrading to a supported Python version.
    
    If you can't upgrade your Python version, you'll need to
    pin to an older version of Requests (<2.28).
    
    ----------------------------------------
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-VYNkl5/requests/
You are using pip version 8.1.2, however version 22.2.2 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.


# 升级pip:
wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
python get-pip.py
pip -V
```



企业微信告警无法使用

报错

```shell
{"errcode":60020,"errmsg":"not allow to access from your ip, hint: [1665572950354960143799549], from ip: 119.130.57.47, more info at https://open.work.weixin.qq.com/devtool/query?e=60020"}
```

企业微信文档

```
https://developer.work.weixin.qq.com/community/announcement/detail?content_id=16334603338859177543
```



[告警脚本](https://blog.csdn.net/weixin_40228200/article/details/123796231)

[python](https://blog.csdn.net/weixin_47274990/article/details/117448379)

```python
[root@zbx alertscripts]# vim weixin.py
#!/usr/bin/env python
#-*- coding: utf-8 -*-
#comment: zabbix接入微信报警脚本

import requests
import sys
import os
import json
import logging

logging.basicConfig(level = logging.DEBUG, format = '%(asctime)s, %(filename)s, %(levelname)s, %(message)s',
	datefmt = '%a, %d %b %Y %H:%M:%S',
	filename = os.path.join('/tmp','weixin.log'),
	filemode = 'a')
	
	
corpid='ww48f74fc8ed3a07ba' #企业ID
appsecret='iV9ljCjBVm2BvFWd-t0rZGTakxaH2izz7degTA41naI'  #secret
agentid=1000002  #AgentID

#获取accesstoken
token_url='https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + appsecret
req=requests.get(token_url)
accesstoken=req.json()['access_token']

#发送消息
msgsend_url='https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + accesstoken

touser=sys.argv[1]
subject=sys.argv[2]
toparty='3|4|5|6'
message=sys.argv[3]

params={
        "touser": touser,
        "toparty": toparty,
        "msgtype": "text",
        "agentid": agentid,
        "text": {
                "content": message
        },
        "safe":0
}

req=requests.post(msgsend_url, data=json.dumps(params))

logging.info('sendto:' + touser + ';;subject:' + subject + ';;message:' + message)
[root@zbx alertscripts]# chmod +x weixin.py 
[root@zbx alertscripts]# python weixin.py Ye 'ceshi' 'ceshi'
语法格式：python 脚本名 要发生给谁 '标题' '内容'
```



```shell
#web页面  发件人：报警媒介类型
{ALERT.SENDTO}  #发给谁
{ALERT.SUBJECT}  #报警标题
{ALERT.MESSAGE}  #报警内容


故障目前已经解决时间：{EVENT.RE COVERY.TIME}  日期{EVENT.RECOVERY.DATE}
故障名称：{EVENT.NAME}
故障经历多久：{EVENT.DURATION}
故障主机：{HOST.NAME}
故障级别：{EVENT.SEVERITY}
故障ID：{EVENT.ID}
{TRIGGER.URL}

#web页面 收件人：接收用户
#web页面 配置-->动作
```



shell

```shell
[root@zbx alertscripts]# vim weixin.sh
#!/bin/bash
CorpID="wwd5932acb806b41850c"  # 你的企业id
Secret="BbUbI_g_4zwvgYjlRinxBu5V_xK8R1VRT-QiNLYW5O0"  #你的SecretID
GURL="https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$CorpID&corpsecret=$Secret"
Token=$(/usr/bin/curl -s -G $GURL |awk -F\": '{print $4}'|awk -F\" '{print $2}')
# echo $Token
PURL="https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=$Token"


function body(){
        local int agentid=1000002    # 你的agentdid
        local UserID="@all"                 # 发送的用户ID
        local PartyID=1                  # 部门ID
        local Msg=$(echo "$@" | cut -d" " -f3-)  # 发送给所有人
        printf '{\n'
        printf '\t"touser": "'"$UserID"\"",\n"
        printf '\t"toparty": "'"$PartyID"\"",\n"
        printf '\t"msgtype": "text",\n'
        printf '\t"agentid": "'"$agentid"\"",\n"
        printf '\t"text": {\n'
        printf '\t\t"content": "'"$Msg"\""\n"
        printf '\t},\n'
        printf '\t"safe":"0"\n'
        printf '}\n'
}
/usr/bin/curl --data-ascii "$(body $1 $2 $3)" $PURL
[root@zbx alertscripts]# chmod +x weixin.sh
[root@zbx alertscripts]# ./weixin.sh test
```





## Zabbix客户端概述

| zabbix客户端          |                                                              |
| --------------------- | ------------------------------------------------------------ |
| Zabbix-agent2(最常用) | 适用于几乎所有情况，支持自定义监控，linux,windows,android/ios |
| SNMP客户端            | Simple Network Management Protocal  **简单网络管理协议**  监控网络设备 |
| JMX                   | Java-gateway 监控java app(tomcat),**未来推荐自定义监控(zabbix_agents2 + jmap/jstats)** |
| IPMI                  | 监控硬件(物理服务器,联想(IBM X86架构ThinkServer),华为,浪潮,Dell,IBM,HP)**直接使用自定义监控(ipmitool + megacli)** |





## snmp监控网络设备

- 应用：
  - **监控网络设备（常用）**
  - 也支持监控可以启动SNMP功能的设备（windows,linux,打印机......）



### 1）监控网络设备

:one:启动 设备的SNMP功能（网络设备）

:two:zabbix服务端进行测试 能否获取到 网络设备的信息

:three:web添加主机，监控项......



#### a.启动snmp

| snmp版本 |                                      |
| -------- | ------------------------------------ |
| v3       | 通过用户名和密码 访问 snmp信息       |
| v2c      | 通过 团体名id 访问设备 访问 snmp信息 |
| V1       |                                      |



zabbix-server检查 网络设备状态

```bash
yum install -y net-snmp-utils

COMIMUNITY

[rootgm03 ~]# snmpwalk -c oldboykx -v 2c 192.168.13.1 SysDesc
SNMPv2-MIB::sysDescr.0 = STRING: H3C Product Version ERHMG2-MNW100-R1117
H3C ERHMG2
Copyright(c) 2014-2018 New H3C Technologies Co., Ltd. All rights reserved.
[root@m03 ~]# snmpwalk -c oldboykx -v 2c 192.168.13.1 sysdesc
SNMPv2-MIB::sysDescr.0 = STRING: H3C Product Version ERHMG2-MNW100-R1117
H3C ERHMG2
Copyright(c) 2014-2018 New H3C Technologies Co., Ltd. All rights reserved.

snmpwalk 命令 使用get方式访问网络设备
-c 团体名称  #v2c版本使用 团体名称
-v 指定snmp版本  #v2c v3
ip地址
指令（获取网络设备的信息）  名称方式/oid


#oid Object ID 事务id 给世间万物设置独一无二的id号
[root@m03 /tmp]# snmpwalk -c oldboykx -v 2c 192.168.13.1 sysdesc
[root@m03 /tmp]# snmpwalk -c oldboykx -v 2c 192.168.13.1 sysUptime
DISMAN-EVENT-MIB::sysUpTimeInstance = Timeticks: (48733900) 4 days, 17:08:59.00
[root@m03/tmp]#
[root@m03/tmp]#
[root@m03 /tmp]# snmpwalk -c oldboykx -v 2c 192.168.13.1 IfNumber
IF-MIB::ifNumber.0 = INTEGER:19


```





#### 4.6 zabbix客户端常见类型 

| zabbix客户端          | 特点概述                                                     | 主要应用场景                                                 |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Zabbix-agent2(最常用) | 通用的客户端，支持自定义监控配合命令与脚本                   | 用于几乎所有情况，linux,windows,android/ios,                 |
| SNMP客户端            | Simple Network Management Protocal  **简单网络管理协议**     | **监控网络设备**（可以监控linux/windows.....)                |
| JMX                   | Java-gateway 监控java app(tomcat),**未来推荐自定义监控(zabbix_agents2 + jmap/jstats)** | 监控java app(tomcat)<br/>推荐**自定义监控**                  |
| IPMI                  | 监控硬件(物理服务器,联想(IBM X86架构ThinkServer),华为,浪潮,Dell,IBM,HP)**直接使用自定义监控(ipmitool + megacli)** | 监控硬件<br/>应用推荐：直接使用自定义监控(ipmitool + megacli ) |



### 5.自动化

自动添加主机

公司拥有多个机房（北京，上海，南极）

#### 5.1 自动添加主机

自动发现

自动注册

| 自动添加策略 |                                                        |                        |
| ------------ | ------------------------------------------------------ | ---------------------- |
| 自动发现     | **服务端主动扫描**局域网所有的机器，有新的则添加       | 配置简单方便效率不高   |
| 自动注册     | **客户端主动**向服务端注册，服务端只需要等待与验证即可 | 配置有点点复杂，效率高 |





### 12.2 自动发现

1）环境准备

|        |                       |                            |
| ------ | --------------------- | -------------------------- |
| db01   | 10.0.0.51/172.16.1.51 | zabbix客户端,server指向.72 |
| nfs01  | 10.0.0.31/172.16.1.31 | zabbix客户端,server指向.72 |
| backup | 10.0.0.41/172.16.1.41 | zabbix客户端,server指向.72 |

```bash
#01.3台机器部署好zabbixx客户端
#02.修改Server为172.16.1.72
#03.启动并开机自启动

```



#### 2）部署流程

:one:配置自动发现**规则-发现主机**

:two:启动自动发现**动作**-发现主机后关联模板，添加主机，加入主机组，启用



配置**自动发现规则**

![image-20221012203942363](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122039459.png)

![image-20221012210352607](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122103703.png)

![image-20221012210358554](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122103634.png)

![image-20221012210402869](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122104948.png)





### 12.3 自动注册

#### 1）环境准备

关闭自动发现 **规则**

关闭 自动发现 动作

自动发现的主机 删除

|       |            |                             |
| ----- | ---------- | --------------------------- |
| web01 | 10.0.0.112 | zabbix客户端,server指向.111 |
| db01  | 10.0.0.113 | zabbix客户端,server指向.111 |



#### 2）部署流程

:one:修改zabbix**客户端配置文件**: ServerActive=服务端ip 和Hostname=......

:two:web页面，**动作**-->自动注册 autoreg......



##### a.修改客户端配置文件

```shell
#自动注册：
配置zabbix-agent
Server=10.0.0.111
ServerActive=10.0.0.111   #主动模式 服务端ip地址
Hostname=web01    #主机名，独一无二
HostMetadata=web01    #主机名的元数据（属性）  主机名  使用HostMetadataItem=system.hostname

#Hostname自动获取

HostnameItem=system.hostname    #自动获取主机名 这个 与Hostname 二选一
#HostMetadata自动获取
HostMetadataItem=system.hostname    #自动获取主机的元数据(主机名)  这个与HostMeatadata 二选一

#完整的 客户端配置文件
[root@db01 ~]# grep '^[a-Z]' /etc/zabbix/zabbix_agent2.conf
PidFile=/var/run/zabbix/zabbix_agent2.pid


[root@db01 ~]# egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf
Server=10.0.0.111
ServerActive=10.0.0.111
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@db01 ~]# systemctl restart zabbix-agent
```

web01

```shell
[root@web01 ~]# vim /etc/zabbix/zabbix_agent2.conf
ServerActive=10.0.0.111
#Hostname=Zabbix server
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@web01 ~]# egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf
Server=10.0.0.111
ServerActive=10.0.0.111
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@web01 ~]# systemctl restart zabbix-agent2
```

db01

```shell
[root@db01 ~]# vim /etc/zabbix/zabbix_agent2.conf
ServerActive=10.0.0.111
#Hostname=Zabbix server
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@db01 ~]# egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf
Server=10.0.0.111
ServerActive=10.0.0.111
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@db01 ~]# systemctl restart zabbix-agent2
```

![image-20221012213512708](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135811.png)

![image-20221012213516750](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135834.png)

![image-20221012213519980](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135069.png)





## ansible批量监控主机

```shell
[root@zbx ~]# vim /etc/ansible/hosts
[web]
10.0.0.112

[db]
10.0.0.113
[root@zbx ansible]# ssh-copy-id -i ~/.ssh/id_rsa.pub root@10.0.0.112
[root@zbx ansible]# ssh-copy-id -i ~/.ssh/id_rsa.pub root@10.0.0.113
[root@zbx ansible]# ansible -i hosts all -a 'rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm'
[root@zbx ansible]# vim zabbix_agent2.conf 
Server=10.0.0.111
ServerActive=10.0.0.111
#Hostname=Zabbix server
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@zbx ansible]# egrep '^Server|^Host' zabbix_agent2.conf 
Server=10.0.0.111
ServerActive=10.0.0.111
HostnameItem=system.hostname
HostMetadataItem=system.uname
[root@zbx ansible]# ansible -i hosts all -m copy -a 'src=zabbix_agent2.conf dest=/etc/zabbix/zabbix_agent2.conf backup=yes'
[root@zbx ansible]# ansible -i hosts all -m systemd -a 'name=zabbix-agent2 enabled=yes state=restarted'
[root@zbx ansible]# ansible -i hosts all -m shell -a 'systemctl is-active zabbix-agent2'
[root@zbx ansible]# ansible -i hosts all -m shell -a 'ps -ef |grep zabbix'
```





## 监控负载均衡

tcp自定义: `ss  -ant |grep -i 'estab' |awk '$3~/:80$/'`

```shell
[root@web01 conf.d]# cat /etc/nginx/conf.d/default.conf 
server {
    listen     80 default_server;
    server_name localhost;
    location / {
      index index.html;
    }
    location /nginx_status {
      stub_status;
      #allow
      #deny
    }
}

[root@web01 conf.d]# curl 10.0.0.112/nginx_status
Active connections: 1 
server accepts handled requests
 1 1 1 
Reading: 0 Writing: 1 Waiting: 0
```

![image-20221014110753695](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141108845.png)

![image-20221014110946046](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109161.png)



## 端口进程

找出系统内置的键值使用

添加监控项

添加触发器

```shell
[root@zbx ~]# zabbix_get -s 10.0.0.112 -k net.tcp.port[,80]
1
[root@zbx ~]# zabbix_get -s 10.0.0.112 -k proc.num[nginx]
2
[root@zbx ~]# zabbix_get -s web01 -k net.tcp.port[,80]
1
[root@zbx ~]# zabbix_get -s web01 -k proc.num[]
103
[root@zbx ~]# zabbix_get -s web01 -k proc.num[nginx]
2
```







## 监控php状态

```shell
[root@web01 conf.d]# vim /etc/nginx/conf.d/default.conf
server {
  listen 80 default_server;
  server_name localhost;
  charset utf8;
  access_log /var/log/nginx/default-access.log main;
  error_log /var/log/nginx/default-error.log error;
  location /nginx_status {
    stub_status ;
  }
  location /php_status {
    fastcgi_pass  127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    include    fastcgi_params;
  }
  location ~ \.php$ {
    fastcgi_pass  127.0.0.1:9000;
    fastcgi_index index.php;
    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    include    fastcgi_params;
  }
}

[root@web01 ~]# vim /etc/php-fpm.d/www.conf
pm.status_path = /php_status

[root@web01 ~]# nginx -t
[root@web01 ~]# php-fpm -t
[root@web01 ~]# systemctl restart nginx php-fpm

[root@web01 ~]# curl 10.0.0.112/nginx_status
Active connections: 1 
server accepts handled requests
 4 4 2 
Reading: 0 Writing: 1 Waiting: 0 
[root@web01 ~]# curl 10.0.0.112/php_status
pool:                 www
process manager:      dynamic
start time:           14/Oct/2022:10:28:56 +0800
start since:          69
accepted conn:        1
listen queue:         0
max listen queue:     0
listen queue len:     128
idle processes:       4
active processes:     1
total processes:      5
max active processes: 1
max children reached: 0
slow requests:        0

```

![image-20221014110905562](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109656.png)

![image-20221014110916113](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109226.png)





## Mysql

percona-mysql......

zabbix内置模板：Template DB MySQL by Zabbix agent 2

```shell
# php脚本获取数据库指标
# xml模板文件
[root@db01 ~]# wget https://www.percona.com/downloads/percona-monitoring-plugins/percona-monitoring-plugins-1.1.8/binary/redhat/7/x86_64/percona-zabbix-templates-1.1.8-1.noarch.rpm
[root@db01 ~]# rpm -ivh percona-zabbix-templates-1.1.8-1.noarch.rpm
```

模板需要调用php脚本，安装php

```shell
[root@db01 ~]# cat >> /etc/yum.repos.d/php.repo<<'EOF'
[php]
name = php Repository
baseurl = http://us-east.repo.webtatic.com/yum/el7/x86_64/
gpgcheck = 0
EOF

[root@db01 ~]# yum -y install php72w php72w-cli php72w-common php72w-devel php72w-embedded php72w-gd php72w-mcrypt php72w-mbstring php72w-pdo php72w-xml php72w-fpm php72w-mysqlnd php72w-opcache php72w-pecl-memcached php72w-pecl-redis php72w-pecl-mongodb
```

拷贝`userparameter_percona_mysql.conf`到`/etc/zabbix/zabbix_agent2.d/`

```shell
[root@db01 ~]# rpm -ql percona-zabbix-templates
/var/lib/zabbix/percona
/var/lib/zabbix/percona/scripts
/var/lib/zabbix/percona/scripts/get_mysql_stats_wrapper.sh
/var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php
/var/lib/zabbix/percona/templates
/var/lib/zabbix/percona/templates/userparameter_percona_mysql.conf
/var/lib/zabbix/percona/templates/zabbix_agent_template_percona_mysql_server_ht_2.0.9-sver1.1.8.xml
[root@db01 ~]# cp /var/lib/zabbix/percona/templates/userparameter_percona_mysql.conf /etc/zabbix/zabbix_agent2.d/
```

修改配置`/var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php`

```shell
[root@db01 ~]# vim /var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php
$mysql_user = 'yyr';
$mysql_pass = '1';
```

生产环境 需要一个对数据库有只读权限的用户即可。  

```mysql
MariaDB [(none)]> grant select,show on *.* to yyr@'localhost' identified by '1';
```

查看数据库

```shell
[root@zbx ~]# zabbix_get -s 10.0.0.113 -k MySQL.State-login
0
[root@zbx ~]# zabbix_get -s 10.0.0.113 -k MySQL.pool-size
8191
```

用自带模板会报时间格式的错误，需要下载新的模板

```shell
[root@db01 ~]# wget http://jaminzhang.github.io/soft-conf/Zabbix/zbx_percona_mysql_template.xml
[root@db01 ~]# sz zbx_percona_mysql_template.xml
```

导入模板

![image-20221014113719006](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141137120.png)

![image-20221014113742492](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141137591.png)

![image-20221014113933244](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141139355.png)









## Grafana增强展示

zbx部署grafana

```shell
[root@zbx ~]# wget --no-check-certificate -P /server/tools https://mirrors.tuna.tsinghua.edu.cn/grafana/yum/rpm/grafana-7.3.5-1.x86_64.rpm
[root@zbx ~]# yum localinstall -y /server/tools/grafana-7.3.5-1.x86_64.rpm
[root@zbx ~]# systemctl start grafana-server
[root@zbx ~]# systemctl enable grafana-server
Created symlink from /etc/systemd/system/multi-user.target.wants/grafana-server.service to /usr/lib/systemd/system/grafana-server.service.
[root@zbx ~]# ss -lntup|grep grafana
tcp    LISTEN     0      128    [::]:3000               [::]:*                   users:(("grafana-server",pid=8119,fd=8))
```

浏览器访问zbx.oldboylinux.cn:3000，用户 admin，密码 admin



添加插件zabbix

```shell
[root@zbx ~]# grafana-cli plugins list-remote |grep zabbix
id: alexanderzobnin-zabbix-app version: 4.1.5
[root@zbx ~]# grafana-cli plugins install alexanderzobnin-zabbix-app
installing alexanderzobnin-zabbix-app @ 4.1.5
from: https://grafana.com/api/plugins/alexanderzobnin-zabbix-app/versions/4.1.5/download
into: /var/lib/grafana/plugins

✔ Installed alexanderzobnin-zabbix-app successfully 

Restart grafana after installing plugins . <service grafana-server restart>

[root@zbx ~]# du -sh /var/lib/grafana/plugins/alexanderzobnin-zabbix-app/
59M	/var/lib/grafana/plugins/alexanderzobnin-zabbix-app/
[root@zbx ~]# systemctl restart grafana-server
```



搜索开启zabbix

![image-20221014134314158](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141343319.png)

```shell
[root@zbx ~]# curl -v -H Host:zbx.oldboylinux.cn http://10.0.0.111/api_jsonrpc.php
* About to connect() to 10.0.0.111 port 80 (#0)
*   Trying 10.0.0.111...
* Connected to 10.0.0.111 (10.0.0.111) port 80 (#0)
> GET /api_jsonrpc.php HTTP/1.1
> User-Agent: curl/7.29.0
> Accept: */*
> Host:zbx.oldboylinux.cn
> 
< HTTP/1.1 412 Precondition Failed
< Server: nginx/1.20.1
< Date: Fri, 14 Oct 2022 05:47:04 GMT
< Content-Type: text/html; charset=UTF-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< X-Powered-By: PHP/7.2.34
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Headers: Content-Type
< Access-Control-Allow-Methods: POST
< Access-Control-Max-Age: 1000
< 
* Connection #0 to host 10.0.0.111 left intact
```



![image-20221014135359642](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141353763.png)

![image-20221014135413828](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354011.png)

![image-20221014135416840](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354927.png)

![image-20221014135419771](https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354938.png)