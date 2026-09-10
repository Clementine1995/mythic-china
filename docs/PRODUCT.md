# Mythic China 产品需求文档

## 0. 文档状态

- 状态：草拟；设计体系、首发主题、M2 技术/内容方向、M3 资产管线，以及第二 MVP Collection 的 Liaozhai 方向与 3+3 分配已确认；M2 本地实施、M3-U1–U5、M4 本地产品实现及 M5-U2/U3 已完成。M4 包含 U1–U3、U4A public/SEO 纯基础设施、首个纵切片、两组 Hero、正式字体静态链、U5A noindex 字体样张、最终三档基础矩阵及当时 8 页人工视觉判断；M5-U3 把 noindex review inventory 增至 9 页并增加 inert Newsletter、Reader Request 与 Privacy，不构成 public artifact。2026-09-04 起四篇候选完成研究、证据受限 draft、人工双语审核与两个三篇 Collection 路径；当前 R1 已重建并通过静态检查。012 随后为四篇 Entry 与 Liaozhai Collection 闭合五组 approved/current Hero，包括 brief、候选/权利、exact-canvas、production lineage、repository source、内容绑定及资产级五审。VB6 已审核六篇/两个合集到 ready，随后 owner 独立批准全部 published、六篇目标日期统一为 2026-09-10；四篇分类、两条 Related 编辑环与 Liaozhai Featured（Painted Skin）已落实；013 已接入本地 public artifact，014–016 已完成版式、墨色及阅读收尾。真实键盘/200%/媒体偏好、故障/性能与跨平台收口仍由 M6 最终 public artifact 和受保护预览承担。
- 日期：2026-09-08。
- 当前事实：用户具备 ComfyUI 等静态生图能力，暂不具备视频制作能力；本项目实际资产生产采用 OpenAI ImageGen，没有使用 ComfyUI。旧批按各自 manifest 保存 Project owner 当时确认的账户与权利事实；012 当前批则准确记录账户由 Project owner 合法管理、可以是个人账户或已获组织授权，并获准把项目生成图保存、编辑和公开使用，不推断具体账户类型。当前版本化 inventory 为 21 个 production master、21 份 repository source rendition、9 份 production record 与 12 份 manifest；11 个逻辑资产各有唯一 approved/current，Zhong Kui Hero v1 保留为 approved/non-current 审计历史。review inventory 为 14 页，8 个 Hero family 在 11 个含图页 / 19 个图位使用 112 个图片输出；016 的交互区域仅显示未开放静态状态。013 已接入 public 页面/output，生成 13 HTML、2 XML 与 robots.txt，仍属于本地诊断。4 份英文 WOFF2 与 6 份 Source Han Sans SC/TC 静态子集已接线并通过静态门禁。2026-09-02 的 8 页 × 3 档基础浏览器矩阵和 Project owner 判断仍是历史证据，不自动覆盖后续页面；真实键盘/200%、媒体偏好、JavaScript-disabled、慢/阻断字体、图片失败、LCP/CLS、实际 fallback face 与跨平台 fallback 仍归 M6 发布候选 QA。六篇/两个合集已有 published 编辑批准，本地 public artifact 已实现；最终候选 QA、远端预览与发布仍未完成。
- 已确认产品方向：newsletter 只在全站 footer 提供，不在每篇末尾重复，只发送新文章与偶尔的编辑精选且每月不超过两次；文章末尾保留独立 Reader Request，选填邮件只用于该建议的后续联系，不得自动订阅 newsletter；ComfyUI 是可选视觉辅助，人物、传说、译名和画面依据必须先完成来源核查。
- 已确认设计方向：全站采用“中国神话传说博物馆”体验体系——现代文化平台母体、每个 Collection 独立美术主题、全站统一的可信 Entry 阅读器。2026-09-08 owner 要求背景向 mythzh 靠齐，墨色、暖白与金色的当前视觉合同见 015 和 DESIGN。“博物馆”是策展与阅读隐喻，不扩展为世界神话平台，也不宣称实体馆藏或公共机构身份。国风不等于水墨、古籍或旧报纸皮肤；整页背景不足不阻断内容、导航、Schema 与阅读功能基础。
- 已确认首发主题：第一个正式 Collection 为 `The Chinese Underworld / 中国阴间`；`Zhong Kui, the Demon Queller` 是 M1 Featured Entry 与首批重点发布入口，但不代表整个中国阴间，也不被描述为阴间统治者。
- 已确认第二 Collection 方向：工作名为 `Strange Tales from Liaozhai`，`Strange Tales After Dark` 只保留为可选营销副标题；六篇采用 007 的 3+3 分配与两条公开阅读顺序，Zhong Kui 继续作为 Chinese Underworld Featured。Project owner 已确认 Liaozhai 的任 2016 主/张 2011 对校研究路线和《促织》青柯亭单见证路线；四个新增 Entry 均有证据受限正文和 approved/current Hero，并在 VB6 审核到 ready。Painted Skin 先采用已核上海图书馆 1766 青柯亭本，任/张比较与现代译本/影视的直接比较延期。第二 Collection 与两个三篇成员路径已按 009 建立，Liaozhai Collection 也已绑定自有 Hero；其 Featured 已选择 Painted Skin，状态在 VB6 审核到 ready。
- 已确认国际化方向：英语继续使用根路径 `/`；未来简体中文试点使用 `/zh-hans/`，并只预留、不生成 `/zh-hant/`。试点先覆盖 Chinese Underworld Collection、Zhong Kui 与 Guide，按 locale 独立审核且不阻塞英语 MVP；当前未实施中文页面、语言切换、locale Schema 或 localized SEO。
- 已确认发布验证方向：Project owner 于 2026-09-07 确认采用 [`011-public-beta-validation.md`](requirements/011-public-beta-validation.md)。事实、双语、文化、权利、视觉、无障碍、内容状态、public artifact、受保护预览与生产授权仍在公开前关闭；目标读者 R2 改在稳定、可索引的 Public Beta 上线后执行。Public Beta 使用现有 `published` 状态，不新增 `beta` 内容状态；收齐并处置 010 规定的真人反馈后，才认定正式 MVP 验证完成。
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

本节目前只有创作者经验和项目设想，没有用户研究数据。四篇英语草稿的修订前形成性审核包已失效；Project owner 聚焦双语确认后，协调者 Markdown 与冻结 R1 HTML 已按 [`010-four-entry-reader-review.md`](requirements/010-four-entry-reader-review.md) 从当前 build 重生成并通过静态检查。该 R1 现为 reference-only，不作为 live R2 阅读面或答卷载体。真人反馈仍为 0，不能写成用户研究完成。按照 011，Public Beta 上线后先由 1 位不计入正式样本的目标读者在 live artifact 上完成 R2a；R2b 建立 5–8 份核心全站可用记录，四篇焦点文章各取前 5–8 份可用深读，按预冻结规则可加入替补。真实行为数据只补充使用信号，不能替代理解度反馈。

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

竞品与相邻标杆审计见 [`COMPETITIVE_AUDIT.md`](COMPETITIVE_AUDIT.md)。MVP 不与 Mythopedia / Chinese Mythology Atlas 比收录广度，也不与 MythQuick 比 30 秒消费和游戏化互动。项目要验证的体验组合是（不认定为竞品尚未覆盖的空白）：

> 现代中国神话传说文化平台 + Collection 独立原创视觉 + 可读英文长文 + 原典/后世/本站演绎分层 + 可追溯来源。

采用的能力包括：初学者阅读路径、Collection / Entry 分层、Quick Answer、稳定实体模板和原典/书目纪律；明确不采用“完整宇宙”承诺、SR/SSR 稀有度、全站卡牌皮肤、密集游戏互动和与正文竞争的商业模块。

所有竞品“不足”均为本项目当前目标下的评估，不是对对方全站的客观定论；M1 只冻结现有 URL、日期、观察和转译决策，仓库不保存浏览器截图。首次真实 Home、Collection、Entry 纵切片进入批量制作前，须重新完成桌面/移动比较与人工视觉复核。

### 4.3 差异化假设

2026-09-08 对 mythzh 中英文首页和钟馗正文的复核确认：对方已有英文长文、来源分层、版本辨析和多级阅读路径。以下是本站的编辑目标，不是独有能力或已经验证的优势。当前可观察差异是部分文章提供更直接的原典/馆藏链接与精确定位；尚无目标读者证据证明本站整体更好读。具体样本与限制见 [竞品审计](COMPETITIVE_AUDIT.md#2026-09-08-mythzh-背景与内容复核)。

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

主题合集负责形成阅读路径。当前建立了两个 Collection 对象，其余仍为候选：

- **The Chinese Underworld / 中国阴间**（`editorial-review`，已建立对象且方向确认）
- Defying Heaven（候选）
- **Strange Tales from Liaozhai**（`draft`，已建立对象；仍是工作名，`Strange Tales After Dark` 只作可选营销副标题）

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

不必等待 12 篇再上线。第一个正式 Collection 已确认为 `The Chinese Underworld / 中国阴间`；M1 先以钟馗作为 Featured Entry 验证“当前关注入口 -> Collection 阅读路径 -> 可信长文”的纵切片。当前真实 inventory 为 6 篇 published Entry；四篇新增 Entry 均有正文，Source/Claim/Terminology 消费关系依次为 2/3/1、1/2/1、2/7/1 与 1/3/1，并分别绑定自己的 approved/current Hero。当前 Chinese Underworld 与 Liaozhai 两个 Collection 均为 published，二者也分别绑定自己的 approved/current Hero；六篇目标公开日期统一为 2026-09-10；尚未部署上线。

Project owner 于 2026-09-03 确认 [`007-second-collection-decision.md`](requirements/007-second-collection-decision.md) 的推荐方向：`Strange Tales from Liaozhai` 作为第二 Collection 工作名，六篇 MVP 按 3+3 分配——Chinese Underworld 采用 Guide、Ten Kings 深入篇与 Zhong Kui；Liaozhai 采用文本导读、`Painted Skin` 与 `The Fighting Cricket`。随后研究与证据闭合由 [`008-four-entry-claim-maps.md`](requirements/008-four-entry-claim-maps.md) 记录；2026-09-04 的后续逐项授权先建立四个最小 draft Entry owner，并物化当时证据已闭合的子集。009 接线及 Painted Skin 单见证补缺后，当前总量为 6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology；四个新题目均有证据受限首稿，第二 Collection 与两个三篇成员路径已经接线。012 随后为四篇与 Liaozhai Collection 闭合五组 Hero 的 master、production record、approved/current manifest、repository source 和内容绑定，内容状态未因此提升。Project owner 于 2026-09-05 确认前三篇纠偏稿通过人工双语审核，2026-09-06 又确认 Painted Skin 通过；当前六份 Terminology 均为 `bilingual-approved`。

已确认的公开阅读顺序分别为“Guide → Ten Kings → Zhong Kui”和“Liaozhai 导读 → Painted Skin → The Fighting Cricket”，它们不必等同生产优先级；Zhong Kui 继续作为 Featured Entry，不必位于公开阅读顺序首项。Project owner 已选择《促织》只按上海图书馆青柯亭单见证叙事；该见证已直接核到卷七、Commons 数字页 427–432、可见叶码四至九，其中数字页 431 有 `後歲餘…身化促織`，并据此只物化三条见证限定 Claim。辽宁手稿、现代校记与早期抄本仍未取得，因此跨见证叙事、作者归属与谁“首次增写”魂化结尾继续阻塞。

四个新题目已在 VB6 审核到 ready，随后取得 owner 的 published 批准；四篇证据受限草稿的修订前锁定版本、当前改动单元与两条内容提示均已通过 Project owner 双语确认。010 的修订前材料已失效，当前 R1 静态检查通过后退役为 reference-only；尚无真人反馈。五组资产级审核、四篇分类、Related、Liaozhai Featured 与 ready 已闭合，published 决定已确认，仍待新页面级发布候选 QA；Public Beta 上线后执行 1 位不计入样本的 R2a，再建立 5–8 份核心全站可用记录与四篇各前 5–8 份可用深读，按 011 的预冻结规则可加入替补。Painted Skin 当前按上海图书馆 1766 青柯亭本消费 5 条原典 Claim、1 条 `verified` 本站自译 Claim，并消费 Tso 的 1 条具名解释 Claim；青柯亭页 74 的 `業魅` 经审译为 `wicked apparition`，Tso 的 `孽魅` 与 CText 关联未具名见证的 `孽鬼` 不用于改写该见证。任笃行 2016 与张友鹤 2011 没有成为该篇 Source，现代校勘本、Giles Source/直接比较、现代译本和影视直接比较均移出当前 MVP。Fighting Cricket 只消费青柯亭单见证的三条见证限定 Claim，不补写未物化情节。中国阴间必须呈现为多时期、多地域、多文本与多传统叠加，而不是唯一地图或组织架构。The Met 的馆藏记录支持把钟馗称为 `Demon Queller`；本站将他作为驱鬼形象策展进中国阴间 Collection，但不默认写成十王之一、全中国共同认可的阴司官员或阴间统治者。边界入口见 [The Met 的钟馗馆藏记录](https://www.metmuseum.org/art/collection/search/75262) 与用于区分十王审判体系的 [Columbia 教学资料](https://afe.easia.columbia.edu/cosmos/prb/underworld.htm)。现代游戏只能进入明确的现代改编/接受史层。原候选 `Fengdu`、`Meng Po` 与 `Black and White Impermanence` 现建议延后；后两者等晚期或地方复合传统若找不到足够证据，就缩小主张、明确争议或替换选题，不能用“ancient”“自古统一”等叙事填空。

第二个 Collection 方向、3+3 分配、公开顺序、Chinese Underworld Featured、Liaozhai 工作底本研究路线与《促织》单见证路线均已确认；四个新增 Entry 均已完成证据消费关系和正文，修订前锁定版本及 010 当前改动单元均已通过 Project owner 双语确认，009 也已建立第二 Collection 对象和两个三篇 `entryIds` 路径。R1 已重建、通过静态检查并退役为 reference-only；012 已闭合四篇与 Liaozhai Collection 的五组 Hero。完整 6+2 inventory 已获 published 批准，六篇目标日期统一为 2026-09-10；013 已完成 origin/public assembly，本地下一停点为完整发布候选准备；完整内容、视觉与其他 M6 门禁关闭前，远端预览继续阻塞。R2a/R2b 只保持其内部先试跑、后正式样本的顺序，并在 Public Beta 上线后执行。`Defying Heaven` 仍是后续候选；`Shan Hai Jing: An Illustrated Field Guide` 继续留在 Phase 2，而非仅凭视觉潜力提前挤入三篇 MVP 路径。

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

### 6.4 Public Beta 验证

Public Beta 是使用现有 `published` 状态、稳定 HTTPS origin、canonical 和可索引 robots 的正式生产阶段；它不降低事实、双语、视觉、权利、无障碍或发布工程门禁。由于当前没有独立目标读者，R2 不再作为 Public Beta 上线前条件；上线时须显示经 Project owner 批准的可见、可访问 Beta 提示，内部状态记为 `Public Beta / pending human validation`。上线后先完成 1 位非计入样本的 R2a；R2b 建立 5–8 份核心全站可用记录，010 所列四篇焦点 Entry 各取前 5–8 份可用深读，并可按预冻结规则补位。达到 010/011 阈值、关闭关键发现、处置重复重大问题并复核 live/RUM 基线后，才由 Project owner 关闭目标读者验证和正式 MVP 验证。

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
- M2 技术与内容合同、固定运行时、依赖安装和本地应用初始化已经完成并由用户提交为本地基线 `f258227`；M3-U1–U5 已完成。M3-U4 的五个最终画布、四份 approved/current manifest 与首份 production record 是历史完成事实；终验发现 Hero v1 手部缺陷后，Project owner 又验收 Hero v2，v1 作为 non-current 历史保留。随后 Chinese Underworld Collection Hero 与 Guide Hero 以各自的 approved brief 闭合 desktop/mobile 构图、权利与五审、exact-canvas master、production record、repository source、approved/current manifest 与 versionless asset ID 绑定。012 再为四篇 Entry 与 Liaozhai Collection 闭合五组 Hero；当前共有 21 个 local master、21 份 repository source、9 份 production record 与 12 份 manifest 版本记录，11 个逻辑资产各有唯一 approved/current，Zhong Kui Hero v1 作为 approved/non-current 历史保留。`sharp@0.35.4` 仍是唯一新增运行依赖，17 份 current responsive rendition 的 120 个 AVIF/WebP 目标已实际生成/解码验证；CJK 默认门禁另把 `fontkitten@1.0.3` 与 `parse5@8.0.1` 固定为直接开发依赖，不进入浏览器运行时。M4 本地产品实现已经完成；U5A direct-only noindex 字体样张在当时保持 42 图、10 字体、零 XML/JS 与 public 负边界，最终 8 页 × 三档基础浏览器矩阵及 Project owner 对当时全部 8 个页面的视觉判断也已通过。当前 review 输出合同扩展为 14 页、112 个 Hero 图片、10 个字体、零 XML/JS，014–016 已补本地页面走查，最终 public 候选浏览器 QA 仍留 M6。六份 Terminology 与四条馆藏标题 locale 已由 `Project owner (user-confirmed)` bilingual reviewer 分批批准；CJK 字符输入、SC/TC × 400/500/600 六份静态子集、OFL/RFN/FONTLOG、精确 `unicode-range`、hash/name/weight/cmap 与 HTML5 `lang` 门禁已经闭合。M5-U2 provider-neutral 合同/Fake 与 M5-U3 inert Newsletter、Reader Request、Privacy 已完成；Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过，Tally Free 草稿仍未发布，U4 仍未完成。下一停点是按 [`006-external-interactions.md`](requirements/006-external-interactions.md) 分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 发布、精确 hosted link、合成数据、回查与删除。2026-09-04 的内容证据批已建立四个 draft Entry owner、5 Source、9 Claim、3 Terminology 及数字影像证据门禁；Ten Kings、Fighting Cricket、Liaozhai 导读与 Painted Skin 后续分别完成 2 Source / 3 Claim / 1 Terminology、1 Source / 3 Claim / 1 Terminology、1 Source / 2 Claim / 1 Terminology 和 2 Source / 7 Claim / 1 Terminology 的消费关系与证据受限首稿，四篇修订前锁定版本、010 当前改动单元和两条内容提示均已通过 Project owner 双语确认；当前 R1 已重建并通过静态检查，六份 Terminology 与短译 Claim 的状态不变。009 已建立两个 Collection 对象及其三篇成员路径；VB6 已闭合关系、Featured 与 6+2 ready；owner 已完成逐项 `published` 与六篇目标日期 2026-09-10 决定；013 已完成真实 HTTPS origin 与本地 public artifact assembly；随后针对同一最终 public artifact 完成键盘/200%/偏好、故障、本机字体、视觉及本地性能 QA，生成列明未验证平台的 clean-source receipt，再经独立授权进入受保护 Vercel 预览。按 [011 第 2.2.1 节](requirements/011-public-beta-validation.md#221-跨平台实机验收时点)，macOS/iOS/Android 实机显示与字体 fallback 及美国东/西部、欧洲性能实测按 2026-09-10 最新决定在 Public Beta 上线后、结束 Beta 前补齐，当前仍为未验证。M7 在独立授权下发布可索引 Public Beta，承接 live smoke、回滚和真实流量基线；R2a/R2b 随后在 live artifact 上执行并用于正式 MVP 验证收口。Project owner 当前明确不购买自定义域名；owner 已建立 Vercel 空项目并确认稳定 production hostname，平台内部身份和实际配置仍须核验；这些准备不等于预览或部署授权，generated preview/commit URL 也不得成为 canonical。public-release 的一个 Entry + 一个 Collection 只是技术门禁，不替代 M6/M7 产品验收；Buttondown/Tally 均未接入或启用；U5B 已于 2026-09-08 确认 GoatCounter 官方免费托管目标，U5B 的注入式 adapter/离线 DOM hook 与 Privacy 计划已本地验证；账户设置已由 2026-09-09 的截图/保存确认，M6 默认关闭接线及产物离线验证完成；真实统计未启用。
- 上述 M6 最终 QA 与 receipt 必须从同一 clean committed revision 重新构建并执行；dirty source 上的检查只能形成 nondeployable 诊断记录，提交后不得复用。M5 推荐合同当前把 Web Vitals/RUM 显式列为 M7 的独立单一生产者，并在 [`006-external-interactions.md`](requirements/006-external-interactions.md) 记录候选、字段、同意、保留与退出边界；provider-neutral 上限已确认，RUM 供应商选择与真实账户验收仍待 M7，不能把 GoatCounter 产品分析或实验室性能数据冒充生产 p75。

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
- owner 已提供个人管理的 Vercel Hobby 空项目 `project-scu6m` 与稳定 Production 域名，本地 origin 已在 013 接线；仍须核验平台内部身份、实际构建/保护配置、预览/生产授权、回滚和退出路径。尚未取得受保护预览或生产部署证据。
- 第二个首发 Collection 的方向、工作名、3+3 分配、公开顺序、Zhong Kui Featured、Liaozhai 任 2016 主/张 2011 对校路线与《促织》青柯亭单见证路线已经 Project owner 确认；四篇 claim map、本轮证据闭合、初始 4 draft Entry / 5 Source / 9 Claim / 3 Terminology 最小物化、四篇证据受限草稿、修订前锁定稿及 010 当前改动单元的人工双语审核，以及两个 Collection 对象和成员路径也已完成。010 的旧材料已失效；当前 R1 静态检查通过后退役为 reference-only，真人反馈仍为 0。012 已闭合四篇 Entry 与 Liaozhai Collection 的五组 Hero 资产和内容绑定；VB6 已闭合 Liaozhai Featured、两条 Related 编辑环与 6+2 ready，后续 owner 已批准全部 published 与六篇目标日期 2026-09-10，仍待新页面级发布候选 QA。Public Beta 上线后执行非计入样本 R2a，再建立 5–8 份核心全站可用记录与四篇各前 5–8 份可用深读，按预冻结规则可加入替补。任/张实页、现代译本和影视直接比较移出当前 MVP，未来若恢复相应范围再另行闭合。辽宁手稿、现代校记与早期抄本仍未取得，故《促织》跨见证、作者归属和首次增写判断继续阻塞；已有两个本地合集对象不降低“至少 2 个完整可发布合集”的预览门槛，研究与物化边界见 [`008-four-entry-claim-maps.md`](requirements/008-four-entry-claim-maps.md)。
- 后续正式 Entry 内容、内容状态与 M6 页面级发布候选 QA 的英文编辑、研究校对和视觉签字由谁承担；当前五组新 Hero 的资产级文化、视觉、无障碍与语言审核已经关闭。
- [`006-external-interactions.md`](requirements/006-external-interactions.md) 已把 Buttondown/Tally 条件接受为 U4 的 Newsletter/Reader Request transport 方向，并记录公开联系、美国处理/DPA 边界、持久 Respondent ID 与人工清理风险。Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过；Tally Free 账户和未发布草稿结构已由 Project owner 确认。该账户状态是用户提供的现场事实；真实 action/link、账户级条款与设置、发布、导出/删除和供应商行为仍待 U4 实证，U5 已改用 GoatCounter 官方免费托管目标，分析预算零月费；次数口径与 90 天聚合保留见 006，90 天与额外维度关闭已有 owner 截图/保存确认，实际处理/清理和真实请求待核。M7 RUM 生产者仍未选择，GoatCounter 已本地接线但默认关闭，三项服务均未启用真实写入。
- 本地化实施仍待确认的细节包括内容存储形状、localized slug、逐 locale 状态字段、简中试点之外的页面范围、`x-default`/feed 规则、切换器位置与偏好持久化，以及完整简中页面所需的字符集扩展、子集规模、逐 locale 审校与跨平台字体策略；当前英语 review 投影内少量 CJK 的工具、字符集和 cmap 门禁已经闭合。已确认的路径与语义边界见 [`005-localized-content-pilot.md`](requirements/005-localized-content-pilot.md)。
