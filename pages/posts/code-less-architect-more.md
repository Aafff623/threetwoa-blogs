---
title: 少写代码，多搭架构
date: 2026-06-19
updated: 2026-06-19
cover: /images/posts/code-less-architect-more.jpg
categories: 技术思考
tags:
  - architecture
  - best-practices
  - engineering
top: 4
---

> Code less, Architect more.

这句话不是鼓励不写代码，而是提醒自己在动手之前，先想清楚结构、边界和复用点。

## 代码是负债，架构是资产

每多一行代码，就多一行需要维护、测试和解释的内容。好的架构通过清晰的抽象减少重复决策，让新增功能变得便宜。

## 守护士

Saku-chan 也会站在架构城堡前帮忙把关：

<video controls loop playsinline width="100%" style="border-radius: 12px;">
  <source src="/videos/saku-architect.mp4" type="video/mp4">
  你的浏览器不支持视频播放，可以 <a href="/videos/saku-architect.mp4">点击下载</a>。
</video>

## 我常用的几个原则

1. **先定义问题，再选工具**：不要被某个框架牵着走
2. **接口优先**：先把模块之间的契约定下来
3. **延迟实现**：在不确定时保留扩展点，而不是过早优化
4. **自动化验证**：让测试和类型系统替你守住底线

## 实践中的平衡

完全不写代码的架构是空中楼阁；但只顾埋头写代码，很容易陷入「用更多代码解决代码带来的问题」的循环。找到那个平衡点，是工程师的长期功课。
