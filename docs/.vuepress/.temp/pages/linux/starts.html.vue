<template><div><table>
<thead>
<tr>
<th>角色</th>
<th>主机名</th>
<th>eth0</th>
<th>配置</th>
</tr>
</thead>
<tbody>
<tr>
<td>Zabbix服务端</td>
<td>zbx</td>
<td>10.0.0.111</td>
<td>1C1G(实际推荐1C2G)</td>
</tr>
<tr>
<td>Zabbix服务端</td>
<td>web01</td>
<td>10.0.0.112</td>
<td>1C1G</td>
</tr>
<tr>
<td>Zabbix服务端</td>
<td>db01</td>
<td>10.0.0.113</td>
<td>1C1G</td>
</tr>
</tbody>
</table>
<h2 id="_1-nginx环境" tabindex="-1"><a class="header-anchor" href="#_1-nginx环境" aria-hidden="true">#</a> 1.nginx环境</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/yum.repos.d/nginx.repo<span class="token operator">&lt;&lt;</span><span class="token string">EOF
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/<span class="token variable">$releasever</span>/<span class="token variable">$basearch</span>/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF</span>
</code></pre></div><p>安装nginx</p>
<div class="language-text" data-ext="text"><pre v-pre class="language-text"><code>yum -y install nginx
</code></pre></div><h2 id="_2、​php" tabindex="-1"><a class="header-anchor" href="#_2、​php" aria-hidden="true">#</a> 2、​php</h2>
<p>安装 EPEL 软件包：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> epel-release <span class="token parameter variable">-y</span>
</code></pre></div><p>安装 remi 源：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># https://dl.fedoraproject.org/pub/epel/</span>
yum <span class="token function">install</span> http://rpms.remirepo.net/enterprise/remi-release-7.rpm <span class="token parameter variable">-y</span>
</code></pre></div><p>安装 yum 扩展包：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> yum-utils <span class="token parameter variable">-y</span>
</code></pre></div><p>启用 remi 仓库：</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>yum-config-manager <span class="token parameter variable">--enable</span> remi-php72 <span class="token parameter variable">-y</span>
yum update <span class="token parameter variable">-y</span>
</code></pre></div><p>安装 php-fpm 和一些其他模块</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> php72-php-cli php72-php-fpm php72-php-gd php72-php-mbstring php72-php-bcmath php72-php-xml php72-php-ldap php72-php-mysqlnd <span class="token parameter variable">-y</span>
</code></pre></div><p>安装结果</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># rpm -qa |egrep 'nginx|php72'</span>
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

<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># php72 -v</span>
PHP <span class="token number">7.2</span>.34 <span class="token punctuation">(</span>cli<span class="token punctuation">)</span> <span class="token punctuation">(</span>built: Sep <span class="token number">27</span> <span class="token number">2022</span> <span class="token number">19</span>:10:24<span class="token punctuation">)</span> <span class="token punctuation">(</span> NTS <span class="token punctuation">)</span>
Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">1997</span>-2018 The PHP Group
Zend Engine v3.2.0, Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">1998</span>-2018 Zend Technologies
</code></pre></div><h2 id="_3、nginx-php" tabindex="-1"><a class="header-anchor" href="#_3、nginx-php" aria-hidden="true">#</a> 3、nginx+php</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> nginx php72-php-fpm
systemctl start nginx php72-php-fpm
</code></pre></div><p>nginx配置</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/nginx/conf.d/zabbix.conf<span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
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
EOF</span>
</code></pre></div><p>检查重载nginx</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># nginx -t</span>
nginx: the configuration <span class="token function">file</span> /etc/nginx/nginx.conf syntax is ok
nginx: configuration <span class="token function">file</span> /etc/nginx/nginx.conf <span class="token builtin class-name">test</span> is successful
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># systemctl reload nginx</span>
</code></pre></div><p>php 配置</p>
<p>修改php用户</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># sed -ri '/^(user|group)/s#apache#nginx#g' /etc/opt/remi/php72/php-fpm.d/www.conf</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># egrep '^(user|group)' /etc/opt/remi/php72/php-fpm.d/www.conf</span>
user <span class="token operator">=</span> nginx
group <span class="token operator">=</span> nginx
</code></pre></div><p>创建php会话保持目录</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># grep '/var/opt/remi/php72/lib/php/session' /etc/opt/remi/php72/php-fpm.d/www.conf</span>
php_value<span class="token punctuation">[</span>session.save_path<span class="token punctuation">]</span>    <span class="token operator">=</span> /var/opt/remi/php72/lib/php/session
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /var/opt/remi/php72/lib/php/session</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># chown nginx.nginx /var/opt/remi/php72/lib/php/session</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># systemctl reload php72-php-fpm.service</span>
</code></pre></div><p>php+nginx测试</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /code/zabbix
<span class="token function">chown</span> nginx.nginx /code/zabbix
</code></pre></div><p>创建php测试页</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /code/zabbix/info.php<span class="token operator">&lt;&lt;</span><span class="token string">'EOF'
&lt;?php
  phpinfo();
?>
EOF</span>
</code></pre></div><p>浏览器访问<code v-pre>zbx.oldboylinux.cn/info.php</code></p>
<h2 id="_4、数据库" tabindex="-1"><a class="header-anchor" href="#_4、数据库" aria-hidden="true">#</a> 4、数据库</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># yum install -y mariadb-server</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># mysql_secure_installation</span>
Y Y Y Y Y
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># mysql -uroot -p1</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">select</span> user,host from mysql.user<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> show databases<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> create database zabbix charset utf8 collate utf8_bin<span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> grant all on zabbix.* to <span class="token string">'zabbix'</span>@<span class="token string">'localhost'</span> identified by <span class="token string">'1'</span><span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> grant all on zabbix.* to <span class="token string">'zabbix'</span>@<span class="token string">'10.0.0.%'</span> identified by <span class="token string">'1'</span><span class="token punctuation">;</span>
MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> show databases<span class="token punctuation">;</span>
+--------------------+
<span class="token operator">|</span> Database           <span class="token operator">|</span>
+--------------------+
<span class="token operator">|</span> information_schema <span class="token operator">|</span>
<span class="token operator">|</span> mysql              <span class="token operator">|</span>
<span class="token operator">|</span> performance_schema <span class="token operator">|</span>
<span class="token operator">|</span> zabbix             <span class="token operator">|</span>
+--------------------+

MariaDB <span class="token punctuation">[</span><span class="token punctuation">(</span>none<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token keyword">select</span> user,host from mysql.user<span class="token punctuation">;</span>
+--------+-----------+
<span class="token operator">|</span> user   <span class="token operator">|</span> <span class="token function">host</span>      <span class="token operator">|</span>
+--------+-----------+
<span class="token operator">|</span> zabbix <span class="token operator">|</span> <span class="token number">10.0</span>.0.%  <span class="token operator">|</span>
<span class="token operator">|</span> root   <span class="token operator">|</span> <span class="token number">127.0</span>.0.1 <span class="token operator">|</span>
<span class="token operator">|</span> root   <span class="token operator">|</span> ::1       <span class="token operator">|</span>
<span class="token operator">|</span> root   <span class="token operator">|</span> localhost <span class="token operator">|</span>
<span class="token operator">|</span> zabbix <span class="token operator">|</span> localhost <span class="token operator">|</span>
+--------+-----------+

</code></pre></div><h2 id="_5、zabbix-服务端" tabindex="-1"><a class="header-anchor" href="#_5、zabbix-服务端" aria-hidden="true">#</a> 5、zabbix-服务端</h2>
<p>安装zabbix yum源</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
</code></pre></div><p>替换zabbix源路径</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sed</span> <span class="token string">'s#http://repo.zabbix.com#https://mirrors.tuna.tsinghua.edu.cn/zabbix#g'</span> /etc/yum.repos.d/zabbix.repo
</code></pre></div><p>查看yum源的配置文件</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># cat /etc/yum.repos.d/zabbix.repo</span>
<span class="token punctuation">[</span>zabbix<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Zabbix Official Repository - <span class="token variable">$basearch</span>
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://repo.zabbix.com/zabbix/5.0/rhel/7/<span class="token variable">$basearch</span>/
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591

<span class="token punctuation">[</span>zabbix-frontend<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Zabbix Official Repository frontend - <span class="token variable">$basearch</span>
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://repo.zabbix.com/zabbix/5.0/rhel/7/<span class="token variable">$basearch</span>/frontend
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591

<span class="token punctuation">[</span>zabbix-debuginfo<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Zabbix Official Repository debuginfo - <span class="token variable">$basearch</span>
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://repo.zabbix.com/zabbix/5.0/rhel/7/<span class="token variable">$basearch</span>/debuginfo/
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">[</span>zabbix-non-supported<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Zabbix Official Repository non-supported - <span class="token variable">$basearch</span>
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://repo.zabbix.com/non-supported/rhel/7/<span class="token variable">$basearch</span>/
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre></div><p>安装 zabbix-server</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># yum install -y zabbix-server-mysql zabbix-agent2</span>
</code></pre></div><p>zabbix 数据库导入数据</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zcat /usr/share/doc/zabbix-server-mysql-5.0.28/create.sql.gz |mysql -uzabbix -p1 zabbix</span>
</code></pre></div><p>zabbix 服务端 配置连接数据库</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_server.conf</span>
<span class="token assign-left variable">DBHost</span><span class="token operator">=</span>localhost
<span class="token assign-left variable">DBPassword</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># grep -n '^DB' /etc/zabbix/zabbix_server.conf</span>
<span class="token number">91</span>:DBHost<span class="token operator">=</span>localhost
<span class="token number">100</span>:DBName<span class="token operator">=</span>zabbix
<span class="token number">116</span>:DBUser<span class="token operator">=</span>zabbix
<span class="token number">124</span>:DBPassword<span class="token operator">=</span><span class="token number">1</span>
</code></pre></div><p>修改后 zabbix 服务端开启的功能（不用修改）</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># grep '^[a-Z]' /etc/zabbix/zabbix_server.conf</span>
<span class="token assign-left variable">LogFile</span><span class="token operator">=</span>/var/log/zabbix/zabbix_server.log
<span class="token assign-left variable">LogFileSize</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">PidFile</span><span class="token operator">=</span>/var/run/zabbix/zabbix_server.pid
<span class="token assign-left variable">SocketDir</span><span class="token operator">=</span>/var/run/zabbix
<span class="token assign-left variable">DBHost</span><span class="token operator">=</span>localhost
<span class="token assign-left variable">DBName</span><span class="token operator">=</span>zabbix
<span class="token assign-left variable">DBUser</span><span class="token operator">=</span>zabbix
<span class="token assign-left variable">DBPassword</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">SNMPTrapperFile</span><span class="token operator">=</span>/var/log/snmptrap/snmptrap.log
<span class="token assign-left variable">Timeout</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token assign-left variable">AlertScriptsPath</span><span class="token operator">=</span>/usr/lib/zabbix/alertscripts
<span class="token assign-left variable">ExternalScripts</span><span class="token operator">=</span>/usr/lib/zabbix/externalscripts
<span class="token assign-left variable">LogSlowQueries</span><span class="token operator">=</span><span class="token number">3000</span>
<span class="token assign-left variable">StatsAllowedIP</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1
</code></pre></div><p>启动 zabbix-server</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> zabbix-server
systemctl start zabbix-server
ss <span class="token parameter variable">-lntup</span> <span class="token operator">|</span><span class="token function">grep</span> zabbix
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> zabbix
</code></pre></div><h2 id="_6、zabbix前端页面准备" tabindex="-1"><a class="header-anchor" href="#_6、zabbix前端页面准备" aria-hidden="true">#</a> 6、zabbix前端页面准备</h2>
<p><code v-pre>https://www.zabbix.com/cn/download_sources</code></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#使用源码包</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># wget https://cdn.zabbix.com/zabbix/sources/stable/5.0/zabbix-5.0.28.tar.gz</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># tar xf zabbix-5.0.28.tar.gz</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># cd zabbix-5.0.28</span>
<span class="token punctuation">[</span>root@zbx zabbix-5.0.28<span class="token punctuation">]</span><span class="token comment"># cp -a ui/* /code/zabbix/</span>
<span class="token punctuation">[</span>root@zbx zabbix-5.0.28<span class="token punctuation">]</span><span class="token comment"># chown -R nginx.nginx /code/zabbix/</span>
</code></pre></div><h2 id="_7、安装zabbix-zabbix前端页面连接数据库与zabbix-server" tabindex="-1"><a class="header-anchor" href="#_7、安装zabbix-zabbix前端页面连接数据库与zabbix-server" aria-hidden="true">#</a> 7、安装zabbix(zabbix前端页面连接数据库与zabbix-server)</h2>
<p>php最后的配置</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>Minimum required size of PHP post is 16M <span class="token punctuation">(</span>configuration option <span class="token string">"post_max_size"</span><span class="token punctuation">)</span>.
Minimum required limit on execution <span class="token function">time</span> of PHP scripts is <span class="token number">300</span> <span class="token punctuation">(</span>configuration option <span class="token string">"max_execution_time"</span><span class="token punctuation">)</span>.
Minimum required limit on input parse <span class="token function">time</span> <span class="token keyword">for</span> PHP scripts is <span class="token number">300</span> <span class="token punctuation">(</span>configuration option <span class="token string">"max_input_time"</span><span class="token punctuation">)</span>.
Time zone <span class="token keyword">for</span> PHP is not <span class="token builtin class-name">set</span> <span class="token punctuation">(</span>configuration parameter <span class="token string">"date.timezone"</span><span class="token punctuation">)</span>.
</code></pre></div><p>修改配置</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/opt/remi/php72/php.ini</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># egrep -n '^(max_|date.timezone|post_max)' /etc/opt/remi/php72/php.ini</span>
<span class="token number">385</span>:max_execution_time <span class="token operator">=</span> <span class="token number">300</span>
<span class="token number">395</span>:max_input_time <span class="token operator">=</span> <span class="token number">300</span>
<span class="token number">674</span>:post_max_size <span class="token operator">=</span> 16M
<span class="token number">830</span>:max_file_uploads <span class="token operator">=</span> <span class="token number">20</span>
<span class="token number">905</span>:date.timezone <span class="token operator">=</span> Asia/Shanghai
</code></pre></div><p>重载服务</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl reload php72-php-fpm.service
systemctl restart php72-php-fpm.service
</code></pre></div><p>浏览器访问<code v-pre>zbx.oldboylinux.cn</code>，用户：Admin，密码：zabbix</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210112212675.png" alt="image-20221011221158574"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210112214592.png" alt="image-20221011221403530"></p>
<p>问题</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>Zabbix server	Zabbix agent is not available <span class="token punctuation">(</span>for 3m<span class="token punctuation">)</span>
</code></pre></div><p>启动zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> zabbix-agent2.service
systemctl start zabbix-agent2.service
</code></pre></div><h2 id="zabbix-agent-vs-agent2" tabindex="-1"><a class="header-anchor" href="#zabbix-agent-vs-agent2" aria-hidden="true">#</a> Zabbix agent vs agent2</h2>
<table>
<thead>
<tr>
<th></th>
<th>zabbix agent</th>
<th>zabbix agent2</th>
</tr>
</thead>
<tbody>
<tr>
<td>开发语言</td>
<td>C语言</td>
<td>Go语言，和C语言</td>
</tr>
<tr>
<td>性能</td>
<td>独立进程方式运行</td>
<td>1个进程多线程技术运行，减少资源消耗占用较少tcp资源，能够承受更高并发</td>
</tr>
</tbody>
</table>
<h2 id="s" tabindex="-1"><a class="header-anchor" href="#s" aria-hidden="true">#</a> s</h2>
<p>Linux安装与配置客户端</p>
<p>web添加与配置主机</p>
<p>1️⃣Liunx:在客户端安装zabbix-agent2(rpm)</p>
<p>2️⃣Liunx:修改配置文件指定Server为zabbix服务端</p>
<p>3️⃣web页面:配置--&gt;主机中添加主机与关联模板</p>
<p>4️⃣web页面:添加后检测与检查数据</p>
<h2 id="zabbix服务端与客户端配置详解" tabindex="-1"><a class="header-anchor" href="#zabbix服务端与客户端配置详解" aria-hidden="true">#</a> zabbix服务端与客户端配置详解</h2>
<p>zabbix 服务端 说明</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># rpm -qa |grep zabbix</span>
zabbix-server-mysql-5.0.28-1.el7.x86_64    <span class="token comment">#zabbix yum源配置文件</span>
zabbix-agent2-5.0.28-1.el7.x86_64    <span class="token comment">#server</span>
zabbix-release-5.0-1.el7.noarch    <span class="token comment">#agent2</span>
</code></pre></div><p>zabbix服务端</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># rpm -ql zabbix-server-mysql</span>
/etc/logrotate.d/zabbix-server    <span class="token comment">#日志切割</span>
/etc/zabbix/zabbix_server.conf    <span class="token comment">#zabbix服务端配置文件</span>
/usr/lib/systemd/system/zabbix-server.service    <span class="token comment">#systemctl start/stop/restart 调用配置文件</span>
/usr/lib/tmpfiles.d/zabbix-server.conf    <span class="token comment">#备份</span>
/usr/lib/zabbix/alertscripts    <span class="token comment">#报警使用的脚本  存放处</span>
/usr/lib/zabbix/externalscripts
</code></pre></div><h2 id="监控客户端" tabindex="-1"><a class="header-anchor" href="#监控客户端" aria-hidden="true">#</a> 监控客户端</h2>
<p>安装zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm</span>
</code></pre></div><p>启动zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> zabbix-agent2.service
systemctl start zabbix-agent2.service
</code></pre></div><p>修改配置文件</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_agent2.conf</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># grep '^[a-Z]' /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111    <span class="token comment">#改为zabbix server的ip</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent2.service</span>
</code></pre></div><div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># yum install -y zabbix-get</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.112 -p 10050 -k system.hostname</span>
web01
</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121032535.png" alt="image-20221012103255385"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121034173.png" alt="image-20221012103459116"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121038201.png" alt="image-20221012103824121"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121039721.png" alt="image-20221012103941644"></p>
<p>问题</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>Get value from agent failed: cannot connect to <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">10.0</span>.0.113<span class="token punctuation">]</span>:10050<span class="token punctuation">]</span>: <span class="token punctuation">[</span><span class="token number">111</span><span class="token punctuation">]</span> Connection refused
</code></pre></div><p>db01安装zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm</span>
</code></pre></div><p>配置zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
</code></pre></div><p>启动 zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl start zabbix-agent2.service &amp;&amp; systemctl enable zabbix-agent2.service</span>
</code></pre></div><p>zbx使用zabbix_get获取主机名</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.113 -p 10050 -k system.hostname</span>
db01
</code></pre></div><h2 id="zabbix中文乱码问题" tabindex="-1"><a class="header-anchor" href="#zabbix中文乱码问题" aria-hidden="true">#</a> Zabbix中文乱码问题</h2>
<p>解决zabbix默认图形乱码问题</p>
<p>修改zabbix字体</p>
<p>Windows下目录<strong>C:\Windows\Fonts</strong>寻找字体</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /code/zabbix/assets/fonts/
<span class="token comment">#上传一个中文的ttf字体  替换  zabbix自用的字体即可.</span>
<span class="token function">cp</span> /code/zabbix/assets/fonts/DejaVuSans.ttf<span class="token punctuation">{</span>,.bak<span class="token punctuation">}</span>
<span class="token function">cp</span> msyh.ttc /code/zabbix/assets/fonts/DejaVuSans.ttf
</code></pre></div><h1 id="自定义监控项流程" tabindex="-1"><a class="header-anchor" href="#自定义监控项流程" aria-hidden="true">#</a> 自定义监控项流程</h1>
<p>1️⃣Zabbix客户端，创建key（键值）与调试（自定义监控的核心）</p>
<p>​	书写监控命令/脚本</p>
<p>​	调试Debug命令与脚本</p>
<p>​	写入到zabbix客户端配置文件中 UserParameter=key,command或脚本  与调试  zabbix_get</p>
<p>2️⃣Zabbix服务端web页面-点点点</p>
<p>​	Web页面添加/修改模板</p>
<p>​	Web页面分组</p>
<p>​	3️⃣Web页面监控项-zabbix服务端是否可以获取数据</p>
<p>​	4️⃣Web页面触发器 trigger-什么时候报警</p>
<p>​	5️⃣Web页面图形</p>
<h2 id="zbx-自定义监控" tabindex="-1"><a class="header-anchor" href="#zbx-自定义监控" aria-hidden="true">#</a> zbx-自定义监控</h2>
<h3 id="_1-需求-检查当前机器是否root远程登录" tabindex="-1"><a class="header-anchor" href="#_1-需求-检查当前机器是否root远程登录" aria-hidden="true">#</a> 1.需求：检查当前机器是否root远程登录</h3>
<ul>
<li>🅰️zbx-agent: web01 命令行
<ul>
<li>书写满足要求的命令</li>
</ul>
</li>
<li>🅱️zbx-server web页面
<ul>
<li>命令行创建的键值与<strong>监控项</strong>关联起来</li>
</ul>
</li>
</ul>
<h4 id="_1-1-linux-命令" tabindex="-1"><a class="header-anchor" href="#_1-1-linux-命令" aria-hidden="true">#</a> 1.1 Linux：命令</h4>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">who</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'$1=="root"'</span> <span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-l</span>  <span class="token comment">#数字大于1 表示有root远程登录.</span>
</code></pre></div><h4 id="_1-2-linux-创建键值-zbx-server识别" tabindex="-1"><a class="header-anchor" href="#_1-2-linux-创建键值-zbx-server识别" aria-hidden="true">#</a> 1.2 Linux：创建键值(zbx-server识别）</h4>
<ul>
<li>key键值：zbx服务端内置，用户创建的命令，可以被zabbix服务端识别。服务端执行对应的键值就会获取对应的数据。</li>
</ul>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#在客户端配置文件中按照要求的格式书写即可.</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_agent2.d/web.conf</span>
<span class="token comment">#UserParameter=键值名字,对应的命令或脚本</span>
<span class="token assign-left variable">UserParameter</span><span class="token operator">=</span>root.login, <span class="token function">who</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'$1=="root"'</span> <span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent2</span>
</code></pre></div><h4 id="_1-3-linux-测试-zbx-服务端" tabindex="-1"><a class="header-anchor" href="#_1-3-linux-测试-zbx-服务端" aria-hidden="true">#</a> 1.3 Linux：测试-zbx-服务端</h4>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.112 -p 10050 -k root.login</span>
<span class="token number">1</span>
</code></pre></div><h4 id="_1-4-web-创建监控项" tabindex="-1"><a class="header-anchor" href="#_1-4-web-创建监控项" aria-hidden="true">#</a> 1.4 web：创建监控项</h4>
<p>更新间隔：线上环境推荐1m，不太重要10m 或1h</p>
<p>监控项：zbx服务端向客户端获取数据的一个方式    监控项与键值关联</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121308419.png" alt="image-20221012130812319"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121308280.png" alt="image-20221012130818226"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121313834.png" alt="image-20221012131315748"></p>
<p>历史数据：每个间隔获取的数据，不太推荐保留过长</p>
<p>趋势数据：每个小时，或者更长时间获取一次历史数据的平均值    可以长期保存</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121315496.png" alt="image-20221012131542418"></p>
<p>11：测试键值是否可用<code v-pre>.zabbix_get</code></p>
<p>12：测试监控项(php调用键值)</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121317491.png" alt="image-20221012131743405"></p>
<h4 id="_1-5-web-创建触发器" tabindex="-1"><a class="header-anchor" href="#_1-5-web-创建触发器" aria-hidden="true">#</a> 1.5 web：创建触发器</h4>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121333929.png" alt="image-20221012133339828"></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>报警的条件：root登录的数量大于2

<span class="token punctuation">{</span>web01:root.login.last<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>    <span class="token operator">></span>        <span class="token number">2</span>
获取数据                      条件    条件对应的值<span class="token punctuation">(</span>阈值<span class="token punctuation">)</span>


<span class="token punctuation">{</span>主机名:键值.函数功能<span class="token punctuation">}</span>
函数功能：对应的不同的数据的处理方法
比如 last<span class="token punctuation">(</span><span class="token punctuation">)</span> 最新的值


比如 sum<span class="token punctuation">(</span><span class="token punctuation">)</span> 求和
min<span class="token punctuation">(</span><span class="token punctuation">)</span>  最小值
max<span class="token punctuation">(</span><span class="token punctuation">)</span>  最大值
avg<span class="token punctuation">(</span><span class="token punctuation">)</span>  平均值


分析：
<span class="token punctuation">{</span>web01:system.uptime.last<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span>10m <span class="token comment">#重启</span>

</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121333453.png" alt="image-20221012133348388"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121336762.png" alt="image-20221012133654668"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121337954.png" alt="image-20221012133756900"></p>
<h4 id="_1-6-web-创建图形" tabindex="-1"><a class="header-anchor" href="#_1-6-web-创建图形" aria-hidden="true">#</a> 1.6 web：创建图形</h4>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121343762.png" alt="image-20221012134339670"></p>
<h3 id="_2-创建模板-添加监控项-触发器-图形" tabindex="-1"><a class="header-anchor" href="#_2-创建模板-添加监控项-触发器-图形" aria-hidden="true">#</a> 2.创建模板：添加监控项，触发器，图形</h3>
<h4 id="_2-1-创建模板" tabindex="-1"><a class="header-anchor" href="#_2-1-创建模板" aria-hidden="true">#</a> 2.1 创建模板</h4>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121521551.png" alt="image-20221012152146465"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121531858.png" alt="image-20221012153134787"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526553.png" alt="image-20221012152648458"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526447.png" alt="image-20221012152653368"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121526289.png" alt="image-20221012152657195"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121536809.png" alt="image-20221012153606718"></p>
<h4 id="_2-2-模板关联主机" tabindex="-1"><a class="header-anchor" href="#_2-2-模板关联主机" aria-hidden="true">#</a> 2.2 模板关联主机</h4>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121544705.png" alt="image-20221012154437612"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121544752.png" alt="image-20221012154441661"></p>
<p>问题</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>Unknown metric root.login
</code></pre></div><p>web01拷贝配置文件到db01</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># scp /etc/zabbix/zabbix_agent2.d/web.conf 10.0.0.113:/etc/zabbix/zabbix_agent2.d/</span>
</code></pre></div><p>db01重启zabbix-agent2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent2</span>
</code></pre></div><h1 id="监控报警" tabindex="-1"><a class="header-anchor" href="#监控报警" aria-hidden="true">#</a> 监控报警</h1>
<h2 id="告警分类" tabindex="-1"><a class="header-anchor" href="#告警分类" aria-hidden="true">#</a> 告警分类</h2>
<table>
<thead>
<tr>
<th>报警方式</th>
<th>企业应用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td>发邮件        个人邮箱</td>
<td>企业邮箱，免费使用</td>
</tr>
<tr>
<td>企业微信-告警应用（机器人）</td>
<td>需要使用企业微信，免费</td>
</tr>
<tr>
<td>OA系统（钉钉）</td>
<td>与阿里云，免费</td>
</tr>
<tr>
<td>短信</td>
<td>0.045元/条左右（阿里云短信服务）收费</td>
</tr>
<tr>
<td>电话</td>
<td>收费</td>
</tr>
<tr>
<td>第三方报警工具/平台：onealert（省事）</td>
<td>只需要配置onealert的平台信息，免费使用（限制），收费</td>
</tr>
</tbody>
</table>
<h2 id="邮件报警" tabindex="-1"><a class="header-anchor" href="#邮件报警" aria-hidden="true">#</a> 邮件报警</h2>
<h3 id="_1-全流程" tabindex="-1"><a class="header-anchor" href="#_1-全流程" aria-hidden="true">#</a> 1）全流程</h3>
<p>1️⃣个人邮箱/企业邮箱</p>
<p>2️⃣开启个人邮箱  smtp功能  获取授权码</p>
<p>3️⃣**发件人：**配置zabbix <strong>报警媒介类型</strong></p>
<p>4️⃣**收件人：**配置用户接收报警</p>
<p>5️⃣**什么时候发邮件：**配置动作</p>
<h3 id="_2-个人邮箱准备-略" tabindex="-1"><a class="header-anchor" href="#_2-个人邮箱准备-略" aria-hidden="true">#</a> 2）个人邮箱准备（略）</h3>
<p>配置个人邮箱</p>
<h3 id="_3-配置发件人" tabindex="-1"><a class="header-anchor" href="#_3-配置发件人" aria-hidden="true">#</a> 3）配置发件人</h3>
<p>配置发件人-报警媒介</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121601187.png" alt="image-20221012160151029"></p>
<p>告警邮件内容：Messages template</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#信息类型是：问题（发生故障）</span>

主题： 故障名称: <span class="token punctuation">{</span>EVENT.NAME<span class="token punctuation">}</span>

消息：
故障始于时间: <span class="token punctuation">{</span>EVENT.TIME<span class="token punctuation">}</span>  日期: <span class="token punctuation">{</span>EVENT.DATE<span class="token punctuation">}</span>
故障名称: <span class="token punctuation">{</span>EVENT.NAME<span class="token punctuation">}</span>
故障主机: <span class="token punctuation">{</span>HOST.NAME<span class="token punctuation">}</span>
严重程度: <span class="token punctuation">{</span>EVENT.SEVERITY<span class="token punctuation">}</span>
额外信息: <span class="token punctuation">{</span>EVENT.OPDATA<span class="token punctuation">}</span>
故障ID: <span class="token punctuation">{</span>EVENT.ID<span class="token punctuation">}</span>
触发器地址: <span class="token punctuation">{</span>TRIGGER.URL<span class="token punctuation">}</span>


<span class="token comment">#信息类型是：Problem recov  故障解决的时候</span>

主题： 故障解决 <span class="token keyword">in</span> <span class="token punctuation">{</span>EVENT.DURATION<span class="token punctuation">}</span>: <span class="token punctuation">{</span>EVENT.NAME<span class="token punctuation">}</span>

消息：
故障已经解决 时间：<span class="token punctuation">{</span>EVENT.RECOVERY.TIME<span class="token punctuation">}</span>  日期：<span class="token punctuation">{</span>EVENT.RECOVERY.DATE<span class="token punctuation">}</span>
故障名称：<span class="token punctuation">{</span>EVENT.NAME<span class="token punctuation">}</span>
故障持续时间：<span class="token punctuation">{</span>EVENT.DURATION<span class="token punctuation">}</span>
故障主机：<span class="token punctuation">{</span>HOST.NAME<span class="token punctuation">}</span>
故障级别：<span class="token punctuation">{</span>EVENT.SEVERITY<span class="token punctuation">}</span>
故障ID：<span class="token punctuation">{</span>EVENT.ID<span class="token punctuation">}</span>
<span class="token punctuation">{</span>TRIGGER.URL<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121608600.png" alt="image-20221012160840506"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121609933.png" alt="image-20221012160926854"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121615176.png" alt="image-20221012161512055"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121632247.png" alt="image-20221012163228149"></p>
<h2 id="微信报警" tabindex="-1"><a class="header-anchor" href="#微信报警" aria-hidden="true">#</a> 微信报警</h2>
<h3 id="_1-全流程-1" tabindex="-1"><a class="header-anchor" href="#_1-全流程-1" aria-hidden="true">#</a> 1）全流程</h3>
<p>微信报警，短信，电话，钉钉自定义脚本报警</p>
<p>通过脚本(py,shell)，调用对方api接口（输入接口需要的信息，访问与使用api接口）</p>
<p>1️⃣企业微信</p>
<p>2️⃣企业微信id和告警机器人id</p>
<p>3️⃣使用脚本(shell/python)调用企业微信api接口：python  输入  收件人  信息</p>
<p>4️⃣发件人：报警媒介</p>
<p>5️⃣收件人：个人  媒体类型</p>
<p>6️⃣动作：已经完成</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210121633888.png" alt="image-20221012163311800"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122022668.png" alt="image-20221012202210470"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122022504.png" alt="image-20221012202218403"></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>企业ID: ww5f8e5ba98e978c67
AgentId<span class="token punctuation">(</span>机器人id<span class="token punctuation">)</span>: <span class="token number">1000002</span>
Secret<span class="token punctuation">(</span>机器人的密码<span class="token punctuation">)</span>: <span class="token number">7</span>-Z-guGF6WEVfXVeTYBZv7cTTBKCJfmW1NAYkyLp8Zg
</code></pre></div><p>查看脚本目录</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx fonts<span class="token punctuation">]</span><span class="token comment"># rpm -ql zabbix-server-mysql |grep script</span>
/usr/lib/zabbix/alertscripts
/usr/lib/zabbix/externalscripts
</code></pre></div><h2 id="报错-no-module-named-requests" tabindex="-1"><a class="header-anchor" href="#报错-no-module-named-requests" aria-hidden="true">#</a> 报错：No module named requests</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># python /usr/lib/zabbix/alertscripts/wechat.py</span>
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  File <span class="token string">"/usr/lib/zabbix/alertscripts/wechat.py"</span>, line <span class="token number">7</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">></span>
    <span class="token function">import</span> requests
ImportError: No module named requests

<span class="token comment">#python是通过各种模块实现目标与需求.</span>

requests  <span class="token comment">#实现客户--->服务端发出  http请求  curl/wget</span>

yum/apt
<span class="token comment">#安装python模块</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> python-pip
pip <span class="token function">install</span> requests <span class="token parameter variable">-i</span> https://mirrors.aliyun.com/pypi/simple/
</code></pre></div><h2 id="执行报错pip-install-request" tabindex="-1"><a class="header-anchor" href="#执行报错pip-install-request" aria-hidden="true">#</a> 执行报错<code v-pre>pip install request</code></h2>
<p><a href="https://blog.csdn.net/Cynthialearn/article/details/124754685" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># pip install requests</span>
Collecting requests
  Using cached https://files.pythonhosted.org/packages/a5/61/a867851fd5ab77277495a8709ddda0861b28163c4613b011bc00228cc724/requests-2.28.1.tar.gz
    Complete output from <span class="token builtin class-name">command</span> python setup.py egg_info:
    
    <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
    Unsupported Python version
    <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
    This version of Requests requires at least Python <span class="token number">3.7</span>, but
    you<span class="token string">'re trying to install it on Python 2.7. To resolve this,
    consider upgrading to a supported Python version.
    
    If you can'</span>t upgrade your Python version, you<span class="token string">'ll need to
    pin to an older version of Requests (&lt;2.28).
    
    ----------------------------------------
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-VYNkl5/requests/
You are using pip version 8.1.2, however version 22.2.2 is available.
You should consider upgrading via the '</span>pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> pip' command.


<span class="token comment"># 升级pip:</span>
<span class="token function">wget</span> https://bootstrap.pypa.io/pip/2.7/get-pip.py
python get-pip.py
pip <span class="token parameter variable">-V</span>
</code></pre></div><p>企业微信告警无法使用</p>
<p>报错</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span><span class="token string">"errcode"</span>:60020,<span class="token string">"errmsg"</span><span class="token builtin class-name">:</span><span class="token string">"not allow to access from your ip, hint: [1665572950354960143799549], from ip: 119.130.57.47, more info at https://open.work.weixin.qq.com/devtool/query?e=60020"</span><span class="token punctuation">}</span>
</code></pre></div><p>企业微信文档</p>
<div class="language-text" data-ext="text"><pre v-pre class="language-text"><code>https://developer.work.weixin.qq.com/community/announcement/detail?content_id=16334603338859177543
</code></pre></div><p><a href="https://blog.csdn.net/weixin_40228200/article/details/123796231" target="_blank" rel="noopener noreferrer">告警脚本<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/weixin_47274990/article/details/117448379" target="_blank" rel="noopener noreferrer">python<ExternalLinkIcon/></a></p>
<div class="language-python" data-ext="py"><pre v-pre class="language-python"><code><span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># vim weixin.py</span>
<span class="token comment">#!/usr/bin/env python</span>
<span class="token comment">#-*- coding: utf-8 -*-</span>
<span class="token comment">#comment: zabbix接入微信报警脚本</span>

<span class="token keyword">import</span> requests
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> os
<span class="token keyword">import</span> json
<span class="token keyword">import</span> logging

logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>level <span class="token operator">=</span> logging<span class="token punctuation">.</span>DEBUG<span class="token punctuation">,</span> <span class="token builtin">format</span> <span class="token operator">=</span> <span class="token string">'%(asctime)s, %(filename)s, %(levelname)s, %(message)s'</span><span class="token punctuation">,</span>
	datefmt <span class="token operator">=</span> <span class="token string">'%a, %d %b %Y %H:%M:%S'</span><span class="token punctuation">,</span>
	filename <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">,</span><span class="token string">'weixin.log'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	filemode <span class="token operator">=</span> <span class="token string">'a'</span><span class="token punctuation">)</span>
	
	
corpid<span class="token operator">=</span><span class="token string">'ww48f74fc8ed3a07ba'</span> <span class="token comment">#企业ID</span>
appsecret<span class="token operator">=</span><span class="token string">'iV9ljCjBVm2BvFWd-t0rZGTakxaH2izz7degTA41naI'</span>  <span class="token comment">#secret</span>
agentid<span class="token operator">=</span><span class="token number">1000002</span>  <span class="token comment">#AgentID</span>

<span class="token comment">#获取accesstoken</span>
token_url<span class="token operator">=</span><span class="token string">'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='</span> <span class="token operator">+</span> corpid <span class="token operator">+</span> <span class="token string">'&amp;corpsecret='</span> <span class="token operator">+</span> appsecret
req<span class="token operator">=</span>requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>token_url<span class="token punctuation">)</span>
accesstoken<span class="token operator">=</span>req<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">'access_token'</span><span class="token punctuation">]</span>

<span class="token comment">#发送消息</span>
msgsend_url<span class="token operator">=</span><span class="token string">'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token='</span> <span class="token operator">+</span> accesstoken

touser<span class="token operator">=</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
subject<span class="token operator">=</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
toparty<span class="token operator">=</span><span class="token string">'3|4|5|6'</span>
message<span class="token operator">=</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>

params<span class="token operator">=</span><span class="token punctuation">{</span>
        <span class="token string">"touser"</span><span class="token punctuation">:</span> touser<span class="token punctuation">,</span>
        <span class="token string">"toparty"</span><span class="token punctuation">:</span> toparty<span class="token punctuation">,</span>
        <span class="token string">"msgtype"</span><span class="token punctuation">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
        <span class="token string">"agentid"</span><span class="token punctuation">:</span> agentid<span class="token punctuation">,</span>
        <span class="token string">"text"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                <span class="token string">"content"</span><span class="token punctuation">:</span> message
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">"safe"</span><span class="token punctuation">:</span><span class="token number">0</span>
<span class="token punctuation">}</span>

req<span class="token operator">=</span>requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span>msgsend_url<span class="token punctuation">,</span> data<span class="token operator">=</span>json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span>

logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">'sendto:'</span> <span class="token operator">+</span> touser <span class="token operator">+</span> <span class="token string">';;subject:'</span> <span class="token operator">+</span> subject <span class="token operator">+</span> <span class="token string">';;message:'</span> <span class="token operator">+</span> message<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># chmod +x weixin.py </span>
<span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># python weixin.py Ye 'ceshi' 'ceshi'</span>
语法格式：python 脚本名 要发生给谁 <span class="token string">'标题'</span> <span class="token string">'内容'</span>
</code></pre></div><div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#web页面  发件人：报警媒介类型</span>
<span class="token punctuation">{</span>ALERT.SENDTO<span class="token punctuation">}</span>  <span class="token comment">#发给谁</span>
<span class="token punctuation">{</span>ALERT.SUBJECT<span class="token punctuation">}</span>  <span class="token comment">#报警标题</span>
<span class="token punctuation">{</span>ALERT.MESSAGE<span class="token punctuation">}</span>  <span class="token comment">#报警内容</span>


故障目前已经解决时间：<span class="token punctuation">{</span>EVENT.RE COVERY.TIME<span class="token punctuation">}</span>  日期<span class="token punctuation">{</span>EVENT.RECOVERY.DATE<span class="token punctuation">}</span>
故障名称：<span class="token punctuation">{</span>EVENT.NAME<span class="token punctuation">}</span>
故障经历多久：<span class="token punctuation">{</span>EVENT.DURATION<span class="token punctuation">}</span>
故障主机：<span class="token punctuation">{</span>HOST.NAME<span class="token punctuation">}</span>
故障级别：<span class="token punctuation">{</span>EVENT.SEVERITY<span class="token punctuation">}</span>
故障ID：<span class="token punctuation">{</span>EVENT.ID<span class="token punctuation">}</span>
<span class="token punctuation">{</span>TRIGGER.URL<span class="token punctuation">}</span>

<span class="token comment">#web页面 收件人：接收用户</span>
<span class="token comment">#web页面 配置-->动作</span>
</code></pre></div><p>shell</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># vim weixin.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">CorpID</span><span class="token operator">=</span><span class="token string">"wwd5932acb806b41850c"</span>  <span class="token comment"># 你的企业id</span>
<span class="token assign-left variable">Secret</span><span class="token operator">=</span><span class="token string">"BbUbI_g_4zwvgYjlRinxBu5V_xK8R1VRT-QiNLYW5O0"</span>  <span class="token comment">#你的SecretID</span>
<span class="token assign-left variable">GURL</span><span class="token operator">=</span><span class="token string">"https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=<span class="token variable">$CorpID</span>&amp;corpsecret=<span class="token variable">$Secret</span>"</span>
<span class="token assign-left variable">Token</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>/usr/bin/curl <span class="token parameter variable">-s</span> <span class="token parameter variable">-G</span> $GURL <span class="token operator">|</span><span class="token function">awk</span> -F<span class="token punctuation">\</span>": <span class="token string">'{print $4}'</span><span class="token operator">|</span><span class="token function">awk</span> -F<span class="token punctuation">\</span>" <span class="token string">'{print $2}'</span><span class="token variable">)</span></span>
<span class="token comment"># echo $Token</span>
<span class="token assign-left variable">PURL</span><span class="token operator">=</span><span class="token string">"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=<span class="token variable">$Token</span>"</span>


<span class="token keyword">function</span> <span class="token function-name function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token builtin class-name">local</span> int <span class="token assign-left variable">agentid</span><span class="token operator">=</span><span class="token number">1000002</span>    <span class="token comment"># 你的agentdid</span>
        <span class="token builtin class-name">local</span> <span class="token assign-left variable">UserID</span><span class="token operator">=</span><span class="token string">"@all"</span>                 <span class="token comment"># 发送的用户ID</span>
        <span class="token builtin class-name">local</span> <span class="token assign-left variable">PartyID</span><span class="token operator">=</span><span class="token number">1</span>                  <span class="token comment"># 部门ID</span>
        <span class="token builtin class-name">local</span> <span class="token assign-left variable">Msg</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">|</span> <span class="token function">cut</span> -d<span class="token string">" "</span> -f3-<span class="token variable">)</span></span>  <span class="token comment"># 发送给所有人</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'{\n'</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'\t"touser": "'</span>"<span class="token variable">$UserID</span><span class="token string">"<span class="token entity" title="\&quot;">\"</span>"</span>,<span class="token punctuation">\</span>n<span class="token string">"
        printf '<span class="token entity" title="\t">\t</span>"</span>toparty<span class="token string">": "</span><span class="token string">'"$PartyID"\"",\n"
        printf '</span><span class="token punctuation">\</span>t<span class="token string">"msgtype"</span><span class="token builtin class-name">:</span> <span class="token string">"text"</span>,<span class="token punctuation">\</span>n<span class="token string">'
        printf '</span><span class="token punctuation">\</span>t<span class="token string">"agentid"</span><span class="token builtin class-name">:</span> <span class="token string">"'"</span><span class="token variable">$agentid</span><span class="token string">"<span class="token entity" title="\&quot;">\"</span>"</span>,<span class="token punctuation">\</span>n<span class="token string">"
        printf '<span class="token entity" title="\t">\t</span>"</span>text<span class="token string">": {<span class="token entity" title="\n">\n</span>'
        printf '<span class="token entity" title="\t">\t</span><span class="token entity" title="\t">\t</span>"</span>content<span class="token string">": "</span><span class="token string">'"$Msg"\""\n"
        printf '</span><span class="token punctuation">\</span>t<span class="token punctuation">}</span>,<span class="token punctuation">\</span>n<span class="token string">'
        printf '</span><span class="token punctuation">\</span>t<span class="token string">"safe"</span><span class="token builtin class-name">:</span><span class="token string">"0"</span><span class="token punctuation">\</span>n<span class="token string">'
        printf '</span><span class="token punctuation">}</span><span class="token punctuation">\</span>n'
<span class="token punctuation">}</span>
/usr/bin/curl --data-ascii <span class="token string">"<span class="token variable"><span class="token variable">$(</span>body $1 $2 $3<span class="token variable">)</span></span>"</span> <span class="token variable">$PURL</span>
<span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># chmod +x weixin.sh</span>
<span class="token punctuation">[</span>root@zbx alertscripts<span class="token punctuation">]</span><span class="token comment"># ./weixin.sh test</span>
</code></pre></div><h2 id="zabbix客户端概述" tabindex="-1"><a class="header-anchor" href="#zabbix客户端概述" aria-hidden="true">#</a> Zabbix客户端概述</h2>
<table>
<thead>
<tr>
<th>zabbix客户端</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Zabbix-agent2(最常用)</td>
<td>适用于几乎所有情况，支持自定义监控，linux,windows,android/ios</td>
</tr>
<tr>
<td>SNMP客户端</td>
<td>Simple Network Management Protocal  <strong>简单网络管理协议</strong>  监控网络设备</td>
</tr>
<tr>
<td>JMX</td>
<td>Java-gateway 监控java app(tomcat),<strong>未来推荐自定义监控(zabbix_agents2 + jmap/jstats)</strong></td>
</tr>
<tr>
<td>IPMI</td>
<td>监控硬件(物理服务器,联想(IBM X86架构ThinkServer),华为,浪潮,Dell,IBM,HP)<strong>直接使用自定义监控(ipmitool + megacli)</strong></td>
</tr>
</tbody>
</table>
<h2 id="snmp监控网络设备" tabindex="-1"><a class="header-anchor" href="#snmp监控网络设备" aria-hidden="true">#</a> snmp监控网络设备</h2>
<ul>
<li>应用：
<ul>
<li><strong>监控网络设备（常用）</strong></li>
<li>也支持监控可以启动SNMP功能的设备（windows,linux,打印机......）</li>
</ul>
</li>
</ul>
<h3 id="_1-监控网络设备" tabindex="-1"><a class="header-anchor" href="#_1-监控网络设备" aria-hidden="true">#</a> 1）监控网络设备</h3>
<p>1️⃣启动 设备的SNMP功能（网络设备）</p>
<p>2️⃣zabbix服务端进行测试 能否获取到 网络设备的信息</p>
<p>3️⃣web添加主机，监控项......</p>
<h4 id="a-启动snmp" tabindex="-1"><a class="header-anchor" href="#a-启动snmp" aria-hidden="true">#</a> a.启动snmp</h4>
<table>
<thead>
<tr>
<th>snmp版本</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>v3</td>
<td>通过用户名和密码 访问 snmp信息</td>
</tr>
<tr>
<td>v2c</td>
<td>通过 团体名id 访问设备 访问 snmp信息</td>
</tr>
<tr>
<td>V1</td>
<td></td>
</tr>
</tbody>
</table>
<p>zabbix-server检查 网络设备状态</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> net-snmp-utils

COMIMUNITY

<span class="token punctuation">[</span>rootgm03 ~<span class="token punctuation">]</span><span class="token comment"># snmpwalk -c oldboykx -v 2c 192.168.13.1 SysDesc</span>
SNMPv2-MIB::sysDescr.0 <span class="token operator">=</span> STRING: H3C Product Version ERHMG2-MNW100-R1117
H3C ERHMG2
Copyright<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2014</span>-2018 New H3C Technologies Co., Ltd. All rights reserved.
<span class="token punctuation">[</span>root@m03 ~<span class="token punctuation">]</span><span class="token comment"># snmpwalk -c oldboykx -v 2c 192.168.13.1 sysdesc</span>
SNMPv2-MIB::sysDescr.0 <span class="token operator">=</span> STRING: H3C Product Version ERHMG2-MNW100-R1117
H3C ERHMG2
Copyright<span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2014</span>-2018 New H3C Technologies Co., Ltd. All rights reserved.

snmpwalk 命令 使用get方式访问网络设备
<span class="token parameter variable">-c</span> 团体名称  <span class="token comment">#v2c版本使用 团体名称</span>
<span class="token parameter variable">-v</span> 指定snmp版本  <span class="token comment">#v2c v3</span>
ip地址
指令（获取网络设备的信息）  名称方式/oid


<span class="token comment">#oid Object ID 事务id 给世间万物设置独一无二的id号</span>
<span class="token punctuation">[</span>root@m03 /tmp<span class="token punctuation">]</span><span class="token comment"># snmpwalk -c oldboykx -v 2c 192.168.13.1 sysdesc</span>
<span class="token punctuation">[</span>root@m03 /tmp<span class="token punctuation">]</span><span class="token comment"># snmpwalk -c oldboykx -v 2c 192.168.13.1 sysUptime</span>
DISMAN-EVENT-MIB::sysUpTimeInstance <span class="token operator">=</span> Timeticks: <span class="token punctuation">(</span><span class="token number">48733900</span><span class="token punctuation">)</span> <span class="token number">4</span> days, <span class="token number">17</span>:08:59.00
<span class="token punctuation">[</span>root@m03/tmp<span class="token punctuation">]</span><span class="token comment">#</span>
<span class="token punctuation">[</span>root@m03/tmp<span class="token punctuation">]</span><span class="token comment">#</span>
<span class="token punctuation">[</span>root@m03 /tmp<span class="token punctuation">]</span><span class="token comment"># snmpwalk -c oldboykx -v 2c 192.168.13.1 IfNumber</span>
IF-MIB::ifNumber.0 <span class="token operator">=</span> INTEGER:19


</code></pre></div><h4 id="_4-6-zabbix客户端常见类型" tabindex="-1"><a class="header-anchor" href="#_4-6-zabbix客户端常见类型" aria-hidden="true">#</a> 4.6 zabbix客户端常见类型</h4>
<table>
<thead>
<tr>
<th>zabbix客户端</th>
<th>特点概述</th>
<th>主要应用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td>Zabbix-agent2(最常用)</td>
<td>通用的客户端，支持自定义监控配合命令与脚本</td>
<td>用于几乎所有情况，linux,windows,android/ios,</td>
</tr>
<tr>
<td>SNMP客户端</td>
<td>Simple Network Management Protocal  <strong>简单网络管理协议</strong></td>
<td><strong>监控网络设备</strong>（可以监控linux/windows.....)</td>
</tr>
<tr>
<td>JMX</td>
<td>Java-gateway 监控java app(tomcat),<strong>未来推荐自定义监控(zabbix_agents2 + jmap/jstats)</strong></td>
<td>监控java app(tomcat)<br/>推荐<strong>自定义监控</strong></td>
</tr>
<tr>
<td>IPMI</td>
<td>监控硬件(物理服务器,联想(IBM X86架构ThinkServer),华为,浪潮,Dell,IBM,HP)<strong>直接使用自定义监控(ipmitool + megacli)</strong></td>
<td>监控硬件<br/>应用推荐：直接使用自定义监控(ipmitool + megacli )</td>
</tr>
</tbody>
</table>
<h3 id="_5-自动化" tabindex="-1"><a class="header-anchor" href="#_5-自动化" aria-hidden="true">#</a> 5.自动化</h3>
<p>自动添加主机</p>
<p>公司拥有多个机房（北京，上海，南极）</p>
<h4 id="_5-1-自动添加主机" tabindex="-1"><a class="header-anchor" href="#_5-1-自动添加主机" aria-hidden="true">#</a> 5.1 自动添加主机</h4>
<p>自动发现</p>
<p>自动注册</p>
<table>
<thead>
<tr>
<th>自动添加策略</th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>自动发现</td>
<td><strong>服务端主动扫描</strong>局域网所有的机器，有新的则添加</td>
<td>配置简单方便效率不高</td>
</tr>
<tr>
<td>自动注册</td>
<td><strong>客户端主动</strong>向服务端注册，服务端只需要等待与验证即可</td>
<td>配置有点点复杂，效率高</td>
</tr>
</tbody>
</table>
<h3 id="_12-2-自动发现" tabindex="-1"><a class="header-anchor" href="#_12-2-自动发现" aria-hidden="true">#</a> 12.2 自动发现</h3>
<p>1）环境准备</p>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>db01</td>
<td>10.0.0.51/172.16.1.51</td>
<td>zabbix客户端,server指向.72</td>
</tr>
<tr>
<td>nfs01</td>
<td>10.0.0.31/172.16.1.31</td>
<td>zabbix客户端,server指向.72</td>
</tr>
<tr>
<td>backup</td>
<td>10.0.0.41/172.16.1.41</td>
<td>zabbix客户端,server指向.72</td>
</tr>
</tbody>
</table>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#01.3台机器部署好zabbixx客户端</span>
<span class="token comment">#02.修改Server为172.16.1.72</span>
<span class="token comment">#03.启动并开机自启动</span>

</code></pre></div><h4 id="_2-部署流程" tabindex="-1"><a class="header-anchor" href="#_2-部署流程" aria-hidden="true">#</a> 2）部署流程</h4>
<p>1️⃣配置自动发现<strong>规则-发现主机</strong></p>
<p>2️⃣启动自动发现<strong>动作</strong>-发现主机后关联模板，添加主机，加入主机组，启用</p>
<p>配置<strong>自动发现规则</strong></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122039459.png" alt="image-20221012203942363"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122103703.png" alt="image-20221012210352607"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122103634.png" alt="image-20221012210358554"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122104948.png" alt="image-20221012210402869"></p>
<h3 id="_12-3-自动注册" tabindex="-1"><a class="header-anchor" href="#_12-3-自动注册" aria-hidden="true">#</a> 12.3 自动注册</h3>
<h4 id="_1-环境准备" tabindex="-1"><a class="header-anchor" href="#_1-环境准备" aria-hidden="true">#</a> 1）环境准备</h4>
<p>关闭自动发现 <strong>规则</strong></p>
<p>关闭 自动发现 动作</p>
<p>自动发现的主机 删除</p>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>web01</td>
<td>10.0.0.112</td>
<td>zabbix客户端,server指向.111</td>
</tr>
<tr>
<td>db01</td>
<td>10.0.0.113</td>
<td>zabbix客户端,server指向.111</td>
</tr>
</tbody>
</table>
<h4 id="_2-部署流程-1" tabindex="-1"><a class="header-anchor" href="#_2-部署流程-1" aria-hidden="true">#</a> 2）部署流程</h4>
<p>1️⃣修改zabbix<strong>客户端配置文件</strong>: ServerActive=服务端ip 和Hostname=......</p>
<p>2️⃣web页面，<strong>动作</strong>--&gt;自动注册 autoreg......</p>
<h5 id="a-修改客户端配置文件" tabindex="-1"><a class="header-anchor" href="#a-修改客户端配置文件" aria-hidden="true">#</a> a.修改客户端配置文件</h5>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#自动注册：</span>
配置zabbix-agent
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111   <span class="token comment">#主动模式 服务端ip地址</span>
<span class="token assign-left variable">Hostname</span><span class="token operator">=</span>web01    <span class="token comment">#主机名，独一无二</span>
<span class="token assign-left variable">HostMetadata</span><span class="token operator">=</span>web01    <span class="token comment">#主机名的元数据（属性）  主机名  使用HostMetadataItem=system.hostname</span>

<span class="token comment">#Hostname自动获取</span>

<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname    <span class="token comment">#自动获取主机名 这个 与Hostname 二选一</span>
<span class="token comment">#HostMetadata自动获取</span>
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.hostname    <span class="token comment">#自动获取主机的元数据(主机名)  这个与HostMeatadata 二选一</span>

<span class="token comment">#完整的 客户端配置文件</span>
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># grep '^[a-Z]' /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">PidFile</span><span class="token operator">=</span>/var/run/zabbix/zabbix_agent2.pid


<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent</span>
</code></pre></div><p>web01</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token comment">#Hostname=Zabbix server</span>
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent2</span>
</code></pre></div><p>db01</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token comment">#Hostname=Zabbix server</span>
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># egrep '^Server|^Host' /etc/zabbix/zabbix_agent2.conf</span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart zabbix-agent2</span>
</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135811.png" alt="image-20221012213512708"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135834.png" alt="image-20221012213516750"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210122135069.png" alt="image-20221012213519980"></p>
<h2 id="ansible批量监控主机" tabindex="-1"><a class="header-anchor" href="#ansible批量监控主机" aria-hidden="true">#</a> ansible批量监控主机</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/ansible/hosts</span>
<span class="token punctuation">[</span>web<span class="token punctuation">]</span>
<span class="token number">10.0</span>.0.112

<span class="token punctuation">[</span>db<span class="token punctuation">]</span>
<span class="token number">10.0</span>.0.113
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ssh-copy-id -i ~/.ssh/id_rsa.pub root@10.0.0.112</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ssh-copy-id -i ~/.ssh/id_rsa.pub root@10.0.0.113</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ansible -i hosts all -a 'rpm -ivh https://mirrors.tuna.tsinghua.edu.cn/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-agent2-5.0.28-1.el7.x86_64.rpm'</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># vim zabbix_agent2.conf </span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token comment">#Hostname=Zabbix server</span>
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># egrep '^Server|^Host' zabbix_agent2.conf </span>
<span class="token assign-left variable">Server</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">ServerActive</span><span class="token operator">=</span><span class="token number">10.0</span>.0.111
<span class="token assign-left variable">HostnameItem</span><span class="token operator">=</span>system.hostname
<span class="token assign-left variable">HostMetadataItem</span><span class="token operator">=</span>system.uname
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ansible -i hosts all -m copy -a 'src=zabbix_agent2.conf dest=/etc/zabbix/zabbix_agent2.conf backup=yes'</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ansible -i hosts all -m systemd -a 'name=zabbix-agent2 enabled=yes state=restarted'</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ansible -i hosts all -m shell -a 'systemctl is-active zabbix-agent2'</span>
<span class="token punctuation">[</span>root@zbx ansible<span class="token punctuation">]</span><span class="token comment"># ansible -i hosts all -m shell -a 'ps -ef |grep zabbix'</span>
</code></pre></div><h2 id="监控负载均衡" tabindex="-1"><a class="header-anchor" href="#监控负载均衡" aria-hidden="true">#</a> 监控负载均衡</h2>
<p>tcp自定义: <code v-pre>ss  -ant |grep -i 'estab' |awk '$3~/:80$/'</code></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 conf.d<span class="token punctuation">]</span><span class="token comment"># cat /etc/nginx/conf.d/default.conf </span>
server <span class="token punctuation">{</span>
    listen     <span class="token number">80</span> default_server<span class="token punctuation">;</span>
    server_name localhost<span class="token punctuation">;</span>
    location / <span class="token punctuation">{</span>
      index index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    location /nginx_status <span class="token punctuation">{</span>
      stub_status<span class="token punctuation">;</span>
      <span class="token comment">#allow</span>
      <span class="token comment">#deny</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@web01 conf.d<span class="token punctuation">]</span><span class="token comment"># curl 10.0.0.112/nginx_status</span>
Active connections: <span class="token number">1</span> 
server accepts handled requests
 <span class="token number">1</span> <span class="token number">1</span> <span class="token number">1</span> 
Reading: <span class="token number">0</span> Writing: <span class="token number">1</span> Waiting: <span class="token number">0</span>
</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141108845.png" alt="image-20221014110753695"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109161.png" alt="image-20221014110946046"></p>
<h2 id="端口进程" tabindex="-1"><a class="header-anchor" href="#端口进程" aria-hidden="true">#</a> 端口进程</h2>
<p>找出系统内置的键值使用</p>
<p>添加监控项</p>
<p>添加触发器</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.112 -k net.tcp.port[,80]</span>
<span class="token number">1</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.112 -k proc.num[nginx]</span>
<span class="token number">2</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s web01 -k net.tcp.port[,80]</span>
<span class="token number">1</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s web01 -k proc.num[]</span>
<span class="token number">103</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s web01 -k proc.num[nginx]</span>
<span class="token number">2</span>
</code></pre></div><h2 id="监控php状态" tabindex="-1"><a class="header-anchor" href="#监控php状态" aria-hidden="true">#</a> 监控php状态</h2>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@web01 conf.d<span class="token punctuation">]</span><span class="token comment"># vim /etc/nginx/conf.d/default.conf</span>
server <span class="token punctuation">{</span>
  listen <span class="token number">80</span> default_server<span class="token punctuation">;</span>
  server_name localhost<span class="token punctuation">;</span>
  charset utf8<span class="token punctuation">;</span>
  access_log /var/log/nginx/default-access.log main<span class="token punctuation">;</span>
  error_log /var/log/nginx/default-error.log error<span class="token punctuation">;</span>
  location /nginx_status <span class="token punctuation">{</span>
    stub_status <span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  location /php_status <span class="token punctuation">{</span>
    fastcgi_pass  <span class="token number">127.0</span>.0.1:9000<span class="token punctuation">;</span>
    fastcgi_index  index.php<span class="token punctuation">;</span>
    fastcgi_param  SCRIPT_FILENAME  /scripts<span class="token variable">$fastcgi_script_name</span><span class="token punctuation">;</span>
    include    fastcgi_params<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  location ~ <span class="token punctuation">\</span>.php$ <span class="token punctuation">{</span>
    fastcgi_pass  <span class="token number">127.0</span>.0.1:9000<span class="token punctuation">;</span>
    fastcgi_index index.php<span class="token punctuation">;</span>
    fastcgi_param  SCRIPT_FILENAME  /scripts<span class="token variable">$fastcgi_script_name</span><span class="token punctuation">;</span>
    include    fastcgi_params<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># vim /etc/php-fpm.d/www.conf</span>
pm.status_path <span class="token operator">=</span> /php_status

<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># nginx -t</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># php-fpm -t</span>
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart nginx php-fpm</span>

<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># curl 10.0.0.112/nginx_status</span>
Active connections: <span class="token number">1</span> 
server accepts handled requests
 <span class="token number">4</span> <span class="token number">4</span> <span class="token number">2</span> 
Reading: <span class="token number">0</span> Writing: <span class="token number">1</span> Waiting: <span class="token number">0</span> 
<span class="token punctuation">[</span>root@web01 ~<span class="token punctuation">]</span><span class="token comment"># curl 10.0.0.112/php_status</span>
pool:                 www
process manager:      dynamic
start time:           <span class="token number">14</span>/Oct/2022:10:28:56 +0800
start since:          <span class="token number">69</span>
accepted conn:        <span class="token number">1</span>
listen queue:         <span class="token number">0</span>
max listen queue:     <span class="token number">0</span>
listen queue len:     <span class="token number">128</span>
idle processes:       <span class="token number">4</span>
active processes:     <span class="token number">1</span>
total processes:      <span class="token number">5</span>
max active processes: <span class="token number">1</span>
max children reached: <span class="token number">0</span>
slow requests:        <span class="token number">0</span>

</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109656.png" alt="image-20221014110905562"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141109226.png" alt="image-20221014110916113"></p>
<h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> Mysql</h2>
<p>percona-mysql......</p>
<p>zabbix内置模板：Template DB MySQL by Zabbix agent 2</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># php脚本获取数据库指标</span>
<span class="token comment"># xml模板文件</span>
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># wget https://www.percona.com/downloads/percona-monitoring-plugins/percona-monitoring-plugins-1.1.8/binary/redhat/7/x86_64/percona-zabbix-templates-1.1.8-1.noarch.rpm</span>
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># rpm -ivh percona-zabbix-templates-1.1.8-1.noarch.rpm</span>
</code></pre></div><p>模板需要调用php脚本，安装php</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># cat >> /etc/yum.repos.d/php.repo&lt;&lt;'EOF'</span>
<span class="token punctuation">[</span>php<span class="token punctuation">]</span>
name <span class="token operator">=</span> php Repository
baseurl <span class="token operator">=</span> http://us-east.repo.webtatic.com/yum/el7/x86_64/
gpgcheck <span class="token operator">=</span> <span class="token number">0</span>
EOF

<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># yum -y install php72w php72w-cli php72w-common php72w-devel php72w-embedded php72w-gd php72w-mcrypt php72w-mbstring php72w-pdo php72w-xml php72w-fpm php72w-mysqlnd php72w-opcache php72w-pecl-memcached php72w-pecl-redis php72w-pecl-mongodb</span>
</code></pre></div><p>拷贝<code v-pre>userparameter_percona_mysql.conf</code>到<code v-pre>/etc/zabbix/zabbix_agent2.d/</code></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># rpm -ql percona-zabbix-templates</span>
/var/lib/zabbix/percona
/var/lib/zabbix/percona/scripts
/var/lib/zabbix/percona/scripts/get_mysql_stats_wrapper.sh
/var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php
/var/lib/zabbix/percona/templates
/var/lib/zabbix/percona/templates/userparameter_percona_mysql.conf
/var/lib/zabbix/percona/templates/zabbix_agent_template_percona_mysql_server_ht_2.0.9-sver1.1.8.xml
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># cp /var/lib/zabbix/percona/templates/userparameter_percona_mysql.conf /etc/zabbix/zabbix_agent2.d/</span>
</code></pre></div><p>修改配置<code v-pre>/var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php</code></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># vim /var/lib/zabbix/percona/scripts/ss_get_mysql_stats.php</span>
<span class="token variable">$mysql_user</span> <span class="token operator">=</span> <span class="token string">'yyr'</span><span class="token punctuation">;</span>
<span class="token variable">$mysql_pass</span> <span class="token operator">=</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
</code></pre></div><p>生产环境 需要一个对数据库有只读权限的用户即可。</p>
<div class="language-mysql" data-ext="mysql"><pre v-pre class="language-mysql"><code>MariaDB [(none)]&gt; grant select,show on *.* to yyr@'localhost' identified by '1';
</code></pre></div><p>查看数据库</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.113 -k MySQL.State-login</span>
<span class="token number">0</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># zabbix_get -s 10.0.0.113 -k MySQL.pool-size</span>
<span class="token number">8191</span>
</code></pre></div><p>用自带模板会报时间格式的错误，需要下载新的模板</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># wget http://jaminzhang.github.io/soft-conf/Zabbix/zbx_percona_mysql_template.xml</span>
<span class="token punctuation">[</span>root@db01 ~<span class="token punctuation">]</span><span class="token comment"># sz zbx_percona_mysql_template.xml</span>
</code></pre></div><p>导入模板</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141137120.png" alt="image-20221014113719006"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141137591.png" alt="image-20221014113742492"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141139355.png" alt="image-20221014113933244"></p>
<h2 id="grafana增强展示" tabindex="-1"><a class="header-anchor" href="#grafana增强展示" aria-hidden="true">#</a> Grafana增强展示</h2>
<p>zbx部署grafana</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># wget --no-check-certificate -P /server/tools https://mirrors.tuna.tsinghua.edu.cn/grafana/yum/rpm/grafana-7.3.5-1.x86_64.rpm</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># yum localinstall -y /server/tools/grafana-7.3.5-1.x86_64.rpm</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># systemctl start grafana-server</span>
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># systemctl enable grafana-server</span>
Created symlink from /etc/systemd/system/multi-user.target.wants/grafana-server.service to /usr/lib/systemd/system/grafana-server.service.
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># ss -lntup|grep grafana</span>
tcp    LISTEN     <span class="token number">0</span>      <span class="token number">128</span>    <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:3000               <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:*                   users:<span class="token variable"><span class="token punctuation">((</span>"grafana<span class="token operator">-</span>server"<span class="token punctuation">,</span>pid<span class="token operator">=</span><span class="token number">8119</span><span class="token punctuation">,</span>fd<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">))</span></span>
</code></pre></div><p>浏览器访问zbx.oldboylinux.cn:3000，用户 admin，密码 admin</p>
<p>添加插件zabbix</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># grafana-cli plugins list-remote |grep zabbix</span>
id: alexanderzobnin-zabbix-app version: <span class="token number">4.1</span>.5
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># grafana-cli plugins install alexanderzobnin-zabbix-app</span>
installing alexanderzobnin-zabbix-app @ <span class="token number">4.1</span>.5
from: https://grafana.com/api/plugins/alexanderzobnin-zabbix-app/versions/4.1.5/download
into: /var/lib/grafana/plugins

✔ Installed alexanderzobnin-zabbix-app successfully 

Restart grafana after installing plugins <span class="token builtin class-name">.</span> <span class="token operator">&lt;</span>service grafana-server restart<span class="token operator">></span>

<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># du -sh /var/lib/grafana/plugins/alexanderzobnin-zabbix-app/</span>
59M	/var/lib/grafana/plugins/alexanderzobnin-zabbix-app/
<span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># systemctl restart grafana-server</span>
</code></pre></div><p>搜索开启zabbix</p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141343319.png" alt="image-20221014134314158"></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@zbx ~<span class="token punctuation">]</span><span class="token comment"># curl -v -H Host:zbx.oldboylinux.cn http://10.0.0.111/api_jsonrpc.php</span>
* About to connect<span class="token punctuation">(</span><span class="token punctuation">)</span> to <span class="token number">10.0</span>.0.111 port <span class="token number">80</span> <span class="token punctuation">(</span><span class="token comment">#0)</span>
*   Trying <span class="token number">10.0</span>.0.111<span class="token punctuation">..</span>.
* Connected to <span class="token number">10.0</span>.0.111 <span class="token punctuation">(</span><span class="token number">10.0</span>.0.111<span class="token punctuation">)</span> port <span class="token number">80</span> <span class="token punctuation">(</span><span class="token comment">#0)</span>
<span class="token operator">></span> GET /api_jsonrpc.php HTTP/1.1
<span class="token operator">></span> User-Agent: curl/7.29.0
<span class="token operator">></span> Accept: */*
<span class="token operator">></span> Host:zbx.oldboylinux.cn
<span class="token operator">></span> 
<span class="token operator">&lt;</span> HTTP/1.1 <span class="token number">412</span> Precondition Failed
<span class="token operator">&lt;</span> Server: nginx/1.20.1
<span class="token operator">&lt;</span> Date: Fri, <span class="token number">14</span> Oct <span class="token number">2022</span> 05:47:04 GMT
<span class="token operator">&lt;</span> Content-Type: text/html<span class="token punctuation">;</span> <span class="token assign-left variable">charset</span><span class="token operator">=</span>UTF-8
<span class="token operator">&lt;</span> Transfer-Encoding: chunked
<span class="token operator">&lt;</span> Connection: keep-alive
<span class="token operator">&lt;</span> X-Powered-By: PHP/7.2.34
<span class="token operator">&lt;</span> Access-Control-Allow-Origin: *
<span class="token operator">&lt;</span> Access-Control-Allow-Headers: Content-Type
<span class="token operator">&lt;</span> Access-Control-Allow-Methods: POST
<span class="token operator">&lt;</span> Access-Control-Max-Age: <span class="token number">1000</span>
<span class="token operator">&lt;</span> 
* Connection <span class="token comment">#0 to host 10.0.0.111 left intact</span>
</code></pre></div><p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141353763.png" alt="image-20221014135359642"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354011.png" alt="image-20221014135413828"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354927.png" alt="image-20221014135416840"></p>
<p><img src="https://images-1258700836.cos.ap-guangzhou.myqcloud.com/images/202210141354938.png" alt="image-20221014135419771"></p>
</div></template>


