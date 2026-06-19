// import type { UserThemeConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'
import { vaFoucLoader } from './plugins/va-fouc-loader'
import { albumWebdavConfigPlugin } from './plugins/album-webdav-config'
import { albumWebdavProxy } from './plugins/album-webdav-proxy'
import siteConfig from './site.config'

// add icons what you will need
const safelist = [
  'i-ant-design:home-filled',
  'i-ant-design:compass-filled',
  'i-ant-design:container-filled',
  'i-ant-design:appstore-filled',
  'i-ant-design:tags-filled',
  'i-ant-design:idcard-filled',
  'i-ant-design:picture-filled',
  'i-fa-file-text-o',
  'i-mdi-access-time',
]

/**
 * User Config
 */
export default defineValaxyConfig({
  // site config see site.config.ts

  theme: 'sakura',

  themeConfig: {
    // 分类页样式：list 列表 / chart 环状图（玫瑰图或旭日图）
    categories: {
      style: 'chart',
    },

    // 归档页样式：list 时间线 / chart 发布统计折线面积图
    archives: {
      style: 'chart',
      startMonth: '2026-06',
    },

    // 标签页样式：list 按钮列表 / chart 柱状统计图
    tagsPage: {
      style: 'chart',
      chartLength: 10,
    },

    tags: {
      rainbow: false,
    },

    // 首页 Hero 配置
    hero: {
      title: "threetwoa's digital garden",
      motto: '记录代码、架构与 AI 工作流的数字花园。Code less, Architect more.',
      urls: ['/images/hero/hero-bg.jpg'],
      randomUrls: false,
    },

    // 首页公告栏配置
    notice: {
      rotateInterval: 5000,
      title: '公告栏',
      sections: [
        {
          label: '--- 主域名 ---',
          lines: [
            'threetwoa-blogs.vercel.app',
          ],
        },
        {
          label: '--- 备用域名 ---',
          lines: [
            'threetwoa-blogs-laiyif68-5443s-projects.vercel.app',
            'threetwoa-blogs-git-master-laiyif68-5443s-projects.vercel.app',
          ],
        },
      ],
    },

    // 导航页「随机网站跳转」抽卡视频：weight 越大越容易抽到
    navigation: {
      randomDrawVideos: [
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compressed.mp4',
          weight: 1,
        },
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compresseddbc6ff3507fddbf4.mp4',
          weight: 2,
        },
      ],
    },

    navbar: [
      {
        text: '首页',
        link: '/',
        icon: 'i-ant-design:home-filled',
      },
      {
        text: '归档',
        link: '/archives',
        icon: 'i-ant-design:container-filled',
      },
      {
        text: '分类',
        link: '/categories',
        icon: 'i-ant-design:appstore-filled',
      },
      {
        text: '标签',
        link: '/tags',
        icon: 'i-ant-design:tags-filled',
      },
      {
        text: '相册',
        link: '/gallery',
        icon: 'i-ant-design:picture-filled',
      },
      {
        text: '导航',
        link: '/navigation',
        icon: 'i-ant-design:compass-filled',
      },
      {
        text: '关于',
        link: '/about',
        icon: 'i-ant-design:idcard-filled',
      },
    ],

    navbarOptions: {
      title: ['threetwoa', 'digital', 'garden'],
      tools: ['toggleDark', 'toggleLocale', 'search'],
    },

    footer: {
      runtimeSince: '2026-06-18',
    },
  },

  build: {
    ssgForPagination: false,
    foucGuard: {
      enabled: true,
      maxDuration: 5000,
    },
  },

  vite: {
    plugins: [vaFoucLoader({
      avatar: siteConfig.author?.avatar,
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      primary: '#E9CCCC',
    }), albumWebdavConfigPlugin(), albumWebdavProxy()],
  },

  unocss: { safelist },
})
