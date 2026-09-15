# 写文章与更新文章操作指南

适用对象：项目维护者。核对日期：2026-09-15。本文解释编辑顺序和实际文件入口；字段合同以 [CONTENT_MODEL](CONTENT_MODEL.md) 为准，命令统一在 [DEV_WORKFLOW：日常维护与发版入口](../DEV_WORKFLOW.md#日常维护与发版入口)，上线阶段接 [发版指南](PUBLISHING_GUIDE.md)。

## 先选这次的工作类型

| 你要做什么 | 主要工作 |
| --- | --- |
| 改错字、修来源链接 | 修改原文或原 Source，核对受影响事实和页面，检查后发版 |
| 实质更新一篇旧文 | 保留原 ID、slug、首发日期；重新核查受影响证据，填写真实更新日期，调整对应验收 |
| 写一篇新文章 | 新建内容与必要的来源/Claim/术语记录，完成 Hero 与审核，再接入合集和发布清单 |
| 新栏目、中文页面、正文插图或新功能 | 先定义独立需求，再落实相应内容和工程合同 |

目前是本地文件编辑，没有网页后台的“新建文章”按钮。当前校验器还固定着首发的 6 篇文章、13 个公开页面、首发日期和图片范围。**新文章、日期变化或新图片不能只靠改 Markdown 上线，需要同步维护验收清单。** 本文把这些工程衔接列在后面，不要求你在写作时顺手修改校验器。

## 文章从草稿到上线的顺序

```text
选题与版本边界 → 来源和关键陈述 → 英文稿 → 双语/事实/英文审核
              → Hero 与视觉审核 → 内容 ready → owner 批准 published
              → 本地与候选验收 → 正式发布
```

### 1. 先写一张选题卡

先用普通笔记回答这些问题，不急着填工程字段：

- 读者看完能回答哪个具体问题？
- 这篇依据哪一部作品、哪一个版本或哪类历史材料？
- 写人物、异兽、地点、故事还是指南？
- 属于神话、民俗、宗教、文学，还是历史人物传说？
- 放进哪个现有合集，读完后适合接哪一篇？
- 哪些问题证据不足，本篇暂不讨论？

新文章会新增页面和稳定身份，按 [REQUIREMENT_DEVELOPMENT](../REQUIREMENT_DEVELOPMENT.md) 在 `docs/requirements/` 建立对应需求，先查现有编号再取下一个。它记录题目、版本边界、来源、主图范围和验收，不记录聊天流水。普通错字修正无需单独新建需求。

### 2. 先找得到依据，再写文化事实

| 记录 | 白话含义 | 保存位置 |
| --- | --- | --- |
| Source | 我看的哪本书、哪个馆藏对象或网页 | `src/content/sources/*.yml` |
| Claim | 我要说的哪一句重要陈述，由哪里支持 | `src/content/claims/*.yml` |
| Terminology | 一个中文专名或术语，在本篇为什么这样译 | `src/content/terminology/*.yml` |
| Entry | 标题、开场、摘要、正文与上述记录的关联 | `src/content/entries/*.md` |

每条关键陈述至少能追到具体卷、篇、页码、行号或馆藏编号。记录网站标题、机构、URL 和真实访问日期；现代译本还要记录译者和版本。先查已有 Source，确实是同一对象/版本才复用，避免重复造记录。Claim 和 Terminology 有所属 Entry，不能直接拿别篇的记录 ID 当本篇记录；本篇引用的全部证据来源也要进入本篇书目。

分清“原文写了什么”“学者怎样解释”“后世怎样改编”。原典情节不能直接证明所有古人的信仰；AI 可以协助整理和起草，但不作为事实来源。证据没有闭合时，缩小论述范围或继续保持草稿，不填一个假日期或把 Claim 改成 verified 来过检查。

可对照这些已存在的文件学结构：

- [十王正文](../src/content/entries/ten-kings.md)：不同类型来源分别支持不同结论。
- [画皮正文](../src/content/entries/painted-skin.md)：单一文本版本、短译文与现代解释的边界。
- [促织 Claim](../src/content/claims/claim-fighting-cricket-levy-pressure.yml) 与 [术语记录](../src/content/terminology/term-shen-hua-in-fighting-cricket.yml)：所属文章、来源定位和审核字段的实际形状。
- [内容与引用字段合同](CONTENT_MODEL.md#2-核心对象)：Source、Claim、Terminology 的完整字段和状态。

复制记录时只借结构，不沿用别篇的对象 ID、证据结论、审核人、日期或批准状态。

### 3. 写英文稿，并放进 Entry

正文使用自然英文。专名首次出现的中文与拼音按项目风格和术语记录处理；`nameZh` 与 `pinyin` 必须成对填写或都为 null。当前不新增中文路由。

一篇文章的实际呈现顺序：

1. 标题与简短 subtitle。
2. 必要时有 1–2 句 Content note，提醒暴力等敏感内容。
3. `opening`：1–2 段开场，带出问题，不虚构原典引语或情节。
4. `summary`：80–120 个英文单词的 Quick Answer。
5. Markdown 正文：故事、来源解释、分歧与适用的现代接受。
6. 页面模板生成的 Sources、合集与 Related。

正文从第二级标题 `##` 开始组织，不重复写页面标题、opening 和 Quick Answer。来源链接与 locator 放在相关段落附近；不能只在页尾堆一份书目。历史人物文章还要分别说明史料记载、后世增添、神圣化/超自然化过程，结构见 [正文模板](CONTENT_MODEL.md#4-正文模板)。

文件名必须与 `entryId` 一致；`slug` 建议先取相同的小写连字符名字，例如草稿 `working-story.md`。当前文章 URL 形如 `/explore/painted-skin/`，移动合集不会改变 URL。发布后不要因改标题顺手改 ID 或 slug。

下面是**仅供建立草稿的字段模板**。把文件名、ID、slug、标题与文章类型改为本篇真实值，其余字段随研究补齐；保留 `draft`，不能直接用它发版。它故意没有虚构来源、图片或审核结果。

```yaml
---
entryId: working-story
slug: working-story
title: Working title
subtitle: null
entryType: tale
traditionType: null
nameZh: null
pinyin: null
aliases: []
contentNote: null
opening: []
summary: null
periodLabel: null
earliestKnownSourceId: null
earliestKnownClaimId: null
sourceIds: []
claimIds: []
terminologyRecordIds: []
relatedEntryIds: []
heroAssetId: null
publishedAt: null
updatedAt: null
lastFactCheckedAt: null
status: draft
---
```

将真实英文正文写在第二条 `---` 之后。YAML 使用空格缩进；长文字可用 `>-` 换行。空值用 `null`，列表用 `[]` 或逐项 `-`，不要增加 Schema 中不存在的字段。新增 draft 也会产生 review 路由；当前审稿清单固定为 14 页，因此保存后完整 check 可能因清单不同而失败。写作期间可先在项目外的个人笔记中保存正文，正式放入 Entry 时一并安排第 6 步的接线。

| 字段 | 填写规则 |
| --- | --- |
| `entryType` | `figure` / `creature` / `realm` / `tale` / `guide` |
| `traditionType` | `myth` / `folklore` / `religion` / `literature` / `historical-legend`；编辑审核前必须确认 |
| `sourceIds` / `claimIds` / `terminologyRecordIds` | 填记录中的稳定 ID，不填文件路径；内容必须确实适用于本篇 |
| `earliestKnownSourceId` / `earliestKnownClaimId` | 两者成对；不能把“自己找到的最早一条”写成历史最早，达不到合同就都留 null |
| `heroAssetId` | 逻辑资产 ID，不是图片文件名；草稿可为 null |
| `publishedAt` | owner 批准的目标公开日，形如 `2026-10-05`；不是自动填的构建日 |
| `updatedAt` | 首发为 null；以后真实公开更新时填写，不能早于首发日 |
| `lastFactCheckedAt` | 实际完成事实核查的日期，进入 ready 前必填 |

未来的 `publishedAt` **不是定时发布功能**：当前 public 投影主要按状态选择内容。文章设为 published 后可进入构建，不会靠日期替你等到某天再公开。

### 4. 审稿并准备主图

逐段核对事实和附近出处，核对中文原文与英文译意，再读一遍自然英文。ready 至少需要一个结构化 Claim，术语达到 bilingual-approved；中文 Source 标题也须完成核对，并使用准确的 `zh-Hans` / `zh-Hant`，不能保留笼统的 `zh`。需要人工确认的双语内容和术语不能用 AI 自评代替；独立英语读者验证另按 010/011 进行，不把“自己读过”写成已获得真人样本。

当前阅读版 MVP 以文章和各自主图为范围，正文插图与完整社交卡包后移。新文章的最小视觉交付可沿用 Hero 方式，具体在该篇需求里确认；不必在写作开始时把全部社交素材做完。

Hero 不是把一张图片拖进文件夹就结束：

| 文件 | 记录内容 |
| --- | --- |
| `visual/briefs/*.yml` | 想画什么、哪些有证据、哪些是艺术处理、不得出现什么 |
| `visual/production-records/*.yml` | 实际工具/模型、输入权利、人工修改和制作过程 |
| `visual/manifests/*.yml` | 资产身份、版本、用途、尺寸/摘要、审核、alt、caption、credit 与 AI 披露 |
| `src/assets/images/` | 经审核的正式图片文件；不放模型权重、探索废图和巨大工作母版 |

参考 [画皮 Hero manifest](../visual/manifests/asset-painted-skin-hero-primary-v1.yml) 和 [视觉审核门禁](CONTENT_MODEL.md#63-审核门禁)。检查人物肢体、伪文字、时代器物、参考与生成结果的使用权；看桌面和手机裁切。只有通过人工审核的唯一 current/approved 版本才能供 ready/published 文章使用。不要直接覆盖旧版图片或把新图绑定到别篇 Hero。

### 5. 接入阅读路径，推进内容状态

在适用的 `src/content/collections/*.yml` 的 `entryIds` 中安排成员和阅读顺序。比如 [聊斋合集](../src/content/collections/liaozhai.yml)。`featuredEntryId` 决定合集精选内容；只有本次确实要替换精选时才改。首页还有独立策展规则，新文章不会自动成为首页 Featured；需要调整时核对 `src/site/public-assembly.ts` 及相关页面验收。

文章内的 `relatedEntryIds` 负责“读完接着看什么”。不要在 Entry 增加 `collectionIds`：所属合集由 Collection 反向生成。所有拟公开关系都必须指向符合公开要求的真实对象，不能把草稿塞进已发布合集强行露出。

| 状态 | 含义 |
| --- | --- |
| `draft` | 研究和写作中，可以明确保留空值 |
| `editorial-review` | 类型、开场、80–120 词摘要、可见正文和真实来源已具备 |
| `visual-review` | 编辑基础具备，Hero 已可供审核 |
| `ready` | 编辑、事实、术语、关系和批准视觉资产全部达到内容门槛 |
| `published` | owner 批准进入 public 候选，日期与关系完整；仍需构建和部署 |
| `archived` | 保留完整历史并退出公开路由；下线与链接影响需另行处理 |

### 6. 补齐工程衔接，再走发版

以下是当前代码中的实际检查点。新增文章时交给维护代码的人逐项核对；它们不是让你删测试或把限制改成任意通过。

| 变化 | 需要核对的入口 |
| --- | --- |
| 新增公开路径、合集成员、首发/更新日期 | [public-output-policy.mjs](../scripts/public-output-policy.mjs)；当前锁定首发日期与“无更新日期” |
| 新增草稿或其他 review 路由 | [font-specimen-policy.mjs](../scripts/font-specimen-policy.mjs) 的审稿 HTML 清单；草稿阶段也适用 |
| 新增审稿页面、成员和 Hero family | [verify-m4-u2-output.mjs](../scripts/verify-m4-u2-output.mjs) |
| 新增或换版 Hero 的本地源文件 | [page-image-module-registry.ts](../src/visual/page-image-module-registry.ts) 的精确图片导入与映射，以及 [hero-output-policy.mjs](../scripts/hero-output-policy.mjs) 的受影响图位校验 |
| 新 Hero、图片数量、正文提示、发现文件等 | [verify-public-output.mjs](../scripts/verify-public-output.mjs) 与匹配测试 |
| 新增中文字符或新的字体覆盖需求 | [字体生产与覆盖门禁](../DEV_WORKFLOW.md#cjk-字体子集生产)；不能用隐式 fallback 掩盖缺字 |
| 页面路径、客户端输出或统计配置受影响 | [analytics-output-policy.mjs](../scripts/analytics-output-policy.mjs)、[rum-output-policy.mjs](../scripts/rum-output-policy.mjs) 与受影响测试；路径验收不意味着要新建 RUM 窗口 |

本地 review/public、Sources/Related、Sitemap/RSS、桌面手机阅读和必要的无障碍验证通过后，按 [发版指南](PUBLISHING_GUIDE.md) 保存干净提交、准备新冻结包并发布。未来篇数、页面数、文件数应由本次实际清单确定，不能沿用“6 篇/13 页/141 文件”冒充新文章验收。

## 更新旧文章时特别注意

- 改标题可以保留原 URL；更改已公开 slug 或下线文章，需要显式处理重定向与站内链接。
- `publishedAt` 保留原首发日。实质公开修改填写真实 `updatedAt`，完成事实复核后才更新 `lastFactCheckedAt`。
- 修改某条 Source 前检查哪些文章、Claim、术语或图像也引用它，不把所有相关文章的日期一起改成今天。
- 新图片使用新版本与真实制作/审核记录，保留可追溯旧版。
- 当前日期验收仍锁定首发状态，第一次公开更新日期也需要调整相应校验，不能为了过检查隐瞒真实更新。

## 你交给协作者时可以这样说

> 本次只做一篇文章，先整理选题范围、可核查的来源与关键陈述，再写英文稿。我会确认双语/文化内容与 Hero。请沿现有 Entry/Source/Claim/Terminology 合同接线，列清新页面、合集、日期、图片和验收清单的影响；准备到本地可审阅，不直接修改线上或发布。

## 文章交稿清单

- [ ] 读者问题明确，文本版本与论述边界清楚。
- [ ] 来源真实可访问，重要陈述有 locator，译文/解释/改编分开。
- [ ] 开场、Quick Answer、正文、Content note 和必要术语审核完成。
- [ ] Hero 权利、人工审核、alt/图注/披露和正式导出完整。
- [ ] ID、slug、日期、合集与 Related 正确；没有照抄旧对象批准状态。
- [ ] 本篇新增路径、日期、图片及字体等适用检查已同步，匹配验证通过。
- [ ] owner 批准公开，正式站点核验通过，发布记录已保存。
