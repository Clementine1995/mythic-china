# 011 Public Beta 与上线后目标读者验证：开发与验收说明

## 0. 文档职责与状态

本文定义 Mythic China 首次可索引 Public Beta 的进入条件、上线后目标读者验证、问题分级处置与 Beta 收口。它解决“没有现成独立读者时，若把真人审核固定在上线前，项目将无法获得真实读者”的冷启动循环。

本文不降低事实、双语、文化、权利、视觉、无障碍、内容状态、public artifact、预览或生产授权门禁；不创建新的内容状态，不授权部署、数据收集或外部写入，也不把分析行为数据当作阅读理解结论。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | 已确认 | Project owner 于 2026-09-07 确认采用“先完成非读者发布门禁，再以可索引 Public Beta 获取真实读者并关闭 R2”的路线 |
| 实施状态 | 合同已建立；PB2 已进入实施 | 012 已闭合四篇 Entry 与 Liaozhai Collection 的五组 Hero brief、候选/权利、master、production record、approved/current manifest、repository source 和内容绑定；VB6 已闭合分类、Related、Featured 与 6+2 ready；owner 随后批准全部 6+2 published，六篇目标公开日期统一为 2026-09-10；013 的 `public` intent、稳定 origin 与本地诊断制品已完成；完整发布候选及远端运行环境仍未完成 |
| 验证状态 | PB1 文档验证与 PB2 Hero 数据闭环定向验证通过；上线后目标读者验证未开始 | 五组 Hero 的 Schema、production lineage、metadata/hash、owner/Claim 图、current resolver、内容外键、local master 与精确 inventory 已通过 8 个测试文件/38 项测试；最终视觉构建与全量结果见 012 第 7 节。R1 静态检查已通过，R2a/R2b 真人反馈仍为 0 |
| 发布状态 | 未发布 | 当前 published Entry / Collection 为 6/2，六篇目标日期为 2026-09-10，已有 Vercel 空项目及 production hostname，尚无受保护远端预览或生产部署 |

- 当前权威结论更新时间：2026-09-08。
- 2026-09-08 增量：owner 已通过网页建立个人管理 Hobby 空项目 `project-scu6m`，Production 域名 `mythic-china-beta.vercel.app` / `No Deployment`。本地 public assembly 已在 [013](013-public-artifact-assembly.md) 接线；此前 origin/runner/endpoint 尚不存在的描述保留为 PB1/VB6 阶段背景，不再作为当前阻塞项。本批未提交输出仍是 nondeployable 诊断，不关闭下列生产进入门禁。
- 决策基线：`f81b49fd1c288aed6c552c2e8d9926ec5a09e86c`；PB1 已提交为 `96da8db52cc384e0dc77164288d3bce16383faf0`。五组 Hero 已提交为 `1be085b`，VB6 从该 clean 基线完成本地 ready 审核；当前修改未提交，也不形成可部署身份。

## 1. 结论与开发就绪判断

- 一句话结论：目标读者 R2 从 M6 上线前硬门禁改为 M7 Public Beta 上线后的验证与正式 MVP 收口门禁；缺少样本不得写成“通过”，但不再阻塞图片、状态、public artifact、受保护预览或经单独授权的 Public Beta 生产发布。
- 是否可以进入本地后续开发：是。四篇 Entry 与 Liaozhai Collection 的五组 Hero 资产已完成 approved/current 闭环；VB6 已使 6 篇 Entry / 2 个 Collection 均 ready，随后 owner 已批准 6+2 published 与六篇目标日期 2026-09-10；013 已完成 origin/public assembly 的本地接线；Beta 页脚提示已获批准，本地实施见 013；016 已补条件式 hosting Privacy，后续为实际托管配置、独立 M5 交互及最终候选准备。
- 是否可以立即发布 Public Beta：否。本地 public build 已完成；016 条件式 hosting Privacy 已落地；外部服务、实际托管配置、含 Beta 提示的 clean-source 最终 QA、预览和生产授权尚未完成。
- 会改变后续实施结果的待确认项：目标读者招募/答卷渠道、实际交付入口、构建配置及项目数据处理选择。2026-09-08 已现场核对团队/项目内部身份、Production 域名绑定及 `Require Log In / Standard Protection`；尚无部署，保护的实际访问验收仍待受保护预览。具体现场见 DEV_WORKFLOW 文末。

### 1.1 事实、推断与风险

- 事实：当前没有合适的独立目标读者，R2a/R2b 均未开始；AI 专业审读与 Project owner 复核不能计入真人样本。
- 事实：现有 Content Schema 只有 `draft | editorial-review | visual-review | ready | published | archived`；`ready/published` 的机器门禁不包含目标读者字段。
- 设计选择：Public Beta 使用现有 `published` 内容状态和正式 public projection；`Public Beta` 是发布阶段，不是新的 Entry/Collection 状态。
- 设计选择：Public Beta 期间必须在全站稳定且可访问的位置显示 Project owner 批准的 Beta 提示，说明站点已公开但目标读者验证仍在进行；内部发布记录使用 `Public Beta / pending human validation`。Project owner 于 2026-09-08 批准原文 `Public Beta — This site is open to readers. Reader testing is not yet complete.`，在 public 每页页脚身份区域、品牌名称之后显示为普通静态段落；review 不显示。复用既有样式，无客户端脚本。本地候选包含该文案不代表网站已经上线。
- 风险：可索引 Public Beta 是公开生产暴露，页面可能被搜索缓存、引用或分享。若上线后出现第 5 节定义的关键发现并使既有发布门禁失效，必须立即回滚或撤下受影响页面，不能等待样本收齐。
- 风险：自然到访者是自选样本；流量、停留时间和滚动深度不能替代开放复述与理解度审核。

## 2. 目标与成功标准

### 2.1 Public Beta 目标

- 在完整、可追溯且通过非读者发布门禁的 6 篇 Entry 和至少 2 个 Collection 上线后获得第一批真实英语读者。
- 用真实 public artifact 完成一轮 R2a 非计入试跑和 R2b 正式审核，验证文稿理解、来源边界、合集意图及完整页面体验。
- 在不伪造样本、不扩大数据收集的前提下，让目标读者验证从冷启动阻塞项变成上线后的可关闭验证项。

### 2.2 Beta 进入条件

Public Beta 生产发布前必须全部满足：

1. 6 篇 Entry、至少 2 个 Collection 完成事实、Source/Claim、双语术语、英文编辑、关系、内容提示、视觉资产、权利、披露和内容无障碍文案门禁。
2. Project owner 在完整本地 inventory 上逐项作出 `published` 决定并批准目标公开日期；Public Beta 不允许索引 draft、`editorial-review`、`visual-review` 或 `ready` 内容。
3. M5-U4 按 [`006-external-interactions.md`](006-external-interactions.md) 完成 Buttondown 与 Tally 的账户级配置、真实 action/link 和受控合成数据联调；Reader Request 不扩展为目标读者研究表单。
4. M5-U5 只按 006 完成 provider-neutral analytics 合同、候选 adapter、条件 hook 和离线测试；M6 在真实 origin 下完成 public 条件接线与制品验证，M7 才选择并启用 production analytics 与唯一 RUM producer。
5. M6 完成真实 HTTPS origin、public intent/runner、页面 metadata、Sitemap/RSS/JSON-LD、独立 output verifier 与真实非空 public artifact。
6. 从另行授权的 clean committed revision 重建同一 artifact，完成自动门禁、390/768/1440、真实键盘、200%、JavaScript-disabled、reduced motion、字体/图片故障、支持平台 fallback、链接、本地性能和 Project owner 最终视觉审核，并生成 clean-source verification receipt。该轮不以 R2 样本为放行条件。
7. 受保护预览绑定同一 validated source identity，并通过账户归属、保护、目标地区表现、成本、退出和回滚验收。
8. 同一发布候选包含 Project owner 批准的可见、可访问 Public Beta 提示；它不宣称已通过目标读者验证，具体文案和位置已有匹配视觉、键盘和输出检查。
9. `DEV_WORKFLOW.md` 已实例化生产发布、live smoke、回滚、production analytics/RUM 和停止条件，且 Project owner 单独授权本次生产发布。

### 2.3 Beta 退出条件

Public Beta 保持进行中，直到：

- production identity 与 validated source identity 一致；live robots/canonical/核心路由/资源 smoke、回滚入口和目标地区复核已有记录，且没有未关闭的关键技术发现。
- M7 已按 006 选择并启用唯一 RUM producer，真实 production request/dashboard 已核验。默认观察窗为连续 14 个完整自然日，LCP、INP、CLS 各至少 50 个供应商判定有效且排除 review/preview/自动化流量的测量值后才报告 p75；供应商有效性口径、时区、过滤与窗口起止须在启用前冻结。14 日后任一指标不足 50 个有效值时记为 `RUM INCONCLUSIVE — INSUFFICIENT TRAFFIC`，不得宣称该指标或整体性能通过；Project owner 可在核对 M6 实验室基线仍有效并明确接受该限制后关闭正式 MVP 验证。窗口或样本门槛不得在看到结果后下调。
- R2a 由 1 位符合画像但不计入正式样本的独立读者在当前 live artifact 上完成，材料、首读停点、记录方式和实际时长问题已经关闭。
- R2b 的核心全站 cohort 有 5–8 份可用独立目标读者记录；010 所列四篇焦点 Entry 各有 5–8 份可用深读反馈，并满足理解度、评分、Sources 与问题处置阈值；同一批读者及按预先冻结规则加入的替补还须满足 010 的 Home、Explore、两个 Collection、六篇 Entry 路径覆盖与站点辨识阈值。
- 没有未处置的关键发现；两位以上读者重复报告的重大问题已有明确处置。所有改变事实、含义或研究任务体验的修订均按对应 Source/Claim、聚焦双语、状态、构建、部署和第 5.2 节的研究版本规则重新验证。
- Project owner 核对技术基线、聚合结果、修改和复测并明确关闭目标读者验证与正式 MVP 验证；移除可见 Public Beta 提示属于一次独立、可验证的发布变更。

## 3. 范围与边界

### 3.1 本需求包含

- 把 R2 的执行时点改为 Public Beta 上线后。
- 把正式目标读者文稿与完整页面体验审核合并到同一 live artifact 流程，避免上线前重复招募两组 5–8 人。
- 定义 Beta 进入、退出、问题分级、版本身份和证据规则。

### 3.2 本需求不包含

- 新增 `beta` 内容状态、绕过 `published` 投影，或让非 published 页面被索引。
- 本批生成图片、修改内容状态、接入供应商、创建 Vercel 项目、部署或发布。
- 把 Tally Reader Request 的 `requestedTopic` 扩展为理解度、评分、设备或自由研究反馈字段。
- 以 AI、Project owner 单人判断或分析事件替代真人样本。

## 4. 目标流程

```text
当前 R1 静态准备完成、R2 = 0
  -> M5-U4/U5 与 M6 内容、资产、关系、状态、public artifact
  -> clean-source release QA 与受保护预览
  -> Project owner 独立授权生产发布
  -> 可索引 Public Beta（现有 published 状态）
  -> live smoke / 回滚入口 / 目标地区 / production analytics 与唯一 RUM producer 核验
  -> 另行确认并授权研究执行包与版本身份
  -> live artifact 上执行 R2a
  -> 修正研究材料或关键发现
  -> live artifact 上执行 R2b
  -> 对受影响内容定向修订、复核、重建和重新发布
  -> Project owner 关闭目标读者验证与正式 MVP 收口
```

## 5. 反馈、隐私与处置合同

- R2 默认继续使用匿名 reviewer ID 和仓库外答卷/访谈记录；仓库只保存样本量、画像符合度、日期、聚合结果、问题分级、处置与 Project owner 结论。
- 若未来使用站内或第三方表单收集 R2，必须先建立独立研究反馈需求，明确字段、目的、同意、保留、删除、供应商配置、Privacy 和测试；不能借用现有 Reader Request 合同扩字段。
- 分析只记录既定 allowlist 事件，不记录答卷、建议正文或个人信息，也不能证明读者正确理解文章。
- 问题统一使用 010 的 `关键 / 重大 / 次要` 分级。关键发现一旦使事实、来源、文化安全、无障碍、视觉或发布硬门禁失效，必须立即回滚或撤下受影响页面并修正、复测；重大和次要问题按 010 定向处理。

### 5.1 Live R2 进入门禁

Public Beta 上线本身不授权招募或收集反馈。首次联系参与者或记录答卷前，必须另行确认并授权一份仓库外执行包，至少冻结：

- 当前 production origin、validated source revision、artifact/deployment ID、全部研究 URL 与页面内容摘要哈希。
- 目标画像、招募渠道、参与者说明、自愿参加/跳过/退出方式、研究负责人、核心 cohort、联系/开始人数上限、替补顺序与停止规则。
- 站点级任务、四篇深读任务、首读停点、提问顺序、原始答案字段、编码规则和 R2a/R2b 标识。
- 记录载体、访问权限、保留期限、删除方式和参与者撤回路径；使用在线表单、邮件、数据库或其他真实写入口时，还须先完成对应数据合同与独立授权。

R2a 先验证这份执行包与 live 页面；只有材料问题关闭并冻结新版本后，才能进入 R2b。

### 5.2 研究版本与样本合并

- 每份答卷绑定唯一研究版本，至少记录 source revision、artifact/deployment ID、production origin、相关 URL/内容哈希、协议版本和完成时间；只写“当前线上版本”不构成版本证据。
- R2a 后若改变任务、记录字段、首读停点、页面阅读层级或共享导航，必须重跑 R2a。仅修正不影响任务或测量的仓库外说明笔误时，可保留试跑，但须记录理由。
- R2b 中改变目标文案、Sources、`contentNote`、视觉/交互层级、导航路径或任何会影响回答的页面内容时，旧版受影响答卷不得与新版合并计算阈值。受影响 Entry 重新收集至少 5 份同版可用反馈；共享导航、站点辨识任务或全局表现层变化使全部站点级答卷失效并重开 R2a。
- 未受影响 Entry 的旧答卷只有在其 URL、内容哈希、共享导航和研究协议均未变化时才可保留，且 Project owner 必须在聚合记录中写明保留依据。历史版本仍作诊断证据，不从记录中删除。

## 6. 实施拆分

1. **PB1 合同同步**：新增本文并同步 README、项目规则、产品、设计、架构、总合同与相关历史需求的当前路线。状态：已完成。
2. **PB2 非读者发布门禁**：完成 M5-U4、M5-U5 离线合同/hook、四篇资产/关系/视觉/状态及 M6 public 条件接线与 public artifact。状态：实施中；012 的五组 Hero、VB6 关系/Featured 与 6+2 ready 已完成；owner 已批准首发 6+2 published 与六篇目标日期 2026-09-10；013 本地 public artifact 已完成；Beta 提示的批准与本地实施见 013；016 条件式 hosting Privacy 已落地。托管身份/域名/保护设置已只读核对，交付入口、构建/output、数据处理决定、交互与完整候选仍未闭合。
3. **PB3 受保护预览**：从 clean source 验证并验收受保护预览。状态：未开始。
4. **PB4 Public Beta 生产发布**：逐次授权后把 validated source identity 发布到稳定、可索引的 production origin。状态：未开始。
5. **PB5 上线后 R2**：先关闭第 5.1 节的研究执行与数据门禁，再在同一 live artifact 上完成 R2a、冻结研究版本、执行 R2b、处置与复测。状态：未开始。
6. **PB6 正式 MVP 收口**：Project owner 关闭目标读者验证、复核 live/RUM 基线并决定结束 Beta。状态：未开始。

## 7. 本批验证与授权

- 本批只验证 Markdown 格式、严格 UTF-8、相对链接、占位符、差异完整性和跨文档路线一致性。
- 没有业务代码、Schema、内容对象、视觉资产或构建输入变化，因此不运行完整应用测试、构建或视觉生产检查。
- 本批不安装依赖、不启动服务、不执行真实联调、预览或生产发布。文档实施与验证阶段未执行 Git 写操作；PB1 验证通过后，Project owner 另行授权将本批文档创建本地提交，该授权不包含 fetch、push、预览或生产发布。

## 8. 当前最终结论

- Public Beta 路线已获确认；目标读者审核仍未执行，证据状态继续为 `PENDING HUMAN READERS`。
- 缺少 R2 样本不再阻塞图片、`relatedEntryIds`、视觉/状态审核、M6 public artifact、受保护预览或经独立授权的 Public Beta 生产发布。
- Public Beta 不是降低质量标准的预览替代物；除目标读者效果验证外，既有内容、资产、技术、隐私、版本身份、预览和生产门禁全部保留。
- PB1 文档合同同步已完成；PB2 已完成五组 Hero 的 brief、候选/权利、production lineage、approved/current manifest、repository source 与内容绑定。VB6 已闭合关系、Featured 与 6+2 ready，随后 owner 已批准 6+2 published 与六篇目标日期 2026-09-10；013 本地 origin/public assembly 已完成；下一停点为完整发布候选准备。外部服务、Git、Vercel 操作和发布仍须按对应范围单独授权。
