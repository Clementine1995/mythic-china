# Mythic China 设计系统：中国神话传说博物馆

## 0. 设计结论

Mythic China 是只策展中国神话、志怪、民间传说、宗教传统与传奇人物的英语文化出版网站。`中国神话传说博物馆`（Chinese Myths & Legends Museum）是本项目的产品与设计隐喻，表示“有策展路径、来源和藏品式视觉说明的数字场馆”；它不是综合世界神话平台，也不宣称项目已经是具有实体馆藏或公共资质的博物馆。公开品牌仍使用 `Mythic China`，直至品牌名、域名与商标另行确认。

视觉模型为：**现代中性文化平台母体 + 每个 Collection 独立美术指导 + 全站统一的可信 Entry 阅读器。** 它不是黑暗游戏 UI、普通博客模板，也不是把泛黄纸张、印本边线和重衬线铺满全站的古籍仿制品。

设计参数：

- 全站：`DESIGN_VARIANCE 7 / MOTION 4 / DENSITY 3`
- 文章页：`DESIGN_VARIANCE 4 / MOTION 2 / DENSITY 3`
- 范围原则：**只展示中国文化中的神话传说及其相关文本、信仰、地域和现代接受，不扩展为世界神话博物馆。**
- 核心原则：**Home 建立统一品牌，Collection 建立不同世界，Entry 负责可信阅读。**
- 题材原则：**具体 Collection / Entry 决定可见气氛，历史媒介与馆藏只在有来源的内容语境中使用；国风不等于水墨或古籍皮肤。**
- 设计优先级：现代清晰的品牌识别、字体和导航先于栏目装饰；关闭图片后仍能认出 Mythic China，换上图片后才能认出具体 Collection。
- 媒体约束：MVP 不使用视频；首屏使用独立桌面/移动构图的高质量静态插画，加一次性、可减弱的轻量进入动效。
- 首个纵切片：`The Chinese Underworld / 中国阴间` 是第一个正式 Collection；`Zhong Kui, the Demon Queller` 是其 M1 Featured Entry 与当前关注入口。

### 0.1 成熟度与重构边界

用户已经确认“中国神话传说博物馆”的系统方向、“中国阴间 + 钟馗 Entry”的首个纵切片，并于 2026-08-27 冻结 M1 工程参考。冻结时的 M1 页面外观仍未获批准；同日后续方向比较中，用户进一步确认首个真实 Home 的概念方向“以 A 为主、C 为辅”。该选择不追认旧原型，也不批准候选方向稿为最终页面或生产资产，更不自动批准其在 Collection、Entry 或共享表现层中的延展。M3 已另行批准钟馗四个逻辑资产的五项 current 用途；终验中 Hero v1 因双手解剖缺陷被阻断，2026-08-29 定向返修并验收的 Hero v2 现为 current，Hero v1 仅保留审计历史。这些资产批准仍不批准 M4 页面接线与页面级表现。现有原型继续只作为不可发布的工程/结构基线：阅读顺序、链接、响应式与无障碍骨架可以进入后续实现参考；表现层可沿既定替换缝重做，不得改写内容、证据、稳定身份、URL 与语义合同。

仅因表现层重构不得改写内容 ID、slug、canonical URL、Schema、来源/Claim/术语关系、披露、读者语义顺序与无障碍合同；若新增编辑语义确需扩展 Schema，必须另建需求与迁移。字体、色彩值、栅格细节、页面壳层、共享组件的表现、动效实现和栏目美术资产可以在用户批准后整体替换。最小工程替换缝为：

```text
semantic tokens -> shared primitives -> page shells -> approved realm overrides
```

叙事内容文件不得保存框架类名、具体像素、断点或动画实现；响应式导出、`focalPoint` 与用途裁切只记录在 Asset Manifest，不渗入 Entry 正文。MVP 同时只维护一套活动设计系统，不建设运行时换肤器、插件式主题引擎、页面搭建器或长期并存的旧版皮肤。

## 1. Assumption

本设计把产品视为面向海外读者的中国神话传说数字馆：视觉要足以让陌生读者停下来，策展路径要帮助他们进入一个具体主题，正文要足以让他们读完并相信来源。品牌的“中国性”来自题材选择、语言、来源、策展关系与经过审核的视觉资产，不靠复制游戏角色、堆砌符号或让所有页面看成同一种古书。

## 2. 视觉来源与分工

1. **M+ 负责现代文化平台母体。** 借鉴现代无衬线、宽松网格、模块化页面和不同内容深度下仍一致的品牌导视；M+ 官方将其网站描述为由可复用模块组成并让视觉环境随内容变化。不得复制其 Logo 动画、彩虹色带和圆形贴纸控件。参考：[M+](https://www.mplus.org.hk/en/) 与 [Web Design Is Visual Culture](https://www.mplus.org.hk/en/magazine/web-design-is-visual-culture/)，访问于 2026-08-27。
2. **Google Arts & Culture 负责“同一平台，不同主题”的产品逻辑。** 全局导航、卡片/故事模型和浅色内容层保持统一，各主题由主图、主题色和策展顺序建立气氛；不得复制 Google 产品外观。参考：[Google Arts & Culture Themes](https://artsandculture.google.com/project)，访问于 2026-08-27。
3. **Oculi Mundi 负责探索与研究两种阅读意图。** 古地图在现代数字空间中获得沉浸感，同时保留可查阅的 Research 入口；MVP 只转译为“Guided path + Browse all entries”两种清晰路径，不把 3D、自定义光标或漂浮卡片作为阅读前置。参考：[Oculi Mundi](https://oculi-mundi.com/) 与 [Q42 项目说明](https://www.q42.nl/en/work/oculimundi)，访问于 2026-08-27。
4. **Rijksmuseum 负责图像优先与统一 Entry 阅读。** 借鉴大图、规范 metadata、主题故事与藏品/相关对象互通；不复制其红黑配色、票务入口和具体画廊样式。参考：[Rijksmuseum Collection](https://www.rijksmuseum.nl/en/collection) 与 [Q42 网站案例](https://www.q42.nl/en/work/rijks-website1)，访问于 2026-08-27。
5. **中国绘画、手卷、印本、文物和数字展览负责具体内容的证据与美术方向。** 南宋留白、手卷展开、雕版分区、敦煌色彩或其他历史媒介只能在对应 Collection / Entry 的时期、地域、媒介和文化语境成立时使用；它们不再形成全站可见皮肤。参考：[A Space for Brush and Ink](https://south.npm.gov.tw/english/ExhibitionsDetailE003110.aspx?Cond=e9eb8c02-412a-421f-8f39-6831aeb98dbe&State=2&appname=Exhibition3113EN)、[The Met: Chinese Handscrolls](https://www.metmuseum.org/essays/chinese-handscrolls) 与 [The Printed Image in China](https://www.metmuseum.org/exhibitions/listings/2012/printed-image-in-china)，访问于 2026-08-26。
6. **现代娱乐参考只说明当代关注和少量镜头纪律。** Apple/PlayStation/Black Myth 等可以帮助比较 UI 后退、主视觉尺度和一次性 Hero 进入，但不得成为品牌母体或文化来源；不得复制商标、书法字、专有字体、角色、图片、镜头构图、文案或源码。

## 3. My Pick

`中国神话传说博物馆` 把现代文化机构的清晰导视设为全站母体，把每个 Collection 当作拥有独立美术指导的展厅，把 Entry 统一为可读、可引用、能区分传统层次的出版页面。

明确分工：

```text
现代文化平台      -> 全站母体：导航、无衬线标题、网格、组件与中性表面
Collection 美术指导 -> 主题世界：主图、色域、光线、纹理、构图与一次 Hero 动效
中国文化来源      -> 内容依据：时期、地域、媒介、人物、器物与传统边界
统一 Entry 阅读器  -> 信任系统：正文、来源、图注、版本、引用与继续探索
```

不得复制参考品牌的商标、专有字体、角色造型、图片、文案、动效签名或页面源码。

### 当前确认：A 主、C 辅概念方向

2026-08-27，用户在三份仓库外 Home 方向稿中确认以下层级：

- **A 为主。** 首个真实 Home 以现代文化展览式的中性浅色母体、清晰无衬线导视、图片主导的非对称策展构图和克制的雕塑/装置空间感为主要方向。A 的具体候选画面不是全站固定背景或生产资产，也不得暗示 Mythic China 拥有实体场馆或馆藏。
- **C 为辅。** 首个真实 Home 可以吸收抽象雕塑、地形、路径、层叠和裁切关系作为辅助语汇；不得把 invented 地形伪装成真实古地图、神话宇宙结构或文化证据。
- **B 未被选作 Home 方向。** 该选择不新增跨页面禁令或承诺；Collection 与 Entry 继续由第 3.1–3.5 节的题材和证据合同决定，不继承候选稿的云环、山谷或整幅画面。
- A/B/C 只是本轮 Home 方向评审简称，不建立稳定 ID、运行时主题、内容字段或资产身份。三份方向稿都是仓库外探索材料；本次确认不批准其具体图片、字体、色值、响应式裁切、动效或无障碍表现，也不允许把带有页面文字和 UI 的整张概念图直接导入网站。A/C 语言是否以及如何延展到共享表现层、Collection 与 Entry，须在真实纵切片中另行设计和确认。

### 3.1 统一品牌母体 + Collection 独立主题

Collection 差异不等于为每个栏目创建一个新品牌。统一模型是：

> 同一座中国神话传说博物馆，不同主题展厅；建筑、导视、研究方法和说明牌相同，展厅的光线、材质、主图与空间节奏不同。

设计分为三层：

1. **品牌母体，版本内统一。** Logo、导航、页脚、栅格、间距、字体角色、正文参数、按钮、表单、引用、图注、图标、焦点、语义色和全局功能动效不随 Collection 改变。
2. **页面模板，按类型固定。** Home、Collection、Entry 使用各自共享模板；Explore、Search、About 等功能页始终使用中性品牌样式。
3. **Collection 美术指导，可明显变化。** 每个 Collection 可以覆盖批准的 `--realm-bg`、`--realm-surface`、`--realm-tone`、`--realm-accent` 和 `--realm-on-surface`，并指定一组已审核主视觉、一个低强度纹理、一个构图倾向、一个 Hero 动效签名，以及同一显示字体内的标题参数。

Collection 不得新增字体、导航、组件库、按钮形状、引用样式或交互模型；主题 token 不得覆盖错误、成功、警告、焦点等语义色。至少 80% 的非图片 UI 必须来自共享 token 和组件，文章页共享组件比例不低于 90%。主题通过稳定 `collectionId` 在表现层注册，不写入正文，也不建设运行时换肤器。

下表百分比是设计评审启发式，不作为自动化统计或发布阈值；可执行硬门禁是：功能 UI 不被 Collection 覆盖，主题只能使用第 3 层列出的 realm token、批准的 asset slots、一个 Hero 动效和共享字体内的 modifier。

页面的主题变化预算：

| 页面 | 主题变化量 | 变化位置 |
| --- | --- | --- |
| Home | 10%–15% | Collection 图片、短色带和小型主题标记；页面表面、导航与交互保持中性 |
| Collection | 气氛表面约 35%–45%；功能 UI 0% | Hero 最强，可延续到 1–2 个章节过渡；阅读路径和控件使用共享系统 |
| Entry / Article | 非图片 UI 不超过 10% | Lead image、Collection label、1px 主题线和可选顶部环境层；正文回到统一阅读表面 |
| Global navigation / functional UI | 0% | 完全固定 |

### 3.2 Collection 主题矩阵

这是家族板的非路线承诺视觉探针，不要求一次上线全部 Collection。只有 `The Chinese Underworld` 是已确认 Collection；其余行不建立稳定 ID、公开页面或发布承诺，必须在相应内容和来源成立后另行批准。

| Collection | 主题色域 | 纹理 | 构图倾向 | 唯一 Hero 动效 | 标题处理 |
| --- | --- | --- | --- | --- | --- |
| The Chinese Underworld | 炭黑 `#101716`、氧化玉青 `#62897f`、克制朱砂 `#b34a3f` | 石雾、受控灰烬、潮湿矿物面 | 门槛、纵深、低地平线、向下路径与深层遮挡 | 从暗部显现并向下位移不超过 2% | 同一 sans，500–600，略收紧；不用仿书法 |
| Defying Heaven | 风暴蓝灰 `#536b77` | 云气、风蚀岩层 | 向上斜线、巨大负空间、尺度对比 | 轻微上升与云层淡出 | 同一 sans，500，稍放宽 |
| Strange Tales After Dark | 烟绿 `#52675b` | 局部墨迹或夜雾，不用泛黄纸 | 偏轴、局部遮挡、画外存在感 | 局部交叉淡入，不用 glitch | 同一 sans，400–500，以断行制造不安 |
| Shan Hai Jing Field Guide | 矿物土色 `#70644f` | 地形线、岩层；有碑刻来源时才用局部拓片 | 标本图版、地图、比例关系 | 标注依次出现 | 字体不变，强化 metadata |
| Festival Myths | 漆器暖棕 `#9a5a35` | 漆面、织物或器物反光 | 环形、聚集、仪式器物 | 短节奏淡入，不做循环烟花 | 同一 sans，600，节奏略紧 |
| Mortals & Legends | 靛灰 `#596171` | 布料、木材、石面 | 平视人物、稳定地平线、人与环境并重 | 接近静态的人物显影 | 同一 sans，400–500，字号最多缩小 10% |

每个 Collection 只有一套已批准 realm token、一个 texture、一个构图签名、一个 Hero 动效和一个标题 modifier。纹理 opacity 为 1%–3%，不得放在长文正文后方；Collection Hero 以外的主题色只用于环境表面、主题线和小型标签，不重新设计功能组件。

### 3.3 首个 Collection：The Chinese Underworld / 中国阴间

- 稳定身份：`collectionId: chinese-underworld`，公开标题 `The Chinese Underworld`，中文身份 `中国阴间 · Zhōngguó yīnjiān`。
- 编辑范围：讲述亡魂旅程、审判与轮回、鬼魂、引路者、护卫者、地方/文学/宗教版本及现代改编；必须表现为多个时期和传统的叠加，不画成一张自古固定、全中国通用的组织图。亚洲艺术博物馆也将亚洲阴间呈现为从入口到逃离的旅程，并强调严肃、怪诞与幽默可以并存。参考：[Hell: Arts of Asian Underworlds](https://exhibitions.asianart.org/exhibitions/hell-arts-of-asian-underworlds/)，访问于 2026-08-27。
- 页面气氛：炭黑空间、冷玉色层次、少量朱砂主题/视觉强调；门、雾、远近景与向下路径建立纵深。不得把全站或全部正文做成黑红 HUD，也不得让刑罚奇观取代文化说明。
- Collection Hero 表现阴间的入口、旅程或多层空间，不以巨幅钟馗肖像定义整个 Collection；钟馗的角色主图属于其 Entry。
- 阅读路径：Collection 可以把 `A Guide to Chinese Underworld Traditions` 作为导览起点，同时把钟馗作为首屏 Featured Story；“重点推荐”不等于“阴间统治者”或“阅读路径中的最高层级”。
- M1 Featured Entry：`entryId: zhong-kui`，标题 `Zhong Kui, the Demon Queller`。`At the Threshold` 是本站策展路径标签，不是历史官职或跨传统共同分类。The Met 的馆藏记录支持 `Demon Queller`；本站据此把钟馗作为驱鬼形象纳入鬼神叙事，但不把他描述为十王之一、固定阴司官员或整个阴间的统治者。参考：[The Met: Demon queller Zhong Kui with demons](https://www.metmuseum.org/art/collection/search/75262) 与用于区分十王审判体系的 [Columbia: Ten Magistrates of the Underworld](https://afe.easia.columbia.edu/cosmos/prb/underworld.htm)，访问于 2026-08-27；The Met 对象标题已于 2026-08-28 在 M3-U2 重新核对。
- 现代接受：可在 Entry 中设置明确的 `Modern adaptations` 段落，说明读者为何在 2026 年关注钟馗；Game Science 的官网和 2026-08-20 官方实机演示只作为现代改编/关注证据，不支撑古代事实。不得复制或仿制该游戏的 Logo、书法标题、角色与虎的具体造型、角色—虎组合、截图、配色、镜头或源码；这不等于全面禁止历史材料中的“钟馗骑虎”母题。若后续采用该母题，必须先建立能支撑具体时期/传统的 Source/Claim 和新版 visual brief，不得以游戏呈现或传闻代替证据。参考：[Black Myth: Zhong Kui](https://www.gamesci.cn/zhongkui/) 与 [官方实机演示](https://www.bilibili.com/video/BV1kS8H6VERt/)，访问于 2026-08-27。

### 3.4 历史视觉参考边界

每份 Hero 或公开插图 brief 必须包含下列字段；字段未完成时不得进入批量制作：

```text
primary_reference_family
reference_period
reference_region
reference_medium
cultural_context
source_url
rights
evidence_state: verified | inferred | invented
excluded_motifs
```

- 一张主视觉只设一个 `primary reference family`。跨时代借用仅限留白、线条、图文节奏等抽象原则；服饰、建筑、宗教符号、法器、纹样和仪式场景必须分别有来源。
- 不把南宋一角式构图、敦煌佛教壁画、清代宫廷边饰和道教符箓拼成泛化“中国风”。莫高窟是西北丝路上跨四至十四世纪的佛教石窟群，其矿物色与宗教图像只能用于语境相符的内容。参考：[Getty Conservation Institute: Mogao Grottoes](https://www.getty.edu/projects/wall-paintings-conservation-mogao-grottoes/project-background-objectives/)，访问于 2026-08-26。
- 敦煌材料包含纸、丝、木、卷轴、册页、经折装以及多语言、多宗教文献，不能被简化成一种纸纹或一个朝代的风格。参考：[International Dunhuang Programme: Manuscripts](https://idp.bl.uk/discover/collection-categories/manuscripts/)，访问于 2026-08-26。
- 拓片只用于确有碑刻、器物铭文或拓片来源的局部图版，不作为通用 grunge。印章只表示 Mythic China 编辑身份、真实作者/收藏信息或出处层，不在历史图像上添加伪作者、伪收藏印。
- `evidence_state` 描述视觉元素的 `verified / inferred / invented` 证据状态；ComfyUI 只是执行辅助，不能把 `inferred` 或 `invented` 提升为文化事实。

### 3.5 题材优先与媒介中立

- 每个 Collection / Entry 先写清具体题材、传统层、时期/地域、情绪和证据边界，再选择摄影感插画、版画、纸层、石面、矿物色、水墨或其他媒介；“国风”本身不是 visual brief。
- 水墨只在题材与参考依据适合时作为可选媒介，不是全站默认皮肤。不得因使用某个 Skill 而把不相干的页面统一改成水墨、zine 或仙侠巨构。
- 外部 Skill 与内置工具的许可证、采用级别和限制见 [`REFERENCES.md`](REFERENCES.md)；工具只执行已批准的方向，不参与定义文化事实或品牌母体。
- 当前冻结的 M1 Entry 以钟馗为题材，必须遵守第 3.3 节的内容与权利边界；其炭黑、冷玉、石雾和门槛纵深只是一版 `The Chinese Underworld` 主题工程参考，不是获批的生产皮肤或全站默认视觉。具体人物、建筑、服饰、法器、鬼魂与宗教符号仍须逐项有来源。

## 4. 品牌感受

关键词：

- mysterious, not obscure
- cinematic, not game-like
- scholarly, not academic-looking
- tactile, not ornamental
- restrained, not empty

用户第一感受应是“进入一座专门讲中国神话传说、且知道每件展品来自哪里的数字馆”，而不是“打开一个游戏菜单”“翻看旧报纸”或“浏览一个 AI 图片站”。

## 5. Design Tokens

### 5.1 Color

```css
:root {
  --canvas: #f4f5f3;
  --surface: #ffffff;
  --surface-muted: #e9ecea;
  --ink: #101315;
  --muted: #5c6267;
  --rule: #d8dcda;
  --brand-accent: #9f3f36;
  --interactive: #173f55;
  --focus: #1f6f9b;

  --realm-bg: #101716;
  --realm-surface: #182421;
  --realm-tone: #62897f;
  --realm-accent: #b34a3f;
  --realm-on-surface: #f2f3ef;
  --realm-tone-soft: color-mix(in srgb, var(--realm-tone) 10%, var(--surface));

  --scrim: rgb(8 9 10 / 62%);
}
```

- `--canvas` 与 `--surface` 是现代中性场馆表面，不命名或呈现为纸张；全站不使用纸纤维、泛黄、褐色污迹、印刷套色偏移或持续 grain。
- `--brand-accent` 只用于少数品牌时刻，不伪装成历史印章，也不承担错误、成功、警告或焦点语义。
- 按钮、链接和焦点主要使用高对比的 `--interactive` / surface 组合；焦点及其他语义色不随 Collection 改变。
- Realm-specific CSS 只能覆盖批准的 `--realm-*` token，不得散落 raw hex，也不得改变共享组件结构。
- 首页同时展示多个 Collection 时，realm 色只出现在图片、短色带或小型标记内；全页表面保持中性。
- 石青、石绿、朱砂、赭石等名称只表示受具体文物启发的数字方向，不宣称 CSS 色值等于历史颜料。实际使用前仍须逐组合检查对比度和色觉可辨性。
- Entry 正文默认使用 `--surface` / `--ink`；Collection 可以由主题 Hero 在一个明确边界切换至统一阅读表面，但单页不得反复黑白翻转。
- 所有实际前景/背景组合必须通过 WCAG 对比检查；不能只凭 token 名判断。

### 5.2 Typography

字体是全站一致性的核心资产，也是消除“旧报纸感”的首要门禁。首版采用“现代 sans 建立场馆与标题，克制 serif 只承担长文与原典”的组合：

- **Geist Sans**：英文 Display、H1/H2、导航、metadata、按钮与拼音；当前 UI/标题按变量轴使用 400–650 的连续权重，Hero 仍限制为 400–600，不使用全大写宽字距制造机构感。
- **Source Serif 4**：英文长文、引文与原典/译文片段；正文 400，真实 Italic。它不再承担 Hero、Article H1 或全站章节标题。
- **Source Han Sans SC/TC**：中文名称、中文显示标题和未来中文 UI；首个纵切片已按核定的 Hans/Hant 输入分别制作 400/500/600 静态子集，具体页面观感仍须浏览器与跨平台验收。
- **Source Han Serif SC**：仅作为未来有语义的短中文引文、古籍名或原文对照候选；当前未落库，不计入现有 10 份 WOFF2，也不得扩展成全站中文皮肤。

当前稳定 inventory 为 4 份上游未修改英文 WOFF2 与 6 份具备 OFL/RFN/FONTLOG、精确字符集和 cmap 门禁的 CJK 派生 WOFF2。该静态资产链不等于页面级正式字体判断；慢加载、macOS/iOS/Android fallback、开发者工具逐字形命中和真实 200% 缩放仍属于 M4-U5 候选预检。

字体家族及角色不得随 Collection 变化。Collection Hero 只允许在同一 sans 中改变 weight、tracking、断行与对齐；Article H1、正文、来源和图注完全固定。禁止伪书法字体、中文合成斜体、伪粗体和把历史题签当作可访问 HTML 标题。

层级：

| Token | Desktop | Mobile | 用途 |
| --- | --- | --- | --- |
| Display Hero | `clamp(64px, 8vw, 112px)` / 0.95–1.0 | 48–64px | 首页/专题封面唯一标题 |
| Article H1 | 48–72px / 1.02 | 38–48px | 文章标题 |
| Section H2 | 32–44px / 1.15 | 28–34px | 章节标题 |
| Dek | 22–28px / 1.45 | 20–23px | 导语 |
| Body | 20px / 1.72 | 18px / 1.7 | 英文长文 |
| Metadata | 13–14px / 1.5 | 13–14px | 类型、日期、来源标签 |
| Caption | 14–15px / 1.55 | 14px | 图注、来源、披露 |

- 正文 measure 上限 `68ch`；长文不可用全屏宽度。
- sans 用于品牌、显示标题、章节标题、导航、metadata、按钮和结构标签；serif 只用于长文叙事、引文与文本证据。
- 中文名、拼音、英文标题拆成独立语义元素；中文名使用 `lang="zh-Hans"`，拼音保留声调与正常大小写，不塞进图片或使用全大写宽字距。
- 公开正文默认横排。竖排只允许用于桌面端 4–8 个汉字的短题签或边注，移动端回到横排；英文与拼音不得旋转成伪竖排。
- 简体、繁体与排版区域是不同维度：现代简体中文名用 `lang="zh-Hans"`；保留原貌的繁体引文按来源使用 `lang="zh-Hant"`，必要时进一步记录地区。标点、行首行尾禁则和中西混排遵循对应区域，而不是仅靠换字体处理。W3C 指出中文排版的地区差异往往大于繁简差异。参考：[W3C 中文排版需求](https://www.w3.org/TR/clreq/)，访问于 2026-08-26。
- 中文典籍连同书名号放在中文元素内，例如 `《山海经》`；内容统一为 NFC Unicode normalization。
- 全局设置 `font-synthesis: none`。当前 Source Serif 4 落库为无 `opsz` 轴的 static text faces，不声明 `font-optical-sizing: auto`；未来只有切换到经审校的 optical/variable face 后才按真实轴启用。
- Hero weight 仅在 400–600 之间；tracking 仅在 `-0.03em` 至 `0.04em`；字号偏离品牌基准最多 ±10%。

建议 fallback 按语言与角色分离。页面、模板和组件只消费稳定角色 token；具体上游字体通过独立 `@font-face` 文件映射为项目内部 CSS family alias：

```css
--font-display: "Mythic Display", Inter, ui-sans-serif, system-ui, "Segoe UI", sans-serif;
--font-story: "Mythic Story", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
--font-zh-display: system-ui, sans-serif;
--font-zh-hans-display: "Mythic Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", sans-serif;
--font-zh-hant-display: "Mythic Han Sans TC", "Noto Sans CJK TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
--font-zh-text: "Mythic Han Serif", "Noto Serif CJK SC", "Songti SC", STSong, SimSun, serif;
```

`Mythic Display` / `Mythic Story` 是 CSS 映射层，不是对未修改上游字体二进制的改名声明；Adobe Source 系一旦实际子集化、实例化或转换，仍按 OFL RFN 要求在字体内部使用不含 `Source` 的衍生家族名。上游替换只能修改字体资产、许可证/来源记录、`font-assets.json` role/alias/registry 映射、独立 `@font-face` 和经实测的 metrics override；不得修改页面模板、内容、Collection 主题、组件 API 或字体门禁代码。业务 CSS 不得出现 Geist、Source Serif 或 Source Han 的具体 family 名。

加载规则：

- 自托管 WOFF2，不让用户浏览器运行时请求 Google Fonts 或其他字体 CDN。
- 所有页面只 preload display Roman；Article 路由再按需要 preload story Roman 400，Semibold 与真实使用的 Italic 按命中延后加载。preload URL 只能从中央 registry 取得，不得在模板硬编码具体上游文件名。
- 不 preload 完整 CJK 变量字体。当前 SC required 为 65 个码位、TC required 为 36 个码位，分别覆盖已批准真实内容、冻结样张字符和 14 个中文标点；`测`/`測` 作为 fallback-only probe 明确排除。六份静态 WOFF2 使用窄 `unicode-range` 按命中加载，默认构建把实际 HTML 字符、批准集合与源/产物 cmap 相互比较；新增字符必须先更新并审校字符输入，不得靠粗放 `U+4E00-9FFF` 或静默 system fallback 掩盖。
- Source 系列许可证包含 Reserved Font Name；如果实际修改或子集化字体，必须按 OFL 重命名衍生字体、保存版本、来源、校验值与许可证。
- 使用 `font-display: swap`；字体确定后实测 `size-adjust` 和各 metrics override，不凭经验填写。

#### 5.2.1 字体验收样张

M1 必须建立一个独立样张页面，而不是只在首页看两个标题。至少覆盖：

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789 1IlO0
“ ” ‘ ’ ' — – - … · / & @ % ( ) [ ] 《 》 〈 〉 ： ；

ā á ǎ à ē é ě è ī í ǐ ì ō ó ǒ ò ū ú ǔ ù
ǖ ǘ ǚ ǜ ü ê
Ā Á Ǎ À Ē É Ě È Ī Í Ǐ Ì Ō Ó Ǒ Ò Ū Ú Ǔ Ù
Ǖ Ǘ Ǚ Ǜ Ü Ê

Nǚwā 女娲 · Lǚ Dòngbīn 吕洞宾 · Cháng’é 嫦娥
Fēngdū 酆都 · Yánluó Wáng 阎罗王 · Mèng Pó 孟婆
Zhōng Kuí 钟馗 · Hēibái Wúcháng 黑白无常
饕餮 夔 獬豸 狴犴 梼杌 穷奇 颛顼 帝喾 鲲鹏
《山海经》《搜神记》《聊斋志异》
```

M1 冻结要求样张结构、上述字符覆盖、字号层级和当前 Windows 环境的 system fallback 检查有记录。正式自托管 WOFF2 与 CJK 字符/子集/cmap 静态门禁现已建立；正常/禁用/慢速字体加载、Windows/macOS/iOS/Android 实机 fallback、开发者工具实际命中字形与浏览器真实 200% 缩放仍属于首个真实纵切片进入批量页面/插画制作前的生产字体门禁。未执行项必须保留为未验证，不能由静态 cmap 或 M1 fallback 结果替代。

### 5.3 Spacing, Grid and Shape

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  --radius-media: 2px;
  --radius-panel: 6px;
  --radius-control: 4px;
  --radius-pill: 999px;
  --container: 1440px;
  --measure: 68ch;
}
```

- 桌面 12 栏、平板 6 栏、手机 4 栏。
- gutter：桌面 32px、平板 24px、手机 16px。
- section 间距：桌面 96–160px，手机 64–96px。
- 主视觉保持接近方正的边界，不用大圆角“卡片化”。功能面板最多 6px 圆角；pill 只给状态或筛选，不作为所有链接的默认外形。
- 卡片默认无阴影；层级靠表面、留白、有限分隔和图片完成。连续 hairline、密集分栏和每段都加边框视为旧印本残留，不采用。

## 6. 页面结构

### 6.1 Global Navigation

- 高度 64–72px，桌面单行。
- 左侧品牌，中心或右侧仅 Home / Explore / Collections / About 与 Search（进入阶段后）。
- 桌面导航叠在 hero 上时必须有可靠对比，不允许随不同图片失效。
- 移动端使用原生、可键盘操作的菜单；菜单关闭后正确返回焦点。
- 当前导航只有英语，不存在语言切换。未来简中试点只能在当前页面存在真实、已通过对应 locale 门禁的 counterpart 时显示显式的普通语言链接；具体文案留到实施批次，缺少对页时省略，不显示死链、禁用占位或英文静默 fallback。
- 每个公开页面只有一个主要 locale，正文与导航保持同一语言；默认不以双栏或上下重复方式同时渲染中英文全文。若未来验证出专门的对照阅读需求，另立交互需求，不塞入首个试点。
- URL locale 段使用小写 `/zh-hans/` 或未来 `/zh-hant/`；页面语义使用规范的 `lang="en"`、`lang="zh-Hans"` 或 `lang="zh-Hant"`。切换器的精确位置、文案与偏好持久化留到实施批次，且不得因此引入强制重定向或阅读所必需的客户端 JavaScript。

### 6.2 Home

1. **Contemporary Image-Led Hero**：文案占 4–5 栏，主题图像占 7–8 栏；标题、dek 和一个主 CTA 在首屏内。Home 的 canvas、导航和控件保持中性，即使首期主推中国阴间也不整页继承其暗色主题。
2. **Explore Collections**：采用 1 大 2 小或其他受控非对称图片编排，不使用三张等宽模板卡。每张图可以呈现不同 Collection 气氛，但标题、间距和交互完全统一。
3. **Featured Story**：M1 使用 `Zhong Kui, the Demon Queller` 作为当前关注入口；最多一个轻量 sticky chapter，没有足够内容时使用普通编辑分区。
4. **Latest Entries**：编辑型列表与大图穿插，不把所有内容做成同尺寸卡片。
5. **Global Footer Newsletter**：订阅只在全站 Footer 出现一次，以清楚的用途、频率和数据说明收束；首页正文不重复订阅模块。Reader Request 属于具体 Entry 的反馈入口，不放在首页 Footer 冒充订阅。

Home 是所有 Collection 的中性宿主，不是第一期“中国阴间”的落地页，也不是多套主题的拼贴。页面表面、栅格、标题位置、卡片结构和 hover 行为固定；差异由图片构图、小型主题标记和受控色带承担。所有缩略图遵守同一对比、清晰度、caption、权利和色彩管理基线，但不强制套用同一种复古调色。

### 6.3 Collection

- 首屏说明该合集的编辑主张、范围、传统边界和阅读顺序。
- 同时提供 `Guided path` 与 `Browse all entries`；它们可以是普通链接/列表，不需要模式切换器或客户端状态。
- 置顶一个 Featured Story，其余采用章节或路径列表。`The Chinese Underworld` 的 M1 Featured Story 为 `Zhong Kui, the Demon Queller`，体系导览仍可作为 Guided path 的第一步。
- 同时显示“为什么把这些内容放在一起”，避免仅按标签堆文章。
- 商业阶段的 sponsor 只允许位于合集导语之后的独立披露区，不占据主标题。
- Collection Hero 是主题个性最强的舞台；主题可延续到 1–2 个章节过渡，但 Hero 以下的阅读路径、来源格式、相关内容和反馈组件必须回到统一系统。
- Collection 使用同一内容结构和 Hero slot，但可以依据自己的 primary reference family 设计独立构图；不得因此创造另一套导航、页面框架或功能组件。

### 6.4 Entry / Article

```text
Eyebrow / 中文名 / 拼音
H1 + dek
3:2 lead image + caption + disclosure
Quick answer
类型 / 时期 / 核查日期（轻量 metadata）
Story body
What the text says
Later traditions / versions
Our interpretation
Why it matters
Sources
Related entries
Reader request
```

- 主体占 8 栏，正文约 680–760px；右侧 3 栏可放目录和 source notes。
- 每 600–900 词安排一个视觉节拍，但不为了插图打断论证。
- `What the text says / Later traditions / Our interpretation` 使用排版和细线区分，不使用满页彩色 callout。
- 来源、caption 和 AI disclosure 在图外作为 HTML 文本，不烧录进图片；轻量 source note 贴近对应主张，完整 Sources 在正文收束后集中列出。
- 文章正文统一使用中性 surface/ink、固定字体与固定 measure；Collection 差异只留在 lead image、标签、1px 主题线和可选顶部环境层。
- M1 Entry 为 `Zhong Kui, the Demon Queller`，必须把传统材料、后世版本、本站解释和现代改编分开；Black Myth 只能出现在明确的现代改编语境中。
- 文章正文收束后依次为完整 Sources、Related Entries 与 Reader Request；不在每篇文章末尾重复 newsletter，订阅入口统一由全站 Footer 承担。

### 6.5 Explore

- MVP 使用类型与主题链接，不做复杂多维筛选器。
- 内容达到触发条件后再增加 Pagefind 搜索和静态 filters。
- 筛选状态不能只用颜色表达；URL 可以分享和返回。

## 7. Image Art Direction

### 7.1 尺寸与比例

| 用途 | Master | 说明 |
| --- | --- | --- |
| Hero desktop | 3200×1800，16:9 | 按目标页面 brief 为文案与焦点保留安全区 |
| Hero mobile | 1600×2000，4:5 | 独立构图，不机械裁剪桌面图 |
| Article lead / scene | 2400×1600，3:2 | 文章默认主图 |
| Cinematic scene | 2560×1440，16:9 | 专题或章节横幅 |
| Character portrait | 2048×2560，4:5 | 人物页与静态分发 |
| Inline detail | 2000×1500，4:3 | 器物、建筑、局部叙事 |
| Content card | 1600×1280，5:4 | 站内列表 |
| Open Graph | 1200×630 | 标题后期 HTML/图形排版 |
| Social portrait | 1080×1350 | 静态图卡 |
| Social story | 1080×1920 | 静态竖版，不要求视频 |

Web 导出优先 AVIF + WebP，目标宽度 640 / 960 / 1440 / 1920；具体压缩目标根据画面复杂度验证，不用单一质量参数覆盖所有图。

### 7.2 视觉语法

- Hero 必须提供可读标题所需的真实安静空间，但不强制所有 Collection 使用一角式构图或固定 38%–45% 留白。人物位置、远近关系、色域和光线由该 Collection 的构图合同及具体资产 `focalPoint` 决定。
- 长页按现代策展路径组织：名称、故事问题与 Quick Answer 开场，核心故事展开，原典依据、后世版本与本站解释依次深化，完整 Sources、Related Entries 与 Reader Request 收束；来源标记仍贴近对应主张。手卷“由读者控制前进”的原则可以指导节奏，但页面不模拟卷轴、题跋、卷轴把手或古书翻页。
- 文章使用稳定 measure、清晰标题、有限分隔、图注和 source notes 建立证据层级；不以密集 hairline、版心框、题签、假缝线、虫蛀、烧边或泛黄制造历史感。
- 真实材质、低调光、雾和空间层次只服务于具体 Collection / Entry；用镜头、人物尺度和负空间形成戏剧性，不用 UI 粒子、发光边框和“游戏技能特效”。
- 历史服饰、器物、建筑与符号依据来源；不确定元素记录为 `inferred` 或 `invented`。
- 生成图不包含文字、伪汉字、Logo 或现代游戏 UI。

### 7.3 Collection 主题环境（非阻断视觉完善项）

- Collection 与 Entry 开场可以使用一张连续主题场景，或 1–2 个相互衔接的静态环境节拍，把 Hero 气氛延伸到章节过渡；Home 不继承任一 Collection 的整页环境。
- 背景只能位于正文 measure 外侧、Hero 或章节过渡区。680–760px 正文栏必须保持高不透明度、高对比的中性 reading surface，不让复杂图案直接垫在长段文字后方。
- 背景不得承担唯一事实信息。含具体人物、建筑、服饰、器物或宗教符号时，必须拥有 visual brief、asset manifest、权利与文化审核；纯氛围背景标为 `invented` / `decorative`，使用空 alt，并在页面级 visual note 中提供适用的 credit 与 AI disclosure。
- 桌面与移动分别构图和导出；低性能、图片失败、无 JavaScript 与 `prefers-reduced-motion` 条件下退化为静态色面/纹理，不影响内容、导航和 Sources。
- 不使用 `background-attachment: fixed`、无限循环烟雾或大图滤镜重绘。整页背景不足不阻断 Schema、阅读链与基础功能，完成时间由后续 M4/M6 视觉验收决定。

## 8. Motion

```css
:root {
  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --fast: 160ms;
  --medium: 360ms;
  --reveal: 720ms;
}
```

- Hero：`scale(1.03) -> 1` + opacity，720–900ms；不能持续循环。
- 全站文档跳转保持普通链接语义；若使用渐进增强的页面过渡，只允许 160–240ms opacity 与极轻位移，并在不支持、禁用 JavaScript 或 reduced motion 时直接导航。
- 标题分层进入间隔不超过 60ms，正文不延迟出现。
- 统一的功能动效包括阅读进度、目录当前位置、章节标题/分隔线的单次揭示，以及 source ref 跳转后的来源定位反馈；这些行为全站一致，不随栏目更换动画库或交互模型。
- Collection 主题环境可有一次性揭示或最大 2%–4% 的轻微位移，但必须服务于“进入主题空间/章节转换”，不能成为持续装饰；中国阴间只使用一次门槛/纵深显现或薄雾分层。
- 普通 hover / press 约 160ms，只动画 `transform` 和 `opacity`。
- 视差最大位移为图片高度的 2%–4%。
- 全站最多一个 pinned story 段；不做横向 scroll hijack、自定义鼠标、无限粒子和自动声音。
- 在 `prefers-reduced-motion: reduce` 下取消 parallax、pin、stagger 和非必要过渡，页面布局不能变化。
- 所有正文和来源默认可见；动效只能渐进增强，不能先用 CSS 隐藏内容再依赖 JavaScript 才显示。
- 全站母体不使用 grain。若某个 Collection 的 visual brief 批准颗粒/纹理，只能是 Hero 或章节环境中的单层静态资产，并在 reduced motion 与图片失败时安全移除。

## 9. Accessibility Hard Constraints

- 目标为 WCAG 2.2 AA；正文普通文本对比至少 4.5:1，大文本至少 3:1。来源：[W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)，访问于 2026-08-26。
- 项目触控目标统一至少 44×44 CSS px，作为高于最低标准的内部设计目标。
- 提供 skip link、清晰语义标题、DOM 阅读顺序、可见 2px focus 和键盘菜单。
- 焦点不能被 sticky nav 或浮层遮挡；WCAG 2.2 新增了 Focus Not Obscured 与 Target Size 等标准。来源：[W3C: What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)，访问于 2026-08-26。
- 信息不能只靠颜色、位置或动画表达。
- 有信息的图片写具体 alt；纯氛围图使用空 alt；图注、来源和 AI disclosure 置于图外。
- 生成图不得承担唯一关键信息，也不得烧录正文文字。
- 核心内容在 JavaScript 失败、动画禁用和图片未加载时仍可理解。

## 10. Performance Guardrails

- LCP hero 独立移动构图、预加载/高优先级；其他图片默认 lazy-load。
- 所有图片预留 width/height 或 aspect-ratio，避免布局跳动。
- Hero 不使用视频，目标文件大小在实际原型中按 4G 与中端手机测试。
- 只为真实交互加载客户端 JavaScript；阅读、来源和导航使用静态 HTML。
- 字体做子集和合理 fallback，避免为少量中文名加载完整大字体而阻塞首屏。
- Sticky、parallax 和 Collection 环境层必须在移动设备上做性能审查，不以桌面流畅替代移动验收。

## 11. Do / Don't

### Do

- 一屏一个主视觉重点。
- Home 现代中性、Collection 大胆、Entry 正文克制。
- 让来源、图注和版本差异成为视觉系统的一部分。
- 用现代中性文化平台建立品牌，以具体中国神话传说主题和有出处的资产建立各 Collection 的独立世界。
- 桌面和移动分别策划主体位置与文字负空间。

### Don't

- 不做全站暗色、发光、磨砂玻璃和游戏 HUD。
- 不使用全站米黄纸面、纸纤维、褐色做旧、密集分隔线和重衬线标题来制造“文化感”。
- 不用三张等宽圆角卡贯穿所有区块。
- 不把“书法字 + 红黑 + 云雾”当作完整中国风。
- 不混搭不同时期、地域、媒介和宗教的具体符号来制造泛化“中国风”。
- 不把卷轴、经折装、蝴蝶装、线装和拓片混成同一种古籍皮肤。
- 不在每个区块添加滚动特效。
- 不复制黑神话角色设计或用 `in Black Myth style` 作为提示词。
- 不直接采用 Apple/WIRED 专有字体和商标性细节。
- 不为栏目新增字体、导航、CTA、ArticleBody、SourceNote、圆角、图标或动画库。
- 不让“中国阴间”暗色主题成为 Home 或其他 Collection 的默认皮肤。
- 不为 Collection 创建独立功能壳层；允许它们拥有独立主图、色域、环境、构图和一个标志性动效。

## 12. 设计验收

本节清单继续作为目标设计验收合同。M1 冻结只确认现有中性 Home、`The Chinese Underworld` Collection、`Zhong Kui, the Demon Queller` Entry、六个 Collection Hero 家族探针和字体验收页足以作为工程参考，不表示本节全部通过；工程检查结果、人工未验证项和用户视觉未通过必须分开记录。首次真实纵切片仍须在 390px、768px、1440px 检查：

- 首屏主次、导航和 CTA 是否清楚。
- 正文 measure、字号、行高和来源层级是否舒适。
- 静态图在不同裁切下是否保留主体和文字负空间。
- 键盘、focus、reduced motion、对比与触控目标是否通过。
- 关闭 JavaScript 后内容与导航是否可读。
- 页面是否有参考品牌的直接复制痕迹。
- 页面是否呈现现代、清洁的中国神话传说文化平台，而不是旧报纸、泛黄古籍、历史博客或 Apple/WIRED/Black Myth 的表面皮肤。
- 页面品牌、`<title>`、SEO 文案与 structured data 是否仍声明为 `Mythic China` 的 `WebSite` / `Article` 等实际类型；在运营实体与资质未确认前，不使用 `Museum` 类型、不声称实体馆藏或机构身份。
- 每张主视觉是否记录 period、region、medium、context、source、rights、证据状态与 excluded motifs；是否只设一个 primary reference family。
- 六个 Collection Hero 视觉探针排成 3×2 时，是否像同一品牌的不同展厅，而不是六个网站；除中国阴间外不得据此建立稳定 ID 或路线承诺。
- 六个 Collection 是否拥有不同美术语言，而不是同一纸面模板只换颜色；Home 是否仍保持中性，没有被中国阴间主题占领。
- 去掉所有图片后，导航、栅格、字体、按钮和节奏是否仍能识别为 Mythic China。
- 转为灰度后，栏目能否通过构图与纹理区分，而不只依赖颜色。
- 首页是否仍是一个完整出版物页面，而非六种主题皮肤拼贴。
- Realm-specific CSS 是否只覆盖 `--realm-*`；是否出现栏目专属字体、功能组件或 raw hex。
- 字体验收页是否覆盖中文、英文、拼音、困难字形、慢加载、fallback 与 200% 缩放。
- Newsletter 是否只在全站 Footer 出现一次；Entry 正文收束后是否依次为 Sources、Related Entries 与 Reader Request。
- Collection 主题环境是否贴合具体题材、保留中性安静的 Entry 阅读表面、拥有桌面/移动降级，并在隐藏背景后仍保持完整阅读与来源链。
- `The Chinese Underworld` 是否表现整个主题世界而非一张钟馗角色海报；钟馗是否被准确标为边界上的驱鬼/护佑人物而非阴间统治者；现代游戏是否只出现在 Modern adaptations 语境。
- M1 冻结仅确认工程参考基线和后续替换边界，不代表视觉批准或生产视觉终稿；首个真实 Home、Collection、Entry 纵切片完成后必须用同一内容在 390px、768px、1440px 再次复核。若未通过 [`COMPETITIVE_AUDIT.md`](COMPETITIVE_AUDIT.md) 第 6.3 节的比较证据、本节验收或用户人工视觉确认，先重构共享表现层，再批量制作页面和插画。
- 外部 Skill 或竞品方案只能产生候选方向；不得把其类名、组件树、默认框架或视觉皮肤写成项目长期合同，也不能绕过上述复核门。

以下仍是后续视觉批准标准，不是当前 M1 已达到的事实：

- 六个 Collection 只是同一纸面、同一构图换颜色：变化不足。
- 六个 Collection 分别拥有不同导航、字体和控件，像六个网站：变化过度。
- 去掉图片仍能认出同一个现代 Mythic China，换上图片又能认出具体 Collection：平衡正确。

### 12.1 M1 冻结记录（2026-08-27）

- 用户为结束长期停留在 M1 的探索循环，明确决定冻结当前原型，同时明确说明页面风格仍不是其想要的方向。因此本次冻结是带设计保留意见的工程参考基线接受，不是“视觉满意”或生产视觉终稿批准。
- 本次可继承的是页面职责、Home → Collection → Entry 真实链路、Entry 语义阅读顺序、来源与现代改编边界、响应式断点、渐进增强和无障碍骨架；未来应用不得把当前独立 HTML/CSS 整份复制为永久表现层，也不得把当前图片、排版或色彩当作不可更换的品牌资产。
- 2026-08-27 冻结现场实际完成了核心三页 390/768/1440px、链接与历史、锚点与焦点回归、Escape、对比与触控目标、无图/灰度、system fallback、等效窄视口放大、控制台和本地资源检查。真实 Tab/Shift+Tab/Enter 全链、操作系统 `prefers-reduced-motion`、禁用 JavaScript、浏览器真实 200% 缩放及开发者工具逐字形命中仍未由本次工具可靠执行；这些是明确延期项，不得改写为通过。
- M1 冻结现场只建立了完整字体验收样张并使用 system fallback；正式字体下载、子集、许可证、逐字形命中和跨平台判断当时均留给后续纵切片。当前字体增量与仍未完成的人工门禁以第 5.2 节为准，不属于 M1 冻结证据。
- 首个真实 Home 须按已确认的 A 主、C 辅概念方向完成页面级实现；Collection 与 Entry 继续按既有三层系统单独设计，并在同一纵切片中确认 A/C 语言是否需要延展。三页都须提交用户检查实际页面、响应式、字体、生产资产、无障碍和整体完成度，不把 Home 概念方向选择重新开放成无边界探索；若实际页面仍不符合目标，应只重构共享表现层，不改写内容、证据关系、稳定身份、URL 或语义阅读顺序。

M1 冻结后仍不批量制作首批 6 篇全部插画；应先在首个真实纵切片关闭上述设计与字体保留项，以免页面比例和裁切规则变化造成返工。
