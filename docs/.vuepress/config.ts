
import { defaultTheme } from 'vuepress'

// 添加一个 返回顶部 按钮
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'

// npm i -D @vuepress/plugin-search@next
// 为你的文档网站提供本地搜索能力。
// https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
import { searchPlugin } from '@vuepress/plugin-search'

// npm i -D vuepress-plugin-copy-code2
// 提供代码复制按钮
// https://vuepress-theme-hope.gitee.io/v2/copy-code/zh/
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  lang: "zh-CN",
  title: "壹拾陆",
  description: "这是壹拾陆的博客网站",
  plugins: [
    backToTopPlugin(),   // 添加一个 返回顶部 按钮
    copyCodePlugin(),    // 添加一个 代码复制 按钮
    searchPlugin({       // 为你的文档网站提供本地搜索能力。
      locales: {         // 配置项
        '/': {
          placeholder: '搜索',
        },
      },
      maxSuggestions: 5,  // 指定搜索结果的最大条数 5
    }),
  ],
  markdown: {
    code: {
      lineNumbers: false,  // 关闭 代码块行号
    }
  },
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: 'Prometheus',
        link: '/prometheus/',
      },
      {
        text: "Kubernetes",
        link: "/kube/",
      },
      {
        text: "Linux",
        link: "/linux/",
      },
      {
        text: "Vuepress",
        link: "/vuepress/",
      },
    ],
    sidebar: 'auto',
    sidebarDepth: 2,
  }),
}