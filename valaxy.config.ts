// import type { UserThemeConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'
import { vaFoucLoader } from './plugins/va-fouc-loader'
import siteConfig from './site.config'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
  'i-ri-compass-3-line',
  'i-ri-archive-line',
  'i-ri-folder-2-line',
  'i-ri-price-tag-3-line',
  'i-ri-user-smile-line',
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
      startMonth: '2020-01',
    },

    // 标签页样式：list 按钮列表 / chart 柱状统计图
    tagsPage: {
      style: 'chart',
      chartLength: 10,
    },

    tags: {
      rainbow: false,
    },

    // 首页公告栏配置
    notice: {
      rotateInterval: 5000,
      title: '公告栏',
      sections: [
        {
          label: '--- 主域名 ---',
          lines: [
            'daily.yybb.us',
            'hexo.yybb.us',
          ],
        },
        {
          label: '--- 备用域名 ---',
          lines: [
            'vercel.yybb.us',
            'aiovtue.onrender.com',
            'aiovtue.zeabur.app',
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
        icon: 'i-ri-home-line',
      },
      {
        text: '归档',
        link: '/archives',
        icon: 'i-ri-archive-line',
      },
      {
        text: '分类',
        link: '/categories',
        icon: 'i-ri-folder-2-line',
      },
      {
        text: '标签',
        link: '/tags',
        icon: 'i-ri-price-tag-3-line',
      },
      {
        text: '导航',
        link: '/navigation',
        icon: 'i-ri-compass-3-line',
      },
      {
        text: '关于',
        link: '/about',
        icon: 'i-ri-user-smile-line',
      },
    ],

    navbarOptions: {
      title: ['Valaxy', 'Theme', 'Yun'],
      tools: ['toggleDark', 'toggleLocale', 'search'],
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
    })],
  },

  unocss: { safelist },
})
