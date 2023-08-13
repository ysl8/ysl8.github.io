---
heroText: VuePress搭建
tagline: VuePress搭建
title: VuePress
description: VuePress
actions:
  - text: VuePress
    link: https://v2.vuepress.vuejs.org/zh/
    type: primary
---



# Vuepress部署

官网：https://v2.vuepress.vuejs.org/zh/

参考链接：

https://blog.csdn.net/passwordgloo/article/details/127111857?spm=1001.2014.3001.5502

https://blog.csdn.net/weixin_43711004/article/details/126942116?spm=1001.2014.3001.5502

https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html



## Node环境安装

访问[Node官网](https://nodejs.org/zh-cn)下载LTS长期维护版，一路点`Next`安装完成

CMD下查看Node、Npm版本信息

```shell
# 查看node版本
node -v
v18.12.1
# 查看npm版本
npm -v
8.19.2
```

初始化项目

```shell
# 切换到D盘
D:
# 创建vuepress目录
mkdir vuepress
# 进入vuepress目录
cd vuepress
# 一直按回车即可
npm init
# 安装
npm install -D vuepress@next
# 或
npm config set registry http://registry.npmmirror.com
npm install pnpm -g
pnpm init
pnpm add -D vuepress@next @vuepress/client@next vue
```

文件夹根目录打开`package.json`，替换掉原先scripts内容

```json
"scripts": {									
    "docs:dev": "vuepress dev docs",           
    "docs:build": "vuepress build docs"         
}
```

以下内容可选

```json
"author": "passwordgloo@163.com",

"keywords": [
    "foresee",
    "igloo",
    "vuepress"
],
   
"homepage": "https://github.com/passwordgloo/passwordgloo.github.io",
"repository": {
    "type": "git",
    "url": "https://github.com/passwordgloo/passwordgloo.github.io.git"
},
```

新建`docs`文件夹，在内部新建`README.md`

Markdown文件开头可以设置YAML Frontmatter。代码两端使用`---`隔开，你可以理解为当前文档的属性信息，后面是自己写的内容，遵循[Markdown语法](https://markdown.com.cn/basic-syntax/)

```yaml
---
home: true
heroImage: https://vuepress.vuejs.org/hero.png
actions:
  - text: 开始学习
    link: /guide/start.md
    type: primary
  - text: vue3
    link: /vue3/base
    type: secondary
features:
- title: 静态博客
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + vite 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress2.0 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2023 壹拾陆
footerHtml: true
---
```

| 名称      | 含义                             |
| --------- | -------------------------------- |
| home      | 判断是否是首页                   |
| heroImage | 首页logo图                       |
| heroText  | 首页标题                         |
| actions   | 按钮，text和link可以多个         |
| features  | 文档分栏，title和details数量自定 |
| footer    | 文档底部板块                     |

CMD输入`pnpm docs:dev`

发现logo图片没有正确加载吗？在`.vuepress`文件夹(此时已经存在)内新建`public`文件夹，放入`favicon.png`文件



## 配置

### YAML Frontmatter

> Markdown文件开头可以设置YAML Frontmatter。代码两端使用`---`隔开
>
> 使用sidebar:auto自动显示侧边栏标题

```yaml
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
sidebar: auto
---
```



### Config.ts

> `.vuepress`文件夹内新建`config.ts`，官方推荐使用typescript编写

```js
// https://theme-hope.vuejs.press/zh/
// https://vuepress-theme-reco.recoluan.com/

import { defineUserConfig } from "vuepress";

import { defaultTheme } from "@vuepress/theme-default";

// npm i -D @vuepress/plugin-search@next
// 为你的文档网站提供本地搜索能力。
// https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
import { searchPlugin } from '@vuepress/plugin-search'

// npm install -d vuepress-plugin-anchor-right
// vuepress右侧小目录 二级目录
// https://www.cnblogs.com/dingshaohua/p/16618802.html
import vuepressPluginAnchorRight from 'vuepress-plugin-anchor-right';

// npm i -D vuepress-plugin-copy-code2
// 提供代码复制按钮
// https://vuepress-theme-hope.gitee.io/v2/copy-code/zh/
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default defineUserConfig({
  lang: "zh-CN",
  title: "壹拾陆",
  description: "这是壹拾陆的博客网站",
  plugins: [
    // 为你的文档网站提供本地搜索能力。
    searchPlugin({
      // 配置项
    }),
    [vuepressPluginAnchorRight()],
    copyCodePlugin({
      // 插件选项
    }),
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: "Linux",
        link: "/guide/",
      },
      {
        text: "Vuepress",
        link: "/vuepress/",
      },
      {
        text: "Linux",
        children: [
          {
            text: "分组",
            children: [{ text: "子项1", link: "/guide/start.md" },{ text: "子项2", link: "/vue3/base.md" }],
          },
        ],
      },
    ],
  // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    // sidebar: 'auto',
    sidebar: {
      '/guide/': [
        {
          text: "监控工具",
          // collapsible: true,
          children: [
            { text: "Zabbix", link: "/guide/start.md" },
            { text: "Promethus", link: "/guide/starts.md" },
          ],
        },
        {
          text: "Web服务",
          // collapsible: true,
          children: [
            { text: "Nginx", link: "/vue3/base.md" },
            { text: "Apache", link: "/vue3/base.md" },
          ],
        },
        {
          text: "后端服务",
          // collapsible: true,
          children: [
            { text: "PHP", link: "/vue3/base.md" },
            { text: "Tomcat", link: "/vue3/base.md" },
          ],
        },
      ],
      '/guids/': [
        {
          text: "Linuxs",
          collapsible: true,
          children: [
            { text: "Zabbix", link: "/guide/start.md" },
            { text: "Nginx", link: "/vue3/base.md" },
            { text: "PHP", link: "/vue3/base.md" },
          ],
        },
      ],
      '/vue3/': [
        {
          text: "vue3基础",
          children: [{ text: "基础1", link: "/guide/start.md" },{ text: "基础2", link: "/vue3/base.md" }],
        },
      ],
    },
    // sidebarDepth: 3,
  }),
});
```



### vuepress-plugin-md-enhance

> 提供更强的Markdown支持，诸如段落对齐、Tex语法、上下角标、代码块分组等新功能

**安装**

```shell
yarn add -D vuepress-plugin-md-enhance@next
```

**配置**

```js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 你的选项
    }),
  ],
};
```



### search

> search会根据你的页面，在本地生成搜索索引，页面多的话，加载速度会慢

**安装**

```shell
yarn add -D @vuepress/plugin-search@next
```

**配置**

```js
import { searchPlugin } from '@vuepress/plugin-search'

export default {
    plugins: [
        searchPlugin({
            locales: {
                '/': {
                    placeholder: 'Search',
                },
                '/zh/': {
                    placeholder: '搜索',
                },
            },
        }),
    ],
}
```



### docsearch

> 访问[DocsSearch](https://docsearch.algolia.com/apply/)提交网站URL，审核通过后DocSearch团队会将`apiKey`和`indexName`发送到你的邮箱

**安装**

```shell
yarn add -D @vuepress/plugin-docsearch@next
```

**配置**

```js
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // 配置项
    }),
  ],
}
```



### 目录结构

```shell
├── dist				
├── node_modules	    
├── docs                 存放文章，可以改名
|  ├── .vuepress		 
|  |  ├── config.ts      配置
|  |  ├── public        【静态资源】
|  |  └── styles        【自定义样式】		 
|  ├── Guide            【子版块】文件夹，名字任意
|  |  └── README.md     【子版块】首页
|  ├── README.md        【主页】
|  └── zh				 配置多语言，名字任意，可选
|     └── README.md      对应语言首页
├── package.json
├── deploy.sh		     Github【部署方式1】
├── .github				 Github【部署方式2】
|  └── workflows	     
|     └── main.yml       
├── .gitignore           git忽略目录
```



### 方案1 deploy.sh

1️⃣ 根目录新建`deploy.sh`，名字任取

```shell
#空项目预置环境

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd dist


# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A

git commit -m "initial commit"
# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

2️⃣ 终端打开Git，输入`./deploy.sh`



### 方案2 Github Action

#### Token

1️⃣ 登录[Github](https://github.com/)，点击右上角头像选择Settings

2️⃣ 依次选择Developer setttings>Personal access tokens，点击`Generate new token`创建Token

⚠️ Token只会显示一次，请记得保存

#### 仓库设置

1️⃣ 新建仓库

2️⃣ 仓库点击`Settings`>`Secerts>Actions`，输入刚刚保存好的Toke

#### Github Action

1️⃣ workflows文件下下新建`docs.yml`文件，名字任意

```yaml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # Token名称必须与仓库Token名称相同
          GITHUB_TOKEN: ${{ secrets.Vuepress_Token }}
```

2️⃣ 根目录创建`.gitignore`文件，输入

```shell
#ide
*.DS_Store
.idea
.vscode

#npm
package-lock.json
yarn.lock

#build result
dist
lib
.vuepress/temp
.vuepress/cache

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime config
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL History
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

#lerna-changelog
.changelog

#vscode history extension
.history
```

