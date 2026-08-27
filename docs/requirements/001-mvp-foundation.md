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

运行与发布命令：`../../DEV_WORKFLOW.md`。当前尚无应用命令。

### 0.2 独立状态

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | 草拟；M1 工程冻结决策已确认 | “中国神话传说博物馆”三层体系、首个 `The Chinese Underworld / 中国阴间` Collection 与钟馗 Featured Entry 已确认；公开品牌、技术/托管路线、第二个 Collection 和审核责任按后续门禁分别确认 |
| 实施状态 | M1 已完成并冻结为工程参考基线；M2 未开始 | 已有不可发布的中性 Home、中国阴间 Collection、钟馗 Entry、Review Board、3×2 家族探针、字体验收页和 prototype-only 资产；没有应用源码、应用依赖或运行环境 |
| 验证状态 | M1 已执行的工程/结构检查按证据记录；人工视觉满意度未通过 | 核心三页在当前浏览器完成 390/768/1440px、链接/历史、锚点/焦点回归、Escape、对比/触控目标、无图/灰度、系统 fallback、控制台和本地资源检查。用户明确表示当前页面风格不是期望结果；真实 Tab/Shift+Tab/Enter、reduced-motion、禁用 JavaScript、真实 200% 缩放、正式字体/慢加载/跨平台 fallback、目标读者测试仍未验证并移交后续门禁 |
| 发布状态 | 未发布 | 未创建托管项目、域名或发布配置 |

- 当前权威结论更新时间：2026-08-27。
- 当前实现基线：本地文档与冻结的独立 M1 原型工作区 `F:\codex-project\mythic-china`；用户已建立本地 `main`、initial commit 与 `origin`，应用仍未初始化。

## 1. 结论与开发就绪判断

### 1.1 一句话结论

先交付一个英语优先、静态生成、视觉驱动且来源清楚的 6 篇内容 MVP；栏目、反馈和商业化通过稳定内容 ID 与隔离 adapter 保留演进路径，不提前建设平台。

### 1.2 开发就绪

- 是否可以进入开发：否；M1 已冻结，但 M2 技术栈尚未确认，应用初始化、运行时和依赖安装未获单独授权。
- M2 必要前提：确认技术栈、Node.js/包管理器版本、应用目录影响与真实命令，并由用户单独授权。M1 冻结只允许 M2 参考语义/结构/替换边界，不允许把当前页面皮肤当作已批准设计直接移植。人工视觉满意度、正式字体/跨平台加载、真实 200% 和目标读者比较测试是首个真实纵切片进入批量页面/插画制作前的门禁。
- 不阻塞 M2 的后置决策：公开品牌/域名在首次公开预览或发布前确认；托管候选在首次远端预览前确认；第二个 Collection 在 M6 前确认；英文编辑、研究和图片文化审核责任人在内容进入 `ready` 前确认。
- 下一项允许动作：停止本轮收口。只有确认技术栈并获得用户单独授权后才能开始 M2；首次真实纵切片进入批量制作前须重新取得人工视觉批准。

### 1.3 事实、推断与风险

已确认环境事实：

- 用户具备 ComfyUI 等静态生图能力，当前没有视频制作能力；ComfyUI 只作为可选视觉辅助，不承担事实研究。
- 当前工作区已有不可发布的 Home、Collection、Entry 旧视觉原型；其阅读链、真实链接和无障碍骨架仍可参考，但全局纸色、衬线主导、细线版心和印本感不符合新方向。没有应用源码、依赖、服务或部署。

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

设计选择与推荐：

- 当前 M1 采用 `../DESIGN.md` 的“中国神话传说博物馆”：现代中性文化平台负责全站导视，Collection 负责独立主题世界，Entry 负责统一阅读与来源；中国绘画、手卷、印本和文物只在具体题材/来源成立时进入美术方向。M1 冻结的是首个工程参考基线，不是视觉批准或永久品牌冻结。
- Astro + Markdown/MDX + 静态部署仍是内容型 MVP 的推荐技术选择；Next.js 是出现近期会员、个性化、多数动态路由或 React 应用需求时的重评选项，不是已经安装或运行的事实。
- Astro + Vercel 是对新手最省事的 MVP 托管推荐，Cloudflare 为备选；二者都尚未创建项目。

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
4. 当前 M1 原型已完成并冻结为工程参考；只可继承结构、语义、链接、响应式/无障碍骨架与表现层替换边界，当前视觉未获用户批准。

仍待确认：

1. 是否批准 `Mythic China` 作为当前工作品牌，并允许后续在域名/商标核查后调整公开名。
2. 是否批准 Astro 静态核心、Next.js 条件式重评、Vercel 首选/Cloudflare 备选的技术与托管路线。
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

- 读者能从首页/合集进入文章，先通过视觉问题、Quick Answer 和核心故事建立理解，再进入原典、版本与本站解释；完整 Sources 之后才能出现 Related Entries 与 Reader Request。
- 创作者能先建立 claim map 与术语记录，再用固定 Schema 和工具无关的视觉管线生产一个完整内容包；ComfyUI 可用但非必需。
- 读者能无账号推荐下一篇传说，并可选择是否留下邮箱。
- 读者可在全站 Footer 订阅，但不会在每篇末尾遇到重复订阅 CTA。
- 每个外部网站引用和公开图片都能追溯到来源/权利记录。

### 2.4 可观察成功标准

- 中性 Home、`The Chinese Underworld` Collection、`Zhong Kui, the Demon Queller` Entry、Explore、About/Editorial Method 在桌面与移动可用。
- 至少 6 篇首发内容与 2 个合集页达到 `published` 门禁。
- 构建对缺失 source、relation、asset manifest、accessibility mode、alt / 空 alt、适用的 caption 和 disclosure 失败。
- 关键事实主张能追到具体版本/对象与 locator；关键术语首次出现有汉字、规范拼音、语境化英文和双语审核状态。
- Entry 的阅读层级固定为故事入口、Quick Answer、核心故事、原典/版本/解释、完整 Sources、Related Entries、Reader Request；轻量出处随对应主张出现。
- 关闭 JavaScript 后正文、来源和核心导航仍可阅读。
- 无阻塞键盘/无障碍问题；减弱动效模式下内容不延迟或缺失。
- 所有外部引用显示来源名称和链接，网页来源有访问日期。
- 订阅与选题表单只传递合同字段，不在客户端包含密钥。
- 六个 Collection Hero 视觉探针排成 3×2 时像同一现代品牌的不同主题展厅，而不是同一旧纸模板换颜色；只有中国阴间是已确认 Collection，其余五个不建立稳定 ID 或路线承诺。Home 不继承中国阴间暗色主题，隐藏图片后仍可凭字体、栅格、来源与组件识别品牌。
- 中国阴间 Collection 说明其多时期、多地域、多文本和多传统边界；钟馗 Entry 不把他写成阴间统治者或十王之一，并将 Black Myth 等游戏材料限制在明确的现代改编/接受史层。
- 主视觉 brief 标明时期、地域、媒介、文化语境、直接来源、权利、已证实/推断/创作和排除元素，不把跨朝代或跨宗教符号混成泛中国风。
- 字体验收页覆盖英文、简体中文、拼音、困难字形、慢加载、fallback 与 200% 缩放，不出现缺字、裁切或不可接受的布局跳动。

## 3. 范围与边界

### 3.1 本期交付

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
  -> M1 工程参考已冻结；人工视觉满意度未通过；M2 未开始
```

当前没有应用代码、内容构建、外部写接口和部署链路。

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
- 开发/自动化环境：尚未建立。
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
- `Collection.entryIds` 是成员关系与阅读顺序的唯一事实来源；Entry 的反向 Collection 入口在构建期派生，不保存 `collectionIds`。`featuredEntryId` 必须同时存在于同一 Collection 的 `entryIds` 中并通过 `CONTENT_MODEL.md` 第 2.2 节状态矩阵；它只控制当前重点入口，不改变策展阅读顺序、Entry ID、slug 或 canonical URL。realm token 与主题资产不得写入 Collection 内容记录。

### 5.2 身份与唯一性

- `entryId`、`collectionId`、`sourceId`、`claimId`、`termId`、`assetId` 全局稳定且唯一。
- slug 唯一；已发布 slug 修改必须产生明确 redirect 需求。
- 关系和合集只保存稳定 ID，不保存标题字符串作为身份。

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
| 关键主张缺 locator、证据角色或确定性 | 当前 Entry | 保持非 ready；补证据、标为 disputed/provisional 或删除主张 |
| 关键术语缺语境化译法或双语审核 | 当前 Entry | 保持非 ready；不得用固定“妖魔鬼怪”对照表绕过 |
| 已发布视觉资产缺少 accessibility mode、alt / 空 alt、适用的 caption 或 disclosure | 当前构建 | 构建失败，不用默认文本绕过 |
| 图片权利状态未知 | 当前 Entry | 保持非 ready，替换或补齐核查 |
| 现代游戏/影视来源被用于支撑古代、宗教或民俗事实 | 当前 Claim / Entry | 构建前阻断编辑就绪；改为 `modern-adaptation` / `adaptation` 角色或补充匹配的一手/研究来源 |
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

- 目标：按已确认决策初始化 Astro/TypeScript、包管理和内容 Schema。
- 交付：真实 `DEV_WORKFLOW.md` 命令、entries/collections/sources/claims/terminology、ID/关系/引用/术语测试、语义模板与可替换表现层边界，以及两个 demo Entry；不得把独立 HTML 原型整份复制为永久 UI。
- 不交付：批量文章和生产发布。
- 完成条件：干净环境安装后可构建；所有架构红线拥有实际测试入口。
- 状态：未开始。

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
| 文档 | 文件清单、占位符、UTF-8、相对链接、阶段边界 | 15/15 Markdown 文件存在，无原模板占位符，编码有效，链接存在，且未误建实现项 | 通过（2026-08-27） |
| 竞品 | 直接竞品/相邻标杆、桌面/移动证据、采用/不采用决策 | 观察与项目评估分开；每项设计决策能指出借鉴来源或原创理由 | 首轮 10 个内容/编辑站点加 Black Myth 台账保留；M+、Oculi Mundi、Rijksmuseum、Google Arts & Culture 第二轮结论已落实到 Review Board 的目标/落点/转译/不采用证据。截图为仓库外临时材料；目标读者差异化与可信度测试未执行，移交 M4 |
| 视觉家族 | 六个 Collection Hero、中性 Home、统一 Article、无图与灰度 | 同一现代品牌、不同主题展厅；Collection 只覆盖批准 token/资产/动效；文章阅读系统固定 | 中性 Home、中国阴间 Collection、钟馗 Entry 与 3×2 家族探针已作为工程参考冻结；无图/灰度和 realm token 静态/浏览器检查有证据。用户人工视觉满意度未通过，当前外观不得作为生产批准皮肤 |
| 表现层替换 | 内容快照 + 中性调试样式或替换候选预览 | UI 重构不改内容文件、稳定 ID、证据关系、slug、canonical、语义阅读顺序与静态输出 | 合同已记录；代码阶段未实现 |
| 字体 | 英文、中文、拼音、困难字形、fallback、慢加载、200% 缩放 | 无缺字/伪字体/裁切；阅读舒适；CLS 在后续预算内 | 独立样张、字符覆盖、112/72/48px、当前 Windows system fallback 和等效窄视口检查已执行；批准自托管字体、慢加载、macOS/iOS/Android fallback、实际命中字形和真实 200% 未验证，移交首个真实纵切片门禁 |
| 内容 | Schema、枚举、ID、slug | 所有已发布对象合法且唯一 | 未实现 |
| 证据与翻译 | claim locator、证据角色、确定性、术语语境和审核状态 | 不支持的主张不能发布；关键术语不是全站固定一对一翻译 | 未实现 |
| 关系 | source/entry/collection/asset 引用 | 无悬空引用；`Collection.entryIds` 是成员关系唯一来源，反向入口构建期派生；Collection—Entry 状态满足合同矩阵，`featuredEntryId` 同时存在于 `entryIds` 并通过相同状态校验 | 未实现 |
| 构建 | 静态生成、图片、Sitemap、RSS | 命令成功且输出完整 | 未实现 |
| 页面 | Home/Collection/Entry | 390/768/1440px 无阻塞布局问题；Home 中性、Collection 主题独立、Entry 阅读统一 | 当前三页在 2026-08-27 单一桌面浏览器通过三档布局/裁切/溢出、链接、浏览历史、锚点、导航和本地资源检查；用户视觉满意度未通过，当前外观只作工程参考 |
| 阅读层级 | Entry 故事入口、术语首见、主张来源、完整 Sources、Related/Request、Footer | 故事与 Quick Answer 在前；术语自然解释、出处贴近主张；完整 Sources 后才继续探索；newsletter 仅在 Footer | 钟馗 Entry 已展示 Quick Answer、传统材料/后世版本/本站解释/现代改编分层，以及 Sources → Related → Reader Request → Footer 顺序；真实文化内容、术语与生产页面仍须后续正式审核 |
| 无障碍 | 键盘、focus、对比、语义、reduced motion | WCAG 2.2 AA 无阻塞问题；项目目标满足 | ID/标签/ARIA、图片 alt、焦点样式、44px 目标、对比和 reduced-motion 代码路径通过静态/浏览器检查；锚点、焦点回归和 Escape 通过。当前工具不能可靠完成真实 Tab/Shift+Tab/Enter 全链或模拟 reduced motion，继续保持未验证并移交真实纵切片 |
| 渐进增强 | 禁用 JavaScript/第三方失败 | 正文、来源和核心导航仍可用 | Quick Answer、正文与 Sources 默认可见且不依赖脚本 reveal，原型表单不调用真实写接口；禁用 JavaScript 的真实浏览器验收未执行，移交真实纵切片 |
| 集成 | Footer newsletter/feedback Mock 与真实联调 | 全站只有一处订阅入口；合同字段、明确成功/失败、无密钥泄露 | 未实现 |
| 性能 | LCP hero、图片尺寸、客户端 JS | 达到后续确认的预算，无明显布局跳动 | 未实现 |

真实命令必须在 M2/M5/M7 前写入 `../../DEV_WORKFLOW.md`，本需求不复制假设命令。

## 10. 环境、数据与授权

| 动作 | 环境 | 影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- | --- |
| 本轮文档整理 | 本地文档工作区 | 修改既有项目 Markdown | 用户已明确授权 | 已执行并完成文档验证 |
| 本地 Git 初始化 | 当前项目根 `F:\codex-project\mythic-china` | 代理只执行 plain `git init`；用户随后自行创建 initial commit、改用 `main` 并配置 `origin` | 用户分别确认初始化与其自行 Git 操作 | 当前为 `main...origin/main`；后续 M1 基线提交命令见 `../../DEV_WORKFLOW.md`，代理未执行 add/commit/push |
| 依赖安装与应用初始化 | 未来本地开发环境 | 修改依赖目录、锁文件和源码 | 实施前明确授权 | 未授权 |
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

- 结果：M1 工程参考基线已完成并按用户决定冻结；人工视觉满意度未通过；M2 未开始，工程应用实施尚未授权。
- 已完成：治理、产品/架构/设计/内容合同与本需求草案；不可发布的中性 Home、中国阴间 Collection、钟馗 Entry、Review Board、首轮 10+1 台账、四个第二轮系统证据、3×2 家族探针、字体验收页和 prototype-only 资产登记。
- 已验证：5 个原型 HTML 的重复 ID、本地资源/fragment、图片 alt/尺寸、标签/表单/ARIA、JSON-LD、阅读顺序和 JavaScript 语法；核心三页的 Home → Collection → Entry、Sources → Related → Reader Request、移动菜单/目录、390/768/1440px、浏览历史、锚点/焦点回归、Escape、对比/触控目标、无图/灰度、当前 system fallback、控制台和本地资源检查。用户冻结 M1 是停止本轮迭代的范围决定，不表示当前视觉通过。
- 未执行：应用初始化、应用依赖安装、应用测试、外部联调和发布。真实键盘全链、reduced-motion、禁用 JavaScript、真实 200% 缩放、批准字体/慢加载/跨平台 fallback、实际字形命中和目标读者测试仍未验证；临时预览服务已执行并停止，不构成应用运行时。
- 剩余风险：M2 技术栈尚未最终确认；当前页面外观不能作为生产批准稿，首次真实纵切片必须重新取得人工视觉批准。公开品牌/域名、托管、第二个 Collection、审核责任人、钟馗正式 claim/source/术语与生产图片权利/文化审核按后续门禁分别待确认。
- 版本身份：用户已建立本地 `main`、initial commit 与 `origin/main` 跟踪关系；这些操作不是代理执行。M1 收口内容的下一次本地提交由用户按 `../../DEV_WORKFLOW.md` 执行；应用和发布身份仍未建立。

## 13. 当前最终结论

- 需求状态：草拟；M1 工程冻结决策、设计体系、首个 Collection 与钟馗 Featured Entry 已确认，其余列明事项待确认。
- 实施状态：M1 已完成并冻结为工程参考基线；M2 未开始，应用实现未开始。
- 验证状态：已执行的 M1 工程/结构检查见第 9 节；人工视觉满意度未通过，列明的人工/环境项目仍未验证，应用验证未开始。
- 发布状态：未发布。
- 已满足：项目范围、推荐架构、内容/引用/资产合同、实施拆分，以及“中国神话传说博物馆 + 中国阴间 + 钟馗 Entry”的工程参考与表现层替换边界已形成。
- 尚未满足：M2 技术栈确认和用户单独授权；首个真实纵切片的 `DESIGN.md` 第 12 节完整验收、正式字体和人工视觉批准；公开品牌/域名、托管、第二个 Collection、审核责任人等后续门禁。代码、正式内容、应用测试、外部服务和发布均未开始。
- 下一项允许动作：停止本次 M1 收口；后续只有确认技术栈并获得用户单独授权后才能开始 M2。
- 是否可以关闭需求：否。
