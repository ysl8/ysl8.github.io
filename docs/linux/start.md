---
title: Prometheus
---

# Prometheus

## 一、Prometheus监控介绍

### 1、概述

**什么是普罗米修斯？**

Prometheus是一个开源系统监控和警报工具包，Prometheus 受启发于 Google 的Brogmon 监控系统（相似的 Kubernetes 是从 Google的 Brog 系统演变而来），从 2012 年开始由前 Google 工程师在 Soundcloud 以开源软件的形式进行研发，并且于 2015 年早期对外发布早期版本。

2016 年 5 月继 Kubernetes 之后成为第二个正式加入 CNCF 基金会的项目，同年 6 月正式发布 1.0 版本。

2017 年底发布了基于全新存储层的 2.0 版本，能更好地与容器平台、云平台配合。



### 2、特点

普罗米修斯的主要特点是：

- 支持多维数据模型由指标名称和键值对标识的时间序列数据
- 内置时间序列库TSDB（Time Serices Database）
- 支持PromQL（Promethues Query Language），对数据的查询和分析、图形展示和监控告警。
- 不依赖分布式存储；单个服务器节点是自治的
- 支持HTTP的拉取(pull)方式收集时间序列数据
- 通过中间网关Pushgateway推送时间序列
- 通过服务发现或静态配置2种方式发现目标
- 支持多种可视化和仪表盘，如：grafana



### 3、核心组件

- Prometheus Server，主要用于抓取数据和存储时序数据，另外还提供查询和 Alert Rule 配置管理。
- client libraries，用于检测应用程序代码的客户端库。
- push gateway，用于批量，短期的监控数据的汇总节点，主要用于业务数据汇报等。
- exporters 收集监控样本数据,并以标准格式向 Prometheus 提供。例如：收集服务器系统数据的 node_exporter，收集 MySQL 监控样本数据的是 MySQL exporter 等等。
- 用于告警通知管理的 alertmanager。



### 4、基础架构

![prometheus architecture](./img/1.png)

从这个架构图,也可以看出Prometheus的主要模块包含，Server，Exporters，Pushgateway，PromQL，Alertmanager，WebUl等。

它大致使用逻辑是这样：

1.Prometheus server定期从静态配置的targets或者服务发现的targets 拉取数据（Targets是Prometheus采集Agent需要抓取的采集目标）

2.当新拉取的数据关于配置内存缓存区的时候，Prometheus 会将数据持久化到磁盘（如果使用remote storage将持久化到云端）。

3.Prometheus可以配置rules，然后定时查询数据，当条件触发的时候，会将alerts 推送到配置的Alertmanager。

4.Alertmanager收到警告的时候，可以根据配置（163，钉钉等），聚合，去重，降噪，最后发送警告。

5.可以使用 API，Prometheus Console 或者Grafana 查询和聚合数据。



### 5、Prometheus与Zabbix的对比

| Prometheus对比Zabbix:                                        |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Zabbix                                                       | Prometheus                                                   |
| 后端用C开发，界面用PHP开发，定制化难度很高。                 | 后端用golang开发，前端是Grafana，JSON编辑即可解决定制化难度较低 |
| 6.0支持单个Zabbix实例监控超过10万个业务服务                  | 支持更大的集群规模，速度也更快                               |
| 更适合监控物理机环境（物理主机，交换机，网络等监控）         | 更适合云环境的监控，对OpenStack，Kubernetes有更好的集成      |
| 监控数据存储在关系型数据库内，如MySQL，很难从现有数据中扩展维度 | 监控数据存储在基于时间序列的数据库内，便于对已有数据进行新的聚合。十级监控数据，Prometheus数据查询速率比Zabbix更快 |
| 安装简单，zabbix-server一个软件包中包括了所有的服务端功能    | 安装相对复杂，监控、告警和界面都分属于不同的组件             |
| 图形化界面比较成熟，界面上基本上能完成全部的配置操作         | 界面相对较弱，很多配置需要修改配置文件                       |
| 发展时间更长，对于很多监控场景，都有现成的解决方案           | 2015年后开始快速发展，发展时间短，但现在也非常的成熟         |



### 6、总结

监控系统没有绝对的谁好谁不好，最重要的是适合自己的公司团队，能够合理利用最小的成本解决问题。prometheus，zabbix都只是工具，监控思想才是最重要的。

实在不知道怎么选？参考如下：

物理机、硬件设备的监控推荐使用Zabbix

而docker容器，Kubernetes监控推荐用Prometheus

云服务器厂商自带有监控系统，有的监控不全面，也可以搭配zabbix和Prometheus来一起使用。





## 二、二进制安装Prometheus+Grafana

### 1、环境

| 主机名    | IP地址     | 配置  | 系统         | 说明                                                         |
| --------- | ---------- | ----- | ------------ | ------------------------------------------------------------ |
| localhost | 10.0.0.112 | 2核4G | Centos   7.9 | Prometheus版本：2.37.6 LTS，grafana版本：9.4.3，alertmanager版本：0.25，node-exporter版本：1.5.0 |

**克隆虚拟机**

通过链接克隆一台新的虚拟机，并把ip更为10.0.0.112



### 2、 从官网手动安装

- Prometheus 采集、存储数据
- Grafana 用于图表展示
- alertmanager 用于接收 Prometheus 发送的告警信息
- node-exporter 用于收集操作系统和硬件信息的metrics



#### 2.1 安装Prometheus

[官网下载地址](https://prometheus.io/download/)，获取最新下载URL

```shell
# 切换到root用户
sudo -i

# 下载Prometheus二进制压缩包
wget "https://github.com/prometheus/prometheus/releases/download/v2.37.7/prometheus-2.37.7.linux-amd64.tar.gz"

# 解压
tar -zxvf prometheus-2.37.7.linux-amd64.tar.gz

# 查看解压后的文件名
ls -l

# 创建目录
mkdir /opt/prometheus -p

# 移动解压后的文件名到/opt目录下，并改名prometheus
mv prometheus-2.37.7.linux-amd64 /opt/prometheus/prometheus 
```

创建一个专门的 `prometheus` 用户：

```shell
useradd -M -s /usr/sbin/nologin prometheus
```

更改 `prometheus` 用户的文件夹权限：

```shell
chown prometheus:prometheus -R /opt/prometheus
```

创建 `systemd` 服务

```shell
cat > /etc/systemd/system/prometheus.service << "EOF"
[Unit]
Description=Prometheus Server
Documentation=https://prometheus.io/docs/introduction/overview/
After=network-online.target
 
[Service]
Type=simple
User=prometheus
Group=prometheus
Restart=on-failure
ExecStart=/opt/prometheus/prometheus/prometheus \
--config.file=/opt/prometheus/prometheus/prometheus.yml \
--storage.tsdb.path=/opt/prometheus/prometheus/data \
--storage.tsdb.retention=60d \
--web.enable-lifecycle

[Install]
WantedBy=multi-user.target
EOF
```

配置参数解释：

> 通过 `/opt/prometheus/prometheus -h` 查看帮助详情

```shell
--config.file=/opt/prometheus/prometheus/prometheus.yml
#主配置文件
--storage.tsdb.path=/opt/prometheus/prometheus/data
#数据库存储目录
--web.console.libraries=/opt/prometheus/prometheus/console_libraries
#指定控制台库目录路径
--web.console.templates=/opt/prometheus/prometheus/consoles
#指定控制台模版目录路径
--storage.tsdb.retention=60d
#指明数据保留天数，默认15天
--web.enable-lifecycle
#热加载
```

启动 Prometheus

```shell
systemctl daemon-reload
systemctl start prometheus.service
```

加入到开机自启动

```shell
systemctl enable prometheus.service
```

检查

```shell
systemctl status prometheus.service
```

查看 Prometheus 的日志以进行故障排除：

```shell
journalctl -u prometheus.service -f
```

访问地址

| 应用       | 访问地址                       | 备注         |
| ---------- | ------------------------------ | ------------ |
| prometheus | http://10.0.0.112:9090         | 无用户和密码 |
| 监控指标   | http://10.0.0.112:9090/metrics |              |



#### 2.2 安装alertmanager

下载alertmanager

[官网下载地址](https://prometheus.io/download/)，获取最新下载URL

- 注：在root用户下执行

```shell
# 下载alertmanager二进制压缩包
wget "http://github.com/prometheus/alertmanager/releases/download/v0.25.0/alertmanager-0.25.0.linux-amd64.tar.gz"

# 解压
tar -zxvf alertmanager-0.25.0.linux-amd64.tar.gz

# 查看解压后的文件名
ls -l

# 移动解压后的文件名到/opt目录下，并改名alertmanager
mv alertmanager-0.25.0.linux-amd64 /opt/prometheus/alertmanager
```

更改 `alertmanager` 文件夹权限：

```shell
chown prometheus:prometheus -R /opt/prometheus/alertmanager
```

创建 systemd 服务

```shell
cat >/etc/systemd/system/alertmanager.service << "EOF"
[Unit]
Description=Alert Manager
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecStart=/opt/prometheus/alertmanager/alertmanager \
  --config.file=/opt/prometheus/alertmanager/alertmanager.yml \
  --storage.path=/opt/prometheus/alertmanager/data
Restart=always

[Install]
WantedBy=multi-user.target
EOF
```

启动 alertmanager

```shell
systemctl daemon-reload
systemctl start alertmanager.service
```

加入到开机自启动

```shell
systemctl enable alertmanager.service
```

检查

```shell
systemctl status alertmanager.service
journalctl -u alertmanager.service -f
```



#### 2.3 修改Prometheus配置

加入alertmanager

```shell
vim /opt/prometheus/prometheus/prometheus.yml
......
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # 根据实际填写alertmanager的地址
          - localhost:9093
......
rule_files:
  # 根据实际名修改文件名
  - "alert.yml"
......
```

增加触发器配置文件

```shell
cat > /opt/prometheus/prometheus/alert.yml <<"EOF"
groups:
- name: Prometheus alert
  rules:
  # 对任何实例超过30s无法联系的情况发出警报
  - alert: 服务告警
    expr: up == 0
    for: 30s
    labels:
      severity: critical
    annotations:
      instance: "{{ $labels.instance }}"
      description: "{{ $labels.job }} 服务已关闭"
EOF
```

检查配置

```shell
cd /opt/prometheus/prometheus/
./promtool check config prometheus.yml
```

重启prometheus或重新加载配置文件（二选一）

```shell
#重启
systemctl restart prometheus
#或：
#重载，需要--web.enable-lifecycle配置
curl -X POST http://localhost:9090/-/reload
```

访问地址

| 应用         | 访问地址               | 备注         |
| ------------ | ---------------------- | ------------ |
| alertmanager | http://10.0.0.112:9093 | 无用户和密码 |

检查

http://10.0.0.112:9093/#/status



#### 2.4 安装Grafana

官网下载地址：https://grafana.com/grafana/download

```shell
wget https://dl.grafana.com/enterprise/release/grafana-enterprise-9.5.1.linux-amd64.tar.gz
tar -zxvf grafana-enterprise-9.5.1.linux-amd64.tar.gz
mv grafana-9.5.1 /opt/prometheus/grafana
```

更改 `grafana` 文件夹权限：

```shell
chown prometheus:prometheus -R /opt/prometheus/
```

创建 systemd 访问

```shell
cat >/etc/systemd/system/grafana-server.service<<"EOF"
[Unit]
Description=Grafana server
Documentation=http://docs.grafana.org

[Service]
Type=simple
User=prometheus
Group=prometheus
Restart=on-failure
ExecStart=/opt/prometheus/grafana/bin/grafana-server \
--config=/opt/prometheus/grafana/conf/defaults.ini \
--homepath=/opt/prometheus/grafana

[Install]
WantedBy=multi-user.target
EOF
```

启动 grafana

```shell
systemctl daemon-reload
systemctl start grafana-server.service
```

加入到开机启动

```shell
systemctl enable grafana-server.service
```

检查

```shell
journalctl -u grafana-server.service -f
```

web访问地址

| 应用    | 访问地址               | 备注              |
| ------- | ---------------------- | ----------------- |
| grafana | http://10.0.0.112:3000 | 默认：admin/admin |



#### 2.5 安装node_exporter

官网下载地址：https://prometheus.io/download/

```shell
wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz

tar -zxvf node_exporter-1.5.0.linux-amd64.tar.gz

ls -l

mv node_exporter-1.5.0.linux-amd64 /opt/prometheus/node_exporter
```

更改 `node_exporter` 文件夹权限：

```shell
chown prometheus:prometheus -R /opt/prometheus/node_exporter
```

创建 systemd 服务

```shell
cat > /etc/systemd/system/node_exporter.service <<"EOF"
[Unit]
Description=node_exporter
Documentation=https://prometheus.io/
After=network.target

[Service]
User=prometheus
Group=prometheus
ExecStart=/opt/prometheus/node_exporter/node_exporter
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF
```

启动 node_exporter

```shell
systemctl daemon-reload
systemctl start node_exporter.service
```

加入到开机自启动

```shell
systemctl enable node_exporter.service
```

检查

```shell
systemctl status node_exporter.service
```

检查日志

```shell
journalctl -u node_exporter.service -f
```

web访问地址

| 应用          | 访问地址                       | 备注         |
| ------------- | ------------------------------ | ------------ |
| node_exporter | http://10.0.0.112:9100/metrics | 无用户和密码 |



#### 2.6 修改prometheus配置

prometheus服务器操作

```shell
cat >> /opt/prometheus/prometheus/prometheus.yml <<"EOF"
# 再scrape_configs这行下面添加如下配置：
  # node-exporter配置
  - job_name: 'node-exporter'
    scrape_interval: 15s
    static_configs:
    - targets: ['localhost:9100']
      labels:
        instance: Prometheus服务器
EOF
```

重载prometheus

```shell
curl -X POST http://localhost:9090/-/reload
```

Prometheus web上检查

http://10.0.0.112:9090/targets?search=



## 三、使用Grafana9.5.1展示Prometheus的图形

### 1、登录Grafana

web访问地址

| 应用    | 访问地址               | 备注              |
| ------- | ---------------------- | ----------------- |
| Grafana | http://10.0.0.112:3000 | 默认：admin/admin |



### 2、创建 Prometheus 数据源

登录Grafana，Home > Administration > Data sources，点击 `Add new data source` 选择 `Prometheus`，URL：`http://localhost:9090`，点击`Save & test`。

> 跳转地址：http://10.0.0.112:3000/datasources/new



### 3、创建仪表盘

#### 3.1 从 Grafana.com 选择仪表板

跳转 https://grafana.com/grafana/dashboards/ 找到 `Node Exporter Full` 点击进去，点击 `Dashboard ID copied!` ，获取到 ID：`1860` 。

> 跳转地址：https://grafana.com/grafana/dashboards/1860-node-exporter-full/



#### 3.2 通过ID导入仪表板

登录Grafana，Home > Dashboards，点击 `New` 选择 `Import`，Import via grafana.com： `1860`，点击 `Load`，Name：`服务器监控`，Prometheus：`Prometheus`，点击 `Import`。

> 跳转地址：http://10.0.0.112:3000/dashboard/import





## 四、Docker搭建Prometheus监控系统

### 1、环境

| 主机名    | IP地址     | 配置  | 系统         | 说明                                           |
| --------- | ---------- | ----- | ------------ | ---------------------------------------------- |
| localhost | 10.0.0.112 | 2核4G | Centos   7.9 | docker版本：23.0.1，docker-compose版本：1.29.2 |

#### 1.1 安装Docker

镜像加速

```shell
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<'EOF'
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
EOF
```

安装docker

```shell
export DOWNLOAD_URL="http://mirrors.163.com/docker-ce"
curl -fsSL https://get.docker.com/ | sh
```

检查

```shell
docker -v
# 或：
systemctl status docker
```



#### 1.2 安装Docker-compose

安装命令

```shell
# 安装后报错
curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# 官网
curl -L https://github.com/docker/compose/releases/tag/1.29.2 docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

检查

```shell
docker-compose -v
```





### 2、Docker-compose安装Prometheus

#### 2.1 手动创建docker-compose和配置文件（二选一）

##### 2.1.1 创建prometheus监控的文件夹

```shell
mkdir /data/docker-prometheus -p
mkdir /data/docker-prometheus/{grafana,prometheus,alertmanager} -p
cd /data/docker-prometheus/
```

##### 2.1.2 创建alertmanager的配置文件

```shell
cat > alertmanager/config.yml <<"EOF"
global:
  #163服务器
  smtp_smarthost: 'smtp.qq.com:465'
  #发邮件的邮箱
  smtp_from: '820205163@qq.com'
  #发邮件的邮箱用户名，也就是你的邮箱　　　　　
  smtp_auth_username: '820205163@qq.com'
  #发邮件的邮箱密码
  smtp_auth_password: 'okhjuhfvgqujbbie'
  #进行tls验证
  smtp_require_tls: false

route:
  group_by: ['alertname']
  # 当收到告警的时候，等待group_wait配置的时间，看是否还有告警，如果有就一起发出去
  group_wait: 10s
  #  如果上次告警信息发送成功，此时又来了一个新的告警数据，则需要等待group_interval配置的时间才可以发送出去
  group_interval: 10s
  # 如果上次告警信息发送成功，且问题没有解决，则等待 repeat_interval配置的时间再次发送告警数据
  repeat_interval: 10m
  # 全局报警组，这个参数是必选的
  receiver: email

receivers:
- name: 'email'
  #收邮件的邮箱
  email_configs:
  - to: '1209599006@qq.com'
inhibit_rules:
 - source_match:
     severity: 'critical'
   target_match:
     severity: 'warning'
   equal: ['alertname', 'dev', 'instance']
EOF
```

##### 2.1.3 新建Grafana的配置文件

`GF_SECURITY_ADMIN_PASSWORD=` 为Grafana超级管理员admin的密码，根据实际修改

```shell
cat > grafana/config.monitoring <<'EOF'
GF_SECURITY_ADMIN_PASSWORD=password
GF_USERS_ALLOW_SIGN_UP=false
EOF
```

##### 2.1.4 新建Prometheus的配置文件

```shell
cat > prometheus/prometheus.yml <<'EOF'
# 全局配置
global:
  scrape_interval:     15s # 将搜刮间隔设置为每15秒一次。默认是每1分钟一次。
  evaluation_interval: 15s # 每15秒评估一次规则。默认是每1分钟一次。

# Alertmanager 配置
alerting:
  alertmanagers:
  - static_configs:
    - targets: ['alertmanager:9093']

# 报警(触发器)配置
rule_files:
  - "alert.yml"

# 搜刮配置
scrape_configs:
  - job_name: 'prometheus'
    # 覆盖全局默认值，每15秒从该作业中刮取一次目标
    scrape_interval: 15s
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'alertmanager'
    scrape_interval: 15s
    static_configs:
    - targets: ['alertmanager:9093']
  - job_name: 'cadvisor'
    scrape_interval: 15s
    static_configs:
    - targets: ['cadvisor:8080']
      labels:
        instance: Prometheus服务器 

  - job_name: 'node-exporter'
    scrape_interval: 15s
    static_configs:
    - targets: ['node_exporter:9100']
      labels:
        instance: Prometheus服务器 
EOF
```

##### 2.1.5 创建alert报警文件

```shell
cat > prometheus/alert.yaml <<'EOF'
groups:
- name: Prometheus alert
  rules:
  # 对任何实例超过30秒无法联系的情况发出警报
  - alert: 服务告警
    expr: up == 0
    for: 30s
    labels:
      severity: critical
    annotations:
      summary: "服务异常,实例:{{ $labels.instance }}"
      description: "{{ $labels.job }} 服务已关闭"
EOF
```

##### 2.1.6 新建docker-compose.yaml文件

prometheus docker hub最新版本查看地址：hub.docker.com/r/prom/prometheus/tags

alertmanager docker hub最新版本查看地址：hub.docker.com/r/prom/alertmanager/tags

node_exporter docker hub最新版本查看地址：hub.docker.com/r/prom/node-exporter/tags

```shell
#进入到prometheus目录
cd /data/docker-prometheus

#通过cat新建docker-compose.yaml文件
cat > docker-compose.yaml <<'EOF'
version: '3.3'

volumes:
  prometheus_data: {}
  grafana_data: {}

networks:
  monitoring:
    driver: bridge

services:
  prometheus:
    image: prom/prometheus:v2.37.6
    container_name: prometheus
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./prometheus/:/etc/prometheus/
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
      #热加载配置
      - '--web.enable-lifecycle'
      #api配置
      #- '--web.enable-admin-api'
      #历史数据最大保留时间，默认15天
      - '--storage.tsdb.retention.time=30d'  
    networks:
      - monitoring
    links:
      - alertmanager
      - cadvisor
      - node_exporter
    expose:
      - '9090'
    ports:
      - 9090:9090
    depends_on:
      - cadvisor

  alertmanager:
    image: prom/alertmanager:v0.25.0
    container_name: alertmanager
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./alertmanager/:/etc/alertmanager/
    command:
      - '--config.file=/etc/alertmanager/config.yml'
      - '--storage.path=/alertmanager'
    networks:
      - monitoring
    expose:
      - '9093'
    ports:
      - 9093:9093

  cadvisor:
    image: google/cadvisor:latest
    container_name: cadvisor
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring
    expose:
      - '8080'

  node_exporter:
    image: prom/node-exporter:v1.5.0
    container_name: node-exporter
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command: 
      - '--path.procfs=/host/proc' 
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc|rootfs/var/lib/docker)($$|/)'
    networks:
      - monitoring
    ports:
      - '9100:9100'

  grafana:
    image: grafana/grafana:9.4.3
    container_name: grafana
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning/:/etc/grafana/provisioning/
    env_file:
      - ./grafana/config.monitoring
    networks:
      - monitoring
    links:
      - prometheus
    ports:
      - 3000:3000
    depends_on:
      - prometheus
EOF
```

#### 2.2 通过克隆gitee代码安装（二选一)

命令

```shell
mkdir /data/
cd /data/
git clone https://gitee.com/linge365/docker-prometheus.git
cd docker-prometheus
```

#### 2.3 运行Prometheus

运行命令

```shell
cd /data/docker-prometheus
docker-compose up -d
```

检查容器

```shell
docker ps
```

检查端口

```
ss -lntp|egrep "3000|9090|9100|9093"
```

web访问地址

| 应用          | 访问地址                       | 备注           |
| ------------- | ------------------------------ | -------------- |
| Prometheus    | http://10.0.0.112:9090         | 无用户和密码   |
| grafana       | http://10.0.0.112:3000         | admin/password |
| alertmanager  | http://10.0.0.112:9093         | 无用户和密码   |
| node-exporter | http://10.0.0.112:9100/metrics | 无用户和密码   |



## 五、使用Grafana9.4.3展示Prometheus的图形

### 1、登录Grafana

web访问地址

| 应用    | 访问地址               | 备注                 |
| ------- | ---------------------- | -------------------- |
| Grafana | http://10.0.0.112:3000 | 默认：admin/password |



### 2、创建 Prometheus 数据源

登录Grafana，Configuration >  Data sources，点击 `Add new data source` 选择 `Prometheus`，URL：`http://prometheus:9090`，点击`Save & test`。

> 跳转地址：http://10.0.0.112:3000/datasources/new



### 3、创建仪表盘

#### 3.1 从 Grafana.com 选择仪表板

跳转 https://grafana.com/grafana/dashboards/ 找到 `Node Exporter Full` 点击进去，点击 `Dashboard ID copied!` ，获取到 ID：`1860` 。

> 跳转地址：https://grafana.com/grafana/dashboards/1860-node-exporter-full/



#### 3.2 通过ID导入仪表板

登录Grafana，Dashboards > Import，Import via grafana.com： `1860`，点击 `Load`，Name：`服务器监控`，Prometheus：`Prometheus`，点击 `Import`。

> 跳转地址：http://10.0.0.112:3000/dashboard/import





## 六、Prometheus相关概念

### 1、理解时间序列

安装好prometheus后会暴露一个 `/metrics` 的HTTP服务（相当于安装了prometheus_exporter），通过配置（默认会加上/metrics），Prometheus就可以采集到这个 `/metrics` 里面所有监控样本数据。例如：

```shell
# HELP process_open_fds Number of open file descriptors.
# TYPE process_open_fds gauge
process_open_fds 25
```

1.1 样本

Prometheus 会将所有采集到的监控样本数据以时间序列的方式保存在 `内存数据库`中，并且定时保存到硬盘上。时间序列是按照时间戳和值的序列顺序存放的，我们称之为向量(vector)，每条时间序列通过指标名称(metrics name)和一组标签集(label)命名。如下所示，可以将时间序列理解为一个以时间为X轴的数字矩阵：

```shell
∧
|........................    process_open_fds
|........................    node_cpu_seconds_total{cpu="cpu0",mode="system"} 
|........................    node_load1{} 
|........................    
∨
  <-------- 时间 -------->
```

在时间序列中的每一个点称为一个样本（sample），样本由以下三部分组成：

- 指标(metric)：指标名和描述当前样本特征的标签集合
- 时间戳(timestamp)：一个精确到毫秒的时间戳
- 样本值(value)：一个float64的浮点型数据表示当前样本的值

如下所示：

```shell
process_open_fds 27
```

```shell
<--------------- metric ---------------------><-timestamp-><-value->
process_open_fds{status="9090", job="prometheus"} @1434417560938 => 39
process_open_fds{status="9090", job="prometheus"} @1434417561287 => 33
process_open_fds{status="9090", job="prometheus"} @1434417560938 => 35
process_open_fds{status="9090", job="prometheus"} @1434417561287 => 37
process_open_fds{status="9090", job="prometheus"} @1434417560938 => 36
process_open_fds{status="9090", job="prometheus"} @1434417561287 => 25
<--metric_name--><---------lable--------------->
<--metric_name--><--value-->  <name><--value-->
```



指标(Metric)

在形式上，所有的指标（Matric)都通过如下格式标示：

```shell
<metric name>{<label name>=<label value>, ...}
```

指标的名称(metric name)可以反映被监控样本的含义（比如，`process_open_fds` - 表示当前系统打开的文件描述符）。指标名称只能由 ASCII 字符、数字、下划线以及冒号组成并必须符合正则表达式 \[a-zA-Z\_:\]\[a-zA-Z0-9\_:\]*。

标签(label)反映了当前样本的特征维度，通过这些维度 Prometheus 可以对样本数据进行过滤，聚合等。标签的名称只能由 ASCII 字符、数字以及下划线组成并满足正则表达式 \[a-zA-Z\_\]\[a-zA-Z0-9\_\]*。

其中以 `__` 作为前缀的标签，是系统保留的关键字，只能在系统内部使用，标签的值则可以包含任何 Unicode 编码的字符。在Prometheus的底层实现中指标名称实际上是以`__name__=<metric name>`的形式保存在数据库中的，因此以下两种方式均表示的同一条time-series：

```shell
prcess_open_fds{instance="localhost:9090", job="prometheus"}
```

等同于：

```shell
{__name__="process_open_fds",instance="localhost:9090", job="prometheus"}
```



指标(Metric)的4种类型

Prometheus 底层存储上其实并没有对指标做类型的区分，都是以时间序列的形式存储，但是为了方便用户的使用和理解不同监控指标之间的差异，Prometheus 定义了 counter（计数器）、gauge（仪表盘）、histogram（直方图）以及summary（摘要）这四种 Metrics 类型。

**Gauge/Counter是数值指标，代表数据的变化情况，Histogram/Summary是统计类型的指标，表示数据的分布情况**

在Exporter返回的样本数据中，其注释中也包含了该样本的类型。例如：

```shell
# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 1.3586432e+08
```

Counter：只增不减的计数器

Counter类型的指标其工作方式和计数器一样，只增不减（除非系统发生重置）。常见的监控指标，如http_requests_total，node_cpu都是Counter类型的监控指标。一般在定义Counter类型指标的名称时推荐使用_total作为后缀。

通过 Counter 指标可以统计HTTP请求数量，请求错误数，接口调用次数等单调递增的数据，同时可结合`increase` 和 `rate` 等函数统计变化速率

例如，通过PromQL内置的聚合rate()函数获取HTTP请求量的评价增长率：

```shell
rate(prometheus_http_requests_total[5m])
```

查询当前系统中，访问量前10的HTTP地址：

```shell
topk(10, prometheus_http_requests_total)
```

对于Gauge类型的监控指标，通过PromQL内置函数delta()可以获取样本在一段时间返回内的变化情况。例如，计算CPU温度在两个小时内的差异：

```shell
delta(cpu_temp_celsius{host="zeus"}[2h])
```

还可以使用deriv()计算样本的线性回归模型，甚至是直接使用predict_linear()对数据的变化趋势进行预测。例如，预测系统磁盘空间在4个小时之后的剩余情况：

```shell
predict_linear(node_filesystem_avail_bytes{}[1h], 4 * 3600)
```

使用Histogram（直方图）和Summary（摘要）分析数据分布情况

除了Counter和Gauge类型的监控指标以外，Prometheus还定义了Histogram和Summary的指标类型。Histogram和Summary主用用于统计和分析样本的分布情况。

在大多数情况下人们都倾向于使用某些量化指标的平均值，例如CPU的平均使用率、页面的平均响应时间。这种方式的问题很明显，以系统APl调用的平均响应时间为例：如果大多数APl请求都维持在100ms的响应时间范围内，而个别请求的响应时间需要5s，那么就会导致某些WEB页面的响应时间落到中位数的情况，而这种现象被称为长尾问题。

为了区分是平均的慢还是长尾的慢，最简单的方式就是按照请求延迟的范围进行分组。例如，统计延迟在0～10ms之间的请求数有多少而10~20ms之间的请求数又有多少。通过这种方式可以快速分析系统慢的原因。Histogram和Summary都是为了能够解决这样问题的存在，通过Histogram和Summary类型的监控指标，我们可以快速了解监控样本的分布情况。

例如，指标prometheus_tsdb_wal_fsync_duration_seconds的指标类型为Summary。它记录了Promdtheus Server中wal_fsync处理的处理时间，通过访问Prometheus Server的/metrics地址，可以获取到以下监控样本数据：

```shell
# HELP prometheus_tsdb_wal_fsync_duration_seconds Duration of WAL fsync.
# TYPE prometheus_tsdb_wal_fsync_duration_seconds summary
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.5"} 0.012352463
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.9"} 0.014458005
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.99"} 0.017316173
prometheus_tsdb_wal_fsync_duration_seconds_sum 2.888716127000002
prometheus_tsdb_wal_fsync_duration_seconds_count 216
```

从上面的样本中可以得知当前Prometheus Server进行wal_fsync操作的总次数为216次，耗时2.888716127000002s。其中中位数（quantile=0.5）的耗时为0.012352463,9分位数（quantile=0.9）的耗时为0.014458005s。

在Prometheus Server自身返回的样本数据中，我们还能找到类型为Histogram的监控指标

```shell
# HELP prometheus_tsdb_compaction_chunk_range_seconds Final time range of chunks on their first compaction
# TYPE prometheus_tsdb_compaction_chunk_range_seconds histogram
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="100"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="400"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="1600"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="6400"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="25600"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="102400"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="409600"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="1.6384e+06"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="6.5536e+06"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="2.62144e+07"} 0
prometheus_tsdb_compaction_chunk_range_seconds_bucket{le="+Inf"} 0
prometheus_tsdb_compaction_chunk_range_seconds_sum 3.91254640158e+11
prometheus_tsdb_compaction_chunk_range_seconds_count 217695
```

与Summary类型的指标相似之处在于Histogram类型的样本同样会反应当前指标的记录的总数（以_count作为后缀）以

```shell
及其值的总量（以
_sum作为后缀）。不同在于Histogram指标直接反应了在不同区间内样本的个数，区间通过标签len进行定义。
同时对于Histogram的指标，我们还可以通过histogram_quantile()函数计算出其值的分位数。不同在于Histogram通过
histogram_quantile函数是在服务器端计算的分位数。而Sumamry的分位数则是直接在客户端计算完成。因此对于分位数的计算而言，
Summary在通过PromQL进行查询时有更好的性能表现，而Histogram则会消耗更多的资源。反之对于客户端而言Histogram消耗的资源
更少。在选择这两种方式时用户应该按照自己的实际场景进行选择。
需要特别注意的是,假设采样数据metric 叫做 x(指标名),如果×是histogram或summary 类型必需满足以下条件：
·采样数据的总和应表示为x_sum。
·采样数据的总量应表示为x_countl。
·summary 类型的采样数据的quantile应表示为x{quantile="y"}。
·histogram类型的采样分区统计数据将表示为x_bucket{le="y"}。
histogram 类型的采样必须包含 x_bucket{le="+Inf"},它的值等于 x_count的值。
summary 和historam中quantile和 le必需按从小到大顺序排列。
发送

```

