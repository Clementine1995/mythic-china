# 006 外部交互边界：开发与验收说明

## 0. 文档职责与状态

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
| 需求状态 | M5-U3 页面与隐私子合同已确认；U4 账户准备事实已同步 | Buttondown `mythic-china` 已创建但仍在人工审核；Tally Free 账户和未发布 Reader Request 草稿已准备。真实 action/link、账户级条款、发布、写入与供应商行为仍留 U4/U5/M6 逐项确认 |
| 实施状态 | M5-U2 与 M5-U3 完成；U4 未完成 | 三个 `src/services/` 纯合同/Fake、全站唯一 inactive Newsletter、两个 Entry 的 inactive Reader Request、`/privacy/` review 页面与 fail-closed output oracle 已实现；外部账户/草稿没有进入仓库配置，站点仍无真实供应商接线或网络 |
| 验证状态 | M5-U3 完整本地门禁通过；账户准备只由 Project owner 提供现场事实 | 定向 3 文件/79 测试及完整 Prettier、ESLint、25 文件/320 测试、Astro 81 文件零诊断、9 页 build/output verifier 通过；未发布草稿、审核中账户、浏览器、供应商真实行为与写入均不是通过证据 |
| 发布状态 | 未发布 | 没有 public artifact、Vercel 项目、真实 origin、供应商生产配置或部署授权 |

- 当前权威结论更新时间：2026-09-03。
- 当前实现基线：本地 HEAD 与 `main` 为 `3983bee91ada4a286613ec702a8009a4f528af3f`，进入 M5 前工作树干净；当时未 fetch 的本地 `origin/main` 为 `e2893d1`。M5-U2 实施期间，该 tracking ref 于 2026-09-02 14:04:40 +0800 由外部 push 更新到 `3983bee`，当前三者对齐；本批未执行 fetch 或 Git 写入，tracking ref 不单独证明服务器端状态。

## 1. 结论与开发就绪判断

- 一句话结论：Project owner 已确认 U3 所需的公开联系、文案和供应商方向；明确不可提交的 review UI 与 Privacy 已完成本地实现和验证。Buttondown 审核中账户与 Tally Free 未发布草稿只完成 U4 账户准备的一部分，不等于 transport 已启用；Plausible 留 U5，public artifact 留 M6。
- 业务代码进度：M5-U2 与 M5-U3 已完成；U4 只具备账户/草稿准备事实，真实 transport、发布与联调尚未开始，U5 Plausible 候选接线及 M7 RUM/生产启用仍不可开始。
- M5-U2 阻塞项：无且已关闭。Reader Request 的 trim 后 3–240 Unicode code point、可选 email 最大 254 字符与 consent 配对，以及三个无应用自定义 properties 的 analytics 事件，均已冻结为本单元 provider-neutral 合同并由匹配测试验证。
- 后续门禁（不阻塞 M5-U2）：
  1. Tally 跨同一 workspace 持久化的 localStorage `Respondent ID` 与低成本人工清理风险已由 Project owner 接受；Free 账户和字段匹配的草稿已准备，但仍未发布或提交。条件逻辑、生成标识、删除与 Empty Trash 行为仍须在 U4 验证，U2/U3 不接收、生成或保存该标识。
  2. Buttondown 方向、美国处理/DPA 边界、double opt-in、每月不超过两封及首次发送前关闭 open/click tracking 已获确认；账户 `mythic-china` 已创建但仍在人工审核。真实 action、账户级 DPA 状态、soft/hard delete、届时价格和真实行为仍须在 U4 验证。
  3. Plausible Hosted 的购买、日级访客哈希、URL/referrer 真实 envelope、三年 dashboard 保留、custom event 计费与 production 启用仍须在 U5/M7 确认；U2 不实现供应商脚本或请求。
  4. 公开隐私/数据权利联系邮箱、Newsletter/Reader Request 文案和阶段性 Vercel origin 边界已确认；U3 只生成了 noindex review 页面，仍未形成 public artifact。
- 已确认的阶段决定：RUM/p75 延后 M7；M5-U2 只冻结 provider-neutral 字段、事件、清洗和失败语义，newsletter/request 转化仍只能使用供应商已接受记录的聚合结果。
- 下一停点：等待 Buttondown 人工审核结果，并由 Project owner 对 M5-U4 的 Tally 草稿发布、精确 action/hosted link、合成测试数据、写入数量、停止条件、回查和删除步骤逐项授权；不得自动发布草稿、安装 SDK、渲染可提交表单、启动服务、访问真实网络或写入任何数据。

### 1.1 M5-U3 Project owner 决定（2026-09-02）

- `Mythic China` 是站点品牌；Project owner 指定公开数据控制者标签为 `hyc`，所在国家/地区为 China（`CN`）。这是 Project owner 提供的公开身份，不构成对登记状态或特定司法辖区合规性的法律核验。
- 公开隐私与数据权利联系地址为 `huyichen2019@gmail.com`，负责人为 `hyc`；U3 以可复制纯文本展示，不新增 `mailto:` allowlist。
- 隐私权利请求通信在请求关闭后保留 60 天；届时由 `hyc` 从活动邮箱与 Trash 删除，法律要求继续保留的情况除外。该期限是项目运营规则，不是 Gmail 底层存储或备份级硬删除 SLA。
- Newsletter 只用于发送新文章和偶尔的编辑精选，每月不超过两封；使用 double opt-in，每封邮件提供退订；Reader Request 不得触发订阅。
- Buttondown 被有条件接受为后续 Newsletter transport；Project owner 接受本文记录的 DPA 与美国处理边界。账户、username、真实 action、账户级 DPA 状态、删除/导出及真实行为仍留 U4 验证；open/click tracking 从首次发送前保持关闭。
- Tally 被有条件接受为后续 Reader Request 托管页；Project owner 接受其跨同一 workspace 的持久 `Respondent ID`/localStorage 行为。`hyc` 每 28 天删除所有年龄不少于 60 天的提交，并在同次操作清空 Trash；`hyc` 是唯一执行人、无独立备份，Project owner 接受漏执行风险。供应商 ID 不进入本站 canonical record 或 analytics，邮件通知保持关闭。
- 上述 Tally 规则按时执行时，提交的实际运营保留窗口约为 60–88 天；因唯一负责人漏执行而延长的风险不得写成严格供应商保证。删除供应商记录或 Trash 也不等于已证明清除访问者浏览器中的 `Respondent ID`。
- Plausible 留在 M5-U5；U3 不添加脚本、hook、事件或远端请求。
- 当前不购买自定义域名。M6 经单独授权建立 Vercel 项目后，才确认稳定 production alias/hostname 并写入真实 origin；preview/commit URL 不得作为 canonical。
- 本次授权只覆盖本文合同更新、M5-U3 inert review UI 和匹配本地验证；不含账户、真实 action/link、外部写入、依赖、服务、Git、Vercel 或发布。

### 1.2 事实、推断与风险

已确认事实：

- `SiteFooter.astro` 由共享 Layout 全站唯一渲染，并在 Footer 内挂载一个 disabled、inactive 的 Newsletter review 入口。
- `EntryTemplate.astro` 在 Sources、Collection/Related reading paths 后为两个 review Entry 各挂载一个 disabled、inactive 的 Reader Request；其他页面没有该入口。
- `/privacy/` 是第九个 `noindex, nofollow` review 页面，公开显示 `hyc`、China、`huyichen2019@gmail.com`、60 天邮件运营保留规则，以及尚未启用的 Buttondown/Tally/Plausible 说明。
- Astro 仍为纯静态输出，没有供应商 adapter、表单 endpoint、分析依赖或浏览器测试目录；M5-U2 新增的 `src/services/` 只有 provider-neutral DTO、validator、interface 与 Fake，U3 页面没有消费这些服务。
- review output policy 继续默认禁止 `form`、`script`、事件处理器、供应商 link/action 和非本地子资源，并新增 inactive UI、Privacy、位置、唯一性及文案的 HTML5 DOM oracle；构建 verifier 继续要求零客户端 JavaScript。
- 本文、`CONTENT_MODEL.md`、`ARCHITECTURE.md` 与 `PROJECT_RULES.md` 已把浏览器 submission 与 provider/internal record 分开；M5-U2 的匹配 strict validator/Fake 已实现，真实 transport 尚未实现。
- Project owner 于 2026-09-03 提供的账户现场事实为：Buttondown `mythic-china` 仍在人工审核且没有导入订阅者或发送邮件；Tally 由 `hyc` 以个人专业身份为 Mythic China 控制，使用 Free 计划并准备了未发布 Reader Request 草稿。该事实不提供 action、hosted link、编辑链接、凭据或供应商行为证明。
- 当前没有合法的真实表单、邮件或分析写入入口。

推断与依据：

- 纯静态原生 POST 或托管页外链能保持内容页静态和客户端无密钥，最符合当前架构；代价是成功/错误可能发生在供应商页面。
- 若坚持站内、可预测且可访问的成功/失败状态，以及服务端执行 email/consent 条件配对，则需要极窄同源 POST 边界；这会引入 adapter、运行配置和部署身份，不能作为普通组件改动顺手加入。
- Plausible 可承接最小产品事件，但当前官方产品材料不足以把它写成 Core Web Vitals p75 的 RUM 生产者，因此 RUM 必须显式留给 M7。

未验证风险：

- Buttondown DPA 与美国处理边界已在项目合同层获 Project owner 接受；Buttondown 审核中账户和 Tally Free 账户/未发布草稿的存在只由 Project owner 提供。账户级 DPA 状态、subprocessor、数据位置、保留/删除、导出与退出流程仍未实证验收。
- Buttondown CAPTCHA、重复订阅、double opt-in、错误页和服务不可用的真实行为未联调。
- Tally 的条件逻辑、隐藏 page ID、防垃圾、删除/Trash 和免费计划限制未在真实表单核查。
- Plausible 的生产域名、显式事件、脚本失败和费用阈值未配置。
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
| Web Vitals p75 | M7 独立 RUM | 不属于 Plausible M5 完成证据 |

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
  -> 一个 disabled email preview + inactive Newsletter 文案 + Privacy link
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

本节的 provider-neutral DTO、字段值域、三个事件、清洗与失败语义已为 M5-U2 确认；Buttondown 与 Tally 已被 Project owner 有条件接受为 U4 的后续 transport 方向，Plausible 仍为 U5 候选。Buttondown 已创建审核中账户，Tally 已有 Free 账户和未发布草稿；三者均未接入站点、启用真实 transport 或处理站点数据，Plausible 也没有账户准备事实。
除非另有说明，供应商能力、隐私、保留与价格事实均于 2026-09-02 从下列官方页面核对；账户审核完成、购买、发布草稿或联调前必须重新只读复核，不能把本文快照当作永久条款。

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

Buttondown transport envelope 留给 U4 mapping，并在真实 action 获批后才存在：

```yaml
email: reader@example.test
embed: "1"
```

规则：

- U2 核心 DTO 未知字段失败，只允许 `email`；`embed` 不是读者字段，也不进入 provider-neutral DTO/Fake。
- 后续 Buttondown transport mapping 才能添加固定 `embed="1"`；该值不得由读者或页面上下文改写，真实 action/账户未确认前不进入源码。
- 不采集姓名、生日、地域、兴趣标签、追踪 ID、metadata、tag 或 Reader Request 内容。
- form submission 本身只表示请求订阅；double opt-in 完成后才计为 active subscriber。
- 表单附近必须说明用途、频率、Buttondown 处理、double opt-in、退订和 privacy 链接。
- 公开频率已确认为“每月不超过两封，只发送新故事和偶尔的编辑精选”。
- 供应商记录的时间、IP、referrer 与状态不从浏览器隐藏字段传入。
- open/click tracking 默认保持关闭；启用会引入 subscriber-specific pixel/link rewrite，且当前 analytics add-on 另计费，必须另立需求和授权。
- 前 100 个 active subscribers 当前免费；cleanup 需要显式启用且默认只是 soft delete，hard deletion 要联系供应商开通，因此不能把 7/30 天 cleanup 写成硬删除 SLA。
- Project owner 已接受本文记录的 Buttondown DPA 与美国处理边界；账户标识 `mythic-china` 已由 Project owner 确认，但账户仍在人工审核。真实 action、账户级 DPA 状态、SCC/subprocessor、hard deletion/退出回查与届时价格仍须 U4 实证，未确认前不进入源码。

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
- 托管表单已在 Tally Free 账户中形成未发布草稿，可在 U4 获独立授权后发布并验证字段、条件逻辑、校验、防垃圾、成功/失败和导出；草稿结构不证明这些真实行为。代价是页面跳出、较高供应商锁定，以及下述稳定 Respondent ID。

浏览器输入合同：

```yaml
pageId: zhong-kui
requestedTopic: A short reader suggestion
```

规则：

- `pageId` 是稳定 Entry ID，但来自 URL/隐藏字段时仍是不可信输入；供应商记录进入编辑流程前必须对已发布 Entry ID allowlist 复核。
- 2026-09-03 的未发布草稿包含 `pageId`、必填且配置为 3–240 字符的 `requestedTopic`、可选 `email`，以及填写 email 后触发的条件式 `emailConsent`；提交按钮文案为 `Send suggestion`，并已配置 thank-you page。以上只描述草稿结构，不证明发布后校验、可访问性、写入或成功语义。
- `requestedTopic` trim 后长度固定为 3–240 个 Unicode code point，只允许纯文本，不允许富文本、URL 附件或上传。
- `email` 与 `emailConsent` 均可省略，但必须同时省略或同时出现；显式空邮箱使用 `email: null` 与 `emailConsent: false`，非空 email 最大 254 个字符且必须配 `emailConsent: true`，该同意不得订阅 newsletter。
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

### 5.4 Minimal Analytics：Plausible Hosted 候选

推荐边界：

- 无 Cookie、无跨站追踪或持久标识；但 Plausible 仍处理 URL/path、HTTP referrer，并以 IP、User-Agent 与每日 salt 生成日级访问者标识，privacy notice 必须公开供应商、第三方域名、用途、字段、EU 处理、三年 dashboard 保留与退出。
- 关闭 outbound link、file download、form submission autocapture，也不使用会把完整 `href` 写入 property 的 CSS-class 自动点击事件。
- 默认 pageview 会保留 `ref`、`source`、`utm_*` 等 campaign query。接线时必须通过受控手动 pageview 或 `transformRequest` 把 URL 归一到 HTTPS origin + pathname、清除全部 query/hash，并把 referrer 清空或降为不含 path/query 的批准 origin；真实 network payload 必须逐字段验收。
- 只允许项目显式登记的手动事件；不添加应用自定义 properties，供应商 envelope 仍包含 event name、归一化 URL/referrer 及上述日级聚合所需请求元数据。
- 当前 Starter 最低档为 10k 月度 pageviews/custom events 合计约 $9/月、无长期免费档；手动 custom event 与 pageview 一样计入用量。Starter dashboard 当前保留三年，删除 site/stats 是退出入口；账户验收还须确认 30 天备份删除边界。
- analytics 成功不决定业务提交成功；静态供应商跳转无法可靠回传 newsletter/request 接受结果，因此 M5 不为二者发送 Plausible success 事件，只使用供应商已接受记录的聚合结果。

推荐的合格文章会话与深度语义：

- `article_session_qualified` 只在 production public Entry 上触发一次：主故事阅读区域至少进入视口一次，且页面处于 visible 状态的累计时间达到 15 秒；页面隐藏时计时暂停。刷新后重新计算，不持久化跨页或跨访问者标识。
- `qualified` 与 `depthReached` 是同一 page load 内彼此独立的 predicate。`depthReached` 在视口底部首次越过主故事阅读区域从起点到终点的 75% 位置时置为 true；Quick Answer、Sources、Related Entries、Reader Request 与 Footer 不进入深度分母。
- `article_depth_75` 在两个 predicate 都为 true 时触发一次，顺序无关：可以先满 15 秒后越过 75%，也可以先越过 75% 再满 15 秒；刷新后两个 predicate 和 once-only 状态全部重置。
- 两个事件都不添加应用自定义 properties；页面路径由已确认的 analytics envelope 提供，必须去除 query/hash，不能添加 page ID、内容标题、用户或会话属性。

候选事件：

| 事件 | 触发语义 | 允许 payload |
| --- | --- | --- |
| `article_session_qualified` | Entry 主故事进入视口且累计 visible 15 秒 | 无应用自定义 properties |
| `related_story_click` | 用户成功激活站内 Related Entry 链接 | 无应用自定义 properties |
| `article_depth_75` | 同一 page load 的 qualified 与 depthReached 均成立，顺序无关且只触发一次 | 无应用自定义 properties |
| `outbound_recommendation_click` | 未来存在经批准的外部推荐入口后激活 | 无应用自定义 properties；当前没有入口，不实施 |

事件不得用于重建个人会话。Newsletter 和 Reader Request 的按钮点击、表单跳转或 analytics beacon 均不得改名为 submit success；对应转化只能以 Buttondown/Tally 已接受记录的聚合结果计算。

官方证据：

- [Plausible compliance](https://plausible.io/docs/compliance)
- [Plausible data policy](https://plausible.io/data-policy)
- [Plausible script options](https://plausible.io/docs/script-extensions)
- [Plausible custom event goals](https://plausible.io/docs/custom-event-goals)
- [Plausible PII boundary](https://plausible.io/docs/custom-props/introduction)
- [Plausible plans](https://plausible.io/docs/subscription-plans)
- [Plausible pricing](https://plausible.io/pricing)
- [Plausible data access/export](https://plausible.io/docs/data-access)
- [Plausible site data deletion](https://plausible.io/docs/delete-site-data)

### 5.5 Web Vitals/RUM：冻结最小合同，启用延后 M7

M5 不安装性能 beacon，也不把 Plausible 写成 RUM。以下 provider-neutral 最小合同及“启用延后 M7”已获 Project owner 确认；M7 仍须另行选择、验收并授权供应商，不得到发布后再临时放宽：

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

## 6. 目标技术与设计

### 6.1 当前 U3 与后续目标调用链

```text
U3 Footer Newsletter
  -> disabled email preview + inactive disclosure + local Privacy link
  -> stop: no form / action / network

U3 Entry Reader Request
  -> inactive disclosure + stable local page ID + local Privacy link
  -> stop: no fields / Tally link / network

U4 target after separate authorization
  -> exact Buttondown native POST / exact Tally hosted link
  -> provider validation / result / deletion verification

U5/M6/M7 target after separate authorization
  -> offline Plausible contract / stable production origin / production enablement
```

### 6.2 组件职责

- `NewsletterForm`：U3 只负责文案、disabled email preview、明确 inactive 状态和本地 privacy 入口；不渲染 `form`、action 或供应商链接，也不读取 Reader Request。U4 才能在单独授权后增加精确 transport。
- `ReaderRequest`：U3 只负责问题、用途/字段/独立 consent 说明、稳定 page ID、disabled CTA 和本地 privacy 入口；不渲染真实字段或 Tally 链接，也不订阅 newsletter。U4 才能在单独授权后增加精确 hosted link。
- `Analytics`：只负责显式事件 allowlist 与发送边界；不得扫描表单字段或自动采集 DOM 内容。
- `Privacy` 页面：U3 review 页面公开控制者联系入口、Gmail 运营规则，以及三类尚未启用的供应商计划、目的、字段、地区、保留、删除/导出、退订/退出与投诉路径；不得把未来计划写成当前处理事实。

### 6.3 静态与客户端 JavaScript

- U3 的 inactive Newsletter 与 Reader Request 不使用客户端 JavaScript，也没有第三方依赖；未来获批的原生 POST/托管外链目标方案同样不应要求站内客户端 JavaScript。
- Plausible 是 M5 唯一候选分析供应商，但 M5 只交付 provider-neutral 事件合同、条件 hook 与离线 fixture/policy 测试，不在当前 review 输出渲染远程脚本。M6 在真实 origin/config 已确认后负责 public artifact 接线与最终输出验证，M7 才在 production 启用。
- review 构建默认不连接真实 analytics 或真实写接口。若需要 UI 评审，只能显示明确不可提交的 review 状态，不能假成功，也不能把生产 action 写入自动化 fixture。
- 无 JavaScript 时正文、Sources、导航、U3 inactive 说明和 Privacy 仍可用；未来真实交互及 75% depth analytics 的故障都不能影响阅读。

### 6.4 Output allowlist

U3 已保持并加强 review 默认拒绝：

- 所有 review 页面继续拒绝 `form`、`script`、供应商 action/link、inline event handler、远程子资源与客户端 JavaScript。
- HTML5 DOM oracle 要求每页 Footer 内恰有一个 inactive Newsletter；只允许两个 Entry 在 Sources 与 reading paths 后各有一个匹配 page ID 的 inactive Reader Request，其他页面不得出现。
- `/privacy/` 必须显示已确认联系和真实的“当前未启用”状态，并拒绝 `mailto:`、占位符或可能触发提交的结构。
- U4 若获独立授权，才可为 Footer 中一个精确 Newsletter form 和一个精确 Tally HTTPS anchor 新增窄 allowlist；action/link、字段、method、账户和测试数据必须先写回本文。U5/M6/M7 的 Plausible fixture、public 接线与 production 请求也分别后置。
- 禁止 inline event handler、任意 fetch、未知字段、远程 CSS/字体/图片、anchor ping 与 query 中的 PII。

### 6.5 隐私、安全与可观测性

- 客户端无密钥；仓库不保存 subscriber list 或 Reader Request。
- 自动化网络 transport 必须由 Fake 注入；任何意外真实网络调用都失败。
- 日志只能记录错误类别、provider 名与不含 PII 的 request correlation；不得记录完整 email、建议、URL query 或供应商 token。
- timeout/断连/unknown result 不自动重试真实写入；先只读回查 provider 状态。
- newsletter 与 Reader Request 各自有独立同意和删除/退出路径。
- 公开隐私联系入口已经确认并只存在于 noindex review；进入 M6 public artifact 前仍须按真实 hosting、origin 与 provider 状态复核并更新，不能把本地 review 页面视为已发布隐私说明。

## 7. 影响清单

| 类型 | 新增、修改或删除 | 目标文件、对象或系统 | 目标行为 | 对应验收 |
| --- | --- | --- | --- | --- |
| 需求 | 新增 | 本文 | M5 业务、数据、隐私、供应商与实施单元合同 | 文档门禁 |
| 当前事实 | 当前修改 | README、DEV_WORKFLOW、001、003 | 同步 M4 历史 8 页基线、U3 后当前 9 页、U3 已完成、U4 账户准备事实与下一停点 | 文档状态一致性/Git 只读核查 |
| 领域合同 | 当前修改 | PRODUCT、ARCHITECTURE、CONTENT_MODEL、REFERENCES | 同步已确认的公开隐私、保留、同意、供应商准备状态、无自定义域名与 canonical 边界 | 文档合同一致性/链接与格式回归 |
| 纯合同/Mock | 当前新增 | `src/services/`、`tests/services/` | 严格 DTO、Fake adapter、脱敏失败与零网络 | M5-U2 |
| 页面/组件 | 当前新增/修改 | Footer、Entry、Privacy、样式 | 单一 inactive Newsletter/Reader Request、review 隐私入口 | M5-U3 |
| 输出策略 | 当前修改 review；public 后置 | review policy、verifier、site tests | U3 默认拒绝、inactive DOM oracle；真实放行后置 | M5-U3/U4 |
| 外部供应商 | 账户准备已发生；配置/接线后续 | Buttondown、Tally、Plausible | Buttondown 审核中、Tally Free 草稿未发布；经授权后才允许测试/生产边界 | M5-U4/U5 |
| 依赖/锁 | 当前无 | package/lock | 推荐静态方案不需要新增依赖 | inventory 回归 |

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
- 完成条件：语义顺序为 Sources → Related/Collection path → Reader Request → Footer；label、说明、可用 Privacy link 的可见 focus、移动布局和零 JS/零第三方依赖由源代码与构建输出 oracle 验证。原生 disabled 控件有意不进入焦点顺序；真实第三方失败行为属于 U4，不是 U3 完成证据。

### M5-U4 供应商配置与测试联调

- 目标：在 Buttondown 审核完成且 Tally 草稿获发布授权后，验证 action/link、字段、double opt-in、条件 consent、CAPTCHA、重复、429、错误、保留、导出与删除。
- 当前状态：只完成账户准备快照；Buttondown 仍在人工审核，Tally 草稿仍未发布，真实写入与联调未授权，因此 U4 未完成。
- 授权：每个供应商单独记录账户、计划、环境、合成数据、写入数量、停止、回查与删除；测试邮箱必须由 Project owner 明确控制。
- 完成条件：真实行为与本文一致；unknown result 不重复写；测试数据已回查并按计划删除。

### M5-U5 Minimal Analytics 合同与条件 Hook

- 目标：交付 provider-neutral pageview/事件合同、Plausible 候选 adapter、条件 hook 和离线 fixture/output-policy 测试；M7 RUM 责任保持独立。
- 进入条件：Project owner 已确认事件语义、Plausible 候选、费用边界和 privacy notice 所需内容；不要求 M6 才会建立的真实 origin 或 public artifact。
- 不交付：真实远程脚本请求、production domain 配置、真实事件写入或 public artifact 接线。
- 完成条件：review/noindex 零脚本边界保持；fixture 只允许精确脚本/域名/事件；无 PII/autocapture；reading state 覆盖 qualified→depth、depth→qualified、hidden pause/resume、once-only、refresh reset 与非故事区排除；第三方失败不影响阅读。M6 负责真实 origin 下的 public 条件接线与制品验证，M7 负责 production 启用和唯一 RUM producer。

## 9. 测试与验收

| 层级 | 场景 | 输入或前置 | 期望结果 | 当前结果 |
| --- | --- | --- | --- | --- |
| 文档 | 状态、链接、UTF-8、供应商事实 | M5-U1 草案与 Project owner 账户现场事实 | 无占位符、断链或当前事实冲突 | 账户/草稿准备状态已同步；供应商真实行为仍待联调验收 |
| 单元 | Newsletter 字段 | 合法/未知/错误 email | 只接受精确字段并脱敏失败 | 通过；核心 DTO 只含 email，Buttondown `embed` 被拒绝并后置 mapping |
| 单元 | Reader Request | 长度边界、未知 page、email/consent 组合 | 严格通过或失败；provider 字段不可伪造 | 通过；含 astral Unicode、allowlist、Submission/Record 分离与 timestamp 负例 |
| 单元 | Analytics | 允许/未知事件、provider-neutral envelope 与 PII properties | 只允许显式事件和归一化 URL/referrer，不添加应用自定义 properties | 通过；三个事件、同 origin HTTPS、query/hash/referrer 清洗与 properties/PII 负例闭合 |
| 单元 | Analytics reading state | qualified/depth 两种顺序、hidden pause/resume、重复观察、刷新、非故事区 | 两事件各 once-only；顺序不漏记；刷新才重置；隐藏时间与非故事区不计入 | 未实施 |
| 单元 | Adapter failure | unavailable/rate-limit/timeout/unknown | 不假成功、不盲重试、不泄露 PII | 通过；三类 Fake 均覆盖五类结果，validation result 不回显输入，fetch trap 为零调用 |
| 输出 | Footer/Entry 唯一性、顺序与 Privacy | review HTML5 DOM fixture/静态输出 | 只有 approved inactive 入口，其他 form/script/provider link 失败 | 通过；9 页逐页核对 Newsletter，2 个 Entry 核对 Reader Request，Privacy 拒绝 mailto/占位符 |
| 构建 | 静态/noindex/public 负边界 | 固定运行时 | review 不接真实服务；内容核心不变 | 通过；9 页、42 Hero、10 WOFF2、零 XML、零客户端 JavaScript；public artifact 仍不存在 |
| 浏览器 | 390/768/1440、键盘、200%、无 JS、错误恢复 | 经授权 preview | 无阻塞布局/焦点/阅读问题 | 未执行 |
| 真实联调 | Buttondown/Tally/Plausible | 独立授权和合成数据 | 与合同一致并完成回查/删除 | 未授权 |

真实命令只引用 `DEV_WORKFLOW.md`；在入口未建立前不在本文写假命令。

## 10. 环境、数据和外部影响授权

| 动作 | 环境与影响 | 所需授权 | 当前状态 |
| --- | --- | --- | --- |
| M5-U1 文档 | 当前本地 Markdown | 用户已授权继续下一阶段 | 供应商研究完成；U2 子合同过门已满足，整体 provider 决定未关闭 |
| 本地代码/测试 | 当前仓库；不访问网络 | Project owner 已授权 M5-U2 | 已实施；只含纯合同、Fake 与自动化，未启动服务或访问网络 |
| M5-U3 页面/测试 | 当前仓库；纯静态 review 输出 | Project owner 已授权 006 与 inert review UI | 已实施并本地验证；无账户、action/link、外部写入、依赖、服务或网络 |
| M5-U4 账户准备 | Buttondown 与 Tally 外部账户；无站点连接或数据写入 | Project owner 已在任务前完成并提供只读现场事实 | Buttondown 审核中；Tally Free 草稿未发布；无 action/link、订阅者、邮件或 submission，未构成 U4 联调授权 |
| 依赖/配置 | package、lock、adapter、env | 单独说明并授权 | 推荐静态方案当前不需要；未授权 |
| 本地 dev/preview/browser | 进程、端口、浏览器状态 | 单独说明并授权 | 未授权 |
| Buttondown 写入 | 订阅请求、确认邮件 | 每次测试联调授权 | 未授权 |
| Tally 写入 | Reader Request record | 每次测试联调授权 | 未授权 |
| Plausible 事件 | 第三方 analytics | 环境与计划确认后授权 | 未授权 |
| Git 写操作 | add/commit/push/amend | 单独授权 | 未授权、未执行 |
| Vercel/部署 | 远端项目与环境 | 不属于 M5 本地单元 | 未授权 |

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

## 13. 当前最终结论

- 需求状态：M5-U3 子合同已确认；Buttondown 审核中账户与 Tally Free 未发布草稿已形成 U4 准备事实。Buttondown/Tally 仍只是 U4 条件方向，Plausible 留 U5，真实 transport 和 public origin 按后续单元逐项确认。
- 实施状态：M5-U2 纯合同/Fake 与 M5-U3 inert review 页面完成；U4 只完成账户准备，真实 transport、草稿发布、供应商配置、Plausible hook 与 RUM 均未开始。
- 验证状态：U3 定向 3 文件/79 测试、完整 25 文件/320 测试、Astro 81 文件零诊断、9 页 build/output verifier 通过。Project owner 提供的账户/草稿状态不是供应商行为验证；真实提交、浏览器视觉/键盘/缩放与网络失败未验证且未授权。
- 发布状态：未发布。
- 下一停点：等待 Buttondown 人工审核结果，以及 M5-U4 对 Tally 草稿发布、精确 action/link、合成数据写入、停止、回查和删除步骤的独立授权；不自动发布草稿或进入真实联调、U5、M6 与发布。
