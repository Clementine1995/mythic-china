# 014 出版版面与视觉节奏调整

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

## 目标、授权与边界

2026-09-08，owner 要求独立复核整体美观和原有竞品，不以 `design-taste-frontend` 的通用规则代替设计判断，并授权在结论一致时落实上一轮重点建议。本轮复核维持中性文化出版母体、独立插画和统一阅读器，调整首页、两个目录及六篇文章首屏。owner 另行授权临时本地预览、浏览器检查及结束后关闭；不含 Git 写操作或远端发布。

目标是更清晰的画面重心、适合长标题的比例、紧凑但舒展的目录和两个专题的完整入口。卡片、叠字并非一律禁止；本项目选择图文目录和图前标题，是针对当前六篇长标题、已有八组插画及首页重复推荐作出的设计决定。

不更换品牌、字体、内容 Schema、URL、图片文件、manifest、来源关系、完整摘要、正文、发布日期、Beta 提示或服务配置；不加入客户端脚本、动画库、新主题引擎或第三方请求。本批是未提交源上的本地诊断，不构成最终发布验收。

## 修改文件与职责

- `src/pages/index.astro`、`src/templates/HomeTemplate.astro`：主视觉继续使用钟馗；主入口指向全部合集，下方明确展示阴间和聊斋，取消重复的钟馗区块与首页占位环境图。
- `src/site/public-assembly.ts`、`tests/site/public-assembly.test.ts`：public 首页要求两个指定合集均 published，保留阴间/钟馗 Featured 关系校验。review 的草稿例外仍独立，只对已发布合集开放新增展示。
- `src/components/IllustratedLink.astro`、`src/pages/explore/index.astro`、`src/pages/collections/index.astro`：复用原 owner 的 approved/current Hero；图、导读、唯一标题链接及完整图注构成同一目录项。保持索引顺序和 published-only 边界。
- `src/content/entries/liaozhai-reading-guide.md`、`painted-skin.md`、`fighting-cricket.md`：仅补齐已有 subtitle，供目录和详情共同使用；不截断 summary。新文案是阅读引导，分别依据现有版本/体裁讨论、画皮文本与解读区分、促织中儿子的后述，不能把后述改为已确认的变形事实。
- `src/templates/EntryTemplate.astro`、`src/styles/global.css`：六篇文章标题进入图片之前的正常文档流；移除叠字暗板和对侧定位，放宽标题行宽；调整首页、目录的图文比例、间距和手机布局。图片自身 focal point 与两种批准构图保留。
- `scripts/hero-output-policy.mjs`、`tests/site/hero-output-policy.test.mjs`、`tests/site/responsive-layout.test.ts`：输出 oracle 显式验证每页图位及原资产、逐图 alt/完整说明/署名/AI 披露、响应式候选及全局资源闭合；替换过时的叠字断言，覆盖错图、漏图、重复图及披露错位负例。
- 本文、`docs/DESIGN.md`、`docs/COMPETITIVE_AUDIT.md`、`docs/REFERENCES.md`、`docs/ARCHITECTURE.md`、`docs/requirements/003-pages-exploration-seo.md`、`docs/requirements/013-public-artifact-assembly.md`、`README.md`、`DEV_WORKFLOW.md`：记录设计决定、当前合同、验证范围和实际结果；历史验收不回写。

## 视觉与输出合同

1. 首页以一张钟馗主视觉建立气氛，两个并列专题以各自批准的插画、标题和简介展开；不再追加同一篇 Featured story。首页仍为中性页面。
2. Explore 使用既有 subtitle 作为短导读；已发布条目缺少副标题或 Hero 时构建失败，不静默借用其他正文。Collections 继续使用完整 description。目录每项恰有一个目标链接，完整标题不缩写。
3. 桌面目录以横向图文并置形成连续阅读节奏；手机以小幅独立 4:5 构图配标题，完整图注独立占行。首页专题图可以更大，目录不重复首页的宣传尺度。
4. Entry 保留完整 H1、中文身份、subtitle，再展示原 Hero；长标题不覆盖画面，不以裁掉标题或遮住主体换取整齐。正文、Quick Answer、Sources、反向合集和 Related 顺序保持。
5. 预期首页 3 图、Explore 6 图、Collections 2 图、8 个详情各 1 图，共 11 个含图页、19 个 figure；8 个唯一 Hero family 仍生成 112 个 AVIF/WebP，不引入新版素材。新增图位 lazy，首页与详情主图保留高优先级。

## 验证与结果

先更新合同和页面，再执行 `DEV_WORKFLOW.md` 中固定 runtime 的格式化、完整 check、public 构建及 review 回归。新增 oracle 负例不允许放宽其他页面、字体、来源、metadata 或安全检查。

浏览器在临时 preview 上检查首页、两个目录、全部六篇 Entry 的桌面长标题，并抽查手机、平板、链接及溢出；截图和临时证据放仓库外。截图审美判断与自动构建结果分别记录；未覆盖的支持平台、真实设备、完整无障碍及生产性能仍属于最终候选 QA。

本轮已完成的实际结果见下节。

## 本轮完成结果

2026-09-08，本地实现与代理视觉复核完成，未提交、未推送、未部署。

- 完整 check 通过 Prettier、ESLint、30 文件 / 513 项测试和 Astro 98 文件零诊断。之后两处纯 CSS 收尾（标题链接仅在 hover 显示下划线、首页专题图注行对齐）通过三文件 / 35 项定向测试及 public、review 两种完整构建/output verifier；未把收尾后的定向测试写成又运行了一次全套测试。
- public 精确生成 13 HTML、2 XML、robots.txt、112 Hero、10 字体；review 为 14 页 noindex、112 Hero、10 字体。19 个逐图位置、唯一目标链接、完整 alt/caption/credit/AI 披露、字体/CJK、内容提示、来源关系、metadata 和零可执行脚本均通过原有或本轮加强的门禁。
- 真实 Codex In-app Browser 在 1440×900、768×900、390×844 检查首页、两个目录与六篇 Entry，共 27 组合；未发现横向溢出、标题/主图重叠或字体仍在加载。六篇桌面标题已逐图审阅，首页两个专题、目录与代表性手机/平板画面另作视觉比较。首页两个专题链接和主 CTA 实际点击后到达正确页面；该标签记录无 console error/warn。
- Home 原有钟馗、中国阴间双语身份及语言属性通过实际 DOM 核对；此类简单呈现没有额外加入镜像常量的单元测试。聊斋保持原英文身份。某次整页截图出现 Skip to content，正常浏览器状态已复核其未获焦点且位于视口外；未将截图状态误作默认可见缺陷。
- 独立代码审查发现的 review/public 首页排序差异和图位缺少目标链接绑定均已修复；负例覆盖错图、缺失/重复图位、说明在其他图位、隐藏/额外披露文本、移动候选缺失、旧版文件、非指定页面插图、标题在图后，以及正确路由指向错误图位。
- 三篇 subtitle 仅增加阅读引导；原正文、完整摘要、Source/Claim/Terminology、日期与内容身份未变。资产文件、manifest、字体、依赖、lockfile 与供应商接线未变；现有内容图与构建期诊断继续通过。新职责注释只解释独立图片/页面 oracle，未新增无关抽象。
- 本轮 preview PID 为 39148，实际地址为 http://localhost:4321、监听 [::1]:4321；检查结束已用固定 stop 入口关闭，PID 不存在且端口无 LISTENING。临时 viewport 已重置、本站检查标签已关闭。截图与 JSON 在仓库外的本轮 visualizations/design-refinement 目录，不进入网站或 Git。

审美结论：当前版面更适合当代神话文化刊物，可沿此方向继续发布准备；这不是 owner 对最终截图的逐项批准，也不替代完整 M6 候选 QA。手机目录的完整图注仍较密，后续可专门设计披露呈现；本轮保留完整说明，未为美观省略。此次浏览器查看的是 review 版本，public Beta 页脚与发布日期只通过静态输出核验，没有新增 public 浏览器显示证据。真人设备、读屏器、真实缩放、慢加载/失败矩阵、性能、跨平台及线上环境仍待完整发布候选验收。
