# 008 四篇首发候选 Claim Map 与来源研究

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

## 0. 文档职责与状态

后续状态：012 VB6 已在 `1be085b` 基线上审核六篇 Entry / 两个 Collection 到 ready，并闭合四篇分类、Related 编辑环与 Liaozhai Featured（Painted Skin）；其后 owner 已批准全部 6+2 为 published，六篇目标公开日期统一为 2026-09-10，尚未部署。本文研究、物化、首稿和双语批次的 draft/状态未改说明保留为当时边界，不覆盖 012 独立状态审核。四篇正文、证据范围与原事实核查日期保持。

Project owner 于 2026-09-03 确认 [`007-second-collection-decision.md`](007-second-collection-decision.md) 的推荐方向，先授权四篇候选的 claim map 与来源研究，随后又单独授权只做实际见证/版次、正式书目和页/叶/canvas locator 闭合。本文件合并记录这两个连续但互不扩权的研究批次，并在第 10–13 节另行记录 2026-09-04 后续独立授权的编辑路线确认、最小证据物化、检查点提交与 Ten Kings、Fighting Cricket、Liaozhai Reading Guide 三篇纵切片。2026-09-05 的 Painted Skin 写作前复核与现代版本检索记录于第 5.5–5.9 节；Project owner 随后授权补齐可合法核验的缺口，以具名且标为公版的 1766 青柯亭本形成单见证草稿，结果见第 5.10 节，并于 2026-09-06 完成该篇人工双语审核，见第 5.11 节。前三篇既有首稿的编辑复核与较早人工双语确认仍单独记录于第 14 节，不外推为 Painted Skin 的审核依据。

本文负责：

- 为 `The Ten Kings: Dates, Records, and Judgment`、`How to Read Liaozhai`、`Painted Skin: What Pu Songling’s Tale Says` 与 `The Fighting Cricket: A Strange Tale of Power and Survival` 建立候选 claim map。
- 分开原典/馆藏对象、专业研究、发现工具和编辑推断，记录可用 locator 与仍需取得的证据。
- 判断每篇是否具备独立读者价值，以及下一内容批次开始前的停止条件。

本文不负责：

- 写正文、Quick Answer、摘要或最终译文。
- 创建或修改 Collection、Entry、Source、Claim、Terminology、稳定 ID、slug、关系、状态、页面或 Schema。
- 选择、下载、生成或批准图片与其他资产。
- 启动服务、安装依赖、执行 Git 写操作、远端同步、部署或发布。

上述“不负责”限定前两次研究批；后续内容对象、Schema 变化与三篇首稿只有在 Project owner 另行授权后发生，并由第 10–13 节单独记录，不能倒推为原研究授权的一部分。

| 维度 | 当前状态 | 结论或边界 |
| --- | --- | --- |
| 方向决定 | 已确认 | 007 的 Liaozhai 第二 Collection 方向、3+3 分配、两条公开阅读顺序、Zhong Kui Featured 与《促织》保留均获确认；后续又确认任笃行 2016 主/张友鹤 2011 对校的工作路线，以及《促织》青柯亭单见证路线；第二 Collection 名仍是工作标题 |
| 研究状态 | 可取得证据已分层复核，未决门禁保留 | Ten Kings 的馆藏对象、IIIF canvas、CBETA 行号及核心书目已闭合；Painted Skin 已核上海图书馆 1766 青柯亭本卷一数字页 72–75 / 左版心叶码 35–38，并区分任 2016 的部分可读电子材料与张 2011 的书目边界；《促织》只闭合上海图书馆青柯亭见证，跨见证门禁仍未闭合 |
| 写作准备度 | 四篇均有证据受限英语草稿；修订前锁定稿及 010 当前改动单元与两条内容提示均已通过 Project owner 双语确认 | Painted Skin 当前只消费青柯亭 1766 与 Tso 2017 的 2 Source / 7 Claim / 1 `bilingual-approved` Terminology；自译只取一条短句并以 `verified` Claim 保存原文、版本、locator、译者/日期与审核记录，任/张比较及现代译本/影视直接比较移出当前 MVP |
| 实施状态 | 证据物化、四篇纵切片、双语确认、两个合集路径、五组 Hero 与 VB6 ready 审核完成 | 当前四个新增 Entry 均有正文，已在 VB6 ready 后取得独立 published 批准；009 已把六篇接入两个三篇路径。012 已闭合四篇 Entry 与 Liaozhai Collection 的 approved brief、候选/权利、exact-canvas master、production record、approved/current manifest、repository source 和内容 Hero 绑定；VB6 已闭合两条 Related 编辑环、Liaozhai Featured（Painted Skin）与 6+2 ready。R1 已退役为 reference-only，目标读者反馈仍为 0 |
| 本批发布状态 | 当时未发布 | 后续独立批准后的 6/2 已随 Public Beta 公开；本文研究批本身不授权 public artifact 或部署 |

本文中的 `TK-*`、`LZ-*`、`PS-*`、`FC-*` 只是研究表格内的局部标签，不是 Content Layer 稳定 ID，也不得复制进 `src/content` 后直接充当 Claim ID。表中的“可写”表示证据路线足以支持后续起草，不表示主张已完成双语、文化、版权或 Project owner 审校。

## 1. 结论与下一停点

| 候选篇 | 独立读者问题 | 研究结论 | 进入正文前最小门禁 |
| --- | --- | --- | --- |
| Ten Kings | 两个有边界的图文见证如何分别呈现十王序列、日期、卷宗与审查机制？ | **证据受限首稿已完成**；S.3961 与 CBETA 是两个不同见证，正文只消费已闭合的 2 Source / 3 Claim / 1 Terminology | 不补写形成史、rebirth、跨见证重建或普遍实践；历史展示/诵读方式与图片商用权仍不得写成已闭合 |
| How to Read Liaozhai | 为什么读《聊斋》前必须先问版本、文类、计数与译本，而不能把它当成一套透明的民间信仰记录？ | **证据受限首稿已完成**；正文只消费 Luo 2009 的 1 Source / 2 Claim / 1 Terminology，限定编纂时间、版次计数与 `zhiguai` 的当前证据边界 | 任 2016 主/张 2011 对校路线已确认，但实际册页未取得，故两书未建 Source、不得补篇级页码、终本判断或把目录记录当正文 |
| Painted Skin | 1766 青柯亭本如何用可穿戴的外表、误认、身体恐怖与评语组织故事？ | **证据受限单见证首稿、当时锁定稿及 010 当前改动单元的人工双语审核已完成**；正文消费青柯亭 1766 的 5 条原典 Claim、1 条 `verified` 本站自译 Claim 与 Tso 2017 的 1 条具名解释 Claim | 青柯亭页 74 实际作 `業魅`，经审按语境译为 `wicked apparition`；任/张现代校勘本比较与现代译本/影视直接比较移出当前 MVP，不将单见证写成定本或版本史 |
| Fighting Cricket | 征求压力如何沿权力链进入家庭；指定青柯亭见证如何叙述儿子与蟋蟀的联系？ | **证据受限单见证首稿已完成**；只消费上海图书馆青柯亭 Source、3 Claim 与 1 Terminology | 不补写未物化情节；辽宁手稿、两种权威校记与早期抄本未得，跨见证、作者归属和“首次增写”继续阻塞 |

研究批最初停止在证据闭合账本，而不是正文；Project owner 随后分别确认底本/单见证路线、授权四个最小 Entry owner，并另行授权只物化证据已闭合的 Source/Claim/Terminology。该后续实施记录见第 10 节；再后的 Ten Kings、Fighting Cricket 与 Liaozhai Reading Guide 单篇授权分别见第 11–13 节。前述任一批次都不得自动扩为其他 Entry 正文、图片、Collection 关系或 `ready/published`。

### 1.1 证据闭合账本

| 候选篇 | 已冻结的直接见证/版次 | 已闭合 locator | 仍未闭合 |
| --- | --- | --- | --- |
| Ten Kings | IDP / British Library `Or.8210/S.3961`；CBETA 2016.06 `X01n0021_001`；Teiser 1994；Kwon 2019；Schmid 2008 | S.3961 IIIF `items/7–15`；CBETA `[0408b13–0409c22]`；Schmid pp.303、308–309 | IDP 图像复用许可；Teiser/Kwon 只有目录级章节起页，不能冒充逐项正文核验；历史观众、展卷与唱诵方式无直接证据 |
| How to Read Liaozhai | Luo Hui 2009 博士论文；Barr 1983 书目/摘要；青柯亭馆藏与目录记录；两个现代校勘本候选 | Luo print pp.73、154、157–161（PDF frames 77、158、161–165）；大连目录项 40366；《作者自志》固定修订版文末 | 已确认路线中的任笃行 2016 / 张友鹤 2011 实际册次与篇级页码；辽宁手稿 shelfmark/关键叶；Barr 1984/1986、Cheung 与 Minford 的相关全文页 |
| Painted Skin | 上海图书馆 `線普長266652-67` 1766 青柯亭刊本；Tso 2017；任 2016 / 张 2011 仅作延期比较路线 | 青柯亭卷一〈畫皮〉从数字页 72 篇题至 75〈賈兒〉篇题前，左侧版心叶码 35–38；画皮动作在 73、`業魅` 在 74、救治与 `異史氏曰` 在 75；Tso pp.15–18 | 任 2016 正文仍在授权试读范围外，张 2011 未取得实页；CText/Giles/Minford/2008 电影不进入当前 MVP 的直接比较；跨见证异文史与现代比较继续延期，详见第 5.10 节 |
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
| TK-03 | 该文本的生前预修段写修名、纳状及记名在案；后续审判段另写业簿、业秤和业镜。 | 文本可证；图像可互证 | CBETA `[0408b23–0408c07]`、`[0409b23–0409c04]`；Teiser 1994 目录所示 `Bureaucracy` 章起于 p.171 | 两组措辞属于不同段落与动作；不把名案泛译为 `case records`，不等同现实司法制度的逐项复制，也不证明超自然法庭真实存在；章节起页不是具体论断的逐页核验 |
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
| LZ-02 | 今见《聊斋自志》署“康熙己未春日”（1679）；Luo 以此为作品主体最早至 1679 年已形成这一判断的时间锚点。 | 原文可定位；研究页码已核，影印待核 | [《作者自志》固定版本](https://zh.wikisource.org/w/index.php?title=聊齋志異/作者自志&oldid=2346917)，文末；Luo 2009 print pp.73、154 / PDF frames 77、158 | 固定页面的元数据与正文纪年不一致；Luo 的主体形成判断必须归因，不把 1679 写成每篇均已最终定稿 |
| LZ-03 | Luo 将《聊斋》的编纂期约定为 1670–1700，并写其主体最早至 1679 年已形成。 | 专业研究可支持 | Luo 2009 print p.154 / PDF frame 158；[Barr 1983 ORA](https://ora.ox.ac.uk/objects/uuid:9eb3578a-1c31-409b-ac60-2a04b16227d9)只以摘要支持卷次年代研究范围 | 起讫年与主体形成判断均须归因给 Luo；该段不能为每篇指定最终完成日，Barr 摘要也不能独立承担整串过程 |
| LZ-04 | 《聊斋志异》先经手稿和抄本传播，作者去世后才出现 1766 年的关键早期刻本。 | 专业研究 + 馆藏可支持 | Luo 2009 print p.154 / PDF frame 158；Barr, “The Textual Transmission,” pp.515–562，[DOI](https://doi.org/10.2307/2719041)；故宫 | 不把所有抄本说成作者手稿的直接复制；Barr 全文页尚未直接取得，“最早刻本”须保留现知见证范围 |
| LZ-05 | 青柯亭本刊于乾隆三十一年（1766）；这一十六卷刻本经过选择、编次和删节，不能等同蒲松龄亲定原稿。 | 馆藏事实 + 研究页码已核 | Luo 2009 print pp.159–160 / PDF frames 163–165；[辽宁珍贵古籍名录项 40366](https://www.ln.gov.cn/web/zwgkx/zfxxgk1/zc/xzgfxwj/szf/szfwj/2023010416224448385/index.shtml)只证明大连图书馆藏卷一至十五的不完整对象 | 馆藏目录不承担编辑过程；上海、天津及其他青柯亭对象还可能有状态差异，必须指定馆藏见证 |
| LZ-06 | 辽宁省图书馆藏现存约半部蒲松龄手稿；公开报道对异手数量的口径并不一致。 | 馆藏归属与半部范围可支持；精确计数阻塞 | 故宫支持“现存手稿半部”；[辽宁日报](https://epaper.lnd.com.cn/lnrbepaper/pad/con/202207/18/content_158043.html)与[新华社](https://www.xinhuanet.com/politics/2020-03/09/c_1125686435.htm)支持辽宁省图书馆及 2019 影印线索；正式影印候选为蒲松龄《稿本聊斋志异》，沈阳出版社，2019，ISBN 978-7-5716-0335-9 | 不称“宫博稿本”或“清稿本”；未取得馆藏 shelfmark 与影印关键页前不固定 237/206/31/7 等相互冲突的计数，也不推定异手身份 |
| LZ-07 | 不同版本可有不同篇目内容、卷次和篇数；面向普通读者暂用“近五百篇”最安全。 | 多见证事实 + 编辑选择 | Luo 2009 print p.160 / PDF frame 165 报告赵起杲十六卷本 431 tales 与张友鹤三会本十二卷加一附录 491 tales；故宫并列 12/16 卷；LOC 的 491 篇概述未绑定具名馆藏版本 | Luo 此页两个数字都以 tales 为单位，不能据此独自证明计数单位变化；431、491 与其他数字不得互换，也不把其张友鹤记录移称为已亲核 2011 版 |
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

本篇把上海图书馆所藏 1766 青柯亭本这一具名中文见证写了什么放在第一层，并把 Tso 2017 的现代解释保持为明确归因的第二层。本站对旧英译、现代译本和影视改编的直接比较需要各自的版本与场景证据，当前移出 MVP；Tso 对 Giles 的具名二手解释仍保留。高传播改编不能反向决定原篇中的物种、人物名或主题。

### 5.2 候选 claim map

| 标签 | 候选主张 | 状态 | 证据与 locator | 安全边界 |
| --- | --- | --- | --- | --- |
| PS-01 | 上海图书馆 `線普長266652-67` 是乾隆三十一年（1766）青柯亭十六卷刊本；〈畫皮〉位于卷一。 | 具名数字见证可证 | [Commons 影印对象](https://commons.wikimedia.org/wiki/File:%E8%81%8A%E6%96%8B%E5%BF%97%E5%BC%82.%E5%8D%81%E5%85%AD%E5%8D%B7.%E6%B8%85.%E8%92%B2%E6%9D%BE%E9%BE%84.%E6%92%B0.%E6%B8%85%E4%B9%BE%E9%9A%86%E4%B8%89%E5%8D%81%E4%B8%80%E5%B9%B4%E9%9D%92%E6%9F%AF%E4%BA%AD%E5%88%8A%E6%9C%AC.pdf)，数字页 72 篇题至 75〈賈兒〉篇题前；左侧版心叶码 35–38 | 只称指定青柯亭见证，不写成作者定本、最早文本或所有版本 |
| PS-02 | 王生先秘密安置女子，后来妻陈氏劝他遣走；道士再警告邪气缠身，王生短暂怀疑后自行开脱。 | 指定见证可证 | 青柯亭卷一，数字页 72–73，左侧版心叶码 35–36 | 妻子的劝遣不是识破怪物；只述作品情节，不当作清代婚姻或宗教实践统计 |
| PS-03 | 王生从窗隙窥见狰狞之鬼把人皮铺在榻上，执笔绘之，再披于身化为女子。 | 指定见证可证 | 青柯亭卷一，数字页 73，左侧版心叶码 36；短引 `鋪人皮於榻上執采筆而繪之` | 本站只给一条标为 `our translation` 的短译；不把 `采` 静默规范成 `彩`，也不加脸部、皮衣来源或影视造型细节 |
| PS-04 | 道士当面斥为 `業魅`；同篇另有鬼类称呼，篇界内未用狐称。 | 指定见证可证；跨见证版本史未决 | 青柯亭卷一，数字页 72 篇题至 75〈賈兒〉前；`業魅` 在数字页 74，左侧版心叶码 37 | 页 72 篇题前的上一篇含狐字，必须守住篇界；`wicked apparition` 只是语境化斥语，不定义稳定物种或性别身份 |
| PS-05 | 怪物裂腹取心；妻陈氏在乞人羞辱和令吞痰唾后回家，照料尸身时有结物突奔而出、落入腹腔，视之为人心，合拢创口后叙事称王生午夜有气、天明已活。 | 指定见证可证；敏感措辞待人工审校 | 青柯亭卷一，数字页 73–75，左侧版心叶码 36–38 | 妻子不是主动“咳出并放回”心脏；这是作品叙事，不写成医学、器官移植或现实复活证据 |
| PS-06 | 篇末 `異史氏曰` 斥责以妖为美、以忠为妄，并把贪爱他人之色与妻子食他人之唾相连。 | 指定见证的评语文本可证 | 青柯亭卷一，数字页 75，左侧版心叶码 38 | 评语与正文叙事分层；不把评点人格自动等同作者全部意图，也不推出关于女性或婚姻的普遍结论 |
| PS-07 | Tso 的研究认为，原篇可被读作对性别模仿结构的戏仿，而 Giles 1880 译本压低了相关越界性。 | 只能归因；全文页已核 | [HSUHK 同行评审记录](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)；[DOI 10.4312/ala.7.2.9-18](https://doi.org/10.4312/ala.7.2.9-18)，pp.15–18 | 写成 Tso 的解释，不宣布为唯一主题；其版本年代与篇次误差不能承担版本史 |
| PS-08 | Giles 1880、Minford 等现代译本比较。 | 移出当前 MVP | Giles 1880 vol. I, pp.76–84 只保留为研究线索；Minford 2006 p.127 未独立核页 | 若未来恢复，须分别核具体版次、页码、引量、目标地区与实际用途，不据差异推定底本或动机 |
| PS-09 | Gordon Chan 2008 电影与其他现代改编比较。 | 移出当前 MVP | Wong 2016 只保留为补充研究线索 | 若未来恢复，须取得电影一手版本、场景时间码、字幕与使用依据；学生论文不能独自承担电影事实 |
| PS-10 | 把怪物解释成女性危险、腐败官员、欲望或性别边界，都是需要明确归因和证据的读法，而非文本唯一事实。 | 编辑边界 | Zeitlin；Tso；Wong | 不把现代单一理论包装成蒲松龄“真正想说的” |

### 5.3 核心来源与权利

- 蒲松龄《聊斋志异》十六卷，清乾隆三十一年（1766）青柯亭刊本，上海图书馆 `線普長266652-67`，[Commons 影印对象](https://commons.wikimedia.org/wiki/File:%E8%81%8A%E6%96%8B%E5%BF%97%E5%BC%82.%E5%8D%81%E5%85%AD%E5%8D%B7.%E6%B8%85.%E8%92%B2%E6%9D%BE%E9%BE%84.%E6%92%B0.%E6%B8%85%E4%B9%BE%E9%9A%86%E4%B8%89%E5%8D%81%E4%B8%80%E5%B9%B4%E9%9D%92%E6%9F%AF%E4%BA%AD%E5%88%8A%E6%9C%AC.pdf)：当前中文主见证。〈畫皮〉由数字页 72 右半篇题开始，至 75 左半 `異史氏曰` 结束，同页随后起〈賈兒〉；可见左侧版心叶码 35–38。Commons 对象标 Public Domain Mark；本站只自译一条短句，不将扫描图加入 Asset。
- Wing Bo Anna Tso, “Repressed Sexual Modernity: A Case Study of Herbert Giles’ (1845–1935) Rendition of Pu Songling’s *Strange Stories from a Chinese Studio* (1880) in the Late Qing,” *Acta Linguistica Asiatica* 7.2 (2017): 9–18，[机构记录](https://scholars.hsu.edu.hk/en/publications/repressed-sexual-modernity-a-case-study-of-herbert-giles1845-1935/)，[DOI](https://doi.org/10.4312/ala.7.2.9-18)。关键讨论在 pp.15–18；只承担 Tso 的翻译/性别解释。Tso 引 `孽魅`，青柯亭实页作 `業魅`，CText 关联的未具名见证作 `孽鬼`；Tso 未注明中文底本，三者不能据此建立同源或版本演变。
- CText 北大—CADAL 未具名历史版次见证、Giles 1880、Minford 与电影资料保留在第 5.5–5.9 节作为研究史和延期路线，不进入当前 Entry 的 Source 消费清单。
- John Minford and Tong Man, “Whose Strange Stories?” *East Asian History* 17/18 (1999): 1–48，[PDF](https://eah.anu.edu.au/sites/default/files/article-content/17-18/EAH17-18_01.pdf)。本轮确认它讨论翻译史与删改方法但没有分析〈画皮〉；不得继续把全篇页码列作 Painted Skin 的直接篇级证据。
- Chun Kit Banny Wong (王駿傑), “Inheriting and Transforming the Ghost: The Commercialized and Gendered Painted Skin.” Outstanding Academic Papers by Students, City University of Hong Kong, 2016，[CityU PDF](https://lbms03.cityu.edu.hk/oaps/cah2016-2545-wck751.pdf)，[hdl:2031/8795](http://hdl.handle.net/2031/8795)。locator 为 p.2 及 pp.4–7、10–12，后续性别讨论另见 pp.15–21；这是学生论文，只作补充，不能复用其文字、图版或剧照，也不能让其独自承担电影事实。

### 5.4 术语与译文边界

- `畫皮/画皮`：当前英语 draft 只使用 `Painted Skin`；本轮双语审核闭合了当时锁定及 010 后续修订的标题与正文用语，汉字和带调拼音仍保留在证据与审核材料中，待公开页 CJK 字符门禁后再决定可见首见形式。
- `業魅`：当前青柯亭见证数字页 74 的道士当面斥语；经审译法为 `wicked apparition`，保留斥责力度与部分 `魅` 的超自然色彩，但不把 `業` 写成已定字典等值；Terminology 已为 `bilingual-approved`。
- `孽魅 / 孽鬼`：Tso p.16 引 `孽魅` 但没有交代具名中文底本；`孽鬼` 只登记为 CText 北大—CADAL 未具名历史版次见证的读法。三种读法不静默归并，也不据现有差异建立版本演变。
- `人皮`：当前经审采用 `human skin`，不采用更强调恐怖效果的 `human pelt`。
- `拂子/拂塵`：候选 `fly whisk`；不能擅自改成 sword、wand 或 talisman。
- `異史氏曰`：继续作为结构化 Claim 中区分叙事与篇末评语的原典标记；当前读者正文改写为 `The text then shifts from story to closing commentary`，不显示未解释的公式转写。此前含 `Yìshǐ shì yuē` 的锁定单元及 010 当前改写均已通过 Project owner 双语确认。
- `天理`：不可无注释地缩成 common sense；需结合篇末劝诫语境处理。

### 5.5 2026-09-05 权利与引用复核

本节至第 5.9 节保存切换至青柯亭本之前的研究快照，用于说明为何 CText、Giles、Minford 与电影路线没有进入当前内容对象；当前实施口径以第 5.10 节为准。

本节只记录可审核的研究边界，不作全球版权结论或发布批准。下列官方页面均于 2026-09-05 只读访问；网页可读、引用依据、完整文本自译及图像复用分开判断。

| 对象与直接依据 | 已确认事实 | 本批采用边界与未闭合项 |
| --- | --- | --- |
| [CText FAQ：Copyright / Library and Wiki copyright and terms of use](https://ctext.org/faq/ens#copyright) | FAQ 允许为说明目的合理短引文本；私人保存、非营利学术复制另列条件。上传者给 CText 的出版/衍生许可并非给所有读者的下游许可；平台不对用户上传材料作编辑审核 | 书目、链接、locator 与内部核查可继续；未来短引须限定目的、实际引量、出处链接与权利审核。该条不自动覆盖整篇转录、自译、扫描图转载或商业衍生，不将资料公开误记为统一开放许可 |
| [CADAL 版权声明及 2025-05-08 免费开放公告](https://cadal.edu.cn/index/copyrightStatement) | 公告列教学、科研、个人学习等非商业用途，公众可访问公有领域资源，同时禁止商业牟利、非法传播与批量下载 | 这是平台服务范围，既不是对每件古籍版权的裁决，也没有提供 `res=4666` 的逐件下游许可；不能由 CText 短引条款或 IA 镜像推定 CADAL 扫描允许商用。该数字见证的整篇自译/公开复用依据仍未闭合 |
| [IA 北大见证记录](https://archive.org/details/02111693.cn)及其[元数据](https://archive.org/metadata/02111693.cn) | 题名《聊齋誌異(一)》，contributor / scanningcenter 为北京大学图书馆；`rights`、`licenseurl` 未提供 | 元数据与页图供研究定位，不新增历史刊年、刻印者或开放许可；镜像不能消除源平台权利未决项 |
| [Gutenberg 43629 目录](https://www.gutenberg.org/ebooks/43629)、[电子书正文与内附许可](https://www.gutenberg.org/cache/epub/43629/pg43629-images.html)、[PG License](https://www.gutenberg.org/policy/license) | 目录标美国公版；内附许可要求美国以外使用者核查所在地法律，书本文本与 PG 商标/许可分开处理。书内书目为 Giles 译注、London: Thos. De La Rue & Co., 1880，卷一 | 可做内部版本比较、书目与页码登记；本批未确定适用发布地区及具体公开引量，不能填作全球 public-domain。引用来源链接不等于再分发 PG 电子书，也不授权复制自动摘要、商标或现代添加内容 |
| [IA Giles 1880 记录](https://archive.org/details/strangestoriesfr00pusuuoft)及其[元数据](https://archive.org/metadata/strangestoriesfr00pusuuoft) | 出版日期为 1880，`rights`、`licenseurl` 未提供 | 保留卷一 Chapter XII、印刷 pp.76–84 的旧译身份；不能把缺失字段补为许可。中文原篇、Giles 旧译、现代转录和扫描图的权利不互相替代 |

**编辑判断**：此前“权利未闭合”的门禁保留，但不解释成禁止任何书目引用或内部研究。尚无实际公开短引/自译方案，不能预先写成 `citation-only` 已获审核；本批继续不创建 CText/Giles Source、不写正文、不生产或复用图片。Minford 等现代译文及 Tso 嵌入的第三方引文也不因论文可访问而获得复用授权。

### 5.6 精确 locator 与本次核验层级

- **直接核验**：[CText `res=4666`](https://ctext.org/library.pl?if=gb&res=4666&remap=gb)仍列北大来源、CADAL 扫描、十二个文件，并链接非 OCR `res=823219`。卷一页图入口如 [file 46700 / page 163](https://ctext.org/library.pl?if=gb&file=46700&page=163&remap=gb)本次要求登录；未登录或绕过。故不能把本批写成重新看到了 CText 原站六张页图。
- **直接核验**：读取公开 IA 同源 [02111693.cn](https://archive.org/details/02111693.cn) 的 PDF 第 160–165 页；[scandata](https://archive.org/download/02111693.cn/02111693.cn_scandata.xml) 的 `leafNum=159–164` 均无 `pageNumber`，对象记录 `Page_number_confidence=0`。以下与 CText 160–165 的对应关系沿用此前账本，本次视觉核字来自 IA，不能称两个独立历史见证互证。

| CText 图像号 / IA PDF 页 / IA n序号 | 本次页图可见内容与研究标签 |
| --- | --- |
| 160 / 160 / n159 | 篇题、王生遇女、收留、性关系及妻子警告开端；PS-01、PS-02、PS-08 |
| 161 / 161 / n160 | 道士告诫、窥见着色人皮与披皮变女、求助及拂子；PS-02、PS-03 |
| 162 / 162 / n161 | 毁拂子、取心、妻见王生已死、道士以 `鬼子` 斥责；PS-04、PS-05 |
| 163 / 163 / n162 | 道士斥称 `孽鬼`、木剑、脱皮及妻子求救；PS-04、PS-05 |
| 164 / 164 / n163 | 乞人侮辱、杖击及令妻吞痰唾；PS-05、PS-08 |
| 165 / 165 / n164 | 吐出心脏、恢复呼吸/生命、伤口与 `異史氏曰` 评语；PS-05、PS-06、PS-08 |

- 历史版次、牌记、原叶 a/b 仍未识别；这六张图没有可靠的原叶编号可抄录。扫描中的“已死/竟活”等是作品叙事用语，不证明现实医学过程；原表 PS-05 的敏感表达审核继续保留。
- CText 非 OCR [卷一文本](https://ctext.org/wiki.pl?if=gb&chapter=193959&remap=gb)本次可读，相关叙事含 `孽鬼`；既有 `#p171–#p174`、下一篇 `#p175` 继续作为平台段落定位，不当成原典行号或不可变修订 ID。未来自译仍须逐句回到冻结见证，不能复制平台标点作为校勘结论。
- Giles 1880 的印刷 pp.76–84 沿用此前页图核验；本次复核 PG 43629 卷一 XII 全篇及 XIII 边界、书内年份和许可。PG 段落可重排，不以网页行号代替印刷页码；本批没有重新逐张核 Giles 扫描图。救治段仍保留羞辱、杖击与吞服情节，故 PS-08 改记“痰唾写成药丸”等可观察差别，不笼统声称整个后半被删除，也不把差别直接归为已证实的作者意图。

### 5.7 `業魅 / 孽魅 / 孽鬼` 与候选译法

**事实**：上海图书馆青柯亭本 Commons 数字页 74 / 左侧版心叶码 37 的道士呼语刻作 `業魅償我拂子來`。IA PDF p.163 / n162 的道士呼语用 `孽鬼`，CText 关联录文同字。[Tso 出版社 PDF](https://journals.uni-lj.si/ala/article/download/6981/7277/17253) print p.16 / PDF p.8，Excerpt Four 的中文栏用 `孽魅`，英文栏标 `My English translation`，其中对应词为 `base-born fiend`；上方 Excerpt Three 的另一栏才是 Minford 2006 p.127，不能把它的版次移接给 Excerpt Four。Tso p.18 / PDF p.10 的参考文献没有给该中文引句的具名底本、出版年与篇级页码。三处相关页均已直接视觉核对，不依赖 PDF 提取乱码判字。

**推断边界**：目前只能确认青柯亭具名实页作 `業魅`、CText 关联的未具名扫描/录文作 `孽鬼`、Tso 论文引 `孽魅`。真实底本异文、刊刻/录入误字或引述环节差异均未排除；不判正误，不宣布某版如何改字，不把 Tso 的卷一第 40 篇或论文所用 1740 年认作任一已知见证身份。Giles 正文也有 `Base-born fiend`，词形相同不证明 Tso 的中文来源或翻译依赖。Minford p.127 仍未独立核书。

| 候选表达 | 编辑用途与限制；均未最终批准 |
| --- | --- |
| `wicked apparition` | 当前 `業魅` 的工作译法；保留斥责力度与部分超自然色彩，同时保持为语境化称呼，不把它定成物种名 |
| `wicked creature` | 较中性的 `業魅` 备选；斥责力度尚可，但会弱化 `魅` 的超自然色彩 |
| `wicked ghost` | 只作为 `孽鬼` 斥语候选；不能移作青柯亭 `業魅` 的精确等值，也不附加“已死之人的魂魄”起源断言 |
| `accursed ghost` | 可能增加“受诅咒”意味，当前情节没有单独证实此义，优先级低 |
| `base-born fiend` | 只登记为 Tso/Giles 可定位措辞，不直接采为本站词义；不能由此补出血统或非婚生设定 |
| `ghoul` / `demon` / `devil` | 可在具名译本分析中报告，不设为鬼、魅的统一物种/宗教对应词 |
| `creature` | 中性叙事指称的编辑候选，不能替代需要展示原词时的 `業魅/孽魅/孽鬼` 差别，也不能据此断定性别身份 |

本研究快照当时判断：若只按具名、权利闭合的单见证写作，可以排除未明异文的版本史判断；当时仍没有这样的新增授权或 Terminology 审核结果。后续授权与青柯亭本路线见第 5.10 节；本段不再定义当前门禁。

### 5.8 PS-01–PS-10 研究阶段快照（已由第 5.10 节取代）

本表的“可写”仅描述后续获得独立授权时的证据范围；本批全部不写入正文。研究标签不变为正式 Claim ID。

| 标签 | 当前可用范围 | 进入正文/内容物化前的阻塞 |
| --- | --- | --- |
| PS-01 | 可陈述平台登记与数字对象身份，不能补历史版次 | 尚无 CText Source；若使用页图，需记录证据用途、权利依据与第 5.6 节层级，不以元数据包装全文授权 |
| PS-02 | 单见证情节在 p.160–161 可定位 | 原典 Source/Claim 尚未建立；中文见证的写作用途与翻译审核未闭合 |
| PS-03 | 单见证画皮动作在 p.161 可定位 | 同 PS-02；`human skin/pelt` 仍是语气选择，不能取现代译文直接拼接 |
| PS-04 | p.162–163 的斥称及 Tso p.16 的引字差别可登记 | 中文底本异文来源未闭合、术语未批准；“没有称狐”不升级成物种断言，论文的 genderless 判断须归因 |
| PS-05 | p.162–165 的取心、妻子受辱、救治与恢复可定位 | 同 PS-02；敏感表达与身体细节仍需人工审校，不能医学化 |
| PS-06 | p.165 有评语的文本事实可定位；外表/忠告/代价关联只是编辑解释 | 原文引用与编辑解释须分开建证据；不等同作者全部意图或普遍性别结论 |
| PS-07 | **仅 Tso 具名解释可进入后续限域写作**；既有 1 Source / 1 verified Claim 可用 | Entry 尚未消费；需独立写作授权及后续审校。这一条不能独自充当原篇情节骨架 |
| PS-08 | 两个指定文本的缺文及救治措辞差别可供内部比较 | CText/Giles Source 与公开引用依据未闭合；Giles 实际中文底本未知，不断言删改动机；不重用 Tso 的 Minford 引文 |
| PS-09 | 仅保留现代改编研究线索 | 2008 电影一手时间码、版本与权利仍缺；本批未重查电影，不以学生论文补齐 |
| PS-10 | 可作为内部编辑原则：解释必须具名、分层 | 不能把多个理论读法一起宣称已证实；公开具体读法只采用已定位、已归因子集，目前仅 PS-07 |

**该研究批当时的收口与下一停点**：本批完成用途分层、六页核字、引字差别及十项准备度复核；当时整篇写作仍未就绪，Source/Claim/Terminology/Entry 均未改。最小下一批建议是取得任 2016 / 张 2011 实页，或在另行授权后改走具名、权利闭合的单见证路线。Project owner 后续选择了后一条，当前状态以第 5.10 节为准。

### 5.9 2026-09-05 指定现代版本的实际册页检索快照

Project owner 随后授权继续上一节建议的证据批。本批仍只更新研究账本和必要状态；实际正文、版权页与校记没有取得，不改变第 5.8 节准备度。

| 指定版本与入口 | 本次可核结果 | 证据等级与未决项 |
| --- | --- | --- |
| 任笃行 2016，ISBN `9787020111138`；[豆瓣书目及目录](https://book.douban.com/subject/26906747/) | 页面目录列〈畫皮〉一七四、下一篇〈賈兒〉一八二 | 仅目录转录线索。可从印刷 p.174 开始寻找，不能把 pp.174–181 宣称为已核正文/校记范围；实际首末页与校记归属须看书确认 |
| 同 ISBN 的 [Google Books 记录](https://books.google.com/books/about/聊齋志異.html?id=DgiCnQAACAAJ) | 记录为 Volume 1、人民文学出版社 2016，长度字段 508 页 | 本次返回书目页，没有可核的〈画皮〉页图。册级长度不替代全套页数或篇级 locator；不由自动版次字段裁定印次 |
| [得到电子书详情](https://www.dedao.cn/ebook/detail?id=gO8xJGVarB2qEQoplXvY14JRbVdnz0zM7kwjPmyDANKge8O65LG7Mk9xZYk69Zry) | 页面署出版方人民文学出版社，发行日期 2016-10-01；目录在第一册卷一列〈畫皮〉，并列版权信息、出版说明、辑校凡例；有试读入口 | 仅电子书发现线索，详情未展示版权正文及纸书页码对应。浏览器访问超时，试读范围未验证；没有登录、购买或取得篇内文字，不能写成试读已覆盖或必定不覆盖〈画皮〉 |
| 张友鹤 2011，第 2 版，ISBN `9787532557295`；[新华书店书目](https://item.xhsd.com/items/1010000101276302)、[三民书目](https://www.sanmin.com.tw/product/index/001399509)、[Google Books 记录](https://books.google.com/books/about/聊齋誌異.html?id=2p3QzgEACAAJ) | 新华/三民列 2011、版次 2、1733 页；三民目录将〈畫皮〉置于上册卷一、〈青鳳〉之后〈賈兒〉之前；Google Books 长度字段为 1817 页 | 目录没有〈画皮〉数字起页，实际页码继续留空。长度字段存在差异，不能以多数记录消除差异或推定同一印次；以未来实际版权页和分页为准 |

**下一份最小核查材料**：任 2016 第一册的题名/版权页、相关辑校凡例，以及从候选 p.174 到下一篇〈贾儿〉边界的正文、注释与校记；张 2011 上册的题名/版权页、〈画皮〉目录起页及全篇正文、注释与校记。需同时看清页码和篇名；页数按实际材料确定，不预设每页都是正文。其他年份重印、选本、赵伯陶详注本或未具名网络录文不自动替代已确认路线。

**该检索批当时的引用与自译结论**：在任/张实页缺失的前提下，不从其现代标点、注释、校勘、评语或电子平台内容定稿引句。后续青柯亭单见证路线已为一条公版古文短引与 provisional 自译建立独立依据；任/张本身的引文与版本比较仍未闭合，详见第 5.10 节。

### 5.10 2026-09-05 青柯亭单见证补缺与首稿

Project owner 在前三篇人工双语审核通过后授权补齐 Painted Skin 缺口。现代校勘本的合法实页门禁没有降低；本批改用项目已登记、具名且由 Commons 标为 Public Domain 的上海图书馆 1766 青柯亭本，形成证据受限的单见证首稿。该路线不把青柯亭本声明为作者定本，也不让单一刻本替代未来跨见证比较。

| 缺口 | 本批结果 | 本补缺批结束时边界 |
| --- | --- | --- |
| 任笃行 2016 书目与编辑说明 | [当当授权电子书](https://e.dangdang.com/pc/reader/index.html?id=1900701598)实际核到电子版权页 e-page 2 和完整《輯校凡例》e-pages 56–60；[豆瓣阅读授权版](https://read.douban.com/reader/ebook/45469698/)独立核到出版说明和《輯校凡例》 | 〈畫皮〉在当当目录的 e-pages 215–221、豆瓣目录入口均不在免费试读；纸本 p.174 仍只是目录线索。没有取得正文/注释/校记实页；延期的现代本比较仍未执行，也不属于当前 PS-01 的青柯亭对象身份主张 |
| 张友鹤 2011 指定精装本 | [CiNii `BB06013979`](https://ci.nii.ac.jp/ncid/BB06013979)核定第 2 版、上下两册、ISBN `9787532557295`；四册平装 ISBN `9787532557271` 是分立 manifestation | 未取得题名页、版权页、目录实页、正文、注释或校记；1733/1817 页长度冲突不裁决。合法下一路仍是馆际复制，未购买或联系机构 |
| 具名中文一手见证 | 上海图书馆 `線普長266652-67` 青柯亭本：〈畫皮〉从数字页 72 右半篇题开始，至 75 左半评语结束，同页随后起〈賈兒〉；可见左版心叶码 35–38 | 页 72 篇题前仍属〈青鳳〉，页 75 后半已属〈賈兒〉；所有“本篇未见狐称”判断必须守住这两个边界 |
| `業魅 / 孽魅 / 孽鬼` | 当前青柯亭见证数字页 74 明确作 `業魅`；CText 北大—CADAL 未具名版次见证作 `孽鬼`；Tso p.16 引 `孽魅` 但未注明中文底本 | 正式 Terminology 只记录当前青柯亭见证的 `業魅`，按斥语暂译 `wicked apparition`；不裁定异文源流、正误或固定物种 |
| 自译与短引 | 冻结无标点短引 `鋪人皮於榻上執采筆而繪之`；正文标明 `our provisional translation`，译为 “It spread a human skin on the couch, took up a brush, and painted it.” | 独立 provisional translation Claim 保存中文原文、译者、版本、locator、日期和待审状态；标点由本站补入，不把 `采` 静默规范成 `彩`，也不复制现代标点、注释、校记或译文 |
| 现代译本与影视比较 | PS-08 / PS-09 从当前 MVP 移除 | Minford 精确页、目标地区引用依据、电影一手版本/时间码/字幕均不再阻塞本次单见证草稿；若未来恢复，须作为独立证据批重新进入 |

本补缺批结束时，内容层新增 5 份见证限定的 verified 原典 Claim、1 份 provisional 自译 Claim 与 1 份 `source-checked` Terminology，复用 `source-shanghai-library-qingketing-liaozhai-1766` 和 `source-tso-repressed-sexual-modernity-2017`；Painted Skin 消费 2 Source / 7 Claim / 1 Terminology。Entry 保持 `draft`，不新增中文可见身份、Hero、`relatedEntryIds` 或状态提升。英文正文只呈现拉丁字母转写与英文短译，古文和汉字留在结构化证据与仓库外审核材料中，避免绕过当前公开页字体边界；后续审核结果见第 5.11 节。

本补缺批设定的下一停点是 Painted Skin 人工双语审核：逐段核英文与中文含义对照，重点确认青柯亭 `業魅` 的核字、`yè mèi / wicked apparition` 工作译法、短句自译、妻陈氏求治段的动作顺序、`異史氏曰` 的评语人格与 Tso 归因。该停点已由第 5.11 节记录的后续确认关闭；确认前 Terminology 不得提升为 `bilingual-approved`，Entry 也不得因草稿完成自动提升状态。

### 5.11 2026-09-06 人工双语审核确认

Project owner 在查看包含 20 组中英对照、Claim/Terminology 表和 12 份输入 SHA-256 的 Painted Skin 审核包后，明确回复“画皮人工双语审核通过。”该确认覆盖审核包当时锁定的英文、中文含义对照、`業魅 → yè mèi → wicked apparition`、本站短译、妻陈氏求治段动作顺序、`Yìshǐ shì yuē` 归因与 Tso 归因。

因此 `claim-painted-skin-human-skin-short-translation` 从 `provisional` 提升为 `verified`，`term-ye-mei-in-painted-skin` 从 `source-checked` 提升为 `bilingual-approved`；短译 Claim 的 note 与术语 rationale 记录 Project owner 和确认日期。Painted Skin Entry 继续为 `draft`，`lastFactCheckedAt` 保持 `2026-09-06`；该确认不补 `traditionType`、中文可见身份、Hero、Featured、`relatedEntryIds`，也不替代目标读者、视觉、浏览器、状态、发布候选、`published`、public artifact、部署或发布批准。

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
| FC-04 | 儿子在捕捉逃脱的蟋蟀时将其误伤致死；后来在井中被找到。家人准备草葬时发现尚有微息，半夜复苏后仍神气痴木、奄奄思睡。 | 青柯亭单见证已直接核字；跨见证差异未闭合 | 同一见证数字页 429，左侧可见叶码六；手稿关键叶与校记仍待取得 | 原文未说明他如何进入井中；不写现代医学意义的 death、coma 或 resurrection，也不把这一见证措辞外推到全版本 |
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
6. 已完成：只为 Liaozhai Reading Guide 写入 1 Source / 2 Claim / 1 Terminology 消费关系和证据受限首稿；任/张实际册页仍未取得，Entry 保持 `draft`。
7. 已完成：009 将两个三篇 `Collection.entryIds` 路径接入本地 review，并派生六篇反向合集入口；未新增 Hero、Featured、`relatedEntryIds` 或状态变化。
8. 已完成：Project owner 确认纠偏后的三篇中英对照与术语通过人工双语审核，三份已消费 Terminology 提升为 `bilingual-approved`。
9. 已完成：Painted Skin 改用已核上海图书馆 1766 青柯亭本形成单见证首稿，消费 2 Source / 7 Claim / 1 Terminology；任/张比较、现代译本和影视直接比较移出当前 MVP。
10. 已完成：Project owner 确认 Painted Skin 人工双语审核通过；本站短译 Claim 提升为 `verified`，`業魅` Terminology 提升为 `bilingual-approved`，Entry 保持 `draft`。
11. 已完成：按 [`010-four-entry-reader-review.md`](010-four-entry-reader-review.md) 建立四篇目标读者文稿审核合同，并在仓库外生成当时通过静态技术检查的协调者 Markdown 与唯一参与者 HTML；该修订前 R1 快照现已因正文和模板输入改变而失效并标记为不得分发。
12. 已完成：012 从当前 verified Claim 与权利边界建立五份 Hero-only brief；Project owner 批准候选配对与公开使用权利，Codex 完成 exact-canvas 和委托英文终审，五组 production record、approved/current manifest、repository source 和内容 Hero 绑定已闭合。
13. 当前下一步：owner 已在 VB6 的 6+2 ready 基础上批准全部 published，六篇目标公开日期为 2026-09-10；后续按独立门禁确认 origin 并实施 public assembly。Public Beta 上线后，由 1 位不计入正式样本的目标读者在 live artifact 上执行 R2a，再建立 5–8 份核心全站可用记录与四篇各前 5–8 份可用深读，按预冻结规则补位。任/张实页只在未来恢复现代校勘比较时再成为阻塞。

## 9. 本批最终状态

- 四篇候选的 claim map、正式书目、可取得的精确 locator、术语与不可写边界已完成分层研究；四个 draft owner 均已有证据受限草稿；修订前锁定稿、当前改动单元和两条内容提示均已通过 Project owner 双语确认。012 已为四篇与 Liaozhai Collection 闭合五组 approved/current Hero 和内容绑定；010 修订前 R1 已被当前重建版本取代且不得分发，当前 R1 静态检查通过，非计入试跑和正式真人反馈均为 0。资产级最终视觉已通过，但该结果不表示四篇已通过目标读者、页面级发布候选 QA 或内容状态审核。
- Ten Kings 的 S.3961 对象/IIIF canvas 与 CBETA 行号中，证据闭合的三条对象/文本 Claim、两份 Source 与 `十王` Terminology 已物化；图片复用权利与个别二手页内细节仍须在资产/写作阶段单独核验。
- Liaozhai 导读已消费物化的 Luo 2009 Source、两条归因/计数 Claim 与 `志怪` Terminology 并形成首稿；任 2016 主/张 2011 对校路线虽已确认，实际册页未取得，故两书没有进入 Source，正文也不写成终本、唯一计数或完整传播史。
- Painted Skin 当前按上海图书馆 1766 青柯亭单见证消费既有青柯亭与 Tso 两份 Source、5 条原典 Claim、1 条 `verified` 本站自译 Claim、1 条 Tso 归因 Claim 及 1 份 `bilingual-approved` `業魅` Terminology；青柯亭页 74 核作 `業魅`，Tso 引 `孽魅`，CText 关联的未具名见证作 `孽鬼`，跨见证差异的来源与演变没有解释。任/张实页、现代译本独立核页及电影一手时间码只在未来恢复比较时再处理。
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
- 本批结束时的总 inventory：6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology；published Entry / Collection 仍为 0/0。

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
- 正文不补写当前三条 Claim 未承担的故事连接段，也不把小说叙事概括为历史税制；儿子在捕捉逃脱蟋蟀时将其误伤致死，后来在井中被找到，家人准备草葬时发现尚有微息。正文不补原文未说明的入井方式，也不写死亡、复活或现代医学诊断；`身化` 仅译为 `took the form of`，不推导灵魂、轮回或跨见证结论。

### 12.2 Source 可见记录最小例外

首次完整检查先因 opening 的 plain scalar 含冒号而触发 YAML 解析错误，改用既有合同允许的 folded scalar。随后 output verifier 正确拦截既有 Source `editionBasisOrObjectId` 中在英语页面可见的 `線` 字。Project owner 因此另行授权只做最小 Source 修正：

- 可见记录改为 `Shanghai Library record 266652-67`；
- 精确馆藏号 `線普長266652-67` 原样保存在 Source notes；
- 不修改 Source 身份、URL、版次、locator、权利事实、Claim、Terminology、Schema、模板、字符集、字体文件、manifest 或字体哈希。

### 12.3 验证与停点

- 最终完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批结束时的总 inventory 为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published Entry / Collection 仍为 0/0。Ten Kings 与 Fighting Cricket 分别形成 2/3/1 与 1/3/1 的消费关系及首稿；Liaozhai Reading Guide 与 Painted Skin 仍为空 draft。
- 当前英语 draft 只消费 Terminology 的 chosen English；`Cùzhī / 促织` 与 `shēn huà (身化)` 的可见首见格式仍待 bilingual-approved 与 CJK 字符门禁，不因本次反向消费而视为通过。
- 未运行 dev/preview/browser 或非默认 `visual:build:check`；未处理图片、关系、状态、外部服务、public artifact、部署或发布。Project owner 通过中文概要确认内容符合预期并另行授权本地提交，本批随该检查点进入当前 HEAD；`main` 相对未 fetch 的本地 `origin/main` ahead 3，未 fetch 或 push。

## 13. 2026-09-04 Liaozhai Reading Guide 证据受限内容纵切片

### 13.1 授权与证据消费

Project owner 授权只为 `liaozhai-reading-guide` 编写证据受限英语首稿并同步必要状态，只消费既有 1 Source / 2 Claim / 1 Terminology，保持 `draft`；不新增或修改证据对象，不把任笃行 2016、张友鹤 2011 写成已核来源，不处理图片、不建 Collection/related 关系、不改状态、不扩 CJK 字体、不接外部服务、不做 Git 写入。

- `sourceIds` 只含 `source-luo-ghost-of-liaozhai-2009`；`claimIds` 只含 `claim-liaozhai-compilation-period-in-luo` 与 `claim-liaozhai-counts-vary-by-edition`；`terminologyRecordIds` 只含 `term-zhiguai-in-liaozhai-reading-guide`。
- Entry 形成两段 opening、96 词 summary 与 “Begin with a range, not a finish date”“Ask what the number counts”“Keep zhiguai bounded”“What this draft does not settle” 四节英语正文；`lastFactCheckedAt` 为 `2026-09-04`，`status` 保持 `draft`。

### 13.2 事实与语言边界

- 正文把约 1670–1700 的编纂范围和作品主体最早至 1679 年已形成的判断明确归因给 Luo；“不能据此为每篇给出最终完成日”保留为本站证据边界，不并入 Luo 的直接主张。
- Luo print p.160 / PDF frame 165 所报为赵起杲十六卷本 431 tales，以及张友鹤三会本十二卷加一附录 491 tales；两项均以 tales 为单位。正文只把它们作为 Luo 所报的版次特定计数，不据此断言计数单位不同，也不移称为已亲核张 2011 版。
- `zhiguai` 只按既有 `source-checked` Terminology 作为 working English term，并限义为 accounts or records of anomalies；不把 horror、ghost stories 或 mythology 写成精确同义词。
- 当前可见 Entry 只使用 ASCII `Liaozhai`、`Qingketing`、`juan` 与 `zhiguai`。`志怪` 和 `zhìguài` 仍只存在于既有内部 Terminology 记录；没有扩展 CJK 字符集、字体文件、manifest 或字体哈希。
- 任 2016 / 张 2011 的实际册页与篇级 locator 仍未取得，两书仍未进入 Source。正文不据目录记录宣称终本，不重建完整手稿/刻本传播史，不为单篇定年，也不比较英译。

### 13.3 验证与停点

- 固定 Node/Corepack 的完整 `pnpm run check` 第一次在任何断言失败前因 Vitest worker 意外退出而中断；没有修改文件或降低门禁，原命令重跑后通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier。输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批结束时的总 inventory 为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published Entry / Collection 仍为 0/0。Ten Kings、Fighting Cricket 与 Liaozhai Reading Guide 分别形成 2/3/1、1/3/1 与 1/2/1 的消费关系及首稿；只有 Painted Skin 仍为空 draft。
- 未运行 dev/preview/browser 或非默认 `visual:build:check`；未新增或修改证据对象，未处理图片、Collection/related 关系、状态、外部服务、public artifact、部署或发布。上一检查点 `7c0cb3f` 已由 Project owner 推送；本批开始时 HEAD、`main` 与本地 `origin/main` tracking ref 对齐。Project owner 于 2026-09-05 通过中文概要确认内容符合预期并单独授权验证通过后本地提交；本纵切片与必要状态同步随后进入 `119c01c`，Project owner 又确认已 push；2026-09-05 Painted Skin 研究批的独立服务器核验与本地 SHA 一致，见 DEV_WORKFLOW 的对应记录。代理未执行 fetch 或 push。

## 14. 2026-09-05 三篇首稿的 AI 编辑复核

### 14.1 范围与证据层级

Project owner 在整体进度与后续计划说明后授权按计划继续。本批先推进已有十王、促织、聊斋导读首稿的编辑修订，只对照仓库内既有 Source、verified Claim、source-checked Terminology 和此前核页记录；没有新增原典下载或逐页复核。正文仍沿用原有事实范围，不将本轮措辞修订登记为新的事实核查日期、人工双语批准或状态提升。

修改只涉及三个 Entry 的 opening、summary、正文与十王 subtitle，以及 README、本文件和 DEV_WORKFLOW 的必要记录；Painted Skin、证据对象、稳定 ID、关系、视觉资产、字体、Schema、外部服务与发布不在本批内。原有 Painted Skin 四份文档修改继续保留。

### 14.2 修订结果

| Entry | 读者层修订 | 证据与术语核对 |
| --- | --- | --- |
| ten-kings | 以账簿、秤、镜切入；将数字图像与另一文本分别说明；删除双语审核流程等内部文案，合并重复排除项；摘要 95 词 | 仍只消费 2 Source / 3 Claim / 1 Terminology；正文补 CBETA 0409b14–0409c22、0408b23–0408c07、0409b23–0409c04；保留 Ten Kings、非普遍日程和非 S.3961 录文边界，不补历史仪式使用、形成史或 rebirth |
| fighting-cricket | 使用既有 Claim 中的 Chengming，开场保留悬念；以需求、救起、后述三处为细读对象，明确不是完整复述；摘要 101 词 | 仍只消费 1 Source / 3 Claim / 1 Terminology；就近标数字页 427–428、429、431；保留 still breathing、more than a year、took the form of，不补死亡、离魂教义、跨版本或首次增写结论 |
| liaozhai-reading-guide | 按日期、计数、文类组织读者问题；删除项目底本尚待核等内部流程段落；摘要 96 词 | 仍只消费 1 Source / 2 Claim / 1 Terminology；恢复既有 Claim 的 Zhang Youhe 具名编排归属，就近标 Luo print pp.154、160、157–161；不把 2009 论文的编排计数移称为亲核张 2011 版，保留 zhiguai 的语境限定 |

### 14.3 人工待核与停止条件

本轮完成 AI 英文编辑与已有证据的一致性核对，不能替代母语/目标读者或古汉语专家审校。三篇仍为 draft；三条术语仍为 source-checked，中文首见与拼音显示继续等待人工批准及适用字体门禁。lastFactCheckedAt 仍为 2026-09-04，Source accessedAt 未改。

人工审核重点：十王的 postmortem judges、karma ledger/scale/mirror 与日程表达；促织的 dazed、feeble、took the form of 与叙述时间；导读的 items/juan、Zhang Youhe 编排限定和 zhiguai。审核人需基于现有来源确认语言和含义，不把对中文概要的认可自动写成全部英文与文化审校通过。

本轮当时没有发现必须新增 Claim 才能保留的事实句；后续逐字复核发现三组既有 Claim 表述需要纠偏，见第 14.5 节。编辑性阅读提示不升级为史实。三篇仍是证据受限稿，不能据文字顺畅宣称完成全部故事、合集或发布验收。009 随后完成第二 Collection 的本地接线；图片与状态仍是后续独立工作。

### 14.4 验证与版本状态

完整本地检查通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。自动比较三个 Entry 与 HEAD 的 frontmatter，确认除 opening、summary、十王 subtitle 外的元数据均未改；三篇摘要均为 80–120 词。

没有业务代码改动，新的资产披露、构建诊断实现及职责注释不适用；既有引用链和输出诊断通过完整检查。没有新增镜像实现的测试，没有启动 dev/preview、运行浏览器或执行键盘、缩放、跨平台、人工视觉验证。当前修改未提交、未推送、未发布，不形成可部署 public artifact。

### 14.5 2026-09-05 后续证据纠偏

后续逐字复核发现，第 14.2–14.3 节记录的 AI 编辑检查遗漏了三组证据表述问题：Ten Kings 将生前预修段的修名、纳状和记名在案概括为 `petitions and case records`，并与后段业簿、业秤和业镜合并为同一审判动作；Fighting Cricket 将捕捉时误伤写成 `crushes`、把后来在井中被找到写成原文未明说的 `falls into a well`，并压缩了准备草葬时发现微息与半夜复苏的顺序；Liaozhai Reading Guide 将 `an appendix` 写成复数，并用同一来源没有证明的 counting-unit 变化解释 431/491。Luo 的 1679 判断方向有来源支持，但须改为其原文所述“作品主体最早至 1679 年已形成”，并把“不能为每篇指定最终完成日”单列为本站证据边界。

本次纠偏同步修正对应 Claim、Entry、术语语境与来源用途，不新增 Source、Claim、Terminology 或稳定 ID，也不改变 `draft`、`source-checked`、published 0/0 或其他门禁。三篇人工审核材料须从纠正后的内容重新生成；此前审核包不得作为英文与证据一致性已经通过的依据。

纠偏与关系校验加固后的固定 Node/Corepack 完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/351 项测试、Astro 81 个文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。三篇摘要为 110/104/100 词。新的 parse5 回归测试从唯一显式关系合同派生 Collection/Entry 身份映射，以独立 `outputPath`/`href` 验证两个合集顺序、六篇反向入口、列表项语义及 DOM 唯一性，并证明内部 ID 与公开 slug 不同仍可正确校验；没有修改 Schema、页面模板、图片或状态。

### 14.6 2026-09-05 人工双语审核确认

Project owner 在查看纠偏后审核材料后明确确认人工双语审核通过。该确认适用于 Ten Kings、Fighting Cricket 与 Liaozhai Reading Guide 审核包当时锁定的英文、中文含义对照和术语选择，不覆盖 010 的后续文案修订；三份 Terminology 的 `reviewStatus` 因此由 `source-checked` 提升为 `bilingual-approved`。

三篇 Entry 继续为 `draft`，`lastFactCheckedAt` 保持 `2026-09-04`。这次确认不替代目标读者、视觉、浏览器、发布候选或 `published` 决定，也不覆盖未进入本轮审核的 Painted Skin。该确认时点的 Painted Skin 仍保留任笃行 2016 实页、张友鹤 2011 实页、`孽鬼/孽魅` 异文、自译/短引方案，以及可选现代译本/影视比较证据五项缺口；后续单见证补缺与当前取舍见第 5.10 节。

### 14.7 2026-09-06 AI 专业审读后的四篇聚焦修订

Project owner 说明当前没有合适的独立目标读者，并要求 AI 先专业审读、随后修正文案。该审读不进入 010 的 R2a/R2b 样本或通过率，也不生成虚构的首读时间、答卷或真人结论。四篇均只在既有 Source/Claim/Terminology 边界内调整标题、opening、summary 与正文表达；Source、Claim、Terminology、稳定 ID、slug、合集成员/顺序、事实核查日期和状态均未改。

- Ten Kings 把标题收窄为两份来源，降低编号和文本学术语密度，并继续分开卷轴图像、独立文本中的仪式日程及审判语言。
- Fighting Cricket 补足《聊斋》与成名家庭入口、减少重复；二次审读把内容提示收窄为儿童后来在井中被发现及备葬前察觉微息，并删除捕捉直接导致入井的因果暗示。
- Liaozhai Guide 把范围限于日期、版本和文类，移除 `juan` / `sanhuiben` 等首读负担，并把篇数问题精确写为“属于哪个版本”，不再暗示计数单位不同。
- Painted Skin 明确为 1766 青柯亭单一文本细读，简化见证/Tso/Giles 与内部项目措辞；Tso 段继续使用已核 Claim 的 `imitative structures of gender`，结尾不把二手报告写成本站独立比较。

按 010 已建立 required nullable `contentNote`：六篇 Entry 均显式迁移，只有 Fighting Cricket 与 Painted Skin 非空；模板在署名之后、Opening 之前渲染具名、可见且非警报式 `aside`。匹配 Schema、模板、fixture、单元测试和真实 build output oracle 已同步；固定运行时完整检查通过 25 文件/369 测试、Astro 81 文件零诊断、14 页输出、42 Hero、10 WOFF2、零 XML 与零客户端 JavaScript，四篇 summary 分别为 104/109/107/96 词。Project owner 随后确认仓库外聚焦中英差异包；修订前 R1 已被当前重建版本取代且不得分发。当前 R1 已从当前 build 重生成并通过静态检查；独立读者可用后再进入非计入试跑和正式反馈，真人反馈当前仍为 0。

### 14.8 2026-09-06 聚焦双语确认与当前 R1 重建

Project owner 明确回复“`四篇聚焦双语复核通过。`”。确认范围为聚焦差异包中的四篇当前英语改动单元、对应中文含义和两条 `contentNote`，并同意以当前文本重生成目标读者 R1。未改单元继续沿用历史批准；Source、Claim、Terminology、稳定 ID、slug、合集成员/顺序、事实核查日期、资产与 Entry/Collection 状态均未改，四篇继续为 `draft`。该确认不计作目标读者样本或答卷，也不产生目标读者验证结论；视觉、状态、public artifact 与发布仍按各自门禁独立推进。

当前协调者 Markdown 与冻结 R1 HTML 已从当前 build 重生成，SHA-256 分别为 `3cb9de871bcd46d5b29b85fb3ebf11df14c397457ab787a7bd03331d7a714adb` 与 `22e8139439b374284c98c033e0a0318f558a5c93f86b206818811b89569586c7`。20/20 冻结输入哈希、4 篇当前可见文本、Sources `2/1/1/2`、2 条内容提示、4 个首读停点、8 个默认关闭折叠区、94 个答题区、唯一 ID/ARIA/片段引用、离线性与严格 UTF-8 检查通过；旧标题、旧问题与失效状态均已移除。制品内遗留结果为 `R1 READY FOR NON-SAMPLE PILOT — PENDING HUMAN READERS`；011 生效后它已退役为 reference-only，不得执行 live R2。R2a/R2b 未开始，真人反馈仍为 0。
