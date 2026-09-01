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
| 需求状态 | 已确认；M4-U4 分段、M4-U5 分两阶段 | Project owner 已分别授权 M4-U2、M4-U3、M4-U4A、首个纵切片本地候选、机器门禁、Collection/Guide Hero、CJK 静态链、M4-U5 Windows/local 部分预检及 review 索引候选架/功能页排版修正；两套 Hero、CJK 静态门禁与本轮功能页复看已闭合各自范围，但候选预检剩余项、最终关闭和 M4-U4B 仍须逐项人工判断或授权 |
| 实施状态 | M4-U1、M4-U2、M4-U3、M4-U4A、首个纵切片本地候选、机器门禁、Collection/Guide Hero、CJK 静态链及 review 索引候选架/功能页排版修正已完成 | 两篇编辑候选、Collection 与 Guide 各自的 approved/current Hero、4 份英文 WOFF2、6 份 SC/TC 静态 WOFF2、locale/ready 门禁及窄 review-only candidate view model 已形成；public runner、public 页面/endpoint 接线和 deployable output 仍不存在 |
| 验证状态 | 既有实施单元、M4-U5 Windows/local 部分预检及三个功能页修正通过各自范围 | 完整 `pnpm run check` 通过 22 个测试文件/207 项测试、Astro 70 文件零诊断、7 页/42 个 Hero 图片/10 个 hash-locked WOFF2 review 输出；四条候选直达页基础矩阵与 Explore/Collections/About 的 9 个三档组合均通过作用域内的 noindex、溢出、零脚本、字体 loaded 与 44px 候选链接检查。真实键盘、200%、慢/阻断字体、故障模式、性能、跨平台与专用字体样张仍未完成，不能关闭候选预检或完整 M4-U5 |
| 发布状态 | 未发布 | Vercel 只是未来托管目标；当前没有 Vercel 项目、真实站点 origin、预览/生产环境、部署配置或发布授权 |

- 当前权威结论更新时间：2026-09-01。
- M4-U3 实现与原收口文档已由 Project owner 提交为 `e94eacaad989652c7f71ae50276652cc3f54997a`（`updatee`）；M4-U2 历史基线为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`（`M4-u2 completed`），U2 主体历史基线为 `8c6d12cabce11741bb83941904993f4d8831c818`，M3 历史基线为 `c606f5aab92d908ff2935c5b7212ad5066636a50`。
- U3 写入前，HEAD、`main` 与本地 `origin/main` 均指向 `5f327b63f7a227e54773718d140e7295ef6ed3c9`，工作树干净；2026-08-30 提交后只读核对时三者均指向 `e94eacaad989652c7f71ae50276652cc3f54997a` 且工作树干净。未执行 fetch，因此不能据此证明服务器端分支状态。
- Guide Hero 生产闭环最初直接接续历史基线 `eb6e20c7c2ae5eda895e5a70f547140163877456`（`feat: complete first-slice release readiness gates`）上的未提交 Collection Hero 与本地化合同工作树；该生产批次没有创建分支、worktree 或仓库副本，也未执行 fetch 或 Git 写操作。后续版本身份与执行前核查以根目录 `README.md`、`DEV_WORKFLOW.md` 和 MVP 总合同为准。

## 1. 结论与开发就绪判断

- 一句话结论：先冻结发布投影和首个真实纵切片，再以 noindex 的本地评审页面关闭共享表现层；不得一次铺开批量内容或把资产批准写成页面批准。
- 是否可以进入下一工程单元：治理、机器门禁加固、Collection/Guide Hero、双语术语、Source 标题 locale、CJK 静态生产链、M4-U5 Windows/local 部分候选预检及功能页修正已闭合各自范围；下一步是专用 CJK 样张及能实际覆盖键盘/缩放/偏好、慢加载/故障、性能与跨平台 fallback 的环境。M4-U4B、Git 写入、Vercel 项目操作、部署或发布仍须分别授权。
- U3 进入条件已满足：Project owner 单独授权推荐的纯 release 投影范围、继续拒绝 public build，并确认沿用现有 About 四节静态文案；写入前源身份与干净工作树已复核。
- M4-U4A 进入条件已满足：Project owner 选择 Vercel 作为未来静态托管目标，确认 publisher=`Mythic China / Organization`、author=`Mythic China Editorial / Organization`、身份页 `/about/` 和当前不输出 `og:image`，并授权不含部署的推荐本地纯基础设施范围。
- M4-U4A 纯函数/fixture 当时在稳定 Vercel production alias/hostname、真实 published inventory、Collection 专属 Hero、完整钟馗正文和正式字体均缺失时安全完成；后续 004 变化不把纯 builder 变成 deployable artifact，review 页面继续不可发布、不可索引。
- 阻塞 M4 页面级最终验收的事项：正式英/CJK 字体浏览器效果、慢加载与跨平台 fallback，以及键盘/缩放/媒体偏好/图片失败/性能；CJK 字符集、六份子集、许可证/RFN/FONTLOG、精确 `unicode-range`、cmap 和 HTML `lang` 静态门禁已闭合。
- 阻塞 indexable SEO 输出的事项：真实且明确配置的站点 origin；至少一个 published Entry 与一个 published Collection；实际页面的 M4-U5 indexability/最终验收。Collection 专属 Hero 与既有模板消费链已闭合；当前采用 text-only OG，因此用途匹配 OG 图片不是阻塞项。
- 推荐工程顺序：在 non-published noindex 直达页完成正式英/CJK 字体判断与 M4-U5 候选预检并进入 `ready` → M5 外部交互边界 → M6 完成 6 篇 Entry、至少 2 个 Collection、全部资产及 Project owner 的 `published` 决定 → 在真实非空索引和最终页面上关闭 M4-U5 → 确认真实 HTTPS origin → M4-U4B 本地 public 构建能力。没有自有域名时，可在 U4B 前另行授权建立 Vercel 项目身份以确认稳定 production alias/hostname，但不得部署 review 输出。public-release 的一个 Entry + 一个 Collection 只是纯技术 fail-closed 下限；远端预览仍要求完整 6 篇 Entry / 至少 2 个 Collection public 候选并另行授权，生产发布与发布后只读基线仍属于 M7。最终 U5 后若发生实质内容、状态、模板、CSS、字体、Hero 或 manifest 变化，相关 U5 证据失效；origin、public metadata、runner 或 XML 变化通常只使 U4B 证据失效。每一步均须 Project owner 分别授权。

### 1.1 已确认事实

- 当前 review 构建精确生成 Home、Explore、Collections、About、一个 Collection 与两个 Entry 共 7 个 `noindex, nofollow` 页面；DebugLayout 已删除。
- 当前动态路由按显式 review 投影生成全部 non-archived 记录；独立纯 release 投影只选择 published，并为 Explore/Collections/Related Entries 提供确定性 view model。固定 Home 纵切片与由同一固定 Collection 及其 `entryIds` 精确派生的 review-only 索引候选架，是仅有的 non-published 选择例外；候选架不消费全部 non-archived inventory。M4-U4A 新增 public 最小数量与 SEO/artifact 纯函数，但 Public build intent 尚未实现且继续失败。
- `zhong-kui`、`chinese-underworld-guide` 和 `chinese-underworld` 都是 non-published `editorial-review`；两篇 Entry 已有 opening、summary、正文、来源/Claim、`bilingual-approved` 术语与 fact-check 日期，四条馆藏标题 locale 也已核定为 `zh-Hant`。钟馗 earliest-known 双证据仍明确为 `null`，不由不充分材料补齐。
- `zhong-kui.heroAssetId` 使用稳定逻辑 ID `asset-zhong-kui-hero-primary`，当前 resolver 明确解析 Hero v2；Hero v1 是 approved/non-current 审计历史。
- 中国阴间 Collection 的 `heroAssetId` 为稳定逻辑 ID `asset-chinese-underworld-hero-primary`，由 generic approved/current resolver 解析到 Collection 自己的 Hero v1；钟馗 Hero 仍只属于 Entry，没有被 Collection 借用。
- Guide Entry 的 `heroAssetId` 为稳定逻辑 ID `asset-chinese-underworld-guide-hero-primary`，由同一 generic approved/current resolver 解析到 Guide 自己的 Hero v1；Guide 没有借用 Collection 或钟馗 Hero。
- 中国阴间 Collection 的 `entryIds` 依次包含 non-published `chinese-underworld-guide` 与 `zhong-kui`；既有内容图禁止 published Collection 引用未发布 Entry，因此不能只发布钟馗后在页面层过滤 Guide。
- 仓库已有共享页面壳、Home、Explore index、Collections index 与保持四节结构的 About；About 现可见说明 `Mythic China Editorial` 团队身份。4 份英文 WOFF2 与 Source Han Sans 2.005R 派生的 SC/TC × 400/500/600 六份静态 WOFF2 已自托管接线并受静态门禁约束；仓库仍没有真实站点 origin，默认/实际 `dist` 没有 canonical、Sitemap、RSS 或结构化数据，M4-U4A 只在内存 fixture 中构造这些 view model/string。
- M3 资产通过本身不等于 M4 页面批准；Home/Entry 的 Hero v2 页面使用、裁切、排版与响应式已随 M4-U2 页面方向确认。Project owner 又阶段性接受当前内容/模板，并于 2026-08-31 分别批准 Collection desktop 02/mobile 01 与 Guide desktop A2/独立 mobile 的组合、publication rights、五审、exact-canvas、公开文案与正式资产链。静态 Collection 与 Guide 页面已各自消费自己的 Hero，但正式字体页面效果、M4-U5 完整视觉门禁与发布资格仍未批准。

### 1.2 本合同采用的设计选择

- 首个真实纵切片固定为 Home + The Chinese Underworld Collection + Zhong Kui Entry。
- Home 采用已确认的 A 主、C 辅概念方向；Collection 与 Entry 仍按“中性品牌母体 + Collection 主题 + 统一可信阅读器”分别设计。
- 本地评审可以使用当前 non-published `editorial-review` 候选，但不得为填满版面编造第二个 Collection、引用、个人作者或发布状态。
- Explore/Collections 的本地评审页可以在真实 published 空状态之外展示一个明确标注 `Not published` 的候选架；该候选架只能复用固定 Home Collection 与其 `entryIds`，不得把其他 non-archived 内容自动暴露为全局候选。
- 中国阴间 Collection 在没有专属 Hero 时只允许使用共享 token 构成的中性 realm surface；不得借用钟馗 Hero。该回退只支持结构评审，不构成 Collection 最终视觉批准。
- 发布资格只由内容状态与全局发布门禁共同决定；`ready` 不是 `published`，`noindex` 也不是访问控制。
- About 与 Editorial Method 合并为一个 `/about/` 页面，避免为当前内容量增加第二个静态栏目。
- 未来静态托管目标选择 Vercel，但 SEO 核心保持供应商中立；无自有域名时，只有 Project owner 明确确认的稳定 production alias/hostname 才可作为阶段性 origin，每次 deployment 的 generated/branch URL 不得使用。
- Publisher 固定为 `Mythic China / Organization`，author 固定为 `Mythic China Editorial / Organization`；两者公共身份页均为 `/about/`，当前 Open Graph 不输出 `og:image`。

### 1.3 未决问题与风险

- 精确 canonical origin 仍未确认；当前没有 Vercel 项目或稳定 production alias/hostname。任何 placeholder、generated/branch URL 或静默 fallback 都不能成为生产 canonical。
- `Mythic China` 与 `Mythic China Editorial` 的公开 Organization 身份已由 Project owner 确认，但这不是注册法人声明；实际 Article JSON-LD 仍要等 public 页面接线与可见 byline/日期一致性门禁。
- 英文正式字体已有 WOFF2、hash、OFL、alias/token 与 preload 候选；CJK 已固定上游 commit/input hash、Hans/Hant 字符集、六份静态 WOFF2、许可证/RFN/FONTLOG、精确 `unicode-range` 与 cmap/HTML 语言门禁。两者尚未获浏览器页面效果、慢加载和跨平台 fallback 批准。
- 首个 Collection 与 Guide 已各有 approved Hero brief、approved/current Hero v1 与静态页面消费；原中性 surface 只保留为 `heroAssetId: null` 时的条件回退，local explore 候选与待审图仍不能绕过 manifest 被页面直接消费。
- 当前两篇 Entry 已形成完整候选叙事与来源层级，Terminology 已为 `bilingual-approved`，四条馆藏标题 locale 与 CJK 静态生产链已闭合；钟馗 earliest-known 保持空，且正式字体浏览器判断/U5 仍未闭合，因此不等于发布就绪。
- 本轮另获一次本地 preview/浏览器授权，并完成四条候选页的 390/768/1440 正式页面回归；服务已停止。英文 display/story 与 SC/TC 400 已有实际命中证据，但键盘全链、真实 200%、禁用 JavaScript、reduced motion、慢/阻断字体、图片失败、性能、CJK 500/600/困难字形样张和跨平台字体仍未验证。
- 若未来把已发布内容改为 archived，URL 迁移或重定向必须先独立决定；当前合同不静默制造 redirect。

## 2. 背景、目标与成功标准

### 2.1 当前问题

M2/M3 已把内容、证据和版本化视觉资产建成可靠的静态输入；M4-U2 已用 noindex review 页面替换 debug templates，并完成 system fallback 字体下的页面方向评审。004 又形成英文正式字体、CJK 静态生产链以及 Chinese Underworld Collection/Guide Hero 的 approved/current 生产链与静态接线，但仍不是 deployable/public 输出：真实 origin、public 页面/output 接线、正式字体浏览器判断与 M4-U5 完整页面门禁必须独立关闭，不能把 `editorial-review`、单项资产批准或 noindex 构建当作发布资格。

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
- M6 除首个纵切片外的其余首发内容、第二个 Collection、批量插画与完整 inventory 的状态决定；首个纵切片先由独立授权的编辑/视觉单元达到 U5 预检候选，在 noindex 直达页通过适用预检后才进入 `ready`，不要求也不得为了预检提前提升为 `published`。
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
| Explore | `/explore/` | published Entries；review 另有固定纵切片成员候选架 | Guided path 与 browse 列表；MVP 不做搜索或多维筛选 |
| Collections | `/collections/` | published Collections；review 另有固定纵切片 Collection 候选架 | 主题阅读路径索引；不制造空卡或第二个 Collection |
| Entry | `/explore/{entry.slug}/` | 单个 Entry、反向 Collection、Sources/Claims/Terminology、视觉资产 | 统一可信阅读器 |
| Collection | `/collections/{collection.slug}/` | 单个 Collection、按 `entryIds` 排序的成员、Featured Entry、视觉资产 | 一个主题世界及其阅读路径 |
| About / Editorial Method | `/about/` | 经批准的静态站点文案 | 说明范围、来源纪律、AI 插画和编辑方法；不得宣称实体博物馆 |

- canonical 路径统一保留尾斜杠；站点根 origin 未确认前不拼接绝对 URL。
- Entry 与 Collection 路由继续使用现有 slug，不新增别名、重定向或 query-based canonical。
- Home 的首个评审投影可以显式选择稳定 ID `chinese-underworld` 与 `zhong-kui`；该单一首发选择不要求新增通用 Featured Schema。选择必须构建期校验存在性与状态。这两个 ID 只属于 review 合同，Public Home 不自动继承；若后续显式配置同一 public selection，则两者必须均为 published，否则构建失败。

### 5.2 内容状态、路由和索引矩阵

| 内容状态 | 本地显式评审 | deployable/release 动态路由 | Home/Explore/Collections 列表 | robots | Sitemap / RSS |
| --- | --- | --- | --- | --- | --- |
| `draft` | 可 | 不生成 | 不进入 release；仅固定 review 纵切片可进入 Home 或候选架 | `noindex, nofollow` | 不进入 |
| `editorial-review` | 可 | 不生成 | 不进入 release；仅固定 review 纵切片可进入 Home 或候选架 | `noindex, nofollow` | 不进入 |
| `visual-review` | 可 | 不生成 | 不进入 release；仅固定 review 纵切片可进入 Home 或候选架 | `noindex, nofollow` | 不进入 |
| `ready` | 可 | 不生成 | 不进入 release；仅固定 review 纵切片可进入 Home 或候选架 | `noindex, nofollow` | 不进入 |
| `published` | 可；仍继承 review 全站 noindex | 在全局发布门禁满足时生成 | 进入 | review 为 `noindex, nofollow`；public 为 `index, follow` 或省略限制 | 只进入 public 的适用输出 |
| `archived` | 不生成新页面 | 不生成 | 不进入 | 不适用 | 不进入 |

- `ready` 只表示内容/视觉门禁已满足，不表示公开发布决定。
- review 与 public 必须是两个显式构建意图，不能从 `NODE_ENV`、托管平台 URL 或内容数量猜测。项目聚合检查使用 review；public 只能由单独入口触发。
- 包含未发布路由的 review 输出不是 deployable artifact，不得上传到预览或生产；它的所有页面，包括 published 记录的页面，都保持 `noindex, nofollow` 且不生成发布型 SEO artifacts。
- public 输出只包含 published 动态记录。实现期必须先在 DEV_WORKFLOW 记录精确模式名称、允许值和退出方式；缺失或未知值直接失败，不能静默选择 review 或 public。
- `noindex` 不提供保密性。除固定 review Home 与显式 review-only 候选架外，未发布 URL 不得进入全局导航、列表、canonical、Sitemap、RSS、JSON-LD 关系或公开分享入口；两个窄例外都不得进入 public 输出。
- 已发布内容若以后需要 archived，必须在状态变更前建立 URL 保留/重定向需求；本合同只保持当前“archived 不生成”的行为。

### 5.3 静态页面与空数据

- Home、Explore、Collections 与 About 的 indexability 还取决于真实 origin、最终页面文案、页面级设计验收及有效下游链接。
- 本地评审 Home 可以展示固定 draft 纵切片，但必须整页 `noindex, nofollow`，且不得输出 canonical、RSS 关系或发布型 JSON-LD。
- Review 中 Explore 或 Collections 没有 eligible published 记录时保留清楚的真实空状态并 `noindex, nofollow`；可以并列展示一个与 release 列表分离、明确标注 `Not published` 的固定纵切片候选架，但不得复制对象、制造“Coming soon”卡、编造分类或增加第二个 Collection 填满栅格。
- Public 构建至少要求一个 published Entry 与一个 published Collection；固定导航任一核心索引为空时构建失败，不生成可部署的空 Explore/Collections。该数量只是 M4-U4B 技术门禁，不是 MVP 预览或生产发布资格；M6/M7 仍分别执行 6 篇 Entry、至少 2 个 Collection 和生产发布/发布后只读基线验收。
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
- Home 实际使用 approved/current Hero v2 已在 M4-U2 浏览器评审中获得页面方向确认；该确认不把 Zhong Kui 固化为长期全站身份，也不替代正式字体、M4-U5 最终页面或发布批准。
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
- Sitemap `lastmod` 优先使用真实 `updatedAt`，否则使用 `publishedAt`；`publishedAt` 是 Project owner 批准的目标公开日期，在 M6 protected preview 前可以是未来日期，但不得用构建日、预览日或部署日代填。`updatedAt` 表示目标公开当日或之后的公开修改日期，不得早于 `publishedAt`，也不使用构建时间制造更新时间。目标日期变化使受影响页面、SEO 与 release artifact 证据失效并重验；Article `dateModified` 服从同一时序。
- Home 使用 `WebSite`；Explore/Collections index 与单个 Collection 使用 `CollectionPage`，Collection 可包含只指向 published 成员的 `ItemList`；Entry 使用 `Article`；About 使用 `AboutPage`。
- 不输出 `Museum`、馆藏所有者或公共机构身份。结构化数据必须与可见页面一致，不能补充页面没有的历史事实。
- Article 的 author/publisher 公共身份已按 M4-U4A 确认；在真实 origin、public 页面接线以及可见 byline/日期与结构化数据一致性完成前，仍不得输出或把对应 SEO 单元写成完成。

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
- 2026-09-01 增量：Project owner 在本地预览中确认总体观感，同时指出 Explore、Collections 缺少可点击内容、About 首屏过空且部分字号偏大，并授权按推荐方案调整。已在不改变纯 release 投影、内容状态或 public 门禁的前提下增加精确 review-only 候选架、补实 About 既有四节并收紧三个功能页的作用域排版；自动与浏览器验证完成后，Project owner 结束本轮复看并授权停止服务。该复看闭合功能页反馈，不提升内容状态或关闭完整 M4-U5。

### M4-U4 SEO 输出

- 目标：实现 canonical、Open Graph、Sitemap、RSS 与约定 JSON-LD。
- M4-U4B 接线依赖：真实 HTTPS site origin、author/publisher 身份、M6 完整 6 篇 Entry / 至少 2 个 Collection published inventory、最终关闭的 M4-U5、已批准的英文字体页面/CJK 跨平台证据与用途匹配的页面 metadata 获确认；Project owner 单独授权配置/文件范围。pending 字体状态、system fallback、早期 U5 预检或 dirty-worktree `dist/` 不能替代上述证据。若需新依赖，再单独授权依赖。M4-U4A 只冻结配置名、校验与纯 builder，因此可以在没有真实 origin/发布内容时完成且不制造假 public artifact。
- 交付：统一 metadata builder、published-only artifacts、绝对 URL 和 build-time fail-closed 测试。
- 不交付：域名注册、DNS、托管、部署、分析或搜索。
- 完成条件：状态矩阵正反测试、canonical/OG 一致性、Sitemap/RSS 内容与排序、JSON-LD 可解析且与页面一致；无 placeholder identity。public runner 只能从正式 loader 经 Schema、content graph、visual graph/file inventory 与 approved/current resolver 后进入 published projection，再消费最终 U5 与字体/CJK readiness；不得 raw-load 记录后直接调用 pure builder。独立 public verifier 拒绝 review 页面、未发布路由、远端子资源、客户端 JavaScript 和缺失 metadata/XML。
- U4B 编码停止点：真实 U5/font/CJK 验收必须先冻结 readiness evidence producer、record 字段、失效条件与本地 source binding；在此之前不得开放 public intent。解析 Markdown、单独修改 `font-assets.json.status` 或依赖人工记忆都不能替代完整 evidence。
- 来源证明：U4B 只产生包含源 revision、dirty flag、lock/source digest、public intent 与 verifier 结果的本地 verification receipt，dirty source 一律标记 nondeployable；verifier 只证明输出语义，不冒充部署来源证明。M6 远端预览再把 clean committed source、验证结果与具体 deployment target 绑定为 `validated_source_identity`；若允许复用不可变制品，receipt 还必须包含完整 artifact inventory/digest。
- M4-U4A 当前状态：已完成。已冻结 `MYTHIC_CHINA_SITE_ORIGIN` 纯校验、两类 Organization 身份、public 最小 inventory 门禁、六类 metadata/JSON-LD view model、固定静态页 + published-only Sitemap/RSS 序列化和对应正反 fixture；About 四节内增加可见 editorial identity。没有环境读取、public runner、Layout/路由/endpoint 接线或 public `dist`。
- M4-U4B 当前状态：未开始、未授权。Collection/Guide Hero 与 CJK 静态生产链已闭合，不再是阻塞项；当前仍被真实 origin、M6 完整 published inventory、最终 M4-U5、正式字体浏览器/跨平台证据与制品源身份阻塞。届时交付 public build intent/runner、六类页面 metadata 接线、Sitemap/RSS routes、readiness 消费和独立 public output verifier。当前不得提前开放 public intent、读取环境变量或创建没有真实 U5/font 证据生产者的 readiness adapter。

### M4-U5 页面级验证与收口

- 目标：用同一组页面合同分两阶段完成首个纵切片预检与最终全路由关闭，不把早期候选证据冒充完整发布资格。
- 候选预检依赖：M4-U2 页面、M4-U3 release 投影与 M4-U4A 纯 SEO 基础完成，Collection/Guide Hero、双语术语、Source 标题 locale 与 CJK 静态生产链已闭合；完整 Entry 内容与引用层级、Article 可见 byline/日期已经形成。服务启动、正式英/CJK 字体浏览器判断和 U5 验证仍须另行授权。内容此时可以保持 non-published，Explore/Collections 保持真实空状态。
- 候选预检交付：在 noindex review 直达 Home/Collection/Entry 上完成适用的 390/768/1440、键盘/focus、禁用 JavaScript、reduced motion、真实 200%、字体命中/慢加载/跨平台 fallback、图片失败、链接、性能和人工视觉检查。通过只支持候选进入 `ready`，不关闭 M4-U5。
- 最终关闭依赖：M5 外部交互边界已冻结；M6 已完成 6 篇 Entry、至少 2 个 Collection、全部资产和 Project owner 的 `published` 决定，Explore/Collections 呈现真实非空列表。
- 最终关闭交付：在最终 Home/Explore/Collections、全部受影响动态页、最终字体/资产/CSS 与真实关系上重跑完整 U5。Public metadata/output 的最终验证留在 M4-U4B；最终 U5 不等待 public runner，但通过后才允许确认 origin 并进入 U4B。
- 不交付：public output、远端预览、部署或生产发布。
- 完成条件：DESIGN 第 12 节、COMPETITIVE_AUDIT 第 6.3 节、自动门禁和 Project owner 页面级视觉确认在最终 inventory 上全部闭合；未通过时先修共享表现层。最终 U5 后发生实质内容、状态、模板、CSS、字体、Hero 或 manifest 变化时，相关 U5 证据失效并重跑；origin、public metadata、runner 或 XML 变化通常只使 U4B 证据失效，除非同时改变可见页面渲染。
- 当前状态：候选预检已获授权并完成 Windows/local 部分；完整候选预检未关闭，内容未提升到 `ready`。最终关闭仍依赖 M5/M6 完整 inventory，尚未开始、未授权。

钟馗完整研究、正文、术语/译文和状态提升不自动塞入既有 M4-U2 至 M4-U4A。按当前接力路线，首发 Entry、首个 Collection 及其引用 Entry 先达到 noindex U5 预检候选并进入 `ready`；M6 承接其余首发内容、第二个 Collection、批量资产、完整 inventory 的人工 `published` 决定及最终 U5。未完成时 U4B 保持阻塞。

## 9. 测试与验收

| 层级 | 场景 | 期望结果 | DEV_WORKFLOW 入口 | 当前结果 |
| --- | --- | --- | --- | --- |
| U1 文档 | 文件、UTF-8、相对链接、占位符 | 需求文档存在、编码和链接有效、无模板占位符 | 文档验证 | 通过：19 份 Markdown UTF-8 与相对链接有效，无占位符 |
| U1 差异 | diff 范围与空白错误 | 只有本文、README、001、DEV_WORKFLOW；`git diff --check` 无输出 | Git 只读检查 | 通过：Prettier、diff check 与四文件范围均符合 |
| 状态投影 | 六种状态、review/release/public、空列表、固定 review preview | review 排除 archived；release 只列 published；preview 只消费固定 Collection 关系且拒绝 published；public 未授权时失败 | U3 定向 Vitest | 通过：空/单/多 fixture、六状态、排序、缺日期、无关 draft 不进入 preview、缺目标和 published preview 失败、build intent 正反测试均通过；public 仍未启用 |
| 页面 | 六类 URL、语义顺序、静态导航、review preview、无 JS | 路由/链接完整；release 空状态与 review 候选架分离；About 四节可见；键盘语义不依赖脚本 | 聚合 `pnpm run check` | 通过：7 页精确 inventory、全部内部链接、5 份完整 Source、Explore 两个 Entry 候选、Collections 一个 Collection 候选、其他五页无 preview 标记、真实 release 空状态、About 四节/身份锚点、skip/main、原生 details 导航与零客户端 JS 均通过；真实键盘操作未执行 |
| 页面图片 | stable ID、current、art direction、产物纯度 | 按 owner 只消费 approved/current Hero；desktop/mobile 独立，候选宽度不放大 | resolver Vitest + 静态产物门禁 | 通过：Home/Zhong Kui Entry 共用一组 14 个 Zhong Kui Hero v2 AVIF/WebP，Collection 独占 14 个 Chinese Underworld Hero v1，Guide 独占 14 个 Guide Hero v1，总计 42 个唯一输出；dist 无 Zhong Kui Hero v1/Lead/OG/Social |
| 字体静态链 | 字符集、上游输入、派生输出、CSS、cmap、HTML 语言边界 | 4 份英文与 6 份 CJK WOFF2 全部 hash-locked；SC/TC cmap 与批准集合精确相等；Han 不继承 `en` 或 generic `zh` | typography Vitest + review output verifier | 通过：SC 65 个、TC 36 个 required 码位，六份静态 CJK WOFF2、OFL/RFN/FONTLOG、精确 `unicode-range`、无 CJK preload、源码及 `dist` cmap/内部命名/weight/无变量轴和 7 页实际 HTML 字符集均受门禁约束；浏览器命中与 fallback 留 U5 |
| SEO | canonical、OG、Sitemap、RSS、JSON-LD | published-only、绝对身份一致、无 placeholder | M4-U4 定向测试 + 聚合检查 | M4-U4A 纯模块通过：origin/身份、public 数量、kind/path、日期、metadata 唯一性、published ItemList、JSON-LD/XML 转义、Sitemap/RSS 排序正反 fixture；M4-U4B 页面/output 未执行 |
| 浏览器/无障碍 | 390/768/1440、键盘、200%、reduced motion、字体 | DESIGN 与 WCAG 门禁闭合 | M4-U2 页面方向评审 + M4-U5 经授权的完整入口 | 部分通过：四条直达页既有三档矩阵通过；新增 Explore、Collections、About × 390×844/768×900/1440×900 九个组合均无横向溢出，字体 loaded、noindex、零脚本，候选链接最小 44px，且实际点击到正确 Collection/Entry。功能页 H1 为 40/40/56px、H2 为 28/28/36px，1440px About H1 为两行且四节从首屏 521px 开始。真实键盘、200%、reduced motion、禁用 JS、慢/阻断字体、图片失败、性能、跨平台及 CJK 500/600/困难字形样张仍未验证 |
| 人工视觉 | Home A/C、Collection 主题、Entry 阅读器与功能页 | Project owner 明确确认页面，不继承 M1/M3 批准 | M4-U2 方向评审 + M4-U5 最终页面级评审 | M4-U2 页面方向已确认；Project owner 本轮确认总体观感后提出并完成三个功能页反馈复看。完整 M4-U5 的字体、故障、缩放与跨平台视觉仍未关闭，不能提升 `ready` |

M4-U2 当前自动结果为 13 个测试文件/87 项测试、Astro 53 文件 0 error/0 warning/0 hint、7 页静态 build 与 14 个页面 Hero v2 输出；非默认视觉回归继续通过 7 个 local master 与 22 个 current 响应式输出。空 Terminology 提示符合当前 inventory。

M4-U3 当前自动结果为 14 个测试文件/90 项测试、Astro 55 文件 0 error/0 warning/0 hint、7 页 noindex 静态 build 与 14 个页面 Hero v2 输出；静态输出另通过 release 真实空状态、About 四节、导航语义、内部链接和零客户端 JavaScript 门禁。M4-U3 未改视觉链，未重跑非默认 `visual:build:check`；空 Terminology 提示仍符合当前 inventory。

M4-U4A 最终 `pnpm run check` 完整通过：18 个测试文件/157 项测试、Astro 63 文件 0 error/0 warning/0 hint、7 页 noindex review build 与 14 个页面 Hero v2 输出；输出 verifier 继续证明零 canonical/OG/JSON-LD/XML/客户端 JavaScript，并新增 About publisher/editorial 可见锚点。真实 public build/output 尚不存在。

## 10. 环境、数据和外部影响授权

| 动作 | 环境与影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- |
| M4-U1 文档写入 | 当前工作区四个 Markdown；无源码/运行时影响 | 已授权 | 已完成并通过文档门禁 |
| M4-U2 页面/测试/review 构建入口写入 | 当前工作区已列明的源码、测试、package scripts 与文档 | Project owner 明确授权 M4-U2 | 已完成并由用户最终提交为 `5f327b6`；`8c6d12` 保留为主体历史基线，未改变依赖或 lockfile |
| M4-U3 release 投影、fixture 与静态门禁 | 当前工作区 5 个 site/test/verifier 文件与 4 个收口文档 | Project owner 明确授权推荐方案并确认 About 四节文案 | 已完成本地实施与验证，并由 Project owner 提交为 `e94eaca`；不含 public build、依赖、服务、浏览器、代理 Git 写入或发布 |
| M4-U4A public SEO 纯基础设施 | 当前工作区 4 个 site 模块、4 个测试、About、review verifier 与 7 份治理文档 | Project owner 明确授权按推荐方案继续，并确认未来 Vercel 托管及身份/OG 口径 | 已完成；不含 public intent/runner、Layout/route/endpoint 接线、Vercel 配置、依赖、服务、浏览器、Git 写入、部署或发布 |
| review 索引候选架与功能页排版修正 | review projection helper、Explore/Collections/About、作用域 CSS、测试/verifier 与证据文档 | Project owner 查看本地 preview 后明确要求先修改 | 已实现并通过自动/三档浏览器复核；Project owner 随后结束复看并授权停止服务，不含状态提升、依赖、Git、public/Vercel、部署或发布 |
| 依赖安装或调整 | package、lock、node_modules | 单独说明并授权 | CJK 批次已单独授权把既有传递包 `fontkitten@1.0.3` 提升为直接开发依赖，并增加仅用于 HTML5 语言门禁的 MIT `parse5@8.0.1`；没有增加浏览器运行依赖，后续调整仍须另行授权 |
| dev/preview 或浏览器服务 | 本机进程与端口 | 单独授权 | M4-U2、首次 U5 preview 与本轮 PID `20084` 均已分别执行并停止；端口 4321 无监听，不形成后续可复用授权 |
| 外部写接口或用户数据 | 表单、邮件、分析、数据库 | 不属于 M4 | 禁止 |
| Git 写操作 | 代理执行 add/commit/push/分支/worktree | 单独授权 | 代理未授权；Project owner 已自行提交 U3 |
| 远端预览、部署或发布 | Vercel 项目、托管、域名、DNS、生产 | 单独逐次授权 | 未来托管目标已选 Vercel；项目创建、配置、deployment 与发布均未授权/未执行 |

## 11. 发布与门禁

M4-U4A 没有发布目标。纯 release/public/SEO/artifact builder 是数据/view-model/string，不是 `public` build intent 或 deployable artifact。Vercel 已被选为未来托管目标，但当前没有真实 origin、Vercel 项目、预览环境或生产环境；本地 build、noindex review 候选和页面视觉确认都不构成部署或发布授权。

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

- 结果：纯 published-only release 投影、Explore/Collections 真实空状态、About 四节静态内容和静态导航/无 JS 门禁已闭合，M4-U3 可以关闭；public build 继续失败。
- 实际修改：新增 `src/site/release-projection.ts` 与对应 fixture 测试；review 投影委托 release 投影并保持既有页面 API；既有输出 verifier 增加 release 空状态、About、`lang`、skip/main、桌面/原生 details 移动导航、inline script 边界和内部链接检查；同步 README、DEV_WORKFLOW、001 与本文。
- 内容与范围：Project owner 确认沿用现有 About 四节，U3 当时不改页面文案、布局、CSS、内容/Schema、manifest、production record、repository source、依赖或 lockfile；未新增第二个 Collection、搜索、Topic、public runner 或 SEO 输出。后续 M4-U4A 的可见身份补充另见 12.4。
- 验证：固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、14 个测试文件/90 项测试、`astro check`（55 个文件，0 error、0 warning、0 hint）与 7 页静态 build。产物继续为 7 页 `noindex, nofollow`、14 个 Hero v2 AVIF/WebP、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并通过 release 真实空状态、About 四节、导航语义和全部内部链接门禁。
- 未执行：`visual:build:check`（U3 未改视觉链）、dev/preview、浏览器、真实键盘全链、真实 200%、禁用 JavaScript、reduced-motion、正式字体/跨平台 fallback、图片失败、性能、代理 Git 写入、远端部署或发布。
- 剩余风险：在 U3 收口当时，真实内容没有 published 对象，因此单项/多项 release 行为由纯 fixture 证明；静态语义门禁不证明真实键盘交互。当时 M4-U4 仍被 HTTPS origin 与 author/publisher 身份阻塞；身份随后已在 M4-U4A 确认，Collection Hero/模板支持随后也已闭合。当前 M4-U4B 阻塞项是真实 origin、published inventory 和 M4-U5 页面资格；M4-U5 的正式字体、浏览器、性能和最终视觉门禁仍未关闭。
- 源身份：写入前 HEAD、`main` 与本地 `origin/main` 均为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`，工作树干净。Project owner 于 2026-08-30 将 U3 实现与原收口文档提交为 `e94eacaad989652c7f71ae50276652cc3f54997a`（`updatee`）；提交后只读核对时三者对齐且工作树干净。未执行 fetch，代理未执行 Git 写操作或发布。

### 12.4 M4-U4A

- 结果：HTTPS origin 校验合同、公共身份、public 最小 inventory 门禁、canonical/Open Graph/JSON-LD 与 Sitemap/RSS 的纯构建能力已实现并通过 fixture/完整聚合回归，M4-U4A 已完成；没有生成 deployable public artifact，不能关闭完整 U4。
- 决策：Project owner 选择 Vercel 为未来静态托管目标，并确认 publisher=`Mythic China / Organization`、author=`Mythic China Editorial / Organization`、公共身份页 `/about/` 和当前 text-only Open Graph。SEO 核心不耦合 Vercel 自动变量；精确 origin 只允许未来通过显式 `MYTHIC_CHINA_SITE_ORIGIN` 提供。
- 实际修改：新增 `public-site`、`public-release`、`seo`、`release-artifacts` 四个纯模块与四份 site 测试；About 在既有四节内增加可见 editorial team 文案和 publisher/editorial 锚点；review verifier 锁定身份证据；同步 README、DEV_WORKFLOW、PRODUCT、ARCHITECTURE、REFERENCES、001 与本文。
- 纯门禁：origin 拒绝缺失/非 HTTPS/credential/port/path/query/hash/IP/localhost/保留示例域和 URL normalization；public inventory 要求 Entry/Collection 各至少一项；metadata 绑定六类 kind/path、真实日期、published Collection ItemList、跨页唯一性与安全 JSON-LD；release artifacts 固定静态 URL、复用 published 排序，拒绝空 RSS、重复 URL、非法日期和 XML 1.0 非法字符。一组 happy-path 经过正式 Schema 与内容图 validator。
- 验证：固定 Node/Corepack 下最终 `pnpm run check` 完整通过 Prettier、ESLint、Vitest 18 文件/157 项测试、Astro check（63 文件 0 error、0 warning、0 hint）与 review build/output verifier；review `dist/` 保持 7 页 `noindex, nofollow`、14 个 Hero v2 AVIF/WebP、无 canonical/OG/JSON-LD/XML/客户端 JavaScript。
- 未完成/未执行：`public` build intent/runner、Layout 与六类页面 metadata 接线、Article 可见 byline/日期、Sitemap/RSS endpoint、public output verifier、真实 origin、真实 published 内容、Collection 专属 Hero/模板支持、M4-U5、依赖、服务/浏览器、Git 写入、Vercel 项目操作、部署与发布。
- 源身份：M4-U4A 以 `e94eacaad989652c7f71ae50276652cc3f54997a` 为写入基线；未 fetch，代理未执行 Git 写操作或发布。

### 12.5 2026-08-31 生命周期与机器门禁加固

- 结果：解除 `published → U5 → U4B → M6` 互锁，把 U5 固定为 noindex 候选预检与 M6 完整 published inventory 上的最终关闭；不新增状态、不开放 public intent。
- 实际修改：同步根目录和领域/需求合同；package runtime guard 改为可移植 Node engine 范围；Entry Schema、SEO 与 release artifact 分别阻断倒序公开日期；内容图阻断注释/空 HTML/图片-only 正文；新增 review HTML/CSS 子资源策略并接入现有 output verifier。
- 配套核对：内容/资产追溯与 AI disclosure 未改变；构建期新增公开日期、正文与子资源诊断；关键职责说明仅保留在正文可见性与 output policy 的非显然边界；匹配正反测试已补齐。
- 验证：固定本机 Node/Corepack 下完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check（67 个文件，0 error、0 warning、0 hint）、7 页 review build 与 output verifier。输出保持 14 个 Hero v2 图片、4 个 WOFF2、零 XML 与零客户端 JavaScript。
- 未执行：非默认 `visual:build:check`（本批未改视觉链）、dev/preview/browser、资产/CJK 工具、依赖、Git、Vercel、部署或发布。

### 12.6 Chinese Underworld Collection Hero 生产闭环

- 结果：Project owner 选中的 desktop 02 与独立 mobile 01 已完成高保真 ImageGen 重建、exact-canvas master、个人账户与 publication authority 确认、文化/权利/视觉/无障碍/语言五审、production record、approved/current manifest、repository source、page image registry 与 Collection versionless `assetId` 绑定；Collection 仍保持 `editorial-review`。
- 资产：新增 desktop `3200×1800` 与 mobile `1600×2000` 两个 Git-ignored PNG master、两份同画布 WebP source、`production-chinese-underworld-hero-primary-v1` 与 `asset-chinese-underworld-hero-primary-v1`。ImageGen 未暴露模型 ID，记录保持 `null`；博物馆或历史图片没有作为生成输入。
- 页面与门禁：Collection 通过既有 generic resolver 与 `ManifestHeroPicture` 消费自己的 Hero；模板没有版本/路径硬编码。输出 verifier 严格区分 Zhong Kui v2 与 Collection v1 两个资产族，Home/Entry 只引用前者 14 项，Collection 只引用后者 14 项。
- 验证：固定 Node/Corepack 下完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 个文件零诊断，以及默认 build 的 7 页、28 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。非默认 `visual:build:check` 通过 9 个 local master、5 份 current responsive rendition 与 36 个实际生成并解码的 AVIF/WebP 目标。
- 本 Collection 闭环批次当时未执行：dev/preview/browser、Guide Hero、双语/CJK/字体页面判断、M4-U5、public runner/U4B、依赖、Git 写入、Vercel 项目操作、部署或发布。

### 12.7 Chinese Underworld Guide Hero 生产闭环

- 结果：Project owner 批准的 desktop A2 与独立构图、定向修正后的 mobile 候选已形成 Guide 自有 Hero v1；个人账户/输入与输出使用权、Mythic China 公开使用权、`in-house-original`、五项人工审核及最终公开文案均获确认。Guide 绑定 versionless `asset-chinese-underworld-guide-hero-primary`，仍保持 `editorial-review`。
- 资产：新增 desktop `3200×1800` 与 mobile `1600×2000` 两个 Git-ignored lossless PNG master、两份同画布 WebP repository source、`production-chinese-underworld-guide-hero-primary-v1` 与 `asset-chinese-underworld-guide-hero-primary-v1`。ImageGen 仅消费项目生成候选，未上传馆藏、历史图像或未经授权的第三方图片；工具未暴露 model ID 或 seed，记录保持 `null`。
- 页面与门禁：既有 generic resolver、Entry route/template 与 `ManifestHeroPicture` 直接消费 Guide manifest 的 alt/caption/credit/disclosure，没有增加模板版本或路径硬编码。输出 verifier 严格区分 Zhong Kui v2、Collection v1 与 Guide v1 三个资产族；Home/Zhong Kui Entry、Collection、Guide 各自只消费所属资产族。
- 验证：固定 Node/Corepack 下完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 个文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。非默认 `visual:build:check` 通过 11 个 local master、七份 current responsive rendition 与 50 个实际生成并解码的 AVIF/WebP 目标。
- 未执行：dev/preview/browser、双语/CJK/字体页面判断、M4-U5、public runner/U4B、依赖、Git 写入、Vercel 项目操作、部署或发布。

### 12.8 CJK 字符集、子集工具与 cmap 门禁

- 结果：Project owner 授权的 CJK 静态生产链已闭合。批准字符集精确包含 SC 65 个、TC 36 个 required 码位；`测`/`測` 只作为故意缺字的 fallback probe，不进入 CSS 或 cmap。两处 Markdown 简体词补齐 `zh-Hans`，混合 Source 标题拆成纯英文标题与独立 `zh-Hant` 字段。
- 生产与追溯：Adobe Source Han Sans `2.005R` 固定 commit 的 SC/TC 输入受 SHA-256 约束；隔离 Python 工具链固定 fontTools `4.63.0`、Brotli `1.2.0`，从每个输入独立实例化 400/500/600 并按 OFL RFN 改名为 `Mythic Han Sans SC/TC`。六份 WOFF2、许可证、FONTLOG、生成器、requirements、字符集和生产摘要进入稳定仓库；两次独立重建的文件名、长度与 SHA-256 逐项相等。
- 默认门禁：既有传递包 `fontkitten@1.0.3` 经授权提升为直接开发依赖，用于 Node 默认检查读取 WOFF2 name/cmap；MIT `parse5@8.0.1` 只负责按浏览器 HTML5 树语义读取语言继承。字体 inventory、生成器/requirements/字符集/LICENSE/FONTLOG 来源、源码与构建后 CSS `unicode-range`、内部名称、静态 weight、无变量轴、OFL、只计真实 glyph 映射的源码/`dist` cmap、无 CJK preload、严格 HTML `lang` 继承和 7 页实际 Han content set 都有精确正反 oracle；属性值伪 `lang`、隐式 `p`/`li` 闭合与 table foster parenting 不能绕过。
- 验证：首轮定向字体测试通过 2 个文件/6 项测试，最终又补一项 `.notdef` cmap 负例；完整 `pnpm run check` 通过 Prettier、ESLint、21 个测试文件/201 项测试、Astro check 69 文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript 和生产来源/构建后 CSS/实际 HTML/lang/cmap 输出门禁。第一次聚合检查发现并修正架构直接依赖白名单漏列 `fontkitten`；最终审查再修正属性值伪 `lang`、有效 glyph cmap、生成器确定性保存路径及独立 build oracle，并以隐式 `p`/`li` 闭合负例淘汰 XML 式手写标签栈，改用 parse5 HTML5 实际树并增加 table foster parenting 负例。新版生成器的两次独立重建与正式六文件 inventory 逐字节一致，替换解析器后完整重跑通过。
- 未执行：dev/preview/browser、真实字体逐字形命中、慢加载、200% 缩放、跨平台 fallback、M4-U5、状态提升、Git 写入、Vercel 操作、部署或发布。字体或可见 CJK 内容发生变化时，相关静态及 U5 证据必须按失效范围重跑。

### 12.9 2026-09-01 M4-U5 Windows/local 部分候选预检

- 授权与范围：Project owner 确认下一步为 noindex M4-U5 候选预检并要求按计划继续；只允许本地 preview/browser、直接暴露的共享样式缺陷修复、匹配测试与证据同步，不含状态提升、依赖、Git、public/Vercel、部署或发布。
- 页面与字体证据：Home、Chinese Underworld Collection、Underworld Guide 与 Zhong Kui 四条直达页在 390×844、768×900、1440×900 共 12 个组合保持 `noindex, nofollow`、零横向溢出、图片完成加载、零客户端脚本、44px 独立目标、字体状态 loaded 和清洁 console；正式页面实际命中英文 display/story、SC 400 与 TC 400，并保持 CJK `font-synthesis: none`。
- 修复与自动门禁：浏览器先后暴露 desktop Collection copy 落到图片下方、移动固有宽度/高度造成裁切及 768px caption/description 相交；只修改共享 CSS，并新增单一响应式回归测试文件。完整 `pnpm run check` 通过 22 文件/204 项测试、Astro 70 文件零诊断与既有 7 页/42 图/10 字体输出门禁。
- 保留阻塞：真实页面不自然覆盖 CJK 500/600、全部困难/故意 fallback 字形，仓库没有专用 noindex 字体样张；当前控制面也不能可靠执行 Tab/Enter/Space、真实 200%、禁用 JS、启用 reduced motion、慢/阻断字体、图片失败、网络节流或跨平台检查，未取得 LCP/CLS 与 Project owner 页面级确认。故本节只记录 Windows/local 部分证据，不支持 `ready`、候选预检关闭或完整 M4-U5 关闭。
- 环境收口：preview PID `26712` 已通过固定入口停止，端口 4321 回查无监听。完整命令、监听地址差异、几何数据和未执行项以 [`DEV_WORKFLOW.md`](../../DEV_WORKFLOW.md) 同名记录为准；未执行 Git 写入或发布。

### 12.10 review 索引候选架与功能页排版修正

- 结果：Project owner 在新一轮本地 preview 中确认总体页面观感，同时指出 Explore、Collections 缺少可点击内容、About 首屏过空及部分字号偏大，并明确要求先修正。Explore/Collections 现保留 published 空状态并新增分离的 review-only 候选架；About 四节已补实，三个功能页的字号与首屏高度已作用域收紧。Project owner 随后结束复看并授权停止服务；这关闭本轮功能页反馈，但不构成 `ready` 或完整 M4-U5 批准。
- 投影边界：`getReviewIndexPreview()` 只从固定 Home Collection 与其 `entryIds` 派生一个 Collection、两个 Entry，保持策展顺序并继承 Home/成员缺失的 fail-closed 校验；额外 draft 不进入，任一候选已 published 时以 `ineligible-index-preview` 失败。纯 release projection 与 published-only 排序未改，未来 public 分支不得调用该 helper。
- 页面与设计：Explore 精确显示 Guide、Zhong Kui，Collections 精确显示 Chinese Underworld，均标注 `Not published` 且不借图。About 保留 `publisher`/`editorial` 锚点和原四标题，移除装饰编号并补充既有范围、编辑、图片披露和阅读路径说明。CSS 只作用于 index/review/About；Home、Collection detail、Entry 及全局 H1/H2 未改。
- 验证：固定 Node/Corepack 下完整 `pnpm run check` 通过 22 个测试文件/207 项测试、Astro 70 文件零诊断、7 页/42 图/10 字体、零 XML 与零客户端 JavaScript 输出门禁。三个功能页 × 390/768/1440 九个浏览器组合保持 noindex、零溢出、字体 loaded、零脚本；候选链接最小 44px，并实际进入正确目标，1440px About H1 收敛为 56px 两行且首屏可见四节起点。
- 边界与环境：内容状态、Source/Claim/Terminology、Schema、manifest、production record、字体/图片 inventory、依赖和锁文件均未改，非默认 `visual:build:check` 不适用。Project owner 授权停止服务后，PID `20084` 已结束，端口 4321 无监听；没有执行 Git 写入、public/Vercel、部署或发布。

## 13. 当前最终结论

- M4-U1、M4-U2、M4-U3、M4-U4A、首个纵切片本地候选、机器门禁、Collection/Guide Hero、CJK 静态链、M4-U5 Windows/local 部分预检以及 review 索引候选架/功能页排版修正已完成各自范围。M4-U2 页面方向、纯 release 边界、公共身份、两组 Hero、字体方案及本轮功能页复看已获 Project owner 确认或关闭，但完整 M4-U5、public build 与发布尚未批准。
- 已满足：显式 review、纯 published-only release/public 最小投影、固定 review-only 候选架、7 页 noindex 静态页面、两篇编辑候选、三套 current Hero、自托管 4 份英文与 6 份 CJK WOFF2 自动门禁、CJK 语言边界、Source 展示、真实 release 空状态、About 四节/身份锚点、内部链接、静态键盘语义、零客户端 JavaScript、直达页与功能页三档基础视口，以及纯 SEO/artifact fixture 门禁。
- 尚未满足：真实 public origin/内容/artifact、public runner/页面/endpoint，真实键盘/200%/媒体偏好、禁用 JS 与失败模式，专用 CJK 500/600/困难字形样张、慢加载、性能、macOS/iOS/Android fallback、完整 M4-U5 与 M4-U4B 收口。
- 下一工程单元是专用字体样张和当前工具/平台未覆盖的 noindex U5 证据。当前内容继续为 `editorial-review`。M6 完成 6 篇 Entry / 至少 2 个 Collection inventory 与人工 `published` 决定后，在真实非空 release 索引最终关闭 U5；真实 origin 与最终门禁满足后才进入 U4B。本批不自动授权状态提升、Git 写入或 Vercel 部署。
- 是否可以关闭：M4-U1、M4-U2、M4-U3 与 M4-U4A 可以关闭；完整 U4 与 M4 总需求不能关闭。
