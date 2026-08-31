# 001 Mythic China MVP 基础与首发：开发与验收说明

## 0. 文档职责与状态

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
| 需求状态 | 草拟；M1、M2、M3 已完成，M4 详细合同已确认 | M3 终验发现的 Hero v1 手部缺陷已以 v2 版本返修并由 Project owner 验收；当前 11 个版本化画布、四份 production record、七份 manifest 记录、六个 approved/current 逻辑资产、Entry/Collection Hero 外键和 50 个 current 响应式输出均已闭合；M4-U1 文档交付与验证已完成，Project owner 于 2026-08-29 确认合同第 1–9 项，详细合同见 [`003-pages-exploration-seo.md`](003-pages-exploration-seo.md) |
| 实施状态 | M1 已冻结；M2、M3、M4-U1/U2/U3、M4-U4A、首个纵切片本地候选、2026-08-31 机器门禁加固、Collection Hero 与 Guide Hero 生产闭环已完成 | 两篇编辑候选、Project owner 已批准并分别绑定的 Collection/Guide Hero、Zhong Kui Hero、自托管英文字体、locale/ready 门禁、运行时可移植性、日期时序、正文可见性与 review 子资源策略已形成；双语术语、Source 标题 locale、字体页面人工批准、CJK、public build、U5 预检/最终关闭、M4-U4B 与发布仍未完成 |
| 验证状态 | M1 工程/结构证据保留；M3、M4-U1 至 M4-U4A、首个纵切片候选、机器门禁与 Collection/Guide Hero 生产链分层通过 | 最近基线为固定本机 Node 下 20 个测试文件/196 项测试、`astro check` 67 文件零诊断、7 页静态 review build、42 个 Hero 页面图片与 4 个 WOFF2 输出通过；11 个 local master 与 50 个 current 响应式目标已实际生成并解码复核。三档 system fallback 浏览器回归已完成并停止服务；Collection/Guide 成图后的真实键盘/200%/慢字体/正式字体浏览器效果/跨平台与 U5 仍未执行 |
| 发布状态 | 未发布 | 未来托管目标为 Vercel；未创建项目、真实 origin、域名、部署配置或 public artifact |

- 当前权威结论更新时间：2026-08-31。
- M4-U3 实现与原收口文档已由 Project owner 提交为 `e94eacaad989652c7f71ae50276652cc3f54997a`（`updatee`）；M4-U2 历史基线为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`（`M4-u2 completed`），U2 主体历史基线为 `8c6d12cabce11741bb83941904993f4d8831c818`，M3 历史基线为 `c606f5aab92d908ff2935c5b7212ad5066636a50`，M2 历史基线为 `f258227da1b5a73f22c87ec99722243742db0ba0`。Guide Hero 生产闭环最初直接接续 `eb6e20c7c2ae5eda895e5a70f547140163877456` 上的未提交 Collection Hero 与本地化合同工作树；后续只读核查发现这些改动已进入本地提交 `a3194d0d59b605cf7a5fcfc5d2d55166c374e13b`，来源复核另形成 `d60691a`。没有创建分支、worktree 或仓库副本，未执行 fetch 或 push；精确 HEAD 与远端关系须在执行前复核。

## 1. 结论与开发就绪判断

### 1.1 一句话结论

先交付一个英语优先、静态生成、视觉驱动且来源清楚的 6 篇内容 MVP；栏目、反馈和商业化通过稳定内容 ID 与后续独立需求的隔离边界保留演进路径，不提前建设 adapter 或平台。

### 1.2 开发就绪

- 是否可以立即执行工程开发：没有新的后续工程单元授权。2026-08-31 已授权的机器门禁加固、Collection Hero 与 Guide Hero 生产闭环已在本地完成；下一工程单元仍须围绕语言/字体人工门禁或 noindex U5 候选预检另行确认。该结论不授权依赖、CJK 工具、dev/preview/browser 服务、Git 写入、Vercel 项目操作、远端预览或发布。
- M2 执行记录：按 `../ARCHITECTURE.md` 与 `../../DEV_WORKFLOW.md` 使用固定 Node 绝对路径和 pnpm `11.22.0`，在当前非空仓库根完成手工最小初始化与冻结依赖安装。M1 冻结只为 M2 提供语义、结构和替换边界；首个真实 Home 可以 A 主、C 辅作为实现目标，但不得整份移植旧原型或候选方向稿。U2 已获得共享表现层方向确认；正式字体、跨平台加载、真实 200%、目标读者比较测试和 U5 最终页面级人工确认仍是完整页面门禁。
- 推荐工程顺序：Collection Hero 与 Guide Hero 的工具条款、账户与 publication rights、exact-canvas、五类审核和资产接线已经分别闭合；当前先完成双语术语、Source 标题 locale、正式英文字体页面与 CJK 阻塞，随后在 non-published noindex 直达页完成 U5 候选预检并进入 `ready`。M5 冻结外部交互边界，M6 再完成 6 篇 Entry、至少 2 个 Collection、全部资产与人工 `published` 决定；在真实非空索引上最终关闭 U5 后确认 HTTPS origin 并进入 U4B。本地 public 候选通过后才可逐次授权 M6 远端预览和 M7 生产发布及发布后基线。public-release 的一个 Entry + 一个 Collection 只是技术下限，不是实际预览资格。
- 当前动作边界：本批文档、代码、测试与非服务型本地验证可以继续；资产/CJK、服务、依赖、Git、Vercel、真实外部写入和发布操作都不自动获得授权。

### 1.3 事实、推断与风险

已确认环境事实：

- 用户具备 ComfyUI 等静态生图能力，当前没有视频制作能力；ComfyUI 只作为可选视觉辅助，不承担事实研究。
- 当前工作区已有不可发布的 Home、Collection、Entry 旧视觉原型，以及 M2 静态应用源码、固定依赖与本地构建产物；M2 只提供中性语义调试模板，不是生产视觉。未启动应用服务，也没有部署。

已确认产品规则：

- 人物、传说和关键术语不得生编乱造；`guai`、`yao` 等词必须按具体语境翻译，外部引用必须标明出处。
- newsletter 只在全站 Footer 提供，不在每篇文章末尾重复；Reader Request 保留为文章末尾的独立反馈入口。
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
- M2 当时不选择托管，Vercel 与 Cloudflare 当时只是首次远端预览前的候选；后续 M4-U4A 已选择 Vercel 作为未来静态托管目标，但仍未创建平台项目。

待验证假设：

- 英语优先、单人配合 AI 维护和指标阈值仍需通过真实读者验证；首批 6 篇的逐篇研究可行性和最终公开阅读顺序尚未验证。第二个 MVP Collection 尚未确认。

未验证风险：

- 公开品牌名和域名可用性尚未核查。
- 首批英文文案、SEO 主题和新视觉执行尚未经过目标读者测试；方向已确认不等于原型效果已验证。
- 首批选题的可靠原典定位、学术解释与关键术语译法尚未逐篇完成审核；`Meng Po`、`Black and White Impermanence` 等晚期/地方复合传统尤其不能先写结论再补证据。
- ComfyUI 当前模型、LoRA、字体和参考素材的商业许可证尚未登记。
- 邮件、分析和反馈服务尚未选择；托管供应商已选 Vercel，但项目、账户、稳定 production alias/hostname、数据/地区边界与实际部署仍未确认。

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

仍待确认：

1. 是否批准 `Mythic China` 作为当前工作品牌，并允许后续在域名/商标核查后调整公开名。
2. 首次远端预览所用 Vercel 账户/项目归属、稳定 production alias/hostname、预览保护、发布授权、回滚和退出路径。
3. 第二个 MVP Collection 从哪些经研究验证的候选中选择；当前不降低“至少 2 个完整合集页”的 M6 预览门槛。
4. 由谁承担中文/古汉语事实与译文复核、英文可读性编辑和图片文化审校的最终签字。

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
```

当前已有 M2 应用代码与静态内容构建链、钟馗、Chinese Underworld Collection 与 Guide 三套 approved/current Hero 生产资产，以及 7 个 M4 noindex review 页面；仍没有外部写接口、public runner/页面/output、托管或部署链路。

### 4.2 内部编辑、构建与发布链

本节描述内部生产门禁，不代表读者看到内容的顺序。

```text
研究问题 -> claim map + 可定位来源
  -> 关键术语与译文双语复核
  -> 英文稿 + Entry/Collection metadata
  -> 英文内容编辑审核
  -> 有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助
  -> 文化 / 权利 / 视觉审核 -> approved manifest
  -> Schema / 关系 / 引用 / 资产校验
  -> noindex review 直达页的 M4-U5 候选预检 -> ready
  -> M5 外部交互边界
  -> M6 6 篇 Entry / 至少 2 个 Collection / 全部资产 -> Project owner published 决定
  -> 真实非空索引与最终页面的 M4-U5 最终关闭
  -> 真实 origin + M4-U4B public build/output verifier
  -> 受保护远端预览
  -> 同一已验证源身份发布
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
- 开发/自动化环境：M2 本地环境已建立并通过固定运行时、冻结安装、格式、lint、Vitest、类型检查与静态构建门禁；M4-U2 后续按一次性授权执行过本地 preview/浏览器评审，但没有可复用的预览或发布环境授权。
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
- 状态：已完成并冻结（工程参考）。2026-08-27，`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、Review Board、3×2 家族探针和字体验收页已经落实；核心三页完成当前工具支持的三档响应式、链接/历史、锚点/焦点回归、Escape、对比/触控目标、无图/灰度、系统 fallback、控制台和本地资源检查。用户明确要求冻结 M1 以结束继续迭代，同时明确表示当前页面风格不是期望结果，因此人工视觉满意度未通过。真实键盘全链、reduced-motion、禁用 JavaScript、真实 200% 缩放、批准字体/慢加载/跨平台 fallback、开发者工具逐字形命中与目标读者测试继续保持未验证并移交首个真实纵切片门禁。

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

- 目标：实现 Home、Explore、Collections、Entry、About/Editorial Method 及相关内容链路。
- 交付：响应式页面、canonical、OG、Sitemap、RSS 与结构化数据。
- 不交付：站内搜索、账号和评论。
- 完成条件：静态构建、故事优先的 Entry 阅读层级、无 JavaScript 阅读、移动、键盘、SEO 和链接测试通过。首个真实 Home、Collection、Entry 先在 noindex 直达页通过 U5 候选预检；M6 完整 published inventory 形成后，再在真实非空索引与最终页面上通过 `../DESIGN.md` 第 12 节、`../COMPETITIVE_AUDIT.md` 第 6.3 节、正式字体/慢加载/跨平台 fallback/真实 200% 和用户人工视觉确认，才关闭完整 U5。未通过时先重构共享表现层，再批量制作页面和插画。
- 状态：M4-U1、M4-U2、M4-U3 与 M4-U4A 已完成；后续编辑/视觉候选已获阶段性接受，Collection 与 Guide Hero 的权利、五审、exact-canvas、approved/current 资产链及静态接线已经闭合，英文正式字体本地候选已形成。public 页面/output 接线、字体页面批准、CJK、U5 候选预检与最终关闭仍待后续。详细合同见 [`003-pages-exploration-seo.md`](003-pages-exploration-seo.md) 与 [`004-first-vertical-slice-candidate.md`](004-first-vertical-slice-candidate.md)。

### M5 外部交互边界

- 目标：接入经确认的全站 Footer newsletter、文章末尾 reader request 与最小分析。
- 交付：同意文本、adapter、Mock 测试、失败状态与隐私说明。
- 不交付：用户画像、公开投稿和支付。
- 完成条件：只传合同字段；真实联调经单独授权并有回查证据。
- 状态：未开始。

### M6 首发内容与预览验收

- 目标：完成 6 篇 Entry、至少 2 个 Collection 和全部视觉内容包，在完整本地 inventory 上形成可验证的 public 候选，再按独立授权进入远端预览。
- 交付：完整本地 inventory、Project owner 的逐项 `published` 决定、最终 U5 与 U4B 本地 verification receipt，以及后续受保护的预览环境候选版本。
- 完成条件：claim/source、术语/译文、英文、文化、图片、移动、无障碍、性能和链接验收通过；真实非空索引上的最终 U5 与 U4B public output verifier 通过。U4B receipt 记录 source revision、dirty flag、lock/source digest、public intent 与 verifier 结果，dirty source 一律 nondeployable；M6 远端预览才把 clean committed source、receipt/verifier 与 deployment target 绑定为 `validated_source_identity`。
- 状态：未开始。

### M7 生产发布与基线

- 目标：在用户独立授权后发布已验收身份，并建立只读发布后检查。
- 不交付：商业化与下一阶段功能。
- 完成条件：目标身份一致，域名和核心页面可用，无新增阻塞错误；更新本需求最终状态。
- 状态：未开始。

## 9. 测试与验收矩阵

| 层级 | 场景 | 期望结果 | 当前结果 |
| --- | --- | --- | --- |
| 文档 | 文件清单、占位符、UTF-8、相对链接、阶段边界 | 治理/产品/需求文档与 2 份 Entry Markdown 存在，无原模板占位符，编码有效，链接存在，且未误建范围外实现项 | 通过（2026-08-29） |
| 竞品 | 直接竞品/相邻标杆、桌面/移动证据、采用/不采用决策 | 观察与项目评估分开；每项设计决策能指出借鉴来源或原创理由 | 首轮 10 个内容/编辑站点加 Black Myth 台账保留；M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 第二轮结论已落实到 Review Board 的目标/落点/转译/不采用证据。截图为仓库外临时材料；目标读者差异化与可信度测试未执行，移交 M4 |
| 视觉家族 | 六个 Collection Hero、中性 Home、统一 Article、无图与灰度 | 同一现代品牌、不同主题展厅；Collection 只覆盖批准 token/资产/动效；文章阅读系统固定 | 中性 Home、中国阴间 Collection、钟馗 Entry 与 3×2 家族探针已作为工程参考冻结；无图/灰度和 realm token 静态/浏览器检查有证据。M3 钟馗五项 current 用途已通过资产级终审；Hero v1 手部缺陷被 v2 定向返修。Chinese Underworld Collection Hero 与 Guide Hero 已分别完成权利确认、五项人工审核、exact-canvas、approved/current manifest 与所属内容绑定；英文正式字体已接线但 M4-U5 完整视觉验收仍待后续 |
| 表现层替换 | 内容快照 + 中性调试样式或替换候选预览 | UI 重构不改内容文件、稳定 ID、证据关系、slug、canonical、语义阅读顺序与静态输出 | M4-U2 已一次性替换 DebugLayout，内容、稳定 ID、slug、关系、Schema 和 manifest 未改；当前 production shell 仍是 noindex review 候选 |
| 字体 | 英文、中文、拼音、困难字形、fallback、慢加载、200% 缩放 | 无缺字/伪字体/裁切；阅读舒适；CLS 在后续预算内 | 4 份自托管英文 WOFF2 已经 alias/token 接线并通过 hash、CSS、preload 与静态输出门禁；当前浏览器证据仍只覆盖 Windows system fallback。正式字体页面、慢加载、macOS/iOS/Android fallback、实际命中字形和真实 200% 未验证；CJK 工具/字符表仍阻断 |
| 内容 | Schema、枚举、ID、slug | 所有已发布对象合法且唯一 | M2 严格 Schema、文件/loader/记录 ID、全局稳定 ID 与 Entry/Collection slug 唯一性正反测试通过；当前两个 Entry 与一个 Collection 的编辑形态已获阶段性接受，仍保持 `editorial-review`，published inventory 为 0 |
| 证据与翻译 | claim evidence context、locator、Source 类型/证据角色、确定性、最早证据精确绑定、术语语境和审核状态 | 不支持的主张不能发布；现代/参考材料不能单独把传统事实判真；关键术语不是全站固定一对一翻译 | 两篇 Entry 的正文、Source 与 Claim 已形成完整编辑候选；两份 Terminology 仍为 `source-checked`，未有具名 bilingual approval。四条馆藏中文字段已回到馆方页面复核，但尚无具名双语 script-locale 结论，故保持 generic `titleZhLang: zh`；内容图阻断其进入 ready lineage |
| 关系 | source/entry/collection/asset 引用 | 无悬空引用；`Collection.entryIds` 是成员关系唯一来源，反向入口构建期派生；Collection—Entry 状态满足合同矩阵，`featuredEntryId` 同时存在于 `entryIds` 并通过相同状态校验 | 内容关系与 visual brief/manifest/production record/文件/Entry/Collection Hero 双向外键、slot/current resolver 正反测试均通过；钟馗与 Guide 两篇 `editorial-review` Entry 及 Chinese Underworld `editorial-review` Collection 分别解析自己的 approved/current Hero |
| 构建 | 静态生成、图片、Sitemap、RSS | 命令成功且输出完整 | 最近 `astro check` 67 文件零诊断并生成精确 7 页 noindex review HTML、42 个 Hero 页面图片与 4 个 hash-verified WOFF2；纯 Sitemap/RSS fixture 通过，但 route/public artifact 尚未接线。非默认视觉链的 11 个 local master 与 50 个响应式目标已实际生成并解码复核 |
| 页面 | Home/Collection/Entry | 390/768/1440px 无阻塞布局问题；Home 中性、Collection 主题独立、Entry 阅读统一 | 当前 7 页已在 390×844、768×900 与 1440×900 实际浏览器回归，无横向溢出或控制台错误/警告；该证据使用 system fallback。英文正式字体已经接线但尚未浏览器复核，M4-U5 最终视觉仍待后续 |
| 阅读层级 | Entry 故事入口、术语首见、主张来源、完整 Sources、Related/Request、Footer | 故事与 Quick Answer 在前；术语自然解释、出处贴近主张；完整 Sources 后才继续探索；newsletter 仅在 Footer | 钟馗与 Underworld Guide 均已形成完整正文候选并渲染 opening、summary、Quick Answer、章节、可见 byline/fact-check 与完整 Source（分别 6/3 份）；Related/Request 仍属后续页面/交互范围 |
| 无障碍 | 键盘、focus、对比、语义、reduced motion | WCAG 2.2 AA 无阻塞问题；项目目标满足 | U2 静态代码包含 skip link、语义标题、manifest alt/caption/disclosure、2px focus、44px 目标和 reduced-motion 路径；实际视口已复核，真实键盘全链、缩放、媒体偏好、字体与对比仍未验证 |
| 渐进增强 | 禁用 JavaScript/第三方失败 | 正文、来源和核心导航仍可用 | U2 构建产物和实际浏览器均为零客户端 JavaScript，原生 details 移动导航、Sources 和核心链接默认可见；浏览器禁用 JavaScript 与图片失败仍未单独模拟 |
| 集成 | Footer newsletter/feedback Mock 与真实联调 | 全站只有一处订阅入口；合同字段、明确成功/失败、无密钥泄露 | 未实现 |
| 性能 | LCP hero、图片尺寸、客户端 JS | 达到后续确认的预算，无明显布局跳动 | 当前钟馗、Collection 与 Guide Hero 均有明确尺寸、eager/high priority、独立 mobile/desktop art direction，默认 review build 精确输出 42 个限宽 AVIF/WebP，客户端 JS 为零；真实 LCP/CLS 未测 |

M2 的真实本地命令与执行证据已写入 `../../DEV_WORKFLOW.md`；M5/M6/M7 的真实联调、远端预览与生产发布命令仍须在对应里程碑开始前补齐，本需求不复制假设命令。

## 10. 环境、数据与授权

| 动作 | 环境 | 影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- | --- |
| 本轮文档整理 | 本地文档工作区 | 修改既有项目 Markdown | 用户已明确授权 | 已执行并完成文档验证 |
| 本地 Git 初始化与用户基线 | 当前项目根 `F:\codex-project\mythic-china` | 代理在初始化会话只执行 plain `git init`；用户随后建立 `main`、提交与 `origin` | 用户分别确认初始化与其自行 Git 操作；来源复核提交另由 Project owner 明确授权 | M2 历史基线为 `f258227`，M3 为 `c606f5`，M4-U1/U2 为 `5f327b6`，U2 主体历史基线为 `8c6d12`，M4-U3 为 `e94eaca`，首个纵切片 release-readiness 为 `eb6e20c`；后续具名本地检查点包括 `a3194d0` 与来源复核 `d60691a`。未 fetch 或 push，精确 HEAD、工作树与 tracking ref 以执行前只读核查为准 |
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
| Chinese Underworld Collection Hero 生产闭环 | 当前项目 Git-ignored master、repository source、production record、manifest、Collection 外键、图片 registry、验证脚本、测试与文档 | 将已选 desktop 02/mobile 01 高保真重建为精确画布资产；登记个人账户权利事实、五审、公开文案与 approved/current 绑定 | Project owner 已确认四项账户与权利事实、建议权利记录、五项审核及四段公开文案 | 已完成；Collection 保持 `editorial-review`，九个 local master、五份 current responsive rendition、36 个响应式目标和 7 页/28 图 review build 通过；未安装依赖、启动服务、写 Git、部署或发布 |
| Chinese Underworld Guide Hero 生产闭环 | 当前项目 Git-ignored master、repository source、production record、manifest、Guide Entry 外键、图片 registry、验证脚本、测试与文档 | 将已选 desktop A2 与独立构图、定向修正的 mobile 候选转为精确画布资产；登记本 Guide 的账户/权利事实、五审、公开文案与 approved/current 绑定 | Project owner 已批准最终组合，并确认本 Guide 的四项账户与权利事实、权利记录、五项审核及四段公开文案 | 已完成；Guide 保持 `editorial-review`，总 inventory 为 11 个 local master、七份 current responsive rendition、50 个响应式目标和 7 页/42 图 review build；未安装依赖、启动服务、写 Git、部署或发布 |
| M1 临时 Express 预览/浏览器测试 | 当前本地工作区；仅 `127.0.0.1:4173` | 系统临时目录安装 Express；短时改变本地进程状态；不写项目运行时 | 执行前说明影响 | 2026-08-27 本次已授权并执行；浏览器检查完成后服务已停止，端口不可达，项目未产生运行时依赖文件 |
| 外部表单、邮件、分析真实联调 | 未来测试环境 | 发送数据/改变第三方状态 | 单独授权 | 未授权 |
| 预览部署 | 未来预览环境 | 远端构建与可访问 URL | 单独授权或已定义流水线 | 未授权 |
| 生产发布 | 未来生产环境 | 公网发布 | 独立明确授权 | 未授权 |

## 11. 发布与门禁

Vercel 已被选为未来静态托管目标，但项目、origin、预览与生产环境尚未建立。

M6 远端预览前必须：

- 在 `../../DEV_WORKFLOW.md` 写入真实的项目关联、源身份、受保护预览、撤销与回滚命令；不得上传 review `dist/`。
- U4B 先生成本地 verification receipt；receipt 必须记录 source revision、dirty flag、lock/source digest、public intent 与 verifier 结果，dirty source 一律 nondeployable。
- M6 只把 clean committed source、receipt/verifier、完整候选身份与具体预览 deployment target 绑定为 `validated_source_identity`；若复用不可变制品，还须记录完整 artifact inventory/digest。
- 验收预览保护、访问范围、目标地区表现、成本和退出路径。
- 获得远端预览独立授权。

M7 生产发布前必须：

- 确保生产候选与已验收预览身份一致；若内容、状态、模板、资产、样式或配置变化，重跑受影响门禁。
- 将 newsletter、feedback、analytics 的生产配置分别验收。
- 写入并验证生产、只读发布后检查与回滚命令。
- 获得生产发布独立授权。

## 12. 当前完成记录

- 结果：M1 工程参考、M2/M3 基线及 M4-U1/U2/U3 均已收口；M4-U4A public SEO 纯基础设施、2026-08-31 机器门禁加固、Chinese Underworld Collection Hero 与 Guide Hero 生产闭环也已完成本地实施与验证。M4-U4A 的实现、正反门禁和精确未执行项以 [`003-pages-exploration-seo.md` 的 12.4 节](003-pages-exploration-seo.md#124-m4-u4a) 为准，命令与运行证据以 `../../DEV_WORKFLOW.md` 为准。
- 未完成/风险：真实 public origin、published 内容、public runner/Layout/页面/endpoint、M4-U5 预检/最终关闭、M4-U4B output verifier、Vercel 项目与部署均未建立。两篇完整编辑候选仍需双语术语、Source 标题 locale 与 Project owner 状态审核；正式字体浏览器效果和 CJK 也未闭合。
- 版本身份：M4-U3 历史基线为 `e94eacaad989652c7f71ae50276652cc3f54997a`（`updatee`），首个纵切片 release-readiness 基线为 `eb6e20c7c2ae5eda895e5a70f547140163877456`；Guide Hero/本地化改动后续进入本地检查点 `a3194d0d59b605cf7a5fcfc5d2d55166c374e13b`，馆藏中文字段来源复核形成 `d60691a`。未执行 fetch、push 或发布；精确 HEAD、工作树与 tracking ref 以执行前只读核查为准。

## 13. 当前最终结论

- 需求状态：草拟；M1 工程冻结决策、设计体系、A 主 C 辅的 Home 概念方向、首个 Collection、钟馗 Featured Entry、M2 技术/内容合同、M4 第 1–9 项，以及 M4-U4A 的未来 Vercel 托管方向、公共身份与 text-only OG 已确认；后置事项按对应单元再确认。
- 实施状态：M1 已完成并冻结为工程参考基线；M2 已完成并由用户提交；M3-U1 至 U5、M4-U1/U2/U3、M4-U4A、首个纵切片本地候选、2026-08-31 机器门禁加固、Collection Hero 与 Guide Hero 生产闭环已完成；M4-U5 预检/最终关闭与 M4-U4B 未开始。
- 验证状态：M3 历史工程门禁与 22 个响应式输出证据保留；当前非默认视觉门禁通过 11 个 local master、七份 current responsive rendition 与 50 个实际生成/解码目标。最新默认门禁通过 20 个测试文件/196 项测试、Astro 67 文件零诊断、7 页 noindex 静态输出、42 个 Hero 页面图片、4 个 WOFF2、纯 SEO/artifact fixture 与 review 子资源负例。7 页三档 system fallback 浏览器复核已完成并停止服务；Collection/Guide 成图后的真实 public output、键盘、正式字体浏览器效果和 M4-U5 仍未验证。
- 发布状态：未发布。
- 已满足：项目范围、M2 目标架构与内容合同、引用/资产边界、实施拆分，以及“中国神话传说博物馆 + A 主 C 辅 Home 概念方向 + 中国阴间 + 钟馗 Entry”的工程参考与表现层替换边界已形成；未来商业化只保留隔离出口，不进入 M2 实现。
- 尚未满足：首个真实 Home、Collection 与 Entry 通过 `DESIGN.md` 第 12 节完整 M4-U5 浏览器验收、英文字体页面/CJK/最终页面级人工视觉批准；真实 origin、published 内容、public 页面/output、Vercel 项目与部署等后续门禁。本期未使用 ComfyUI，因此按 M3 合同不需要 workflow/model registry。
- Collection desktop 02/mobile 01 与 Guide desktop A2/独立 mobile 已分别完成权利确认、五类审核、exact-canvas、approved/current 资产链和所属内容绑定；下一人工/授权检查点为双语语言门禁、正式字体页面与 noindex U5 候选预检。这些闭环不自动授权内容状态提升、后续服务/浏览器、Git 写入或 Vercel 操作。M6 完成 6 篇 Entry / 至少 2 个 Collection inventory 与人工 `published` 决定后，在真实非空索引最终关闭 U5；真实 origin 与最终门禁满足后才进入 U4B。
- 是否可以关闭需求：否。
