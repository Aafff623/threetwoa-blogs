# ADR-0000 · 采用 Architecture Decision Records

## Status

Accepted · 2026-08-04

## Context

本仓已有 Valaxy SSG 博客与既有 ADR-0001（本地搜索）、ADR-0002（相册 WebDAV 代理），并经历 Agent 资产规范演进（`LANGUAGE.md` → `LANGUAGES.md`、媒体进 `assets/`、`docs/outputs/` 复数等）。需要固定「重要架构取舍写在哪里、怎么命名、如何处理冲突」。

## Decision

1. 采用 ADR：重要架构权衡写入 `docs/adr/000N-kebab-title.md`。  
2. 本文件（0000）声明制度本身；既有 0001 / 0002 继续有效；后续序号递增。  
3. 新决策与既有 ADR 冲突时，在新 ADR 中显式写 `Contradicts ADR-000N`，禁止默默覆盖。  
4. 领域术语仍以根 `CONTEXT.md` 为单一事实源；ADR 记**权衡与后果**，不复制术语表。

## Consequences

- Agent / 人类改架构前先扫 `docs/adr/`。  
- 小修小补不必写 ADR；主题依赖钉死、CI 包管理统一、canonical URL、WebDAV 多平台适配等应落 ADR。  
