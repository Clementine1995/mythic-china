# 首个纵切片编辑/视觉候选与 Collection、Guide Hero 生产闭环合同

## 0. 文档职责与当前状态

本文负责：把 *The Chinese Underworld* 的首个 Collection、首发 Guide、Featured Entry、Collection Hero 方向和生产字体方案推进到 Project owner 可人工判断的候选检查点，并追溯其后经单独确认完成的 Collection 与 Guide Hero 生产闭环。

本文初始候选检查点不负责：字体下载或落库、字体子集实际生成、图片生成或馆藏图下载、visual manifest/production record、内容 `ready/published`、public 构建、浏览器服务、Vercel 项目、部署或发布。2026-08-30 的后续 Project owner 决策单独授权 Collection Hero A 待审候选生成、上游英文 WOFF2 落库与匹配风险的本地验证；2026-08-31 又先后独立确认 Collection 与 Guide 的最终组合、个人账户/权利、五审、公开文案与 exact-canvas 生产链，以及两份 Terminology 和四条馆藏标题 locale。2026-09-01，Project owner 再次要求继续、批准并确认执行 CJK 字符集、隔离子集工具与 cmap 静态门禁；该批授权不包含内容状态提升、服务/浏览器、M4-U5/U4B、Git 写入、Vercel 或发布。同日 CJK 本地检查点完成后，Project owner 又单独确认下一步为 noindex M4-U5 候选预检并要求按计划继续；该后续授权只覆盖 Windows/local preview/browser、直接缺陷修复、匹配测试和证据同步。Project owner 随后明确授权 M4-U5A 的 noindex 字体样张、自动负门禁、可控 Windows/local 浏览器场景与证据同步；该授权继续排除依赖、字体/内容/资产链变更、public/M4-U4B/M5/M6、Git 写入、Vercel、部署和发布。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | Project owner 阶段性通过；Collection 与 Guide Hero 生产闭环、M4-U5A、最终三档基础矩阵与当前 8 页人工视觉判断已完成 | 2026-08-30 至 09-02 的内容、Hero、双语/CJK、正式页矩阵与功能页复看保持；direct-only noindex 样张现已覆盖精确字体矩阵。最终 review 在 8 页 × 390/768/1440 共 24 个实际组合通过基础布局/字体/资源/console 检查，Project owner 随后明确通过全部 8 个页面；这支持 M4 本地实现关闭。真实键盘/200%/偏好、故障/本地性能/实际 fallback 与支持平台仍未闭合，归 M6 release-candidate gate；M7 只承接生产与 live/RUM 基线 |
| 内容状态 | `editorial-review` | 两篇 Entry 有正文、80–120 词摘要、来源、Claim、`bilingual-approved` 术语与 fact-check 日期；四条馆藏标题为 `zh-Hant`，Collection 为 `editorial-review` |
| 视觉状态 | Collection Hero v1 与 Guide Hero v1 均为 `approved/current` 并已绑定 | 两组资产各有独立 desktop/mobile master、repository source、production record 与 manifest。Collection 绑定 versionless `asset-chinese-underworld-hero-primary`，Guide 绑定 versionless `asset-chinese-underworld-guide-hero-primary`；两者仍保持 `editorial-review` |
| 字体状态 | 英文与 CJK 候选及 U5A 样张已接线；最终三档基础矩阵已通过，发布浏览器/跨平台验收仍待 M6 | 4 份英文与 SC/TC × 400/500/600 六份 WOFF2 继续受静态门禁；最终样张锁定并实际显示 20 个精确组合、生产 pinyin/冻结混排行、SC/TC required 与 fallback-only 节点，三档均观测到 10 个字体资源。真实 fallback 可读性、慢/阻断加载、200% 和跨平台证据仍缺失，inventory 状态保持 `browser-review-pending`，其含义为发布 QA 待完成而非 M4 未完成 |
| 发布状态 | 未授权 | 0 published Entry / 0 published Collection；无 public dist、Vercel 项目或部署 |

## 1. 目标、不做范围与完成标准

### 1.1 目标

1. 让 Project owner 能逐项判断字体、Collection Hero、Collection 模板和两篇首发内容，而不是面对空占位或已越权的“成品”。
2. 让文化陈述从 Entry 正文回到 Source/Claim/Terminology，并明确哪些是事实、编辑选择和未决风险。
3. 建立可执行的本地实现与后续 release QA 边界：brief 与生产授权不能替代具体字体/成图人工批准；内容状态提升、public artifact 和发布仍须各自满足后续合同。

### 1.2 初始候选准备不做范围（历史边界）

以下条目描述进入第一次 Project owner 检查点前的边界；后续已获授权的例外与结果见第 7–12 节：

- 初始批次未增加第三方依赖，未执行字体工具或外部生成服务。
- 初始批次未把研究候选图、字体二进制、production master 或探索废图写入仓库。
- 初始批次未批准 Collection Hero brief，也未创建虚假 asset ID 或 manifest。
- Entry/Collection 始终未提升到 `visual-review`、`ready` 或 `published`。
- 初始批次未启动 dev/preview/browser 服务；后续浏览器评审批次均获单独授权并在各自收口时停止。2026-09-02 最终人工验收面及 PID `31960` 的启动、Project owner 通过与停服记录见第 11–12 节。
- 该历史检查点当时把本地 public 构建能力记为 M4-U4B；2026-09-02 总检已将其迁入 M6 public artifact assembly。一个 Entry + 一个 Collection 的技术下限及 M6/M7 的内容量、预览和发布门禁均未放宽。

### 1.3 初始候选检查点完成标准（历史）

- 两篇 Entry 都通过 Content Layer editorial-review 条件和关系图校验。
- 每个正文事实可由正文附近链接和结构化 Claim 回到真实来源；无“AI 补齐”的文化事实。
- Terminology 在初始候选检查点只到 `source-checked`；2026-08-31 后续已获双语人工批准，见第 7 节。
- Collection Hero 有一份已批准方向、但未批准任何成图的 brief；verified/inferred/invented、权利与排除项分开。
- Collection 模板在该检查点只具备未来独立 approved Hero 的插槽；当时仍显示无图候选，不借用 Zhong Kui Hero。
- 页面可见 `By Mythic China Editorial` 与 fact-check 日期，但没有 publication date。
- 固定运行时完整工程门禁与 Markdown/UTF-8/链接/占位符/diff 门禁在每次实质修改后重跑；英文正式字体页面效果和 Hero 成图另等人工评审。

## 2. 已确认事实

- 当前 HEAD、`main` 与未 fetch 的本地 `origin/main` 在接管时均为 `e94eacaad989652c7f71ae50276652cc3f54997a`；工作树已有 M4-U4A 与治理文档未提交改动，本批次不覆盖或丢弃它们。
- 本批次开始前真实 inventory 为 0 published Entry、0 published Collection、0 Collection Hero asset、0 font file；后续英文字体单元新增 4 份 WOFF2，Collection 与 Guide Hero 生产闭环各新增一个 approved/current 逻辑资产，但 published inventory 仍为 0。
- Zhong Kui 已有 approved/current Entry Hero v2；该资产属于 Entry，不能作为 Collection Hero。
- Collection 与 Guide Hero 的独立 brief、asset/manifest、publication rights 与五类人工审核现已闭合；批准结果只授权两项资产在 noindex review 链中按现有内容状态消费，不满足内容 `ready/published`、M6 最终 public artifact QA 或发布条件。当前视觉 inventory 为三份 approved brief、11 个 local master、11 份 repository source、四份 production record、七份 manifest 版本记录、六个 approved/current 逻辑资产与七份 current responsive rendition。
- 现有 M4 review build 为 noindex 内部评审输出；public runner、Layout/route/endpoint 接线、public dist 和 Vercel 身份仍不存在。

## 3. 编辑候选

### 3.1 *A Guide to the Chinese Underworld*

- 定位：给非专业读者提供一个有边界的入口，不制作“十八层地狱大全”或跨时期总地图。
- 采用的窄模型：Columbia Asia for Educators 所述的十位审判者、官僚化法庭、非永恒惩罚、仪式援助与轮回；The Met 南宋《十王圖》只支持该对象中的王、书记、官员、判决和惩罚层级。
- 翻译选择：`阴间 / yīnjiān` 首次释为 “the underworld”；拒绝用 “hell” 覆盖全部语义，也不把 `Diyu` 当作自动同义替换。
- 保留边界：不宣称一套自古统一的中国阴间体系；不指定未核实的法院、道路、刑罚、神名或仪式。

### 3.2 *Zhong Kui, the Demon Queller*

- 定位：通过具体馆藏比较保护者、驱鬼者、鬼从首领和文雅士人的不同表达。
- 采用事实：对象记录支持有胡须/袍服、鬼从、入鞘佩剑、节令保护与馆方复述的治病梦传说。
- 保留边界：梦故事明确写作 legend；当前没有满足项目 earliest-known 双重证据门禁的原典与独立研究，因此 `earliestKnownSourceId/ClaimId` 保持 `null`。
- Collection 关系：钟馗是本站策展的 threshold figure，不是十王之一、阴间统治者或跨传统固定官员。

### 3.3 可见署名与日期

- 候选 byline 固定为 `Mythic China Editorial`，与现有 Organization 作者身份一致，不虚构个人作者。
- 页面显示 `lastFactCheckedAt`，标签为 `Fact checked`；两篇候选日期为 `2026-08-30`。
- `publishedAt` 与 `updatedAt` 保持 `null`；当前日期不是 publication date。
- M6 若逐项批准 `published`，还须明确目标公开日期；protected preview 可使用未来日期，但不得把构建日、预览日或部署日代填为 `publishedAt`。目标日期变化后重验受影响页面、SEO 与 release artifact。
- Project owner 若修改事实，应在实际完成复核后更新 `lastFactCheckedAt`，不得把评审日期自动当作事实核查日期。

## 4. Collection Hero 与模板候选

### 4.1 候选 A：原创抽象门槛（Project owner 已选择）

- brief：`brief-chinese-underworld-hero-primary-v1`，Project owner 于 2026-08-30 批准方向并授权下一候选生产任务；2026-08-31 又选中 desktop 02/mobile 01 的构图，随后在 exact-canvas 成品上独立批准资产、权利、五审和文案。
- 核心：从可读的入口下行到两三层远景法庭，以路径、记录桌和小型官员轮廓表达“审判是通往轮回的过程”。
- 不做：不画钟馗、不指定阎王、不展示酷刑、不绘制十殿/十八层地图、不写伪汉字。
- 优点：能建立 Collection 自己的阈限/深度视觉，不把单件文物误装成整个传统，也不与 Zhong Kui 人物 Hero 竞争。
- 风险：所选候选使用个人且非组织管理账户下的 OpenAI ImageGen 重建，没有上传馆藏或其他第三方参考图；工具未暴露模型 ID，生产记录保持 `null`，并明确不主张排他性、当然可版权性或绝对不侵权。当前资产链、Windows/local 三档基础矩阵与本批页面人工判断已闭合各自范围；M6 最终 public artifact 的故障、性能、实际 fallback、支持平台与目标读者 QA 仍未闭合。

当前 local explore inventory：

- desktop candidate 01：`1672×941`，已因左侧安全区过亮和无来源灯具预筛退回；
- desktop candidate 02：`1672×941`，SHA-256 `64f51d3697d2ca6e7e1e7c253906bbb5dca39f5541aa6dacd13f2dd7ae100866`，Project owner 于 2026-08-31 选中；
- independently composed mobile candidate 01：`1122×1402`，SHA-256 `e891e2abbf71c4c03624e0d8ba0eeb59852e39500b630fc16b07923756dbb35c`，Project owner 于 2026-08-31 选中。

三张图和真实 prompt/input/hash metadata 只在 Git-ignored `.local/visual-production/explore/chinese-underworld/hero-a-v1-review/`；这些 native 输出不是 `3200×1800` / `1600×2000` master。

### 4.2 候选 B：公共领域对象直接复用（后备路径）

- 来源候选：The Met `Ten Kings of Hell`, object 30.76.293，页面标注 Public Domain/Open Access。
- 约束：必须作为“南宋具体对象”清楚 caption/credit，不得当作阴间真实照片或唯一标准图；移动裁切不能删除对象语境或制造新叙事。
- 优点：来源、年代与权利边界清楚，减少生成式视觉风险。
- 风险：竖幅对象适配宽 Hero 的裁切空间有限，且容易让读者把一件佛教绘画误读成全 Collection 的唯一图解。
- 当前状态：仅作比较路径；未下载、未建立资产记录、未获选择。

### 4.3 模板候选

- Collection 路由在 `heroAssetId` 非空时调用现有 approved page-asset resolver，并要求 `ownerType: collection`、当前 approved、`hero/primary`、informative accessibility；当前稳定 ID 已解析到 Collection Hero v1。
- 模板有独立 `ManifestHeroPicture` 插槽与 caption/credit/disclosure；`heroAssetId: null` 时保留现有抽象 surface。
- 该代码能力不把任何图片变成候选或批准资产，也不改变 public release projection。

## 5. 正式字体、许可证与子集方案

### 5.1 2026-08-30 核对的上游候选

| 角色 | 上游版本候选 | 许可/RFN 事实 | 本轮决定候选 |
| --- | --- | --- | --- |
| 英文 Display/UI | Geist Sans v1.7.2 | OFL 1.1；当前 OFL 版权头未声明 Reserved Font Name | 已从官方 release 落一份未修改 Roman variable WOFF2；全站只 preload 这一份 |
| 英文正文 | Source Serif 4 v4.005R | OFL 1.1；Reserved Font Name 为 `Source` | 已落官方未修改 Roman 400/600 与 Italic 400；Entry 只 preload Roman 400，Semibold/Italic 按真实命中加载 |
| 中文 Display/UI | Source Han Sans 2.005R SC/TC 候选 | OFL 1.1；Reserved Font Name 为 `Source` | 已从固定 2.005R commit 的 SC/TC variable TTF 分别生成 400/500/600 静态子集；修改版 primary family 使用 `Mythic Han Sans SC/TC`，不 preload。Windows/local 页面已观察 SC/TC 400 命中，完整字重、困难字形、故障与跨平台效果仍待判断 |
| 短中文引文 | Source Han Serif 2.003R SC | OFL 1.1；Reserved Font Name 为 `Source` | 首个纵切片没有需 serif 的中文原文，先批准家族方向但不落文件；首次真实使用时再生成 400/600 子集并命名 `Mythic Han Serif` |

版本号是本次查询事实，不是自动升级策略。英文资产已固定到 `src/assets/fonts/font-assets.json` 的 release/tag、archive URL、SHA-256、文件 hash 与许可证；不得静默追随 latest。Source Serif 上游 release 未公布 archive digest，inventory 明确把该值标为本地计算，不冒充上游校验值。

### 5.2 子集、命名与替换缝

1. 字符输入只能来自 Project owner 已批准进入 public candidate 的真实内容与固定 UI 字符；研究笔记、废稿和未来假想词不进入集合。
2. CJK 子集必须按已核定的 `zh-Hans` / `zh-Hant` 分开字符表，覆盖真实内容、所需中文标点和冻结样张的显式 required probe；构建门禁比较渲染文本、批准字符表与 font cmap，缺字即失败。用于验证系统 fallback 的 `测`/`測` 是独立 fallback-only probe，必须不存在于 required、`unicode-range` 与自托管 cmap，不能反向加入子集使测试失效。`titleZhLang` 与 Source `titleZh` 成对；四条馆藏中文字段于 2026-08-31 回到馆方页面复核并记录原文，随后由 `Project owner (user-confirmed)` bilingual reviewer 核定为 `zh-Hant`。这是显式审校结论，不是页面字形自动推断；内容图继续阻断未来 generic `zh` 记录进入 `ready | published | archived` lineage。
3. 生成子集、实例化 weight 或转换格式均视为修改。由于 Adobe 的 OFL 声明保留 `Source`，修改版 primary family 不使用 `Source` 名称；许可证、版权、原始上游、修改步骤和生成日期写入 `FONTLOG`。
4. Geist 和 Source Serif 优先使用上游直接提供的 WOFF2，不做不必要子集；若后续性能要求必须修改，也要重新评估 RFN、改名和 FONTLOG。
5. 每个实际分发字体随仓库保存适用 OFL 全文与版权声明；CSS 使用 `font-display: swap`、`font-synthesis: none`，`size-adjust`/metrics override 只在实测后填写。
6. 页面、模板和组件只能消费 `--font-display`、`--font-story`、`--font-zh-display`、`--font-zh-text` 等稳定角色 token，不得硬编码 Geist、Source Serif 或 Source Han 上游名称。
7. `@font-face` 使用项目内部 CSS family alias 映射具体上游文件；替换字体时只更新字体资产、许可证/来源记录、alias 声明与经实测的 metrics，不修改页面模板、内容或 Collection 主题。内部 alias 不是对上游二进制的改名声明；实际修改/子集字体仍必须遵守 RFN 改名合同。

### 5.3 加载候选

- 所有页面：preload display Roman；具体上游 URL 只由中央 registry 提供，Source Han 字体不 preload。
- Entry 页面：按实际正文需要额外 preload story Roman 400；Semibold、Italic 和 CJK 按 CSS 命中加载。
- CJK 使用窄 `unicode-range` 与本地 fallback 链；不加载完整 CJK 变量字体。
- 每个 WOFF2 的文件大小、首次渲染、CLS、命中字形、慢加载和禁用字体表现必须记录实际证据，不预填预算通过。

### 5.4 字体落库授权与依赖停止点

Project owner 于 2026-08-30 接受本节字体版本、改名与子集方向，并授权下一本地候选任务继续；字体必须通过稳定角色 token 与内部 family alias 保持可替换。该次授权允许核对并下载已确认的官方上游文件、写入批准字体资产/许可证、更新 CSS 与执行匹配风险的本地验证，但当时不自动授权安装字体工具或其他依赖。2026-09-01 后续“全部批准 / 确认执行 / 继续”单独授权本轮隔离工具链：Python 3.13.13 + `fonttools==4.63.0` + `Brotli==1.2.0` 只写 Git-ignored `.local/font-production/`，两个固定 Adobe commit URL 只下载公开 TTF，不上传项目数据；删除该目录即可退出。默认检查不依赖 Python，使用直接开发依赖 `fontkitten@1.0.3` 读取已经哈希锁定的 WOFF2，并用 MIT `parse5@8.0.1` 按 HTML5 真实树核对 `lang` 继承；两者都不进入浏览器运行时。

### 5.5 M4-U5A 字体样张合同

`/review/type-specimen/` 是仅供直达复核的 noindex review utility，不是内容页、导航项或 public 页面类型。它只消费现有字体角色 token，不改变字体 inventory、family alias、预加载策略或内容投影。

| 样张组 | 精确覆盖 | 约束 |
| --- | --- | --- |
| Display | 400 / 560 / 600 / 650 normal | 现有 variable display face；分别标注 hero、UI、metadata、pinyin 等内容用途，不新增 body family |
| Story / body | 400 normal、600 normal、400 italic | body 是 story 角色的正文用法；必须命中现有三个 static face |
| SC | `lang="zh-Hans"` × 400 / 500 / 600 | 每行覆盖批准的 65 required code points，使用 `--font-zh-hans-display` |
| TC | `lang="zh-Hant"` × 400 / 500 / 600 | 每行覆盖批准的 36 required code points，使用 `--font-zh-hant-display`；不得临时扩展 required set |
| Pinyin / punctuation | [`DESIGN.md` 5.2.1](../DESIGN.md#521-字体验收样张) 冻结字符串 | 保持 NFC；UI 标签只用英语，避免污染 CJK 精确字符集 |
| Fallback-only | `测` / `測` | 分别继承 Hans/Hant locale 与同一 CJK family stack；只用专门标记节点，不得显式改用 system font |

精确正反门禁必须拒绝缺失、额外、重复或错误的 sample role/content role/weight/style/lang/fallback 组合，并保持 4 份英文加 6 份 CJK、共 10 份 hash-locked WOFF2。样张不得修改 `font-assets.json`、`cjk-character-sets.json`、字体二进制、`unicode-range`、cmap、OFL/RFN/FONTLOG 或许可证；完成 U5A 也不把 `browser-review-pending` 写成完整浏览器/跨平台通过。

## 6. `ready` 内容候选与 M6 发布 QA 移交

| 门禁 | 当前事实 | 进入下一状态所需 |
| --- | --- | --- |
| 内容编辑 | 两篇为 `editorial-review` | Project owner 逐篇接受标题、开头、摘要、正文、来源边界与 Collection 关系 |
| 事实核查 | 当前来源与 Claim 已本地闭合 | 人工核对每个正文主张/locator；任何新增事实先新增来源，不让 AI 补空 |
| 双语术语 | 两份 Terminology 已由 `Project owner (user-confirmed)` bilingual reviewer 批准为 `bilingual-approved` | 保持当前术语、首次释义、拒绝项与来源边界；实质改写须重审 |
| Source 标题 locale | 教育部词条与四条已复核馆藏标题均为 `zh-Hant`；四条馆藏记录已获同一 reviewer 明确批准 | 保持精确 locale；内容图继续机器阻断未来 generic `zh` 被 ready lineage 引用 |
| Collection Hero | Hero A v1 已完成权利/五审、exact-canvas master、production record、approved/current manifest 与稳定 Hero ID 绑定 | 保持现有资产谱系；任何图像实质修改必须建立新版本并重跑匹配审核。最终 public 页面表现由 M6 release-candidate QA 判断 |
| Guide Hero | Guide Hero v1 已完成权利/五审、exact-canvas master、production record、approved/current manifest 与稳定 Hero ID 绑定 | 保持现有资产谱系；任何图像实质修改必须建立新版本并重跑匹配审核。最终 public 页面表现由 M6 release-candidate QA 判断 |
| 字体 | 4 份英文与 6 份 CJK WOFF2、静态门禁及 noindex 样张均已接线；Windows/local 样张覆盖 display/story/body、pinyin、SC/TC 400/500/600、65/36 required 与 fallback-only `测`/`測`，Project owner 已通过当前页面效果 | 在 M6 最终 public artifact/预览补实际 fallback 可读性、慢/阻断字体、真实 200% 和支持平台抽样；不要求识别某个固定系统字体名称 |
| 页面 | review-only；最终 8 页 × 390/768/1440 共 24 个实际组合与四条 Hero 页 12 个 art-direction 组合已通过基础矩阵，Project owner 已通过全部 8 个页面 | 在 M6 组装后补真实 Tab/Enter/Space、200% zoom、reduced motion、禁用 JS、慢/阻断字体、图片失败、LCP/CLS、支持平台与完整 inventory 最终页面判断 |
| 状态 | 0 published；仍为 `editorial-review` | review 页面/样张存在及当前视觉通过均不构成状态提升。两篇 Entry 的 Hero、双语术语、Source locale、CJK 静态链、U5A 与当前 8 页视觉判断已闭合各自范围；`ready` 仍须完整 Claim/fact-check、编辑、关系、批准资产与内容无障碍文案，Collection 只能引用 ready/published Entry。页面运行时/平台 QA 不属于单条内容状态，但会在 M6 阻塞 public receipt、预览和发布。`published` 只在 M6 完整 6 篇 Entry / 至少 2 个 Collection 本地 inventory 上由 Project owner 作出进入 public artifact 的决定，不等于部署；M7 负责经预览验收后的生产发布与发布后基线 |

## 7. Project owner 决策记录

2026-08-30，Project owner 在真实本地 review 页面可见后确认“目前来看可以”，随后明确：

1. 当前两篇 Entry、Collection、`Mythic China Editorial` byline、可见 `Fact checked` 日期、页面模板排版与 CSS 无图 Collection Hero 作为阶段性候选通过；不把该反馈扩大为 `ready` / `published` 或 M4-U5 通过。
2. Collection Hero 选择候选 A：原创抽象门槛；批准 brief 并授权候选生产任务，但任何生成图仍须另行人工审核。该任务现已形成 desktop 02 与 mobile 01 两张首选待审图。
3. 接受四个字体家族/版本方向、Adobe 修改版改名与 Source Han Serif 延迟落库，并新增“字体必须保留可替换空间”的硬门禁。
4. 授权下一本地候选任务继续，并授权停止本次 preview；不授权依赖安装、Git 写入、Vercel、部署或发布。

2026-08-31，Project owner 明确“确认采用”所展示的 desktop 02 与 mobile 01：

5. 两张构图进入生产准备；本轮未提出定向修图要求。mobile 右下可见纹理继续留在后续视觉五审中观察，不据此推断任何文化含义或提前写成批准细节。
6. 本次确认只选择 local composition，不自动确认当前工具条款、账户 authority、publication rights、五类审核、exact-canvas master、alt/caption/disclosure、manifest、Collection 绑定、状态提升或 public use。

同日，在查看两张最终 exact-canvas 评审图并阅读权利、五审与公开文案说明后，Project owner 进一步明确确认：

7. 项目和本次 ImageGen 使用均为个人、非组织管理关系；账户由 Project owner 合法使用，没有无权第三方输入，也不受雇主、客户或其他组织协议限制，并同意按当前适用条款为 Mythic China 保存、编辑与公开展示输出。
8. publication rights 采用 `in-house-original`，rights holder 记录为 `Mythic China project owner (private individual)`；该记录不主张排他性、当然可版权性或绝对不侵权。
9. 最终 desktop `3200×1800` 与 mobile `1600×2000` 的 cultural、rights、visual、accessibility、language 五项审核均通过；alt、caption、`Mythic China Editorial` credit 与 AI disclosure 原文通过。

同日，在查看 Guide desktop A2、独立构图且定向修正后的 mobile 成图及完整权利/审核/文案说明后，Project owner 回复“全部确认”：

10. 批准 Guide desktop A2 与 independently composed mobile 作为最终组合，并批准等比 exact-canvas 后的 `3200×1800` / `1600×2000` lossless master 与同画布 WebP source。
11. 确认 Guide 生产同样使用个人、合法控制、非组织管理且不受雇主、客户或组织限制的 OpenAI 账户；仅向 ImageGen 提供项目生成候选，没有上传馆藏、历史图像或未经授权的第三方图片，并授权 Mythic China 保存、编辑和公开展示输出。
12. 批准 Guide 的 `in-house-original`、`Mythic China project owner (private individual)` 权利记录，以及 cultural、rights、visual、accessibility、language 五项审核；该记录不主张排他性、当然可版权性或绝对不侵权。
13. 批准 Guide manifest 中的 informative alt、限定为当代 AI-assisted editorial interpretation 的 caption、`Mythic China Editorial` credit 与 AI disclosure；该确认不提升 Guide 状态，也不批准 M4-U5、public build、Git 写入或发布。
14. Project owner 随后回复“全部批准”，并以 `Project owner (user-confirmed)` bilingual reviewer 身份批准 `阴间 / yīnjiān` 使用 “the underworld”、拒绝把 “hell” 或 `Diyu` 当自动同义词；批准 `钟馗 / Zhōng Kuí` 保留 “Zhong Kui” 并以 “the demon queller” 作角色释义；同时把 `十王圖`、`鍾馗元夜出遊圖`、`清早期竹雕鍾馗群鬼`、`任頤鍾馗像軸` 四条馆藏标题核定为 `zh-Hant`。该批准只闭合双语术语与 Source 标题 locale，不提升内容状态或授权 CJK 工具、服务/浏览器、Git、public build、Vercel、部署或发布。
15. 2026-09-01，Project owner 在新一轮本地 preview 中确认总体页面观感，同时指出 Explore、Collections 缺少可点击内容、About 首屏过空和部分字号偏大，并要求先修改。该反馈授权 review 候选架、About 四节扩写、作用域排版及匹配验证；不批准修正后页面、不提升状态，也不授权依赖、Git、public/Vercel、部署或发布。
16. 修正完成并由执行者通过完整自动门禁与三档浏览器矩阵复核后，Project owner 要求停止服务并询问下一开发单元。该决定关闭本轮功能页复看并授权停止 PID `20084`；不提升内容状态、不关闭完整 M4-U5，也不授权依赖、Git、public/Vercel、部署或发布。
17. Project owner 随后明确要求先更新需求合同，再实现 M4-U5A noindex 字体样张、精确正反门禁和当前工具可控的浏览器场景，并同步 README、PRODUCT、003、004 与 DEV_WORKFLOW；授权排除内容/字体/视觉资产链、依赖、public/M4-U4B/M5/M6、Git 写入、Vercel、部署和发布。
18. 2026-09-02，Project owner 单独授权最终 U5 浏览器与人工证据批次。该授权用于在同一未提交源上重新构建、启动一次本地 noindex preview、执行最终 8 页三档矩阵、交付 Project owner 样张/页面判断面、修复直接暴露缺陷及同步证据；仍不授权内容状态提升、依赖、public/M4-U4B/M5/M6、Git 写入、Vercel、部署或发布。
19. 2026-09-02，Project owner 在取得全部 8 个本地 review 路由并完成检查后明确回复“这些页面通过”。该决定闭合当前样张、Hero 裁切与页面阅读观感的人工判断；不替代真实键盘/200%、偏好/故障、性能、实际 fallback face、跨平台或未来完整 inventory 证据，不提升 `ready` / `published`，也不授权依赖、Git、public/M4-U4B、Vercel、部署或发布。判断后验收标签已清理，PID `31960` 已停止且 4321 无监听。

## 8. 候选阶段验证与收口记录（历史快照）

- 2026-08-30 已按 `DEV_WORKFLOW.md` 使用固定 Node 24.16.0、Corepack 与 pnpm 11.22.0 执行完整 `pnpm run check`：Prettier、ESLint、19 个测试文件/160 项测试、Astro check（65 个文件，0 error、0 warning、0 hint）、7 页 review build 与输出 verifier 全部通过。
- 输出审计为 7 个 `noindex, nofollow` 页面、14 个 Zhong Kui Hero v2 AVIF/WebP、4 个按 inventory SHA-256 核验的 WOFF2，零 public canonical/OG/JSON-LD/XML、零远端字体资源与零客户端 JavaScript；Collection 没有借用 Entry Hero。
- 21 份 Markdown 的严格 UTF-8、相对链接、原模板占位符与 `git diff --check` 通过；`git diff --check` 仅报告现有 Windows 行尾转换提示，没有 whitespace error。
- 获单独授权后，本地 preview 在固定 Node 24.16.0 下确认由 Astro 7.2.8 监听 `127.0.0.1:4321`；浏览器复核 Home、Collection、两篇 Entry 的 1440×900、768×900、390×844 与 411×651 视口，未发现横向溢出、破图或控制台错误/警告。两篇 Entry 的 byline/fact-check 日期可见，Collection 保持 0 图片且没有借用 Zhong Kui Hero。
- 移动菜单点击开启与可见焦点通过；当前浏览器控制面未能可靠证明原生 `summary` 的真实 Enter/Space 全链，因此保留为 M4-U5 人工键盘项，不误报为页面缺陷或通过。
- 浏览器证据只验证当前系统 fallback；正式字体、慢加载、真实 200% 缩放、reduced motion、跨平台 fallback 与 Collection Hero 成图仍未验证。
- 验收后按 Project owner 单独授权停止 preview；PID `22316` 已退出，`127.0.0.1:4321` 不可达。
- 后续候选任务已把 3 张生成输出及 trace metadata 保存到 Git-ignored `.local`；2026-08-31 的 owner decision 已在 metadata 中把 desktop 02/mobile 01 记录为 selected-for-production-prep。没有上传馆藏/历史参考图，没有创建 master、production record、manifest、repository source、Collection 绑定或 approved/current 图片。
- 英文字体候选已从官方 release 固定 4 份未修改 WOFF2 与许可证，并通过 `font-assets.json`、中央 alias/token、`?no-inline` preload registry 和输出 hash 门禁保留可替换缝；CJK 未下载、未子集、未改名。
- Git：不执行 add/commit/push/fetch，不创建分支或 worktree。

## 9. Collection Hero 生产闭环

- ImageGen 高保真重建只使用 Project owner 已选中的项目生成候选作为 edit target。desktop 补足远景匿名小官员与克制的记录桌暗示；mobile 移除右下朱红印记状纹理。没有上传馆藏、历史或其他第三方参考图。
- 原始重建输出为 desktop `1672×941`、mobile `1122×1402`；Sharp `0.35.4` 采用居中、等比 `fit-cover` 与 Lanczos3 形成 `3200×1800` / `1600×2000` lossless PNG master，分别只需约一个输出像素的纵向/横向裁切，没有非等比拉伸，也没有声称是 ImageGen 原生画布。
- 正式身份为 `asset-chinese-underworld-hero-primary` / `asset-chinese-underworld-hero-primary-v1` / `production-chinese-underworld-hero-primary-v1`；两份 same-canvas WebP repository source 使用 quality 90。manifest 为 `approved + isCurrent: true`，Collection 只保存 versionless asset ID。
- 页面模块 registry 显式授权两份 source；既有 generic resolver、Collection route/template 与 `ManifestHeroPicture` 直接消费 manifest alt/caption/credit/disclosure，没有增加模板版本或路径硬编码。
- 固定 Node/Corepack 下完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 文件零诊断，以及默认 review build 的 7 页、28 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。非默认 `visual:build:check` 通过 9 个 local master、5 份 current responsive rendition 与 36 个实际生成/解码的 AVIF/WebP 目标。
- 本 Collection 闭环批次没有提升 Entry/Collection 状态，当时没有创建 Guide Hero、CJK 文件、public intent、Vercel 项目或部署；没有启动服务/浏览器、安装依赖、执行 Git 写操作或发布。Guide 后续闭环见第 10 节。

## 10. Guide Hero 生产闭环

- Guide 最终 desktop A2 只把项目生成 desktop A 作为 edit target，精确移除砚台状、毛笔状与工具架物件；independently composed mobile 初始生成只把 A2 作为视觉语言锚点，随后只把项目生成 mobile draft 作为 edit target，将重复同心门洞收敛为三层克制的行政空间。没有上传馆藏、历史或未经授权的第三方图片。
- 原始最终输出为 desktop `1672×941`、mobile `1122×1402`；Sharp `0.35.4` 采用 centered `fit-cover`、Lanczos3 和无非等比拉伸的精确画布处理，形成 desktop `3200×1800` lossless PNG master（SHA-256 `d070ee61ce6a613c2903dbdbe53f2bb888f411c7d8433ecc82f5d4053c9a013b`）与 mobile `1600×2000` master（SHA-256 `8180d0ee16f52501f2c4077e1cd039797c278dfb0429f736ebd6108663dbf48d`）。
- 正式身份为 `asset-chinese-underworld-guide-hero-primary` / `asset-chinese-underworld-guide-hero-primary-v1` / `production-chinese-underworld-guide-hero-primary-v1`；两份 same-canvas WebP repository source 使用 quality 90。manifest 为 `approved + isCurrent: true`，Guide Entry 只保存 versionless asset ID。
- 页面模块 registry 显式授权两份 source；既有 generic resolver、Entry route/template 与 `ManifestHeroPicture` 直接消费 manifest alt/caption/credit/disclosure，没有增加模板版本或路径硬编码。默认输出 oracle 把 Guide 与 Zhong Kui、Collection 三个资产族严格隔离。
- 固定 Node/Corepack 下完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 个文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。非默认 `visual:build:check` 通过 11 个 local master、七份 current responsive rendition 与 50 个实际生成/解码的 AVIF/WebP 目标。
- 本闭环没有提升 Guide/Collection/Zhong Kui 状态，没有新增 CJK 文件、public intent、Vercel 项目或部署；没有启动服务/浏览器、安装依赖、执行 Git 写操作或发布。

## 11. M4-U5A 字体样张结果

- 新增直达但不进入全站导航的 `/review/type-specimen/`；它只在 `review` build intent 下生成，默认输出 inventory 因而从 7 页精确增加为 8 页。页面保持 `noindex, nofollow`，不输出 canonical、Open Graph、Twitter、RSS/Atom、图片或客户端 JavaScript；默认 review build 仍为 42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。
- 样张固定 20 个精确 sample：display、story、body、italic、pinyin，以及 SC/TC 各 400/500/600 的 required corpus 与 fallback-only probe。策略门禁分别核对角色、字重、字形、`lang`、required 字符、fallback 标记与边界；原 7 个内容页继续使用自己的实际 HTML/cmap 字符集合，不因样张扩大内容合同。字体二进制、子集、RFN/FONTLOG、inventory、manifest 与上游 family name 均未改。
- 固定 Node 24.16.0、Corepack 与 pnpm 11.22.0 下最终完整 `pnpm run check` 通过 23 个测试文件/271 项测试、Astro check 73 文件零诊断、8 页/42 Hero/10 WOFF2/0 XML/0 JS 输出门禁，并锁定生产 pinyin `lang`、DESIGN 冻结混排行、inline CJK、HTML5 head/DOM/标签关联、实际应用 CSS family/weight/style/synthesis、等价 direct link 及 robots head/bot/hreflang 边界。PID `9628` 的本地 preview 在审查加固前候选上完成 1440×900、768×900、390×844：当时样张无横向溢出、20/20 sample 有可见布局框、10 个 face loaded，Guide Hero 为完整 `1152×648` 且控制台清洁。最终实现随后改动 pinyin/mixed DOM 与 CSS，旧矩阵不作为最终三档通过证据。
- 后续 verifier fail-closed 加固把 selector 功能伪类、几何/非渲染隐藏、活跃语义壳、HTML/CSS emitted-resource 闭合及 `dist` symlink/junction 纳入匹配负例；最新固定运行时完整门禁通过 23 个测试文件/279 项测试、Astro 73 文件零诊断与同一 8 页/42 Hero/10 WOFF2/0 XML/0 JS 输出。该加固未启动浏览器，不更新上一条候选三档的证据范围。
- 2026-09-02 最终复跑在固定 Node 24.16.0、Corepack 0.35.0、pnpm 11.22.0 与同一未提交工作树上再次通过完整 `pnpm run check`，随后由 PID `31960` 在 `[::1]:4321` 提供 `http://localhost:4321/`。Codex In-app Browser 的三个独立标签实际锁定 `390×844`、`768×900`、`1440×900`，8 页共 24 个组合全部保持无横向溢出、破图、样张错配、卡片重叠或 console warning/error，且均为唯一 main/H1、`noindex, nofollow`、零客户端脚本、字体 loaded 与正确导航断点。样张三档均为 20/20 sample、14 张非零 card、无裁切，页面资产清单实际观测 10 个 WOFF2；pinyin/mixed/inline CJK 的 computed family/weight/style/synthesis/`lang` 与合同一致。四条 Hero 页的 12 个组合均选择预期 mobile/desktop composition，图片自然尺寸非零、caption 可见，Collection copy 与 caption 不相交。没有发现需要业务代码修复的缺陷。
- 当前浏览器控制面不能可靠派发原生 Tab/Enter/Space 默认动作，不能制造真实 200% zoom、reduced-motion、禁用 JavaScript、慢/阻断字体、图片失败或受控网络条件，也不能可靠给出 LCP/CLS；静态 cmap 只证明 probe 字符不在项目子集，不能识别操作系统实际选中的 fallback face。因此这些项目与 Windows/macOS/iOS/Android 跨平台 fallback 仍明确未验证；Project owner 对当前页面的通过不改变这些能力边界。
- 本次实际重试再次确认上述边界：locator/CUA 的 Tab/Enter/Space 只形成 2px 焦点轮廓、未触发原生默认动作，Ctrl-plus 前后 DPR、visual viewport scale 与 inner width 不变；当前页面作用域也不暴露可靠 Performance API。鼠标点击的移动菜单与样张 checklist 可正常开合，四个移动菜单项及 checklist 返回链接均为 44px，关闭后焦点留在 `summary`。浏览器截图接口未能取图，故不伪造截图证据，也不把工具限制记为页面失败；三个真实三档样张标签曾作为可切换的 live Project owner 验收面保留，明确通过后已清理。
- 此前 U5A 候选预检收口时，浏览器 viewport 已重置、测试 tab 已关闭，固定 Node 停止 PID `9628` 后端口 4321 无监听；该历史状态不描述当前 2026-09-02 人工验收面。U5A 与本次最终三档批次均没有提升内容状态，没有运行非默认视觉 build，没有修改内容、Source/Claim/Terminology/Hero、字体或图片资产链、依赖、public/M4-U4B/M5/M6，也没有执行 Git 写入、Vercel 操作、部署或发布。

## 12. 当前结论

- Collection 与 Guide 已各自绑定独立的 approved/current Hero v1；Zhong Kui Entry 继续解析自己的 Hero v2。默认 review 页面不得跨 owner 借图，Guide 的视觉门禁不再是当前阻塞项。
- 当前仍为 0 published Entry / 0 published Collection；两篇 Entry 与 Collection 均保持 `editorial-review`。Explore/Collections 的 review-only 候选架与直达字体样张只改善本地评审入口，不改变 published-only release 投影或内容状态。Project owner 已通过本批三档样张和全部 8 个页面，因此本候选支持 M4 本地实现关闭；真实键盘/200%、偏好与故障模式、本地性能、实际 fallback 可读性与支持平台证据明确移交 M6 release-candidate gate，不改写成已通过。M7 只承接生产与 live/RUM 基线。
- 最新完整 `pnpm run check` 通过 23 个测试文件/279 项测试、Astro check 73 文件零诊断，以及默认 review build 的 8 页、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript 和精确样张/生产来源/构建后 CSS/实际 HTML/lang/cmap、活跃语义壳、emitted-resource closure、输出链接项与 review candidate 门禁。最终 pinyin/mixed DOM 与 CSS 又通过 2026-09-02 的 24 个真实视口组合和 12 个 Hero 组合；非默认视觉证据继续沿用 11 个 master 与 50 个响应式输出。
- M4-U5A 与本次 browser 授权均不包含内容状态提升、依赖、Git 写入、public runner、Vercel 操作、部署或发布；Project owner 判断后验收标签已清理，PID `31960` 已停止且 4321 无监听。详细执行证据与未验证项见 [`DEV_WORKFLOW.md`](../../DEV_WORKFLOW.md)、[`003-pages-exploration-seo.md` 的 12.11 节](003-pages-exploration-seo.md#1211-m4-u5anoindex-字体样张与可控验证入口)、[12.12 加固记录](003-pages-exploration-seo.md#1212-m4-u5a-verifier-fail-closed-加固)与[12.13 最终三档记录](003-pages-exploration-seo.md#1213-m4-u5-最终三档与人工验收交接)。
- 当前交接：先为 M5 建立独立详细需求；M6 再完成剩余内容、第二个 Collection、`published` 决定、public artifact assembly、最终 release-candidate QA、receipt 与受保护预览。`font-assets.json: browser-review-pending` 继续表达发布 QA 待完成，不表示 M4 本地实现未完成。
