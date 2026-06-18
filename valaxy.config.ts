// import type { UserThemeConfig } from 'valaxy-theme-sakura'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
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
  },

  unocss: { safelist },
})
