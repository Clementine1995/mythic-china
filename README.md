# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

文档核对日期及最近发布：2026-09-15。正式站点已发布 clean source `73e482a0647d28d420363fbfd2864c6ee0369c46`，141 个公开文件的 HTTP、类型、长度和 SHA256 全部匹配。RUM 客户端与接收端已开启，固定观察窗为 09-16 至 09-30 UTC；当前尚未开始采样，正式 MVP 验收继续等待真实数据及人工验证。

**当前阶段：英语阅读版 Public Beta / pending human validation。正式 MVP 范围已确认，验收尚未收口。**

Project owner 于 2026-09-12 确认正式 MVP 采用阅读版：保留现有 6 篇英语文章、2 个合集、各自主图、来源、导航、SEO、最小分析与既定验收。Newsletter、Reader Request 的真实启用，以及每篇正文插图和完整故事卡包，移至后续运营需求，不作为正式 MVP 收口前置，也不记为已完成。范围以 [PRODUCT](docs/PRODUCT.md#53-每篇内容包发布物清单不代表制作顺序) 和 [001](docs/requirements/001-mvp-foundation.md#31-完整-mvp-交付范围跨-m1m7) 为准。

| 领域 | 当前实现与已有证据 | 尚未完成或后移 |
| --- | --- | --- |
| 内容 | 6 published Entry、2 published Collection、14 Source、25 verified Claim、6 bilingual-approved Terminology；六篇 publishedAt 为 2026-09-10，updatedAt 为 null | 独立英语读者 R2a/R2b 尚未开始；owner 双语确认与 AI 审读不代替真人样本 |
| 插画与阅读 | 8 个 approved/current Hero family；13 个 public 页面，11 个含图页 / 19 个图位、112 个 AVIF/WebP、10 个字体；首页双专题、阅读路径、Sources、Related 与原生图注已实现 | 六篇正文均无正文插图，完整故事卡包为 0/6；钟馗 Lead/OG/Social 样例保留，后续运营另行交付 |
| 工程 | M1 冻结为工程参考，M2–M4 本地实现完成；013 public assembly 与 014–016 页面收尾已随站发布 | M1 旧视觉皮肤未获满意度批准，不影响后续独立验收的生产页面 |
| 发布 | [正式站点](https://mythic-china-beta.vercel.app) 已于 2026-09-15 01:22:44 UTC 提升 clean `73e482a0647d28d420363fbfd2864c6ee0369c46` / `dpl_5ivyuseZxGH4SjXYzETgyd1NbVJa`；141 文件 / 3,300,770 字节的匿名 HTTP、MIME、长度与 SHA256 全通过，API 再次核对正式 alias | 受保护候选已原样提升；未推送 Git。公开可索引不等于搜索引擎已收录 |
| GoatCounter | 正式启用；4 次页面浏览、3 次事件共 7 条受控计数，7 次实际请求头、6 次 HTTP 200；Related 响应未观测，后台确认收数；原生 DNT、受控退出和实际 BFCache 返回有证据 | 阅读和退出采用 CDP 焦点模拟；原生前后台完整流程、原生 GPC 及账户自动清理/实际导出注销未实测；预算已耗尽，不补发、不删除规范路径 |
| 表单 | Newsletter 默认关闭分支和 Reader Request 离线审核已实现；页面均为无控件 inactive 状态 | 真实启用后移，测试保持暂停；既有供应商记录的处理、保留和退出责任仍按 006，不因后移消失 |
| 性能与 RUM | RUM 已随 73e482a 发布，receiver=true、小时 Cron 正常；新窗已被自动维护，无异常、零样本。717 测试、132 文件零诊断、13 页 public/14 页 review 与 24 个隔离脚本场景通过 | 固定窗口为 09-16 至 09-30 UTC，尚未开始；真实传输/INP、完整观察结果、地区浏览器及三平台真机仍待验。预检 204 只证明 CORS 通道，不代表收数 |
| 中文与扩展 | 005 已确认三个既有对象的简中试点目标；当前英语根路径、中文专名和 CJK 字体已存在 | 中文路由、locale Schema、语言切换与 localized SEO 未实施；中文、搜索、扩栏、商业化均不阻塞英语阅读版 MVP |

证据入口：[生产验收与激活](DEV_WORKFLOW.md#goatcounter-生产验收与激活入口2026-09-10)、[发布后技术验收](DEV_WORKFLOW.md#发布后技术验收2026-09-10)、[内容与 Hero 审核](docs/requirements/012-five-hero-visual-briefs.md)、[Beta 退出条件](docs/requirements/011-public-beta-validation.md#23-beta-退出条件)。各阶段原始结果保留在 DEV_WORKFLOW 与对应需求的带日期记录中，不把旧“未发布”“未提交”当作当前状态。

两条公开阅读路径为“阴间指南 → 十王 → 钟馗 → 指南”和“聊斋导读 → 画皮 → 促织 → 导读”；Featured 分别为 Zhong Kui 与 Painted Skin。任/张现代校勘本、现代译本与影视直接比较已移出当前内容范围，不以缺少这些材料否定已批准的单见证正文。

## 当前接力顺序

1. 按阅读版范围维护已发布内容、来源、主图和导航；有实质变更时只重验受影响范围，不重做已完成的工程阶段。
2. 技术收口分轨推进：完整地区浏览器、三平台真机、017 真实 RUM 接通分别取得环境与授权后执行。RUM 本地实现无需重复；缺设备或账户不阻塞其他独立工作。
3. 有实际独立英语读者后，按 010/011 冻结 live 执行包并开展 R2a/R2b；缺样仍记 pending，不用 AI 或受控统计替代。
4. 中文三页试点、内容分发素材、未来表单启用可独立授权推进，不要求工作电脑常开，不自动恢复暂停的测试。
5. 001/011 收口仍需既定真机、地区性能、RUM、R2、问题处置与 owner 确认；仅 RUM 完整观察窗后不足流量的情况适用 011 既有接受限制条款。范围收敛不降低验收标准。

## 维护者操作指南

- [发版操作指南](docs/PUBLISHING_GUIDE.md)：本地检查、干净提交、发布包、候选验收、正式提升、回退与 Cloudflare 日常边界。
- [写文章与更新文章](docs/ARTICLE_WORKFLOW.md)：选题、来源、英文稿、草稿字段模板、Hero 审核、合集关系与新增文章所需工程接线。
- [日常可执行入口](DEV_WORKFLOW.md#日常维护与发版入口)：本机环境、检查/构建、审稿服务、精确提交和平台操作顺序。当前没有通用一键发布器，旧 `.local/` 执行包不能直接复用。

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

`Entry Markdown / Collection / Source / Claim / Terminology + visual brief / production record / manifest -> 严格 Schema -> 内容图与视觉资产图/文件校验 -> approved/current resolver -> published-only projection -> Astro public 静态页面、SEO、Sitemap/RSS/robots -> 经身份与验收门禁的 CDN 制品`。

默认 review 输出到 `dist/`，为 14 页 noindex/nofollow、零客户端 JavaScript，不可部署；显式 public 输出到 `.local/public-build/`，为 13 页和发现文件。已发布的 73e482a 同时包含独立 GoatCounter 与 RUM 接线，RUM 仅在正式 origin、批准路径和固定窗口内采集；正文与导航不依赖统计脚本。`rumDeployment = null` 时不输出 RUM 接线，Newsletter/Reader Request 仍无真实传输。

- 读者阅读：主视觉与标题 → 可选 content note → opening → Quick Answer → 故事与来源解释 → 完整 Sources → 合集/Related → 未开放的 Reader Request 说明 → Footer。
- 编辑生产：研究问题 → claim/source 与术语 → 英文正文和视觉 brief → 编辑/资产审核 → 状态批准 → 构建与发布验收。
- 后续反馈：只有独立启用需求完成后，才从外部提交进入人工筛选与选题；当前没有在线反馈链路。

## 当前运行口径

唯一保存项目为 `F:\codex-project\mythic-china`，生产已发布源码检查点为 `73e482a0647d28d420363fbfd2864c6ee0369c46`，未推送。新冻结包位于 `.local/rum-release-73e482a/`，部署及 QA/公开验证回执位于 `.local/rum-deployment-73e482a/`；旧包仅保留追溯。生产已使用同一冻结包；上线状态文档与维护指南按独立文档检查点管理，提交身份以 Git 历史为准，不改变生产制品身份。完整身份和执行结果见 [RUM 上线记录](DEV_WORKFLOW.md#rum-正式发布与收尾2026-09-15)。

最新站点运行回执为 2026-09-15 的 Vercel 静态 Public Beta 与 RUM 接线发布，GoatCounter 沿用既有配置。临时本地服务已关闭、凭据会话已清除；网站与 Cloudflare 小时任务不依赖工作电脑常开。接收开关 true，Logs/Traces 主开关关闭；新窗 maintenance 已自动推进到 01:01:35 UTC，invalid=null、测量为 0。旧未启用空窗保留取消快照；真实收数、INP、完整观察结果与运行限制仍按 017 验收。

`dev` / `preview` 会改变运行状态，不是只读健康检查；服务、供应商数据操作、推送与部署仍需各自授权。

## 项目构建与运行

项目已经手工最小初始化；不使用 starter、Astro 服务端 adapter、MDX 或 UI/CSS/动画框架；外部托管与统计的实际状态见上文。本机命令继续按 `DEV_WORKFLOW.md` 将 `D:\Program Files\nvm\v24.16.0` 置于当前进程 PATH 首位，并通过同目录 Corepack 调用 pnpm `11.22.0`；package scripts 的运行时守卫只校验 `engines.node` 对应的可移植版本范围，不比较机器绝对路径，以便干净 clone、CI 和未来托管构建使用各自受控的 Node 安装。直接使用当前公开 PATH 的旧 Node/pnpm 仍不受支持。`dev` 与 `preview` script 虽已存在，但启动服务仍需单独授权。完整边界见 `docs/ARCHITECTURE.md` 与 `docs/CONTENT_MODEL.md`。

## 当前最小验证

工作目录、固定运行时身份、聚合 `check`、定向验证、文档占位符、严格 UTF-8、相对 Markdown 链接、干净安装和停止条件均以 `DEV_WORKFLOW.md` 的对应章节为唯一可执行来源，不在本文件复制命令。当前聚合门禁覆盖 Prettier check、ESLint、Vitest、`astro check`、静态 build 与 review output verifier；最近一次结果摘要见“当前状态”，历史结果不替代下一次改动后的匹配验证。

## 目录说明

- `docs/PRODUCT.md`：产品需求、目标用户、MVP、指标、扩展与商业化边界。
- `docs/DESIGN.md`：项目级视觉系统、页面结构、动效和无障碍规范。
- `docs/COMPETITIVE_AUDIT.md`：直接竞品与相邻标杆的观察、可借鉴项、不采用项和 M1 比较门禁。
- `docs/ARCHITECTURE.md`：静态优先技术架构、数据边界和升级触发条件。
- `docs/CONTENT_MODEL.md`：内容分类、声明与术语记录、工具无关的视觉资产及读者反馈模型。
- `docs/REFERENCES.md`：本轮外部参考、视觉 Skill/工具采用边界与用途说明。
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线合同，`003` 保存 M4 页面、探索与 SEO 的详细合同、状态投影、实施单元和验收门禁，`004` 保存首个纵切片的编辑、Collection/Guide Hero 候选检查点及后续生产闭环与生产字体状态，`005` 保存已确认但尚未实施的本地化内容试点合同，`006` 保存 M5 外部交互、隐私、供应商与 Mock/真实联调边界，`007` 保存第二个 MVP Collection 的比较、推荐与 owner 确认，`008` 保存四篇新增候选的 claim map、正式书目、分层证据账本、精确 locator、术语/版本门禁、最小证据物化、四篇单篇纵切片与后续证据纠偏，`009` 保存两个三篇 Collection 阅读路径及本地 review 输出门禁，`010` 保存四篇英语文稿形成性审核协议、AI 修订边界、内容提示合同与目标读者审核流程，`011` 保存可索引 Public Beta、上线后 R2 与正式 MVP 收口合同，`012` 保存四篇 Entry 与 Liaozhai Collection 的五份 Hero-only visual brief，以及候选选择、账户与公开使用确认、exact-canvas、production lineage、五审、资产接线及 VB6 逐项 ready 审核和后续独立首发 published/日期决定；内容对象、正文、关系和状态仍按各次授权边界判断，不能由资产闭环自动推导。
- `src/`：Content Layer、视觉资产加载/校验/current resolver、纯 release/review 投影、含 Privacy 但已接线的 public SEO/artifact builder、共享生产壳、真实页面模板/静态路由、M5-U2 provider-neutral service/Fake、U5A 离线阅读状态判定、U5B 轻量清洗合同/GoatCounter adapter/DOM hook 与 M6 仅正式 origin 启用的 public bootstrap/配置，以及 M5-U3 Newsletter/Reader Request/Privacy inert review UI。
- `tests/`：内容、视觉资产、页面投影、public SEO/artifact、resolver、运行时、架构边界、M5-U2 外部交互纯合同、U5A 阅读判定、U5B 请求 mapping/DOM 生命周期与 M5-U3 页面/output policy Vitest。
- `scripts/`：固定 Node 子进程身份、review build intent、静态输出和视觉资产构建的稳定 runner/verifier；包括 HTML5 DOM、精确 ESM 依赖图、原始脚本隔离执行及只生成开窗 SQL 的入口，命令和影响只看 `DEV_WORKFLOW.md`。
- `src/rum/`、`workers/rum/`、`tests/rum/`：017 的客户端启用候选、独立 RUM 接收/存储/汇总与纯内存验证；已接入真实 endpoint 和拟定窗口，不进入正文数据链，运行启用与发布另行授权。
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

当前已验证发布源与完整文件核验以本文件“当前状态”和 DEV_WORKFLOW 最近发布记录为准。`21cdbb6353bb14fe5ebced9ddfec1e94dc30a3a5` 的 2026-09-10 发布/受控统计与 `dc0ad2d` 的早期 QA/性能证据保留原身份，属于历史记录，不能改绑到 73e482a。最新静态文件核验通过也不证明完整地区性能、真机、RUM 收数或真人验证已通过。

正式阅读版 MVP 的范围以 PRODUCT/001 为准，退出 Beta 的质量合同以 011 为准。后续从新 revision 构建仍须绑定 clean source、lock/source digest、public intent、verifier/适用 QA 与 `dirty: false`；不可变制品复用须核对完整 inventory/digest。原 dc0ad2d 后续 QA 接受结论与追加原始回执定位缺口见 DEV_WORKFLOW 当前证据索引，不改写早期 partial 回执。

后续部署、表单/分析启用和线上数据操作分别授权、分别验收。文档更新本身不触发重建或发布，也不重新开放已耗尽的统计预算。

## AI 协作口径

- 默认按可独立验证的最小单元推进。
- 事实、推断和未验证风险必须分开表达。
- 外部网页、书籍、图片或研究资料进入项目结论时，必须在正文附近标注出处，并在需要时登记到 `docs/REFERENCES.md`。
- 扩大范围、引入依赖、修改配置、启动服务、提交、推送和发布遵循 `AGENTS.md` 与 `AI_COLLABORATION.md`。

## 发布前版面调整

[014 出版版面与视觉节奏调整](docs/requirements/014-editorial-design-refinement.md) 承接 2026-09-08 的独立审美与原竞品复核：首页展示阴间与聊斋两个专题，目录采用插画与短导读，文章完整标题进入图片之前的独立区域。保留既有字体、正文、来源、原资产与 Beta 提示；三个聊斋 subtitle 补齐为阅读引导。实施与本轮验收结果见 014，不沿用旧截图的通过状态，不产生 Git 或发布授权。
