# 016 发布前阅读页面收尾

> 2026-09-12 当前状态：Project owner 已确认正式 MVP 采用阅读版，范围为 6 篇英语文章、2 个合集、各自 Hero 与既定验收；Newsletter / Reader Request 真实启用、逐篇正文图及完整故事卡包后移。阅读版 Public Beta 已公开，生产身份与未验证项以 README、011 和 DEV_WORKFLOW 为准。本文带日期的阶段状态与验证结果继续作为历史证据，不据此否定当前发布，也不把后移项或未完成验收写成已完成。

## 目标、授权与状态

2026-09-08，owner 批准先完成深色版完整走查与公开页面收尾，再进入后续发布步骤。本批在保存项目 `F:\codex-project\mythic-china` 中继续既有 013–015 工作树；沿用本次设计流程中已授权的临时预览、浏览器检查与结束关闭。范围为本地代码、文档和匹配验证，不执行 Git 写操作、账户配置、真实表单、邮件或远端发布。

需求已确认，本地实施与本批验证完成，未发布。HEAD 为 `fabb4c9e829dc85c6c47161f49af5e9ad58594bd`；既有修改保留，不把 dirty source 验证视为最终发布 receipt。

## 目标合同

1. 首页保留完整标题和两条专题入口，简介直接邀请读者进入钟馗、阴间和聊斋，再追溯来源；只改界面导读，不改内容或 metadata。
2. 首页与两个目录的 11 处图注改为原生展开说明。每幅图的 credit 和完整 AI disclosure 始终可见；`Image notes` 可用键盘展开，原 caption 全文保留在同一 figure 内。八个详情图位继续完整显示。资产、alt、裁切、图数、文件与目标链接不变，不加入脚本。
3. 全站 Footer 内保留唯一 Newsletter 状态区；六篇 Entry 在来源/阅读路径后保留匹配 page ID 的 Reader Request 状态区。两者明确未开放、不采集信息，只有本地 Privacy 链接，不再显示不能使用的输入框和按钮。未来 double opt-in、独立邮件同意和服务商合同继续在 Privacy/006 保留。
4. Privacy 依据 [Vercel Privacy Notice](https://vercel.com/legal/privacy-notice)（访问 2026-09-08）补条件式托管说明：托管版本可能为交付、维护、安全处理 IP、IP 推导的大致位置与系统信息。分析/表单未启用不等于基础托管不处理数据。链接指向 Vercel 自身隐私实践，不替代本站声明。不推定账户开关、日志保存期限或地区。

## 文件与职责

- `src/components/IllustrationDetails.astro`（新增）：首页/目录专用原生图注展开，保持完整署名与 AI 披露可见。
- `src/components/IllustratedLink.astro`、`src/templates/HomeTemplate.astro`：接入图注；Home 同时更新可读导语。
- `src/components/NewsletterForm.astro`、`src/components/ReaderRequest.astro`：移除 disabled 控件及重复流程长文，保留静态状态、唯一性、身份和 Privacy 路径。
- `src/pages/privacy.astro`：更新无控件现状表述、加入托管说明与官方政策链接。
- `src/styles/global.css`：展开标签点击/焦点区域、收紧未开放区块；删除因本次组件改动失去用途的控件样式。
- `scripts/hero-output-policy.mjs`：独立按路径固定展开/完整图注形式，逐图验证全文、始终可见的 AI 披露和可访问展开标签。
- `scripts/review-output-policy.mjs`：review/public 共用静态交互零控件与可见状态校验，保留位置、page ID、唯一链接、零真实供应商和伪成功负边界；补托管说明/链接检查。
- `tests/site/hero-output-policy.test.mjs`、`tests/site/review-output-policy.test.mjs`、`tests/site/external-interactions-ui.test.ts`、`tests/site/responsive-layout.test.ts`：删除不再适用的 disabled 控件布局测试，调整 fixture，覆盖隐藏/错位图注或状态、错误折叠、错误政策链接、控件回流等边界；不为简单界面导语增加镜像测试。
- `README.md`、`DEV_WORKFLOW.md`、`docs/DESIGN.md`、`docs/ARCHITECTURE.md`、`docs/REFERENCES.md`、`docs/requirements/006-external-interactions.md`、`docs/requirements/013-public-artifact-assembly.md`：同步当前呈现、外部引用、命令与验证摘要。本文件记录本批证据，014/015 历史范围不回写。

## 验证与退出

先完成上述局部修改，再执行既有固定 runtime 的格式化、完整 check、public → review 构建与各自输出校验。图片 oracle 继续要求 19 个图位和 112 个输出，只有三条明确目录路径可折叠；任何隐藏 AI 披露、借用其他图片 caption、无展开入口或详情误折叠均失败。交互区即使回流 disabled 输入/按钮也失败。

临时 preview 走查桌面、平板、手机的完整页面，重点看 Home→Collection→Entry→Sources→Related→Footer、图注展开/收回与键盘焦点。截图留在仓库外；结束用固定 stop 入口关闭并核对端口。public 特有日期/Beta 提示、最终 clean-source QA、真实设备/读屏器/性能、受保护预览及上线验证分别说明，不冒充已完成。

## 实施与验证记录

- 实现：上述组件、界面导语、样式与托管说明已落地；11 处原生图注展开、8 处完整详情图注，未引入脚本。状态区只保留文字与本地 Privacy 链接。浏览器发现两处文字与链接粘连后补显式空格并重新构建/实看。
- 匹配验证：初始定向 4 文件/188 测试通过；独立只读审查补出外层 open details 与隐藏子元素两个可见性门禁缺口，主代理修复并补负例。最终完整 check 通过 Prettier、ESLint、30 文件/529 测试、Astro 零 error/warning/hint 和 review 输出校验。最后仅两处空格修复后再次格式化、public → review 构建；public 13 HTML/2 XML/robots.txt，review 14 noindex HTML，均保留 112 Hero 与 10 字体、零可执行脚本。
- 浏览器：Codex 内置浏览器以 390×844、768×1024、1440×1000 三档访问全部 13 条普通页面路由，共 39 组合；均无横向溢出、缺图、缺失 H1 或输入/提交控件。一次即时字体状态为 loading，随后同一路由/宽度复测为 loaded。首页三档、手机目录展开/关闭、聊斋首屏、画皮正文/Sources/末尾、桌面托管说明保存并人工查看截图；详情完整图注由构建 oracle 全量覆盖，浏览器抽查。
- 操作：实点 Home → Liaozhai → Painted Skin、来源锚点、Related → Fighting Cricket、Footer → Privacy；图注 Tab 可达、2px 可见焦点、Enter 展开完整原文、Space 收回，署名/AI 始终显示。运行日志抽查无 warning/error。没有启动真实表单、分析或供应商写入。
- 退出：固定 preview PID 30856 已停止，进程不存在且 4321 无 LISTENING，残留 TCP 关闭态不算服务监听；viewport 重置、临时标签关闭。截图和 checks.json 位于仓库外 reader-facing-polish 目录。
- 追溯/诊断：未改文化正文、来源对象、内容 Schema、生产资产/manifest 或字体；非默认视觉再生产不适用。原文图注、署名、AI 披露和 alt 继续逐图与独立合同匹配；构建期共享 oracle 同时约束两种输出，没有引入新的业务抽象或配置。006/013 与设计、架构、引用、运行说明同步当前合同。
- 保留项：当前仍为 dirty source 本地诊断；未执行 Git 写入、远端同步或部署。public 特有 Beta/日期的最终显示、真实设备/读屏器/200%/资源故障/性能等最终候选 QA、托管账户现场与地区访问验证、供应商接线、clean-source receipt 仍按原门禁完成。本批不是生产放行或 owner 最终视觉签字。
