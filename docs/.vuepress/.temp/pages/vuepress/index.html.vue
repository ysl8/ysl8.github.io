<template><div><h1 id="vuepress部署" tabindex="-1"><a class="header-anchor" href="#vuepress部署" aria-hidden="true">#</a> Vuepress部署</h1>
<p>官网：https://v2.vuepress.vuejs.org/zh/</p>
<p>参考链接：</p>
<p>https://blog.csdn.net/passwordgloo/article/details/127111857?spm=1001.2014.3001.5502</p>
<p>https://blog.csdn.net/weixin_43711004/article/details/126942116?spm=1001.2014.3001.5502</p>
<p>https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html</p>
<h2 id="node环境安装" tabindex="-1"><a class="header-anchor" href="#node环境安装" aria-hidden="true">#</a> Node环境安装</h2>
<p>访问<a href="https://nodejs.org/zh-cn" target="_blank" rel="noopener noreferrer">Node官网<ExternalLinkIcon/></a>下载LTS长期维护版，一路点<code v-pre>Next</code>安装完成</p>
<p>CMD下查看Node、Npm版本信息</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看node版本</span>
<span class="token function">node</span> <span class="token parameter variable">-v</span>
v18.12.1
<span class="token comment"># 查看npm版本</span>
<span class="token function">npm</span> <span class="token parameter variable">-v</span>
<span class="token number">8.19</span>.2
</code></pre></div><p>初始化项目</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 切换到D盘</span>
D:
<span class="token comment"># 创建vuepress目录</span>
<span class="token function">mkdir</span> vuepress
<span class="token comment"># 进入vuepress目录</span>
<span class="token builtin class-name">cd</span> vuepress
<span class="token comment"># 一直按回车即可</span>
<span class="token function">npm</span> init
<span class="token comment"># 安装</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> vuepress@next
<span class="token comment"># 或</span>
<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry http://registry.npmmirror.com
<span class="token function">npm</span> <span class="token function">install</span> <span class="token function">pnpm</span> <span class="token parameter variable">-g</span>
<span class="token function">pnpm</span> init
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next @vuepress/client@next vue
</code></pre></div><p>文件夹根目录打开<code v-pre>package.json</code>，替换掉原先scripts内容</p>
<div class="language-json" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>									
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>           
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>         
<span class="token punctuation">}</span>
</code></pre></div><p>以下内容可选</p>
<div class="language-json" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"passwordgloo@163.com"</span><span class="token punctuation">,</span>

<span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"foresee"</span><span class="token punctuation">,</span>
    <span class="token string">"igloo"</span><span class="token punctuation">,</span>
    <span class="token string">"vuepress"</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
   
<span class="token property">"homepage"</span><span class="token operator">:</span> <span class="token string">"https://github.com/passwordgloo/passwordgloo.github.io"</span><span class="token punctuation">,</span>
<span class="token property">"repository"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"git"</span><span class="token punctuation">,</span>
    <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://github.com/passwordgloo/passwordgloo.github.io.git"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre></div><p>新建<code v-pre>docs</code>文件夹，在内部新建<code v-pre>README.md</code></p>
<p>Markdown文件开头可以设置YAML Frontmatter。代码两端使用<code v-pre>---</code>隔开，你可以理解为当前文档的属性信息，后面是自己写的内容，遵循<a href="https://markdown.com.cn/basic-syntax/" target="_blank" rel="noopener noreferrer">Markdown语法<ExternalLinkIcon/></a></p>
<div class="language-yaml" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//vuepress.vuejs.org/hero.png
<span class="token key atrule">actions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> 开始学习
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/start.md
    <span class="token key atrule">type</span><span class="token punctuation">:</span> primary
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> vue3
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /vue3/base
    <span class="token key atrule">type</span><span class="token punctuation">:</span> secondary
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 静态博客
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Vue驱动
  <span class="token key atrule">details</span><span class="token punctuation">:</span> 享受 Vue + vite 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 高性能
  <span class="token key atrule">details</span><span class="token punctuation">:</span> VuePress2.0 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
<span class="token key atrule">footer</span><span class="token punctuation">:</span> MIT Licensed <span class="token punctuation">|</span> Copyright © 2023 壹拾陆
<span class="token key atrule">footerHtml</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">---</span>
</code></pre></div><table>
<thead>
<tr>
<th>名称</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>home</td>
<td>判断是否是首页</td>
</tr>
<tr>
<td>heroImage</td>
<td>首页logo图</td>
</tr>
<tr>
<td>heroText</td>
<td>首页标题</td>
</tr>
<tr>
<td>actions</td>
<td>按钮，text和link可以多个</td>
</tr>
<tr>
<td>features</td>
<td>文档分栏，title和details数量自定</td>
</tr>
<tr>
<td>footer</td>
<td>文档底部板块</td>
</tr>
</tbody>
</table>
<p>CMD输入<code v-pre>pnpm docs:dev</code></p>
<p>发现logo图片没有正确加载吗？在<code v-pre>.vuepress</code>文件夹(此时已经存在)内新建<code v-pre>public</code>文件夹，放入<code v-pre>favicon.png</code>文件</p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<h3 id="yaml-frontmatter" tabindex="-1"><a class="header-anchor" href="#yaml-frontmatter" aria-hidden="true">#</a> YAML Frontmatter</h3>
<blockquote>
<p>Markdown文件开头可以设置YAML Frontmatter。代码两端使用<code v-pre>---</code>隔开</p>
<p>使用sidebar:auto自动显示侧边栏标题</p>
</blockquote>
<div class="language-yaml" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">lang</span><span class="token punctuation">:</span> zh<span class="token punctuation">-</span>CN
<span class="token key atrule">title</span><span class="token punctuation">:</span> 页面的标题
<span class="token key atrule">description</span><span class="token punctuation">:</span> 页面的描述
<span class="token key atrule">sidebar</span><span class="token punctuation">:</span> auto
<span class="token punctuation">---</span>
</code></pre></div><h3 id="config-ts" tabindex="-1"><a class="header-anchor" href="#config-ts" aria-hidden="true">#</a> Config.ts</h3>
<blockquote>
<p><code v-pre>.vuepress</code>文件夹内新建<code v-pre>config.ts</code>，官方推荐使用typescript编写</p>
</blockquote>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// https://theme-hope.vuejs.press/zh/</span>
<span class="token comment">// https://vuepress-theme-reco.recoluan.com/</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> defaultTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@vuepress/theme-default"</span><span class="token punctuation">;</span>

<span class="token comment">// npm i -D @vuepress/plugin-search@next</span>
<span class="token comment">// 为你的文档网站提供本地搜索能力。</span>
<span class="token comment">// https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> searchPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/plugin-search'</span>

<span class="token comment">// npm install -d vuepress-plugin-anchor-right</span>
<span class="token comment">// vuepress右侧小目录 二级目录</span>
<span class="token comment">// https://www.cnblogs.com/dingshaohua/p/16618802.html</span>
<span class="token keyword">import</span> vuepressPluginAnchorRight <span class="token keyword">from</span> <span class="token string">'vuepress-plugin-anchor-right'</span><span class="token punctuation">;</span>

<span class="token comment">// npm i -D vuepress-plugin-copy-code2</span>
<span class="token comment">// 提供代码复制按钮</span>
<span class="token comment">// https://vuepress-theme-hope.gitee.io/v2/copy-code/zh/</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> copyCodePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-plugin-copy-code2"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">"zh-CN"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">"壹拾陆"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">"这是壹拾陆的博客网站"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 为你的文档网站提供本地搜索能力。</span>
    <span class="token function">searchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 配置项</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token function">vuepressPluginAnchorRight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function">copyCodePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 插件选项</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">navbar</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Linux"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Vuepress"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vuepress/"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Linux"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"分组"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"子项1"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/start.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"子项2"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 侧边栏对象</span>
    <span class="token comment">// 不同子路径下的页面会使用不同的侧边栏</span>
    <span class="token comment">// sidebar: 'auto',</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">'/guide/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"监控工具"</span><span class="token punctuation">,</span>
          <span class="token comment">// collapsible: true,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Zabbix"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/start.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Promethus"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/starts.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Web服务"</span><span class="token punctuation">,</span>
          <span class="token comment">// collapsible: true,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Nginx"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Apache"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"后端服务"</span><span class="token punctuation">,</span>
          <span class="token comment">// collapsible: true,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"PHP"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Tomcat"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/guids/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Linuxs"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">collapsible</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Zabbix"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/start.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"Nginx"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"PHP"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string-property property">'/vue3/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"vue3基础"</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"基础1"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/guide/start.md"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">"基础2"</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">"/vue3/base.md"</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// sidebarDepth: 3,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="vuepress-plugin-md-enhance" tabindex="-1"><a class="header-anchor" href="#vuepress-plugin-md-enhance" aria-hidden="true">#</a> vuepress-plugin-md-enhance</h3>
<blockquote>
<p>提供更强的Markdown支持，诸如段落对齐、Tex语法、上下角标、代码块分组等新功能</p>
</blockquote>
<p><strong>安装</strong></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress-plugin-md-enhance@next
</code></pre></div><p><strong>配置</strong></p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mdEnhancePlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vuepress-plugin-md-enhance"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">mdEnhancePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 你的选项</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h3 id="search" tabindex="-1"><a class="header-anchor" href="#search" aria-hidden="true">#</a> search</h3>
<blockquote>
<p>search会根据你的页面，在本地生成搜索索引，页面多的话，加载速度会慢</p>
</blockquote>
<p><strong>安装</strong></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/plugin-search@next
</code></pre></div><p><strong>配置</strong></p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> searchPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/plugin-search'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token function">searchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">locales</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token string-property property">'/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">'Search'</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token string-property property">'/zh/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">'搜索'</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="docsearch" tabindex="-1"><a class="header-anchor" href="#docsearch" aria-hidden="true">#</a> docsearch</h3>
<blockquote>
<p>访问<a href="https://docsearch.algolia.com/apply/" target="_blank" rel="noopener noreferrer">DocsSearch<ExternalLinkIcon/></a>提交网站URL，审核通过后DocSearch团队会将<code v-pre>apiKey</code>和<code v-pre>indexName</code>发送到你的邮箱</p>
</blockquote>
<p><strong>安装</strong></p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/plugin-docsearch@next
</code></pre></div><p><strong>配置</strong></p>
<div class="language-javascript" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> docsearchPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/plugin-docsearch'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">docsearchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 配置项</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h3>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code>├── dist				
├── node_modules	    
├── docs                 存放文章，可以改名
<span class="token operator">|</span>  ├── .vuepress		 
<span class="token operator">|</span>  <span class="token operator">|</span>  ├── config.ts      配置
<span class="token operator">|</span>  <span class="token operator">|</span>  ├── public        【静态资源】
<span class="token operator">|</span>  <span class="token operator">|</span>  └── styles        【自定义样式】		 
<span class="token operator">|</span>  ├── Guide            【子版块】文件夹，名字任意
<span class="token operator">|</span>  <span class="token operator">|</span>  └── README.md     【子版块】首页
<span class="token operator">|</span>  ├── README.md        【主页】
<span class="token operator">|</span>  └── zh				 配置多语言，名字任意，可选
<span class="token operator">|</span>     └── README.md      对应语言首页
├── package.json
├── deploy.sh		     Github【部署方式1】
├── .github				 Github【部署方式2】
<span class="token operator">|</span>  └── workflows	     
<span class="token operator">|</span>     └── main.yml       
├── .gitignore           git忽略目录
</code></pre></div><h3 id="方案1-deploy-sh" tabindex="-1"><a class="header-anchor" href="#方案1-deploy-sh" aria-hidden="true">#</a> 方案1 deploy.sh</h3>
<p>1️⃣ 根目录新建<code v-pre>deploy.sh</code>，名字任取</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#空项目预置环境</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run docs:build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> dist


<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token comment"># echo 'www.example.com' > CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>

<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"initial commit"</span>
<span class="token comment"># 如果发布到 https://&lt;USERNAME>.github.io</span>
<span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:<span class="token operator">&lt;</span>USERNAME<span class="token operator">></span>/<span class="token operator">&lt;</span>USERNAME<span class="token operator">></span>.github.io.git master

<span class="token comment"># 如果发布到 https://&lt;USERNAME>.github.io/&lt;REPO></span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME>/&lt;REPO>.git master:gh-pages</span>

<span class="token builtin class-name">cd</span> -
</code></pre></div><p>2️⃣ 终端打开Git，输入<code v-pre>./deploy.sh</code></p>
<h3 id="方案2-github-action" tabindex="-1"><a class="header-anchor" href="#方案2-github-action" aria-hidden="true">#</a> 方案2 Github Action</h3>
<h4 id="token" tabindex="-1"><a class="header-anchor" href="#token" aria-hidden="true">#</a> Token</h4>
<p>1️⃣ 登录<a href="https://github.com/" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>，点击右上角头像选择Settings</p>
<p>2️⃣ 依次选择Developer setttings&gt;Personal access tokens，点击<code v-pre>Generate new token</code>创建Token</p>
<p>⚠️ Token只会显示一次，请记得保存</p>
<h4 id="仓库设置" tabindex="-1"><a class="header-anchor" href="#仓库设置" aria-hidden="true">#</a> 仓库设置</h4>
<p>1️⃣ 新建仓库</p>
<p>2️⃣ 仓库点击<code v-pre>Settings</code>&gt;<code v-pre>Secerts&gt;Actions</code>，输入刚刚保存好的Toke</p>
<h4 id="github-action" tabindex="-1"><a class="header-anchor" href="#github-action" aria-hidden="true">#</a> Github Action</h4>
<p>1️⃣ workflows文件下下新建<code v-pre>docs.yml</code>文件，名字任意</p>
<div class="language-yaml" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">'14'</span>

      <span class="token comment"># 缓存 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/yarn.lock')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-yarn-</span>

      <span class="token comment"># 如果缓存没有命中，安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.yarn<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token comment"># Token名称必须与仓库Token名称相同</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.Vuepress_Token <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><p>2️⃣ 根目录创建<code v-pre>.gitignore</code>文件，输入</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#ide</span>
*.DS_Store
.idea
.vscode

<span class="token comment">#npm</span>
package-lock.json
yarn.lock

<span class="token comment">#build result</span>
dist
lib
.vuepress/temp
.vuepress/cache

<span class="token comment"># Logs</span>
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

<span class="token comment"># Runtime config</span>
pids
*.pid
*.seed
*.pid.lock

<span class="token comment"># Directory for instrumented libs generated by jscoverage/JSCover</span>
lib-cov

<span class="token comment"># Coverage directory used by tools like istanbul</span>
coverage

<span class="token comment"># Compiled binary addons (https://nodejs.org/api/addons.html)</span>
build/Release

<span class="token comment"># Dependency directories</span>
node_modules

<span class="token comment"># Optional npm cache directory</span>
.npm

<span class="token comment"># Optional eslint cache</span>
.eslintcache

<span class="token comment"># Optional REPL History</span>
.node_repl_history

<span class="token comment"># Output of 'npm pack'</span>
*.tgz

<span class="token comment"># Yarn Integrity file</span>
.yarn-integrity

<span class="token comment"># dotenv environment variables file</span>
.env

<span class="token comment">#lerna-changelog</span>
.changelog

<span class="token comment">#vscode history extension</span>
.history
</code></pre></div></div></template>


