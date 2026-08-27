# Mythic China 竞品与相邻标杆审计

## 0. 结论

Mythic China 不应和现有站点比“收录最多”或“30 秒看完”，而应占据一个更清楚的位置：

> **电影化原创视觉 + 可读的英文长文 + 逐层来源说明 + 克制、非游戏化的探索体验。**

现有站点常在广度、速度、互动、插画或资料深度中的一两项做得很好，但较少把沉浸式视觉、持续阅读和 claim/source 追溯同时做到高水平。本项目的机会不是复制任何一家，而是把它们各自最强的能力收进同一套出版系统。

设计上的直接回答是：**全站使用“中国神话传说博物馆”的现代中性文化平台母体，不为每个 Collection 创造一套功能网站；每个 Collection 可以拥有独立美术主题，Entry 则回到同一套可信阅读器。** 中国绘画、手卷、印本和文物只在具体题材与来源成立时进入美术方向，不再形成全站旧书皮肤。具体固定项、主题预算和 Collection 视觉矩阵见 [`DESIGN.md`](DESIGN.md)。

## 1. 审计方法与边界

- 审计日期：首轮 2026-08-26；补充审计 2026-08-27。
- 范围：5 个直接内容竞品、5 个相邻编辑/资料标杆、4 个第二轮当代文化平台参考，以及作为现代改编/有限气氛参考而非内容竞品的 Black Myth 官方站。
- 观察对象：首页、分类/合集结构、代表性文章、来源呈现、继续探索和商业/互动模块。
- “页面现状”只描述审计时公开页面可观察到的内容。
- “不足/风险”是 **Mythic China 项目视角下的评估**，不是对对方质量、动机或全部页面的事实断言。
- 网站会变化；M1 保留现有 URL、日期、观察和转译决策，不重抓整套竞品截图。首次真实 M4 纵切片再抽样复核来源、可访问性、响应式和桌面/移动比较；截图只作仓库外临时验收证据。

部分站点可能因地区、反自动化或临时网络条件无法稳定加载全部页面。因此本审计不会用“未在抽样页看到”推断“全站不存在”；尤其是 claim-level citation，实施前须再次抽样核查。

本审计中的“借鉴”只允许借产品功能、信息结构、编辑纪律或交互目标，不允许移植竞品的视觉皮肤。每个借鉴项都必须转译进 Mythic China 自己的三层系统：现代中性导视与功能组件、具体 Collection 的中国文化美术主题、统一的 Entry 来源/版本阅读层。无法保持中国文化范围、来源边界和共享功能系统的表面元素不采用。

## 2. 直接竞品

### 2.1 MythologyChinese

参考：[MythologyChinese 首页](https://www.mythologychinese.com/)；[Editorial Policy](https://www.mythologychinese.com/editorial-policy/)。

**观察**

- 以 Gods、Legends、Creatures、Taoist、Buddhist 等路径帮助初学者进入中国神话。
- 英文表达直接，覆盖古代文本、道教、佛教、民间传统和文学等不同来源层。
- Editorial Policy 公开作者、纠错、广告和编辑原则，明确站点是通识教育入口而非学术期刊。

**可以借鉴**

- 首页先给读者“从哪里开始”，而不是要求他们先理解完整分类学。
- 独立 Editorial Method / Corrections 页面，把可信度变成产品界面的一部分。
- 明确区分不同传统，不把“中国神话”包装成单一正典。

**不足或风险（项目评估）**

- 视觉呈现更接近常规内容站，较难形成 Mythic China 想要的电影化原创辨识度。
- 分类容易成为主导航的主要负担；内容增长后可能出现入口很多、编辑路径不够突出的情况。
- 当前抽样不足以证明其是否普遍提供逐主张引用；本项目不能据此宣称“没有引用”，而应把 claim/source 映射设为自己的明确门槛。

**本项目结论**

借用“初学者入口 + 编辑政策”，不复制常规博客式卡片瀑布流。首页第一任务仍是一张强主视觉和一个清楚故事入口。

### 2.2 Chinese Mythology Atlas

参考：[Chinese Mythology Atlas](https://mythzh.com/en/index.html)。

**观察**

- 以 Primordial、Heaven、Shan Hai、Diyu、Folk、Buddhist、Strange、Festival 等大领域组织大量对象。
- 提供搜索、随机探索和广泛的层级入口，强调从基础建立完整体系。
- 其分类方式能让读者看到中国神话并非只有一组神祇。

**可以借鉴**

- 把来源层、领域和对象类型分开思考，而不是只用一个“category”字段承担全部意义。
- Random / Surprise me 是低成本的再发现能力，可在内容量足够后测试。
- 大范围地图适合作为内部内容规划参考。

**不足或风险（项目评估）**

- 信息密度和分类深度较高，新读者可能先面对体系而不是故事。
- “完整收录”式承诺对单人项目不可持续，也容易把编辑质量让位给数量。
- 过多平级入口会削弱首页视觉叙事和重点内容。

**本项目结论**

借用其 taxonomy 思维，不采用“建完整宇宙”的产品承诺。MVP 顶部导航仍只保留 Home、Explore、Collections、About。

### 2.3 Yaopu Life

参考：[Yaopu Life 首页](https://yaopulife.com/)；[Sun Wukong 页面](https://yaopulife.com/wukong)。

**观察**

- 从 reader interest 和熟悉人物切入，覆盖 myth、zodiac、festival、bestiary 等内容。
- 使用中文名、拼音、故事钩子、系列、quiz、newsletter 和互动提示降低陌生文化的进入门槛。
- 代表性页面以较长叙述串联多个情节，强调亲近、活泼的阅读体验。

**可以借鉴**

- 先回答“为什么这个人物值得读”；术语在首次出现时自然解释，来源贴近对应主张，但都不抢在故事入口之前。
- 中文名、拼音、英文称呼形成稳定的三层身份表达。
- 系列阅读和页面末尾的轻量问题能促使读者继续探索。

**不足或风险（项目评估）**

- 多种徽章、互动、引导和内容模块同时出现时，容易让编辑层级变得忙碌。
- 抽样的 Sun Wukong 页面来源区较短，相对于叙述跨度，难以让读者逐段判断原典、文学与现代解释。
- 过于活泼的互动语言若直接套用到宗教或历史争议主题，可能削弱语境的庄重与精确。

**本项目结论**

借用情感入口和中英名称层级；把 quiz 等互动推迟到内容与读者需求被验证之后。首版用故事入口带读者进入，并让来源分层伴随相关叙事，而不是先展示术语表或来源模块。

### 2.4 MythQuick

参考：[MythQuick 首页](https://www.mythquick.com/)；[Sun Wukong 页面](https://www.mythquick.com/figure/sun-wukong)。

**观察**

- 强调 30 秒/60 秒快速理解，以视觉卡片、类别、筛选和短事实降低阅读成本。
- 使用 daily guardian、quiz、稀有度等接近收藏游戏的表达。
- 代表性人物页用 quick facts 和关键时刻快速建立记忆点。

**可以借鉴**

- 每篇开头提供 80–120 词 Quick Answer，让搜索读者立即获得价值。
- 把复杂人物拆成少量关键时刻，作为长文中的导航而非长文替代品。
- 视觉卡片适合外部社交分发。

**不足或风险（项目评估）**

- SR/SSR、guardian 和收集语法容易把文化对象游戏化，并让读者误把重要性、神圣性或史料可靠度理解成“稀有度”。
- 极短摘要很难容纳版本差异、翻译争议与来源层次。
- 卡片优先若扩展到全站，容易产生模板化、信息碎片化和视觉噪音。

**本项目结论**

只借用“快速回答”的清晰度，不采用抽卡、稀有度和全站卡牌皮肤。Quick Answer 必须通向完整故事和来源，而不是替代它们。

### 2.5 Mythopedia

参考：[Mythopedia 首页](https://mythopedia.com/)；[Chinese Mythology Guide](https://mythopedia.com/guides/chinese-mythology/)；[Chang’e](https://mythopedia.com/topics/chang-e)。

**观察**

- 覆盖多个世界神话体系，以 collections、guides、figures 和搜索组织内容。
- 跨文化统一模板让读者能从熟悉的世界神话站点进入中国神话。
- 代表性人物页将 Overview、Etymology、Attributes、Family Tree、Mythology、Pop Culture、References、Citation 和 Authors 组合成稳定解剖。
- 信息架构同时包含 name generator、D&D 等更偏工具或娱乐的入口。

**可以借鉴**

- Collection 与单个 Entity 分开建模，支持跨文章的编辑路径。
- Citation 和作者模块让文章更容易被研究者引用，也把信任信息从页尾链接提升为产品功能。
- 搜索和跨文化术语可以帮助英语读者建立参照。
- 一致的对象页结构能降低学习成本。

**不足或风险（项目评估）**

- 多世界神话与生成器/游戏工具共存，可能稀释严肃编辑内容的品牌身份。
- 统一跨文化模板容易压平中国神话内部的宗教、文学、地方传统和历史语境。
- 中国主题 guide 对专门研究者而言可能偏概览。

**本项目结论**

借用 Collection / Entry 分层和一致对象模板；以“中国文化内部差异”代替全球神话的统一字段表面。

## 3. 相邻标杆

### 3.1 Theoi Greek Mythology

参考：[Theoi Classical Texts Library](https://www.theoi.com/Library.html)；[Bibliography](https://www.theoi.com/Bibliography.html)。

**为什么相关**

Theoi 不是中国神话竞品，但它展示了如何让原典译文、作品名、作者和书目成为页面主结构，而不是页尾装饰。

**可以借鉴**

- 原典、译本和二手研究分开。
- 在正文附近给出具体作品/章节线索。
- 为需要继续研究的读者保留完整书目入口。

**不足或风险（项目评估）**

- 索引和文字密度较高，视觉沉浸、移动阅读和初学者路径不是其主要强项。
- 若直接模仿资料库布局，会牺牲 Mythic China 的叙事性和原创视觉。

**本项目结论**

采用 Theoi 的来源纪律，不采用其密集索引作为首页体验。

### 3.2 The Met Heilbrunn Timeline of Art History

参考：[Heilbrunn Timeline of Art History](https://www.metmuseum.org/essays/timeline-of-art-history)；[A New Visual Language Transmitted Across Asia](https://www.metmuseum.org/essays/a-new-visual-language-transmitted-across-asia)。

**为什么相关**

The Met 不是叙事型神话站，但其馆藏对象、专家文章与时间、地域、主题的交叉浏览，为文化内容如何保持图像出处和物质语境提供了高可信标杆。

**可以借鉴**

- 把图像当作有年代、材质、馆藏、权利状态和图注的文化对象，而不是无来源装饰。
- 时间 × 地域 × 主题适合作为内容量增长后的交叉探索维度。
- 大图与规范 metadata 并置，不让学术信息破坏视觉主次。

**不足或风险（项目评估）**

- 机构式信息架构严谨但偏冷，入口层级较深，不直接解决“我只想先读一个好故事”的需求。
- 艺术史文章不以神话叙事张力为主要目标，不能直接作为首页节奏。

**本项目结论**

借用物件级 provenance 和交叉浏览逻辑；用更有情绪的 Collection 入口承接普通读者。

### 3.3 World History Encyclopedia

参考：[World History Encyclopedia: Mythology](https://www.worldhistory.org/mythology/)。

**为什么相关**

它展示了大众知识站如何把目录、作者、编辑审核、书目、许可、翻译、相关内容和引用格式组合成完整的“信任栈”。

**可以借鉴**

- 作者身份、发布时间/更新、编辑审核和 Cite This Work 形成稳定可信度模块。
- Bibliography、License & Copyright、Translations 与 Related Content 分工明确。
- 面向大众的语气仍保留继续研究入口。

**不足或风险（项目评估）**

- 广告、募款、会员和联盟模块同时出现时，会与长文节奏和来源层级竞争。
- 模块数量很多，若直接照搬会让单篇文章在移动端显得拥挤。

**本项目结论**

借用信任模块，不复制商业密度。商业入口集中在文章尾部或明确分隔区，不能插入核心叙事和原典/版本说明之间。

### 3.4 Yokai.com

参考：[Shikigami](https://yokai.com/shikigami/)；[Tengu tsubute](https://yokai.com/tengutsubute/)。

**为什么相关**

Yokai.com 以稳定的一图一对象结构、名称/读音、属性、appearance、behavior、origin 和 legends 建立很强的一致性，是“文化异兽图鉴”最接近的相邻标杆。

**可以借鉴**

- 一个对象一张有辨识度的主图，并保持长期一致的插画语言。
- 固定字段与叙事段落并存。
- Previous / Next、字母索引和最新内容形成连续浏览。

**不足或风险（项目评估）**

- 搜索可见的抽样页中，来源说明不一定达到本项目希望的逐主张粒度；需要在 M1 再核查，不能泛化为全站结论。
- 一对象一模板若没有合集叙事，容易变成查词典而非阅读世界。

**本项目结论**

借用一致实体模板和连读机制；用 Collection 提供“为什么这些对象属于同一段故事”的编辑解释。

### 3.5 Public Domain Review

参考：[Public Domain Review](https://publicdomainreview.org/)。

**为什么相关**

它展示了高质量长文、历史图像、collections、来源意识与支持/商店之间如何共存，是“视觉文化出版物”而非神话数据库的标杆。

**可以借鉴**

- 大图、窄正文、图注和来源共同形成编辑节奏。
- Collections 由明确策展主张组织，而不是自动标签页。
- 公版素材仍记录出处，商业支持与正文来源区分。

**不足或风险（项目评估）**

- 首页同时承担 essays、collections、newsletter、support 和 shop 后，商业/订阅入口可能与阅读重点竞争。
- 它覆盖广泛公共领域文化，信息架构不能直接解决中国神话的传统分层。

**本项目结论**

借用编辑策展和商业披露纪律；MVP 不在首页叠加 shop 或赞助，Newsletter 只在全站 Footer 出现一次。

### 3.6 当代文化平台补充参考（2026-08-27）

本节是用户对 M1 “旧报纸感”反馈后的第二轮设计研究；它补充全站母体与 Collection 主题机制，不替代前述内容、来源和信任模块审计。

#### M+

参考：[M+](https://www.mplus.org.hk/en/)；[Web Design Is Visual Culture](https://www.mplus.org.hk/en/magazine/web-design-is-visual-culture/)。

- 借用现代无衬线、宽松网格、模块化页面和不同内容深度下稳定的品牌导视。
- 转译为 Mythic China 的中性 Home、固定导航/组件和可替换 Collection 视觉窗口。
- 不采用 M+ 的 Logo 动画、彩虹色带、贴纸式控件或具体页面皮肤。

#### Oculi Mundi

参考：[Oculi Mundi](https://oculi-mundi.com/)；[Q42 项目说明](https://www.q42.nl/en/work/oculimundi)。

- 借用 `Explore` 与 `Research` 两种阅读意图并存：主题游览不牺牲严肃查阅。
- MVP 转译为 Collection 上同时存在的 `Guided path` 和 `Browse all entries`，不增加复杂客户端状态。
- 不采用 3D 书册、自定义光标、漂浮卡片或把沉浸动画设为阅读前置。

#### Rijksmuseum

参考：[Rijksmuseum Collection](https://www.rijksmuseum.nl/en/collection)；[Q42 网站案例](https://www.q42.nl/en/work/rijks-website1)。

- 借用大图优先、规范 metadata、主题故事与相关对象互通。
- 转译为 Collection 强主图、Entry 统一阅读器和可追溯 caption/source 层。
- 不采用其红黑色板、票务入口、机构按钮或具体藏品画廊样式。

#### Google Arts & Culture Themes

参考：[Google Arts & Culture Themes](https://artsandculture.google.com/project)。

- 借用“同一平台、不同主题”的产品逻辑：共享导航和内容模型，主题由主图、色域和策展顺序建立。
- 不复制 Google 的卡片造型、字体、产品导航或品牌语气。

本项目采用的组合是：M+ 式现代文化平台纪律 + Oculi Mundi 的双阅读意图 + Rijksmuseum 的图像/资料互通 + Google Arts & Culture 的主题平台逻辑。它们只提供结构证据；最终页面仍须通过中国文化范围、原创视觉、来源与不仿制门禁。

## 4. 视觉参考，不是内容竞品

参考：[Black Myth: Wukong 官方网站](https://www.gamesci.cn/wukong/)；[Black Myth: Zhong Kui 官方网站](https://www.gamesci.cn/zhongkui)。

Game Science 官方站只用于记录现代改编与当代关注，并有限比较镜头、明暗、雾、材质和画面尺度；它不能作为品牌母体、传统文化来源、内容架构、长文阅读或来源系统的范本。《黑神话：钟馗》只能在钟馗 Entry 的 `Modern adaptations` 语境中出现，不得反推古代或民俗事实。项目不复制角色、虎、Logo、图片、截图、书法字、配色、镜头构图或页面源码，也不在提示词中使用 `in Black Myth style`。

## 5. 定位矩阵与机会空白

| 站点 | 主要优势 | 视觉沉浸 | 来源/语境深度 | 主要阅读模式 |
| --- | --- | --- | --- | --- |
| MythologyChinese | 初学者分类、编辑政策 | 中 | 中 | 通识浏览 |
| Chinese Mythology Atlas | 广度、体系与 taxonomy | 中 | 中 | 索引探索 |
| Yaopu Life | 亲近叙事、互动入口 | 中高 | 中 | 故事与互动 |
| MythQuick | 快速、卡片、游戏化 | 高 | 低至中 | 快速消费 |
| Mythopedia | 跨文化规模、搜索 | 中 | 中 | 百科/工具 |
| Theoi | 原典与书目纪律 | 低 | 高 | 资料查询 |
| The Met Heilbrunn Timeline | 馆藏出处、时地题交叉浏览 | 中高 | 高 | 艺术史与对象探索 |
| World History Encyclopedia | 作者/审核/许可/引用信任栈 | 中 | 高 | 大众知识长文 |
| Yokai.com | 一致插画与实体模板 | 高 | 中 | 图鉴浏览 |
| Public Domain Review | 编辑策展与历史图像 | 高 | 高 | 文化长文 |
| **Mythic China 目标** | 原创电影视觉 + 故事 + 逐层来源 | **高** | **高** | 沉浸阅读与连续探索 |

表中的“高/中/低”是相对于本项目目标的方向性判断，不是可复现的第三方评分。

## 6. 对产品与设计的直接约束

### 6.1 必须借鉴并完成品牌转译

下列条目描述要解决的功能或信息问题，不是页面造型指令。原型采用任何一项前，必须说明它如何被转译到 Mythic China 的现代文化平台母体、Collection 独立美术主题和统一 Entry 来源/版本阅读层中。

- MythologyChinese：初学者路径、Editorial Method 和纠错机制。
- Chinese Mythology Atlas：领域、对象类型与来源层分离的 taxonomy。
- Yaopu Life：故事钩子、中文名/拼音/英文名三层身份。
- MythQuick：文章开头的 Quick Answer；仅此，不继承游戏皮肤。
- Mythopedia：Collection / Entry 两层探索。
- Theoi：原典、译本和研究分区，以及正文附近的来源线索。
- The Met：图像的年代、材质、馆藏、权利状态与跨维度浏览。
- World History Encyclopedia：作者、审核、更新、许可与引用格式组成的信任模块。
- Yokai.com：稳定对象模板、主图和 Previous / Next。
- Public Domain Review：策展式合集、图注/来源与商业披露纪律。

不得复制上述站点的卡片形状、色板、字体组合、导航造型、动效签名或页面节奏；即使功能相同，最终界面也必须像 Mythic China 自己的中国文化出版物。

### 6.2 明确不采用

- 不宣称建立“完整中国神话宇宙”。
- 不使用 SR/SSR、抽卡、guardian、积分或稀有度衡量文化对象。
- 不把所有内容压缩成同尺寸卡片或 30 秒摘要。
- 不用全球神话的统一模板抹平中国内部传统差异。
- 不把来源集中到一个难以关联正文主张的页尾链接堆。
- 不用全站游戏 HUD、持续循环特效、自动声音或视频 Hero。
- 不在首页正文或每篇文章末尾重复 Newsletter；订阅只在全站 Footer 出现一次，文章正文收束后依次为完整 Sources、Related Entries 与 Reader Request。
- 不让广告、联盟或商店在 MVP 首页与核心阅读竞争。

### 6.3 M1 冻结证据与后续人工比较门禁

1. **竞品墙：** 保留上述 10 个内容/编辑站点加 Black Myth 单列的首轮决策台账，不在 M1 重抓或扩展站点数量；第二轮只补 M+、Oculi Mundi、Rijksmuseum 和 Google Arts & Culture 的系统级证据。仓库持久化日期、URL、观察、转译方式和不采用项；桌面/移动截图只作为临时或仓库外验收材料，不违反 `AGENTS.md` 的仓库材料边界。
2. **六栏目家族板：** 六个 Collection Hero 排成 3×2；通过“同一品牌、不同展厅”评审。
3. **无图测试：** 隐藏所有图片后，Mythic China 仍能凭字体、栅格、来源与组件被识别。
4. **灰度测试：** 去除颜色后，各栏目仍能凭构图和纹理区分。
5. **差异化测试：** 遮住 Logo 后，目标读者不能把原型误认成游戏启动页、普通百科或 AI 图集。
6. **可信度测试：** 读者能在 30 秒内指出“原典写了什么、后世如何变化、本站哪里是艺术演绎、来源在哪里”。
7. **转译测试：** 对每个采用的竞品能力标明“借用的功能/信息目标、进入品牌母体/Collection/Entry 哪一层、Mythic China 的转译方式、不采用的视觉皮肤”；遮住 Logo 后仍不能误认成被借鉴站点。

M1 执行记录（2026-08-27）：`prototypes/m1-review-board.html` 已把四个第二轮系统分别落实为“借用目标 → 落点 → Mythic China 转译 → 不采用皮肤”，并保留首轮台账、3×2 家族探针、无图/灰度和 30 秒可信度检查入口。用户随后明确冻结 M1 以停止继续扩展设计研究，同时指出当前页面风格仍不是目标方向；因此 M1 的比较证据交付已收口，但差异化观感和目标读者可信度不记录为用户满意或正式读者测试通过，须在首个真实纵切片复核。

## 7. 决策

MVP 的竞争策略不是先把功能做全，而是先证明三件事能同时成立：

1. Home 有清楚、现代且专注中国神话传说的品牌母体，Collection 又有足以停留且不互相换皮的原创视觉；
2. 文章页比短内容站更好读，又比资料索引更容易进入；
3. 每个重要文化陈述和视觉主张都能追到明确来源或标记为推断/演绎。

如果 M1 原型只能做到“漂亮”，没有来源层级，则没有达到产品定位；如果只能做到“资料完整”，没有视觉辨识度和连续阅读，也没有达到产品定位。
