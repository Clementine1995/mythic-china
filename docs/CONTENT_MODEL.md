# Mythic China 内容、引用与视觉资产合同

## 0. 状态

- 状态：MVP 目标合同草案；M2 文件形态、身份、状态与关系子集已经确认，Schema 尚未实现。
- 适用范围：文章、人物、异兽、地点、体系指南、主题合集、来源、工具无关的视觉资产和读者选题建议。
- 原则：公开页面可以简洁，内部记录必须足以回答“这句话、这个译法和这张图依据什么”；来源、claim 和关键术语先于视觉制作。这是编辑生产门禁，不是读者页面顺序。

### 0.1 M2 文件与加载合同

- Entry 使用 `src/content/entries/{entryId}.md`：YAML frontmatter 保存结构化字段，Markdown body 从“核心故事”开始。
- Collection、Source、Claim、Terminology 分别使用 `src/content/{collections|sources|claims|terminology}/{stableId}.yml`；一对象一文件。M2 不安装或使用 MDX。
- 所有 Astro `glob()` loader 显式用 `generateId` 从规范化文件名生成内部 ID，并校验 loader ID 与 frontmatter/data 中对应的 `entryId`、`collectionId`、`sourceId`、`claimId` 或 `termId` 完全一致。`slug` 只用于公开 URL，不承担关系身份。
- M2 固定 Entry canonical 为 `/explore/{slug}/`，Collection canonical 为 `/collections/{slug}/`；关系只保存稳定 ID。
- M2 的两个真实 draft demo 身份固定为 `zhong-kui` 与 `chinese-underworld-guide`。它们用于验证 Schema、关系和模板，不得用占位文化事实、伪来源或假 approved 资产填满内容。

## 1. 编辑分类

每个已发布 Entry 必须选择一个主要 `traditionType`，必要时增加辅助标签，但不能用标签逃避主要判断。

| 值 | 语义 | 示例边界 |
| --- | --- | --- |
| `myth` | 宇宙、神祇、创世或超自然秩序的神话叙事 | 女娲补天、共工触山 |
| `folklore` | 地方、口传、节俗或民间流传 | 地方鬼怪、区域传说 |
| `religion` | 有明确宗教传统、信仰、仪式或神系语境 | 道教/佛教/民间信仰中的神祇与地府层次 |
| `literature` | 可归属具体文学作品或作者的叙事 | 《聊斋志异》中的故事 |
| `historical-legend` | 历史人物或事件的后世传奇化 | 关羽神化、包公地府传说 |

“中国神话”可以作为面向读者的宽泛入口，但正文必须说明具体层次、时间、地域和来源。

## 2. 核心对象

### 2.1 Entry

人物、异兽、地点、故事和指南共用一个内容集合，以 `entryType` 控制模板差异。

```yaml
entryId: zhong-kui
slug: zhong-kui
title: Zhong Kui, the Demon Queller
subtitle: null
entryType: figure
traditionType: null
nameZh: 钟馗
pinyin: Zhōng Kuí
aliases: []
opening: []
summary: null
periodLabel: null
earliestKnownSourceId: null
sourceIds: []
claimIds: []
terminologyRecordIds: []
relatedEntryIds: []
heroAssetId: null
publishedAt: null
updatedAt: null
lastFactCheckedAt: null
status: draft
```

必填逻辑：

- `entryId`：稳定内部身份，发布后不得因标题和栏目变化修改。
- `slug`：稳定 canonical URL 片段；修改必须有显式 redirect 需求。
- `entryType`：`figure | creature | realm | tale | guide`。
- `opening`：字符串序列；draft 可为 `[]`，进入 `editorial-review` 时提供 1–2 个纯文本段落，承担有悬念但不虚构引语的开场；模板将其放在 Quick Answer 前。Markdown body 不重复开场，从核心故事开始。
- `summary`：draft 可为 `null`；进入 `editorial-review` 时提供 80–120 词 Quick Answer。
- `traditionType`：使用第 1 节枚举；draft 可为 `null`，进入 `editorial-review` 前必须确认。
- `sourceIds`：已发布内容至少一个；涉及多版本时覆盖主要版本来源。
- `claimIds`：已发布内容中的事实性文化主张必须能通过正文引用或 Claim 关联到具体 source 与 locator。
- `terminologyRecordIds`：出现需要语境化处理的关键专名或术语时必填。
- `earliestKnownSourceId`：只有对应的“最早已定位证据”Claim 通过核查时才填写；检索边界不足时保持 `null`，不得用推测补位。
- `heroAssetId`：draft 与 `editorial-review` 可为 `null`；进入 `visual-review` 后必须指向 M3 已建立的有效资产记录，已发布内容必须关联 approved asset。M2 不创建假 Asset Manifest 或生产图片。
- `lastFactCheckedAt`：已发布内容必填。
- `status`：`draft | editorial-review | visual-review | ready | published | archived`。
- Entry 不保存 `collectionIds`；Collection 成员关系与阅读顺序只由 `Collection.entryIds` 编写，Entry 页所需的反向 Collection 入口在构建期从 Collection 记录派生，避免双向关系漂移。
- M2 不实现 `Topic` 权威集合，因此 Entry Schema 暂不包含 `topicIds`。首次引入 Explore 筛选/Topic 时必须先定义稳定对象、关系校验与 URL 行为，不能留下未校验的字符串外键。

M2 以状态递进校验代替“draft 也伪装完整”的默认值：

| 状态 | 最小要求 |
| --- | --- |
| `draft` | 稳定 `entryId`、`slug`、`title`、`entryType` 与 `status`；研究、开场、摘要、关系和资产字段可以显式为 `null` / `[]` |
| `editorial-review` | `traditionType`、开场、Quick Answer、正文草稿和至少一个真实 Source 已存在；Claim/术语关系按正文实际风险逐步补齐 |
| `visual-review` | 满足编辑审核要求；`heroAssetId` 指向 M3 建立的非 archived 资产记录，视觉 brief 与披露可审核 |
| `ready` | 满足第 8 节全部编辑、证据、术语、关系、视觉与无障碍门禁 |
| `published` | 满足 `ready`，并补齐发布日期、最后事实核查日期、公开关系与 canonical 验证 |

Zod 负责一条记录的字段与同记录条件，独立内容图校验器负责跨对象存在性、状态矩阵、唯一性和循环展开保护；不得在页面模板中用默认值掩盖失败。

### 2.2 Collection

Collection 是编辑策划的阅读路径，不是自动标签聚合。

```yaml
collectionId: chinese-underworld
slug: chinese-underworld
title: The Chinese Underworld
titleZh: 中国阴间
pinyin: Zhōngguó yīnjiān
description: A guided exploration of changing Chinese ideas about realms of the dead, keeping periods, regions, texts and traditions distinct rather than presenting one timeless map or canon.
featuredEntryId: zhong-kui
entryIds:
  - chinese-underworld-guide
  - zhong-kui
status: draft
heroAssetId: null
```

- `entryIds` 顺序有编辑意义。
- `titleZh` 与 `pinyin` 承载 Collection 的中文身份；首发英语页面出现中文标题时两者成对必填，拼音遵循 `STYLE.md` 的带声调 Hanyu Pinyin 规则。
- `status` 与 Entry 共用 `draft | editorial-review | visual-review | ready | published | archived` 枚举。
- `featuredEntryId` 可选，用于把当前重点入口与 `entryIds` 的策展阅读顺序分开；若填写，目标必须存在于同一 Collection 的 `entryIds` 中，并服从下述 Collection—Entry 状态矩阵。更换 Featured Entry 不得改变 Entry 的稳定 ID、slug 或阅读顺序。
- `draft | editorial-review | visual-review` Collection 可在内部预览中引用任意非 `archived` Entry；`ready` Collection 只能引用 `ready | published` Entry；`published` Collection 只能引用 `published` Entry。任何非 `archived` Collection 都不得引用 `archived` Entry；`archived` Collection 退出公开构建但保留既有关系供历史追溯。
- Collection 必须说明范围与限制，避免把不同时代/传统强行拼成统一体系。
- Topic 是可复用筛选标签；Collection 是有导语、有顺序、有结论的产品页面。
- 上述 M2 draft Collection 只引用两个已确认 demo；其余首发候选在创建真实 Entry 后再加入，不能用悬空 ID 预占阅读路径。
- Collection 的 realm token、纹理、构图和主题资产属于表现层/Asset Manifest，不写入本内容对象。

### 2.3 Source

```yaml
sourceId: source-example
sourceType: primary-text
title: Example Source Title
titleZh: 示例来源
authorOrOrganization: Example Author
publicationOrEdition: Example edition
editionBasisOrObjectId: Qing woodblock edition / museum object number
originalPeriod: Qing dynasty
publicationYear: 2020
url: https://example.org/source
accessedAt: 2026-08-26
language: en
translator: null
pageOrSection: chapter 1
rightsStatus: citation-only
rightsUrl: https://example.org/rights
notes: Why this source is used and its limitations.
```

`sourceType` 建议值：

- `primary-text`
- `translation`
- `scholarship`
- `museum-or-library`
- `official-site`
- `fieldwork-or-community-archive`
- `reference-website`
- `modern-adaptation`

网页来源必须包含 `title`、`authorOrOrganization`、`url`、`accessedAt`。原典、译本、论文和馆藏分别记录适用的底本/版次、出版年、卷章页行或对象编号；数字影像和现代译文还要记录 `rightsStatus` 与 `rightsUrl`。网页可访问、原作已进入公版和数字文件允许复用是三种不同状态，不能互相替代。现代改编不得作为古代事实的唯一证据。

### 2.4 Claim

Claim 记录可发布主张与证据的对应关系，不要求把文章拆成逐句数据库；凡是可核查的文化事实，都必须由正文附近的引用或 Claim 覆盖，高风险判断必须使用结构化 Claim。

```yaml
claimId: claim-meng-po-bowl
entryId: meng-po
claimType: textual
statement: Meng Po offers the dead a drink associated with forgetting before rebirth.
certainty: verified
sourceLinks:
  - sourceId: source-example
    role: primary
    locator: juan 1, folio 12b
    note: Supports this episode in this edition, not an absolute origin claim.
  - sourceId: scholarship-example
    role: scholarship
    locator: pages 40–44
    note: Supports the dating and later-tradition context.
```

- `claimType`：`textual | historical | tradition | translation | interpretation`。
- `certainty`：`verified | disputed | provisional`；`provisional` 不得作为已确认事实发布，`disputed` 必须在页面显示分歧。
- `role`：`primary | scholarship | translation | object-record | fieldwork | adaptation`；证据等级取决于主张类型，不把任何单一来源当作万能权威。
- “最早”“首次”“形成于某时期”和跨传统关系必须同时有可定位的一手证据与专业研究；无法证明已穷尽时写 `earliest securely located` 等有边界的表述，不写绝对起源。
- 现代改编、旅游宣传、百科、生成式模型输出和 AI 搜索摘要只能帮助发现线索或说明现代接受，不能单独支撑古代事实。

### 2.5 TerminologyRecord

TerminologyRecord 保存专名和文化术语在特定语境中的英文决定；它是翻译审校记录，不是把中国超自然存在固化成一套物种分类。

```yaml
termId: yao-in-entry-example
entryId: entry-example
hanzi: 妖
pinyin: yāo
sourceContext: Example text, chapter 1
chosenEnglish: transformed being
firstUseGloss: a nonhuman being transformed through cultivation
alternativesRejected:
  - demon
  - fairy
rationale: The passage describes transformation, not a fixed moral or religious category.
sourceIds:
  - source-example
reviewStatus: bilingual-approved
```

- `guai`、`yao`、`gui`、`shen`、`jing`、`mo`、`xian` 等词必须按时代、文本、语法和宗教语境决定译法，不设置强制一对一词表。
- 有稳定英文名的专名首次出现采用 `Sun Wukong (孙悟空, Sūn Wùkōng)`；无稳定对应词采用“带声调拼音（汉字）+ 语境化释义”，例如 `a yāo (妖)—here, a nonhuman being transformed through cultivation—`，后文保持同一选择。资料字段保留带声调的 Hanyu Pinyin，slug 使用无声调 ASCII。
- `reviewStatus`：`draft | source-checked | bilingual-approved`；关键术语进入 `ready` 前必须为 `bilingual-approved`。

### 2.6 Asset Manifest

Asset manifest 是所有公开视觉资产（包括 Hero、正文图与整页氛围背景）的工具无关权威记录；压缩后的 Web/社媒文件可能丢失内嵌 metadata，不能只依赖文件本身或某个生产工具。

```yaml
assetId: asset-meng-po-hero-v1
ownerType: entry
ownerId: meng-po
role: hero
accessibilityMode: informative
status: approved
version: 1
masterPath: external://visual-production/meng-po/master-v1.png
publicDerivatives:
  - path: src/assets/images/meng-po-hero-desktop.avif
    widthPx: 1920
    heightPx: 1080
  - path: src/assets/images/meng-po-hero-mobile.avif
    widthPx: 1600
    heightPx: 2000
focalPoint:
  x: 0.68
  y: 0.44
referenceAssets:
  - url: https://example.org/reference
    authorOrOrganization: Example institution
    rightsStatus: research-only
    rightsUrl: https://example.org/reference-rights
sourceClaimIds:
  - claim-meng-po-bowl
visualClaims:
  canonical:
    - statement: bowl of forgetfulness
      claimIds:
        - claim-meng-po-bowl
  inferred:
    - statement: architectural setting
      rationale: A restrained invented setting used to stage the verified action.
  invented:
    - lighting and costume color palette
production:
  method: ai-assisted
  tool: ComfyUI
  recordPath: external://visual-production/meng-po/production-v1.yml
  optionalMetadata:
    workflowId: consistent-scene-v1
    workflowSha256: pending
    modelRefs:
      - model-id-from-registry
humanEdits:
  - corrected hands and removed false characters
reviews:
  cultural: approved
  language: approved
  rights: approved
alt: Meng Po holds a bowl beside a mist-covered bridge.
caption: AI-assisted original illustration; architectural details are an artistic interpretation.
credit: Mythic China original illustration
aiDisclosure: AI-assisted original illustration
```

- `production.method`：`in-house-original | commissioned-original | licensed-reuse | ai-assisted`；所有方法共用同一 Asset contract。
- `ownerType`：`entry | collection | global`；`ownerId` 保存对应的稳定身份，例如 Entry ID、Collection ID 或 `site-shell`。不得用可变页面标题代替所有权关系。
- `role`：`hero | lead | inline | page-atmosphere | og | social`；它描述编辑用途，不表示 CSS 位置或具体组件。同一 master 的不同用途仍须在 derivatives 中写明尺寸与裁切；视觉重构更换衍生图或主题资产时使用新版本 manifest 重新审核，不改写 Entry 的事实、来源或 canonical 身份。
- `accessibilityMode`：`informative | decorative`。`informative` 必须有非空 alt 和相邻 caption；`decorative` 必须使用空 alt，可不逐图显示 caption，但仍需 manifest、credit、适用的 AI disclosure/页面级 visual note 与人工审核。
- `production.tool` 与 `optionalMetadata` 只在实际使用相应工具且对复现/权利审查有帮助时记录；没有使用 ComfyUI 时不得创建空的 workflow、model 或 prompt 字段。
- `sourceClaimIds` 与 `visualClaims` 必须先于生产核准；每个 `canonical` 项必须关联具体 `claimIds`，每个 `inferred` 项必须写明 rationale。只有全部元素均为 `invented` 且资产为纯装饰时，`sourceClaimIds` 才能为空；此类资产不得支撑正文事实。工具 metadata 只能解释图片怎么做，不能证明画面在传统中有据。
- 使用 ComfyUI 时可以保留 workflow JSON 等复现信息，但 sidecar manifest 仍是项目权威记录。参考：[ComfyUI Image-to-Image Workflow](https://docs.comfy.org/tutorials/basic/image-to-image)，访问于 2026-08-26。

### 2.7 Reader Request

首版不在网站仓库保存真实请求；以下是外部表单或未来隔离接口的最小合同：

```yaml
requestId: provider-generated-id
pageId: meng-po
requestedTopic: A short reader suggestion
email: null
emailConsent: false
createdAt: provider timestamp
status: new
normalizedTopicId: null
```

- `requestedTopic` 设置明确长度上限，不允许富文本或上传。
- `email` 可选；填写邮箱必须显示用途并要求 `emailConsent: true`。
- analytics 事件不包含建议原文或邮箱。
- 归一化、票数和编辑排期属于内部流程，不自动承诺发布。

## 3. 稳定 ID 与关系

- ID 使用小写 kebab-case，只表达对象身份，不包含栏目、年份或状态。
- 一文件一对象的文件名就是稳定内部 ID；Astro loader 生成的 `entry.id`、文件名和记录内对应 `*Id` 必须三者一致。frontmatter/data `slug` 不得覆盖内部身份。
- 关系只保存稳定 ID，不保存展示标题。
- `Collection.entryIds` 是 Collection 成员关系与顺序的唯一事实来源；Entry 的反向 Collection 列表由构建期派生，不另存一份关系。
- 构建时必须验证：ID 唯一、slug 唯一、关系目标存在、Collection—Entry 状态符合第 2.2 节矩阵；`featuredEntryId` 存在时必须同时出现在该 Collection 的 `entryIds` 中并通过相同状态校验。
- 循环关系本身可以存在，但页面生成必须防止递归展开。
- 删除已发布对象前先评估 redirect、外部链接和关联内容，不直接清除身份。
- 所有公开列表显式按 Collection 的编辑顺序、日期或稳定键排序，不依赖 Content Layer 返回顺序。

## 4. 正文模板

本节定义发布时的读者语义顺序与必需内容块，不冻结具体栅格或组件树；实现仍须让 DOM 顺序与下列阅读顺序一致。内容文件不得保存模板版本、组件实现名、CSS class、token、断点、动画或排版参数。若未来独立需求批准受控 MDX，其组件也只能表达项目批准的编辑语义；M2 不使用 MDX。

默认 Entry 面向读者的正文顺序如下。编辑生产时仍须先完成 claim/source 与术语核查；正文中的轻量引用跟随相关主张，下面的 `Sources` 指完整书目：

1. `opening` 中有悬念但不虚构引语的 1–2 段开场。
2. 80–120 词 Quick Answer。
3. 核心故事。
4. `What the text says`：最早/主要文本或传统。
5. `Later traditions and variants`：版本形成与差异。
6. `Our interpretation`：本站视觉或叙事选择。
7. 为什么这个故事重要。
8. 常见误解或现代改编。
9. Sources。
10. Related Entries / 下一条探索路径。
11. Reader Request。

`opening` 与 `summary` 来自 frontmatter；Markdown body 从第 3 项核心故事开始，避免解析渲染后 HTML、按首段切割或为此引入 MDX。全站 Footer newsletter 属于页面外壳，不属于 Entry 正文模板，也不得插入上述阅读链。

历史人物额外固定：

- `What history records`
- `What later legends added`
- `How the figure became sacred or supernatural`

## 5. 引用合同

### 5.1 页面级来源

- 每篇已发布 Entry 的 `sourceIds` 至少一个。
- `sourceIds` 是页面书目入口，不代表证据自动完整；事实性文化主张仍须由正文附近引用或 Claim 关联到具体 locator。
- Sources 区显示作者/机构、标题、版本/年份、链接和访问日期等适用信息。
- 外部网站链接使用描述性名称，不显示无上下文裸 URL。

### 5.2 声明级来源

以下内容必须使用段落脚注、source note 或结构化 Claim 关联，而不仅在文末列一堆书：

- “最早出现”“首次记载”“在某时期形成”等时间判断。
- 原典原文、译文和具体情节。
- 不同神系、地区或文本之间的关系。
- 历史人物事迹与神化过程。
- 容易与现代流行改编混淆的说法。

M2 先校验 Entry `claimIds`、Claim `sourceLinks`、locator、evidence role 与 certainty 的结构化关系，不为尚未完成的生产正文引入 MDX 或自定义 Markdown 插件。正文附近 source note 的最终作者语法与可访问回链在 M4 首个真实 Entry 模板中确认；在该语法有真实测试前，不得声称“附近引用”已自动覆盖。

原典或馆藏记录用于证明“这个版本/对象呈现了什么”，专业研究用于证明年代、形成过程、意义和跨传统关系，田野或非遗档案用于证明特定地域、群体和记录时期的活态传统。三者不能因看似“权威”而跨用途替代。

### 5.3 引用外部网站

引用其他网站时必须：

- 在结论附近标明来源名称并链接。
- 记录访问日期。
- 区分官方资料、博物馆/图书馆、学术资料、参考网站和现代改编。
- 不整段复制；需要短引语时遵循合理引用和版权限制。
- 如果引用其图片，另行核对图片作者、许可和下载/转载条件；网页可访问不等于图片可复用。

### 5.4 失效来源

- 构建检查只能发现链接格式或关联缺失，不能证明网页内容仍正确。
- 定期抽查外部链接；失效时保留来源身份并记录替代入口或存档状态，不悄悄更换为含义不同的页面。

### 5.5 术语与翻译

- 翻译先确认原文版本和上下文，再追求自然英文；不得为了流畅增加原文没有的人物动机、情节、宗教身份或道德判断。
- `guai 怪` 可随语境表示 strange/anomalous、anomaly 或 strange being；`yao 妖` 可指灾异、诡异现象或变化之物；`gui 鬼` 不必然邪恶；`shen 神` 不必然等于人格化 God；`jing 精` 可指精气或成精之物；`mo 魔` 在佛教语境可能对应 Māra；`xian 仙` 常需在 immortal 与 transcendent 之间说明。实际译法以 TerminologyRecord 为准，不把这些提示当成固定对照表。此处的语境化原则参考 [Hidden and Visible Realms](https://cup.columbia.edu/book/hidden-and-visible-realms/9780231547055/) 对志怪材料的译介，以及 [Ghosts and Religious Life in Early China](https://www.cambridge.org/core/books/ghosts-and-religious-life-in-early-china/0D8E8A181125C8E87DD653E459CBBDA5) 对 `gui/guishen` 历史语义的研究，访问于 2026-08-26。
- 引用现代译本时记录译者、版本和 locator；本站自行翻译时标注 `our translation`，保存对应中文原文与审校状态，不无说明地拼接多个译本。
- AI/机器翻译只能作为内部草稿；发布前必须完成 source check、双语核对和自然英文编辑，不能把语言流畅度当作准确性证据。

## 6. 视觉辅助生产管线

视觉制作只能在内容依据明确后开始，不能反过来根据漂亮画面补写传说。MVP 使用同一条工具无关管线：

1. 完成 Entry 的传统分类、Claim/source locator 和关键 TerminologyRecord 审核。
2. 形成 visual brief，把元素分为 canonical / inferred / invented，并逐项核对参考资产权利。
3. 按题目需要选择站内原创绘制、委托创作、获授权素材或可选的 ComfyUI 等生成工具辅助。
4. 人工完成文化、语言、权利、生成缺陷、裁切和披露审核，再导出 Web/社媒文件。

MVP 不强制维护固定数量的 ComfyUI workflow，也不让任何单一视觉工具成为发布依赖。若实际使用 ComfyUI，才保存有复用价值的小型 workflow、模型/LoRA 版本与许可证、环境摘要和必要生成参数；seed 或 prompt 不能替代角色依据、来源和人工审核。

### 6.1 Visual brief 结构

```text
已核准 Claim 支撑的主体属性与动作
+ 有来源的地点 / 时代 / 器物
+ 明确标注的推断元素
+ 明确标注的本站艺术演绎
+ 构图、文字负空间和导出规格
+ 禁止出现的伪文字、错置文化元素和受保护造型
```

- canonical 元素必须关联 `sourceClaimIds`；inferred 元素写明推断理由；invented 元素不得以史料口吻出现在 caption。
- 无论采用何种工具，都要检查 pseudo-Chinese characters、错时代服饰/器物、错置日本或欧洲奇幻元素、logo、watermark 和明显生成缺陷。
- 不得使用 `in Black Myth style`、其他受保护品牌造型或在世艺术家的名字替代可解释的视觉描述。

### 6.2 目录与存储

目标生产结构：

```text
visual/
├─ characters/{slug}/bible/
├─ manifests/
├─ style-guides/
├─ production-records/
└─ model-registry.yml（仅在使用生成模型时）

仓库外或对象存储：
visual-production/
└─ episodes/{slug}/
   ├─ references/
   ├─ explore/
   ├─ approved/masters/
   ├─ exports/web/
   └─ exports/social/
```

- 只有用途稳定、体积小且经过批准的生产记录或 workflow 才进入仓库；工具环境、模型权重、探索废图和大原图外置。
- 使用生成模型时，在 `model-registry.yml` 记录名称、来源、版本、SHA256、许可证和商业用途判断；未使用时不创建空记录。
- 参考图默认不公开；研究用途不自动授予衍生和发布权。
- 压缩和最终响应式变体交给网站构建链路，避免由任一视觉工具反复重采样。

### 6.3 审核门禁

一张图片进入 `approved` 前必须通过：

- 文化/时代/器物审校。
- 伪文字、额外肢体和明显生成缺陷检查。
- 参考图、字体、授权素材及实际使用的模型/LoRA 等资产的权利状态检查。
- canonical / inferred / invented 分类。
- 与 `accessibilityMode` 匹配的 alt / 空 alt、适用的 caption、credit、AI disclosure 和焦点坐标。
- 桌面、移动、OG 和社媒裁切预览。

## 7. 未来商业扩展边界（非 M2 Schema）

M2 不在 Entry、Collection 或其他内容记录中创建空商业字段，也不建立商品、价格、赞助、联盟、支付或会员 Schema。未来只有经独立需求批准后，才可以增加明确结构，并遵守：

- 供应商中立的内部 `productId` / `offerId` 与支付供应商 ID、checkout URL、价格同步和跟踪参数分离；后者只进入可替换 adapter/配置，不进入稳定内容身份或 Markdown 正文。
- 商业引用与 `Source` / `Claim` 证据关系分开；参考书目与购买推荐分区显示，source 不因 affiliate、sponsor 或 paid product 状态获得更高权重。
- disclosure 记录必须能指向具体商业入口并紧邻渲染；不得依靠全站页脚的一句泛化声明覆盖正文入口。
- 第一阶段优先外部托管结账。若需求涉及购买者身份、付费权限或下载权益，必须先定义认证、webhook、会话、存储、退款/撤销与数据删除边界；静态 HTML 隐藏不构成访问控制。
- 跟踪参数和赞助脚本只能由单一商业边界管理；没有真实需求和渲染入口时不创建字段、组件或空目录。

## 8. 发布状态与门禁

```text
draft
  -> editorial-review
  -> visual-review
  -> ready
  -> published
  -> archived（仅在明确需求下）
```

进入 `ready` 前必须满足：

- 英文编辑、双语术语审核与事实核查完成。
- traditionType、sourceIds、claimIds、适用的 terminologyRecordIds、related IDs 和 lastFactCheckedAt 完整。
- 所有已发布事实性文化主张都有可定位证据；`provisional` Claim 未作为事实发布，`disputed` Claim 已在页面显示分歧。
- 所有公开视觉资产为 approved，manifest 与导出物存在。
- alt / 空 alt、适用的 caption、credit、AI disclosure、权利状态与生产方式一致；若后续需求引入商业入口，其披露还须通过第 7 节门禁。
- 页面在移动、键盘、减弱动效和无 JavaScript 条件下通过验收。

状态变更不允许靠修改一个字段绕过验证；实际发布门禁和命令在应用初始化后写入 `DEV_WORKFLOW.md`。
