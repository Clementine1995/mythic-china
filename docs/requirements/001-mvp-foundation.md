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
| 需求状态 | 草拟；M1 工程冻结、M2 技术/内容决策与本地实施已完成 | “中国神话传说博物馆”三层体系、首个 `The Chinese Underworld / 中国阴间` Collection、钟馗 Featured Entry 与 M2 静态内容核心已确认并实现；公开品牌、托管、第二个 Collection 和审核责任按后续门禁分别确认 |
| 实施状态 | M1 已冻结为工程参考基线；M2 已在当前仓库根完成 | 已建立固定运行时门禁、Astro 7 静态应用、Content Layer、Schema、内容图校验、两个 draft Entry、一个 draft Collection 与三条静态调试路由；M3 资产与 M4 生产页面未开始 |
| 验证状态 | M1 工程/结构证据保留；M2 全量工程门禁已通过；生产视觉与浏览器验收未执行 | M2 固定 Node/pnpm、冻结安装、格式、lint、41 项 Vitest、`astro check` 与 3 页静态 build 均通过。M1 旧页面视觉仍未通过；A 主、C 辅只是 Home 概念方向。真实 Tab/Shift+Tab/Enter、reduced-motion、禁用 JavaScript、真实 200% 缩放、正式字体/慢加载/跨平台 fallback、目标读者测试仍移交 M4 |
| 发布状态 | 未发布 | 未创建托管项目、域名或发布配置 |

- 当前权威结论更新时间：2026-08-28。
- 当前实现基线：`F:\codex-project\mythic-china` 内的冻结 M1 原型与已完成的 M2 静态应用；用户已建立本地 `main` 与 `origin` 跟踪关系，M2 工作区变更尚未由代理执行任何 Git 写操作。

## 1. 结论与开发就绪判断

### 1.1 一句话结论

先交付一个英语优先、静态生成、视觉驱动且来源清楚的 6 篇内容 MVP；栏目、反馈和商业化通过稳定内容 ID 与后续独立需求的隔离边界保留演进路径，不提前建设 adapter 或平台。

### 1.2 开发就绪

- 是否可以立即执行开发：M2 已按用户授权完成本地实施与验证；这不自动授权 M3、M4、dev/preview 服务、Git 写入、远端预览或发布。
- M2 执行记录：按 `../ARCHITECTURE.md` 与 `../../DEV_WORKFLOW.md` 使用固定 Node 绝对路径和 pnpm `11.22.0`，在当前非空仓库根完成手工最小初始化与冻结依赖安装。M1 冻结只为 M2 提供语义、结构和替换边界；首个真实 Home 可以 A 主、C 辅作为实现目标，但不得整份移植旧原型或候选方向稿，也不得把 Home 概念选择自动扩展为 Collection、Entry 或共享表现层批准。正式字体、跨平台加载、真实 200%、目标读者比较测试和首个真实纵切片的页面级人工确认仍是进入批量页面/插画制作前的门禁。
- 不阻塞 M2 的后置决策：公开品牌/域名在首次公开预览或发布前确认；托管候选在首次远端预览前确认；第二个 Collection 在 M6 前确认；英文编辑、研究和图片文化审核责任人在内容进入 `ready` 前确认。
- 下一项允许动作：用户先审阅 M2 本地结果并决定版本控制动作；之后只有用户明确开始相应里程碑，才进入 M3 资产管线或 M4 首个真实纵切片。首个真实 Home 按 A 主、C 辅实现，Collection 与 Entry 的延展另行设计，三页完成页面级人工视觉确认后才能进入批量制作。

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
- M2 不选择托管。Vercel 与 Cloudflare 只是首次远端预览前的候选，二者都尚未创建项目。

待验证假设：

- 英语优先、单人配合 AI 维护和指标阈值仍需通过真实读者验证；首批 6 篇的逐篇研究可行性和最终公开阅读顺序尚未验证。第二个 MVP Collection 尚未确认。

未验证风险：

- 公开品牌名和域名可用性尚未核查。
- 首批英文文案、SEO 主题和新视觉执行尚未经过目标读者测试；方向已确认不等于原型效果已验证。
- 首批选题的可靠原典定位、学术解释与关键术语译法尚未逐篇完成审核；`Meng Po`、`Black and White Impermanence` 等晚期/地方复合传统尤其不能先写结论再补证据。
- ComfyUI 当前模型、LoRA、字体和参考素材的商业许可证尚未登记。
- 邮件、分析、反馈和托管服务尚未选择，其隐私与地区要求未知。

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
9. 商业化只保留供应商中立的未来边界；M2 不创建商业字段、组件、adapter、事件或服务。托管也延后到首次远端预览前选择。

仍待确认：

1. 是否批准 `Mythic China` 作为当前工作品牌，并允许后续在域名/商标核查后调整公开名。
2. 首次远端预览使用哪一静态托管服务、账户归属、发布授权和退出路径。
3. 第二个 MVP Collection 是从现有候选中选择，还是把“至少 2 个合集页”调整为一个完整 Collection 加一个候选预览页。
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
- 至少 6 篇首发内容与 2 个合集页达到 `published` 门禁。
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
- 至少 6 篇经 M1 确认的首发主题内容与静态视觉内容包；生产优先级先验证钟馗，公开阅读顺序由研究结果决定。
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
```

当前已有 M2 应用代码与静态内容构建链；没有外部写接口、生产资产、托管或部署链路。

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
  -> Astro 静态构建与响应式图片
  -> 页面呈现 / 响应式裁切 / 移动端 / 无障碍 QA
  -> 同一源身份发布
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
- 开发/自动化环境：M2 本地环境已建立并通过固定运行时、冻结安装、格式、lint、Vitest、类型检查与静态构建门禁；没有运行中的 dev/preview 服务。
- 真实联调环境：尚未建立。
- 发布目标：尚未建立。

## 5. 最终业务合同

### 5.1 核心对象

- `Entry`：人物、异兽、地点、故事或指南，一篇/一对象为最小发布粒度。
- `Collection`：有编辑顺序的主题阅读路径。
- `Source`：原典、译本、研究、官方页面或现代改编的标准化来源。
- `Claim`：可发布主张与具体证据、locator、证明范围及确定性的关联记录。
- `TerminologyRecord`：关键中文概念在具体文本语境中的汉字、拼音、英文选择、弃用译法与审核记录。
- `AssetManifest`：一张 approved master 与其公开导出物的权威追溯记录。
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
- 状态：已完成本地实施与验证。固定 `D:\Program Files\nvm\v24.16.0\node.exe`、pnpm `11.22.0`、唯一锁文件、Content Layer、Schema、纯内容图校验、41 项 Vitest 与 3 页静态 build 均已核验；未启动服务，未执行 Git 写入、远端预览或发布。

### M3 视觉资产管线

- 目标：建立工具无关的视觉 brief、asset manifest 和 Web 导出规则；仅在实际采用 ComfyUI 时维护最少 workflow 与 model registry。
- 交付：一个人物/场景的桌面 hero、移动 hero、article lead、OG 和社媒导出样例。
- 不交付：为每个角色训练 LoRA。
- 完成条件：样例能从公开文件追到 manifest、视觉来源主张、权利与审核记录；使用生成工具时再追到 workflow 和模型。
- 状态：未开始。

### M4 页面、探索与 SEO

- 目标：实现 Home、Explore、Collections、Entry、About/Editorial Method 及相关内容链路。
- 交付：响应式页面、canonical、OG、Sitemap、RSS 与结构化数据。
- 不交付：站内搜索、账号和评论。
- 完成条件：静态构建、故事优先的 Entry 阅读层级、无 JavaScript 阅读、移动、键盘、SEO 和链接测试通过。首个真实 Home、Collection、Entry 纵切片须再次通过 `../DESIGN.md` 第 12 节、`../COMPETITIVE_AUDIT.md` 第 6.3 节、正式字体/慢加载/跨平台 fallback/真实 200% 和用户人工视觉确认；未通过时先重构共享表现层，再批量制作页面和插画。
- 状态：未开始。

### M5 外部交互边界

- 目标：接入经确认的全站 Footer newsletter、文章末尾 reader request 与最小分析。
- 交付：同意文本、adapter、Mock 测试、失败状态与隐私说明。
- 不交付：用户画像、公开投稿和支付。
- 完成条件：只传合同字段；真实联调经单独授权并有回查证据。
- 状态：未开始。

### M6 首发内容与预览验收

- 目标：完成 6 篇内容、至少 2 个合集页和全部视觉内容包。
- 交付：预览环境候选版本。
- 完成条件：claim/source、术语/译文、英文、文化、图片、移动、无障碍、性能和链接验收通过，并记录同一源身份。
- 状态：未开始。

### M7 生产发布与基线

- 目标：在用户独立授权后发布已验收身份，并建立只读发布后检查。
- 不交付：商业化与下一阶段功能。
- 完成条件：目标身份一致，域名和核心页面可用，无新增阻塞错误；更新本需求最终状态。
- 状态：未开始。

## 9. 测试与验收矩阵

| 层级 | 场景 | 期望结果 | 当前结果 |
| --- | --- | --- | --- |
| 文档 | 文件清单、占位符、UTF-8、相对链接、阶段边界 | 15 份治理/产品文档与 2 份 M2 Entry Markdown 存在，无原模板占位符，编码有效，链接存在，且未误建范围外实现项 | 通过（2026-08-27） |
| 竞品 | 直接竞品/相邻标杆、桌面/移动证据、采用/不采用决策 | 观察与项目评估分开；每项设计决策能指出借鉴来源或原创理由 | 首轮 10 个内容/编辑站点加 Black Myth 台账保留；M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 第二轮结论已落实到 Review Board 的目标/落点/转译/不采用证据。截图为仓库外临时材料；目标读者差异化与可信度测试未执行，移交 M4 |
| 视觉家族 | 六个 Collection Hero、中性 Home、统一 Article、无图与灰度 | 同一现代品牌、不同主题展厅；Collection 只覆盖批准 token/资产/动效；文章阅读系统固定 | 中性 Home、中国阴间 Collection、钟馗 Entry 与 3×2 家族探针已作为工程参考冻结；无图/灰度和 realm token 静态/浏览器检查有证据。旧原型外观仍未获批准；用户后续确认 A 主、C 辅的 Home 概念方向，真实页面、生产资产与完整视觉验收仍未执行 |
| 表现层替换 | 内容快照 + 中性调试样式或替换候选预览 | UI 重构不改内容文件、稳定 ID、证据关系、slug、canonical、语义阅读顺序与静态输出 | M2 以独立内容层、语义模板和无生产资产的中性调试样式落实替换缝；生产表现层仍属 M4 |
| 字体 | 英文、中文、拼音、困难字形、fallback、慢加载、200% 缩放 | 无缺字/伪字体/裁切；阅读舒适；CLS 在后续预算内 | 独立样张、字符覆盖、112/72/48px、当前 Windows system fallback 和等效窄视口检查已执行；批准自托管字体、慢加载、macOS/iOS/Android fallback、实际命中字形和真实 200% 未验证，移交首个真实纵切片门禁 |
| 内容 | Schema、枚举、ID、slug | 所有已发布对象合法且唯一 | M2 严格 Schema、文件/loader/记录 ID、全局稳定 ID 与 Entry/Collection slug 唯一性正反测试通过；当前 demo 均为 draft |
| 证据与翻译 | claim evidence context、locator、Source 类型/证据角色、确定性、最早证据精确绑定、术语语境和审核状态 | 不支持的主张不能发布；现代/参考材料不能单独把传统事实判真；关键术语不是全站固定一对一翻译 | M2 Claim certainty/sourceLinks/`evidenceContext`、Source type/role/网页/权利字段、Entry earliest Claim/Source 成对绑定与 Terminology `reviewStatus` 门禁正反测试通过；尚未创建钟馗生产证据记录或正式内容 |
| 关系 | source/entry/collection/asset 引用 | 无悬空引用；`Collection.entryIds` 是成员关系唯一来源，反向入口构建期派生；Collection—Entry 状态满足合同矩阵，`featuredEntryId` 同时存在于 `entryIds` 并通过相同状态校验 | M2 对 Source/Entry/Collection/Claim/Terminology 外键、归属、状态矩阵、Featured、related 与确定排序的正反测试通过；M3 Asset Manifest 不在本批验证范围 |
| 构建 | 静态生成、图片、Sitemap、RSS | 命令成功且输出完整 | M2 `astro check` 与静态 build 通过并生成 3 条调试页面；生产图片、Sitemap 与 RSS 属 M3/M4，未实现 |
| 页面 | Home/Collection/Entry | 390/768/1440px 无阻塞布局问题；Home 中性、Collection 主题独立、Entry 阅读统一 | 当前三页在 2026-08-27 单一桌面浏览器通过三档布局/裁切/溢出、链接、浏览历史、锚点、导航和本地资源检查；用户视觉满意度未通过，当前外观只作工程参考 |
| 阅读层级 | Entry 故事入口、术语首见、主张来源、完整 Sources、Related/Request、Footer | 故事与 Quick Answer 在前；术语自然解释、出处贴近主张；完整 Sources 后才继续探索；newsletter 仅在 Footer | 钟馗 Entry 已展示 Quick Answer、传统材料/后世版本/本站解释/现代改编分层，以及 Sources → Related → Reader Request → Footer 顺序；真实文化内容、术语与生产页面仍须后续正式审核 |
| 无障碍 | 键盘、focus、对比、语义、reduced motion | WCAG 2.2 AA 无阻塞问题；项目目标满足 | ID/标签/ARIA、图片 alt、焦点样式、44px 目标、对比和 reduced-motion 代码路径通过静态/浏览器检查；锚点、焦点回归和 Escape 通过。当前工具不能可靠完成真实 Tab/Shift+Tab/Enter 全链或模拟 reduced motion，继续保持未验证并移交真实纵切片 |
| 渐进增强 | 禁用 JavaScript/第三方失败 | 正文、来源和核心导航仍可用 | Quick Answer、正文与 Sources 默认可见且不依赖脚本 reveal，原型表单不调用真实写接口；禁用 JavaScript 的真实浏览器验收未执行，移交真实纵切片 |
| 集成 | Footer newsletter/feedback Mock 与真实联调 | 全站只有一处订阅入口；合同字段、明确成功/失败、无密钥泄露 | 未实现 |
| 性能 | LCP hero、图片尺寸、客户端 JS | 达到后续确认的预算，无明显布局跳动 | 未实现 |

M2 的真实本地命令与执行证据已写入 `../../DEV_WORKFLOW.md`；M5/M7 的真实联调与发布命令仍须在对应里程碑开始前补齐，本需求不复制假设命令。

## 10. 环境、数据与授权

| 动作 | 环境 | 影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- | --- |
| 本轮文档整理 | 本地文档工作区 | 修改既有项目 Markdown | 用户已明确授权 | 已执行并完成文档验证 |
| 本地 Git 初始化 | 当前项目根 `F:\codex-project\mythic-china` | 代理只执行 plain `git init`；用户随后自行创建 initial commit、改用 `main` 并配置 `origin` | 用户分别确认初始化与其自行 Git 操作 | 当前为 `main...origin/main`；后续 M1 基线提交命令见 `../../DEV_WORKFLOW.md`，代理未执行 add/commit/push |
| M2 pnpm、依赖安装与应用初始化 | 当前项目根及本地开发环境 | 固定使用已验证的 `D:\Program Files\nvm\v24.16.0\node.exe`；提供 pnpm `11.22.0`，新增依赖目录、唯一锁文件、配置、源码和测试 | 用户已明确开始 M2，并单独确认固定 Node、pnpm、依赖与原地初始化授权 | 已执行并通过冻结安装与全量门禁；未启动服务，未执行 Git 写入或发布 |
| M1 临时 Express 预览/浏览器测试 | 当前本地工作区；仅 `127.0.0.1:4173` | 系统临时目录安装 Express；短时改变本地进程状态；不写项目运行时 | 执行前说明影响 | 2026-08-27 本次已授权并执行；浏览器检查完成后服务已停止，端口不可达，项目未产生运行时依赖文件 |
| 外部表单、邮件、分析真实联调 | 未来测试环境 | 发送数据/改变第三方状态 | 单独授权 | 未授权 |
| 预览部署 | 未来预览环境 | 远端构建与可访问 URL | 单独授权或已定义流水线 | 未授权 |
| 生产发布 | 未来生产环境 | 公网发布 | 独立明确授权 | 未授权 |

## 11. 发布与门禁

当前不适用。托管和发布环境尚未建立。M7 开始前必须：

- 在 `../../DEV_WORKFLOW.md` 写入真实的源身份、预览和生产门禁。
- 记录 `validated_source_identity` 与预览验收身份。
- 确保生产候选与已验收身份一致。
- 将 newsletter、feedback、analytics 的生产配置分别验收。
- 获得生产发布独立授权。

## 12. 当前完成记录

- 结果：M1 工程参考基线已冻结；M2 工程与内容合同已在当前仓库根完成本地实施和验证。生产页面仍未批准，M3 资产与 M4 页面没有因 M2 完成而自动开始。
- 已完成：M1 既有治理/原型材料；M2 固定运行时、Astro 7 静态工程、唯一锁文件、五类 Content Layer Schema、纯内容图校验、两个真实 draft Entry、一个 draft Collection、两类动态静态路由与中性调试模板。
- 已验证：M1 既有工程/结构证据继续保留；M2 冻结依赖重装复现且 package/lock/workspace 哈希不变，2026-08-28 审计修复后的格式、lint、41 项 Vitest、`astro check`（0 error、0 warning、0 hint）与 3 页静态 build 通过。用户冻结 M1 是停止旧原型迭代的范围决定，不表示当前视觉通过。
- 未执行：dev/preview 服务、浏览器自动化、生产 Asset Manifest/图片、A 主 C 辅生产视觉、正式内容审核、外部联调、Git 写操作和发布。真实键盘全链、reduced-motion、禁用 JavaScript、真实 200% 缩放、批准字体/慢加载/跨平台 fallback、实际字形命中和目标读者测试仍移交 M4。
- 剩余风险：公开 PATH 的 Node.js 16 不满足 Astro 7 基线，因此所有命令必须持续把 `D:\Program Files\nvm\v24.16.0` 置于进程 PATH 首位并通过运行时守卫；当前 Source/Claim/Terminology 为空是 draft demo 的有意边界。旧原型和仓库外方向稿都不能作为生产批准稿；首个真实 Home、Collection 与 Entry 仍须分别设计和确认。公开品牌/域名、托管、第二个 Collection、审核责任人、钟馗正式 claim/source/术语与生产图片权利/文化审核按后续门禁分别待确认。
- 版本身份：用户已建立本地 `main` 与 `origin/main` 跟踪关系；M2 工作区尚未提交，代理未执行 `git add`、commit、push 或发布。

## 13. 当前最终结论

- 需求状态：草拟；M1 工程冻结决策、设计体系、A 主 C 辅的 Home 概念方向、首个 Collection、钟馗 Featured Entry 与 M2 技术/内容合同已确认，其余列明事项待确认。
- 实施状态：M1 已完成并冻结为工程参考基线；M2 已完成本地实施，M3 及以后未开始。
- 验证状态：M1 工程/结构证据见第 9 节；M2 固定运行时、冻结安装、格式、lint、单测、类型检查与静态构建通过。旧 M1 页面视觉未通过，A 主、C 辅的 Home 概念方向已确认，但真实纵切片页面尚未批准；列明的 M4 人工/环境项目仍未验证。
- 发布状态：未发布。
- 已满足：项目范围、M2 目标架构与内容合同、引用/资产边界、实施拆分，以及“中国神话传说博物馆 + A 主 C 辅 Home 概念方向 + 中国阴间 + 钟馗 Entry”的工程参考与表现层替换边界已形成；未来商业化只保留隔离出口，不进入 M2 实现。
- 尚未满足：首个真实 Home 按 A 主、C 辅实现，Collection 与 Entry 完成具体美术延展设计，三页通过 `DESIGN.md` 第 12 节完整验收、正式字体和页面级人工视觉批准；公开品牌/域名、托管、第二个 Collection、审核责任人等后续门禁。正式内容、生产资产、外部服务和发布均未开始。
- 下一项允许动作：用户审阅 M2 本地结果并决定是否提交；M3/M4 只在用户随后明确开始对应里程碑时执行。
- 是否可以关闭需求：否。
