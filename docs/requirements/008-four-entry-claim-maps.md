# 008 四篇首发候选 Claim Map 与来源研究

## 0. 文档职责与状态

Project owner 于 2026-09-03 确认 [`007-second-collection-decision.md`](007-second-collection-decision.md) 的推荐方向，先授权四篇候选的 claim map 与来源研究，随后又单独授权只做实际见证/版次、正式书目和页/叶/canvas locator 闭合。本文件合并记录这两个连续但互不扩权的研究批次，并在第 10–12 节另行记录 2026-09-04 后续独立授权的编辑路线确认、最小证据物化、检查点提交与 Ten Kings / Fighting Cricket 两篇纵切片。

本文负责：

- 为 `The Ten Kings: Dates, Records, and Judgment`、`How to Read Liaozhai`、`Painted Skin: What Pu Songling’s Tale Says` 与 `The Fighting Cricket: A Strange Tale of Power and Survival` 建立候选 claim map。
- 分开原典/馆藏对象、专业研究、发现工具和编辑推断，记录可用 locator 与仍需取得的证据。
- 判断每篇是否具备独立读者价值，以及下一内容批次开始前的停止条件。

本文不负责：

- 写正文、Quick Answer、摘要或最终译文。
- 创建或修改 Collection、Entry、Source、Claim、Terminology、稳定 ID、slug、关系、状态、页面或 Schema。
- 选择、下载、生成或批准图片与其他资产。
- 启动服务、安装依赖、执行 Git 写操作、远端同步、部署或发布。

上述“不负责”限定前两次研究批；后续内容对象、Schema 变化与 Ten Kings / Fighting Cricket 首稿只有在 Project owner 另行授权后发生，并由第 10–12 节单独记录，不能倒推为原研究授权的一部分。

| 维度 | 当前状态 | 结论或边界 |
| --- | --- | --- |
| 方向决定 | 已确认 | 007 的 Liaozhai 第二 Collection 方向、3+3 分配、两条公开阅读顺序、Zhong Kui Featured 与《促织》保留均获确认；后续又确认任笃行 2016 主/张友鹤 2011 对校的工作路线，以及《促织》青柯亭单见证路线；第二 Collection 名仍是工作标题 |
| 研究状态 | 本轮证据闭合完成，结果分层 | Ten Kings 的馆藏对象、IIIF canvas、CBETA 行号及核心书目已闭合；Painted Skin 的指定数字见证与 Giles 1880 页码已核作研究账本，但权利门禁阻止其进入本次 Source 子集；Liaozhai 仍缺任/张实际册页；《促织》只闭合上海图书馆青柯亭见证，跨见证门禁仍未闭合 |
| 写作准备度 | Ten Kings 与 Fighting Cricket 限域首稿已形成；其余两篇未就绪 | Ten Kings 只使用已物化的 2 Source / 3 Claim / 1 Terminology，Fighting Cricket 只使用已物化的 1 Source / 3 Claim / 1 Terminology；两篇仍须双语、编辑与目标读者审核，任/张实际册页、其余逐篇翻译策略、术语批准及人工审核仍须后续闭合 |
| 实施状态 | 证据最小物化与 Ten Kings / Fighting Cricket 两篇纵切片完成 | 当前有四个 `draft` Entry owner、5 Source、9 Claim 与 3 `source-checked` Terminology；Ten Kings 与 Fighting Cricket 已建立消费关系与正文，另外两篇仍为空。未创建第二 Collection、资产、Collection/related 关系或状态变化 |
| 发布状态 | 未发布 | published Entry / Collection 仍为 0/0；本批不改变状态或 public artifact |

本文中的 `TK-*`、`LZ-*`、`PS-*`、`FC-*` 只是研究表格内的局部标签，不是 Content Layer 稳定 ID，也不得复制进 `src/content` 后直接充当 Claim ID。表中的“可写”表示证据路线足以支持后续起草，不表示主张已完成双语、文化、版权或 Project owner 审校。

## 1. 结论与下一停点

| 候选篇 | 独立读者问题 | 研究结论 | 进入正文前最小门禁 |
| --- | --- | --- | --- |
| Ten Kings | 两个有边界的图文见证如何分别呈现十王序列、日期、卷宗与审查机制？ | **证据受限首稿已完成**；S.3961 与 CBETA 是两个不同见证，正文只消费已闭合的 2 Source / 3 Claim / 1 Terminology | 不补写形成史、rebirth、跨见证重建或普遍实践；历史展示/诵读方式与图片商用权仍不得写成已闭合 |
| How to Read Liaozhai | 为什么读《聊斋》前必须先问版本、文类、计数与译本，而不能把它当成一套透明的民间信仰记录？ | **部分闭合，限域证据已物化**；版本史与计数差异已有 Luo 直接研究页码 | 任 2016 主/张 2011 对校路线已确认，但实际册页未取得，故两书未建 Source、不得补篇级页码或把目录记录当正文 |
| Painted Skin | 蒲松龄文本如何用“可穿戴的外表”、误认、身体恐怖与评语组织故事；后来的翻译和改编改变了什么？ | **仅归因解释已物化**；Tso 2017 的具名性别/翻译解读可安全建 Claim | CText 数字见证与 Giles 旧译的目标地区复用权未闭合，均未建 Source；不建 `孽鬼` Terminology，不写自译或一手文本事实 |
| Fighting Cricket | 征求压力如何沿权力链进入家庭；指定青柯亭见证如何叙述儿子与蟋蟀的联系？ | **证据受限单见证首稿已完成**；只消费上海图书馆青柯亭 Source、3 Claim 与 1 Terminology | 不补写未物化情节；辽宁手稿、两种权威校记与早期抄本未得，跨见证、作者归属和“首次增写”继续阻塞 |

研究批最初停止在证据闭合账本，而不是正文；Project owner 随后分别确认底本/单见证路线、授权四个最小 Entry owner，并另行授权只物化证据已闭合的 Source/Claim/Terminology。该后续实施记录见第 10 节；再后的 Ten Kings 与 Fighting Cricket 单篇授权分别见第 11、12 节。前述任一批次都不得自动扩为其他 Entry 正文、图片、Collection 关系或 `ready/published`。

### 1.1 证据闭合账本

| 候选篇 | 已冻结的直接见证/版次 | 已闭合 locator | 仍未闭合 |
| --- | --- | --- | --- |
| Ten Kings | IDP / British Library `Or.8210/S.3961`；CBETA 2016.06 `X01n0021_001`；Teiser 1994；Kwon 2019；Schmid 2008 | S.3961 IIIF `items/7–15`；CBETA `[0408b13–0409c22]`；Schmid pp.303、308–309 | IDP 图像复用许可；Teiser/Kwon 只有目录级章节起页，不能冒充逐项正文核验；历史观众、展卷与唱诵方式无直接证据 |
| How to Read Liaozhai | Luo Hui 2009 博士论文；Barr 1983 书目/摘要；青柯亭馆藏与目录记录；两个现代校勘本候选 | Luo print pp.73、154、157–161（PDF frames 77、158、161–165）；大连目录项 40366；《作者自志》固定修订版文末 | 已确认路线中的任笃行 2016 / 张友鹤 2011 实际册次与篇级页码；辽宁手稿 shelfmark/关键叶；Barr 1984/1986、Cheung 与 Minford 的相关全文页 |
| Painted Skin | CText `res=4666` 所示北大—CADAL 十二册数字见证；其平台关联的非 OCR 文本 `res=823219`；Giles 1880 卷一；Tso 2017 | CText 卷一文件 `46700`、数字图像 160–165；文本锚点 `#p171–#p174`，`#p175` 为下一篇边界；Giles vol. I pp.76–84；Tso pp.15–18 | CText 扫描的历史版次、牌记与原叶；`孽鬼/孽魅` 异文来源；Minford 2006 p.127 独立核页；2008 电影一手时间码与权利 |
| Fighting Cricket | 上海图书馆 `線普長266652-67`，乾隆三十一年青柯亭刊本 Commons 扫描 | 卷七：数字页 427 见篇题、428 见正文开句、429 见儿子状态/再得小虫段、431 见 `後歲餘…身化促織` 与 `異史氏曰`、432 见王渔洋评语终点及下一篇〈向杲〉；左侧版心叶码依次四至九 | 辽宁手稿两处关键叶；任笃行/张友鹤篇级正文与校记；至少一支早期抄本；右侧版心受折叠/裁切，故本轮不强配每个数字页的 a/b |

`frame` 在 S.3961 上改用 IIIF `canvas/items`；《聊斋》Commons 扫描则保留“数字页 + 可见版心叶码”，不把一张跨两页的数字图强写成一整叶或补造 a/b。研究页码与 PDF frame 同时记录时，前者是印刷页码，后者只是文件图像序号。

## 2. 共用研究方法

### 2.1 证据角色

- **原典/文本见证**：只证明指定版本实际写了什么；版本名、卷篇、叶面或行号必须随主张出现。
- **馆藏对象记录**：只证明一件具体对象的年代、材质、题名、构图元素与馆方描述；不自动代表普遍传统。
- **专业研究**：承担版本关系、文类、仪式、传播、翻译与解释性主张；观点有争议时必须归因给作者。
- **发现/检索入口**：CText OCR、现代录文页、新闻或镜像只帮助定位；不能独立承担核字、作者归属或最终译文。
- **现代改编来源**：只证明该改编本身；不能回填古代原篇。

### 2.2 研究状态

- **文本/对象可证**：在指定见证或对象中可直接定位。
- **专业研究可支持**：有专业研究支持，但正式 Source/Claim 仍需补实际页码、版次或全文复核。
- **只能归因**：可以写“某研究者提出”，不能改写成无归因事实。
- **阻塞**：证据不足或版本关系未闭合，正文不得采用。

### 2.3 Locator 最小格式

- 古籍页图：`数字对象 + 版本/馆藏 + 卷 + 篇名 + 图像序号 + 原叶 a/b`；a/b 只在叶面可可靠识别时填写，否则必须明确记录无法分配的原因。
- 电子佛典：`经号 + 卷 + CBETA 行号`，且注明电子版不是另一写本的转录。
- 馆藏图像：`机构 + accession/pressmark + 对象页字段 + frame/canvas`。
- 现代书刊：`作者 + 标题 + 版次/卷期 + 页码或章节 + DOI/稳定页面`。
- 网页：`机构 + 页面标题 + 小节/对象字段 + 访问日期`；动态网页不能替代页级学术引用。

## 3. `The Ten Kings: Dates, Records, and Judgment`

### 3.1 与现有 Guide 的重叠审计

现有 [`chinese-underworld-guide.md`](../../src/content/entries/chinese-underworld-guide.md) 已经承担“多传统、非单一地图”、十位审判者、官僚化法庭、记录、非永恒惩罚、轮回与在世者追荐等总框架。新篇不得把这些段落扩写一遍。

| Guide 已覆盖 | 新篇只保留的新增角度 |
| --- | --- |
| 十位审判者和官僚化法庭 | 指定文本中的十个日期节点，以及呈状、名案、业簿、业秤、业镜等机制 |
| 惩罚后可能再生 | 死亡至再生之间怎样被组织为时间化程序，不画成普遍“地狱地图” |
| 在世者可帮助亡者 | 区分文本规定的生前预修与死后追荐，不泛化为“中国葬礼” |
| The Met 南宋 `十王圖` | 只在结尾对照敦煌图文手卷与后期独立挂轴的媒介变化 |

### 3.2 候选 claim map

| 标签 | 候选主张 | 状态 | 证据与 locator | 安全边界 |
| --- | --- | --- | --- | --- |
| TK-01 | 大英图书馆现藏一件敦煌莫高窟第 17 窟发现、约 900–1000 年、图文结合且长 491 cm 的《十王经》写卷 S.3961。 | 对象可证 | [IDP S.3961](https://idp.bl.uk/collection/2ED6F9800FD74DE08CBB9CB2F8E5D7BD/)，pressmark `Or.8210/S.3961`；[IIIF manifest](https://data.idp.bl.uk/iiif/3/manifest/2ED6F9800FD74DE08CBB9CB2F8E5D7BD)，对象元数据 | 区分发现地与现藏机构；未由现有证据证明“最早现存”，不得写成佛陀亲说或印度译经 |
| TK-02 | CBETA X0021 这一文本见证列出前七个七日节点，随后是百日、周年与第三年的第十节点。 | 文本可证 | [CBETA X01n0021_001](https://tripitaka.cbeta.org/X01n0021_001)，第一至第七节点 `[0409b14–0409c10]`，百日 `[0409c11–c13]`，周年 `[0409c14–c16]`，第十节点 `[0409c17–c22]` | 必须写“该文本见证”；不能说所有时期、地区都遵循同一日程；日期术语最终仍须佛教史审校 |
| TK-03 | 该文本以呈状、名案、业簿、业秤和业镜组织行为的记录、衡量与显现。 | 文本可证；图像可互证 | CBETA `[0408b23–0408c07]`、`[0409b23–0409c04]`；Teiser 1994 目录所示 `Bureaucracy` 章起于 p.171 | 不等同现实司法制度的逐项复制，也不证明超自然法庭真实存在；章节起页不是具体论断的逐页核验 |
| TK-04 | 该文本既劝人在生前预修，也规定在世者为亡者修斋、抄经和造像。 | 文本可证 | CBETA `[0408b13–0408c07]`、`[0409b02–b13]`；Teiser 1994 目录所示 `Memorial Rites` 章起于 p.20 | 这是规范性、劝化性承诺，不证明普遍执行率或仪式必然有效 |
| TK-05 | S.3961 的连续 IIIF 序列把第一至第十王、百日/周年节点和再生路径落实到相邻画面；这能证明对象布局，不能单独证明历史中的展卷、唱诵或观众。 | 对象布局可证；历史使用阻塞 | S.3961 manifest `viewingDirection: right-to-left`、`behavior: continuous`；[items/7](https://data.idp.bl.uk/iiif/3/manifest/2ED6F9800FD74DE08CBB9CB2F8E5D7BD/items/7)至 [items/15](https://data.idp.bl.uk/iiif/3/manifest/2ED6F9800FD74DE08CBB9CB2F8E5D7BD/items/15) | `continuous` 是数字对象行为与直接画面序列，不是历史表演证据；S.3961 `items/13` 的 `平正王` 与 CBETA `[0409c11]` 的 `平等王` 必须保留为见证差异 |
| TK-06 | British Museum 的敦煌残卷只保存五王相关画面，不能据它重建完整十庭。 | 对象可证 | BM 1919,0101,0.80，`Description` / `Curator’s comments` | 不补画缺失顺序，不制作“罪名—刑罚标准表” |
| TK-07 | Kwon 把早期图文手卷、独立法庭图与南宋宁波大型挂轴放进一个媒介变化模型。 | 只能归因 | Kwon 2019，Introduction pp.vii–viii；ch.1 pp.5–16、17–20，ch.2 起页 p.21；[出版社页](https://uhpress.hawaii.edu/title/efficacious-underworld-the-evolution-of-ten-kings-paintings-in-medieval-china-and-korea/) | 这是学者模型，不是全东亚同步、单线演化事实；本轮只核到官方预览与章节范围 |
| TK-08 | 十王体系在中世纪中国佛教环境中形成，并把业报/再生、追荐亲属责任和行政语汇联系起来。 | 专业研究可支持，细节页待核 | Teiser 1994 的目录入口 pp.20、76、85、152、166、171、196、221 起；Kwon 2019；Schmid 2008 pp.303、308–309 | 不简化成“佛道儒三教混合配方”，不本质化“中国人迷信官僚制”；Wang 2023 只承担明清延展，不能倒推形成期 |
| TK-09 | The Met 南宋五幅存世组画显示，一组十王法庭图可由独立的大型挂轴构成。 | 对象可证；只作对照 | The Met [30.76.290](https://www.metmuseum.org/art/collection/search/44506)至 [30.76.294](https://www.metmuseum.org/art/collection/search/44510)，五件均属 Southern Song、1195 年前、Jin Chushi，单幅约 129.5 × 49.5 cm | 现有 Guide 已用 30.76.293；不能再次成为新篇的主要证据或视觉核心；五幅存世不等于原组只有五幅 |
| TK-10 | `purgatory` 可作为 Teiser 的比较性分析词，但不表示十王体系等同天主教炼狱。 | 术语边界 | Teiser 书名及理论章节；IDP 对象编目 | 英文正文优先解释为 temporary postmortem courts，不把比较词写成同一制度 |

### 3.3 核心来源与权利

- British Library / International Dunhuang Programme, *Illustrated manuscript scroll of the Sutra of the Ten Kings in Chinese*, `Or.8210/S.3961`, 900–1000, ink on paper, 29 × 491 cm，[对象页](https://idp.bl.uk/collection/2ED6F9800FD74DE08CBB9CB2F8E5D7BD/)，[IIIF manifest](https://data.idp.bl.uk/iiif/3/manifest/2ED6F9800FD74DE08CBB9CB2F8E5D7BD)。Manifest 有 37 个 canvas（`items/0–36`），正面序列为 `0–18`、背面为 `19–36`；十王核心图文位于 `items/7–15`。Manifest 的 `rights` 为 null，`requiredStatement` 仍提示权利信息更新并要求联系 IDP；结合 [IDP 权利页](https://idp.bl.uk/copyright/)，本轮只闭合元数据与 locator，不批准图片复用或商用。
- CBETA, `卍新續藏第 01 冊 No. 0021 佛說預修十王生七經`, `CBETA 電子佛典 2016.06`，完成日 2016-06-15，[X01n0021_001](https://tripitaka.cbeta.org/X01n0021_001)。它来自《卍新续藏》见证，不是 S.3961 的转录；核心 locator 为 `[0408b13–0409c22]`。[CBETA 当前版权说明](https://www.cbeta.org/copyright)默认限定非商业使用，因此商业项目现阶段只把数字录文作为 locator/核查入口，不能从“短引”自动推出许可。
- British Museum, *The Sutra of the Ten Kings of Hell*, `1919,0101,0.80`, 10th century, ink and colours on paper, handscroll, 27.8 cm × 2.40 m，[对象页](https://www.britishmuseum.org/collection/object/A_1919-0101-0-80)，[图像页](https://www.britishmuseum.org/collection/image/1613711702)。对象图像标 CC BY-NC-SA 4.0，只能作为非商业候选；商业使用须另走 British Museum Images，故本批不批准站点资产。
- Stephen F. Teiser, *The Scripture on the Ten Kings and the Making of Purgatory in Medieval Chinese Buddhism*. Studies in East Asian Buddhism 9. Honolulu: University of Hawai‘i Press, 1994. xxiii + 340 pp. ISBN 978-0-8248-1587-5，[DOI](https://doi.org/10.1515/9780824846541)。本轮冻结 1994 版；pp.20、31、76、85、88、152、166、171、196、221、223、228、239 只是目录所示章节/附录起页，不能冒充具体论断已逐页核验。
- Cheeyun Lilian Kwon, *Efficacious Underworld: The Evolution of Ten Kings Paintings in Medieval China and Korea*. Honolulu: University of Hawai‘i Press, 2019. 224 pp. ISBN 978-0-8248-5602-1，[DOI](https://doi.org/10.1515/9780824856052)，[出版社页](https://uhpress.hawaii.edu/title/efficacious-underworld-the-evolution-of-ten-kings-paintings-in-medieval-china-and-korea/)。本轮核到 Introduction pp.vii–viii、早期痕迹 pp.5–16、手卷至挂轴 pp.17–20、南宋宁波章节起页 p.21；研究模型须归因，版权图文不可复制。
- Chien-chuan Wang, “The Worship of the Ten Kings of Purgatory during the Ming-Qing Period,” in *Chinese Popular Religion in Text and Acts*, ed. Shin-yi Chao, 105–124. Amsterdam University Press, 2023; online 2024-03-26. ISBN 978-94-6372-362-6; eISBN 978-90-4855-036-4，[DOI](https://doi.org/10.1017/9789048550364.005)。只承担明清阶段，不能倒推敦煌；平台显示的另一 DOI 不登记为第二篇论文。
- David Neil Schmid, “Revisioning the Buddhist Cosmos: Shifting Paths of Rebirth in Medieval Chinese Buddhism,” *Cahiers d’Extrême-Asie* 17 (2008): 293–325，[DOI](https://doi.org/10.3406/asie.2008.1280)。p.303 提供图文经语境，pp.308–309 直接讨论 S.3961 末段及再生路径；论文内部年代/图注命名与 IDP 编目有冲突时，以对象机构元数据为准，Persée 图版不视为可自由复用。
- The Met [30.76.290](https://www.metmuseum.org/art/collection/search/44506)至 [30.76.294](https://www.metmuseum.org/art/collection/search/44510)：五幅 Southern Song、1195 年前、Jin Chushi 所作的存世组画；对象标 Public Domain / CC0，可作为后续独立资产候选，但 30.76.293 已用于现有 Guide，不能再次成为新篇视觉核心。

### 3.4 术语与不可写边界

- `十王`：工作译名 `Ten Kings`；不能自动解释为十位自古固定、全中国统一信奉的 gods。
- `閻羅王/阎罗王`：不能默认是其余九王永恒不变的总领导。
- `業簿/业簿`、`業秤/业秤`、`業鏡/业镜`：分别记录为 `karma ledger/register`、`karma scale`、`karma mirror` 的候选译法，最终须由佛教术语审校者复核。
- `預修/预修` 与 `追薦/追荐`：必须分开生前预备仪式和死后为亡者所作功德，不合并成 `funeral rites`。
- 英文优先用 `the deceased` / `the dead`；`soul` 可能误导为不变实体。
- 禁写超自然功效已被事实验证、十王职责跨版本固定、十王本质上都是道教神，或用残卷补全完整十庭。

## 4. `How to Read Liaozhai`

### 4.1 核心问题

导读不提供一个虚假的“标准本答案”。其主线应是：版本不唯一，卷/篇数字必须绑定见证和计数单位，文类标签是解释工具，翻译与现代改编都是再阐释。

### 4.2 候选 claim map

| 标签 | 候选主张 | 状态 | 证据与 locator | 安全边界 |
| --- | --- | --- | --- | --- |
| LZ-01 | 蒲松龄（1640–1715）是清初山东淄川人；《聊斋志异》主要以文言写成。 | 机构资料可证 | [故宫《聊斋志异》](https://www.dpm.org.cn/lemmas/244792.html)，首段；[LOC Liaozhai 专题](https://blogs.loc.gov/international-collections/2018/10/the-strange-tales-from-liaozhai/)，作品简介 | 用 Literary/Classical Chinese，不写成笼统的 “ancient Chinese horror novel” |
| LZ-02 | 今见《聊斋自志》署“康熙己未春日”（1679），证明当时已有可由作者作序的合集，不证明全书当年最终定稿。 | 原文可定位；研究页码已核，影印待核 | [《作者自志》固定版本](https://zh.wikisource.org/w/index.php?title=聊齋志異/作者自志&oldid=2346917)，文末；Luo 2009 print p.73 / PDF frame 77 | 页面元数据与正文纪年不一致；正式引用前回影印/校勘本，不写“全书完成于 1679/1680” |
| LZ-03 | 作品经历多年写作、整理和抄传，不能给全部篇目指定单一完成日。 | 专业研究可支持 | Luo 2009 print p.154 / PDF frame 158 将约 1670–1700 的编纂期及 1679 年已形成主体写成 Luo 的研究判断；[Barr 1983 ORA](https://ora.ox.ac.uk/objects/uuid:9eb3578a-1c31-409b-ac60-2a04b16227d9)只以摘要支持卷次年代研究范围 | 起讫年必须归因给 Luo；Barr 摘要不能独立承担整串过程，单篇年代仍须篇级证据 |
| LZ-04 | 《聊斋志异》先经手稿和抄本传播，作者去世后才出现 1766 年的关键早期刻本。 | 专业研究 + 馆藏可支持 | Luo 2009 print p.154 / PDF frame 158；Barr, “The Textual Transmission,” pp.515–562，[DOI](https://doi.org/10.2307/2719041)；故宫 | 不把所有抄本说成作者手稿的直接复制；Barr 全文页尚未直接取得，“最早刻本”须保留现知见证范围 |
| LZ-05 | 青柯亭本刊于乾隆三十一年（1766）；这一十六卷刻本经过选择、编次和删节，不能等同蒲松龄亲定原稿。 | 馆藏事实 + 研究页码已核 | Luo 2009 print pp.159–160 / PDF frames 163–165；[辽宁珍贵古籍名录项 40366](https://www.ln.gov.cn/web/zwgkx/zfxxgk1/zc/xzgfxwj/szf/szfwj/2023010416224448385/index.shtml)只证明大连图书馆藏卷一至十五的不完整对象 | 馆藏目录不承担编辑过程；上海、天津及其他青柯亭对象还可能有状态差异，必须指定馆藏见证 |
| LZ-06 | 辽宁省图书馆藏现存约半部蒲松龄手稿；公开报道对异手数量的口径并不一致。 | 馆藏归属与半部范围可支持；精确计数阻塞 | 故宫支持“现存手稿半部”；[辽宁日报](https://epaper.lnd.com.cn/lnrbepaper/pad/con/202207/18/content_158043.html)与[新华社](https://www.xinhuanet.com/politics/2020-03/09/c_1125686435.htm)支持辽宁省图书馆及 2019 影印线索；正式影印候选为蒲松龄《稿本聊斋志异》，沈阳出版社，2019，ISBN 978-7-5716-0335-9 | 不称“宫博稿本”或“清稿本”；未取得馆藏 shelfmark 与影印关键页前不固定 237/206/31/7 等相互冲突的计数，也不推定异手身份 |
| LZ-07 | 卷数、物理册数和篇目数随版本与计数规则变化；面向普通读者暂用“近五百篇”最安全。 | 多见证事实 + 编辑选择 | Luo 2009 print p.160 / PDF frame 165 分别记录青柯亭十六卷 431 则与张友鹤十二卷加附录 491 则；故宫并列 12/16 卷；LOC 的 491 篇概述未绑定具名馆藏版本 | 431、491 与其他数字不得互相替换；禁写“全书恰有 491 个故事、共 16 册” |
| LZ-08 | 稳妥的文类表述是：以文言写成的短篇叙事与轶事合集，承接志怪、传奇及更广泛的文言小说传统。 | 专业研究可支持 | Luo 2009 print pp.157–161 / PDF frames 161–165；Barr, “The Later Classical Tale,” pp.675–696，[JSTOR](https://www.jstor.org/stable/10.7312/mair10984.45)；[Zeitlin DOI](https://doi.org/10.1515/9780804765954) | `志怪` 不等于现代 horror，`传奇` 不等于普通英文 legend；不是未经加工的民间故事档案 |
| LZ-09 | 序言呈现听闻、记录和友人供材的姿态，但成书文本经过文学建构，不能当作清代信仰与社会生活的透明实录。 | 原文事实 + 学术解释 | 《作者自志》；Zeitlin “The Discourse on the Strange”；[Luo Hui DOI](https://doi.org/10.1002/9781118635193.ctwl0132) | 禁写“逐字记录民间口述”或“证明所有清人都相信……” |
| LZ-10 | 部分篇目让科举失意、官府滥权、阶层压力、性别与欲望进入叙事；每项制度性判断必须落到具体篇目。 | 有条件解释 | Barr, “Pu Songling and the Qing Examination System,” pp.87–111，[DOI](https://doi.org/10.1353/late.1986.0000)；[Chang & Chang DOI](https://doi.org/10.3998/mpub.14905) | 不把全集概括成单一“反封建檄文”，也不把所有妖鬼解释为贪官象征 |
| LZ-11 | 英译的书名、选篇、语气与人物形象都是译者/出版者选择；Giles 1880 和 Minford 2006 都是选译，不等于一个中文全集。 | 专业研究可支持，部分页码已核 | Shengyu Wang 2021 p.442 直接说明 Giles 自 1877 年开始译介且 1880 两卷本选收 146 则；[DOI](https://doi.org/10.1215/00104124-9313118)；[Cheung 2020](https://research.manchester.ac.uk/en/publications/nominalisation-and-domestication-reconsidering-the-titles-of-the-/)；[Penguin Minford 版](https://www.penguin.co.uk/books/35322/strange-tales-from-a-chinese-studio-by-pu-songling-trans-john-minford-intro-john-minford/9780140447408) | Minford 精确选篇数尚未独立核页；不得把多个英译无标识拼接或反译成中文事实 |
| LZ-12 | 舞台、影视等现代改编应作为独立作品分析，并与指定中文见证逐项比较。 | 接受史事实 + 编辑规则 | Luo Hui；具体作品后续另建来源 | 不能用电影情节补原篇；海报、剧照、字幕、配乐和剧本均有独立版权 |

### 4.3 底本与 locator 方案

1. [CText 非 OCR 标点文本 `res=823219`](https://ctext.org/wiki.pl?if=gb&res=823219)与 [OCR 文本 `res=948427`](https://ctext.org/wiki.pl?if=gb&res=948427)均由平台标注为基于 [`res=4666` 扫描](https://ctext.org/library.pl?if=gb&res=4666&remap=gb)；此前“尚未证明关联”的说法已撤销。平台关联不等于历史版次识别，也不能把标点/OCR 当最终核字来源。
2. `res=4666` 的平台元数据只显示蒲松龄、北京大学图书馆、CADAL、十二册；未给出刊刻者、年份、牌记或可用原叶码。后续可按“CText 北大—CADAL 数字见证 + 册/文件 + 图像序号”引用，不能擅称青柯亭本。
3. 任笃行辑校，《全校会注集评聊斋志异（修订本）》，北京：人民文学出版社，2016 年 10 月，四册，2460 页，ISBN 978-7-02-011113-8；目录记录显示其以手稿、康熙抄本等为底本并参校青柯亭等见证，采用八卷编次。
4. 蒲松龄著、张友鹤辑校，《聊斋志异：会校会注会评本》，第 2 版，上海：上海古籍出版社，2011 年 1 月，两册，ISBN 978-7-5325-5729-5；目录记录采用十二卷体系。
5. **已确认工作路线**：导读和两篇单篇以任笃行 2016 作主校勘底本、张友鹤 2011 作比较本。该选择不补足证据：必须取得实际册页后才能写篇级 locator；目录、书商或 Google Books 元数据不能代替正文。本批因此没有为任/张两书建 Source。
6. 精确篇数如要公开，必须先决定底本和“篇/则/有题文本/附记”的计数规则，否则只写“近五百篇”。

### 4.4 术语与译文边界

- 首次写 `Liaozhai zhiyi (聊斋志异)`；`Strange Tales from Liaozhai` 是本站产品工作标题，不宣称唯一或逐字标准译名。
- `聊斋` 是书斋名构成的专名；`志异` 可解释为“记录异事/怪异”，不能直接等同 horror。
- `文言` 用 Literary Chinese 或 Classical Chinese；不用 ancient Chinese。
- `志怪` 可保留 `zhiguai` 并解释为 accounts/records of anomalies；`传奇` 保留 `chuanqi` 并解释上下文。
- `卷` 是文本编排单位，不自动等于一个物理 volume；所有数字先声明计数单位。
- `异史氏` 是叙述/评点人格，不能未经论证直接等同蒲松龄本人声音。
- `情` 的语义可包括情感、欲望、同情与激情，不能默认缩成 romance。
- `鬼、妖、精、魅、神、仙` 不可互换；fox spirit、fairy、demon 都会预置分类和道德判断。

## 5. `Painted Skin: What Pu Songling’s Tale Says`

### 5.1 核心问题

本篇应把“指定中文见证写了什么”放在第一层，把旧英译和现代影视怎样重塑怪物、性别与爱情放在第二层。高传播改编不能反向决定原篇中的物种、人物名或主题。

### 5.2 候选 claim map

| 标签 | 候选主张 | 状态 | 证据与 locator | 安全边界 |
| --- | --- | --- | --- | --- |
| PS-01 | CText 北大—CADAL 十二册数字见证把〈畫皮〉列在卷一；平台将非 OCR 文本 `res=823219` 与 OCR 文本 `res=948427` 都关联到该扫描。 | 数字见证与平台关系可证 | [扫描 `res=4666`](https://ctext.org/library.pl?if=gb&res=4666&remap=gb)，卷一文件 `46700`，数字图像 160–165；[非 OCR 文本](https://ctext.org/wiki.pl?if=gb&chapter=193959&remap=gb) `#p171–#p174`，`#p175` 为下一篇边界 | 未识别历史版次、牌记或原叶；不把平台标点/OCR 当最终底本，也不采用脱离版本的固定篇次编号 |
| PS-02 | 所选数字见证从王生收留一名自称逃离虐待的年轻女子开始；妻子的警告与道士的告诫都没有阻止他。 | 指定数字见证可证 | CText 卷一文件 `46700`，图像 160 为题名/开篇，160–162 覆盖收留、妻子警告与道士告诫 | 只述该见证中的作品情节，不把它当作清代婚姻或宗教实践统计 |
| PS-03 | 王生窥见怪物把人皮铺在榻上着色，再披到身上变成女子。 | 指定数字见证可证 | CText 卷一文件 `46700`，数字图像 161 | `human skin/pelt` 的语气须审校；不能把后世影视造型当原文细节，也不让研究论文替代中文一手 locator |
| PS-04 | 所选数字见证使用 `鬼子`、`孽鬼` 等斥称，并未称其为狐；Tso 所引另一中文文本写作 `孽魅`。 | 单见证可证；异文来源未闭合 | CText 图像 162–163；Tso 2017 p.16 | 只能写“所选见证没有称其为狐”，不能升级成“它不是狐精”的本体判断；`孽鬼/孽魅` 不得静默统一，也不宜仅凭代词断言固定 gender identity |
| PS-05 | 所选数字见证写怪物取走王生的心，其妻随后接受带有身体羞辱的救治要求；叙事以王生恢复收束，随后还有 `异史氏曰` 评语。 | 指定数字见证可证；敏感措辞待审校 | CText 数字图像 162–165：取心 162、怪物再现 163、救治 164、恢复与评语 165 | CityU 只承担改编比较；用内容提示，不医学化为精确的死亡、复活或器官移植，也不净化身体细节而不披露 |
| PS-06 | 篇末 `异史氏曰` 可支持把外表误认、拒绝忠告、欲望与由妻子承担的羞辱性代价联系起来的文本分析。 | 文本段可证；解释须归因/审校 | CText 数字图像 165；正式 Claim 仍须把原文观察与编辑解释分开 | 评点人格不自动等于作者全部意图；不能由此推出关于“中国女性”的普遍结论 |
| PS-07 | Tso 的研究认为，原篇可被读作对性别模仿结构的戏仿，而 Giles 1880 译本压低了相关越界性。 | 只能归因；全文页已核 | [HSUHK 同行评审记录](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)；[DOI 10.4312/ala.7.2.9-18](https://doi.org/10.4312/ala.7.2.9-18)，pp.15–18 | 写成 Tso 的解释，不宣布为唯一主题；其版本年代与篇次误差不能承担版本史 |
| PS-08 | Giles 1880 的〈The Painted Skin〉删去开篇性关系和篇末评语，并压缩后半救治，可作接受史/翻译比较，但不能成为本站可靠译文底稿。 | 两个指定见证可直接比较 | Giles 1880 vol. I, pp.76–84：开篇/告诫 76–78、画皮 79、取心 80、再现 81、救治 82–83、恢复 84；CText 图像 160–165；Tso 2017 pp.15–18 | Minford & Tong 1999 pp.1–48 只提供旧译方法总背景，并不讨论〈画皮〉；美国公版标签不等于全球复用许可 |
| PS-09 | Gordon Chan 2008 电影把原篇的无名鬼重塑为有名字的狐精主角，并把故事扩成爱情、历史史诗与武侠混合类型。 | 补充研究可支持；最终需电影一手来源 | [Wong 2016](https://lbms03.cityu.edu.hk/oaps/cah2016-2545-wck751.pdf)，p.2 及 pp.4–7、10–12；[hdl:2031/8795](http://hdl.handle.net/2031/8795) | 这是学生优秀论文，不能独自承担全部改编史；论文 p.4 另有地理误写，电影情节、字幕、剧照仍需作品级来源和权利记录 |
| PS-10 | 把怪物解释成女性危险、腐败官员、欲望或性别边界，都是需要明确归因和证据的读法，而非文本唯一事实。 | 编辑边界 | Zeitlin；Tso；Wong | 不把现代单一理论包装成蒲松龄“真正想说的” |

### 5.3 核心来源与权利

- CText `res=4666`：蒲松龄、北京大学图书馆、CADAL、十二册；〈画皮〉位于卷一文件 `46700` 的数字图像 160–165。非 OCR 标点文本 `res=823219` 的篇章锚点为 `#p171–#p174`，`#p175` 已进入下一篇；OCR `res=948427` 也基于该扫描。平台关系已闭合，历史版次、原叶和牌记仍未知；引用时只称“所选 CText 北大—CADAL 数字见证”。Internet Archive 镜像 [02111693.cn](https://archive.org/details/02111693.cn) 的 n159–n164 与 CText 160–165 对应，但其页码置信度为 0，不能拿来补造原叶。
- P’u Sung-ling, *Strange Stories from a Chinese Studio*. Translated and annotated by Herbert A. Giles. 2 vols. Vol. I. London: Thos. De La Rue & Co., 1880，[Internet Archive](https://archive.org/details/strangestoriesfr00pusuuoft)。Chapter XII, “The Painted Skin,” printed pp.76–84；Chapter XIII 起于 p.85。只把该版作为具名旧英译见证，不把其删改反译成中文事实；目标发布地区的复用权仍须独立判断。
- Wing Bo Anna Tso, “Repressed Sexual Modernity: A Case Study of Herbert Giles’ (1845–1935) Rendition of Pu Songling’s *Strange Stories from a Chinese Studio* (1880) in the Late Qing,” *Acta Linguistica Asiatica* 7.2 (2017): 9–18，[机构记录](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)，[DOI](https://doi.org/10.4312/ala.7.2.9-18)。关键讨论在 pp.15–18；只承担 Tso 的翻译/性别解释，其所引 `孽魅` 与所选扫描的 `孽鬼` 不静默合并。
- John Minford and Tong Man, “Whose Strange Stories?” *East Asian History* 17/18 (1999): 1–48，[PDF](https://eah.anu.edu.au/sites/default/files/article-content/17-18/EAH17-18_01.pdf)。本轮确认它讨论翻译史与删改方法但没有分析〈画皮〉；不得继续把全篇页码列作 Painted Skin 的直接篇级证据。
- Chun Kit Banny Wong (王駿傑), “Inheriting and Transforming the Ghost: The Commercialized and Gendered Painted Skin.” Outstanding Academic Papers by Students, City University of Hong Kong, 2016，[CityU PDF](https://lbms03.cityu.edu.hk/oaps/cah2016-2545-wck751.pdf)，[hdl:2031/8795](http://hdl.handle.net/2031/8795)。locator 为 p.2 及 pp.4–7、10–12，后续性别讨论另见 pp.15–21；这是学生论文，只作补充，不能复用其文字、图版或剧照，也不能让其独自承担电影事实。

### 5.4 术语与译文边界

- `畫皮/画皮`：首次写 `Painted Skin (Huàpí, 画皮)`；`Painted Skin` 是通行且适合保留的工作译名。
- `孽鬼`：所选 CText 扫描数字图像 163 的用字；候选可按语境处理为 `wicked/accursed ghost`，`ghoul`、`demon` 会增加分类色彩，须在词表解释。Tso 2017 p.16 所引 `孽魅` 的底本来源未闭合，不能静默改字或并字。
- `鬼子`、`孽魅`：依各自见证与语境处理为斥责性称谓，不拼成一种稳定物种学。
- `人皮`：`human skin` 较中性，`human pelt` 更具恐怖效果；最终由英文编辑与文化审校共同决定。
- `拂子/拂塵`：候选 `fly whisk`；不能擅自改成 sword、wand 或 talisman。
- `异史氏曰`：与正文叙事分层；候选译法及是否保留专名须与 Liaozhai 导读统一。
- `天理`：不可无注释地缩成 common sense；需结合篇末劝诫语境处理。

## 6. `The Fighting Cricket: A Strange Tale of Power and Survival`

### 6.1 版本门禁结论

当前结论是：**继续保留《促织》；Project owner 已选择只按上海图书馆青柯亭单见证叙事，跨见证版本门禁仍未通过。**

- 已直接检查标作上海图书馆 `線普長266652-67`、乾隆三十一年青柯亭刊本的 Commons 数字页 427–432。左侧版心连续显示卷七及叶码四至九；右侧版心受折叠/裁切，故不强写每张跨页图的 a/b。
- 数字页 427 左半末见篇题〈促織〉；428 右半从“宣德间宫中尚促织之戏”开篇；429 覆盖儿子状态和再得小虫段；430 为斗虫/斗鸡等中段；431 直接出现 `後歲餘…身化促織`、完成 `異史氏曰`，并另起王渔洋评语；432 续完王评后另起〈向杲〉。
- 这关闭了硬门禁第 2 项，也纠正了先前把数字页 430 误作结尾的观察；关键自述在数字页 431，`後歲餘` 只能译作“一年多后”，不能写“恰好一年后”。
- 专项研究报告现存手稿与青柯亭系统文字在儿子苏醒状态和结尾自述上有重要异文，但本站仍未直接取得辽宁手稿关键叶、任笃行/张友鹤篇级校记或早期抄本。
- 因此本批只按这一青柯亭见证物化见证限定的情节 Claim；跨见证、作者归属、谁“首次创造/加入”魂化结尾仍不得写成事实。

### 6.2 候选 claim map

| 标签 | 候选主张 | 状态 | 证据与 locator | 安全边界 |
| --- | --- | --- | --- | --- |
| FC-01 | 故事以宣德年间宫廷嗜斗蟋蟀、征求压力逐级落到民间开篇。 | 青柯亭单见证已直接核字 | 上海图书馆青柯亭见证卷七：Commons 数字页 427 左半见篇题，428 右半开篇；左侧可见叶码四至五 | 这是小说设定，不能直接作为明代真实税制或宫廷史事实 |
| FC-02 | 成名被迫承担促织差役，遭杖责，又不愿或无力把负担转嫁给乡民。 | 青柯亭单见证已直接核字 | 同一见证数字页 428，左侧可见叶码五 | 可分析权力链，不把人物当作所有基层吏役的代表 |
| FC-03 | 巫者的图示引导成名寻得异虫。 | 青柯亭单见证已直接核字 | 同一见证数字页 428，左侧可见叶码五 | 只述情节，不推广为民俗、宗教或历史实践 |
| FC-04 | 儿子误毙蟋蟀、坠井；青柯亭见证写救出时尚有气息，后续神气痴木、奄奄思睡。 | 青柯亭单见证已直接核字；跨见证差异未闭合 | 同一见证数字页 429，左侧可见叶码六；手稿关键叶与校记仍待取得 | 不写现代医学意义的 death、coma 或 resurrection，也不把这一见证措辞外推到全版本 |
| FC-05 | 小蟋蟀善斗、胜鸡、被逐级进献，并会随音乐动作。 | 青柯亭单见证已直接核字 | 同一见证数字页 429–431，左侧可见叶码六至八 | 明确是作品内叙事，不作为动物行为学或宫廷史事实 |
| FC-06 | 皇帝奖赏沿权力链回流，成家由贫困转为富裕。 | 青柯亭单见证已直接核字；解释须归因 | 同一见证数字页 431，左侧可见叶码八；Liu 2026 §3.1 只承担权力分析 | “权力、服从与生存”是编辑分析主线，不等于唯一作者意图 |
| FC-07 | 上海图书馆青柯亭见证明确写儿子在一年多后自述曾 `身化促織`。 | 青柯亭单见证已直接核字；跨见证与作者归属未闭合 | [青柯亭 Commons 影印对象](https://commons.wikimedia.org/wiki/File:%E8%81%8A%E6%96%8B%E5%BF%97%E5%BC%82.%E5%8D%81%E5%85%AD%E5%8D%B7.%E6%B8%85.%E8%92%B2%E6%9D%BE%E9%BE%84.%E6%92%B0.%E6%B8%85%E4%B9%BE%E9%9A%86%E4%B8%89%E5%8D%81%E4%B8%80%E5%B9%B4%E9%9D%92%E6%9F%AF%E4%BA%AD%E5%88%8A%E6%9C%AC.pdf)数字页 431、左侧可见叶码八：`後歲餘…身化促織…今始蘇耳` | 只能归于这一指定见证；`後歲餘` 不译作“恰好一年后”，也不得据此声称谁首次创造或增补该结尾 |
| FC-08 | 专项研究报告，现存手稿没有现代通行录文中那句明确的儿子自述。 | 只能归因；手稿原叶待核 | 赵伯陶 2014；郭晓雨 2022；手稿影印待取得 | Liu 2026 等二手研究不能裁决版本；正文采用前须回手稿影印和校记复核，且不能扩成“手稿完全没有魂化构思” |
| FC-09 | 赵伯陶认为手稿叙事已暗写儿子与蟋蟀的联系；郭晓雨等研究倾向把明确魂化段视为青柯亭增文。 | 只能分别归因 | 赵伯陶〈《聊斋》丛脞录〉；郭晓雨 2022；刘洪强 2025 | 分歧本身可写，任何一方都不能在底本未闭合时升格为事实 |
| FC-10 | “青柯亭首次加入魂化情节”或“赵起杲等人创作了结尾”目前没有通过证据门禁。 | 阻塞 | 需手稿、多个早期抄本与权威校记横向校勘 | 正文禁写；2026 单篇论文不能独自证明 |
| FC-11 | 篇末 `异史氏曰` 可支持对逐级权力侵害和获利链的文本分析。 | 青柯亭单见证已核；解释仍须归因 | 同一见证数字页 431、左侧可见叶码八；评语在该页结束，随后另起王渔洋评语并延续至数字页 432 | `蠹` 等词有典故与多义风险；不得把解读写成中立史实，王渔洋评语也不得误并入 `异史氏曰` |

### 6.3 核心来源与权利

- 蒲松龄《聊斋志异》十六卷，乾隆三十一年（1766）青柯亭刊本，上海图书馆 `線普長266652-67`，[Commons 影印对象](https://commons.wikimedia.org/wiki/File:%E8%81%8A%E6%96%8B%E5%BF%97%E5%BC%82.%E5%8D%81%E5%85%AD%E5%8D%B7.%E6%B8%85.%E8%92%B2%E6%9D%BE%E9%BE%84.%E6%92%B0.%E6%B8%85%E4%B9%BE%E9%9A%86%E4%B8%89%E5%8D%81%E4%B8%80%E5%B9%B4%E9%9D%92%E6%9F%AF%E4%BA%AD%E5%88%8A%E6%9C%AC.pdf)：一手见证，页面标 Public Domain Mark。〈促織〉固定在卷七、Commons 数字页 427–432；左侧版心依次可见叶码四至九。每张数字图跨两个书页，右侧版心受折叠/裁切，故不虚构 a/b。
- [CText〈促织〉](https://ctext.org/wiki.pl?chapter=762770&if=en)与[识典定位页](https://www.shidianguji.com/mid-page/7518513114221182986)：只作快速检索/录文定位，不承担异文裁决。
- Guancheng Liu, “The poetics of power and submission: discursive constructions of patriarchal authority in ‘The Fighting Cricket’ and the Binding of Isaac,” *Cogent Arts & Humanities* 13.1 (2026), article 2626662，[DOI](https://doi.org/10.1080/23311983.2026.2626662)，§3.1 / PDF p.5：只承担作者归名的版本解释与权力分析。该处版本引文不完整、未给手稿叶码/青柯亭页码或篇级校记；论文虽为 CC BY 4.0 并披露使用 ChatGPT 润色英文，仍不能未经原典复核承担文化事实。
- [故宫《聊斋志异》](https://www.dpm.org.cn/lemmas/244792.html)及停运省级地情数据库公开镜像中的[手稿/抄本](https://shandong-chorography.org/database/a/section/96/article/31/)与[刻本](https://shandong-chorography.org/database/a/section/96/article/32/)资料：负责总体版本谱系与待查影印线索；镜像不冒充现行官方数据库，也不代替《促织》篇级校勘。
- 赵伯陶〈《聊斋》丛脞录〉（《蒲松龄研究》2014.2）[发现镜像](https://m.fx361.com/news/2015/0515/2363925.html)、郭晓雨〈《聊斋志异·促织》之版本对比辨析〉（2022.3）[发现镜像](https://m.fx361.com/news/2022/1021/10666133.html)、刘洪强〈“魂化促织”为神来之笔论〉（2025.4）[期刊入口](https://sdjx.cbpt.cnki.net/portal/journal/portal/client/paper/66f29b449d3f80ba52581da1ac48339c)：用于呈现分歧并追查原刊；镜像和摘要不能代替完整论文。
- 袁世硕〈《聊斋志异》青柯亭本编刻始末〉（2023.2）[发现镜像](https://m.fx361.com/news/2023/0725/22603097.html)：提示“青柯亭本”还涉及未完成印本与鲍廷博补刻完成本等状态；后续必须始终指定具体馆藏见证。

### 6.4 术语与版本措辞

- `促织`：工作英题为 `The Fighting Cricket`，不是逐字或唯一通行译名；正文首次保留 `Cùzhī / 促织`。
- `离魂` 是现代研究标签，不是已核青柯亭结尾的原词；英文不能借它预设一套固定宗教教义。
- `身化` 候选译法为 `became/took the form of the cricket`；不外推成普遍“中国灵魂观”。
- `复苏/今始苏耳/神气痴木/奄奄思睡` 不医学化为 death、resurrection 或 coma。
- `岁征民间` 只写作品中的 annual levy/exaction，不直接等同经史料认证的正式税种。
- `异史氏` 是叙述/评点人格；`蠹` 同时有虫蛀、损害、贪蠹等语义与典故争议，不宜只译为 `bookworms`。

### 6.5 硬门禁与 fallback

以下四项中第 2 项已闭合；其余三项全部闭合前，不得为 FC-08–FC-10 建无保留事实 Claim：

1. 取得辽宁省图书馆藏蒲松龄手稿的可靠影印，记录两处关键段落的卷、叶、面和页。
2. **已闭合**：固定上海图书馆 `線普長266652-67` 见证的卷七、Commons 数字页 427–432 与可见叶码四至九，并逐字核对儿子状态及 `後歲餘…身化促織` 两处关键文字；右侧版心裁切使 a/b 不可可靠分配，但不妨碍本见证的数字页与可见叶码定位。
3. 核任笃行《全校会注集评聊斋志异》与张友鹤《聊斋志异会校会注会评本》的〈促织〉正文、校记和版次。
4. 抽查至少一个早期抄本支系，判断“首次/唯一见于青柯亭”是否成立。

第 2 项已经闭合，Project owner 已选择只按这一青柯亭见证叙事，并删除作者归属、首次增写和版本演变判断；若未来要恢复跨见证叙事，仍须另行授权并闭合第 1、3、4 项。切换 `Nie Xiaoqian / 聂小倩` 也不是自动执行，且不免除新篇自己的 claim map 与来源门禁。

## 7. 共用版权、翻译与内容安全边界

- 蒲松龄原文及清代刻本本身已进入公版，不表示现代标点、校勘、注释、翻译、数据库转录或扫描平台附加内容可整段复制。
- CText、CBETA、馆藏站和数据库“可查看”不等于图片可商用；每个未来 Asset 仍须独立记录来源、许可、用途、人工审核、alt 与 caption。
- Giles 旧译只作版本/接受史比较；Minford 等现代译本只短引、标注译者/版次/页码，不作为本站整篇译文来源。
- 本站若自译，必须标为 `our translation`，逐句回到已冻结中文见证，并保存译者、复核者、版本、locator 与日期。
- 鬼、妖、精、魅、神、仙以及 Buddhist technical terms 不做方便性的统一 `demon/spirit`；每个词根据指定语境单独决定。
- 身体恐怖、死亡、家庭暴力、儿童伤害和性别/欲望是后续内容提示与编辑审校项；研究存在不等于已批准公开表达。

## 8. 下一获授权批次的建议顺序

1. 已完成：Project owner 确认 Liaozhai 现代中文工作底本路线为任笃行 2016 修订本为主、张友鹤 2011 第二版为对校；实际册次、页码和全站篇数口径仍待取得后再冻结。
2. 已完成：Project owner 选择《促织》只按已核上海图书馆青柯亭见证叙事；跨见证主线、作者归属与首次增写判断继续排除。
3. 已完成：在独立授权下，只把证据已闭合的最小子集物化为 5 Source、9 Claim 与 3 Terminology，并建立四个空 draft Entry owner；未闭合项没有一起带入。
4. 已完成：按后续单篇授权，只把 Ten Kings 已物化的 2 Source / 3 Claim / 1 Terminology 写入其消费清单并形成证据受限首稿；不扩到其他三篇。
5. 已完成：按后续单篇授权，只把 Fighting Cricket 已物化的 1 Source / 3 Claim / 1 Terminology 写入其消费清单并形成证据受限首稿；可见 Source 记录按独立最小例外改为 ASCII，精确馆藏号仍留在内部 notes。
6. 下一步仍须另行选择并授权：现有两篇编辑/双语审校、取得任/张实际册页，或 Liaozhai Reading Guide / Painted Skin 的逐篇证据受限写作；Collection 关系、视觉资产与状态继续独立门禁。

## 9. 本批最终状态

- 四篇候选的 claim map、正式书目、可取得的精确 locator、术语与不可写边界已完成分层研究；后续又建立最小 draft owner 与证据对象，并只为 Ten Kings / Fighting Cricket 形成限域首稿。结果仍不是四篇一律“通过”或可写作。
- Ten Kings 的 S.3961 对象/IIIF canvas 与 CBETA 行号中，证据闭合的三条对象/文本 Claim、两份 Source 与 `十王` Terminology 已物化；图片复用权利与个别二手页内细节仍须在资产/写作阶段单独核验。
- Liaozhai 导读已物化 Luo 2009 Source、两条归因/计数 Claim 与 `志怪` Terminology；任 2016 主/张 2011 对校路线虽已确认，实际册页未取得，故两书没有进入 Source。
- Painted Skin 的研究账本已固定 CText、Giles 与 Tso locator，但本批只物化 Tso 2017 Source 与一条明确归因 Claim；CText/Giles 权利、`孽鬼/孽魅` 异文来源、现代译本独立核页及电影一手时间码仍未闭合。
- Fighting Cricket 已按确认的单见证路线消费上海图书馆青柯亭 Source、三条见证限定 Claim 与 `身化` Terminology，并形成首稿；手稿/校记/早期抄本未得，跨见证、作者归属与“谁首次增写魂化结尾”仍阻塞。
- 研究批本身没有写正文、创建内容对象、变更状态、处理资产、运行服务、写 Git、部署或发布；随后独立授权的证据物化同样没有写正文、处理资产、改状态、接外部服务、运行服务或写 Git。

## 10. 2026-09-04 证据最小物化

### 10.1 授权与范围

Project owner 先确认任笃行 2016 主/张友鹤 2011 对校的 Liaozhai 工作路线及《促织》青柯亭单见证路线；随后授权四个最小 Entry owner，最终明确授权只物化证据已闭合的 Source、Claim 与 Terminology。正文、图片、状态、Collection 关系、外部服务与 Git 写入均明确排除。

### 10.2 实际对象

- Entry：`ten-kings`（guide）、`liaozhai-reading-guide`（guide）、`painted-skin`（tale）、`fighting-cricket`（tale）；全部为 `draft`，body、Source/Claim/Terminology 反向数组、Collection/related 关系、日期与资产字段均为空。
- Source：`source-idp-ten-kings-s3961`、`source-cbeta-ten-kings-x01n0021`、`source-luo-ghost-of-liaozhai-2009`、`source-tso-repressed-sexual-modernity-2017`、`source-shanghai-library-qingketing-liaozhai-1766`。
- Claim：`claim-ten-kings-s3961-object`、`claim-ten-kings-ten-intervals`、`claim-ten-kings-recording-apparatus`、`claim-liaozhai-compilation-period-in-luo`、`claim-liaozhai-counts-vary-by-edition`、`claim-painted-skin-tso-gender-translation-reading`、`claim-fighting-cricket-levy-pressure`、`claim-fighting-cricket-son-rescue-state`、`claim-fighting-cricket-son-shen-hua`。
- Terminology：`term-shi-wang-in-ten-kings`、`term-zhiguai-in-liaozhai-reading-guide`、`term-shen-hua-in-fighting-cricket`；全部仅为 `source-checked`，不是 bilingual-approved。
- 当前总 inventory：6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology；published Entry / Collection 仍为 0/0。

### 10.3 合同与排除项

- Source Schema 新增必填 `usesDigitalImageEvidence`。它表示当前 Claim / Terminology locator 是否依赖数字页图、IIIF canvas 或馆藏对象图像；值为 `true` 时必须同时填写 `rightsStatus` 与 `rightsUrl`。`false` 不表示网页没有图片，权利对也不授权把图像转为 Asset。
- 九份既有 Source 已显式迁移；值不得按来源类型、URL 或页面是否含图自动猜测。
- 不建立 CText/Giles Painted Skin Source、不建立 `孽鬼` Terminology；不建立尚无实际册页的任/张 Source；不建立 FC-08–FC-10、跨见证、作者归属、“首次增写”或起源 Claim。
- 四个 draft 依既有动态路由生成 direct-only noindex review 页面，但不进入 Header、Explore/Collections 候选架、现有 Collection 或 public 投影；模板行为未改变，六个 Entry 页均保留现有 inactive Reader Request。
- 输出 inventory 与匹配验证结果以 [`DEV_WORKFLOW.md`](../../DEV_WORKFLOW.md) 的本批执行记录为准；研究来源网页可访问不替代 Schema、内容图、构建与 output verifier。

## 11. 2026-09-04 证据检查点与 Ten Kings 单篇纵切片

### 11.1 授权与版本停点

Project owner 接受建议：先把第 10 节及其关联研究、状态同步形成一次本地检查点，再只推进 Ten Kings 单篇。证据批已提交为 `9914dd3`；Project owner 随后通过 Ten Kings 首稿并授权本地提交，该纵切片已进入当前 HEAD。两次提交均未 fetch 或 push。

### 11.2 Entry 实际结果

- 标题由 `The Ten Kings: Judgment, Records, and Rebirth` 收窄为 `The Ten Kings: Dates, Records, and Judgment`；当前 Claim 没有承担 rebirth，故不把它留在标题。
- `sourceIds` 精确为 `source-idp-ten-kings-s3961`、`source-cbeta-ten-kings-x01n0021`；`claimIds` 精确为对象身份/数字序列、十个时间节点、记录与衡量装置三条；`terminologyRecordIds` 只含 `term-shi-wang-in-ten-kings`。
- Entry 形成两段 opening、110 词 summary 与 “One illustrated scroll”“Ten intervals in one textual witness”“Judgment through records and instruments”“Keep the name bounded” 四节正文；`lastFactCheckedAt` 为 `2026-09-04`，`status` 保持 `draft`。
- 正文分别限定 S.3961 数字对象与 CBETA 电子文本，明确不宣称 earliest、普遍日程、超自然实在、现实行政制度逐项复制、历史展示/诵读/受众、形成史、跨见证重建或 rebirth。

### 11.3 CJK 与验证边界

- 完整检查先后正确拦截了英语语言上下文中的可见中文及未进入当前 hash-locked `zh-Hans` 内容字符集的 `十王`。为避免未经授权扩展 CJK 字体资产与哈希链，Entry 继续使用英语可见文本，`nameZh` / `pinyin` 保持空值；中文形式与拼音只保留在现有 `source-checked` Terminology，等待后续双语审核。未修改字符集、字体文件、manifest 或字体哈希。
- 修正后完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批没有图片、Collection/`relatedEntryIds`、状态、Schema、测试、外部服务、服务进程、public artifact、push、部署或发布；其余三个新增 Entry 仍为空 draft。浏览器、键盘、缩放、双语、目标读者与页面级人工审核仍未执行。

## 12. 2026-09-04 Fighting Cricket 单见证内容纵切片

### 12.1 授权与证据消费

Project owner 授权只为 `fighting-cricket` 编写证据受限英语首稿，只消费既有 1 Source / 3 Claim / 1 Terminology，保持 `draft`；不新增证据对象、不处理图片、不建 Collection/related 关系、不改状态、不接外部服务、不做 Git 写入。

- `sourceIds` 只含 `source-shanghai-library-qingketing-liaozhai-1766`；`claimIds` 只含 levy pressure、son rescue state、son `shen hua` 三条；`terminologyRecordIds` 只含 `term-shen-hua-in-fighting-cricket`。
- Entry 形成两段 opening、104 词 summary 与 “A demand moves downward”“A crisis inside the household”“What the son says later”“One witness, one boundary” 四节英语正文；`lastFactCheckedAt` 为 `2026-09-04`，`status` 保持 `draft`。
- 正文不补写当前三条 Claim 未承担的故事连接段，也不把小说叙事概括为历史税制；儿子被救起时仍有呼吸，因此不写死亡、复活或现代医学诊断；`身化` 仅译为 `took the form of`，不推导灵魂、轮回或跨见证结论。

### 12.2 Source 可见记录最小例外

首次完整检查先因 opening 的 plain scalar 含冒号而触发 YAML 解析错误，改用既有合同允许的 folded scalar。随后 output verifier 正确拦截既有 Source `editionBasisOrObjectId` 中在英语页面可见的 `線` 字。Project owner 因此另行授权只做最小 Source 修正：

- 可见记录改为 `Shanghai Library record 266652-67`；
- 精确馆藏号 `線普長266652-67` 原样保存在 Source notes；
- 不修改 Source 身份、URL、版次、locator、权利事实、Claim、Terminology、Schema、模板、字符集、字体文件、manifest 或字体哈希。

### 12.3 验证与停点

- 最终完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 当前总 inventory 保持 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published Entry / Collection 仍为 0/0。Ten Kings 与 Fighting Cricket 分别形成 2/3/1 与 1/3/1 的消费关系及首稿；Liaozhai Reading Guide 与 Painted Skin 仍为空 draft。
- 当前英语 draft 只消费 Terminology 的 chosen English；`Cùzhī / 促织` 与 `shēn huà (身化)` 的可见首见格式仍待 bilingual-approved 与 CJK 字符门禁，不因本次反向消费而视为通过。
- 未运行 dev/preview/browser 或非默认 `visual:build:check`；未处理图片、关系、状态、外部服务、public artifact、部署或发布。Project owner 通过中文概要确认内容符合预期并另行授权本地提交，本批随该检查点进入当前 HEAD；`main` 相对未 fetch 的本地 `origin/main` ahead 3，未 fetch 或 push。
