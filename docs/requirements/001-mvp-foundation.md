# 001 Mythic China MVP 基础与首发：开发与验收说明

## 0. 文档职责与状态

2026-09-09 当前首发范围由 [011](011-public-beta-validation.md) 的阅读版更新定义：6+2 内容先进入最终候选，Newsletter/Reader Request/Analytics/RUM 均关闭；M5 剩余联调属于未来启用门禁，不再阻塞阅读版上线准备。本文历史 M5 → M6 顺序不要求恢复已暂停的表单测试，最终 QA、受保护预览与逐次发布授权仍保留。

### 0.1 文档职责

本文负责：

- 固定 Mythic China MVP 从应用初始化、设计原型、内容 Schema、首发页面到预览验收的业务合同。
- 把静态内容、声明/术语证据、工具无关的视觉资产、外部引用、读者选题反馈和后续扩展落实为可独立验收的实施单元。

本文不负责：

- 替代单篇文章的研究笔记、英文稿、来源卡和图片 manifest。
- 提前定义会员、支付、广告、互动地图、账号或社区实现。

上位规格：

- `../PRODUCT.md`
- `../DESIGN.md`
- `../COMPETITIVE_AUDIT.md`
- `../ARCHITECTURE.md`
- `../CONTENT_MODEL.md`

运行与发布命令：`../../DEV_WORKFLOW.md`。M2 本地安装与验证命令已建立；预览服务和发布命令仍受后续里程碑与单独授权约束。

### 0.2 独立状态

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | 草拟；M1、M2、M3、M4 与 M5-U2/U3 已完成，M5-U4 账户准备事实已同步；第二 Collection、两条成员路径、四篇证据账本与草稿，以及四篇 Entry 加 Liaozhai Collection 的五组 Hero 已实现。修订前锁定稿及 010 当前四篇改动单元与两条内容提示均已通过 Project owner 双语确认；R1 已重建、通过静态检查并退役为 reference-only，R2 真人反馈为 0。2026-09-07 又确认先发布 Public Beta、再执行 live R2 | M4 详细合同见 [`003-pages-exploration-seo.md`](003-pages-exploration-seo.md)；M5 边界见 [`006-external-interactions.md`](006-external-interactions.md)；第二 Collection 决策、四篇研究/物化/写作、合集接线、目标读者研究、Public Beta 收口与五组 Hero 闭环分别见 [`007-second-collection-decision.md`](007-second-collection-decision.md)、[`008-four-entry-claim-maps.md`](008-four-entry-claim-maps.md)、[`009-collection-reading-paths.md`](009-collection-reading-paths.md)、[`010-four-entry-reader-review.md`](010-four-entry-reader-review.md)、[`011-public-beta-validation.md`](011-public-beta-validation.md)、[`012-five-hero-visual-briefs.md`](012-five-hero-visual-briefs.md) |
| 实施状态 | M1 已冻结；M2、M3、M4 本地产品实现、M5-U2/U3、四篇证据受限草稿、两个合集路径、010 的文案与 R1，以及 012 的五组 Hero 资产闭环已完成；VB6 ready 与随后首发 6+2 published 决定均已完成（六篇目标日期 2026-09-10）；013 本地 public artifact 与 014–016 页面收尾已完成；U4/U5、最终 M6 候选、M7 Public Beta 与 R2 未完成 | 三个 provider-neutral service/Fake、inert review UI/Privacy、6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology 与 14 页 review inventory 已建立。六份 Terminology 均为 `bilingual-approved`，Painted Skin 短译 Claim 为 `verified`。当前 6 篇 Entry 与 2 个 Collection 均绑定自己的 approved/current Hero；五组新资产已有 master、production record、manifest、repository source 和 versionless 内容外键。修订前 R1 已失效；重建 R1 已退役为 reference-only，只保留问题、rubric 与文稿基线，R2a 等待 Public Beta live artifact。四篇分类、Related 编辑环、Liaozhai Featured 与 6+2 ready 已完成；owner 已批准首发 6+2 published；013 已实现本地 public artifact；真实供应商 transport、最终候选 QA 与生产仍未完成 |
| 验证状态 | 首发内容批准后的本地完整门禁通过；真人及发布 QA 未开始 | 固定运行时定向 7 文件/210 测试、完整 check 的 25 文件/401 测试、Astro 81 文件零诊断、14 页 noindex/112 Hero/10 WOFF2/零 XML/客户端 JavaScript 通过。真实索引 6/2 与六条 Related 有独立 HTML5 校验；未发布、空态、日期与 public intent 负门禁保留。历史资产和 R1 证据不冒充当前发布候选 QA |
| 发布状态 | 未发布 | 托管目标为 Vercel；当前不购买自定义域名。owner 已建立 Hobby 空项目与稳定 Production 域名，013 已接入显式 origin 和本地 public artifact；实际配置、受保护预览与生产部署未验收 |

- 当前权威结论更新时间：2026-09-08。
- 版本检查点：M4 完成状态已进入 `3983bee`，M5 与 007 进入 `3fa46d5`，四篇研究和证据物化进入 `9914dd3`；009、四篇正文与 010 审核进入 `f81b49f`，Public Beta 路线进入 `96da8db`，五组 Hero 闭环进入 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`。VB6 从该 clean 保存项目开始，HEAD/main/本地 origin/main 一致；未 fetch 或查询服务器，不把 tracking ref 当作远端证明。VB6、首发状态与阅读预检随后进入本地检查点 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd`；013–016 接续该保存项目，未建分支或 worktree，本次检查点授权与身份按 DEV_WORKFLOW 和 Git 核对。

## 1. 结论与开发就绪判断

### 1.1 一句话结论

先交付一个英语优先、静态生成、视觉驱动且来源清楚的 6 篇内容 MVP；栏目、反馈和商业化通过稳定内容 ID 与后续独立需求的隔离边界保留演进路径，不提前建设 adapter 或平台。

### 1.2 开发就绪

- 是否可以立即执行工程开发：2026-09-02 的最终 U5 browser/人工证据授权已用于完整自动门禁、24 个实际视口组合、12 个 Hero 组合及三档样张人工交接；Project owner 检查全部 8 个页面后明确回复“这些页面通过”，临时 preview 随后停止且 4321 无监听，不成为后续可复用服务授权。当前控制面未覆盖的真实键盘/200%/偏好、故障/性能/实际 fallback face/跨平台仍需相应可控环境或人工验证。后续若改变内容状态、引入依赖、开放 public/Vercel、远端预览或发布，仍须分别授权。
- M2 执行记录：按 `../ARCHITECTURE.md` 与 `../../DEV_WORKFLOW.md` 使用固定 Node 绝对路径和 pnpm `11.22.0`，在当前非空仓库根完成手工最小初始化与冻结依赖安装。M1 冻结只为 M2 提供语义、结构和替换边界；首个真实 Home 可以 A 主、C 辅作为实现目标，但不得整份移植旧原型或候选方向稿。U2 当时已获得共享表现层方向确认；正式字体与当前页面人工判断后来随 M4 闭合，真实 200%、故障和支持平台仍是 M6 最终 artifact 门禁。目标读者验证按 011 移到 M7 Public Beta 上线后，M7 同时承接生产与 live/RUM 基线。
- 推荐工程顺序：M4 已闭合；M5-U2 provider-neutral 合同/Fake 与 U3 inert review UI/Privacy 已实现，U4 仍未完成。第二 Collection、3+3 分配、四篇证据账本、证据受限草稿、两个合集路径及五组 Hero 已完成；修订前锁定稿、当前 AI 专业修订单元与两条 `contentNote` 均已通过双语确认，R1 已重建、通过静态检查并退役为 reference-only。VB6 已逐项审核 6 篇 Entry / 2 个 Collection 到 ready，随后 owner 已批准全部 published，六篇目标日期统一为 2026-09-10；013 已完成 origin/public assembly，014–016 已完成本地页面收尾；下一停点是独立 M5/托管核验与完整候选准备。clean-source QA、预览与 M7 Public Beta 生产/live/RUM 按各自范围授权。Public Beta 上线后执行 1 位非计入样本的 R2a；R2b 建立 5–8 份核心全站可用记录与四篇各前 5–8 份可用深读，按预冻结规则可补位，处置结果后关闭正式 MVP 验证。
- 当前动作边界：VB6 从 `1be085b` 的 clean 保存项目开始，VB6 完成 6+2 ready 后，本批按 owner 独立批准完成 6 published Entry / 2 published Collection（六篇目标日期 2026-09-10），两条 Related 编辑环、四篇分类和 Liaozhai Featured（Painted Skin）。Underworld Guide 仅复用既有 CMA 来源补近引，正文含义与事实核查日期保持。上述 VB6 批的修改现已进入 `fabb4c9`；本次只在保存项目核对 013–016 完整工作树、同步文档并按用户授权创建本地检查点，同时独立核查 M5/托管进入条件。不含新 worktree、依赖安装、服务、真实业务写入、push、预览部署或生产发布。

### 1.3 事实、推断与风险

已确认环境事实：

- 用户具备 ComfyUI 等静态生图能力，当前没有视频制作能力；ComfyUI 只作为可选视觉辅助，不承担事实研究。
- 当前工作区已有不可发布的 Home、Collection、Entry 旧视觉原型，以及 M2 静态应用源码、固定依赖与本地构建产物；M2 只提供中性语义调试模板，不是生产视觉。当前没有运行中的应用服务，也没有真实联调或部署。

已确认产品规则：

- 人物、传说和关键术语不得生编乱造；`guai`、`yao` 等词必须按具体语境翻译，外部引用必须标明出处。
- newsletter 只在全站 Footer 提供，只发送新文章与编辑精选且不超过每月两次，使用 double opt-in 并在每封邮件提供退订；Reader Request 保留为文章末尾的独立反馈入口，email consent 独立且不得自动订阅 newsletter。
- 主要读者在海外；前期托管以方便为先，同时为后端、自有域名、更换托管、新栏目与未来商业化保留边界。
- 竞品只借功能、信息结构与编辑纪律，不复制视觉皮肤。
- 第一个正式 Collection 为 `The Chinese Underworld / 中国阴间`；M1 Featured Entry 为 `Zhong Kui, the Demon Queller`。The Met 支持 `Demon Queller` 身份；将钟馗纳入本 Collection 是策展关系，不表示他是阴间统治者、十王之一或跨传统固定阴司官员；研究入口与适用边界登记在 [`../REFERENCES.md`](../REFERENCES.md) 的“中国阴间与钟馗首发决策”。

已确认设计偏好：

- 网站整体设计与字体是高优先级；全站采用“中国神话传说博物馆”的现代中性文化平台母体，每个 Collection 独立美术指导，Entry 回到统一可信阅读器。“博物馆”是体验隐喻，不扩展为世界神话或实体机构身份。
- 国风不等于水墨；外部 Skill 不能成为品牌母体或文化来源。
- 页面需要更连续的主题背景和更明确的功能性动效。整页背景不足是非阻断视觉完善项，不阻断内容、Schema、导航、来源和基础阅读功能。
- 当前 M1 原型已冻结为工程参考，但用户明确表示页面风格仍不是期望结果，人工视觉满意度未通过；工程必须允许未来整体重构表现层，而不改写内容、证据关系、稳定身份与 URL。
- 用户后续确认首个真实 Home 的概念方向采用 A 主、C 辅：A 提供现代中性文化平台感与图片主导的非对称策展构图，C 提供抽象雕塑、地形、路径和裁切的辅助视觉语汇。B 未被选作 Home 方向。该确认不批准候选稿本身或生产资产，也不自动决定 Collection、Entry 或共享表现层。

设计选择与推荐：

- 当前 M1 采用 `../DESIGN.md` 的“中国神话传说博物馆”：现代中性文化平台负责全站导视，Collection 负责独立主题世界，Entry 负责统一阅读与来源；中国绘画、手卷、印本和文物只在具体题材/来源成立时进入美术方向。M1 冻结的是首个工程参考基线，不是视觉批准或永久品牌冻结；冻结后确认的 A 主、C 辅只关闭 Home 概念方向选择，生产页面仍待验收。
- M2 已确认 Astro 7 静态模式、TypeScript strict、Node.js 24 LTS、pnpm 11、Entry Markdown + 结构化 YAML、Content Layer + 独立内容图校验、供应商中立静态输出；MDX、adapter、客户端 UI 框架和商业依赖不进入 M2。Next.js 只有在多数产品路由近期需要请求时身份/权限/个性化，或产品主体成为 React 应用时才重评，不是已经安装或运行的事实。
- M2 当时不选择托管，Vercel 与 Cloudflare 当时只是首次远端预览前的候选；后续 M4-U4A 已选择 Vercel 作为未来静态托管目标，M5-U3 又确认当前不购买自定义域名，后续 owner 已建立 Hobby 空项目与稳定 Production 域名，013 已使用其 HTTPS origin；平台内部身份与实际设置仍待核。

待验证假设：

- 英语优先、单人配合 AI 维护和指标阈值仍需通过真实读者验证；第二 Collection、公开阅读顺序、四篇 claim map、证据物化和证据受限草稿已完成。修订前锁定稿及当前改动单元与两条内容提示均已通过 Project owner 双语确认；六份 Terminology 与 Painted Skin 短译 Claim 状态不变。任/张实际册页与现代比较延期，《促织》跨见证、作者归属与“首次增写”继续排除，全部新增选题尚未经过目标读者验证。

未验证风险：

- `Mythic China` 已确认为当前站点品牌，公开数据控制者名称为 `hyc`；品牌商标与未来自定义域名可用性尚未核查。
- 首批英文文案、SEO 主题和新视觉执行尚未经过目标读者测试；方向已确认不等于原型效果已验证。
- 首批四个新增选题已形成原典/对象、学术解释与关键术语的候选 map，并完成当前可取得见证、正式书目与 locator 的分层闭合；证据子集已物化，四篇均有精确消费清单、证据受限草稿和自己的 approved/current Hero。修订前锁定稿及当前改动单元均已通过 Project owner 双语确认；VB6 已闭合四篇分类/Related 与 ready，随后已获 published 批准（目标日期 2026-09-10），仍待新页面级发布候选 QA，目标读者研究在 Public Beta 上线后执行。Ten Kings 的两个见证不能互作转录；Fighting Cricket 与 Painted Skin 的单一青柯亭见证不能外推为跨见证或作者归属结论；Guide 不能把尚未取得实际册页的任/张版本写成已核来源。
- ComfyUI 当前模型、LoRA、字体和参考素材的商业许可证尚未登记。
- Buttondown 与 Tally 已分别作为 U4 的有条件 transport 方向，U5B 的 GoatCounter 轻量合同、注入式 adapter、条件 DOM hook 与 Privacy 未启用说明已通过本地检查，账户设置已由 2026-09-09 的截图/保存确认，M6 默认关闭页面接线与产物离线验证已完成，真实统计未启用；Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过，Tally Free 账户和未发布草稿已准备。两者均未接入站点或处理数据，真实 action/link、账户级配置、供应商行为与数据边界仍未验证。托管供应商已选 Vercel，owner 已提供空项目和稳定 Production 域名；平台内部身份、实际配置与部署仍未验收。

### 1.4 已确认与待确认事项

已确认：

1. 设计体系为“中国神话传说博物馆”：现代中性文化平台母体 + Collection 独立主题 + 统一 Entry 阅读器。
2. 首个正式 Collection 为 `The Chinese Underworld / 中国阴间`。
3. M1 Featured Entry 为 `Zhong Kui, the Demon Queller`；钟馗不代表整个阴间，也不默认被描述为阴间统治者。
4. 当前 M1 原型已完成并冻结为工程参考；只可继承结构、语义、链接、响应式/无障碍骨架与表现层替换边界，旧原型外观未获用户批准。
5. 首个真实 Home 的概念方向采用 A 主、C 辅；方向稿不是生产资产或页面批准，该选择也不自动决定 Collection、Entry 或共享表现层。
6. M2 采用 Astro 7 静态模式、TypeScript strict、Node.js 24 LTS 与 pnpm 11；使用唯一 `pnpm-lock.yaml`，在当前非空仓库根手工最小初始化，不使用 starter/template、旁路目录或新仓库。
7. Entry 使用 Markdown，Collection/Source/Claim/Terminology 使用一对象一文件的 YAML；M2 不使用 MDX。内部 ID 从文件名显式生成并与记录 ID 校验，公开 slug 独立；Entry 与 Collection canonical 分别为 `/explore/{slug}/`、`/collections/{slug}/`。
8. M2 用 Zod 校验单记录，用纯内容图校验器和 Vitest 校验跨集合关系/状态/唯一性；Claim 以闭合 `evidenceContext` 和 Source 类型/role 矩阵区分历史传统证据与现代接受材料，Entry 以成对 `earliestKnownClaimId` / `earliestKnownSourceId` 精确绑定最早证据，不从 statement 文本猜测。两个真实 draft demo 为 `zhong-kui` 与 `chinese-underworld-guide`。生产 Asset Manifest 属于 M3，真实页面视觉与浏览器门禁属于 M4。
9. 商业化只保留供应商中立的未来边界；M2 不创建商业字段、组件、adapter、事件或服务。M2 当时也把托管选择延后到首次远端预览前，后续 M4-U4A 已选择 Vercel 作为未来静态托管目标。
10. M5-U3 使用 `Mythic China` 品牌、`hyc` 公开控制者名称、CN 地区与 `huyichen2019@gmail.com` 隐私邮箱；关闭的隐私请求在 60 天后从活动邮箱与 Trash 删除，法律保留例外。Buttondown/Tally 只是 U4 有条件方向，Plausible 留在 U5；当前不购买自定义域名，未来 M6 可在单独授权后使用稳定 Vercel production hostname 作为阶段性 origin，generated preview/commit URL 不得成为 canonical。
11. 2026-09-03 的账户准备事实为：Buttondown `mythic-china` 已创建但仍在人工审核；Tally Free 账户与未发布 Reader Request 草稿已准备。没有 subscriber import、邮件、submission、站点接线、action/link 或真实联调；详细安全与草稿现场只记录在 [`006-external-interactions.md`](006-external-interactions.md)。
12. Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过。该用户提供的现场事实只关闭等待审核门槛，不证明或授权登录、账户级配置/条款、真实 action、订阅写入或供应商行为；U4 仍未完成。
13. Project owner 于 2026-09-03 确认 [`007-second-collection-decision.md`](007-second-collection-decision.md) 的 Liaozhai 第二 Collection 方向、3+3 分配、两条公开顺序、Zhong Kui Featured 与《促织》条件保留，并授权四篇 claim map/来源研究；随后又单独授权实际见证、正式书目与精确 locator 证据闭合。2026-09-04 后续独立授权又确认任 2016 主/张 2011 对校及《促织》青柯亭单见证路线，并建立 4 draft Entry / 5 Source / 9 Claim / 3 Terminology 最小子集。每次授权只覆盖自身范围，不自动授权正文、图片、关系或状态。
14. Project owner 于 2026-09-04 接受“先提交证据检查点，再做 Ten Kings 单篇纵切片”的建议：前一批形成本地提交 `9914dd3`，随后只为 Ten Kings 写入已闭合的 2 Source / 3 Claim / 1 Terminology 消费关系与证据受限英语首稿，保持 `draft`；图片、Collection/related 关系、状态、外部服务、push 与发布均未授权。
15. Project owner 随后授权只为 Fighting Cricket 消费既有 1 Source / 3 Claim / 1 Terminology 并形成证据受限英语首稿，保持 `draft`；当完整门禁发现现有 Source 的可见中文馆藏号违反英语页面输出合同后，又单独允许把可见记录改为 ASCII、同时在内部 notes 保留精确馆藏号。该例外不授权 Schema、字体、图片、关系、状态、外部服务或 Git 写入。
16. Project owner 随后授权只为 Liaozhai Reading Guide 消费既有 1 Source / 2 Claim / 1 Terminology 并形成证据受限英语首稿，保持 `draft`；任笃行 2016、张友鹤 2011 的实际册页仍未取得，不得写成已核 Source。该批不新增或修改证据对象，不授权 CJK 字体、图片、关系、状态、外部服务或 Git 写入；Project owner 于 2026-09-05 又通过中文概要确认内容符合预期，并单独授权验证通过后本地提交，不扩大原内容范围。

仍待确认：

1. `Mythic China` 的商标与未来自定义域名可用性，以及如需调整公开名时的迁移方案。
2. 首次远端预览所用 Vercel 平台内部账户/项目身份、实际构建与保护配置、发布授权、回滚和退出路径；owner 提供的空项目/稳定域名与 013 本地 origin 已确认。
3. 任笃行 2016 与张友鹤 2011 的实际册页、篇级 locator 和最终篇数计数口径，只在未来恢复现代校勘本比较时另行取得；《促织》的辽宁手稿、现代校记与早期抄本若未来恢复跨见证叙事也须另行取得。当前单见证草稿不把这些材料写成已得。
4. 完整 6+2 的页面级发布候选 QA；逐项 published 决定与六篇目标公开日期 2026-09-10 已确认；VB6 分类/Related、Featured 与 ready 已闭合；当前修订单元、两条内容提示与五组 Hero 资产级审核已完成。两个 Collection 对象/`entryIds` 已建立，但仍不降低“至少 2 个完整合集页”的 M6 预览门槛。目标读者审核按 011 在 Public Beta 上线后执行。
5. 由谁承担中文/古汉语事实与译文复核、英文可读性编辑和图片文化审校的最终签字。

## 2. 背景、目标与成功标准

### 2.1 当前问题

英语读者缺少一个同时具备故事可读性、视觉辨识度、传统分层、来源说明和继续探索路径的中国神话内容入口。单靠社交图片难以承载来源和长期关联；直接建设大型百科、社区或后台又会让单人项目过早失去可维护性。

### 2.2 用户或业务价值

- 读者用 5–10 分钟理解一个陌生对象，并知道哪些是原典、后世传统或现代演绎。
- 创作者把每次研究与视觉制作沉淀为可搜索、可复用、可再分发的长期资产。
- 后续增加栏目、读者反馈和商业能力时，不需要改写核心内容与 URL。

### 2.3 目标行为

- 读者能从首页/合集进入文章，先通过视觉问题、`opening` 故事入口、Quick Answer 和核心故事建立理解，再进入原典、版本与本站解释；完整 Sources 之后才能出现 Related Entries 与 Reader Request。
- 创作者能先建立 claim map 与术语记录，再用固定 Schema 和工具无关的视觉管线生产一个完整内容包；ComfyUI 可用但非必需。
- 读者能无账号推荐下一篇传说，并可选择是否留下邮箱。
- 读者可在全站 Footer 订阅，但不会在每篇末尾遇到重复订阅 CTA。
- 每个外部网站引用和公开图片都能追溯到来源/权利记录。

### 2.4 可观察成功标准

- 中性 Home、`The Chinese Underworld` Collection、`Zhong Kui, the Demon Queller` Entry、Explore、About/Editorial Method 在桌面与移动可用。
- 6 篇 Entry 与至少 2 个 Collection（合集页）达到 `published` 门禁。
- 构建对缺失 source、relation、asset manifest、accessibility mode、alt / 空 alt、适用的 caption 和 disclosure 失败。
- 关键事实主张能追到具体版本/对象与 locator；关键术语首次出现有汉字、规范拼音、语境化英文和双语审核状态。
- Entry 的阅读层级固定为 `opening` 故事入口、Quick Answer、核心故事、原典/版本/解释、完整 Sources、Related Entries、Reader Request；轻量出处随对应主张出现。
- 关闭 JavaScript 后正文、来源和核心导航仍可阅读。
- 无阻塞键盘/无障碍问题；减弱动效模式下内容不延迟或缺失。
- 所有外部引用显示来源名称和链接，网页来源有访问日期。
- 订阅与选题表单只传递合同字段，不在客户端包含密钥。
- 六个 Collection Hero 视觉探针排成 3×2 时像同一现代品牌的不同主题展厅，而不是同一旧纸模板换颜色；只有中国阴间是已确认 Collection，其余五个不建立稳定 ID 或路线承诺。Home 不继承中国阴间暗色主题，隐藏图片后仍可凭字体、栅格、来源与组件识别品牌。
- 中国阴间 Collection 说明其多时期、多地域、多文本和多传统边界；钟馗 Entry 不把他写成阴间统治者或十王之一，并将 Black Myth 等游戏材料限制在明确的现代改编/接受史层。
- 主视觉 brief 标明时期、地域、媒介、文化语境、直接来源、权利、已证实/推断/创作和排除元素，不把跨朝代或跨宗教符号混成泛中国风。
- 字体验收页覆盖英文、简体中文、拼音、困难字形、慢加载、fallback 与 200% 缩放，不出现缺字、裁切或不可接受的布局跳动。

## 3. 范围与边界

### 3.1 完整 MVP 交付范围（跨 M1–M7）

本节描述整个 001 需求关闭前的累计范围，不是 M2 待办清单；M2 只以第 8 节“M2 工程与内容合同”的交付、不交付与完成条件为准。

- Astro/TypeScript 静态应用及固定运行时、包管理器和锁文件。
- `entries`、`collections`、`sources`、`claims`、`terminology` 与 asset manifest Schema。
- 现代品牌 token、固定字体角色、Collection realm token、响应式网格和 Home/Collection/Entry 原型。
- 原有内容/编辑竞品墙及新增 M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 系统证据，六栏目 Collection Hero 家族板和中英混排字体验收页。
- Home、Explore、Collections、About/Editorial Method 和基础 SEO 页面。
- 6 篇经研究/来源、文化与 Project owner 审校确认的最终首发 Entry 及静态视觉内容包；钟馗仍是首个纵切片，最终六篇分配须随至少 2 个 Collection 的决策在 M6 前修订，公开阅读顺序由研究结果决定。
- Sitemap、RSS、canonical、Open Graph 和适用结构化数据。
- Footer 中唯一的简单 newsletter 入口与文章末尾 reader request 边界；最终服务在实施前确认。
- 内容、关系、claim/source、术语/译文、图片、链接、构建和基本无障碍验证。
- 预览部署及人工视觉/内容验收；生产发布另行授权。

### 3.2 本期不包含

- 视频、播客、自动播放声音和复杂 3D/WebGL。
- 中文同步、账号、评论、收藏、公开社区和个性化推荐。
- 自研 CMS、数据库、图数据库、互动地图和 App。
- 站内支付、会员权限、广告和联盟链接上线。
- 在线 ComfyUI、运行时生图和自动发布。

### 3.3 明确废弃行为

无既有应用行为可废弃。旧原型的全局米黄纸色、重衬线标题、密集细线版心和印本感不再作为视觉候选；模板式等宽卡片首页、全站游戏 HUD 和全站暗色同样不采用。M1 已在原有静态文件上保留语义/交互骨架并替换旧皮肤；未来应用仍不得把这些独立文件整份复制为永久 UI。

### 3.4 兼容期

无。当前没有旧版本、旧 URL 或旧 API。

### 3.5 不得改变的行为

- 来源、版本差异和 AI 图片披露不可为视觉简洁而隐藏。
- 核心阅读不可依赖客户端 JavaScript、动画或第三方脚本。
- 新栏目不得复制一套内容 Schema 和页面系统。

## 4. 当前事实与目标调用链

### 4.1 当前流程

```text
用户需求
  -> 本地模板与外部参考只读研究
  -> 项目治理/产品/设计/架构文档
  -> 不可发布的 M1 Home / Collection / Entry / Review Board / 字体原型
  -> M1 工程参考已冻结；旧页面视觉未通过；A 主、C 辅概念方向已确认
  -> M2 静态应用、内容合同与本地工程门禁已完成
  -> M3 钟馗 visual brief / production record / approved manifests / source renditions 已完成
  -> M3-U5 已复核 local master，并实际生成、解码验证响应式目标
  -> M4 noindex 页面、探索投影、SEO 纯合同与当时 8 页人工判断已完成
  -> M5-U2 provider-neutral services/Fake 已完成
  -> M5-U3 inert Newsletter / Reader Request review UI 与 Privacy 已完成
  -> 2026-09-04 四篇最小证据对象与 13 页 review 历史 inventory 已完成
  -> 2026-09-05 两个合集路径、14 页 review inventory 与四篇证据受限草稿已完成
```

当前已有 M2 应用代码与静态内容构建链、8 个 approved/current Hero family，以及 M4 的 8 页历史基线；M5-U3 增加 Privacy 后形成 9 页历史基线，四个 draft Entry 曾把 inventory 扩为 13 页，009 加入 Liaozhai Collection 后当前为 14 页。四个新增 Entry 均有证据受限正文并已通过 VB6 ready 审核；Footer 每页仍只有一个 inert Newsletter，六个 Entry 各有一个 inert Reader Request；013 已接入 public runner/页面/output，014–016 保持 review 14 页、public 13 页与 19 图位/112 图；仍没有真实外部写接口或经过验收的远端部署链路。

### 4.2 内部编辑、构建与发布链

本节描述内部生产门禁，不代表读者看到内容的顺序。

```text
M4 本地产品实现完成
  -> M5 外部交互详细需求与隔离边界（不以内容 ready 为进入条件）
  -> M6 研究问题 -> claim map + 可定位来源
  -> 关键术语与译文双语复核
  -> 英文稿 + Entry/Collection metadata
  -> 英文内容编辑审核
  -> 有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助
  -> 文化 / 权利 / 视觉审核 -> approved manifest
  -> Schema / 关系 / 引用 / 资产校验
  -> ready（内容、证据、关系、批准资产与内容无障碍文案完备）
  -> 6 篇 Entry / 至少 2 个 Collection / 全部资产 -> Project owner published 决定
  -> 真实 origin + M6 public artifact assembly 与 output verifier 实现
  -> Project owner 单独授权 clean commit
  -> 从 clean revision 重新构建同一最终 artifact 并重跑 output verifier
  -> 键盘/缩放/偏好、故障、字体/跨平台、视觉与本地性能 QA
  -> clean-source verification receipt -> 受保护远端预览
  -> M7 同一已验证源身份发布可索引 Public Beta + live smoke / 回滚 / RUM 基线
  -> live artifact R2a 非计入试跑 -> R2b 5–8 份核心全站记录 + 四篇各前 5–8 份可用深读（按冻结规则补位）
  -> 处置关键发现并复测 -> Project owner 关闭正式 MVP 验证
```

### 4.3 目标读者阅读与交互链

```text
Search / static social card / Home
  -> Collection or Entry
  -> Main visual + story question
  -> opening 故事入口
  -> Quick Answer
  -> Core story
  -> What the text says
  -> Later traditions / versions
  -> Our interpretation
  -> Complete Sources
  -> Related Entries
  -> Reader Request
  -> Global Footer Newsletter
  -> 外部服务或隔离 endpoint
```

轻量来源标记随对应主张出现；`Complete Sources` 是正文收束后的完整书目，不是故事前置门槛。

### 4.4 环境事实

- 只读核查与文档环境：`F:\codex-project\mythic-china`。
- 开发/自动化环境：M2 本地环境已建立并通过固定运行时、冻结安装、格式、lint、Vitest、类型检查与静态构建门禁；历史 M4-U2/U5A preview 与 2026-09-02 最终 U5 批次 PID `31960` 均已按各自授权停止，4321 无监听。没有可复用的预览或发布环境授权。
- 真实联调环境：尚未建立。
- 远端发布环境/任务：尚未建立；未来静态托管目标已选 Vercel。

## 5. 最终业务合同

### 5.1 核心对象

- `Entry`：人物、异兽、地点、故事或指南，一篇/一对象为最小发布粒度。
- `Collection`：有编辑顺序的主题阅读路径。
- `Source`：原典、译本、研究、官方页面或现代改编的标准化来源。
- `Claim`：可发布主张与具体证据、locator、证明范围及确定性的关联记录。
- `TerminologyRecord`：关键中文概念在具体文本语境中的汉字、拼音、英文选择、弃用译法与审核记录。
- `AssetManifest`：一个逻辑资产具体版本的权威追溯记录；该版本可包含一个或多个已核准 master rendition，并关联 approved brief、仓库 source renditions、权利与审核。
- `ReaderRequest`：最小读者选题建议，不代表公开投稿或发布承诺。

具体字段和值域以 `../CONTENT_MODEL.md` 为准。

首个纵切片的稳定身份：

- `collectionId: chinese-underworld`，`slug: chinese-underworld`，公开标题 `The Chinese Underworld`，`titleZh: 中国阴间`，`pinyin: Zhōngguó yīnjiān`，`featuredEntryId: zhong-kui`。
- `中国阴间` 是宽泛编辑栏目名；`地府` 可用于官署、审判、十殿等具体语境，但不得把二者写成有严格学术分界的两个固定体系。
- `entryId: zhong-kui`，`slug: zhong-kui`，公开标题 `Zhong Kui, the Demon Queller`，中文身份 `钟馗 · Zhōng Kuí`；M1 将其作为 Collection Featured Entry。
- `entryId: chinese-underworld-guide`，`slug: chinese-underworld-guide`，作为 M2 的第二个真实 draft demo 与 Collection 阅读路径第一项；公开标题和正文仍须在正式内容阶段完成研究/英文审核，不用占位事实填充。
- `Collection.entryIds` 是成员关系与阅读顺序的唯一事实来源；Entry 的反向 Collection 入口在构建期派生，不保存 `collectionIds`。`featuredEntryId` 必须同时存在于同一 Collection 的 `entryIds` 中并通过 `CONTENT_MODEL.md` 第 2.2 节状态矩阵；它只控制当前重点入口，不改变策展阅读顺序、Entry ID、slug 或 canonical URL。realm token 与主题资产不得写入 Collection 内容记录。

### 5.2 身份与唯一性

- `entryId`、`collectionId`、`sourceId`、`claimId`、`termId`、`assetId` 全局稳定且唯一。
- slug 唯一；已发布 slug 修改必须产生明确 redirect 需求。
- 关系和合集只保存稳定 ID，不保存标题字符串作为身份。
- Entry canonical 固定为 `/explore/{slug}/`，Collection canonical 固定为 `/collections/{slug}/`；文件名/loader ID/记录内稳定 ID 三者一致，slug 不覆盖内部身份。

### 5.3 正常流程

1. 编辑建立 source、claim map、术语记录和研究 brief。
2. 完成中文/古汉语事实与译文复核后，写作 Entry 并标记传统类型、关系和来源。
3. 根据有出处的视觉 brief 绘制、选用授权素材或使用可选生成工具，并审校/登记 visual asset。
4. 构建验证所有合同。
5. 预览页面完成英语、文化、视觉、移动和无障碍审核。
6. 同一源身份进入生产发布。

### 5.4 失败语义

| 失败点 | 影响 | 目标行为 |
| --- | --- | --- |
| 缺失或无效 source/related/asset ID | 当前构建 | 构建失败，指出内容与字段 |
| 关键主张缺 evidence context、locator、匹配的 Source 类型/证据角色或确定性 | 当前 Claim / Entry | 构建失败或保持非 ready；补匹配证据、标为 disputed/provisional 或删除主张 |
| 关键术语缺语境化译法或双语审核 | 当前 Entry | 保持非 ready；不得用固定“妖魔鬼怪”对照表绕过 |
| 已发布视觉资产缺少 accessibility mode、alt / 空 alt、适用的 caption 或 disclosure | 当前构建 | 构建失败，不用默认文本绕过 |
| 图片权利状态未知 | 当前 Entry | 保持非 ready，替换或补齐核查 |
| 现代游戏/影视或参考网页成为古代、宗教或民俗事实的唯一证据 | 当前 Claim / Entry | 构建前阻断；改为 `modern-reception` Claim，或补充匹配的一手、馆藏、田野、译本或研究证据；不得仅改 role 绕过 |
| 外部 newsletter/feedback 不可用 | 对应表单 | 显示明确失败与替代联系方式；不伪报成功 |
| 第三方脚本失败 | 分析/增强功能 | 核心内容和导航继续可用 |
| 预览源身份发生变化 | 发布验收 | 原验收失效，重新构建与验收 |

## 6. 目标技术与设计

### 6.1 分层职责

| 层 | 负责 | 不负责 |
| --- | --- | --- |
| Content collections | 内容、来源、声明、术语、合集与 Schema | 页面样式、第三方网络调用 |
| Page/layout/components | 静态渲染和可访问交互 | 保存用户数据、运行模型 |
| Build validation | ID、关系、来源、claim、术语状态、资产、链接和输出检查 | 代替人工文化/英文审校 |
| External adapters | newsletter、feedback、analytics 的单一边界 | 业务正文与来源判断 |
| Visual production | 有出处的 brief、绘制/授权素材/可选 ComfyUI 辅助、精修与追溯 | 事实研究、网站访问时推理 |

### 6.2 设计合同

- 采用 `../DESIGN.md` 的“中国神话传说博物馆”：这是只策展中国神话、志怪、民间传说、宗教传统与传奇人物的数字体验体系，不是世界神话平台或实体机构声明。
- 品牌母体使用现代中性 canvas、sans 显示标题、固定 Logo、导航、栅格、功能组件、Entry 正文、来源和无障碍行为；全站不使用米黄纸纹、褐色做旧、密集 hairline、印章和重衬线标题作为文化身份。
- 首个真实 Home 以 A 的现代文化展览式中性母体和图片主导非对称构图为主，以 C 的抽象雕塑、地形、路径、层叠和裁切为辅。A/B/C 是 Home 方向评审简称，不是内容 ID、theme ID 或 asset identity；候选稿不得整图导入应用，其语言如何延展到 Collection、Entry 或共享表现层须另行设计和确认。
- Collection 可以覆盖批准的 `--realm-bg / --realm-surface / --realm-tone / --realm-accent / --realm-on-surface`，并拥有独立主图、媒介、环境纹理、构图、章节过渡和一次 Hero 动效；不得新增字体、导航、按钮、引用结构或交互模型。
- Home 保持中性，Collection 主题只通过图片、短色带和标签进入；`The Chinese Underworld` 的暗色不得成为全站默认。Collection 主题可以延续到 1–2 个章节过渡，功能 UI 仍完全共享。
- Entry 开场可延续 Collection 气氛，正文则回到高对比的中性阅读表面、固定字体角色和最大约 68ch；非图片 UI 的主题变化不超过 10%。
- M1 的中性 Home 以钟馗作为当前 Featured Story；Collection Hero 表现整个中国阴间的入口/旅程，不以巨幅钟馗肖像定义整个主题；Entry 才聚焦钟馗。
- “中国神话传说博物馆”只作为体验体系；公开品牌、`<title>`、SEO 和 structured data 仍使用 `Mythic China` 的实际 `WebSite` / `Article` 类型。在运营实体与资质未确认前，不使用 `Museum` 类型，不声称实体馆藏或机构身份。
- MVP 不使用视频；Hero 为桌面 16:9 与移动 4:5 独立静态构图。主题背景失败、无 JavaScript 或 reduced motion 时不影响内容、导航和 Sources。
- 全站功能动效固定；Collection 只在 Hero/章节环境使用一次性 transform/opacity 主题动效。支持 `prefers-reduced-motion`，正文和 Sources 默认可见。
- 不复制 Black Myth、Apple、WIRED、M+、Google、Rijksmuseum、Oculi Mundi 或其他参考的商标、专有字体、受保护资产、角色、页面皮肤或源码。
- 实现遵守 `内容合同 -> 语义模板 -> 共享表现层 -> Collection 覆盖` 的替换边界；内容文件不保存 CSS class、token、断点或视觉组件名。MVP 不建设运行时换肤或双设计系统。

### 6.3 隐私与安全

- 客户端无密钥。
- Reader Request 默认只提交 page ID、短建议和时间；邮箱可选且单独同意。
- 分析事件不包含邮箱、完整建议、提示词或内部资产路径。
- 所有外部服务进入前记录数据、域名、保留/删除和替换路径。

## 7. 影响清单

| 类型 | 计划动作 | 目标文件或系统 | 对应验收 |
| --- | --- | --- | --- |
| 工程 | 新增 | Astro 应用、锁文件和真实工作流命令 | 安装/构建/测试可复现 |
| 内容 | 新增 | entries、collections（含 `titleZh / pinyin / featuredEntryId`）、sources、claims、terminology Schema | 枚举、ID、关系、Featured Entry、主张证据和术语校验 |
| 视觉 | 新增 | token、布局、组件与 asset manifest | 三类页面视觉/移动/动效验收 |
| 集成 | 新增 | newsletter、feedback、analytics adapter | 字段最小化、失败语义和无密钥 |
| 内容包 | 新增 | 6 篇文章及其 Web/社媒图片 | 编辑、来源、权利与图片门禁 |
| SEO | 新增 | metadata、canonical、OG、Sitemap、RSS | 构建结果与页面源验证 |
| 文档 | 修改 | README、DEV_WORKFLOW、需求状态 | 文档与实际命令/环境一致 |

## 8. 实施拆分

### M1 已确认方向的设计原型与验收

- 目标：把已确认的“中国神话传说博物馆”体系落实为可供工程参考的中性 Home、`The Chinese Underworld` Collection 与 `Zhong Kui, the Demon Queller` Entry，验证页面职责、语义阅读链、主题边界、响应式和表现层替换缝，并如实记录视觉差距。
- 交付：上述 Home、Collection、Entry 可运行静态原型；把已写入文档的 M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 第二轮系统结论落实到 Review Board；按具体题材组织的中国文化 reference board；一个已确认中国阴间 Hero 加五个不建立稳定 ID/路线承诺的 Collection 视觉探针组成的 3×2 家族板；中英混排字体验收页。截图只作仓库外临时验收证据。
- 不交付：完整内容和真实外部服务。
- 完成条件：交付物存在；已执行的结构、链接、三档响应式、控制台、本地资源、内容边界和 Review Board 转译检查有证据；所有未执行的人工/环境项目明确列出；用户明确选择冻结。冻结不要求且不表示人工视觉满意度通过，也不取消 `DESIGN.md` 第 12 节作为首个真实纵切片的生产验收合同。
- 状态：已完成并冻结（工程参考）。2026-08-27，`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、Review Board、3×2 家族探针和字体验收页已经落实；核心三页完成当前工具支持的三档响应式、链接/历史、锚点/焦点回归、Escape、对比/触控目标、无图/灰度、系统 fallback、控制台和本地资源检查。用户明确要求冻结 M1 以结束继续迭代，同时明确表示当前页面风格不是期望结果，因此人工视觉满意度未通过。当时把真实键盘全链、reduced-motion、禁用 JavaScript、真实 200% 缩放、批准字体/慢加载/跨平台 fallback、开发者工具逐字形命中与目标读者测试移交首个真实纵切片；当前路线再由 011 把目标读者测试移到 Public Beta，其余项目保留在 M6 最终 artifact 门禁。

### M2 工程与内容合同

- 目标：按已确认的 Astro 7 静态内容核心，在当前非空仓库根手工建立最小、可复现且表现层可替换的工程与内容合同。
- 交付：Node.js/pnpm/package/唯一锁文件与真实 `DEV_WORKFLOW.md` 命令；Entry Markdown 和 Collection/Source/Claim/Terminology YAML 的 Content Layer；显式 loader ID、Zod Schema、纯内容图校验器与 Vitest；`/explore/{slug}/`、`/collections/{slug}/` 语义路由/调试模板；`zhong-kui` 与 `chinese-underworld-guide` 两个真实 draft demo。不得把独立 HTML 原型整份复制为永久 UI。
- 不交付：批量文章、生产 Asset Manifest/图片管线、A 主 C 辅生产视觉、浏览器自动化、newsletter/feedback/analytics adapter、托管配置、商业字段/组件/服务、外部联调或发布。MDX、adapter、客户端 UI 框架、CSS/动画框架、CMS、数据库、认证与搜索也不进入 M2。
- 完成条件：项目精确使用 `D:\Program Files\nvm\v24.16.0\node.exe` 与 pnpm `11.22.0`，`package.json` 与唯一 `pnpm-lock.yaml` 一致；干净环境 `pnpm install --frozen-lockfile --ignore-scripts` 可复现依赖解析且不执行第三方安装脚本；格式、lint、Vitest、`astro check` 与静态 build 通过；内容目录扩展名 inventory、ID/slug 唯一性、文件/loader/记录 ID 一致、跨集合关系与状态矩阵、Featured Entry、Source 类型/role 与 evidence context、最早 Claim/Source 成对精确绑定、明确排序和失败语义有正反测试。仅以 M2 范围内红线为完成依据，不把 M3 资产、M4 视觉/浏览器或 M5 外部服务提前拉入。
- 状态：已完成本地实施与验证。固定 `D:\Program Files\nvm\v24.16.0\node.exe`、pnpm `11.22.0`、唯一锁文件、Content Layer、Schema、纯内容图校验、41 项 Vitest 与 3 页静态 build 均已核验；M2 实施会话未启动服务、未由代理执行 Git 写入、远端预览或发布，用户随后把结果提交为 `f258227`。

### M3 视觉资产管线

- 目标：建立工具无关的视觉 brief、asset manifest 和 Web 导出规则；仅在实际采用 ComfyUI 时维护最少 workflow 与 model registry。
- 交付：一个人物/场景的桌面 hero、移动 hero、article lead、OG 和社媒导出样例。
- 不交付：为每个角色训练 LoRA。
- 完成条件：样例能从公开文件追到 manifest、视觉来源主张、权利与审核记录。托管生成工具须追到 production record、条款 URL、实际 tool 与 model notes；只有实际使用 ComfyUI 或经合同批准、可稳定登记的本地生成流程时，才要求 workflow 与 model registry。
- 状态：已完成；M3-U1–U5 均已闭合。终验时 Hero v1 曾因双手解剖缺陷重开；Project owner 于 2026-08-29 验收 Hero v2，v1 保留为非 current 历史。七个 local master、三份 current responsive source 的 22 个实际 AVIF/WebP 输出和完整工程门禁均已通过。详细合同见 [`002-visual-asset-pipeline.md`](002-visual-asset-pipeline.md)。

### M4 页面、探索与 SEO

- 目标：实现 Home、Explore、Collections、Entry、About/Editorial Method 及相关内容链路，并建立 published-only 投影与 public/SEO 纯构建合同。
- 交付：响应式 noindex review 页面、共享 shell、真实纵切片、published-only release 投影，以及 canonical、OG、Sitemap、RSS 与结构化数据的纯 builder/正反门禁。实际 public runner、页面 metadata/endpoint 接线和 deployable artifact 由 M6 完成。
- 不交付：站内搜索、账号、评论、M5 外部交互、M6 批量内容、public artifact、远端预览或发布。
- 完成条件：静态 review 构建、故事优先的 Entry 阅读层级、无 JavaScript 基础阅读、三档基础布局、资源/链接、published-only 与 public 负边界、SEO 纯 builder、Hero/字体静态链和 Project owner 当前页面判断通过；真实键盘/200%、偏好/故障、支持平台与本地/预览性能保留为 M6 release-candidate gate。生产、live/RUM 与最终目标读者验证归 M7，不反向依赖后续里程碑关闭 M4。
- 状态：已完成。M4-U1/U2/U3、M4-U4A、首个纵切片、Collection/Guide Hero、4 份英文与 6 份 CJK WOFF2 静态链、U5A 字体样张、最终 8 页 × 三档基础矩阵、四条 Hero 页 12 个 art-direction 组合及当前 8 页 Project owner 视觉判断均已闭合，并由 Project owner 提交为本地干净基线 `3983bee`；没有 public artifact、`ready/published` 内容、远端预览或发布。详细合同见 [`003-pages-exploration-seo.md`](003-pages-exploration-seo.md) 与 [`004-first-vertical-slice-candidate.md`](004-first-vertical-slice-candidate.md)。

### M5 外部交互边界

- 目标：接入经确认的全站 Footer newsletter、文章末尾 reader request 与最小分析。
- 交付：provider-neutral DTO/validator/adapter interface/Fake、后续同意文本、页面入口、供应商 transport、失败状态与隐私说明；Web Vitals/RUM 已明确延后到 M7，provider-neutral 字段、环境、保留与退出上限先冻结。
- 不交付：用户画像、公开投稿和支付。
- 完成条件：只传合同字段；真实联调经单独授权并有回查证据；M7 的 RUM/p75 门禁已有明确数据生产者或被明确列为 M7 独立实现，不留下无来源指标。
- 状态：M5-U2 provider-neutral strict DTO、Submission/Record 分离、三个 analytics 事件、URL/referrer 清洗、失败语义与三类零网络 Fake 已完成；U3 inactive Newsletter / Reader Request review UI、Privacy 页面与 output oracle 也已完成，见 [`006-external-interactions.md`](006-external-interactions.md)。Project owner 已确认 Buttondown 账户审核通过，Tally Free 草稿仍未发布；U4 的 supplier transport、发布、provider mapping、账户级设置、供应商数据和联调尚未开始，U5B 的 GoatCounter 轻量合同、注入式 adapter、条件 DOM hook 与 Privacy 未启用说明已通过本地检查，账户设置已由 2026-09-09 的截图/保存确认，M6 默认关闭页面接线与产物离线验证已完成，真实统计未启用。
- 2026-09-07 无账号子单元：U5A 纯内存阅读判定已通过 21 项专属测试，新增 visible 时间、正文 75%、once-only 与 reset 的实际逻辑；不接 DOM/页面/配置/网络，U5 整体仍未完成。同期 Privacy 的纯 SEO/Sitemap 支持见 003，完整本地验证为 26 文件/433 测试与 14 页 noindex 输出；实际采集、公开构建和发布均未启用。

### M6 首发内容与预览验收

- 目标：完成 6 篇 Entry、至少 2 个 Collection 和全部视觉内容包，在完整本地 inventory 上组装并验证可部署 public 候选，再按独立授权进入远端预览。
- 交付：内容包 `ready`、Project owner 的逐项 `published` 决定、真实 HTTPS origin、原计划 M4-U4B 的 public intent/runner、页面 metadata、Sitemap/RSS/JSON-LD endpoints、独立 output verifier、最终 public artifact、release-candidate QA、clean-source verification receipt，以及后续受保护的预览环境候选版本。
- 完成条件：claim/source、术语/译文、英文、文化、图片与内容无障碍文案门禁通过；published-only 真实非空索引和 public assembly 实现完成。assembly 稳定后，Project owner 单独授权形成 clean committed source；必须从该 revision 重新构建同一最终 artifact，重跑 public output verifier，并通过 390/768/1440、真实键盘、200%、JavaScript-disabled、reduced motion、字体/图片故障、支持平台 fallback、链接、最终视觉与本地性能验收。最终 receipt 记录 clean source revision、lock/source digest、public intent、verifier/QA 结果与 `dirty: false`；dirty source 只允许 nondeployable 诊断记录，提交后不得复用旧 artifact、QA 或 receipt。远端预览再把该 clean committed source、receipt/verifier 与 deployment target 绑定为 `validated_source_identity`。目标读者 R2 不属于 M6 进入条件。
- 状态：部分完成。六篇文章、两个合集、Hero、关系和 owner 首发 published/2026-09-10 日期决定已闭合；013 的真实 origin 与本地 public assembly、016 的条件式 hosting Privacy 已完成；最终 QA、clean-source receipt、实际托管验收与受保护预览尚未完成。

### M7 Public Beta、生产基线与正式 MVP 收口

- 目标：在用户独立授权后把已验收身份发布为可索引 Public Beta，建立只读发布后检查，并在 live artifact 上完成目标读者验证。
- 不交付：商业化与下一阶段功能。
- 完成条件：目标身份一致，域名和核心页面可用，无新增关键技术发现；live robots/canonical/资源/核心阅读 smoke、回滚入口、目标地区复核与发布后真实流量 RUM/p75 基线有记录；按 010/011 完成 R2a、R2b、关键发现处置、重复重大问题处置与复测，并由 Project owner 关闭正式 MVP 验证。缺少样本期间保持可见 Beta 提示和内部 `Public Beta / pending human validation` 状态。
- 状态：未开始。

## 9. 测试与验收矩阵

| 层级 | 场景 | 期望结果 | 当前结果 |
| --- | --- | --- | --- |
| 文档 | 文件清单、占位符、UTF-8、相对链接、阶段边界 | 治理/产品/需求文档与当前 6 份 Entry Markdown 存在，无原模板占位符，编码有效，链接存在，且未误建范围外实现项 | 通过（2026-09-04）：固定运行时 Prettier、29 份 Markdown 严格 UTF-8/相对链接、占位符、尾随空白与 diff 检查均符合；2026-09-02 当时的 2 份 Entry / 22 份 Markdown 结果只保留为历史基线 |
| 竞品 | 直接竞品/相邻标杆、桌面/移动证据、采用/不采用决策 | 观察与项目评估分开；每项设计决策能指出借鉴来源或原创理由 | 首轮 10 个内容/编辑站点加 Black Myth 台账保留；M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 第二轮结论已落实到 Review Board 的目标/落点/转译/不采用证据。截图为仓库外临时材料；正式目标读者差异化与可信度研究未执行，移交 M7 Public Beta live artifact |
| 视觉家族 | 六个 Collection Hero、中性 Home、统一 Article、无图与灰度 | 同一现代品牌、不同主题展厅；Collection 只覆盖批准 token/资产/动效；文章阅读系统固定 | 中性 Home、中国阴间 Collection、钟馗 Entry 与 3×2 家族探针已作为工程参考冻结；无图/灰度和 realm token 静态/浏览器检查有证据。M3 钟馗五项 current 用途已通过资产级终审；Hero v1 手部缺陷被 v2 定向返修。Chinese Underworld Collection、Guide、四篇新 Entry 与 Liaozhai Collection 的 Hero 均已完成权利、成品审核、exact-canvas、approved/current manifest 与所属内容绑定；M4 历史页面判断已通过，后续新页面和完整 inventory 留 M6 发布候选 QA，正式目标读者视觉研究留 M7 Public Beta |
| 表现层替换 | 内容快照 + 中性调试样式或替换候选预览 | UI 重构不改内容文件、稳定 ID、证据关系、slug、canonical、语义阅读顺序与静态输出 | M4-U2 已一次性替换 DebugLayout，内容、稳定 ID、slug、关系、Schema 和 manifest 未改；013 后共享 production shell 按 intent 输出 review/public；两者均未部署 |
| 字体 | 英文、中文、拼音、困难字形、fallback、慢加载、200% 缩放 | 无缺字/伪字体/裁切；阅读舒适；CLS 在后续预算内 | 4 份英文与 6 份 CJK WOFF2 静态门禁通过；noindex 样张精确覆盖 display/story/body、生产 pinyin 语言/冻结混排行、SC/TC 400/500/600、65/36 required 与 fallback-only `测`/`測`，并由最终 HTML/CSS oracle 锁定映射。2026-09-02 最终 DOM/CSS 三档均有 20/20 样本可见、10 个字体资源、computed mapping 正确及无裁切证据；实际 fallback face、慢/阻断字体、macOS/iOS/Android、真实 200% 与 CLS 未验证 |
| 内容 | Schema、枚举、ID、slug | 所有已发布对象合法且唯一 | M2 严格 Schema、文件/loader/记录 ID、全局稳定 ID 与 Entry/Collection slug 唯一性正反测试通过；当前为 6 published Entry 与 2 published Collection，六篇目标公开日期统一为 2026-09-10；14 Source / 25 Claim / 6 Terminology 均通过内容图门禁 |
| 证据与翻译 | claim evidence context、locator、Source 类型/证据角色、确定性、最早证据精确绑定、术语语境和审核状态 | 不支持的主张不能发布；现代/参考材料不能单独把传统事实判真；关键术语不是全站固定一对一翻译 | `Project owner (user-confirmed)` 已分批批准六份 Terminology 为 `bilingual-approved`，并把四条已复核馆藏中文标题核定为 `titleZhLang: zh-Hant`；Painted Skin 的本站自译 Claim 保存原文、版本、locator、译者/日期和审核记录并已为 `verified`。内容图继续阻断其他 provisional Claim、未获双语批准术语及 generic `zh` 标题进入 ready lineage |
| 关系 | source/entry/collection/asset 引用 | 无悬空引用；`Collection.entryIds` 是成员关系唯一来源，反向入口构建期派生；Collection—Entry 状态满足合同矩阵，`featuredEntryId` 同时存在于 `entryIds` 并通过相同状态校验 | 内容关系与 visual brief/manifest/production record/文件/Entry/Collection Hero 双向外键、slot/current resolver 正反测试均通过；当前 6 篇 Entry 与 2 个 Collection 分别解析自己的 approved/current Hero。VB6 已闭合两条 Related 编辑环、Liaozhai Featured（Painted Skin）与 6+2 ready，随后首发 6+2 published 已获独立批准，Related 输出仍 published-only，当前六篇各显示一个既定目标 |
| 构建 | 静态生成、图片、Sitemap、RSS | 命令成功且输出完整 | 2026-09-07 五组 Hero 定向数据检查通过，非默认视觉链实际核验 21 个 local master，并从 17 份 current responsive rendition 生成、解码 120 个目标。最终完整工程门禁通过，生成并核验精确 14 页 noindex review HTML、112 个 Hero 页面图片、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。013 已接入真实 origin 的 public routes/artifact，13 HTML、2 XML、robots.txt 与独立 output verifier 通过；最终 clean-source QA/receipt 仍未完成 |
| 页面 | Home/Collection/Entry | 390/768/1440px 无阻塞布局问题；Home 中性、Collection 主题独立、Entry 阅读统一 | M4 正式字体矩阵覆盖 Home、Collection、Guide、Zhong Kui 四条直达页 × 390×844、768×900、1440×900；修复 Collection desktop 行、移动固有宽度/高度与 768px 说明相交后，12/12 无横向溢出、破图或 console 警告错误。Project owner 当时明确通过全部 8 个 M4 页面；U3 当时只完成静态/DOM 门禁；014–016 随后完成本地页面走查，016 覆盖全部 13 条普通路由三档与核心阅读链/图注键盘抽查。未来完整 inventory 和最终 public artifact 的页面回归留 M6 发布候选 QA |
| 阅读层级 | Entry 故事入口、术语首见、主张来源、完整 Sources、Related/Request、Footer | 故事与 Quick Answer 在前；术语自然解释、出处贴近主张；完整 Sources 后才继续探索；newsletter 仅在 Footer | 当前六个 published Entry 均有正文；Painted Skin 当前渲染两段 opening、摘要、五节证据受限正文与两份完整 Source。U3 已在完整 Sources/Related 后渲染 inert Reader Request，并只在 Footer 渲染 inert Newsletter；它们尚未接真实 transport |
| 无障碍 | 键盘、focus、对比、语义、reduced motion | WCAG 2.2 AA 无阻塞问题；项目目标满足 | 样张提供原生 anchor/details 静态语义，输出保持零 JS；最终 pinyin/mixed DOM 与 CSS 已通过 24 个三档组合且无横向溢出。控制面聚焦 skip/summary 可观察 2px focus outline，鼠标 details 可开合且 44px 目标成立，早期控制面当时不能可靠分发键盘或切换媒体偏好；003 的后续隔离 Edge 预检和 016 图注键盘抽查已补相应局部证据，最终 clean-source public 候选的完整键盘/200%/媒体偏好仍未验收 |
| 渐进增强 | 禁用 JavaScript/第三方失败 | 正文、来源和核心导航仍可用 | 构建与实际浏览器均为零客户端 JavaScript，原生 details 移动导航、Sources 和核心链接默认可见；003 后续预检已模拟禁用 JavaScript 和图片/字体失败；014–016 的实质样式/结构变化后，最终 public 候选仍须重验受影响故障范围，不能仅凭零脚本或旧截图视为通过 |
| 集成 | Footer newsletter/feedback Mock 与真实联调 | 全站只有一处订阅入口；合同字段、明确成功/失败、无密钥泄露 | U2 纯合同/Fake 与 U3 inert review UI/output oracle 已实现；U3 当时定向 3 文件/79 项及完整 25 文件/320 项测试、9 页 output verifier 通过。2026-09-06 Painted Skin 单见证补缺后的固定运行时完整门禁为 25 文件/351 项测试和 14 页 output verifier；外部账户/草稿准备存在，但供应商 mapping、action/link、发布与真实联调未实现 |
| 性能 | LCP hero、图片尺寸、客户端 JS | 达到后续确认的预算，无明显布局跳动 | 当前 8 个 Hero family 均有明确尺寸、eager/high priority 与独立 mobile/desktop art direction，默认 review 输出合同精确限定 112 个限宽 AVIF/WebP，客户端 JS 为零；本次浏览器控制面没有取得可信 LCP/CLS 或节流数据，性能仍未通过 |

M2 的真实本地命令与执行证据已写入 `../../DEV_WORKFLOW.md`；M5/M6/M7 的真实联调、远端预览与生产发布命令仍须在对应里程碑开始前补齐，本需求不复制假设命令。

## 10. 环境、数据与授权

| 动作 | 环境 | 影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- | --- |
| 本轮文档整理 | 本地文档工作区 | 修改既有项目 Markdown | 用户已明确授权 | 已执行并完成文档验证 |
| 本地 Git 初始化与用户基线 | 当前项目根 `F:\codex-project\mythic-china` | 代理在初始化会话只执行 plain `git init`；用户随后建立 `main`、提交与 `origin` | 用户分别确认初始化与其自行 Git 操作；来源复核提交另由 Project owner 明确授权 | M2 历史基线为 `f258227`，M3 为 `c606f5`，M4-U1/U2 为 `5f327b6`，U2 主体历史基线为 `8c6d12`，M4-U3 为 `e94eaca`，首个纵切片 release-readiness 为 `eb6e20c`；后续检查点包括 `a3194d0`、`d60691a`、`9434a76` 与任务前已更新本地 tracking ref 的 `e2893d1`。本任务未 fetch、add、commit 或 push；精确 HEAD、工作树与服务器端关系以执行前只读核查为准 |
| M2 pnpm、依赖安装与应用初始化 | 当前项目根及本地开发环境 | 固定使用已验证的 `D:\Program Files\nvm\v24.16.0\node.exe`；提供 pnpm `11.22.0`，新增依赖目录、唯一锁文件、配置、源码和测试 | 用户已明确开始 M2，并单独确认固定 Node、pnpm、依赖与原地初始化授权 | 已执行并通过冻结安装与全量门禁；M2 实施会话未启动服务或由代理执行 Git 写入/发布，用户随后提交 `f258227` |
| M3-U1 合同与基线收口 | 当前项目文档 | 新增详细 M3 需求并同步资产、架构、命名、流程和当前状态 | 用户已明确开始并随后确认 M3 第一步 | 文档交付、验证与六项核心决定确认完成；不含 M3-U2 至 U5、依赖、服务、Git 写入或发布 |
| M3-U2 最小研究与 visual brief | 当前项目内容、`visual/briefs` 与必要架构边界测试 | 钟馗真实 Source/Claim、权利清单、证据分层与四资产 brief | 用户明确回复“确认这 6 点，开始 M3-U2” | 5 份 Source、5 份 Claim 与一份当时为 `in-review` 的 brief 已完成；该 brief 随后在 U3 获项目所有者批准；Entry 保持 draft，无 Terminology、manifest 或图片 |
| M3-U3 Schema、loader、validator 与 resolver | 当前项目 visual/content 加载链、`src/visual`、空 inventory 与自动测试 | strict Schema、两个 Content Layer collection、关系/文件 validator、metadata registry、显式 current resolver 与正反测试 | 用户明确回复“确认 M3-U2 brief，并开始 M3-U3” | approved brief 通过真实 build 调用链；9 个测试文件/68 项测试与 3 页静态 build 通过；无生产 manifest、图片、依赖、服务或 Git 写入 |
| M3-U4 钟馗视觉生产与终审 | 当前项目 `/.local/visual-production/`、`visual/production-records`、`visual/manifests`、`src/assets/images` 与钟馗 Entry | ImageGen 生产、五个 master、五份 source rendition、production record、四份 approved/current manifest、五项人工审核与 Hero 外键 | 用户逐步授权 U4、个人账户/发布权利、五项审核及被拒移动姿态的定向修正 | 已完成；Entry 保持 draft，未启动服务、写 Git 或发布 |
| M3-U5 资产构建验证与文档收口 | 当前项目非默认验证脚本、测试与文档 | local master 实体复核、responsive buildPlan 实际写出/解码、完整工程回归 | 用户明确授权 U5，排除服务、依赖、Git 与 M4 | 除首次 `MissingSharp` 外的范围已完成；依赖例外见下一行 |
| `sharp@0.35.4` 直接依赖与唯一锁文件更新 | 当前项目依赖清单、锁文件与本地安装 | 为 U5 提供 Astro 图片转换后端；不启动服务、不进入 M4 | `MissingSharp` 后由 Project owner 单独授权 | 已完成；22 个目标与完整工程门禁通过，其他依赖未授权 |
| M3 终验 Hero v2 手部返修 | 当前项目 Hero 资产、Git-ignored 生产目录、manifest、production record、测试与文档 | 只修复双手解剖，新增 v2 并保留 v1 审计历史；不改身份、面部、服装、构图、安全区或小鬼姿态 | Project owner 明确要求返修并在候选展示后回复“可以”验收 desktop candidate 01 / mobile candidate 02 | 已完成；Hero v2 为唯一 current，v1 为 approved/non-current；七个 master、22 个 current 响应式目标和完整工程门禁通过 |
| M4-U1 合同与基线同步 | 当前项目文档 | 新增 M4 详细合同并同步 README、001 与 DEV_WORKFLOW；不改源码、内容、资产、依赖或配置 | Project owner 明确授权 U1，并于 2026-08-29 确认合同第 1–9 项 | 已完成；UTF-8/相对链接/占位符/格式/diff 范围验证通过；后置事项按对应单元再确认 |
| M4-U2 页面基础与首个真实纵切片 | 当前工作区已列明源码、测试、package scripts 与文档 | noindex review shell、7 页真实路由、Hero current resolver、测试和静态回归；不改内容/Schema/资产/依赖/lockfile | Project owner 明确要求开始 M4-U2，随后单独授权 preview/浏览器并确认页面方向 | 已完成并由用户最终提交为 `5f327b6`；`8c6d12` 为主体历史基线，不含 U3-U5、后续服务控制、代理 Git 写入、部署或发布 |
| M4-U3 Explore、Collections 与 About | 当前工作区纯 release/review 投影、site 测试、既有输出 verifier 与四份文档 | published-only view model、空/单/多 fixture、真实空状态、About 四节和静态导航/无 JS 门禁；继续拒绝 public build | Project owner 明确授权推荐方案并确认沿用 About 四节 | 已完成本地实施与验证，并由 Project owner 提交为 `e94eaca`；14 个测试文件/90 项测试、Astro 55 文件零诊断、7 页/14 图输出通过；未改依赖、内容、资产或页面/CSS，代理未启动服务、写 Git 或发布 |
| M4-U4A public SEO 纯基础设施 | 当前工作区 4 个 site 模块、4 个测试、About、review verifier 与 7 份治理文档 | HTTPS origin 校验合同、公共身份、public 最小 inventory 门禁、metadata/JSON-LD、Sitemap/RSS 纯 builder；不接 public 页面/output | Project owner 明确授权按推荐方案继续，并确认未来 Vercel 托管、publisher/author 与 text-only OG | 已完成；18 个测试文件/157 项测试、Astro 63 文件零诊断和完整 review `pnpm run check` 通过；不含 M4-U5/M4-U4B、依赖、服务、Git、Vercel 项目操作或发布 |
| M4-U5 Windows/local 部分候选预检 | 当前 noindex review preview、四条候选直达页、三档视口、共享 CSS、匹配测试与四份证据文档 | 短时启动本机 PID/端口；修复直接暴露的 Collection 响应式阻塞；不改内容状态、依赖或 public intent | Project owner 确认下一步并要求按计划继续 | 截至该早期单元只执行部分预检：12/12 正式页面基础矩阵与 22 文件/204 测试通过，PID `26712` 已停止且端口 4321 无监听；当时专用字体样张、真实键盘/200%/偏好与故障模式、性能、跨平台及 Project owner 页面确认仍阻断。后续样张和当前页面判断见最终证据批次；该单元未执行 Git 写入、Vercel、部署或发布 |
| review 索引候选架与功能页排版修正 | 固定 review preview helper、Explore/Collections/About、作用域 CSS、匹配测试/verifier 与证据文档 | 保留 published-only release/真实空状态；精确展示一个 Collection/两个 Entry 候选；补实 About 并收紧字号 | Project owner 在运行页确认总体观感、指出功能页问题并要求先修改 | 已实现并通过 22 文件/207 测试、Astro 70 文件零诊断及三个功能页 × 三档浏览器复核；Project owner 随后结束复看并授权停止服务，PID `20084` 已结束且端口 4321 无监听。未执行状态提升、依赖、Git、public/Vercel、部署或发布 |
| M4-U5A noindex 字体样张与可控验证入口 | `/review/type-specimen/`、作用域 CSS、独立 output policy、typography/release/SEO 负测试、既有 verifier 与证据文档 | 精确覆盖英文角色、生产 pinyin/冻结混排行、SC/TC 400/500/600、required/fallback-only；8 页 review、10 字体、零 public/JS，不改字体/内容/资产链 | Project owner 明确要求先更新合同、实现 U5A、运行可控浏览器场景并同步证据，随后确认按审查结论加固 verifier | 实现与自动门禁已完成：23 文件/279 测试、Astro 73 文件零诊断、8 页/42 图/10 字体、零 XML/JS；selector/可见性、活跃语义壳、资源闭合与输出链接项负例已加入。截至该 2026-09-01 单元，审查加固前候选完成过 390/768/1440 基础矩阵，最终 DOM/CSS 因随后 pinyin/mixed/CSS/策略修正尚待新授权复跑；历史 PID `9628` 已停止且 4321 无监听。真实键盘/200%/媒体偏好、故障/性能/跨平台未验证，未执行 Git 写入、public/Vercel、部署或发布 |
| 最终 U5 浏览器与人工证据批次 | 同一未提交 source/worktree、完整自动门禁、8 页三档、四条 Hero 三档、字体/交互能力探测、Project owner 判断面与证据文档 | 只闭合工具可控的最终基础矩阵并如实保留能力边界；不提升状态、不改依赖、不进入 public/M4-U4B/M5/M6 | Project owner 于 2026-09-02 单独授权 | 完整门禁再次通过；8 页 × 三档 24 个组合与四条 Hero 页 12 个组合通过，样张 20/20 可见且观测到 10 个 WOFF2，没有发现需修复的业务代码缺陷。Project owner 随后明确通过全部 8 个页面；验收标签已清理，PID `31960` 已停止且 4321 无监听。真实键盘/200%/偏好、故障/性能、实际 fallback face 和跨平台仍未验证；未执行 Git 写入、public/Vercel、部署或发布 |
| Chinese Underworld Collection Hero 生产闭环 | 当前项目 Git-ignored master、repository source、production record、manifest、Collection 外键、图片 registry、验证脚本、测试与文档 | 将已选 desktop 02/mobile 01 高保真重建为精确画布资产；登记个人账户权利事实、五审、公开文案与 approved/current 绑定 | Project owner 已确认四项账户与权利事实、建议权利记录、五项审核及四段公开文案 | 已完成；Collection 保持 `editorial-review`，九个 local master、五份 current responsive rendition、36 个响应式目标和 7 页/28 图 review build 通过；未安装依赖、启动服务、写 Git、部署或发布 |
| Chinese Underworld Guide Hero 生产闭环 | 当前项目 Git-ignored master、repository source、production record、manifest、Guide Entry 外键、图片 registry、验证脚本、测试与文档 | 将已选 desktop A2 与独立构图、定向修正的 mobile 候选转为精确画布资产；登记本 Guide 的账户/权利事实、五审、公开文案与 approved/current 绑定 | Project owner 已批准最终组合，并确认本 Guide 的四项账户与权利事实、权利记录、五项审核及四段公开文案 | 已完成；Guide 保持 `editorial-review`，总 inventory 为 11 个 local master、七份 current responsive rendition、50 个响应式目标和 7 页/42 图 review build；未安装依赖、启动服务、写 Git、部署或发布 |
| M5-U1 推荐合同与 M5-U2 纯合同/Fake | 当前项目需求/架构文档、`src/services`、`tests/services` 与架构边界测试 | 冻结 provider-neutral DTO、字段、Submission/Record、事件/envelope、失败/脱敏和零网络；不接页面或真实供应商 | Project owner 提交 M4 后授权下一阶段，并明确按简化方案继续 M5-U2 | U1 供应商研究完成；U2 三个纯 service 模块与集中测试、2 文件/26 定向测试及完整 24 文件/301 测试、Astro 77 文件零诊断、8 页输出门禁通过；无依赖、服务、账户、真实写入、Git 或发布 |
| M5-U3 inert review UI 与 Privacy | 当前项目 006 合同、Newsletter / Reader Request 组件、Footer / Entry 接线、Privacy 页面、样式、output policy/verifier、inventory 与匹配测试 | 只展示 disabled/inactive review 状态并冻结公开隐私、同意、频率、保留和 supplier 方向；不创建账户、action、provider link、脚本、事件或远端请求 | Project owner 明确授权更新 006 与实施 M5-U3，并随后授权把已完成状态同步到权威文档 | 已完成；定向 3 文件/79 测试及完整 25 文件/320 测试、Astro 81 文件零诊断、9 页/42 Hero/10 WOFF2/零 XML/零客户端 JS 输出门禁通过。当前不购买自定义域名；Buttondown/Tally 只作为 U4 有条件方向，Plausible 留在 U5；未安装依赖、启动服务、创建账户、提交数据、写 Git、部署或发布 |
| 2026-09-03 M5-U4 账户准备现场同步 | Project owner 在任务前准备的 Buttondown/Tally 外部账户与当前项目文档 | 只记录当日审核中账户、Free 未发布草稿和零数据/零接线事实；不保存 action/edit link/凭据，不发布或联调 | Project owner 提供当日现场事实并授权同步文档 | 2026-09-03 快照已同步；当时 Buttondown 仍在人工审核，Tally 草稿仍未发布。无 subscriber import、邮件、submission、站点连接、真实写入、Git 或发布；U4 未完成 |
| 2026-09-04 Buttondown 审核状态同步 | Project owner 提供的 Buttondown 审核结果与当前项目文档 | 只把审核已通过同步为用户提供的当前事实；不登录、配置、联调、提交数据或写 Git | Project owner 明确授权该窄范围 | 已关闭等待审核门槛；未核账户级设置、真实 action、double opt-in/tracking、删除/导出或供应商行为，Tally 草稿仍未发布，U4 未完成 |
| 第二 Collection 确认、四篇 claim map 与证据闭合 | 007、008、REFERENCES 及权威状态文档 | 确认 Liaozhai 方向与 3+3 路径；只研究 Ten Kings、Liaozhai 导读、Painted Skin、《促织》的主张、实际见证、正式书目、locator、术语与译文风险 | Project owner 明确“确认 007 推荐，并授权下一批只做四篇 claim map 与来源研究”，随后单独授权底本/书目/locator 证据闭合 | 已停在分层证据账本：Ten Kings 与 Painted Skin 有限域可物化证据；Liaozhai 待主校勘本决定；《促织》青柯亭单见证已核、跨见证仍阻塞。未创建 Collection/Entry/Source/Claim/Terminology，未写正文、处理资产、改状态、安装依赖、启动服务、写 Git、部署或发布 |
| 2026-09-04 四篇证据最小物化 | 四个 Entry owner、证据已闭合的 Source/Claim/Terminology、Source Schema/旧数据迁移、review inventory、测试与文档 | 只建立空 draft owner 与证据子集；不写正文、图片、Collection/Entry 消费关系、状态、外部服务或 Git | Project owner 先确认任 2016 主/张 2011 对校及《促织》青柯亭单见证路线，再分别授权 Entry owner 和证据物化 | 已建立 4 draft Entry、5 Source、9 Claim、3 Terminology 与 `usesDigitalImageEvidence` fail-closed 门禁；定向 3 文件/35 测试及完整 25 文件/321 测试、Astro 81 文件零诊断、13 页/42 Hero/10 WOFF2/0 XML/0 JS 输出通过 |
| 2026-09-04 证据检查点与 Ten Kings 单篇纵切片 | 本地证据批、`ten-kings` Entry、008 与权威状态文档 | 先形成可回退的本地检查点，再只绑定 Ten Kings 已闭合证据并写英语首稿；不处理图片、Collection/related 关系、状态或外部服务 | Project owner 接受推荐顺序、通过首稿并授权本地提交 | 证据批已本地提交为 `9914dd3`、未 push；Ten Kings 使用 2 Source / 3 Claim / 1 source-checked Terminology，形成两段 opening、110 词摘要和四节正文并保持 `draft`。完整 25 文件/321 测试、Astro 81 文件零诊断与 13 页 output verifier 通过；纵切片已进入当前本地 HEAD，未 push |
| 2026-09-04 Fighting Cricket 单见证纵切片 | `fighting-cricket` Entry、既有 Source 可见记录字段、008 与当前状态文档 | 只绑定既有 1 Source / 3 Claim / 1 Terminology 并写证据受限英语首稿；可见记录按独立例外改为 ASCII、精确馆藏号留在内部 notes；不处理图片、关系、状态或外部服务 | Project owner 明确授权纵切片、CJK 可见记录最小例外，并在中文概要复核后确认内容符合预期、授权本地提交 | 两段 opening、104 词摘要和四节正文已形成并保持 `draft`；最终完整 25 文件/321 测试、Astro 81 文件零诊断、13 页/42 Hero/10 WOFF2/0 XML/0 JS output verifier 通过。纵切片随本地检查点进入当前 HEAD，未 fetch 或 push |
| 2026-09-04 Liaozhai Reading Guide 证据受限纵切片 | `liaozhai-reading-guide` Entry、008 与当前状态文档 | 只绑定既有 1 Source / 2 Claim / 1 Terminology 并写证据受限英语首稿；任/张实际册页继续排除；不新增或修改证据对象，不处理图片、关系、状态、CJK 字体或外部服务 | Project owner 明确授权该窄范围，随后于 2026-09-05 通过中文概要确认内容符合预期并单独授权本地提交 | 两段 opening、96 词摘要和四节正文已形成并保持 `draft`；只归因使用 Luo 2009，任/张没有写成已核来源。完整 25 文件/321 测试、Astro 81 文件零诊断、13 页/42 Hero/10 WOFF2/0 XML/0 JS output verifier 通过；纵切片与必要状态同步随本地检查点进入当前 HEAD，未 fetch 或 push |
| M1 临时 Express 预览/浏览器测试 | 当前本地工作区；仅 `127.0.0.1:4173` | 系统临时目录安装 Express；短时改变本地进程状态；不写项目运行时 | 执行前说明影响 | 2026-08-27 本次已授权并执行；浏览器检查完成后服务已停止，端口不可达，项目未产生运行时依赖文件 |
| 外部表单、邮件、分析真实联调 | 未来测试环境 | 发送数据/改变第三方状态 | 单独授权 | 未授权 |
| 预览部署 | 未来预览环境 | 远端构建与可访问 URL | 单独授权或已定义流水线 | 未授权 |
| 生产发布 | 未来生产环境 | 公网发布 | 独立明确授权 | 未授权 |

## 11. 发布与门禁

Vercel 已被选为静态托管目标，Project owner 当前不购买自定义域名；owner 已建立个人 Hobby 空项目 `project-scu6m` 并确认稳定 Production 域名 `mythic-china-beta.vercel.app`，013 已将其作为显式 origin 接入本地 public assembly。平台内部身份、实际配置、受保护预览与生产环境仍未验收；每次部署生成的 preview/commit URL 不得作为 canonical。

M6 远端预览前必须：

- 在 `../../DEV_WORKFLOW.md` 写入真实的项目关联、源身份、受保护预览、撤销与回滚命令；不得上传 review `dist/`。
- M6 public artifact assembly 先从正式 loader/validator/resolver 和完整 published inventory 生成 public 页面、metadata、Sitemap/RSS/JSON-LD，并由独立 output verifier 验证。
- assembly 实现稳定后，先由 Project owner 单独授权形成 clean committed source，再从该 revision 重新构建同一最终 public artifact，完成真实键盘、200%、JavaScript-disabled、reduced motion、字体/图片故障、支持平台 fallback、最终视觉与本地性能 QA，并生成 verification receipt；最终 receipt 必须记录 clean source revision、lock/source digest、public intent、verifier/QA 结果与 `dirty: false`。dirty source 只可产生 nondeployable 诊断记录，提交后不得复用旧 artifact、QA 或 receipt。
- M6 只把 clean committed source、receipt/verifier、完整候选身份与具体预览 deployment target 绑定为 `validated_source_identity`；若复用不可变制品，还须记录完整 artifact inventory/digest。
- 验收预览保护、访问范围、目标地区表现、成本和退出路径。
- 获得远端预览独立授权。

M7 Public Beta 生产发布前必须：

- 确保生产候选与已验收预览身份一致；若内容、状态、模板、资产、样式或配置变化，重跑受影响门禁。
- 将 newsletter、feedback、analytics 的生产配置分别验收。
- 在同一候选中加入经 Project owner 批准、可见且可访问的 Public Beta 提示，不宣称目标读者验证已经完成。
- 写入并验证生产、只读发布后检查与回滚命令。
- 获得生产发布独立授权。

Public Beta 上线后必须：

- 先按 011 第 5 节另行冻结并授权研究执行包和版本身份，再对 live artifact 完成 R2a 非计入试跑与 R2b。核心全站 cohort 取 5–8 份可用记录，010 所列四篇焦点 Entry 各取前 5–8 份可用深读；被跳过、撤回或无效的范围可按预冻结规则补位，总招募人数可能超过 8。阈值和问题处置按 010/011。
- 缺少样本或研究阈值尚未达到时保持可见 Beta 提示和内部 `Public Beta / pending human validation` 状态，不把研究写成已完成。
- 具体发现若暴露事实、来源、文化安全、无障碍或视觉硬门禁缺陷，立即修复，必要时回滚或取消发布受影响页面，并对影响范围复测。
- 按 006 与 011 核验唯一 RUM producer 和真实 production 数据路径；至少观察连续 14 个完整自然日，各指标达到 50 个有效测量值才报告 LCP/INP/CLS p75。样本不足时记录 `RUM INCONCLUSIVE — INSUFFICIENT TRAFFIC`，不冒充性能通过，也不在看到结果后下调窗口或门槛。
- Project owner 核对 live/RUM 技术基线、聚合结果、修改与复测证据后，明确关闭目标读者验证与正式 MVP 验证。

## 12. 当前完成记录

- 结果：M1 工程参考、M2/M3 基线及 M4 本地产品实现已收口；M5-U2/U3、四篇证据受限草稿与两个合集路径已建立。010 的 AI 专业审读已落实为四篇文案修订和统一 `contentNote` 合同；012 又闭合四篇 Entry 与 Liaozhai Collection 的五组 Hero，当前全库为 6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology，且 8 个内容 owner 均绑定自己的 approved/current Hero。六份 Terminology 均为 `bilingual-approved`，Painted Skin 短译 Claim 为 `verified`。修订前锁定稿及 010 改动单元均已通过 Project owner 双语确认；VB6 已审核 6+2 到 ready，R1 静态验证仅属于其冻结版本，现为 reference-only。更早 M4 证据见 `003-pages-exploration-seo.md`，M5 证据见 [`006-external-interactions.md`](006-external-interactions.md)，五组 Hero 证据见 [`012-five-hero-visual-briefs.md`](012-five-hero-visual-briefs.md)，命令与运行证据以 `../../DEV_WORKFLOW.md` 为准。
- 未完成/风险：M5-U4 的 Buttondown 账户级配置/真实 action/合成订阅联调、Tally 草稿发布与真实联调、GoatCounter 实际处理/清理核查与真实浏览器/报表验证（账户设置及 M6 默认关闭 bootstrap/制品接线已完成），以及最终 release-candidate QA、verification receipt、Vercel 账户/实际配置与部署仍未完成；013 的真实 public origin、runner/Layout metadata/endpoint 已本地实现。六篇 Entry / 两个 Collection 已通过 VB6 ready 审核，其后 owner 已批准全部 published，六篇目标公开日期统一为 2026-09-10；014–016 已覆盖新页面的本地浏览器走查，最终 public 候选人工 QA 仍未完成。目标读者反馈仍为 0，按 011 留到 Public Beta live artifact。任/张实页、现代译本/影视比较只在未来恢复这些范围时再处理。真实键盘/200%/偏好、慢/阻断加载、图片失败、LCP/CLS、实际 fallback face 与跨平台 fallback 尚未闭合。
- 版本身份：五组 Hero 已提交为 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`；VB6 开始时 HEAD、main 与本地 origin/main 对齐且工作树干净，未 fetch 或查询服务器。较早提交见第 0 节与 DEV_WORKFLOW；013–016 检查点从 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd` 上的完整工作树开始，本次本地提交授权、范围与实际身份按 DEV_WORKFLOW 和 Git 历史核对，不构成发布授权。

## 13. 当前最终结论

- 需求状态：草拟；M1 工程冻结决策、设计体系、A 主 C 辅的 Home 概念方向、首个 Collection、钟馗 Featured Entry、M2 技术/内容合同、M4 第 1–9 项、M4-U4A 的未来 Vercel 托管方向/公共身份/text-only OG、M5-U2/U3 合同，以及第二 Collection 方向与 3+3 分配均已确认；U4 账户准备事实、四篇 claim map/分层证据、Liaozhai 工作底本研究路线、两篇单见证路线、证据物化、四篇纵切片、两个合集路径及 010 R1 已记录。011 又确认先发布 Public Beta、再执行 live R2 与正式 MVP 收口；后置决定仍按对应单元确认。
- 实施状态：M1 已完成并冻结为工程参考基线；M2、M3、M4 本地产品实现、M5-U2/U3、四篇证据受限草稿、两个合集路径、010 的文案/R1、012 的五组 Hero 资产闭环及 VB6 的 6+2 ready 审核已完成；owner 后续批准首发 6+2 published，六篇目标日期 2026-09-10。013 已完成本地 public artifact assembly，014–016 已完成版式、墨色与阅读收尾；目标读者 R2、U4 的真实 provider transport/联调、U5、最终候选 QA 与 M7 尚未完成。
- 验证状态：首发内容批准后的完整本地 check 已通过 25 文件/401 项测试、Astro 81 文件零诊断与 14 页 noindex 输出；精确索引、Related、112 Hero、10 WOFF2、零 XML/客户端 JavaScript 和 inactive 交互均通过。VB6/视觉生产与冻结 R1 的历史证据保留；本批未改资产，未重跑非默认视觉生产验证。013–016 已补 public/review 构建与本地浏览器证据，最新范围见对应需求和 README；目标读者、供应商及同一 clean-source 最终 public 候选的键盘/缩放/故障/性能和跨平台仍未验证。
- 发布状态：内容编辑状态为 6+2 published，六篇目标公开日期为 2026-09-10；网站未部署或上线；本次检查点的提交结果以 DEV_WORKFLOW 与 Git 历史为准，不含推送。
- 已满足：项目范围、M2 目标架构与内容合同、引用/资产边界、实施拆分，以及“中国神话传说博物馆 + A 主 C 辅 Home 概念方向 + 中国阴间 + 钟馗 Entry”的工程参考与表现层替换边界已形成；未来商业化只保留隔离出口，不进入 M2 实现。
- 尚未满足：完整 6+2 的新页面级最终人工审校；M5-U4 的 Buttondown 账户级配置/真实 action/合成订阅联调、Tally 草稿发布与真实联调、GoatCounter 实际处理/清理核查与真实浏览器/报表验证（账户设置及 M6 默认关闭 bootstrap/制品接线已完成），以及最终 release-candidate QA、verification receipt、Vercel 内部项目身份/实际配置与部署等后续门禁；013 本地 origin/public assembly 已完成，不再列为未实施。任笃行/张友鹤实页、CText/Giles 直接比较、现代译本与影视证据已移出当前 MVP，只有未来恢复相应比较时才重新成为门禁；青柯亭 `業魅`、Tso `孽魅` 与 CText 关联未具名见证 `孽鬼` 的跨见证来源和演变也未解释。真实键盘/200%/偏好、慢/阻断加载、图片失败、LCP/CLS、实际 fallback face、跨平台 fallback，以及最终 inventory 的页面级人工批准尚未闭合。目标读者反馈为 0，Public Beta 上线后仍须完成 R2a/R2b、问题处置、复测与 Project owner 收口。未验证项没有被改写成通过。本期未使用 ComfyUI，因此按 M3 合同不需要 workflow/model registry。
- 8 个 Hero family、Terminology 双语/CJK 门禁、M4 历史页面与人工判断已闭合各自范围；M5-U2 provider-neutral 合同/Fake 与 U3 inert review UI/Privacy 已落地。M6 内容方向、四篇研究/证据物化/草稿与两个合集路径已经建立；修订前英文批准及 010 当前改动单元的聚焦双语确认均已完成，当前 R1 已重建并通过静态检查。VB6 已闭合四篇分类、Related 编辑环、Featured 与 6+2 ready；owner 已批准首发 6+2 published 与六篇目标日期 2026-09-10，013 已完成 origin/public assembly，下一停点为独立 M5/托管核验与完整候选准备；R2a/R2b 在 Public Beta 上线后执行。本文本身不授予真实联调、Git 写入或远端发布权限；本次已获本地检查点提交与只读托管核查授权，精确范围见 DEV_WORKFLOW，不含 push 或部署。
- 是否可以关闭需求：否。
