# Mythic China 产品需求文档

## 0. 文档状态

- 状态：草拟；设计体系、首发主题、M2 技术/内容方向、M3 资产管线，以及第二 MVP Collection 的 Liaozhai 方向与 3+3 分配已确认；M2 本地实施、M3-U1–U5、M4 本地产品实现及 M5-U2/U3 已完成。M4 包含 U1–U3、U4A public/SEO 纯基础设施、首个纵切片、两组 Hero、正式字体静态链、U5A noindex 字体样张、最终三档基础矩阵及当时 8 页人工视觉判断；M5-U3 把 noindex review inventory 增至 9 页并增加 inert Newsletter、Reader Request 与 Privacy，不构成 public artifact。2026-09-04 四篇候选的研究与 locator 证据闭合后，Project owner 又确认 Liaozhai 任 2016 主/张 2011 对校及《促织》青柯亭单见证路线，并逐项授权四个最小 draft Entry owner、证据已闭合的 Source/Claim/Terminology、Source 数字影像证据门禁与 13 页 review inventory 支持；随后 Ten Kings 只消费已闭合的 2 Source / 3 Claim / 1 Terminology，Fighting Cricket 只消费已闭合的 1 Source / 3 Claim / 1 Terminology，Liaozhai 导读只消费已闭合的 1 Source / 2 Claim / 1 Terminology，三篇分别形成证据受限英语首稿。三批均不处理图片、不改状态/Collection 关系、不接外部服务，也不构成完整 M6 内容实现或 public artifact。真实键盘/200%/媒体偏好、故障/性能与跨平台收口仍由 M6 最终 public artifact 和受保护预览承担，原计划 M4-U4B 的 public 接线也迁入 M6。
- 日期：2026-09-05。
- 当前事实：用户具备 ComfyUI 等静态生图能力，暂不具备视频制作能力；M3、Collection Hero 与 Guide Hero 的实际生产采用 Project owner 分别确认的个人、非组织管理 OpenAI ImageGen 账户，没有使用 ComfyUI。M1 Home、Collection、Entry、Review Board、3×2 探针与字体验收页已冻结为不可发布的工程参考基线。M2 已完成本地应用、依赖、Content Layer 与工程门禁；M3 终验曾因 Hero v1 双手解剖缺陷重开，Project owner 于 2026-08-29 验收定向修正后的 Hero v2。当前版本化 inventory 为 11 个 production master、11 份 repository source rendition、四份 production record 与七份 manifest 记录；六个逻辑资产各有唯一 approved/current，Zhong Kui Hero v1 保留为 approved/non-current 审计历史。M4-U2 原 7 个 noindex review 页面增加 direct-only type specimen 后形成 8 页历史基线；M5-U3 新增 `/privacy/` 后形成 9 页历史基线；2026-09-04 四个 draft Entry 通过既有动态路由加入 review 输出，当前 inventory 为 13 页，并在全站 Footer 与六个 Entry 保留不可提交的交互预览。M4-U3 已完成 published-only 探索投影，M4-U4A 已完成不接页面/output 的 public SEO 纯基础设施。Chinese Underworld Collection Hero 与 Guide Hero 已分别完成权利/五审/exact-canvas/资产批准及所属内容绑定；4 份英文 WOFF2 与 6 份 Source Han Sans SC/TC 静态子集已接线并通过生产来源、CSS、hash/name/weight、cmap 与 HTML5 语言边界门禁。U5A 最终样张现覆盖 English display/story/body、生产 pinyin 语言与 DESIGN 冻结混排行、SC/TC 400/500/600、困难字形与 fallback-only `测`/`測`，完整自动门禁与 2026-09-02 的最终 Windows/local 三档基础矩阵均已通过；8 页 × 3 档共 24 个实际组合无横向溢出、破图、样张错配或 console 问题，样张观测到 10 个字体资源。Project owner 随后检查当时全部 8 个页面路由并明确回复“这些页面通过”，闭合 M4 样张、Hero 裁切与页面阅读观感的人工判断；该历史判断不自动覆盖 U3 新页面。真实键盘/200%、启用 reduced motion、JavaScript-disabled、慢/阻断字体、图片失败、LCP/CLS、实际 fallback face 与跨平台 fallback 仍未验证，现归 M6 发布候选 QA；真实 published 内容、public artifact、远端预览与发布也仍未完成。验收标签已清理，PID `31960` 已停止且 4321 无监听，不形成可复用服务或远端发布环境。
- 已确认产品方向：newsletter 只在全站 footer 提供，不在每篇末尾重复，只发送新文章与偶尔的编辑精选且每月不超过两次；文章末尾保留独立 Reader Request，选填邮件只用于该建议的后续联系，不得自动订阅 newsletter；ComfyUI 是可选视觉辅助，人物、传说、译名和画面依据必须先完成来源核查。
- 已确认设计方向：全站采用“中国神话传说博物馆”体验体系——现代中性文化平台母体、每个 Collection 独立美术主题、全站统一的可信 Entry 阅读器。“博物馆”是策展与阅读隐喻，不扩展为世界神话平台，也不宣称实体馆藏或公共机构身份。国风不等于水墨、古籍或旧报纸皮肤；整页背景不足不阻断内容、导航、Schema 与阅读功能基础。
- 已确认首发主题：第一个正式 Collection 为 `The Chinese Underworld / 中国阴间`；`Zhong Kui, the Demon Queller` 是 M1 Featured Entry 与首批重点发布入口，但不代表整个中国阴间，也不被描述为阴间统治者。
- 已确认第二 Collection 方向：工作名为 `Strange Tales from Liaozhai`，`Strange Tales After Dark` 只保留为可选营销副标题；六篇采用 007 的 3+3 分配与两条公开阅读顺序，Zhong Kui 继续作为 Featured。Project owner 已确认 Liaozhai 采用任笃行 2016 为主、张友鹤 2011 为对校的工作路线，并选择《促织》只按已核上海图书馆青柯亭见证叙事；任/张实际册页、跨见证异文和作者归属仍未闭合。四篇已建立稳定 Entry ID/slug 与 draft owner；Ten Kings、Fighting Cricket 与 Liaozhai 导读已有证据受限首稿，只有 Painted Skin 为空。尚未创建第二 Collection、成员关系、资产或发布状态。
- 已确认国际化方向：英语继续使用根路径 `/`；未来简体中文试点使用 `/zh-hans/`，并只预留、不生成 `/zh-hant/`。试点先覆盖 Chinese Underworld Collection、Zhong Kui 与 Guide，按 locale 独立审核且不阻塞英语 MVP；当前未实施中文页面、语言切换、locale Schema 或 localized SEO。
- 工作假设：英语优先；首版由单人配合 AI 维护；先验证内容与视觉品牌，不先建设平台型能力。
- 证据边界：当前没有真实受众访谈、流量或转化基线，用户画像、选题优先级、指标阈值和最终研究/翻译签字人均为待验证假设。

## 1. Executive Summary

Mythic China 将为对神话、奇幻、恐怖和民俗感兴趣的英语读者提供一个视觉驱动、出处清楚的中国神话探索网站。网站用可读的英文故事、原创插画和明确的传统/文本分层，解决英语读者遇到中国神、鬼、异兽、地点或传奇人物时“能看见，却难以理解来源和版本”的问题。MVP 以静态网站、6 篇首发内容和主题合集验证生产节奏、连续阅读、订阅与读者选题反馈，不建设账号、社区和复杂后端。

英文定位：

> An illustrated, source-aware guide to China’s myths, strange tales, gods, ghosts and legendary figures.

品牌原则：

> Stories first. Sources always.

## 2. Problem Statement

### 2.1 谁有这个问题

主要用户是英语读者中的神话、奇幻、恐怖、民俗、游戏和文化爱好者。他们可能通过游戏、电影、社交图片或一次搜索遇到某个中国神话对象，希望在 5–10 分钟内获得一个好读、好看、可信的解释。

### 2.2 问题是什么

- 英语资料经常只有简短百科定义，缺少故事性和版本脉络。
- 流行文化改编容易与古代文本、地方传统、宗教信仰和历史事实混在一起。
- 视觉内容容易吸引人，但常缺少出处，或直接沿用受版权保护的游戏/影视形象。
- 分散文章缺少人物、地点、原典和主题之间的继续探索路径。

### 2.3 为什么重要

- 对读者：无法判断“原典写了什么”“后世增加了什么”“现代作品改了什么”。
- 对创作者：一次性社交内容难以沉淀；没有统一内容与资产模型，会随栏目增加迅速失控。
- 对品牌：如果引用和 AI 图片披露不清，视觉冲击反而会损害可信度。

### 2.4 当前证据

本节目前只有创作者经验和项目设想，没有用户研究数据。MVP 上线前应找 5–8 位目标读者测试首页定位、英文标题、文章模板和来源说明；上线后以真实行为数据替代本节假设。

## 3. Target Users & Jobs-to-be-Done

### 3.1 Primary Persona：Curious Myth Explorer

- 语言：英语为主，通常不会阅读古汉语。
- 兴趣：世界神话、奇幻、恐怖、民俗、游戏设定、怪物图鉴。
- 目标：迅速理解一个陌生对象，并找到下一段值得读的故事。
- 痛点：专名多、传统互相叠加、翻译不统一、资料可信度难判断。
- 行为：搜索、收藏图片、阅读解释文章、沿相关人物或主题继续探索。

### 3.2 Secondary Persona：Creative Researcher

- 包括作家、插画师、游戏设计者、教师和内容创作者。
- 更重视名称、原典、版本差异、图像来源和可引用信息。
- 不把本站当作唯一学术来源，但希望它能提供可靠的继续研究入口。

### 3.3 JTBD

> 当我遇到一个陌生的中国传说、神祇、异兽或传奇人物时，帮我先通过一个有吸引力的故事理解它，再清楚告诉我哪些来自古代文本、民间传统、宗教、文学、历史记录或后世改编，让我可以放心继续探索。

## 4. Strategic Context

### 4.1 为什么从网站开始

- 长文、来源、关系和版本说明需要稳定页面承载。
- 网站能把一次创作沉淀为长期内容资产，并为图片分发提供统一落点。
- 原创绘制、授权素材或 ComfyUI 辅助都可以形成静态视觉；ComfyUI 不是内容来源或 MVP 依赖，没有视频能力不会阻塞 MVP。
- 网站本身不会自动带来读者，因此“母站内容包 + 外部静态图卡分发 + 邮件沉淀”视为同一个产品循环。

### 4.2 竞品定位

竞品与相邻标杆审计见 [`COMPETITIVE_AUDIT.md`](COMPETITIVE_AUDIT.md)。MVP 不与 Mythopedia / Chinese Mythology Atlas 比收录广度，也不与 MythQuick 比 30 秒消费和游戏化互动。项目要验证的空白是：

> 现代中国神话传说文化平台 + Collection 独立原创视觉 + 可读英文长文 + 原典/后世/本站演绎分层 + 可追溯来源。

采用的能力包括：初学者阅读路径、Collection / Entry 分层、Quick Answer、稳定实体模板和原典/书目纪律；明确不采用“完整宇宙”承诺、SR/SSR 稀有度、全站卡牌皮肤、密集游戏互动和与正文竞争的商业模块。

所有竞品“不足”均为本项目当前目标下的评估，不是对对方全站的客观定论；M1 只冻结现有 URL、日期、观察和转译决策，仓库不保存浏览器截图。首次真实 Home、Collection、Entry 纵切片进入批量制作前，须重新完成桌面/移动比较与人工视觉复核。

### 4.3 差异化

1. 英文自然，故事先行。
2. 统一、现代的中国神话传说文化平台母体，以及由具体题材和文化依据决定的 Collection 独立美术方向。
3. 清楚区分传统类型、历史记录和现代改编。
4. 每个内容对象都能沿人物、地点、主题和来源继续探索。
5. 引用、视觉参考和 AI 辅助过程有可追溯记录。

### 4.4 内容边界

- 可以讲“关羽如何从历史人物成为神”，但不扩展成泛三国史站点。
- 可以讲酆都的传说和信仰层次，但不提供宗教实践建议。
- 可以解释现代游戏如何重新想象某个角色，但不复用其角色设计或把改编当作古代事实。

## 5. Solution Overview

### 5.1 MVP 网站

顶部导航只保留：

- Home
- Explore
- Collections
- About

内容通过五类入口探索，但不把它们都做成一级导航：

- Figures
- Creatures & Spirits
- Realms & Places
- Tales
- Guides

主题合集负责形成阅读路径。当前只建立了一个正式 Collection 对象；另有一个第二 Collection 方向已确认，其余仍为候选：

- **The Chinese Underworld / 中国阴间**（已建立对象且方向确认）
- Defying Heaven（候选）
- **Strange Tales from Liaozhai**（第二 MVP Collection 已确认方向；仍是工作名，`Strange Tales After Dark` 只作可选营销副标题）

### 5.2 站内发现与单篇阅读链路

```text
站内发现：
搜索 / 外部静态图卡 / 首页
        -> 主题合集
        -> 内容条目

单篇 Entry：
主视觉 + 故事问题
        -> opening 故事入口
        -> Quick Answer
        -> 核心故事
        -> 原典写了什么
        -> 后世传统与版本
        -> 本站解释
        -> 完整 Sources
        -> Related Entries
        -> Reader Request

任意页面 -> 全站 footer newsletter
```

轻量出处必须随相关主张出现；`Sources` 是正文收束后的完整书目，不是故事前置门槛。上述读者链与内部生产链不同：编辑仍须先完成 claim、来源和术语核查，再写作和制作视觉。

### 5.3 每篇内容包（发布物清单，不代表制作顺序）

- 1 篇英文文章。
- 1 张横向主视觉。
- 可选 1 组桌面/移动主题背景；它是非阻断的页面气氛资产，不得替代正文插图或承担唯一事实信息。
- 2–3 张正文插图。
- 3–5 张静态故事卡或视觉切片。
- 可选 1 张用途匹配的 Open Graph 分享图；当前已确认采用 text-only Open Graph，不为每篇强制生产图片。只有页面具备权利、文化与用途审核通过的 approved/current 资产时，后续单元才可另行启用。
- 1 个下一步阅读入口。
- 可追溯的主张—来源记录、关键术语决策、图片披露和内部资产记录。

### 5.4 首发建议

不必等待 12 篇再上线。第一个正式 Collection 已确认为 `The Chinese Underworld / 中国阴间`；M1 先以钟馗作为 Featured Entry 验证“当前关注入口 -> Collection 阅读路径 -> 可信长文”的纵切片。当前真实 inventory 为 6 篇 Entry：`A Guide to the Chinese Underworld` 与 `Zhong Kui, the Demon Queller` 保持 `editorial-review`，`ten-kings`、`liaozhai-reading-guide`、`painted-skin` 与 `fighting-cricket` 为 `draft` owner；Ten Kings 已有正文与 2 Source / 3 Claim / 1 Terminology 反向消费关系，Fighting Cricket 已有正文与 1 Source / 3 Claim / 1 Terminology 反向消费关系，Liaozhai 导读已有正文与 1 Source / 2 Claim / 1 Terminology 反向消费关系，只有 Painted Skin 的正文和反向数组为空，四篇均无资产。唯一 Chinese Underworld Collection 仍为 `editorial-review`，published inventory 仍为 0/0。

Project owner 于 2026-09-03 确认 [`007-second-collection-decision.md`](requirements/007-second-collection-decision.md) 的推荐方向：`Strange Tales from Liaozhai` 作为第二 Collection 工作名，六篇 MVP 按 3+3 分配——Chinese Underworld 采用 Guide、Ten Kings 深入篇与 Zhong Kui；Liaozhai 采用文本导读、`Painted Skin` 与 `The Fighting Cricket`。随后研究与证据闭合由 [`008-four-entry-claim-maps.md`](requirements/008-four-entry-claim-maps.md) 记录；2026-09-04 的后续逐项授权又建立四个最小 draft Entry owner，并只物化 5 份 Source、9 份 Claim 与 3 份 `source-checked` Terminology。当前总量为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology；Ten Kings 已把 2 Source / 3 Claim / 1 Terminology 写回 Entry 消费数组并形成首稿，Fighting Cricket 已把 1 Source / 3 Claim / 1 Terminology 写回 Entry 消费数组并形成首稿，Liaozhai 导读已把 1 Source / 2 Claim / 1 Terminology 写回 Entry 消费数组并形成首稿，没有创建第二 Collection、视觉资产或状态提升。

已确认的公开阅读顺序分别为“Guide → Ten Kings → Zhong Kui”和“Liaozhai 导读 → Painted Skin → The Fighting Cricket”，它们不必等同生产优先级；Zhong Kui 继续作为 Featured Entry，不必位于公开阅读顺序首项。Project owner 已选择《促织》只按上海图书馆青柯亭单见证叙事；该见证已直接核到卷七、Commons 数字页 427–432、可见叶码四至九，其中数字页 431 有 `後歲餘…身化促織`，并据此只物化三条见证限定 Claim。辽宁手稿、现代校记与早期抄本仍未取得，因此跨见证叙事、作者归属与谁“首次增写”魂化结尾继续阻塞。

四个新题目仍是 `draft`，不是已经完成的内容；Ten Kings、Fighting Cricket 与 Liaozhai 导读已分别形成证据受限首稿，仍待双语、编辑、目标读者、资产与状态审核。Liaozhai 导读当前只消费 Luo 2009 的 1 Source / 2 Claim / 1 Terminology；任笃行 2016 与张友鹤 2011 的实际册页尚未取得，故两书没有成为已核 Source，也没有补篇级 locator、终本或唯一篇数结论。Painted Skin 只物化 Tso 2017 的具名解释，没有纳入权利未闭合的 CText/Giles 或 `孽鬼` 术语；Fighting Cricket 只消费青柯亭单见证的三条见证限定 Claim，不补写未物化情节。Painted Skin 进入正文、翻译或 `editorial-review` 前，仍须另行授权把已物化证据写入 Entry 消费清单，并完成适用术语、译文和人工复核。中国阴间必须呈现为多时期、多地域、多文本与多传统叠加，而不是唯一地图或组织架构。The Met 的馆藏记录支持把钟馗称为 `Demon Queller`；本站将他作为驱鬼形象策展进中国阴间 Collection，但不默认写成十王之一、全中国共同认可的阴司官员或阴间统治者。边界入口见 [The Met 的钟馗馆藏记录](https://www.metmuseum.org/art/collection/search/75262) 与用于区分十王审判体系的 [Columbia 教学资料](https://afe.easia.columbia.edu/cosmos/prb/underworld.htm)。现代游戏只能进入明确的现代改编/接受史层。原候选 `Fengdu`、`Meng Po` 与 `Black and White Impermanence` 现建议延后；后两者等晚期或地方复合传统若找不到足够证据，就缩小主张、明确争议或替换选题，不能用“ancient”“自古统一”等叙事填空。

第二个 Collection 方向、3+3 分配、公开顺序、Featured、Liaozhai 工作底本路线与《促织》单见证路线均已确认；四个 draft Entry 的稳定身份及证据已闭合的最小 Source/Claim/Terminology 子集已建立，Ten Kings、Fighting Cricket 与 Liaozhai 导读又分别完成证据消费关系与首稿。Painted Skin 的正文/消费关系，以及四篇的第二 Collection 对象与 `entryIds`、翻译、视觉候选和状态仍须在后续获授权 M6 批次建立。在完整内容与视觉门禁关闭前，M6 远端预览继续阻塞。`Defying Heaven` 仍是后续候选；`Shan Hai Jing: An Illustrated Field Guide` 继续留在 Phase 2，而非仅凭视觉潜力提前挤入三篇 MVP 路径。

## 6. Success Metrics

### 6.1 Primary Outcome

证明一个单人创作者能持续生产“英文故事 + 统一原创视觉 + 来源说明”，并促使读者继续探索。

### 6.2 初始验证阈值

以下是首轮假设，不是现有基线；在达到 12 篇或积累至少 1,000 个合格阅读会话后复盘：

- 生产可持续性：连续 8 周平均每周发布至少 1 个完整内容包。
- 连续探索率：至少 20% 的文章阅读会话点击相关内容或下一篇。
- 深度阅读：至少 30% 的合格文章会话到达正文 75% 位置。
- 邮件意愿：至少 2% 的合格会话完成订阅提交。
- 选题参与：至少 1% 的文章会话提交选题，或每月获得足以形成候选池的有效建议。

### 6.3 Guardrails

- 已发布页面的来源完整率、必填图片披露率和破损内部关联必须为 100% / 100% / 0。
- 不以增加追踪脚本换取更多数据；不采集合同外个人信息。
- 商业链接不能降低来源独立性、阅读完成度和站点性能。

## 7. User Stories & Requirements

### 7.1 阅读与探索

**作为英语读者，我希望快速知道一个对象是谁以及为什么重要。**

验收：首屏或正文开头提供 80–120 词快速回答；中文名、拼音、类型和时期可以作为轻量身份信息显示。最早可靠来源属于证据层，应在对应 source note / `What the text says` 中呈现，不作为读者进入故事前的门槛。

**作为读者，我希望知道故事的不同层次。**

验收：正文明确区分原典、后世传统、版本差异和本站艺术演绎；历史人物页面额外区分历史记录与传说化。

**作为读者，我希望从一个故事继续探索。**

验收：每篇至少提供一个有语义的相关内容入口；内部关联使用稳定 ID，不依赖标题字符串匹配。

### 7.2 来源与可信度

**作为重视准确性的读者，我希望看到信息出处。**

验收：页面提供来源区；外部网页显示标题/机构、链接和访问日期；引用的现代图片或文本额外显示权利状态。事实性文化主张必须能定位到具体版本、章节、页码、行号或馆藏编号；关于“最早”“首次”“形成于某时期”和跨传统关系的判断还需专业研究支持。找不到可靠证据时标为未决、呈现分歧或不发布，不用生成式模型补齐。

**作为英语读者，我希望译名自然、准确，又不把中国概念误套成西方类别。**

验收：有稳定英文名的专名首次出现采用“常用英文名（简体中文，规范拼音）”；无稳定对应词时采用“带声调拼音（汉字）+ 一句语境化释义”，例如 `a yāo (妖)—here, a nonhuman being transformed through cultivation—`，后文保持同一选择。`guai`、`yao`、`gui`、`shen`、`jing`、`mo`、`xian` 等词按时代、文本和宗教语境记录译法，不固化成全站怪物种族表。外部译文标明译者与版本，本站译文标明 `our translation` 并关联原文位置；AI/机器翻译只能辅助起草，发布前必须完成双语事实与译文核对。

**作为读者，我希望分清史料图像和原创插画。**

验收：原创生成图在图外显示 `Original illustration` 或 `AI-assisted original illustration`；不得以文物/古画语气呈现。

### 7.3 反馈与订阅

**作为读者，我希望推荐下一篇传说。**

验收：每篇末尾提供 `What Chinese myth or strange tale should we explore next?`；首版用外部表单或隔离接口，不要求账号；邮箱可选并有明确同意。

**作为读者，我希望收到新故事。**

验收：只在全站 footer 提供一个简单邮件订阅入口，不在每篇末尾重复；网站不自行保存邮箱，不把订阅同意扩展为其他营销授权。

### 7.4 编辑与维护

**作为创作者，我希望新增栏目时不改底层系统。**

验收：新栏目主要由 topic、collection 和查询视图组成；不复制内容 Schema 和渲染链路。

**作为创作者，我希望每张公开视觉资产无论采用何种工具都能追溯到所属页面、制作方式、权利状态，以及它包含的事实/推断/创作边界。**

验收：先核准适用的 claim、术语和 versioned visual brief，再开始视觉制作；每个逻辑资产版本可包含一个或多个已核准 master rendition，并由一份工具无关的 versioned manifest 追溯 brief 元素、参考资产、人工修改、仓库 source renditions、accessibility mode 和成品权利。纯装饰且全部 invented 的背景不得支撑事实。只有实际使用 ComfyUI 或其他生成工具时才记录其模型与工作流 metadata。

## 8. Out of Scope for MVP

- 视频、播客、自动播放音视频和持续循环的动态背景；有来源边界且不影响阅读的静态主题背景不在此限制内。
- 账号、评论、收藏、公开投稿、积分和社区。
- 中文与英文同步发布；已确认的简中试点是须另行授权的独立后续交付，不要求全量对译，也不阻塞英语 MVP、远端预览或发布门禁。
- 自研 CMS、复杂后台、数据库、图数据库和个性化推荐。
- 互动地图、复杂关系图和 App。
- 付费墙、购物车、会员权限和站内支付。
- 大规模广告、首屏弹窗和段落间密集广告。
- AI 批量生成并自动发布内容。

## 9. Expansion and Monetization Roadmap

路线按读者和内容信号触发，不以日历或文章数量自动解锁；下列篇数只是复盘区间。任何商业能力都必须由后续独立需求确认价值、编辑边界、隐私、权利、退出策略和验收方式，不属于 M2 的预建范围。

本地化试点与篇数阶段正交：三页简中试点可按 [`005-localized-content-pilot.md`](requirements/005-localized-content-pilot.md) 另行授权，具体启动时点由实施批次确认；其缺失或延后不改变英语 Phase 1 的完成判断。

### Phase 1：首版验证（0–12 篇）

实现文章、合集、footer newsletter、文章末尾选题建议和基础隐私友好分析。暂不变现，避免商业模块干扰内容需求验证。

### Phase 2：优势栏目（约 20–35 篇）

- 增加静态站内搜索、筛选、术语表和来源索引。
- 一次只增加一个相邻栏目，例如 *Shan Hai Jing: An Illustrated Field Guide*。
- 若未来希望通过 newsletter 做候选题投票，必须先作为新的用途扩展更新 consent、Privacy 和发送文案并取得独立授权；当前只同意“新文章与编辑精选”的订阅不得直接用于投票。
- 可以测试少量联盟链接，但只推荐实际核查过的译本、研究书和相关作品；参考来源与购买推荐必须视觉分离并显示 disclosure。

### Phase 3：内容产品化（约 40–60 篇）

- 优先验证主题 PDF/ePub、图鉴、人物卡、关系图、壁纸包等数字产品。
- 先做候补名单或预售意愿验证，再投入完整制作。
- 基础事实、出处和版本辨析继续免费；付费价值来自深度整理、表现形式和参与感。
- 只有自然流量稳定到足以产生有意义收入时，才测试少量、低干扰广告。

### Phase 4：品牌扩展（约 60–100 篇以后）

- 可视化关系图、互动地图、纸质图鉴、海报或卡牌。
- 出版社、博物馆、游戏或文化机构合作。
- 外部团队协作的视频/播客。
- newsletter 赞助、低干扰广告和经过验证的会员计划。

### 商业化硬边界

- 佣金和赞助不得决定事实结论、来源选择或内容优先级。
- affiliate、sponsor、ad、paid product 进入正式路线后才通过独立需求增加结构化记录和可见披露；M2 不创建空商业字段、组件、adapter 或服务目录。
- 未来内部 `productId` / `offerId` 与支付供应商 ID、checkout URL 和跟踪参数分离；供应商细节只进入可替换 adapter/配置，不进入内容身份或 Markdown 正文。
- 来源与研究书目不因商业关系获得更高权重；购买推荐必须与 Sources 分区，披露紧邻商业入口。首选外部托管结账，真正的付费访问控制出现后再评估认证、webhook、会话和存储。
- 使用 ComfyUI 生成可售产品前，必须核对 checkpoint、LoRA、字体和参考资产的商业许可证。

## 10. Reader Request Feedback Loop

```text
文章末尾提交选题
  -> 合并同义请求
  -> 按合集、人物和类型归类
  -> 每月形成候选池
  -> 编辑内部筛选；newsletter 投票仅在未来用途扩展另获 consent 后可选
  -> 编辑选择并发布
  -> 通知曾请求的读者（仅在其明确同意时）
  -> 比较阅读、分享、相关文章点击和订阅
  -> 决定下一批选题
```

编辑排期建议：70% 强化已验证主题，20% 测试相邻题材，10% 保留给编辑主动发掘的冷门故事，避免完全由票数把内容锁在少数知名人物上。

首版实际保存或传递的数据最小集见 `docs/CONTENT_MODEL.md`。MVP 不预建公开选题社区、用户画像或个性化推荐。

## 11. Dependencies and Risks

### 依赖

- 能提供版本与具体定位的原典/馆藏、专业研究和现代资料来源。
- 能核对中文/古汉语的研究校对，以及英文编辑或母语读者的质量反馈。
- 若使用生成式视觉工具，可商用且许可清楚的模型、LoRA、字体和参考资产。
- M2 技术与内容合同、固定运行时、依赖安装和本地应用初始化已经完成并由用户提交为本地基线 `f258227`；M3-U1–U5 已完成。M3-U4 的五个最终画布、四份 approved/current manifest 与首份 production record 是历史完成事实；终验发现 Hero v1 手部缺陷后，Project owner 又验收 Hero v2，v1 作为 non-current 历史保留。随后 Chinese Underworld Collection Hero 与 Guide Hero 以各自的 approved brief 闭合 desktop/mobile 构图、权利与五审、exact-canvas master、production record、repository source、approved/current manifest 与 versionless asset ID 绑定。当前 11 个 local master、11 份 repository source、四份 production record 与七份 manifest 版本记录均通过自动门禁；六个逻辑资产各有唯一 approved/current，钟馗 Entry 的稳定 Hero ID 解析到 v2，Collection 与 Guide 的稳定 Hero ID 分别解析到自己的 v1。`sharp@0.35.4` 仍是唯一新增运行依赖，七份 current responsive rendition 的 50 个 AVIF/WebP 目标已实际生成/解码验证；CJK 默认门禁另把 `fontkitten@1.0.3` 与 `parse5@8.0.1` 固定为直接开发依赖，不进入浏览器运行时。M4 本地产品实现已经完成；U5A direct-only noindex 字体样张保持 42 图、10 字体、零 XML/JS 与 public 负边界，最终 8 页 × 三档基础浏览器矩阵及 Project owner 对当时全部 8 个页面的视觉判断也已通过。两份 Terminology 与四条馆藏标题 locale 已由 `Project owner (user-confirmed)` bilingual reviewer 批准；CJK 字符输入、SC/TC × 400/500/600 六份静态子集、OFL/RFN/FONTLOG、精确 `unicode-range`、hash/name/weight/cmap 与 HTML5 `lang` 门禁已经闭合。M5-U2 provider-neutral 合同/Fake 与 M5-U3 inert Newsletter、Reader Request、Privacy 已完成；Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过，Tally Free 草稿仍未发布，U4 仍未完成。下一停点是按 [`006-external-interactions.md`](requirements/006-external-interactions.md) 分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 发布、精确 hosted link、合成数据、回查与删除。2026-09-04 的内容证据批已建立四个 draft Entry owner、5 Source、9 Claim、3 Terminology 及数字影像证据门禁；Ten Kings、Fighting Cricket 与 Liaozhai 导读后续分别完成 2 Source / 3 Claim / 1 Terminology、1 Source / 3 Claim / 1 Terminology 和 1 Source / 2 Claim / 1 Terminology 消费关系与证据受限首稿，只有 Painted Skin 仍为空。M6 后续仍须完成剩余正文、至少 2 个合集页、关系、全部资产与人工 `published` 决定，确认真实 HTTPS origin，实施 public artifact assembly；随后针对同一最终 public artifact 完成键盘/200%/偏好、故障、字体/跨平台、目标读者、视觉及本地性能 QA，生成 clean-source receipt，再经独立授权进入受保护 Vercel 预览；M7 承接生产发布、live smoke、回滚和真实流量基线。Project owner 当前明确不购买自定义域名；M6 可在单独授权下建立 Vercel 项目身份并确认稳定 production alias/hostname，这不等于预览或部署授权，generated preview/commit URL 也不得成为 canonical。public-release 的一个 Entry + 一个 Collection 只是技术门禁，不替代 M6/M7 产品验收；Buttondown/Tally 均未接入或启用，Plausible 仍留 U5。
- 上述 M6 最终 QA 与 receipt 必须从同一 clean committed revision 重新构建并执行；dirty source 上的检查只能形成 nondeployable 诊断记录，提交后不得复用。M5 推荐合同当前把 Web Vitals/RUM 显式列为 M7 的独立单一生产者，并在 [`006-external-interactions.md`](requirements/006-external-interactions.md) 记录候选、字段、同意、保留与退出边界；provider-neutral 上限已确认，RUM 供应商选择与真实账户验收仍待 M7，不能把 Plausible 或实验室性能数据冒充生产 p75。

上述推荐路线中的“M7 生产发布”同时包含发布后只读基线与检查，不以成功触发部署作为里程碑收口。

### 主要风险与缓解

- **文化层次被混淆或空白被生编补齐。** 使用固定传统类型、声明级证据和编辑模板；无可靠证据时保留未决或不发布。
- **英文像翻译腔或关键术语被错误一对一替换。** 使用语境化术语记录；先完成双语核对，再由母语编辑或目标读者测试可读性。
- **图片很漂亮但不准确。** 视觉元素拆成 verified / inferred / invented，并执行 Claim、文化与权利审校；verified 只表示有证据支撑，不表示唯一正典。
- **视觉制作拖慢更新。** 固定内容包规格，按需要选择原创绘制、授权素材或生成工具辅助，不让单一工具阻塞发布。
- **Collection 视觉互相割裂。** 固定现代品牌母体、字体角色、栅格、导航、功能组件、Entry 正文和来源系统；Collection 可独立改变批准的 realm token、主视觉、媒介、环境纹理、构图、章节过渡和一次 Hero 动效，但不创建新的功能壳层。
- **Git 被原图拖垮。** 代码仓库只保存审核后的 source renditions、brief、manifest 与适合入库的小型生产记录；大原图、私有参考与模型外置。
- **过早商业化损害信任。** 按阶段触发并保持编辑/商业分离。
- **外部服务锁定。** 通过 adapter 边界接入，并保留可导出数据与替换路径。

## 12. Open Questions

以下问题不阻塞本轮文档生成，但会影响后续实现或发布：

- `Mythic China` 的公开品牌名和商标可用性是否通过正式核查；Project owner 当前明确不购买自定义域名，未来迁移另行决策。
- 首次远端预览所用 Vercel 账户/项目由谁持有，以及稳定 production alias/hostname、预览保护、预览/生产授权、回滚和退出路径；经 Project owner 确认后，其 HTTPS origin 才能写入 `MYTHIC_CHINA_SITE_ORIGIN`。当前没有 Vercel 项目或部署。
- 第二个首发 Collection 的方向、工作名、3+3 分配、公开顺序、Zhong Kui Featured、Liaozhai 任 2016 主/张 2011 对校路线与《促织》青柯亭单见证路线已经 Project owner 确认；四篇 claim map、本轮证据闭合及 4 draft Entry / 5 Source / 9 Claim / 3 Terminology 最小物化也已完成，Ten Kings、Fighting Cricket 与 Liaozhai 导读已分别建立证据消费关系和首稿。仍待的是任/张实际册页、Painted Skin 的 Entry 证据消费关系/正文、第二 Collection 对象/成员、四篇翻译/资产与状态。辽宁手稿、现代校记与早期抄本仍未取得，故《促织》跨见证、作者归属和首次增写判断继续阻塞；上述确认不降低“至少 2 个完整合集页”的预览门槛，研究与物化边界见 [`008-four-entry-claim-maps.md`](requirements/008-four-entry-claim-maps.md)。
- 后续正式 Entry 内容及 M6 批量资产的英文编辑、研究校对和图片文化审校由谁承担最终签字；M3 钟馗样例的五项资产审核已由 Project owner 完成。
- [`006-external-interactions.md`](requirements/006-external-interactions.md) 已把 Buttondown/Tally 条件接受为 U4 的 Newsletter/Reader Request transport 方向，并记录公开联系、美国处理/DPA 边界、持久 Respondent ID 与人工清理风险。Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过；Tally Free 账户和未发布草稿结构已由 Project owner 确认。该账户状态是用户提供的现场事实；真实 action/link、账户级条款与设置、发布、导出/删除和供应商行为仍待 U4 实证，Plausible 继续留在 U5，M7 RUM 生产者仍未选择，三者均未接入或启用。
- 本地化实施仍待确认的细节包括内容存储形状、localized slug、逐 locale 状态字段、简中试点之外的页面范围、`x-default`/feed 规则、切换器位置与偏好持久化，以及完整简中页面所需的字符集扩展、子集规模、逐 locale 审校与跨平台字体策略；当前英语 review 投影内少量 CJK 的工具、字符集和 cmap 门禁已经闭合。已确认的路径与语义边界见 [`005-localized-content-pilot.md`](requirements/005-localized-content-pilot.md)。
