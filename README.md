# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 阶段：M1 已冻结为工程参考；M2 与 M3 已完成并形成历史基线 `f258227`、`c606f5`。M4-U1/U2 的历史基线为 `5f327b6`，M4-U3 为 `e94eaca`，首个纵切片 release-readiness 为 `eb6e20c`；后续检查点包含 `a3194d0`、`d60691a`、CJK 字体提交 `9434a76` 与 M4-U5/功能页提交 `e2893d1`。经 2026-09-02 项目总检与范围重定界，M4 本地产品实现由 Project owner 提交为 `3983bee`；M5-U1–U3、U4 账户准备快照与第二 Collection 决策包随后提交为 `3fa46d5`。Project owner 后续确认 007 推荐、Liaozhai 任笃行 2016 主/张友鹤 2011 对校路线及《促织》青柯亭单见证路线，并逐次授权四篇研究、证据闭合、最小 draft Entry owner 及证据已闭合子集的 Source/Claim/Terminology 物化；这些结果与 Buttondown 审核事实同步已形成本地检查点 `9914dd3`。Project owner 又批准 Ten Kings 单篇纵切片并授权本地提交；随后另行授权 Fighting Cricket 单见证纵切片，并在中文概要复核后确认内容符合预期、授权本地提交。两篇均已进入当前本地 HEAD。未处理图片、Collection 关系、状态、public artifact、外部服务或发布，也未 fetch 或 push。tracking ref 不单独证明服务器端状态。
- 当前实现：默认 review 构建在 M5-U3 的 9 页历史基线上新增四个 direct-only draft Entry 路由，现按精确清单生成 13 个 `noindex, nofollow` 页面与既有 42 个 Hero AVIF/WebP。全站 Footer 恰有一个 disabled/inactive Newsletter，六个 Entry 在 Sources 与继续阅读路径后各有一个 disabled/inactive Reader Request；它们只显示用途、字段/独立 consent、未开放状态与本地 Privacy 链接。M5-U2 的三个 `src/services/` 仍只提供 strict provider-neutral 合同与零网络 Fake。站点与仓库中没有 form、Buttondown action/link、Tally hosted link、Plausible 脚本、配置、存储或真实 transport。当前内容 inventory 为 6 篇 Entry（2 `editorial-review` + 4 `draft`）、1 个 `editorial-review` Collection、14 份 Source、19 份 Claim 与 5 份 Terminology；published Entry / Collection 仍为 0/0。`ten-kings` 已消费 2 Source、3 Claim 与 1 份 `source-checked` Terminology，并形成两段 opening、110 词摘要及四节证据受限正文；`fighting-cricket` 已消费 1 Source、3 Claim 与 1 份 `source-checked` Terminology，并形成两段 opening、104 词摘要及四节单见证正文；`liaozhai-reading-guide` 与 `painted-skin` 仍为空 draft。四篇的 Collection/related 关系与视觉字段均为空，M4 public SEO/artifact 纯 builder 仍未被 Layout/路由/endpoint 接线。
- 编辑/视觉状态：两篇首发 Entry 与唯一 Collection 的 `editorial-review` 形态已获 Project owner 阶段性接受；Project owner 又以 `Project owner (user-confirmed)` bilingual reviewer 身份批准两份 Terminology 为 `bilingual-approved`，并把四条馆藏中文标题的正字 locale 核定为 `zh-Hant`。Collection Hero 与 Guide Hero 均已完成 Project owner 选图、Guide/Collection 各自的账户与权利确认、五类人工审核、exact-canvas master、production record、approved/current manifest、repository source 和所属内容的 versionless `assetId` 绑定；Entry/Collection 状态没有因此提升。
- 当前验证：证据物化批的定向测试先通过 3 个文件/35 项测试；Ten Kings 内容纵切片完成后的完整门禁保留为历史证据。Fighting Cricket 内容纵切片完成后，完整 `pnpm run check` 最终通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier。首次完整构建正确拦截了既有 Source 馆藏号在英语语义下显示未锁定繁体字符；经 Project owner 单独授权，只把可见 Record 规范为 ASCII，并在 Source notes 保留精确馆藏号，未修改字体、模板或 Schema。HTML5 DOM oracle 逐页验证 Newsletter、六个 Entry 的 Reader Request、Privacy、顺序/唯一性、disabled/inactive 状态、稳定 page ID、零 provider link/form/script 和零假成功；构建仍为 13 页/42 Hero/10 hash-locked WOFF2/零 XML/零客户端 JavaScript。M5-U3 的 3 文件/79 测试、25 文件/320 测试与 9 页输出保留为历史基线；2026-09-02 的 24 个 M4 实际视口组合、12 个 Hero art-direction 组合与 Project owner 当时 8 页判断也仍是历史证据，均不覆盖四个新增 draft 页面。新页面未做真实浏览器/键盘/缩放验收；非默认 `visual:build:check` 不适用，因为本批没有修改图片、manifest 或 master。
- 视觉/字体状态：M1 原型视觉皮肤仍未获批准；M4-U2 页面方向与此前 system fallback 三档视口已确认。Collection Hero 与 Guide 自有 Hero 的生产链均已闭合；4 份英文与 6 份 CJK WOFF2 静态门禁已通过。新的 noindex 样张覆盖 display/story/body、拼音/标点与 DESIGN 冻结混排行、SC/TC 400/500/600、65/36 个 required code points 与 `测`/`測` fallback-only probe；最终 HTML/CSS oracle 与 2026-09-02 三档浏览器矩阵已锁定生产 pinyin 语言、现有 token stack、权重/style、CJK inline boundary、20/20 可见样本及 10 个实际观测字体资源。Project owner 随后检查本批全部 8 个页面路由并明确回复“这些页面通过”，因此当前样张、Hero 裁切与页面阅读观感的人工判断已闭合。当前控制面仍不能读取实际 fallback face，也不能可靠派发真实 Tab/Enter/Space、制造 200% zoom、启用 reduced motion、禁用 JavaScript、阻断字体/图片或取得受控 LCP/CLS；macOS/iOS/Android fallback 仍未闭合。这些项目明确保留为 M6 最终 public artifact 与受保护预览的发布候选 QA，不写成已通过，也不阻塞 M4 本地实现收口或自动提升内容状态。
- 国际化状态：Project owner 已确认未来采用英语根路径 `/`、简体中文 `/zh-hans/`、预留繁体中文 `/zh-hant/` 的结构，并先以 Chinese Underworld Collection、Zhong Kui 与 Guide 三页做简中试点；该目标不阻塞英语 MVP。当前仍是英语单语 review 站，没有 locale-aware Schema、中文路由、语言切换、localized metadata 或 `hreflang`，本轮不实施这些能力。
- 托管与身份：未来静态托管目标为 Vercel；publisher 为 `Mythic China / Organization`，author 为 `Mythic China Editorial / Organization`，公共身份页为 `/about/`，当前采用 text-only Open Graph。Project owner 当前明确不购买自定义域名；项目仍没有 Vercel 项目、稳定 production alias/hostname、真实站点 origin、远端发布环境或部署授权，M6 只能在单独授权后采用稳定 production hostname，generated preview/commit URL 不得成为 canonical。
- 版本边界：2026-09-02 进入 M5 前只读复核确认 HEAD 与本地 `main` 为 `3983bee91ada4a286613ec702a8009a4f528af3f`，后续本地 `origin/main` tracking ref 由外部 push 对齐；Project owner 又把 M5 与 007 状态提交为 `3fa46d5f85c43a5278e15ca6b0630d724439acc9`。本轮按用户确认的建议把四篇研究、证据最小物化及相关状态同步提交为本地检查点 `9914dd304467118b2c32f7f8ac192cc00344fb92`；Ten Kings 内容纵切片随后以 `feat: draft Ten Kings evidence slice` 进入本地提交 `a5a15a5c74f7a18a8c15e0cdd5ac1e44574151c2`，Fighting Cricket 纵切片则在 Project owner 确认中文概要符合预期并授权后随本地检查点进入当前 HEAD。当前 `main` 相对未 fetch 的本地 `origin/main` 显示 ahead 3；未 fetch、push、建分支或 worktree。tracking ref 仍不能替代服务器端只读复核，精确身份须按 `DEV_WORKFLOW.md` 在操作前复核。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。当前权威日期为 2026-09-04。

## 当前接力顺序

1. **M4 本地产品实现已完成**：Collection/Guide Hero、双语术语、四条馆藏标题 locale、CJK 静态门禁、Windows/local 正式页基础矩阵、功能页修正、M4-U5A noindex 字体样张/自动负门禁、最终样张三档基础矩阵与 Project owner 对 8 个页面的视觉判断已形成。现有 review 输出继续不可部署，内容继续保持 `editorial-review`。
2. **M5 外部交互边界**：[`006-external-interactions.md`](docs/requirements/006-external-interactions.md) 的 U2 provider-neutral 合同/Fake 与 U3 inert Newsletter、Reader Request、Privacy 及完整本地门禁已完成。Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过；Tally Free 账户与未发布 Reader Request 草稿已准备。审核通过只关闭等待审核门槛：两者仍未接入站点、未提供 action/hosted link、未导入订阅者、发送邮件或处理提交，Plausible 留 U5；下一停点须分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 草稿发布、精确 hosted link、合成数据写入、回查和删除。当前仍不渲染可提交表单、不接真实网络，也不让这些准备状态反向改写静态内容和发布状态合同。
3. **M6 内容与 public artifact assembly**：Project owner 已确认 [`007-second-collection-decision.md`](docs/requirements/007-second-collection-decision.md) 的 Liaozhai 第二 Collection 方向、3+3 分配、公开顺序、Zhong Kui Featured 与《促织》保留；又确认 Liaozhai 采用任笃行 2016 主、张友鹤 2011 对校的工作路线，以及《促织》只按上海图书馆青柯亭单见证叙事。本轮已按 [`008-four-entry-claim-maps.md`](docs/requirements/008-four-entry-claim-maps.md) 建立四个最小 draft Entry owner，并物化证据已闭合的 5 份 Source、9 份 Claim 与 3 份 `source-checked` Terminology；随后分别完成 Ten Kings 与 Fighting Cricket 单篇纵切片，前者只消费 2 Source / 3 Claim / 1 Terminology，后者只消费 1 Source / 3 Claim / 1 Terminology，均保持 `draft`。CText/Giles、尚未取得实际册页的任/张记录，以及《促织》跨见证、作者归属和“首次增写”均未纳入。下一内容停点应在两篇现有首稿的编辑/双语审校、取得任/张实际册页，或 `liaozhai-reading-guide` / `painted-skin` 的逐篇证据受限写作中单独选择；图片、Collection 关系、状态与 public artifact 仍须分别授权。Project owner 作出 `published` 决定后，才确认 HTTPS origin 并实施 public artifact assembly；当前结果不表示已部署或上线。
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

M2/M3-U5 已建立本地静态应用、视觉资产合同和非默认生产复核链路：`Entry Markdown / 结构化 YAML + visual brief / production record / versioned manifest -> 严格 Schema -> 纯内容图与视觉资产图/文件校验 -> 显式 current resolver -> published-only release / review 投影 -> Astro review 静态路由 -> dist/`。M5-U2 另建立不进入页面/构建输出的交互合同链：`unknown input -> strict provider-neutral Schema/allowlist -> redacted result -> injected zero-network Fake`。M5-U3 在 9 页 noindex review 历史基线中加入 `inactive Newsletter / Reader Request -> local Privacy notice -> fail-closed DOM oracle`；本轮四个 draft Entry 通过既有动态路由把当前 review 精确清单扩为 13 页，六个 Entry 均保留同一 inactive Reader Request 行为。三类 service 仍没有 provider mapping、配置、存储或网络，public 纯 builder、Hero/字体、CJK 与内容状态未被改写。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 继续组成冻结的 M1 独立原型，不属于应用构建输入。目标体验与内部生产仍必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。轻量出处随相关主张出现；完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前已有本地应用开发与自动验证环境，但没有运行中的本地服务。历史 M4-U5A preview PID `9628` 与 2026-09-02 最终 U5 人工证据 preview PID `31960` 均已停止；Project owner 判断后回查 4321 无监听，验收标签也已清理。M5-U2/U3 只运行本地自动化和静态 build：Fake 测试证明零网络，U3 output verifier 证明零 form/script/provider link，不构成供应商联调或常驻环境。Vercel 已被选为未来静态托管目标，但项目仍没有数据库、Vercel 项目、稳定 production alias/hostname、站点 origin 或远端发布资源。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地应用、文档与原型工作区 | `F:\codex-project\mythic-china` | M4 基线为 `3983bee`；M5-U1–U3、U4 准备快照与 007 基线为 `3fa46d5`；四篇研究与证据最小物化检查点为 `9914dd3`；Ten Kings 与 Fighting Cricket 纵切片均已进入当前本地 HEAD。当前 `main` 相对未 fetch 的 tracking ref ahead 3；未 fetch 或 push，服务器端状态仍须另行复核 | 固定 Node、pnpm、CJK 生产、构建、验证与 Git 命令见 `DEV_WORKFLOW.md` | 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology、既有资产/字体 inventory、三个 provider-neutral service/零网络 Fake、13 页 inert review UI 与 Privacy；Ten Kings 与 Fighting Cricket 已有证据受限 draft，外部已有审核通过的 Buttondown 账户及 Tally Free 未发布草稿，但仓库无凭据、action/link、provider 配置、数据库或外部写入口 | M4 review/public 纯门禁、M5-U2 内存合同、M5-U3 静态 UI/output 验证，以及 007/008 方向、研究、证据最小物化与两篇单篇纵切片；不含真实联调、图片、Collection 新关系、状态提升、M6 public artifact assembly、最终 release-candidate QA、clean-source receipt、远端预览或发布 |

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
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线合同，`003` 保存 M4 页面、探索与 SEO 的详细合同、状态投影、实施单元和验收门禁，`004` 保存首个纵切片的编辑、Collection/Guide Hero 候选检查点及后续生产闭环与生产字体状态，`005` 保存已确认但尚未实施的本地化内容试点合同，`006` 保存 M5 外部交互、隐私、供应商与 Mock/真实联调边界，`007` 保存第二个 MVP Collection 的比较、推荐与 owner 确认，`008` 保存四篇新增候选的 claim map、正式书目、分层证据账本、精确 locator、术语/版本门禁、最小证据物化及 Ten Kings / Fighting Cricket 单篇纵切片记录；内容对象、正文、资产、关系和状态分别按各次授权边界判断，不能由方向或研究结果自动推导。
- `src/`：Content Layer、视觉资产加载/校验/current resolver、纯 release/review 投影、尚未接线的 public SEO/artifact builder、共享生产壳、真实页面模板/静态路由、M5-U2 provider-neutral service/Fake，以及 M5-U3 Newsletter/Reader Request/Privacy inert review UI。
- `tests/`：内容、视觉资产、页面投影、public SEO/artifact、resolver、运行时、架构边界、M5-U2 外部交互纯合同与 M5-U3 页面/output policy Vitest。
- `scripts/`：固定 Node 子进程身份、review build intent、静态输出和视觉资产构建的稳定 runner/verifier；review verifier 现包含 M5-U3 HTML5 DOM oracle，命令和影响只看 `DEV_WORKFLOW.md`。
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
