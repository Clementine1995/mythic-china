# Mythic China 内容、引用与视觉资产合同

## 0. 状态

- 状态：MVP 目标合同草案；M2 内容文件/关系 Schema 与 M3-U3 visual brief/Asset Manifest Schema、关系/文件校验和 current resolver 已在本地实现并通过工程门禁；M3-U4/U5 已产生并批准一套视觉资产与真实生产记录。终验发现 Hero v1 手部缺陷后，Project owner 于 2026-08-29 验收 Hero v2；Hero v1 保留为 approved/non-current 审计历史。当前七个 local master、七份 repository source、两份 production record 与五份 manifest 版本记录均通过门禁，四个逻辑资产各有唯一 approved/current。项目直接依赖 `sharp@0.35.4` 已从三份 current responsive source 实际生成和解码验证全部 22 个 AVIF/WebP 目标；M3 已完成，页面仍属于 M4。
- 适用范围：文章、人物、异兽、地点、体系指南、主题合集、来源、工具无关的视觉资产和读者选题建议。
- 原则：公开页面可以简洁，内部记录必须足以回答“这句话、这个译法和这张图依据什么”；来源、claim 和关键术语先于视觉制作。这是编辑生产门禁，不是读者页面顺序。

### 0.1 M2 文件与加载合同

- Entry 使用 `src/content/entries/{entryId}.md`：YAML frontmatter 保存结构化字段，Markdown body 从“核心故事”开始。
- Collection、Source、Claim、Terminology 分别使用 `src/content/{collections|sources|claims|terminology}/{stableId}.yml`；一对象一文件。M2 不安装或使用 MDX。
- 内容目录 inventory 只允许上述约定扩展名（空目录可保留 `.gitkeep`）；`.yaml`、备份后缀和其他不会被 loader 匹配的文件必须使架构门禁失败，不能被 `glob()` 静默忽略。
- 所有 Astro `glob()` loader 显式用 `generateId` 从规范化文件名生成内部 ID，并校验 loader ID 与 frontmatter/data 中对应的 `entryId`、`collectionId`、`sourceId`、`claimId` 或 `termId` 完全一致。`slug` 只用于公开 URL，不承担关系身份。
- M2 固定 Entry canonical 为 `/explore/{slug}/`，Collection canonical 为 `/collections/{slug}/`；关系只保存稳定 ID。
- M2 的两个真实 draft demo 身份固定为 `zhong-kui` 与 `chinese-underworld-guide`。它们用于验证 Schema、关系和模板，不得用占位文化事实、伪来源或假 approved 资产填满内容；`Chinese Underworld Guide (Working Draft)` 只是内部工作标题，不是已冻结的公开标题。

### 0.2 M3-U3 视觉记录与加载合同

- visual brief 使用 `visual/briefs/{briefId}.yml`，Asset Manifest 使用 `visual/manifests/{manifestId}.yml`；两者都是一文件一版本记录，由 `visualBriefs` / `assets` Content Layer collection 加载并显式生成 ID。当前存在两份 approved brief（Zhong Kui 与 Chinese Underworld Collection）和五份 manifest 版本记录；其中四份 approved/current 分别服务 Zhong Kui Hero、Lead、OG、Social，Hero v1 为 approved/non-current。Project owner 已从 Collection brief 的 Git-ignored local explore 输出中选中 desktop 02/mobile 01 进入生产准备，但仍没有 asset/manifest，不产生 current 资产。
- `src/assets/images` 只保存尺寸锁定的 repository source rendition。当前七份 approved source 均被 manifest 唯一引用并通过真实 metadata/hash、权利与人工审核门禁；Hero v1 的两份 source 作为非 current 版本历史保留。metadata registry 忽略 `.gitkeep`，但不会静默忽略其他文件；未被 manifest 唯一引用的图片、非批准扩展名、符号链接、禁入签名、超过 10 MiB 或无法读取 metadata 的文件均使构建失败。
- Zod 负责单记录字段和局部条件；纯 visual graph validator 负责 owner/Claim/Source、brief target、asset version/current、内容 Hero 外键、路径、文件 metadata 与 inventory。resolver 只读取显式 `isCurrent`，绝不按最高 version 或文件名猜测。

### 0.3 字体资产边界

- 字体不是 visual Asset Manifest，也不复用 brief/production record/current resolver。自托管字体只进入 `src/assets/fonts/` 的版本目录，由 `font-assets.json` 固定 release、archive/file hash、许可证与 preload 角色；页面只通过中央 preload registry 和 CSS role token 消费。
- 当前字体 inventory 为 4 份上游未修改英文 WOFF2 与两份许可证；CJK 文件仍为空。CJK 子集、内部 RFN 改名、字符表、cmap 和跨平台检查在其工具与语言证据闭合前保持阻断。

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

下例只展示 Entry Schema 形状，不代表当前 `src/content/entries/zhong-kui.md` 记录；当前真实钟馗 Entry 已形成 `editorial-review` 内容候选，填写完整正文、Source/Claim/Terminology 与 fact-check 日期，并把 `heroAssetId` 绑定到 approved/current Hero。Project owner 已把当前编辑形态作为阶段候选接受，但内容状态仍不是 `ready/published`。

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
earliestKnownClaimId: null
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
- `earliestKnownSourceId` 与 `earliestKnownClaimId`：必须同时为 `null` 或同时填写。Claim ID 必须精确指向当前 Entry `claimIds` 中归属该 Entry 的 `verified`、`historical`、`historical-tradition` Claim；Source ID 必须出现在 `sourceIds`，并作为该 Claim 中匹配的一手文本、馆藏对象或田野记录 locator。同一 Claim 还必须包含另一条已列入 Entry 书目的独立 scholarship Source。其他 Claim 不得替被指定 Claim 完成此门禁；检索边界不足时两者都保持 `null`。
- `heroAssetId`：引用不带版本号的逻辑 `assetId`，不是 manifest 文件名或图片路径。draft 与 `editorial-review` 可为 `null`；若填写，必须属于当前 Entry、`role: hero`、`slotId: primary`，且须解析到一个非 archived current 版本。进入 `visual-review` 后 current 版本为 `in-review | approved`；`ready | published` 必须解析到 current approved 版本；`archived` 保留逻辑 ID 和至少一份 approved/archived manifest 历史，但不要求 current。M2 不创建假 Asset Manifest 或生产图片。
- `lastFactCheckedAt`：进入 `ready` 时即必填，`published` 必须保留；`archived` 继承已发布谱系的完整性，不得通过归档清空。
- `status`：`draft | editorial-review | visual-review | ready | published | archived`。
- Entry 不保存 `collectionIds`；Collection 成员关系与阅读顺序只由 `Collection.entryIds` 编写，Entry 页所需的反向 Collection 入口在构建期从 Collection 记录派生，避免双向关系漂移。
- M2 不实现 `Topic` 权威集合，因此 Entry Schema 暂不包含 `topicIds`。首次引入 Explore 筛选/Topic 时必须先定义稳定对象、关系校验与 URL 行为，不能留下未校验的字符串外键。

M2 以状态递进校验代替“draft 也伪装完整”的默认值：

| 状态 | 最小要求 |
| --- | --- |
| `draft` | 稳定 `entryId`、`slug`、`title`、`entryType` 与 `status`；研究、开场、摘要、关系和资产字段可以显式为 `null` / `[]` |
| `editorial-review` | `traditionType`、开场、Quick Answer、正文草稿和至少一个真实 Source 已存在；Claim/术语关系按正文实际风险逐步补齐 |
| `visual-review` | 满足编辑审核要求；`heroAssetId` 指向 M3 建立的逻辑 Hero 资产，唯一 current 版本为 `in-review | approved`，视觉 brief、Claim、权利、披露与 renditions 可审核 |
| `ready` | 满足第 8 节全部编辑、证据、术语、关系、视觉与无障碍门禁 |
| `published` | 满足 `ready`，由 Project owner 在 M6 完整本地 inventory 上明确决定可进入 public artifact，并补齐发布日期、最后事实核查日期与公开关系；它不等于已经部署、远端预览或生产上线，canonical/origin/output 仍由全局 U4B 门禁验证 |
| `archived` | 仅从完整发布谱系进入；保留 `published` 的编辑、证据、日期和关系完整性，但退出公开静态路由 |

正文门禁要求真实可见的 Markdown 正文；空白、单个或多个 HTML 注释、未闭合的纯注释、只有空 HTML 标签或只有图片的 body 不能让 Entry 进入 `editorial-review` 或更后状态。带读者可见文本的普通 Markdown 或 raw HTML 可以通过最小文本门禁；ARIA、CSS 隐藏与完整渲染语义不由正则模拟，继续由真实页面的 U5 验收负责。普通正文不得用远端图片、iframe、object/embed、form 或远端 CSS 绕开 Asset Manifest、权利和 output policy。

`publishedAt` 表示 Project owner 批准的目标公开日期；为形成 M6 protected preview 候选，它可以是尚未到达的未来日期，但不得用构建日、预览日或部署日代填。`updatedAt` 只表示目标公开当日或之后的真实公开修改日期，不能早于 `publishedAt`。目标日期变化会使受影响页面、SEO 与 release artifact 证据失效并要求重验；构建时间不是内容更新时间。Schema、独立 SEO builder 与 release artifact builder 都必须分别阻断倒序日期。

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
- draft、`editorial-review` 与 `visual-review` 可暂时保留空的策划路径；进入 `ready` 后（含 `published | archived`）必须至少有一个真实 Entry 成员。
- `titleZh` 与 `pinyin` 承载 Collection 的中文身份；首发英语页面出现中文标题时两者成对必填，拼音遵循 `STYLE.md` 的带声调 Hanyu Pinyin 规则。
- `status` 与 Entry 共用 `draft | editorial-review | visual-review | ready | published | archived` 枚举。
- `heroAssetId` 与 Entry 一样引用 versionless 逻辑 `assetId`。draft 与 `editorial-review` 可为空；若填写，必须属于当前 Collection、`role: hero`、`slotId: primary`，并解析到非 archived current 版本。`visual-review` 要求唯一 current `in-review | approved` 版本，`ready | published` 要求唯一 current approved 版本。`archived` Collection 只要求保留 approved/archived manifest 历史，不要求 current。
- `featuredEntryId` 可选，用于把当前重点入口与 `entryIds` 的策展阅读顺序分开；若填写，目标必须存在于同一 Collection 的 `entryIds` 中，并服从下述 Collection—Entry 状态矩阵。更换 Featured Entry 不得改变 Entry 的稳定 ID、slug 或阅读顺序。
- `draft | editorial-review | visual-review` Collection 可在内部预览中引用任意非 `archived` Entry；`ready` Collection 只能引用 `ready | published` Entry；`published` Collection 只能引用 `published` Entry。任何非 `archived` Collection 都不得引用 `archived` Entry；`archived` Collection 退出公开构建，只能保留指向 `published | archived` Entry 的既有发布谱系关系供历史追溯，不能借归档状态新挂 draft/未公开对象。
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
titleZhLang: zh-Hans
authorOrOrganization: Example Author
publicationOrEdition: Example edition
editionBasisOrObjectId: Qing woodblock edition / museum object number
originalPeriod: Qing dynasty
publicationYear: 2020
url: https://example.org/source
accessedAt: "2026-08-26"
language: en
translator: null
pageOrSection: chapter 1
rightsStatus: citation-only
rightsUrl: https://example.org/rights
notes: Why this source is used and its limitations.
```

`sourceType` 在 M2 中使用下列闭合枚举；新增类型前必须先更新本合同与测试：

- `primary-text`
- `translation`
- `scholarship`
- `museum-or-library`
- `official-site`
- `fieldwork-or-community-archive`
- `reference-website`
- `modern-adaptation`

网页来源必须包含 `title`、`authorOrOrganization`、`url`、`accessedAt`。M2 的最小可追溯组合是：`primary-text` 至少有版次/底本身份；`scholarship` 与 `modern-adaptation` 有作者/机构及出版物、年份或 URL 身份；`museum-or-library` 与 `fieldwork-or-community-archive` 有负责机构及对象号、档案/版次或 URL 身份。`translation` 记录必须填写 `translator`、`publicationOrEdition`、`pageOrSection`、`rightsStatus` 与 `rightsUrl`，任何填写了 `rightsUrl` 的记录也必须填写 `rightsStatus`。数字影像同样需要两项权利信息，但 M2 Source 尚无可靠的数字影像判别字段，因此不得凭现有字段臆测并自动放行；首次接入此类记录前先扩充合同与 Schema。网页可访问、原作已进入公版和数字文件允许复用是三种不同状态，不能互相替代。

`Source.language` 描述整份来源，不自动描述可选 `titleZh` 的正字区域。`titleZhLang` 与 `titleZh` 成对必填，受控值为 `zh | zh-Hans | zh-Hant`：generic `zh` 明确表示已知为中文但正字区域尚未核定，不是脚本猜测或 fallback。当前只有教育部词典记录自身能证明 `titleZhLang: zh-Hant`；四条英文馆藏记录保持 `zh`，不得按字符外形猜 Hans/Hant。`editorial-review` 可保留 generic `zh`；`ready | published | archived` Entry 引用的 Source 必须先经来源核对/双语审校改为精确 `zh-Hans | zh-Hant`，内容图会拒绝绕过。

M2 的 Entry/Source 日期字段只接受带引号的 ISO calendar date 字符串 `"YYYY-MM-DD"`。未加引号的 YAML 日期会被 loader 解析为 `Date`，时间戳还可能因时区跨日；Schema 一律拒绝 `Date` 与 timestamp，不做静默截断或日期迁移。

### 2.4 Claim

Claim 记录可发布主张与证据的对应关系，不要求把文章拆成逐句数据库；凡是可核查的文化事实，都必须由正文附近的引用或 Claim 覆盖，高风险判断必须使用结构化 Claim。

```yaml
claimId: claim-meng-po-bowl
entryId: meng-po
claimType: textual
evidenceContext: historical-tradition
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
- `evidenceContext`：`historical-tradition | modern-reception`。前者覆盖原典、历史形成、传统、翻译及基于这些材料的解释；后者覆盖现代游戏、影视、当代改编、机构说明与接受史。它是证据门禁字段，不从 `statement` 文本猜测。
- `certainty`：`verified | disputed | provisional`；`provisional` 不得作为已确认事实发布，`disputed` 必须在页面显示分歧。
- `role`：`primary | scholarship | translation | object-record | fieldwork | adaptation | reference`。M2 固定匹配为：`primary-text/primary`、`translation/translation`、`scholarship/scholarship`、`museum-or-library/object-record`、`fieldwork-or-community-archive/fieldwork`、`modern-adaptation/adaptation`，以及 `official-site | reference-website` / `reference`；未列组合全部构建失败。
- `verified | disputed` 的 `historical-tradition` Claim 至少需要一个 `primary | scholarship | translation | object-record | fieldwork` 证据；`adaptation` 与 `reference` 可以补充语境，但不能单独支撑传统、古代或历史事实。`modern-reception` 至少需要一个匹配的 `scholarship | object-record | fieldwork | adaptation | reference` 证据。`provisional` 可以暂存类型/role 匹配但证据尚不完整的研究线索，仍不得被 `ready | published | archived` Entry 引用。
- “最早”“首次”“形成于某时期”和跨传统关系必须同时有可定位的一手证据与专业研究；Entry 必须用 `earliestKnownClaimId` 精确指定负责该判断的 Claim，不能在 `claimIds` 中搜索任意碰巧包含相同 Source 的 Claim。被指定 Claim 必须为 `verified`、`historical`、`historical-tradition`，并要求 `primary-text/primary`、`museum-or-library/object-record` 或 `fieldwork-or-community-archive/fieldwork` 成对匹配，以及另一个独立且列入 Entry 书目的 `scholarship` Source 以 `scholarship` role 支撑研究边界。无法证明已穷尽时写 `earliest securely located` 等有边界的表述，不写绝对起源。
- 现代改编、旅游宣传、百科、生成式模型输出和 AI 搜索摘要只能帮助发现线索或说明现代接受，不能单独支撑古代事实；生成式模型输出与 AI 搜索摘要不作为 Source 记录或 Claim 证据。

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

Asset Manifest 是所有公开视觉资产（包括 Hero、正文图与整页氛围背景）的工具无关权威记录；压缩后的 Web/社媒文件可能丢失内嵌 metadata，不能只依赖文件本身或某个生产工具。M3 的详细范围、样例规格与分批实施以 [`requirements/002-visual-asset-pipeline.md`](requirements/002-visual-asset-pipeline.md) 为准。

`assetId` 保存长期逻辑身份，`manifestId` 保存某一不可混淆的版本记录。页面与内容只引用 `assetId`；构建期 resolver 根据显式 `isCurrent` 选择版本，不用最大版本号猜测。owner slot 的稳定键为 `ownerType + ownerId + role + slotId`。

下例是用于说明 Schema 的假想 draft 形状，不是当前钟馗 manifest，也不表示这些字段仍未实施；真实 Hero v2 与 Lead/OG/Social v1 manifest 已为 approved/current，Hero v1 manifest 为 approved/non-current 审计历史，全部包含完整权利、制作、文件、审核与可访问性记录。示例中的 `null` 与空序列只表示 draft 允许的未完成状态，不是可进入 `in-review` 或 `approved` 的占位证据。

```yaml
assetId: asset-zhong-kui-hero-primary
manifestId: asset-zhong-kui-hero-primary-v1
ownerType: entry
ownerId: zhong-kui
role: hero
slotId: primary
version: 1
status: draft
isCurrent: true
briefId: null
accessibilityMode: null
masterRenditions: []
repositoryRenditions: []
referenceAssetIds: []
publicationRights:
  status: pending
  basis: null
  rightsHolder: null
  licenseOrPermissionId: null
  rightsUrl: null
  notes: null
visualElementIds: []
production: null
humanEdits: []
reviews:
  cultural:
    status: pending
    reviewedBy: null
    reviewedAt: null
    notes: null
  rights:
    status: pending
    reviewedBy: null
    reviewedAt: null
    notes: null
  visual:
    status: pending
    reviewedBy: null
    reviewedAt: null
    notes: null
  accessibility:
    status: pending
    reviewedBy: null
    reviewedAt: null
    notes: null
  language:
    status: pending
    reviewedBy: null
    reviewedAt: null
    notes: null
alt: null
caption: null
credit: null
aiDisclosure: null
```

- `assetId` 使用 `asset-{ownerId}-{role}-{slotId}`；`manifestId` 使用 `{assetId}-v{version}`，包级 brief 使用 `brief-{ownerId}-{purpose}-v{version}`。同一 `assetId` 及同 owner/purpose brief 的 `version` 从 1 开始连续保留且不得重复；manifest/brief 文件名、loader ID 与记录内 ID 一致。
- `status`：`draft | in-review | approved | archived`。`isCurrent` 显式决定 resolver 选择；同一逻辑资产与同一 owner slot 最多一个 current，`archived` 强制为 false，并保留 former-approved 的 brief、rendition、制作、权利、无障碍与审核谱系，不能退化为空壳。历史 approved 版本可保留 `isCurrent: false` 供明确回滚。
- draft manifest 可暂缺 brief；`in-review | approved` 必须引用一个 approved brief，且 `visualElementIds` / `referenceAssetIds` 全部能在该 brief 中解析。
- approved 版本除受验证的 current 切换或明确归档外不可原地改写；事实、文件、Claim、权利、制作或审核发生变化时创建新版本。
- `ownerType`：`entry | collection | global`；`ownerId` 保存对应稳定身份。Entry 的 verified Claim 必须归属该 Entry；Collection 只能使用其当前成员 Entry 的 verified Claim；M3 的 global 资产只允许 `decorative + invented`，ownerId 固定为 `site-shell`。
- `role`：`hero | lead | inline | page-atmosphere | og | social`；`slotId` 是同一 owner/role 下的小写 kebab-case 稳定语义键。钟馗最小样例包含 Hero、Lead、OG、Social 四个逻辑资产；Hero desktop/mobile 是同一版本下的两个独立 master rendition，四个 manifest 引用同一包级 approved visual brief 版本。
- `repositoryRenditions` 是放入 `src/assets/images` 的已审核构建输入，每个 `usage` 只保存一份尺寸锁定的源 rendition；`usage`：`hero-desktop | hero-mobile | article-lead | open-graph | social-portrait | social-story | inline | page-atmosphere`。role/usage 固定为：hero 对应 desktop + mobile，lead 对应 article-lead，og 对应 open-graph，social 对应 portrait 与可选 story，inline 对应 inline，page-atmosphere 对应同名 usage。路径、真实格式、尺寸、SHA-256 与 focal point 均由 manifest 显式记录，不从文件名猜测。
- 每个 repository rendition 的 `buildPlan` 记录 Astro 目标格式与 candidate widths。响应式 Web usage 默认格式为 AVIF + WebP，候选宽度取 `640 / 960 / 1440 / 1920` 中不超过源宽度的值，禁止 upscale；OG/social 保留合同规定的精确画布尺寸。页面布局相关的 `sizes` 由 M4 消费组件决定；M4 `dist/` 变体以及 M3-U5 运行期临时变体与哈希文件名都不进入 manifest，也不复制回 `src/assets/images`。
- visual brief 是视觉元素、参考资产与目标 slot/export 的单一事实来源：每个 verified/inferred/invented 元素有小写 kebab-case `elementId`，每个 reference 有 `referenceId`；语义或 reference 未变时跨 brief 版本保持 ID。Manifest owner 必须等于 brief owner，`role + slotId` 唯一匹配 brief target，usage/画布/buildPlan 服从该 target，并只以 `visualElementIds` 与 `referenceAssetIds` 选择同一 approved brief 中实际使用的子集；不重复保存 statement、Claim 或 reference rights。
- informative 资产以及本期钟馗 Hero/Lead/OG/Social 必须至少选择一个 verified element。只有 `decorative`、至少选择一个 invented element 且所选元素全部为 invented 的资产可以没有 Claim；它不得支撑正文事实。verified 表示有证据支持，不表示存在唯一中国神话正典。
- verified element 的 Claim 必须存在、`certainty: verified` 且非 provisional，并列入所属 Entry 的 `claimIds`；其 Source 必须列入该 Entry 的 `sourceIds`。Collection 资产只能选择当前成员 Entry 已完整登记的 Claim；M3 不放行 factual global asset。
- `publicationRights.status`：`pending | approved | rejected`；`basis`：`in-house-original | commission-contract | public-domain | license | permission`。approved 时除 public-domain 外 `rightsHolder` 必填；public-domain 允许 `rightsHolder: null`，但要求可审核 `rightsUrl` 与 creator/source credit。commission-contract 需要 `licenseOrPermissionId`，license/permission 同时需要 identity 与 rights URL。reference asset 的研究/参考许可不能替代成品发布授权；权利未知或未核准时不得进入 `approved`。
- `production.method`：`in-house-original | commissioned-original | public-domain-reuse | licensed-reuse | ai-assisted`。前四者的 rights basis 分别为 in-house-original、commission-contract、public-domain、license/permission；ai-assisted 可使用 in-house-original、license 或 permission，并另行核对工具/模型许可。两类 reuse 都要求非空 credit；`ai-assisted` 必须记录实际 tool、production record 与非空披露。只有实际使用 ComfyUI 时才记录真实 workflow/model 元数据，不创建空壳或 `pending` 哈希。
- `reviews` 分别记录 cultural、rights、visual、accessibility 与 language；状态为 `pending | approved | changes-requested | not-applicable`，每项保存 `reviewedBy`、`reviewedAt`、notes。公开资产的 cultural、rights、visual 与 accessibility 不得标为 `not-applicable`；language 审核覆盖图片内文字/专名、alt 与 caption，只有这些内容均不存在时才可写明理由并使用该状态。所有适用审核进入 `approved` 前完成；审核责任人姓名与日期属于实施事实，不能在合同阶段臆造。
- `accessibilityMode`：`informative | decorative`。`informative` 必须有非空 alt 和相邻 caption；`decorative` 必须使用空 alt，可不逐图显示 caption，但仍需 manifest、credit、适用的 AI disclosure/页面级 visual note 与人工审核。
- SHA-256 使用 64 位小写十六进制，focal point x/y 均为 0–1；`approvedAt` 与 `reviewedAt` 使用带引号的 UTC RFC 3339 时间戳。
- 使用 ComfyUI 时可以保留 workflow JSON 等复现信息，但 sidecar manifest 仍是项目权威记录。参考：[ComfyUI Image-to-Image Workflow](https://docs.comfy.org/tutorials/basic/image-to-image)，访问于 2026-08-26。

M3-U3 对此前自然语言字段冻结以下最小机器形状，后续生产记录必须沿用或先更新需求：

- `masterRenditions[]` 每项严格为 `logicalUri + usage + widthPx + heightPx + sha256`；logical URI 必须有显式 scheme、不得是 `file:`、不得含反斜杠且在同 manifest 内唯一。默认 validator 只核对外部 master 的声明 metadata，不伪造在线可达性或真实哈希；M3-U5 的非默认本地 verifier 另在获授权的项目内 `/.local/` 根逐文件复核路径、目录链接、孤儿文件、格式、尺寸与 SHA-256。
- `repositoryRenditions[]` 每项严格为 `usage + path + format + widthPx + heightPx + sha256 + focalPoint + buildPlan`；`path` 必须是 `src/assets/images/` 下的规范 POSIX 项目相对路径，文件名遵循 `STYLE.md` 的版本/usage/width 合同。visual record 与图片 inventory 从可信项目根逐级拒绝父级或嵌套 symlink/junction。
- `production` 为 `null` 或严格对象 `method + tool + recordPath + workflow`。`recordPath` 必须是直接位于 `visual/production-records/` 的 `.yml` 文件；`workflow` 为 `null` 或 `workflowId + path + sha256 + modelRegistryIds[]`，路径固定落在 `visual/workflows/`。实际 tool 为 ComfyUI 时 workflow/model metadata 必填；未使用时不创建空壳。
- `productionRecords` 是独立 build-time collection。每份 strict 记录包含 `productionRecordId`、`briefId`、method/tool、可空 model identity、tool terms URL、rights notes、`recordedAt`、逐 usage rendition 与 notes；逐 rendition 保存 manifest ID、实际 prompt 或 `null`、本地收到输出的 `receivedAt`、输入图片 hash/权利说明、raw output 格式/尺寸/hash、master tuple、处理工具/版本/operations 与 `verifiedAt`。AI-assisted 必须有 tool、model notes、terms URL 与非空 prompt；未暴露模型 ID 时保持 `modelId: null` 并说明，不得猜测。
- manifest 的 `recordPath` 必须解析真实 production record；两者 brief、method、tool 一致，record 中每个 `manifestId + usage` 的 master URI/尺寸/hash 与 manifest 完全相同，并由 record rendition 反向指回该 manifest。默认 Astro build 只校验已提交记录，不读取 Git-ignored master；`.local` 缺失不能让 clone/CI 失败。
- `humanEdits[]` 是唯一、非空的简短人工修改说明字符串列表，不复制完整生产日志。`referenceAssets[]` 使用 `organization` 与 `creator` 两个显式非空身份字段；无法确认 creator 时必须先修订研究记录或需求，不能用空值绕过。
- 当前 Schema 没有“图片内含文字/专名”独立布尔字段；因此 language `not-applicable` 只在 decorative、显式空 alt、无 caption 且人工 review notes 给出理由时放行。只要是 informative 资产，language review 必须 approved。若 U4 需要更细的图中文字状态，先扩展本合同与测试。
- U4 已新增 production record Schema、loader、inventory 与双向 manifest/master 关系门禁，并在首轮五个最终画布存在后落盘一份真实记录。终验 Hero v2 返修沿同一合同新增两份 master、两份 source、一份 manifest 与第二份 production record；v1 文件与记录不覆盖，只把 Hero v1 `isCurrent` 改为 `false`。Git-ignored master 的实际尺寸/hash 与真实 WebP/PNG repository source 均已在生产会话据实核验；ComfyUI workflow/model registry 本期不适用。2026-08-29 Project owner 已确认个人且非组织管理的 ImageGen 账户、发布授权，以及文化、权利、视觉、无障碍与语言五项审核；这些人工事实记录在 manifest 中，仍不能由自动门禁替代或重建。非默认 verifier 现复核七个 master，并从三个 current responsive buildPlan 实际生成、解码核对 22 个 AVIF/WebP 目标；该验证不改变 Entry 的稳定 `heroAssetId`，resolver 仅把其 current 版本解析为 Hero v2。

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

- ID 使用小写 kebab-case，只表达对象身份，不包含栏目、年份或状态；Entry、Collection、Source、Claim、Terminology 与逻辑 Asset 六类稳定 ID 在同一内容图内全局唯一。`manifestId` 是版本记录身份，不替代稳定 `assetId`。
- Entry、Collection、Source、Claim 与 Terminology 继续一文件一对象，文件名就是稳定内部 ID；Astro loader 生成的 `entry.id`、文件名和记录内对应 `*Id` 必须三者一致。Asset Manifest 与 visual brief 是一文件一版本记录：文件 stem 和 loader ID 分别等于记录内 `manifestId` / `briefId`，其中 `assetId` 仍是跨版本逻辑身份。frontmatter/data `slug` 不得覆盖内部身份。
- 关系只保存稳定 ID，不保存展示标题。
- `Collection.entryIds` 是 Collection 成员关系与顺序的唯一事实来源；Entry 的反向 Collection 列表由构建期派生，不另存一份关系。
- 构建时必须验证：六类稳定 ID 全局唯一，`manifestId` / `briefId` 版本记录身份分别唯一，Entry 与 Collection 的 slug 在两类间全局唯一，关系目标存在、Collection—Entry 状态符合第 2.2 节矩阵；`featuredEntryId` 存在时必须同时出现在该 Collection 的 `entryIds` 中并通过相同状态校验。`published` Entry 的 `relatedEntryIds` 只能指向 `published` Entry；`archived` Entry 只保留指向 `published | archived` Entry 的历史关系，不能借归档状态引用 draft/未公开对象。
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
- Entry 进入 `ready` 后，其已关联 Claim 与 TerminologyRecord 使用的全部 Source 都必须同时出现在该 Entry 的 `sourceIds` 完整书目中；draft 允许研究中的书目暂未闭合。
- Sources 区显示作者/机构、标题、版本/年份、链接和访问日期等适用信息。
- 外部网站链接使用描述性名称，不显示无上下文裸 URL。

### 5.2 声明级来源

以下内容必须使用段落脚注、source note 或结构化 Claim 关联，而不仅在文末列一堆书：

- “最早出现”“首次记载”“在某时期形成”等时间判断。
- 原典原文、译文和具体情节。
- 不同神系、地区或文本之间的关系。
- 历史人物事迹与神化过程。
- 容易与现代流行改编混淆的说法。

M2 先校验 Entry `claimIds`、成对的 `earliestKnownClaimId` / `earliestKnownSourceId`、Claim `evidenceContext`、`sourceLinks`、locator、Source 类型/role 与 certainty 的结构化关系，不为尚未完成的生产正文引入 MDX 或自定义 Markdown 插件。正文附近 source note 的最终作者语法与可访问回链在 M4 首个真实 Entry 模板中确认；在该语法有真实测试前，不得声称“附近引用”已自动覆盖。

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

1. 完整 Entry 发布视觉须先完成传统分类、Claim/source locator 和关键 TerminologyRecord 审核；M3 这类 scoped visual sample 只要求闭合画面实际涉及的 Claim/Source 与适用 Terminology，未引入新术语时可以没有 TerminologyRecord，完整 `traditionType` 留到正式 Entry 审核。
2. 形成并人工核准 versioned visual brief，把元素分为 verified / inferred / invented，并逐项核对 Claim 与参考资产权利。
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

- 每份 brief 使用 versioned `briefId`、正整数 version 与 `draft | in-review | approved | archived` 状态，并以 owner 和 target slots 固定 role/slot、usage、画布与构建目标；进入 approved 时必须保存真实 `approvedBy`、`approvedAt` 与 notes。approved brief 不原地改写，内容变化创建新版本；只有撤回时才归档，归档前先归档所有引用它的 `in-review | approved` manifest。`in-review | approved` manifest 必须引用 approved brief，draft 可暂缺；未核准 brief 不得启动生产。
- 每个 visual element 有 brief 内唯一 `elementId`。verified 元素必须逐项关联 `claimIds`；inferred 元素写明推断理由；invented 元素不得以史料口吻出现在 caption。verified 只表示有证据支撑，不表示存在唯一正典。
- 每个 reference asset 有 brief 内唯一 `referenceId`、URL、作者/机构、`rightsStatus`、rights URL、适用 license/permission identity 与 notes。`rightsStatus` 为 `research-only | public-domain | licensed | permission | unknown`；licensed/permission 必须有 identity 与 rights URL，public-domain/research-only 必须有可审核 rights URL，unknown 阻断 brief approved。research-only 只允许研究，不授予复制或衍生权。
- verified Claim 必须存在、非 provisional、列入 owner Entry 的 `claimIds`，其 Source 列入该 Entry `sourceIds`；Collection 资产只使用成员 Entry 已闭合的 Claim/Source 链。
- 无论采用何种工具，都要检查 pseudo-Chinese characters、错时代服饰/器物、错置日本或欧洲奇幻元素、logo、watermark 和明显生成缺陷。
- 不得使用 `in Black Myth style`、其他受保护品牌造型或在世艺术家的名字替代可解释的视觉描述。

### 6.2 目录与存储

目标生产结构：

```text
visual/
├─ briefs/                 # versioned visual brief YAML
├─ manifests/              # versioned Asset Manifest YAML
├─ style-guides/           # 有稳定复用价值时才创建
├─ workflows/              # 使用 ComfyUI/经批准的可复用本地工作流时才创建
├─ production-records/     # 适合入库的小型、versioned 生产记录
└─ model-registry.yml      # 仅在本地管理且可稳定登记模型时创建

src/assets/images/         # 已批准且尺寸锁定的 Astro 图片源 rendition

当前项目根内、Git-ignored 本地生产存储：
.local/visual-production/
├─ explore/                # 候选与废图，不进入 Git/build
└─ masters/{ownerId}/vN/   # 经选择的高分辨率 master；由 logical URI + SHA 追溯
```

- 只有用途稳定、体积小且经过批准的 Web 文件、manifest、brief、生产记录或 workflow 才进入 Git inventory；工具环境、模型权重、私有参考图、探索废图和高分辨率 master 保存在 `/.local/` 或后续对象存储，并在 manifest 中保留 logical URI 与 SHA-256。
- 只有本地管理且实际暴露稳定模型包/版本的生成流程才在 `model-registry.yml` 记录名称、来源、版本、SHA256、许可证和商业用途判断。托管式 ImageGen 未暴露的模型身份只在 production record 如实标为未暴露，不创建猜测记录。
- 参考图默认不公开；研究用途不自动授予衍生和发布权。
- 压缩和最终响应式变体交给网站构建链路，避免由任一视觉工具反复重采样；仓库输入与 M4 `dist/` 可重建输出不得混为同一 manifest 文件记录。M3-U5 只把验证 `outDir`、图片缓存和 Vite cache 写入运行期 `/.local/visual-production/m3-build-check-*` 并在结束时清理；Astro 可能刷新 ignored `.astro/` 构建元数据，该缓存不是发布制品、manifest 记录或持久验证证据。

### 6.3 审核门禁

一张图片进入 `approved` 前必须通过：

- 文化/时代/器物审校。
- 伪文字、额外肢体和明显生成缺陷检查。
- 参考图、字体、授权素材及实际使用的模型/LoRA 等资产的权利状态检查。
- approved brief、visual element/reference ID 子集，以及 verified Claim/Entry/Source 的完整外键链。
- 成品 publication rights；不能用 reference asset 的研究许可代替。
- cultural、rights、visual、accessibility 与适用 language 审核均记录审核人、日期和结论。
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
- Entry 引用的中文 Source 标题已完成来源核对/双语审校，`titleZhLang` 不再保留 generic `zh`。
- traditionType、sourceIds、claimIds、适用的 terminologyRecordIds、related IDs 和 lastFactCheckedAt 完整。
- 所有拟公开的事实性文化主张都有可定位证据；`provisional` Claim 未作为事实发布，`disputed` Claim 已在页面显示分歧。
- 所有公开视觉资产都能解析到唯一 current approved manifest 版本，manifest、导出物、真实尺寸与 SHA-256 一致。
- alt / 空 alt、适用的 caption、credit、AI disclosure、权利状态与生产方式一致；若后续需求引入商业入口，其披露还须通过第 7 节门禁。
- 每个待提升 Entry / Collection 及其适用页面都已在 noindex review 直达页完成适用的 M4-U5 候选预检，包括移动、键盘、减弱动效、无 JavaScript、字体/图片失败和视觉检查；Explore/Collections 此时可以保持真实空状态。首个纵切片只是批量扩展前的首次预检，M6 新对象不得借用旧对象的证据；这些预检只支持各自内容进入 `ready`，不关闭完整 M4-U5。

状态变更不允许靠修改一个字段绕过验证。M5/M6 完成 6 篇 Entry、至少 2 个 Collection 与全部资产后，Project owner 才在完整 inventory 上逐项作出 `published` 决定并批准目标公开日期；随后必须在真实非空 Home/Explore/Collections 与受影响动态页上最终关闭 M4-U5，再确认 origin 并进入 U4B。M2 已建立本地工程门禁与命令，实际服务、远端预览和发布仍须在对应里程碑开始前继续补齐 `DEV_WORKFLOW.md` 并取得独立授权。
