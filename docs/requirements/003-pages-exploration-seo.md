# 003 页面、探索与 SEO：开发与验收说明

## 0. 文档职责与状态

本文负责：

- 固定 M4 的页面职责、公开 URL、内容状态到路由/索引的投影、SEO 输出、首个真实纵切片、实施单元和验收门禁。
- 把 Home、Explore、Collections、Collection、Entry 与 About / Editorial Method 连接到既有内容图和视觉资产 resolver，而不改变稳定内容身份。
- 明确区分本地评审输出、可部署静态输出、页面级视觉批准与最终发布授权。

本文不负责：

- 批准 M1 原型、仓库外 A/C 方向稿、M3 图片在具体页面中的使用、正式字体、最终页面或发布。
- 撰写钟馗完整英文正文、补齐第二个 Collection、批量生产 M6 内容或新增视觉资产。
- 实现 newsletter、Reader Request、分析、站内搜索、账号、评论、部署或发布。

上位规格：

- [产品合同](../PRODUCT.md)
- [设计合同](../DESIGN.md)
- [竞品审计](../COMPETITIVE_AUDIT.md)
- [架构合同](../ARCHITECTURE.md)
- [内容模型](../CONTENT_MODEL.md)
- [MVP 总合同](001-mvp-foundation.md)
- [M3 视觉资产合同](002-visual-asset-pipeline.md)

运行与验证命令以 [DEV_WORKFLOW.md](../../DEV_WORKFLOW.md) 为唯一来源。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | 已确认 | Project owner 于 2026-08-29 明确确认 M4 合同第 1–9 项并分别授权 U2、U3；U4-U5 仍须逐项授权 |
| 实施状态 | M4-U1、M4-U2 与 M4-U3 已完成 | U3 已交付纯 published-only release 投影、fixture、真实空状态和静态导航/无 JS 输出门禁；public build 继续失败 |
| 验证状态 | U1 文档、U2 页面方向与 U3 自动门禁通过 | 14 个测试文件/90 项测试、Astro 55 文件零诊断、7 页/14 个 v2 图片输出通过；U2 的 7 页三档实际视口无阻塞布局或溢出，正式字体、真实键盘和 U5 完整门禁未执行 |
| 发布状态 | 不适用 | 当前没有站点 origin、托管项目、预览环境、生产环境或发布授权 |

- 当前权威结论更新时间：2026-08-29。
- 当前提交基线：`5f327b63f7a227e54773718d140e7295ef6ed3c9`（`M4-u2 completed`）；U2 主体历史基线为 `8c6d12cabce11741bb83941904993f4d8831c818`，M3 历史基线为 `c606f5aab92d908ff2935c5b7212ad5066636a50`。
- U3 写入前，HEAD、`main` 与本地 `origin/main` 均指向当前提交基线，工作树干净。当前 U3 release 投影、测试、输出 verifier 与收口文档改动未提交；未执行 fetch，因此不能据此证明服务器端分支状态。

## 1. 结论与开发就绪判断

- 一句话结论：先冻结发布投影和首个真实纵切片，再以 noindex 的本地评审页面关闭共享表现层；不得一次铺开批量内容或把资产批准写成页面批准。
- 是否可以进入下一单元开发：否。M4-U3 已完成本地实施和验证；当前授权不自动延伸至 U4-U5、服务控制、依赖、Git 写入、部署或发布。
- U3 进入条件已满足：Project owner 单独授权推荐的纯 release 投影范围、继续拒绝 public build，并确认沿用现有 About 四段静态文案；写入前源身份与干净工作树已复核。
- 不阻塞 U3 数据/静态门禁的事项：真实站点 origin、文章 author/publisher 身份、Collection 专属 Hero、完整钟馗正文和正式字体保持未决；对应 review 页面继续 fail closed 为不可发布、不可索引，release 投影不等于 deployable artifact。
- 阻塞 M4 页面级最终验收的事项：正式字体文件与许可证/子集、键盘/缩放/媒体偏好/图片失败/性能/跨平台 fallback、Collection 最终视觉、完整 Entry 内容与引用层级。
- 阻塞 indexable SEO 输出的事项：真实站点 origin；公开 author/publisher 身份及必要 URL/标识；实际页面的发布资格；用途匹配且已批准的 OG 视觉（若输出 `og:image`）。
- 下一项允许动作：完成 U3 收口文档与回归验证后停止；U4、Git 写入和后续服务控制仍须 Project owner 分别授权。

### 1.1 已确认事实

- 当前 review 构建精确生成 Home、Explore、Collections、About、一个 Collection 与两个 Entry 共 7 个 `noindex, nofollow` 页面；DebugLayout 已删除。
- 当前动态路由按显式 review 投影生成全部 non-archived 记录；独立纯 release 投影只选择 published，并为 Explore/Collections/Related Entries 提供确定性 view model；固定 Home 纵切片是唯一 draft 选择例外。Public build intent 尚未实现且继续失败。
- `zhong-kui`、`chinese-underworld-guide` 和 `chinese-underworld` 都是 draft。钟馗 opening、summary、正文、术语、最早证据与事实复核日期尚未完成。
- `zhong-kui.heroAssetId` 使用稳定逻辑 ID `asset-zhong-kui-hero-primary`，当前 resolver 明确解析 Hero v2；Hero v1 是 approved/non-current 审计历史。
- 中国阴间 Collection 的 `heroAssetId` 为 `null`。钟馗 Hero 属于 Entry，不是整个 Collection 的 Hero。
- 中国阴间 Collection 的 `entryIds` 依次包含 draft 的 `chinese-underworld-guide` 与 `zhong-kui`；既有内容图禁止 published Collection 引用未发布 Entry，因此不能只发布钟馗后在页面层过滤 Guide。
- 仓库已有共享页面壳、Home、Explore index、Collections index 与 Project owner 确认沿用四段文案的 About；仍没有正式字体、真实站点 origin、canonical、Sitemap、RSS 或结构化数据。
- M3 资产通过本身不等于 M4 页面批准；Home/Entry 的 Hero v2 页面使用、裁切、排版与响应式已随 U2 页面方向确认，但正式字体、U5 完整视觉门禁与发布资格仍未批准。

### 1.2 本合同采用的设计选择

- 首个真实纵切片固定为 Home + The Chinese Underworld Collection + Zhong Kui Entry。
- Home 采用已确认的 A 主、C 辅概念方向；Collection 与 Entry 仍按“中性品牌母体 + Collection 主题 + 统一可信阅读器”分别设计。
- 本地评审可以使用当前 draft 数据，但不得为填满版面编造内容、第二个 Collection、引用、作者或发布状态。
- 中国阴间 Collection 在没有专属 Hero 时只允许使用共享 token 构成的中性 realm surface；不得借用钟馗 Hero。该回退只支持结构评审，不构成 Collection 最终视觉批准。
- 发布资格只由内容状态与全局发布门禁共同决定；`ready` 不是 `published`，`noindex` 也不是访问控制。
- About 与 Editorial Method 合并为一个 `/about/` 页面，避免为当前内容量增加第二个静态栏目。

### 1.3 未决问题与风险

- 公开域名和 canonical origin 未确认；任何 placeholder、平台临时域名或静默 fallback 都不能成为生产 canonical。
- Article JSON-LD 所需的 author/publisher 公共身份尚未确认；“Mythic China Editorial”目前只是视觉 credit 语境，不能自动成为文章作者或法律实体。
- 正式字体角色已在 DESIGN 中定义，但仓库没有已批准 WOFF2、CJK 子集、哈希或许可证记录。
- 首个 Collection 没有已批准专属 Hero；中性 surface 不能被误写为最终主题资产。
- 当前钟馗只有视觉研究所需的五份 Claim/Source，不等于完整文章研究、英文叙事或发布就绪。
- U2 已获一次本地 preview/浏览器授权，并完成 7 页 390/768/1440 实际视口复核；键盘全链、真实 200%、禁用 JavaScript、reduced motion、图片失败、性能和跨平台字体仍未验证。
- 若未来把已发布内容改为 archived，URL 迁移或重定向必须先独立决定；当前合同不静默制造 redirect。

## 2. 背景、目标与成功标准

### 2.1 当前问题

M2/M3 已把内容、证据和版本化视觉资产建成可靠的静态输入；U2 已用 noindex review 页面替换 debug templates，并完成系统 fallback 字体下的页面方向评审。该候选仍不是 deployable/public 输出：public 投影、真实 SEO 身份、正式字体与 U5 完整页面门禁必须在后续单元独立关闭，不能把 draft、`ready`、资产批准或 U2 方向确认当作发布资格。

### 2.2 用户与业务价值

- 英语读者可以从中性 Home 进入主题 Collection，再进入来源清楚的 Entry。
- 编辑可以在不发布 draft 的前提下审阅真实页面比例、视觉与阅读链。
- SEO 输出只描述真实、已发布且身份完整的页面，不产生占位 canonical、空 feed 或误导性结构化实体。
- 后续 M6 内容可以接入同一页面系统，而不重写稳定 ID、slug、来源关系或视觉版本。

### 2.3 可观察成功标准

- 六类页面职责和六条 URL 规则稳定，导航只包含 Home / Explore / Collections / About。
- 首个真实纵切片使用现有稳定 ID；Hero 通过 current resolver 解析到 v2，不在模板中硬编码版本或文件路径。
- 本地评审可看到真实 draft 纵切片，但 deployable/release 投影不包含未发布动态路由，也不把其写入导航列表、Sitemap 或 RSS。
- 页面没有虚构正文、Collection、来源、作者、publisher、域名、图片权利或历史身份。
- 核心导航、正文、来源和图片失败回退不依赖客户端 JavaScript。
- 页面级视觉、字体、SEO、浏览器与发布状态分别记录，不能用静态 build 替代人工或环境验收。

本阶段不接入分析，因此没有线上 KPI 测量窗口；M4 以静态、内容、可访问性、响应式和人工设计门禁作为可观察验收。

## 3. 范围与边界

### 3.1 M4 总体交付

- `/` Home。
- `/explore/` Explore index。
- `/collections/` Collections index。
- `/explore/{slug}/` Entry。
- `/collections/{slug}/` Collection。
- `/about/` About / Editorial Method。
- 共享生产 shell、导航、Footer、页面 metadata、响应式图片接线和无 JavaScript 基础阅读。
- canonical、Open Graph、`/sitemap.xml`、`/rss.xml` 与约定的 JSON-LD。
- 首个真实纵切片的响应式、无障碍、字体、性能与人工视觉复核。

### 3.2 M4 明确不做

- Pagefind、站内搜索、复杂 filters、Topic 权威集合或新 URL 参数。
- 账号、收藏、评论、社区、会员、支付、广告或商业组件。
- M5 newsletter、Reader Request、分析 adapter、真实表单、邮箱或用户数据。
- M6 六篇完整内容、第二个 Collection、批量插画或内容状态提升。
- 新视觉生产、Collection Hero 借用、正式字体下载/子集化或字体许可证补录，除非另行授权为独立单元。
- 新依赖、adapter、客户端 UI/CSS/动画框架、CMS、数据库或运行时服务。
- Git add/commit/push、分支、worktree、远端预览、部署或发布。

### 3.3 不得改变

- Entry 与 Collection 的稳定 ID、slug 和公开路径规则。
- Collection `entryIds` 作为成员关系与编辑顺序唯一来源。
- 内容状态 Schema、来源/Claim/Terminology 关系和发布门禁。
- versionless `assetId` + 显式 current resolver；不得按最大版本或文件名猜测。
- Entry 的故事优先、证据靠近主张、完整 Sources 后再继续探索的语义顺序。
- M1 原型不可发布、Hero v1 非 current、M3 批准不等于页面批准等审计事实。

兼容期：无。M4 替换 debug 表现层时一次切换；不保留并行 v1/v2 页面壳或隐藏入口。

## 4. 当前事实与目标调用链

### 4.1 当前 review 调用链

```text
Markdown / YAML + visual records
  -> Astro Content Layer
  -> strict record Schema
  -> content graph + visual graph validation
  -> explicit review projection
  -> page view models + approved/current asset gate
  -> shared SiteLayout + page templates
  -> seven noindex review pages + fourteen v2 responsive outputs
```

### 4.2 目标调用链

```text
validated content graph + approved current visual manifests
  -> explicit review or release projection
  -> page-specific view model and deterministic ordering
  -> shared production shell + page template + realm tokens
  -> robots / canonical / OG / JSON-LD policy
  -> static HTML + responsive images + sitemap.xml + rss.xml
```

不存在外部 API、数据库、写接口或运行时用户状态。M4 所有业务判断应在构建期完成。

## 5. 最终页面、内容与 SEO 合同

### 5.1 页面与 URL

| 页面 | URL | 数据来源 | 发布页职责 |
| --- | --- | --- | --- |
| Home | `/` | 品牌静态文案 + 已发布 Collection/Entry 投影 | 中性品牌入口、Explore Collections、Featured Story、Latest Entries |
| Explore | `/explore/` | published Entries | Guided path 与 browse 列表；MVP 不做搜索或多维筛选 |
| Collections | `/collections/` | published Collections | 主题阅读路径索引；不制造空卡或第二个 Collection |
| Entry | `/explore/{entry.slug}/` | 单个 Entry、反向 Collection、Sources/Claims/Terminology、视觉资产 | 统一可信阅读器 |
| Collection | `/collections/{collection.slug}/` | 单个 Collection、按 `entryIds` 排序的成员、Featured Entry、视觉资产 | 一个主题世界及其阅读路径 |
| About / Editorial Method | `/about/` | 经批准的静态站点文案 | 说明范围、来源纪律、AI 插画和编辑方法；不得宣称实体博物馆 |

- canonical 路径统一保留尾斜杠；站点根 origin 未确认前不拼接绝对 URL。
- Entry 与 Collection 路由继续使用现有 slug，不新增别名、重定向或 query-based canonical。
- Home 的首个评审投影可以显式选择稳定 ID `chinese-underworld` 与 `zhong-kui`；该单一首发选择不要求新增通用 Featured Schema。选择必须构建期校验存在性与状态。这两个 ID 只属于 review 合同，Public Home 不自动继承；若后续显式配置同一 public selection，则两者必须均为 published，否则构建失败。

### 5.2 内容状态、路由和索引矩阵

| 内容状态 | 本地显式评审 | deployable/release 动态路由 | Home/Explore/Collections 列表 | robots | Sitemap / RSS |
| --- | --- | --- | --- | --- | --- |
| `draft` | 可 | 不生成 | 不进入；评审 Home 的固定纵切片例外使整页 noindex | `noindex, nofollow` | 不进入 |
| `editorial-review` | 可 | 不生成 | 不进入 | `noindex, nofollow` | 不进入 |
| `visual-review` | 可 | 不生成 | 不进入 | `noindex, nofollow` | 不进入 |
| `ready` | 可 | 不生成 | 不进入 | `noindex, nofollow` | 不进入 |
| `published` | 可；仍继承 review 全站 noindex | 在全局发布门禁满足时生成 | 进入 | review 为 `noindex, nofollow`；public 为 `index, follow` 或省略限制 | 只进入 public 的适用输出 |
| `archived` | 不生成新页面 | 不生成 | 不进入 | 不适用 | 不进入 |

- `ready` 只表示内容/视觉门禁已满足，不表示公开发布决定。
- review 与 public 必须是两个显式构建意图，不能从 `NODE_ENV`、托管平台 URL 或内容数量猜测。项目聚合检查使用 review；public 只能由单独入口触发。
- 包含未发布路由的 review 输出不是 deployable artifact，不得上传到预览或生产；它的所有页面，包括 published 记录的页面，都保持 `noindex, nofollow` 且不生成发布型 SEO artifacts。
- public 输出只包含 published 动态记录。实现期必须先在 DEV_WORKFLOW 记录精确模式名称、允许值和退出方式；缺失或未知值直接失败，不能静默选择 review 或 public。
- `noindex` 不提供保密性。未发布 URL 不得进入全局导航、列表、canonical、Sitemap、RSS、JSON-LD 关系或公开分享入口。
- 已发布内容若以后需要 archived，必须在状态变更前建立 URL 保留/重定向需求；本合同只保持当前“archived 不生成”的行为。

### 5.3 静态页面与空数据

- Home、Explore、Collections 与 About 的 indexability 还取决于真实 origin、最终页面文案、页面级设计验收及有效下游链接。
- 本地评审 Home 可以展示固定 draft 纵切片，但必须整页 `noindex, nofollow`，且不得输出 canonical、RSS 关系或发布型 JSON-LD。
- Review 中 Explore 或 Collections 没有 eligible published 记录时保留清楚的真实空状态并 `noindex, nofollow`；不复制同一对象、制造“Coming soon”卡或编造分类填满栅格。
- Public 至少要求一个 published Entry 与一个 published Collection；固定导航任一核心索引为空时构建失败，不发布可索引的空 Explore/Collections。
- Public Home 只展示 published 对象。未配置 public Featured Story 或 Collection selection 时省略对应区块；一旦显式配置，目标不 eligible 就构建失败，不能省略、替换或使用未发布 fallback。
- About 只有在静态文案经 Project owner 确认且全局 SEO 门禁满足后才可 index；评审文案保持 noindex。

### 5.4 关系与排序

- Collection 成员严格按 `Collection.entryIds` 编辑顺序投影；published Collection 必须依赖既有内容图门禁保证每个成员也是 published，不得在渲染时静默过滤未发布成员或改写策展路径。
- Featured Entry 必须同时是该 Collection 的 eligible 成员。
- Explore 与 Latest Entries 按 `publishedAt` 降序，再按稳定 `entryId` 升序打破同日并列；缺少 `publishedAt` 的记录不可能进入 published 投影。
- Collections index 在没有专用排序字段的 M4 使用英文 title 升序，再按 `collectionId` 升序；未来需要编辑排序时先更新内容合同，不新增隐藏权重。
- Related Entries 只显示 published 目标；不得从标题、标签文本或当前 Collection 猜测关系。

### 5.5 Entry 阅读合同

生产 Entry 保持以下语义顺序：

1. 主视觉、人物身份与故事问题。
2. opening 故事入口。
3. Quick Answer。
4. 核心故事。
5. What the text says。
6. Later traditions and versions。
7. Our interpretation。
8. 为什么这个故事重要。
9. 常见误解或现代改编。
10. 完整 Sources。
11. Related Entries。
12. Reader Request 语义位置（M5 前不渲染可见模块）。
13. 全站 Footer。

- 当前钟馗缺少多数正文输入。U2 只能渲染真实存在的字段并省略不存在的内容区块，不得从 Claim statement 自动拼成文章或用 lorem/AI 草稿填充。
- 缺失内容使阅读层级验收保持未通过，但不阻止页面壳、Hero、栅格和状态策略的本地评审。
- Reader Request 与 Footer newsletter 在 M4 只保留组件顺序和信息架构边界；M5 前不渲染可见模块，也没有表单、输入框、禁用 CTA、假成功状态、adapter 或外部链接。

### 5.6 视觉资产与字体

- Zhong Kui Entry Hero 必须通过 `asset-zhong-kui-hero-primary` 调用现有 resolver，并解析唯一 approved/current Hero v2。模板不得引用 `-v1`、`-v2` manifest ID 或具体文件名。
- Zhong Kui Article Lead 若进入 U2 页面，只能通过用途匹配的 `asset-zhong-kui-lead-primary` 与 current resolver 使用；实际位置、裁切与是否保留仍须页面级人工确认。
- Entry 的 OG 图片若启用，使用用途匹配的逻辑资产 `asset-zhong-kui-og-primary` 及 current resolver；不得把它当作全站或 Collection 默认图。
- Home 实际使用 approved/current Hero v2 已在 U2 浏览器评审中获得页面方向确认；该确认不把 Zhong Kui 固化为长期全站身份，也不替代正式字体、U5 最终页面或发布批准。
- Collection Hero 为 `null` 时使用无图、无文化事实主张的中性 realm surface。该 surface 不伪装成历史地图、阴间结构或已批准视觉资产。
- alt、空 alt、caption、credit 与 AI disclosure 继续服从 Manifest 的 accessibility mode 和 M3 合同；正文文字不得烧录进图片。
- U2 不下载字体。正式字体门禁按 DESIGN 执行；系统 fallback 只能支持评审，并必须标为非最终字体状态。

### 5.7 Metadata、canonical 与 Open Graph

- Review 页必须有来自真实记录或已审阅静态文案的可见标题与 head `title`；对应 description/summary 缺失时省略 description 并保持 noindex，不得生成 fallback 文案。每个 indexable 页面才强制具有唯一、自然英文的 `title` 与 `description`；不得用内部状态、working draft 标题或重复模板填充发布 metadata。
- Review 页面固定输出 `noindex, nofollow`，不输出 canonical、发布型 JSON-LD、Sitemap/RSS 成员或可误认为正式分享身份的绝对 URL。
- Indexable 页面必须从一个已确认、HTTPS、无路径后缀的站点 origin 构造绝对 canonical；路径使用本节定义的尾斜杠规则。
- `og:url` 必须等于 canonical；`og:title`、`og:description`、`og:type` 与页面可见身份一致。
- `og:image` 只在该页面有用途匹配、权利通过且 current approved 的资产时输出。没有全站默认 OG 资产时允许 text-only Open Graph，不借用钟馗图片。
- origin 缺失或无效、published 页面缺少必需 metadata、asset resolver 多 current/无 current 时，indexable 输出构建失败；不得写 example.com、平台临时域名或静默省略关键身份后继续宣称 SEO 完成。

### 5.8 Sitemap、RSS 与结构化数据

- `/sitemap.xml` 只列 indexable 静态页、published Entry 和 published Collection；不列 review、空 noindex index、archived 或任何 M1 原型。
- `/rss.xml` 只列 published Entries，按 `publishedAt` 降序、`entryId` 升序；条目至少包含真实 title、description、canonical link 与 publication date。无 published Entry 时不生成可发布空 feed。
- Sitemap `lastmod` 优先使用真实 `updatedAt`，否则使用 `publishedAt`；不使用构建时间制造更新时间。
- Home 使用 `WebSite`；Explore/Collections index 与单个 Collection 使用 `CollectionPage`，Collection 可包含只指向 published 成员的 `ItemList`；Entry 使用 `Article`；About 使用 `AboutPage`。
- 不输出 `Museum`、馆藏所有者或公共机构身份。结构化数据必须与可见页面一致，不能补充页面没有的历史事实。
- Article 的 author/publisher 公共身份、URL 和所需标识未确认前，不输出不完整或虚构的 Article JSON-LD，也不能把对应 SEO 单元写成完成。

## 6. 目标技术与设计

```text
Astro Content Layer
  -> existing graph validators
  -> pure publication projection
  -> page view models
  -> shared Layout / Header / Footer / metadata
  -> Home / index / Collection / Entry / About templates
  -> static HTML and build-time SEO artifacts
```

### 6.1 组件与职责

- 生产 Layout 负责语言、skip link、head metadata、全局导航、Footer 和页面级 robots；不得继续把 DebugLayout 当生产壳。
- publication projection 负责 review/release、状态过滤和确定性排序；模板不各自复制状态判断。
- 页面 view model 只组合既有内容与资产，不改变 Content Layer 记录或制造 fallback 事实。
- realm 样式只覆盖 `--realm-*` token；Collection 不创建独立导航、字体、按钮、来源或交互系统。
- Debug templates 可在切换完成后删除；不保留隐藏 v1 路由或双表现层兼容期。

### 6.2 依赖、配置与 Schema

- U1 不改变任何依赖、运行配置、源码、内容 Schema 或资产记录。
- M4 默认使用现有 Astro 与浏览器原生能力；若后续选择 sitemap/RSS package、浏览器测试依赖或字体工具，必须先说明替代方案、许可证、安装影响并单独获得依赖授权。
- U2 不因单一 Home 选择新增通用 featured/topic/filter Schema。
- 真实 site origin 进入配置前必须由 Project owner 确认；配置不得带 production fallback。
- 现有架构测试有意锁定 `public/`、`src/services/`、`src/components/commercial/` 与 `tests/browser/` 的缺席，但并未禁止普通 `src/components/`，也未断言静态输出数量。U2 新增真实组件与页面时保留已有禁区，并新增独立的 7 页构建产物门禁；不能把预期失败当偶发噪声，也不能先删除既有门禁。

### 6.3 静态、JavaScript、响应式与无障碍

- 核心页面静态生成；正文、Sources、导航和页面间链接默认不发送客户端 JavaScript。
- 移动导航优先浏览器原生、可键盘操作且无 JavaScript 可达；若实际设计需要增强脚本，必须保持无脚本基础行为。
- 以 390px、768px、1440px 作为首个纵切片固定检查宽度；不把单一桌面截图写成响应式通过。
- 满足 WCAG 2.2 AA、44×44 CSS px 触控目标、可见 2px focus、skip link、语义标题、正确 `lang`、不遮挡焦点与 reduced-motion。
- 有信息图片保留尺寸与具体 alt；装饰 surface 使用空 alt 或纯 CSS，不承担唯一信息。
- LCP Hero 使用独立桌面/移动构图、明确尺寸和优先级；非首屏图片 lazy-load；正文和导航不等待图片、字体或脚本。
- 动效只能渐进增强且一次性；正文不能先隐藏再等待 JavaScript reveal。

### 6.4 隐私、安全与外部边界

- M4 不加载第三方脚本、字体 CDN、分析、表单、Cookie、邮箱、支付或用户数据。
- 所有外部来源链接仍来自内容 Source 记录或已批准站点文案；不得在模板硬编码未登记的文化事实来源。
- 图片权利、AI disclosure 与生产记录继续使用 M3 已有证据，不复制到第二套页面配置。

## 7. 影响清单

| 类型 | M4 目标变化 | 预计位置 | 对应验收 |
| --- | --- | --- | --- |
| 页面/入口 | 新增 Home、Explore、Collections、About；替换动态 debug 表现层 | `src/pages/` | 路由、状态投影、链接与静态输出 |
| 布局/组件 | 生产 Layout、Header、Footer、metadata、页面模板和共享 primitives | `src/layouts/`、`src/components/`、`src/templates/` | 语义、无 JS、键盘与页面级视觉 |
| 样式 | 全局 token、基础排版、共享组件与中国阴间 realm override | `src/styles/` | DESIGN 第 12 节、无图/灰度、响应式 |
| 内容/Schema | U1 不变；U2 默认不改 | 既有 Content Layer | 稳定 ID、slug、关系和状态门禁不漂移 |
| 视觉资产 | 只读消费 current resolver；不新增/覆盖资产 | `src/visual/`、`visual/manifests/` | Hero v2、owner/role/slot 与 disclosure |
| SEO | metadata policy、canonical、OG、Sitemap、RSS、JSON-LD | 后续 U4 确认的最小模块与静态 routes | published-only、绝对 URL、schema 一致性 |
| 测试/文档 | 页面投影、HTML/SEO、架构边界与浏览器验收 | `tests/`、本文、README、DEV_WORKFLOW | 定向、全量、浏览器、人工门禁 |
| 外部 adapter | 无 | 无 | 不出现服务、密钥或用户数据 |

具体文件必须在每个后续单元写入前重新列明；本表不是提前授权。

## 8. 实施拆分

### M4-U1 合同与基线同步

- 目标：冻结本合同、状态投影、SEO fail-closed 规则、首个纵切片与后续单元。
- 固定基线：`c606f5aab92d908ff2935c5b7212ad5066636a50`，写入前工作树干净。
- 修改：新增本文；同步 README、001 与 DEV_WORKFLOW 的当前基线和授权状态。
- 不交付：任何源码、内容、资产、依赖、配置、服务、Git 写入或发布。
- 授权：Project owner 已明确授权。
- 完成条件：四个文档之外无改动；UTF-8、相对链接、原模板占位符、Markdown 格式与 diff 检查通过；事实、设计选择、未决项与不做范围分开。
- 当前状态：文档交付、验证与 Project owner 合同确认均已完成；没有自动延续授权。

### M4-U2 页面基础与首个真实纵切片

- 目标：建立最小生产 shell，并实现 Home + Chinese Underworld Collection + Zhong Kui Entry 的 noindex 本地评审纵切片。
- 依赖：U1 验证完成；Project owner 单独授权；主代理完整执行 `design-taste-frontend` Skill pre-flight。
- 交付：共享 token/Layout/Header/Footer；真实三页；稳定内容与 Hero current resolver 接线；为保证四项全局导航不产生死链，必须同时提供 Explore、Collections、About 的最小中性真实入口，但三者的完整内容与最终验收仍属于 U3。
- 不交付：内容补写、状态提升、canonical/Sitemap/RSS/JSON-LD、正式字体、新视觉、外部交互或发布。
- 完成条件：无编造内容；Hero 解析 v2；Collection 不借用 Entry Hero；所有评审页 noindex；核心导航无死链；定向测试与静态回归通过；三页提交 Project owner 页面级评审。
- 当前状态：已完成。代码、自动静态门禁、获授权的 7 页三档浏览器复核、字号/排版收敛与 Project owner 页面方向确认均已闭合；正式字体和 U5 完整门禁不属于本单元。U2 收口时 U3-U5、依赖与代理 Git 写入未获授权；后续 U3 授权与结果见下一节。

### M4-U3 Explore、Collections 与 About

- 目标：完成中性探索入口、Collection 索引和合并的 Editorial Method 页面。
- 依赖：U2 共享表现层获得方向确认；Project owner 单独授权。
- 交付：published-only release 投影、真实空状态、确定性排序、全局导航和静态内容页面。
- 不交付：搜索、复杂 filters、Topic Schema、newsletter/Reader Request adapter。
- 完成条件：空/单项/多项 fixture、状态过滤、键盘导航、无 JS 与内部链接测试通过；不制造第二个 Collection。
- 当前状态：已完成。纯 release 投影覆盖 Entry/Collection 六状态、空/单项/多项、确定性排序和 published Entry 缺日期失败；review wrapper 保留薄接线门禁。7 页 noindex 输出通过真实空状态、About 四节、`lang`、skip/main、桌面/原生 details 移动导航、内部链接、无 inline handler/`javascript:` URL 与零客户端 JavaScript 静态检查。该证据只关闭静态键盘语义基线，真实键盘操作仍留 U5。

### M4-U4 SEO 输出

- 目标：实现 canonical、Open Graph、Sitemap、RSS 与约定 JSON-LD。
- 依赖：真实 HTTPS site origin、author/publisher 身份与用途匹配的页面 metadata 获确认；Project owner 单独授权配置/文件范围。若需新依赖，再单独授权依赖。
- 交付：统一 metadata builder、published-only artifacts、绝对 URL 和 build-time fail-closed 测试。
- 不交付：域名注册、DNS、托管、部署、分析或搜索。
- 完成条件：状态矩阵正反测试、canonical/OG 一致性、Sitemap/RSS 内容与排序、JSON-LD 可解析且与页面一致；无 placeholder identity。
- 当前状态：未开始、未授权；被 origin 与 author/publisher 决策阻塞。

### M4-U5 页面级验证与收口

- 目标：完成三页纵切片和全路由的自动化、真实浏览器、字体、性能与人工视觉门禁。
- 依赖：U2–U4 代码完成；正式字体与页面视觉候选具备；服务启动和浏览器验证另行授权。
- 交付：390/768/1440、键盘/focus、禁用 JavaScript、reduced motion、真实 200%、字体命中/慢加载/跨平台 fallback、图片失败、链接、metadata 和构建证据。
- 不交付：部署或发布。
- 完成条件：DESIGN 第 12 节、COMPETITIVE_AUDIT 第 6.3 节、自动门禁和 Project owner 页面级视觉确认全部闭合；未通过时先修共享表现层，不批量扩展。
- 当前状态：未开始、未授权。

钟馗完整研究、正文、术语/译文和状态提升不自动塞入 M4。若 Project owner 要求首个 Entry 在 M4 即达到 publish-ready，必须另行授权清楚的编辑内容单元；否则由 M6 承接。

## 9. 测试与验收

| 层级 | 场景 | 期望结果 | DEV_WORKFLOW 入口 | 当前结果 |
| --- | --- | --- | --- | --- |
| U1 文档 | 文件、UTF-8、相对链接、占位符 | 需求文档存在、编码和链接有效、无模板占位符 | 文档验证 | 通过：19 份 Markdown UTF-8 与相对链接有效，无占位符 |
| U1 差异 | diff 范围与空白错误 | 只有本文、README、001、DEV_WORKFLOW；`git diff --check` 无输出 | Git 只读检查 | 通过：Prettier、diff check 与四文件范围均符合 |
| 状态投影 | 六种状态、review/release/public、空列表 | review 排除 archived；release 只列 published；public 未授权时失败 | U3 定向 Vitest | 通过：空/单/多 fixture、Entry/Collection 六状态、排序、缺日期、review 接线与 build intent 正反测试均通过；public 仍未启用 |
| 页面 | 六类 URL、语义顺序、静态导航、无 JS | 路由/链接完整，真实字段与 Sources 默认可见；键盘语义不依赖脚本 | 聚合 `pnpm run check` | 通过：7 页精确 inventory、全部内部链接、5 份完整 Source、真实空状态、About 四节、skip/main、原生 details 导航、零客户端 JS 与缺失区块省略均通过；真实键盘操作未执行 |
| 页面图片 | stable ID、current、art direction、产物纯度 | v2-only，desktop/mobile 独立，候选宽度不放大 | resolver Vitest + 静态产物门禁 | 通过：Home/Entry 各引用同一组 14 个 v2 AVIF/WebP；dist 无 v1/Lead/OG/Social |
| SEO | canonical、OG、Sitemap、RSS、JSON-LD | published-only、绝对身份一致、无 placeholder | U4 定向测试 + 聚合检查 | 未执行，未授权 |
| 浏览器/无障碍 | 390/768/1440、键盘、200%、reduced motion、字体 | DESIGN 与 WCAG 门禁闭合 | U2 页面方向评审 + U5 经授权的完整入口 | 部分通过：7 页三档视口无阻塞布局/横向溢出且控制台清洁；键盘、200%、媒体偏好、正式字体和跨平台仍待 U5 |
| 人工视觉 | Home A/C、Collection 主题、Entry 阅读器 | Project owner 明确确认页面，不继承 M1/M3 批准 | U2 方向评审 + U5 最终页面级评审 | U2 页面方向已于 2026-08-29 确认；正式字体与 U5 最终视觉仍未批准 |

M4-U2 当前自动结果为 13 个测试文件/87 项测试、Astro 53 文件 0 error/0 warning/0 hint、7 页静态 build 与 14 个页面 Hero v2 输出；非默认视觉回归继续通过 7 个 local master 与 22 个 current 响应式输出。空 Terminology 提示符合当前 inventory。

M4-U3 当前自动结果为 14 个测试文件/90 项测试、Astro 55 文件 0 error/0 warning/0 hint、7 页 noindex 静态 build 与 14 个页面 Hero v2 输出；静态输出另通过 release 真实空状态、About 四节、导航语义、内部链接和零客户端 JavaScript 门禁。U3 未改视觉链，未重跑非默认 `visual:build:check`；空 Terminology 提示仍符合当前 inventory。

## 10. 环境、数据和外部影响授权

| 动作 | 环境与影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- |
| M4-U1 文档写入 | 当前工作区四个 Markdown；无源码/运行时影响 | 已授权 | 已完成并通过文档门禁 |
| M4-U2 页面/测试/review 构建入口写入 | 当前工作区已列明的源码、测试、package scripts 与文档 | Project owner 明确授权 M4-U2 | 已完成并由用户最终提交为 `5f327b6`；`8c6d12` 保留为主体历史基线，未改变依赖或 lockfile |
| M4-U3 release 投影、fixture 与静态门禁 | 当前工作区 5 个 site/test/verifier 文件与 4 个收口文档 | Project owner 明确授权推荐方案并确认 About 四段文案 | 已完成本地实施与验证；改动未提交，不含 public build、依赖、服务、浏览器、Git 写入或发布 |
| 依赖安装或调整 | package、lock、node_modules | 单独说明并授权 | 未授权 |
| dev/preview 或浏览器服务 | 本机进程与端口 | 单独授权 | U2 页面方向评审已单独授权并执行；不形成 U3-U5 可复用授权 |
| 外部写接口或用户数据 | 表单、邮件、分析、数据库 | 不属于 M4 | 禁止 |
| Git 写操作 | add/commit/push/分支/worktree | 单独授权 | 未授权 |
| 远端预览、部署或发布 | 托管、域名、DNS、生产 | 单独逐次授权 | 未授权 |

## 11. 发布与门禁

M4-U3 没有发布目标。纯 release 投影是数据/view-model，不是 `public` build intent 或 deployable artifact。当前没有真实 origin、托管身份、预览环境或生产环境；本地 build、noindex review 候选和页面视觉确认都不构成部署或发布授权。

未来可发布输出必须使用同一已验收源身份，满足 published-only 投影、真实 canonical、SEO artifacts、页面/字体/无障碍/性能门禁，并由 Project owner 逐次授权。具体命令只能在真实环境建立后写入 DEV_WORKFLOW。

## 12. 实施完成记录

### 12.1 M4-U1

- 结果：四份合同/基线文档已写入并通过 U1 文档门禁。
- 实际修改：新增本文；同步 README、001 和 DEV_WORKFLOW 的 M3 完成基线与 M4-U1 授权边界。
- 计划偏差：无。
- 验证：固定 Node/Corepack 下 `pnpm run format:check` 通过；19 份 Markdown 严格 UTF-8、相对链接和占位符检查通过；`git diff --check` 通过；工作树改动精确为四个已授权文件。
- 业务确认：Project owner 于 2026-08-29 明确确认 M4 合同第 1–9 项，并要求后置事项按对应单元再确认；该次确认在当时不授权 M4-U2，后续独立授权见 12.2。
- 未执行：源码/内容/资产/依赖/配置修改，测试/build，dev/preview，浏览器，Git 写入，远端部署和发布。
- 剩余风险：第 1.3 节的 site origin、身份、字体、Collection 视觉、Entry 内容和浏览器门禁均未关闭。
- 源身份：HEAD 仍为 `c606f5aab92d908ff2935c5b7212ad5066636a50`；U1 文档改动未提交。

### 12.2 M4-U2

- 结果：显式 noindex review 构建、共享页面壳、首个真实纵切片与最小全局入口已实现并通过自动静态门禁、实际浏览器方向评审和 Project owner 确认，M4-U2 可以关闭。
- 实际修改：增加 review build intent/projection、approved page asset gate、受控页面图片 registry、Layout/Header/Footer/Manifest Hero、Home/Collection/Entry 模板、Explore/Collections/About 入口、共享 CSS、定向测试和 7 页输出 verifier；删除已无引用的 DebugLayout。页面评审后只在 `src/styles/global.css` 收敛标题尺度、留白、信息轴和移动布局。
- 内容与资产边界：未改内容、Schema、manifest、production record 或 repository source。钟馗缺失的 opening/summary/body 保持省略，Claims 未进入页面叙事；五份 Source 完整显示。Home/Entry 通过 stable ID/current resolver 使用 Hero v2，Collection 只用 aria-hidden CSS realm surface。
- 验证：固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、13 个测试文件/87 项测试、`astro check`（53 个文件，0 error、0 warning、0 hint）与 7 页静态 build。产物审计确认全页 `noindex, nofollow`、全部内部链接存在、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并精确生成 14 个 v2 页面 AVIF/WebP。`pnpm run visual:build:check` 回归通过 7 个 local master 与 22 个 current 响应式输出。真实浏览器逐页复核 1440×900、768×900 与 390×844，另在 Project owner 的 411×651 视口复核 Explore；无横向溢出或控制台错误/警告，保持零客户端 JavaScript。
- 人工确认：Project owner 先反馈字号偏大、排版松散，授权 CSS-only 收敛后于 2026-08-29 明确回复“确认 M4-U2 页面方向，授权同步收口文档”。该确认限于 U2 页面方向和系统 fallback 字体状态。
- 未执行：键盘全链、真实 200% 缩放、reduced-motion、禁用 JavaScript、正式字体/慢加载/跨平台 fallback、图片失败、性能、U5 最终页面验收、代理 Git 写入、远端部署或发布。
- 偏差与维护风险：为避免 Astro 全目录 eager glob 把非 current/未用图片带入 dist，U2 使用受控 page image module registry；未来 v3 或回滚在 resolver 切换后还必须同步 registry，否则构建 fail closed。Explore/Collections/About 仍只是 U2 防死链最小入口，不代表 U3 完成。
- 源身份：U2 最终收口已由用户提交为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`（`M4-u2 completed`）；`8c6d12cabce11741bb83941904993f4d8831c818` 是主体历史基线。未执行 fetch，代理未执行 Git 写操作或发布。

### 12.3 M4-U3

- 结果：纯 published-only release 投影、Explore/Collections 真实空状态、About 四段静态内容和静态导航/无 JS 门禁已闭合，M4-U3 可以关闭；public build 继续失败。
- 实际修改：新增 `src/site/release-projection.ts` 与对应 fixture 测试；review 投影委托 release 投影并保持既有页面 API；既有输出 verifier 增加 release 空状态、About、`lang`、skip/main、桌面/原生 details 移动导航、inline script 边界和内部链接检查；同步 README、DEV_WORKFLOW、001 与本文。
- 内容与范围：Project owner 确认沿用现有 About 四段，不改页面文案、布局、CSS、内容/Schema、manifest、production record、repository source、依赖或 lockfile；未新增第二个 Collection、搜索、Topic、public runner 或 SEO 输出。
- 验证：固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、14 个测试文件/90 项测试、`astro check`（55 个文件，0 error、0 warning、0 hint）与 7 页静态 build。产物继续为 7 页 `noindex, nofollow`、14 个 Hero v2 AVIF/WebP、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并通过 release 真实空状态、About 四节、导航语义和全部内部链接门禁。
- 未执行：`visual:build:check`（U3 未改视觉链）、dev/preview、浏览器、真实键盘全链、真实 200%、禁用 JavaScript、reduced-motion、正式字体/跨平台 fallback、图片失败、性能、Git 写入、远端部署或发布。
- 剩余风险：当前真实内容没有 published 对象，因此单项/多项 release 行为由纯 fixture 证明；静态语义门禁不证明真实键盘交互。U4 仍被 HTTPS origin 与 author/publisher 身份阻塞，U5 的正式字体、浏览器、性能和最终视觉门禁未关闭。
- 源身份：写入前 HEAD、`main` 与本地 `origin/main` 均为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`，工作树干净；U3 改动未提交。未执行 fetch，代理未执行 Git 写操作或发布。

## 13. 当前最终结论

- M4-U1、M4-U2 与 M4-U3 已完成；U2 页面方向和 U3 About 四段/纯 release 边界已获 Project owner 确认，但这不是正式字体、U5 最终页面或发布批准。
- 已满足：显式 review 与纯 release 投影、7 页 noindex 静态页面、真实纵切片、Hero v2 接线、Source 展示、真实空状态、About 四节、内部链接、静态键盘语义、零客户端 JavaScript、三档实际视口和 U2 人工方向确认。
- 尚未满足：真实键盘、真实缩放、媒体偏好、正式字体、性能、跨平台 fallback、U4 SEO、U5 收口，以及各后置事项的对应授权。
- 下一项允许动作：完成当前 U3 收口验证后停止；没有自动延续至 U4-U5。
- 是否可以关闭：M4-U1、M4-U2 与 M4-U3 可以关闭；M4 总需求不能关闭。
