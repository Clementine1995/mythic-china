# 009 两个合集的本地阅读路径

## 0. 状态与权威边界

第 1–7 节保存 009 当批合同与历史结果。后续 Hero、Featured、分类、Related、ready 审核及独立首发批准由 [012](012-five-hero-visual-briefs.md) 负责：六篇/两个合集现均 published，六篇目标公开日期统一为 2026-09-10；尚未部署，Liaozhai Featured 为 Painted Skin，两个三篇顺序不变，Related 输出仍 published-only，当前六篇各显示一个既定目标；索引为六篇/两个合集的非空列表，不再展示未发布候选架。009 的无 Hero/Featured 限制不覆盖后续独立授权。

| 项目 | 当前状态 |
| --- | --- |
| 需求 | 已确认 |
| 本地实现 | 已完成 |
| 自动验证 | 已完成；固定运行时完整结果见第 6 节 |
| 人工审核 | Project owner 已分两次确认四篇草稿均通过人工双语审核；六份 Terminology 均为 `bilingual-approved`，Painted Skin 短译 Claim 为 `verified` |
| 发布 | 未授权；published Entry / Collection 仍为 0/0 |

本文件记录 Project owner 于 2026-09-05 授权的两个 Collection 本地阅读路径，以及随后针对 ID/slug 分离和输出唯一性的校验加固。基线提交为 `119c01c2937e4598e66c0e5886ddc917e78af143`；实际实现与审核对象是该提交之上的当前工作树。Painted Skin 在本接线批结束时仍为空，后续单见证内容批记录于 [008 第 5.10 节](008-four-entry-claim-maps.md#510-2026-09-05-青柯亭单见证补缺与首稿)；项目当前事实还须与 README、内容文件、匹配测试及执行前只读核查共同确认。

## 1. 目标与不做

将 007 已确认的 3+3 分配和顺序接入现有 Collection 合同，只形成 direct-only、`noindex, nofollow` 的本地 review 路径。该接线不提升任何内容状态，不创建 public artifact，不补写 Painted Skin，不新增图片、Featured、`relatedEntryIds`、依赖、Schema、样式或运行配置。

## 2. 内容与身份合同

- 新建 `liaozhai` Collection，文件为 `src/content/collections/liaozhai.yml`，当前 `collectionId` 与 `slug` 的值恰好都为 `liaozhai`，公开路径为 `/collections/liaozhai/`。二者是不同字段：稳定 ID 只承担内部关系身份，slug 只承担 URL；校验不得从 ID 推导路径。
- 工作标题为 `Strange Tales from Liaozhai`。这是一项本地编辑选择，不表示标题已经人工批准。
- Liaozhai `entryIds` 精确为 `liaozhai-reading-guide` → `painted-skin` → `fighting-cricket`。description 只说明阅读路径；状态为 `draft`，中文名、拼音、Featured 与 Hero 留空。
- `chinese-underworld.entryIds` 精确为 `chinese-underworld-guide` → `ten-kings` → `zhong-kui`。既有 `editorial-review` 状态、Featured Zhong Kui、文字和资产保持。
- 合集成员只由 `Collection.entryIds` 定义，Entry 反向入口由现有模板派生。成员关系不表示历史身份或证据互相适用。
- 六篇 Entry 的稳定身份与状态保持；原有两篇 Related 关系保持，四篇新增 Related 当时为空。本接线批结束时 Painted Skin 虽进入策展路径，仍是没有正文、证据消费关系或图片的显式 empty draft；后续内容批已补正文与证据关系，仍不改变本段所记录的 009 授权范围。

## 3. 页面行为

复用现有 `CollectionTemplate` 与 review projection，新增一个 Liaozhai direct review 合集页，使当前输出为 14 页。Explore 的固定阴间 review 候选按新顺序包含 Ten Kings；Collections 的固定 review 候选仍只显示 Chinese Underworld，Liaozhai 不进入全局导航、该候选架或 public 投影。

## 4. 文件职责

- `src/content/collections/chinese-underworld.yml` 与 `src/content/collections/liaozhai.yml` 保存两个精确三篇顺序及各自状态/资产边界。
- `scripts/font-specimen-policy.mjs` 固定 14 个预期 review 输出路径。
- `scripts/review-output-policy.mjs` 提供可由测试直接调用的合同索引与 DOM 断言：Collection/Entry 的 ID、`outputPath`、`href` 分别全局唯一；每个合集只能有一个 guided-path section、一个对应 heading、一个 ordered list，每个 list item 只能有一个链接，并且链接集合和顺序必须精确；每篇成员 Entry 只能有一个合集反向 nav、一个对应 heading、一个 list item 和一个精确合集链接。
- `scripts/verify-m4-u2-output.mjs` 以一个显式关系合同声明两个合集及六篇 Entry 的稳定 ID、独立 `outputPath` 和独立 `href`，并从该合同派生 Collection/Entry 身份映射，不从 ID 拼接 URL；同时保留 Liaozhai 不得借用 Hero/Featured 的门禁。
- `tests/site/review-output-policy.test.mjs` 覆盖 ID 与公开 slug 不同仍可通过，以及重复合同字段、顺序错误、漏项、错误链接、额外查询、重复 section/nav/heading/list、畸形重复 nav 和 list-item 语义错误必须失败。
- README、CONTENT_MODEL、PRODUCT、ARCHITECTURE、007、008 与 DEV_WORKFLOW 区分 13 页/1 Collection 的历史快照和当前 14 页/2 Collection 事实。

## 5. 验收标准

1. 两个 Collection 的 `entryIds` 顺序与渲染链接顺序完全一致。
2. 六篇成员 Entry 各有且仅有一个指向所属 Collection 的反向入口；不存在漏项、错归属、重复 DOM 或额外查询/片段形式。
3. ID 与 slug/URL 分离；即使值不同，校验仍按显式路径合同工作。
4. Liaozhai 无 Hero、Featured 或借用其他合集资产；本接线批允许 Painted Skin 以 empty draft 出现，后续草稿不得借内容变化添加资产或提升状态。
5. 内容图、状态矩阵、release 空态、字体、图片、交互和输出资源门禁保持。
6. 固定 Node/Corepack 的完整 `pnpm run check` 通过，且 `git diff --check` 与权威 Markdown 验证通过。

## 6. 实施与验证结果

两个 Collection YAML、输出路径清单和关系校验已经按上述合同实现。原先对可重建 `dist` 做的一次性破坏检查已由可重复的 parse5 DOM 单元测试取代；该测试可直接证明重复身份、错误顺序、漏项、错误链接、畸形列表和重复结构会失败，也证明内部 ID 不承担 URL 身份。

固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/351 项测试、Astro 81 个文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。三篇纠偏稿的仓库外审核包随后从当前工作树重新生成并锁定输入哈希。

Project owner 于 2026-09-05 明确确认该审核包通过人工双语审核；十王、`身化` 与 `zhiguai` 三份 Terminology 因此提升为 `bilingual-approved`。该确认只关闭当前三篇稿件的双语语言与术语门禁，不提升 Entry/Collection 状态，也不覆盖目标读者、视觉、浏览器或发布验收。审核包同步记录确认结果并刷新受影响输入哈希；Painted Skin 不在本次通过范围内。

009 完成后的独立内容批为 Painted Skin 建立 2 Source / 7 Claim / 1 Terminology 的青柯亭单见证草稿；该术语按页 74 实页记录为 `業魅`，与 Tso `孽魅`、CText 关联未具名见证 `孽鬼` 分开。它复用同一 Entry 身份和已接好的 Collection 关系，没有修改路径、模板、关系校验、Hero、Featured、`relatedEntryIds` 或状态。Project owner 于 2026-09-06 又确认该篇人工双语审核通过，短译 Claim 因此提升为 `verified`，`業魅` Terminology 提升为 `bilingual-approved`；Entry 继续为 `draft`，且不改变第 5 节所记录的前三篇独立通过范围。

自动检查不能替代真实浏览器、键盘、视觉、古汉语或目标读者审核；两个 Collection 对象存在也不等于两个可发布合集已经完成。

## 7. 发布与版本状态

本批未安装依赖、启动服务、调用真实接口、执行 Git 写操作或发布。009 及后续内容已进入 `f81b49f`，五组 Hero 进入 `1be085b`；当前 VB6 为后者上的未提交工作树。该历史批次不追认后续授权；preview 与 production 继续逐次授权。
