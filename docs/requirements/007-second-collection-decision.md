# 007 第二个 MVP Collection：只读研究决策包

## 0. 文档职责与状态

本文负责：

- 比较第二个 MVP Collection 的可行候选、来源条件、三篇阅读路径与主要风险。
- 给出六篇 MVP 的 3+3 推荐分配，并明确公开阅读顺序与研究/生产顺序的区别。
- 把事实、研究判断、编辑推荐、Project owner 已确认决定和后续未决门禁分开。
- 记录 Project owner 对推荐方向的确认，以及后续研究批次的授权边界。

本文不负责：

- 把已确认方向直接物化为正式标题、稳定 ID、slug、关系或内容状态。
- 新增或修改 Collection、Entry、Source、Claim、Terminology、Schema、页面、图片或资产记录。
- 提升任何内容状态，生成 public artifact，启动服务，写 Git，部署或发布。

上述“不负责”描述本文最初的决策/研究授权；2026-09-04 后续取得独立授权的最小内容物化与 Ten Kings 单篇纵切片由第 9–10 节记录，不把后来的权限倒写成原批次范围。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 决策状态 | Project owner 已确认 | 2026-09-03 确认 `Strange Tales from Liaozhai` 方向、3+3 分配、两条公开顺序、Zhong Kui Featured 与《促织》条件保留；新标题仍是工作标题 |
| 实施状态 | 证据最小物化与 Ten Kings 单篇纵切片已完成 | 当前为 6 篇 Entry：原 2 篇保持 `editorial-review`，新增 `ten-kings`、`liaozhai-reading-guide`、`painted-skin`、`fighting-cricket` 四个 `draft` owner；Ten Kings 已绑定 2 Source / 3 Claim / 1 Terminology 并形成证据受限首稿，其余三个仍为空。唯一 Collection、资产、Collection/related 关系与状态均未改 |
| 研究状态 | 候选比较、四篇 claim map 及本轮证据闭合完成 | [`008-four-entry-claim-maps.md`](008-four-entry-claim-maps.md) 已分层记录实际见证、正式书目与精确 locator；Liaozhai 任 2016 主/张 2011 对校路线已确认，但实际册页与篇级 locator 仍缺；《促织》青柯亭单见证路线已确认，跨见证、作者归属与“首次增写”继续排除 |
| 发布状态 | 未发布 | published Entry / Collection 仍为 0/0；本文不改变内容或发布状态 |

- 当前权威结论更新时间：2026-09-04。
- 本文保存原始推荐依据与 owner approval，并在第 9–10 节记录后续独立授权的证据物化与 Ten Kings 单篇纵切片；方向确认本身仍不等于内容实现、写作完成或发布批准。

## 1. 推荐结论

### 1.1 推荐

Project owner 已确认第二个 MVP Collection 采用工作名 **`Strange Tales from Liaozhai`** 的方向，以蒲松龄《聊斋志异》这一明确文学文本为边界。现有 `Strange Tales After Dark` 只保留为候选营销副标题，不单独作为 Collection 身份，以免被理解为跨时期、跨文类的泛中国鬼故事合集。

推荐理由：

- 与 `The Chinese Underworld` 互补：前者处理宗教、民俗、图像与历史演化的叠加传统；Liaozhai 明确是文学文本阅读路径。
- 三篇即可形成“如何阅读文本 → 高识别度故事 → 社会批评宽度”的完整小型路径，不需要用角色卡凑数。
- 中文底本影印、可检索文本、英语研究和旧英译比较入口均可取得；主要风险是校勘、翻译与改编分层，而不是来源完全不可得。
- 符合 [`PRODUCT.md`](../PRODUCT.md) 的 Phase 1 内容验证范围；`Shan Hai Jing: An Illustrated Field Guide` 已被产品路线明确放在 Phase 2。

### 1.2 结论性质

- **事实**：当前唯一 Collection 仍是 `chinese-underworld`，成员顺序仍为 Guide → Zhong Kui；这两个 Entry 与 Collection 都是 `editorial-review`。另有四个不属于任何 Collection 的 `draft` Entry owner，其中 Ten Kings 已有证据受限首稿，其余三个为空。
- **研究判断**：Liaozhai 在文本边界、三篇路径完整度与当前阶段匹配度上优于另外两个候选。
- **已确认编辑方向**：采用 Liaozhai、3+3 分配及第 5 节顺序，Zhong Kui 继续作为 Featured；四个新增标题仍是工作标题。
- **研究与物化结果**：四篇候选 claim map 及本轮证据闭合已完成，详见 [`008-four-entry-claim-maps.md`](008-four-entry-claim-maps.md)。Project owner 随后确认 Liaozhai 任笃行 2016 主/张友鹤 2011 对校路线与《促织》青柯亭单见证路线，并另行授权只物化证据已闭合子集；当前已建立 4 draft Entry、5 Source、9 Claim 与 3 `source-checked` Terminology，Ten Kings 又只消费其中已闭合的 2 Source / 3 Claim / 1 Terminology 并形成首稿。
- **未决风险**：任笃行/张友鹤实际册页、《促织》手稿/现代校记/早期抄本、Painted Skin 一手文本权利、最终译文、术语批准、图片权利与人工审校仍未闭合；没有内容状态因此改变。

## 2. 当前事实与硬约束

- [`chinese-underworld.yml`](../../src/content/collections/chinese-underworld.yml) 是当前唯一 Collection；其 `entryIds` 为 `chinese-underworld-guide` → `zhong-kui`，Featured 为 `zhong-kui`。
- [`chinese-underworld-guide.md`](../../src/content/entries/chinese-underworld-guide.md) 的实际标题是 `A Guide to the Chinese Underworld`，不是旧产品候选表中的 `A Guide to Chinese Underworld Traditions`。
- [`zhong-kui.md`](../../src/content/entries/zhong-kui.md) 的实际标题是 `Zhong Kui, the Demon Queller`。
- Collection 是策展阅读路径，不是 Topic/tag 聚合；成员与顺序只由 `Collection.entryIds` 定义。Featured Entry 与公开阅读顺序可以不同。
- M6 仍要求 6 篇 Entry、至少 2 个完整 Collection、逐项内容门禁与 Project owner `published` 决定。技术层的一个 Entry + 一个 Collection 只是不生成空 public artifact 的下限，不是 MVP 预览资格。
- 新四篇已建立稳定 Entry 身份与 draft owner；Ten Kings 已在后续明确授权下写入 2 Source / 3 Claim / 1 Terminology 消费清单与证据受限首稿，其余三篇仍为空。四篇都尚未加入 Collection 或绑定资产；只有后续明确授权并通过相应门禁后，才能继续写入其他 `entryIds`、关系、页面内容或状态。
- 2026-09-03 的确认只关闭 Collection 方向、3+3 分配、公开顺序与 Featured 等编辑决策；2026-09-04 的研究、底本选择、Entry owner 与证据物化均来自后续各自独立授权，彼此不自动扩权。

## 3. 候选比较

| 候选 | 边界清晰度 | 三篇路径 | 来源可行性 | 与首个 Collection 区分 | 阶段匹配 | 主要风险 | 建议 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Strange Tales from Liaozhai` | 高：单一作者/文本传统可界定 | 高：导读 + 单篇 + 单篇 | 高，但需校勘与翻译复核 | 高：文学文本 vs. 多传统 underworld | 高：可在 Phase 1 验证 | OCR、版本、旧英译删改、性别与影视改编扁平化 | **已确认第二 MVP Collection 方向** |
| `Shan Hai Jing: An Illustrated Field Guide` | 中：文本可界定，但成书层次与注本复杂 | 中低：三篇难兑现“field guide”承诺 | 高，但文本/图像史工作量大 | 高 | 低：产品路线已放在 Phase 2 | 晚期木刻被误当先秦原图；三篇样本过窄 | **按现有路线暂缓至 Phase 2** |
| `Defying Heaven` | 低：是现代策展框架，不是稳定历史分类 | 中：发现性高但成员易跨文本/宗教传统 | 单写《西游记》高，跨悟空/哪吒等迅速分裂 | 中 | 中低 | 混合小说、宗教与后世接受史；现代影视/游戏 IP 与造型污染 | **不建议作为第二 MVP Collection** |

该表是基于当前产品阶段的定性比较，不是假精度评分，也不表示候选的长期价值高低。

## 4. 来源可行性与使用边界

### 4.1 Liaozhai

- [Library of Congress 的 Liaozhai 专题](https://blogs.loc.gov/international-collections/2018/10/the-strange-tales-from-liaozhai/)提供作者、早清文学语境、题材范围、具体故事和馆藏版本入口，可用于建立导读问题，不替代逐篇原典定位。
- [Chinese Text Project 影印资源](https://ctext.org/library.pl?if=en&remap=gb&res=107844)与[对应 OCR 文本](https://ctext.org/wiki.pl?if=en&res=948427)使底文定位可行；CText 明确提示 OCR 会引入错字，必须回到页图或可靠批校本核对。
- Judith Zeitlin 的 [*Historian of the Strange*](https://www.degruyterbrill.com/document/doi/10.1515/9780804765954/html?lang=en)为文类、叙事与文化语境提供专门研究入口；受版权保护的正文只可按许可引用与概述。
- Project Gutenberg 的 [Giles 两卷合本](https://www.gutenberg.org/ebooks/43629)只可取 1880 版正文和书目元数据作旧英译比较，并须排除页面自动生成摘要；美国公版标签不是全球复用结论，Giles 导言也不承担版本年代，不能因可下载就成为本站可靠译文底稿。
- `Painted Skin` 可从 LOC 专题与 CText 卷一目录定位；[HSUHK 收录的同行评审翻译研究](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)显示旧英译的性别解释可能改变原文呈现，因此必须把翻译当作受审编辑层，而非中性容器。
- `The Fighting Cricket / 促織` 已直接核验上海图书馆 `線普長266652-67` 青柯亭见证：卷七、Commons 数字页 427–432、左侧可见叶码四至九；数字页 431 有 `後歲餘…身化促織` 与篇末 `異史氏曰`。Project owner 后续已选择只按该见证叙事，但辽宁手稿、任笃行/张友鹤校记和早期抄本仍未取得，因而不能证明“青柯亭编者首次增写整个魂化结尾”。安全措辞和硬门禁见 008 第 6 节。
- 在 Project owner 确认青柯亭单见证路线前，[`Nie Xiaoqian / 聶小倩`](https://ctext.org/wiki.pl?chapter=957720&if=en)曾是版本风险无法闭合时的替换候选；当前不启动该替换，若以后重开仍须同样完成底本、研究、译文与改编分层并另行授权。

可行性结论：四篇的来源链、候选 claim map 与本轮可取得的底本/locator 已分层闭合，但仍不能直接采用 CText OCR/协作英译、现代译本文字或影视叙事。Liaozhai 已确认任笃行 2016 主、张友鹤 2011 对校的工作路线，但仍须取得实际册页；《促织》已确认单一青柯亭见证路线，跨见证、作者归属与“首次增写”不进入当前内容；译文策略和双语人工复核均未授权。

### 4.2 Shan Hai Jing

- [Library of Congress 1628–1644 年图本](https://www.loc.gov/item/2001530410/)提供 18 卷与 74 幅晚明插图的可定位对象；条目虽称未发现 World Digital Library Collection 的版权限制，正式使用仍须逐项核对来源、文化语境与权利。
- [Chinese Text Project《山海经》](https://ctext.org/shan-hai-jing/zh)可定位分卷中文底文；网站英语层标注为 AI/用户协作，不能作为公开译文。
- UC Press 的 [*A Chinese Bestiary*](https://www.ucpress.edu/books/a-chinese-bestiary)提供文本编纂、奇异生物和插图传统的研究入口；现代译文和图版受版权保护。

可行性结论：研究与视觉潜力很高，但三篇 MVP 难以兑现“illustrated field guide”，且晚出刻本图不能伪装成先秦原典插图。按当前 [`PRODUCT.md`](../PRODUCT.md) 保留给 Phase 2 最稳妥。

### 4.3 Defying Heaven

- [University of Chicago Press 的 Anthony C. Yu《西游记》英译](https://press.uchicago.edu/ucp/books/book/chicago/J/bo12079590.html)提供可靠现代翻译与研究入口；译文受版权保护。
- [Project Gutenberg《西游记》中文本](https://www.gutenberg.org/ebooks/23962)可作检索入口，但仍须版本、章回和文本质量复核。
- 若 Collection 同时纳入悟空、哪吒、刑天等对象，证据会跨小说、宗教文本、古籍、地方传统与现代接受史；`Defying Heaven` 本身只是本站可能采用的策展框架。

可行性结论：单写《西游记》早期反天叙事可控；把多名人物合成第二 MVP Collection 会在三篇规模内制造过大的来源与 IP 边界，建议后置或先收窄成单一文本路径再评估。

### 4.4 Chinese Underworld 补齐篇

- 现有 Guide 已使用 Columbia University 的 [The Ten Magistrates of the Underworld Realm](https://afe.easia.columbia.edu/cosmos/prb/underworld.htm)说明一个有边界的十位审判者、官僚化法庭、非永恒惩罚与轮回模型，并使用 The Met 的 [*Ten Kings of Hell*](https://www.metmuseum.org/art/collection/search/44509)落实到一件 Southern Song 组画对象；二者已收入项目来源登记。
- 因此 Ten Kings 作为研究对象具备初始来源入口，但与现有 Guide 的内容重叠是硬风险。新篇只有在 claim map 能提出独立问题，并补足可定位原典或对象、独立专业研究与版本/地域边界时才成立；不能只是把 Guide 的两段扩写成第三篇。

可行性结论：后续 claim map 已证明 Ten Kings 可以围绕“日期—卷宗—预修/追荐—图文媒介”建立独立读者问题，因此继续保留；S.3961 `items/7–15`、CBETA `[0408b13–0409c22]` 与核心书目已闭合到证据物化候选。两个文本见证仍不得互作转录；IDP 图片复用权、Teiser/Kwon 目录起页之外的具体细节与历史展示方式仍是后续门禁。

## 5. 推荐六篇分配与公开阅读路径

以下名称除两篇原有对象外均为工作标题；本表最初决策时的“候选”不创建状态字段或内容对象。后续独立授权已建立四个 draft owner，当前物化与 Ten Kings 首稿事实见第 9–10 节。

| Collection | 推荐公开顺序 | Entry | 当前事实或候选职责 |
| --- | --- | --- | --- |
| `The Chinese Underworld`（已确认 Collection） | 1 | `A Guide to the Chinese Underworld` | 现有 `editorial-review`；建立多时期、多地域、多文本/传统叠加的框架 |
| `The Chinese Underworld` | 2 | `The Ten Kings: Dates, Records, and Judgment` | 工作标题；移除当前 Claim 不支持的 “Rebirth”，收窄旧候选 “Yanluo and the Ten Kings”，深入一个有限审判模型，不把它写成全中国统一死后观 |
| `The Chinese Underworld` | 3 | `Zhong Kui, the Demon Queller` | 现有 `editorial-review`；以策展边界案例收束，不写成十王或阴间统治者；建议继续作为 Featured |
| `Strange Tales from Liaozhai`（已确认方向；工作名） | 1 | `How to Read Liaozhai` | 工作标题；说明作者、文学文本、版本、翻译与改编层次，不冒充普遍民间信仰 |
| `Strange Tales from Liaozhai` | 2 | `Painted Skin: What Pu Songling’s Tale Says` | 工作标题；高识别度入口，区分原篇、旧英译与影视改编，谨慎处理性别/欲望/道德解释 |
| `Strange Tales from Liaozhai` | 3 | `The Fighting Cricket: A Strange Tale of Power and Survival` | 工作标题；扩展到权力、家庭伤害与官僚压力；Project owner 已选择只按已核青柯亭单见证叙事，跨见证/作者归属/首次增写继续阻塞，聂小倩只作另行替换候选 |

推荐逻辑：

- Underworld 路径为“多元总框架 → 有限官僚审判模型 → 不完全属于该官僚体系的驱鬼人物”。
- Liaozhai 路径为“如何读这部文学文本 → 高识别度的惊异故事 → 展示社会批评宽度的故事”。
- 选择《促织》而非首发聂小倩，能避免 Liaozhai 首发包同时由两篇改编密集、女性超自然人物故事主导；这是一项编辑取舍，不是文化事实。
- 原六个 Underworld 候选中的 Fengdu、Meng Po 与 Black and White Impermanence 建议延后，不删除其长期候选价值，也不创建 deferred 状态。

## 6. 研究/生产顺序

公开阅读顺序不等于研究或生产顺序。Project owner 已确认方向、工作底本与《促织》单见证路线；当前进度与下一步如下：

1. 已完成：确认第二 Collection 方向、六篇分配、公开顺序、Zhong Kui Featured 与《促织》条件保留。
2. 已完成：为 Ten Kings、`How to Read Liaozhai`、`Painted Skin` 与《促织》建立候选 claim map、来源角色和停止条件。
3. 已完成：在独立授权下冻结本轮可取得的实际见证/版次、正式书目及页/叶/canvas locator，并把仍未闭合项逐篇写入证据账本。
4. 已完成：Project owner 确认 Liaozhai 采用任笃行 2016 为主、张友鹤 2011 为对校的工作路线，并选择《促织》只按已核青柯亭单见证叙事；任/张实际册页及跨见证判断仍未闭合。
5. 已完成：在后续独立授权下，为四篇建立最小 draft Entry owner，并只物化证据已闭合的 5 Source、9 Claim 与 3 Terminology；该批未动正文、资产、关系或状态。
6. 已完成：先把上述证据批形成本地检查点 `9914dd3`，再只为 Ten Kings 写入 2 Source / 3 Claim / 1 Terminology 消费关系和证据受限首稿；仍保持 `draft`。
7. 下一步仍须另行选择并授权：Ten Kings 编辑/双语审校、取得任/张实际册页，或其余三篇的逐篇证据受限写作；之后再建立第二 Collection 并复核 `entryIds`、Featured、显式 `relatedEntryIds` 与最终公开顺序。

现有两篇 `editorial-review` Entry 不因本建议降级、升级或重写；四个新增 owner 保持 `draft`，其中只有 Ten Kings 已有证据受限首稿，本轮也未创建第二 Collection。任何后续关系、其他正文或状态变化仍须另立获授权的 M6 内容批次。

## 7. 风险与停止条件

- **文本/版本**：OCR、通行本、手稿/刻本差异和译本删改必须各自标明；一项来源不能同时充当原典、可靠翻译和学术解释。
- **分类**：Liaozhai 是文学文本路径，不得把篇中叙事自动写成所有古代中国人的信仰或历史事实；Underworld 也不得写成单一地图/官署。
- **性别与猎奇化**：`Painted Skin`、聂小倩等内容须审查旧译与改编如何塑造女性/鬼魅形象，不能只复述高传播影视版本。
- **图像与权利**：网上可见、数字馆藏、公版文本和公共领域故事都不自动授权现代译文、馆藏摄影、书籍图版或影视/game 造型；本轮没有选择、生成或纳入项目图片资产，公开页图只用于核字且不构成复用授权。
- **关系与状态**：方向确认本身不授权创建稳定 ID/slug、修改 `entryIds`、制造第二 Collection 页面或提升状态；后续虽已另行授权建立四个 draft 身份与证据子集，并为 Ten Kings 建立 Entry 消费关系，但其余三个 Entry 的消费关系、全部 Collection/related 关系与任何状态变化仍未授权，悬空关系必须继续失败关闭。
- **证据停点**：任一新篇无法取得可定位原典、独立研究和双语复核路径时，缩小主张、替换选题或停止，不用 AI 输出补事实空缺。

## 8. Project owner 确认与后续停点

Project owner 于 2026-09-03 首先确认：

1. Liaozhai 是第二个 MVP Collection 方向；`Strange Tales from Liaozhai` 作为工作名，`Strange Tales After Dark` 只保留为可选营销副标题。
2. 采用第 5 节的 3+3 六篇分配与两个公开阅读顺序；Zhong Kui 继续作为 Featured。
3. Underworld 新增深入篇聚焦 Ten Kings；标题、entry type、稳定 ID 和 slug 留给后续内容物化批次。
4. Liaozhai 第三篇先保留《促织》，版本交叉验证维持硬门禁；只有另行决定时才切换聂小倩。
5. 下一批只做四篇 claim map 与来源研究，不提前进入正文、图片、内容对象或状态变化。

随后 Project owner 又单独授权只做四篇的实际见证/版次、正式书目与页/叶/canvas locator 证据闭合，仍不授权 Source/Claim/Terminology、正文、图片、内容对象或状态变化。此研究批由 [`008-four-entry-claim-maps.md`](008-four-entry-claim-maps.md) 执行并停在分层证据账本；其中青柯亭单见证已直接核页，跨见证判断仍维持硬门禁。Project owner 之后又分别确认工作底本/单见证路线、授权最小 draft Entry owner，并最终授权证据已闭合的 Source/Claim/Terminology 物化；这些是后续独立授权，不回溯扩大前两次研究授权。

当前停点是证据最小物化与 Ten Kings 单篇纵切片已完成：只有 Ten Kings 建立了证据消费关系与正文，资产、第二 Collection 与任何状态变化均未开始。证据批已在后续用户授权下形成单次本地检查点 `9914dd3`；Project owner 随后通过 Ten Kings 首稿并授权其进入当前本地 HEAD。两次提交均未 push。下一内容动作仍须另行授权；上述授权均不包含外部服务、public artifact 或发布。

## 9. 2026-09-04 后续证据物化记录

Project owner 在确认任笃行 2016 主、张友鹤 2011 对校的 Liaozhai 工作路线及《促织》青柯亭单见证路线后，先授权为 Claim / Terminology 建立四个最小 owner，随后明确授权只物化证据已闭合的 Source、Claim 与 Terminology。实施边界如下：

- 新增四个空 `draft` Entry：`ten-kings`（guide）、`liaozhai-reading-guide`（guide）、`painted-skin`（tale）、`fighting-cricket`（tale）。正文、`sourceIds`、`claimIds`、`terminologyRecordIds`、Collection/related 关系与视觉字段均为空。
- 新增 5 份 Source、9 份 verified Claim 与 3 份 `source-checked` Terminology；总 inventory 为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published 仍为 0/0。
- Source 新增必填 `usesDigitalImageEvidence`；值为 `true` 时必须有 `rightsStatus` 与 `rightsUrl`。它只标识当前证据 locator 是否依赖数字页图、IIIF canvas 或对象图像，不授权 Asset 复用。
- 明确排除 CText/Giles Painted Skin 记录、尚无实际册页的任/张记录、`孽鬼` 术语，以及《促织》FC-08–FC-10、跨见证、作者归属、“首次增写”和起源判断。
- 四个 draft 通过既有动态路由形成 direct-only noindex review 页面，但不进入 Header、Explore/Collections 候选架、现有 Collection 或 public 投影；页面模板行为未改。
- 本批不写正文、处理图片、提升状态、接外部服务、启动服务或执行 Git 写操作。匹配验证记录见 [`008`](008-four-entry-claim-maps.md) 与 [`DEV_WORKFLOW.md`](../../DEV_WORKFLOW.md)。

## 10. 2026-09-04 证据检查点与 Ten Kings 单篇纵切片

Project owner 接受“先提交证据检查点，再做一篇完整纵切片”的建议。第 9 节及其相关研究、状态同步形成本地提交 `9914dd3`，没有 fetch 或 push；随后只修改 `ten-kings` Entry 及本轮权威状态文档。Project owner 通过首稿并授权本地提交后，该纵切片已进入当前 HEAD，仍未 push。

- 工作标题改为 `The Ten Kings: Dates, Records, and Judgment`，因为当前物化 Claim 不支持标题中的 “Rebirth”。
- Entry 只消费 `source-idp-ten-kings-s3961`、`source-cbeta-ten-kings-x01n0021`，三条对应 Claim 与 `term-shi-wang-in-ten-kings`；形成两段 opening、110 词摘要和四节英语正文，`lastFactCheckedAt` 为 `2026-09-04`，状态仍为 `draft`。
- S.3961 的数字序列与 CBETA 的日期/记录机制分别陈述，不互作转录；正文明确排除 earliest、普遍日程、超自然实在、历史使用、跨见证重建与 rebirth 叙事。
- 图片、Collection/`relatedEntryIds`、视觉字段、状态、外部服务、public artifact、push、部署与发布均未改变；其余三个新增 Entry 保持空 draft。
- 完整工程门禁再次通过；具体结果与 CJK 字符停点见 [`008`](008-four-entry-claim-maps.md) 和 [`DEV_WORKFLOW.md`](../../DEV_WORKFLOW.md)。纵切片已获 Project owner 通过并进入当前本地 HEAD，未 push。
