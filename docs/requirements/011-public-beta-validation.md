# 011 Public Beta 与上线后目标读者验证：开发与验收说明

## 0. 文档职责与状态

2026-09-12 正式范围决定：Project owner 确认正式 MVP 采用阅读版，包含 6 篇英语 Entry、2 个 Collection、各自 approved/current Hero、来源、阅读导航、基础 SEO、最小产品分析及现有静态页。Newsletter / Reader Request 的真实启用、每篇正文插图及完整故事卡包移至后续独立需求，不作为本文退出条件，也不记为完成。下列真机、完整地区性能、真实 RUM、R2、问题处置与 owner 收口门槛保持。

2026-09-10 运行更新：GoatCounter 经独立授权完成启用，当前生产源为 21cdbb6，详见 [006 第 12.12 节](006-external-interactions.md#1212-goatcounter-启用收尾2026-09-10)。下面两段是阅读版首次发布前的历史范围；统计后续启用不恢复表单或 RUM。

2026-09-09 首发范围收敛：owner 在停止继续表单测试后要求尽早准备上线。本次按阅读版 Public Beta 准备，保留 6 篇 Entry、2 个 Collection 及现有静态页；Newsletter、Reader Request、Analytics 和 RUM 均不启用。M5 未完成项保留为对应功能未来启用的门禁，不再作为本次阅读版首发的前置条件；已有测试记录不擅自删除。本节与下列更新后的进入条件取代旧阶段记录中“先完成全部 M5 才能准备发布”的顺序，不代表 M5、最终 QA 或发布已经通过。

2026-09-09 增量：GoatCounter 设置已由 owner 截图与保存确认，M6 默认关闭的 public bootstrap、脚本身份与原始产物离线执行验证完成；真实统计未启用，不关闭 U5、完整候选 QA 或发布。详见 [006](006-external-interactions.md) 与 [013](013-public-artifact-assembly.md)。

本文定义 Mythic China 首次可索引 Public Beta 的进入条件、上线后目标读者验证、问题分级处置与 Beta 收口。它解决“没有现成独立读者时，若把真人审核固定在上线前，项目将无法获得真实读者”的冷启动循环。

本文不降低事实、双语、文化、权利、视觉、无障碍、内容状态、public artifact、预览或生产授权门禁；不创建新的内容状态，不授权部署、数据收集或外部写入，也不把分析行为数据当作阅读理解结论。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | 阅读版正式范围已确认，退出验证未关闭 | 2026-09-07 确认先上线再执行 R2；2026-09-12 确认上述正式阅读版范围 |
| 实施状态 | PB2/PB3 已形成证据；PB4 阅读版正式公开 | 当前 21cdbb6 的 6 Entry / 2 Collection / 140 文件原样推广；内容/资产批准保持，GoatCounter 已启用，表单和 RUM 关闭 |
| 验证状态 | 既有发布 smoke 通过；发布后技术验收部分完成 | 新制品 140 文件完整性及 GoatCounter 7 次请求/后台回查、原生 DNT、受控退出/BFCache 通过；阅读/退出采用焦点模拟，原生前后台完整流程未完成。旧版三地区 HTTP/PSI 见 2.2.3；完整地区浏览器/真机/RUM 与 R2 保留 |
| 发布状态 | 阅读版 Public Beta 已公开 | 当前 `dpl_7bpnKu2bhRQPtv3E1TRibmn9dzDy` 已原样推广；正式域名匿名 200，Standard Protection 保持，部署网址要求登录。状态为 Public Beta / pending human validation，未完成正式 MVP 验证 |

- 当前权威结论更新时间：2026-09-12；最新线上与账户实证日期为 2026-09-10。
- 2026-09-08 增量：owner 已通过网页建立个人管理 Hobby 空项目 `project-scu6m`，Production 域名 `mythic-china-beta.vercel.app` / `No Deployment`。本地 public assembly 已在 [013](013-public-artifact-assembly.md) 接线；此前 origin/runner/endpoint 尚不存在的描述保留为 PB1/VB6 阶段背景，不再作为当前阻塞项。本批未提交输出仍是 nondeployable 诊断，不关闭下列生产进入门禁。
- 历史决策基线为 `f81b49f`，PB1 为 `96da8db`，五组 Hero 为 `1be085b`；这些身份保留各自证据范围。当前生产制品绑定 `21cdbb6`，本轮文档更新不形成新的线上制品或发布验收。

## 1. 结论与开发就绪判断

- 一句话结论：目标读者 R2 从 M6 上线前硬门禁改为 M7 Public Beta 上线后的验证与正式 MVP 收口门禁；缺少样本不得写成“通过”，但不再阻塞图片、状态、public artifact、受保护预览或经单独授权的 Public Beta 生产发布。
- 当前阶段：阅读版 Public Beta 的 M7 验证。6+2 内容、8 组 Hero、origin/public assembly、Beta 提示、条件式 Privacy、适用候选与公开检查已完成；表单真实启用及扩展视觉包后移。当前工作是补齐既定技术证据和 R2，不再以“准备托管或候选”为下一停点。
- 本次公开流程：owner 已于 2026-09-10 授权并确认第 2.2.1 节的时点调整；同一部署已推广到正式域名并公开，140 文件匿名完整性检查、首页与核心正文浏览器检查通过，没有触发恢复保护。执行身份、时间与证据限度见 DEV_WORKFLOW 顶部；这不是新一次发布授权。
- 当前下一步：owner 于 2026-09-10 暂缓独立 Edge/CDP 轨迹诊断，并确认尚无跨平台真机；[017](017-real-user-monitoring.md) RUM 本地实现已完成，因无 Cloudflare 账户不接真实采集。随后独立授权完成 GoatCounter 生产验收；完整 Network、原生前后台及指定三地区浏览器首/复访仍未关闭。owner 暂无独立目标读者，R2 保留未开始，不要求先招募才继续技术工作；不重复部署，不自动启用外部服务。

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

1. 阅读版 6 篇 Entry、2 个 Collection 及八组实际使用的 Hero 完成事实、Source/Claim、双语术语、英文编辑、关系、内容提示、权利、披露和内容无障碍文案门禁。
2. Project owner 在完整本地 inventory 上逐项作出 `published` 决定并批准目标公开日期；Public Beta 不允许索引 draft、`editorial-review`、`visual-review` 或 `ready` 内容。
3. 阅读版的 Newsletter 与 Reader Request 保持 inactive，无可提交控件、外部表单入口或传输；Privacy 与实际产物一致。Buttondown/Tally 的未完成配置、联调与清理按 [`006-external-interactions.md`](006-external-interactions.md) 保留，恢复对应功能前单独完成。真实启用已移出正式阅读版 MVP，不把 U4 记为通过。
4. 首次阅读版 Analytics 配置保持关闭，唯一 bootstrap 通过摘要与离线校验；local/preview/production 均不发送请求，不增加 RUM producer。后续启用须按 006 明确处理、Privacy、传输/退出证据和独立授权；2026-09-10 已完成 GoatCounter 启用，受控验证及原生前后台/GPC 缺项见 006，RUM 仍关闭。
5. M6 完成真实 HTTPS origin、public intent/runner、页面 metadata、Sitemap/RSS/JSON-LD、独立 output verifier 与真实非空 public artifact。
6. 从另行授权的 clean committed revision 重建同一 artifact，在进入受保护预览前完成自动门禁、390/768/1440、真实键盘、200%、JavaScript-disabled、reduced motion、字体/图片故障、本机 fallback、链接、本地性能和 Project owner 最终视觉审核，并生成绑定源身份及检查范围的 verification receipt。该轮不以 R2 样本为放行条件。
7. 受保护预览绑定同一 validated source identity，并通过账户归属、保护、成本、退出和回滚验收。macOS/iOS/Android 实机显示与字体 fallback，以及美国东部、西部和欧洲性能实测，按第 2.2.1 节在 Public Beta 上线后、结束 Beta 前补齐；预览及公开记录列明具体未验证平台和地区，不能标成通过。公开后立即核验同一原 140 文件，发现阻塞阅读问题即恢复登录保护；其他门禁不因此后移。
8. 同一发布候选包含 Project owner 批准的可见、可访问 Public Beta 提示；它不宣称已通过目标读者验证，具体文案和位置已有匹配视觉、键盘和输出检查。
9. `DEV_WORKFLOW.md` 已实例化生产发布、live smoke、回滚和停止条件，且 Project owner 单独授权本次生产发布。首次阅读版 live smoke 复核交互与统计关闭；后续 GoatCounter 启用的 live smoke 按 006 核对实际开启配置、Privacy、传输和后台，表单/RUM 保持关闭。

### 2.2.1 跨平台实机验收时点

当前决定（2026-09-10）：Project owner 明确同意将 macOS/iOS/Android 真机显示与字体 fallback，以及美国东部、西部和欧洲性能实测，调整为 Public Beta 上线后、结束 Beta 前补齐。当前依据已接受的 Windows、本地与受保护线上验收执行本次公开；公开后立即对比原 140 文件，发现阻塞阅读的问题即恢复登录保护。此决定只改变这两组验收时点，不改变测试平台、页面、指标或通过标准，也不把缺失证据记为通过。地区性能仍按 ARCHITECTURE 覆盖首页及最重文章、移动/桌面、冷/暖缓存和既定全部指标；实机记录仍绑定设备/系统/浏览器、页面、结果与同一制品身份。Windows、视口/UA 或浏览器引擎模拟均不能替代实机。

历史决定（2026-09-09，当前时点由上一段替代）：Project owner 当时将实机检查由受保护预览前移至受保护预览阶段，并要求正式公开前完成。该历史授权与原验收记录保留，不覆盖本次最新决定。

已验证的 `dc0ad2d6cdbd3e1e02e19841af67fc3f5522f3dd` 候选完成 108 组正常/无脚本/减弱动效/资源故障与慢加载补验、26 组真实 200% 缩放、39 组最终三档版面及本地性能测量；用户委托的 Codex 最终视觉审核接受。当前用户暂无其他设备，跨平台实机仍未验证。这些证据绑定原 clean revision 及其 140 文件制品，不随文档修改自动改绑为新 revision，也不构成生产授权。

2026-09-10 的确认包含按上述方案尽快公开本次阅读版 Beta、公开后立即完整性检查与阻塞问题时恢复登录保护；不授权 Git 提交/推送、业务代码变更、功能启用、付费升级或采集读者数据。公开访问与保护设置按 DEV_WORKFLOW 的具体入口执行，其余运行配置及通过标准保持。

### 2.2.2 受保护预览准备

2026-09-10，owner 在本机执行确认入口，原 dc0ad2d / 140 文件已交付到受保护 **staged production**，部署 `dpl_D3E9hWGC4h19MSg1KcuVaiTWunwK` 为 READY。上传前已加强为 All Deployments 登录保护，请求关闭该次正式域名自动推广；实际仍生成一个受保护衍生别名。00:02 UTC 执行回执与 00:05 UTC 主代理独立匿名复查确认：正式域名 404，部署及衍生别名跳转 Vercel 登录。它作为当前受保护验收环境，不冒称 Vercel Preview，也不构成公开生产放行。随后 Windows 内置浏览器的登录后 13 页 DOM、19 处图片加载、226 处站内目标及 7 份字体/样式/图片字节抽验通过；交互入口及统计配置仍关闭。完整远端字节、请求/平台注入、线上索引文件、目标地区与跨平台实机仍保留。具体身份、授权、方法与证据限度、单次创建与精确异常撤销记录以 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#受保护暂存部署入口2026-09-09) 为准；本轮没有重跑本地 QA 或 Git 写入。下列段落为上一轮事故及创建前的历史记录，不覆盖本次 READY 状态。

异常已撤销（2026-09-09）：唯一一次创建返回 `target: production`，曾使正式域名公开返回本站正文，受保护 Preview 未通过。owner 明确授权后完成精确删除；14:09 UTC receipt 显示对象 API 404、部署列表为空，14:10 UTC 主代理独立匿名复查正式域名为 404 / DEPLOYMENT_NOT_FOUND，无本站内容。当前无可用部署，不再尝试创建；首次部署环境选择方案需核实后再提新的预览动作。曾公开期间的外部访问/副本未验证。执行与保留证据由 DEV_WORKFLOW 维护，下段为创建前准备记录。

2026-09-09，用户要求准备受保护预览。原 dc0ad2d clean-source 制品的目录与 ZIP 均已逐项复核，140 文件 / 3,275,431 字节与原 inventory 完全一致；非 Git REST 请求包及本地摘要已生成并完成 Base64 回解检查。拟使用既有 Vercel 项目，以 Other、空 build/install command、根输出目录直接交付该制品，具体身份、请求摘要、实时保护检查、授权和撤销入口仅由 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#受保护-preview-上传准备2026-09-09) 维护。上述首次交付设置尚未应用；2026-09-09 已通过本机 Token 只读核对项目/团队、已绑定域名及 Standard Protection，部署为 0。owner 已保存本项目 Pre-Production Toolbar Off 并确认关闭项目模型训练开关；Toolbar 提示需新部署生效，实际输出及保护访问尚未验证。代理本次仅准备，没有 Git 写入、账户配置写入或远端部署；本次 Preview 已获明确授权，但新输入凭据的项目 GET 返回 403、团队 scope 未授权；创建 POST 尚未执行，凭据恢复后继续同一次授权。实机缺口按 2.2.1 保留。

### 2.2.3 发布后技术验收进度（2026-09-10）

owner 已明确要求补网络请求、三地区性能、跨平台真机和 RUM 方案。本批测量对象为正式 origin 的首页与图片候选最重的钟馗文章，仍沿用原 dc0ad2d 发布身份；文档检查点 29b3d95 不取代制品 revision。逐项结果、原始回执位置、外部报告和执行入口由 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#发布后技术验收2026-09-10) 维护。

| 范围 | 本批证据 | 尚未完成 |
| --- | --- | --- |
| 美东/美西/欧洲 | Reston / Los Angeles / Frankfurt，两页各两轮，共 12 次 HTTP 200；总耗时 18–358ms，第二轮均 CDN HIT | HTTP 不执行浏览器渲染；指定三地区 × 两页 × 手机/桌面 × 浏览器首/复访矩阵未闭合 |
| 浏览器性能与请求 | Google PSI 北美初始加载：首页手机/桌面 LCP 1.802/0.321s，钟馗 2.710/0.482s；四份 CLS/TBT 为 0，资源表已有同源 URL/字节证据 | 单次合成数据不是 p75；钟馗手机 LCP 需要定向诊断。没有完整 HAR、请求头或交互/后台/退出观察，TBT 不能替代 INP |
| 跨平台真机 | 已核对当前 Windows 环境，未发现连接的目标移动设备 | macOS/iOS/Android 仍无实机证据；PSI 的手机/Mac UA 属于模拟，不能计入 |
| RUM | [006 第 5.5.1 节](006-external-interactions.md#551-发布后-rum-实施方案2026-09-10)方案已确认，按 [017](017-real-user-monitoring.md) 本地实施客户端、Worker/D1、去重、14 日 p75 与清理 | 无 Cloudflare 账户，默认关闭，真实传输/处理条款/部署仍未验收；两页 CrUX 均无数据，正式 14 日窗口未开始 |

WebPageTest 当前匿名入口提示免费次数用尽，未产生报告；没有注册/付费升级或绕过限制。Network 能力与实机供给的缺口均保留具体停点，不标成测试通过，也不因此重做已完成的本地 QA。本轮没有业务代码、依赖、运行配置或线上发布变更；下列 Beta 退出标准保持。

### 2.2.4 钟馗移动 LCP 诊断与最小修正

2026-09-10，owner 同意继续查清移动绘制延迟并做有依据的最小优化。当前判断：图片已使用 eager/high；现有材料不足以将单次 LCP 2.710s 归因于图片或字体。新增两轮公开旧版 PSI，用于确认波动和诊断线索，不是修改前后的受控实验。

本批确认的修改范围仅为六篇文章共享的 `EntryTemplate.astro`：手机 sizes 改为与当前 CSS 一致的布局条件和减去两侧边距的槽位宽度，桌面 90vw 保持。目标是让预加载选择使用更准确的声明，不改页面布局、字体、图片候选/质量/构图、资产合同、来源披露、内容或交互；不承诺 PSI 的 412px/DPR1.75 会降档，因为约 665px 的实际需求仍在 640 和 960 候选之间。共享 picture 的 767/768px 构图边界不在本批调整范围。

完成标准：完整现有检查和 public/review 输出门禁通过；逐文件对比原包，只有六篇文章的 30 个 sizes 属性发生预期变化，其他输出字节一致；README 与 DEV_WORKFLOW 同步实际结果。无需为单行声明新增镜像断言型单元测试，采用真实构建输出核对变更范围。浏览器精确宽度/currentSrc、绘制 trace 和修改后 LCP 未经实测不能标记通过，后续提交与发布仍须单独授权。

状态：尺寸声明修正已完成，本地验证通过；38 文件/655 项现有测试、Astro 117 文件零诊断、public/review 构建与输出门禁通过。原 140 文件逐项比对只改变六篇文章的 30 个 sizes 属性，其余 134 文件字节一致。新增两轮旧版 PSI 均已记录，手机三轮 LCP 为 2.710/2.255/2.552s，桌面单次 TBT 495ms 与另一次 CLS 0.04 也保留，绘制根因仍未确定。浏览器轨迹与修改后性能尚未验收，不能关闭性能诊断。本地诊断不构成新可部署身份，本地修正阶段线上仍为原 dc0ad2d。后续 sizes 已随 21cdbb6 的 GoatCounter 发布上线，39 组本地页面/视口检查通过；修改后性能与绘制根因仍未验收，不关闭完整地区矩阵、Network 或真机缺口，RUM 仍关闭。下一停点和执行记录见 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#钟馗移动-lcp-诊断与尺寸修正2026-09-10)。

### 2.3 Beta 退出条件

以下条件全部适用于正式阅读版 MVP；表单启用、逐篇正文图和完整故事卡另行交付，不降低或替代这些条件。

Public Beta 保持进行中，直到：

- 按第 2.2.1 节补齐 macOS/iOS/Android 实机显示与字体 fallback，以及美国东部、西部和欧洲的完整性能实测；设备/系统/浏览器、地区、页面、冷/暖缓存、指标、结果及匹配制品身份齐全，阻塞阅读问题已解决。缺少这些证据时不能结束 Beta。
- production identity 与 validated source identity 一致；live robots/canonical/核心路由/资源 smoke、回滚入口和目标地区复核已有记录，且没有未关闭的关键技术发现。
- M7 已按 006 选择并启用唯一 RUM producer，真实 production request/dashboard 已核验。默认观察窗为连续 14 个完整自然日，LCP、INP、CLS 各至少 50 个供应商判定有效且排除 review/preview/自动化流量的测量值后才报告 p75；供应商有效性口径、时区、过滤与窗口起止须在启用前冻结。14 日后任一指标不足 50 个有效值时记为 `RUM INCONCLUSIVE — INSUFFICIENT TRAFFIC`，不得宣称该指标或整体性能通过；Project owner 可在核对 M6 实验室基线仍有效并明确接受该限制后关闭正式 MVP 验证。窗口或样本门槛不得在看到结果后下调。
- R2a 由 1 位符合画像但不计入正式样本的独立读者在当前 live artifact 上完成，材料、首读停点、记录方式和实际时长问题已经关闭。
- R2b 的核心全站 cohort 有 5–8 份可用独立目标读者记录；010 所列四篇焦点 Entry 各有 5–8 份可用深读反馈，并满足理解度、评分、Sources 与问题处置阈值；同一批读者及按预先冻结规则加入的替补还须满足 010 的 Home、Explore、两个 Collection、六篇 Entry 路径覆盖与站点辨识阈值。
- 没有未处置的关键发现；两位以上读者重复报告的重大问题已有明确处置。所有改变事实、含义或研究任务体验的修订均按对应 Source/Claim、聚焦双语、状态、构建、部署和第 5.2 节的研究版本规则重新验证。
- Project owner 核对技术基线、聚合结果、修改和复测并明确关闭目标读者验证与正式 MVP 验证；移除可见 Public Beta 提示属于一次独立、可验证的发布变更。

## 3. 范围与边界

### 3.1 本需求包含

- 固定 2026-09-12 正式阅读版范围，并将表单真实启用、逐篇正文图与完整故事卡移至后续独立需求。
- 把 R2 的执行时点改为 Public Beta 上线后。
- 把正式目标读者文稿与完整页面体验审核合并到同一 live artifact 流程，避免上线前重复招募两组 5–8 人。
- 定义 Beta 进入、退出、问题分级、版本身份和证据规则。

### 3.2 本需求不包含

- 新增 `beta` 内容状态、绕过 `published` 投影，或让非 published 页面被索引。
- 本轮生成图片、修改内容状态、接入供应商、部署或发布。
- 把 Tally Reader Request 的 `requestedTopic` 扩展为理解度、评分、设备或自由研究反馈字段。
- 以 AI、Project owner 单人判断或分析事件替代真人样本。

## 4. 目标流程

```text
当前 R1 静态准备完成、R2 = 0
  -> 首次阅读版关闭交互/统计检查与 M6 内容、资产、关系、状态、public artifact
  -> clean-source release QA 与受保护预览
  -> Project owner 独立授权生产发布
  -> 可索引 Public Beta（现有 published 状态）
  -> live smoke / 回滚入口 / 目标地区 / 对应批准配置（GoatCounter 后续按 006 启用）
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

1. **PB1 合同同步**：本文及相关权威文档已建立；2026-09-12 再同步正式阅读版范围和当前运行状态。
2. **PB2 阅读版发布门禁**：原 dc0ad2d 本地候选已接受，内容/资产、关闭交互与统计、Beta 提示及 inactive Privacy 保留；源身份和本地 QA 见 2.2.1，不重复测试 M5。
3. **PB3 受保护预览**：原已验收制品的 staged production 已 READY，匿名保护、owner 首页确认、登录后 13 页 DOM/图片/站内目标与 7 份资源字节抽验通过；完整远端响应在本次公开后立即核验，实机与三地区性能按 2.2.1 留到结束 Beta 前补齐。
4. **PB4 Public Beta 生产发布**：2026-09-10 已按 owner 授权推广同一部署、开放正式域名，并通过 140 文件及首页/核心正文 live smoke；Standard Protection 保留，两个部署网址仍要求登录。详细结果见 DEV_WORKFLOW；当前为 Public Beta，尚未结束验证。
5. **PB5 上线后 R2**：先关闭第 5.1 节的研究执行与数据门禁，再在同一 live artifact 上完成 R2a、冻结研究版本、执行 R2b、处置与复测。状态：未开始。
6. **PB6 正式 MVP 收口**：Project owner 关闭目标读者验证、复核 live/RUM 基线并决定结束 Beta。状态：未开始。

## 7. 本批验证与授权

- 本批只验证 Markdown 格式、严格 UTF-8、相对链接、占位符、差异完整性和跨文档路线一致性。
- 没有业务代码、Schema、内容对象、视觉资产或构建输入变化，因此不运行完整应用测试、构建或视觉生产检查。
- 本批不安装依赖、不启动服务、不执行真实联调、预览或生产发布。文档实施与验证阶段未执行 Git 写操作；PB1 验证通过后，Project owner 另行授权将本批文档创建本地提交，该授权不包含 fetch、push、预览或生产发布。

## 8. 当前最终结论

- Public Beta 路线已获确认；目标读者审核仍未执行，证据状态继续为 `PENDING HUMAN READERS`。
- 缺少 R2 样本不再阻塞图片、`relatedEntryIds`、视觉/状态审核、M6 public artifact、受保护预览或经独立授权的 Public Beta 生产发布。
- Public Beta 不是降低质量标准的预览替代物；既有内容、资产、技术、隐私、版本身份、预览和生产门禁保留，实机与三地区性能执行时点以第 2.2.1 节最新确认、目标读者效果验证以本文上线后合同为准。
- 正式阅读版范围已确认，Public Beta 已公开，状态仍为 `PENDING HUMAN READERS`。下一停点是按独立条件补齐真机、完整地区浏览器、真实 RUM 与 R2，再完成问题处置和 owner 收口；后移表单及视觉扩展包不阻塞本文关闭。新的外部服务、Git、Vercel 操作和发布仍须按对应范围单独授权。
