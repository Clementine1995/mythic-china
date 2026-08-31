# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 阶段：M1 已冻结为工程参考；M2 与 M3 已完成并形成历史基线 `f258227`、`c606f5`。M4-U1/U2 的历史基线为 `5f327b6`，M4-U3 已由 Project owner 提交为当前实现基线 `e94eaca`；M4-U4A 的本地纯基础设施也已完成，但完整 M4、public build 与发布尚未完成。
- 当前实现：默认 review 构建生成 7 个 `noindex, nofollow` 页面与 14 个 Hero v2 AVIF/WebP；真实 inventory 仍为 0 published Entry / 0 published Collection。M4-U4A 已建立 HTTPS origin 校验合同、公共身份、public 最小 inventory 门禁及 canonical/OG/JSON-LD/Sitemap/RSS 纯 builder，但没有 public runner、Layout/路由/endpoint 接线或 public `dist/`。
- 编辑/视觉候选：两篇首发 Entry 与唯一 Collection 的 `editorial-review` 形态已获 Project owner 阶段性接受，双语术语仍只到 `source-checked`。Chinese Underworld Hero A brief 已 approved；Project owner 于 2026-08-31 选中 desktop 02 与独立 mobile 01 进入生产准备，但它们仍只在 Git-ignored local explore 中，没有 master/manifest，Collection `heroAssetId` 仍为 `null`。
- 当前验证：固定本机 Node/Corepack 下 `pnpm run check` 通过 20 个测试文件/196 项测试、Astro 67 文件零诊断，以及 7 页/14 个 Hero v2 图片/4 个 WOFF2 的 review 输出门禁；本批另关闭运行时路径可移植性、公开日期时序、空 HTML/图片正文与远端子资源反例。非默认视觉链未受修改，保留既有七个 local master 与 22 个 current 响应式输出证据。
- 视觉/字体状态：M1 原型视觉皮肤仍未获批准；M4-U2 页面方向与本轮系统 fallback 三档视口已确认。4 份上游未修改英文 WOFF2 已经中央 alias/token 接线，CJK 仍为 system fallback；正式字体浏览器效果、Hero 成图、真实键盘/缩放/媒体偏好、性能及 M4-U5 最终视觉尚未批准。
- 托管与身份：未来静态托管目标为 Vercel；publisher 为 `Mythic China / Organization`，author 为 `Mythic China Editorial / Organization`，公共身份页为 `/about/`，当前采用 text-only Open Graph。项目仍没有稳定 Vercel production alias/hostname、真实站点 origin、远端发布环境或部署授权。
- 版本边界：M4-U4A 以 `e94eaca` 为写入基线；本轮未 fetch，代理未执行 Git 写操作、Vercel 项目操作或发布。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。当前权威日期为 2026-08-31。

## 当前接力顺序

1. **首个纵切片与 M4-U5 预检**：Hero desktop 02/mobile 01 已由 Project owner 选中进入生产准备；下一步仍须闭合当前工具条款/账户 authority/publication rights、exact-canvas master、五类审核、Guide 自有 Hero、双语术语、Source 标题 locale、CJK 工具门禁和正式字体页面判断。候选满足后，另行授权服务/浏览器，仅在 noindex review 直达页与真实空索引完成键盘、200% 缩放、禁用 JavaScript、reduced motion、图片失败、性能、跨平台字体和视觉预检；通过后才可进入 `ready`。该预检不关闭 M4-U5，published 投影仍为空。
2. **M5 外部交互边界**：按独立需求确认 newsletter、Reader Request、最小分析、隐私与 Mock/真实联调边界；不让这些能力反向改写静态内容和发布状态合同。
3. **M6 完整本地发布候选**：完成 6 篇内容、至少 2 个合集页和全部视觉内容包；Project owner 在完整 inventory 上逐项作出 `published` 决定。`published` 表示可以进入 public artifact，不表示已部署、远端预览或生产上线。
4. **M4-U5 最终关闭**：在真实非空 Explore/Collections 和最终页面/资产/字体上重跑全部 U5 门禁；实质内容、状态、模板、资产或样式变化都使受影响的预检证据失效。
5. **Public origin 与 M4-U4B**：最终 U5 通过后明确真实 HTTPS origin；没有自有域名时，先单独授权建立 Vercel 项目身份以确认稳定 production alias/hostname，但不得部署 review 输出。随后接入 public intent/runner、六类页面 metadata、Sitemap/RSS endpoint、字体/U5 readiness 消费、本地 verification receipt 与独立 public output verifier。receipt 记录源 revision、dirty flag、lock/source digest、public intent 与 verifier 结果，dirty source 一律 nondeployable；M6 远端预览再把干净已提交源、验证结果与具体 deployment target 绑定为 `validated_source_identity`。一个 Entry + 一个 Collection 仍只是纯技术 fail-closed 下限，实际预览候选为 6 篇 Entry / 至少 2 个 Collection。
6. **M6 Vercel 预览**：完整本地 public 候选通过后，才可单独授权受保护的远端预览，并验收账户、保护、地区表现、回滚与退出方案。
7. **M7 生产发布与发布后基线**：预览验收完成后再逐次授权生产发布，并建立只读发布后检查。每一步都不自动授权下一步。

## 项目负责

- 用自然英文讲清中国神话、志怪、民间信仰、文学故事与历史人物传说化过程。
- 用可追溯出处、明确版本差异与原创插画建立长期可搜索的内容资产。
- 将每篇内容组织成网站文章、主题合集和静态视觉分发素材。
- 在不破坏阅读体验与编辑独立性的前提下，为读者选题反馈及后续商业化保留演进路径。

## 项目不负责

- 不宣称建立唯一、统一或完整的“中国神话宇宙”，也不替代学术研究与宗教实践指导。
- MVP 不提供账号、评论、收藏、公开社区、付费权限、互动关系图或视频内容。
- 不在线运行 ComfyUI，不在访问时动态生图，也不把 AI 搜索、机器翻译或生成图当作人物、传说与术语的事实来源。
- 不把现代游戏、影视、插画或译本当作可自由复用的公共领域素材。

## 当前主链路

M2/M3-U5 已建立本地静态应用、视觉资产合同和非默认生产复核链路：`Entry Markdown / 结构化 YAML + visual brief / production record / versioned manifest -> 严格 Schema -> 纯内容图与视觉资产图/文件校验 -> 显式 current resolver -> published-only release / review 投影 -> Astro review 静态路由 -> dist/`。当前真实 inventory 包含两份 approved brief、两份 production record、五份 manifest 版本记录与七份 repository source rendition；四个既有逻辑资产各有且仅有一份 approved/current manifest，Hero v1 的两份 source 与版本记录保留为 approved/non-current 历史。Chinese Underworld brief 尚无 manifest；Project owner 已从 Git-ignored local explore 候选中选中 desktop 02/mobile 01 进入生产准备。默认 review 构建生成 Home、Explore、Collections、About、一个 Collection 与两个 Entry 共 7 个 `noindex, nofollow` 页面；Explore/Collections 通过 release 投影只列 published 内容，因此当前显示真实空状态，固定 Home 纵切片是唯一 non-published 选择例外。M4-U4A 另建立尚未接线的 HTTPS origin 校验、public 最小内容量、metadata/JSON-LD 与 Sitemap/RSS 纯门禁；这些模块尚未被 Layout、页面或 endpoint 消费，缺失、`public` 或未知 build intent 仍失败，默认 `dist/` 继续没有发布型 SEO 输出。钟馗 Hero 从 versionless `assetId` 经过 approved/current 门禁解析 v2，并生成 14 个页面实际使用的 AVIF/WebP 输出；Collection 使用无图 CSS realm surface，并已具备未来独立 approved Hero 的模板插槽。两个 Entry 和唯一 Collection 的当前编辑形态已获阶段性接受，仍保持 `editorial-review`；正文、摘要、Source/Claim/Terminology、可见 byline 与 fact-check 日期已显式渲染，不由模板 fallback 或 Claim 自动补写。生产字体另有 4 份英文 WOFF2、两份许可证和 hash inventory；CJK 文件为空。非默认 `visual:build:check` 继续复核七个 local master，并按三份 current responsive buildPlan 实际生成和解码验证 22 个 AVIF/WebP 目标。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 继续组成冻结的 M1 独立原型，不属于应用构建输入。目标体验与内部生产仍必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。轻量出处随相关主张出现；完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前已有本地应用开发与自动验证环境；页面候选曾按 Project owner 单独授权启动本地 preview 与浏览器，评审结束后已按授权停止，`127.0.0.1:4321` 当前不可达。该次授权不建立可复用的服务或发布许可。Vercel 已被选为未来静态托管目标，但项目仍没有真实联调环境、数据库、Vercel 项目、稳定 production alias/hostname、站点 origin 或远端发布资源。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地应用、文档与原型工作区 | `F:\codex-project\mythic-china` | M4-U3 实现与原收口文档已由 Project owner 提交为 `e94eaca`（`updatee`）；M4-U4A 与首个纵切片候选以该提交为写入基线，未执行 fetch，代理未执行 Git 写操作 | 固定 Node、pnpm、构建、验证与 Git 命令见 `DEV_WORKFLOW.md` | 本地 `editorial-review` 内容、两份 approved brief、两份 production record、五份 manifest、七份 approved repository source rendition、4 份英文 WOFF2 与 Project owner 已选中的 Git-ignored Hero A desktop/mobile 候选；Collection 仍无 asset/manifest，CJK 文件为空，无数据库或真实外部写入口 | M4-U4A 纯门禁、首个纵切片编辑/视觉/英文字体候选与 noindex review 回归；不含 Hero 资产批准、CJK 字体完成、deployable public build、M4-U5/M4-U4B、远端部署或发布 |

当前没有生产常驻进程或由站点管理的数据库、消息系统、缓存、对象存储。`dev` / `preview` 是会改变本地运行状态的临时评审操作，不是只读健康检查；端口或 HTTP 可达性检查只用于观测既有进程，不得隐式启动、修复或重启服务。未来标准静态部署也不得在未更新架构、需求与 `DEV_WORKFLOW.md` 的情况下创建、重建、重启或清空外部基础设施。

## 项目构建与运行

项目已经手工最小初始化；不使用 starter、adapter、MDX、UI/CSS/动画框架或外部服务。本机命令继续按 `DEV_WORKFLOW.md` 将 `D:\Program Files\nvm\v24.16.0` 置于当前进程 PATH 首位，并通过同目录 Corepack 调用 pnpm `11.22.0`；package scripts 的运行时守卫只校验 `engines.node` 对应的可移植版本范围，不比较机器绝对路径，以便干净 clone、CI 和未来托管构建使用各自受控的 Node 安装。直接使用当前公开 PATH 的旧 Node/pnpm 仍不受支持。`dev` 与 `preview` script 虽已存在，但启动服务仍需单独授权。完整边界见 `docs/ARCHITECTURE.md` 与 `docs/CONTENT_MODEL.md`。

## 当前最小验证

工作目录、固定运行时身份、聚合 `check`、定向验证、文档占位符、严格 UTF-8、相对 Markdown 链接、干净安装和停止条件均以 `DEV_WORKFLOW.md` 的对应章节为唯一可执行来源，不在本文件复制命令。当前聚合门禁覆盖 Prettier check、ESLint、Vitest、`astro check`、静态 build 与 review output verifier；最近一次结果摘要见“当前状态”，历史结果不替代下一次改动后的匹配验证。

## 目录说明

- `docs/PRODUCT.md`：产品需求、目标用户、MVP、指标、扩展与商业化边界。
- `docs/DESIGN.md`：项目级视觉系统、页面结构、动效和无障碍规范。
- `docs/COMPETITIVE_AUDIT.md`：直接竞品与相邻标杆的观察、可借鉴项、不采用项和 M1 比较门禁。
- `docs/ARCHITECTURE.md`：静态优先技术架构、数据边界和升级触发条件。
- `docs/CONTENT_MODEL.md`：内容分类、声明与术语记录、工具无关的视觉资产及读者反馈模型。
- `docs/REFERENCES.md`：本轮外部参考、视觉 Skill/工具采用边界与用途说明。
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线合同，`003` 保存 M4 页面、探索与 SEO 的详细合同、状态投影、实施单元和验收门禁，`004` 保存首个纵切片的编辑、Collection Hero 与生产字体候选检查点；这些目标合同和执行快照不自动代表当前实现或已交付状态。
- `src/`：Content Layer、视觉资产加载/校验/current resolver、纯 release/review 投影、尚未接线的 public SEO/artifact builder、共享生产壳、真实页面模板与静态路由。
- `tests/`：内容、视觉资产、页面投影、public SEO/artifact、resolver、运行时和架构边界 Vitest。
- `scripts/`：固定 Node 子进程身份、review build intent、静态输出和视觉资产构建的稳定 runner/verifier；命令和影响只看 `DEV_WORKFLOW.md`。
- `prototypes/`：不可发布的静态视觉评审原型；不代表应用实现或已核准内容，工作母版与探索废图不应进入正式代码仓库。
- `package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml`：精确依赖、唯一锁、pnpm 11 发布成熟期例外与显式第三方 build-script 拒绝策略；不得另建 lock。

## 文件地图

### 治理文档

- `AGENTS.md`：AI 入口、最高优先级授权边界和文档索引。
- `AI_COLLABORATION.md`：任务分级、协作生命周期、证据和收口。
- `PROJECT_RULES.md`：项目特有且可验证的架构红线。
- `STYLE.md`：工程、内容和命名风格。
- `DEV_WORKFLOW.md`：启动、验证、Git 与发布命令的唯一来源。
- `REQUIREMENT_DEVELOPMENT.md`：需求拆解和验收文档标准。

### 产品与设计文档

- `docs/PRODUCT.md`：产品范围与阶段路线合同。
- `docs/DESIGN.md`：视觉方向与设计约束合同。
- `docs/COMPETITIVE_AUDIT.md`：竞品定位与设计差异化的审计证据。
- `docs/ARCHITECTURE.md`：目标技术边界合同。
- `docs/CONTENT_MODEL.md`：编辑、引用和视觉资产合同。
- `docs/REFERENCES.md`：外部来源索引。

## 需求开发口径

以下任一情况必须基于 `REQUIREMENT_DEVELOPMENT.md` 在 `docs/requirements/` 建立需求文档：

- 新增页面、栏目、内容类型或用户可观察行为。
- 内容 Schema、稳定 ID、URL、引用、图片清单或商业披露字段变化。
- 引入依赖、外部服务、表单、分析、支付、数据库或发布环境。
- 需要多个实施单元、真实浏览器验收或远端发布。

需求文档保存当前已确认的目标业务合同、决策和验收证据，不自动代表当前实现或已交付状态。只有实现和匹配验证完成后才可标记已交付；若需求或阶段材料与代码、测试、本文件的当前状态或真实现场不一致，先报告差异并按 `AGENTS.md` 的文档权威层级更新负责该事实的来源，不得用阶段记录覆盖现状。

## 发布口径

当前没有已建立或获授权的远端发布环境/任务；Vercel 只是已确认的未来静态托管目标。首个纵切片只先完成 noindex U5 预检；M6 完整 6 篇 Entry / 至少 2 个 Collection inventory 与人工 `published` 决定后，必须在真实非空索引上最终关闭 U5，再确认 public origin 并实施 M4-U4B。U4B 的技术最小 inventory 不等于远端预览或生产资格。为取得阶段性 origin 而建立 Vercel 项目身份仍须单独授权，且不等于预览或部署授权；远端预览保留给 M6 完整候选，生产发布与发布后基线保留给 M7。U4B 只形成本地 verification receipt；M6 才把同一个干净已提交源、验证结果和 deployment target 绑定为 `validated_source_identity`。若未来复用不可变制品，receipt 还必须包含完整 artifact inventory/digest；部署、表单真实写入、分析埋点、支付和线上数据操作分别授权、分别验收。

## AI 协作口径

- 默认按可独立验证的最小单元推进。
- 事实、推断和未验证风险必须分开表达。
- 外部网页、书籍、图片或研究资料进入项目结论时，必须在正文附近标注出处，并在需要时登记到 `docs/REFERENCES.md`。
- 扩大范围、引入依赖、修改配置、启动服务、提交、推送和发布遵循 `AGENTS.md` 与 `AI_COLLABORATION.md`。
