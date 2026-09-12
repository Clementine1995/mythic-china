# 013 本地 public artifact assembly

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

## 职责、状态与开发就绪

2026-09-09 首发范围以 [011](011-public-beta-validation.md) 的阅读版更新为准：既有 inactive 表单和关闭的统计就是本次候选的预期状态，真实供应商接线留到未来启用。当天从当前工作树重建 public，通过 Astro 117 文件零诊断、13 页及全部资源/链接/metadata/关闭脚本校验；此结果仍是本地诊断，不替代 clean-source 最终 QA。

本文负责 M6 的显式 origin、published-only 页面、metadata、静态发现文件和独立输出校验；承接 003 的 public 纯 builder，不关闭 011 的生产门禁。

- 需求：已确认；用户在建立空项目和域名后授权继续本地部署准备。
- 实施：本地 assembly 已完成；验证：定向、完整 check、public 构建与模式切换通过；发布：未发布。
- 基线：2026-09-08，保存项目 `F:\codex-project\mythic-china`，`main` / HEAD / 本地 origin/main 均为 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd`，工作树与暂存区干净。未 fetch 或查询远端 Git。
- 账户事实：用户确认个人管理的 Hobby 账号；用户界面截图显示空项目 `project-scu6m`，Production 域名 `mythic-china-beta.vercel.app`，状态 `No Deployment`。未核验平台内部 project/team ID、预览保护或线上访问。
- 本地 origin：显式 `MYTHIC_CHINA_SITE_ORIGIN=https://mythic-china-beta.vercel.app`；不读取 Vercel 临时 URL、不设置默认 origin，不安装 CLI。
- 本地 assembly 的待确认项：无。Beta 文案与位置已在后续本地单元获批准，合同见 011；hosting Privacy 已由 016 补充条件式说明；真实供应商接线、最终 QA、实际托管配置和发布身份仍属后续门禁。

## 目标与边界

在本地生成真实 6 篇 Entry、2 个 Collection、5 个静态页及 Sitemap、RSS、robots.txt。所有页面仍使用既有内容、来源、术语、Hero 和字体；新增可见 Published 日期与现有编辑署名对应 Article metadata。首页最初沿用阴间 Collection / Zhong Kui 组合；014 扩展为两个明确 published 的阴间与聊斋合集入口，保留阴间与 Zhong Kui 的 Featured 关系校验，不从 review 选择器继承草稿例外。

不修改内容状态/目标日期、文化正文、资产、字体或供应商合同，不安装依赖、不运行服务、不执行真实写入、Git 写或远端部署。本批结果为未提交源上的 **nondeployable 本地诊断制品**；技术 public intent 不代表经过发布验收或允许上传。

## 技术合同

1. 默认 `build/check/dev/preview` 保持 review，输出 `dist/`，14 页 noindex、无 canonical/OG/JSON-LD/XML。新增 `build:public` 只做本地 check/build/verifier，输出 `.local/public-build/`；public runner 不接受服务命令或透传参数，拒绝不兼容 intent、缺失或非法 origin。
2. origin 仍由既有 `createPublicSite` 校验。部署平台中立，不将截图名称写成 API 身份，也不隐式连接 Git。
3. public 路由只消费 published projection，缺少必要首页或 Collection 成员、metadata 重复/缺失、无有效 Entry/Collection 均失败；无草稿 fallback。
4. Sitemap 含五个固定页与 6/2 published 内容；RSS 只含六篇 Entry，排序及日期沿用现有纯合同；robots.txt 允许抓取并引用同源 Sitemap。全部只在 public intent 下注入静态 endpoint。
5. 字体样张移到 `src/review/type-specimen.astro`，仅在 review intent 注入原 URL `/review/type-specimen/`；public 不包含样张 HTML、链接或专用 CSS，不做构建后删文件。
6. 独立 output verifier 核对精确 HTML/XML/TXT inventory、canonical/OG/JSON-LD、可见署名/日期、XML 与 HTML 身份一致、链接/fragment、资源存在性、固定字体哈希和 CJK。2026-09-09 的 M6 analytics 接线只新增一个由 exact href + SHA-256 锁定的本站 bootstrap 与严格静态配置，默认关闭、零供应商请求；禁止其他执行脚本、额外 chunks 或动态 import。review 仍为零脚本；public 保留已验证 metadata 与非执行 JSON-LD。实际产物必须通过独立、无网络的执行 fixture，启用与真实联调后置。
7. Newsletter/Reader Request 按后续 016 保持 inactive 静态说明，无输入/按钮/form/action/transport。Privacy 同步实际准备状态并补充条件式 Vercel 托管说明；本地核验不证明账户配置、供应商联调或生产接线已完成。Beta 提示按 011 的批准文案与位置实施，不以本批输出替代完整发布候选。

## 修改位置与实施单元

- 构建：`package.json`、`astro.config.mjs`、`src/site/build-intent.ts`、`src/site/public-site.ts` 的已确认 origin 门禁、`src/site/page-projection.ts`、`src/site/public-assembly.ts`、`src/site/load-public-assembly.ts`、`scripts/run-public-astro.mjs`。
- 页面：`src/pages/index.astro`、`src/pages/explore/[slug].astro`、`src/pages/explore/index.astro`、`src/pages/collections/[slug].astro`、`src/pages/collections/index.astro`、`src/layouts/SiteLayout.astro`、`src/templates/EntryTemplate.astro`；移动样张至 `src/review/type-specimen.astro`；新增 `src/site/endpoints/sitemap.xml.ts`、`rss.xml.ts`、`robots.txt.ts`。
- 未启用服务文案：`src/components/NewsletterForm.astro`、`src/components/ReaderRequest.astro`、`src/pages/privacy.astro`。
- 检查：`scripts/review-output-policy.mjs` 的共享安全内核、`scripts/public-output-policy.mjs`、`scripts/verify-public-output.mjs`、`tests/site/build-intent.test.ts`、`tests/site/public-assembly.test.ts`、`tests/site/public-output-policy.test.mjs`、`tests/site/public-runner.test.mjs`。另将原 review verifier 的逐页 Hero 门禁原样提取到 `scripts/hero-output-policy.mjs`，由 `scripts/verify-m4-u2-output.mjs` 和 public verifier 共用，避免降低 public 图片与披露检查标准。
- 说明：本文、README、DEV_WORKFLOW、ARCHITECTURE、003、011 及 REFERENCES 同步本批职责范围和来源，不重写历史授权。

先接线纯 projection/assembly 与 intent，再接入页面和 endpoint，最后独立 output verifier、负例与两种真实构建回归。全部由主代理修改；子代理只读审查。

## 验证与停止条件

命令唯一来源为 [DEV_WORKFLOW](../../DEV_WORKFLOW.md)。运行定向纯函数/输出污染/runner 负例、完整 review `check`、显式真实 origin 的 `build:public`、Markdown UTF-8/链接/占位符与 Git diff 检查。

缺少/非法 origin、非 published 路由、评审样张泄漏、metadata/资源不一致或任何检查失败时修正后重验；不通过更换运行时、依赖或削弱门禁绕过。所有验证隔离网络和真实用户数据。没有服务、浏览器或 Git 写授权，因此不生成 clean-source receipt，不把静态检查写成视觉/平台/线上通过。

## 来源

- [Astro static file endpoints](https://docs.astro.build/en/guides/endpoints/)，2026-09-08，构建期静态文件。
- [Astro injectRoute](https://docs.astro.build/en/reference/integrations-reference/#injectroute-option)，2026-09-08，按 intent 注入路由；已交叉核对本地 Astro 7.2.8。
- [Astro outDir](https://docs.astro.build/en/reference/configuration-reference/#outdir)，2026-09-08，review/public 独立输出目录。

## 本批结果

2026-09-08，本地 assembly 完成并通过以下检查：

- 定向四文件 42 项测试通过；完整 `check` 通过 Prettier、ESLint、29 文件/498 项测试及 Astro 96 文件零 error/warning/hint。
- 默认 review 生成 14 页、112 个 Hero 响应式图片和 10 个字体，通过原 noindex、零 XML/客户端 JavaScript、导航、关系、Content note、字体/CJK、图片归属与披露门禁。
- 实际 origin 下 `build:public` 生成 13 页、2 XML、robots.txt、112 个 Hero 图片和 10 个字体；独立 verifier 通过 metadata/Article 日期/ItemList、XML 与可见身份、内部链接与 fragment、资源闭合、实际 stylesheet、字体哈希/CJK、逐页 Hero 与无可执行脚本检查。public 不含字体样张或其 CSS。
- 已按 review → public → review 顺序实际构建，最后 review 仍为 14 页 noindex，未混入 public 发现文件。
- 34 份 Markdown 的严格 UTF-8 与相对链接通过；模板占位符扫描无匹配，Git diff 无空白错误。暂存区为空，内容/资产/字体/锁文件没有差异。
- 负例覆盖错误 origin/runner 使用、非 published 首页与 Collection 成员、缺失/重复 metadata、额外或错误大小写发现标签、可执行脚本、JSON-LD 外部资源/事件、表单、远程资源、额外 inventory 和 XML URL/日期漂移。独立代码审查发现的大小写、stylesheet 和 Hero 检查差异已修复。
- 文化正文、内容/资产/字体记录、锁文件与依赖未变化；既有 Schema/内容图/视觉图与构建诊断保持。新增 why 注释集中解释独立 public 首页、显式 origin、按 intent 路由注入与独立输出 oracle；没有供应商传输或数据写入。

输出仅是未提交源上的 nondeployable 本地诊断。未启动服务或浏览器，未完成最终视觉/无障碍/性能/跨平台 QA，未生成 clean-source receipt，未提交、推送或部署。Beta 提示的后续批准与实施见下节；hosting Privacy、M5 外部服务、favicon 以及完整发布候选仍待对应后续单元；此处不将本地 assembly 完成写成 M6/M7 或正式 MVP 完成。

## 全站 Beta 页脚提示

2026-09-08，owner 批准 011 的英文原文与全站页脚位置，并授权本地实施。`SiteLayout` 将现有 public intent 作为必填布尔 prop 传给 `SiteFooter`；public 每页在品牌名称后输出一个静态段落，review（含字体样张）不输出。复用已有样式，无新增依赖、配置、服务或数据收集。

验收由现有两个 output verifier 随构建执行：public 检查每页唯一提示、精确原文、段落语义、页脚归属及提示/祖先没有隐藏属性或内联样式；review 拒绝该提示。两种构建保持既有页面清单、metadata、内容/资产披露和零可执行脚本门禁。简单呈现变更直接验证真实构建输出，不添加镜像文案的单元测试；最终视觉、对比度和键盘验收仍由 M6 候选 QA 负责。

本地实施与验证已完成：固定 Node 24.16.0 / Corepack 0.35.0 / pnpm 11.22.0 下，格式化、ESLint、public 与 review 构建通过，Astro 两次均为 96 文件零诊断；public 13 页各有一条批准提示，review 14 页均无提示，原有资源和内容输出门禁均通过。未重跑此前 assembly 的 498 项单元测试。34 份 Markdown 的 UTF-8/相对链接/占位符与差异检查通过。

本次只增加 UI 阶段提示，不含文化陈述或新资产，文化来源、资产追溯和披露无变更；既有构建诊断继续通过。组件职责由必填 prop 和现有 intent 表达，无需额外解释性注释。独立只读审查未发现代码问题；发现的过时交接文案已同步。正文、图片、字体、CSS 与依赖均未变化。改动未提交、暂存区为空；没有服务、浏览器、真实写入、推送或部署，输出继续是 nondeployable 本地诊断，最终显示验收未完成。

## 默认关闭的 analytics 接线（2026-09-09）

owner 确认 GoatCounter 设置保存成功并授权下一步，本地 public 现包含唯一本站 bootstrap 与一份严格静态配置；配置从已验证 site/published assembly 生成并固定关闭。客户端独立钉住生产 origin 和精确账户，WeakSet 只管理 document 生命周期；review 不输出脚本或配置，正文、来源、导航及图片保持静态。

`scripts/analytics-script.json` 锁定 `/_astro/page.Di-gmpYO.js` 的原始字节摘要；public verifier 逐页检查唯一模块/配置和精确库存，确认无额外 JS/import/chunk，再在无网络 VM 中运行未经修改的真实脚本。覆盖 13 路由 pageview、三事件、默认关闭/非生产/错误配置、自动化、正常与中键 Related 激活、失败不重试以及微任务延迟写入拒绝。两次真实构建的文件名与摘要一致。完整 check 36 文件/619 测试、Astro 112 文件零诊断通过；public 13 页/一个关闭脚本与 review 14 页/零脚本均通过，112 Hero/10 字体不变。

Privacy 已同步账户的 90 天与额外维度关闭，以及实际清理/处理未验收边界。内容/资产、依赖与锁文件未变，必要职责注释及既有构建诊断保持。实际浏览器、请求头/缓存/导航、报表回查/清理、最终 QA 和生产启用仍未验收；未启动服务、发送请求、提交或部署，本次无发布 receipt。源差异与命令以 DEV_WORKFLOW 对应小节为准。

实现依据：[Astro injectScript](https://docs.astro.build/en/reference/integrations-reference/#injectscript-option) 与 [客户端脚本处理](https://docs.astro.build/en/guides/client-side-scripts/)，访问于 2026-09-09，并核对锁定 Astro 7.2.8 的 `astro:scripts/page.js` 客户端入口；该独立入口不依赖组件条件渲染来消除 review 脚本。
