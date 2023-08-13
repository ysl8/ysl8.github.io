export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"https://vuepress.vuejs.org/hero.png\",\"actions\":[{\"text\":\"开始学习\",\"link\":\"/guide/start.md\",\"type\":\"primary\"},{\"text\":\"Hexo\",\"link\":\"https://lsy8.asia\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"静态博客\",\"details\":\"以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\"},{\"title\":\"Vue驱动\",\"details\":\"享受 Vue + vite 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\"},{\"title\":\"高性能\",\"details\":\"VuePress2.0 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\"}],\"footer\":\"MIT Licensed | Copyright © 2023 壹拾陆\",\"footerHtml\":true},\"headers\":[],\"git\":{\"updatedTime\":1691914640000,\"contributors\":[{\"name\":\"ysl8\",\"email\":\"820205163@qq.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
