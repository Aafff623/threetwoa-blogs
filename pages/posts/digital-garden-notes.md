---
title: 数字花园的搭建笔记
date: 2026-06-19
updated: 2026-06-19
cover: /images/posts/digital-garden.jpg
categories: 站点搭建
tags:
  - digital-garden
  - valaxy
  - static-site
top: 3
---

与其说这是一个博客，不如说它是一个**数字花园**（Digital Garden）：不追求每篇都完美，而是把思考、草稿、成文和链接种在一起，让它们自然生长。

## 为什么选择 Valaxy

- 基于 Vite + Vue，组件化程度高
- 文件系统路由，写 Markdown 就能生成页面
- 主题系统成熟，Sakura 主题的视觉风格很讨喜

## 花园日常

Saku-chan 也在帮忙照料这片花园：

<video controls loop playsinline width="100%" style="border-radius: 12px;">
  <source src="/videos/saku-garden.mp4" type="video/mp4">
  你的浏览器不支持视频播放，可以 <a href="/videos/saku-garden.mp4">点击下载</a>。
</video>

## 目前的站点结构

- 首页：Hero + 公告栏 + 文章列表
- 归档 / 分类 / 标签：用图表展示内容分布
- 相册：用 WebDAV 拉取远程图片
- 导航：收藏常用站点 + 随机抽卡
- 关于：个人介绍与联系方式

## 还会折腾什么

- 更完善的搜索索引
- 评论系统
- 文章封面的自动生成与压缩

慢慢来，花园需要时间。
