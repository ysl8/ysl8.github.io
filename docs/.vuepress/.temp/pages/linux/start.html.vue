<template><div><h1 id="prometheus" tabindex="-1"><a class="header-anchor" href="#prometheus" aria-hidden="true">#</a> Prometheus</h1>
<h2 id="一、prometheus监控介绍" tabindex="-1"><a class="header-anchor" href="#一、prometheus监控介绍" aria-hidden="true">#</a> 一、Prometheus监控介绍</h2>
<h3 id="_1、概述" tabindex="-1"><a class="header-anchor" href="#_1、概述" aria-hidden="true">#</a> 1、概述</h3>
<p><strong>什么是普罗米修斯？</strong></p>
<p>Prometheus是一个开源系统监控和警报工具包，Prometheus 受启发于 Google 的Brogmon 监控系统（相似的 Kubernetes 是从 Google的 Brog 系统演变而来），从 2012 年开始由前 Google 工程师在 Soundcloud 以开源软件的形式进行研发，并且于 2015 年早期对外发布早期版本。</p>
<p>2016 年 5 月继 Kubernetes 之后成为第二个正式加入 CNCF 基金会的项目，同年 6 月正式发布 1.0 版本。</p>
<p>2017 年底发布了基于全新存储层的 2.0 版本，能更好地与容器平台、云平台配合。</p>
<h3 id="_2、特点" tabindex="-1"><a class="header-anchor" href="#_2、特点" aria-hidden="true">#</a> 2、特点</h3>
<p>普罗米修斯的主要特点是：</p>
<ul>
<li>支持多维数据模型由指标名称和键值对标识的时间序列数据</li>
<li>内置时间序列库TSDB（Time Serices Database）</li>
<li>支持PromQL（Promethues Query Language），对数据的查询和分析、图形展示和监控告警。</li>
<li>不依赖分布式存储；单个服务器节点是自治的</li>
<li>支持HTTP的拉取(pull)方式收集时间序列数据</li>
<li>通过中间网关Pushgateway推送时间序列</li>
<li>通过服务发现或静态配置2种方式发现目标</li>
<li>支持多种可视化和仪表盘，如：grafana</li>
</ul>
<h3 id="_3、核心组件" tabindex="-1"><a class="header-anchor" href="#_3、核心组件" aria-hidden="true">#</a> 3、核心组件</h3>
<ul>
<li>Prometheus Server，主要用于抓取数据和存储时序数据，另外还提供查询和 Alert Rule 配置管理。</li>
<li>client libraries，用于检测应用程序代码的客户端库。</li>
<li>push gateway，用于批量，短期的监控数据的汇总节点，主要用于业务数据汇报等。</li>
<li>exporters 收集监控样本数据,并以标准格式向 Prometheus 提供。例如：收集服务器系统数据的 node_exporter，收集 MySQL 监控样本数据的是 MySQL exporter 等等。</li>
<li>用于告警通知管理的 alertmanager。</li>
</ul>
<h3 id="_4、基础架构" tabindex="-1"><a class="header-anchor" href="#_4、基础架构" aria-hidden="true">#</a> 4、基础架构</h3>
<p><img src="@source/linux/img/1.png" alt="prometheus architecture"></p>
<p>从这个架构图,也可以看出Prometheus的主要模块包含，Server，Exporters，Pushgateway，PromQL，Alertmanager，WebUl等。</p>
<p>它大致使用逻辑是这样：</p>
<p>1.Prometheus server定期从静态配置的targets或者服务发现的targets 拉取数据（Targets是Prometheus采集Agent需要抓取的采集目标）</p>
<p>2.当新拉取的数据关于配置内存缓存区的时候，Prometheus 会将数据持久化到磁盘（如果使用remote storage将持久化到云端）。</p>
<p>3.Prometheus可以配置rules，然后定时查询数据，当条件触发的时候，会将alerts 推送到配置的Alertmanager。</p>
<p>4.Alertmanager收到警告的时候，可以根据配置（163，钉钉等），聚合，去重，降噪，最后发送警告。</p>
<p>5.可以使用 API，Prometheus Console 或者Grafana 查询和聚合数据。</p>
<h3 id="_5、prometheus与zabbix的对比" tabindex="-1"><a class="header-anchor" href="#_5、prometheus与zabbix的对比" aria-hidden="true">#</a> 5、Prometheus与Zabbix的对比</h3>
<table>
<thead>
<tr>
<th>Prometheus对比Zabbix:</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Zabbix</td>
<td>Prometheus</td>
</tr>
<tr>
<td>后端用C开发，界面用PHP开发，定制化难度很高。</td>
<td>后端用golang开发，前端是Grafana，JSON编辑即可解决定制化难度较低</td>
</tr>
<tr>
<td>6.0支持单个Zabbix实例监控超过10万个业务服务</td>
<td>支持更大的集群规模，速度也更快</td>
</tr>
<tr>
<td>更适合监控物理机环境（物理主机，交换机，网络等监控）</td>
<td>更适合云环境的监控，对OpenStack，Kubernetes有更好的集成</td>
</tr>
<tr>
<td>监控数据存储在关系型数据库内，如MySQL，很难从现有数据中扩展维度</td>
<td>监控数据存储在基于时间序列的数据库内，便于对已有数据进行新的聚合。十级监控数据，Prometheus数据查询速率比Zabbix更快</td>
</tr>
<tr>
<td>安装简单，zabbix-server一个软件包中包括了所有的服务端功能</td>
<td>安装相对复杂，监控、告警和界面都分属于不同的组件</td>
</tr>
<tr>
<td>图形化界面比较成熟，界面上基本上能完成全部的配置操作</td>
<td>界面相对较弱，很多配置需要修改配置文件</td>
</tr>
<tr>
<td>发展时间更长，对于很多监控场景，都有现成的解决方案</td>
<td>2015年后开始快速发展，发展时间短，但现在也非常的成熟</td>
</tr>
</tbody>
</table>
<h3 id="_6、总结" tabindex="-1"><a class="header-anchor" href="#_6、总结" aria-hidden="true">#</a> 6、总结</h3>
<p>监控系统没有绝对的谁好谁不好，最重要的是适合自己的公司团队，能够合理利用最小的成本解决问题。prometheus，zabbix都只是工具，监控思想才是最重要的。</p>
<p>实在不知道怎么选？参考如下：</p>
<p>物理机、硬件设备的监控推荐使用Zabbix</p>
<p>而docker容器，Kubernetes监控推荐用Prometheus</p>
<p>云服务器厂商自带有监控系统，有的监控不全面，也可以搭配zabbix和Prometheus来一起使用。</p>
<h2 id="二、二进制安装prometheus-grafana" tabindex="-1"><a class="header-anchor" href="#二、二进制安装prometheus-grafana" aria-hidden="true">#</a> 二、二进制安装Prometheus+Grafana</h2>
<h3 id="_1、环境" tabindex="-1"><a class="header-anchor" href="#_1、环境" aria-hidden="true">#</a> 1、环境</h3>
<table>
<thead>
<tr>
<th>主机名</th>
<th>IP地址</th>
<th>配置</th>
<th>系统</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>localhost</td>
<td>10.0.0.112</td>
<td>2核4G</td>
<td>Centos   7.9</td>
<td>Prometheus版本：2.37.6 LTS，grafana版本：9.4.3，alertmanager版本：0.25，node-exporter版本：1.5.0</td>
</tr>
</tbody>
</table>
<p><strong>克隆虚拟机</strong></p>
<p>通过链接克隆一台新的虚拟机，并把ip更为10.0.0.112</p>
<h3 id="_2、-从官网手动安装" tabindex="-1"><a class="header-anchor" href="#_2、-从官网手动安装" aria-hidden="true">#</a> 2、 从官网手动安装</h3>
<ul>
<li>Prometheus 采集、存储数据</li>
<li>Grafana 用于图表展示</li>
<li>alertmanager 用于接收 Prometheus 发送的告警信息</li>
<li>node-exporter 用于收集操作系统和硬件信息的metrics</li>
</ul>
<h4 id="_2-1-安装prometheus" tabindex="-1"><a class="header-anchor" href="#_2-1-安装prometheus" aria-hidden="true">#</a> 2.1 安装Prometheus</h4>
<p><a href="https://prometheus.io/download/" target="_blank" rel="noopener noreferrer">官网下载地址<ExternalLinkIcon/></a>，获取最新下载URL</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 切换到root用户</span>
<span class="token function">sudo</span> <span class="token parameter variable">-i</span>

<span class="token comment"># 下载Prometheus二进制压缩包</span>
<span class="token function">wget</span> <span class="token string">"https://github.com/prometheus/prometheus/releases/download/v2.37.7/prometheus-2.37.7.linux-amd64.tar.gz"</span>

<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> prometheus-2.37.7.linux-amd64.tar.gz

<span class="token comment"># 查看解压后的文件名</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span>

<span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> /opt/prometheus <span class="token parameter variable">-p</span>

<span class="token comment"># 移动解压后的文件名到/opt目录下，并改名prometheus</span>
<span class="token function">mv</span> prometheus-2.37.7.linux-amd64 /opt/prometheus/prometheus 
</code></pre></div><p>创建一个专门的 <code v-pre>prometheus</code> 用户：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">useradd</span> <span class="token parameter variable">-M</span> <span class="token parameter variable">-s</span> /usr/sbin/nologin prometheus
</code></pre></div><p>更改 <code v-pre>prometheus</code> 用户的文件夹权限：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> prometheus:prometheus <span class="token parameter variable">-R</span> /opt/prometheus
</code></pre></div><p>创建 <code v-pre>systemd</code> 服务</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/systemd/system/prometheus.service <span class="token operator">&lt;&lt;</span> <span class="token string">"EOF"
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
EOF</span>
</code></pre></div><p>配置参数解释：</p>
<blockquote>
<p>通过 <code v-pre>/opt/prometheus/prometheus -h</code> 查看帮助详情</p>
</blockquote>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token parameter variable">--config.file</span><span class="token operator">=</span>/opt/prometheus/prometheus/prometheus.yml
<span class="token comment">#主配置文件</span>
<span class="token parameter variable">--storage.tsdb.path</span><span class="token operator">=</span>/opt/prometheus/prometheus/data
<span class="token comment">#数据库存储目录</span>
<span class="token parameter variable">--web.console.libraries</span><span class="token operator">=</span>/opt/prometheus/prometheus/console_libraries
<span class="token comment">#指定控制台库目录路径</span>
<span class="token parameter variable">--web.console.templates</span><span class="token operator">=</span>/opt/prometheus/prometheus/consoles
<span class="token comment">#指定控制台模版目录路径</span>
<span class="token parameter variable">--storage.tsdb.retention</span><span class="token operator">=</span>60d
<span class="token comment">#指明数据保留天数，默认15天</span>
--web.enable-lifecycle
<span class="token comment">#热加载</span>
</code></pre></div><p>启动 Prometheus</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl daemon-reload
systemctl start prometheus.service
</code></pre></div><p>加入到开机自启动</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> prometheus.service
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl status prometheus.service
</code></pre></div><p>查看 Prometheus 的日志以进行故障排除：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-u</span> prometheus.service <span class="token parameter variable">-f</span>
</code></pre></div><p>访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>prometheus</td>
<td>http://10.0.0.112:9090</td>
<td>无用户和密码</td>
</tr>
<tr>
<td>监控指标</td>
<td>http://10.0.0.112:9090/metrics</td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="_2-2-安装alertmanager" tabindex="-1"><a class="header-anchor" href="#_2-2-安装alertmanager" aria-hidden="true">#</a> 2.2 安装alertmanager</h4>
<p>下载alertmanager</p>
<p><a href="https://prometheus.io/download/" target="_blank" rel="noopener noreferrer">官网下载地址<ExternalLinkIcon/></a>，获取最新下载URL</p>
<ul>
<li>注：在root用户下执行</li>
</ul>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 下载alertmanager二进制压缩包</span>
<span class="token function">wget</span> <span class="token string">"http://github.com/prometheus/alertmanager/releases/download/v0.25.0/alertmanager-0.25.0.linux-amd64.tar.gz"</span>

<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> alertmanager-0.25.0.linux-amd64.tar.gz

<span class="token comment"># 查看解压后的文件名</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span>

<span class="token comment"># 移动解压后的文件名到/opt目录下，并改名alertmanager</span>
<span class="token function">mv</span> alertmanager-0.25.0.linux-amd64 /opt/prometheus/alertmanager
</code></pre></div><p>更改 <code v-pre>alertmanager</code> 文件夹权限：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> prometheus:prometheus <span class="token parameter variable">-R</span> /opt/prometheus/alertmanager
</code></pre></div><p>创建 systemd 服务</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span>/etc/systemd/system/alertmanager.service <span class="token operator">&lt;&lt;</span> <span class="token string">"EOF"
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
EOF</span>
</code></pre></div><p>启动 alertmanager</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl daemon-reload
systemctl start alertmanager.service
</code></pre></div><p>加入到开机自启动</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> alertmanager.service
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl status alertmanager.service
journalctl <span class="token parameter variable">-u</span> alertmanager.service <span class="token parameter variable">-f</span>
</code></pre></div><h4 id="_2-3-修改prometheus配置" tabindex="-1"><a class="header-anchor" href="#_2-3-修改prometheus配置" aria-hidden="true">#</a> 2.3 修改Prometheus配置</h4>
<p>加入alertmanager</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /opt/prometheus/prometheus/prometheus.yml
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          <span class="token comment"># 根据实际填写alertmanager的地址</span>
          - localhost:9093
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
rule_files:
  <span class="token comment"># 根据实际名修改文件名</span>
  - <span class="token string">"alert.yml"</span>
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre></div><p>增加触发器配置文件</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /opt/prometheus/prometheus/alert.yml <span class="token operator">&lt;&lt;</span><span class="token string">"EOF"
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
EOF</span>
</code></pre></div><p>检查配置</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt/prometheus/prometheus/
./promtool check config prometheus.yml
</code></pre></div><p>重启prometheus或重新加载配置文件（二选一）</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#重启</span>
systemctl restart prometheus
<span class="token comment">#或：</span>
<span class="token comment">#重载，需要--web.enable-lifecycle配置</span>
<span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:9090/-/reload
</code></pre></div><p>访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>alertmanager</td>
<td>http://10.0.0.112:9093</td>
<td>无用户和密码</td>
</tr>
</tbody>
</table>
<p>检查</p>
<p>http://10.0.0.112:9093/#/status</p>
<h4 id="_2-4-安装grafana" tabindex="-1"><a class="header-anchor" href="#_2-4-安装grafana" aria-hidden="true">#</a> 2.4 安装Grafana</h4>
<p>官网下载地址：https://grafana.com/grafana/download</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://dl.grafana.com/enterprise/release/grafana-enterprise-9.5.1.linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> grafana-enterprise-9.5.1.linux-amd64.tar.gz
<span class="token function">mv</span> grafana-9.5.1 /opt/prometheus/grafana
</code></pre></div><p>更改 <code v-pre>grafana</code> 文件夹权限：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> prometheus:prometheus <span class="token parameter variable">-R</span> /opt/prometheus/
</code></pre></div><p>创建 systemd 访问</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span>/etc/systemd/system/grafana-server.service<span class="token operator">&lt;&lt;</span><span class="token string">"EOF"
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
EOF</span>
</code></pre></div><p>启动 grafana</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl daemon-reload
systemctl start grafana-server.service
</code></pre></div><p>加入到开机启动</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> grafana-server.service
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-u</span> grafana-server.service <span class="token parameter variable">-f</span>
</code></pre></div><p>web访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>grafana</td>
<td>http://10.0.0.112:3000</td>
<td>默认：admin/admin</td>
</tr>
</tbody>
</table>
<h4 id="_2-5-安装node-exporter" tabindex="-1"><a class="header-anchor" href="#_2-5-安装node-exporter" aria-hidden="true">#</a> 2.5 安装node_exporter</h4>
<p>官网下载地址：https://prometheus.io/download/</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz

<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> node_exporter-1.5.0.linux-amd64.tar.gz

<span class="token function">ls</span> <span class="token parameter variable">-l</span>

<span class="token function">mv</span> node_exporter-1.5.0.linux-amd64 /opt/prometheus/node_exporter
</code></pre></div><p>更改 <code v-pre>node_exporter</code> 文件夹权限：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">chown</span> prometheus:prometheus <span class="token parameter variable">-R</span> /opt/prometheus/node_exporter
</code></pre></div><p>创建 systemd 服务</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/systemd/system/node_exporter.service <span class="token operator">&lt;&lt;</span><span class="token string">"EOF"
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
EOF</span>
</code></pre></div><p>启动 node_exporter</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl daemon-reload
systemctl start node_exporter.service
</code></pre></div><p>加入到开机自启动</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> node_exporter.service
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl status node_exporter.service
</code></pre></div><p>检查日志</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-u</span> node_exporter.service <span class="token parameter variable">-f</span>
</code></pre></div><p>web访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>node_exporter</td>
<td>http://10.0.0.112:9100/metrics</td>
<td>无用户和密码</td>
</tr>
</tbody>
</table>
<h4 id="_2-6-修改prometheus配置" tabindex="-1"><a class="header-anchor" href="#_2-6-修改prometheus配置" aria-hidden="true">#</a> 2.6 修改prometheus配置</h4>
<p>prometheus服务器操作</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /opt/prometheus/prometheus/prometheus.yml <span class="token operator">&lt;&lt;</span><span class="token string">"EOF"
# 再scrape_configs这行下面添加如下配置：
  # node-exporter配置
  - job_name: 'node-exporter'
    scrape_interval: 15s
    static_configs:
    - targets: ['localhost:9100']
      labels:
        instance: Prometheus服务器
EOF</span>
</code></pre></div><p>重载prometheus</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST http://localhost:9090/-/reload
</code></pre></div><p>Prometheus web上检查</p>
<p>http://10.0.0.112:9090/targets?search=</p>
<h2 id="三、使用grafana9-5-1展示prometheus的图形" tabindex="-1"><a class="header-anchor" href="#三、使用grafana9-5-1展示prometheus的图形" aria-hidden="true">#</a> 三、使用Grafana9.5.1展示Prometheus的图形</h2>
<h3 id="_1、登录grafana" tabindex="-1"><a class="header-anchor" href="#_1、登录grafana" aria-hidden="true">#</a> 1、登录Grafana</h3>
<p>web访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>Grafana</td>
<td>http://10.0.0.112:3000</td>
<td>默认：admin/admin</td>
</tr>
</tbody>
</table>
<h3 id="_2、创建-prometheus-数据源" tabindex="-1"><a class="header-anchor" href="#_2、创建-prometheus-数据源" aria-hidden="true">#</a> 2、创建 Prometheus 数据源</h3>
<p>登录Grafana，Home &gt; Administration &gt; Data sources，点击 <code v-pre>Add new data source</code> 选择 <code v-pre>Prometheus</code>，URL：<code v-pre>http://localhost:9090</code>，点击<code v-pre>Save &amp; test</code>。</p>
<blockquote>
<p>跳转地址：http://10.0.0.112:3000/datasources/new</p>
</blockquote>
<h3 id="_3、创建仪表盘" tabindex="-1"><a class="header-anchor" href="#_3、创建仪表盘" aria-hidden="true">#</a> 3、创建仪表盘</h3>
<h4 id="_3-1-从-grafana-com-选择仪表板" tabindex="-1"><a class="header-anchor" href="#_3-1-从-grafana-com-选择仪表板" aria-hidden="true">#</a> 3.1 从 Grafana.com 选择仪表板</h4>
<p>跳转 https://grafana.com/grafana/dashboards/ 找到 <code v-pre>Node Exporter Full</code> 点击进去，点击 <code v-pre>Dashboard ID copied!</code> ，获取到 ID：<code v-pre>1860</code> 。</p>
<blockquote>
<p>跳转地址：https://grafana.com/grafana/dashboards/1860-node-exporter-full/</p>
</blockquote>
<h4 id="_3-2-通过id导入仪表板" tabindex="-1"><a class="header-anchor" href="#_3-2-通过id导入仪表板" aria-hidden="true">#</a> 3.2 通过ID导入仪表板</h4>
<p>登录Grafana，Home &gt; Dashboards，点击 <code v-pre>New</code> 选择 <code v-pre>Import</code>，Import via grafana.com： <code v-pre>1860</code>，点击 <code v-pre>Load</code>，Name：<code v-pre>服务器监控</code>，Prometheus：<code v-pre>Prometheus</code>，点击 <code v-pre>Import</code>。</p>
<blockquote>
<p>跳转地址：http://10.0.0.112:3000/dashboard/import</p>
</blockquote>
<h2 id="四、docker搭建prometheus监控系统" tabindex="-1"><a class="header-anchor" href="#四、docker搭建prometheus监控系统" aria-hidden="true">#</a> 四、Docker搭建Prometheus监控系统</h2>
<h3 id="_1、环境-1" tabindex="-1"><a class="header-anchor" href="#_1、环境-1" aria-hidden="true">#</a> 1、环境</h3>
<table>
<thead>
<tr>
<th>主机名</th>
<th>IP地址</th>
<th>配置</th>
<th>系统</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>localhost</td>
<td>10.0.0.112</td>
<td>2核4G</td>
<td>Centos   7.9</td>
<td>docker版本：23.0.1，docker-compose版本：1.29.2</td>
</tr>
</tbody>
</table>
<h4 id="_1-1-安装docker" tabindex="-1"><a class="header-anchor" href="#_1-1-安装docker" aria-hidden="true">#</a> 1.1 安装Docker</h4>
<p>镜像加速</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
EOF</span>
</code></pre></div><p>安装docker</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">DOWNLOAD_URL</span><span class="token operator">=</span><span class="token string">"http://mirrors.163.com/docker-ce"</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com/ <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">-v</span>
<span class="token comment"># 或：</span>
systemctl status <span class="token function">docker</span>
</code></pre></div><h4 id="_1-2-安装docker-compose" tabindex="-1"><a class="header-anchor" href="#_1-2-安装docker-compose" aria-hidden="true">#</a> 1.2 安装Docker-compose</h4>
<p>安装命令</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装后报错</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">`</span></span> <span class="token operator">></span> /usr/local/bin/docker-compose
<span class="token function">chmod</span> +x /usr/local/bin/docker-compose
<span class="token comment"># 官网</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/docker/compose/releases/tag/1.29.2 docker-compose-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">`</span></span>-<span class="token variable"><span class="token variable">`</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">`</span></span> <span class="token operator">></span> /usr/local/bin/docker-compose
<span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre></div><p>检查</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-v</span>
</code></pre></div><h3 id="_2、docker-compose安装prometheus" tabindex="-1"><a class="header-anchor" href="#_2、docker-compose安装prometheus" aria-hidden="true">#</a> 2、Docker-compose安装Prometheus</h3>
<h4 id="_2-1-手动创建docker-compose和配置文件-二选一" tabindex="-1"><a class="header-anchor" href="#_2-1-手动创建docker-compose和配置文件-二选一" aria-hidden="true">#</a> 2.1 手动创建docker-compose和配置文件（二选一）</h4>
<h5 id="_2-1-1-创建prometheus监控的文件夹" tabindex="-1"><a class="header-anchor" href="#_2-1-1-创建prometheus监控的文件夹" aria-hidden="true">#</a> 2.1.1 创建prometheus监控的文件夹</h5>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /data/docker-prometheus <span class="token parameter variable">-p</span>
<span class="token function">mkdir</span> /data/docker-prometheus/<span class="token punctuation">{</span>grafana,prometheus,alertmanager<span class="token punctuation">}</span> <span class="token parameter variable">-p</span>
<span class="token builtin class-name">cd</span> /data/docker-prometheus/
</code></pre></div><h5 id="_2-1-2-创建alertmanager的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-1-2-创建alertmanager的配置文件" aria-hidden="true">#</a> 2.1.2 创建alertmanager的配置文件</h5>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> alertmanager/config.yml <span class="token operator">&lt;&lt;</span><span class="token string">"EOF"
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
EOF</span>
</code></pre></div><h5 id="_2-1-3-新建grafana的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-1-3-新建grafana的配置文件" aria-hidden="true">#</a> 2.1.3 新建Grafana的配置文件</h5>
<p><code v-pre>GF_SECURITY_ADMIN_PASSWORD=</code> 为Grafana超级管理员admin的密码，根据实际修改</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> grafana/config.monitoring <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
GF_SECURITY_ADMIN_PASSWORD=password
GF_USERS_ALLOW_SIGN_UP=false
EOF</span>
</code></pre></div><h5 id="_2-1-4-新建prometheus的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-1-4-新建prometheus的配置文件" aria-hidden="true">#</a> 2.1.4 新建Prometheus的配置文件</h5>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> prometheus/prometheus.yml <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
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
EOF</span>
</code></pre></div><h5 id="_2-1-5-创建alert报警文件" tabindex="-1"><a class="header-anchor" href="#_2-1-5-创建alert报警文件" aria-hidden="true">#</a> 2.1.5 创建alert报警文件</h5>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> prometheus/alert.yaml <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
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
EOF</span>
</code></pre></div><h5 id="_2-1-6-新建docker-compose-yaml文件" tabindex="-1"><a class="header-anchor" href="#_2-1-6-新建docker-compose-yaml文件" aria-hidden="true">#</a> 2.1.6 新建docker-compose.yaml文件</h5>
<p>prometheus docker hub最新版本查看地址：hub.docker.com/r/prom/prometheus/tags</p>
<p>alertmanager docker hub最新版本查看地址：hub.docker.com/r/prom/alertmanager/tags</p>
<p>node_exporter docker hub最新版本查看地址：hub.docker.com/r/prom/node-exporter/tags</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#进入到prometheus目录</span>
<span class="token builtin class-name">cd</span> /data/docker-prometheus

<span class="token comment">#通过cat新建docker-compose.yaml文件</span>
<span class="token function">cat</span> <span class="token operator">></span> docker-compose.yaml <span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
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
EOF</span>
</code></pre></div><h4 id="_2-2-通过克隆gitee代码安装-二选一" tabindex="-1"><a class="header-anchor" href="#_2-2-通过克隆gitee代码安装-二选一" aria-hidden="true">#</a> 2.2 通过克隆gitee代码安装（二选一)</h4>
<p>命令</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /data/
<span class="token builtin class-name">cd</span> /data/
<span class="token function">git</span> clone https://gitee.com/linge365/docker-prometheus.git
<span class="token builtin class-name">cd</span> docker-prometheus
</code></pre></div><h4 id="_2-3-运行prometheus" tabindex="-1"><a class="header-anchor" href="#_2-3-运行prometheus" aria-hidden="true">#</a> 2.3 运行Prometheus</h4>
<p>运行命令</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/docker-prometheus
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre></div><p>检查容器</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre></div><p>检查端口</p>
<div class="language-text" data-ext="text"><pre v-pre class="language-text"><code>ss -lntp|egrep "3000|9090|9100|9093"
</code></pre></div><p>web访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>Prometheus</td>
<td>http://10.0.0.112:9090</td>
<td>无用户和密码</td>
</tr>
<tr>
<td>grafana</td>
<td>http://10.0.0.112:3000</td>
<td>admin/password</td>
</tr>
<tr>
<td>alertmanager</td>
<td>http://10.0.0.112:9093</td>
<td>无用户和密码</td>
</tr>
<tr>
<td>node-exporter</td>
<td>http://10.0.0.112:9100/metrics</td>
<td>无用户和密码</td>
</tr>
</tbody>
</table>
<h2 id="五、使用grafana9-4-3展示prometheus的图形" tabindex="-1"><a class="header-anchor" href="#五、使用grafana9-4-3展示prometheus的图形" aria-hidden="true">#</a> 五、使用Grafana9.4.3展示Prometheus的图形</h2>
<h3 id="_1、登录grafana-1" tabindex="-1"><a class="header-anchor" href="#_1、登录grafana-1" aria-hidden="true">#</a> 1、登录Grafana</h3>
<p>web访问地址</p>
<table>
<thead>
<tr>
<th>应用</th>
<th>访问地址</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>Grafana</td>
<td>http://10.0.0.112:3000</td>
<td>默认：admin/password</td>
</tr>
</tbody>
</table>
<h3 id="_2、创建-prometheus-数据源-1" tabindex="-1"><a class="header-anchor" href="#_2、创建-prometheus-数据源-1" aria-hidden="true">#</a> 2、创建 Prometheus 数据源</h3>
<p>登录Grafana，Configuration &gt;  Data sources，点击 <code v-pre>Add new data source</code> 选择 <code v-pre>Prometheus</code>，URL：<code v-pre>http://prometheus:9090</code>，点击<code v-pre>Save &amp; test</code>。</p>
<blockquote>
<p>跳转地址：http://10.0.0.112:3000/datasources/new</p>
</blockquote>
<h3 id="_3、创建仪表盘-1" tabindex="-1"><a class="header-anchor" href="#_3、创建仪表盘-1" aria-hidden="true">#</a> 3、创建仪表盘</h3>
<h4 id="_3-1-从-grafana-com-选择仪表板-1" tabindex="-1"><a class="header-anchor" href="#_3-1-从-grafana-com-选择仪表板-1" aria-hidden="true">#</a> 3.1 从 Grafana.com 选择仪表板</h4>
<p>跳转 https://grafana.com/grafana/dashboards/ 找到 <code v-pre>Node Exporter Full</code> 点击进去，点击 <code v-pre>Dashboard ID copied!</code> ，获取到 ID：<code v-pre>1860</code> 。</p>
<blockquote>
<p>跳转地址：https://grafana.com/grafana/dashboards/1860-node-exporter-full/</p>
</blockquote>
<h4 id="_3-2-通过id导入仪表板-1" tabindex="-1"><a class="header-anchor" href="#_3-2-通过id导入仪表板-1" aria-hidden="true">#</a> 3.2 通过ID导入仪表板</h4>
<p>登录Grafana，Dashboards &gt; Import，Import via grafana.com： <code v-pre>1860</code>，点击 <code v-pre>Load</code>，Name：<code v-pre>服务器监控</code>，Prometheus：<code v-pre>Prometheus</code>，点击 <code v-pre>Import</code>。</p>
<blockquote>
<p>跳转地址：http://10.0.0.112:3000/dashboard/import</p>
</blockquote>
<h2 id="六、prometheus相关概念" tabindex="-1"><a class="header-anchor" href="#六、prometheus相关概念" aria-hidden="true">#</a> 六、Prometheus相关概念</h2>
<h3 id="_1、理解时间序列" tabindex="-1"><a class="header-anchor" href="#_1、理解时间序列" aria-hidden="true">#</a> 1、理解时间序列</h3>
<p>安装好prometheus后会暴露一个 <code v-pre>/metrics</code> 的HTTP服务（相当于安装了prometheus_exporter），通过配置（默认会加上/metrics），Prometheus就可以采集到这个 <code v-pre>/metrics</code> 里面所有监控样本数据。例如：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># HELP process_open_fds Number of open file descriptors.</span>
<span class="token comment"># TYPE process_open_fds gauge</span>
process_open_fds <span class="token number">25</span>
</code></pre></div><p>1.1 样本</p>
<p>Prometheus 会将所有采集到的监控样本数据以时间序列的方式保存在 <code v-pre>内存数据库</code>中，并且定时保存到硬盘上。时间序列是按照时间戳和值的序列顺序存放的，我们称之为向量(vector)，每条时间序列通过指标名称(metrics name)和一组标签集(label)命名。如下所示，可以将时间序列理解为一个以时间为X轴的数字矩阵：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>∧
<span class="token operator">|</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>    process_open_fds
<span class="token operator">|</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>    node_cpu_seconds_total<span class="token punctuation">{</span>cpu<span class="token operator">=</span><span class="token string">"cpu0"</span>,mode<span class="token operator">=</span><span class="token string">"system"</span><span class="token punctuation">}</span> 
<span class="token operator">|</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>    node_load1<span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token operator">|</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>    
∨
  <span class="token operator">&lt;</span>-------- 时间 --------<span class="token operator">></span>
</code></pre></div><p>在时间序列中的每一个点称为一个样本（sample），样本由以下三部分组成：</p>
<ul>
<li>指标(metric)：指标名和描述当前样本特征的标签集合</li>
<li>时间戳(timestamp)：一个精确到毫秒的时间戳</li>
<li>样本值(value)：一个float64的浮点型数据表示当前样本的值</li>
</ul>
<p>如下所示：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>process_open_fds <span class="token number">27</span>
</code></pre></div><div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">&lt;</span>--------------- metric ---------------------<span class="token operator">></span><span class="token operator">&lt;</span>-timestamp-<span class="token operator">></span><span class="token operator">&lt;</span>-value-<span class="token operator">></span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417560938 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">39</span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417561287 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">33</span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417560938 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">35</span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417561287 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">37</span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417560938 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">36</span>
process_open_fds<span class="token punctuation">{</span>status<span class="token operator">=</span><span class="token string">"9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span> @1434417561287 <span class="token operator">=</span><span class="token operator">></span> <span class="token number">25</span>
<span class="token operator">&lt;</span>--metric_name--<span class="token operator">></span><span class="token operator">&lt;</span>---------lable---------------<span class="token operator">></span>
<span class="token operator">&lt;</span>--metric_name--<span class="token operator">></span><span class="token operator">&lt;</span>--value--<span class="token operator">></span>  <span class="token operator">&lt;</span>name<span class="token operator">></span><span class="token operator">&lt;</span>--value--<span class="token operator">></span>
</code></pre></div><p>指标(Metric)</p>
<p>在形式上，所有的指标（Matric)都通过如下格式标示：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">&lt;</span>metric name<span class="token operator">></span><span class="token punctuation">{</span><span class="token operator">&lt;</span>label name<span class="token operator">>=</span><span class="token operator">&lt;</span>label value<span class="token operator">></span>, <span class="token punctuation">..</span>.<span class="token punctuation">}</span>
</code></pre></div><p>指标的名称(metric name)可以反映被监控样本的含义（比如，<code v-pre>process_open_fds</code> - 表示当前系统打开的文件描述符）。指标名称只能由 ASCII 字符、数字、下划线以及冒号组成并必须符合正则表达式 [a-zA-Z_:][a-zA-Z0-9_:]*。</p>
<p>标签(label)反映了当前样本的特征维度，通过这些维度 Prometheus 可以对样本数据进行过滤，聚合等。标签的名称只能由 ASCII 字符、数字以及下划线组成并满足正则表达式 [a-zA-Z_][a-zA-Z0-9_]*。</p>
<p>其中以 <code v-pre>__</code> 作为前缀的标签，是系统保留的关键字，只能在系统内部使用，标签的值则可以包含任何 Unicode 编码的字符。在Prometheus的底层实现中指标名称实际上是以<code v-pre>__name__=&lt;metric name&gt;</code>的形式保存在数据库中的，因此以下两种方式均表示的同一条time-series：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>prcess_open_fds<span class="token punctuation">{</span>instance<span class="token operator">=</span><span class="token string">"localhost:9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span>
</code></pre></div><p>等同于：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span>__name__<span class="token operator">=</span><span class="token string">"process_open_fds"</span>,instance<span class="token operator">=</span><span class="token string">"localhost:9090"</span>, <span class="token assign-left variable">job</span><span class="token operator">=</span><span class="token string">"prometheus"</span><span class="token punctuation">}</span>
</code></pre></div><p>指标(Metric)的4种类型</p>
<p>Prometheus 底层存储上其实并没有对指标做类型的区分，都是以时间序列的形式存储，但是为了方便用户的使用和理解不同监控指标之间的差异，Prometheus 定义了 counter（计数器）、gauge（仪表盘）、histogram（直方图）以及summary（摘要）这四种 Metrics 类型。</p>
<p><strong>Gauge/Counter是数值指标，代表数据的变化情况，Histogram/Summary是统计类型的指标，表示数据的分布情况</strong></p>
<p>在Exporter返回的样本数据中，其注释中也包含了该样本的类型。例如：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># HELP process_resident_memory_bytes Resident memory size in bytes.</span>
<span class="token comment"># TYPE process_resident_memory_bytes gauge</span>
process_resident_memory_bytes <span class="token number">1</span>.3586432e+08
</code></pre></div><p>Counter：只增不减的计数器</p>
<p>Counter类型的指标其工作方式和计数器一样，只增不减（除非系统发生重置）。常见的监控指标，如http_requests_total，node_cpu都是Counter类型的监控指标。一般在定义Counter类型指标的名称时推荐使用_total作为后缀。</p>
<p>通过 Counter 指标可以统计HTTP请求数量，请求错误数，接口调用次数等单调递增的数据，同时可结合<code v-pre>increase</code> 和 <code v-pre>rate</code> 等函数统计变化速率</p>
<p>例如，通过PromQL内置的聚合rate()函数获取HTTP请求量的评价增长率：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>rate<span class="token punctuation">(</span>prometheus_http_requests_total<span class="token punctuation">[</span>5m<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><p>查询当前系统中，访问量前10的HTTP地址：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>topk<span class="token punctuation">(</span><span class="token number">10</span>, prometheus_http_requests_total<span class="token punctuation">)</span>
</code></pre></div><p>对于Gauge类型的监控指标，通过PromQL内置函数delta()可以获取样本在一段时间返回内的变化情况。例如，计算CPU温度在两个小时内的差异：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>delta<span class="token punctuation">(</span>cpu_temp_celsius<span class="token punctuation">{</span>host<span class="token operator">=</span><span class="token string">"zeus"</span><span class="token punctuation">}</span><span class="token punctuation">[</span>2h<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><p>还可以使用deriv()计算样本的线性回归模型，甚至是直接使用predict_linear()对数据的变化趋势进行预测。例如，预测系统磁盘空间在4个小时之后的剩余情况：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>predict_linear<span class="token punctuation">(</span>node_filesystem_avail_bytes<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">[</span>1h<span class="token punctuation">]</span>, <span class="token number">4</span> * <span class="token number">3600</span><span class="token punctuation">)</span>
</code></pre></div><p>使用Histogram（直方图）和Summary（摘要）分析数据分布情况</p>
<p>除了Counter和Gauge类型的监控指标以外，Prometheus还定义了Histogram和Summary的指标类型。Histogram和Summary主用用于统计和分析样本的分布情况。</p>
<p>在大多数情况下人们都倾向于使用某些量化指标的平均值，例如CPU的平均使用率、页面的平均响应时间。这种方式的问题很明显，以系统APl调用的平均响应时间为例：如果大多数APl请求都维持在100ms的响应时间范围内，而个别请求的响应时间需要5s，那么就会导致某些WEB页面的响应时间落到中位数的情况，而这种现象被称为长尾问题。</p>
<p>为了区分是平均的慢还是长尾的慢，最简单的方式就是按照请求延迟的范围进行分组。例如，统计延迟在0～10ms之间的请求数有多少而10~20ms之间的请求数又有多少。通过这种方式可以快速分析系统慢的原因。Histogram和Summary都是为了能够解决这样问题的存在，通过Histogram和Summary类型的监控指标，我们可以快速了解监控样本的分布情况。</p>
<p>例如，指标prometheus_tsdb_wal_fsync_duration_seconds的指标类型为Summary。它记录了Promdtheus Server中wal_fsync处理的处理时间，通过访问Prometheus Server的/metrics地址，可以获取到以下监控样本数据：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># HELP prometheus_tsdb_wal_fsync_duration_seconds Duration of WAL fsync.</span>
<span class="token comment"># TYPE prometheus_tsdb_wal_fsync_duration_seconds summary</span>
prometheus_tsdb_wal_fsync_duration_seconds<span class="token punctuation">{</span>quantile<span class="token operator">=</span><span class="token string">"0.5"</span><span class="token punctuation">}</span> <span class="token number">0.012352463</span>
prometheus_tsdb_wal_fsync_duration_seconds<span class="token punctuation">{</span>quantile<span class="token operator">=</span><span class="token string">"0.9"</span><span class="token punctuation">}</span> <span class="token number">0.014458005</span>
prometheus_tsdb_wal_fsync_duration_seconds<span class="token punctuation">{</span>quantile<span class="token operator">=</span><span class="token string">"0.99"</span><span class="token punctuation">}</span> <span class="token number">0.017316173</span>
prometheus_tsdb_wal_fsync_duration_seconds_sum <span class="token number">2.888716127000002</span>
prometheus_tsdb_wal_fsync_duration_seconds_count <span class="token number">216</span>
</code></pre></div><p>从上面的样本中可以得知当前Prometheus Server进行wal_fsync操作的总次数为216次，耗时2.888716127000002s。其中中位数（quantile=0.5）的耗时为0.012352463,9分位数（quantile=0.9）的耗时为0.014458005s。</p>
<p>在Prometheus Server自身返回的样本数据中，我们还能找到类型为Histogram的监控指标</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># HELP prometheus_tsdb_compaction_chunk_range_seconds Final time range of chunks on their first compaction</span>
<span class="token comment"># TYPE prometheus_tsdb_compaction_chunk_range_seconds histogram</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"100"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"400"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"1600"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"6400"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"25600"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"102400"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"409600"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"1.6384e+06"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"6.5536e+06"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"2.62144e+07"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"+Inf"</span><span class="token punctuation">}</span> <span class="token number">0</span>
prometheus_tsdb_compaction_chunk_range_seconds_sum <span class="token number">3</span>.91254640158e+11
prometheus_tsdb_compaction_chunk_range_seconds_count <span class="token number">217695</span>
</code></pre></div><p>与Summary类型的指标相似之处在于Histogram类型的样本同样会反应当前指标的记录的总数（以_count作为后缀）以</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>及其值的总量（以
_sum作为后缀）。不同在于Histogram指标直接反应了在不同区间内样本的个数，区间通过标签len进行定义。
同时对于Histogram的指标，我们还可以通过histogram_quantile<span class="token punctuation">(</span><span class="token punctuation">)</span>函数计算出其值的分位数。不同在于Histogram通过
histogram_quantile函数是在服务器端计算的分位数。而Sumamry的分位数则是直接在客户端计算完成。因此对于分位数的计算而言，
Summary在通过PromQL进行查询时有更好的性能表现，而Histogram则会消耗更多的资源。反之对于客户端而言Histogram消耗的资源
更少。在选择这两种方式时用户应该按照自己的实际场景进行选择。
需要特别注意的是,假设采样数据metric 叫做 x<span class="token punctuation">(</span>指标名<span class="token punctuation">)</span>,如果×是histogram或summary 类型必需满足以下条件：
·采样数据的总和应表示为x_sum。
·采样数据的总量应表示为x_countl。
·summary 类型的采样数据的quantile应表示为x<span class="token punctuation">{</span>quantile<span class="token operator">=</span><span class="token string">"y"</span><span class="token punctuation">}</span>。
·histogram类型的采样分区统计数据将表示为x_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"y"</span><span class="token punctuation">}</span>。
histogram 类型的采样必须包含 x_bucket<span class="token punctuation">{</span>le<span class="token operator">=</span><span class="token string">"+Inf"</span><span class="token punctuation">}</span>,它的值等于 x_count的值。
summary 和historam中quantile和 le必需按从小到大顺序排列。
发送

</code></pre></div></div></template>


