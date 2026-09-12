# DEV_WORKFLOW.md

## GoatCounter 生产验收与激活入口（2026-09-10）

owner 已要求完成剩余 GoatCounter 验收与上线，并明确允许独立 Edge/CDP 临时浏览器及短时本地预览。仅使用新建 profile，不读取现有浏览器资料；结束关闭本次进程。此次不增加事件、服务或依赖，RUM、Newsletter、Reader Request 保持关闭，不执行 Git 写操作。

已在 clean `21cdbb6353bb14fe5ebced9ddfec1e94dc30a3a5` 上重新通过完整 698 测试、Astro 128 文件零诊断、review 零 JS 及 public 构建。冻结目录 `.local/goatcounter-release-21cdbb6/` 包含 140 文件 / 3,278,559 bytes；inventory SHA256 为 `1ca496b658912338d9a85080531820c2e660b531172699c3320c702bc78aab75`，request SHA256 为 `e04a7c64ebd54e52155e6183f449139c0125fd1a6e441d5337fd64835f0ad4fb`。本节之后的文档修改不进入已冻结制品；实际业务源码和原始字节不得变化。

本地入口使用固定 Node：

```powershell
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/goatcounter-release-21cdbb6/deployment-session.mjs --validate-only
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/goatcounter-release-21cdbb6/deployment-session.mjs --stdin-token
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/goatcounter-release-21cdbb6/browser-qa.mjs local
```

上述为本次已执行入口，不是重跑授权；创建、推广及 7 次真实统计预算均已使用。部署会话实际从关闭回显的 stdin 接收 project-scu6m 项目范围 Token，仅留进程内存。`preflight` 只读固定 project/team/domain/old deployment；`stage` 唯一 POST 使用 `target: production` 与 `autoAssignCustomDomains: false`，保持 Standard Protection 和旧公开域名。创建前持久化 attempt，未知结果只用 `reconcile` 查回，不重发 POST。`status/files` 只读检查；文件管理 API 证明上传源码，不能冒充实际 CDN 字节。通过本地及受保护页面验收后 `promote` 推广同一个 READY 部署；公开后立即核对完整 140 文件和限次浏览器传输。有阻塞故障时 `rollback` 恢复原 `dpl_D3E9hWGC4h19MSg1KcuVaiTWunwK`；若无法恢复，则 `protect` 加强为 All Deployments。回滚会关闭自动生产域名分配，必须记录；不删除任何部署。`close` 已执行，凭据会话结束。

真实发送预算为本轮独立的最多 7 次：首页首次与普通刷新 2 次 pageview，钟馗 pageview、qualified、depth75、Related 各 1 次，Related 目标 Chinese Underworld Guide pageview 1 次。只接受既有正式 origin 下的 GET 与 p/e，提前监听 Network/ExtraInfo/缓存/响应，拦住第八次及任何异常字段；无重试。原计划覆盖原生可见/隐藏计时、Story 75%、点击、同文档退出与实际 BFCache；原生完整流程未完成，最终阅读和退出测试明确采用 CDP focused/active 模拟，不能计为原生前后台验收。localhost、受保护预览和退出场景零发送；不伪造 webdriver、Origin 或生产地址。原生 GPC 不可用，保留未验证，不把注入值当浏览器偏好证据。

真实 QA 已进入现有规范路径的聚合；不得删除这些可能混有读者的路径。排除整个 UTC 2026-09-10 测试日，产品基线最早从 2026-09-11 00:00 UTC（北京时间 08:00）开始；7 条计数不是 7 位读者，也不是 RUM 基线。后台只读回查，不因报表延迟重发。截图、Network、临时脚本、profile 与平台回执均留忽略目录。

本次执行结果：

- 发布：08:23:47 UTC 唯一创建 `dpl_7bpnKu2bhRQPtv3E1TRibmn9dzDy`，08:46:22 UTC 同一 READY 部署原样推广，无重建。项目 `prj_U8IP9LhhpaeDC2dJlP0VVv3ciu70`、团队 `team_zxOM6nEHD6ZYTRcrAjbcwU3U` 与正式域名现场核对一致；Standard Protection 保持。原部署保留，本轮未回滚、删除或新增第二次部署。
- 制品：39/39 本地页面/视口组合通过且零统计发送；受保护站点抽查 Home、Privacy、Zhong Kui。推广后 08:47:08–08:47:57 UTC 完整 live smoke 确认 140/140 文件 200、正确 MIME、字节长度及 SHA256。唯一 JS 为 `/_astro/page.Br3bZ4bz.js`，7,172 字节，SHA256 `eabde04719862a9f6c0665f614f3cd416ad1984a24d4a652757899512d4fcadf`。该完整 CDN 证据独立于源文件 API。
- 收数：7/7 真实发送，后台无路径筛选的 2026-09-03 至 2026-09-10 范围显示 7 out of 7：首页 2、Zhong Kui 1、Guide 1，qualified/depth75/Related 各 1。后三种事件及 Guide 页面浏览在焦点模拟下完成；恢复诊断时的重复页面浏览在传输前阻断，不增加预算。
- Network：7 次均观测到实际 ExtraInfo 请求头，无 Cookie、Referer、Authorization，Origin 为正式站点，仅 GET p/e；普通刷新使用重新打开的同一专用 profile，未关闭浏览器缓存或硬刷新，观察到 no-cache/Pragma。6 次观测 HTTP 200；Related 点击后导航使其响应未被观测，以后台对应事件 1 条确认收数。初次响应 body 完成观察超时与中断记录保留，不把“请求已发出”或未观察到 loadingFinished 当作收数/失败结论。
- 退出：原生 Edge DNT 偏好实际返回 navigator.doNotTrack=1、普通文档请求 DNT:1，统计零尝试/零发送。独立退出检查仅在传输前阻断初始页面浏览；hash 退出后移除标记仍无新增尝试，query/hash 退出导航后实际 pageshow.persisted=true，BFCache 返回仍不恢复，真实发送为 0。该退出检查同样使用焦点模拟。原生 GPC、原生前后台完整流程、三平台真机、完整地区性能和 RUM 仍未验证；单独 visibility 诊断只复现可见时间不足，不能证明此前超时的唯一原因。
- 收尾：全部本次 Edge 进程、短时预览及凭据会话已结束；不需要工作电脑持续开机。业务源码未变，内容/来源/资产披露沿用已验证制品；本轮只同步稳定文档，未提交或推送。

本次实际补验入口为 `browser-qa-controlled.mjs live --resume-reading`、`browser-qa.mjs dnt` 和 `exit-qa.mjs`（均由上述固定 Node 运行）；完整 HTTP 校验使用同目录 `verify-public.ps1 -VerifyLive`。这些记录仅用于追溯，真实发送预算已经耗尽，不得重跑正向统计。主要回执均在 `.local/goatcounter-release-21cdbb6/`：`deployment-result.json`、`staged-qa.json`、`local-qa.json`、`public-smoke-20260910-084757-8589012.json`、`live-qa.json`、`live-resume-qa.json`、`live-controlled-qa.json`、`dashboard-final-counts.json`、`dnt-qa.json`、`exit-qa.json`；中断回执不改写为 passed，以后续逐项证据解释最终覆盖范围。原生焦点与模拟的区别见 [CDP Focus Emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setFocusEmulationEnabled)。

官方执行依据（2026-09-10）：[Vercel staged promotion](https://vercel.com/docs/deployments/promoting-a-deployment)、[项目范围 Token](https://vercel.com/docs/accounts/access-tokens)、[deployment files](https://vercel.com/docs/rest-api/deployments/list-deployment-files)、[Edge CDP](https://learn.microsoft.com/en-us/microsoft-edge/devtools/protocol/)、[Network](https://chromedevtools.github.io/devtools-protocol/tot/Network/)、[Fetch](https://chromedevtools.github.io/devtools-protocol/tot/Fetch/)。

## 分析与技术验收本地检查点（2026-09-10）

owner 已明确要求“提交一次吧”，本次授权形成一个本地检查点：保存此前 Hero sizes、技术验收文档、默认关闭的 RUM 实现，以及 GoatCounter 启用候选和退出/Privacy。本次不推送、部署、启动服务或改用 Edge/CDP，不发送真实统计。既有生产发布意图不扩大本轮执行范围。

父基线为 `29b3d953588d5f9dcb7b37d426a99a8760f22310` / main；进入时暂存区为空，精确范围为以下 39 个路径。业务代码不再修改；完整 41 文件/698 测试、Astro 128 文件零诊断、public 原始 bundle/Fake VM 与 review 零 JS，以及锁更新后 30 项回归沿用上轮已完成结果。本次核对文件范围、严格 UTF-8、文档链接和暂存 diff，不重复执行未变化的业务测试。当前日志/构建仍是提交前诊断；后续发布须按新的 clean revision 重新形成候选验证，不能自动升级旧证据为发布 receipt。

```powershell
$mythicCheckpointFiles = @(
  'DEV_WORKFLOW.md',
  'README.md',
  'astro.config.mjs',
  'docs/ARCHITECTURE.md',
  'docs/requirements/006-external-interactions.md',
  'docs/requirements/011-public-beta-validation.md',
  'docs/requirements/017-real-user-monitoring.md',
  'package.json',
  'pnpm-lock.yaml',
  'scripts/analytics-output-policy.mjs',
  'scripts/analytics-script.json',
  'scripts/review-output-policy.mjs',
  'scripts/verify-analytics-bootstrap.mjs',
  'scripts/verify-public-output.mjs',
  'src/client/site-analytics.ts',
  'src/layouts/SiteLayout.astro',
  'src/pages/privacy.astro',
  'src/site/analytics-configuration.ts',
  'src/templates/EntryTemplate.astro',
  'src/rum/bootstrap.ts',
  'src/rum/collector.ts',
  'src/rum/configuration.ts',
  'src/rum/contract.ts',
  'src/rum/web-vitals.ts',
  'tests/architecture/project-boundaries.test.ts',
  'tests/client/analytics-bootstrap.test.ts',
  'tests/client/site-analytics.test.ts',
  'tests/site/analytics-configuration.test.ts',
  'tests/site/analytics-output-policy.test.mjs',
  'tests/site/external-interactions-ui.test.ts',
  'tests/site/public-output-policy.test.mjs',
  'tests/site/review-output-policy.test.mjs',
  'tests/rum/collector.test.ts',
  'tests/rum/output-boundaries.test.ts',
  'tests/rum/sqlite-fixture.ts',
  'tests/rum/worker.test.ts',
  'workers/rum/schema.sql',
  'workers/rum/store.ts',
  'workers/rum/worker.ts'
)
if ((Resolve-Path -LiteralPath (git rev-parse --show-toplevel)).Path -ne 'F:\codex-project\mythic-china') { throw 'Unexpected Git root.' }
if ((git branch --show-current) -ne 'main') { throw 'Unexpected branch.' }
if ((git rev-parse HEAD) -ne '29b3d953588d5f9dcb7b37d426a99a8760f22310') { throw 'Unexpected checkpoint parent.' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Expected an empty staging area.' }
$mythicPendingPaths = @(git diff --name-only --no-renames) + @(git ls-files --others --exclude-standard)
if (Compare-Object ($mythicCheckpointFiles | Sort-Object) ($mythicPendingPaths | Sort-Object)) { throw 'Checkpoint scope changed.' }
git --literal-pathspecs add -- $mythicCheckpointFiles
if ($LASTEXITCODE -ne 0) { throw 'Checkpoint staging failed.' }
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged whitespace check failed.' }
$mythicStagedPaths = @(git diff --cached --name-only --no-renames)
if (Compare-Object ($mythicCheckpointFiles | Sort-Object) ($mythicStagedPaths | Sort-Object)) { throw 'Staged inventory changed.' }
git diff --cached --stat
```

暂存复核通过后执行一次提交：

```powershell
git diff --quiet
if ($LASTEXITCODE -ne 0) { throw 'Unstaged changes remain.' }
if (@(git ls-files --others --exclude-standard).Count -ne 0) { throw 'Untracked files remain.' }
git commit -m "feat(analytics): prepare GoatCounter activation and local RUM"
if ($LASTEXITCODE -ne 0) { throw 'Local checkpoint commit failed.' }
git log -1 --format='%H %P %s'
git status --short --branch
git diff --cached --stat
```

收口核对新提交父节点和完整 39 路径、工作树/暂存区/未跟踪文件均为空；实际哈希以 Git 历史和执行结果为准，不在提交文本预写自身哈希。下文及各需求中的“未提交”属于此前实施快照，以本次授权和执行后现场为准。当前只关闭本地保存停点；真实 Network/缓存/导航、独立 Edge/CDP 授权及最终发布验证仍未完成，线上统计保持原关闭版。

## GoatCounter 启用收尾（2026-09-10）

owner 已要求处理既有统计的验证、启用和发布。范围见 [006 第 12.12 节](docs/requirements/006-external-interactions.md#1212-goatcounter-启用收尾2026-09-10)。本地先完成 production 开关、退出判断、双构建 Privacy、精确 bundle 锁和匹配检查；不得把本地开启写成线上已经收数。保留此前 Hero sizes 和关闭的 RUM 实现，不恢复表单测试、不创建新服务、不安装依赖、不复用已耗尽的四次合成发送入口。

先执行本文固定 Node/Corepack/pnpm 身份与进程 PATH 门禁，再沿既有定向 Prettier 入口格式化本节直接涉及的文件。检查命令如下；public 使用本文既有显式 origin 的 try/finally 入口，最后恢复 review 输出。

```powershell
& $mythicProjectCorepack pnpm run test tests/client/site-analytics.test.ts tests/client/analytics-bootstrap.test.ts tests/site/analytics-configuration.test.ts tests/site/analytics-output-policy.test.mjs tests/site/external-interactions-ui.test.ts tests/site/review-output-policy.test.mjs
& $mythicProjectCorepack pnpm run check
& $mythicProjectCorepack pnpm run build:public
& $mythicProjectCorepack pnpm run build
```

bundle 变化时沿 M6 既有流程：第一次 public 构建应拒绝旧脚本锁；检查实际唯一 JS、全部依赖和原始字节后，手动更新 `scripts/analytics-script.json` 的路径与 SHA256，再重跑输出验证。VM 中执行原始制品只能使用 Fake fetch，不能视为真实浏览器请求头证据。

本次只读账户核查：当前登录 `mythic-china` 看板，2026-09-03 至 2026-09-10 无路径过滤的报表为 0；Settings 的 site 为正式域名、retention 为 90、八项 Data collection 均未勾选、Dashboard 仅登录用户可见。Preferences 的时区已核对为 Asia/Shanghai，邮件报表 Never。未保存或改动设置。真实 Origin 下的请求头/缓存/导航仍需受支持的 Network 入口；现有内置浏览器不提供该入口。Git 检查点、真实浏览器执行及发布前先固定实际文件、身份与验证范围，不能复用旧包、旧 token 或旧发布脚本的身份。

## RUM 本地实施（2026-09-10）

owner 已要求实施 RUM，随后明确“还没有账户，先完成本地实现”。[017](docs/requirements/017-real-user-monitoring.md) 负责最小字段、窗口和退出合同。本批仅在既有项目增加锁定的 `web-vitals@6.2.1`、默认关闭的构建接线、独立 Worker/D1 源码与零网络测试；不安装 Wrangler、不创建账户/数据库、不启动服务、不发送真实测量，不执行 Git 或部署。

先执行本文固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 身份门禁和进程 PATH 设置。依赖仅从当前配置的 npm registry 读取并锁定该精确版本，不执行包脚本或改变成熟期、代理、证书、全局安装与其他依赖版本：

```powershell
& $mythicProjectCorepack pnpm view web-vitals@6.2.1 version dist.integrity dependencies --json
& $mythicProjectCorepack pnpm add --save-exact --ignore-scripts web-vitals@6.2.1
& $mythicProjectCorepack pnpm run test tests/rum tests/architecture/project-boundaries.test.ts
& $mythicProjectCorepack pnpm run check
# 沿本文既有 origin try/finally 入口进行 public → review 构建。
& $mythicProjectCorepack pnpm run build:public
& $mythicProjectCorepack pnpm run build
```

定向格式化只作用于 017 列出的本次文件，使用既有 pnpm exec prettier --write 入口。测试中的 SQLite 为 Node 自带的 `:memory:` 数据库，结束即关闭，不连接 Cloudflare、不创建持久文件。测试库/传输均注入 Fake，Worker 仅在内存接收合成 Request。相对链接验证先排除 fenced 与 inline code，避免将旧说明中的 PowerShell 类型转换识别为链接；不改原代码例子。

当前 `rumDeployment = null` 明确表示未配置，不生成假 endpoint/数据库 ID、Wrangler 发布文件或启用日期。接通时先核对真实账户，再准备精确 binding、Free 成本限制、日志禁用、每小时 Cron、开窗与退出命令；将入口写入本文后取得对应运行/发布授权。当前 public verifier 仍拒绝任何未审 RUM 脚本，生产启用还需精确 bundle 清单和原始制品执行验证，不能仅改开关。

本批验证：新增 35 项 RUM 测试，最终完整 check 为 41 文件/690 项，Astro 128 文件零诊断；独立审查发现的观察器部分注册失败后禁发缺口已修正，并补 quota 429 回归。public → review 构建与输出验证通过，仍为 public 140 文件/原唯一 inactive analytics JS、review 14 页零 JS。只读与原冻结上传包逐文件比对：六篇 Entry 的原 sizes 修正及 Privacy 为差异，其余 133 文件字节相同；本批无 RUM JS、meta 或远程请求。内容、来源、资产/字体及披露不变，Privacy 新增未启用计划；细节与未验证项见 017。此处全部是未提交源码的本地诊断，无发布 receipt。

依赖 registry 核查首次受本机网络限制失败，获自动审批后仅访问官方 registry，核对 6.2.1 integrity 并安装；锁文件只多一个无传递依赖的 web-vitals。定向 prettier 遇已知 PATH/Path 重复键后，使用本文既有单一 PATH 的 Node/Corepack 子进程入口成功格式化本批文件，未改系统或项目环境。无新服务、真实数据、Git 写入或远端部署。

## 钟馗移动 LCP 诊断与尺寸修正（2026-09-10）

owner 同意继续定向诊断和最小优化。本批先对公开旧版钟馗补做两次 PSI，与 11:11 原记录合为三轮，全部保留；只提交同一公开 URL，不提供认证信息。PSI 的手机配置沿既有 412×823 / DPR 1.75 / slow 4G；自动附带的桌面结果也保留。不能把相同模拟参数当作相同主机性能，也不能将这些旧版结果标为本地修改后的收益。

本地改动仅为 `src/templates/EntryTemplate.astro` 的手机 sizes：使用与现有 CSS 相同的 `47.99rem` 布局条件与 `calc(100vw - 2rem)`；保留桌面 90vw、picture 构图条件、候选文件、字体、CSS、内容和客户端脚本。合同见 [011 第 2.2.4 节](docs/requirements/011-public-beta-validation.md#224-钟馗移动-lcp-诊断与最小修正)。原四份文档的未提交改动保留；本批不安装依赖、启动服务、启用采集或执行 Git/部署。

执行顺序：复测旧版并保留异常 → 修正尺寸声明 → 完整 check、显式 origin 的 public 构建与逐文件差异核对 → 回到 review build。以下沿本文固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 与进程 PATH 身份门禁；public origin 只在子进程环境临时设置并恢复，不改配置文件。`.local/public-build/` 已只读确认为本项目内的实际目录；构建只刷新诊断输出，不覆盖原冻结上传包和发布回执。

```powershell
& $mythicProjectCorepack pnpm run check
# 使用本文既有 MYTHIC_CHINA_SITE_ORIGIN 的 try/finally 入口。
& $mythicProjectCorepack pnpm run build:public
& $mythicProjectNode .local/post-launch-technical/audit-entry-sizes.mjs
& $mythicProjectCorepack pnpm run build
```

差异核对只读新 public 输出和原冻结请求包：全部文件名单一致；只允许六篇 Entry 的四个 source 和一个 img 的 sizes 改变，其余 HTML 文本、图片/字体/CSS/JS/XML/robots 的字节保持。脚本与新 PSI 转录保存在忽略目录 `.local/post-launch-technical/`。它证明输出范围，不是浏览器 currentSrc、精确图宽或性能收益的验收；本批没有可用 trace/HAR 入口。

方法依据（访问于 2026-09-10）：[WHATWG source size](https://html.spec.whatwg.org/multipage/images.html#source-size)、[W3C Media Queries 单位](https://www.w3.org/TR/mediaqueries-4/#units)、[Google LCP 分段诊断](https://web.dev/articles/optimize-lcp)。sizes/MQ 中 rem 使用初始字号；当前根元素没有作者 font-size，不能将其推广成会跟随未来 html 字号覆盖。小于站点最小宽度、占位滚动条和既有构图断点的精确浏览器行为仍需实测。

三轮公开旧版结果如下，时间均为 2026-09-10 北京时间，LCP/TBT 单位为 ms：

| PSI 报告 | 手机分数 / LCP / TBT / CLS | 桌面分数 / LCP / TBT / CLS | 报告列示的基准指数（手机 / 桌面） |
| --- | --- | --- | --- |
| [11:11 原记录](https://pagespeed.web.dev/analysis/https-mythic-china-beta-vercel-app-explore-zhong-kui/6tuhupfmsx?form_factor=mobile) | 95 / 2710 / 0 / 0 | 100 / 482 / 0 / 0 | 134 / 756 |
| [11:38 补测](https://pagespeed.web.dev/analysis/https-mythic-china-beta-vercel-app-explore-zhong-kui/pnqqw684fn?form_factor=mobile) | 97 / 2255 / 0 / 0 | 72 / 910 / 495 / 0 | 950 / 62 |
| [11:41 补测](https://pagespeed.web.dev/analysis/https-mythic-china-beta-vercel-app-explore-zhong-kui/pgnu4lkmh5?form_factor=mobile) | 96 / 2552 / 0 / 0 | 100 / 402 / 0 / 0.04 | 402 / 504 |

完整页面转录摘要在 `.local/post-launch-technical/psi-lcp-repeats.json`，未覆盖上一批四份报告。手机 LCP 为 2.255–2.710s，三次中位数 2.552s；这不是 RUM p75。基准指数为报告原字段，不是 CPU 使用率。11:38 桌面 TBT 495ms、未归因强制重排 505ms 与两条较长文档任务均保留，不能用其他两次高分排除该异常，也不能直接归因本站 module 或字体。环境差异与页面开销的影响尚未分离。

手机原始元素渲染延迟依次为 1,130 / 1,920 / 960ms，仍是优先需要 trace 解释的区间；报告没有给出足以证明具体解码、字体或布局因果的轨迹。第三轮相同显示配置下的图片审核需求又从 665×831 变为 380×475，故不能将单次估算的节省字节视为确定收益。本批停止继续刷 PSI 分数，保留范围内的一行修正；后续使用可提供 trace 的固定浏览器环境做单变量验证。

本批验证完成：格式、lint、38 文件/655 项测试、Astro 117 文件零诊断与 review 输出门禁通过；随后显式 origin 的 public → review 构建分别通过 13/14 页输出门禁。首次完整检查被本批及上一批忽略目录脚本缺少显式 Node 全局导入阻断，已仅补这些自有脚本的 Node 导入，再运行完整 check 通过，没有改 ESLint 范围或放宽规则。

`entry-sizes-output.json` 确认相对原包的 140 文件名单相同，134 个文件逐字节一致；六篇 Entry 每篇只变四个 source 和一个 img 的 sizes、各增加 80 bytes，回替新声明后与原 HTML 完全一致。内容、来源、alt/图注/AI 披露、原图与 112 个输出、10 份字体、CSS、JS 均保持；非默认视觉生产不适用。构建诊断与现有相关测试通过；单行声明无需额外职责注释。源码未提交，public 输出只是本地诊断，没有形成新的发布 receipt。

下一项具体运行方案（尚未执行/授权）：已只读确认本机 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` 为 152.0.4191.66。拟用新建的独立临时浏览器资料目录，通过本机 CDP 调试连接录制性能轨迹；短时启动只监听 127.0.0.1 的静态预览，分别读取原冻结包与本次已核验输出，两版各三次固定手机条件，保存请求/图片选择/绘制和主线程事件。只读这些公开制品，不使用现有登录资料、不安装依赖、不接远端调试端口或上传日志，结束时关闭本次启动的浏览器和预览进程。浏览器控制工具要求使用其他控制方式须由用户明确指定；AGENTS.md 也要求服务启动有明确授权。因此当前停在此方案，取得针对独立 Edge/CDP 与本地预览的明确许可后，再实例化并执行诊断脚本。它不会自动授权提交、部署或 RUM。

## 发布后技术验收（2026-09-10）

本轮 owner 明确要求补浏览器 Network、美国东/西部与欧洲性能、跨平台实机及 RUM 方案。只检验已公开的 `dc0ad2d` / `dpl_D3E9hWGC4h19MSg1KcuVaiTWunwK`，不重建或重发原 140 文件，不启用统计/表单/RUM、不注册付费服务、不修改网络安全设置、不提交或推送。当前文档检查点为 `29b3d953588d5f9dcb7b37d426a99a8760f22310`；它不替换实际制品源身份。

测试页面为首页和 `/explore/zhong-kui/`。忽略目录 `.local/post-launch-technical/prepare.mjs` 先核对不可变原请求 SHA256，再用 HTML5 parser 逐篇枚举 picture 的真实 emitted 候选；按每个 picture 最大文件之和作保守排序，钟馗为 102,162 字节，下一篇为阴间指南 67,998 字节。该排序不是浏览器实际传输量。选择依据保存为 `page-selection.json`。

地区 HTTP 使用 Globalping 免费匿名 API，位置明确为 US/VA、US/CA、DE/Frankfurt；2026-09-10 节点清单分别有 82、219、197 个匹配候选。每页两轮、每轮三节点，本批最多 12 个节点测量；第二轮引用第一轮 ID 尽量复用节点。仅发送公开 hostname/path，不携带 Cookie、Token 或认证信息；结果可凭 ID 分享，原始回执仅存忽略目录。响应未知即保留 ID/请求并停止，不自动重发 POST。HTTP 测量不执行 JavaScript，不是完整 Network、LCP、CLS、INP 或移动/桌面验收；第一轮也不能自动标成冷缓存。

唯一执行入口：

```powershell
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/post-launch-technical/prepare.mjs
# 默认只读准备校验，零网络调用；需要已有公开节点清单。
powershell.exe -NoProfile -File .local/post-launch-technical/measure-regions.ps1
# 本次已授权的 12 节点上限，结果写入新的时间命名目录；重复执行是新一轮测量。
powershell.exe -NoProfile -File .local/post-launch-technical/measure-regions.ps1 -Measure
# 只从本次已完成回执生成摘要，零网络；固定本次结果目录。
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/post-launch-technical/summarize-regions.mjs
# 零网络：核对 PSI 页面摘录的资源总量与原上传包文件名单。
& 'D:\Program Files\nvm\v24.16.0\node.exe' .local/post-launch-technical/audit-psi.mjs
```

Node 沿既定项目运行时，未安装依赖；Globalping 的 HTTPS 通过 Windows PowerShell 系统默认网络入口执行，没有变更代理或证书验证。curl 直接访问 Globalping/Google API 连接失败，系统默认入口随后成功取得 Globalping 节点清单；失败不记为站点性能问题。浏览器通过受支持 CUA 界面访问公开页面与 WebPageTest；其当前 tab 能力只有 pageAssets/webmcp 与 console logs，没有完整 Network/HAR 入口。不得用底层调试协议绕过工具限制。跨平台只记录实际提供的设备；Windows PnP 查询未发现连接的 WPD/Android/iPhone/iPad/ADB 目标，不把模拟视口或本机 Windows 结果算成其他实机。

官方方法依据（访问于 2026-09-10）：[Globalping OpenAPI](https://github.com/jsdelivr/globalping/blob/master/public/v1/spec.yaml)、[HTTP schema 与计时](https://github.com/jsdelivr/globalping/blob/master/public/v1/components/schemas.yaml)、[免费额度](https://globalping.io/credits)、[WebPageTest 匿名入口](https://www.logicmonitor.com/webpagetest)、[PSI 方法](https://developers.google.com/speed/docs/insights/v5/about)。Globalping `firstByte` 不含 DNS/TCP/TLS；报告分别保留原值与这些分项之和的推导首字节延迟，不能混作浏览器 navigation TTFB。完整三地区实验室矩阵仍按 ARCHITECTURE；RUM 方案由 006 第 5.5 节负责，不由 HTTP 探针替代。

### 三地区 HTTP 实测结果

测量时间为 2026-09-10 02:51:47–02:51:58 UTC（北京时间 10:51）。全部 12 个节点结果为 `finished / HTTP 200`；TLS 1.3 与主机证书核查通过。表内数字为第一轮 → 第二轮，单位毫秒：

| 页面 | 实际节点 | firstByte 等待 | DNS + TCP + TLS + firstByte | HTTP 总耗时 | CDN 缓存 |
| --- | --- | --- | --- | --- | --- |
| 首页 | Reston, Virginia / AS16276 | 117 → 41 | 150 → 54 | 152 → 55 | MISS → HIT |
| 首页 | Los Angeles, California / AS36352 | 24 → 24 | 67 → 58 | 68 → 60 | HIT → HIT |
| 首页 | Frankfurt, Germany / AS31898 | 345 → 153 | 357 → 162 | 358 → 164 | MISS → HIT |
| 钟馗 | Reston, Virginia / AS16276 | 88 → 142 | 115 → 152 | 116 → 153 | MISS → HIT |
| 钟馗 | Los Angeles, California / AS36352 | 20 → 18 | 60 → 57 | 65 → 61 | HIT → HIT |
| 钟馗 | Frankfurt, Germany / AS31898 | 157 → 8 | 208 → 17 | 209 → 18 | MISS → HIT |

原始请求、创建响应、完整 API 结果与 index 保存于 `.local/post-launch-technical/globalping-20260910-025146-5171056/`，独立摘要为 `.local/post-launch-technical/regional-summary.json`。四个测量 ID 依次为首页首/复轮 `2HkPeOo0G9ryp3EZy000216iJ` / `2z5cK2i3cZCC8n0Ph000216iJ`、钟馗首/复轮 `2D7xmFGGHKpGZxUxL000216iJ` / `2gDZQYhvBPYbVJUqj000216iJ`。

结论限于这 12 次 HTTP 请求：总耗时 18–358ms，第二轮 6/6 CDN HIT。每页两轮的节点元数据一致；不声称两页都使用同一台物理探针。西部首轮已经 HIT，东部钟馗第二轮耗时更长，不能写成“冷/暖浏览器缓存已测”或“缓存命中一定更快”。API 正文全部截断为前 10,000 字符，不能独立证明完整文件摘要或部署 ID；制品身份沿用原发布完整性证据，没有重新标记为新源码版本。

### 浏览器实验室结果与请求证据

WebPageTest 官方匿名入口在提交一次公开首页后显示免费测试次数已用尽，未提供报告；没有重复提交、注册或升级。随后通过 Google PSI 官方网页分别提交首页和钟馗各一次，每次同时生成手机/桌面报告；只提交公开 URL，未向测量工具提供目标站认证信息。报告为北美洲的初始页面加载，未指定美东/美西，也没有欧洲或复访数据。

| 页面 / 档位 | PSI 性能分 | FCP | LCP | CLS | TBT | 总传输量 |
| --- | --- | --- | --- | --- | --- | --- |
| 首页 / 手机 | 99 | 1.352s | 1.802s | 0 | 0ms | 261,936 bytes |
| 首页 / 桌面 | 100 | 0.254s | 0.321s | 0 | 0ms | 203,617 bytes |
| 钟馗 / 手机 | 95 | 1.660s | 2.710s | 0 | 0ms | 376,969 bytes |
| 钟馗 / 桌面 | 100 | 0.322s | 0.482s | 0 | 0ms | 368,903 bytes |

原报告：[首页（11:05 北京时间）](https://pagespeed.web.dev/analysis/https-mythic-china-beta-vercel-app/y5l7tejy9r?form_factor=mobile)、[钟馗（11:11 北京时间）](https://pagespeed.web.dev/analysis/https-mythic-china-beta-vercel-app-explore-zhong-kui/6tuhupfmsx?form_factor=mobile)。两份均为 Lighthouse 13.4.1 / HeadlessChromium 151.0.7922.71；手机模拟 412×823、DPR 1.75、150ms TCP RTT、1,638.4kb/s、CPU 1.2× slowdown，桌面模拟 1350×940、DPR 1、40ms RTT、10,240kb/s、CPU 1×。主机基准性能有波动，单次样本不能归因或作为 p75。其 Android/Mac UA 是模拟配置，不是对应真机。

PSI 的网络载荷表已提供初始加载的资源与字节证据：四份表显示的第三方资源数均为 0，所列文档、CSS、字体、AVIF 与原 module 均为正式同源。钟馗表展示 10 项资源：六份 WOFF2、一个 Hero、一份 CSS、文档和一个 3,316 bytes 的 module；手机 Hero 实际传输 42,034 bytes（资源本体 41,460），桌面 Hero 33,968 bytes。这些是报告展示的资源条目，不是完整 HAR，不证明导航、展开、滚动、后台/退出期间绝无额外请求，也没有逐请求 Cookie/Referer/响应头证据。当前 CUA 不提供该捕获能力，仍保留完整 Network 待验收项。

本轮发现：钟馗手机 LCP 为 2.710s，报告建议缩小所选 960×1200 Hero，目标显示需求为 665×831、预计可省约 21KiB；LCP 原始诊断另显示资源加载延迟 200ms、下载 180ms、元素渲染延迟 1,130ms。它们与模拟后的 LCP 不是同一计时口径，不能相加求差。应先复核图片候选、字体/CSS 的渲染链和重复测量，再决定最小优化；本轮没有据此改业务代码。两页 CrUX 均显示无数据；TBT 不能充当 INP，Lighthouse 的自动无障碍高分也不关闭人工验收。

PSI 可见指标及资源表摘录保存于 `.local/post-launch-technical/psi-summary.json`，明确标注为页面转录而非原始 API/HAR；`audit-psi.mjs` 检查四表求和、38 条显示资源与不可变上传包的文件映射，以及 Hero 本体字节，不把该校验当远端响应哈希检查。

源码只读核查支持下一轮诊断边界：[Hero 组件](src/components/ManifestHeroPicture.astro)已使用静态 picture、eager/high，没有等待 JavaScript 展示的入口；[文章模板](src/templates/EntryTemplate.astro)手机 `sizes=100vw` 与 [CSS](src/styles/global.css) 的 `100vw - 2rem` 内容宽度有误差，但 [响应式合同](src/visual/visual-asset-schemas.ts)固定 640/960/1440/1920，报告所需 665px 仍超过 640，单改 sizes 不保证降档。字体已采用 swap，CJK 已有子集。下一最小诊断是在可取得 trace 的固定手机环境重复约三次，先定位图片下载结束至绘制的间隔；768px 中档或字体预加载对照仅为待验证候选，前者需同步资产合同，不能直接改一个清单绕过门禁。

### 剩余验收的执行范围

| 项目 | 固定检查范围与应保留证据 | 当前停止条件 |
| --- | --- | --- |
| 完整浏览器 Network | 在无目标站登录态的窗口中，从首个导航开始保留请求；首页 → 钟馗 → Sources/合集/相关阅读，检查图注展开、滚动至 75%、可见等待至少 20 秒及后台/返回。核对全部请求 URL、类型、发起方、状态、缓存、传输量及必要请求头；Newsletter/Reader Request/GoatCounter/RUM 不应发送。原始敏感头不进入仓库 | 需要受支持的 Network/HAR 入口；当前 PSI 表只作为初始加载的补充证据 |
| 三地区完整实验室矩阵 | US East / US West / Europe × 首页/钟馗 × 手机/桌面，共 12 组，每组首访/同浏览器复访；记录工具版本、实际地点、视口/DPR/CPU/网络、TTFB/LCP/CLS、图片与 JS 传输量、浏览器缓存和 CDN 状态。不得把 CDN MISS/HIT 当浏览器冷/暖缓存 | WebPageTest 当前匿名入口无可用报告额度；PSI 未给出指定地区与复访。获得可用入口后补测，不预填通过 |
| macOS / iOS / Android 真机 | 每平台登记真实型号、系统/浏览器版本和日期；检查首页、钟馗与中文/拼音/引文字体，横竖屏、200% 文字放大、菜单触控、图注、Hero、Sources 与横向溢出；按既有字体故障方式检查 fallback 并记实际字体或无法识别，绑定公开制品 | 本机为 Windows 10.0.26100，当前未发现连接的目标移动设备；用户暂无其他设备。未实测，不用视口或 UA 模拟替代 |
| RUM | 按 [006 第 5.5.1 节](docs/requirements/006-external-interactions.md#551-发布后-rum-候选方案2026-09-10尚未批准接入)确认候选接收端、测量字段、数据处理和退出，再进入离线验证与单独生产启用 | 方案已形成，接收端/数据库、字段、处理条件和启用尚未批准；采集保持关闭，14 日基线尚未开始 |

本批不需要目标读者招募；R2 按 011 保留为未开始。没有业务代码改动，内容/资产追溯、构建期诊断及职责注释变更不适用；本轮只做技术测量、方案和文档验证，不重建或重新发布。

本批验证结果：37 份 Markdown 严格 UTF-8、90 个相对链接、四份修改文档的模板占位符与 `git diff --check` 通过；PSI 四表字节求和、38 条资源到原上传包的映射及 Hero 本体 41,460 bytes 校验通过。独立只读审查复核了地区回执与证据边界、RUM 候选的授权/字段/窗口/退出，没有未关闭的文档问题。工作树仅有 README、DEV_WORKFLOW、006、011 四份未暂存文档修改，临时脚本与回执留在忽略目录；main 相对未同步的本地 origin/main 为 ahead 1，本轮未提交或推送。未运行业务测试/build，也不把文档验证当发布验收。

## 阅读版 Public Beta 正式公开入口（2026-09-10）

状态：本次阅读版 Public Beta 已按 owner 授权正式公开，[正式站点](https://mythic-china-beta.vercel.app) 可匿名访问。owner 已明确确认将 macOS/iOS/Android 实机显示与字体 fallback、美国东/西部及欧洲性能实测改到 Public Beta 上线后、结束 Beta 前补齐；当前仍为未验证，其他门禁保持。公开后原 140 文件完整核验通过，没有触发恢复保护。下列步骤是本次已执行入口，不是再次推广或再次公开的授权。

执行结果：通过现有 owner 登录的 Vercel UI，在精确部署详情使用 Deployment Actions → Promote；确认框仅列 `mythic-china-beta.vercel.app`。推广后同一部署保留 Ready / Production、Staged 标签消失且正式域名关联；01:29:34 UTC 匿名 GET 仍为 302 至 `vercel.com/sso-api`。随后保留 Require Log In，将 All Deployments 改为 Standard Protection 并 Save；读回 Standard Protection 且 Save disabled。没有 Redeploy、上传、付费升级、Git 或业务数据写入。

01:35:55–01:36:43 UTC（上海 09:35:55–09:36:43）的 `public-smoke-20260910-013643-3438248.json` 为 passed：140/140 HTTP 200、3,275,431 字节、全部 MIME 与原包 SHA256 匹配、无 noindex/none 响应头。此结果覆盖 13 HTML、Sitemap/RSS/robots、112 AVIF/WebP、10 WOFF2、CSS 与唯一 module。已接受原文件的 robots Allow /、13 条 Sitemap、6 条 RSS 与正式 canonical 因远端字节一致获得同一响应证据；未声称搜索引擎已收录。01:38:35–37 UTC 独立匿名复查正式域名 200 且本站 title 存在，hash URL 与 `project-scu6m-mathic-china.vercel.app` 均 302 至 Vercel 登录。

正式域名的 Windows 内置浏览器首页与钟馗正文检查通过：H1/canonical、图片解码、来源/合集/相关阅读正常，无表单控件；Newsletter/Reader Request 为 inactive，analytics meta 为 false，仅有原 module 与非执行 JSON-LD。首页截图显示正常，两页 error 日志查询均为空。关闭配置、此前原 bootstrap 离线验证及全部线上文件一致性支持继续关闭的判定；本轮没有直接完整 Network 抓包，不把该判定写成逐请求实测。实机、三地区性能、R2 与完整请求观察的证据限度继续保留；正式 MVP 尚未收口。脱敏汇总另存 `.local/reading-beta-staged-dc0ad2d/public-release-result.json`，原暂存回执及事故记录不覆盖。

发布身份固定为项目 `prj_U8IP9LhhpaeDC2dJlP0VVv3ciu70` / 团队 `team_zxOM6nEHD6ZYTRcrAjbcwU3U`，原 `dc0ad2d6cdbd3e1e02e19841af67fc3f5522f3dd` / 140 文件 / 3,275,431 字节，已验收部署 `dpl_D3E9hWGC4h19MSg1KcuVaiTWunwK`。沿用下节的本地 QA、上传 inventory、13 页 DOM 与资源抽验；不重建、不上传新部署、不连接 Git、不改内容/交互/统计。执行前 Vercel 登录页确认 Mathic China / Hobby；该部署为 Ready、Production / Staged、Assigning Custom Domains Skipped；Domains 仅列正式域名且 No Deployment。执行前保护为 Require Log In + All Deployments，无 automation bypass secret。项目构建设置为 Other，Build/Install/Output 的 Override 均关闭；这是项目默认值的 UI 读回，不等同于原部署请求中的空命令与根输出覆盖。该部署的 Web Analytics / Speed Insights 均显示 Not Enabled。实际发布后状态以上述执行结果为准。

执行顺序与停止条件：

1. 在 [部署详情](https://vercel.com/mathic-china/project-scu6m/D3E9hWGC4h19MSg1KcuVaiTWunwK) 核对精确 ID、Ready、Staged 与现有域名，保持 All Deployments。用 Deployment Actions → Promote 及确认框的 Promote 推广同一部署；不能点 Redeploy。正式域名唯一清单已核对，若出现新增生产域名、身份变化或创建新构建，则停止。官方 [promote 合同](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-given-deployment) 明确此操作不重建，[CLI 说明](https://vercel.com/docs/cli/alias#preferred-production-commands) 推荐 staged production 使用 promote。
2. 推广成功后，在同一部署详情及 Domains 核对正式域名关联，匿名 GET 确认仍受登录保护；推广不等于公开。操作超时或结果未知时只读核查当前状态，不重复提交。
3. 适用门禁完成或取得明确的验收时点调整后，进入 [Deployment Protection](https://vercel.com/mathic-china/project-scu6m/settings/deployment-protection)，保留 Require Log In，将 All Deployments 改为 Standard Protection 并 Save。此步骤公开生产域名，部署独有长 URL 仍应受保护；不选择关闭所有认证、不添加绕过 secret 或额外例外。Standard 对应 `all_except_custom_domains`，不使用旧 `prod_deployment_urls_and_all_previews`。范围依据：[官方保护说明](https://vercel.com/docs/deployment-protection) 与 [官方短 vercel.app 生产域名示例](https://vercel.com/academy/optimize-your-vercel-account/deployment-protection)，访问日期 2026-09-10。实际衍生别名的匿名结果需记录，不预先声称只公开一个 hostname。
4. 立即运行下列匿名 live smoke：全部 140 个正式响应必须为 200、MIME 匹配、SHA256 与不可变原上传包一致且没有 noindex/none 响应头；首页和核心文章再做正式域名浏览器读取，核对渲染、交互/统计关闭、实际资源与错误。完整响应一致性同时覆盖 13 HTML、2 XML、robots、112 图片、10 字体、CSS 与唯一脚本；不把无脚本执行的 GET 当作 Network 零发送或跨地区性能证据。复核正式与 generated/derived URL 的实际匿名范围。
5. 若文件、索引、来源、闭合交互、页面渲染或受保护长 URL 出现阻塞问题，立即在同一项目把 Standard 恢复 All Deployments 并 Save，再匿名核对正式/长 URL/衍生别名均要求登录。保留已验收部署和域名映射，不删除对象；这会撤回公开访问，但不恢复此前正式域名的 404，也不能撤回外部已取得的副本。无旧正式版本可回滚，保护恢复是本次退出入口。

上述 UI 入口失效时，官方同等接口为 `POST /v10/projects/{projectId}/promote/{deploymentId}`（JSON `{}`）、`GET /v9/projects/{projectId}`（`lastAliasRequest.jobStatus` 与 `toDeploymentId`）、`GET /v4/aliases/mythic-china-beta.vercel.app`，保护更改/恢复为 `PATCH /v9/projects/{projectId}` 的 `ssoProtection.deploymentType`；均限定原 teamId。当前优先复用已登录浏览器，不索要新 Token，不调用未授权业务接口。[Alias 读回](https://vercel.com/docs/rest-api/aliases/get-an-alias)、[项目更新](https://vercel.com/docs/rest-api/projects/update-an-existing-project)。

本轮忽略目录的 `verify-public-release.ps1` 只读取原请求包并向固定正式 hostname 发匿名 GET，不使用 Cookie/Token、不跟随重定向、不执行脚本、不写远端。默认入口只验证原请求摘要与 140 文件/字节身份；加 `-VerifyLive` 才进行实际请求并生成唯一时间命名的脱敏 `public-smoke-*.json`，首个异常即停止并标记需要恢复保护，脚本本身不会操作 Vercel。

```powershell
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/verify-public-release.ps1
# 仅在本次正式域名已公开后执行：
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/verify-public-release.ps1 -VerifyLive
```

## 受保护暂存部署入口（2026-09-09）

已执行并完成匿名保护检查（2026-09-10 00:02 UTC / 上海 08:02）：owner 在本机执行下列确认入口，原 `dc0ad2d6cdbd3e1e02e19841af67fc3f5522f3dd` / 140 文件部署为 `dpl_D3E9hWGC4h19MSg1KcuVaiTWunwK`，`production / READY`，地址为 [受保护暂存站点](https://project-scu6m-bp33wljub-mathic-china.vercel.app)。本次不重建、不重复本地 QA；旧事故及原 attempt 保留。本节命令是本次已用入口，不是再次创建指令。

执行回执 `.local/reading-beta-staged-dc0ad2d/result.json` 记录 All Deployments 为 `all`，此前为 `all_except_custom_domains`；实际生成一个衍生别名 `project-scu6m-mathic-china.vercel.app`，`alias` / `automaticAliases` 均有该值。正式域名 `mythic-china-beta.vercel.app` 为 404；部署首页、钟馗正文路由、一个真实图片路径及衍生别名均返回 302 Vercel Authentication，没有本站正文。主代理于 00:05:27 UTC 独立无 Cookie/Token GET 三个 hostname，再次确认正式域名 404，部署和衍生别名 302 至 `vercel.com/sso-api`，无本站 title。当前是受保护暂存交付，不是公开 Public Beta。

新 attempt key 为 `381ce65515c7491ca468e6a55ca1bf33`，新请求 SHA256 为 `43f67300f1dacf716bc1c826f35376fe1f390f94e6025ab628db211ed3200484`；原请求与 artifact inventory 摘要保持。脚本在操作前读到的四项静态设置均为 null，请求包含原四项直接静态交付设置；回执未保存它们的最终逐项读回，不能称为已额外核验。owner 随后通过已登录 Vercel 的浏览器打开该暂存站点，明确确认“能正常看到首页和插画”；该证据只关闭首页登录可达与插画显示，不扩大为完整页面验收。

2026-09-10 登录后线上检查：owner 切回当前任务并确认右侧首页可见后，主代理恢复 Windows Codex 内置浏览器连接，在上述同一部署逐页导航并读取实际 DOM。13 页标题、单一 H1、正式 origin 的 canonical、Beta 提示均符合候选；19 处图片均 `complete` 且自然宽度大于 0、alt 非空；226 处站内链接/锚点均对应本轮已读取的页面或 ID。六篇 Entry 均有 Quick Answer、Sources、合集与相关阅读；画皮和促织显示 Content note。13 页 Newsletter、六篇 Reader Request 均 inactive，表单/输入/文本框/按钮数量为 0；每页 analytics meta 的 `isEnabled` 为 false。每页只观察到原 `/_astro/page.Di-gmpYO.js` module 与一段非执行 JSON-LD，没有额外脚本节点；工具的最多 50 条 error 日志查询为空。

通过浏览器 `pageAssets` 导出首页当次已观察的 7 份资源，逐个与 `.local/public-build` 同路径原文件比较 SHA256，全部一致：Geist Sans、Source Serif 4、简体中文 Sans 三种 WOFF2，`SiteLayout.DQef1wZt.css`，以及钟馗、冥界、聊斋三张浏览器选中的 AVIF。导出 7/7 成功、无失败；本轮脱敏范围与逐项摘要另存忽略目录 `.local/reading-beta-staged-dc0ad2d/online-browser-check-20260910.json`，不覆盖原部署 receipt。

证据限度：本轮是登录后 DOM/图片解码及 7 文件字节抽验，不是完整 140 文件的远端摘要验证；未取得完整 Network，不能据关闭配置、脚本节点或 error 查询断言零供应商传输或所有平台注入都不存在。线上 Sitemap/RSS/robots 响应、未被选择的图片变体、其余字体/脚本原始字节、四项平台设置最终读回、目标地区表现和 macOS/iOS/Android 实机仍未核验；本机已登录暂存环境不代替这些检查或正式域名 live smoke。本轮仅导航/读取与本地记录，无表单提交、统计启用、平台配置修改、新部署、保护放开或 Git 写入。

新的交付方式是 **受保护 staged production**，不是 Vercel 的 Preview target，也不是公开生产发布。官方 [CLI 文档](https://vercel.com/docs/cli/deploy#skip-domain) 明确首次部署必为 Production，`--prod --skip-domain` 可暂不推广域名；[CLI 请求构造](https://github.com/vercel/vercel/blob/main/packages/cli/src/util/index.ts) 与 [客户端](https://github.com/vercel/vercel/blob/main/packages/client/src/deploy.ts) 对应顶层 `target: "production"`、`autoAssignCustomDomains: false`。由于 [首次部署衍生别名报告](https://community.vercel.com/t/first-deployment-classified-as-production-despite-explicit-preview-target-hobby/46713) 尚有未解释的公开行为，不能仅依赖 skip-domain 与 Standard Protection。

具体安全顺序：在固定项目核对身份、域名、无 Git、静态设置和部署清单后，只把本项目 `ssoProtection.deploymentType` 设为 `all`，GET 读回通过才上传。当前 [All Deployments 官方合同](https://vercel.com/docs/deployment-protection#all-deployments) 明确 Vercel Authentication 对所有计划免费，覆盖生产域名和衍生 URL；[项目更新 API](https://vercel.com/docs/rest-api/projects/update-an-existing-project) 支持该字段。若账户拒绝该配置或要求付费，停止于上传前，不购买、升级或换方案。以上外部资料访问日期为 2026-09-09。

新增忽略目录 `.local/reading-beta-staged-dc0ad2d/` 只保存一次性执行脚本与脱敏 receipt。`deploy-staged.ps1` 校验原请求 SHA256、全部 140 个内联文件与原 inventory（3,275,431 字节），原请求和历史 attempt 均不覆盖。源、内容、图片披露、表单及分析开关保持；该任务没有业务代码修改，构建期诊断、业务测试和内容/资产重新审校不适用。

用户审阅具体操作后已在本机执行带 `-ProtectAllAndDeploy` 的命令，并报告 READY，确认范围为本项目 All Deployments 保护、原四项静态交付设置、一次暂存部署与异常时仅删除该次新建对象（包括其 Production 标签）。本次未触发撤销。保护加强后保留，不自动恢复到可能公开的模式；公开发布及保护放开继续单独授权。

```powershell
powershell.exe -NoProfile -File "F:\codex-project\mythic-china\.local\reading-beta-staged-dc0ad2d\deploy-staged.ps1" -ProtectAllAndDeploy
```

脚本使用已核验的 bundled PowerShell 7；Token 由用户在自己的终端以遮挡输入提供，同一进程完成操作，仅发给 `api.vercel.com`。不通过聊天、凭据文件、命名管道、剪贴板读取或超时内存中转；退出清除引用。当前只读匿名复查不需要再次输入 Token。只使用既有授权范围，403 不触发扩大权限。

脚本先创建不可覆盖的 attempt 标记，再唯一 POST。网络结果未知只按唯一 metadata 查询，重跑也只核对旧 attempt，不创建第二次。READY 后回查 All Deployments 仍生效，枚举返回的 `url`、`alias`、`automaticAliases` 和正式域名，匿名检查首页、钟馗正文路由及一个真实图片路径；管理 Token 不发送到这些网址。任何公开正文、保护失败或非预期状态都只 GET 核对本次 ID/project/source/attempt 后 DELETE 同一对象，并回查对象 404 与正式域名不可匿名读。保护配置保留；不改其他项目、不 promotion、不创建绕过凭据、不连接 Git。结果保存在 `result.json`；`ready-protected-staged` 只代表 READY 与匿名保护检查通过，登录后的实际托管内容、字节/Toolbar、地区与跨平台实机验收仍须另记，不能宣称 Public Beta 已公开。

本地只读验证入口：

```powershell
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/deploy-staged.ps1 -ValidateOnly
```

`-ValidateOnly` 不读取 Token、不调用网络、不创建 attempt 或 receipt。准备阶段已通过原包摘要、140 文件回解和字节数校验；独立静读纠正了认证页正文误判与撤销判断，匿名探针使用不带 Cookie/Token、禁止重定向的 HttpClient。一次性 `check-offline.ps1` 对真实脚本的输入、API 与匿名请求进行内存替换，隔离目录保存合成 receipt，已验证四个场景：正常响应只创建一次；保护失败不上传；POST 结果未知不重试；匿名公开响应只删除匹配本次身份的对象。这些零真实网络检查只证明本地控制流，不证明实际 Vercel 行为。失败场景脚本按预期退出 1，由外层核对输出的 `passed: true` 和写调用次数判断。

```powershell
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/check-offline.ps1 -Scenario success
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/check-offline.ps1 -Scenario protection-rejected
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/check-offline.ps1 -Scenario unknown-post
& 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe' -NoProfile -File .local/reading-beta-staged-dc0ad2d/check-offline.ps1 -Scenario public-response
```

文档严格 UTF-8、排除代码块后的相对链接和 diff 空白检查通过；旧通用链接正则把代码中的 `[bool](git status --porcelain)` 误认作链接，未改动该无关原代码。当前无 Git add/commit/push，既有 9 份未提交文档修改保留。

## 阅读版 Beta 本地准备（2026-09-09）

本次 public 重建通过 Astro 117 文件零诊断与独立 output verifier：13 HTML、2 XML、robots.txt、112 Hero、10 字体和一个默认关闭的脚本。独立只读检查的 658 个站内链接/资源/片段均存在，实际页面没有 form 或输入控件；Privacy 与关闭状态一致。共 140 文件、3,275,431 字节。此前同一业务源码的完整 check 为 38 文件/655 测试通过；本次之后只改范围和交接文档，未重复全量测试。favicon 缺失作为非阻塞体验项后补。

先沿既有固定 Node/Corepack 与显式 origin 的 `build:public` 入口构建并通过校验，再用下列命令保存**本地诊断包**。包仅含 public 输出，不包含 review `dist/`、源码、测试或配置；文件摘要清单放在 ZIP 外。命令创建新的忽略目录，不覆盖旧包、不联系平台。当前 dirty source 的包不能上传；获得本地提交授权后须从 clean revision 重建并完成最终 QA，再生成新的候选身份。

```powershell
$betaOutput = (Resolve-Path -LiteralPath '.local/public-build').Path
$betaPrep = Join-Path (Resolve-Path -LiteralPath '.local').Path ('reading-beta-prep-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
$null = New-Item -ItemType Directory -Path $betaPrep -ErrorAction Stop
$betaZip = Join-Path $betaPrep 'mythic-china-public-diagnostic.zip'
$betaFiles = @(Get-ChildItem -LiteralPath $betaOutput -File -Recurse | ForEach-Object {
  [ordered]@{
    path = [IO.Path]::GetRelativePath($betaOutput, $_.FullName).Replace('\', '/')
    bytes = $_.Length
    sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
  }
} | Sort-Object { $_.path })
[IO.Compression.ZipFile]::CreateFromDirectory($betaOutput, $betaZip)
$betaArchive = [IO.Compression.ZipFile]::OpenRead($betaZip)
try {
  if ($betaArchive.Entries.Count -ne $betaFiles.Count) { throw 'ZIP inventory mismatch' }
  foreach ($betaFile in $betaFiles) {
    $betaEntry = $betaArchive.GetEntry($betaFile.path)
    if (!$betaEntry -or $betaEntry.Length -ne $betaFile.bytes) { throw 'ZIP file mismatch' }
    $betaStream = $betaEntry.Open()
    try { $betaHash = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($betaStream)).ToLowerInvariant() }
    finally { $betaStream.Dispose() }
    if ($betaHash -ne $betaFile.sha256) { throw 'ZIP digest mismatch' }
  }
} finally { $betaArchive.Dispose() }
$betaManifest = [ordered]@{
  status = 'nondeployable-local-diagnostic'
  generatedAt = [DateTime]::UtcNow.ToString('o')
  sourceHead = (git rev-parse HEAD)
  sourceDirty = [bool](git status --porcelain)
  origin = 'https://mythic-china-beta.vercel.app'
  archive = [IO.Path]::GetFileName($betaZip)
  archiveSha256 = (Get-FileHash -LiteralPath $betaZip -Algorithm SHA256).Hash.ToLowerInvariant()
  files = $betaFiles
}
[IO.File]::WriteAllText((Join-Path $betaPrep 'manifest.json'), ($betaManifest | ConvertTo-Json -Depth 6), [Text.UTF8Encoding]::new($false))
$betaPrep
```

下一步：单独授权本地提交现有已验证改动，按新 revision 重建 public，并短时启动仅本机可访问的静态预览完成最终页面 QA，结束后关闭该服务。接着准备既有 Vercel 项目的受保护 Preview；通过后再请求生产发布。本轮不安装 CLI、不接 Git、不上传。非 CLI 的 [Vercel Create Deployment API](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment) 支持精确 project/team 与文件交付，但需要另行配置认证，且首次项目设置会被保存；官方文档的默认 Preview 行为尚未在本项目验证，不能直接把网页 Production 拖放当成这个入口。原生 API 的真实调用、保护及回滚必须在上传前完成具体准备。

本机已只读确认 `C:\Program Files\Python313\python.exe` 为 Python 3.13.13。取得本地服务授权后，重新检查 4321 无监听，再在前台终端运行下列仅用于静态 QA 的入口；不借默认 review runner 预览 public。保存终端会话/PID，结束时在该终端 Ctrl+C，回查对应 PID 及端口已退出；如端口已被占用则不结束未知进程。此处列命令不代表已启动服务。

```powershell
netstat -ano | Select-String ':4321\s+.*LISTENING'
& 'C:\Program Files\Python313\python.exe' -m http.server 4321 --bind 127.0.0.1 --directory 'F:\codex-project\mythic-china\.local\public-build'
```

## 受保护 Preview 上传准备（2026-09-09）

最终收口（2026-09-09 14:10 UTC）：owner 在已明确授权后运行本地精确删除入口，`rollback-result.json` 记录 14:09:29 UTC 删除成功、对象 API 404、部署列表为空、正式域名 404、无本站 title，`verificationPassed: true`。主代理于 14:10:08 UTC 独立匿名 GET 正式域名，返回 404 / DEPLOYMENT_NOT_FOUND，无本站 title/main。异常部署 `dpl_HhYVfCrWk9jNwmC45Eh4GcwmP72N` 已撤销；当前无可用部署，受保护 Preview 未交付。曾经公开可读，无法据删除推定没有外部访问或缓存副本；项目静态设置未恢复也未在删除后回查，不擅自改动。主代理停止部署，不发送第二次 POST。后续须先验证首次部署环境选择方案，再形成具体的新预览动作。原 140 文件、请求及事故证据保持，业务源码未变；没有 Git 提交或推送。下文异常停点与准备内容保留为过程事实，当前状态以本段为准。

当前异常停点（2026-09-09）：13:14 UTC，有效项目 Token 通过预检（既有部署列表空、固定 project/team/domain 与 Standard Protection 匹配），固定请求执行唯一一次 POST。创建及随后 GET 均返回 `dpl_HhYVfCrWk9jNwmC45Eh4GcwmP72N`、`target: production`；URL 为 `project-scu6m-myml8l6ev-mathic-china.vercel.app`，alias 为 `project-scu6m-mathic-china.vercel.app`，原 source/inventory 元数据匹配。随后匿名请求 `https://mythic-china-beta.vercel.app/` 返回 200，存在本站 title 与 main；另外两个 URL 的本机探测连接失败，不能解释为无公开访问。主代理对首次部署默认环境的判断不充分，受保护 Preview 验收失败。

已停止创建；`creation-attempt.json` 保留以禁止重发。原授权包含异常时仅撤销本次新部署，但自动审批两次拒绝为撤销该 Production 标签对象交接凭据，要求明确生产对象删除授权。已向 owner 请求仅删除上述精确 ID，当前未撤销；收到后先 GET 核对 ID/project/source，再 DELETE 同一对象，并回查部署列表与正式域名匿名不可读。原静态请求、pre-create/create-response/deployment-state 与本地 manifest 保留；不向聊天/文件写凭据，不把异常状态写成已发布成功。以下准备段落为本次创建前合同，当前状态以上述异常停点为准。

本节是当前发布交接入口，替代前文诊断包和历史“先补全部平台再预览”的下一步说明。用户本次要求准备受保护预览；已完成本地封装与校验，尚未上传、提交、推送或修改账户配置。目标仍是既有 Vercel 项目，采用原已验收静态制品的非 Git REST 交付方案；本次凭据与实时项目/团队、域名及主保护设置已只读核实；owner 已完成本项目数据分享/Toolbar 设置选择和保存；首次静态交付设置及本次 Preview 创建授权仍须在实际写入前落实。

- 制品源：`dc0ad2d6cdbd3e1e02e19841af67fc3f5522f3dd`，`.local/public-build/`；140 文件 / 3,275,431 字节，全部路径、大小和 SHA256 与原 QA inventory、ZIP 一致。当前仅治理文档未提交，不改变原制品身份。
- 准备文件：`.local/reading-beta-preview-dc0ad2d/request.json` 与 `manifest.json`，均被既有 `.local/` 忽略规则覆盖。请求仅内联原 140 个文件及来源元数据，无源码、配置文件、凭据、表单记录或 review 输出；Base64 回解逐文件验证通过。
- 请求体：4,383,259 字节，SHA256 `786b824733d92a67c81f53dc61dc4d6dbbc4ef5c021d31ac7989f4f799eea0ef`。原 inventory SHA256 `0fa0a30a41f104662d4f1bd3966898e8478c4a14c4adaf55321b0e073c6bc4fd`；原 ZIP SHA256 `ff128abf88dfd20a2b82ae01b13dd23889483a2034f8a56d1675169650d48ffb`。
- 预期团队 `team_zxOM6nEHD6ZYTRcrAjbcwU3U`（`mathic-china`）、项目 `prj_U8IP9LhhpaeDC2dJlP0VVv3ciu70`（`project-scu6m`）来自 2026-09-08 现场，不能代替本次实时复核。Production 域名保持 `mythic-china-beta.vercel.app`。
- 请求省略 `target`，遵守官方 Create Deployment API 的默认 Preview 语义；同时没有 `gitSource`、`gitMetadata`、`alias`、`deploymentId` 或自定义环境。禁止临时添加 production、promotion 或 alias 动作。
- 首次部署会保存 `projectSettings`：`framework: null`（Other）、`buildCommand: ""`、`installCommand: ""`、`outputDirectory: "."`，直接交付预编译静态目录。它是待批准的本项目交付设置，不是已经生效的配置；没有平台 Astro 构建、依赖安装或 Git 关联。

### 上传前现场与授权

截图核对（2026-09-09）：owner 提供了含地址栏的本项目 Deployment Protection 页面，URL 为 https://vercel.com/mathic-china/project-scu6m/settings/deployment-protection；可见 Require Log In 开启、Standard Protection 已选中、Save 灰显，Trusted Sources 可见本项目自身记录。这证明截图时点的主保护设置，不证明页面下方未展示的例外/绕过设置或已部署访问行为；内部 ID 和完整配置继续通过授权后的 API 核对。凭据准备采用仅限 project-scu6m 的短期项目 Token，由用户创建和保管，任务后撤销；不要求完整账户或全团队权限。参考 [Access tokens](https://vercel.com/docs/accounts/access-tokens)（访问 2026-09-09）。本轮未创建凭据或部署。

先只读核对当前项目 ID/团队、Production 域名、部署列表和 Standard Protection；检查无绕过链接、例外域或自动化绕过配置。核对 Toolbar、模型训练/数据分享设置，明确其实际处理范围后再决定本项目设置，不能沿用旧勾选状态当作批准。保留 Vercel Authentication；不调整团队其他项目。有效 API 凭据只经用户控制的本机安全输入提供，不粘贴聊天、不写仓库、不打印、不从浏览器存储提取。Token 已由 owner 生成并经本机输入完成只读认证；没有生成第二个凭据，不记录凭据值。

本机凭据输入入口（2026-09-09）：owner 已回复短期项目 Token“已生成”，下一步由用户在自有 Windows 窗口手动输入。临时脚本 `.local/reading-beta-preview-dc0ad2d/read-token.ps1` 只显示遮挡输入框，用户点击 Continue 后把值经任务专用随机名本机命名管道交给当前 Node 会话；不写 Token 文件、环境配置、终端历史或工具输出，不读取剪贴板或浏览器存储。先在 Node 会话建立一次性命名管道，再以系统 PowerShell 的 `-NoProfile -STA -File` 和本次管道名启动该精确脚本；`Start-Process -WindowStyle Hidden` 隐藏控制台，仅显示用户需要操作的输入窗口。输入后关闭窗口；Token 仅在内存持有供当前项目的已授权 API 核查，任务结束或 30 分钟后清除，上传继续另行授权。GET 项目、域名和部署清单只输出必要的脱敏配置，不输出认证头或原始账户响应。

自动弹窗未在用户桌面显示，已只关闭本次两个临时输入进程；命名管道仍由当前 Node 会话持有。手动入口为用户在自己的 PowerShell 运行系统 `powershell.exe -NoProfile -STA -File`、上述脚本精确路径和当前会话生成的 `-PipeName`。管道名称不是凭据，不写入长期命令；会话失效时重新创建通道。用户在窗口中输入后，主代理再执行 GET 核查。当前段落下方环境变量示例保留为同一 REST 调用合同参考，实际本轮采用内存 Token，不设置 `VERCEL_TOKEN`。

当前只读核查执行入口（2026-09-09）：本机输入已成功，普通 Node 环境外连返回 EACCES；实际成功入口为经权限审批的 bundled PowerShell 7.6.5（`C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe`）直接执行 `.local/reading-beta-preview-dc0ad2d/verify-vercel.ps1 -PipeName`，不嵌套 Windows PowerShell 5。当前会话先建立随机名、一次性本机管道，Token 只经该管道送入查询进程内存，查询后清除引用；不在参数、文件或输出中保存。脚本固定 GET 本项目、项目域名和部署列表，拒绝重定向，先核对 project/team/name，只打印白名单脱敏摘要；缺失字段记 unavailable，错误只打印阶段和 HTTP 状态。此入口没有 POST/PATCH/DELETE，不执行下方参考上传命令。

实时只读结果（2026-09-09 10:56 UTC）：项目/团队/name 均匹配；Production 域名已验证，项目无 Git 连接、部署列表为 0。API 的 `all_except_custom_domains` 对应当前 Standard Protection，依据 [Vercel 官方 Provider 双向映射](https://github.com/vercel/terraform-provider-vercel/blob/main/vercel/resource_project.go#L1284)；保留原值，不修改保护配置。脱敏摘要位于忽略目录的 `preflight.json`。响应缺失的绕过/例外、环境变量与 Toolbar 字段不能推定为空或关闭；项目 AI 数据分享也未返回。后续 owner 已完成下段所记项目设置，实际匿名拦截及有权访问留待本次预览。该次 API 核查没有上传、配置写入或 Git 写入。

项目设置确认（2026-09-09）：owner 截图显示本项目 General 的 Vercel Toolbar 使用 Pre-Production Deployments / Production Deployments 标签；owner 已将前者设为 Off 并保存，后续截图提示保存成功且需新部署生效。General 的 Data Preferences 卡片实际开关为 “Improve models with this project’s data”；owner 已按指导关闭并点击 Save，回复“操作完了”。此项关闭状态依据 owner 确认，非 API 回查；未操作团队设置。Toolbar 的实际无注入结果仍在首次 Preview 验证。Token 的 30 分钟本机内存缓存已清除；原凭据无需重新生成，获本次部署授权后通过既有本机输入入口重新输入，值不写入文件或聊天。

以下只读入口要求已取得本次凭据使用授权，`VERCEL_TOKEN` 已安全注入当前进程；不在文档中放入凭据值：

```powershell
$previewTeam = "team_zxOM6nEHD6ZYTRcrAjbcwU3U"
$previewProject = "prj_U8IP9LhhpaeDC2dJlP0VVv3ciu70"
if (!$env:VERCEL_TOKEN) { throw "Vercel credential is not configured." }
$previewHeaders = @{ Authorization = "Bearer " + $env:VERCEL_TOKEN }
$previewProjectState = Invoke-RestMethod -Method Get -Uri "https://api.vercel.com/v9/projects/${previewProject}?teamId=$previewTeam" -Headers $previewHeaders
if ($previewProjectState.id -ne $previewProject -or $previewProjectState.accountId -ne $previewTeam -or $previewProjectState.name -ne "project-scu6m") { throw "Unexpected Vercel project identity." }
if ($previewProjectState.ssoProtection.deploymentType -notin @("all_except_custom_domains", "prod_deployment_urls_and_all_previews", "all", "preview")) { throw "Preview authentication is not verified." }
$previewBefore = Invoke-RestMethod -Method Get -Uri "https://api.vercel.com/v7/deployments?projectId=$previewProject&teamId=$previewTeam&limit=20" -Headers $previewHeaders
```

在上述身份/保护、项目数据处理决定、请求体及授权范围全部明确后，单独确认：仅创建一次本项目 Preview，允许上述首次静态交付设置，验证实际保护；如结果异常，只撤销本次新建 deployment，不动项目或其他部署。未获该次授权时止于准备。

本次执行授权（2026-09-09）：owner 明确回复“授权本次预览部署”，范围为原 140 文件与四项静态项目设置的一次受保护 Preview、只读验收，以及异常时仅取消/删除本次新 deployment；不含 Production、Git 写入或保护绕过配置。实际入口为 bundled PowerShell 7.6.5 直接执行忽略目录的 `create-preview.ps1 -PipeName`，先从随机本机管道取凭据并重验身份/保护/域名/空部署列表，再以已锁定请求摘要执行一次 POST；独占创建本地 attempt 标记防止重复。响应不明只读回查，输出与 receipt 只保存白名单字段，不含 Token。下列 REST 合同保持。

授权后的执行停点（2026-09-09）：重新输入凭据已由本机安全接收，但创建脚本在第一个项目 GET 返回 403，`createAttempted: false`，没有写入 attempt 标记或调用 POST。随后有/无固定 teamId 的只读核查均拒绝；API code 为 `forbidden`，脱敏 message 明确当前 Token 无权访问 `mathic-china` scope，未证明具体是否过期。需要 owner 提供可访问该团队下本项目的有效 Token，不扩大到完整账户；当前无效内存凭据已清除。本次单次 Preview 授权保持，凭据恢复后重过项目身份/保护核查再继续。

### 已授权后的单次创建与只读回查

```powershell
$previewBodyPath = "F:\codex-project\mythic-china\.local\reading-beta-preview-dc0ad2d\request.json"
if ((Get-FileHash -LiteralPath $previewBodyPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne "786b824733d92a67c81f53dc61dc4d6dbbc4ef5c021d31ac7989f4f799eea0ef") { throw "Prepared payload changed." }
$createdPreview = Invoke-RestMethod -Method Post -Uri "https://api.vercel.com/v13/deployments?teamId=$previewTeam" -Headers $previewHeaders -ContentType "application/json" -InFile $previewBodyPath
if (!$createdPreview.id) { throw "Creation outcome requires read-only reconciliation; do not retry POST." }
$previewResult = Invoke-RestMethod -Method Get -Uri ("https://api.vercel.com/v13/deployments/" + $createdPreview.id + "?teamId=" + $previewTeam) -Headers $previewHeaders
```

创建响应不明、超时或断连时只查询 deployment 列表及本次 source/inventory 元数据，禁止重复 POST。用返回的 deployment ID/URL 回查 READY、目标 Preview、项目/来源元数据和无 Production alias；响应缺字段则以控制台详情核验，不能当作通过。保存脱敏后的目标、状态和证据，不保存认证头或完整账户响应。

验收包括：未登录请求被拦截且不返回文章正文/资产；有权账户可访问；首页、目录、全部文章/合集、Privacy、XML 和静态资源正常；实际响应内容与原 140 文件摘要匹配；没有平台注入导致的非预期脚本/请求；正式域名未指向这次 Preview。macOS/iOS/Android 实机显示与 fallback 仍 pending，在该预览阶段、公开生产前完成。生产发布继续单独授权。

### 撤销与退出

异常对象的明确删除授权（2026-09-09）：owner 已回复“授权删除这个异常部署”，精确范围为 `dpl_HhYVfCrWk9jNwmC45Eh4GcwmP72N`。因此前 30 分钟内存凭据已清除，原凭据交接未执行。为避免输入通道再次超时，用户在自己的 PowerShell 执行下列本地入口；脚本自动选用已核验可加载 Windows Forms 的 bundled PowerShell 7，在同一进程遮挡输入 Token 后立即删除，不再经 Node 中转或跨对话缓存。窗口明确显示精确 ID，按钮为 Delete deployment。脚本先核对 pre-create 空列表、create-response ID 及实时 GET 的 project/source，再只 DELETE 该对象，回查 GET、部署列表及正式域名匿名响应，并在 `rollback-result.json` 写脱敏结果。脚本不含创建、alias、项目删除或设置变更；退出清除 Token 引用。此处只是入口准备，不代表已经撤销。

```powershell
powershell.exe -NoProfile -STA -File "F:\codex-project\mythic-china\.local\reading-beta-preview-dc0ad2d\delete-anomalous-deployment.ps1"
```

首次 Preview 没有旧生产版本可回滚。写入授权必须明确包含异常时仅撤销本次创建的部署；若没有包含，则先请求该精确对象的授权。先 GET 确认 ID 属于目标项目且不在 `$previewBefore` 列表中：仍在构建时用 `PATCH https://api.vercel.com/v12/deployments/{本次返回ID}/cancel?teamId=team_zxOM6nEHD6ZYTRcrAjbcwU3U`；已生成需撤销时用 `DELETE https://api.vercel.com/v13/deployments/{本次返回ID}?teamId=team_zxOM6nEHD6ZYTRcrAjbcwU3U`。路径中的 ID 必须取真实响应，不执行示意占位路径。随后 GET/匿名访问确认停止或不可访问，保留删除前后的脱敏 ID/状态证据。此范围不暂停或删除项目、不解绑 Production 域名；若保存过项目设置，按已记录的原值和授权范围恢复。任务专用 Token 到期或由用户撤销，不保留长期访问。

官方依据（访问 2026-09-09）：[Create Deployment](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment)、[静态项目跳过构建](https://vercel.com/docs/builds/configure-a-build)、[Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)、[Get Deployment](https://vercel.com/docs/rest-api/deployments/get-a-deployment-by-id-or-url)、[取消](https://vercel.com/docs/rest-api/deployments/cancel-a-deployment)与[删除](https://vercel.com/docs/rest-api/deployments/delete-a-deployment)。官方合同已核验；真实 API 上传和保护访问未执行，不把准备包当成线上验收结果。

## 职责

### 当前运行与版本摘要（2026-09-12）

正式 MVP 已采用阅读版范围：6 篇英语文章、2 个合集、各自 Hero、来源、导航、SEO、最小分析及现有静态页；表单真实启用、逐篇正文图和完整故事卡后移。当前为 Public Beta / pending human validation，退出条件仍按 011。

当前生产制品绑定 clean source `21cdbb6353bb14fe5ebced9ddfec1e94dc30a3a5` / `dpl_7bpnKu2bhRQPtv3E1TRibmn9dzDy`，最新线上与账户实证日期为 2026-09-10。2026-09-12 将此前六份发布记录文档提交为 `b6144610ada7c713a5213c3e747fc190dd42dd2c`，未推送；后续范围文档修改留在工作树，不重建或改绑线上制品。

剩余正式收口项为三平台真机、指定三地区浏览器性能、真实 RUM 接通与观察窗、R2a/R2b、问题处置和 owner 确认。GoatCounter 已启用；Buttondown/Tally 与 RUM 均未启用，其中表单已后移，RUM 门槛保持。任何新的服务、数据、Git、远端或发布动作仍分别授权。

**原候选 QA 证据定位（2026-09-12 只读复核）**：011 已记录原 `dc0ad2d` 候选的 108 组场景、26 组真实 200% 缩放、39 组三档及委托视觉接受。现存 `.local/reading-beta-qa-dc0ad2d/local-qa.json` 是 2026-09-09 08:51 UTC 的 partial 记录；本次在已登记的 `reading-beta-*` 目录与本文入口中未定位到后续追加原始回执。保留后续接受结论，同时登记追加原始证据入口待补齐；不把早期 partial 当作后续失败，不改写旧 receipt，也不据此无差别重跑。上述证据不自动改绑到 `21cdbb6`；当前版本的 698 项检查、39 组布局及 140 文件公开完整性证据分别按已有回执记录。

历史发布验收时点（2026-09-09；实机与地区时点已由本文顶部及 011 的 2026-09-10 决定替代）：Project owner 已确认按 [011 第 2.2.1 节](docs/requirements/011-public-beta-validation.md#221-跨平台实机验收时点) 将跨平台实机显示与 fallback 放到受保护预览阶段完成；它仍是正式公开生产发布前的必要条件。预览前的本地 QA、clean-source 及制品摘要证据保持，receipt 明列 macOS/iOS/Android 未验证项，不能宣称生产放行；预览中补齐匹配制品的设备/系统/浏览器、页面和结果。后文历史顺序中“所有平台 QA 必须在预览前完成”仅由本次明确调整的时点取代，其他门禁不变。

本次范围仅为文档同步，没有 Git 写入、运行配置变更、服务启动或远端部署。现有 QA 属于 `dc0ad2d6cdbd3e1e02e19841af67fc3f5522f3dd` 及其不可变制品；文档变更不自动重新绑定源身份。若后续从新 revision 构建，按原规则重建并完成适用校验；若采用已验收的不可变制品，必须核对原 source/lock 与完整 artifact inventory/digest，并将本次时点决定作为附加记录，不改写旧 receipt 的事实。

当前执行主线（2026-09-09）：按 [011](docs/requirements/011-public-beta-validation.md) 优先准备阅读版 Beta，Newsletter、Reader Request、Analytics/RUM 保持关闭。Tally 测试已由 owner 暂停在 3/10 次激活、2 条 Completed；下文后续用例是历史计划，不再自动执行。未完成项归对应功能未来启用，测试记录不擅自删除。本次仅做本地 public 重建、静态校验和诊断包整理；提交、启动预览服务、远端预览及生产发布仍按具体动作授权。

本文件是初始化、构建、启动、验证、版本控制和发布命令的唯一来源。当前工作区包含 M2 静态应用、测试、文档、冻结的不可发布 M1 独立原型和一个本地 Git 仓库；用户已建立 `main`、M1/M2/M3/M4-U1/U2/U3 基线提交与 `origin`。M2 历史基线为 `f258227`，M3 历史基线为 `c606f5`，M4-U2 历史基线为 `5f327b6`，M4-U3 实现基线为 `e94eaca`。M3 Hero v1 手部缺陷已按版本合同返修为 Project owner 验收的 Hero v2；012 又为四篇 Entry 与 Liaozhai Collection 闭合五组 Hero。当前共有 21 个精确画布 master、21 份 repository source rendition、9 份 production record、12 份 approved manifest 版本记录、11 个 approved/current 逻辑资产及 17 份 current responsive rendition；非默认视觉入口已实际生成、解码 120 个 AVIF/WebP 目标。经 2026-09-02 项目总检，M4 本地产品实现已完成：U1–U3、U4A public/SEO 纯基础设施、首个纵切片、Collection/Guide Hero、4 份英文与 6 份 CJK WOFF2 静态链、U5A direct-only noindex 字体样张、23 文件/279 测试、8 页/42 图/10 字体/零 XML/零客户端 JavaScript、24 个最终视口组合、12 个 Hero art-direction 组合及 Project owner 当时的 8 页判断均已闭合。Project owner 随后把该完成状态提交为本地基线 `3983bee91ada4a286613ec702a8009a4f528af3f`；进入 M5 前只读复核确认工作树、暂存区和未跟踪文件均为空，本地 `main` 相对当时未 fetch 的 `origin/main`（`e2893d1`）显示 ahead 1。M5-U2 实施期间，reflog 显示 `origin/main` 于 2026-09-02 14:04:40 +0800 由外部 push 更新到 `3983bee`；本批未执行 fetch 或任何 Git 写操作，且 tracking ref 不单独证明服务器端状态。Project owner 后续把 M5-U1–U3、U4 账户准备快照与第二 Collection 决策包提交为 `3fa46d5f85c43a5278e15ca6b0630d724439acc9`；2026-09-03 四篇研究批开始时 HEAD、本地 `main` 与本地 `origin/main` tracking ref 均为该提交，工作树干净。013 已完成 `public` intent、runner、页面/endpoint 与本地诊断输出；deployable 身份、远端环境和发布仍未完成；VB6 独立审核 6+2 到 ready 后，owner 又批准全部为 published，六篇目标公开日期为 2026-09-10。真实键盘/200%、偏好/故障、本地性能与支持平台 fallback 归 M6 release-candidate gate；M7 承接 Public Beta 生产、live smoke、回滚、线上地区复核、RUM/p75、上线后 R2a/R2b 与正式 MVP 收口。原计划 M4-U4B 的接线归 M6 public artifact assembly。未来服务、内容状态提升、代理 Git 写入、Vercel 项目操作、部署与发布仍须分别授权；项目没有真实联调环境或发布环境。不提供不可执行的假设命令，也不把本地 build 或 preview 解释为远端预览或生产发布。

M5-U2 的三个 provider-neutral service/Fake 与 M5-U3 的 inert Newsletter、Reader Request、Privacy review 页面和 HTML5 DOM output oracle 已进入 `3fa46d5`；当时 review inventory 为 9 页/42 Hero/10 WOFF2/零 XML/零客户端 JavaScript。2026-09-04 的四篇证据最小物化建立 4 个 draft Entry、5 Source、9 Claim、3 Terminology、Source 数字影像证据门禁，并通过当时 13 页 review inventory 完整门禁；这些结果与 Buttondown 审核事实同步形成本地检查点 `9914dd3`。Ten Kings 与 Fighting Cricket 随后进入 `7c0cb3f`，Guide 于 2026-09-05 进入 `119c01c`，Project owner 已确认这些检查点 push；本批开始前的独立服务器只读核验与本地三个 ref 一致。009 及后续内容批完成两个三篇路径和四篇证据受限草稿，当前为 6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology 与 14 页 review 输出；修订前锁定稿及 010 当前四篇改动单元和两条 `contentNote` 均已通过 Project owner 双语确认，六份 Terminology 均为 `bilingual-approved`，Painted Skin 短译 Claim 为 `verified`。010 的 AI 专业审读、统一 `contentNote` 合同与 R1 重建已完成；R1 静态检查通过后已退役为 reference-only，真人反馈仍为 0。012 已新增并接线五组 Hero；VB6 后 Related 编辑环、Liaozhai Featured（Painted Skin）与 6+2 ready 已闭合；owner 又批准全部 published，六篇目标日期为 2026-09-10，本地索引为真实 6/2、六篇各展示一个 Related；真实 supplier transport 与网络请求仍不存在；013 已接入本地 public artifact，最终发布资格仍待 M6 验收。

2026-09-07 当前路线由 [`docs/requirements/011-public-beta-validation.md`](docs/requirements/011-public-beta-validation.md) 更新：M6 保留全部非读者 release-candidate 门禁与受保护预览；M7 先发布可索引 Public Beta 并完成 live smoke/回滚/RUM 基线，再执行 live R2a/R2b 与正式 MVP 收口。后续历史记录中“目标读者属于 M6”“目标读者移交首个真实纵切片”或“M7 只承接生产与 live/RUM”的旧时点描述不再控制当前执行顺序。

Guide Hero 生产闭环最初直接接续历史基线 `eb6e20c7c2ae5eda895e5a70f547140163877456`（`feat: complete first-slice release readiness gates`）上的未提交 Collection Hero 与本地化合同工作树；该生产批次没有创建分支、worktree、旁路项目或仓库副本，也未执行 fetch 或 Git 写操作。后续只读核查发现这些改动已进入本地提交 `a3194d0d59b605cf7a5fcfc5d2d55166c374e13b`；Project owner 随后授权继续并创建来源复核提交 `d60691a`。上述历史批次未执行 fetch 或 push。M4-U5A 开始时，只读核查确认 HEAD、`main` 与本地 `origin/main` 已在本任务前由 Project owner 对齐到 `e2893d14d4960f71fe75bd240971aaa88656511c`（`update`），工作树干净；本任务不重复或改写该提交，也未执行 fetch 或任何 Git 写操作。精确 HEAD、工作树和 tracking ref 每次仍须按本文件只读复核；本地 tracking ref 不单独证明后续服务器端状态。

`docs/` 下的需求、设计和阶段材料只能引用本文件中的命令与门禁，不得复制形成第二套命令，也不得替代根目录当前事实说明或执行前现场核查。

## 当前环境身份门禁

工作目录：`F:\codex-project\mythic-china`

影响：只读确认，不修改文件或状态。

```powershell
$mythicChinaRoot = (Resolve-Path -LiteralPath '.').Path
if ($mythicChinaRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicChinaRoot"
}
Get-ChildItem -LiteralPath $mythicChinaRoot -Force | Select-Object Name, Mode
```

通过标准：解析路径精确等于 `F:\codex-project\mythic-china`，且根目录治理文档存在。

## 初始化、构建与本地运行

M2 已在当前非空仓库根手工最小初始化；没有运行 starter/template，也没有创建旁路项目、worktree、分支或新仓库。`prototypes/entry-reader-flow.html` 等 M1 文件仍是直接评审用静态原型，不进入 Astro 应用构建。M2 build 只生成 `noindex` 语义调试页，不代表生产页面、生产视觉或长期开发服务器。

### M2 已确认目标与实施授权门禁

已实施的项目环境合同：

- Node.js 24 LTS；本机工作流固定绝对路径为 `D:\Program Files\nvm\v24.16.0\node.exe`，初始精确值与当前 `.node-version` 均为 `24.16.0`，`engines.node` 与 package script 守卫共同接受 `>=24.16.0 <25`。本机命令必须显式从该路径/同目录 Corepack 启动，不依赖当前公开 PATH、`nvm use` 或 Codex bundled runtime；干净 clone、CI 和未来托管构建只需在其受控 Node 安装上满足 engine 范围，不比较 Windows 路径。
- pnpm 11；初始精确值为 `11.22.0`，当前 `packageManager` 记录 `pnpm@11.22.0`，`engines.pnpm` 限制为 `>=11.22.0 <12`，仓库只保留 `pnpm-lock.yaml`。
- Astro 7 静态模式、TypeScript strict、Entry Markdown、结构化 YAML、Content Layer、内容图校验与 Vitest；不安装 adapter、MDX、UI/CSS/动画框架、Playwright 浏览器、CMS、数据库、认证、搜索、外部服务或商业依赖。
- 当前非空仓库只允许在精确根目录手工建立最小 Astro 配置，不运行 starter/template 向导，不创建临时项目、旁路目录、worktree 或新仓库。

本机固定 Node 身份只读验证：

```powershell
$mythicProjectNode = 'D:\Program Files\nvm\v24.16.0\node.exe'
if (-not (Test-Path -LiteralPath $mythicProjectNode)) {
  throw 'Mythic China fixed Node.js runtime not found.'
}
$mythicProjectNodeVersion = & $mythicProjectNode --version
if ($mythicProjectNodeVersion -ne 'v24.16.0') {
  throw "Unexpected Mythic China Node.js version: $mythicProjectNodeVersion"
}
```

通过标准：本机命令退出成功并精确返回 `v24.16.0`。不得用当前公开 PATH 的无路径限定 `node` 结果替代本机门禁。package scripts 内的 `scripts/verify-runtime.mjs` 另只验证 `>=24.16.0 <25`，以免把本机文件路径错误地扩散到干净 clone、CI 或托管环境；两项职责不能互相替代。

2026-08-27 的只读环境核查：公开 PATH 为 Node.js `16.20.2`、npm `8.19.4`、pnpm `11.19.0`、Corepack `0.17.0`。这些 PATH 工具不得用于本项目。用户随后固定所有会话使用 `D:\Program Files\nvm\v24.16.0\node.exe`；该目录已验证为 Node.js `24.16.0`，并自带 npm `11.13.0` 与 Corepack `0.35.0`，但没有现成的 `pnpm.cmd`。M1 临时预览使用的 Codex bundled Node.js `24.19.0` 只属于历史临时服务，不得当作项目长期运行时或借此跳过授权。

固定 Node.js `24.16.0` 的选择与只读验证已经完成，不再安装或切换其他 Node。用户于 2026-08-27 明确授权：使用该固定 Node 自带的 Corepack 提供项目固定的 pnpm `11.22.0`，下载 M2 白名单依赖，并在当前非空仓库根手工建立最小应用。授权不包含启动 dev/preview 服务、Git 写操作或发布。

执行安装前，先由文件修改建立 `.node-version`、`package.json`、Astro/TypeScript/ESLint/Prettier 配置与应用源码；不运行 starter/template。M2 初始依赖白名单固定为：运行依赖 `astro@7.2.8`；开发依赖 `@astrojs/check@0.9.10`、`@eslint/js@10.0.1`、`@types/node@24.13.3`、`eslint@10.9.1`、`eslint-plugin-astro@3.1.0`、`prettier@3.6.2`、`prettier-plugin-astro@0.14.1`、`typescript@6.0.3`、`typescript-eslint@8.68.0` 与 `vitest@4.1.11`。M3-U5 经 Project owner 单独授权后增加唯一运行依赖 `sharp@0.35.4`，用于 Astro 构建期响应式 AVIF/WebP 编码；2026-09-01 的 CJK 门禁批次又把既有传递包 `fontkitten@1.0.3` 固定为直接开发依赖，用于读取 WOFF2 name/cmap，并增加 MIT 许可的 `parse5@8.0.1`，用于按 HTML5 实际树语义核对 CJK `lang` 继承；二者都不进入浏览器运行时。Prettier 暂停在 `3.6.2`，因为稳定的 `prettier-plugin-astro@0.14.1` 与 Prettier `3.7+` 存在尚未进入稳定版插件的 Astro 条件内联脚本解析回归；插件发布兼容版后再独立升级。不得在安装时静默增加 adapter、MDX、UI/CSS/动画框架、Playwright、CMS、数据库、认证、搜索、外部服务或商业依赖。

安装身份、命令与停止条件：

```powershell
$mythicProjectRoot = (Resolve-Path -LiteralPath '.').Path
$mythicProjectNode = 'D:\Program Files\nvm\v24.16.0\node.exe'
$mythicProjectCorepack = 'D:\Program Files\nvm\v24.16.0\corepack.cmd'
$mythicProjectRuntimeDirectory = [IO.Path]::GetDirectoryName($mythicProjectNode)
$env:ASTRO_TELEMETRY_DISABLED = '1'

if ($mythicProjectRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicProjectRoot"
}
if (-not (Test-Path -LiteralPath $mythicProjectNode)) {
  throw 'Mythic China fixed Node.js runtime not found.'
}
if (-not (Test-Path -LiteralPath $mythicProjectCorepack)) {
  throw 'Mythic China fixed Corepack command not found.'
}
if ((& $mythicProjectNode --version) -ne 'v24.16.0') {
  throw 'Unexpected Mythic China Node.js version.'
}
if ((& $mythicProjectCorepack --version) -ne '0.35.0') {
  throw 'Unexpected Mythic China Corepack version.'
}

$mythicOtherPathEntries = @($env:Path -split [IO.Path]::PathSeparator) | Where-Object {
  $_ -and $_.TrimEnd('\\') -ine $mythicProjectRuntimeDirectory.TrimEnd('\\')
}
$env:Path = (@($mythicProjectRuntimeDirectory) + $mythicOtherPathEntries) -join [IO.Path]::PathSeparator
$mythicResolvedNode = (Get-Command node -CommandType Application | Select-Object -First 1).Source
if ((Resolve-Path -LiteralPath $mythicResolvedNode).Path -ne (Resolve-Path -LiteralPath $mythicProjectNode).Path) {
  throw "Project child processes would use the wrong Node.js: $mythicResolvedNode"
}

$mythicPackage = Get-Content -LiteralPath (Join-Path $mythicProjectRoot 'package.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($mythicPackage.packageManager -ne 'pnpm@11.22.0') {
  throw "Unexpected package manager contract: $($mythicPackage.packageManager)"
}

& $mythicProjectCorepack install
if ($LASTEXITCODE -ne 0) { throw 'Corepack failed to provide the project package manager.' }

$mythicPnpmVersion = & $mythicProjectCorepack pnpm --version
if ($LASTEXITCODE -ne 0 -or $mythicPnpmVersion -ne '11.22.0') {
  throw "Unexpected pnpm version: $mythicPnpmVersion"
}

& $mythicProjectCorepack pnpm install --ignore-scripts
if ($LASTEXITCODE -ne 0) { throw 'M2 dependency installation failed.' }
```

影响：`corepack install` 只把 `packageManager` 指定的 pnpm 下载到 Corepack 用户缓存；当前机器的 pnpm 内容寻址 store 实际为 `F:\.pnpm-store\v11`，项目内只生成 `node_modules` 与唯一的 `pnpm-lock.yaml`。pnpm 11 默认的一日依赖成熟期策略因 Astro `7.2.8` 为新发布的已确认精确版本，在项目根 `pnpm-workspace.yaml` 记录 `astro@7.2.8` 的 `minimumReleaseAgeExclude`；同一文件显式记录 `allowBuilds.esbuild: false`，与 `--ignore-scripts` 的既有供应链边界一致，不授权第三方生命周期脚本。该文件不声明额外工作区包。安装不创建全局 pnpm shim，不修改系统 PATH、nvm 当前选择或其他项目。上述 PATH 调整只作用于当前 PowerShell 进程，确保本机 pnpm 启动的 `node`、Astro、ESLint、Vitest 与 Prettier 子进程也解析到开发基线目录；package script 守卫随后验证版本仍落在 engine 范围。若根目录、本机固定运行时/Corepack/pnpm 精确版本、manifest 白名单或锁文件种类不符，若安装要求额外依赖/构建批准，或任一命令失败，立即停止，不改用当前公开 PATH、其他 pnpm、lock 或 fallback。

安装后回查：

```powershell
if (-not (Test-Path -LiteralPath (Join-Path $mythicProjectRoot 'node_modules'))) {
  throw 'node_modules was not created in the project root.'
}
if (-not (Test-Path -LiteralPath (Join-Path $mythicProjectRoot 'pnpm-lock.yaml'))) {
  throw 'pnpm-lock.yaml was not created.'
}
$mythicUnexpectedLocks = Get-ChildItem -LiteralPath $mythicProjectRoot -File | Where-Object {
  $_.Name -in @('package-lock.json', 'npm-shrinkwrap.json', 'yarn.lock', 'bun.lock', 'bun.lockb')
}
if ($mythicUnexpectedLocks) {
  $mythicUnexpectedLocks.FullName
  throw 'Unexpected lock file found.'
}
& $mythicProjectCorepack pnpm list --depth 0
if ($LASTEXITCODE -ne 0) { throw 'Installed dependency verification failed.' }
& $mythicProjectCorepack pnpm run runtime:check
if ($LASTEXITCODE -ne 0) { throw 'Project child-process runtime verification failed.' }
git status --short --branch
```

初始化必须建立 `format:check`、`lint`、`test`、`typecheck`、`build` 与聚合 `check` 的真实 script；其中 `build` 必须先执行 `astro check` 再执行 `astro build`，`check` 按格式、lint、Vitest、build 的顺序执行。本机命令都通过固定 Corepack 显式调用；package scripts 自身不编码机器路径：

```powershell
& $mythicProjectCorepack pnpm run format:check
& $mythicProjectCorepack pnpm run lint
& $mythicProjectCorepack pnpm run test
& $mythicProjectCorepack pnpm run typecheck
& $mythicProjectCorepack pnpm run build
& $mythicProjectCorepack pnpm run check
```

本地修改需要格式化时，在同一身份门禁下执行 `& $mythicProjectCorepack pnpm run format`；该命令会按现有 Prettier 配置写入匹配源码，须先确认工作树范围并在结束后核对差异，不能覆盖范围外的用户修改。Markdown 仍按现有 ignore 规则单独进行文档验证。

`dev` 与 `preview` script 可以写入 manifest，但本轮没有服务启动授权，不执行。首次锁文件生成并通过门禁后，干净环境复现使用 `& $mythicProjectCorepack pnpm install --frozen-lockfile --ignore-scripts`；任何 manifest/lock 不一致必须失败，不允许在验证阶段静默更新锁文件。

自动化验证默认只读取仓库、锁定依赖和本地 fixture，并写入明确的可再生构建产物；不得连接、创建、启动、重启或清空真实数据库、消息系统、缓存、对象存储或其他外部基础设施，也不得调用真实表单、邮件、分析、支付或其他写接口。未来确需隔离集成环境时，必须另列资源身份、授权、影响和真实联调入口。

定向测试使用同一身份门禁和进程环境，例如：

```powershell
& $mythicProjectCorepack pnpm run test tests/content/content-schemas.test.ts
```

### CJK 字体子集生产

CJK 子集生产是非默认、可删除的本地构建步骤，不属于日常 `pnpm check` 的环境前置条件。只有需要从锁定上游输入重新生成派生 WOFF2 时，才在仓库已忽略的 `.local/font-production/` 中使用 Python 隔离环境；站点运行依赖、系统 Python、全局 site-packages、用户字体目录与浏览器字体配置都不得修改。默认 Node 门禁使用直接开发依赖 `fontkitten@1.0.3` 读取已经落库且受 SHA-256 约束的 WOFF2，并用 `parse5@8.0.1` 解析实际 HTML5 树；不调用 Python。

首次准备或显式重建前，必须再次取得依赖/网络授权，并只从 Adobe Source Han Sans `2.005R` 对应的固定 commit `6c709ca72d3d7c46ab42ebecc1a26e7d69595a37` 下载 SC/TC 变量 TTF。单文件上游未公布独立摘要，因此首次下载值只可标为本地计算；摘要经人工复核并写入 `font-assets.json` 后，生成脚本必须在处理前精确比较，不能追随 `latest`、tag 漂移、重定向后的其他版本或未锁定本地文件。

```powershell
$mythicFontRoot = (Resolve-Path -LiteralPath '.').Path
$mythicFontPython = 'C:\Program Files\Python313\python.exe'
$mythicFontWork = Join-Path $mythicFontRoot '.local\font-production'
$mythicFontVenv = Join-Path $mythicFontWork 'venv'
$mythicFontSource = Join-Path $mythicFontWork 'source'

if ($mythicFontRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicFontRoot"
}
if (-not (Test-Path -LiteralPath $mythicFontPython)) {
  throw 'Mythic China font-production Python runtime not found.'
}
New-Item -ItemType Directory -Force -Path $mythicFontSource | Out-Null
& $mythicFontPython -m venv $mythicFontVenv
if ($LASTEXITCODE -ne 0) { throw 'Font-production virtual environment creation failed.' }

$mythicFontVenvPython = Join-Path $mythicFontVenv 'Scripts\python.exe'
& $mythicFontVenvPython -m pip install --disable-pip-version-check --requirement scripts/font-production-requirements.txt
if ($LASTEXITCODE -ne 0) { throw 'Pinned font-production tool installation failed.' }

$mythicFontScInput = Join-Path $mythicFontSource 'SourceHanSansSC-VF.ttf'
$mythicFontTcInput = Join-Path $mythicFontSource 'SourceHanSansTC-VF.ttf'
Invoke-WebRequest -UseBasicParsing -Uri 'https://raw.githubusercontent.com/adobe-fonts/source-han-sans/6c709ca72d3d7c46ab42ebecc1a26e7d69595a37/Variable/TTF/SourceHanSansSC-VF.ttf' -OutFile $mythicFontScInput
Invoke-WebRequest -UseBasicParsing -Uri 'https://raw.githubusercontent.com/adobe-fonts/source-han-sans/6c709ca72d3d7c46ab42ebecc1a26e7d69595a37/Variable/TTF/SourceHanSansTC-VF.ttf' -OutFile $mythicFontTcInput
$mythicFontScHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $mythicFontScInput).Hash.ToLowerInvariant()
$mythicFontTcHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $mythicFontTcInput).Hash.ToLowerInvariant()
if ($mythicFontScHash -ne '68f866374d8ff04d2103c5b2907f1cab2dbec91ac0fb6ad0b801c6db0c1faa80') {
  throw "Unexpected Source Han Sans SC input: $mythicFontScHash"
}
if ($mythicFontTcHash -ne '1a273a56aa47250c7af95e461ee0c8236c60d7141e14a37bd18baccb1e851b19') {
  throw "Unexpected Source Han Sans TC input: $mythicFontTcHash"
}
```

输入摘要通过后，以两个独立目录重建并比较全部六份输出；任一文件名、长度或 SHA-256 不同即停止，不写正式资产目录。两次输出一致后，再从同一锁定输入生成正式目录：

```powershell
$mythicFontReproA = Join-Path $mythicFontWork 'repro-a'
$mythicFontReproB = Join-Path $mythicFontWork 'repro-b'
$mythicFontOutput = Join-Path $mythicFontRoot 'src\assets\fonts\mythic-han-sans\2.005R-subset-v1'

& $mythicFontVenvPython scripts/build-cjk-font-subsets.py --sc-input $mythicFontScInput --tc-input $mythicFontTcInput --output-directory $mythicFontReproA
if ($LASTEXITCODE -ne 0) { throw 'First CJK subset reproduction failed.' }
& $mythicFontVenvPython scripts/build-cjk-font-subsets.py --sc-input $mythicFontScInput --tc-input $mythicFontTcInput --output-directory $mythicFontReproB
if ($LASTEXITCODE -ne 0) { throw 'Second CJK subset reproduction failed.' }

$mythicFontReproAFiles = Get-ChildItem -LiteralPath $mythicFontReproA -File | Sort-Object Name
$mythicFontReproBFiles = Get-ChildItem -LiteralPath $mythicFontReproB -File | Sort-Object Name
if (($mythicFontReproAFiles.Name -join '|') -ne ($mythicFontReproBFiles.Name -join '|')) {
  throw 'CJK subset reproduction inventory mismatch.'
}
foreach ($mythicFontReproFile in $mythicFontReproAFiles) {
  $mythicFontOtherFile = Join-Path $mythicFontReproB $mythicFontReproFile.Name
  $mythicFontLeftHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $mythicFontReproFile.FullName).Hash
  $mythicFontRightHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $mythicFontOtherFile).Hash
  if ($mythicFontLeftHash -ne $mythicFontRightHash) {
    throw "CJK subset reproduction mismatch: $($mythicFontReproFile.Name)"
  }
}

& $mythicFontVenvPython scripts/build-cjk-font-subsets.py --sc-input $mythicFontScInput --tc-input $mythicFontTcInput --output-directory $mythicFontOutput
if ($LASTEXITCODE -ne 0) { throw 'Committed CJK subset generation failed.' }
```

影响：网络请求只包含公开包名、版本及上述两个 Adobe 固定文件 URL，不上传仓库、内容或用户数据；临时写入范围只有已忽略的 `.local/font-production/`，正式写入范围只有清单列出的六份 WOFF2。退出策略是删除已只读确认位于该精确目录内的 `.local/font-production/`；稳定仓库保留锁定 requirements、生成器、字符集、OFL、FONTLOG、派生 WOFF2 与 Node 门禁。默认 `pnpm check` 不需要 Python 或这些临时源文件；它使用 `fontkitten` 直接核对落库/构建 WOFF2 的 hash、内部 name、静态字重与 cmap，并用 `parse5` 按浏览器 HTML5 树语义核对可见字符的精确语言继承。

只有获得单独服务启动授权后，才可在已经通过上述根目录、Node、PATH 子进程与 pnpm 身份门禁的同一 PowerShell 会话中运行：

```powershell
& $mythicProjectCorepack pnpm run dev -- --host 127.0.0.1
# 或按明确验收范围运行：
& $mythicProjectCorepack pnpm run preview -- --host 127.0.0.1
```

影响：命令会启动本地 HTTP 服务并持续占用端口，必须记录实际监听地址和 PID；验收完成、根目录/运行时身份变化、出现非预期外部监听或服务错误时立即 `Ctrl+C`，随后只读确认端口不再监听。本次 M2 没有获得或执行这项服务授权。

`dev` / `preview` 属于会改变本地进程与端口状态的运行操作。端口查询、HTTP GET 或现有进程状态查询只是只读观测，不得隐式启动、重启、修复或替代上述授权；状态不可达也不能自动推导出启动许可。

M2 执行记录（2026-08-27 初始化；2026-08-28 审计修复）：

- 固定运行时为 `D:\Program Files\nvm\v24.16.0\node.exe` / `v24.16.0`，固定 Corepack 为同目录 `0.35.0`，项目 pnpm 为 `11.22.0`。公开 PATH 的 Node.js `16.20.2` 曾被子进程回查识别并阻止；`scripts/verify-runtime.mjs` 与进程内 PATH 置顶共同确保所有 package script 使用固定运行时。
- 在精确项目根手工创建 manifest、配置、源码和测试后，以 `--ignore-scripts` 安装精确白名单依赖。pnpm 11 的默认一日发布成熟期为当天确认的 `astro@7.2.8` 自动生成唯一 `pnpm-workspace.yaml` 例外；项目仍只有根包和唯一 `pnpm-lock.yaml`。
- 干净复现时只删除已验证位于项目根下的 `node_modules`、`.astro` 与 `dist` 三个可再生目录；`pnpm install --frozen-lockfile --ignore-scripts` 从 `F:\.pnpm-store\v11` 复用 378 个包、下载 0 个，并重建依赖目录。`package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml` 的 SHA-256 前后完全一致。
- 2026-08-28 审计修复后，聚合 `check` 再次按格式、lint、Vitest、`astro check`、`astro build` 顺序通过：4 个测试文件、41 项测试通过；类型/内容检查为 0 errors、0 warnings、0 hints；静态构建生成 3 个页面且没有客户端 JavaScript 文件。空的 Source、Claim、Terminology 集合会输出预期告警，因为 M2 不制造假文化记录。
- `ASTRO_TELEMETRY_DISABLED=1` 用于项目命令；未启用应用分析或真实外部服务。没有启动 dev/preview、没有 Git add/commit/push、没有部署或发布。

### M1 临时 Express 预览

2026-08-27，用户仅为本次 M1 浏览器验收授权临时 Express 预览。环境和影响：

- 使用 Codex 桌面环境自带的 Node.js `24.19.0` 与 Express `5.2.0`。
- Express 及 npm cache 只写入系统临时目录，不生成项目 `package.json`、锁文件或源码。
- 服务只绑定 `127.0.0.1:4173`，只公开当前仓库的 `prototypes/` 与 `docs/` 静态文件，不接受表单、数据库、邮件、分析或任何业务写入。
- 静态响应使用 `Cache-Control: no-store`；完成本次浏览器能力允许的检查后停止，未执行项必须如实回填，不能据此宣称 M1 通过。

执行前验证工作区、运行时、临时目标和端口：

```powershell
$mythicPreviewRoot = (Resolve-Path -LiteralPath '.').Path
$mythicPreviewNode = 'C:\Users\335086\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$mythicPreviewNpmCli = 'C:\nvm4w\nodejs\node_modules\npm\bin\npm-cli.js'
$mythicPreviewRuntime = Join-Path ([IO.Path]::GetTempPath()) 'mythic-china-m1-preview-20260827'
$mythicPreviewCache = Join-Path ([IO.Path]::GetTempPath()) 'mythic-china-npm-cache'

if ($mythicPreviewRoot -ne 'F:\codex-project\mythic-china') { throw "Unexpected workspace: $mythicPreviewRoot" }
if (-not (Test-Path -LiteralPath $mythicPreviewNode)) { throw 'Bundled Node.js not found.' }
if (-not (Test-Path -LiteralPath $mythicPreviewNpmCli)) { throw 'npm CLI not found.' }
if (Get-NetTCPConnection -State Listen -LocalPort 4173 -ErrorAction SilentlyContinue) { throw 'Port 4173 is already in use.' }
```

安装临时依赖：

```powershell
& $mythicPreviewNode $mythicPreviewNpmCli install --prefix $mythicPreviewRuntime --no-save --package-lock=false --ignore-scripts --cache $mythicPreviewCache express@5.2.0
```

启动预览：

```powershell
$mythicPreviewServer = @'
const express = require(process.argv[1]);
const path = require("node:path");
const root = process.argv[2];
const app = express();
const staticOptions = { dotfiles: "deny", etag: false, fallthrough: false, lastModified: false };

app.disable("x-powered-by");
app.use((request, response, next) => {
  response.set("Cache-Control", "no-store");
  next();
});
app.get("/", (request, response) => response.redirect(302, "/prototypes/m1-home.html"));
app.use("/prototypes", express.static(path.join(root, "prototypes"), staticOptions));
app.use("/docs", express.static(path.join(root, "docs"), staticOptions));

const server = app.listen(4173, "127.0.0.1", () => {
  console.log("Mythic China M1 preview: http://127.0.0.1:4173/prototypes/m1-home.html");
});
server.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
'@

& $mythicPreviewNode -e $mythicPreviewServer (Join-Path $mythicPreviewRuntime 'node_modules\express') $mythicPreviewRoot
```

停止条件：浏览器验收完成、出现非预期外部监听、工作区身份变化或服务错误时立即按 `Ctrl+C` 停止。停止后确认 4173 不再监听。临时依赖目录不属于项目，不得提交或复制进仓库。

执行记录（2026-08-27）：

- Express `5.2.0` 已安装到系统临时目录 `mythic-china-m1-preview-20260827`，共 68 个临时包、0 个 npm audit 漏洞；npm cache 位于 `mythic-china-npm-cache`。两个目录均未复制进项目。
- 服务曾按上述边界运行；Home、Collection、Entry、Review Board 及其本地 CSS、JavaScript、桌面/移动图片和公开文档引用均返回 `200`，仓库根文件不在公开静态目录中。
- 当前 M1 原型已完成单一桌面浏览器中的 390/768/1440px 视觉与溢出、移动菜单/目录、Home → Collection → Entry 与浏览历史、页内锚点和焦点回归、Escape、对比与触控目标、无图/灰度、当前系统 fallback、控制台和本地资源检查。新 Review Board 已落实四个第二轮系统证据；截图只保存于仓库外的临时验收目录。
- 当前浏览器控制面不提供 JavaScript 禁用或媒体偏好模拟，真实 Tab/Shift+Tab/Enter 全链、浏览器真实 200% 缩放和开发者工具逐字形命中也无法可靠驱动；这些项目在当时均保持未验收。批准的自托管字体文件、慢加载与 macOS/iOS/Android fallback 后续归入 M6 release-candidate gate；当时写作“移交首个真实纵切片”的目标读者测试现按 011 改在 M7 Public Beta 上线后执行。
- 用户于 2026-08-27 明确冻结 M1 以结束继续探索，同时明确表示当前页面风格不是其想要的方向；这项反馈记录为人工视觉满意度未通过，不能把 M1 冻结解释为设计批准。
- `Ctrl+C` 未在限定等待内结束进程，随后只读确认精确监听 PID、Node 路径与启动时间后终止该临时进程。`127.0.0.1:4173` 已无监听且 HTTP 不可达；该次 M1 收口当时项目仍无 `package.json`、锁文件或 `node_modules`。

`docs/requirements/001-mvp-foundation.md` 的 M2 本地实施已经完成；本节保存其真实运行时、安装、定向/全量验证与本地服务门禁。预览/生产环境仍不存在，首次建立前必须另行补入实际身份、部署入口、不可变源身份、停止/撤销方式和发布后只读检查，并取得对应授权。

## 文档验证

以下命令可在当前阶段执行，均为只读检查。

### 文件清单

```powershell
rg --files -g '*.md'
```

通过标准：根目录治理文档、`docs/` 专题文档和当前需求文档全部存在。

### 原模板占位符

```powershell
rg -n '\{\{[^}]+\}\}' .
```

通过标准：无输出。

### UTF-8 严格解码

```powershell
$utf8Strict = [Text.UTF8Encoding]::new($false, $true)
$invalidUtf8Files = @()
$markdownFiles = @(rg --files -g '*.md')
$markdownFiles | ForEach-Object {
  $markdownFile = Get-Item -LiteralPath $_
  try {
    $null = $utf8Strict.GetString([IO.File]::ReadAllBytes($markdownFile.FullName))
  } catch {
    $invalidUtf8Files += $markdownFile.FullName
  }
}
if ($invalidUtf8Files.Count -gt 0) {
  $invalidUtf8Files
  throw 'Invalid UTF-8 Markdown files found.'
}
```

通过标准：命令退出成功且不列出文件。

### 相对 Markdown 链接

```powershell
$brokenMarkdownLinks = @()
$markdownFiles = @(rg --files -g '*.md')
$markdownFiles | ForEach-Object {
  $markdownFile = Get-Item -LiteralPath $_
  $markdownText = Get-Content -LiteralPath $markdownFile.FullName -Raw -Encoding UTF8
  $relativeLinks = [regex]::Matches($markdownText, '\[[^\]]+\]\((?!https?://|mailto:|#)([^)#]+)(?:#[^)]+)?\)')
  foreach ($relativeLink in $relativeLinks) {
    $relativeTarget = $relativeLink.Groups[1].Value.Trim('<', '>')
    if (-not (Test-Path -LiteralPath (Join-Path $markdownFile.DirectoryName $relativeTarget))) {
      $brokenMarkdownLinks += "$($markdownFile.FullName) -> $relativeTarget"
    }
  }
}
if ($brokenMarkdownLinks.Count -gt 0) {
  $brokenMarkdownLinks
  throw 'Broken relative Markdown links found.'
}
```

通过标准：命令退出成功且不列出链接。

### 外部引用格式抽查

```powershell
rg -n 'https?://' docs README.md
```

通过标准：外部链接位于明确的“来源”“参考”或正文引用语境，不存在裸链接堆叠和来源不明的视觉资产。

### 差异完整性

影响：只读检查当前工作树差异，不修改索引或文件。

```powershell
git diff --check
```

通过标准：命令退出成功且没有空白错误。

## Git 与版本控制

### 本次明确授权的本地初始化记录

用户已在 M1 冻结后明确授权只对当前项目根执行最小本地 Git 初始化。执行前门禁和唯一初始化命令：

```powershell
$mythicGitRoot = (Resolve-Path -LiteralPath '.').Path
if ($mythicGitRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicGitRoot"
}
if (Test-Path -LiteralPath (Join-Path $mythicGitRoot '.git')) {
  throw 'Git repository already exists.'
}

git init
if ($LASTEXITCODE -ne 0) {
  throw 'git init failed.'
}
```

影响：只在精确根目录创建 `.git`；使用本机 Git 配置决定的 unborn HEAD 名称，不通过 `branch`、`checkout` 或 `switch` 选择或创建额外分支。不得执行 `git add`、`git commit`、`git push`、`git remote add` 或 `git worktree`。

初始化后只读验证：

```powershell
$mythicVerifiedGitRoot = (Resolve-Path -LiteralPath (git rev-parse --show-toplevel)).Path
if ($mythicVerifiedGitRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected Git root: $mythicVerifiedGitRoot"
}

git status --short --branch
$mythicTrackedFiles = git ls-files --cached
if ($mythicTrackedFiles) {
  throw 'Unexpected staged or tracked files.'
}
$mythicRemotes = git remote -v
if ($mythicRemotes) {
  throw 'Unexpected Git remote.'
}
```

初始化完成当时的通过标准：仓库根精确等于当前项目目录；没有提交或索引条目；项目文件保持未跟踪；`git remote -v` 无输出。后续状态以同一节的执行记录和当前只读检查为准。

执行记录（2026-08-27）：

- 已在精确根目录 `F:\codex-project\mythic-china` 执行 plain `git init`，未传入初始分支名，也未执行 `branch`、`checkout`、`switch` 或 `worktree`。
- `git rev-parse --show-toplevel` 返回当前项目根；`git status --short --branch` 显示 `No commits yet on master`。`master` 只是本机 Git 产生的 unborn HEAD 标签，不代表已批准的长期分支策略。
- `git ls-files --cached` 为 0 个条目，未执行 `git add` 或 `git commit`；所有项目文件保持未跟踪。
- `git remote -v` 无输出，未创建远端，也未执行 push；在该 Git 初始化时点，应用运行时、依赖、托管和发布均未初始化。
- 用户随后自行创建 `first commit`、将当前分支改为 `main`、配置 `origin` 并建立 `main...origin/main` 跟踪关系；用户已确认这些操作属于本人。代理没有执行、撤销或改写这些 Git 操作。

### 用户执行的 M1 工程参考基线提交

用户于 2026-08-27 要求提供提交命令。先执行第一段，把当前 M1 治理文档、权威文档和原型加入暂存区并检查；确认清单无误后再单独执行第二段。两段均不执行 push。

```powershell
Set-Location -LiteralPath 'F:\codex-project\mythic-china'
$mythicCommitRoot = (Resolve-Path -LiteralPath '.').Path
if ($mythicCommitRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicCommitRoot"
}

git status --short --branch
git add -- AGENTS.md AI_COLLABORATION.md DEV_WORKFLOW.md PROJECT_RULES.md README.md REQUIREMENT_DEVELOPMENT.md STYLE.md docs prototypes
git diff --cached --check
if ($LASTEXITCODE -ne 0) {
  throw 'Staged diff check failed.'
}
git diff --cached --name-status
git diff --cached --stat
git status --short --branch
```

确认暂存清单只包含本次 M1 文件后执行：

```powershell
Set-Location -LiteralPath 'F:\codex-project\mythic-china'
$mythicCommitRoot = (Resolve-Path -LiteralPath '.').Path
if ($mythicCommitRoot -ne 'F:\codex-project\mythic-china') {
  throw "Unexpected workspace: $mythicCommitRoot"
}

git commit -m "Freeze M1 engineering reference baseline"
if ($LASTEXITCODE -ne 0) {
  throw 'git commit failed.'
}
git status --short --branch
```

预期：第一段结束时，暂存区只包含上面明确列出的项目文件，且 `git diff --cached --check` 无输出。若清单出现范围外文件，停止，不执行第二段。提交成功后工作树干净；因本节不执行 push，状态通常显示本地 `main` 领先 `origin/main` 一个提交。远端推送需用户另行决定和执行。

### 用户执行的 M2 工程与内容基线提交

M3-U1 开始前的只读核查记录（2026-08-28）：

- 本地 HEAD 为 `f258227da1b5a73f22c87ec99722243742db0ba0`，subject 为 `feat: complete M2 content foundation`。
- HEAD、`main` 与本地 remote-tracking ref `origin/main` 指向同一提交；`git status --short --branch` 当时只有 `## main...origin/main`，工作树干净。
- 本次没有执行 `git fetch` 或访问远端服务器，因此该记录只证明本地 `origin/main` 的已知状态，不证明服务器端分支在核查时仍相同。
- 该提交由用户完成。记录此基线不授予代理执行 `git add`、commit、push、分支、worktree 或发布的权限；本段描述 M3-U1 开始前现场，M3 后续结果现已形成 `c606f5` 完成基线，见下方“M3 完成基线与 M4-U1 接管”。

### M3-U2 最小研究与 visual brief

2026-08-28，用户确认 M3-U1 六项核心决定并明确开始 M3-U2。当前执行记录：

- 新增 5 份真实馆藏 Source、5 份限定表述的 verified Claim，并把全部证据 Source/Claim 原子列入 draft `zhong-kui` Entry；未填写 `earliestKnown*`、Terminology 或 `heroAssetId`，未扩写正文或提升状态。
- 新增 `visual/briefs/brief-zhong-kui-visual-package-v1.yml`，状态为 `in-review`；4 个 reference asset 的图像权利已核为 public-domain/CC0，brief 明确区分 verified、inferred 与 invented。
- M2 架构测试只做必要边界同步：允许唯一的 `visual/briefs/*.yml` 研究记录，继续禁止 manifest、production record、style guide、workflow 与 `src/assets`。
- 固定 Node `24.16.0` 下完整 `pnpm run check` 通过：Prettier、ESLint、4 个测试文件/41 项测试、`astro check`（0 error、0 warning、0 hint）与 3 页静态 build 全部成功。Terminology 仍为空时 Astro 输出预期的空集合提示；未安装依赖、启动服务、创建图片、执行 Git 写入或发布。

### M3-U3 Schema、loader、validator 与 resolver

2026-08-28，用户明确确认 M3-U2 brief 并授权开始 M3-U3。当前执行记录：

- `brief-zhong-kui-visual-package-v1` 由项目所有者确认并记录为 `approved`；批准身份使用可核实的角色 `Project owner (user-confirmed)`，未臆造个人姓名。该决定只批准 brief，不批准图片、制作方式或发布。
- `visualBriefs` 与 `assets` 两个 build-time collection 已通过原生 Astro `glob()` 接入；`src/visual/` 已建立严格 brief/manifest Schema、纯关系/文件 validator、本地图片 metadata registry、可信目录链 inventory 与显式 current resolver。Entry/Collection 的非空 `heroAssetId` 现必须解析真实逻辑资产，不能再用格式合法的假字符串绕过；visual/图片目录的父级或嵌套 symlink/junction 同样 fail-closed。
- `visual/manifests/.gitkeep` 与 `src/assets/images/.gitkeep` 只建立空 inventory 边界；没有生产 manifest、图片、workflow、model registry 或 production record。空 `assets` 与 `terminology` collection 的 Astro 提示为当前预期，不代表假数据应被加入。
- production record/workflow/model registry 的真实文件、workflow SHA 与 model ID 外键，以及真实生产 AVIF/WebP 输入尚未核验；这些是 M3-U4 的明确阻塞，U3 只验证字段、路径形状、关系和空 inventory，不能把合成 fixture 写成生产事实。
- 固定 Node `24.16.0` 下完整 `pnpm run check` 通过：Prettier、ESLint、9 个测试文件/68 项测试、`astro check`（0 error、0 warning、0 hint）与 3 页静态 build 全部成功。未安装依赖、启动 dev/preview 服务、执行 Git 写入、访问真实业务写接口或发布。

### M3-U4 钟馗视觉生产

2026-08-28，用户明确授权开始 M3-U4，并确认 `ai-assisted + OpenAI ImageGen`、本期不使用 ComfyUI、项目根 `/.local/visual-production/masters/` 为 Git-ignored master 根、五项审核由 `Project owner (user-confirmed)` 承担。当前执行记录：

- `/.gitignore` 已锚定忽略 `/.local/`；该目录不进入 Git inventory、Content Layer 或默认 build，当前没有独立备份，丢失时只能按 production record 重新生成。
- Hero `1672×941` art-direction anchor 已由 Project owner 确认，仅作为后续独立构图的项目原创身份参考，不作为 `3200×1800` master 或历史证据。
- 新增 `productionRecords` build-time collection、strict production record Schema、可信目录 inventory 与 manifest 双向外键；默认 build 校验已提交的 brief/method/tool/master tuple，但不读取未跟踪 local master。
- 使用 Hero 身份锚点独立构图并筛选 Hero mobile、Article Lead、Open Graph 与 Social portrait；Social 初稿因伪文字状纹样被拒绝并定向修正，Hero desktop/mobile 又因安全区终审分别完成顶部/右侧与顶部/底部定向修正。2026-08-29 Project owner 拒绝 Hero mobile 小鬼的跪拜/合掌姿态；两次定向编辑将三名小鬼改为警戒、支撑或退避姿态并恢复完整底部安全区。旧 mobile master/source 备份于 Git-ignored local explore 目录，最终五个 exact-canvas master 保存在 `/.local/`，五份尺寸锁定 repository source rendition 已进入 `src/assets/images/`。
- production record 保存真实 prompt、输入/原始输出/master hash、尺寸、收到/核验时间和裁切/重建/编码过程；馆藏图片没有上传给 ImageGen。本轮使用的托管工具未在回执中暴露模型 ID，因此保持 `modelId: null`，不猜测模型或 seed。
- 固定 Node `24.16.0` 下完整 `pnpm run check` 通过：Prettier、ESLint、9 个测试文件/70 项测试、`astro check`（0 error、0 warning、0 hint）与 3 页静态 build 全部成功。真实 WebP/PNG source 的格式、尺寸、SHA-256、10 MiB 上限、manifest/record 双向关系与孤儿文件门禁均通过。
- 2026-08-29 Project owner 确认本轮使用个人且非组织管理的 OpenAI 账户，并确认有权为 Mythic China 生成、保存和发布输出；四份 manifest 的 publication rights 与文化、权利、视觉、无障碍、语言审核已据实记录为 approved/current，钟馗 Entry 已绑定 Hero。
- 2026-08-29 最终状态再次使用固定 Node `24.16.0` 运行完整 `pnpm run check`：Prettier、ESLint、9 个测试文件/70 项测试、`astro check`（0 error、0 warning、0 hint）与 3 页静态 build 全部成功；修正后的 Hero mobile metadata/hash、production record、approved/current 审核门禁与 Entry Hero 解析均通过。
- U4 收口时尚未执行：M3-U5、依赖变更、dev/preview 服务、Git 写入或发布；后续 U5 授权与结果见下一节。

### M3-U5 构建与收口

用户于 2026-08-29 首先授权 M3-U5 的资产构建验证与文档收口，排除服务、依赖调整、Git 写操作和 M4；初次验证确认 `MissingSharp` 后，Project owner 又单独授权把 `sharp@0.35.4` 加为直接依赖、更新唯一锁文件并使用固定运行时安装，然后重跑 U5、完整工程门禁与文档收口。两次授权均不包含服务、Git 写操作、发布或 M4。U5 新增以下非默认入口：

```powershell
$fixedRuntime = 'D:\Program Files\nvm\v24.16.0'
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:Path = "$fixedRuntime;$env:Path"
& (Join-Path $fixedRuntime 'corepack.cmd') pnpm run visual:build:check
```

影响与边界：

- 命令先通过固定运行时守卫，再从真实 Asset Manifest 核验项目内 Git-ignored `/.local/visual-production/masters/`。它检查 logical URI、路径边界、目录链接、孤儿文件、真实尺寸、格式和 SHA-256；这是刻意与默认 build 分离的本地生产复核，clone/CI 缺少 ignored master 时普通 `pnpm run check` 仍不失败。
- 命令在创建临时目录前先从项目可信根逐段拒绝 `/.local/visual-production/` 父链中的 symlink/junction、缺失项或非目录。随后通过临时注入且只存在于本次构建的 `noindex` verification route 消费 approved/current manifest；三份 responsive repository rendition 按各自 buildPlan 请求 AVIF/WebP 与全部 candidate widths。验证 `outDir`、Astro 图片缓存和 Vite cache 只写入 ignored `/.local/visual-production/m3-build-check-*`，完成或失败后由 `finally` 删除，不写入默认 `dist/`、manifest 或生产页面。
- Astro 的 Content Layer/预渲染实现仍可能刷新项目根下 ignored `.astro/` 构建元数据；这类可重建缓存不进入 Git 或发布制品，也不作为 U5 的持久完成证据。普通 `pnpm run check` 同样可能刷新项目的 ignored build cache，因此“临时输出已清理”只指上行的 `m3-build-check-*` 与其中缓存，不声称清除既有 `.astro/` 或 `node_modules/.astro/`。
- 该入口不启动 dev/preview 服务、不调用 ImageGen/ComfyUI、不访问网络、不修改依赖或锁文件、不执行 Git 写入。

2026-08-29 执行记录：

- local master 验证通过：四份 manifest 引用的五个 master 均存在且唯一，路径未逃逸、无 symlink/junction 或孤儿文件，实际尺寸、格式与 SHA-256 一致。
- 初次隔离构建在登记 22 个目标后因项目没有直接 `sharp` 依赖报告 `MissingSharp`。Project owner 随后单独授权精确依赖；`package.json` 与唯一 `pnpm-lock.yaml` 已加入 `sharp@0.35.4`，固定 Node/Corepack/pnpm 从既有 `F:\.pnpm-store\v11` 复用 379 个包、下载 0 个，并以 `--ignore-scripts` 完成 frozen-lockfile 安装。固定 Node 可实际加载 Sharp `0.35.4` 与 libvips `8.18.6`。
- `pnpm-workspace.yaml` 显式记录 `allowBuilds.esbuild: false`，没有运行第三方安装脚本；当前受限执行环境通过显式指向既有 store 完成安装和门禁，项目根没有残留旁路 pnpm store 或额外 lock。
- 临时 Astro 构建成功读取四份 approved/current manifest，并为三份 responsive repository rendition 实际写出和解码复核 22 个不放大的 AVIF/WebP 目标；本次验证 `outDir` 与可配置缓存位于 ignored 验证目录，验证结束后已清理。项目 ignored `.astro/` / `node_modules/.astro/` 中可重建的历史或构建缓存不属于该完成证据，未在本任务中删除。
- 固定 Node `24.16.0` 下完整 `pnpm run check` 通过：Prettier、ESLint、10 个测试文件/72 项测试、`astro check`（36 个文件，0 error、0 warning、0 hint）与 3 页静态 build 全部成功。默认 build 没有读取 `/.local`，也没有生成 M4 页面。
- M3-U5 与整个 M3 已完成。Entry 仍为 draft；没有启动 dev/preview 服务、进入 M4、执行 Git 写操作或发布。

### M3 终验 Hero v2 手部返修

2026-08-29，Project owner 在 M3 终验中指出 Hero desktop/mobile 的钟馗双手不具可信人手结构，M3 因此重开。返修严格限定在 Hero 双手，保持人物身份、面部、服装、整体构图、负空间/安全区、画幅和三名小鬼的警戒/支撑/退避姿态不变；未进入 M4，也未启动服务或调整依赖。

- 使用 OpenAI ImageGen 对 v1 desktop/mobile source 做定向编辑；候选先保存在 Git-ignored `/.local/visual-production/explore/zhong-kui/v2-hand-repair-review/`，未在确认前写成 approved/current。Project owner 明确回复“可以”后，desktop candidate 01 与 mobile candidate 02 才进入 v2 生产链；未选 mobile candidate 01 保留为探索审计材料。
- v2 使用新版本路径与文件名生成两份 exact-canvas PNG master 和两份 repository WebP source；没有覆盖或移动 v1。`asset-zhong-kui-hero-primary-v1` 仅把 `isCurrent` 改为 `false`，其余既有生产、审核与文件证据保持不变；新增 v2 manifest 与独立 production record 记录输入、raw output、prompt、处理步骤、尺寸、SHA-256 和验收时间。
- 返修后版本化 inventory 为七个 local master、七份 repository source、两份 production record 与五份 manifest 记录；Hero v2 是唯一 current Hero，Lead/OG/Social 仍为 v1 current。钟馗 Entry 的 versionless `heroAssetId` 无需改写，由 resolver 解析到 Hero v2。
- 固定 Node `24.16.0` 下 `pnpm run visual:build:check` 通过：七个 local master 与三份 current responsive rendition 均核验成功，22 个 AVIF/WebP 目标实际生成并解码复核。完整 `pnpm run check` 通过 Prettier、ESLint、10 个测试文件/72 项测试、`astro check`（36 个文件，0 error、0 warning、0 hint）与 3 页静态 build。
- M3 已重新闭合；未启动 dev/preview、未安装/升级/移除依赖、未执行 Git 写操作、未进入 M4、未发布。

### M3 完成基线与 M4-U1 接管

M4-U1 开始前的只读核查记录（2026-08-29）：

- HEAD、`main` 与本地 `origin/main` 均为 `c606f5aab92d908ff2935c5b7212ad5066636a50`，subject 为 `M3 completed`。
- `git status --short --branch` 只有 `## main...origin/main`，工作树干净。
- 未执行 fetch，因此不能据此证明服务器端分支状态。
- Project owner 仅授权 M4-U1 合同单元：新增 `docs/requirements/003-pages-exploration-seo.md` 并同步 README、001 与本文件。授权不包含页面实现、内容/资产修改、依赖、配置、服务、Git 写入、部署或发布。
- U1 文档实施完成后只执行本文件“文档验证”与 Git 只读差异检查；不运行会刷新 `.astro/` 或 `dist/` 的聚合 build。
- 执行结果：固定 Node/Corepack 下 `pnpm run format:check` 通过；19 份 Markdown 严格 UTF-8、相对链接和原模板占位符检查通过；`git diff --check` 与四个授权文件的工作树范围检查通过。未运行测试/build、服务或 Git 写操作。
- 随后 Project owner 明确确认 M4 合同第 1–9 项，并要求后置事项按对应单元再确认。该确认先收口 M4-U1；Project owner 之后又单独要求开始 M4-U2。U2 授权只覆盖已列明的 noindex review 页面、测试、package scripts 与文档，不包含 U3-U5、服务、依赖、Git 写入、部署或发布。

### M4-U2 review 构建意图

M4 使用环境变量 `MYTHIC_CHINA_BUILD_INTENT` 表达页面构建意图，其当时唯一允许值是 `review`。2026-09-08 的 013 本地 public assembly 已补齐真实 origin、published 内容、正式 loader 链、页面/output 接线和本地技术门禁，现新增显式 `public`。缺失与未知值继续失败，不能由 `NODE_ENV`、Vercel URL 或内容数量推断。review runner 仍拒绝 public；public 使用下文独立入口，技术构建不代表 M6 远端预览或 M7 生产发布资格。

项目 scripts 通过 `scripts/run-review-astro.mjs` 只向其 Astro 子进程注入 `review`，子进程结束后变量随之退出，不修改调用者 shell、系统环境或项目配置。直接绕过该入口运行 Astro 时，页面构建意图缺失并按合同失败。该入口可以用于已授权的静态检查和构建；`dev` / `preview` script 虽保持可执行定义，但每次启动、停止或重启仍须单独授权。M4-U2 页面评审已获得并使用一次本地 preview/浏览器授权，该授权不自动延续到 M4-U3–M4-U5。

### M4-U2 页面、静态与浏览器验证记录

- 已实现显式 review 投影、共享页面壳、Home/Explore/Collections/Collection/两个 Entry/About 共 7 页、approved/current Hero v2 页面接线、完整 Source 展示、CSS-only Collection realm surface 与输出 verifier。
- Project owner 在 411×651 实际视口查看后反馈字号偏大、排版松散；授权范围内只调整 `src/styles/global.css`，收敛主标题、区块间距、Home 分栏、索引/About 信息轴、Collection 移动顺序和 Entry Hero 响应式尺度，未改内容、路由、组件结构或图片。
- 固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、13 个测试文件/87 项测试、`astro check`（53 个文件，0 error、0 warning、0 hint）与 7 页静态 build。产物审计确认全部页面为 `noindex, nofollow`、全部内部链接有效、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并精确生成 14 个 Hero v2 AVIF/WebP 页面输出。
- `pnpm run visual:build:check` 回归通过七个 local master 与三份 current responsive rendition 的 22 个实际输出复核。
- 获单独授权后启动本地 preview，并在真实浏览器逐页复核全部 7 页的 1440×900、768×900 与 390×844 视口；另在 Project owner 当前 411×651 视口复核 Explore。未发现横向溢出或控制台错误/警告，页面保持 `noindex, nofollow` 与零客户端 JavaScript。
- Project owner 于 2026-08-29 明确确认 M4-U2 页面方向。该确认基于系统 fallback 字体，不构成正式字体、键盘全链、真实 200% 缩放、禁用 JavaScript、reduced-motion、图片失败、性能、跨平台 fallback、M4-U5 最终视觉或发布批准。
- U1/U2 最终收口已由用户提交为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`（`M4-u2 completed`）；`8c6d12cabce11741bb83941904993f4d8831c818` 保留为 U2 主体历史基线。代理未执行 Git 写入、部署或发布。
- 未改内容、Schema、manifest、production record、repository source、依赖或 lockfile。未来 Hero 版本切换必须同步受控页面图片 registry；不一致时构建失败，不静默回退。

### M4-U3 release 投影与探索入口门禁

Project owner 于 2026-08-29 单独授权 M4-U3，并确认采用纯 release 投影、继续拒绝 public build、沿用现有 About 四节静态文案。授权只覆盖已列明的 release/review 投影、site 测试、既有输出 verifier 与四份收口文档；不包含页面/CSS、内容/Schema、资产、依赖、服务、浏览器、Git 写入、部署或发布。

- 新增纯 `createReleaseProjection()`：只从已验证内容图选择 `published` Entry/Collection；Entry 按 `publishedAt` 降序并以稳定 ID 打破同日并列，Collection 按英文标题再按稳定 ID 排序；published Entry 缺日期时失败。它不承担 public build、SEO、最小发布内容量、关系复验或 Home 配置。
- review 投影继续负责全部 non-archived 评审路由和固定 Home draft 例外，并委托 release 投影提供 Explore/Collections/Related Entries 的 published-only view model；现有页面 API 与 7 页 review inventory 不变。
- fixture 覆盖空、六状态单项、多项排序、并列和缺日期失败；review wrapper 另有薄接线断言。输出 verifier 扩展为真实空状态、About 四节、`lang`、skip link、唯一 main target、桌面/原生 details 移动导航、内部链接、无 inline handler/`javascript:` URL 与零客户端 JavaScript 检查。
- 固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、14 个测试文件/90 项测试、`astro check`（55 个文件，0 error、0 warning、0 hint）与 7 页静态 build。输出仍为 7 页 `noindex, nofollow`、14 个 Hero v2 AVIF/WebP、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并通过 release 真实空状态与静态导航语义门禁。空 Terminology 提示符合当前 inventory。
- M4-U3 没有改视觉链，因此没有重跑非默认 `visual:build:check`；M4-U2 已记录的七个 local master 与 22 个 current 响应式输出证据不被改写。静态门禁只证明键盘语义基线和无 JS 输出，不证明真实 Tab 顺序、details 操作、焦点可见/遮挡或回返；这些仍属于 M4-U5。
- U3 写入前 HEAD、`main` 与本地 `origin/main` 均为 `5f327b63f7a227e54773718d140e7295ef6ed3c9`，工作树干净。Project owner 于 2026-08-30 将 U3 实现与原收口文档提交为 `e94eacaad989652c7f71ae50276652cc3f54997a`（`updatee`）；提交后只读核对时 HEAD、`main` 与本地 `origin/main` 对齐且工作树干净。未执行 fetch，因此不能据此证明服务器端分支状态；代理未启动服务或浏览器，也未执行 Git 写入、部署或发布。

### M4-U4A public SEO 纯基础设施

2026-08-30，Project owner 说明当前没有正式域名、未来使用 Vercel，并授权按推荐方案继续。该授权固定以下本地范围：

- 未来静态托管目标为 Vercel；当前不创建或关联 Vercel 项目，不安装 CLI/adapter，不写平台配置，不部署。
- Publisher 为 `Mythic China / Organization`，author 为 `Mythic China Editorial / Organization`，可见身份页为 `/about/`；About 保持既有四节，只在 Editorial method 内增加一段团队身份说明，并为 publisher/editorial 增加稳定锚点。
- 当前采用 text-only Open Graph，不输出 `og:image`，不借用钟馗 Entry 资产作为站点或 Collection 默认图。
- `MYTHIC_CHINA_SITE_ORIGIN` 只冻结为未来 public runner 的显式配置名；当前没有真实值，也没有代码读取环境变量。纯 origin validator 拒绝缺失、非 HTTPS、credential、port、路径/query/hash、IP、localhost 与保留示例域，不从 Vercel URL 或 `NODE_ENV` 推断。
- `public-release` 在 published Entry/Collection 任一为空时失败；`seo` 纯构建 canonical/OG/JSON-LD 并校验页面 kind/path、日期、身份、Collection published ItemList、跨页 metadata 唯一性和 script-context 序列化；`release-artifacts` 只接受固定静态路由和 published 投影，生成确定性 Sitemap/RSS 字符串，并拒绝空 feed、非法日期、重复 URL 与 XML 1.0 非法字符。
- 四份新 site 测试包含一组经过正式 Schema 与内容图 validator 的完整 synthetic published content graph；该 fixture 未经过真实 loader 或 visual graph。其他 unit fixture 只证明对应纯函数边界，不代表真实 inventory 已发布。输出 verifier 另锁定 About 可见身份锚点。
- M4-U4A 没有修改 `package.json`、`astro.config.mjs`、`SiteLayout`、模板、动态路由、内容状态、Schema、资产、依赖或 lockfile。`readBuildIntent("public")` 继续失败，仓库没有 public runner、Sitemap/RSS endpoint、public output verifier、Vercel 配置或 deployable public `dist/`。
- 固定 Node/Corepack 下最终 `pnpm run check` 完整通过 Prettier、ESLint、18 个测试文件/157 项测试、Astro check（63 个文件 0 error、0 warning、0 hint）、7 页 review build 与输出 verifier；review 输出仍为 7 个 `noindex, nofollow` 页面、14 个 Hero v2 AVIF/WebP、零 XML 与零客户端 JavaScript。
- M4-U4A 未改视觉链，因此未重跑非默认 `visual:build:check`；M3/M4-U2 的七个 local master 与 22 个 current 响应式输出证据保持不变。本单元未运行 dev/preview/browser，未执行 Git 写入、Vercel 项目操作、部署或发布。
- M4-U4A 收口当时的真实 inventory 为 0 published Entry / 0 published Collection；唯一 Collection 在进入 published 状态前还需要自己的 approved Hero 与模板接线，钟馗完整正文/研究、正式字体和 M4-U5 页面资格也未闭合。因此 M4-U4A 纯基础设施已完成，M4-U4B、部署与发布继续 fail closed。

### 首个纵切片编辑、Hero A 与英文字体候选（历史快照）

2026-08-30，Project owner 在经单独授权启动的本地 preview 中确认当前内容、byline/fact-check、模板排版与 CSS 无图 Collection Hero 可继续，并选择 Hero A、接受字体方案、要求保留字体替换空间，随后授权本地候选任务及停止 preview。

- preview 评审结束后已停止 PID `22316`；`127.0.0.1:4321` 不可达。该授权已消费，不形成后续可复用服务许可。
- Chinese Underworld Hero brief 已记录为 approved；OpenAI ImageGen 生成的 desktop 01/02 与 independently composed mobile 01 只保存在 Git-ignored `.local/visual-production/explore/chinese-underworld/hero-a-v1-review/`。desktop 01 已预筛退回；Project owner 于 2026-08-31 选中 desktop 02/mobile 01 进入生产准备。该选择不等于 publication rights、五类审核或资产批准；没有上传馆藏/历史参考图，也没有 master、production record、manifest、repository source、Collection 绑定或 approved/current 图片。
- 从官方 release 固定 Geist v1.7.2 Roman variable 与 Source Serif 4.005R Roman 400/600、Italic 400 共 4 份未修改 WOFF2；许可证、archive/file SHA-256、preload 角色与来源保存在 `src/assets/fonts/font-assets.json`。Source Serif 上游未发布 archive digest，因此 inventory 只标记本地计算值。
- 字体通过 `fonts.css` 的 `Mythic Display` / `Mythic Story` alias、`global.css` role token 与 `font-assets.ts` 的 `?no-inline` URL registry 接入。所有页只 preload display Roman，Entry 额外 preload story Roman 400；Semibold/Italic 按命中加载。页面与 verifier 不认识具体上游文件名；typography test 从 inventory 动态核对每个 path/role/alias/style/weight/preload 映射，因此替换只改资产、inventory、alias、registry 和经实测的 metrics，不改模板、组件或门禁代码。
- 未安装任何依赖。本机没有获准的 CJK 子集/cmap/RFN 改名工具，因此未下载或落库 Source Han 文件；Hans/Hant 字符表和跨平台 fallback 也未闭合。Source `titleZhLang` 与 `titleZh` 现成对受控；四条英文馆藏记录的中文标题 script 缺来源证据，明确保存为 generic `zh` 而不猜简繁，已知教育部词条为 `zh-Hant`。内容图会拒绝引用 generic `zh` 标题的 Entry 提升为 `ready | published | archived`。
- 本单元修改字体输出链但没有修改 visual master/manifest/repository source，因此未运行非默认 `visual:build:check`。固定 Node/Corepack 下完整 `pnpm run check` 已通过 Prettier、ESLint、19 个测试文件/160 项测试、Astro check（65 个文件，0 error、0 warning、0 hint）、7 页 review build 与输出 verifier；`dist/` 精确包含 14 个既有 Hero v2 图片、4 个按 inventory SHA-256 核验的 WOFF2、零 XML 与零客户端 JavaScript。
- 内容保持 `editorial-review`；Terminology 保持 `source-checked`；Guide `heroAssetId` 与 Collection `heroAssetId` 均为 `null`；真实 published inventory 仍为 0/0。

### 2026-08-31 生命周期与机器门禁加固

Project owner 授权更新权威文档并执行推荐的下一本地批次；范围只包含运行时可移植性、日期时序、正文可见性、review 输出远端子资源策略、匹配测试和非服务型本地验证，不包含依赖、资产/CJK 工具、服务/浏览器、Git、Vercel 或发布。

- 文档将 M4-U5 拆成 noindex 直达页候选预检与 M6 完整 published inventory 上的最终关闭；`published` 表示可进入 public artifact，不表示已部署。M6 还须由 Project owner 批准目标公开日期，不得用构建日、预览日或部署日代填。最终 U5 后才确认 origin 和接入 U4B。
- `scripts/verify-runtime.mjs` 不再比较本机 `execPath`，只接受 `>=24.16.0 <25`；`.node-version` 与本节的 Windows 绝对路径继续固定本机开发基线。架构测试阻断机器路径重新进入 package guard。
- Entry Schema、SEO builder 与 release artifact builder 分别阻断 `updatedAt < publishedAt`；内容图阻断只有注释、空 HTML 标签或图片的非 draft 正文。
- `scripts/review-output-policy.mjs` 允许显式 HTTP(S)、根相对或 fragment citation anchor，但在实体解码后复核 scheme/origin；页面/CSS 子资源必须为单斜杠根相对本地 URL。quote-aware tag 扫描、CSS comment 归一化与反斜杠 escape fail-closed 及独立负例共同阻断 `base`、iframe/object/embed、form、meta refresh、anchor ping、responsive preload、SVG/legacy 资源属性、远端/内联子资源与 `image-set()` 绕过；review output verifier 消费同一策略。
- 完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check（67 个文件，0 error、0 warning、0 hint）、7 页 review build 与输出 verifier。产物仍为 7 个 `noindex, nofollow` 页面、14 个 Hero v2 图片、4 个 WOFF2、零 XML 与零客户端 JavaScript。
- 本批不修改 visual master/manifest/repository source，因此未运行非默认 `visual:build:check`；没有启动服务/浏览器、安装依赖、执行 Git 写入、Vercel 操作、部署或发布。

### 2026-08-31 Chinese Underworld Collection Hero 生产闭环

Project owner 已确认个人且非组织管理账户、无未经授权的第三方输入、无雇主/客户/其他组织限制，并同意遵守适用的当前 OpenAI 条款后公开使用；同时批准建议的 `in-house-original` 权利记录、五项人工审核与四段公开文案。审核记录时间为 `2026-08-31T07:09:00Z`；该记录不主张排他性、当然可版权性或绝对不侵权。

- 使用 Codex 内置 OpenAI ImageGen 对已选 desktop 02/mobile 01 做高保真重建；没有上传馆藏、历史图像或其他第三方参考图。工具未暴露 model ID，production record 如实保持 `null`。
- ImageGen 原始输出随后仅以 Sharp `0.35.4` 做 centered `fit: cover`、Lanczos3 精确画布处理，没有非等比拉伸，也不宣称 ImageGen 原生输出即为目标画布。正式 master 为 desktop `3200×1800` PNG（SHA-256 `9fdb9771109da9ec0b10450fdd46e39e770fe7ac9e13a5e460ac0a3d652eb9f4`）与 mobile `1600×2000` PNG（SHA-256 `e80eac658d8f98fdd290f6278b1ffa3ff39b395b94b1d4f174c603b8c17581d7`）。
- 新增两份同画布 WebP repository source、`production-chinese-underworld-hero-primary-v1` 与 `asset-chinese-underworld-hero-primary-v1`；Collection 使用稳定 ID `asset-chinese-underworld-hero-primary` 解析自己的 approved/current Hero，不借用钟馗资产，内容状态保持 `editorial-review`。
- 图片 registry、精确 inventory 测试与 output verifier 同步覆盖 Collection art direction，并对其 alt、caption、credit、disclosure 建立独立精确 oracle。固定 Node/Corepack 下 `pnpm run visual:build:check` 通过九个 local master、五份 current responsive rendition 与 36 个实际生成/解码的 AVIF/WebP 目标；完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 文件零诊断、7 页/28 个 Hero 图片/4 个 WOFF2/零 XML/零客户端 JavaScript 输出门禁。
- 本批未安装或升级依赖，未启动服务或浏览器，未提升 Entry/Collection 状态，未执行 Git 写入、Vercel 操作、部署或发布。

### 2026-08-31 Chinese Underworld Guide Hero 生产闭环

Project owner 批准 desktop A2 与独立构图、定向修正后的 mobile 候选作为最终组合，并确认本 Guide 使用个人、合法控制、非组织管理且不受雇主/客户/组织限制的 OpenAI 账户；输入权利、适用工具/输出使用权与 Mythic China 公开使用权均已确认。Project owner 同时批准 `in-house-original`、`Mythic China project owner (private individual)`、五项人工审核和最终 alt/caption/credit/AI disclosure；审核记录时间为 `2026-08-31T11:58:30Z`。记录不主张排他性、当然可版权性、绝对不侵权或无关第三方权利已获清理。

- desktop A2 只把项目生成候选 A 作为 edit target，移除砚台状、毛笔状和工具架物件；mobile 初始生成只把 A2 作为视觉语言锚点，随后只把项目生成的 mobile draft 作为 edit target，把重复同心门洞收敛为三层克制的行政空间。没有向 ImageGen 上传馆藏、历史图像或未经授权的第三方参考图；工具未暴露 model ID 或 seed，production record 如实保持 `null`。
- 最终 raw output 为 desktop `1672×941` 与 mobile `1122×1402`。Sharp `0.35.4` 仅做 centered `fit: cover`、Lanczos3 等比归一化并编码同画布 WebP quality 90，没有非等比拉伸，也不宣称 ImageGen 原生输出即为目标画布。正式 lossless PNG master 为 desktop `3200×1800`（SHA-256 `d070ee61ce6a613c2903dbdbe53f2bb888f411c7d8433ecc82f5d4053c9a013b`）与 mobile `1600×2000`（SHA-256 `8180d0ee16f52501f2c4077e1cd039797c278dfb0429f736ebd6108663dbf48d`）。
- 新增两份 Guide 同画布 WebP repository source、`production-chinese-underworld-guide-hero-primary-v1` 与 `asset-chinese-underworld-guide-hero-primary-v1`；Guide Entry 使用 versionless `asset-chinese-underworld-guide-hero-primary` 解析自己的 approved/current Hero，不借用 Collection 或 Zhong Kui 资产，状态仍为 `editorial-review`。
- 图片 registry、精确 inventory 测试与 output verifier 同步覆盖 Guide art direction，并对其 alt、caption、credit、disclosure 建立独立精确 oracle。固定 Node/Corepack 下 `pnpm run visual:build:check` 通过 11 个 local master、七份 current responsive rendition 与 50 个实际生成/解码的 AVIF/WebP 目标；完整 `pnpm run check` 通过 Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。
- 本批未安装、升级或移除依赖，未启动服务或浏览器，未提升 Entry/Collection 状态，未执行 Git 写入、Vercel 操作、部署或发布。

### 2026-08-31 馆藏中文字段来源复核

Project owner 要求继续推进 M4 并把控进度；本批只沿已知 Source 标题 locale 阻塞做可审计的来源复核，不替代具名双语审校，也不进入 CJK 工具、浏览器预检、M4-U4B 或发布。

- 回到四条官方馆藏页复核可见中文字段：The Met object 30.76.293 的标题词为 `十王圖`，Cleveland object 1961.206 显示 `鍾馗元夜出遊圖`，The Met object 2008.636 的对象行包含 `清早期 竹雕鍾馗群鬼`，object 2002.208.2 的对象行包含 `任頤 鍾馗像 軸`。四份 Source 更新 `accessedAt` 与复核说明；仅把旧转录 `十王图` 纠正为馆方页面的 `十王圖`，其他标题只规范既有空格。
- 页面字形不作为本项目的 script-locale 审批。四份 Source 的 `titleZhLang` 均继续为 generic `zh`；两份 Terminology 继续为 `source-checked`，Entry/Collection 继续为 `editorial-review`。输出验证器同步锁定新转录与未核定 locale 的组合，未放宽内容图门禁。
- 固定 Node/Corepack 下完整 `pnpm run check` 通过：Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 文件零诊断、7 页 review build、42 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。
- 本批不修改 visual master、manifest、repository source 或字体文件，因此未重跑非默认 `visual:build:check`；没有安装、升级或移除依赖，没有启动服务/浏览器，没有改动状态或精确 locale，也没有执行 Vercel 操作、部署或发布。

### 2026-08-31 双语术语与馆藏标题 locale 批准

Project owner 回复“全部批准”，并明确以 `Project owner (user-confirmed)` bilingual reviewer 身份承担本轮审校。该批准只闭合首个纵切片的双语术语与四条已复核馆藏标题 locale，不授权内容状态提升、CJK 工具/依赖、服务/浏览器、M4-U5、M4-U4B、Vercel、部署或发布。

- `阴间 / yīnjiān` 保持 “the underworld”，拒绝把 “hell” 或 `Diyu` 当自动同义词；`钟馗 / Zhōng Kuí` 保持 “Zhong Kui”，以 “the demon queller” 作角色释义。两份 Terminology 均提升为 `bilingual-approved`。
- `十王圖`、`鍾馗元夜出遊圖`、`清早期竹雕鍾馗群鬼` 与 `任頤鍾馗像軸` 四份 Source 均从 generic `zh` 改为 `zh-Hant`，并在各自 notes 记录 reviewer 身份与批准日期。未来未审校 Source 仍须保留 generic `zh`，既有内容图 fail-closed 合同不放宽。
- 输出验证器同时锁定 Guide 的 `陰間`/`十王圖` 与 Zhong Kui 页三条馆藏标题均以 `lang="zh-Hant"` 渲染，避免只修改内容记录而遗漏页面语义。
- 固定 Node/Corepack 下完整 `pnpm run check` 通过：Prettier、ESLint、20 个测试文件/196 项测试、Astro check 67 文件零诊断、7 页 review build、42 个 Hero 图片、4 个 WOFF2、零 XML、零客户端 JavaScript 输出门禁。
- 本批没有修改 visual master、manifest、repository source 或字体文件，因此未重跑非默认 `visual:build:check`；没有安装、升级或移除依赖，没有启动服务/浏览器，没有提升 Entry/Collection 状态，也没有执行 Git 写入、Vercel 操作、部署或发布。

### 2026-09-01 CJK 字符集、子集工具与 cmap 门禁

Project owner 先后要求继续推进、批准并确认执行 CJK 字符集、子集工具与 cmap 门禁。本批只关闭正式字体浏览器判断前的静态生产链，不启动服务/浏览器，不进入 M4-U5/U4B，不提升内容状态，也不执行 Git 写入或发布。

- `cjk-character-sets.json` 冻结 6 个真实 Hans 内容字、22 个真实 Hant 内容字、DESIGN 样张的 47 个额外 Hans 验收字与 14 个共享中文标点；最终 SC required 为 65 个码位、TC required 为 36 个码位。`测`/`測` 是故意缺字的 fallback-only probe，不进入 `unicode-range` 或 cmap。两处 Markdown 简体词补上 `lang="zh-Hans"`，混合中英 Source 标题改为纯英文，独立 `titleZh: 陰間` / `zh-Hant` 保持不变。
- 从 Adobe Source Han Sans `2.005R` 固定 commit 下载 SC/TC 变量 TTF 到 Git-ignored `.local/font-production/source/`，锁定 SHA-256 `68f866…faa80` / `1a273a…51b19`；隔离环境固定 Python `3.13.13`、fontTools `4.63.0` 与 Brotli `1.2.0`。SC/TC 分别实例化 400/500/600、子集化、移除变量表、按 OFL RFN 把 primary names 改为 `Mythic Han Sans SC/TC` 系列并输出六份 WOFF2；许可证、版权、来源、步骤和摘要进入 LICENSE/FONTLOG。
- 两个独立临时目录各自完整生成六份产物，逐文件长度与 SHA-256 全等。SC 三份分别为 18,248 / 18,324 / 18,400 bytes，TC 三份为 9,392 / 9,516 / 9,524 bytes；每份 cmap 与对应 65/36 required 集精确相等，且没有变量表或 fallback-only probe。
- 既有传递包 `fontkitten@1.0.3` 以离线 store 提升为直接开发依赖；最终审查又按已授权的 CJK 工具/依赖范围增加 MIT `parse5@8.0.1`，安装保持 `--ignore-scripts`。默认 Node 门禁直接解析源码及 `dist` WOFF2，锁定 hash、内部 name、400/500/600、无变量轴、OFL 和只计真实 glyph 映射的 cmap；CSS `unicode-range` 必须与批准集合精确相等，所有 CJK 仍为 `on-demand` 且禁止 preload。输出验证器还复核生成器/requirements/字符集/LICENSE/FONTLOG 来源摘要和构建后六个 CJK face，再遍历 parse5 生成的真实 HTML5 树扫描可见文本/alt/title/aria-label，拒绝属性值内伪 `lang`、`data-lang`、隐式 `p`/`li` 闭合、table foster parenting、继承 `en` 或 generic `zh` 的 Han，并比较真实 7 页字符与批准 content set。
- 首轮定向字体测试通过 2 个文件/6 项测试；最终加固另补一项 `.notdef` cmap 负例。固定 Node/Corepack 下最终完整 `pnpm run check` 通过 Prettier、ESLint、21 个测试文件/201 项测试、Astro check 69 文件零诊断，以及默认 review build 的 7 页、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript 与生产来源/构建后 CSS/实际 HTML/lang/cmap 输出门禁。第一次聚合检查准确暴露架构直接依赖白名单仍缺 `fontkitten`，补齐精确名称/版本 oracle 后完整重跑通过；这不是产品运行失败。最终审查先修正属性边界、有效 glyph cmap、生成器保存路径与独立 build provenance/CSS oracle，随后又用隐式闭合负例证明 XML 式手写标签栈与浏览器语义不等价，故改由 parse5 遍历 HTML5 实际树并增加 `p`/`li`/table 负例；替换后完整检查再次通过。新版生成器在两个新目录的独立重建及正式六文件 inventory 逐字节一致。本批未改 visual master、manifest 或 repository source，因此没有重跑非默认 `visual:build:check`，其最近证据仍为 11 个 local master、七份 current responsive rendition 与 50 个实际输出。
- 本批没有启动服务或浏览器，没有执行 M4-U5 的真实字体命中、慢加载、200% 缩放或跨平台检查；没有提升 Entry/Collection 状态，没有执行 Git 写入、Vercel 操作、部署或发布。

### 2026-09-01 M4-U5 Windows/local 部分候选预检

Project owner 在确认下一步为 noindex M4-U5 候选预检后要求按计划继续。本次授权只覆盖本地 review preview、浏览器检查、直接暴露的共享样式缺陷修复、匹配测试和证据同步；不包含内容状态提升、依赖调整、Git 写入、public intent、Vercel、远端预览、部署或发布。

- 启动前 HEAD 为 `9434a76e015e69dfb7903547b79212504015dfba`，工作树干净；固定运行时为 Node `24.16.0`、Corepack `0.35.0`、pnpm `11.22.0`。固定入口执行 `pnpm run preview -- --host 127.0.0.1` 后返回 PID `26712`；进程实际监听 `[::1]:4321`，因此浏览器使用 `http://localhost:4321/`，未把拒绝连接的 `127.0.0.1` 冒充可用地址。
- 正式矩阵覆盖 `/`、`/collections/chinese-underworld/`、`/explore/chinese-underworld-guide/`、`/explore/zhong-kui/` 四条 noindex 直达页，以及 `390×844`、`768×900`、`1440×900` 三档视口。修复后 12/12 组合均为 `noindex, nofollow`，document/body 无横向溢出，Hero 图片均已加载且自然宽度非零，客户端脚本数为 0，`document.fonts.status` 为 `loaded`，独立交互目标最小边为 44px，活动动画为 0；浏览器 console 无 warning/error。
- 预检实际发现并修复四个同源 Collection Hero 布局问题：desktop copy 未固定到视觉网格首行；移动单列 `1fr` 受固有宽度撑开；移动 picture 继承 desktop `height: 100%` 造成横向裁切；768px 图片说明与描述文字相交。修复只改 `src/styles/global.css`，新增 `tests/site/responsive-layout.test.ts` 锁定 desktop 行、移动可收缩列/高度复位和中档说明宽度；失败先复现，修复后完整检查通过 22 个测试文件/204 项测试、Astro check 70 文件零诊断、7 页/42 个 Hero 图片/10 个 hash-locked WOFF2 和零客户端 JavaScript 输出门禁。
- 390px Collection 的 copy、figure、picture 与 image 最终同为 343px 宽且无横向滚动；1440px copy 与 figure 在首行形成 442.14px 的有效垂直叠层；768px description 与说明的水平相交宽度由 83.41px 降为 0。代表性截图人工巡检未再发现文字遮挡、破图或裁切阻塞。
- 正式页面已观察到 `Mythic Display`、`Mythic Story`、SC 400 与 TC 400 的真实命中；可见 `zh-Hans`/`zh-Hant` 节点分别计算为 `Mythic Han Sans SC/TC`，并保持 `font-synthesis: none`。当前真实页面没有自然覆盖 CJK 500/600、全部 hard/fallback probe 或每个要求字形，仓库也没有专用 noindex 字体样张，因此这部分不能判为完整字体通过。
- 原生 details 移动菜单的鼠标开合、四个 44px 菜单项和关闭状态均通过；skip link 的可见 2px focus 样式已有证据。当前浏览器控制面不能可靠分发 Tab 顺序或 Enter/Space 默认动作，也不能切换禁用 JavaScript、`prefers-reduced-motion`、字体/图片失败或网络节流；Ctrl+加号不会改变页面 zoom。零脚本静态输出、reduced-motion CSS 和当前无活动动画只能作为旁证，不能替代这些真实模式。
- 未验证项因此保留为：真实键盘全链、真实 200% 缩放、禁用 JavaScript 模式、启用 reduced motion、慢/阻断字体、图片失败、LCP/CLS、macOS/iOS/Android fallback、专用 400/500/600/hard/fallback 字体样张，以及 Project owner 页面级视觉批准。Windows/local 部分证据只支持继续补齐候选预检，不支持提升 `ready`、关闭候选预检或关闭完整 M4-U5。
- 完成浏览器检查后先重置临时 viewport 并关闭测试 tab，再通过固定 Node 执行 `astro preview stop`；PID `26712` 已停止，`netstat` 回查端口 4321 无监听进程。本批未修改内容、Schema、manifest、production record、字体/图片 inventory 或依赖，未执行 Git add/commit/push、Vercel 操作、部署或发布。

### 2026-09-01 review 索引候选架与功能页排版修正

Project owner 在随后单独授权启动的本地 preview 中确认总体页面观感，同时指出顶部 Explore、Collections 缺少可点击内容、About 首屏过空且部分字号偏大，并要求先修正这些问题。该授权只覆盖 review 投影窄例外、三个功能页、作用域 CSS、匹配测试、文档和既有本地 preview/browser 复核；不包含内容状态提升、依赖、Git 写入、public intent、远端预览、部署或发布。

- Explore/Collections 继续渲染真实 `0 published` 空状态；另增加明确标注 `Not published` 的 review-only 候选架。候选 helper 只从固定 Home Collection `chinese-underworld` 与其 `entryIds` 派生一个 Collection 和两个 Entry，保持 Guide、Zhong Kui 的策展顺序；无关 non-archived 记录不会自动进入，缺成员或任一候选已 published 时构建失败。纯 release/public 投影、Related Entries、Sitemap/RSS/JSON-LD 合同均未放宽。
- About 保留 `publisher` / `editorial` 锚点和 Scope、Editorial method、Images、The museum metaphor 四节，移除纯装饰编号并补充现有方法、来源边界、图片披露与阅读路径说明；没有新增文化事实、第五节、路由或 Schema。
- CSS 只作用于 `.index-*`、`.review-preview*`、`.honest-empty-state` 与 `.about-*`：功能页 H1 为 `clamp(2.5rem, 4vw, 3.5rem)`，二级功能标题最高 36px；About Hero 最大高度从 36rem 收到 28rem，desktop H1 放宽为 18ch 以保持两行。Home、Collection detail 与 Entry 的全局 H1/H2 和模板未改；此前四条 U5 直达页证据不因本批作用域 CSS 自动失效。
- 新增/扩展投影与响应式正反测试，输出 verifier 精确要求 Explore 两个 Entry 链接、Collections 一个 Collection 链接、候选类型不交叉、其他五页不出现 review index 标记，同时继续要求 release `editorial-index` 为空。固定 Node/Corepack 下完整 `pnpm run check` 通过 22 个测试文件/207 项测试、Astro 70 文件零诊断、7 页/42 个 Hero 图片/10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript 输出门禁。
- 浏览器复核覆盖 Explore、Collections、About × `390×844`、`768×900`、`1440×900` 共 9 个组合：document/body 均无横向溢出，字体 loaded，robots 为 `noindex, nofollow`，客户端脚本数为 0；候选链接最小高度 44px，且实际点击分别进入 Chinese Underworld Collection 与 Guide。功能页 H1 为 40px / 40px / 56px，H2 为 28px / 28px / 36px；1440px About H1 为两行，四节从首屏 521px 处开始。Project owner 随后结束本轮复看并授权停止服务；该动作只关闭本轮功能页反馈，不把内容提升为 `ready` 或关闭完整 M4-U5。
- 复核前已按 Project owner 明确要求启动新 preview；PID `20084` 曾监听 `[::1]:4321`，入口为 `http://localhost:4321/`。临时 viewport 已重置，代理测试 tab 已关闭；Project owner 随后明确授权停止服务，PID `20084` 已结束，`netstat` 回查端口 4321 无监听进程。该次服务授权已消费，不得推导为后续常驻或发布许可。
- 本批未修改 Entry/Collection 内容状态、文化 Source/Claim/Terminology、视觉 master/manifest/production record、字体/图片 inventory、依赖或锁文件，因此未重跑非默认 `visual:build:check`。未执行真实键盘/200%、禁用 JavaScript 模式、reduced motion、慢/阻断字体、图片失败、性能、跨平台 fallback、Git 写入、Vercel 操作、部署或发布。

### 2026-09-01 M4-U5A noindex 字体样张与可控验证入口

Project owner 明确要求先更新需求合同，再实现 M4-U5A noindex 字体样张、精确正反门禁和当前工具可控的浏览器场景。本单元只覆盖 review route、页面作用域样式、样张策略/测试、既有 review output verifier 与相邻 release/SEO 负向测试、权威文档和一次固定运行时 preview/browser；不包含内容、Source/Claim/Terminology/Hero/manifest/status、字体二进制/子集/RFN/FONTLOG、依赖、public/M4-U4B/M5/M6、Git 写入、Vercel、部署或发布。

- 写入前工作区干净，HEAD、`main` 与本地 `origin/main` 均为 `e2893d14d4960f71fe75bd240971aaa88656511c`（`update`）；reflog 显示本地 `origin/main` 已在本任务前由 Project owner 的 push 更新。该历史批次不在本任务中重复提交或改写；本单元未执行 fetch、branch/worktree、add、commit、push 或其他 Git 写操作。
- 新增 `/review/type-specimen/`，由页面自身显式拒绝非 `review` build intent；它只可直达，不进入主/移动导航或原 7 页链接。默认 review inventory 精确变为 8 个 HTML。样张固定 20 个 exact sample，覆盖 display 400、UI 560、pinyin 600、metadata 650、story 400/600、italic 400、body 400，以及 SC/TC 各 400/500/600 的 manifest-derived required corpus 和 fallback-only `测`/`測`。页面只用既有 token/stack，不写上游 family name，不输出图片或 JavaScript。
- `scripts/font-specimen-policy.mjs` 保存精确 8 页 inventory、原主/移动导航 oracle 与 20-sample 合同；正反测试覆盖缺失/多余/错误 route inventory、导航与等价 specimen 链接、required char、生产 pinyin `lang`、DESIGN 冻结混排行/inline Hans boundary、角色、字重、字形、实际 CSS family/weight/style/synthesis、fallback marker/boundary、robots head/bot override/hreflang/canonical/OG/Twitter/RSS/Atom/JS。既有 CJK 内容门禁继续只检查原 7 页的实际 HTML 字符集合，样张单独受新策略约束，避免 probe 扩大内容页字体合同。
- 固定 `D:\Program Files\nvm\v24.16.0\node.exe`、同目录 Corepack 与 pnpm 11.22.0 下，最终完整 `pnpm run check` 通过 Prettier、ESLint、23 个测试文件/271 项测试、Astro check 73 文件零诊断、8 页静态 build 与输出 verifier。产物为 8 个 `noindex, nofollow` 页面、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript；HTML5 产物树、实际应用 stylesheet/inline CSS、样张 DOM/标签关联合同另精确阻断 canonical、Open Graph、Twitter、RSS/Atom、hreflang/bot override、等价站内入口、条件/旁路样式与错误 CSS mapping。
- 固定 preview 命令返回 `http://localhost:4321` 与 PID `9628`，`netstat` 确认 `[::1]:4321` 由同一 PID 监听。审查加固前候选在 `1440×900`、`768×900`、`390×844` 三档均无横向溢出，20/20 sample 有可见布局框，10 个 face 为 loaded，0 script/0 image，robots 精确，当时声明的 role/weight/style/`lang`/fallback marker computed style 与合同一致；Guide 内容页 Hero 为完整 `1152×648`、无溢出、零脚本，控制台无 error/warning。最终实现随后改动 pinyin/mixed DOM 与显式 normal CSS，故该矩阵只保留为候选历史证据，最终三档须重新授权复跑。
- 在该 2026-09-01 单元收口时，最终审查加固样张的三档浏览器复跑尚未重新授权。in-app Browser 只提供 viewport/visibility 控制，没有网络拦截/节流、JavaScript disable、media emulation 或可靠 performance panel；其 Playwright/CDP 输入也未能可靠派发原生 Tab/Enter/Space 默认动作，Ctrl-plus 未形成真实 200% zoom。因此本历史单元不声称通过最终三档、真实键盘链、200% zoom、reduced motion、禁用 JavaScript、慢/阻断字体、图片失败、LCP/CLS、实际 fallback face 或 Windows/macOS/iOS/Android 跨平台 fallback；静态 cmap 只证明 probe 字符不在项目子集。后续最终三档结果见 2026-09-02 交接记录，Project owner 的样张/页面判断仍待取得。
- 浏览器 viewport 已重置、两个测试 tab 已关闭；固定 Node 停止 preview 后，PID `9628` 已退出且端口 4321 无监听。字体/图片资产链与依赖未改，所以不重跑非默认 `visual:build:check`；本单元没有启动其他服务、访问真实写接口、修改发布配置或执行 Git/Vercel/部署/发布动作。

### 2026-09-01 M4-U5A verifier fail-closed 加固

Project owner 在整体澄清后明确同意按审查结论修复。本批只加固既有字体样张策略、review output policy/verifier、匹配负例与证据；不改页面视觉、内容、字体或图片资产，不调整依赖/配置，不启动 preview/browser，不执行 Git 写入、Vercel、部署或发布。

- CSS selector list 改为感知引号、escape、圆括号和方括号的顶层分割，阻断 `:is()` 等功能伪类借内部逗号绕开 generated-content/font/visibility oracle；样张另拒绝 transform/clip/offscreen/zero-size 等隐藏手段、非渲染祖先、媒体依赖和脱离精确 grid 的 sample card。
- 共享语义壳改用 parse5 活跃 HTML5 树核对唯一英文根、body 直属 skip target/main 与 `details > summary + mobile nav` 关系，不再由源文本 `includes` 或注释中的 decoy 满足。HTML/CSS policy 返回每个根相对子资源，verifier 与真实 emitted URL inventory 精确闭合；`srcset`、poster、SVG image/feImage、inline/style-block CSS 与 stylesheet CSS `url()` 都在同一门禁内，空/未消费 `url()` 失败。`dist` 根及每个条目改用 `lstat`，symlink/junction 和未知类型一律失败。
- 负例先在旧实现上复现 8 项失败；实现后补充真实临时 junction、缺失 HTML/CSS 资源、SVG/视频资源、功能伪类、样本几何隐藏和 inactive/displaced 语义壳回归。首次完整门禁准确暴露 Astro 构建 CSS 把 `::before` 规范化为 `:before`，补入既有 realm 装饰的精确等价允许项后，构建后 verifier 单独通过。
- 固定 Node `24.16.0`、Corepack `0.35.0`、pnpm `11.22.0` 下该加固单元的完整 `pnpm run check` 通过 Prettier、ESLint、23 个测试文件/279 项测试、Astro check 73 文件零诊断、8 页静态 build 与 output verifier；产物继续为 8 个 `noindex, nofollow` 页面、42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。本批未改 visual/content/font assets，非默认 `visual:build:check` 不适用；截至该单元，最终三档、真实键盘/200%、偏好/故障、性能、实际 fallback face、跨平台与 Project owner 视觉判断仍未验证，后续三档结果见下一节。

### 2026-09-02 M4-U5 最终三档与人工验收交接

Project owner 单独授权最终 U5 浏览器与人工证据批次。本批只覆盖同一 source/worktree 的完整自动门禁、一次本地 noindex preview、最终三档/交互/字体/Hero 证据、直接缺陷修复、Project owner 判断面与权威文档；不包含内容状态提升、依赖、public/M4-U4B/M5/M6、Git 写入、Vercel、部署或发布。

- 执行前 HEAD 与 branch 仍为 `e2893d14d4960f71fe75bd240971aaa88656511c` / `main`；工作树承接尚未提交的 U5A 与 verifier 加固范围，没有新建分支、worktree 或副本。固定 Node `24.16.0`、Corepack `0.35.0`、pnpm `11.22.0` 再次执行完整 `pnpm run check`，通过 Prettier、ESLint、23 个测试文件/279 项测试、Astro check 73 文件零诊断、8 页/42 Hero/10 WOFF2/0 XML/0 JS build 与 output verifier。
- `pnpm run preview -- --host 127.0.0.1` 返回 `http://localhost:4321` 与 PID `31960`；`netstat` 确认 `[::1]:4321` 由同一 PID 监听。Codex In-app Browser 的三个独立标签实际为 `390×844`、`768×900`、`1440×900`；视口能力只作用于当前选中标签，初次跨标签尺寸校准产生的非匹配读数已识别并剔除，最终证据只保留请求尺寸与 `innerWidth/innerHeight` 一致的结果。
- 最终 review 8 页 × 三档共 24 个组合全部无横向溢出、破图、样张 computed-style 错配、card 重叠或 console warning/error；均保持唯一 `main#main-content` / H1、`noindex, nofollow`、零客户端脚本、`document.fonts.status=loaded`，390px 只显示原生 details 移动导航，768/1440px 只显示桌面导航。样张三档均为 20/20 sample、14 张非零 card、无隐藏或裁切；页面资产 inventory 实际观测 10 个 WOFF2、0 image/0 script。pinyin 为 `zh-Latn-pinyin` / Mythic Display 600，十个 inline CJK 片段为 `zh-Hans` / Mythic Han Sans SC 600，全部保持 `font-synthesis:none`；SC/TC 400/500/600 与 story/body/italic 也和声明一致。
- 四条 Hero 页 × 三档共 12 个组合均在 390px 选择独立 mobile composition、在 768/1440px 选择 desktop composition；图片全部 complete、natural size 非零、informative alt 与 caption 可见。Collection 的 copy 与 caption 三档交叉面积均为 0；没有发现需要修改页面、样式、内容、字体或图片资产的缺陷。
- 鼠标点击的移动菜单与样张 checklist 可正常开合，四个移动菜单项及 checklist 返回链接均为 44px，关闭后焦点留在 `summary`；skip、mobile summary 与 specimen summary 经 locator 聚焦时均显示现有 2px focus outline。当前 Browser 的 locator/CUA 输入仍不能触发原生 Tab/Enter/Space 默认动作，Ctrl-plus 前后 DPR、visual viewport scale 与 inner width 不变；页面求值作用域不暴露可靠 Performance API，也没有 JavaScript-disable、media emulation、网络/字体/图片阻断或跨平台能力。因此真实键盘全链、200% zoom、JavaScript-disabled、reduced motion、慢/阻断字体、图片失败、受控 LCP/CLS、实际 fallback face 与 macOS/iOS/Android fallback 继续保持“未验证”，不记成页面失败或通过。
- 浏览器截图接口在后台和显示状态、原标签及新标签上均未能取图；仓库不保存伪造或替代截图。三档标签曾作为 live Project owner 验收面保留；Project owner 检查字体样张、Home、Collection、Guide、Zhong Kui、Explore、Collections 与 About 后明确回复“这些页面通过”。该结论闭合当前 display/story/body、italic/weights、拼音/标点/混排、SC/TC 三字重、fallback probe 可见性、Hero 裁切与页面阅读观感的人工判断，不替代 765 行列出的未验证能力，不提升 `ready`，也不关闭候选预检或完整 M4-U5。
- 人工判断后，浏览器清理确认三个验收标签均已关闭并重置临时 viewport；固定 Node 执行 `node scripts/run-review-astro.mjs preview stop` 返回已停止 PID `31960`。随后 `Get-Process` 确认 PID 不存在，`netstat` 回查 4321 无监听；本次服务授权已消费，不形成后续可复用授权。
- 本批未改页面、内容、Source/Claim/Terminology、视觉 master/manifest/production record、字体/图片 inventory、依赖或配置，所以非默认 `visual:build:check` 不适用；截至本记录未执行 Git 写入、Vercel 操作、部署或发布。

### 2026-09-02 M4 范围重定界与项目总检

Project owner 要求在不降低打磨标准的前提下总检项目进度，并在没有产品级问题时按推荐方案收口。只读核查确认 M1 是冻结工程参考、M2/M3 已完成、005 本地化试点不阻塞英语 MVP，当前工作树自最终 U5 证据批次后没有新增代码变化；没有需要先修复的 M4 产品缺陷。

- M4 以本地页面、published-only 投影、U4A public/SEO 纯基础设施、首个纵切片、U5A、最终三档基础矩阵与当前 8 页人工视觉判断关闭。上节未验证的真实键盘、200%、偏好/故障、本地性能、实际 fallback 与支持平台没有变成“通过”，而是移交 M6 release-candidate gate；生产与 live/RUM 验证归 M7。
- 原计划 M4-U4B 迁为 M6 public artifact assembly。正确顺序为：M5 外部交互 → M6 完整内容与 Project owner `published` 决定 → 真实 origin/public artifact assembly 实现 → Project owner 单独授权 clean commit → 从该 revision 重新构建、运行 output verifier 与 release-candidate QA → clean-source receipt → 受保护预览 → M7 生产与发布后基线。dirty source 上的结果只能是 nondeployable 诊断，提交后不得复用。
- `ready` 只表达内容、证据、术语、关系、批准资产与内容无障碍文案完备，不消费真实浏览器/平台 QA。`font-assets.json: browser-review-pending` 表示发布 QA 待完成，不表示 M4 本地实现未完成。
- 本次只修改权威文档，不新增命令，不运行 test/build/service，不改变内容状态、依赖、配置、资产或代码，也不执行 Git、Vercel、部署或发布写操作。
- 固定 Node/Corepack 的 `pnpm run format:check` 通过；22 份 Markdown 的严格 UTF-8 与相对链接检查通过，原模板占位符检查无输出，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。

### 2026-09-02 M5-U1 外部交互推荐合同

Project owner 在提交 M4 后授权按原路线进入下一阶段。执行前只读复核确认 HEAD 与本地 `main` 为 `3983bee91ada4a286613ec702a8009a4f528af3f`，工作树、暂存区和未跟踪文件均为空；未 fetch 的本地 `origin/main` 仍为 `e2893d1`，因此本地只显示 ahead 1，不能据此判断服务器端状态。

- 本单元只修改文档：新增 [M5 外部交互详细需求](docs/requirements/006-external-interactions.md)，并同步 README、PROJECT_RULES、PRODUCT、ARCHITECTURE、CONTENT_MODEL、001、003 与本文件中的 M4 clean baseline、Submission/Record、output allowlist、阶段顺序和指标责任；不修改业务代码、依赖、配置、运行入口或输出策略。
- 当前推荐为 Buttondown 原生 newsletter POST；Tally 因跨同一 workspace 的持久 Respondent ID 降为有条件 Reader Request 候选；Plausible Hosted 是付费且带 URL/referrer/日级访客哈希与三年 dashboard 保留的最小分析候选。RUM/p75 明确延后 M7。上述选择仍待 Project owner 确认，不代表已创建账户、接受 DPA、购买计划或启用服务。
- 当前没有新增真实命令。供应商账户、计划、域名、DPA、数据地区、公开隐私联系邮箱和 newsletter 频率未确认前，不创建可提交占位表单、不写生产 action/token、不安装 SDK，也不运行供应商联调。
- 真实表单、邮件与 analytics 仍无可执行入口；自动测试在 M5-U2 建立后也只能使用 Fake/Mock，并必须让任何意外网络访问失败。
- 当前固定 Node/Corepack 的 `pnpm run format:check` 通过；新增 006 后共 23 份 Markdown，严格 UTF-8、相对链接和原模板占位符检查通过，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。

### 2026-09-02 M5-U2 纯合同与 Mock

Project owner 要求先评估改动量，范围大时才新开同目录会话，并确认按 provider-neutral 方案继续 M5-U2。只读评估确认本单元只涉及三个纯 service 模块、一份集中单测、一个既有架构 inventory 断言与状态文档，不需要新会话、worktree、依赖、配置、页面或运行服务。

- `src/services/newsletter.ts` 只接受读者 email；Buttondown 的 `embed="1"`、action 与账户后置 transport mapping。`reader-request.ts` 分开严格 Submission 与初始 provider-neutral Record，注入 published Entry ID allowlist，固定 trim 后 3–240 Unicode code point、email 254 字符/consent 配对，并拒绝浏览器伪造 provider 字段或 Tally Respondent ID。`analytics.ts` 只允许三个无 properties 事件，将当前站点 HTTPS URL 清洗为 origin + pathname 并清空 referrer；Plausible adapter/脚本和 reading state 均未提前实现。
- 三类 Fake 只返回 accepted/recorded、validation-error、unavailable、rate-limited 或 timeout/unknown-result，不存储输入、不自动重试，也不包含真实 transport。集中测试用 fetch trap 证明零网络，并验证序列化失败结果不回显 email、建议或 query/token。
- 定向命令使用受运行时守卫保护的 `pnpm run test tests/services/external-interactions.test.ts tests/architecture/project-boundaries.test.ts`，通过 2 个文件/26 项测试。旧的 `pnpm exec vitest` 示例在当前 Windows/Corepack 布局未解析到可执行名，故本文件将定向入口统一改为 package script；一次带额外 `--` 的尝试实际执行了全套 Vitest，不作为定向数字。
- 最终固定 Node/Corepack 的完整 `pnpm run check` 通过 Prettier、ESLint、24 个测试文件/301 项测试、Astro check 77 文件零诊断、8 页 review build 与既有 output verifier；产物仍为 42 个 Hero 图片、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。23 份 Markdown 的严格 UTF-8、相对链接、原模板占位符与 `git diff --check` 通过。
- U2 执行期间只读回查发现本地 `origin/main` tracking ref 于 2026-09-02 14:04:40 +0800 由外部 push 从 `e2893d1` 更新到 `3983bee`，因此当前 HEAD、`main` 与 tracking ref 对齐；代理没有执行 fetch、add、commit、push、amend、分支或 worktree，也没有把该外部变化当作本批提交。
- 本单元未修改页面、内容、Source/Claim/Terminology、视觉资产、字体、依赖、lockfile、Astro/运行配置或 output allowlist；未启动 dev/preview、创建账户、接受 DPA、访问真实供应商、写入数据、执行 Git 写操作、操作 Vercel、部署或发布。截至 U2 收口时，M5-U3 仍以公开隐私邮箱、页面文案和 supplier transport 决定为进入条件；后续决定和结果见下一节。

### 2026-09-02 M5-U3 页面入口与隐私

Project owner 指定 `Mythic China` 为站点品牌、`hyc` 为公开数据控制者标签、China（`CN`）为所在地区，并同意公开 `huyichen2019@gmail.com`。隐私权利通信在请求关闭 60 天后从活动邮箱与 Trash 删除，法律要求继续保留的情况除外；该期限不是 Google 底层/备份硬删除 SLA。Newsletter 只发送新文章与偶尔的编辑精选、每月不超过两次，使用 double opt-in 并每封可退订。Reader Request 使用独立 email consent，不得自动订阅。

- Buttondown/Tally 被条件接受为 U4 transport 方向，但本单元不创建账户、action/link 或真实记录；Buttondown open/click tracking 从首次发送前并在之后保持关闭。Tally 规则为 `hyc` 每 28 天删除所有年龄不少于 60 天的提交并同次 Empty Trash，按时执行时约为 60–88 天；唯一负责人、无独立备份与漏执行风险已由 Project owner 接受。Plausible 留 U5，当前不接脚本、hook、事件或远端请求。
- 新增 `src/components/NewsletterForm.astro`、`ReaderRequest.astro`、`src/pages/privacy.astro` 与 `tests/site/external-interactions-ui.test.ts`；修改 Footer、Entry template、全局 CSS、review page inventory、HTML5 output policy/verifier 和匹配 site tests。原生 disabled 控件有意不进入焦点顺序；可用的本地 Privacy link 继承全站可见 focus，页面没有 form、name/value、action、provider link、script 或 success 假状态。
- output oracle 逐页要求 Footer 内恰有一个 Newsletter，只允许两个 Entry 在 Sources 与 Collection/Related reading paths 后各有一个匹配稳定 page ID 的 Reader Request，并拒绝未知 interaction marker、额外字段/控件、Buttondown/Tally/Plausible provider link、大小写假成功、不完整 Privacy、`mailto:` 与根外 Privacy notice。`/privacy/` 仍是 noindex review route，不进入 public SEO、Sitemap 或 RSS。
- 固定 Node/Corepack 的定向入口通过 3 个文件/79 项测试；最终完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/320 项测试、Astro 81 文件零诊断、9 页 build/output verifier，以及 42 Hero、10 WOFF2、零 XML 与零客户端 JavaScript 门禁。
- 本单元不改内容、Source/Claim/Terminology、视觉资产、字体、内容状态、依赖、lockfile、配置或 public SEO/artifact 代码；未启动 dev/preview/browser、创建外部账户、接受账户级条款、提交表单、发送邮件、写分析、执行 Git 写操作、操作 Vercel、部署或发布。

### 2026-09-03 M5-U4 账户准备现场同步

Project owner 提供了在本任务前完成的 Buttondown/Tally 账户准备现场事实；详细且唯一的账户/草稿记录见 [`006-external-interactions.md`](docs/requirements/006-external-interactions.md#124-2026-09-03-账户准备与未发布草稿现场同步)。Buttondown `mythic-china` 仍在人工审核，没有导入订阅者、发送邮件或连接站点；Tally 使用 Free 计划，Reader Request 草稿仍未发布且没有 submission。该草稿的字段、条件 consent、CTA 与 thank-you page 与 provider-neutral 合同表面一致，但尚未通过发布后行为、导出或删除验证。

本次仅同步文档，没有记录 Tally edit link、Buttondown action、token、凭据或恢复码；没有发布草稿、提交测试/真实数据、启用通知/集成、修改账户、启动服务、执行 Git 写操作、部署或发布。U4 只完成账户准备快照，仍须等待 Buttondown 审核结果，以及对 Tally 发布、精确 action/link、合成数据写入、停止、回查和删除的独立授权。

- 匹配验证：固定 Node/Corepack 的 `pnpm run format:check` 通过；新增 007 后共 24 份 Markdown，严格 UTF-8、相对链接和原模板占位符检查通过，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。本次只修改文档，未改业务代码、内容对象、资产或 output policy，因此未重复运行 test/build。

### 2026-09-03 第二 Collection 确认与四篇 claim map/来源研究

Project owner 明确确认 [`007-second-collection-decision.md`](docs/requirements/007-second-collection-decision.md) 的推荐，并授权下一批只做 Ten Kings、Liaozhai 导读、Painted Skin 与《促织》的 claim map 和来源研究。执行前只读复核确认 HEAD、本地 `main` 与本地 `origin/main` tracking ref 均为 `3fa46d5f85c43a5278e15ca6b0630d724439acc9`，工作树、暂存区和未跟踪文件均为空；未执行 fetch，因此 tracking ref 不单独证明服务器端状态。

- 本批新增 [`008-four-entry-claim-maps.md`](docs/requirements/008-four-entry-claim-maps.md)，并同步 007、001、PRODUCT、REFERENCES、README 与本文件；只记录方向确认、候选主张、原典/馆藏/专业研究角色、locator 路径、术语/译文风险、权利边界和停止条件。正式书目、底本与部分精确 locator 仍未闭合。
- Ten Kings 已证明可围绕日期、卷宗、预修/追荐及图文媒介形成独立问题，但 S.3961、CBETA X0021 与专业研究底本的对应、精确图像 locator 和图片权利仍未闭合。Liaozhai 导读与 Painted Skin 的来源链有条件可行，仍须冻结实际校勘本、页/叶和自译策略。
- 《促织》继续保留但版本硬门禁未通过：当前只可归因记录专项研究所报告的见证差异，不能把具体馆藏异文写成本站已直接确认，也不能写谁首次创造或增补魂化结尾。只有逐字核验青柯亭具体页叶后，才可在其余版本材料仍不可得时另行决定只按该见证叙事；若该页叶也未核验，则继续阻塞或另行授权切换聂小倩。
- 本批没有新增或修改 `src/content`、Schema、页面、业务代码、测试、output policy、资产、依赖、lockfile 或配置；没有写正文/译文、启动本地 dev/preview、执行站点浏览器测试、提交外部数据、执行 Git 写操作、操作 Vercel、部署或发布。没有新增执行命令。
- 匹配验证：固定 Node/Corepack 的 `pnpm run format:check` 通过；新增 008 后共 25 份 Markdown，严格 UTF-8、相对链接和原模板占位符检查通过，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。外部来源角色、关键 URL 与权利边界已只读复核；CText 的抓取限制不被误记为失效链接。由于本批只修改文档且未改业务代码、内容对象、资产或 output policy，未运行 test/build。

### 2026-09-04 四篇底本、正式书目与 locator 证据闭合

Project owner 在 2026-09-03 的 claim map/来源研究之后，单独授权下一批仍只处理 Ten Kings、Liaozhai 导读、Painted Skin 与《促织》的实际见证/版次、正式书目和页/叶/canvas locator。当前批次修改 [`008-four-entry-claim-maps.md`](docs/requirements/008-four-entry-claim-maps.md)、[`REFERENCES.md`](docs/REFERENCES.md)、007、001、PRODUCT、README 与本文件；不进入 Source/Claim/Terminology、Collection/Entry、正文、翻译、图片、状态、Schema、业务代码、测试或运行配置。

- Ten Kings 已固定 British Library / IDP `Or.8210/S.3961`、37 个 IIIF canvas 与核心 `items/7–15`，并将 CBETA `X01n0021_001` 固定为另一文本见证、locator `[0408b13–0409c22]`；Teiser 1994、Kwon 2019、Wang 2023/2024、Schmid 2008 与 Met/British Museum 对象补成正式书目和限域权利记录。目录起页不冒充二手论断逐页核验，S.3961 与 CBETA 不互作转录，IDP/BM 图片未获本批复用批准。
- Liaozhai 导读已补 Luo 2009 可核页码、Barr 1983 正式学位论文记录、辽宁稿本 2019 影印候选，以及任笃行 2016 / 张友鹤 2011 两个现代校勘本候选；推荐任 2016 为主、张 2011 对校，但 Project owner 尚未确认且实际册页未取得，所以主底本与全站篇数口径仍未冻结。
- Painted Skin 已固定 CText 北大—CADAL 数字见证卷一文件 `46700`、数字图像 160–165、文本锚点 `#p171–#p174`（`#p175` 为下一篇边界），Giles 1880 vol. I pp.76–84 与 Tso 2017 pp.15–18；历史版次/原叶、`孽鬼/孽魅` 异文来源、现代译本独立核页与电影一手时间码仍未闭合。
- 《促织》已直接核验上海图书馆 `線普長266652-67` 青柯亭见证卷七、Commons 数字页 427–432 与可见叶码四至九；关键 `後歲餘…身化促織` 和 `異史氏曰` 在数字页 431，不是 430。每张图跨两个书页且右侧版心裁切，故不补造 a/b。Project owner 可另行选择只按这一见证叙事；辽宁手稿、现代校记和早期抄本未得，跨见证与“谁首次增写”仍阻塞。
- 本批没有新增或修改 `src/content`、Schema、页面、业务代码、测试、output policy、资产、依赖、lockfile 或配置；没有启动 dev/preview、提交外部数据、执行 Git 写操作、操作 Vercel、部署或发布。
- 匹配验证：固定 Node 24.16.0 / Corepack 的 `pnpm run format:check` 通过；25 份 Markdown 的严格 UTF-8、相对链接与原模板占位符检查通过，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。由于本批只修改文档且未改业务代码、内容对象、资产或 output policy，未运行 test/build。

### 2026-09-04 Buttondown 审核状态同步

Project owner 确认 Buttondown `mythic-china` 账户审核已通过，并明确授权只把该事实同步到项目文档。本批更新 M5 详细需求、README、PRODUCT、ARCHITECTURE、001、003、REFERENCES 与本文件；不登录 Buttondown、不查看或修改账户后台、不配置 action/条款/tracking、不联调、不提交订阅或其他数据，也不执行 Git 写操作。

- 该用户提供的现场事实只关闭“等待 Buttondown 审核结果”门槛，不证明账户级 DPA/设置、真实 action、double opt-in、open/click tracking、删除/导出或供应商行为已经核验。
- 站点与仓库继续没有 Buttondown action/link、provider mapping、凭据、subscriber、邮件或真实 transport；Tally Free 草稿继续未发布，M5-U4 仍未完成。
- 下一外部交互停点须另行授权：Buttondown 账户级配置与真实 action 的只读核查、合成订阅写入/回查/清理，以及 Tally 发布、hosted link、合成数据写入、回查和删除。当前授权不包含这些动作。
- 匹配验证：固定 Node 24.16.0 / Corepack 的 `pnpm run format:check` 通过；25 份 Markdown 的严格 UTF-8、相对链接与原模板占位符检查通过，`git diff --check` 无 whitespace error（仅现有 Windows LF→CRLF 提示）。本批未改业务代码、内容对象、资产或 output policy，因此未运行 test/build。

### 2026-09-04 四篇证据最小物化

Project owner 先确认 Liaozhai 采用任笃行 2016 主、张友鹤 2011 对校的工作路线及《促织》青柯亭单见证路线；随后授权为 Claim / Terminology 建立四个最小 draft Entry owner，并最终明确授权只物化证据已闭合的 Source、Claim 与 Terminology。本批不写正文、不处理图片、不改状态/Collection 关系、不接外部服务、不启动服务，也不执行 Git 写操作。

- 新增 `ten-kings`、`liaozhai-reading-guide`、`painted-skin`、`fighting-cricket` 四个空 `draft` Entry；正文、反向证据数组、Collection/related 关系、日期与视觉字段均为空。
- 新增 5 份 Source、9 份 verified Claim 与 3 份 `source-checked` Terminology；该批结束时的总 inventory 为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published 仍为 0/0。
- Source Schema 新增必填 `usesDigitalImageEvidence`；值为 `true` 时 `rightsStatus` 与 `rightsUrl` 同时必填。9 份既有 Source 已按当前 Claim/Terminology locator 是否依赖数字页图、IIIF canvas 或对象图像显式迁移；`false` 不等于网页无图，权利对也不授予 Asset 复用。
- 明确排除 CText/Giles Painted Skin Source、`孽鬼` Terminology、尚无实际册页的任/张 Source，以及《促织》跨见证、作者归属、FC-08–FC-10、“首次增写”与起源 Claim。
- 四个 draft 经既有动态路由增加四个 direct-only noindex review 页面；页面模板未改。`font-specimen-policy.mjs` 与 `verify-m4-u2-output.mjs` 当时把精确清单扩为 13 HTML，六个 Entry 各保留一个 inactive Reader Request；Hero 仍为 42、WOFF2 仍为 10、XML 与客户端 JavaScript 仍为 0。Explore/Collections 固定候选架不变。
- 匹配验证：定向 3 个文件/35 项测试通过；最终完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 build 与 output verifier。实际输出为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript；13 页各一个 inactive Newsletter，六个 Entry 各一个匹配稳定 ID 的 inactive Reader Request。29 份 Markdown 的严格 UTF-8、相对链接与原模板占位符检查通过，授权范围文本无尾随空白，`git diff --check` 无 whitespace error（仅 Windows LF→CRLF 提示）。

本批未运行 dev/preview/browser 或非默认 `visual:build:check`；未修改图片、manifest 或 master。四个新增页面没有真实浏览器、键盘或缩放证据，完整工程通过不替代这些后续人工门禁。

### 2026-09-04 证据检查点与 Ten Kings 单篇内容纵切片

Project owner 接受“先提交当前证据批，再完成一篇纵切片”的建议。执行前只读复核确认此前工作树恰为四个已授权批次的 48 条路径；固定运行时完整 `pnpm run check`、暂存 diff 范围与 `git diff --cached --check` 通过后，证据批已提交为本地 `9914dd304467118b2c32f7f8ac192cc00344fb92`（`feat: materialize four-entry evidence checkpoint`）。该提交没有 fetch 或 push；提交后 `main` 相对本地 `origin/main` tracking ref 显示 ahead 1。

- 后续只修改 `src/content/entries/ten-kings.md` 与直接负责当前内容状态的权威/领域文档。Ten Kings 标题收窄为 `The Ten Kings: Dates, Records, and Judgment`，只绑定 2 Source / 3 verified Claim / 1 `source-checked` Terminology，形成两段 opening、110 词摘要和四节正文；`lastFactCheckedAt` 为 `2026-09-04`，状态保持 `draft`。
- 文本把 S.3961 对象/数字序列与 CBETA 时间节点/记录机制分别限定，不声称 earliest、普遍日程、超自然实在、历史使用、现实行政制度逐项复制、形成史、跨见证重建或 rebirth。
- 初次完整检查正确拦截英语语言上下文中的中文及当前 hash-locked `zh-Hans` 内容字符集未覆盖的 `十王`。本批未扩展字符集、字体文件、manifest 或字体哈希；可见文本保持英语，`nameZh` / `pinyin` 保持空值，中文形式与拼音留在现有 `source-checked` Terminology 等待双语审核。
- 修正后完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批没有修改 Schema、测试、图片、Collection/`relatedEntryIds`、状态、外部服务或配置，没有启动服务、提交外部数据、fetch/push、建立 public artifact、部署或发布。Project owner 通过 Ten Kings 首稿并授权本地提交后，该纵切片与相关状态文档已进入当前 HEAD；提交后工作树与暂存区应保持为空。

### 2026-09-04 Fighting Cricket 单见证内容纵切片

Project owner 授权只为 `fighting-cricket` 编写证据受限英语首稿并同步必要状态：只消费既有 1 Source / 3 verified Claim / 1 `source-checked` Terminology，保持 `draft`；不新增证据对象、不处理图片、不建 Collection/`relatedEntryIds`、不改状态、不接外部服务，也不执行 Git 写操作。验证发现既有 Source 的可见馆藏号会把中文字符带入英语页面后，Project owner 另行授权最小例外：只把该 Source 的可见记录值改为 ASCII，并在内部 notes 原样保留精确中文馆藏号。

- `fighting-cricket` 精确绑定现有 1 Source / 3 Claim / 1 Terminology，形成两段 opening、104 词摘要和四节正文；`lastFactCheckedAt` 为 `2026-09-04`，状态保持 `draft`。
- 文本只陈述青柯亭 1766 单一见证中贡促织压力向下传递、儿子误毙促织后坠井并被救起时尚有呼吸且随后痴弱思睡、以及一年有余后自述曾化作促织并苏醒；不概括历史税制，不宣称死亡复活、灵魂教义、跨见证版本史或作者归属。
- 初次完整检查先因 YAML plain scalar 中的冒号失败，改为既有合同允许的 folded scalar；随后 output verifier 正确拦截 Source 可见 `線` 字。获授权后，`editionBasisOrObjectId` 改用 `Shanghai Library record 266652-67`，精确馆藏号 `線普長266652-67` 仍保存在 Source notes；未改 Schema、模板、字体、manifest 或字体哈希。
- 修正后的完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 首稿实施与验证阶段没有新增或修改 Claim、Terminology、图片、Collection/`relatedEntryIds`、内容状态、外部服务或配置，没有启动服务、提交外部数据、建立 public artifact、部署或发布；未运行 dev/preview/browser 或非默认 `visual:build:check`。Project owner 随后通过中文概要确认内容符合预期并单独授权本地提交；该检查点不扩大内容范围，未 fetch 或 push。

### 2026-09-04 Liaozhai Reading Guide 证据受限内容纵切片

Project owner 授权只为 `liaozhai-reading-guide` 编写证据受限英语首稿并同步必要状态：只消费既有 1 Source / 2 verified Claim / 1 `source-checked` Terminology，保持 `draft`；不新增或修改证据对象，不把任笃行 2016、张友鹤 2011 写成已核来源，不处理图片、不建 Collection/`relatedEntryIds`、不改状态、不扩 CJK 字体、不接外部服务，也不执行 Git 写操作。

- `sourceIds` 只含 `source-luo-ghost-of-liaozhai-2009`；`claimIds` 只含 Luo 的编纂期判断与版次相关计数两条；`terminologyRecordIds` 只含 `term-zhiguai-in-liaozhai-reading-guide`。
- Entry 形成两段 opening、96 词 summary 与 “Begin with a range, not a finish date”“Ask what the number counts”“Keep zhiguai bounded”“What this draft does not settle” 四节英语正文；`lastFactCheckedAt` 为 `2026-09-04`，`status` 保持 `draft`。
- 正文把约 1670–1700 的编纂范围、1679 序言的证据意义及 431/491 两个计数全部归因给 Luo，不把 1679 写成全书完成日，也不把不同 arrangement、`juan` 与 item 的数量合并为唯一篇数。
- 可见正文只使用 ASCII `Liaozhai`、`Qingketing`、`juan` 与 `zhiguai`；`志怪` 和带声调拼音只保留在既有 `source-checked` Terminology 中，未扩字符集、字体文件、manifest 或字体哈希。
- 任 2016 / 张 2011 的实际册页与篇级 locator 仍未取得，两书仍未进入 Source；正文不宣称终本、完整手稿/刻本传播史、单篇年代、唯一计数或英译比较。
- 固定 Node/Corepack 的完整 `pnpm run check` 第一次在任何断言失败前因 Vitest worker 意外退出而中断；没有修改文件、改变并发配置或降低门禁，原命令重跑后通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier。输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批没有新增或修改 Source、Claim、Terminology、Schema、测试、图片、Collection/`relatedEntryIds`、状态、外部服务或配置，没有启动 dev/preview/browser、提交外部数据、建立 public artifact、部署或发布；未运行非默认 `visual:build:check`。
- Project owner 于 2026-09-05 通过中文概要确认内容符合预期，并单独授权验证通过后本地提交；该后续授权只覆盖本纵切片与必要状态同步，不包含 fetch、push 或范围扩大。

### 2026-09-05 Painted Skin 写作前证据与版本状态复核

- Project owner 授权只复核 Painted Skin 的 CText 北大—CADAL 数字见证、Giles 1880、`孽鬼/孽魅`、候选译法和 PS-01–PS-10，并同步 owner 已 push `119c01c` 的用户确认事实。只修改 README、本文件、REFERENCES 与 008；不修改正文、内容对象、内容状态、资产、关系、代码、配置或服务。
- 进入时仓库根为 `F:\codex-project\mythic-china`，分支为 `main`，工作树、暂存区与未跟踪文件为空。本地 HEAD、`main`、`origin/main` 均为 `119c01c2937e4598e66c0e5886ddc917e78af143`。通过 [GitHub branches/main API](https://api.github.com/repos/Clementine1995/mythic-china/branches/main) 无凭据 GET 独立取得服务器 `main` 的同一 SHA；这证明查询时的分支值，与 owner 的 push 确认分别记录，不由 tracking ref 推导推送者或时间。未执行 fetch、add、commit、push 或其他 Git 写入。
- CText FAQ 与 CADAL 官方公告已按用途分层；IA 同源 PDF 第 160–165 页已视觉核字，CText 原站页图本次要求登录，未登录或绕过。Tso 出版社 PDF 的 print pp.16、18 已视觉核对：引字差别可证，具名中文底本未闭合。Giles 本批复核 PG 全篇转录、版次与许可，保留此前印刷页 locator，不把历史扫描核验改记为本批逐页核图。
- 结果是研究边界更精确，整篇写作仍未就绪；PS-07 的既有 Tso 归因 Claim 是目前唯一已物化可供后续限域写作的子集，不能替代原篇情节。完整结论、引用入口与下一最小证据批建议见 [008 第 5.5–5.8 节](docs/requirements/008-four-entry-claim-maps.md#55-2026-09-05-权利与引用复核)。没有业务代码改动，业务代码配套的资产披露、构建期诊断与职责注释不适用；匹配验证采用本文件“文档验证”与固定运行时 `format:check`，不重跑 test/build 或生产资产验证。
- 研究 PDF 与供核字的临时渲染只在系统临时目录使用，不进入仓库或成为站点图片/public artifact；未安装依赖、启动服务、接入外部服务、提交数据、部署或发布。公开网页阅读与 GitHub GET 均为只读查询。
- 匹配验证：固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的 `format:check` 通过；该脚本按现有 `.prettierignore` 排除 Markdown，不将其结果当作文档排版验证。另对全部 29 份 Markdown 执行严格 UTF-8、相对链接与原模板占位符检查，均通过；新章节交叉引用与 PS-01–PS-10 清单人工核对通过，`git diff --check` 无空白错误，仅有既有 Windows LF→CRLF 提示。工作树只含四份授权文档修改，暂存区为空；未重跑业务测试、build、浏览器页面 QA 或发布门禁。

### 2026-09-05 Painted Skin 指定现代版本检索续批

- Project owner 授权继续取得任 2016 / 张 2011 的实际册页证据。本批沿用四份未暂存文档，只补 008 第 5.9 节、REFERENCES 发现入口与 README 状态；实际正文、版权页和校记未取得，写作门禁保持。任版 p.174 只是目录线索，张版篇级页码仍空缺；没有替换已确认版本路线。
- 只读检查书目和电子书详情；得到详情可读，浏览器访问超时，不能判断试读覆盖范围。未购买、登录或联系机构，未修改内容、资产、配置或服务，未执行 Git 写入、远端同步或发布。没有业务代码改动，资产披露、构建诊断与职责注释不适用；本批采用严格 UTF-8、相对链接、占位符及 diff 空白/范围验证。

- 验证通过：29 份 Markdown 严格 UTF-8、85 个相对链接、模板占位符和 `git diff --check`；只有四份授权文档有未暂存修改，暂存区与未跟踪文件为空。未重跑业务测试、构建或页面 QA；本批没有取得书页，不能登记逐页视觉核验通过。

### 2026-09-05 三篇既有首稿编辑修订

- Project owner 授权按计划继续，本批先完成十王、促织、聊斋导读的 AI 编辑与既有证据一致性复核；只改三篇 Entry 的 opening、summary、正文及十王 subtitle，同步 README/008/本文件。原有 Painted Skin 文档差异保留；不新增事实来源，不修改证据关系、术语状态、事实核查日期、图片或内容状态。具体读者修订与人工待核点见 008 第 14 节。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的完整 `check` 一次通过：Prettier、ESLint、25 文件/321 测试、Astro 81 文件零诊断、13 页 noindex review build 与 output verifier，42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。三篇 summary 为 95/101/96 词，frontmatter 对比确认其余元数据未变。
- 没有业务代码或资产改动，新资产披露、构建诊断实现及职责注释不适用；既有内容引用链、语言字符与输出门禁通过。人工双语批准、目标读者和真实浏览器/键盘/缩放验收尚未执行。未安装依赖、启动服务、接入真实外部服务、写 Git、推送或发布。

### 2026-09-05 两个合集阅读路径接线

- 按 009 落地两个 3 篇路径，新增 `liaozhai` draft Collection，阴间保留原状态及钟馗 Featured。复用现有模板和反向归属，新增精确 review 输出路径及顺序/归属校验；不修改 Entry 正文、状态、related 数组、资产、Schema、配置或服务。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的完整 check 通过 25 文件/321 测试、Astro 81 文件零诊断、14 页 review 构建及输出验证，42 Hero、10 WOFF2、零 XML、零客户端 JavaScript；未安装、升级或修改工具配置。
- 本批当时对可再生 dist 中的聊斋成员链接与画皮反向入口做过两项临时负向检查，均被预期关系错误拦截；原始字节随后恢复。该一次性检查已在后续加固中由可重复的 parse5 DOM 单元测试取代。资产链沿用现有验证，无新增资产披露。
- 该接线批结束时为 6 Entry / 2 Collection / 14 Source / 19 Claim / 5 Terminology、published 0/0。仅为本地 noindex review，人工浏览器、视觉、键盘/缩放及发布候选验收未执行；未安装依赖、启动服务、接真实外部接口、提交、推送或发布。

### 2026-09-05 三组证据纠偏、关系校验加固与审核包重建

- 按 Project owner 指定顺序修正三组 verified Claim 及对应正文：Ten Kings 分开生前预修的状文/名册与后段业簿、业秤、业镜；Fighting Cricket 恢复捕捉时误伤、后来井中发现、草葬前察觉微息、半夜复苏的叙事顺序，并保留原文未说明如何入井；Liaozhai Reading Guide 将 431/491 限定为 Luo 所报两个版本的 tales 数量，使用单数 appendix，并精确归因 1679 主体成形判断。同步收紧 `zhiguai` 为 Luo 讨论的多种文学模式之一。没有新增证据对象、改变消费关系或提升状态。
- `verify-m4-u2-output.mjs` 现以一个显式关系合同声明两个合集和六篇成员的稳定 ID、独立 `outputPath` 与独立 `href`，并从该合同派生 Collection/Entry 身份映射，不从 ID 推导 URL。`review-output-policy.mjs` 用 parse5 要求合同身份与路径全局唯一、唯一 guided-path section/nav、唯一关联 heading/list/list item/link 及精确顺序；`review-output-policy.test.mjs` 覆盖 ID/slug 不同的通过例，以及重复合同字段、顺序、漏项、错误链接、查询、畸形列表与重复结构失败例。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/351 测试、Astro 81 文件零诊断、14 页 review 构建与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。三篇摘要为 110/104/100 词。
- 仓库外中英对照审核包从纠偏后的三篇 Entry、相关 Source/Claim/Terminology 与 008 重新生成，包含 49 个英文原稿单元、27 项术语/表达和 Painted Skin 五项显式缺口，并以 SHA-256 锁定 19 份输入。包内结论仍待人工填写，不构成双语、文化、目标读者或发布批准。
- 新资产披露不适用；既有资产与内容图诊断通过完整检查。未安装依赖、启动服务、访问外部来源、接真实接口、写 Git、推送或发布；未执行真实浏览器、键盘、缩放或人工视觉验收。

### 2026-09-05 三篇人工双语审核确认

- Project owner 明确确认纠偏后审核包通过人工双语审核；确认对象是 Ten Kings、Fighting Cricket 与 Liaozhai Reading Guide 审核包当时锁定的英文、中文含义对照和术语选择；该历史确认不覆盖 010 后续文案修订。审核包中的三篇结论已记录为通过，并刷新受影响输入哈希。
- `term-shi-wang-in-ten-kings`、`term-shen-hua-in-fighting-cricket` 与 `term-zhiguai-in-liaozhai-reading-guide` 从 `source-checked` 提升为 `bilingual-approved`。三篇 Entry 继续为 `draft`；该确认不替代目标读者、视觉、浏览器、发布候选或 `published` 决定。
- Painted Skin 不在本三篇通过范围内；该审核时点仍保留任笃行 2016 实页、张友鹤 2011 实页、`孽鬼/孽魅` 异文、自译/短引方案与可选现代译本/影视比较证据五项缺口，后续处理见下方 Painted Skin 单见证内容批。

### 2026-09-06 Painted Skin 青柯亭单见证补缺与审核包

- Project owner 授权补齐 Painted Skin 缺口。本批扩展既有青柯亭 Source 的篇级 locator，新增 5 条见证限定的 verified 原典 Claim、1 条 provisional 自译 Claim、1 份 `source-checked` Terminology，并为既有 `painted-skin` draft 写入 2 Source / 7 Claim / 1 Terminology 消费关系和证据受限英语正文；同步 README、CONTENT_MODEL、PRODUCT、ARCHITECTURE、REFERENCES、001、007、008、009 与本文件的当前事实。没有修改 Schema、页面模板、路由、Collection/`relatedEntryIds`、图片、配置、服务或内容状态。
- 具名主见证固定为上海图书馆 `線普長266652-67` 乾隆三十一年青柯亭本：〈畫皮〉从 Commons 数字页 72 右半篇题开始，至页 75 左半 `異史氏曰` 结束，左侧可见版心叶码 35–38。复核发现页 74 实际刻作 `業魅償我拂子來`；因此在送审前把未提交的旧 Claim/Terminology 稳定 ID 改为 `ye-mei`，正文工作译法改为 `yè mèi / wicked apparition`。Tso p.16 的 `孽魅` 与 CText 关联未具名见证的 `孽鬼` 分开记录；不裁定三者正误、同源或演变。
- 唯一原典短引冻结为无标点 `鋪人皮於榻上執采筆而繪之`，本站自加标点并暂译为 “It spread a human skin on the couch, took up a brush, and painted it.”；记录明确不把 `采` 静默规范为 `彩`，也不复制现代译文。妻陈氏求治段、`異史氏曰` 评语层与 Tso 解释均按各自证据边界写入。任 2016 只核到授权电子版权页和完整《輯校凡例》，张 2011 只核到书目身份；现代校勘本、Giles/Minford 直接比较及电影比较移出当前 MVP，Tso 的具名二手解释保留。
- 本补缺批结束时，inventory 为 6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology，published 仍为 0/0；Painted Skin 摘要为 100 词，Entry 保持 `draft`，自译 Claim 为 `provisional`，`業魅` Terminology 为 `source-checked`。仓库外生成 `painted-skin-review.md` 与 `painted-skin-review.html`，包含 20 组中英对照、3 份审核表、7 个明确决策点和 12 份输入 SHA-256；本补缺批结束时状态为 `PENDING`，不冒充人工批准。
- 公开 PATH 的首次 `pnpm run check` 在执行项目检查前因 pnpm 11.19.0 不满足 `>=11.22.0 <12` 而失败；没有安装依赖或修改文件。随后按本文件固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 重跑完整检查，通过 Prettier、ESLint、25 文件/351 测试、Astro 81 文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript。Painted Skin 输出已核为 `yè mèi / wicked apparition` 与当前短译，未出现三种汉字异文或旧稳定 ID。
- 最终内容只读复核无必须修正项：青柯亭情节与用字、短引、求治顺序、`Yìshǐ shì yuē` 归因和 Tso 的 `the imitative structures of gender` 均与对应证据边界一致。审核包 Markdown/HTML 的 20 组英文与当前 Entry 精确对应，12/12 输入 SHA-256 匹配；HTML 保持 3 表、唯一 `PENDING`，且无脚本、外部资源元素或 CSS 外部加载。30 份仓库 Markdown 的严格 UTF-8、89 个相对链接、原模板占位符与 `git diff --check` 均通过；diff check 仅报告既有 Windows LF→CRLF 提示。
- 本批未运行 dev/preview/browser 或非默认 `visual:build:check`，因为没有修改视觉资产；未安装依赖、启动服务、接入真实外部接口、写 Git、推送、建立 public artifact、部署或发布。原页图只用于研究核字，不进入仓库或站点 Asset。

### 2026-09-06 Painted Skin 人工双语审核确认

- Project owner 在查看最终 Painted Skin 审核包后明确回复“画皮人工双语审核通过。”确认范围为审核包当时锁定的 20 组英文与中文含义对照、`業魅 → yè mèi → wicked apparition`、本站短译、妻陈氏求治段动作顺序、`Yìshǐ shì yuē` 归因与 Tso 归因。
- `claim-painted-skin-human-skin-short-translation` 从 `provisional` 提升为 `verified`，正文的 `our provisional translation` 改为 `our translation`；`term-ye-mei-in-painted-skin` 从 `source-checked` 提升为 `bilingual-approved`。审核包同步改为 `APPROVED` 并刷新 12 份输入 SHA-256。
- Painted Skin Entry 继续为 `draft`，`lastFactCheckedAt` 保持 `2026-09-06`；确认不包含目标读者、视觉资产、浏览器、Entry/Collection 状态提升、`published`、public artifact、Git、部署或发布。
- 确认后的固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/351 测试、Astro 81 文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。重建后的审核包包含连续 01–20、3 份表、唯一 `APPROVED`、零 `PENDING`，12/12 输入 SHA-256 匹配，且没有脚本、外部资源元素或 CSS 外部加载。30 份 Markdown 的严格 UTF-8、89 个相对链接和原模板占位符检查通过；`git diff --check` 无 whitespace error，仅报告既有 Windows LF→CRLF 提示。

### 2026-09-06 四篇目标读者文稿审核 R1

- Project owner 在四篇人工双语审核闭合后要求继续。新增 `docs/requirements/010-four-entry-reader-review.md`，按当时路线把本轮四篇英语文稿形成性审核与 M6 最终制品目标读者 QA 分开；本轮只准备审核协议和仓库外材料，不修改四篇正文、Source/Claim/Terminology、Schema、模板、合集关系、资产或状态。目标读者执行时点后来由 011 改为 M7 Public Beta 上线后。
- 仓库外生成协调者专用 `four-entry-reader-review.md` 与唯一参与者材料 `four-entry-reader-review.html`；Markdown 仅保存协议、题目源、计分规则和冻结清单，不发给参与者。HTML 保留四个 Entry 当时输出的标题、开场、Quick Answer、正文、Sources 与合集归属顺序；每篇有 30 秒首答停点、默认关闭的全文和后测，共 8 个原生折叠区与 94 个本地可编辑答题区。材料使用匿名 reviewer ID，记录实际呈现顺序，并在阅读前说明《促织》与《画皮》的强烈内容、可跳过和可随时停止；站点 Reader Request 与所有外部跳转均已移除。
- 冻结清单包含四篇 Entry、两个 Collection、五份唯一 Source、四份 Terminology、Entry 模板及四个实际 review Entry 输出，共 20 份输入。20/20 SHA-256、4/4 可见文本、四个 Article/停点/折叠全文/折叠后测、全局 ID/ARIA/片段引用与严格 UTF-8 检查通过；HTML 唯一状态为 `READY FOR NON-SAMPLE PILOT`，且没有脚本、远程资源元素、CSS 外部加载、外部链接、`form`、`input`、`textarea`、`select` 或 `button`。协调者 Markdown SHA-256 为 `2dd881a5bbc3042751bb34d827cc2cb91681d0ebf5c217844a0e56c7fca98fde`，参与者 HTML 为 `05c72cac375fbd3455c2873bc64800b21b1b6651dcb5413315791c39f5bdf8b6`。
- 当时协议要求先由 1 位符合画像但不计入正式样本的目标读者完成 R2a 可用性试跑，实测说明、折叠区、保存/返还流程与实际时长；参与者可预留最多 90 分钟或分两次完成。修正材料问题后才进入 R2b：5–8 位独立英语目标读者，四篇各至少 5 份可用反馈。010 当时已固定画像、可用答卷字段、跳过/补样规则、80% 小样本向上取整、首答主旨与全文后来源边界的逐篇 rubric、评分分母和 Project owner 最终编码责任；011 后续把执行面改为 live artifact，并增加全站任务、研究版本与独立数据门禁。内容预告泄露的信息不得计作文章传达成功。
- AI 预检只登记待真人验证的可读性假设；当前收到真人反馈 0 份，结果仍为 `PENDING HUMAN READERS`，不得把 R1 技术就绪或 R2a 试跑记为目标读者审核通过。任何后续含义性英语修订须按 010 对受影响单元重开聚焦双语复核。该修订前材料当时只能审核文稿理解和合集顺序意图，不能证明真实页面版式、点击路径、Liaozhai 自然发现、视觉、键盘/缩放或 M6 最终制品 QA。当前 output verifier 只读复核通过；31 份仓库 Markdown 的严格 UTF-8、95 个相对链接、原模板占位符与 `git diff --check` 通过，diff check 仅报告既有 Windows LF→CRLF 提示。因本批没有业务代码、内容或构建输入改动，不重跑完整 `pnpm run check` 或非默认 `visual:build:check`。未安装依赖、启动服务、收集个人信息、调用真实写接口、执行 Git 写操作、推送、部署或发布。

### 2026-09-06 四篇 AI 专业审读、文案修订与聚焦双语包

- Project owner 说明当前没有合适的独立目标读者，要求 AI 先专业审读并修正文案。该审读没有伪造首读时间、答卷或样本，也不进入 R2a/R2b 分母。四篇审读未发现新的事实错误或来源层级倒置；修订收窄标题承诺、减少开场/摘要/正文重复、替换内部研究措辞，并保持原 Source/Claim/Terminology 消费边界。
- 二次证据审读又拦截两处潜在越界：Fighting Cricket 不再用 `child injury` / `apparent death` 或暗示捕捉直接导致入井，内容提示精确写为儿童后来在井中被发现、备葬时察觉微息；Liaozhai Guide 把 `What does a total count?` 改为篇数属于哪个版本，避免重新暗示计数单位差异。Painted Skin 的 Tso 段恢复为 Claim 已核的 `imitative structures of gender`，Ten Kings 继续把卷轴和文本分开。
- Entry Schema 新增 required nullable 纯文本 `contentNote`；全部六篇 Entry 与中央 fixture 显式迁移。只有 Fighting Cricket 与 Painted Skin 非空。`EntryTemplate` 在署名/核查日期之后、Opening 之前渲染始终可见且由 H2 命名的 `aside`，不折叠、不使用 alert/live region、脚本或持久化，也不进入卡片或 metadata。
- output policy 逐类核对 Opening/Quick Answer/body 的实际存在与唯一性，锁定 attribution → reading → content note 顺序、提示的三个直接纯文本子项、提示及其子节点的非隐藏/非 inert/无内联样式/非 alert 或 live 语义，以及无提示页的零 aside；回归覆盖改 class/id、嵌套标题/链接、额外文本、重复块、错误位置和隐藏/警报绕过。四篇 summary 为 104/109/107/96 词。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 的最终完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/369 测试、Astro 81 文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML、零客户端 JavaScript，并只在两篇目标 Entry 显示精确提示。四篇 summary 为 104/109/107/96 词。
- 仓库外生成 `four-entry-copy-revision-bilingual-review.md` / `.html`，状态为待 Project owner 聚焦确认，SHA-256 分别为 `4431d87eedec18c0ce883f82fbc83414cfeffe94fe4e0dbed2f13c88dde81004` 与 `a355ad47659d64f6effa0a3c8e7e89e33c38f801feae59ef36b4bf471fffa9cd`；包内锁定四篇 Entry、Schema、模板、010 与四个实际 build 页面共 11 份输入。修订前 `four-entry-reader-review.md` / `.html` 已显式标记 `STALE — DO NOT DISTRIBUTE`，更新后哈希为 `08ec6055a4e9cab8575fde524e4214b3d418045439111598369dc73dc9d0c52b` 与 `29dc1b40c667be64ca93300474003449b8cd27dde52899114f011ca97c783a10`。确认前不重生成或分发 R1，不把未确认文本送入目标读者流程。
- 本批没有新增或修改 Source/Claim/Terminology、稳定 ID、slug、合集成员/顺序、资产、事实核查日期或状态；未安装依赖、启动服务、调用真实接口、收集个人信息、执行 Git 写操作、推送、部署或发布。非默认 `visual:build:check` 不适用，因为未修改视觉资产、manifest 或 master。

### 2026-09-06 四篇聚焦双语确认与当前 R1 重建

- Project owner 明确回复“`四篇聚焦双语复核通过。`”。批准范围为聚焦差异包列出的四篇当前英语改动单元、对应中文含义和两条 `contentNote`，并同意以当前文本重生成 R1；未改单元继续沿用历史批准。该确认不计作目标读者样本、答卷或可读性通过结论。
- 仓库外 `four-entry-copy-revision-bilingual-review.md` / `.html` 已更新为 `APPROVED`，SHA-256 分别为 `f3ebd85176af8101e6fac59fb279b30d6f440b919e825daf7e2b33278fdf059a` 与 `2ddba707056a9df38bf7fe932c6dc72b7e845caebd7a38ba72e60851a978048c`；11/11 冻结输入哈希匹配，确认记录和四项决定均已写入，零待确认标记。
- 当前 `four-entry-reader-review.md` / `.html` 已从当前 build 重生成，SHA-256 分别为 `3cb9de871bcd46d5b29b85fb3ebf11df14c397457ab787a7bd03331d7a714adb` 与 `22e8139439b374284c98c033e0a0318f558a5c93f86b206818811b89569586c7`。20/20 输入哈希、4 篇当前可见文本、Sources `2/1/1/2`、2 条内容提示、4 个首读停点、8 个默认关闭折叠区、94 个答题区、55 个唯一 ID、22 个可解析 ARIA/标签/片段引用、离线性、HTML 解析与严格 UTF-8 检查通过。冻结 R1 HTML 的遗留状态为 `READY FOR NON-SAMPLE PILOT`，且不含 `STALE`、`PENDING`、`APPROVED`、旧标题、旧问题、外部链接、脚本、表单控件、远程资源、存储或网络入口。011 生效后它已退役为 reference-only，不得作为 live R2 阅读面或答卷载体；仓库没有正式 R1 生成命令，本次使用仓库外一次性生成器并以全量探针验证当前制品，修正样式追加后连续两次生成得到相同 HTML 哈希。
- 确认后的固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 完整 `pnpm run check` 通过 Prettier、ESLint、25 文件/369 项测试、Astro 81 文件零诊断、14 页 review build 与 output verifier；输出保持 42 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。四篇继续为 `draft`，R2a/R2b 未开始，真人反馈为 0；没有新增或修改 Source/Claim/Terminology、稳定 ID、slug、合集成员/顺序、资产、事实核查日期或状态，也没有安装依赖、启动服务、执行 Git 写操作、推送、部署或发布。

### 2026-09-07 Public Beta 与上线后目标读者验证路线

- Project owner 说明当前没有合适的独立目标读者，并确认按建议调整路线：先完成所有非读者发布门禁，以可索引 Public Beta 上线，再在真实页面上执行 R2a/R2b。新增 `docs/requirements/011-public-beta-validation.md` 作为当前合同；此前文档把目标读者写成图片、状态、public artifact、受保护预览或生产前置条件的口径均由 011 取代，历史执行事实保留。
- Public Beta 使用现有 `published` 内容状态，不新增 `beta` 状态。上线前仍须完成 6 Entry / 至少 2 Collection 的事实、来源、双语、文化、关系、资产、权利、披露、无障碍文案与人工状态决定；完成 M5-U4 的 Buttondown/Tally 真实联调、M5-U5 离线 analytics 合同/hook、M6 public 条件接线与 public intent/runner/metadata/XML/output verifier、clean-source receipt、发布候选 QA、受保护预览、可见且可访问的 Beta 提示、生产授权与回滚/RUM 准备。production analytics 与唯一 RUM producer 只在 M7 启用；目标读者样本不进入上述门禁。
- Public Beta 上线后先执行 1 位非计入样本的 live R2a；R2b 建立 5–8 份核心全站可用记录，010 的四篇焦点 Entry 各取前 5–8 份可用深读。被跳过、撤回或无效的范围可按预冻结规则补位，总招募人数可能超过 8，且不得替换已经可用的记录。缺少样本或阈值暂未达到时保持可见 Beta 提示和内部 `Public Beta / pending human validation` 状态；关键发现按既有硬门禁立即处理，必要时回滚或取消发布受影响页面，重复重大问题也须有明确处置。Project owner 核对 live/RUM 技术基线、聚合结果、修改与复测后，才关闭目标读者验证与正式 MVP 验证。
- 当前 R1 已退役为 reference-only，只保存问题、rubric 与四篇文稿基线，不证明 live 页面体验，也不得分发给 R2 参与者。Public Beta 上线本身不授权招募或收集反馈；PB5 前须另行确认招募渠道、参与者说明/退出、字段、记录载体、保留/删除、负责人、样本停止规则、版本身份及数据授权。现有 Tally Reader Request 只处理选题建议，不能复用为目标读者研究入口。
- 本轮开始时本地 HEAD、`main` 与本地 `origin/main` tracking ref 均为 `f81b49fd1c288aed6c552c2e8d9926ec5a09e86c`，工作树干净；未 fetch，因此不以 tracking ref 证明服务器端状态。本轮只同步权威文档，不修改业务代码、内容、Schema、测试、资产或配置，不安装依赖、不启动服务、不接入外部服务，也不创建 public artifact、预览、部署或发布。文档实施与验证阶段未执行 Git 写操作；Project owner 随后明确授权将本批文档创建本地提交，该授权不包含 fetch、push、预览或生产发布。
- PB1 文档验证覆盖仓库全部 32 份 Markdown：严格 UTF-8、101 个相对链接与零模板占位符检查通过，`git diff --check` 无 whitespace error，仅报告 Windows 工作区 LF→CRLF 提示；两路独立只读交叉审查未发现当前文档合同冲突或实现边界误述。变更范围检查确认只有 15 个 Markdown 路径；因本批未修改业务代码、内容数据、Schema、测试、资产或构建输入，不重跑应用测试或 build。

### 2026-09-07 四篇 Entry 与 Liaozhai Collection Hero Brief

- Project owner 授权先修正 006 的当前 review 页数，再完成四篇 Entry 与 Liaozhai Collection 的五份视觉 brief。实施从 `96da8db52cc384e0dc77164288d3bce16383faf0` 开始；当时 HEAD、`main` 与本地 `origin/main` tracking ref 对齐且工作树干净，未 fetch，因此 tracking ref 不单独证明服务器端状态。
- 新增 `docs/requirements/012-five-hero-visual-briefs.md`，并建立 `brief-ten-kings-hero-primary-v1`、`brief-liaozhai-reading-guide-hero-primary-v1`、`brief-painted-skin-hero-primary-v1`、`brief-fighting-cricket-hero-primary-v1` 与 `brief-liaozhai-hero-primary-v1`。五份最初均为 Hero-only `in-review`，`approvedBy/approvedAt` 为空；各自包含 verified/inferred/invented 元素、参考权利、desktop/mobile 独立构图、响应式 build plan 与排除母题。
- 006 当前 output inventory 从误写的 13 页/其他七页修正为 14 页/其他八页；002 把 `targetSlots[]` 合同从误写的“每份都覆盖 Hero/Lead/OG/Social”收窄为按实际 brief 声明 target，钟馗包继续覆盖四槽，本批五份只覆盖 `hero/primary`。
- 本批没有生成、下载、上传或修改图片，没有调用 ImageGen/ComfyUI，没有建立 production record、manifest、repository source 或 master，没有修改 `heroAssetId`、`relatedEntryIds`、Liaozhai Featured 或内容状态，也没有安装依赖、启动服务、执行外部写入、Git 写操作、预览、部署或发布。
- 固定 Node 24.16.0 / pnpm 11.22.0 的 visual brief Schema、视觉资产图与 architecture inventory 定向检查通过 3 个测试文件/23 项测试；完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/369 项测试、Astro 81 文件零诊断、14 页 review build 与 output verifier，产物仍为 42 个既有 Hero 变体、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。33 份 Markdown 的严格 UTF-8、106 个相对链接与零模板占位符检查通过；`git diff --check` 无 whitespace error，仅报告 Windows 工作区 LF→CRLF 提示。`visual:build:check` 不适用，因为没有 master、manifest、production record 或 repository image 变化。
- Project owner 随后说明英文阅读不便并明确要求 Codex 代为审核后确认。Codex 按当前 Source/Claim、参考权利、文化与敏感内容、五组差异化、desktop/mobile 规格和排除母题逐份审核；三路独立只读终审和既有机器检查作为辅助。审核修正了 verified/inferred 边界、青柯亭版面参考措辞、Collection 小尺寸识别、Painted Skin 画笔歧义与 Ten Kings 未物化方向性，复核后无剩余问题。五份均以 `Project owner (user-delegated AI review)` 和 `2026-09-07T03:02:50Z` 提升为 approved；该批准只覆盖 brief，不授权图片生产或后续资产/内容动作。

### 2026-09-07 五组 Hero 候选生产与预筛

- Project owner 在收到“下一步为生产设置授权”的明确说明后回复“继续吧”。本次授权按 012 的 VB3/VB4 候选阶段执行：方法为 `ai-assisted`，工具只使用当前 Codex 任务内置 OpenAI ImageGen；没有调用 CLI/API Key、ComfyUI、插件或外部模型，没有安装依赖。工具回执未给出 model ID 或 seed，不作推断。
- 2026-09-07 只读复核当时官方 OpenAI Terms of Use（页面标示 2026-01-01 生效）与 Service Terms（页面标示 2026-06-12 更新）。该候选阶段只按“本 Codex 任务的登录账户”记录，不推断个人或组织管理状态；候选生产不等于最终 publication authority。Project owner 在当时 VB5 之前仍须确认本次适用账户关系及生成/保存/编辑/公开使用权限；后续确认见下一节。
- 五份初始 desktop/mobile 候选全部从 approved 文字 brief 独立生成；没有下载、复制、描摹或上传 S.3961、青柯亭扫描、现代研究、馆藏图像或其他第三方图片。唯一图像编辑把本批项目生成的 Reading Guide desktop candidate 03 作为 sole edit target，只下移分叉页组以恢复顶部 18% 安全区。
- 候选与原始输出副本只写入 Git-ignored `/.local/visual-production/explore/five-hero-v1-review/`。每个 owner 先做一组，Codex 对违反 brief 的灯具/写实法器、历史建筑、洞穴/动物暗口、实体书形和安全区问题追加定向重做；最终保留 22 张候选并提出 10 张推荐组合：Ten Kings desktop 02/mobile 03、Reading Guide desktop 04/mobile 01、Painted Skin desktop/mobile 01、Fighting Cricket desktop/mobile 02、Liaozhai Collection desktop/mobile 03。
- Git-ignored 审校材料包含五组彩色 desktop/mobile 并排板，以及 Reading Guide/Collection 的 640px 灰度无标题差异板。Codex 预筛确认五组分别以 7＋3 节奏、双分叉页组、窄矩形窗、低视角小蟋蟀/分离圆环、偏轴暗口/连续路径保持独立主轮廓；未见文字、伪文字、Logo、水印、禁止角色或敏感情节。该预筛不替代 Project owner 实际选图或 manifest 的五类审核。
- 该候选阶段结束时尚未建立 `/.local/visual-production/masters/` 新文件、production record、manifest 或 repository source，也未修改五个 `heroAssetId`、关系、Featured、内容状态或构建输出。候选目录没有独立备份；当时须等 Project owner 选图后才能进入 exact-canvas master 与 VB5。Git add/commit/push、服务、预览、部署和发布未由该阶段授权。

### 2026-09-07 五组 Hero 正式资产闭环

- Project owner 于 `2026-09-07T05:34:08Z` 明确确认五组推荐配对全部通过，并确认当前账户由其合法管理，可以是个人账户或已获组织授权的账户，授权把本批项目生成图保存、编辑并用于 Mythic China 公开发布。该回执不推断具体账户类型，也不改写为 Project owner 阅读过英文 manifest 文案。九张最终图来自纯文字输入；Reading Guide desktop 修正版只以同批项目生成图为 edit target，未使用第三方图片。
- 最终采用 Ten Kings desktop 02/mobile 03、Reading Guide desktop 04/mobile 01、Painted Skin desktop/mobile 01、Fighting Cricket desktop/mobile 02、Liaozhai Collection desktop/mobile 03。10 张获选输出经源 hash 核对后，以 Sharp 0.35.4、centered fit-cover、Lanczos3 重建为 3200×1800 desktop 与 1600×2000 mobile；总裁切不足 1 个输出像素，无非等比拉伸。仓库 WebP 保持同画布并采用 quality 90。
- 新增 10 个 Git-ignored lossless master、5 份 production record、5 份 approved/current manifest 与 10 份 repository source；当前总量为 21/9/12/21，11 个逻辑资产各有唯一 approved/current，Zhong Kui Hero v1 继续为 approved/non-current。production record 保存实际提示词、接收时间、输入 hash、raw/master tuple 与处理链；manifest 保存逐资产公开 alt、caption、credit、AI disclosure、权利和五类审核。
- Project owner 的候选选择与 Codex 于 `2026-09-07T05:50:01Z` 的 exact-canvas 复核共同关闭视觉和文化审核；Codex 按 Project owner 的英文审核委托关闭无障碍与语言文案。四篇 Entry 的 desktop 焦点均位于右侧，模板据 approved focal point 把 desktop identity 放到左侧；既有左焦点 Entry 继续放右侧，移动端 identity 保持在图片上方。
- 四篇 Entry 与 Liaozhai Collection 已分别绑定自己的 versionless Hero ID，registry、精确 inventory、output verifier 和架构测试同步。8 文件/38 项定向测试通过；非默认 `visual:build:check` 实际核验 21 个 local master，并从 17 份 current responsive rendition 生成、解码 120 个 AVIF/WebP 输出。
- 完整工程首次运行前，一次未按本文件前置固定 Node 目录的格式化调用被运行时守卫以 PATH Node 16.20.2 拒绝，未产生文件变化。按固定 Node/Corepack 环境重跑后，首次完整检查在 ESLint 阶段发现 Git-ignored 本批生产辅助脚本缺显式 Node imports、一个未用 import 和两个全角空格；只修这些辅助脚本，未改 lint 配置。第二次完整检查通过格式、lint、369 项测试、Astro check 和 112 图构建，但输出 verifier 正确暴露 manifest caption 中英文撇号被 Astro 序列化为 `&#39;` 后的比较差异；核验器改为比较 HTML 转义后的精确 manifest 文案，未改公开文案或 manifest。
- 修正后的最终 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/369 项测试、Astro 81 文件零诊断、14 页 review build/output verifier、112 个 Hero 图片、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。33 份 Markdown 的严格 UTF-8、106 个相对链接与零模板占位符检查通过；`git diff --check` 无 whitespace error，仅报告 Windows 工作区 LF→CRLF 提示。
- 本批未修改 `relatedEntryIds`、Liaozhai Featured、Entry/Collection 状态、外部服务、public artifact 或配置；未安装依赖、启动服务、执行 Git 写操作、push、预览、部署或发布。该批停点是 012 VB6 的关系、Featured 与状态审核，后续结果见下节。

### 2026-09-07 VB6 关系、分类、Featured 与 ready 审核

- 基线为 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`，开始时 HEAD/main/本地 origin/main 对齐、工作树干净。VB6 直接在保存项目执行，未 fetch 或查询服务器，未执行 Git 写入；当前修改未提交。
- 六篇 Entry 与两个 Collection 逐项复核后均 ready；Ten Kings 为 religion，聊斋三篇为 literature，两条 Related 编辑环沿各合集三篇顺序并回 Guide。Liaozhai Featured 为 Painted Skin；现有英文标题/导语由 Codex 本批编辑复核，未冒充新人工批准。
- Underworld Guide 复用已有 CMA Source 补末段近引，书目由三条变四条；无新 Source/Claim/术语对象，正文含义、事实核查日期与发布日期空值保持。Related 输出仍 published-only；合集正反导航和 Featured 使用既有模板，两个索引页仅修正过期的内部 review 提示。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，定向 7 文件/188 测试与完整 check 通过：Prettier、ESLint、25 文件/379 测试、Astro 81 文件零诊断、14 页 noindex build/output verifier、112 Hero、10 WOFF2、零 XML 与零客户端 JavaScript。33 份 Markdown 的严格 UTF-8、108 个相对 Markdown 链接、模板占位符与 git diff --check 均通过。
- 配套核对：Hero 继续消费原 approved/current manifest、权利、alt/caption/credit/AI disclosure 与五审；未改资产生产，非默认 visual:build:check 不适用。Schema、内容图、视觉图及 output verifier 保持构建期阻断；Related 未公开负门禁有必要职责说明，测试覆盖真实内容状态/关系、6+2 ready 投影与 Featured 错链/重复/标题负例。
- 未执行浏览器、键盘/200%/偏好/故障/跨平台 QA、外部服务、public artifact、clean-source receipt、服务、Git 写入、push 或发布。下一内容停点是完整 6+2 的逐项 published/目标日期决定；R2 留到 Public Beta 上线后。

### 2026-09-07 Public Beta 首发 published 与目标日期

- Project owner 确认六篇文章及两个合集全部进入首发 published，并明确六篇目标公开日期统一为 2026-09-10；只授权本地内容、必要接线、匹配测试与文档验证，不授权服务、Git 写入、推送或部署。基线仍为 1be085bf5fc4ba56c2665d1c8193a83001aeec18，延续本任务 VB6 的 30 个未提交文件，没有覆盖其他工作。
- 六篇 publishedAt 为带引号的 ISO 日期，updatedAt 保持 null，原事实核查日期不变；两个合集只改 status，不新增日期字段。正文、两环、分类、成员顺序、Featured、资产与披露保持。日期不作为自动上线或运行时过滤条件。
- Explore/Collections 有 published 列表时不调用或渲染 Not published 候选架；空态和 helper 资格负例保留。HTML5 output oracle 验证精确 6/2 列表与六条 Related。Related 校验限定对应导航，并用同时存在合集反向入口的 fixture 覆盖共享列表 class；该非显然约束有职责注释。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，定向 7 文件/210 测试与最终完整 check 通过：Prettier、ESLint、25 文件/401 测试、Astro 81 文件零诊断、14 页 noindex build/output verifier、112 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。第一次完整检查发现不再使用的导入，交叉审查发现导航作用域问题；修正后重新完整验证通过。33 份 Markdown 的严格 UTF-8、108 个相对链接、零模板占位符与 git diff --check 均通过，只有既有 Windows LF→CRLF 提示。
- 配套核对：Source/Claim/术语与 Hero 谱系、权利、alt/caption/credit/AI disclosure 保持；Schema、内容图、资产图、public intent 和 inactive 交互阻断未放宽；匹配测试保留 ready/空态/未发布/日期负例，并覆盖 published 列表与未来目标日期。
- 未执行浏览器/键盘/缩放/故障/跨平台/发布候选 QA、非默认视觉再生产、服务、外部交互、public artifact、Vercel、Git 写入、推送或部署。状态与日期变更不继承历史发布候选证据；当前结果是未提交的本地 noindex review，不可部署。

### 2026-09-07 无账号阅读判定与 Privacy 纯输出合同

- Project owner 授权继续不涉及账号的开发；在保存项目原地延续 `1be085bf5fc4ba56c2665d1c8193a83001aeec18` 上的 31 个未提交文件。没有创建 worktree、改动既有内容/状态/日期/资产或修改运行配置。
- U5A 新增纯内存阅读状态及 21 项测试：显式时间/可见性/故事区域输入，累计 15 秒、独立 75%、两种顺序、once-only 与新页重置；无 DOM、真实时钟、存储、配置、adapter 或网络。架构 inventory 明确登记且禁止页面消费。
- Privacy 纯 SEO builder 增加精确 `/privacy/` 与普通 WebPage，Sitemap 固定五个静态页各一次；RSS 继续只含 Entry。只消费已有 synthetic fixture，不写入 origin，不启用 public intent、runner、页面 metadata 或 XML endpoint。
- 固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，定向 5 文件/98 测试与完整 check 通过：Prettier、ESLint、26 文件/433 测试、Astro 83 文件零诊断、14 页 noindex review/output verifier、112 Hero、10 hash-locked WOFF2、零 XML 与零客户端 JavaScript。初次定向检查中的参数化测试表格和源码注释误匹配均已修正后重验，未降低业务门槛。
- 配套核对：内容/资产追溯与披露保持；正式 loader、Schema、内容/视觉图和 review 输出诊断未变；新增状态逻辑解释前一可见区间结算与仅故事区域计深度的职责，匹配正反测试及架构隔离已执行。
- 文档验证：33 份 Markdown 严格 UTF-8、108 个相对链接、零模板占位符与 `git diff --check` 均通过；仅有既有 Windows LF→CRLF 提示。同步 001 的 M6 状态为“内容已完成，public assembly/QA/预览未完成”，并清理 006 的过时当前摘要；历史阶段证据不改写。
- 未执行浏览器/最终 QA、非默认视觉再生产、服务、账户/真实供应商联调、public artifact、依赖/配置修改、Git 写入、推送或部署。U5A 不等于 U5 hook/采集已完成；真实 origin/账号和发布候选门禁继续独立等待。

同一固定身份门禁和进程环境下的本批定向入口（只写可再生测试缓存，不访问真实服务）：

```powershell
& $mythicProjectCorepack pnpm run test tests/services/article-reading-state.test.ts tests/services/external-interactions.test.ts tests/site/seo.test.ts tests/site/release-artifacts.test.ts tests/architecture/project-boundaries.test.ts
```

### 2026-09-07 本地整站预检入口

Project owner 已授权本轮临时本地 preview、浏览器检查和直接问题修复，结束后关闭本次服务；不含依赖、运行配置、真实表单、Git 写入或部署。沿用上述固定 runtime 身份门禁，先完成 `pnpm run check`，确认 4321 无其他监听，再使用已登记的 preview 入口，并只访问其实际回显且经核查的 loopback 地址。

内置浏览器连接不可用时，本轮允许使用已安装的 `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` headless 模式。临时脚本、独立 profile、JSON 与截图全部位于仓库外的 `C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\local-site-preflight`；脚本每次创建新 profile，调试端口仅 loopback，不读取日常浏览器资料、不安装驱动。通过 Node 内置 WebSocket/CDP 访问本机 preview，采用 390、768、1440 CSS px 视口，不将设备模拟、截图或 CDP 键盘输入等同于真实手机、读屏器、真实 200% 缩放或最终发布 QA。

本轮临时入口（脚本不随项目交付；执行前复核文件与参数）：

```powershell
& $mythicProjectNode 'C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\local-site-preflight\check.mjs' before 'http://localhost:4321'
& $mythicProjectNode 'C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\local-site-preflight\check.mjs' after 'http://localhost:4321'
```

脚本在 finally 关闭它创建的浏览器；若 CDP 失败，仅终止该脚本持有的子进程，不按进程名停止其他 Edge。preview 按既有 `scripts/run-review-astro.mjs preview stop` 入口关闭，并只读确认回显 PID 与 4321 监听均消失。浏览器或服务退出结果不明时先查现场，不重复启动或停止未知进程。

本轮执行结果：

- 从既有 38 个未提交路径开始，没有新增 worktree。固定 runtime 下先通过 433 项基线，最终通过 Prettier、ESLint、26 文件/460 测试、Astro 83 文件零诊断、14 页 noindex review/output verifier、112 Hero、10 hash-locked WOFF2、零 XML 与零客户端 JavaScript。增加 6 项 CSS 回归及 21 项导航正反例；中间格式检查与暗底隐藏伪元素规则失败均在修正后完整重跑，没有绕过门禁。
- 初始 preview PID `9720`、补验 PID `6992` 均实际监听 `[::1]:4321`；`-- --host 127.0.0.1` 未改变实际地址，浏览器使用 `http://localhost:4321`。`Get-NetTCPConnection` 被拒绝后用只读 `netstat -ano` 确认监听，没有放宽服务绑定。两次服务均用固定 stop 入口关闭，PID/4321 回查无监听。
- 内置浏览器 transport 关闭；隔离 Edge 的两次沙箱内尝试因 GPU 子进程 access denied 失败。经工具审批在沙箱外运行同一脚本，保留浏览器安全沙箱，没有使用 `--no-sandbox`。成功版本为 Edge `152.0.4191.66`，各次临时浏览器均已退出，没有关闭日常 Edge。
- 最终矩阵加入 1024px 断点复核：14 页 × 390/768/1024/1440 × 900，共 56 组。无横向溢出/失败图片/页面运行时异常，字体 loaded、每页一个 main/H1；手机六篇 4:5、正文 68ch、Privacy 16px 间距、两套 current 导航符合修复目标。逐路由首屏与重点正文/来源截图已复核；两条阅读环、返回合集的 10 次 DOM 链接激活通过。页面资源没有观测到外部请求；浏览器默认 favicon 请求返回 404，留作独立图标资产缺口，不能称全部 HTTP 请求成功。
- 修复与证据职责见 003 第 12.17 节。Source/Claim/术语、原资产及 alt/caption/credit/AI disclosure 保持；没有重做资产生产，非默认 `visual:build:check` 不适用。标题流内布局、亮图对比保护和导航 page/location 有非显然职责说明，Schema/图/资产/inert/output 安全校验持续通过。
- 所有截图和一次性脚本留在仓库外，不作为部署 receipt。未执行真实键盘/读屏器、真实 200% 缩放、偏好/禁用 JS/慢或失败资源、实际 fallback、LCP/CLS、跨平台、供应商联调、public artifact、账户/配置、Git 写入、推送或部署；历史 owner 的 8 页批准不扩成这次 14 页人工批准。

### 2026-09-08 本地无障碍与异常加载预检入口

Project owner 已授权继续本地键盘、无 JavaScript、reduced-motion 和图片/字体失败预检，修复直接缺陷并补测试；允许本轮临时 preview 与隔离浏览器，结束停止，不含账号、依赖/配置、真实写接口、Git 写入或部署。沿用固定 runtime、完整 check、空闲端口和实际 loopback 身份门禁，以及上一节的独立 Edge profile、安全沙箱和精确子进程清理规则。

本轮一次性脚本、profile、结果和截图只放仓库外 `C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\accessibility-preflight`。执行前核对脚本与参数，使用 Node 内置 CDP；缓存禁用和资源阻断只作用于此次隔离页面，键盘使用浏览器默认动作，不提交真实表单。可执行入口为：

```powershell
& $mythicProjectNode 'C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\accessibility-preflight\check.mjs' before 'http://localhost:4321'
& $mythicProjectNode 'C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\accessibility-preflight\check.mjs' after 'http://localhost:4321'
# 仅补验样张键盘：不重复故障矩阵，仍覆盖两视口与脚本开/关。
& $mythicProjectNode 'C:\Users\335086\.codex\visualizations\2026\09\07\01a07afc-2488-78f2-86cb-52c2281590de\accessibility-preflight\check.mjs' after 'http://localhost:4321' specimen-keyboard
```

本轮范围与结果由 003 第 12.18 节负责；自动键盘、媒体模拟和当前 Windows fallback 不替代真人键盘/读屏器、真实缩放、慢资源、跨平台或最终 clean-source public artifact 验收。

本轮执行结果：

- 固定 runtime 的基线 460 项通过；合集图片失败底色测试先红后绿，新增两项回归后完整 check 通过 26 文件/462 测试、Astro 83 文件零诊断和原 14 页/112 Hero/10 字体/零 XML/客户端 JavaScript 输出门禁。没有安装依赖或修改运行配置。
- preview PID `32592` 与修复后 `43468` 实际均为 `[::1]:4321`，使用 `http://localhost:4321`；两次均用固定 stop 入口关闭。隔离 Edge PID `14140`、`25736`、`14120` 均经本轮工具审批运行，未关闭浏览器安全沙箱，每次 finally 确认 exitCode 0；最终上述精确 PID 与端口均无存留。
- 最终故障矩阵 142 组、导航键盘 56 组及样张四组针对性补验完成；正文/链接/图片容器尺寸保持，实际资源失败、脚本控制和 reduce 媒体查询均有观测信号。检查器的滚动/文本行与正文 header 误报已纠正，不改站点来迁就检查器。唯一站点修复为合集备用底色，浏览器默认 favicon 404 仍是独立缺口。详情、抽样范围和未验证项见 003 第 12.18 节；所有一次性材料留在仓库外，没有提交、推送或部署。


### 2026-09-08 本地 Public Beta 内容与阅读预检检查点

Project owner 已明确授权提交当前累积的 44 个路径；父基线为 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`，当前分支为 `main`，核查时暂存区为空且没有活动 Git hook。范围为 VB6/首发 published 与 2026-09-10 目标日期、无账号纯阅读判定/Privacy 输出、本地响应式/无障碍修复及匹配测试文档；不提交仓库外临时材料或 ignored build。只授权本地检查点，不含新分支、fetch、push、服务或部署，也不把原 dirty-source 预检转换为 release receipt。

沿用固定 runtime 先完成完整 check；确认当前改动与以下清单一致后暂存，出现范围外路径或状态漂移即停止：

```powershell
$mythicCommitFiles = @(
  'DEV_WORKFLOW.md',
  'PROJECT_RULES.md',
  'README.md',
  'docs/ARCHITECTURE.md',
  'docs/CONTENT_MODEL.md',
  'docs/DESIGN.md',
  'docs/PRODUCT.md',
  'docs/requirements/001-mvp-foundation.md',
  'docs/requirements/003-pages-exploration-seo.md',
  'docs/requirements/004-first-vertical-slice-candidate.md',
  'docs/requirements/006-external-interactions.md',
  'docs/requirements/007-second-collection-decision.md',
  'docs/requirements/008-four-entry-claim-maps.md',
  'docs/requirements/009-collection-reading-paths.md',
  'docs/requirements/010-four-entry-reader-review.md',
  'docs/requirements/011-public-beta-validation.md',
  'docs/requirements/012-five-hero-visual-briefs.md',
  'scripts/font-specimen-policy.mjs',
  'scripts/review-output-policy.mjs',
  'scripts/verify-m4-u2-output.mjs',
  'src/components/SiteHeader.astro',
  'src/content/collections/chinese-underworld.yml',
  'src/content/collections/liaozhai.yml',
  'src/content/entries/chinese-underworld-guide.md',
  'src/content/entries/fighting-cricket.md',
  'src/content/entries/liaozhai-reading-guide.md',
  'src/content/entries/painted-skin.md',
  'src/content/entries/ten-kings.md',
  'src/content/entries/zhong-kui.md',
  'src/pages/collections/index.astro',
  'src/pages/explore/index.astro',
  'src/site/release-artifacts.ts',
  'src/site/seo.ts',
  'src/styles/global.css',
  'tests/architecture/project-boundaries.test.ts',
  'tests/site/release-artifacts.test.ts',
  'tests/site/release-projection.test.ts',
  'tests/site/responsive-layout.test.ts',
  'tests/site/review-output-policy.test.mjs',
  'tests/site/review-projection.test.ts',
  'tests/site/seo.test.ts',
  'tests/typography/font-specimen.test.mjs',
  'src/services/article-reading-state.ts',
  'tests/services/article-reading-state.test.ts'
)
if ((Resolve-Path -LiteralPath (git rev-parse --show-toplevel)).Path -ne 'F:\codex-project\mythic-china') { throw 'Unexpected Git root.' }
if ((git branch --show-current) -ne 'main') { throw 'Unexpected branch.' }
if ((git rev-parse HEAD) -ne '1be085bf5fc4ba56c2665d1c8193a83001aeec18') { throw 'Unexpected parent revision.' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Expected an empty staging area.' }
$mythicPendingPaths = @(git diff --name-only) + @(git ls-files --others --exclude-standard)
if (Compare-Object ($mythicCommitFiles | Sort-Object) ($mythicPendingPaths | Sort-Object)) { throw 'Commit scope changed.' }
git add -- $mythicCommitFiles
if ($LASTEXITCODE -ne 0) { throw 'Staging failed.' }
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged diff check failed.' }
git diff --cached --name-status
git diff --cached --stat
```

主线复核暂存清单只含上述路径、无业务文件漂移后执行：

```powershell
git commit -m "feat(beta): prepare launch content and harden local reading"
if ($LASTEXITCODE -ne 0) { throw 'Local commit failed.' }
git log -1 --format='%H %s'
git status --short --branch
git diff --cached --stat
```

通过标准：新提交父节点为上述基线、恰含已核对的 44 个路径，工作树和暂存区干净；本地 tracking ref 未同步，ahead 状态不表示已推送。提交哈希从执行结果及 Git 历史取得，不在待提交文本中预写自身哈希。此前各实施记录的“未提交”表示当时快照，不覆盖本次授权与执行后现场。


### 2026-09-08 本地 public assembly

用户已通过网页建立个人管理 Hobby 空项目 `project-scu6m`，截图确认 Production 域名 `mythic-china-beta.vercel.app` 且 `No Deployment`，随后授权继续本地部署准备。实现范围与失败关闭合同见 [013](docs/requirements/013-public-artifact-assembly.md)。不安装 Vercel CLI，不读取 token，不连接 Git，不启动服务、提交、推送或部署。当前原始基线 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd` / main，执行前工作树干净。

本地代码、测试与必要构建配置修改属于本次范围；review 保持 `dist/`，public 改写仅限项目内可再生 `.local/public-build/`。运行 public 前已只读确认其父目录和目标，不允许 symlink/junction。输出基于未提交源，只形成 nondeployable 诊断，不生成或冒充 clean-source verification receipt。

执行前按本文件的固定 Node/Corepack 身份门禁设置本进程 PATH，并确认版本，**不重复安装**：

```powershell
$mythicProjectNode = 'D:\Program Files\nvm\v24.16.0\node.exe'
$mythicProjectCorepack = 'D:\Program Files\nvm\v24.16.0\corepack.cmd'
$mythicProjectRuntimeDirectory = [IO.Path]::GetDirectoryName($mythicProjectNode)
if ((Resolve-Path -LiteralPath '.').Path -ne 'F:\codex-project\mythic-china') { throw 'Unexpected workspace.' }
if ((& $mythicProjectNode --version) -ne 'v24.16.0') { throw 'Unexpected Node.' }
if ((& $mythicProjectCorepack --version) -ne '0.35.0') { throw 'Unexpected Corepack.' }
$mythicOtherPathEntries = @($env:Path -split [IO.Path]::PathSeparator) | Where-Object { $_ -and $_.TrimEnd('\') -ine $mythicProjectRuntimeDirectory.TrimEnd('\') }
$env:Path = (@($mythicProjectRuntimeDirectory) + $mythicOtherPathEntries) -join [IO.Path]::PathSeparator
$env:ASTRO_TELEMETRY_DISABLED = '1'
& $mythicProjectCorepack pnpm --version
& $mythicProjectCorepack pnpm run format
& $mythicProjectCorepack pnpm run test tests/site/build-intent.test.ts tests/site/public-assembly.test.ts tests/site/public-output-policy.test.mjs tests/site/public-runner.test.mjs
& $mythicProjectCorepack pnpm run check
```

每个入口单独执行并检查退出码；失败后只在修正对应问题后重验。上述 format 前已确认范围，无用户范围外修改。配置 origin 只作用于本次子进程，构建后恢复：

```powershell
$mythicPreviousOrigin = $env:MYTHIC_CHINA_SITE_ORIGIN
try {
  $env:MYTHIC_CHINA_SITE_ORIGIN = 'https://mythic-china-beta.vercel.app'
  & $mythicProjectCorepack pnpm run build:public
  if ($LASTEXITCODE -ne 0) { throw 'Public diagnostic build failed.' }
} finally {
  $env:MYTHIC_CHINA_SITE_ORIGIN = $mythicPreviousOrigin
}
```

需要只重验现有 public 输出时，在同一 origin 身份下执行 `& $mythicProjectNode scripts/verify-public-output.mjs`；该入口只读，不重建。public 后再执行 `pnpm run build` 验证 review 无模式残留。本批不运行 preview/browser；正式候选仍需既有完整 QA（含 Beta 提示显示验收）、hosting Privacy/真实供应商、clean source 与独立部署授权。

本批结果：定向 4 文件/42 测试、完整 check 29 文件/498 测试与 Astro 96 文件零诊断通过。review → public → review 均实际构建通过；review 14 页且无 XML，public 13 HTML、2 XML、robots.txt、112 Hero 与 10 字体，独立输出检查通过。未启动服务、生成 receipt、提交、推送或部署，详细范围与未完成项见 013。

## 数据库、外部服务与真实写入口

站点运行期的真实写入当前均未启用。外部已有审核已通过的 Buttondown 账户及 owner 提供发布链接的 Tally Free 表单；本站 Newsletter/Analytics 配置默认关闭，Reader Request 尚未接线，没有数据库或站内表单 endpoint。Tally 的最新证据及受控步骤见本文末尾与 006 第 12.10 节；账户准备或托管表单存在不等于本站真实接入。未来启用任一能力时必须先在对应需求和本文落实：

- 环境和实际身份校验。
- Mock/隔离测试入口。
- 真实写入影响、授权、停止条件和回查方式。
- 隐私、数据保留和删除策略对应的可执行门禁。

标准构建、自动化验证和未来静态站部署不拥有数据库、消息系统、缓存或对象存储的生命周期；除非后续架构与本文件明确纳入受控入口，否则不得创建、重建、重启、清空、迁移或轮换这些资源及其凭据。

## 发布

### 证据物化检查点时的交接

Vercel 已被选为未来静态托管目标，Project owner 当前明确不购买自定义域名；项目仍没有稳定 production alias/hostname、真实 origin、预览/生产环境或可执行部署命令。M4 的 noindex 本地产品实现与当时 8 页人工判断已完成；M5-U2 provider-neutral 合同/Fake 及 M5-U3 的 9 页 inert review UI/Privacy 历史基线也已完成。四个 draft Entry 随后形成 13 页历史快照并物化 5 Source、9 Claim 与 3 Terminology；009 新增 Liaozhai draft Collection 后，当前为 6 Entry / 2 Collection / 14 页 review 输出，两个三篇路径已接线，published inventory 已获独立批准为 6/2，六篇目标日期为 2026-09-10，`public` intent、runner、路由/endpoint、deployable output 和远端环境均不存在。Project owner 于 2026-09-04 确认 Buttondown 账户审核已通过，Tally Free 草稿仍未发布；M5-U4 仍未完成，其下一停点须按 `docs/requirements/006-external-interactions.md` 分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 发布、精确 hosted link、合成数据写入、回查和删除。VB6 已闭合关系、Featured 与 6 ready Entry / 2 ready Collection；owner 已完成逐项人工 `published` 与六篇目标日期 2026-09-10 决定；M6 后续仍须在单独授权下建立 Vercel 项目身份、确认稳定 production hostname 作为阶段性 origin。随后才实施 public artifact assembly，并从另行授权的 clean committed source 重建同一最终 artifact，执行 output verifier 与完整 release-candidate QA，生成 clean-source verification receipt。dirty source 只允许 nondeployable 诊断记录；M6 远端预览和 M7 生产/live smoke/RUM 仍逐次授权。任何首次项目创建、关联、预览部署和生产发布都必须先把真实命令、身份与回滚写入本文件；不得上传包含 non-published 路由的 review `dist/`。

### 2026-09-08 检查点交接（历史）

2026-09-08 检查点开始前：本地 `main` / HEAD / 本地 `origin/main` 为 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd`，013–016 共 58 个变更路径未提交、暂存区为空；用户已建立 Hobby 空项目及 `mythic-china-beta.vercel.app` Production 域名，public 本地接线与两条构建已经存在。前一“证据物化检查点时的交接”段保留历史状态，不能据其否定当前项目或 origin。用户随后授权完整核对、固定本地检查点及独立推进 M5/托管门禁，并明确要求本地提交；本次命令与结果见文末检查点章节。不包含 fetch、push、服务或部署，真实业务写入仍按数据范围单独确认。

五组 Hero 已提交为 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`，VB6 开始时 HEAD/main/本地 origin/main 对齐且工作树干净，未 fetch 或核验服务器。第二 Collection/`entryIds` 已按 009 接线；四篇修订前锁定稿及 010 当前改动单元和两条内容提示均已由 Project owner 确认通过人工双语审核，六份 Terminology 均为 `bilingual-approved`，Painted Skin 短译 Claim 为 `verified`。010 的 AI 专业文案修订、文章级内容提示、聚焦双语确认与 R1 重建已完成；R1 静态检查通过后已退役为 reference-only，真人反馈仍为 0。012 的四篇 Entry 与 Liaozhai Collection 五组 Hero 已完成 approved brief、候选选择与账户/公开使用确认、exact-canvas、production lineage、approved/current manifest、repository source、内容绑定和资产级五审；默认 review 输出合同现为 14 页、8 个 Hero family 在 11 个含图页 / 19 个图位合计 112 个唯一 Hero 图片、10 个字体、零 XML 与零客户端 JavaScript。VB6 已闭合四篇分类、两条 Related 编辑环、Liaozhai Featured（Painted Skin）与 6 ready Entry / 2 ready Collection；随后 owner 已批准全部 6+2 published，六篇 publishedAt 统一为 2026-09-10。013 已完成 origin/public assembly 的本地接线与验证；Beta 页脚提示已完成本地实施，最终显示验收仍随候选 QA；016 已补条件式 hosting Privacy；下一停点为实际托管配置复核、独立 M5 交互与完整候选准备，再进入 clean-source QA 和受保护预览。M7 在独立授权下发布可索引 Public Beta，随后执行 live R2a/R2b，并在问题处置与 Project owner 结论后关闭正式 MVP 验证。本批未执行 fetch、Git 写操作、push 或发布。

当前默认禁止在 Vercel、其他最终环境或远端工作区直接修改业务代码；项目也没有可用的受控例外入口。部署、重启、排障或平台项目操作授权都不得推导出远端直接修改授权。若未来业务确需此路径，必须先在架构与本文件定义唯一入口、精确范围、身份门禁、验证、留痕和回流策略，并单独取得授权。

## 超时、中断和未知现场

未来任何远端发布、表单联调或数据操作出现超时、断连或结果不明时：停止重复执行，记录最后确认步骤，仅做只读状态核查，再根据现场事实决定继续或人工恢复。

## 014 版面与视觉复核

2026-09-08，owner 授权独立设计复核后落实首页、目录、文章首屏，并另行授权临时本地 preview、浏览器检查及结束关闭。文件范围与停止条件见 [014](docs/requirements/014-editorial-design-refinement.md)。不安装依赖、不改运行配置、不做 Git 写操作或远端发布。

沿用本文件固定 Node/Corepack/Path 门禁，在保存项目根依次执行：

```powershell
& $mythicProjectCorepack pnpm run format
& $mythicProjectCorepack pnpm run check
```

public 构建使用上文 013 的显式 origin、try/finally 环境恢复入口；之后沿用 `pnpm run build` 回归 review。若局部失败，定向复核命令为：

```powershell
& $mythicProjectCorepack pnpm run test tests/site/hero-output-policy.test.mjs tests/site/public-assembly.test.ts tests/site/responsive-layout.test.ts
```

完整 check 后只读核查 4321 无其他监听，再用既有 `pnpm run preview -- --host 127.0.0.1` 启动，核对实际 PID 和 loopback 地址。浏览器只访问该临时服务；检查结束使用固定 Node 执行 `scripts/run-review-astro.mjs preview stop`，只读回查 PID/端口。截图、临时 JSON 与诊断均在仓库外，不提交。此授权不延续到下一任务，不访问真实表单或账户。

014 结果：完整 check 30 文件/513 测试、Astro 98 文件零诊断通过；CSS 收尾后定向3文件/35测试、public13页和review14页两种构建通过，均保持112 Hero及10字体。内置浏览器完成27个页面/视口组合，首页三条入口实点通过；preview PID39148已停止且4321无监听，viewport已重置。详细证据范围、三篇subtitle与未完成的public视觉/最终QA见014。未提交、推送或部署。

### 015 墨色背景验证（2026-09-08）

本次为同一发布前设计任务的继续修改，owner 新指定 mythzh 为背景参考；临时浏览器检查沿用其已明确授予的 preview 启动、检查和关闭范围。固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0，保存项目与 HEAD fabb4c9e829dc85c6c47161f49af5e9ad58594bd 上的原有工作树不变。代码只改共享色板及 dark 声明。

执行本文件固定入口的完整 check，通过格式、lint、既有测试、Astro 与 review 输出门禁；随后以既有显式 origin 执行 build:public，并回到默认 build，均零 Astro 诊断。public 为 13 HTML、2 XML、robots.txt、112 Hero、10 字体；review 为 14 noindex HTML，字体、逐图披露与零客户端脚本约束保留。

临时 preview 使用既有 pnpm run preview -- --host 127.0.0.1 入口，实际监听 [::1]:4321，PID 32920。Codex 内置浏览器完成 8 页 × 390/1440 共 16 组合，正文/来源/菜单焦点另行抽查；结果及局限见 [015](docs/requirements/015-ink-palette.md)。结束时通过固定 Node 执行 scripts/run-review-astro.mjs preview stop，PID 不存在且端口无 LISTENING，viewport 重置、临时标签已关闭。未新增安装、真实写接口、Git 写操作或发布授权；本地诊断不构成最终 receipt。

### 016 阅读页面收尾验证（2026-09-08）

同一设计任务沿用已授权的临时 preview/检查/结束关闭，固定 runtime、保存项目与上述 format/check、public → review 构建、preview/stop 命令不变。新增定向验证组合（仅在有关改动或失败后使用）：

```powershell
& $mythicProjectCorepack pnpm run test tests/site/hero-output-policy.test.mjs tests/site/review-output-policy.test.mjs tests/site/external-interactions-ui.test.ts tests/site/responsive-layout.test.ts
```

范围为 11 处原生图注展开、8 处完整详情图注、零控件的 inactive 状态、首页导语与条件式托管 Privacy。完整 check 30 文件/529 测试与零 Astro 诊断通过；两处链接空格修复后重新 public → review 构建，13/14 页独立输出检查通过，112 Hero/10 字体不变。内置浏览器 13 路由 × 三档 39 组合无横向溢出/缺图/控件；一处即时 fonts=loading 在同宽复测 loaded。键盘与核心阅读链、截图范围见 [016](docs/requirements/016-reader-facing-polish.md)。preview PID 30856 已通过固定 stop 入口结束，进程不存在且 4321 无 LISTENING；临时标签关闭、viewport 重置。无安装、账户、Git 或发布写操作。


## 013–016 本地检查点与 M5/托管进入核查（2026-09-08）

用户在当前任务明确要求核对完整变更与文档、固定本地检查点、独立推进 M5/托管门禁，并在最后本地提交。本节记录本次范围，不追认旧任务为发布授权。父基线为 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd` / main；进入时 58 个变更路径、暂存区为空。核对后只增加 PROJECT_RULES 的阶段摘要和 001 总需求当前状态同步，完整检查点为下列 60 个路径；包含 21 个未跟踪文件与样张移动两端，不使用仅跟踪文件暂存。

三项独立只读审查覆盖 public 构建链、页面/图注/静态交互、文档与 M5/托管门禁，未发现本地实现阻塞缺陷。主代理同步当前文档中的墨色、public assembly、图位、条件式 hosting Privacy 与验证时点，保留历史事实和全部发布/数据门禁。本次没有新增业务代码修复、来源、资产、字体、依赖或运行配置。

固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0，沿用本文既有入口完成完整 `check`，通过 Prettier、ESLint、30 文件/529 测试、Astro 零 error/warning/hint 与 review verifier；随后按 013 显式 origin 入口执行 public → review 构建，13 HTML/2 XML/robots.txt 与 14 noindex HTML 均通过独立输出检查，112 Hero/10 字体和零可执行脚本保持。Markdown 严格 UTF-8、相对链接、占位符与 diff whitespace 按本文既有入口检查。构建仍是提交前本地诊断，不生成 clean-source receipt，不代替最终 public 浏览器、缩放、故障、平台或性能 QA。

### 本地暂存与提交入口

以下两段分别执行，第一段完成后只读复核完整暂存 diff 与新增实现；出现范围漂移、意外 hook、失败或未知状态即停止。提交前已核对默认 hooks 目录没有非 sample hook、没有自定义 hooksPath；不禁用或绕过 hook。命令只作用于保存项目，不含 branch/worktree、fetch、push、amend 或部署。

```powershell
$mythicCheckpointFiles = @(
  'astro.config.mjs',
  'DEV_WORKFLOW.md',
  'docs/ARCHITECTURE.md',
  'docs/COMPETITIVE_AUDIT.md',
  'docs/DESIGN.md',
  'docs/PRODUCT.md',
  'docs/REFERENCES.md',
  'docs/requirements/001-mvp-foundation.md',
  'docs/requirements/003-pages-exploration-seo.md',
  'docs/requirements/006-external-interactions.md',
  'docs/requirements/011-public-beta-validation.md',
  'docs/requirements/013-public-artifact-assembly.md',
  'docs/requirements/014-editorial-design-refinement.md',
  'docs/requirements/015-ink-palette.md',
  'docs/requirements/016-reader-facing-polish.md',
  'package.json',
  'PROJECT_RULES.md',
  'README.md',
  'scripts/hero-output-policy.mjs',
  'scripts/public-output-policy.mjs',
  'scripts/review-output-policy.mjs',
  'scripts/run-public-astro.mjs',
  'scripts/verify-m4-u2-output.mjs',
  'scripts/verify-public-output.mjs',
  'src/components/IllustratedLink.astro',
  'src/components/IllustrationDetails.astro',
  'src/components/NewsletterForm.astro',
  'src/components/ReaderRequest.astro',
  'src/components/SiteFooter.astro',
  'src/content/entries/fighting-cricket.md',
  'src/content/entries/liaozhai-reading-guide.md',
  'src/content/entries/painted-skin.md',
  'src/layouts/SiteLayout.astro',
  'src/pages/collections/[slug].astro',
  'src/pages/collections/index.astro',
  'src/pages/explore/[slug].astro',
  'src/pages/explore/index.astro',
  'src/pages/index.astro',
  'src/pages/privacy.astro',
  'src/pages/review/type-specimen.astro',
  'src/review/type-specimen.astro',
  'src/site/build-intent.ts',
  'src/site/endpoints/robots.txt.ts',
  'src/site/endpoints/rss.xml.ts',
  'src/site/endpoints/sitemap.xml.ts',
  'src/site/load-public-assembly.ts',
  'src/site/page-projection.ts',
  'src/site/public-assembly.ts',
  'src/site/public-site.ts',
  'src/styles/global.css',
  'src/templates/EntryTemplate.astro',
  'src/templates/HomeTemplate.astro',
  'tests/site/build-intent.test.ts',
  'tests/site/external-interactions-ui.test.ts',
  'tests/site/hero-output-policy.test.mjs',
  'tests/site/public-assembly.test.ts',
  'tests/site/public-output-policy.test.mjs',
  'tests/site/public-runner.test.mjs',
  'tests/site/responsive-layout.test.ts',
  'tests/site/review-output-policy.test.mjs'
)
if ((Resolve-Path -LiteralPath (git rev-parse --show-toplevel)).Path -ne 'F:\codex-project\mythic-china') { throw 'Unexpected Git root.' }
if ((git branch --show-current) -ne 'main') { throw 'Unexpected branch.' }
if ((git rev-parse HEAD) -ne 'fabb4c9e829dc85c6c47161f49af5e9ad58594bd') { throw 'Unexpected checkpoint parent.' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Expected an empty staging area.' }
$mythicPendingPaths = @(git diff --name-only --no-renames) + @(git ls-files --others --exclude-standard)
if (Compare-Object ($mythicCheckpointFiles | Sort-Object) ($mythicPendingPaths | Sort-Object)) { throw 'Checkpoint scope changed.' }
git --literal-pathspecs add -- $mythicCheckpointFiles
if ($LASTEXITCODE -ne 0) { throw 'Checkpoint staging failed.' }
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged whitespace check failed.' }
$mythicStagedPaths = @(git diff --cached --name-only --no-renames)
if (Compare-Object ($mythicCheckpointFiles | Sort-Object) ($mythicStagedPaths | Sort-Object)) { throw 'Staged inventory changed.' }
git diff --cached --name-status
git diff --cached --stat
```

暂存复核通过后：

```powershell
git diff --quiet
if ($LASTEXITCODE -ne 0) { throw 'Unstaged changes remain.' }
if (@(git ls-files --others --exclude-standard).Count -ne 0) { throw 'Untracked files remain.' }
git commit -m "feat(site): assemble public pages and polish reading"
if ($LASTEXITCODE -ne 0) { throw 'Local checkpoint commit failed.' }
git log -1 --format='%H %P %s'
git status --short --branch
git diff --cached --stat
```

通过标准：新提交父节点为上述基线，按 `git show --format= --name-only --no-renames HEAD` 核对恰含上述 60 个路径，工作树、暂存区和未跟踪文件为空；本地 tracking ref 不同步，不据 ahead 状态声称已推送。精确提交身份从执行结果和 Git 历史取得，不在待提交文本中预写自身哈希。

### M5 与托管停点

本地检查点不关闭 006/011 的 U4/U5 或托管门禁。本次没有取得真实账户配置证据，也没有真实订阅、确认邮件、表单提交、分析事件、草稿发布、远端部署或数据删除。Buttondown/Tally 的真实 action/link、测试邮箱及按供应商区分的受控写入包仍须闭合；Plausible 的候选费用/处理决定尚待确认。详见 006 的当前接线进入清单。

托管下一步只读核对项目/账户内部身份、稳定域名绑定、部署状态、实际 build/install/output/runtime 设置、预览保护和退出路径；再实例化不安装 Vercel CLI 的真实交付入口。不得因配置核查启动部署、连接触发自动构建的 Git 集成、关闭 2FA/保护或把 review runner 的透传参数当作 public 服务入口。受保护预览、地区/回滚实证与生产发布仍按 011 独立进入。

## 检查点后托管现场复核（2026-09-08）

本地检查点已创建为 `502c0c882f7925853f5e8e3f8ef83e2519042e79`，父节点为 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd`；60 个路径与清单一致，Git 将样张两端识别为一次移动，因此摘要为 59 files。提交后工作树、暂存区和未跟踪文件为空；本地 `origin/main` 未变化，未推送。前节测试与构建均发生在该提交之前，仍只作诊断。

用户报告输入 2FA 验证码后无响应；随后浏览器实际进入控制台并显示项目，登录已完成。以下来自同一次只读账户核查，不使用截图或页面副本入库，不保存个人邮箱、验证码或凭据。

| 核查项 | 现场事实 | 尚未证明或仍需处理 |
| --- | --- | --- |
| 团队/项目身份 | Hobby 团队 `Mathic China`，slug `mathic-china`，ID `team_zxOM6nEHD6ZYTRcrAjbcwU3U`；项目 `project-scu6m`，ID `prj_U8IP9LhhpaeDC2dJlP0VVv3ciu70` | 每次部署前仍须复核目标身份与授权；名称拼写按现场保留 |
| 域名与环境 | `mythic-china-beta.vercel.app` 绑定 Production；域名 `No Deployment`；概览显示无 Production/Preview Deployment；Preview 无自定义域名 | 未产生可验收的线上 URL、资源或回滚对象 |
| Git | 未连接仓库；Deploy Hooks 不可用；Production 无 branch configuration | 不能以本地 push 触发部署；连接 Git 须先明确自动构建影响和授权 |
| Build/Install/Output | Framework `Other`；三项 override 未启用，输入为空；Root Directory 为空 | 平台默认构建不能直接采用仓库默认 `build`，后者输出 review；须按选定交付方式实例化 public 配置 |
| 运行时与变量 | Node `24.x`；Project 环境变量列表显示 `No Environment Variables Added`；系统变量访问开启 | 未验证实际 Node 小版本、Corepack/pnpm 11.22.0 平台兼容或 public origin 配置 |
| 部署保护 | `Require Log In` 勾选，范围 `Standard Protection`；无自动化绕过密钥，OPTIONS allowlist 未启用 | 仅通过设置核查；未登录访问拦截、授权读者访问和保护覆盖仍须在真实 Preview 上验收 |
| 数据与 Toolbar | 项目和团队的模型训练/数据分享选项均已勾选；项目 Toolbar 继承团队默认 On | 建议仅对本项目关闭训练选项，须先确认配置修改；Toolbar 的远端脚本/资源影响纳入最终输出与 Privacy 核查，不改团队其他项目 |
| 退出与保留 | 项目页提供 Pause/Transfer/Delete；部署保留设置显示四类均为 30 天 | 只看见入口，不等于已验收暂停、迁移、导出、删除或回滚 |

既有项目概览的文件/目录拖放文案明确为 `Deploy to Production`，不能当作 PB3 受保护预览。通用 [Vercel Drop](https://vercel.com/docs/drop) 文档另说明新建项目，但不足以断言既有项目页的行为；本次没有上传验证。当前 `Standard Protection` 不应被解释为 Production 域名也受保护，范围依据 [Deployment Protection](https://vercel.com/docs/deployment-protection)，实际访问仍未验收。

交付决策停点：先确定向上述既有项目创建 Preview 的受控非 CLI 入口，再决定由平台构建完整源码还是交付本地已验收的不可变静态制品。前者必须显式使用既有 `build:public` 和 `.local/public-build/`、已确认的 origin 与固定包管理器；后者必须只包含 public 输出并绑定全部文件路径/大小/digest。两者都不能使用提交前 artifact，不能代替 clean revision 重建、最终 QA/receipt、M5 或发布授权。本节不提供尚未验证的上传命令，不安装 CLI，不连接 Git，不更改平台设置，不发送真实业务数据。

本次文档补充沿用用户对当前任务的本地核对/提交授权，范围仅为 README、DEV_WORKFLOW 和 011；严格 UTF-8、相对链接、占位符及 diff 空白检查通过后暂存并提交，不重复业务测试或构建：

```powershell
$mythicHostingDocs = @('README.md', 'DEV_WORKFLOW.md', 'docs/requirements/011-public-beta-validation.md')
if ((Resolve-Path -LiteralPath (git rev-parse --show-toplevel)).Path -ne 'F:\codex-project\mythic-china') { throw 'Unexpected Git root.' }
if ((git branch --show-current) -ne 'main' -or (git rev-parse HEAD) -ne '502c0c882f7925853f5e8e3f8ef83e2519042e79') { throw 'Unexpected hosting-note parent.' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { throw 'Expected empty staging.' }
if (@(git ls-files --others --exclude-standard).Count -ne 0) { throw 'Unexpected untracked files.' }
if (Compare-Object ($mythicHostingDocs | Sort-Object) (@(git diff --name-only) | Sort-Object)) { throw 'Hosting-note scope changed.' }
git --literal-pathspecs add -- $mythicHostingDocs
if ($LASTEXITCODE -ne 0) { throw 'Hosting-note staging failed.' }
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged whitespace check failed.' }
git diff --cached --stat
```

只读复核暂存内容与范围后：

```powershell
git diff --quiet
if ($LASTEXITCODE -ne 0) { throw 'Unstaged changes remain.' }
git commit -m "docs(hosting): record verified account and deployment gates"
if ($LASTEXITCODE -ne 0) { throw 'Hosting-note commit failed.' }
git log -1 --format='%H %P %s'
git status --short --branch
```

## GoatCounter 免费分析合同与实施顺序（2026-09-08）

本批开始时 HEAD 为 `190cbdde39811912c1761799962500fff33c9202`，工作树和暂存区干净，本地 `main` 与未 fetch 的 `origin/main` 对齐；这不是远端查询结果。owner 已接受零月费方案并要求继续，账户由 owner 手工注册。Plausible 的购买/处理决定保留为前节历史，已不属于当前进入门禁；新合同以 [006 第 5.4 节与 U5B](docs/requirements/006-external-interactions.md) 为准。

本批文件范围为 README、本文、ARCHITECTURE、REFERENCES、006、011，加上 PRODUCT/001 中直接相关的当前供应商摘要。只同步文档，不改变代码、公开 Privacy、运行配置、依赖、服务或版本控制；文档检查使用本文既有“文档验证”命令，检查状态、UTF-8、相对链接、占位符和 diff 空白。代码和构建未变，无需重复业务测试或构建，也不新增最终候选验证证据。

后续按以下顺序推进，实施前先列出精确文件及适用验证入口：

1. **离线接线**：复用 `article-reading-state.ts`，补 pageview、GoatCounter mapping/注入 transport、默认关闭配置入口、本站 bootstrap 与 DOM hook；同步 Privacy 目标文案、架构 inventory 和精确 public 输出例外。仅 Fake 请求，不安装依赖或启动服务；运行匹配单元/架构/输出测试及既有完整本地门禁。离线产物验证还须覆盖 local/preview 零出站，不能只验证源代码 helper。
2. **账户只读核查**：owner 提供公开统计站点 URL 后，按 006 第 14 节核对归属、精确 endpoint、免费适用性、Sessions/明细/维度、90 天保留、看板访问、地区与条款、导出/删除。只需公开地址，不接收凭据；未核定的生产值不写进配置。登录与后台修改不得从账户注册自动推导。
3. **受控真实验证**：先实例化独立测试环境与批准 origin、合成路径、pageview/三个事件的精确数量上限、停止条件、同窗口报表回查和仅本次记录的清理；没有这份执行包和真实写入授权就不请求 `/count`。测试环境不能是解除隔离的 public preview。未取得真实输入前不提供可运行的示例 endpoint 或伪造验证命令。
4. **M6/M7**：配置、公开 Privacy 与同一制品完成验证后，继续 clean-source QA、受保护预览及单独 production 启用；真实请求头/缓存/导航与报表需实证。GoatCounter 不产出本项目 RUM/p75，不关闭 Buttondown/Tally、托管或发布门禁。

若免费账户无法满足 006 的字段、次数和保留合同，或供应商要求付费，统计保持关闭并重新决定，不自动购买或切换。关闭发送、导出和删除是不同动作，退出必须记录实际完成范围；本节没有执行账户变更、真实写入、提交、推送或部署。

文档批验证：37 份 Markdown 的严格 UTF-8、相对链接、占位符扫描及 diff 空白检查通过；独立只读复审未发现本批阻塞项。差异限定上述八份文档；没有运行代码测试、构建、服务或真实供应商请求。U5 离线接线、账户与生产验证继续保持未完成。

### U5B 离线适配与 DOM 监听

owner 随后提供 `https://mythic-china.goatcounter.com/`。该地址是 owner 提供的账户准备信息；公开抓取未读到页面，不证明后台设置、保留或统计成功。本单元不访问 `/count` 或账户写接口，不修改真实运行配置，不启用生产统计。

本单元新增 `src/services/analytics-record.ts`（浏览器可用的严格事件/pageview 清洗）、`goatcounter-analytics.ts`（精确请求 mapping 与必需的注入 transport）及 `src/client/site-analytics.ts`（默认关闭的条件 DOM 监听）；`analytics.ts` 保留原 Schema/Fake 入口并复用轻量合同。监听读取既有 Story/Related 结构，无导入时副作用，页面暂不消费它；M6 才实现唯一本站 bootstrap、运行配置及制品验证。本次只同步 Privacy 未启用计划、隐私文案 oracle、供应商链接拒绝名单和匹配架构/单元测试，不放行实际输出脚本。

沿用本文固定 Node/Corepack/Path 身份门禁和 `format`、`check`、显式 origin 的 `build:public` → `build` 入口。定向测试入口为：

```powershell
& $mythicProjectCorepack pnpm run test tests/services/analytics-record.test.ts tests/services/goatcounter-analytics.test.ts tests/services/external-interactions.test.ts tests/services/article-reading-state.test.ts tests/client/site-analytics.test.ts tests/architecture/project-boundaries.test.ts tests/site/external-interactions-ui.test.ts tests/site/review-output-policy.test.mjs
```

所有 transport 均由测试 Fake 注入；不运行站点浏览器验收或本地服务，不发送真实 analytics 请求。检查范围含字段与来源文章清单、失败不假成功/不重试、hidden/BFCache 暂停与恢复、两种阅读顺序、Related 正常激活、cleanup，以及默认关闭/review/非生产 origin/未发布路径/自动化零调用。旧 37 文件文档批结果不覆盖本单元代码。

离线单元验证结果：定向 8 文件/256 测试、完整 check 的 33 文件/581 测试和 Astro 105 文件零诊断通过；随后显式 origin 的 public → review 构建及两套 verifier 通过，仍为 13 public HTML / 14 review HTML、112 Hero、10 字体和零客户端 JavaScript。独立只读审查未发现模块逻辑阻塞。内容/资产追溯、文化来源、图片与字体未变，非默认资产再生产不适用；请求结果不代表聚合已记录、可见时间/Story 分母与 BFCache 生命周期处保留必要职责说明。

读取 owner 提供的 GoatCounter 地址时，公开抓取未成功，本机浏览器导航亦超时；没有取得账户后台设置或请求/报表证据，不把它写成账户不存在或已验收。未启动本地服务、安装依赖、修改真实配置、发送统计事件、提交、推送或部署。真实 DOM/浏览器传输验收、M6 bootstrap/产物 fixture 与最终发布 QA 仍后置；本轮输出仅为未提交源码上的本地诊断。

### M6 analytics 页面接线（2026-09-09）

owner 提供 GoatCounter 设置截图并确认保存成功：90 天保留，八项采集维度全部关闭；已授权继续本地接线。账户行为未实证，设置证据详见 006。范围为 `src/site/analytics-configuration.ts`、`src/client/analytics-bootstrap.ts`、`src/client/site-analytics.ts` 的职责说明、`astro.config.mjs`、`src/layouts/SiteLayout.astro`、Privacy、脚本锁与输出/离线执行验证、匹配测试及 README/ARCHITECTURE/PRODUCT/001/006/011/013/REFERENCES。只修改构建代码中的关闭配置，不修改真实环境变量、账户或生产开关，不启动服务、发送真实请求、提交或部署。

沿用固定运行时、format/check 与显式 origin 的 public → review 构建。首次接线产物或 bootstrap 源变化时，原输出锁应拒绝未审 JS；只读检查实际 bundle 的唯一入口、全部源码依赖与无额外 import/chunk，再把精确路径和原始字节 SHA-256 登记到 `scripts/analytics-script.json`。该锁只表示受审脚本身份，不是发布 receipt；禁止由每次构建自动刷新。实际产物执行验证由 public verifier 强制调用，全部 fetch 注入 Fake，无浏览器/服务和真实网络。

匹配测试入口（按已存在的固定 Corepack 变量）：

```powershell
& $mythicProjectCorepack pnpm run test tests/client/analytics-bootstrap.test.ts tests/site/analytics-configuration.test.ts tests/site/analytics-output-policy.test.mjs tests/site/public-output-policy.test.mjs tests/site/public-assembly.test.ts tests/architecture/project-boundaries.test.ts tests/site/external-interactions-ui.test.ts tests/site/review-output-policy.test.mjs
```

完成标准：13 页 public 各引用同一份锁定 JS/配置；14 页 review 无脚本/配置；缺失、未知属性、错误来源/账户/路径、任意启用值、重复脚本、字节变化与额外 JS 均被拒绝或零调用；完整 check、两种构建及文档检查通过。实际请求头、网络可达性、报表回查和删除行为保留到受控联调；未提交源的检查不生成 clean-source receipt。

本单元完成记录：固定 Node/Corepack/pnpm 下，初次定向 8 文件/229 项测试通过；复审后收紧模拟 DOM 的 selector/属性匹配，并补微任务延迟写入负例，定向 2 文件/23 项通过；最终完整 check 为 36 文件/619 项测试、Astro 112 文件零诊断及 14 页 review/零 JS。public 构建为 13 HTML、2 XML、robots.txt、112 Hero、10 字体和一个关闭的 JS；原始产物的无网络执行通过。两次生成的 `/_astro/page.Di-gmpYO.js` 均为 6783 bytes，SHA-256 为 `1c53c7630c7ad1f4a5ce94730eaec261e3296319873b1faeefbc546ec4ecf71d`，精确锁已登记；最终保持 public → review 构建顺序。

构建初次因虚拟入口相对路径无法解析而失败，已改为 Vite 根路径导入；随后原零 JS oracle 按预期拦截新脚本，受审锁与精确例外接入后通过。ESLint 新发现可再生 public JS 被当源码扫描，`eslint.config.mjs` 只增加 `.local/public-build/**` 排除，产物仍受摘要和执行检查；没有削弱源文件检查或其他输出门禁。新增脚本工具使用明确 Node imports。内容、文化来源、Hero、字体、资产追溯/披露与 URL 未变；已有构建诊断通过，必要职责注释解释身份钉住、document 生命周期、失败关闭与受审产物执行。不适用新的内容/资产生产或视觉重构。未启动服务/浏览器、安装依赖、修改账户、发送真实统计、暂存、提交、推送或部署；没有 clean-source receipt。

### GoatCounter 四次受控真实验证（2026-09-09）

owner 对上一单元提出的受控真实联调回复“开始吧”，本次已获真实测试授权。目标是核对最小浏览器传输、四种 path mapping、报表接收及测试数据清理，不是生产启用或 M5 整体完成。仅更新本文和 006 的执行状态，在系统临时目录准备独立诊断工具；不改变站点代码、配置、allowlist、Privacy、服务、依赖、Git 或部署。既有未提交工作保留，HEAD 为 `190cbdde39811912c1761799962500fff33c9202`。

**身份与环境**：仅使用 owner 的 `https://mythic-china.goatcounter.com/`，目的端固定为 `https://mythic-china.goatcounter.com/count`。先在仅含该站点的已登录独立浏览器窗口确认账户、绑定域名、90 天/八项关闭/看板权限、当前报表时区以及 Settings → Manage Pageviews 入口。确认下表四个 path 均不存在后才能发送；如果已存在、设置不符、登录不可用或不能精确清理，停止发送，不换路径绕过。账户删除仅核查入口，不执行。

诊断页面路径为 `C:\Users\335086\AppData\Local\Temp\mythic-goatcounter-check-20260909.html`，只能从本机 `file:` 打开；无监听端口、外部脚本、字体、图片、存储、自动请求或重试。它独立于站点构建，只通过一次手动点击发送以下序列；`file:` 的不透明 Origin 通常为 `null`，须实际观察并保留其证据范围，不伪装为 Production。网站 local/review/preview 零请求与 production 默认关闭继续保持。工具文案明确成功 HTTP 响应不等于后台记数。

| 顺序 | `p` 解码值 | `e` | 全次请求上限 |
| --- | --- | --- | --- |
| 1 | `/explore/goatcounter-check-20260909/` | `false` | 1 |
| 2 | `article_session_qualified:/explore/goatcounter-check-20260909/` | `true` | 1 |
| 3 | `article_depth_75:/explore/goatcounter-check-20260909/` | `true` | 1 |
| 4 | `related_story_click:/explore/goatcounter-check-20260909/` | `true` | 1 |

**传输与停止**：严格 GET，只有 `p/e` query；复用当前 adapter 的 `mode: cors`、`credentials: omit`、空 referrer、`referrerPolicy: no-referrer`、`cache: no-store`、`keepalive: true`、`redirect: error`，无 body/自定义 header。浏览器仍会向该服务提供连接 IP、默认 User-Agent 和 Origin 等技术信息；测试不传读者数据。一次点击先禁用入口，依序发送；第一个 HTTP 失败、非 2xx、重定向或 15 秒内未取得可判定的传输结果即停止后续发送，不刷新重发，不更换 no-cors/像素方式。HTTP 2xx 可以继续本次序列，但后台聚合仍是未确认；不能用 adapter 对 2xx 返回的 `unknown-result` 作为传输失败条件。CORS/断连/超时也可能已被服务端接收，仍须回查和精确清理。显式停止按钮只阻止后续请求，已发出的不能撤回。页面按钮只在当前打开期间锁定；全次四次的预算由操作记录约束，不能因刷新、另开标签或重开文件重置。

**浏览器入口**：使用已连接的浏览器工具；若内置浏览器不可用，则使用 Computer Use 技能在独立 Edge 窗口打开上述本地文件。先开 Network 面板清空本次记录，再单次点击。记录实际 GET 数、脱敏后的 path/e、status/CORS、Cookie/Referer 是否缺失及 Origin；不导出可能包含登录凭据的整份 HAR。工具自身的 fetch 选项只证明请求意图，不代替 Network 证据。

**回查与退出**：记录账户时区及测试前后窗口，只读等待统计更新，核对四项各新增一次。HTTP 2xx/GIF 不作接收证明；没有出现时只刷新后台，不重发。普通 pageview 在后台可能去掉尾斜杠，事件内部路径则保留，须按实际四条 path 及 ID 精确对应。Settings → Manage Pageviews 只选择本次已确认的四个 path ID，不用全选或宽泛前缀；到最终不可恢复删除按钮时按工具规则取得当次确认，再删除并等待后台处理、刷新核对消失。未得到确认时保留精确待清理清单并停止，不能冒称闭环。

明细关闭时 CSV export 不可用，本次不为导出开启明细，也不创建 API token。聚合报表足以完成最小回查；如使用现有 JSON export，则只在仓库外保存并检查本次 path 与 aggregate，不导出无关数据。90 天实际历史清理、备份、完整退出、生产阅读触发与重复加载次数均不由本次四条 smoke 证明。官方依据：[更新频率](https://www.goatcounter.com/help/faq)、[CSV 限制](https://www.goatcounter.com/help/export)、[聚合 JSON](https://www.goatcounter.com/help/export-json)、[路径清理入口](https://github.com/arp242/goatcounter/issues/806)、[删除处理实现](https://raw.githubusercontent.com/arp242/goatcounter/main/handlers/settings.go)。

**进入状态**：内置浏览器清单无标签，打开专用 GoatCounter 标签超时；现有 Edge 窗口混有其他私人业务标签，自动审批拒绝读取其完整页面状态。已请 owner 新建仅含 GoatCounter 的独立窗口，不要求凭据或重复测试授权。在取得该窗口并完成先决核查前，真实请求计数为零。业务代码未变，不重复完整测试/构建；本文/006 使用既有文档验证和 diff 检查，临时工具须先以 Fake fetch 验证预算、停止和零自动请求。

随后 owner 已打开独立 GoatCounter 窗口；首次操作被 Esc 中断，恢复后工具因无法可靠确定浏览器 URL 而结束 Computer Use，未发送请求。owner 改为提供统计首页截图：日期范围为 2026-09-02 至 2026-09-09，页面显示 `No data received`、`0 out of 0 visits shown`、`0 visits`，示例代码中的端点为本次精确 `/count` 地址。该截图支持当前零数据基线，不是对示例供应商脚本的接入授权；报表时区和 Manage pageviews 精确清理入口仍待截图核对。先前 90 天/八项关闭及保存确认仍有效，不要求重复配置。

本次临时 HTML 与 `C:\Users\335086\AppData\Local\Temp\mythic-goatcounter-check-20260909-verify.mjs` 均仅为仓库外诊断材料。主代理创建前检查精确路径不存在；HTML 无外部资源，只允许目标 endpoint 连接，默认禁用发送，操作人须先核对零基线和清理入口。验证脚本读取该 HTML 的实际脚本字节并用 `node:vm` 注入 Fake DOM/fetch，覆盖加载零调用、前置条件、四次预算、重复点击、失败/超时停止及手动停止；同时对照当前 adapter 的请求选项。该检查无真实网络或浏览器：

```powershell
& 'D:\Program Files\nvm\v24.16.0\node.exe' 'C:\Users\335086\AppData\Local\Temp\mythic-goatcounter-check-20260909-verify.mjs'
```

临时工具验证通过后仍不自动打开或发送；先由 owner 提供 Manage pageviews 页面，再逐步操作 Network 面板和本地工具，完成真实请求及后台回查。当前不存在真实发送结果。

准备验证结果：固定 Node 下临时 HTML 的 10 项无网络执行场景通过，包含四个精确 `p/e` 与当前 adapter 请求选项逐项一致、前置条件、重复点击、非本地来源、HTTP 失败/网络失败/超时和手动停止。37 份 Markdown 严格 UTF-8、143 个相对链接、模板占位符与 diff 空白检查通过。仅本文/006 和仓库外两个临时文件在本轮修改，站点业务代码及既有未提交变更未动；暂存区为空。尚未在真实浏览器打开临时工具，没有真实请求、数据删除、提交、推送或部署。

### 四次收数回查结果（2026-09-09）

owner 先提供 Settings → Manage pageviews 截图，页面具有 Path 搜索以及按匹配路径移除/合并的管理入口，通配语法在 UI 可见；这证明入口可用，不证明执行删除。随后按指导自行使用临时 HTML，返回的结果截图显示已勾选零基线/清理入口确认框且按钮锁定；测试开始为 UTC `2026-09-09T01:34:18.232Z`（Asia/Shanghai 09:34:18.232），前节四个完整 `p/e` 各调用一次、均为 HTTP 200，本页累计四次。主代理未操作浏览器、重发或触发额外真实请求；本轮四次预算已耗尽，不能通过刷新或重开工具补测。

同次 owner 提供的 GoatCounter 首页截图，日期范围仍为 2026-09-02 至 2026-09-09，`No data received` 已消失，显示 `4 out of 4 visits shown` 与 `4 visits`：

| 工具请求与后台对应项 | 观察结果 | 证据范围 |
| --- | --- | --- |
| pageview，`e=false` | 工具 HTTP 200；后台 `/explore/goatcounter-check-20260909` 为 1 | 后台可见完整路径，普通页面尾斜杠被去掉 |
| `article_session_qualified`，`e=true` | 工具 HTTP 200；对应前缀行计数 1 且有 event 标记 | 工具显示完整合成路径；后台行的末尾被 UI 截断 |
| `article_depth_75`，`e=true` | 工具 HTTP 200；对应前缀行计数 1 且有 event 标记 | 同上，完整后台路径/ID 留给清理前核对 |
| `related_story_click`，`e=true` | 工具 HTTP 200；对应前缀行计数 1 且有 event 标记 | 同上，完整后台路径/ID 留给清理前核对 |

结论：已证明本次独立合成工具的浏览器可达性和四类请求对应的后台收数；不是仅凭 HTTP 200 判成功。总数包含一个 pageview 和三个事件，不代表四位访客，也未实证 Sessions 关闭后的重复加载计数、生产 origin、15 秒/75%/Related 阅读触发或发布制品。页面中 Referrer 等维度仍显示采集关闭，但这不能替代实际请求头核查；请求头的 Cookie/Referer 缺失、Origin、缓存/导航及账户时区均不能从这两张截图推断已通过。

当时剩余动作（执行结果由下一节替代）：保留现有 Network 记录，读取四个 `/count` 的请求 URL/query 和 Request Headers，不刷新或重新发送；若记录已丢失则把请求头检查列为未完成，不消耗新的写入预算。随后在 Manage pageviews 以 `%goatcounter-check-20260909%` 搜索，仅用结果定位，逐条核对四个完整 path 和实际 ID；不把通配搜索当删除范围、不删除其他路径。精确对象复核后才由 owner 确认并清理，刷新回查四条消失。没有删除证据时保留本次四条待清理，不关闭 U5。现有清理入口截图没有显示执行结果，因此未登记删除成功。

本轮只同步 README、本文及 006 的当前事实，不修改业务代码、临时工具、账户配置、生产开关、依赖、服务或 Git；沿用文档验证，不重复业务测试/build。此前准备与离线阶段的“零真实请求”保留其历史范围，以本节作为本次执行后状态。

### 四条测试统计清理收口（2026-09-09）

owner 表示已关闭 Network。本次四次请求预算已经用完，实际 Cookie/Referer/Origin、query、缓存等 Network 证据记为未验证，不通过重发补取，也不把工具代码或页面日志当请求头证据。

owner 随后在 Manage pageviews 搜索 `%goatcounter-check-20260909%`，截图完整显示下列四个结果，每项 `# of hits` 均为 1，未匹配其他记录：

- `/explore/goatcounter-check-20260909`
- `article_session_qualified:/explore/goatcounter-check-20260909/`
- `article_depth_75:/explore/goatcounter-check-20260909/`
- `related_story_click:/explore/goatcounter-check-20260909/`

四个完整路径已逐项对照前节合成清单，关闭此前后台事件后缀被截断的缺口。该 UI 没有显示内部 path ID；原执行计划中的 ID 核对改以完整路径、四项精确结果集及各 1 hit 确认，不声称取得 ID，不读取隐藏账户接口。搜索通配符只用于定位；本次删除对象经人工核对恰为这四项，无其他用户记录。

主代理说明 Delete pageviews 会不可恢复地删除这四项后，owner 自行执行并返回 Dashboard 截图：日期范围仍为 2026-09-02 至 2026-09-09，Filter paths 为空，Pages 显示 `0 out of 0 visits shown` / `Nothing to display`，Totals 为 `0 visits`。结合删除前四个精确路径和四次收数，确认本次测试聚合已从同范围无筛选报表消失，不仅是删除按钮受理提示。未取得内部 ID、后台清理任务日志或备份证据，不扩大为账户删除、90 天自动清理或底层存储/备份擦除验证。

本次结果为“独立合成发送 → 后台各收一次 → 精确路径清理 → 报表归零”完成。请求头仍是明确缺项，生产 origin、真实阅读触发、重复加载次数、导航/缓存、账户时区和完整处理/退出验证不由本次证明；站点 `isEnabled: false` 未变，M5/U5 整体和发布门禁保持。本次四次授权预算耗尽，临时 HTML/验证脚本留在系统临时目录作诊断材料，不再打开或执行发送入口；没有新增请求、服务、依赖、配置、Git 提交/推送或部署。

收尾仅修改 README、本文、006；图片和一次性日志不入库，未改内容/资产/业务代码，资产追溯与构建诊断无变化，故不重复业务测试或构建。验证沿用本文既有严格 UTF-8、相对链接、模板占位符与 diff 空白入口。

## Buttondown 账户与有限订阅验证（2026-09-09）

当前账户、设置与证据范围以 [006 第 12.8 节](docs/requirements/006-external-interactions.md#128-buttondown-账户与有限订阅验证2026-09-09) 为准。后台显示 Mythic China，newsletter slug 为 `mythicworld`；owner 提供的完整原生 form 只有 email，目标传输合同据此替代旧的固定 embed 字段计划。此前 U2 的历史执行记录不倒写，业务代码仍只有 provider-neutral DTO/Fake 与 inactive Footer。

- **已发生的手工操作**：owner 按指引用本人控制的一个测试邮箱从 `https://buttondown.com/mythicworld` 托管页操作订阅，先给出一行 Unactivated，再按确认邮件指引操作后给出同一行 Regular 截图。主代理未代填邮箱、调用真实接口、发送邮件或读取确认链接。本节按实际结果补记，不将事后截图称为已提前冻结的完整执行包。
- **证据限度**：当前观察到一条测试身份的状态转换；请求/邮件的具体数量、Network、邮件正文/头及嵌入 action/payload 未取证。Billing 仅展示升级提示和无发票。本站无可提交表单，本次也没有 localhost、preview、Vercel 或已部署页面的订阅测试。
- **后续最小范围**：先由 owner 查看已有邮件是否提供退订或管理订阅入口；[官方 Portal](https://docs.buttondown.com/portal) 也提供读者身份管理。对同一测试身份最多执行一次读者退订，回后台核对 Unsubscribed；该步骤尚未发生。若入口另需登录邮件、出现其他 newsletter/身份、收费、未知结果或错误，先停止并说明，不自行追加订阅、重发、API/import 或群发。
- **清理停点**：退订不等于删除。待实际菜单显示后，只核对本次测试身份的精确删除对象与提示，再按 owner 的清理决定操作；不批量删除。官方 [cleanup](https://docs.buttondown.com/subscriber-cleanup) 默认 soft delete，不能承诺底层或备份清空；目前未取得退订或清理证据。
- **验证与状态**：本批仅同步 README、006 与本文，不改变内容/资产/业务代码或构建诊断，不运行业务测试、构建、服务、依赖安装、Git 写操作或部署。37 份 Markdown 严格 UTF-8、145 个相对链接、零模板占位符与 diff 空白检查通过；暂存区为空。U4/M5 和本站接线继续开放，四次 GoatCounter 预算保持耗尽。

## Newsletter 默认关闭准备（2026-09-09）

owner 要求加快进度，本批直接推进 006 第 12.9 节的默认关闭本地准备。范围为 Newsletter 配置、Layout/Footer/NewsletterForm、局部表单样式、Vitest 的 Astro 内存渲染配置、匹配测试和状态文档；现行 public/review 输出门禁不放宽，Privacy 仍准确说明本站不接收订阅。没有新依赖、服务、真实请求、邮箱、Git 或发布操作。

沿本文固定 Node/Corepack 身份门禁运行；不重复安装。新增 `vitest.config.ts` 使用现有 `astro/config` 与 `astro/container` 的官方测试入口，`configFile: false` 避免加载站点运行配置或发布 hook，运行在 Node 内存，不开放监听端口。真实 action 只在隔离内存 HTML 中验证，fetch 陷阱使意外请求失败，测试不输出邮箱或确认链接。

```powershell
& $mythicProjectNode node_modules/prettier/bin/prettier.cjs --write src/site/newsletter-configuration.ts src/components/NewsletterForm.astro src/components/SiteFooter.astro src/layouts/SiteLayout.astro src/styles/global.css vitest.config.ts tests/site/newsletter-form.test.ts tests/site/external-interactions-ui.test.ts
& $mythicProjectCorepack pnpm run test tests/site/newsletter-form.test.ts tests/site/external-interactions-ui.test.ts tests/architecture/project-boundaries.test.ts
& $mythicProjectCorepack pnpm run check
& $mythicProjectCorepack pnpm run build:public
& $mythicProjectCorepack pnpm run build
```

public 构建必须沿本文 013 的显式批准 origin 入口执行，不能直接在无 origin 的 shell 运行上列 public 命令。定向格式化只列本批修改的源码与测试，文档检查沿既有入口。完成标准是两种真实产物仍无可提交 Newsletter、仅隔离内存可验证未来原生表单；未通过的账户、Portal/邮件退订、清理和发布门禁继续保留。

- 实施与验证：默认 false 配置、Layout/Footer 透传、仅 email 的原生表单分支及局部样式已完成。定向 3 文件/24 测试通过；完整 check 通过 Prettier、ESLint、37 文件/635 测试、Astro 115 文件零诊断与 14 页 review verifier。随后显式 origin 的 public → review 构建及各自输出 verifier 通过，仍为 13/14 页、112 Hero 与 10 字体；public 保留唯一摘要锁定的关闭分析脚本，review 零脚本，两种产物均没有可提交表单。
- 检查修正：真实 DOM oracle 要求完整 robots 声明，内存文档 wrapper 已补齐；Astro Container 的 Props 类型用展开后的属性对象匹配，未用断言绕过。当前 Corepack 布局未解析到 pnpm exec prettier，故定向格式化使用已安装的精确 Node 入口，不安装工具或重写其他文件。
- 配套与限制：内容、Source/Claim/Terminology、资产及披露未变；构建诊断保持零错误，代码在 review 隔离和测试配置不加载发布 hook 处解释职责，并由真实组件/门禁测试核验。没有启用表单的浏览器、键盘、网络、CAPTCHA、重复订阅或邮件实证，没有退订/清理、服务启动、依赖变更、Git 写操作或发布；本地通过只关闭本批准备，不关闭 U4/M5 或最终发布验收。

### 后续退订确认（2026-09-09）

owner 已明确确认本次测试身份的真实退订完成，该事实替代前两节的退订待办；不要求重做或补截图，不推断当前后台标签、退订入口、邮件数量或网络细节。测试记录删除仍未确认，后续仅处理该记录的精确清理，不新增订阅或邮件。

本次只同步 README、006、ARCHITECTURE 与本文的当前状态，代码、内容、资产和运行配置不变；验证沿既有文档 UTF-8、相对链接、占位符、差异空白及格式检查入口，不重复业务测试或构建。没有账户操作、服务、Git 写入或发布。

## Tally 草稿核对与受控验证准备（2026-09-09）

本批在保存项目 `F:\codex-project\mythic-china` 的既有 main 工作树继续，接手基线为 `190cbdd`，24 个已跟踪改动和 17 个未跟踪文件均保留，暂存区为空。owner 已提供 Draft 编辑页，要求沿用此前完成的字段名、3–240 长度和 Required/Hidden 配置，随后确认 Self 与 Respondent email notifications 均关闭；具体证据范围见 [006 第 12.10 节](docs/requirements/006-external-interactions.md#1210-tally-草稿配置确认2026-09-09)。不再重复索要已确认配置。

本批先同步 006 和本文并准备下列步骤；owner 随后提供发布链接，当前状态已窄同步 README 与 ARCHITECTURE。A 的预览显示由 owner 确认，B 的发布链接已提供且浏览器标签标题匹配，但完整公开页面核验未完成；C 的本轮最多 10 次提交尝试已获 owner 明确授权，当前已用 1/10，第 1 项未通过并暂停后续 9 项；删除另行确认。三阶段分别回报结果，不把前一阶段的通过当作后一阶段授权，也不接入尚未完成行为验证的站点链接。

### A. 编辑器预览显示核对

从已有草稿右上角 `Preview` 进入编辑器预览，保持 Draft；只观察以下三种状态，不点击 `Send suggestion`、不按 Enter 提交，不使用真实邮箱。演示邮箱使用不可投递的合成值 `reader@example.invalid`，只放入表单输入框，不放入 URL。

1. Email 空白时，完整 consent 标题和复选框均应隐藏。
2. 填入合成邮箱后，consent 应出现且保留必填标记；不勾选、不提交。
3. 清空邮箱后，完整 consent 应重新隐藏。结果一次用文字回报即可；只有异常时需要画面定位。

当前结果：首次预览图中 Email 空白，consent 文案和复选框仍可见。主代理给出完整题块默认 Hide、保留 required 和既有 `email Is not empty → Show emailConsent` 的修正及三状态复查指引后，owner 回复“可以了”。按该回复上下文确认 A 的“隐藏 → 出现 → 隐藏”显示检查通过，不重复索要截图；没有代理浏览器复验，不推断 owner 的具体菜单动作，也不证明实际提交校验或数据保存。

以上仅核对条件显示，不证明未同意时阻止提交、隐藏 required 字段不会阻塞、长度校验或旧 consent 值清除。官方说明可用 Preview 检查显示/Email 校验，但本次未找到“Preview 提交不保存且不发邮件”的明确保证，不能把预览按钮当零写入沙箱；如现场出现验证邮件、验证码、收费或意外跳转即停下，不继续操作。

### B. 发布草稿并取得真实链接

仅发布当前 `Mythic China — Reader Request` 草稿一次，影响是建立可由持链接者访问的 Tally 托管表单，不等于网站部署。发布后从该表单 Share 页取得精确 HTTPS URL，核对表单身份；此阶段不提交，不公开推广链接，不改变 Newsletter、Analytics 或站点代码。URL 只允许追加已 published 的稳定 `pageId=zhong-kui`，不带邮箱、建议或同意值。发布结果不明时只读核查，不重复点击。

当前结果：owner 按上述步骤提供 [Tally 托管表单](https://tally.so/r/2E6gdj)，据此记录由 owner 完成发布。代理公开网页读取失败，浏览器打开超时后的标签清单显示精确 URL 和 `Mythic China — Reader Request` 标题；完整页面读取仍超时，尚未独立核验公开字段与 pageId 传递。未填写数据或提交，不重新发布。后续测试入口为 [携带已发布 pageId 的表单](https://tally.so/r/2E6gdj?pageId=zhong-kui)，该 query 只表示预填意图，不证明供应商已正确接收或保存。

### C. 真实提交与精确清理（初轮历史；后续由文末编辑前审核流程替代）

测试前 owner 已确认该表单 Submissions 为 0、Trash 为空，并沿用上次 Buttondown 那个本人控制的测试邮箱；地址不用发给代理，也不保存到仓库。owner 已明确回复“授权”，批准本轮最多 10 次提交尝试；当前已用 1/10，第 1 项未通过并暂停后续 9 项，删除另行确认。代理恢复浏览器连接仍超时，未填写或激活提交，按既定方案由 owner 在现有浏览器逐项操作，代理判断结果并累计次数；首次提交前在上述精确测试入口确认实际标题和字段仍匹配已核对表单。真实邮箱只在第 5、9、10 项由 owner 填入，其余不填邮箱。Self/Respondent 通知保持关闭，无新集成、邮件验证或营销订阅。用户可随时中止，停止后只核对已经发生的结果与精确清理对象。

下表是初轮行为方案，最多 **10 次提交按钮激活，每项一次**；键盘提交同样计数，不自动重试，不以“预计拒绝”排除预算。按顺序完成，每次等待明确结果并回查记录；任一结果与预期不符、出现重复记录、未知结果、限流、验证码、邮件或其他状态变化，立即停止后续项。预期共有 5 次接受；该预期不是对实际落库数量的保证。

| 项 | 合成建议与邮箱状态 | 合同期望 |
| --- | --- | --- |
| 1 | 三个普通空格，无邮箱 | 拒绝空白建议 |
| 2 | ` ab `，无邮箱 | trim 后 2 code point，拒绝 |
| 3 | `😀😀`，无邮箱 | 2 code point，拒绝，区分 UTF-16 单元计数 |
| 4 | 241 个 ASCII `a`，无邮箱 | 超过上限，拒绝 |
| 5 | `MC Tally consent check`，测试邮箱，未勾选同意 | 拒绝 |
| 6 | ` abc `，无邮箱 | 接受；检查供应商保存原值与内部 trim 规则的差别 |
| 7 | 239 个 ASCII `a` 后接一个 `😀`，无邮箱 | 240 code point，接受 |
| 8 | `e`、组合重音 U+0301、`a` 三个 code point，无邮箱 | 接受，区分字素簇计数 |
| 9 | `MC Tally reply check`，测试邮箱，明确勾选同意 | 接受，仅用于建议跟进 |
| 10 | `MC Tally cleared email check`；先填邮箱并勾选，再清空邮箱 | 接受；核对没有残留邮箱或孤立 consent |

**当前实测结果：第 1 项未通过，已用 1/10，后续 9 项暂停。** owner 在三个普通空格、无邮箱的操作指引后提供后台截图，显示 All 1 / Completed 1 / Partial 0；唯一行时间原样为 `Sep 9, 03:09 PM`，`pageId=zhong-kui`，requestedTopic 视觉空白，email/emailConsent 为 `-`。这支持首项输入已进入供应商记录，而非按合同拒绝；不从表格空白推断原始字符串或 null，不从 `-` 推断 null/false，不转换未核实的时区。Submission ID、记录详情和原始 payload 等尚未核对。保留唯一记录，先只读识别与核查可行修复；不继续下一项、不重试、不提高最小长度来冒充 trim 修复，也不以事后删除替代接收合同。剩余预算不自动解除异常停止条件；本轮没有重新提交、修改后台配置或删除。

每条实际记录用 submission ID、提交时间和精确内容对应到当次操作，核对 `pageId`、建议、邮箱/同意的保存值、供应商生成标识和成功页。不得只凭感谢页判定记录正确；原始 payload、浏览器存储和邮件行为未取证时明确保留缺项，不把本轮通过写成服务端防绕过、完整故障/无障碍或 U4 整体验收。

完成或中止后先只读列出本次实际产生的精确记录，再按 owner 对这些对象的授权移入 Trash；回查活动列表。永久删除须先核对 Trash 的实际作用域与完整对象，再在当次确认后执行并回查。若 Empty Trash 会影响其他表单或非本次数据，不清空；不以清理测试数据为由删除范围外内容。不得把供应商记录删除写成浏览器 Respondent ID 或备份已清除。

### 本批状态与验证

owner 配置确认保留，A 的三状态显示检查已由 owner 确认通过；B 的发布链接已取得，代理只观察到浏览器标签 URL/标题匹配，完整页面核验未完成；C 的测试前零记录/空 Trash/测试邮箱归属已由 owner 确认，并已明确授权本轮最多 10 次提交尝试，当前已用 1/10，第 1 项未通过并暂停后续 9 项，删除另行确认。当前仅同步 006、本文、README、ARCHITECTURE 和 CONTENT_MODEL 的 Tally 状态；业务代码、内容/资产及披露、构建期诊断和关键代码职责说明均不适用，不重复业务测试或构建。文档检查沿本文既有 UTF-8、相对链接、模板占位符和差异空白入口；准备批的独立审查不代替实际供应商行为证据。代理未启动服务、操作账户、发布草稿、填写/提交表单、发送邮件、删除记录、执行 Git 写操作或部署。

官方依据（访问于 2026-09-09）：[预览与跳转边界](https://tally.so/help/redirect-on-completion)、[Email 校验](https://tally.so/help/email)、[隐藏字段与真实 Share 链接](https://tally.so/help/hidden-fields)、[删除与 Trash](https://tally.so/help/how-to-delete-and-recover-form-data)。公开说明不替代上述现场回查。

## Reader Request 编辑前离线审核（2026-09-09）

owner 已确认“先收集、编辑前严格筛选”，对应 [006 第 12.11 节](docs/requirements/006-external-interactions.md#1211-原始建议与编辑前严格筛选2026-09-09)。此前 C 的第 1 项保留为旧提交前拒绝要求下的失败；详情截图仍只有视觉空白和 `-`，没有 Submission ID，不再要求重复截图。首项后已有 1 条原始 Completed；当前真实提交累计 3/10，原第 5 项被拦住且当时 Completed 仍为 1；随后原第 6 项匿名 abc 建议写入，当前 Completed 为 2。下列流程替代旧 C 的后续执行顺序和文本拒绝预期；既有数据范围、同一 owner 邮箱、通知关闭、异常停点及删除逐次确认继续适用。

### 人工处理边界

1. hyc 在 Tally 核对本次来源记录和输入原值，明确 pageId、建议、邮箱与同意；界面不明或只有 `-` 时先核对，不猜测底层字段。Tally 原始导出不直接作为本工具输入，也不自动变成内部 Record。
2. 只映射 `pageId`、`requestedTopic` 和可选的 `email` / `emailConsent`。二者确认都没有时可以同时省略；明确空邮箱与不同意映射为 null/false；非空邮箱必须有本次建议的明确 true。同意不明不得补成 true。禁止把 Respondent ID、后台时间或 Submission ID 加入 Submission 输入；这些由来源核对独立处理。
3. 执行下面的本地入口。脚本从当前 Entry 的 frontmatter/Schema 读取 status 为 published 的 ID，且 ID 必须匹配文件名；这不是对线上部署状态的证明。配置与内容无效时停止，不采用历史名单或将输入 pageId 自动加入名单。
4. `eligible-for-editorial-review` 仅表示输入字段合格，可进一步人工判断选题；`rejected` 不进入有效建议或排期。创建内部 Record 前还须核实来源 ID/时间及同意证据，不把本工具当身份认证、自动导入或自动发布。保留和清理遵循已有运营规则；本次唯一测试记录仍需精确对象授权后清理。

有效建议仍须 trim 后为 3–240 Unicode code point；空白、两个 emoji、组合字符和长度越界均由既有 validator 检查，不靠肉眼数数。Tally 原生 Required/3–240 设置保留；它的原始字符计数和接受/拒绝不再代表内部严格校验。非空邮箱的明确同意仍须在 Tally 提交前阻断，不能用编辑前筛选替代。

### 本地运行入口

使用保存项目的固定 Node，输入只经 stdin 进入进程；不要把真实 JSON 放进命令参数、脚本、仓库、测试、日志或粘贴到任务消息中。下面示例只描述输入形状，实际值由 hyc 在本机输入：

```json
{"pageId":"zhong-kui","requestedTopic":"A synthetic suggestion"}
```

```powershell
$readerReviewRoot = (Resolve-Path -LiteralPath '.').Path
$readerReviewNode = 'D:\Program Files\nvm\v24.16.0\node.exe'
if ($readerReviewRoot -ne 'F:\codex-project\mythic-china') { throw 'Unexpected workspace.' }
if ((& $readerReviewNode --version) -ne 'v24.16.0') { throw 'Unexpected Node runtime.' }
$readerReviewInput = Read-Host '粘贴一条明确映射后的 JSON'
$readerReviewInput | & $readerReviewNode scripts/review-reader-request.mjs
$readerReviewExit = $LASTEXITCODE
$readerReviewInput = $null
```

输入可能在本机终端显示，应在个人受控终端操作，不录制或分享含真实数据的终端画面。脚本自身不写文件、不联网，不输出原文、邮箱或供应商 ID，只输出状态、trim 后字符数和无效字段名。退出码 0 为字段通过，1 为拒绝，2 为输入/运行/内容错误；任何错误结果不得进入编辑流程。当前工具只实现人工调用，尚未自动接通真实 Tally 数据。

### 修订后的真实测试

文本边界改用本地合成测试验证。旧 C 的第 2、3、4、7、8 项不再向 Tally 提交；不重做第 1 项。保留原第 5、6、9、10 项各一次，仍使用同一个测试 URL 和邮箱，新增最多 4 次，预计全轮累计 5 次激活，始终不超过已经授权的 10 次。未用预算不用于自动重试或新用例。

| 顺序 | 原用例 | 操作 | 预期 |
| --- | --- | --- | --- |
| 已通过（累计第 2 次） | 5 | `MC Tally consent check`，本人测试邮箱，不勾选同意 | 表单因未同意而阻止；Completed 仍为 1。其他字段报错不能替代同意验收 |
| 已接收（累计第 3 次） | 6 | ` abc `，无邮箱 | 接受原始建议；后台回查后在本地审核通过，trim 后为 3 code point |
| 已暂停，未执行 | 9 | `MC Tally reply check`，本人测试邮箱，明确同意 | 原预期：接受；实际记录的邮箱与本次同意对应，不触发 newsletter |
| 已暂停，未执行 | 10 | `MC Tally cleared email check`，先填邮箱并同意，再清空邮箱 | 原预期：接受；检查没有残留邮箱或孤立同意 |

第 2 次 owner 回报：填写邮箱、不勾选同意并点击 Send suggestion 后提交不了，随后刷新后台确认 Completed 仍为 1。按操作上下文与回查记录该项通过，累计仍为 2/10；未独立取得具体提示或原始请求，不作为服务端防绕过证据。随后执行原第 6 项，结果见下；不重做邮箱未同意项。

第 3 次后台回查：owner 截图显示 All 2 / Completed 2 / Partial 0；新增行显示 `Sep 9, 03:57 PM`、`pageId=zhong-kui`、建议 `abc`，email 视觉空白、emailConsent 为 `-`。确认匿名建议新增一条，累计 3/10；保存的首尾空格、底层空值和感谢页尚未单独验证。同一合成输入的离线严格校验已通过，不能替代原始 payload。下一项为原第 9 项：`MC Tally reply check`、本人测试邮箱、明确勾选同意后只提交一次；预期感谢页与 Completed 增至 3，回查该记录邮箱及同意，真实地址不发给代理。

正常情况下预计新增 3 条原始记录，加已有无效空白共 4 条；这只是预期。每项只点一次并等待明确结果，回查实际条数。非预期阻断、未经同意的邮箱被保存、重复/未知结果、验证码、限流或邮件均立即停止。清理仍先列出当时精确对象并另行确认，不清空范围外数据。本地测试通过才进入上述下一项，不从本地结果推导 Tally 已通过。

### 本批修改与验证入口

新增离线脚本与 `tests/editorial/reader-request-review.test.mjs`；现有 validator 与 content Schema 各补一个 `.ts` 导入扩展名，使固定 Node 直接运行，并同步架构导入清单。规则、Schema 值域、站点 UI、运行配置、依赖及服务均不变。相关文档范围为 README、本文、006、CONTENT_MODEL 与 ARCHITECTURE；文化内容、资产追溯与公开披露不受本次离线入口影响，无新数据接收方，故无需修改公开 Privacy。脚本明确说明不回显错误消息的原因，构建期诊断沿既有 check 验证。

在本文既有固定 Node/Corepack/PATH 身份门禁通过后执行：

```powershell
& $mythicProjectCorepack pnpm exec prettier --write scripts/review-reader-request.mjs tests/editorial/reader-request-review.test.mjs
& $mythicProjectCorepack pnpm run test tests/editorial/reader-request-review.test.mjs tests/services/external-interactions.test.ts tests/architecture/project-boundaries.test.ts
& $mythicProjectCorepack pnpm run check
```

文档沿既有严格 UTF-8、相对链接、占位符和 diff 空白入口检查。仅使用合成数据验证，本批不提交真实表单、不删除记录、不执行 Git 写入或部署；本地结果不构成 M5 整体验收或发布凭证。定向 3 文件/47 项通过；完整 check 首次因缺少显式 Node 导入被 ESLint 阻止，补齐后完整通过 Prettier、ESLint、38 文件/655 项测试、Astro 117 文件零诊断，以及 14 页 review build/output verifier。脚本子进程实测三个空格拒绝、trim 后为 0；本地内容清单与输出脱敏也通过。未重跑 public 构建或浏览器，真实数据审核、Tally 后续用例和清理仍未完成。

本次宿主同时向 Node 传入 `PATH` 与 `Path`，导致 `pnpm exec` 无法解析已安装的 Prettier。若当前会话只读核查仍有该现象，可使用以下等价 Corepack 入口，仅为验证子进程保留单一 PATH；不改系统环境、项目配置或依赖：

```powershell
$readerVerifyScript = @'
const { spawnSync } = require('node:child_process');
const { dirname, join } = require('node:path');
const runtime = dirname(process.execPath);
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.toLowerCase() !== 'path'));
env.PATH = runtime + ';' + (process.env.Path || process.env.PATH);
env.ASTRO_TELEMETRY_DISABLED = '1';
const commands = [
  ['pnpm', 'exec', 'prettier', '--write', 'scripts/review-reader-request.mjs', 'tests/editorial/reader-request-review.test.mjs'],
  ['pnpm', 'run', 'test', 'tests/editorial/reader-request-review.test.mjs', 'tests/services/external-interactions.test.ts', 'tests/architecture/project-boundaries.test.ts'],
  ['pnpm', 'run', 'check'],
];
for (const args of commands) {
  const result = spawnSync(process.execPath, [join(runtime, 'node_modules/corepack/dist/corepack.js'), ...args], { env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
'@
& 'D:\Program Files\nvm\v24.16.0\node.exe' -e $readerVerifyScript
```

本批本地结果：完整 check 41 文件/698 项测试，Astro 128 文件零 error/warning/hint；review 14 页零 JS 通过。首次 public 因新 bundle 被旧锁拒绝，检查唯一无 import/export 的 7,172-byte `/_astro/page.Br3bZ4bz.js` 后手动登记 SHA256 `eabde04719862a9f6c0665f614f3cd416ad1984a24d4a652757899512d4fcadf`，public verifier 与原始脚本 Fake VM 通过，再回到 review 构建通过。隐私链接仅允许 Privacy 页 analytics-hosting 内的精确官方政策地址，没有开放统计/表单入口。原 140 文件包 SHA256 先核对，再逐文件比较：126 文件完全相同，13 HTML 及唯一 JS 变化；非 Privacy HTML 去除开关/脚本引用与此前 Hero sizes 后均与原文相同。候选共 3,278,559 bytes。内容/来源、图片/字体、alt/图注/AI 披露未变，退出生命周期职责已写在代码边界并有回归。Preferences 时区为 Asia/Shanghai；本轮真实 count 发送为零，未做任何账户写入、Git 提交/推送或部署。

下一步具体停点：当前原始制品可供审查，但不能由 dirty source 创建发布。拟先取得一次本地检查点提交授权，保存已有 Hero/RUM 本地交付与本轮启用准备，再按同一 source 重新验证。真实请求层验收需要用户明确允许独立临时 Edge/CDP（不读取已有浏览器资料），现有内置浏览器只提供 DOM/页面控制，没有 Network/HAR。运行方案须先限定仅本站公开内容与 GoatCounter endpoint、实际环境、次数、停止与后续回查；不因本文计划启动浏览器/服务、伪造正式源身份、重放旧四次工具或删除真实文章路径统计。生产启用发布意图已获确认，不重复询问该意图；尚缺的本地提交与浏览器技术方式授权分别处理。
本轮最后复核：38 份 Markdown 严格 UTF-8、186 个相对链接及 diff 空白检查通过；脚本锁更新后的匹配输出测试 30 项通过，独立只读审查无阻塞发现。正式首页匿名 GET 为 200，仍引用原 `page.Di-gmpYO.js` 且 analytics meta 为 false；仅读取 HTML，没有运行页面或发送 count。暂存区为空，Git/发布状态保持未执行。
