# 006 外部交互边界：开发与验收说明

## 0. 文档职责与状态

2026-09-10 本地检查点授权：owner 随后明确“提交一次吧”，将第 12.12 节的已验证候选与此前本地技术验收/RUM 一并保存。精确范围和 Git 入口见 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#分析与技术验收本地检查点2026-09-10)，提交身份以 Git 历史为准；下文未提交表述为实施快照。本轮不执行真实请求、Edge/CDP、服务、推送或部署，006 的其余门禁不变。

2026-09-10 GoatCounter 启用收尾：owner 在确认“已有接入，只需验证后开启并发布”的范围后要求处理。本批沿用四次合成收数及精确清理证据，既有账户的 production 采集候选、退出和对应 Privacy 已完成本地验证；Newsletter、Reader Request 与 RUM 继续关闭。尚未提交或发布，当前线上仍为关闭版。范围、结果与真实 Network 停点见第 12.12 节。

2026-09-09 当前停点：owner 要求停止继续表单测试并优先准备上线，按 [011](011-public-beta-validation.md) 进入阅读版 Beta。Tally 停在累计 3/10 次激活、后台 Completed 2 条；第 4 次及后续用例未执行，两条记录未清理。下文的剩余测试顺序仅保留为历史计划，不再自动继续。Newsletter、Reader Request、Analytics/RUM 均保持关闭；本合同的未完成联调和清理不记为通过，留到相应功能恢复前按范围处理。

本文负责：

- 固定 M5 的 Footer newsletter、Entry Reader Request、最小产品分析、隐私说明与 Mock/真实联调边界。
- 把浏览器输入、供应商记录、分析事件与 Web Vitals/RUM 分成可验证的窄合同。
- 定义表单、外部脚本、供应商域名和真实写入的默认拒绝、精确放行与退出规则。

本文不负责：

- 创建供应商账户、购买计划、接受 DPA、配置生产域名、写入真实数据或发送邮件。
- 实施 M6 public artifact assembly、最终发布候选 QA、受保护预览或 M7 生产发布。
- 新增账号、公开投稿、用户画像、支付、评论、Cookie 广告追踪或站内数据库。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | U3 子合同、U5 免费托管与本地接线已确认；U4 门禁保持 | owner 于 2026-09-09 核对 GoatCounter 设置，并完成已授权四次合成发送、收数及清理回查；请求头和完整处理/退出边界仍待验证 |
| 实施状态 | U2/U3/U5A、U5B 模块、M6 默认关闭 bootstrap 与 Newsletter 默认关闭准备完成；U4/U5 整体未完成 | public 每页包含唯一受审本站脚本和严格关闭配置；review 不输出脚本或配置。Newsletter/Reader Request 实际产物保持 inactive，内容和资产未变 |
| 验证状态 | 离线模块、public 脚本身份、真实产物无网络执行和 Newsletter 组件内存渲染验证通过；四次合成发送/收数/清理回查完成；Buttondown 托管页有限状态转换有证据 | GoatCounter owner 截图证明四类各一次、完整四路径及删除后同范围无筛选报表归零；Network 已关闭，请求头未验证。Buttondown 单邮箱 Unactivated → Regular 及随后 owner 确认真实退订完成见 12.8；记录清理、本站真实提交及最终候选 QA 未完成 |
| 发布状态 | 未发布 | 013 已有本地 public artifact、显式 origin 与 owner 提供的 Vercel 空项目；供应商生产配置、实际托管验收和部署仍未完成 |

- 当前权威结论更新时间：2026-09-09。
- M5 实现基线：本地 HEAD 与 `main` 当时为 `3983bee91ada4a286613ec702a8009a4f528af3f`，进入 M5 前工作树干净；当时未 fetch 的本地 `origin/main` 为 `e2893d1`。M5-U2 实施期间，该 tracking ref 于 2026-09-02 14:04:40 +0800 由外部 push 更新到 `3983bee`，三者在该批结束时对齐；本批未执行 fetch 或 Git 写入，tracking ref 不单独证明服务器端状态。后续版本身份以 README 与 `DEV_WORKFLOW.md` 的当前交接为准。

## 1. 结论与开发就绪判断

- 一句话结论：本地合同、默认关闭的 public analytics 接线及产物离线验证完成；GoatCounter 设置和独立四次合成发送/收数/清理回查已有 owner 证据，网站统计仍未启用。Buttondown 当前 `mythicworld` 的 action/部分设置及托管页单邮箱 `Unactivated → Regular` 状态变化已有 owner 证据，Newsletter 默认关闭的本地准备已完成，owner 又确认真实退订已完成；记录清理、本站真实提交和启用仍待验证。Tally 的 owner 预览显示确认及发布链接已取得，完整公开表单核验和真实联调仍待完成，M5 尚不能关闭。
- 业务代码进度：U2/U3/U5A 与 U5B 已完成本地实现和验证；M6 已用严格配置与唯一 bootstrap 接入 public 页面，review 零脚本。U4 真实联调、实际请求头、完整 M6 QA 与 M7 RUM/生产启用仍后置。
- M5-U2 阻塞项：无且已关闭。Reader Request 的 trim 后 3–240 Unicode code point、可选 email 最大 254 字符与 consent 配对，以及三个无应用自定义 properties 的 analytics 事件，均已冻结为本单元 provider-neutral 合同并由匹配测试验证。
- 后续门禁（不阻塞 M5-U2）：
  1. Tally 跨同一 workspace 持久化的 localStorage `Respondent ID` 与低成本人工清理风险已由 Project owner 接受；Free 表单的字段/通知配置、预览显示及 owner 提供的发布链接见 12.10；owner 已明确授权最多 10 次提交尝试，当前已用 3/10，原第 5 项被拦住且 owner 刷新后确认 Completed 仍为 1，此项通过，旧第 1 项失败保留；owner 已批准第 12.11 节的原始收集与编辑前筛选，后续按修订用例继续，删除另行确认。条件校验、生成标识、删除与 Empty Trash 行为仍须在 U4 验证，U2/U3 不接收、生成或保存该标识。
   2. Buttondown 方向、美国处理/DPA 边界、double opt-in、每月不超过两封及首次发送前关闭 open/click tracking 已获确认；历史账户称呼为 `mythic-china`，2026-09-09 后台当前 newsletter slug 为 `mythicworld`，不得据历史称呼改写实际 action。action/部分设置、托管页单邮箱状态转换及 owner 的真实退订确认见 12.8；账户级处理条款、实际传输、soft/hard delete、完整价格与退出能力仍待 U4 验证。
  3. GoatCounter 官方托管的当前免费适用性、真实 `/count` 地址、关闭 Sessions/明细/多余维度、90 天聚合保留目标与删除/退出能力须按第 5.4 节核查。离线实现不依赖真实账户；真实写入与 production 启用分别后置，不再以购买 Plausible 为进入条件。
  4. 公开隐私/数据权利联系邮箱、Newsletter/Reader Request 文案和阶段性 Vercel origin 边界已确认；U3 原先只生成 noindex review 页面；013 已接入本地 public artifact，016 已同步静态状态与条件式 hosting Privacy。
- 已确认的阶段决定：RUM/p75 延后 M7；M5-U2 只冻结 provider-neutral 字段、事件、清洗和失败语义，newsletter/request 转化仍只能使用供应商已接受记录的聚合结果。
- 下一步：本次四条合成统计已清理，预算用完，不重发。Network 关闭导致请求头证据缺失，留到以后独立授权的完整传输/生产验收；Buttondown 的真实退订已由 owner 确认，其测试记录精确清理仍待回查。Tally 的测试前零记录/空 Trash/测试邮箱归属已确认，本轮限次合成提交已用 3/10，首项空白建议落库而未通过合同，原 C 顺序已停止；owner 已确认先收集、编辑前严格筛选，第 12.11 节本地审核入口已通过验证，owner 已确认不勾选同意时提交被拦住且刷新后 Completed 仍为 1，匿名 abc 建议随后写入，当前 Completed 为 2，下一项为填写邮箱并明确同意；默认关闭的本地准备不再等待账户操作。

### 1.1 M5-U3 Project owner 决定（2026-09-02 历史记录）

本节保留当时决定；其中 Plausible 候选方向由 2026-09-08 的第 5.4 节 GoatCounter 合同替代，不回写 U3 的历史实现或授权。

- `Mythic China` 是站点品牌；Project owner 指定公开数据控制者标签为 `hyc`，所在国家/地区为 China（`CN`）。这是 Project owner 提供的公开身份，不构成对登记状态或特定司法辖区合规性的法律核验。
- 公开隐私与数据权利联系地址为 `huyichen2019@gmail.com`，负责人为 `hyc`；U3 以可复制纯文本展示，不新增 `mailto:` allowlist。
- 隐私权利请求通信在请求关闭后保留 60 天；届时由 `hyc` 从活动邮箱与 Trash 删除，法律要求继续保留的情况除外。该期限是项目运营规则，不是 Gmail 底层存储或备份级硬删除 SLA。
- Newsletter 只用于发送新文章和偶尔的编辑精选，每月不超过两封；使用 double opt-in，每封邮件提供退订；Reader Request 不得触发订阅。
- Buttondown 被有条件接受为后续 Newsletter transport；Project owner 接受本文记录的 DPA 与美国处理边界，并于 2026-09-04 确认 `mythic-china` 账户审核已通过。真实 action、账户级 DPA/设置、删除/导出及真实行为仍留 U4 验证；open/click tracking 从首次发送前保持关闭。
- Tally 被有条件接受为后续 Reader Request 托管页；Project owner 接受其跨同一 workspace 的持久 `Respondent ID`/localStorage 行为。`hyc` 每 28 天删除所有年龄不少于 60 天的提交，并在同次操作清空 Trash；`hyc` 是唯一执行人、无独立备份，Project owner 接受漏执行风险。供应商 ID 不进入本站 canonical record 或 analytics，邮件通知保持关闭。
- 上述 Tally 规则按时执行时，提交的实际运营保留窗口约为 60–88 天；因唯一负责人漏执行而延长的风险不得写成严格供应商保证。删除供应商记录或 Trash 也不等于已证明清除访问者浏览器中的 `Respondent ID`。
- Plausible 留在 M5-U5；U3 不添加脚本、hook、事件或远端请求。
- 当前不购买自定义域名。M6 经单独授权建立 Vercel 项目后，才确认稳定 production alias/hostname 并写入真实 origin；preview/commit URL 不得作为 canonical。
- 本次授权只覆盖本文合同更新、M5-U3 inert review UI 和匹配本地验证；不含账户、真实 action/link、外部写入、依赖、服务、Git、Vercel 或发布。

### 1.2 事实、推断与风险

2026-09-08 呈现更新见 [016](016-reader-facing-polish.md)：Newsletter/Reader Request 的 disabled 控件已移除，只显示未开放、不采集与 Privacy 链接。未来 double opt-in、独立同意和供应商运营合同保持；Privacy 增加条件式 Vercel 托管技术信息说明。013 已存在本地 public assembly 与 owner 提供的空项目/域名，本文较早的无 public/project 快照不定义最新部署准备状态。两种构建中的服务均未启用，尚未部署。


已确认事实：

- `SiteFooter.astro` 由共享 Layout 全站唯一渲染，并在 Footer 内挂载一个无控件、inactive 的 Newsletter 静态状态区（016）。
- `EntryTemplate.astro` 在 Sources、Collection/Related reading paths 后为全部六个 review/public Entry 各挂载一个无控件、inactive 的 Reader Request（016）；其他页面没有该入口。当前六篇均 published，两种 intent 通过页面 projection 取得各自输出；U5A 不被模板消费。
- `/privacy/` 在 review 中为 `noindex, nofollow`，public 本地构建输出其正式 metadata；当前精确 review inventory 为 14 页，包含六个 published Entry 和两个 published Collection。Privacy 显示 `hyc`、China、`huyichen2019@gmail.com`、60 天邮件运营保留规则，以及尚未启用的 Buttondown/Tally/GoatCounter 说明；U5B 已替换旧分析计划文案。
- Astro 仍为纯静态输出，没有表单 endpoint、分析依赖或浏览器测试目录；services 在 U2/U5A 基础上新增 analytics-record 与 GoatCounter 注入式 adapter，共六个模块。client/site-analytics.ts 已由 public 唯一 bootstrap 消费，静态配置固定关闭；review 不加载脚本，本站尚无真实分析请求。
- review output policy 继续默认禁止 `form`、`script`、事件处理器、供应商 link/action 和非本地子资源，并新增 inactive UI、Privacy、位置、唯一性及文案的 HTML5 DOM oracle；构建 verifier 继续要求零客户端 JavaScript。
- 本文、`CONTENT_MODEL.md`、`ARCHITECTURE.md` 与 `PROJECT_RULES.md` 已把浏览器 submission 与 provider/internal record 分开；M5-U2 的匹配 strict validator/Fake 已实现；M6 analytics bootstrap 现可注入 fetch，但配置固定关闭。Newsletter 原生 POST 分支已按 12.9 在默认关闭状态准备，实际产物无表单；Reader Request 仍无真实 transport。
- Project owner 于 2026-09-03 提供的账户现场事实为：Buttondown `mythic-china` 仍在人工审核且没有导入订阅者或发送邮件；Tally 由 `hyc` 以个人专业身份为 Mythic China 控制，使用 Free 计划并准备了未发布 Reader Request 草稿。该事实不提供 action、hosted link、编辑链接、凭据或供应商行为证明。
- Project owner 于 2026-09-04 补充确认 Buttondown `mythic-china` 账户审核已通过；这项用户提供的更新替代“当前仍在审核”状态，但不回写前一日历史快照，也不证明 action、账户设置、订阅者、邮件或供应商行为。
- 2026-09-09 的 Buttondown 现场更新见 12.8：当前后台显示 Mythic China / `mythicworld`，owner 提供原生 form、设置确认及同一测试邮箱的 `Unactivated → Regular` 截图；这不验证本站表单或嵌入 endpoint 的实际传输。
- 当前网站没有真实表单、邮件或分析写入入口；仓库外诊断工具已完成单独授权的四次合成发送，预算耗尽，不再使用其发送入口。

推断与依据：

- 纯静态原生 POST 或托管页外链能保持内容页静态和客户端无密钥，最符合当前架构；代价是成功/错误可能发生在供应商页面。
- 若坚持站内、可预测且可访问的成功/失败状态，以及服务端执行 email/consent 条件配对，则需要极窄同源 POST 边界；这会引入 adapter、运行配置和部署身份，不能作为普通组件改动顺手加入。
- GoatCounter 的显式事件和路径计数可用于最小产品指标；关闭 Sessions 后按发生次数聚合，能保持本站每次 page load 的阅读事件口径。本次四种合成路径与后台计数已对应，生产阅读触发、重复加载次数及实际请求头仍未验收；不能把它写成 Core Web Vitals p75 的 RUM 生产者。

未验证风险：

- Buttondown DPA 与美国处理边界已在项目合同层获 Project owner 接受；Buttondown 账户审核及 Tally Free 账户的证据来自 Project owner，Tally 发布链接与独立核查限度见 12.10。账户级 DPA 状态、subprocessor、数据位置、保留/删除、导出与退出流程仍未实证验收。
- Buttondown 托管页单邮箱从 `Unactivated` 到 `Regular` 的状态变化已有截图，owner 随后确认真实退订已完成；邮件正文/原始头、本站原生 form、CAPTCHA、重复订阅、错误页、服务不可用与记录清理尚未验证。
- Tally 的条件逻辑、隐藏 page ID、防垃圾、删除/Trash 和免费计划限制未在真实表单核查。
- GoatCounter 站点地址、90 天保留和八项额外采集关闭已由 owner 提供截图并确认保存；服务端实际清理、处理条款、导出/删除、传输字段、故障与目标地区可达性仍待验证。
- 当前控制面没有执行 M5 最终键盘、200%、JavaScript-disabled、网络失败或真实供应商跳转验收。

## 2. 背景、目标与成功标准

### 2.1 当前问题

M4 已完成本地内容页面和负向安全门禁，但读者还不能订阅、建议下一篇选题或产生可解释的产品信号。现有合同同时要求外部交互和默认阻断所有表单/脚本；如果不先冻结精确例外，最容易出现假成功、隐私字段漂移或全局放宽输出策略。

### 2.2 目标行为

- 任意公开页面的 Footer 只出现一个 newsletter 入口。
- 每个公开 Entry 在 Sources、Related Entries 之后出现一个 Reader Request 入口。
- newsletter 与 Reader Request 使用彼此独立的同意语义，不互相订阅。
- 自动化只访问 Fake/Mock，不访问真实供应商或网络。
- 公开隐私说明列明用途、字段、供应商、第三方域名、数据位置、保留、导出/删除、退订/退出和联系方法。
- 产品分析默认只采集回答当前产品问题所需的 pageview 与显式事件，不启用 autocapture、跨站追踪、完整 URL/query、表单正文或 PII。

### 2.3 可观察成功标准

- 页面位置、文案、字段、同意、成功/失败/不可用语义与隐私入口符合本文。
- 浏览器 submission 与 provider/internal record 有独立 Schema，未知字段失败。
- 任何允许的 `form`、`script`、action、src、事件名和 payload 都来自本文登记的精确 allowlist；其余继续失败关闭。
- Mock 覆盖成功、校验失败、供应商不可用、rate limit、timeout/unknown result 与日志脱敏。
- 真实联调只有在账户、环境、数据、数量、停止、回查和删除方式均获单独授权后执行。
- RUM/p75 在 M7 有且只有一个数据生产者；M5 不把普通 analytics 冒充 RUM。

### 2.4 产品指标责任

现有首轮指标仍是产品假设，不是当前基线。M5 只冻结数据来源，不在未上线时伪造数值：

| 产品问题 | 推荐数据来源 | M5 语义 |
| --- | --- | --- |
| 连续探索 | 显式 `related_story_click` + 聚合 Entry pageview/visit | 只记录成功激活的站内相关内容链接；不携带用户标识 |
| 75% 阅读深度 | `article_session_qualified` 分母与 `article_depth_75` 分子 | provider-neutral 语义已确认；U2 只冻结事件 allowlist，reading state 留 U5，且不得用页面加载代替 |
| newsletter 意愿 | Buttondown 已接受的订阅请求与 active subscriber 聚合 | 页面点击不等于成功；double opt-in active 与提交请求分开报告 |
| 选题参与 | Reader Request 供应商已接受的有效提交聚合 | 不向 analytics 发送建议全文或邮箱 |
| Web Vitals p75 | M7 独立 RUM | 不属于 GoatCounter M5 完成证据 |

GoatCounter 的 Related 点击次数用于观察探索信号；同一次加载可能发生多次有效激活，因此不能把点击次数除以阅读次数直接写成 PRODUCT 所述“有点击的会话占比”，也不能单凭该结果宣布 20% 阈值通过。不为补齐这一指标新增用户标识或改变既有事件触发语义，产品假设与可测证据分开报告。

“合格文章会话”的推荐定义见第 5.4 节；在 Project owner 确认和生产者启用前，不用普通 pageview 替代并宣称达到阈值。

## 3. 范围与边界

### 3.1 本期交付

- 一个已确认的 M5 详细需求合同。
- 纯 TypeScript interaction contracts、严格校验和 Fake adapters。
- Footer newsletter 与 Entry Reader Request 的单一组件边界。
- 一个公开 privacy 页面或等价稳定隐私入口。
- 精确 output allowlist 和匹配正反测试。
- 经确认的最小 analytics adapter/事件 allowlist。
- 按独立授权执行的供应商测试联调与证据。

### 3.2 本期不包含

- 账号、用户画像、公开投稿、评论、支付、广告、Cookie consent platform、数据库或 CMS。
- 在站内保存 subscriber list、Reader Request 原文或邮箱。
- 自动合并主题、票数、编辑排期、个性化推荐或向请求者自动发信。
- M6 public intent/runner、metadata、Sitemap/RSS、最终 artifact QA、远端预览或 M7 生产发布。
- 未经批准安装 `@astrojs/vercel`、分析 SDK、CAPTCHA SDK 或其他依赖。

### 3.3 不得改变的既有行为

- 内容、Source/Claim/Terminology、视觉资产、稳定 ID、slug、状态与 published-only 投影不变。
- 正文、Sources、导航和基本阅读在第三方失败及无 JavaScript 时继续可用。
- newsletter 只在 Footer；Reader Request 只在 Entry 阅读链末尾。
- review 构建继续 noindex，且不能因 M5 误变成 deployable public artifact。
- 非 M5 登记的 form、script、远程子资源、事件处理器与外部写入口继续被拒绝。

## 4. 当前事实与调用链

### 4.1 当前 Newsletter

```text
SiteLayout
  -> SiteFooter
  -> identity + Footer navigation
  -> 一个静态 inactive Newsletter 状态 + 不采集说明 + Privacy link
  -> 无 form / action / provider link / submission
```

### 4.2 当前 Reader Request

```text
EntryTemplate
  -> Sources
  -> Part of a collection（按内容存在）
  -> Related entries（按内容存在）
  -> 一个带稳定 Entry page ID 的 inactive Reader Request
  -> 无字段 / form / Tally link / submission
```

### 4.3 当前 Analytics

```text
review static build
  -> 零客户端 JavaScript
  -> provider-neutral event/envelope contract 与 Fake 未被页面消费
  -> 无 analytics provider / script / network / RUM
```

## 5. 推荐业务与数据合同

本节的 provider-neutral DTO、字段值域、三个事件、清洗与失败语义已为 M5-U2 确认；Buttondown 与 Tally 仍为 U4 的有条件 transport 方向。2026-09-08 Project owner 接受 GoatCounter 官方免费托管替代 Plausible，并自行准备注册账户；第 5.4 节是目标合同；后续 U5B 与 M6 本地接线已完成，2026-09-09 owner 的截图和保存确认提供账户设置证据。三项服务均未处理真实站点数据，analytics 默认关闭。
除非另有说明，供应商能力、隐私、保留与价格事实均于 2026-09-02 从下列官方页面核对；登录核查账户配置、购买、发布草稿或联调前必须重新只读复核，不能把本文快照或用户提供的审核状态当作永久条款。

### 5.0 公开隐私联系：Gmail

- `huyichen2019@gmail.com` 是 Project owner 明确同意公开的隐私与数据权利请求地址；读者主动发信时，Google/Gmail 可能处理发送者地址、邮件正文、附件和投递 metadata。
- 该邮箱只用于处理隐私、数据访问、更正、删除、撤回同意和投诉请求，不用于自动订阅 Newsletter 或接收 Reader Request。
- 请求关闭后 60 天，由 `hyc` 从活动邮箱与 Trash 删除对应通信，法律要求继续保留的情况除外。Gmail 官方说明，被删除的邮件先进入 Trash，可手动永久删除或在 Trash 中保留至多 30 天；因此本项目要求在 60 天到期操作中同时清理活动邮箱与 Trash。
- 60 天是项目运营规则，不是 Google 底层系统或备份级硬删除 SLA；Google 的一般删除与备份清理可能需要更长时间。本站不声称已有项目级 Google DPA、中国数据驻留或备份级 60 天保证。

官方证据：

- [Gmail 删除与清空 Trash](https://support.google.com/mail/answer/7401?hl=en_as)
- [Google 数据保留与删除过程](https://policies.google.com/technologies/retention?hl=en-US)

### 5.1 Newsletter：Buttondown 原生 HTML POST

推荐理由：

- 官方支持普通 `<form method="post">`，不需要客户端密钥或站内 JavaScript；供应商明确要求不要用浏览器 `fetch` 绕开 CAPTCHA/验证页面。
- 标准 signup form 默认要求 double opt-in，未确认的地址不进入 active subscriber；官方直接支持已验证 consent 的 API `type=regular` 与已确认名单 import，其他关闭 DOI 的流程才需供应商批准。本站不使用任何例外。
- 页面只需要一个 email 字段，迁移时主要替换 action 与供应商后台配置。

M5-U2 provider-neutral Newsletter Submission 只包含读者输入：

```yaml
email: reader@example.test
```

Buttondown transport envelope 按 owner 于 2026-09-09 提供的完整后台 form 仅包含 email。本地默认关闭准备可以先行；真实发送入口启用前仍须通过账户、退订/清理、Privacy 与精确输出门禁：

```yaml
email: reader@example.test
```

规则：

- U2 核心 DTO 与目标 transport 均只允许 `email`，未知字段失败；既有 DTO/Fake 不需修改。
- 当前官方通用示例仍含固定 `embed="1"`，但本账户完整后台 snippet 没有该字段。本次目标采用 owner 提供的最小 form，替代此前后置添加 `embed` 的计划；不据此断言该字段已被供应商废弃，也不建立有/无该字段的兼容分支。精确 action 为 `https://buttondown.com/api/emails/embed-subscribe/mythicworld`；默认关闭的本站配置与组件已通过 12.9 的内存渲染验证，实际 payload 尚未验证。
- 不采集姓名、生日、地域、兴趣标签、追踪 ID、metadata、tag 或 Reader Request 内容。
- form submission 本身只表示请求订阅；double opt-in 完成后才计为 active subscriber。
- 表单附近必须说明用途、频率、Buttondown 处理、double opt-in、退订和 privacy 链接。
- 公开频率已确认为“每月不超过两封，只发送新故事和偶尔的编辑精选”。
- 供应商记录的时间、IP、referrer 与状态不从浏览器隐藏字段传入。
- open/click tracking 默认保持关闭；启用会引入 subscriber-specific pixel/link rewrite，且当前 analytics add-on 另计费，必须另立需求和授权。
- 前 100 个 active subscribers 当前免费；cleanup 需要显式启用且默认只是 soft delete，hard deletion 要联系供应商开通，因此不能把 7/30 天 cleanup 写成硬删除 SLA。
- Project owner 已接受本文记录的 Buttondown DPA 与美国处理边界，并于 2026-09-04 确认当时称为 `mythic-china` 的账户审核已通过。2026-09-09 当前 newsletter slug、action、设置与有限订阅证据见 12.8；账户级 DPA 适用性、SCC/subprocessor、hard deletion/退出回查和实际使用功能的计费条件仍须 U4 核对。若条款自动适用，不虚构后台必须另有 DPA 开关；这些是实际发送入口启用门禁，不阻塞 12.9 的默认关闭本地准备。

官方证据：

- [Buttondown subscriber form](https://docs.buttondown.com/building-your-subscriber-base)
- [Buttondown double opt-in](https://docs.buttondown.com/double-opt-in)
- [Buttondown DPA](https://buttondown.com/legal/data-processing-agreement)
- [Buttondown subscriber cleanup](https://docs.buttondown.com/subscriber-cleanup)
- [Buttondown open tracking](https://docs.buttondown.com/open-tracking)
- [Buttondown click tracking](https://docs.buttondown.com/click-tracking)
- [Buttondown pricing](https://buttondown.com/pricing)

### 5.2 Reader Request：已条件接受的 Tally 托管页方向

推荐理由：

- 本站只提供可访问普通链接，不加载供应商 iframe/JS，也不在当前静态输出中开放第二个 form action。
- Tally 为比利时主体，官方说明 form data 位于 Google Cloud Belgium，并提供 DPA 路径。
- owner 已按独立草稿发布步骤提供真实托管链接，配置和页面核查限度见 12.10；首项空白建议测试已落库，未通过当时的提交前长度合同；owner 此后确认将严格文本校验移到编辑前，旧失败不改判通过，防垃圾、其余成功/失败和导出仍待受控联调，草稿结构与预览显示不证明这些真实行为。代价是页面跳出、较高供应商锁定，以及下述稳定 Respondent ID。

浏览器输入合同：

```yaml
pageId: zhong-kui
requestedTopic: A short reader suggestion
```

规则：

- `pageId` 是稳定 Entry ID，但来自 URL/隐藏字段时仍是不可信输入；供应商记录进入编辑流程前必须对已发布 Entry ID allowlist 复核。
- 2026-09-03 的未发布草稿包含 `pageId`、必填且配置为 3–240 字符的 `requestedTopic`、可选 `email`，以及填写 email 后触发的条件式 `emailConsent`；提交按钮文案为 `Send suggestion`，并已配置 thank-you page。以上只描述草稿结构，不证明发布后校验、可访问性、写入或成功语义。
- 2026-09-09 owner 确认“先收集、编辑前严格筛选”：Tally 保存的是未经审核的原始建议，其 Completed 状态不代表有效 Reader Request。保留原生 Required 与 3–240 字符设置，但不把供应商字符计数当作 trim/Unicode 合同，也不承诺它接受所有处于内部长度边界的 Unicode 输入。
- 进入编辑流程的 `requestedTopic` 仍须 trim 后为 3–240 个 Unicode code point，只允许纯文本，不允许富文本、URL 附件或上传。`hyc` 每次处理原始建议前执行本地离线审核；空白、越界或其他无效输入不进入选题池。已有 Submission/Record validator 不放宽，Tally 原始记录不直接作为其 DTO 或内部 Record。
- 编辑前审核还须核对实际来源记录、published Entry ID allowlist 及邮箱/明确同意配对；不得仅凭 Tally 表格中的 `-` 推断 null/false，不明值暂停人工核对。文本清洗只移除首尾空白，不猜测内容或同意。来源 submission ID/时间的信任核对和编辑判断不由字段校验替代，不把 Respondent ID 带入审核输入。
- 本地审核入口只从 stdin 读取人工明确映射的 Submission 字段，复用现有严格 validator，并从当前仓库 Entry 内容读取 published allowlist；输出仅包含通过/拒绝、字段名和字符数，不回显原文或邮箱，不写文件、不联网、不创建 Record、不自动接入 Tally。真实数据不进入命令参数、仓库、测试 fixture 或诊断日志。操作与验证入口见 DEV_WORKFLOW 的“Reader Request 编辑前离线审核”。
- `email` 与 `emailConsent` 均可省略，但必须同时省略或同时出现；显式空邮箱使用 `email: null` 与 `emailConsent: false`，非空 email 最大 254 个字符且必须配 `emailConsent: true`，该同意不得订阅 newsletter。原始建议先收集的决定仅改变建议文本校验时点，非空邮箱仍须由 Tally 在提交前要求明确同意，不得用事后筛选替代。
- Tally 需用条件逻辑保证 email/consent 成对；后台配置和真实联调必须留下可追溯证据。
- URL 只允许传非敏感 `pageId`；不得把 email、suggestion 或 consent 放入 query。
- Tally 会在 submission 时自动生成 `Respondent ID` 和 `Submission ID`；前者跨同一 workspace 的表单持久存在，并以 UUIDv4 存入浏览器 localStorage。Project owner 已接受并要求公开披露该风险；真实账户中的生成、持久性与可关闭行为仍须 U4 浏览器实证。
- 低成本运营规则已确认为：`hyc` 每 28 天删除所有年龄不少于 60 天的提交，并在同次操作中 Empty Trash。按时执行时，实际保留窗口约为 60–88 天；`hyc` 为唯一负责人、无独立备份，Project owner 接受漏执行导致窗口延长的风险。该规则不是供应商自动 retention 或严格上限保证。
- 默认不启用包含 submission 内容的 email notification；若未来启用，Tally 官方说明所用 SendGrid 可能在美国处理该内容，须重新完成供应商、披露与授权核查。

Tally provider envelope（仅在接受该候选后存在，不复制持久标识进内部 canonical record）：

```yaml
submissionId: provider-submission-id
respondentId: provider-persistent-id
```

- `respondentId` 是 Tally 自动产生的持久供应商标识，Project owner 已条件接受其未来由供应商处理；当前尚未启用，且本站不把它提升成内容 ID、analytics property 或内部归并键。

provider-neutral internal record：

```yaml
requestId: provider-generated-id
pageId: zhong-kui
requestedTopic: A short reader suggestion
email: null
emailConsent: false
createdAt: provider-timestamp
status: new
normalizedTopicId: null
```

- `requestId`、`createdAt`、`status` 与 `normalizedTopicId` 都不是本站浏览器 submission 字段。
- `createdAt` 只能来自 provider/server 的受信任时钟。
- `status` 与 `normalizedTopicId` 属于内部编辑流程，不暴露为公开输入。

官方证据：

- [Tally embed boundary](https://tally.so/help/embed-your-form)
- [Tally GDPR and DPA](https://tally.so/help/gdpr)
- [Tally form limits and export](https://tally.so/help/faq)
- [Tally Respondent ID](https://tally.so/help/prevent-duplicate-submissions)
- [Tally submissions retention](https://tally.so/help/submissions-data-retention)
- [Tally deletion and Trash](https://tally.so/help/how-to-delete-and-recover-form-data)
- [Tally pricing](https://tally.so/help/plans-and-pricing)

### 5.3 Reader Request 的站内替代方案

如果 Project owner 要求站内原生表单和可控 success/error，最小正确替代是极窄同源 POST adapter：

```text
Entry Reader Request form
  -> same-origin POST boundary
  -> server-side allowlist / length / page ID / email-consent validation
  -> selected provider
  -> 303 success or error route
```

该选择会增加：

- Astro/Vercel adapter 或等价 serverless 运行边界。
- 受控环境变量、密钥、速率限制、日志脱敏和 timeout/unknown result 处理。
- 供应商真实身份、部署配置、隔离测试环境与独立构建/验证入口。

这些变化不能从本地组件授权推导，须另行批准依赖、配置、环境与真实联调。

Formspree 原生 HTML POST 是站内表单候选，但当前只作为备选：

- 官方支持无 JS 的 HTML POST、字段配置、honeypot、reCAPTCHA、domain restriction 与 20 POST/min/form。
- 所有提交默认由 Formspree 保存；Free 当前为每月 50 次、30 天 history，CSV/JSON 导出属于付费能力。
- domain restriction 依赖 `Referer`，可能与严格 Referrer-Policy 或部分浏览器行为冲突；honeypot 命中会被静默忽略，因此浏览器成功响应不能单独证明记录已保存。
- 生产前仍须取得并审阅实际 DPA、美国处理/subprocessor、备份保留和删除 SLA。
- 未证明供应商能在所有计划下执行“email 非空时 consent 必须为 true”的条件校验，因此不得仅靠浏览器 `required` / `maxlength` 冒充服务端合同。

官方证据：

- [Formspree HTML forms](https://help.formspree.io/articles/building-your-form/building-an-html-form/)
- [Formspree server validation](https://help.formspree.io/articles/building-your-form/getting-started-with-workflow)
- [Formspree limits](https://help.formspree.io/articles/form-and-project-settings/system-limits)
- [Formspree account limits](https://help.formspree.io/articles/account-management/account-limits)
- [Formspree exporting submissions](https://help.formspree.io/articles/form-and-project-settings/exporting-submissions)
- [Formspree domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain)
- [Formspree honeypot behavior](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering)
- [Formspree security](https://formspree.io/security)

### 5.4 Minimal Analytics：GoatCounter 官方免费托管

2026-09-08 Project owner 已接受以下目标并授权继续，并随后提供统计站点地址。文档子批后，U5B 已实现未被页面加载的 adapter/DOM hook，并把 Privacy 及匹配 oracle 改为 GoatCounter 未启用计划；当前不发送真实请求，不能把账户目标写成已配置事实。

#### 预算与供应商边界

- 分析服务预算为零月费，使用开源 GoatCounter 的官方托管；不新增服务器、数据库、付费订阅或依赖。官方条款当前允许合理用量的公开个人和中小型商业网站免费使用，由捐赠支持；没有可据此承诺的永久免费或固定月度额度。
- 首次账户注册由 owner 手工完成，符合官方条款；只需向项目提供公开统计站点地址，不提供密码、验证码、恢复码或 API token。未取得真实地址前不填示例生产 endpoint。
- 若账户功能、用量或条款要求付费，或无法满足本节的数据/隔离合同，保持 analytics 关闭并重新决定方案；不自动购买、不切换自托管或其他供应商，也不把关闭统计视为 U5 已完成。

#### 计数与最小请求合同

- 统计的是页面加载和事件的发生次数，不是去重访客或个人会话。账户的 Sessions 必须关闭；GoatCounter 默认按路径/会话去重，会改变本站每次加载的分子、分母。`article_session_qualified` 保留既有事件名；PRODUCT 的“合格文章会话”仍指单次加载内的阅读判定，报表解释为合格阅读次数。分子、分母使用相同文章路径与时间窗口，不推导独立人数、个人漏斗或跨页旅程；拦截、网络丢失和机器人也可能影响计数。
- pageview 是独立的 provider-neutral 记录类型，不是第四个业务事件，覆盖批准的 production origin 下既定 public canonical 路由；三个业务事件只绑定 published `/explore/{slug}/` 来源文章路径。重复刷新作为新的一次加载，阅读事件在每次加载内各最多一次；Related 每次有效链接激活计一次，不因绑定多个监听器重复发送。
- 使用官方文档允许的公开浏览器 `GET /count` 与本地小型 adapter，不嵌入官方默认 `count.js`，不使用带密钥的后台 API 或代理服务器。当前官方脚本会额外发送页面 query `q` 与屏幕宽度 `s`；仅传清洗后的 path 或关闭后台维度不足以证明这些字段没有出站。
- provider mapping：普通 pageview 的 `p` 为规范 pathname，`e` 为 false；事件的 `p` 为 `事件名:规范文章 pathname`，`e` 为 true。例如 `article_depth_75:/explore/painted-skin/`，只在 adapter 边界编码。GoatCounter 用同一个 `path` 表示页面或事件且事件名不得以 `/` 开头，因此不另加应用 properties、page ID 或内容标题；`related_story_click` 归属来源文章，不发送目标文章 ID。
- 查询参数只允许 `p`、`e`，确需绕过缓存时可加每次请求重新生成且不持久化、不表示用户/会话的 `rnd`；不发送 `t/r/q/s`、完整 URL、query/hash、referrer、表单正文、邮箱、屏幕尺寸或应用标识。HTTP Referer 与 Cookie 也必须通过显式传输策略抑制，并在浏览器请求层验证；不能仅凭 query 白名单宣称合格。IP、浏览器默认 User-Agent 等技术信息仍会随网络连接被服务方处理。
- 传输方式须先通过离线测试，再在受控环境证明请求字段、请求头、缓存与导航行为。已发起 beacon、opaque 响应或 promise resolve 均不等于服务方已记录；不能返回虚构的 `recorded`。失败不影响阅读，不持久化队列、不自动重试、不回传输入或创建请求级用户标识。

U5B 离线实现选择 `GET` + CORS、omit credentials、空 referrer/no-referrer、no-store、keepalive 和拒绝重定向；无 body/额外 header，当前不需要 `rnd`。官方 [count handler](https://raw.githubusercontent.com/arp242/goatcounter/main/handlers/count.go) 提供 CORS 响应，本次独立 `file:` 工具已有四次可读 HTTP 200 与账户收数证据；生产站点的 Origin、Cookie/Referer 等实际请求头仍待验证，Privacy 保留技术信息披露。失败不切换 no-cors 或像素 fallback。官方 [路径处理](https://raw.githubusercontent.com/arp242/goatcounter/main/hit.go) 会去掉普通 pageview 的尾斜杠，而事件保留内部路径的尾斜杠；本次 Manage pageviews 完整四路径已观察到这一差异，发送端规范路径不变。

#### 隐私、保留与退出

- 项目不使用 Cookie、localStorage、跨站追踪、应用用户/会话标识或 autocapture；账户必须关闭 Sessions、individual pageviews 明细，以及不需要的 referrer、浏览器/系统、位置/地区、语言和屏幕维度。关闭设置只是目标，仍须核对供应商实际处理、请求与存储范围。
- 官方隐私说明区分聚合表、可选单条 pageview 明细及服务端内存中的 IP/UA 会话映射；后者默认最长约八小时，不能因无 Cookie 就声称完全不处理 IP/UA。运营者位于爱尔兰，官方托管使用 Hetzner 的芬兰/德国设施；这不是本站账户的数据地区或适用合规要求已经验收的结论。
- 聚合统计保留目标为 90 天。2026-09-09 owner 的免费账户设置截图与保存确认已核对该值为 90；实际清理行为仍须在启用前核查，不将设置值等同于备份删除 SLA。明细保持关闭，长期项目记录仅保留不含个人数据的必要汇总。
- 启用前同步公开 Privacy：用途、按次数口径、精确第三方域名、请求与技术信息、处理地区、实际保留、访问/导出/删除、联系和退出。适用的账户条款、数据处理依据及需否同意仍须结合真实账户确认，不能从“免费/无 Cookie”自动推导豁免。
- 退出先关闭发送并验证生产及非生产均为零请求，再按单独授权导出必要汇总、删除测试/站点数据或账户；官方说明账户删除后的备份可能保留至多 30 天。核查可用入口不等于已执行删除；若用按路径清理测试数据，必须限定本次测试路径与数量并回查。

#### 已确认的阅读语义（复用 U5A）

- `article_session_qualified` 只在 production public Entry 上触发一次：主故事阅读区域至少进入视口一次，且页面处于 visible 状态的累计时间达到 15 秒；页面隐藏时计时暂停。刷新后重新计算，不持久化跨页或跨访问者标识。
- `qualified` 与 `depthReached` 是同一 page load 内彼此独立的 predicate。`depthReached` 在视口底部首次越过主故事阅读区域从起点到终点的 75% 位置时置为 true；Quick Answer、Sources、Related Entries、Reader Request 与 Footer 不进入深度分母。
- `article_depth_75` 在两个 predicate 都为 true 时触发一次，顺序无关：可以先满 15 秒后越过 75%，也可以先越过 75% 再满 15 秒；刷新后两个 predicate 和 once-only 状态全部重置。
- 两个事件都不添加应用自定义 properties；页面路径由已确认的 analytics envelope 提供，必须去除 query/hash，不能添加 page ID、内容标题、用户或会话属性。

当前三个业务事件：

| 事件 | 触发语义 | 允许 payload |
| --- | --- | --- |
| `article_session_qualified` | Entry 主故事进入视口且累计 visible 15 秒 | 无应用自定义 properties |
| `related_story_click` | 用户成功激活站内 Related Entry 链接 | 无应用自定义 properties |
| `article_depth_75` | 同一 page load 的 qualified 与 depthReached 均成立，顺序无关且只触发一次 | 无应用自定义 properties |

未来 `outbound_recommendation_click` 尚无入口，不进入本期 allowlist 或实现。

事件不得用于重建个人会话。Newsletter 和 Reader Request 的按钮点击、表单跳转或 analytics beacon 均不得改名为 submit success；对应转化只能以 Buttondown/Tally 已接受记录的聚合结果计算。

官方证据（2026-09-08 核对）：[免费托管与开源](https://www.goatcounter.com/)、[服务条款](https://www.goatcounter.com/help/terms)、[Sessions](https://www.goatcounter.com/help/sessions)、[事件](https://www.goatcounter.com/help/events)、[公开像素接口](https://www.goatcounter.com/help/pixel)、[JavaScript 接口](https://www.goatcounter.com/help/js)、[默认脚本源码](https://github.com/arp242/goatcounter/blob/main/public/count.js)、[隐私与删除](https://www.goatcounter.com/help/privacy)、[保留设置源码](https://github.com/arp242/goatcounter/blob/main/settings.go)。供应商后续变化须在账户与生产启用前复核；历史 Plausible 依据仍保留在 REFERENCES。

### 5.5 Web Vitals/RUM：冻结最小合同，启用延后 M7

M5 不安装性能 beacon，也不把 GoatCounter 产品分析写成 RUM。以下 provider-neutral 最小合同及“启用延后 M7”已获 Project owner 确认；更换分析供应商不关闭或放宽此合同，M7 仍须另行选择、验收并授权供应商：

- 只采集 production public 页面上的 LCP、INP、CLS，并以 p75 观察；review、local、preview、测试与自动化流量必须隔离且不得发送。
- MVP 推荐 100% production sample；若费用或供应商上限要求降低，必须在 M7 单独确认固定 sample，不能按用户、地域或内容动态画像抽样。
- 允许的页面信息最多为 HTTPS origin、去除 query/hash 的 pathname、粗粒度页面类型和设备类型；不允许 email、Reader Request、完整 referrer、稳定用户/会话 ID、内部内容状态或自定义业务 payload。
- 不预设 Cookie/consent 豁免。启用前必须记录适用 lawful basis、DPA、subprocessor、数据地区和公开 privacy notice；若适用规则要求 consent，则未取得前不发送 beacon。
- 可识别页面/设备维度的供应商数据保留上限为 6 个月；供应商默认更短时采用更短值。长期项目记录只保存不含个人或细粒度路径的聚合基线。
- 第三方请求域名、脚本 URL 与属性进入精确 allowlist；退出时删除脚本和配置、验证零请求，并按供应商能力删除 site data、终止计划/DPA 后记录回查结果。
- 同一 production artifact 只能有一个 RUM producer，不能同时启用 Cloudflare RUM 与 Vercel Speed Insights。

M7 在真实 Vercel 项目、origin、计划和 DPA 确认后只选择一个生产者。当前两项都只是待实证候选，尚未证明满足上述最小合同：

- Vercel 基础 Speed Insights 只有 RES、10k events/30 天共享额度和最长 7 天 dashboard date range；完整 LCP/INP/CLS 需要 Speed Insights Plus，在 Pro 上当前为 $10/project/月并另有超额费，在 Enterprise 中包含。Pro 当前平台费 $20/月；10k 免费额度超限时基础采集会暂停 14 天。它还会处理 URL/route、网络、浏览器、设备/OS、国家与 element selector 等字段，且 30/90 天只是 dashboard date range，不是删除或存储 SLA。Vercel DPA 只覆盖 Pro/Enterprise，主要处理设施在美国、可全球处理且 Customer Data 备份会全球复制；Speed Insights 的实际数据分类、字段裁剪与六个月内删除证据仍须以真实账户验收。
- Cloudflare Web Analytics 当前免费并可查看六个月，但免费客户默认排除 EEA/EU/UK/CH 的 RUM；beacon 含 page-load ID、landing/referrer URL、resource timing/URL、CSS/element selector 与 CLS layout 信息、浏览器/OS/国家等字段，IP 在接收边缘丢弃但处理可发生在不同地区。未采样明细仅 7 天，之后聚合到约 10% 且查询仍会动态采样；广告拦截器会造成缺样，CLS 又只在 Chromium 可用，Firefox/Safari 不提供该指标。区域化元数据控制属于 Enterprise Data Localization Suite，且必须证明覆盖本 Web Analytics 数据集。因此免费不等于满足目标地区覆盖、跨浏览器 LCP/INP/CLS、字段最小化或稳定 p75 门禁。

M7 仍须冻结供应商标识、精确域名、实际 sample 与供应商计划/保留/导出/删除值，并用真实 network/dashboard 证据证明地区覆盖、字段和 p75 口径；不能重开上述数据最小化、环境隔离、6 个月上限或单一生产者合同。若两项都不满足，则保持 RUM 关闭并另立供应商决定，不能降低门禁冒充完成。

官方证据：

- [Vercel Speed Insights privacy](https://vercel.com/docs/speed-insights/privacy-policy)
- [Vercel Speed Insights metrics](https://vercel.com/docs/speed-insights/metrics)
- [Vercel Speed Insights pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)
- [Vercel platform pricing](https://vercel.com/pricing)
- [Vercel DPA](https://vercel.com/legal/dpa)
- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/)
- [Cloudflare RUM privacy](https://developers.cloudflare.com/speed/observatory/rum-beacon/)
- [Cloudflare Core Web Vitals](https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/)
- [Cloudflare Data Localization](https://developers.cloudflare.com/data-localization/)

### 5.5.1 发布后 RUM 实施方案（2026-09-10）

本节最初为候选设计；owner 随后要求实施 RUM，并明确“还没有账户，先完成本地实现”。本地范围及结果由 [017](017-real-user-monitoring.md) 维护，当前仍不启用采集。复核结果仍不能证明 Vercel Speed Insights 或 Cloudflare Web Analytics 的默认 beacon 满足第 5.5 节全部字段、地区和保留要求；不直接开启它们。Google PSI 的实验室分数和 Globalping 的地区 HTTP 结果也不是本站的真实用户 p75。

已确认的本地方案为 **Google web-vitals → 自有 Cloudflare Workers Free 接收端 → 仅服务 RUM 的 D1 最小存储**。静态阅读页面保持，架构仅新增 RUM 专用接收/存储边界；017 固定四字段及测量语义。已锁定 web-vitals 6.2.1 并实施默认关闭代码，不代表创建 Cloudflare 账户、真实数据库、接受 DPA 或启用生产采集。

| 项目 | 候选设计与启用前完成标准 |
| --- | --- |
| 客户端 | 只使用 `onLCP/onINP/onCLS`，显式映射指标名和数值；不使用 attribution 包，不上传整个 metric 对象。默认不上传 pathname、设备等可选维度，不采集 referrer、DOM、资源 URL、email 或用户/会话 ID |
| 测量去重 | 017 已确认仅在当前指标实例内有效的随机 `measurementId` 及递增更新序号；不跨导航关联，不写 Cookie、localStorage 或其他浏览器存储。多次后台回调更新同一指标实例，乱序旧值不能覆盖新值；BFCache 新实例重新生成随机 ID，不传库原始 ID |
| 环境和流量 | 只允许正式 origin 与 public artifact，默认关闭；local/review/preview 不加载或发送。合成测试使用离线 Fake，启用前冻结自动化和维护检查的禁发机制。Origin/CORS 只限制来源，不证明请求来自真人；没有可验收的自动化隔离办法时不启动基线窗口 |
| 接收与有效性 | 严格字段白名单、允许的指标名、有限非负数值及请求体大小；只保存指标、测量标识、更新序号和必要的 UTC 接收时间。应用不保存 IP、请求头或原始正文。缺失浏览器指标、不发生交互时缺失 INP 均记缺样，不能补零；有效样本数按去重后的指标实例计，不能称为独立读者数；指标值仍为 LCP/INP 毫秒数或 CLS 分值 |
| 窗口与统计 | 017 固定 UTC 连续 14 个完整自然日，以指标实例首次接收日期归窗；数据库时间封死截止写入并冻结快照，迟到更新不得倒改结论。每指标实际去重有效数 `n ≥ 50` 才报告排序第 `ceil(0.75 × n)` 个值作为 p75；保留 011 的缺样处理，不根据结果降低门槛。具体起止日期仍在真实启用前冻结 |
| 成本和失效 | 使用 Free 计划，不自动升级。配额拒绝、清理失败、异常丢失或采集暂停必须使相应窗口失效或明确不完整，不能默认为零或继续标成完整基线；上线前验证拒绝路径和成本停止条件 |
| 保留、日志、退出 | 建议活动记录保留 30 天并定时删除，长期只保留无测量标识的聚合结果。显式关闭 Workers 持久日志和 invocation logs，不记录请求正文/头，不启用 Tail/Logpush。退出时关闭唯一 producer、验证零请求、删除 D1 数据并核对恢复窗口、供应商其他备份与账户终止处理 |

官方能力核查（访问于 2026-09-10）：

- [web-vitals](https://github.com/GoogleChrome/web-vitals) 支持发送至自有 endpoint；生命周期内重复回调与 ID 的语义要求接收端正确更新同一测量。库的支持范围与真实浏览器缺样仍须实证。
- [Workers 定价](https://developers.cloudflare.com/workers/platform/pricing/) 的 Free 额度为 100,000 请求/日、每次 10ms CPU；[D1 定价](https://developers.cloudflare.com/d1/platform/pricing/) 的 Free 额度为 500 万读行/日、10 万写行/日、总计 5GB，超限会拒绝相关操作。计划价格需在实际开通前复核，不把免费额度当服务可用性承诺。
- [D1 SQL](https://developers.cloudflare.com/d1/sql-api/sql-statements/) 支持按实际保存值排序计数；[Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/sampling/) 使用自适应采样，加权计数与加权百分位不能无条件当作未经采样的原始总体，所以不选作本方案精确样本数的唯一账本。
- [D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/) 在 Free 下另有 7 天恢复窗口；30 天活动数据清理不代表即时物理删除。[Workers 配置](https://developers.cloudflare.com/workers/wrangler/configuration/) 与[日志文档](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)支持关闭持久日志，但不证明平台不处理网络 IP 或安全日志。
- [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) 包含 Self-Serve Subscription Agreement；实际账户的适用 DPA、subprocessor、lawful basis、必要 consent 和公开 Privacy 尚未确认。[D1 数据位置](https://developers.cloudflare.com/d1/configuration/data-location/)的 jurisdiction 不证明全部 Worker 处理限定在同一区域，也不能代替美东/美西/欧洲可达性检查。

本地实施与字段、重复/乱序、缺样、跨日窗口、p75、存储失败和清理测试见 017。当前已安装 web-vitals，未创建 Worker/D1、未接受新条款，RUM 仍关闭。真实 endpoint、Free 计划、Privacy、处理条款及传输/退出证据齐备后，冻结日期与脚本身份，再进入单独生产启用。足够样本的本地计算结果仍要求运行复核，不自动证明无机器人、配额丢失或 Beta 已达标。

## 6. 目标技术与设计

### 6.1 当前 U3 与后续目标调用链

```text
U3 Footer Newsletter
  -> 静态 inactive 状态 + 不采集说明 + local Privacy link（016）
  -> stop: no form / action / network

U3 Entry Reader Request
  -> inactive disclosure + stable local page ID + local Privacy link
  -> stop: no fields / Tally link / network

U4 target after separate authorization
  -> exact Buttondown native POST / exact Tally hosted link
  -> provider validation / result / deletion verification

U5/M6/M7 target after separate authorization
  -> offline GoatCounter contract + adapter + hook
  -> verified account + public artifact gates / production enablement
```

### 6.2 组件职责

- `NewsletterForm`：当前两种构建继续输出 016 的 inactive/不采集状态和本地 privacy 入口；12.9 补默认关闭的精确原生 form 分支，只在 Node 内存渲染中验证，不读取 Reader Request，不增加脚本或网络调用。真实启用保留独立门禁。
- `ReaderRequest`：当前按 016 只负责简短未开放/不采集说明、稳定 page ID 和本地 privacy 入口；未来用途/字段/独立 consent 合同留在 Privacy，不渲染输入、按钮或 Tally 链接，也不订阅 newsletter。U4 才能在单独授权后增加精确 hosted link。
- `Analytics`：只负责显式事件 allowlist 与发送边界；不得扫描表单字段或自动采集 DOM 内容。
- `Privacy` 页面：U3 review 页面公开控制者联系入口、Gmail 运营规则，以及三类尚未启用的供应商计划、目的、字段、地区、保留、删除/导出、退订/退出与投诉路径；不得把未来计划写成当前处理事实。

### 6.3 静态与客户端 JavaScript

- U3 的 inactive Newsletter 与 Reader Request 不使用客户端 JavaScript，也没有第三方依赖；未来获批的原生 POST/托管外链目标方案同样不应要求站内客户端 JavaScript。
- GoatCounter 是本期唯一分析目标。U5 实现 provider-neutral pageview/事件合同、最小 `/count` adapter、条件 hook 与离线 fixture/policy 测试；review 不输出客户端脚本。M6 只精确放行本站生成的 analytics bootstrap，核对 emitted 文件及摘要，不全局放行 `.js` 或远程脚本；M7 才在 production 启用真实发送。
- `public` 构建不等于 production 启用。配置默认关闭；运行时还须核对实际 `location.origin` 与批准 production origin 完全一致、当前路径在发布清单内。local、review、preview 和自动化均为零供应商请求；同一 public artifact 放在 preview 也不能因 canonical 指向 production 而发送。
- review 构建默认不连接真实 analytics 或真实写接口。浏览器 UI 评审只能显示明确不可提交的 review 状态，不能假成功。U4 默认关闭准备允许在 Node 内存中渲染真实组件及精确 action，以网络陷阱证明零请求；此 HTML 不写入文件、不提供 HTTP 服务、不在浏览器打开，实际 review/public 输出继续不含表单或 action。
- 无 JavaScript 时正文、Sources、导航、U3 inactive 说明和 Privacy 仍可用；未来真实交互及 75% depth analytics 的故障都不能影响阅读。

### 6.4 Output allowlist

U3 已保持并加强 review 默认拒绝：

- 所有 review 页面继续拒绝 `form`、`script`、供应商 action/link、inline event handler、远程子资源与客户端 JavaScript。
- HTML5 DOM oracle 要求 14 个当前 review 页面各在 Footer 内恰有一个 inactive Newsletter；只允许六个 Entry 在 Sources 与 reading paths 后各有一个匹配 page ID 的 inactive Reader Request，其他八页不得出现。
- `/privacy/` 必须显示已确认联系和真实的“当前未启用”状态，并拒绝 `mailto:`、占位符或可能触发提交的结构。
- U4 若获独立授权，才可为 Footer 中一个精确 Newsletter form 和一个精确 Tally HTTPS anchor 新增窄 allowlist；action/link、字段、method、账户和测试数据必须先写回本文。U5/M6/M7 的 GoatCounter fixture、public 本地 bootstrap 接线与 production `/count` 请求分别验收；HTML 不直接引用第三方脚本或像素，避免运行时门禁前出站。
- 禁止 inline event handler、任意 fetch、未知字段、远程 CSS/字体/图片、anchor ping 与 query 中的 PII。

### 6.5 隐私、安全与可观测性

- 客户端无密钥；仓库不保存 subscriber list 或 Reader Request。
- 自动化网络 transport 必须由 Fake 注入；任何意外真实网络调用都失败。
- 日志只能记录错误类别、provider 名与不含 PII 的 request correlation；不得记录完整 email、建议、URL query 或供应商 token。
- timeout/断连/unknown result 不自动重试真实写入；先只读回查 provider 状态。
- newsletter 与 Reader Request 各自有独立同意和删除/退出路径。
- 公开隐私联系入口已经确认并存在于 review/public 两种本地输出；016 已补条件式 hosting 说明。实际托管配置和 provider 状态仍须复核，不能把本地 public 页面视为已发布或账户验收通过。

## 7. 影响清单

| 类型 | 新增、修改或删除 | 目标文件、对象或系统 | 目标行为 | 对应验收 |
| --- | --- | --- | --- | --- |
| 需求 | 新增 | 本文 | M5 业务、数据、隐私、供应商与实施单元合同 | 文档门禁 |
| 当前事实 | 后续内容批同步 | README、DEV_WORKFLOW、001、003、007–009 | 保留 M4 历史 8 页与 U3 历史 9 页；四个 draft Entry 与 Liaozhai Collection 后当前为 14 页/六个 Reader Request，两个三篇路径已接线；U4 账户准备事实与下一停点不变 | 文档状态一致性/Git 只读核查 |
| 领域合同 | 当前修改 | PRODUCT、ARCHITECTURE、CONTENT_MODEL、REFERENCES | 同步已确认的公开隐私、保留、同意、供应商准备状态、无自定义域名与 canonical 边界 | 文档合同一致性/链接与格式回归 |
| 纯合同/Mock | 当前新增 | `src/services/`、`tests/services/` | 严格 DTO、Fake adapter、脱敏失败与零网络 | M5-U2 |
| 页面/组件 | 当前新增/修改 | Footer、Entry、Privacy、样式 | 单一 inactive Newsletter/Reader Request、review 隐私入口 | M5-U3 |
| 输出策略 | 当前修改 review；public 后置 | review policy、verifier、site tests | U3 默认拒绝、inactive DOM oracle；真实放行后置 | M5-U3/U4 |
| 外部供应商 | Buttondown/Tally 账户准备已发生；GoatCounter 设置由 owner 截图/保存确认 | Buttondown、Tally、GoatCounter | Buttondown/Tally 未接线；GoatCounter 本地默认关闭接线完成，真实测试与生产分别验收 | M5-U4/U5 |
| 依赖/锁 | 当前无 | package/lock | 推荐静态方案不需要新增依赖 | inventory 回归 |


### 12.6 2026-09-04 内容证据批对 inert review UI 的影响

后续内容批在独立授权下新增四个空 draft Entry；由于 review 动态路由与 `EntryTemplate` 对所有 non-archived Entry 使用同一结构，它们自动增加四个 direct-only review 页面，并各自继承一个既有 inactive Reader Request。本批没有修改 Newsletter、Reader Request、Privacy、CSS、service DTO、provider 边界或页面行为。

- `verify-m4-u2-output.mjs` 在该批把四个新路径及稳定 Entry ID 纳入精确映射；当时 oracle 要求 13 页各一个 Newsletter、六个 Entry 各一个匹配 ID 的 Reader Request，其他七页零 Reader Request。009 后续将 Liaozhai Collection 纳入当前 14 页合同。
- 仍无 `form`、action、Tally link、Buttondown link、provider script、字段、提交或网络；新增页面不扩大 U4 授权，也不把 draft 变成公开内容。
- M5-U3 的 9 页/两个 Entry 验证继续作为当时历史证据；该内容证据批的完整 `pnpm run check` 当时验证 13 页、每页唯一 Newsletter、六个 Entry 各一个匹配 ID 的 Reader Request、42 Hero、10 WOFF2、0 XML 与 0 客户端 JavaScript。后续当前门禁结果见第 9 节；浏览器/键盘/缩放仍未执行。
## 8. 实施拆分

### M5-U1 详细合同冻结

- 目标：确认供应商、transport、字段、隐私、指标和环境矩阵。
- 当前状态：截至 U1 收口时，供应商研究与上位合同同步完成；Project owner 已确认足以进入 U2 的 provider-neutral 子合同，当时供应商/公开隐私决定仍作为 U3–U5 后续门禁。
- 不交付：业务代码、账户、配置、真实数据、服务或部署。
- 完成条件：阻塞项均有明确值；本文和上位合同一致；开发就绪为“是”；文档验证通过。

### M5-U2 纯合同与 Mock

- 目标：建立 provider-neutral submission/event 合同和 Fake adapters。
- 进入条件：Project owner 确认严格 DTO、字段值域、事件 allowlist、失败语义、Fake/Mock 与零网络边界；已满足。
- 当前状态：已完成；代码、定向测试、完整工程与文档门禁通过。
- 交付：
  - Newsletter submission validator。
  - Reader Request Submission 与 provider Record 的独立 validator。
  - Analytics event allowlist。
  - Fake success、validation、unavailable、rate-limit、timeout/unknown result。
- 不交付：页面表单、真实网络、供应商 SDK、配置或存储。
- 修改位置：`src/services/newsletter.ts`、`src/services/reader-request.ts`、`src/services/analytics.ts`、`tests/services/external-interactions.test.ts`，以及精确 architecture inventory。
- 完成条件：未知字段失败；长度、page ID、email/consent、provider timestamp、不添加应用 PII properties、provider-neutral envelope 归一化、错误脱敏和 no-network 均有正反测试。

### M5-U3 页面入口与隐私

- 目标：实现 Footer 单一 newsletter、Entry 单一 Reader Request 和公开 privacy 入口。
- 进入条件：公开联系邮箱、供应商方向与文案已确认；已满足。
- 当前状态：已完成 noindex review 页面实现与完整本地门禁；该单元没有创建账户。后续已发生的账户/草稿准备见 12.4，action/link、发布、写入和供应商失败行为仍后置 U4。
- 不交付：真实写入或 analytics。
- 完成条件：语义顺序为 Sources → Related/Collection path → Reader Request → Footer；当前静态状态、说明、可用 Privacy link 的可见 focus、移动布局和零 JS/零第三方依赖由源代码与构建输出 oracle 验证。016 已移除 disabled 控件，不再要求 label/输入/按钮；真实第三方失败行为属于 U4，不是 U3 完成证据。

### M5-U4 供应商配置与测试联调

- 目标：对已审核通过的 Buttondown 账户，并在 Tally 草稿另获发布授权后，验证 action/link、字段、double opt-in、条件 consent、CAPTCHA、重复、429、错误、保留、导出与删除。
- 当前状态：Buttondown 后台 action/部分设置及托管页单邮箱 `Unactivated → Regular` 已由 owner 提供证据；默认关闭的本站准备已完成，owner 已确认真实退订；记录清理、实际 payload 与本站真实启用仍未验证。Tally 已取得 owner 提供的发布链接，首项测试后的原始收集/编辑前筛选决定及离线入口见 12.11；完整公开表单核验与其余真实联调待完成，U4 保持未完成。
- 授权：每个供应商单独记录账户、计划、环境、合成数据、写入数量、停止、回查与删除；测试邮箱必须由 Project owner 明确控制。
- 完成条件：真实行为与本文一致；unknown result 不重复写；测试数据已回查并按计划删除。

### M5-U5 Minimal Analytics 合同与条件 Hook

- 目标：交付 provider-neutral pageview/事件合同、GoatCounter `/count` adapter、条件 hook 和离线 fixture/output-policy 测试；复用 U5A，M7 RUM 责任保持独立。
- 进入条件：Project owner 于 2026-09-08 接受第 5.4 节免费托管、次数口径、最小请求、90 天保留目标与退出方案并要求继续，足以进入文档及离线实现；真实账户设置不是离线单元的前置依赖。
- 不交付：账户创建/修改、真实请求、production 启用或最终 public artifact 验收。M6 已有本地 origin/public assembly，但其存在不替代 analytics 的配置/隔离验收。
- 完成条件：review/noindex 零脚本；离线 fixture 只允许精确本地 bootstrap 与请求合同，不调用真实 transport；无 PII/autocapture；reading state 覆盖 qualified→depth、depth→qualified、hidden pause/resume、once-only、refresh reset 与非故事区排除。local/preview、错误 origin/路径/配置均零出站，Related 键盘/有效激活保持原导航，第三方失败不影响阅读。M6 验证同一 public artifact 的条件接线及 Privacy，M7 才启用生产 analytics 并选择、启用唯一 RUM producer。

#### M5-U5A 阅读状态离线判定

- 2026-09-07 Project owner 授权继续开发不涉及账号的部分。本单元只落实第 5.4 节既有的阅读语义，不确认 Plausible 费用、账户或供应商接线，也不启动 U5 的条件 hook。
- 目标：纯内存函数消费调用方显式提供的单调毫秒时间、页面 visible 状态、主故事区域和视口的同坐标系纵向边界，返回新状态及零至两个既有无 properties 事件；不访问 DOM、时钟、配置、存储、adapter 或网络。
- 实施选择：初始化明确传入起始时间与可见性，每次观察先按上一次可见性结算区间，隐藏区间不累计；时间必须有限、非负且不倒退。故事区域为 null 时代表尚未测得，只累计页面可见时间，不推断正文或深度。
- 几何合同：有限且正高度的故事/视口边界；仅 visible 观察可更新故事曾相交与 75% predicate。深度阈值为故事起点加故事高度的 75%，视口底部达到阈值即满足，不能以整个文档高度或 Quick Answer、Sources、Related、Reader Request、Footer 作为分母。真实 DOM 中的区域选择与测量仍由后续 hook 单独实现和验收。
- 完成标准：两种 predicate 顺序、恰好 15000 毫秒/75%、隐藏暂停/恢复、先计时后入视口、重复观察、重新初始化、区域缺失/非法输入、非故事区排除和不改变输入均有离线测试；事件使用 U2 的既有 allowlist，不增加页面或访问者标识。
- 修改位置：新增 `src/services/article-reading-state.ts` 与 `tests/services/article-reading-state.test.ts`；架构测试登记唯一允许的 type-only 事件依赖并继续禁止页面消费、网络和持久化；README、ARCHITECTURE 与 DEV_WORKFLOW 同步范围和验证。
- 当前状态：离线单元已完成，21 项专属测试及完整本地门禁通过；U5 整体、真实环境隔离、hook、供应商联调及生产采集均未完成。所有服务、依赖、配置、Git、账号及发布授权边界保持。

#### M5-U5B GoatCounter 替换与离线接线（2026-09-08）

2026-09-09 账户设置核对：owner 提供后台截图并明确确认保存成功；保留天数为 90，Individual pageviews、Sessions、Referrer、User-Agent、Size、Country、Region、Language 均关闭。前一张截图的看板权限为 Only logged in users。证据来自 owner 的截图与保存确认，不表示清理任务、网络字段、导出/删除或实际报表已验收。owner 随后授权继续本地页面接线。

本次 M6 接线合同：public 每页输出一份由已验证 assembly 的 site/已发布路径生成的静态配置，以及唯一 `astro:scripts/page.js` 入口打包的本站 bootstrap；`isEnabled` 固定为 false，不新增环境变量、URL 参数或存储启用入口。客户端独立钉住已批准 origin/GoatCounter endpoint，配置严格校验，同一 document 至多绑定一次。review 不输出脚本或配置。独立 verifier 以受审的 exact href + SHA-256 锁定唯一 JS 文件，校验所有页面的标签/配置与资源清单，并在无网络的 VM 中执行原始产物，以 Fake fetch 验证生产身份下的最小请求和非生产/默认关闭隔离。此次不发送真实请求，不创建服务或发布；真实验证的环境、数量、回查、停止与清理在独立执行包中定义。

按以下顺序实施；各批完成情况必须区分，不以文档或账户注册关闭整个 U5：

1. **合同同步（已完成）**：更新本文、011、README、DEV_WORKFLOW、ARCHITECTURE、REFERENCES，并窄同步 PRODUCT/001 的当前摘要；保留 U3/U5A 历史，文档检查通过。
2. **离线实现与 M6 本地接线（已验证）**：轻量合同、adapter、DOM hook、严格配置、唯一 bootstrap 与 Privacy 已接入；review 零脚本，public 精确允许一个锁定模块。实际构建文件通过摘要和无网络 VM 执行检查，禁止配置自行授权 preview、非布尔开关和额外路径；不包含真实采集或最终浏览器 QA。
3. **账户核查及受控验证（设置、四次收数及清理回查已确认）**：公开地址为 `https://mythic-china.goatcounter.com/`；2026-09-09 的截图与 owner 保存确认替代早先读取失败留下的设置待核状态。90 天保留及八项采集关闭已核；独立合成测试四次 HTTP 200、后台四类各一次、完整路径核对与删除后报表归零已回查，请求头和完整处理/退出边界仍按第 14 节验证。
4. **public/production 接线（M6 本地接线完成，生产未启用）**：实际浏览器请求头/缓存/导航、报表与处理/退出边界仍须受控验证。local/review/preview 保持零发送；完成最终候选门禁后按独立授权启用 production，不临时放宽 preview 规则。

文档、离线模块与默认关闭的本地 public 接线已完成；账户设置及本次四条合成统计的发送、收数和清理回查已有 owner 证据，实际请求头和最终 QA 未验收。零月费只约束 analytics，不自动改变 U4、托管或 M7 RUM 门禁。

## 9. 测试与验收

| 层级 | 场景 | 输入或前置 | 期望结果 | 当前结果 |
| --- | --- | --- | --- | --- |
| 文档 | 状态、链接、UTF-8、供应商事实 | M5-U1 草案与 Project owner 账户现场事实 | 无占位符、断链或当前事实冲突 | Buttondown 审核通过及 Tally 发布链接/核查限度已同步；供应商真实行为仍待联调验收 |
| 单元 | Newsletter 字段 | 合法/未知/错误 email | 只接受精确字段并脱敏失败 | 通过；核心 DTO 只含 email，`embed` 等额外字段继续被拒绝；当前目标 transport 与后台 snippet 同为 email-only |
| 单元 | Reader Request | 长度边界、未知 page、email/consent 组合 | 严格通过或失败；provider 字段不可伪造 | 通过；含 astral Unicode、allowlist、Submission/Record 分离与 timestamp 负例 |
| 单元 | Analytics | 允许/未知事件、provider-neutral envelope 与 PII properties | 只允许显式事件和归一化 URL/referrer，不添加应用自定义 properties | 通过；三个事件、同 origin HTTPS、query/hash/referrer 清洗与 properties/PII 负例闭合 |
| 单元 | Analytics reading state | qualified/depth 两种顺序、hidden pause/resume、重复观察、刷新、非故事区 | 两事件各 once-only；顺序不漏记；刷新才重置；隐藏时间与非故事区不计入 | U5A/U5B 与 M6 实际 bootstrap 的离线执行测试通过；浏览器及生产验证未完成 |
| 单元 | Adapter failure | unavailable/rate-limit/timeout/unknown | 不假成功、不盲重试、不泄露 PII | 通过；三类 Fake 均覆盖五类结果，validation result 不回显输入，fetch trap 为零调用 |
| 输出 | Footer/Entry 唯一性、顺序与 Privacy | review HTML5 DOM fixture/静态输出 | 只有 approved inactive 入口，其他 form/script/provider link 失败 | 通过；U3 当时为 9 页 Newsletter / 2 个 Entry Reader Request，当前扩展为 14 页 Newsletter / 6 个 Entry Reader Request；Privacy 继续拒绝 mailto/占位符 |
| 构建 | 静态/noindex/public 负边界 | 固定运行时 | review 不接真实服务；内容核心不变 | 通过；review 为 14 页/零 XML，public 为 13 HTML/2 XML/robots.txt，均保持 112 Hero、10 WOFF2；review 零脚本，public 只允许一个摘要锁定的默认关闭模块；U3 的 9 页结果只保留为历史基线 |
| 浏览器 | 390/768/1440、键盘、200%、无 JS、错误恢复 | 经授权 preview | 无阻塞布局/焦点/阅读问题 | 016 已完成静态交互的三档走查和图注键盘抽查；真实供应商跳转、200%、故障与最终 public 候选 QA 未完成 |
| 真实联调 | Buttondown/Tally/GoatCounter | 独立授权和合成数据 | 与合同一致并完成回查/删除 | GoatCounter 四次发送、收数、完整四路径及清理后归零已确认；预算用完，请求头未验证。Buttondown 已有 owner 托管页单邮箱状态转换证据及真实退订完成确认，记录清理未完成；Tally 最多 10 次提交尝试已授权、当前已用 3/10，原第 5 项被拦住且 owner 刷新后确认 Completed 仍为 1，此项通过，旧第 1 项失败保留；owner 已批准第 12.11 节的原始收集与编辑前筛选，后续按修订用例继续，删除另行确认，U4/U5 未整体关闭 |

真实命令只引用 `DEV_WORKFLOW.md`；在入口未建立前不在本文写假命令。

## 10. 环境、数据和外部影响授权

| 动作 | 环境与影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- |
| M5-U1 文档 | 当前本地 Markdown | 用户已授权继续下一阶段 | 供应商研究完成；U2 子合同过门已满足，整体 provider 决定未关闭 |
| 本地代码/测试 | 当前仓库；不访问网络 | Project owner 已授权 M5-U2 | 已实施；只含纯合同、Fake 与自动化，未启动服务或访问网络 |
| M5-U3 页面/测试 | 当前仓库；纯静态 review 输出 | Project owner 已授权 006 与 inert review UI | 已实施并本地验证；无账户、action/link、外部写入、依赖、服务或网络 |
| M5-U5A 离线阅读判定 | 当前仓库；只消费模拟数据 | Project owner 于 2026-09-07 授权继续不涉及账号的开发 | 本地实现与验证完成；不接页面/DOM、供应商、配置或真实采集，不构成 U5 整体授权 |
| M5-U5B 免费方案 | 本地文档、零网络代码/测试与 inactive Privacy | Project owner 于 2026-09-08 接受计划并要求继续，随后提供公开统计地址 | 文档与离线模块完成；不含真实配置、账户写入、Git 或发布 |
| M5-U4 账户准备 | Buttondown 与 Tally 外部账户；无站点连接 | Project owner 提供现场事实并手动操作设置与有限订阅验证 | Buttondown 当前 action/部分设置和托管页单邮箱状态转换见 12.8；Tally 的 owner 预览确认及发布链接见 12.10；不延伸为代理账户控制或后续真实写入授权 |
| 依赖/配置 | package、lock、adapter、env | 单独说明并授权 | 推荐静态方案当前不需要；未授权 |
| 本地 dev/preview/browser | 进程、端口、浏览器状态 | 单独说明并授权 | 014–016 已在各自授权内完成并关闭；本次检查点未授权新服务 |
| Buttondown 写入 | 订阅请求、确认邮件 | 每次测试联调授权 | owner 已按指引手动操作一个本人控制邮箱的托管页订阅与确认，后台由 Unactivated 变为 Regular；代理未代发请求或邮件。owner 随后确认该测试身份的真实退订已完成，记录删除未确认；不追加重复订阅、群发、API/import 或自动清理，后续动作按 DEV_WORKFLOW 范围执行 |
| Tally 写入 | Reader Request record | 每次测试联调授权 | owner 已明确授权 DEV_WORKFLOW C 节本轮最多 10 次提交尝试；当前已用 3/10，原第 5 项被拦住且 owner 刷新后确认 Completed 仍为 1，此项通过，旧第 1 项失败保留；owner 已批准第 12.11 节的原始收集与编辑前筛选，后续按修订用例继续，删除另行确认 |
| GoatCounter pageview/事件 | 第三方 analytics | 账户/环境核查后实例化真实执行包并授权 | 2026-09-09 owner 已完成 DEV_WORKFLOW 中四条合成发送、收数、精确路径清理与报表归零回查；预算用完，测试结束，不含重发或生产启用 |
| Git 写操作 | add/commit/push/amend | 单独授权 | 本次 013–016 本地检查点已获 add/commit 授权，结果见 DEV_WORKFLOW；不含 push/amend 或发布 |
| Vercel/部署 | 远端项目与环境 | 核查与部署分别授权 | 检查点后已完成登录及只读现场核查，见 DEV_WORKFLOW；没有部署证据，本批不更改托管设置或发布 |

## 11. 发布与门禁

M5 本地开发不产生 deployable public artifact，也不授权 Vercel 项目、preview 或 production。M6 把已确认的 M5 交互与完整 published inventory 组装进同一最终 public artifact，再对该 artifact 执行 output verifier、真实键盘/缩放/偏好/故障/平台/性能和人工 QA。M7 才选择并启用唯一 RUM producer、生产配置、live smoke、回滚与真实流量 p75。

## 12. 实施完成记录

### 12.1 M5-U1 推荐草案

- 结果：完成当前代码/文档/门禁只读核查，并基于供应商官方表单、隐私、DPA、保留/删除、价格和 RUM 文档形成推荐。
- 当前修改：新增本文；修改 README、DEV_WORKFLOW、PROJECT_RULES、PRODUCT、ARCHITECTURE、CONTENT_MODEL、001 与 003，同步 M4 clean baseline、Submission/Record、output allowlist、阶段顺序和指标责任。
- 未执行：业务代码、依赖、测试/build、服务、浏览器、账户、真实写入、Git 写入、Vercel 或部署。
- 剩余门禁：截至 U1 收口时，不阻塞 U2；公开邮箱、Buttondown 账户/条款/action、Tally 持久 Respondent ID/人工清理责任、Plausible 费用/真实 envelope/启用仍分别后置 U3–U5/M7。后续决定见 1.1 与 12.3，不改写本历史快照。

### 12.2 M5-U2 纯合同与 Mock

- 结果：新增 newsletter、Reader Request 与 analytics 三个 provider-neutral 模块；Newsletter 核心 DTO 只含 email，Reader Request 分开 Submission/初始 Record，analytics 只允许三个无 properties 事件并把 URL 清洗为同 origin HTTPS origin + pathname、清空 referrer。
- 实际修改：新增 `src/services/newsletter.ts`、`reader-request.ts`、`analytics.ts` 与 `tests/services/external-interactions.test.ts`；架构测试把原“services 必须不存在”改为精确三文件/一测试 inventory，架构与当前状态文档同步本单元事实。
- 计划偏差：无功能扩张；reading-state 状态机仍在 U5，Buttondown mapping、Tally provider envelope 与 Plausible adapter 均未提前实现。
- 内容/资产追溯与披露：不适用；本单元不改内容、Source/Claim/Terminology、视觉资产或公开页面。构建期诊断由 strict Schema、显式 allowlist 和现有聚合门禁承担；关键职责说明只保留在边界不显然的 Submission/Record、provider-neutral/provider mapping 与 envelope 清洗位置。
- 匹配验证：固定 Node/Corepack 的定向入口通过 2 个文件/26 项测试；完整 `pnpm run check` 通过 Prettier、ESLint、24 个测试文件/301 项测试、Astro 77 文件零诊断、8 页静态 build 与既有 output verifier。23 份 Markdown 的严格 UTF-8、相对链接、原模板占位符和 whitespace 门禁通过。
- 未执行：依赖/lock/config、dev/preview/browser、账户/DPA、真实表单/邮件/分析、数据库/存储、Git 写入、Vercel、部署或发布。

### 12.3 M5-U3 页面入口与隐私

- 结果：新增全站 Footer 内唯一 inactive Newsletter、两个 Entry 阅读链末尾的 inactive Reader Request，以及 `/privacy/` noindex review 页面；公开联系、独立 consent、Buttondown/Tally 条件方向、Tally 人工清理规则与 Plausible 未启用状态均可见，但没有任何真实提交能力。
- 实际修改：新增 `NewsletterForm.astro`、`ReaderRequest.astro`、`privacy.astro` 与匹配 site test；修改 Footer、Entry template、全局样式、review output policy、9 页 inventory 和 build verifier。DOM oracle 逐页核对位置、唯一性、disabled/inactive 状态、稳定 Entry ID、Privacy 文案与零 `mailto:`/form/script/provider link。
- 内容/资产追溯与披露：不适用；本单元不改内容、Source/Claim/Terminology、视觉资产或状态。构建期诊断由既有内容/资产门禁及新增 HTML5 DOM oracle 承担。
- 匹配验证：固定 Node/Corepack 的定向入口通过 3 个文件/79 项测试；修正新控件中被字体门禁拒绝的 `font` shorthand 后，最终完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/320 项测试、Astro 81 文件零诊断、9 页静态输出与 verifier。
- 未执行：依赖/lock/config、dev/preview/browser、账户创建或账户级 DPA 验证、真实 action/link、邮件/表单/分析写入、数据库/存储、Git 写入、Vercel、部署或发布。

### 12.4 2026-09-03 账户准备与未发布草稿现场同步

本节只记录 Project owner 提供的当前账户现场事实，不把账户准备写成 U4 联调完成，也不证明供应商条款或运行行为：

- Buttondown 账户标识为 `mythic-china`，已创建但仍在人工审核。没有导入订阅者、发送邮件或连接站点；真实 form action、账户级 DPA 状态、double opt-in/tracking 后台值和删除/导出行为均未提供或验证。
- Tally 由 `hyc` 以个人专业身份为 Mythic China 控制，使用已在本文公开的项目联系邮箱和 Free 计划；没有付费计划、Google/Apple 账户连接或额外 workspace。账户已启用 2FA，未知设备验证保持开启，Tally Product Updates 已关闭；未记录密码、2FA 恢复码或其他凭据。
- Tally 中 `goo` 与 `yc` 仅按 Project owner 描述记为准备阶段的 preliminary values；其具体字段含义未核验，因此不作为品牌、控制者、workspace 或公开身份事实，也不进入站点配置。
- 未发布草稿名为 `Mythic China — Reader Request`，包含 `pageId`、必填 `requestedTopic`（3–240 字符）、可选 `email` 与在填写 email 后触发的条件式 `emailConsent`；CTA 为 `Send suggestion`，并已配置 thank-you page。
- 草稿没有发布，不存在可写入本文或源码的 hosted link；没有提交测试或真实数据，也没有启用通知、集成或其他额外功能。本次没有记录 Tally edit link、Buttondown action、token、凭据或任何恢复码。
- 尚未验证：发布后的条件 consent 是否严格失败关闭、真实 `Respondent ID`/`Submission ID`、防垃圾、成功/错误语义、导出、删除、Trash/Empty Trash、Buttondown CAPTCHA/重复订阅/double opt-in，以及任何网络 payload。
- 本次只同步文档；没有发布草稿、提交表单、发送邮件、导入订阅者、操作配置、启动服务、执行 Git 写操作、部署或发布站点。

### 12.5 2026-09-04 Buttondown 审核状态同步

Project owner 补充确认 Buttondown `mythic-china` 账户审核已经通过。本节只更新账户审核状态，不登录 Buttondown、不读取或记录 action/凭据、不修改 double opt-in、open/click tracking 或其他后台配置，不联调、不提交订阅请求或其他数据，也不执行 Git 写操作。

- 该更新关闭“等待 Buttondown 人工审核结果”这一准备门禁，但不证明账户级 DPA、计划/价格、真实 form action、double opt-in、CAPTCHA、重复订阅、错误页、open/click tracking、导出、soft/hard delete 或退出流程符合项目合同。
- 站点继续没有 Buttondown action、provider mapping、表单、真实 transport、subscriber 或邮件；既有 Newsletter review UI 继续 disabled/inactive。
- M5-U4 仍未完成。后续若要登录只读核查账户设置、记录精确 action 或发送由 Project owner 控制的合成订阅，均须分别说明影响并再次授权；本次授权不包含这些动作。
- 2026-09-03 的 12.4 节保留为当日历史快照，不用后来的审核结果倒写当时现场。

### 12.7 M5-U5A 无账号阅读状态判定

- 在 `1be085bf5fc4ba56c2665d1c8193a83001aeec18` 上延续既有 31 个未提交文件，本批只新增纯内存模块与测试、更新架构 inventory 和直接相关文档；没有改动内容、状态/日期、资产、模板或样式。Privacy 的纯 SEO/Sitemap 补齐另见 003。
- 定向 5 文件/98 测试与完整门禁通过：26 文件/433 测试、Astro 83 文件零诊断、14 页 noindex review、112 Hero、10 hash-locked WOFF2、零 XML 与零客户端 JavaScript。初次定向检查暴露测试表格参数展开及源码检查命中注释的问题，修正后重新运行定向与完整检查，不删除或放宽业务断言。
- 配套核对：内容/资产追溯及披露未变，现有内容图、视觉图、review intent/output 构建诊断保持；状态转换在可见性区间结算与故事深度分母处解释非显然职责；匹配测试与架构扫描证明不消费 DOM/配置、不持久化、不发送网络、不进入页面。
- 未执行浏览器、服务、真实供应商、public artifact、最终 QA、依赖/配置修改、Git 写入、推送或部署。纯函数返回事件不等于采集或记录成功；生产环境与区域选择仍须后续实证验收。

### 12.8 Buttondown 账户与有限订阅验证（2026-09-09）

本节区分 owner 提供的账户配置与实际托管页操作证据；不保存测试邮箱、确认链接、截图或邮件正文。

- **身份与表单**：后台品牌显示 Mythic China，当前 newsletter slug 为 `mythicworld`，公开页为 `https://buttondown.com/mythicworld`。完整 Embedding form 的 action 为 `https://buttondown.com/api/emails/embed-subscribe/mythicworld`、method 为 `post`，唯一具名输入为 `email`，没有 `embed`、metadata 或 tag。历史 `mythic-china` 记录保留为当日称呼，不作为当前 URL；当前目标字段按第 5.1 节更新，尚未进入业务代码。
- **设置**：Tracking 截图显示 Email clicks/opens、Transactional email clicks/opens 与 Web analytics 五项均关闭；owner 又明确确认 UTM information、Subscription reminders、Welcome email 已关闭。Subscribing 截图中 Public subscriptions 与 Subscriber cleanup 为开启，未见自定义输入；两个 redirect 只显示 example.com 占位，不能当成真实配置值。设置截图不等于已检查邮件像素、链接重写或额外邮件的实际行为。
- **计费**：Billing 显示 `Upgrade your newsletter today` 与 `No invoices found`。[官方价格](https://buttondown.com/pricing) 于本日仍列出前 100 位 active subscribers 免费及附加项单独收费；该截图只支持无发票和升级提示，不证明完整套餐、所有附加项状态或永久零费用。
- **有限验证**：测试前 Subscribers 显示首次使用引导，未显示记录或数量，不推断所有历史状态均为空。owner 按指引用本人控制的一个邮箱从上述托管页操作，先提供同一行 `Unactivated`，再按确认邮件指引操作后提供同一行 `Regular` 的截图。确认了观察到的状态转换；未取得邮件正文、确认链接或 Network，不能验证具体发信数量、邮件传输头、嵌入 endpoint/仅 email payload，不能替代本站原生 form 联调。
- **退订完成确认**：owner 随后明确表示已完成本次测试身份的真实退订，按用户提供的完成事实记录；不再要求重复退订或补截图。此前 Regular 只代表退订前的截图，不推断当前后台标签、所用入口、链接或网络/邮件细节。
- **未决项**：测试记录的精确清理、导出/退出和硬删除仍未确认；退订完成不代表记录已删除。本站 Footer 保持 inactive，U4、M5、最终 QA 和发布门禁未关闭；后续只核对本次记录的清理，不为补证据重复订阅。

当前官方依据（访问于 2026-09-09）：[原生 form](https://docs.buttondown.com/building-your-subscriber-base)、[double opt-in](https://docs.buttondown.com/double-opt-in)、[UTM](https://docs.buttondown.com/utm)、[reminder](https://docs.buttondown.com/transactional-emails-reminder)、[welcome](https://docs.buttondown.com/transactional-emails-welcome)、[读者 Portal](https://docs.buttondown.com/portal) 与 [cleanup](https://docs.buttondown.com/subscriber-cleanup)。公开文档不替代本账户行为证据；cleanup 默认 soft delete，不按未打开邮件清理。

本批只更新 README、本文与 DEV_WORKFLOW；没有修改业务代码、内容/资产、依赖或配置，没有启动服务或执行 Git 写入/发布。文档验证使用 DEV_WORKFLOW 既有入口，不因本次账户截图重复离线业务测试或构建。

### 12.9 Newsletter 默认关闭的本地准备（2026-09-09）

owner 要求加快进度后，本批将本地准备与真实入口启用分开：先实施固定 `mythicworld` action、仅 email 的原生 POST 分支、Layout/Footer 透传及真实组件离线测试；本批执行时读者退订和清理保留未验证（后续退订确认见 12.8），不要求继续截图才能推进零网络代码。

- 构建开关在源码固定为 false，不添加 env、URL、存储或浏览器开关；review 始终 inactive，public 默认 inactive，实际输出没有 form/input/button/action。启用分支只允许 approved public origin；无效 intent/开关/origin 失败关闭。
- 现行 review/public 输出门禁保持，不因本批放行真实表单；即使误改开关，出现可提交表单时构建必须失败。未来启用仍须更新对应 Privacy、精确 allowlist，并通过真实行为/账户门禁和当次授权。
- 新增 `vitest.config.ts` 仅用于现有 Astro Container 的 Node 内存渲染，显式不加载站点构建配置；不新装依赖、不启动服务。测试实际 NewsletterForm/SiteFooter 的关闭与启用分支、字段/披露、非法配置、网络零调用及现行产物门禁的拒绝行为。
- 当前状态：本地准备已完成。定向 3 文件/24 测试与完整 37 文件/635 测试通过，Astro 115 文件零诊断；public 13 页与 review 14 页构建及既有输出门禁均通过，实际产物保持无表单。执行入口和验证范围见 DEV_WORKFLOW 本批记录；未进行启用表单的浏览器操作或真实 POST，不据本地通过关闭 U4/M5、退订、处理/退出、最终 QA 或发布。

### 12.10 Tally 草稿配置确认（2026-09-09）

- owner 提供的编辑页截图显示 `Mythic China — Reader Request` 仍为 Draft：隐藏 `pageId`、必填建议、可选 Email、`email Is not empty → Show emailConsent`、带必填标记的独立同意框、`Send suggestion` 和已启用的 thank-you page 均可见。同意文案明确仅用于跟进本次建议，不订阅 Newsletter。
- owner 明确要求沿用此前已完成的 `requestedTopic` 字段名、3–240 长度设置及 `emailConsent` Required/Hidden 配置，不重复索要设置截图；随后确认 Self email notifications 和 Respondent email notifications 均关闭。这些属于 owner 提供的配置确认，不代表已验证实际传输或邮件行为。
- 同意框已有 required 标记，不因逻辑中只有 Show 动作就要求重复增加 Require answer。官方支持先隐藏再条件显示，但没有在本次查阅资料中明确保证隐藏 required 字段的校验、清空邮箱后的旧 consent 值处理，以及长度限制的 trim/Unicode code point 语义；这些保留为行为验证项，不用截图或本地 Schema 测试代替。
- owner 的首张预览图显示 Email 空白时完整 consent 文案和复选框仍可见。按完整题块默认 Hide、保留 required 和已有 Show 条件的修正指引及三状态复查后，owner 回复“可以了”；按该上下文记录空白时隐藏、填写后出现、清空后再次隐藏已由 owner 确认，不重复索要截图。不推断实际菜单修改细节，也不把显示通过写成提交阻断、长度、保存值或邮件行为已通过。
- owner 按“仅发布一次、从 Share 取得链接、不提交”的步骤提供 [真实 Tally 表单](https://tally.so/r/2E6gdj)，据此记录由 owner 完成发布。代理的公开网页读取失败；内置浏览器打开超时后，标签清单显示精确 URL 和 `Mythic China — Reader Request` 标题，支持有限的链接/标题对应，但完整页面读取仍超时，未独立核对发布后的字段、隐藏 pageId 或实际行为。不要求重新发布，也不把读取超时解释为表单未发布。
- 测试前 owner 确认该表单 Submissions 为 0、Trash 为空，后续邮箱测试继续使用上次 Buttondown 那个本人控制的邮箱；不索取或保存实际地址，不要求重复截图。owner 已明确授权 DEV_WORKFLOW C 节的本轮最多 10 次提交尝试；首项结束时已用 1/10，第 1 项未通过并暂停后续 9 项；后续 owner 决定与修订流程见 12.11。代理恢复浏览器连接仍超时，未填写或激活提交；真实操作由 owner 完成，证据与停止状态见下条；删除另行确认，网站尚未接入该链接，U4/M5 保持未完成。
- 第 1 项按三个普通空格 U+0020、无邮箱的指引执行后，owner 提供后台截图：All 1、Completed 1、Partial 0；唯一行显示 Sep 9, 03:09 PM，pageId 为 `zhong-kui`，requestedTopic 视觉空白，email 与 emailConsent 均显示 `-`。按该操作上下文判定空白建议被接受，未通过 trim 后 3–240 code point 合同，已用 1/10 并停止第 2–10 项。截图不证明原始值是三个空格、空字符串或 null，也不证明 `-` 对应 null/false；未核对 Submission ID、原始 payload、Respondent ID、时区或邮件。只证明本次 pageId 已出现在供应商记录，完整白名单和邮箱配对验收未关闭。后续详情核对与新的业务决定见 12.11；该记录保留待精确清理授权。
- 本批同步本文、DEV_WORKFLOW、README、ARCHITECTURE 与 CONTENT_MODEL 的当前 Tally 状态，保留明确日期的历史草稿快照；不修改业务代码、内容/资产、配置开关或依赖，不启动服务、不操作账户、不提交或部署。文档检查结果与执行状态见 DEV_WORKFLOW 本批记录。

官方依据（访问于 2026-09-09）：[条件逻辑](https://tally.so/help/conditional-form-logic)、[字段长度说明](https://tally.so/help/faq)、[Self email notifications](https://tally.so/help/self-email-notifications)、[Respondent email notifications](https://tally.so/help/respondent-email-notifications)。公开文档不替代本账户实证。

### 12.11 原始建议与编辑前严格筛选（2026-09-09）

owner 已明确批准先收集原始建议、编辑前严格筛选。第 12.10 节的首次空格提交仍保留为旧“提交前拒绝”要求下的失败，不回写为通过；详情截图再次显示 pageId 为 zhong-kui、建议视觉空白、邮箱与同意为 `-`，未显示 Submission ID，也未证明原始值的精确编码。不再要求重复截图或查找未显示的 ID。

本地实施范围：新增 `scripts/review-reader-request.mjs` 与匹配脚本测试，复用现有严格 Submission validator、Entry Schema 和 Astro frontmatter 解析；只调整两个 TypeScript 相对导入的扩展名及对应架构导入清单，不改变验证规则。CONTENT_MODEL 区分原始供应商提交和内部 Record，ARCHITECTURE 固定人工处理边界，DEV_WORKFLOW 定义运行入口与修订后的限次测试，README 同步当前状态。无新依赖、存储、服务、表单接线、后台配置、Git 写入或网站发布。

验收要求：合成数据验证空白、trim 后长度、astral/组合字符、未知或未发布 pageId、邮箱/同意组合、非法 JSON、额外供应商字段和输出脱敏。真实数据不得用于自动化测试。审核通过只表示人工映射的字段可进入编辑判断；来源记录身份、时间、原值、同意证据及最终选题均仍由 hyc 核对。拒绝项不得进入有效建议或排期；保留与删除沿既定运营规则执行，本次实际测试记录删除仍另行确认。

本地验证完成：定向 3 文件/47 项通过；补齐 Node 显式导入后，完整 check 通过 Prettier、ESLint、38 文件/655 项测试、Astro 117 文件零诊断，以及 14 页 review build/output verifier。合成三个空格在真实 Node 子进程中被拒绝，trim 后长度为 0；这验证离线入口，不补写或重做 Tally 记录。未运行新的 public 构建、浏览器或真实数据审核；不执行 Git 写入或发布。原始 Completed 数量只能表示收集数量，不能当作通过筛选的有效建议数量。

原第 6 项（累计第 3 次）后台截图显示 All 2 / Completed 2 / Partial 0；新增行时间原样为 `Sep 9, 03:57 PM`，pageId 为 `zhong-kui`，requestedTopic 显示 `abc`，email 视觉空白，emailConsent 为 `-`。按此前输入前后各一个普通空格的 abc、清空邮箱并提交一次的上下文，确认匿名有效建议已被接收且新增一条。截图不能证明供应商是否保留首尾空格或底层空值编码；感谢页尚未单独确认。同一合成输入的 trim 后 3 code point 已由离线回归验证通过，不将其当作真实 payload 审核。下一项继续原第 9 项，现有两条记录均未删除。

当前真实测试累计 3/10；owner 已确认原第 5 项“不勾选同意，点击 Send suggestion 提交不了”，随后确认刷新后 Completed 仍为 1。按该操作上下文及后台回查记录本项通过；未独立取得原始请求或具体校验提示，不延伸为服务端防绕过证据。原第 6 项匿名建议随后写入，下一项为原第 9 项填写邮箱并明确同意；不重复已完成项。修订方案保留原第 5、6、9、10 项，其他文本边界转为离线校验，不补发旧第 1 项。完成审核入口的本地验证后，在原授权内逐项继续这四项，不增加总预算或使用新邮箱。旧测试失败与新合同验收分别记录，实际累计数量以逐次后台回查为准；邮箱同意、清空残留、重复/未知结果等异常仍立即停止。

## 13. 当前最终结论

U5B 离线模块验证（2026-09-08）：定向 8 文件/256 测试与完整 check 的 33 文件/581 测试通过，Astro 105 文件零诊断；public → review 构建及输出 verifier 通过，仍为 13 个 public HTML / 14 个 review HTML、112 Hero、10 字体与零客户端 JavaScript。新代码只由离线测试调用；Privacy 计划已更新，内容、来源、资产披露和路由未变。真实账号设置、DOM 浏览器行为、请求头与报表、生产配置、M6 bootstrap/制品 fixture、最终 QA 和发布均未验收，不生成 clean-source receipt。

- 需求状态：M5-U3 与 GoatCounter 免费托管/次数统计/最小请求合同已确认，90 天保留与额外采集关闭有账户截图及 owner 保存确认；处理和退出能力仍待验收。013 public origin 与本地条件接线已完成。
- 实施状态：M5-U2/U3/U5A、U5B、M6 默认关闭的 bootstrap/制品接线与 Newsletter 默认关闭准备已完成，仓库外四次合成发送/收数/清理回查已确认；实际请求头、U4 联调、RUM 和完整 M6 QA 未完成，M5 不能关闭。
- 验证状态：U3 与 U5A 的历史数字保留各自范围；016 最新静态状态已通过完整 check、review/public output verifier、13 路由三档走查与图注键盘抽查，六个 Entry 均保持 inactive Reader Request。Buttondown 托管页单邮箱状态转换和 owner 的真实退订完成确认见 12.8；记录清理、本站提交/跳转及最终 public 候选缩放/故障等验收仍未完成。
- 发布状态：未发布。
- 下一步：本次合成统计发送/收数/清理回查结束，请求头缺项已登记，不重发。Buttondown 已有 12.8 的有限订阅证据及 12.9 的默认关闭本地实现，真实退订已由 owner 确认，继续核对本次记录清理；本站真实启用、Tally 真实联调、完整传输验证、最终 M6 验收及发布保留各自进入条件。

## 14. 当前接线进入清单（2026-09-08）

用户已要求独立推进 M5/托管门禁，并接受 GoatCounter 免费方案。2026-09-09 已取得地址、设置截图和 owner 保存确认；本地默认关闭接线及独立四次合成发送/收数/清理回查已验证，请求头和完整处理边界仍未验收，U4/U5 不能整体关闭。下表区分已满足的配置输入和后续验证。

| 单元 | 先核对的身份与输入 | 本地实现进入条件 | 真实验证停点 |
| --- | --- | --- | --- |
| Buttondown U4 | 当前 newsletter 为 `mythicworld`；后台 action/部分设置和托管页单邮箱状态转换见 12.8；计划/DPA 与删除能力仍需按范围核对 | 第 12.9 节固定关闭配置、Footer 唯一原生 POST 分支与组件离线验证已完成，现行输出门禁继续拒绝 form；账户/退订清理、Privacy 和精确输出例外是实际启用条件，托管页测试不替代本站验证 | owner 已确认本次真实退订完成，不重做；当前后台标签不作推断，记录精确清理仍待确认；后续原生 form、重复/失败等新增动作先在 DEV_WORKFLOW 定义环境、测试身份、次数、停止和清理，再取得对应授权 |
| Tally U4 | 配置/预览、发布链接及测试前零记录/空 Trash/测试邮箱归属已由 owner 确认；首项测试后台新增 1 条 Completed，pageId 为 zhong-kui，完整页面核查未完成，见 12.10 | 第 5.2 节字段与供应商边界及完整公开表单核实后，才接入仅携带 published `pageId` 的站外链接 | 本轮已用 3/10，原第 5 项被拦住且 owner 刷新后确认 Completed 仍为 1，此项通过，旧首项失败保留；owner 已批准编辑前严格筛选，先完成离线审核验证，再按 DEV_WORKFLOW 修订用例执行原第 5、6、9、10 项；邮箱同意等异常仍停止，精确清理另行确认 |
| Analytics U5 | owner 手工注册后的公开 GoatCounter 站点 URL；免费条件、精确 `/count` endpoint、Sessions/明细/维度设置、90 天保留及删除/导出能力 | 本地 adapter/hook/bootstrap 与产物隔离验证完成，地址/90 天/额外采集关闭有 owner 证据；发送仍默认关闭，review/local/preview 零请求 | 真实设置修改和测试须另列环境、路径/事件、数量上限、停止、报表回查与仅本次记录清理；M6 public 接线与 M7 production analytics/独立 RUM 分别验收 |
| 托管 | Vercel 项目/账户内部身份、域名绑定、实际构建/运行时/输出设置和保护 | 以真实账户证据核对 013 的 public 入口和 Privacy；不把空项目截图当实际保护通过 | 不安装 CLI；真实交付入口、受保护预览、地区/退出/回滚与生产发布按 DEV_WORKFLOW/011 独立进入 |

检查点时官方资料复核（2026-09-08，替换前历史）：[Buttondown 原生订阅表单](https://docs.buttondown.com/building-your-subscriber-base) 要求标准 HTML form action，不能用 fetch 绕过验证页面；当时 [Plausible 定价](https://plausible.io/#pricing) 10k 最低档显示 US$9/月，其 [数据说明](https://plausible.io/data-policy) 包含 IP/UA 日级标识；[Tally 删除说明](https://tally.so/help/how-to-delete-and-recover-form-data) 区分可恢复 Trash 与不可恢复清空。Plausible 此后已退出当前方案，不再是待购买门禁；GoatCounter 当前依据见第 5.4 节。这些公开资料均不证明账户已配置或发生真实写入。

GoatCounter 账户核对清单：

1. owner 完成人工注册并提供公开统计站点 URL；核对账户归属、绑定网站、精确 HTTPS `/count` endpoint 与实际免费适用条件。网站 origin 已有本地合同，但不得据此猜测 GoatCounter 子域名。
2. 核对 Sessions 关闭、individual pageviews 明细关闭、多余维度关闭，以及统计看板访问权限；看板应仅由 owner 管理，不能在不知情时公开。记录实际值和未决项，配置修改单独执行。
3. 核对免费账户能否设置聚合保留 90 天、设置/清理语义、数据位置/条款、导出、按路径清理与账户删除入口；不满足合同就保持发送关闭。
4. 在 DEV_WORKFLOW 中定义受控测试环境、规范合成路径、三个事件与 pageview 的次数上限、同窗口报表回查、停止与清理范围；取得真实写入授权后才发送。不得在 public preview 上临时解除隔离，也不得混用测试统计与产品基线。

默认完成标准保持 011 第 2.2 节：inactive 状态与本地检查点不能关闭 U4/U5，未取得真实账户或业务决定时不使用示例 action/link、静默 fallback 或虚构 receipt 补齐。若以后改变首发交互范围，必须先明确修改目标合同，再实施和验证。

2026-09-09 接线补充结果：默认关闭的 M6 bootstrap/精确配置/产物例外已完成；36 文件/619 测试与 Astro 112 文件零诊断通过，public 13 页携带唯一摘要锁定的关闭模块，review 14 页零脚本，实际 JS 无网络执行 fixture 通过。账户设置有截图及 owner 保存确认；本批未发送真实数据，也未验证服务端清理、浏览器请求头和报表。实施细节、原始字节身份与未验证项见 013 和 DEV_WORKFLOW，U4/U5、M6 最终 QA 与 M7 发布继续保持独立。

2026-09-09 真实验证授权补充：owner 已对下一步受控联调回复“开始吧”。本次仅以仓库外独立诊断页面手动发送最多一个 pageview 和三个既有事件，合成路径为 `/explore/goatcounter-check-20260909/`；该路径不加入站点路由或生产 allowlist。独立诊断工具不是 local/review/public preview 网站，不加载站点 bootstrap；其 `file:` 文档具有不透明来源（网络 Origin 通常为 `null`），不能据此验收 production origin、真实阅读触发、重复访问次数或站点缓存/导航行为。请求预算、先决核查、回查、退出与工具入口只以 DEV_WORKFLOW 本次执行包为准；普通网站的默认关闭和环境隔离合同不变。真实发送及报表验证尚未发生。

2026-09-09 报表基线补充：owner 的统计首页截图显示 `No data received` 和零访问，日期范围为 2026-09-02 至 2026-09-09，显示的 `/count` 端点与既有账户一致。浏览器工具无法可靠识别独立窗口 URL，已改用 owner 操作和截图回查；临时限次工具只在仓库外准备。实际报表时区和 Manage pageviews 清理入口待核对，真实请求仍为零；截图中的默认 `count.js` 接入示例不进入网站代码。

2026-09-09 四次真实收数补充（替代上述进入阶段的零发送现状）：owner 提供 Manage pageviews 搜索/管理入口截图，随后操作临时工具并提供结果：UTC `2026-09-09T01:34:18.232Z` 开始，既定 pageview 与三个事件各发送一次、均显示 HTTP 200，总四次。另一张后台截图在相同日期范围显示 `4 out of 4 visits shown`，普通页面 `/explore/goatcounter-check-20260909` 一次，三种预定事件前缀各一次且带 event 标记；这是四条合成次数，不是四位访客或真实阅读触发。事件完整后缀在截图中被截断，须在 Manage pageviews 逐条核对完整路径/ID 后清理；实际 Network Cookie/Referer/Origin 等请求头尚无截图。入口存在及操作人确认框不等于已执行删除，报表时区也未单独核对；真实请求预算已耗尽，不通过重发补证据。详细证据范围和下一步只读回看/清理见 DEV_WORKFLOW，网站配置和发布状态不变。

2026-09-09 清理收口补充（本次最终状态）：owner 表示已关闭 Network，故实际请求头保持未验证。Manage pageviews 随后返回恰好四条匹配结果、各 1 hit，全部完整路径与合成清单一致；普通页面没有尾斜杠，三个事件保留尾斜杠。UI 未显示内部 ID，因此以已展开的完整四路径和当前精确结果集核对删除对象，不虚构 ID 或通过隐藏接口补取。owner 手动删除后提供 Dashboard 截图：相同 2026-09-02 至 2026-09-09 范围、Filter paths 为空、`0 out of 0 visits shown`、`0 visits` 和 `Nothing to display`。本次四条测试统计的发送、收数和清理后报表归零已确认；不声称证明备份删除、90 天自动清理、账户退出、请求头或生产环境。预算用完，临时工具不再运行，生产统计保持关闭；M5/U5 整体、U4、最终 QA 和发布门禁不随本次收口关闭。

### 12.12 GoatCounter 启用收尾（2026-09-10）

- 目标：完成既有 GoatCounter 的生产启用准备和实际 Privacy；不重新接入，不恢复 Newsletter、Reader Request、RUM，不添加依赖、账号、表单、持久标识或新事件。此前 Hero sizes 和默认关闭的 RUM 工作保留。owner 已要求验证后启用发布；本批先完成可审查的本地候选，Git/真实浏览器/发布分别固定身份与实际执行范围。
- 实现：`src/site/analytics-configuration.ts` 的单一常量供 public meta 与 Privacy 共用；public 候选为 true，review 无 meta/JS。`site-analytics.ts` 在绑定及每次发送前尊重 DNT=1/GPC=true、query 或片段任一 `analytics=off`；hashchange 立即退出。运行中发现退出后清除监听器/计时器，当前 Document 包括 BFCache 均不恢复。无 Cookie/localStorage；移除标记后的新页面重新判断，单页地址选项不自动传播到其他页面。既有 15 秒/75%/Related、p/e、omit/no-referrer/no-store/keepalive 与零重试合同不变。
- 账户事实：主代理只读登录看板，2026-09-03 至 2026-09-10 无筛选报表为 0。Settings 当前 site 与正式域名一致，90 天、八项额外采集全关、看板仅登录用户可见；没有改动或保存设置。旧四次合成收数与精确删除后的归零证据继续有效；预算仍耗尽。
- 处理选择：按已批准的最小聚合用途，Privacy 将运营和改进出版物的正当利益写明，不建立画像、跨页标识或 Cookie；提供浏览器偏好及单页退出。不因供应商说“可能无需同意”宣称全面法律豁免。免费合理用量、实际地区及官方说明于本日复核；没有凭空新增 DPA 开关或声称签订独立 DPA。若后续要求更严格的同意机制或处理范围变化，先关闭采集再决定。
- 保留/退出核查：账户阈值为 90 天；官方源码通过周期任务清理旧统计，不能写成第 90 天即时硬删除，也不能写成本账户定时任务已经实测。JSON 可导出聚合，CSV 需要开启明细，因此不为验证启用明细或创建 API token。删除账户入口已在当前 Settings 导航看到，只读核查不执行退出。八项关闭不能证明供应商所有连接/反滥用技术记录均不存在，Privacy 保留相应处理说明。
- 修改清单：上述配置/监听器、Privacy、`scripts/analytics-output-policy.mjs`、`verify-analytics-bootstrap.mjs`、`review-output-policy.mjs`、`verify-public-output.mjs`、精确 `analytics-script.json` 及相应 site/client 测试；README、ARCHITECTURE 和 DEV_WORKFLOW 同步当前状态。内容、来源、Schema、图像/字体与披露不在本轮改动范围。
- 验收：完整 check、public→review 输出、实际唯一 bundle 的原始字节审查与 Fake VM 执行；验证初始/运行中退出、BFCache、刷新、重复参数、所有 public 路径和原事件合同。真实请求头/缓存/导航及最终发布尚待完成，不能由模拟 transport 替代。当前是未提交候选，不是发布 receipt，线上仍关闭。

本日官方来源：[Terms](https://www.goatcounter.com/help/terms)、[Privacy/地区与退出](https://www.goatcounter.com/help/privacy)、[同意说明](https://www.goatcounter.com/help/gdpr)、[JSON 导出](https://www.goatcounter.com/help/export-json)、[CSV 条件](https://www.goatcounter.com/help/export)、[周期清理源码](https://github.com/arp242/goatcounter/blob/main/cron/tasks.go)、[处理边界源码](https://github.com/arp242/goatcounter/blob/main/memstore.go)。源码 main 核查只解释机制，不冒充托管实例版本或执行证明。

12.12 本地验收结果：完整 41 文件/698 项测试、Astro 128 文件零诊断，以及 public 原始 bundle Fake VM → review 零 JS 构建通过；新增 8 项退出回归。140 文件 / 3,278,559 bytes 中 126 个与原包字节相同，差异限于 13 HTML 的统计配置/脚本引用、Privacy 和此前 Hero sizes，以及唯一新统计 JS。脚本摘要与详细证据见 DEV_WORKFLOW。账户时区已在 Preferences 核对为 Asia/Shanghai、邮件报表 Never，未改设置。内容和资产披露未变，构建诊断与退出生命周期职责说明已核对；真实 count 发送零次，未提交、推送或部署。真实 Network/缓存/导航与 clean-source 检查点未闭合，故 006 整体不关闭。
