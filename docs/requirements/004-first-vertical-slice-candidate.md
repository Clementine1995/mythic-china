# 首个纵切片编辑/视觉候选与 Collection、Guide Hero 生产闭环合同

## 0. 文档职责与当前状态

本文负责：把 *The Chinese Underworld* 的首个 Collection、首发 Guide、Featured Entry、Collection Hero 方向和生产字体方案推进到 Project owner 可人工判断的候选检查点，并追溯其后经单独确认完成的 Collection 与 Guide Hero 生产闭环。

本文初始候选检查点不负责：字体下载或落库、字体子集实际生成、图片生成或馆藏图下载、visual manifest/production record、内容 `ready/published`、public 构建、浏览器服务、Vercel 项目、部署或发布。2026-08-30 的后续 Project owner 决策单独授权 Collection Hero A 待审候选生成、上游英文 WOFF2 落库与匹配风险的本地验证；2026-08-31 又先后独立确认 Collection 与 Guide 的最终组合、个人账户/权利、五审、公开文案与 exact-canvas 生产链，以及两份 Terminology 和四条馆藏标题 locale。2026-09-01，Project owner 再次要求继续、批准并确认执行 CJK 字符集、隔离子集工具与 cmap 静态门禁；该新增授权仍不包含内容状态提升、服务/浏览器、M4-U5/U4B、Git 写入、Vercel 或发布。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | Project owner 阶段性通过；Collection 与 Guide Hero 生产闭环已批准 | 2026-08-30，Project owner 接受当前内容、署名/日期、模板排版与 CSS 无图 Hero，并选择 Collection Hero A、接受字体方案；2026-08-31 又分别批准两组 Hero 的最终组合、个人账户/权利、五审、公开文案、exact-canvas master 与正式资产链。正式字体页面效果仍未闭合 |
| 内容状态 | `editorial-review` | 两篇 Entry 有正文、80–120 词摘要、来源、Claim、`bilingual-approved` 术语与 fact-check 日期；四条馆藏标题为 `zh-Hant`，Collection 为 `editorial-review` |
| 视觉状态 | Collection Hero v1 与 Guide Hero v1 均为 `approved/current` 并已绑定 | 两组资产各有独立 desktop/mobile master、repository source、production record 与 manifest。Collection 绑定 versionless `asset-chinese-underworld-hero-primary`，Guide 绑定 versionless `asset-chinese-underworld-guide-hero-primary`；两者仍保持 `editorial-review` |
| 字体状态 | 英文与 CJK 静态候选已落库；浏览器验收阻断 | 4 份上游未修改英文 WOFF2 与 SC/TC × 400/500/600 六份派生 WOFF2 已接线；CJK 字符集、OFL/RFN/FONTLOG、精确 `unicode-range`、hash/name/cmap 与 HTML lang 门禁通过，正式字体页面/慢加载/跨平台浏览器验收未执行 |
| 发布状态 | 未授权 | 0 published Entry / 0 published Collection；无 public dist、Vercel 项目或部署 |

## 1. 目标、不做范围与完成标准

### 1.1 目标

1. 让 Project owner 能逐项判断字体、Collection Hero、Collection 模板和两篇首发内容，而不是面对空占位或已越权的“成品”。
2. 让文化陈述从 Entry 正文回到 Source/Claim/Terminology，并明确哪些是事实、编辑选择和未决风险。
3. 在 M4-U5 前建立可执行门禁：brief 与生产授权不能替代具体字体/成图人工批准；内容状态提升和 public build 仍须各自满足后续合同。

### 1.2 初始候选准备不做范围（历史边界）

以下条目描述进入第一次 Project owner 检查点前的边界；后续已获授权的例外与结果见第 7–8 节：

- 初始批次未增加第三方依赖，未执行字体工具或外部生成服务。
- 初始批次未把研究候选图、字体二进制、production master 或探索废图写入仓库。
- 初始批次未批准 Collection Hero brief，也未创建虚假 asset ID 或 manifest。
- Entry/Collection 始终未提升到 `visual-review`、`ready` 或 `published`。
- 初始批次未启动 dev/preview/browser 服务；后续浏览器评审获得单独授权并已停止服务。
- public release 下限不变：M4-U4B 仍只建立本地 public 构建能力；M6/M7 的内容量与发布门禁不前移。

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
- Collection 与 Guide Hero 的独立 brief、asset/manifest、publication rights 与五类人工审核现已闭合；批准结果只授权两项资产在 noindex review 链中按现有内容状态消费，不满足内容 `ready/published`、M4-U5 或 public 发布条件。当前视觉 inventory 为三份 approved brief、11 个 local master、11 份 repository source、四份 production record、七份 manifest 版本记录、六个 approved/current 逻辑资产与七份 current responsive rendition。
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
- 风险：所选候选使用个人且非组织管理账户下的 OpenAI ImageGen 重建，没有上传馆藏或其他第三方参考图；工具未暴露模型 ID，生产记录保持 `null`，并明确不主张排他性、当然可版权性或绝对不侵权。当前资产链已闭合，但真实页面浏览器效果与 M4-U5 仍未验证。

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
| 中文 Display/UI | Source Han Sans 2.005R SC/TC 候选 | OFL 1.1；Reserved Font Name 为 `Source` | 已从固定 2.005R commit 的 SC/TC variable TTF 分别生成 400/500/600 静态子集；修改版 primary family 使用 `Mythic Han Sans SC/TC`，不 preload，页面效果仍待浏览器判断 |
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

## 6. `ready` 候选与 M4-U5 预检前门禁

| 门禁 | 当前事实 | 进入下一状态所需 |
| --- | --- | --- |
| 内容编辑 | 两篇为 `editorial-review` | Project owner 逐篇接受标题、开头、摘要、正文、来源边界与 Collection 关系 |
| 事实核查 | 当前来源与 Claim 已本地闭合 | 人工核对每个正文主张/locator；任何新增事实先新增来源，不让 AI 补空 |
| 双语术语 | 两份 Terminology 已由 `Project owner (user-confirmed)` bilingual reviewer 批准为 `bilingual-approved` | 保持当前术语、首次释义、拒绝项与来源边界；实质改写须重审 |
| Source 标题 locale | 教育部词条与四条已复核馆藏标题均为 `zh-Hant`；四条馆藏记录已获同一 reviewer 明确批准 | 保持精确 locale；内容图继续机器阻断未来 generic `zh` 被 ready lineage 引用 |
| Collection Hero | Hero A v1 已完成权利/五审、exact-canvas master、production record、approved/current manifest 与稳定 Hero ID 绑定 | 保持现有资产谱系；任何图像实质修改必须建立新版本并重跑匹配审核。页面浏览器表现仍由 M4-U5 预检判断 |
| Guide Hero | Guide Hero v1 已完成权利/五审、exact-canvas master、production record、approved/current manifest 与稳定 Hero ID 绑定 | 保持现有资产谱系；任何图像实质修改必须建立新版本并重跑匹配审核。页面浏览器表现仍由 M4-U5 预检判断 |
| 字体 | 4 份英文 WOFF2 与 6 份 CJK 静态 WOFF2 已接线；CJK 字符/RFN/FONTLOG/`unicode-range`/cmap/HTML lang 静态门禁通过 | Project owner 另行授权服务/浏览器并判断正式英/CJK 字体页面、慢加载、真实命中与 Windows/macOS/iOS/Android fallback |
| 页面 | review-only；此前 system fallback 的三档视口已通过；Collection 与 Guide 已静态接入各自 Hero | 在当前正式字体资产上对最终页面做 200% zoom、键盘、reduced motion、慢字体、图片失败、裁切和跨平台检查 |
| 状态 | 0 published | 两篇 Entry 的 Hero、双语术语、Source 标题 locale 与 CJK 静态门禁已闭合；进入 `ready` 仍需完整 Claim/fact-check、正式字体页面与 noindex U5 候选预检。Collection 到 `ready` 仍只能引用 ready/published Entry。`published` 只在 M6 完整 6 篇 Entry / 至少 2 个 Collection 本地 inventory 上由 Project owner 作出进入 public artifact 的决定，不等于部署；M7 负责经预览验收后的生产发布与发布后基线 |

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

## 11. 当前结论

- Collection 与 Guide 已各自绑定独立的 approved/current Hero v1；Zhong Kui Entry 继续解析自己的 Hero v2。默认 review 页面不得跨 owner 借图，Guide 的视觉门禁不再是当前阻塞项。
- 当前仍为 0 published Entry / 0 published Collection；两篇 Entry 与 Collection 均保持 `editorial-review`，双语术语、Source 标题 locale 与 CJK 字符/子集/RFN/cmap 静态门禁已闭合。下一人工/授权检查点是正式英/CJK 字体页面判断与 noindex M4-U5 候选预检。
- CJK 批次最终完整 `pnpm run check` 通过 21 个测试文件/201 项测试、Astro check 69 文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript 和生产来源/构建后 CSS/实际 HTML/lang/cmap 输出门禁；HTML 语言检查使用 parse5 实际树并覆盖属性值伪 `lang`、隐式 `p`/`li` 闭合与 table foster parenting。新版生成器的两次独立重建与正式六文件 inventory 逐字节一致。本批未改视觉链，非默认视觉证据继续沿用 11 个 master 与 50 个响应式输出的最近通过结果。
- 本次 CJK 批次只授权已记录的隔离 Python 工具、固定上游下载、直接 Node 构建期读取器和本地静态验证；不授权内容状态提升、服务/浏览器、Git 写入、public runner、Vercel 操作、部署或发布。
