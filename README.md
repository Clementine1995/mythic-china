# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 阶段：M1 已冻结为工程参考；M2 与 M3 已完成并形成历史基线 `f258227`、`c606f5`。M4-U1/U2 的历史基线为 `5f327b6`，M4-U3 历史基线为 `e94eaca`，首个纵切片 release-readiness 基线为 `eb6e20c`；后续检查点包含 `a3194d0`、`d60691a`、CJK 字体提交 `9434a76` 与 M4-U5/功能页提交 `e2893d1`。经 2026-09-02 项目总检与范围重定界，M4 本地产品实现已完成：U1–U3、U4A 纯基础设施、U5A 字体样张、最终三档基础矩阵及当前 8 页人工视觉判断均已闭合。当前完成事实绑定未提交工作树；public artifact、发布候选 QA、远端预览与发布不属于 M4，仍未完成。
- 当前实现：默认 review 构建生成原 7 个内容/功能页，加一个只允许直达访问的 `/review/type-specimen/`，共 8 个 `noindex, nofollow` 页面与 42 个 Hero AVIF/WebP。样张不进入 Header/Footer、Home、review candidate 或 release/public 投影；Home/钟馗 Entry 使用 Zhong Kui Hero v2，Chinese Underworld Collection 使用自己的 Hero v1，Guide Entry 使用自己的 Guide Hero v1；真实 inventory 仍为 0 published Entry / 0 published Collection。Explore/Collections 保留真实 published 空状态，同时仅在 review 构建展示由固定 Home Collection 及其 `entryIds` 精确派生、明确标注 `Not published` 的一个 Collection 与两个 Entry 候选架；纯 release/public 投影仍为 published-only。M4-U4A 已建立 HTTPS origin 校验合同、公共身份、public 最小 inventory 门禁及 canonical/OG/JSON-LD/Sitemap/RSS 纯 builder，但没有 public runner、Layout/路由/endpoint 接线或 public `dist/`。
- 编辑/视觉状态：两篇首发 Entry 与唯一 Collection 的 `editorial-review` 形态已获 Project owner 阶段性接受；Project owner 又以 `Project owner (user-confirmed)` bilingual reviewer 身份批准两份 Terminology 为 `bilingual-approved`，并把四条馆藏中文标题的正字 locale 核定为 `zh-Hant`。Collection Hero 与 Guide Hero 均已完成 Project owner 选图、Guide/Collection 各自的账户与权利确认、五类人工审核、exact-canvas master、production record、approved/current manifest、repository source 和所属内容的 versionless `assetId` 绑定；Entry/Collection 状态没有因此提升。
- 当前验证：固定本机 Node/Corepack 下完整 `pnpm run check` 通过 23 个测试文件/279 项测试，Astro 73 文件零诊断，默认 review 构建通过精确 8 页/42 个 Hero 图片/10 个 hash-locked WOFF2/零 XML/零客户端 JavaScript，并通过 CJK 生产来源、构建后 CSS、有效 glyph cmap、原 7 页实际 content set、样张 20 个角色/权重/语言/fallback 组合与实际应用 CSS 映射、HTML5 活跃语义壳与 head/robots/discovery、DOM/标签关联、功能伪类 selector 与几何可见性、HTML/CSS 子资源到真实输出 inventory 的闭合、输出 symlink/junction fail-closed、等价直达链接、review inventory/导航以及 public SEO/artifact 负门禁。2026-09-02 在同一未提交源上重新构建并完成最终 review 的 8 页 × 390×844 / 768×900 / 1440×900 共 24 个实际视口组合：请求尺寸与 `innerWidth/innerHeight` 一致，全部无横向溢出、破图、样张错配、卡片重叠或 console warning/error，均保持唯一 main/H1、`noindex, nofollow`、零客户端脚本、字体 loaded 与正确的移动/桌面导航切换。最终样张 20/20 sample、14 张 card 在三档均可见且无裁切，页面实际观测 10 个 WOFF2；四条 Hero 页的 12 个组合均选择正确 mobile/desktop composition，图片自然尺寸非零、caption 可见，Collection copy 与 caption 不相交。非默认 `visual:build:check` 的既有证据为 11 个 local master、7 份 current responsive rendition 与 50 个实际 AVIF/WebP 输出复核，本批未改视觉链，未重跑该入口。
- 视觉/字体状态：M1 原型视觉皮肤仍未获批准；M4-U2 页面方向与此前 system fallback 三档视口已确认。Collection Hero 与 Guide 自有 Hero 的生产链均已闭合；4 份英文与 6 份 CJK WOFF2 静态门禁已通过。新的 noindex 样张覆盖 display/story/body、拼音/标点与 DESIGN 冻结混排行、SC/TC 400/500/600、65/36 个 required code points 与 `测`/`測` fallback-only probe；最终 HTML/CSS oracle 与 2026-09-02 三档浏览器矩阵已锁定生产 pinyin 语言、现有 token stack、权重/style、CJK inline boundary、20/20 可见样本及 10 个实际观测字体资源。Project owner 随后检查本批全部 8 个页面路由并明确回复“这些页面通过”，因此当前样张、Hero 裁切与页面阅读观感的人工判断已闭合。当前控制面仍不能读取实际 fallback face，也不能可靠派发真实 Tab/Enter/Space、制造 200% zoom、启用 reduced motion、禁用 JavaScript、阻断字体/图片或取得受控 LCP/CLS；macOS/iOS/Android fallback 仍未闭合。这些项目明确保留为 M6 最终 public artifact 与受保护预览的发布候选 QA，不写成已通过，也不阻塞 M4 本地实现收口或自动提升内容状态。
- 国际化状态：Project owner 已确认未来采用英语根路径 `/`、简体中文 `/zh-hans/`、预留繁体中文 `/zh-hant/` 的结构，并先以 Chinese Underworld Collection、Zhong Kui 与 Guide 三页做简中试点；该目标不阻塞英语 MVP。当前仍是英语单语 review 站，没有 locale-aware Schema、中文路由、语言切换、localized metadata 或 `hreflang`，本轮不实施这些能力。
- 托管与身份：未来静态托管目标为 Vercel；publisher 为 `Mythic China / Organization`，author 为 `Mythic China Editorial / Organization`，公共身份页为 `/about/`，当前采用 text-only Open Graph。项目仍没有稳定 Vercel production alias/hostname、真实站点 origin、远端发布环境或部署授权。
- 版本边界：本任务开始时工作树干净，HEAD、`main` 与未 fetch 的本地 `origin/main` 均为 `e2893d14d4960f71fe75bd240971aaa88656511c`；reflog 记录该提交已在本任务前由 push 更新 tracking ref，因此没有创建重复/空基线提交，也不改写其非 Conventional Commit 主题 `update`。本批没有创建分支、worktree 或仓库副本，未执行 fetch、add、commit 或 push；本地 tracking ref 不证明服务器端当前状态，精确身份仍须按 `DEV_WORKFLOW.md` 在操作前复核。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。当前权威日期为 2026-09-02。

## 当前接力顺序

1. **M4 本地产品实现已完成**：Collection/Guide Hero、双语术语、四条馆藏标题 locale、CJK 静态门禁、Windows/local 正式页基础矩阵、功能页修正、M4-U5A noindex 字体样张/自动负门禁、最终样张三档基础矩阵与 Project owner 对 8 个页面的视觉判断已形成。现有 review 输出继续不可部署，内容继续保持 `editorial-review`。
2. **M5 外部交互边界**：先建立独立详细需求，再确认 newsletter、Reader Request、最小分析、隐私与 Mock/真实联调边界；不让这些能力反向改写静态内容和发布状态合同。
3. **M6 内容与 public artifact assembly**：完成 6 篇内容、至少 2 个合集页和全部视觉内容包，在内容拥有的编辑、证据、术语、关系、批准资产与无障碍文案门禁满足后，由 Project owner 逐项作出 `published` 决定。随后确认真实 HTTPS origin，并接入原计划 M4-U4B 的 public intent/runner、六类页面 metadata、Sitemap/RSS endpoint 与独立 public output verifier。`published` 表示可以进入 public artifact，不表示已部署、远端预览或生产上线。
4. **M6 发布候选 QA 与受保护预览**：public assembly 实现稳定后，先由 Project owner 单独授权形成 clean committed source，再从该 revision 重新构建最终 public artifact，执行真实键盘、200% zoom、JavaScript-disabled、reduced motion、慢/阻断字体、图片失败、支持平台 fallback、最终视觉/目标读者检查与本地 LCP/CLS 基线，并生成 verification receipt。dirty source 上的检查只能形成 nondeployable 诊断记录，提交后不得直接沿用或“洗白”。全部通过后才可单独授权受保护远端预览，并验收账户、保护、地区表现、回滚与退出方案。任何实质内容、状态、模板、资产、样式或配置变化使受影响证据失效。
5. **M7 生产发布与发布后基线**：预览验收完成后再逐次授权生产发布，并建立 live smoke、回滚、目标地区复核与真实流量 RUM/p75 基线。每一步都不自动授权下一步。

简中本地化试点是独立后续轨道：实施前须另行授权，不进入上述英语 MVP 的阻塞链，也不要求中英文同步发布；具体启动时点留待实施批次确认。目标合同见 [`005-localized-content-pilot.md`](docs/requirements/005-localized-content-pilot.md)。

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

M2/M3-U5 已建立本地静态应用、视觉资产合同和非默认生产复核链路：`Entry Markdown / 结构化 YAML + visual brief / production record / versioned manifest -> 严格 Schema -> 纯内容图与视觉资产图/文件校验 -> 显式 current resolver -> published-only release / review 投影 -> Astro review 静态路由 -> dist/`。当前真实 inventory 包含三份 approved brief、四份 production record、七份 manifest 版本记录、11 份 repository source rendition 与 11 个 local master；六个逻辑资产各有且仅有一份 approved/current manifest，Zhong Kui Hero v1 的两份 source 与版本记录保留为 approved/non-current 历史。Chinese Underworld Collection 通过 versionless `asset-chinese-underworld-hero-primary` 解析自己的 approved/current Hero v1，Guide Entry 通过 versionless `asset-chinese-underworld-guide-hero-primary` 解析自己的 approved/current Hero v1。默认 review 构建生成 Home、Explore、Collections、About、一个 Collection、两个 Entry 与直达 type specimen，共 8 个 `noindex, nofollow` 页面；样张不进入内容/候选/public 投影，Explore/Collections 的 release 列表仍只消费 published 并显示真实空状态，另有一个只从固定 Home Collection 与其 `entryIds` 派生、明确标注 `Not published` 的 review-only 候选架。M4-U4A 另建立尚未接线的 HTTPS origin 校验、public 最小内容量、metadata/JSON-LD 与 Sitemap/RSS 纯门禁；这些模块尚未被 Layout、页面或 endpoint 消费，缺失、`public` 或未知 build intent 仍失败，默认 `dist/` 继续没有发布型 SEO 输出。Zhong Kui Hero v2、Collection Hero v1 与 Guide Hero v1 分别经过 approved/current 门禁，并在页面构建中各形成 14 个唯一 AVIF/WebP 输出；Home 与 Zhong Kui Entry 共用同一组 Zhong Kui 输出。两个 Entry 和唯一 Collection 的当前编辑形态已获阶段性接受，仍保持 `editorial-review`；正文、摘要、Source/Claim/Terminology、可见 byline 与 fact-check 日期已显式渲染，不由模板 fallback 或 Claim 自动补写。生产字体 inventory 现为 4 份英文 WOFF2 与 6 份 SC/TC 派生 WOFF2；CJK 链路为 `批准字符集 -> 固定 Adobe commit/input hash -> fontTools 实例化/子集/RFN 改名 -> OFL/FONTLOG -> CSS unicode-range -> fontkitten 源/产物 cmap -> parse5 HTML5 树 -> lang/content gate`，默认检查不依赖 Python。非默认 `visual:build:check` 复核 11 个 local master，并按七份 current responsive buildPlan 实际生成和解码验证 50 个 AVIF/WebP 目标。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 继续组成冻结的 M1 独立原型，不属于应用构建输入。目标体验与内部生产仍必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。轻量出处随相关主张出现；完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前已有本地应用开发与自动验证环境，但没有运行中的本地服务。历史 M4-U5A preview PID `9628` 与 2026-09-02 最终 U5 人工证据 preview PID `31960` 均已停止；Project owner 判断后回查 4321 无监听，验收标签也已清理。该次服务授权已消费，不形成后续可复用授权，也不构成常驻、真实联调、预览部署或生产环境。Vercel 已被选为未来静态托管目标，但项目仍没有数据库、Vercel 项目、稳定 production alias/hostname、站点 origin 或远端发布资源。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地应用、文档与原型工作区 | `F:\codex-project\mythic-china` | U5A 开始前 HEAD、`main` 与本地 `origin/main` 均为任务前已推送的 `e2893d1`；当前 U5A 工作树未提交，精确身份以 `DEV_WORKFLOW.md` 的执行前只读核查为准 | 固定 Node、pnpm、CJK 生产、构建、验证与 Git 命令见 `DEV_WORKFLOW.md` | 本地 `editorial-review` 内容、三份 approved brief、四份 production record、七份 manifest、11 份 repository source rendition、11 个 local master、4 份英文 WOFF2、6 份 CJK 派生 WOFF2，以及已分别绑定 Collection 与 Guide 的 approved/current Hero v1；无数据库或真实外部写入口 | M4-U4A 纯门禁、首个纵切片、8 页 noindex review、U5A 样张及可控 Windows/local 基础证据；不含 M6 public artifact assembly、最终 release-candidate QA、clean-source receipt、远端预览或发布 |

当前没有本地或生产常驻进程，也没有由站点管理的数据库、消息系统、缓存或对象存储。`dev` / `preview` 是会改变本地运行状态的临时评审操作，不是只读健康检查；端口或 HTTP 可达性检查只用于观测既有进程，不得隐式启动、修复或重启服务。未来标准静态部署也不得在未更新架构、需求与 `DEV_WORKFLOW.md` 的情况下创建、重建、重启或清空外部基础设施。

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
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线合同，`003` 保存 M4 页面、探索与 SEO 的详细合同、状态投影、实施单元和验收门禁，`004` 保存首个纵切片的编辑、Collection/Guide Hero 候选检查点及后续生产闭环与生产字体状态，`005` 保存已确认但尚未实施的本地化内容试点合同；这些目标合同和执行快照不自动代表当前实现或已交付状态。
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

当前没有已建立或获授权的远端发布环境/任务；Vercel 只是已确认的未来静态托管目标。M4 只完成 noindex 本地产品实现、published-only 投影和 public/SEO 纯 builder，不产生 deployable public artifact。M6 完整 6 篇 Entry / 至少 2 个 Collection inventory 与人工 `published` 决定后，确认 public origin，并实施 public artifact assembly；其一个 Entry + 一个 Collection 仍只是技术 fail-closed 下限，不替代实际预览候选。实现稳定后须由 Project owner 单独授权形成 clean committed source，并从该 revision 重新构建真实非空 public artifact、运行独立 output verifier 与最终发布候选 QA。dirty source 上的结果只能记录为 nondeployable 诊断，后续提交不能直接继承该 artifact、QA 或 receipt。为取得阶段性 origin 而建立 Vercel 项目身份仍须单独授权，且不等于预览或部署授权；远端预览保留给 M6 完整候选，生产发布与发布后基线保留给 M7。M6 最终 verification receipt 必须绑定 clean source revision、lock/source digest、public intent、verifier/QA 结果与 `dirty: false`；远端预览再把同一个 clean committed source、验证结果和 deployment target 绑定为 `validated_source_identity`。若未来复用不可变制品，receipt 还必须包含完整 artifact inventory/digest；部署、表单真实写入、分析埋点、支付和线上数据操作分别授权、分别验收。

## AI 协作口径

- 默认按可独立验证的最小单元推进。
- 事实、推断和未验证风险必须分开表达。
- 外部网页、书籍、图片或研究资料进入项目结论时，必须在正文附近标注出处，并在需要时登记到 `docs/REFERENCES.md`。
- 扩大范围、引入依赖、修改配置、启动服务、提交、推送和发布遵循 `AGENTS.md` 与 `AI_COLLABORATION.md`。
