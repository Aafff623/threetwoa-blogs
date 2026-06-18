---
title: 从 AI 提示词到可复用工作流
date: 2026-06-19
updated: 2026-06-19
cover: /images/posts/ai-workflow.jpg
categories: AI 工作流
tags:
  - ai
  - workflow
  - prompt-engineering
  - automation
top: 2
---

过去一年，AI 工具从「玩具」逐渐变成「生产力工具」。但真正的瓶颈往往不是模型本身，而是如何把一次次好的提示词、好的调用方式，沉淀成可以反复使用的流程。

## 什么是可复用工作流

可复用工作流不是简单的 prompt 收藏夹，而是把输入、处理、输出、校验封装成稳定的单元：

- 输入标准化：把模糊需求变成结构化字段
- 处理模块化：每个步骤只负责一件事
- 输出可验证：有明确的判断标准

## 小助手出场

Saku-chan 也会帮忙盯着这些工作流：

<video controls loop playsinline width="100%" style="border-radius: 12px;">
  <source src="/videos/saku-ai-workflow.mp4" type="video/mp4">
  你的浏览器不支持视频播放，可以 <a href="/videos/saku-ai-workflow.mp4">点击下载</a>。
</video>

## 一个小例子

把「帮我写一段周报」变成：

1. 收集本周完成的任务列表
2. 按项目/优先级分类
3. 生成三段式周报文本
4. 自动检查是否遗漏高优先级事项

这样每次只需要更新任务列表，就能得到一致风格的输出。

## 下一步

我会把这个博客里的一些重复性工作——比如封面图生成、RSS 检查、内容归档——也逐步做成自动化工作流。
