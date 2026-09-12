# 012 Hero 资产闭环、阅读关系与内容就绪审核：开发与验收说明

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

## 0. 文档职责与状态

本文冻结 `ten-kings`、`liaozhai-reading-guide`、`painted-skin`、`fighting-cricket` 四篇 Entry 与 `liaozhai` Collection 的五份 Hero-only visual brief，并记录从候选生产、Project owner 选图与公开使用授权到 exact-canvas master、production record、approved/current manifest、repository source 和内容绑定的完整闭环。Project owner 因英文阅读不便委托 Codex 审核英文文案；记录区分 Project owner 的候选/权利确认与 Codex 的成品视觉、文化、无障碍和语言终审。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | VB1–VB6 及后续首发 published 决定已授权 | 候选/权利与 VB6 ready 审核批准保持；Project owner 随后确认全部六篇文章及两个合集进入 published，六篇目标公开日期统一为 2026-09-10；只授权本地内容、匹配接线、文档与验证 |
| 实施状态 | 五组 Hero、VB6 ready 审核及首发 published 本地变更已完成 | 当前为 6 published Entry / 2 published Collection，六篇 publishedAt 为 2026-09-10；分类、两环、Featured、正文与资产保持；索引为真实 6/2 列表，六篇各展示一个 Related |
| 审批状态 | Brief、候选、publication rights 与五审均已闭合 | 候选/权利由 `Project owner (user-confirmed)` 确认；exact-canvas 视觉与文化终审由 Project owner 选图加 Codex 成品复核完成；英文无障碍与语言文案由 Codex 按 Project owner 委托审核 |
| 验证状态 | 首发 published 定向与完整本地门禁通过 | 定向 7 文件/210 测试、完整 25 文件/401 测试、14 页 noindex 输出通过；当前结果见第 6.4 节，VB6 与 VB1–VB5 历史证据分别见第 6.3、7 节 |
| 发布状态 | 编辑批准为 published；网站未上线，修改未提交 | 五组 Hero 已进入 `1be085b`；VB6 与首发状态变更仍是未提交本地修改；没有 public artifact、服务、Git 写入、远端预览或部署 |

- 当前权威结论更新时间：2026-09-07。
- VB1–VB5 历史实施基线：`96da8db52cc384e0dc77164288d3bce16383faf0`；开始时 HEAD、`main` 与本地 `origin/main` tracking ref 对齐且工作树干净。该批未 fetch，tracking ref 不单独证明服务器端状态。
- VB6 基线：2026-09-07 只读复核确认五组 Hero 已提交为 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`，HEAD、`main` 与本地 `origin/main` 一致，工作树干净；未 fetch 或查询服务器，不把 tracking ref 当作当前远端证明。所有操作直接在保存项目中执行。

## 1. 目标、不做与成功标准

### 1.1 目标

- 为五个 owner 各建立一份可直接人工审核的 `version: 1`、`purpose: hero-primary` brief。
- 每份 brief 都把事实性视觉元素绑定到当前 verified Claim，把编辑推断和原创造型分别写入 `inferred` 与 `invented`。
- 为 desktop 与 mobile 冻结独立构图、文字安全区、焦点、响应式输出合同和禁止母题。
- 把参考对象的权利状态与使用限制写入 brief；研究参考不自动成为生成输入或站点资产。

### 1.2 VB1–VB2 Brief 批不做

- 不生成、下载、上传、编辑或挑选任何图片，不调用 ImageGen、ComfyUI 或其他生产工具。
- 不建立 production record、manifest、repository source、master 或响应式图片产物。
- 不修改 `heroAssetId`、`relatedEntryIds`、Liaozhai `featuredEntryId`、Entry/Collection 状态或发布时间。
- 不执行外部服务、真实写接口、Git commit/push、预览或生产发布。
- 不把同一套画面复制给五个 owner，也不扩展 Lead、OG 或 Social 槽位。

### 1.3 可观察成功标准

1. 仓库存在以下五份与声明 ID 同名的 YAML：
   - `brief-ten-kings-hero-primary-v1`
   - `brief-liaozhai-reading-guide-hero-primary-v1`
   - `brief-painted-skin-hero-primary-v1`
   - `brief-fighting-cricket-hero-primary-v1`
   - `brief-liaozhai-hero-primary-v1`
2. 五份均为 `status: approved`，且保存相同的真实委托批准身份与 UTC 时间。
3. 每份只声明 `hero/primary`；desktop 为 3200×1800，mobile 为 1600×2000，二者独立构图并禁止放大。
4. responsive build plan 只输出 AVIF/WebP；desktop 宽度为 640/960/1440/1920，mobile 为 640/960/1440。
5. Entry brief 的 verified Claim 只属于自身；Collection brief 只消费三个当前成员 Entry 的 verified Claim。
6. 所有 reference rights 已分类且没有 `unknown`；`research-only` 明确禁止复制、上传和衍生使用。
7. 既有 Schema、视觉资产图与精确 repository inventory 测试通过，完整 `pnpm run check` 通过。

### 1.4 2026-09-07 VB3–VB5 后续授权范围

- **方法与工具**：只使用当前 Codex 任务内置 ImageGen，方法为 `ai-assisted`；不使用 CLI/API Key、ComfyUI、外部模型、插件或新依赖。工具回执没有暴露 model ID 或 seed，不作推断。
- **账户与条款**：候选由当前 Codex 任务的登录账户执行。Project owner 于 `2026-09-07T05:34:08Z` 确认当前账户由其合法管理，可以是个人账户或已获组织授权的账户，并授权把本批项目生成图保存、编辑和用于 Mythic China 公开发布；记录不推断具体账户类型，也不扩张为排他性、自动可版权性、绝对不侵权或生产链外第三方权利已清除的声明。
- **输入权利**：初始候选全部为文字生成。S.3961、青柯亭扫描、现代研究文章、馆藏图像和其他第三方图片均未下载、复制、描摹或上传。唯一一次图像编辑只把本批项目生成的 Reading Guide desktop candidate 03 作为 edit target，以恢复顶部安全区。
- **候选数量**：每个 owner 先生成一组独立 desktop/mobile；Codex 只对违反 brief 的方向追加定向候选。最终 local explore 保存 22 张候选，并从中提出 10 张组成五个响应式配对；没有把 desktop 机械裁成 mobile。
- **本地路径**：候选、原始输出副本与审校板保存在 Git-ignored `/.local/visual-production/explore/five-hero-v1-review/`；10 个 lossless exact-canvas PNG master 保存在 `/.local/visual-production/masters/{ownerId}/v1/`。这些是项目本机生产记录，不冒充独立备份。
- **处理与退出**：10 个获选 raw output 均先按记录 SHA-256 校验，再用 Sharp 0.35.4、centered fit-cover 与 Lanczos3 重建为 3200×1800 / 1600×2000；边缘裁切不足 1 个输出像素、无非等比拉伸。仓库 WebP 保持同画布并使用 quality 90。没有切换 CLI、模型、第三方输入或新增依赖。

## 2. 五份 Brief 的身份与叙事职责

| Owner | Brief | 核心画面命题 | 主要证据 |
| --- | --- | --- | --- |
| Ten Kings Entry | `brief-ten-kings-hero-primary-v1` | 用连续卷轴节奏、十个无编号停顿与分层记录器具表现仪式时间和审判记录；不画万能地狱地图 | S.3961 对象、十个时间节点、呈状/名案与业簿/业秤/业镜 |
| Liaozhai Reading Guide Entry | `brief-liaozhai-reading-guide-hero-primary-v1` | 用两组规模不同的无字书页和分叉阅读路径表现版本意识；不暗示唯一标准本 | 编纂时期与不同版本篇数 |
| Painted Skin Entry | `brief-painted-skin-hero-primary-v1` | 从窗外偏轴观看未完成的可穿戴外表、笔与被遮挡的不明存在；保持克制且非血腥 | 预警、窗见绘皮与本见证不称狐 |
| Fighting Cricket Entry | `brief-fighting-cricket-hero-primary-v1` | 以极小蟋蟀和层层收窄的门槛表现权力压力进入家庭；井沿只作次要暗示 | 宫廷需求、井中发现与儿子后来自述化虫 |
| Liaozhai Collection | `brief-liaozhai-hero-primary-v1` | 以烟绿夜读空间串起无字页、悬垂薄层和小蟋蟀三种不等深度；保持一个整体世界 | 三个成员各一组 verified Claim |

## 3. 共同技术合同

- owner 身份、brief ID、purpose 和 version 必须按 [`002-visual-asset-pipeline.md`](002-visual-asset-pipeline.md) 的既有 Schema 派生规则建立。
- 每份只有一个 `targetSlots` 项：`role: hero`、`slotId: primary`、必需 usage 为 `hero-desktop` 与 `hero-mobile`，无 optional usage。
- desktop 左侧约 42% 与顶部约 16% 保持低细节；mobile 顶部约 22–24% 与底部约 10–12% 不放关键主体。最终 HTML 标题、pinyin、caption、credit 与披露不得烘焙进图片。
- 五份采用共同的现代中性编辑系统，但保持独立主叙事。Liaozhai 四份可共享烟绿、炭黑、暖中性纸白和局部暖光；这些是编辑色彩，不是历史颜料主张。
- 五组 Hero 均按 informative 资产处理；manifest 只选择成品中可见且可追溯的 visual element，并保存已审核的 alt、caption、credit、AI disclosure 与文化、权利、视觉、无障碍、语言五类结论。

## 4. 证据与权利边界

### 4.1 Ten Kings

- 主参考族是 British Library / International Dunhuang Programme 的 S.3961 十王经图文写卷，只研究连续图文节奏和对象语境。
- S.3961 的图像权利在当前合同中为 `research-only`。对象不得下载、复制、描摹、上传到生成工具或作为图生图输入；brief 只能从已验证 Claim 抽取抽象结构。
- S.3961 与 CBETA `X01n0021_001` 是不同见证。十个仪式节点与记录器具来自 CBETA，不得画成 S.3961 图像内容或二者的共同原文。

### 4.2 Liaozhai 四份 Brief

- 共同书物参考是上海图书馆所藏 1766 青柯亭本的 Commons 公版扫描对象；只研究书页密度、栏列节奏和版面间距。无字页与大面积留白是本项目的原创编辑抽象，不归给历史刻本。
- Public Domain Mark 只闭合该扫描对象的参考权利分类。本批不把扫描页加入项目 Asset，不直接复制页面、文字、折痕、版框或印章，也不把它上传为图生图输入。
- Luo 2009 与 Tso 2017 只通过现有 verified Claim 支撑事实或具名解释；两者不列入 `referenceAssets`，也不从 citation-only 文献推导图像复用许可。
- Painted Skin 与 Fighting Cricket 继续绑定青柯亭单见证范围；不得把版本内叙述写成普遍民俗、历史制度或唯一解释。

## 5. 视觉边界

- 不使用伪汉字、假书法、虚构经文、符箓、印章、水印、Logo、游戏 HUD 或受保护娱乐角色造型。
- 不把中国宗教、文学与民俗压成单一鬼怪宇宙，不混用无来源的时代、地域或宗教元素。
- Ten Kings 不以酷刑、血腥或一位万能阎王制造奇观；Painted Skin 不用狐女、情色化身体或剥皮/取心 gore；Fighting Cricket 不展示儿童尸体、坠井、复活、灵魂离体或斗兽奇观。
- Liaozhai Collection 不做三张等宽角色卡、泛恐怖拼贴、满幅泛黄古籍 UI，也不让 Painted Skin 独占合集识别。

### 5.1 2026-09-07 委托审核结论

Project owner 说明英文阅读不便，并明确要求 Codex 代为审核后确认。Codex 以当前 Source/Claim/Terminology、视觉 Schema、权利记录与本文边界为准逐份检查；此前三路独立只读终审和完整机器验证作为辅助证据，不替代本次实际判断。审核结论如下：

1. **事实映射通过**：五份 brief 共使用 11 条不重复的 verified Claim；Collection 复用三个成员 Claim。所有 verified statement 只陈述来源事实，视觉几何、色彩、空间和造型均留在 inferred/invented。
2. **权利边界通过**：Ten Kings 的 IDP 对象继续为 `research-only`，禁止下载、复制、描摹和上传；青柯亭 Commons 对象虽标 Public Domain Mark，仍只作版面节奏参考，不自动进入项目 Asset 或图生图输入。
3. **文化与敏感内容通过**：Ten Kings 不建立万能地狱地图；Guide 不制造唯一版本；Painted Skin 不定性为狐、不情色化或血腥化；Fighting Cricket 不表现儿童伤害、死亡复活或灵魂离体；Collection 不把聊斋压成泛恐怖拼贴。
4. **差异化通过**：五个主轮廓分别为时间序列、版本分叉、窗隙观察、收窄压力路径和偏轴大暗口。Collection 另保留 640px 灰度、无标题时仍须与 Guide 可区分的生产验收项。
5. **响应式合同通过**：五份均为 Hero-only；desktop/mobile 独立构图、安全区、焦点、AVIF/WebP 宽度和禁止放大均符合现有 Schema。

据此，Codex 按 Project owner 的明确委托确认五份方向通过，并将批准身份如实记录为 `Project owner (user-delegated AI review)`。批准只覆盖 brief 合同，不代表 Project owner 已查看英文原文，也不批准生产工具、输入上传、候选图、最终图片、manifest、内容绑定、状态提升或公开使用。

### 5.2 最终资产审核结论

- Project owner 于 `2026-09-07T05:34:08Z` 明确确认第 6.1 节五组配对全部通过，并确认当前账户由其合法管理或已获组织授权，授权把本批项目生成图保存、编辑并用于 Mythic China 公开发布；该确认不被改写为 Project owner 阅读过英文 manifest 文案。输入来源与处理链由 production record 另行证明：九张成图来自纯文字输入，Reading Guide desktop 修正版只使用同批项目生成图作为 edit target，没有第三方图片输入。
- exact-canvas 处理于 `2026-09-07T05:41:57Z` 完成。Codex 于 `2026-09-07T05:50:01Z` 对 10 张最终画布做全画面、原分辨率细节、响应式配对及 Guide/Collection 640px 灰度差异复核；未见文字、伪文字、Logo、水印、禁用母题、明显破损几何或编码缺陷。
- Codex 按 Project owner 的既有英文审核委托完成 5 组 alt、caption、credit 和 AI disclosure 审核。文化与视觉 reviewer 如实记录为 `Project owner (candidate selection) + Codex (exact-canvas final review)`；无障碍与语言 reviewer 记录为 `Codex (Project-owner-delegated English review)`。
- 四篇 Entry 的桌面主焦点均在画面右侧；接线时发现旧模板把 identity 固定在右侧，遂按 approved desktop `focalPoint` 把 HTML identity 放到主焦点对侧。现有左侧主焦点 Entry 保持右侧 identity；移动端仍为标题在图上方。

## 6. 实施与审批顺序

1. **VB1 合同与 brief**：建立本文、五份初始 `in-review` YAML、精确 inventory 与当前状态同步。状态：已完成并通过本批验证。
2. **VB2 Project owner 委托审核**：Project owner 委托 Codex 审核英文，Codex 逐份检查后确认方向，并以真实委托身份和 UTC 时间把五份改为 `approved`。状态：已完成。
3. **VB3 生产授权**：确认候选方法、工具、数量、local explore 与退出边界。状态：已完成。实际采用的纯文字输入及同批项目生成图 edit target 由 production record 在生产后记录证明，不归因为 Project owner 事前确认输入链。
4. **VB4 候选与五审**：按 approved brief 生产 22 张候选，Codex 预筛后由 Project owner 批准五组配对并确认 publication rights，再由 Codex 完成 exact-canvas 与委托英文终审。状态：已完成。
5. **VB5 资产闭环**：建立 10 个 exact-canvas master、5 份 production record、5 份 approved/current manifest、10 份 repository source、响应式构建合同、registry、输出 oracle 与 5 个内容绑定。状态：已完成。
6. **VB6 关系与状态审核**：审核全部六篇关系、四篇分类、Liaozhai Featured 与八个内容包，先到 `ready`。状态：本地实施与验证已完成；合同与逐项结果见第 6.2 节，验证结果见第 6.3 节。

任何一步的授权都不自动传递到下一步。brief 的人工批准只批准视觉生产合同，不批准某张图片、工具条款、发布权利、内容状态或公开使用。

### 6.1 Project owner 批准的最终候选

| Owner | Desktop | Mobile | 最终结论 |
| --- | --- | --- | --- |
| Ten Kings Entry | `desktop-candidate-02` | `mobile-candidate-03` | 7＋3 无编号节奏、记录层与抽象平衡/反射层成立；无具名王、地图、刑罚、经文或灯具 |
| Liaozhai Reading Guide Entry | `desktop-candidate-04` | `mobile-candidate-01` | 两个不等页组和分叉阅读路径成立；没有定本、年份、文字、角色或古籍界面 |
| Painted Skin Entry | `desktop-candidate-01` | `mobile-candidate-01` | 窄窗外视点、与隐藏存在相连的画笔及克制薄层成立；无狐化、情色化、血腥或后段救治 |
| Fighting Cricket Entry | `desktop-candidate-02` | `mobile-candidate-02` | 小蟋蟀、收窄压力路径和分离圆环成立；无儿童、斗虫、官员、历史建筑或变身效果 |
| Liaozhai Collection | `desktop-candidate-03` | `mobile-candidate-03` | 偏轴非矩形暗口与单一路径成立；页、笔/薄层、蟋蟀保持不等深度且不成为三张卡片 |

Project owner 已接受上述五组配对。exact-canvas 后复核未见文字、伪文字、Logo、水印、禁用角色、明显破损主体或响应式主轮廓混淆；Reading Guide 与 Liaozhai Collection 的 640px 灰度、无标题对比仍可分别凭“双分叉页组”和“偏轴暗口＋连续路径”辨认。逐资产公开文案、权利和五审结论保存在对应 manifest，实际提示词、接收时间、输入图 hash、raw/master tuple 与处理记录保存在对应 production record。

### 6.2 VB6 内容合同与逐项审核

目标是闭合内容包门禁，不进入 `published`。不新增 Source/Claim/术语对象、不扩写正文、不产生视觉资产、不改 Schema、依赖或配置，不执行服务、真实接线、public artifact、Vercel、Git 写入或发布。

编辑选择：阴间 `chinese-underworld-guide` → `ten-kings` → `zhong-kui` → Guide；聊斋 `liaozhai-reading-guide` → `painted-skin` → `fighting-cricket` → Guide。每篇只保存一个明确的 `relatedEntryIds`，不由 Collection 自动推导。两条环是阅读建议，不表示历史身份、文本源流或共享证据。既有合集三篇顺序与 Zhong Kui Featured 保持；Liaozhai 采用 Painted Skin Featured，让故事入口与导读优先的阅读顺序分开，内容提示仍在该篇开场之前。

四篇分类依据当前证据范围：Ten Kings 的文本、仪式与审判语境归 `religion`；Liaozhai Guide 的文学编纂/版本问题及两个具名作品细读归 `literature`。它们不被归为普遍民俗或历史制度。已有 Zhong Kui `historical-legend` 与 Underworld Guide `religion` 保持。

| 对象 | 证据与编辑审核 | 关系、资产与状态结论 |
| --- | --- | --- |
| Chinese Underworld Guide | 既有 004 编辑/术语批准；4 Source / 4 verified Claim / 1 bilingual-approved 术语；补入仓库已有 CMA 来源并给末段 museum records 加近引，英文含义不变 | Related Ten Kings；自有 approved/current Hero；ready |
| Ten Kings | 2 Source / 3 verified Claim / 1 bilingual-approved 术语；008 纠偏与 010 聚焦双语确认；两见证保持分开 | religion；Related Zhong Kui；自有 approved/current Hero；ready |
| Zhong Kui | 6 Source / 6 verified Claim / 1 bilingual-approved 术语；004 既有接受；历史传奇与可证历史仍分开 | Related Guide 保持；Hero v2 current、v1 非 current；ready |
| Liaozhai Reading Guide | 1 Source / 2 verified Claim / 1 bilingual-approved 术语；008/010 既有双语确认；Luo 归因与版本限制保持 | literature；Related Painted Skin；自有 approved/current Hero；ready |
| Painted Skin | 2 Source / 7 verified Claim / 1 bilingual-approved 术语；青柯亭单见证、自译和 Tso 具名解释分开；008/010 批准与内容提示保持 | literature；Related Fighting Cricket；自有 approved/current Hero；ready |
| Fighting Cricket | 1 Source / 3 verified Claim / 1 bilingual-approved 术语；008/010 批准与内容提示保持；不增写死亡、复活或医学判断 | literature；Related Liaozhai Guide；自有 approved/current Hero；ready |
| Chinese Underworld Collection | 004 既有接受；本批复核范围说明、顺序与 Featured 没有混淆宗教身份 | 三个成员均 ready；Featured Zhong Kui；自有 approved/current Hero；ready |
| Liaozhai Collection | Codex 本批编辑复核现有英文标题/description：准确说明导读、两篇故事与文本/解释边界，无新增文化事实；不记为新的 owner 逐字批准 | 三个成员均 ready；Featured Painted Skin；自有 approved/current Hero；ready |

主代理在既有批准记录与两路独立只读审查基础上逐项判断。六份术语均 `bilingual-approved`，25 份 Claim 均 `verified`，已用中文 Source 标题无 generic `zh`，完整书目覆盖所消费 Claim/术语。人工批准只引用原有记录；Codex 本批状态审核不冒充新增人工双语或视觉批准。所有 `lastFactCheckedAt` 保留原日期，`publishedAt` / `updatedAt` 保持 `null`。

保留 003 的 published-only Related 输出合同：当前八个内容包仅为 ready，六篇 review 页不渲染 Related，阅读环作为编辑数据被匹配测试锁定。原有 Collection 正向路径与 Entry 反向入口继续可用；Featured 由原模板消费。Explore/Collections 的提示改成阶段中性的 local review / Not published，固定候选架范围和发布空态不变。

实际修改：八个内容文件；Explore/Collections 两页仅改内部 review 提示；`review-output-policy.mjs` 与 `verify-m4-u2-output.mjs` 锁定 Painted Skin Featured 的唯一结构、标题与精确 href，保留自有 Hero 和六篇 Related 不展示，Guide 书目期望改为四条；architecture inventory、review projection 与 output policy 测试同步。权威文档更新基线、内容状态与停点，历史批次不追认新增授权。

验收采用 `DEV_WORKFLOW.md` 的固定运行时定向测试、完整 check 与文档验证：实际 Schema/内容图/资产图必须通过，6 ready / 2 ready 且 published 0/0，14 页 noindex、112 Hero、10 WOFF2、零 XML/客户端 JavaScript。非默认视觉再生产不适用，因本批未改变视觉源或谱系。浏览器、键盘/缩放/故障/跨平台、外部服务、public artifact 与 release-candidate QA 均未执行。

### 6.3 VB6 验证与收口

- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，定向 7 文件/188 项测试通过；完整 check 通过 Prettier、ESLint、25 文件/379 项测试、Astro 81 文件零诊断、14 页 noindex build/output verifier、112 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。
- 33 份 Markdown 严格 UTF-8、108 个相对 Markdown 链接、模板占位符与 git diff --check 通过。两路独立只读审查辅助核对内容门禁、匹配测试和当前文档口径，历史批次证据保留。
- Hero 追溯、权利、公开文案与五审保持；构建期 Schema/内容图/视觉图诊断未放宽。未重新生产视觉资产；浏览器及最终发布候选 QA、服务、外部交互、public artifact、Git 写操作、推送或发布未执行。当前改动只形成未提交的本地 ready 审核结果。

### 6.4 Public Beta 首发内容批准

Project owner 在 VB6 ready 审核后明确确认六篇文章与两个合集均作为 Public Beta 首发内容，并授权本地改为 `published`、同步文档和测试及完成本地验证；随后明确六篇目标公开日期统一为 `2026-09-10`。这是进入公开版本的编辑决定，不是已上线事实、定时上线任务、页面级最终验收或部署授权。

| 对象 | 批准目标状态 | 目标公开日期 |
| --- | --- | --- |
| chinese-underworld-guide | published | 2026-09-10 |
| ten-kings | published | 2026-09-10 |
| zhong-kui | published | 2026-09-10 |
| liaozhai-reading-guide | published | 2026-09-10 |
| painted-skin | published | 2026-09-10 |
| fighting-cricket | published | 2026-09-10 |
| chinese-underworld Collection | published | 不适用：Collection 无日期字段 |
| liaozhai Collection | published | 不适用：Collection 无日期字段 |

六篇 `publishedAt` 使用带引号的 ISO 日期，`updatedAt` 保持 `null`，`lastFactCheckedAt` 保留原核查日期。正文、分类、Source/Claim/术语、两条 Related 环、成员顺序、Featured、Hero 与披露不变；八个对象一并提升以满足 published 关系矩阵。不新增 Schema、来源、资产、依赖、配置、外部交互或发布能力。

必要接线：Explore/Collections 有 published 列表时不调用或展示固定的 Not published 候选架；列表为空时仍保留原候选架和 helper 的严格资格校验。相应提示只在候选架显示时出现。Related 仍按既有 published-only 合同消费，六篇各显示既定下一篇。默认 review 的 noindex/nofollow、固定 Home、14 页 inventory、112 Hero、10 WOFF2、零 XML/客户端 JavaScript 与 inactive 交互不变；`public` intent 继续拒绝执行。

验收：真实八对象状态与六篇精确日期通过内容/资产图；未来日期不按系统时钟过滤；Explore 六篇同日按稳定 ID 排序，Collections 按标题排序；输出独立验证精确列表与 Related，未发布/空态 fixture 保留。固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，定向 7 文件/210 测试与完整 check 通过：Prettier、ESLint、25 文件/401 测试、Astro 81 文件零诊断、14 页 noindex 输出、112 Hero、10 WOFF2、零 XML 与零客户端 JavaScript。所有结果均为 `1be085b` 上延续 VB6 的未提交本地修改，不继承先前构建证据。文档最终检查在本批收口时记录于 DEV_WORKFLOW。

配套核对：正文/Source/Claim/术语及资产谱系、权利、alt/caption/credit/AI disclosure 均未改；现有 Schema、内容图、视觉图、public intent 与静态资源/交互阻断保持。索引与 Related 使用 HTML5 树检查精确链接、顺序、唯一结构及遗漏/重复/错目标；Related 校验限定在对应导航内，避免把复用列表 class 的 Collection 反向入口误判为重复。该非显然约束有职责注释，正向 fixture 同时覆盖两种导航。

本批不启动服务、不做浏览器/最终发布 QA、不创建 origin 或 public artifact、不执行 Git 写入、推送、Vercel、预览或部署。目标日期变化后需重验受影响页面/SEO/制品；日期本身不会触发上线。第 6.2–6.3 节保留 VB6 当批 ready 结果，不代表本批批准后的状态。

## 7. VB1–VB5 验证（历史基线）

- 数据闭环定向测试已通过：8 个测试文件/38 项测试覆盖 Schema、production lineage、metadata/hash、owner/brief/Claim 图、current resolver、内容 Hero 外键、local master 与精确 repository inventory。
- 非默认 `visual:build:check` 已通过：实际核验 21 个 local master，并从 17 份 current responsive rendition 生成、解码 120 个 AVIF/WebP 输出。
- 最终完整 `pnpm run check` 已通过：Prettier、ESLint、25 个测试文件/369 项测试、Astro 81 文件零诊断、14 页 review build/output verifier、112 个 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。brief 阶段的 42 输出只保留为历史结果。
- 严格 UTF-8、相对 Markdown 链接、原模板占位符与 `git diff --check` 按 `DEV_WORKFLOW.md` 的稳定入口执行；最终结果与精确数量记录在该文件的同批执行记录中。

## 8. 当前停点

VB1–VB5 已完成并进入 `1be085b`。VB6 ready 审核及随后 6+2 published 已完成；五组 Hero 与其余三组 Hero 一起覆盖正式阅读版范围，后续已提交并随 Public Beta 公开，身份与限制见 README/011。Lead、正文图与完整社媒包后移，不由 Hero-only 闭环推导为已交付。R2 当前样本为 0；目标日期不创建自动发布任务。
