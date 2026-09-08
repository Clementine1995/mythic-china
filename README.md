# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 托管只读复核（2026-09-08，本地 `502c0c8` 后）：Vercel 2FA 登录已完成，团队/项目内部身份与 Production 域名绑定已现场核对；生产和预览均无部署、Git 未连接、项目环境变量为空。Vercel Authentication 的 `Require Log In / Standard Protection` 已开启；实际构建/output 尚未配置，项目数据训练选项已勾选。现有网页拖放入口明确指向 Production，不能代替受保护预览。详细现场、待确认的交付方式及配置停点见 DEV_WORKFLOW 文末；本次只读账户，不关闭 M5、最终 QA 或发布门禁。

- 013–016 检查点复核（2026-09-08）：完整核对既有 58 个变更路径及新增实现，同步治理摘要、总需求与领域文档后固定为 60 个路径。public 构建链、页面/图注/静态交互及文档门禁的独立只读审查未发现本地实现阻塞问题；完整 check 30 文件/529 测试、零 Astro 诊断与 public 13 页 → review 14 页构建/output verifier 通过。用户已明确授权本次本地提交，精确范围与执行入口见 DEV_WORKFLOW 文末，提交身份以 Git 历史为准。M5 真实联调、Plausible 费用/处理决定、托管账户/实际配置及最终 clean-source QA/receipt 仍未闭合；本次不推送、不部署，也不沿用提交前诊断作为发布凭证。

- 阅读收尾（016，2026-09-08）：保留墨色视觉，首页导语改为具体故事邀请；11 处首页/目录图注原生展开，完整 AI 披露始终显示，8 处详情图注不折叠。Newsletter/Reader Request 已改为无控件静态状态，Privacy 补 Vercel 条件式说明。完整 check 30 文件/529 测试通过；最终空格修复后 public 13 页与 review 14 页构建均通过。内置浏览器完成 13 路由 × 390/768/1440 共 39 组合、核心截图和阅读链/图注键盘抽查；预览已关闭，未提交、未发布。详细范围与最终候选保留项见 [016](docs/requirements/016-reader-facing-polish.md)。

- 背景调整（015，2026-09-08）：根据 owner 对 mythzh 背景的偏好，共享表面已改为墨色、暖白与克制金色；014 版式、原字体/插画/正文保持。完整 check 和 public → review 构建通过；内置浏览器完成 8 页 × 390/1440 共 16 组合，抽查正文、Sources 和菜单焦点。临时预览已关闭，未提交、未发布；成品主观确认与未验证范围见 [015](docs/requirements/015-ink-palette.md)。

- 版面调整（014，2026-09-08）：首页双专题、插画目录与图前独立文章标题已完成本地实现；完整 check 30 文件/513 测试通过，CSS 收尾后定向 35 测试与两种构建通过。内置浏览器完成 9 页 × 390/768/1440 三档，共 27 组合，未见横向溢出或标题压图。临时 preview 已关闭；未提交、未发布，public 特有页脚/日期及完整发布 QA 的范围仍见014。

- assembly 自动验证（013）：2026-09-08，完整 check 通过 29 文件/498 测试与 Astro 96 文件零诊断；review → public → review 构建通过，public 独立 verifier 确认 13 HTML、2 XML、robots.txt、112 Hero、10 字体及零可执行脚本。未执行浏览器/最终发布 QA，当前改动未提交，制品仅用于本地诊断。

- Beta 页脚提示增量（2026-09-08）：已按 owner 批准的英文原文接入全部 13 个 public 页面，14 页 review 不显示。格式化、ESLint、Astro 96 文件零诊断和两种构建/output verifier 通过；本轮没有重跑此前 498 项单元测试，没有浏览器或远端操作。最终显示验收保留在 M6，详情见 013。

- 2026-09-08 部署准备：用户已建立个人管理的 Vercel Hobby 空项目 `project-scu6m`，截图确认 Production 域名 `mythic-china-beta.vercel.app`，状态 `No Deployment`。本地 public assembly 已接线，使用显式 origin，输出到 `.local/public-build/`；默认 review 仍输出到 `dist/`。本批验证与剩余门禁见 [013](docs/requirements/013-public-artifact-assembly.md)。本批不安装 CLI、不接 Git，不包含服务、提交、推送或部署。

- 阶段：M1 已冻结为工程参考，M2、M3、M4 本地产品实现与 M5-U2/U3 已完成。四篇内容与双语审核、两个合集路径已进入 `f81b49f`，Public Beta 路线进入 `96da8db`，五组 Hero 闭环进入 `1be085bf5fc4ba56c2665d1c8193a83001aeec18`。2026-09-07 VB6 从该提交的 clean 保存项目开始，HEAD/main/本地 origin/main 一致；未 fetch 或查询服务器，tracking ref 不单独证明远端状态。VB6 已完成逐项 ready 审核；Project owner 随后确认首发全部 6+2 为 published，六篇目标公开日期统一为 2026-09-10。此前 VB6/阅读预检批仅获本地提交检查点授权，目标日期不是上线预约；013 当前批只有本地实施与验证授权。历史检查点与授权分别见 DEV_WORKFLOW 及各需求文档。
- 当前实现：6 篇 published Entry、2 个 published Collection、14 Source、25 verified Claim、6 bilingual-approved Terminology；六篇 publishedAt 均为 2026-09-10，updatedAt 仍为 null。六篇与两个合集均绑定自有 approved/current Hero；VB6 补齐四篇分类、两条 Related 编辑环和 Liaozhai Featured（Painted Skin）。默认 review 为 14 个 noindex/nofollow 页面，8 个 Hero family 在 11 个含图页 / 19 个图位引用 112 个唯一 AVIF/WebP 输出；Related 仍只显示 published 目标。全站 Footer 及六篇 Entry 保持 inactive Newsletter/Reader Request，三个服务仍是 provider-neutral 合同与零网络 Fake；public artifact 已在 013 完成本地接线，仍未发布。
- 编辑/视觉状态：两篇首发与阴间 Collection 的既有阶段接受、四篇新增稿件及两条内容提示的双语确认、六份术语批准保持。012 五组 Hero 已完成 owner 候选/账户与公开使用确认及 Codex 成品/委托英文审核。VB6 逐项复核这些记录、分类、关系和书目后审核 6+2 到 ready；Liaozhai 现有标题/description 与 Featured 由 Codex 本批完成编辑复核，不记成新增 owner 逐字批准。
- 无账号开发：M5-U5A 已完成纯内存阅读状态判定，覆盖 visible 累计 15 秒、故事曾入视口、独立 75% 深度、两种顺序、once-only 与新页重置；不接 DOM、真实时钟、存储、配置或网络，也不被页面消费。public 纯 builder 已补 `/privacy/` 的 WebPage metadata 和五个固定静态 Sitemap 路径；该纯合同现已由 013 接入真实 origin 的本地 public 构建。U5 hook/供应商接线仍未完成。
- 014 前的预检验证：2026-09-07 本地整站预检已修复手机 Hero 比例、平板长标题/图注、桌面断行/亮图对比、正文 measure、Privacy 间距及导航语义；2026-09-08 又实际复现并修复合集图片失败时的浅字浅底。该次预检 check 通过 Prettier、ESLint、26 文件/462 项测试、Astro 83 文件零诊断、14 页 noindex build/output verifier、112 Hero、10 个 hash-locked WOFF2、零 XML 与零客户端 JavaScript。隔离 Windows Edge 完成 142 组正常/无脚本/reduce/图片失败/字体失败检查、56 组导航键盘及样张四组补验；未发现正文/链接丢失、图片容器尺寸变化、横向溢出或页面运行时异常，当前 Windows fallback 已抽样实测。默认 favicon 404 仍未解决。详情和限定范围见 003 第 12.17–12.18 节；本批不改内容/资产，非默认视觉再生产不适用，真人/读屏器、真实缩放、慢资源、性能、跨平台与最终发布 QA 仍未完成。
- 视觉/字体状态：M1 原型视觉皮肤仍未获批准；M4-U2 页面方向与此前 system fallback 三档视口已确认。当前 8 个 Hero family 的生产链均已闭合；4 份英文与 6 份 CJK WOFF2 静态门禁已通过。新的 noindex 样张覆盖 display/story/body、拼音/标点与 DESIGN 冻结混排行、SC/TC 400/500/600、65/36 个 required code points 与 `测`/`測` fallback-only probe；最终 HTML/CSS oracle 与 2026-09-02 三档浏览器矩阵已锁定生产 pinyin 语言、现有 token stack、权重/style、CJK inline boundary、20/20 可见样本及 10 个实际观测字体资源。Project owner 当时检查 M4 的 8 个页面路由并明确回复“这些页面通过”，该结论只关闭 2026-09-02 的 M4 页面样张，不覆盖 Privacy、四个新增 Entry、Liaozhai Collection 或本批新 Hero。2026-09-08 的隔离 Edge 增量已覆盖浏览器按键默认动作、reduce 模拟、禁用脚本、阻断字体/图片与当前 Windows 的部分实际 fallback face；不等于真人键盘/读屏器、真实 200%、逐字形全覆盖、慢资源或受控 LCP/CLS，macOS/iOS/Android fallback 仍未闭合。最终 public artifact 与受保护预览仍须按 M6 验收；本轮本地证据不新增 owner 视觉批准，也不自动提升内容状态。
- 国际化状态：Project owner 已确认未来采用英语根路径 `/`、简体中文 `/zh-hans/`、预留繁体中文 `/zh-hant/` 的结构，并先以 Chinese Underworld Collection、Zhong Kui 与 Guide 三页做简中试点；该目标不阻塞英语 MVP。当前仍是英语单语 review 站，没有 locale-aware Schema、中文路由、语言切换、localized metadata 或 `hreflang`，本轮不实施这些能力。
- 托管与身份：静态托管目标为 Vercel；publisher 为 `Mythic China / Organization`，author 为 `Mythic China Editorial / Organization`，公共身份页为 `/about/`，当前采用 text-only Open Graph。Project owner 当前不购买自定义域名，已通过网页配置稳定 Production 域名；本地显式 origin 为 `https://mythic-china-beta.vercel.app`，配置入口拒绝其他 hostname 和隐式 Vercel URL。项目尚无部署，平台内部身份、保护、地区表现和发布授权尚未完成。
- 版本边界：本批以 `1be085bf5fc4ba56c2665d1c8193a83001aeec18` 为父基线，交付 VB6、首发 published、无账号开发及本地预检修复。Project owner 于 2026-09-08 授权形成本地提交检查点；提交身份以 Git 历史和执行后核查为准，精确范围与命令见 DEV_WORKFLOW。本地 preview 和隔离浏览器已关闭；本次授权不包含新分支/worktree、fetch、推送或部署，既有预检也不因提交而成为最终发布 receipt。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。当前权威日期为 2026-09-08。
- Painted Skin 单见证补缺：上海图书馆 1766 青柯亭本已核到卷一数字页 72–75 / 左版心叶码 35–38，并据此补齐 5 条原典 Claim、1 条本站自译 Claim、`業魅` 术语与英语草稿；Project owner 于 2026-09-06 确认人工双语审核通过，自译 Claim 提升为 `verified`，术语提升为 `bilingual-approved`。页 74 影像明确作 `業魅`，Tso 2017 引 `孽魅`，CText 关联的未具名见证作 `孽鬼`，不解释异文源流。任 2016 已核授权电子版权页和《輯校凡例》，但正文仍在试读范围外；张 2011 仍无实际册页。两项现代本比较及现代译本/影视直接比较移出当前 MVP，详见 008 第 5.10–5.11 节。
- 三篇首稿编辑复核：2026-09-05 先按既有 Source/Claim/Terminology 为十王、促织和聊斋导读完成一轮 AI 编辑修订；当批完整检查通过 25 文件/321 测试、Astro 81 文件零诊断与 13 页 review 构建。后续逐字复核发现并纠正三组 verified Claim 与正文的证据偏差，同时收紧 1679 年代归因和 `zhiguai` 语境；此前 AI 编辑结论及审核包不再作为英文与证据一致性已通过的依据。当批三篇仍为 `draft`；Project owner 随后确认纠偏后审核包通过人工双语审核，三份术语提升为 `bilingual-approved`。没有新增来源或页面视觉验收。详见 008 第 14.5–14.6 节。

- 合集接线：阴间指南 → 十王 → 钟馗；聊斋导读 → 画皮 → 促织。VB6 的 Related 编辑关系沿各自顺序并返回 Guide；两个合集和六篇成员均 published，阴间 Featured 保持 Zhong Kui，聊斋 Featured 为 Painted Skin。Related 输出继续 published-only，当前六篇 review 各显示一个既定目标，Explore/Collections 展示精确 6/2 列表且不再显示 Not published 候选架；合集正反路径及 Featured 可用于本地评审。见 [009](docs/requirements/009-collection-reading-paths.md) 与 [012](docs/requirements/012-five-hero-visual-briefs.md)。
- 目标读者文稿审核：[`010-four-entry-reader-review.md`](docs/requirements/010-four-entry-reader-review.md) 的修订前 R1 已失效；聚焦双语确认后重建的协调者 Markdown 与冻结 R1 HTML 已通过 20/20 输入哈希、4 篇可见文本、2 条内容提示、结构、离线性、唯一 ID/ARIA/片段引用和严格 UTF-8 检查。该 R1 现为 reference-only，只保存问题、rubric 与四篇文稿基线，不得作为 live R2 阅读面或答卷载体。目前 R2a/R2b 与真人反馈均为 0，不能写成目标读者审核通过。Project owner 于 2026-09-07 确认采用 [`011-public-beta-validation.md`](docs/requirements/011-public-beta-validation.md)：R2 改在可索引 Public Beta 上线后执行，作为正式 MVP 收口门禁，不再阻塞图片、关系、状态、public artifact、受保护预览或经单独授权的 Beta 生产发布。

## 当前接力顺序

1. **M4 本地产品实现已完成**：Collection/Guide Hero、双语术语、四条馆藏标题 locale、CJK 静态门禁、Windows/local 正式页基础矩阵、功能页修正、M4-U5A noindex 字体样张/自动负门禁、最终样张三档基础矩阵与 Project owner 对 8 个页面的视觉判断已形成。现有 review 输出继续不可部署，后续内容包已在 VB6 独立审核到 ready。
2. **M5 外部交互边界**：[`006-external-interactions.md`](docs/requirements/006-external-interactions.md) 的 U2 provider-neutral 合同/Fake 与 U3 inert Newsletter、Reader Request、Privacy 及完整本地门禁已完成。Project owner 于 2026-09-04 确认 Buttondown `mythic-china` 账户审核已通过；Tally Free 账户与未发布 Reader Request 草稿已准备。审核通过只关闭等待审核门槛：两者仍未接入站点、未提供 action/hosted link、未导入订阅者、发送邮件或处理提交，Plausible 留 U5；下一停点须分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 草稿发布、精确 hosted link、合成数据写入、回查和删除。当前仍不渲染可提交表单、不接真实网络，也不让这些准备状态反向改写静态内容和发布状态合同。
3. **M6 内容与 public artifact assembly**：VB6 已闭合 6+2 ready、四篇分类、Related 编辑环和 Liaozhai Featured。阴间指南复用已有 CMA Source 补末段近引，全库仍为 14 Source / 25 Claim / 6 Terminology。owner 已批准全部 published，六篇目标日期 2026-09-10。稳定 HTTPS origin 与 public assembly 已在 013 接线；本批输出仍为 nondeployable 本地诊断，Beta 页脚提示已获文案与位置批准，本地实施见 013；016 已补条件式 hosting Privacy；下一阶段核对真实托管配置、独立 M5 交互并准备最终发布候选。R2 在 Public Beta 上线后执行。
4. **M6 发布候选 QA 与受保护预览**：public assembly 实现稳定后，先由 Project owner 单独授权形成 clean committed source，再从该 revision 重新构建最终 public artifact，执行真实键盘、200% zoom、JavaScript-disabled、reduced motion、慢/阻断字体、图片失败、支持平台 fallback、最终视觉与本地 LCP/CLS 基线，并生成 verification receipt。dirty source 上的检查只能形成 nondeployable 诊断记录，提交后不得直接沿用或“洗白”。全部通过后才可单独授权受保护远端预览，并验收账户、保护、地区表现、回滚与退出方案。任何实质内容、状态、模板、资产、样式或配置变化使受影响证据失效。
5. **M7 Public Beta、上线后验证与正式收口**：预览验收后逐次授权把同一身份发布为稳定、可索引且带可访问 Beta 提示的 Public Beta，并建立 live smoke、回滚、目标地区复核与真实流量 RUM/p75 基线。上线后另行冻结并授权研究执行包，先由 1 位独立读者完成 R2a；R2b 建立 5–8 份核心全站可用记录，四篇焦点 Entry 各取前 5–8 份可用深读，按预冻结规则可加入替补，因此总招募人数可能超过 8。达到 010/011 阈值、关闭关键发现、处置重复重大问题并由 Project owner 确认后，才结束 Beta 并认定正式 MVP 验证完成。每一步都不自动授权下一步。

简中本地化试点是独立后续轨道：实施前须另行授权，不进入上述英语 MVP 的阻塞链，也不要求中英文同步发布；具体启动时点留待实施批次确认。目标合同见 [`005-localized-content-pilot.md`](docs/requirements/005-localized-content-pilot.md)。

## 项目负责

- 用自然英文讲清中国神话、志怪、民间信仰、文学故事与历史人物传说化过程。
- 用可追溯出处、明确版本差异与原创插画建立长期可搜索的内容资产。
- 将每篇内容组织成网站文章、主题合集和静态视觉分发素材。
- 在不破坏阅读体验与编辑独立性的前提下，为读者选题反馈及后续商业化保留演进路径。

## 项目不负责

- 不宣称建立唯一、统一或完整的“中国神话宇宙”，也不替代学术研究与宗教实践指导。
- MVP 不提供账号、评论、收藏、公开社区、付费权限、互动关系图或视频内容。
- 不在线运行 ComfyUI，不在访问时动态生图，也不把 AI 搜索、机器翻译或生成图当作人物、传说与术语的事实来源。
- 不把现代游戏、影视、插画或译本当作可自由复用的公共领域素材。

## 当前主链路

M2/M3-U5 已建立本地静态应用、视觉资产合同和非默认生产复核链路：`Entry Markdown / 结构化 YAML + visual brief / production record / versioned manifest -> 严格 Schema -> 纯内容图与视觉资产图/文件校验 -> 显式 current resolver -> published-only release / review 投影 -> Astro review 静态路由 -> dist/`。M5-U2 另建立不进入页面/构建输出的交互合同链：`unknown input -> strict provider-neutral Schema/allowlist -> redacted result -> injected zero-network Fake`。M5-U3 在 9 页 noindex review 历史基线中加入 `inactive Newsletter / Reader Request -> local Privacy notice -> fail-closed DOM oracle`；四个 draft Entry 与第二 Collection 随后把 review 精确清单扩展为 14 页。六个 Entry 均保留同一 inactive Reader Request，并由两个 Collection 的 `entryIds` 派生唯一反向入口；012 的五组 approved/current Hero 现由相同 resolver 和页面组件消费。三类 service 仍没有 provider mapping、配置、存储或网络，public 纯 builder 与字体/CJK 保持；VB6 ready 审核后，owner 批准全部 published，当前 published 投影为 6/2；默认构建仍是不可部署的 noindex review。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 继续组成冻结的 M1 独立原型，不属于应用构建输入。目标体验与内部生产仍必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> 可选 Content note -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。内容提示非空时位于署名之后、opening 之前；轻量出处随相关主张出现，完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前已有本地应用开发与自动验证环境，但没有运行中的本地服务。历史 M4-U5A preview PID `9628` 与 2026-09-02 最终 U5 人工证据 preview PID `31960` 均已停止；Project owner 判断后回查 4321 无监听，验收标签也已清理。M5-U2/U3 只运行本地自动化和静态 build：Fake 测试证明零网络，U3 output verifier 证明零 form/script/provider link，不构成供应商联调或常驻环境。Vercel 已被选为未来静态托管目标，但项目仍没有数据库或运行中的远端部署；用户已建立空 Vercel 项目与稳定 Production 域名，本地 origin 已接线。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地应用、文档与原型工作区 | `F:\codex-project\mythic-china` | M4 基线为 `3983bee`；M5-U1–U3、U4 准备快照与 007 基线为 `3fa46d5`；四篇研究与证据最小物化检查点为 `9914dd3`；Ten Kings 与 Fighting Cricket 纵切片已进入 `7c0cb3f`，Liaozhai Reading Guide 检查点 `119c01c` 已由 Project owner 确认推送；012 Hero 已提交为 `1be085b`，2026-09-08 本地检查点范围为其上的 VB6、首发状态、无账号开发与阅读预检修复，提交身份由 Git 历史确认 | 固定 Node、pnpm、CJK 生产、构建、验证与 Git 命令见 `DEV_WORKFLOW.md` | 6 Entry / 2 Collection / 14 Source / 25 Claim / 6 Terminology、21 个 local master、21 份 repository source、9 份 production record、12 份 manifest、三个 provider-neutral service/零网络 Fake、14 页 inert review UI 与 Privacy；六篇 Entry / 两个 Collection 均 published 并绑定 approved/current Hero，外部 Buttondown/Tally 准备事实仍未接入仓库 | M4 review/public 纯门禁、M5-U2 内存合同、M5-U3 静态 UI/output 验证，以及 007–012 的内容、关系、Hero、VB6 ready 审核与本批首发 published 决定；另含 013 本地 public artifact assembly；不含真实联调、最终 release-candidate QA、clean-source receipt、远端预览或发布 |

当前没有本地或生产常驻进程，也没有由站点管理的数据库、消息系统、缓存或对象存储。`dev` / `preview` 是会改变本地运行状态的临时评审操作，不是只读健康检查；端口或 HTTP 可达性检查只用于观测既有进程，不得隐式启动、修复或重启服务。未来标准静态部署也不得在未更新架构、需求与 `DEV_WORKFLOW.md` 的情况下创建、重建、重启或清空外部基础设施。

## 项目构建与运行

项目已经手工最小初始化；不使用 starter、adapter、MDX、UI/CSS/动画框架或外部服务。本机命令继续按 `DEV_WORKFLOW.md` 将 `D:\Program Files\nvm\v24.16.0` 置于当前进程 PATH 首位，并通过同目录 Corepack 调用 pnpm `11.22.0`；package scripts 的运行时守卫只校验 `engines.node` 对应的可移植版本范围，不比较机器绝对路径，以便干净 clone、CI 和未来托管构建使用各自受控的 Node 安装。直接使用当前公开 PATH 的旧 Node/pnpm 仍不受支持。`dev` 与 `preview` script 虽已存在，但启动服务仍需单独授权。完整边界见 `docs/ARCHITECTURE.md` 与 `docs/CONTENT_MODEL.md`。

## 当前最小验证

工作目录、固定运行时身份、聚合 `check`、定向验证、文档占位符、严格 UTF-8、相对 Markdown 链接、干净安装和停止条件均以 `DEV_WORKFLOW.md` 的对应章节为唯一可执行来源，不在本文件复制命令。当前聚合门禁覆盖 Prettier check、ESLint、Vitest、`astro check`、静态 build 与 review output verifier；最近一次结果摘要见“当前状态”，历史结果不替代下一次改动后的匹配验证。

## 目录说明

- `docs/PRODUCT.md`：产品需求、目标用户、MVP、指标、扩展与商业化边界。
- `docs/DESIGN.md`：项目级视觉系统、页面结构、动效和无障碍规范。
- `docs/COMPETITIVE_AUDIT.md`：直接竞品与相邻标杆的观察、可借鉴项、不采用项和 M1 比较门禁。
- `docs/ARCHITECTURE.md`：静态优先技术架构、数据边界和升级触发条件。
- `docs/CONTENT_MODEL.md`：内容分类、声明与术语记录、工具无关的视觉资产及读者反馈模型。
- `docs/REFERENCES.md`：本轮外部参考、视觉 Skill/工具采用边界与用途说明。
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线合同，`003` 保存 M4 页面、探索与 SEO 的详细合同、状态投影、实施单元和验收门禁，`004` 保存首个纵切片的编辑、Collection/Guide Hero 候选检查点及后续生产闭环与生产字体状态，`005` 保存已确认但尚未实施的本地化内容试点合同，`006` 保存 M5 外部交互、隐私、供应商与 Mock/真实联调边界，`007` 保存第二个 MVP Collection 的比较、推荐与 owner 确认，`008` 保存四篇新增候选的 claim map、正式书目、分层证据账本、精确 locator、术语/版本门禁、最小证据物化、四篇单篇纵切片与后续证据纠偏，`009` 保存两个三篇 Collection 阅读路径及本地 review 输出门禁，`010` 保存四篇英语文稿形成性审核协议、AI 修订边界、内容提示合同与目标读者审核流程，`011` 保存可索引 Public Beta、上线后 R2 与正式 MVP 收口合同，`012` 保存四篇 Entry 与 Liaozhai Collection 的五份 Hero-only visual brief，以及候选选择、账户与公开使用确认、exact-canvas、production lineage、五审、资产接线及 VB6 逐项 ready 审核和后续独立首发 published/日期决定；内容对象、正文、关系和状态仍按各次授权边界判断，不能由资产闭环自动推导。
- `src/`：Content Layer、视觉资产加载/校验/current resolver、纯 release/review 投影、含 Privacy 但已接线的 public SEO/artifact builder、共享生产壳、真实页面模板/静态路由、M5-U2 provider-neutral service/Fake、U5A 离线阅读状态判定，以及 M5-U3 Newsletter/Reader Request/Privacy inert review UI。
- `tests/`：内容、视觉资产、页面投影、public SEO/artifact、resolver、运行时、架构边界、M5-U2 外部交互纯合同与 M5-U3 页面/output policy Vitest。
- `scripts/`：固定 Node 子进程身份、review build intent、静态输出和视觉资产构建的稳定 runner/verifier；review verifier 现包含 M5-U3 HTML5 DOM oracle，命令和影响只看 `DEV_WORKFLOW.md`。
- `prototypes/`：不可发布的静态视觉评审原型；不代表应用实现或已核准内容，工作母版与探索废图不应进入正式代码仓库。
- `package.json`、`pnpm-lock.yaml` 与 `pnpm-workspace.yaml`：精确依赖、唯一锁、pnpm 11 发布成熟期例外与显式第三方 build-script 拒绝策略；不得另建 lock。

## 文件地图

### 治理文档

- `AGENTS.md`：AI 入口、最高优先级授权边界和文档索引。
- `AI_COLLABORATION.md`：任务分级、协作生命周期、证据和收口。
- `PROJECT_RULES.md`：项目特有且可验证的架构红线。
- `STYLE.md`：工程、内容和命名风格。
- `DEV_WORKFLOW.md`：启动、验证、Git 与发布命令的唯一来源。
- `REQUIREMENT_DEVELOPMENT.md`：需求拆解和验收文档标准。

### 产品与设计文档

- `docs/PRODUCT.md`：产品范围与阶段路线合同。
- `docs/DESIGN.md`：视觉方向与设计约束合同。
- `docs/COMPETITIVE_AUDIT.md`：竞品定位与设计差异化的审计证据。
- `docs/ARCHITECTURE.md`：目标技术边界合同。
- `docs/CONTENT_MODEL.md`：编辑、引用和视觉资产合同。
- `docs/REFERENCES.md`：外部来源索引。

## 需求开发口径

以下任一情况必须基于 `REQUIREMENT_DEVELOPMENT.md` 在 `docs/requirements/` 建立需求文档：

- 新增页面、栏目、内容类型或用户可观察行为。
- 内容 Schema、稳定 ID、URL、引用、图片清单或商业披露字段变化。
- 引入依赖、外部服务、表单、分析、支付、数据库或发布环境。
- 需要多个实施单元、真实浏览器验收或远端发布。

需求文档保存当前已确认的目标业务合同、决策和验收证据，不自动代表当前实现或已交付状态。只有实现和匹配验证完成后才可标记已交付；若需求或阶段材料与代码、测试、本文件的当前状态或真实现场不一致，先报告差异并按 `AGENTS.md` 的文档权威层级更新负责该事实的来源，不得用阶段记录覆盖现状。

## 发布口径

当前已有 Vercel 空项目与稳定 Production 域名，但没有部署或获授权的发布任务。M4 只完成 noindex 本地产品实现、published-only 投影和 public/SEO 纯 builder，不产生 deployable public artifact。M6 的 6 篇 Entry / 2 个 Collection 已获人工 `published` 决定，013 已确认 public origin 并实现本地 public artifact assembly；其一个 Entry + 一个 Collection 仍只是技术 fail-closed 下限，不替代实际预览候选。实现稳定后须由 Project owner 单独授权形成 clean committed source，并从该 revision 重新构建真实非空 public artifact、运行独立 output verifier 与最终发布候选 QA。dirty source 上的结果只能记录为 nondeployable 诊断，后续提交不能直接继承该 artifact、QA 或 receipt。用户已通过网页完成空项目及域名准备，但平台内部身份、保护等仍待复核，且这些准备不等于预览或部署授权；远端预览保留给 M6 完整候选。M7 在独立授权下把同一验证身份发布为可索引 Public Beta；R2a/R2b 在 live artifact 上执行，完成后才关闭正式 MVP 验证。M6 最终 verification receipt 必须绑定 clean source revision、lock/source digest、public intent、verifier/QA 结果与 `dirty: false`；远端预览再把同一个 clean committed source、验证结果和 deployment target 绑定为 `validated_source_identity`。若未来复用不可变制品，receipt 还必须包含完整 artifact inventory/digest；部署、目标读者数据收集、表单真实写入、分析埋点、支付和线上数据操作分别授权、分别验收。

## AI 协作口径

- 默认按可独立验证的最小单元推进。
- 事实、推断和未验证风险必须分开表达。
- 外部网页、书籍、图片或研究资料进入项目结论时，必须在正文附近标注出处，并在需要时登记到 `docs/REFERENCES.md`。
- 扩大范围、引入依赖、修改配置、启动服务、提交、推送和发布遵循 `AGENTS.md` 与 `AI_COLLABORATION.md`。

## 发布前版面调整

[014 出版版面与视觉节奏调整](docs/requirements/014-editorial-design-refinement.md) 承接 2026-09-08 的独立审美与原竞品复核：首页展示阴间与聊斋两个专题，目录采用插画与短导读，文章完整标题进入图片之前的独立区域。保留既有字体、正文、来源、原资产与 Beta 提示；三个聊斋 subtitle 补齐为阅读引导。实施与本轮验收结果见 014，不沿用旧截图的通过状态，不产生 Git 或发布授权。
