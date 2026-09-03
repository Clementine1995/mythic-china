# 007 第二个 MVP Collection：只读研究决策包

## 0. 文档职责与状态

本文负责：

- 比较第二个 MVP Collection 的可行候选、来源条件、三篇阅读路径与主要风险。
- 给出六篇 MVP 的 3+3 推荐分配，并明确公开阅读顺序与研究/生产顺序的区别。
- 把事实、研究判断、编辑推荐和 Project owner 待决策项分开。

本文不负责：

- 确认第二个 Collection、六篇成员、正式标题、稳定 ID、slug、Featured 或关系。
- 新增或修改 Collection、Entry、Source、Claim、Terminology、Schema、页面、图片或资产记录。
- 提升任何内容状态，生成 public artifact，启动服务，写 Git，部署或发布。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 决策状态 | 待 Project owner 决策 | 本文推荐 `Strange Tales from Liaozhai`，但名称、成员、顺序和《促织》/聂小倩取舍均未确认 |
| 实施状态 | 未开始 | 当前只有 2 篇 Entry 与 1 个 Collection 对象，均为 `editorial-review`；没有第二 Collection 或四篇新 Entry |
| 研究状态 | 候选级只读研究完成 | 已核对项目合同、现有内容对象，以及机构/出版方/文本库的可用入口；逐篇 claim map、底本校勘、译文与权利审核尚未开始 |
| 发布状态 | 未发布 | published Entry / Collection 仍为 0/0；本文不改变内容或发布状态 |

- 当前权威结论更新时间：2026-09-03。
- 本文是决策输入，不是 owner approval 或实施完成记录。

## 1. 推荐结论

### 1.1 推荐

建议第二个 MVP Collection 采用工作名 **`Strange Tales from Liaozhai`**，以蒲松龄《聊斋志异》这一明确文学文本为边界。现有 `Strange Tales After Dark` 可保留为候选营销副标题，但不宜单独作为 Collection 正式身份，以免被理解为跨时期、跨文类的泛中国鬼故事合集。

推荐理由：

- 与 `The Chinese Underworld` 互补：前者处理宗教、民俗、图像与历史演化的叠加传统；Liaozhai 明确是文学文本阅读路径。
- 三篇即可形成“如何阅读文本 → 高识别度故事 → 社会批评宽度”的完整小型路径，不需要用角色卡凑数。
- 中文底本影印、可检索文本、英语研究和旧英译比较入口均可取得；主要风险是校勘、翻译与改编分层，而不是来源完全不可得。
- 符合 [`PRODUCT.md`](../PRODUCT.md) 的 Phase 1 内容验证范围；`Shan Hai Jing: An Illustrated Field Guide` 已被产品路线明确放在 Phase 2。

### 1.2 结论性质

- **事实**：当前唯一 Collection 是 `chinese-underworld`，现有成员顺序是 Guide → Zhong Kui；两篇 Entry 与 Collection 都是 `editorial-review`。
- **研究判断**：Liaozhai 在文本边界、三篇路径完整度与当前阶段匹配度上优于另外两个候选。
- **编辑推荐**：采用 Liaozhai、3+3 分配及第 5 节顺序。
- **未决风险**：`The Fighting Cricket / 促織` 的通行文本存在版本层次问题；新四篇均未完成 claim map、locator、译文、术语、图片权利或人工审校。
- **Project owner 决定**：本文没有替 Project owner 确认任何名称、成员、顺序或内容状态。

## 2. 当前事实与硬约束

- [`chinese-underworld.yml`](../../src/content/collections/chinese-underworld.yml) 是当前唯一 Collection；其 `entryIds` 为 `chinese-underworld-guide` → `zhong-kui`，Featured 为 `zhong-kui`。
- [`chinese-underworld-guide.md`](../../src/content/entries/chinese-underworld-guide.md) 的实际标题是 `A Guide to the Chinese Underworld`，不是旧产品候选表中的 `A Guide to Chinese Underworld Traditions`。
- [`zhong-kui.md`](../../src/content/entries/zhong-kui.md) 的实际标题是 `Zhong Kui, the Demon Queller`。
- Collection 是策展阅读路径，不是 Topic/tag 聚合；成员与顺序只由 `Collection.entryIds` 定义。Featured Entry 与公开阅读顺序可以不同。
- M6 仍要求 6 篇 Entry、至少 2 个完整 Collection、逐项内容门禁与 Project owner `published` 决定。技术层的一个 Entry + 一个 Collection 只是不生成空 public artifact 的下限，不是 MVP 预览资格。
- 新四篇目前没有内容对象、稳定 ID、slug、Source/Claim/Terminology、关系或资产；确认前不得写入 `entryIds` 或页面，也不得把工作标题冒充稳定身份。

## 3. 候选比较

| 候选 | 边界清晰度 | 三篇路径 | 来源可行性 | 与首个 Collection 区分 | 阶段匹配 | 主要风险 | 建议 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Strange Tales from Liaozhai` | 高：单一作者/文本传统可界定 | 高：导读 + 单篇 + 单篇 | 高，但需校勘与翻译复核 | 高：文学文本 vs. 多传统 underworld | 高：可在 Phase 1 验证 | OCR、版本、旧英译删改、性别与影视改编扁平化 | **推荐为第二 MVP Collection** |
| `Shan Hai Jing: An Illustrated Field Guide` | 中：文本可界定，但成书层次与注本复杂 | 中低：三篇难兑现“field guide”承诺 | 高，但文本/图像史工作量大 | 高 | 低：产品路线已放在 Phase 2 | 晚期木刻被误当先秦原图；三篇样本过窄 | **按现有路线暂缓至 Phase 2** |
| `Defying Heaven` | 低：是现代策展框架，不是稳定历史分类 | 中：发现性高但成员易跨文本/宗教传统 | 单写《西游记》高，跨悟空/哪吒等迅速分裂 | 中 | 中低 | 混合小说、宗教与后世接受史；现代影视/游戏 IP 与造型污染 | **不建议作为第二 MVP Collection** |

该表是基于当前产品阶段的定性比较，不是假精度评分，也不表示候选的长期价值高低。

## 4. 来源可行性与使用边界

### 4.1 Liaozhai

- [Library of Congress 的 Liaozhai 专题](https://blogs.loc.gov/international-collections/2018/10/the-strange-tales-from-liaozhai/)提供作者、早清文学语境、题材范围、具体故事和馆藏版本入口，可用于建立导读问题，不替代逐篇原典定位。
- [Chinese Text Project 影印资源](https://ctext.org/library.pl?if=en&remap=gb&res=107844)与[对应 OCR 文本](https://ctext.org/wiki.pl?if=en&res=948427)使底文定位可行；CText 明确提示 OCR 会引入错字，必须回到页图或可靠批校本核对。
- Judith Zeitlin 的 [*Historian of the Strange*](https://www.degruyterbrill.com/document/doi/10.1515/9780804765954/html?lang=en)为文类、叙事与文化语境提供专门研究入口；受版权保护的正文只可按许可引用与概述。
- Project Gutenberg 的 [Giles 两卷合本](https://www.gutenberg.org/ebooks/43629)可用于旧英译比较，并标注为美国公版；它不是全球复用结论，也不能因可下载就成为本站可靠译文底稿。
- `Painted Skin` 可从 LOC 专题与 CText 卷一目录定位；[HSUHK 收录的同行评审翻译研究](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)显示旧英译的性别解释可能改变原文呈现，因此必须把翻译当作受审编辑层，而非中性容器。
- `The Fighting Cricket / 促織` 有 [CText 逐篇文本](https://ctext.org/wiki.pl?chapter=762770&if=en)可定位。2026 年一篇[开放获取研究](https://www.tandfonline.com/doi/full/10.1080/23311983.2026.2626662)提出，常见的离魂/变形情节不见于蒲松龄原稿而见于后出青柯亭本；这只是需要独立交叉验证的近期二手主张，不能单凭一篇论文写成本站定论。
- 若《促织》的版本风险在 M6 前无法闭合，[`Nie Xiaoqian / 聶小倩`](https://ctext.org/wiki.pl?chapter=957720&if=en)是替换候选；仍须同样完成底本、研究、译文与改编分层。

可行性结论：来源链可建立，但不能直接采用 CText OCR/协作英译、现代译本文字或影视叙事。每篇仍须锁定底本、卷/篇/页 locator、可靠研究、译文策略和双语人工复核。

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

可行性结论：建议保留 Ten Kings 深入篇作为 Underworld 第三成员候选，但在 M6 首先做重叠审计。若无法证明独立读者价值与证据链，就应更换该篇，而不是为了凑足 3+3 建立重复内容。

## 5. 推荐六篇分配与公开阅读路径

以下名称除两篇现有对象外均为工作标题；表中“候选”不创建状态字段或内容对象。

| Collection | 推荐公开顺序 | Entry | 当前事实或候选职责 |
| --- | --- | --- | --- |
| `The Chinese Underworld`（已确认 Collection） | 1 | `A Guide to the Chinese Underworld` | 现有 `editorial-review`；建立多时期、多地域、多文本/传统叠加的框架 |
| `The Chinese Underworld` | 2 | `The Ten Kings: Judgment, Records, and Rebirth` | 工作标题；收窄旧候选 “Yanluo and the Ten Kings”，深入一个有限审判模型，不把它写成全中国统一死后观 |
| `The Chinese Underworld` | 3 | `Zhong Kui, the Demon Queller` | 现有 `editorial-review`；以策展边界案例收束，不写成十王或阴间统治者；建议继续作为 Featured |
| `Strange Tales from Liaozhai`（推荐工作名，未确认） | 1 | `How to Read Liaozhai` | 工作标题；说明作者、文学文本、版本、翻译与改编层次，不冒充普遍民间信仰 |
| `Strange Tales from Liaozhai` | 2 | `Painted Skin: What Pu Songling’s Tale Says` | 工作标题；高识别度入口，区分原篇、旧英译与影视改编，谨慎处理性别/欲望/道德解释 |
| `Strange Tales from Liaozhai` | 3 | `The Fighting Cricket: A Strange Tale of Power and Survival` | 工作标题；扩展到权力、家庭伤害与官僚压力；版本风险未闭合时以 `Nie Xiaoqian` 替换 |

推荐逻辑：

- Underworld 路径为“多元总框架 → 有限官僚审判模型 → 不完全属于该官僚体系的驱鬼人物”。
- Liaozhai 路径为“如何读这部文学文本 → 高识别度的惊异故事 → 展示社会批评宽度的故事”。
- 选择《促织》而非首发聂小倩，能避免 Liaozhai 首发包同时由两篇改编密集、女性超自然人物故事主导；这是一项编辑取舍，不是文化事实。
- 原六个 Underworld 候选中的 Fengdu、Meng Po 与 Black and White Impermanence 建议延后，不删除其长期候选价值，也不创建 deferred 状态。

## 6. 研究/生产顺序

公开阅读顺序不等于研究或生产顺序。若 Project owner 确认本建议，推荐的新内容工作顺序为：

1. 先冻结第二 Collection 正式身份、六篇替换清单、工作标题与《促织》/聂小倩取舍。
2. 研究 Ten Kings 深入篇，先证明它与现有 Guide 有独立问题和来源，不复制 Guide。
3. 研究 `How to Read Liaozhai`，冻结底本、版本、文类、译文与接受史边界。
4. 研究 `Painted Skin`，验证原篇、旧英译与现代改编的分层方法。
5. 交叉验证《促织》的版本主张；通过后研究该篇，未通过则切换到聂小倩。
6. 四篇新内容都达到各自门禁后，再统一复核两个 Collection 的 `entryIds`、Featured、显式 `relatedEntryIds` 与最终公开顺序。

现有两篇 Entry 不因本建议降级、升级或重写；任何新对象仍须另立获授权的 M6 内容批次。

## 7. 风险与停止条件

- **文本/版本**：OCR、通行本、手稿/刻本差异和译本删改必须各自标明；一项来源不能同时充当原典、可靠翻译和学术解释。
- **分类**：Liaozhai 是文学文本路径，不得把篇中叙事自动写成所有古代中国人的信仰或历史事实；Underworld 也不得写成单一地图/官署。
- **性别与猎奇化**：`Painted Skin`、聂小倩等内容须审查旧译与改编如何塑造女性/鬼魅形象，不能只复述高传播影视版本。
- **图像与权利**：网上可见、数字馆藏、公版文本和公共领域故事都不自动授权现代译文、馆藏摄影、书籍图版或影视/game 造型；本轮没有选择、下载或生成任何图片。
- **关系与状态**：确认前不得创建稳定 ID/slug、修改 `entryIds`、制造第二 Collection 页面或提升状态；悬空关系必须继续失败关闭。
- **证据停点**：任一新篇无法取得可定位原典、独立研究和双语复核路径时，缩小主张、替换选题或停止，不用 AI 输出补事实空缺。

## 8. Project owner 待决策

1. 是否确认 Liaozhai 为第二个 MVP Collection。
2. 是否采用 `Strange Tales from Liaozhai` 作为正式方向，并把 `Strange Tales After Dark` 仅保留为可选副标题。
3. 是否确认本文的 3+3 六篇分配与两个公开阅读顺序。
4. 是否确认 Underworld 第三篇之外的新增深入篇聚焦 Ten Kings，以及其最终 entry type/标题。
5. Liaozhai 第三篇选择《促织》还是聂小倩；本文推荐先保留《促织》，但把版本交叉验证设为硬门禁。
6. 是否让 Zhong Kui 继续作为 Featured，而公开阅读顺序保持 Guide → Ten Kings → Zhong Kui。
7. 确认后是否授权下一批只做四篇 claim map、底本/locator、研究、术语与译文策略，不提前进入正文、图片或状态变化。

在上述决定作出前，M6 第二 Collection 身份与最终六篇分配仍未关闭；本决策包到此停住。
