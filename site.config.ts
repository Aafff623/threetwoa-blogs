import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://threetwoa-blogs.vercel.app/',
  lang: 'zh-CN',
  title: "threetwoa's digital garden",
  subtitle: '记录代码、架构与 AI 工作流的数字花园。Code less, Architect more.',
  author: {
    name: 'threetwoa',
    avatar: '/avatar.jpg',
  },
  description: 'threetwoa 的数字花园，记录关于代码、架构与 AI 工具复用的思考。Code less, Architect more. Turning AI tools into reusable, production-ready workflows.',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/Aafff623',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'E-Mail',
      link: 'mailto:laiyif68@gmail.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: true,
    provider: 'fuse',
  },

  fuse: {
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
      ignoreLocation: true,
    },
  },

  // 关闭自带的图片预览
  mediumZoom: {
    enable: false,
  },

  // 赞助入口已关闭
  sponsor: {
    enable: false,
  },

  // 开启评论（由 Giscus + GitHub Discussions 提供）
  comment: {
    enable: true,
  },
})
