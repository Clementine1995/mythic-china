# DEV_WORKFLOW.md

## 职责

本文件是初始化、构建、启动、验证、版本控制和发布命令的唯一来源。当前工作区包含 M2 静态应用、测试、文档、冻结的不可发布 M1 独立原型和一个本地 Git 仓库；用户已建立 `main`、M1/M2/M3/M4-U1/U2/U3 基线提交与 `origin`。M2 历史基线为 `f258227`，M3 历史基线为 `c606f5`（`M3 completed`），M4-U2 历史基线为 `5f327b6`（`M4-u2 completed`），最近确认的 M4-U3 实现基线为 `e94eaca`（`updatee`）。M3 终验中发现的 Hero v1 手部解剖缺陷已按版本合同返修为 Hero v2，并由 Project owner 于 2026-08-29 明确验收。当前 11 个精确画布 master、11 份 repository source rendition、四份 production record 与七份 manifest 版本记录已核验；六个逻辑资产各有唯一 approved/current，Hero v1 保留为 approved/non-current 审计历史。严格视觉 Schema、loader、validator、metadata registry、current resolver 与非默认 local master/响应式构建验证入口均保持有效；`sharp@0.35.4` 仍是项目直接依赖，七份 current responsive rendition 的 50 个目标已实际生成并解码复核。Project owner 已完成 M4-U1/U2/U3 与 M4-U4A，并于 2026-08-30 自行提交 U3 实现与原收口文档；M4-U4A 完成 HTTPS origin 校验、公共身份、public inventory、SEO 与 release artifact 纯基础设施，但不开放 public build、不创建 Vercel 项目且不部署。首个纵切片的编辑形态与字体方案已获阶段性确认；Chinese Underworld Collection Hero 与 Guide Hero 均已完成各自的账户/权利确认、五项人工审核、exact-canvas、公开文案、approved/current 资产链及所属内容的静态接线。2026-09-01 又完成 CJK 字符输入、Source Han Sans SC/TC 六份静态子集、RFN/FONTLOG、精确 `unicode-range` 与实际 HTML/cmap 默认门禁，并完成 M4-U5 的 Windows/local 部分候选预检；完整字体样张、慢加载/故障模式、真实键盘与 200%、跨平台 fallback、Project owner 页面级确认及完整 M4-U5 仍未闭合。M4-U4B、未来服务、代理 Git 写入、Vercel 项目操作、部署与发布仍须分别授权。项目没有真实联调环境或发布环境。不提供不可执行的假设命令，也不把本地 build 或 preview 解释为远端预览或生产发布。

Guide Hero 生产闭环最初直接接续历史基线 `eb6e20c7c2ae5eda895e5a70f547140163877456`（`feat: complete first-slice release readiness gates`）上的未提交 Collection Hero 与本地化合同工作树；该生产批次没有创建分支、worktree、旁路项目或仓库副本，也未执行 fetch 或 Git 写操作。后续只读核查发现这些改动已进入本地提交 `a3194d0d59b605cf7a5fcfc5d2d55166c374e13b`；Project owner 随后授权继续并创建来源复核提交 `d60691a`。未执行 fetch 或 push，精确 HEAD、工作树和 tracking ref 每次仍须按本文件只读复核。

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

`dev` 与 `preview` script 可以写入 manifest，但本轮没有服务启动授权，不执行。首次锁文件生成并通过门禁后，干净环境复现使用 `& $mythicProjectCorepack pnpm install --frozen-lockfile --ignore-scripts`；任何 manifest/lock 不一致必须失败，不允许在验证阶段静默更新锁文件。

自动化验证默认只读取仓库、锁定依赖和本地 fixture，并写入明确的可再生构建产物；不得连接、创建、启动、重启或清空真实数据库、消息系统、缓存、对象存储或其他外部基础设施，也不得调用真实表单、邮件、分析、支付或其他写接口。未来确需隔离集成环境时，必须另列资源身份、授权、影响和真实联调入口。

定向测试使用同一身份门禁和进程环境，例如：

```powershell
& $mythicProjectCorepack pnpm exec vitest run tests/content/content-schemas.test.ts
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
- 当前浏览器控制面不提供 JavaScript 禁用或媒体偏好模拟，真实 Tab/Shift+Tab/Enter 全链、浏览器真实 200% 缩放和开发者工具逐字形命中也无法可靠驱动；这些项目继续保持未验收。批准的自托管字体文件、慢加载、macOS/iOS/Android fallback 与目标读者测试移交首个真实纵切片门禁。
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

M4 使用环境变量 `MYTHIC_CHINA_BUILD_INTENT` 表达页面构建意图。当前唯一允许值仍为 `review`；缺失、`public` 或其他未知值都必须失败。M4-U3 已建立纯 published-only release 数据投影，M4-U4A 又建立纯 public/SEO builder，但它们都不是 build intent 或 deployable artifact；`public` 只有在 M4-U4B 获得真实 origin、published 内容、页面/output 接线与本地 public 技术门禁后才能另行加入，不能由 `NODE_ENV`、Vercel URL 或内容数量推断。该技术门禁不代表 M6 远端预览或 M7 生产发布资格。

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

## 数据库、外部服务与真实写入口

当前均不适用。项目没有数据库、表单 endpoint、邮件、分析、支付或广告配置。未来接入任一能力时必须先建立需求文档，并在本文件增加：

- 环境和实际身份校验。
- Mock/隔离测试入口。
- 真实写入影响、授权、停止条件和回查方式。
- 隐私、数据保留和删除策略对应的可执行门禁。

标准构建、自动化验证和未来静态站部署不拥有数据库、消息系统、缓存或对象存储的生命周期；除非后续架构与本文件明确纳入受控入口，否则不得创建、重建、重启、清空、迁移或轮换这些资源及其凭据。

## 发布

Vercel 已被选为未来静态托管目标，但当前没有 Vercel 项目、稳定 production alias/hostname、自有域名、预览环境、生产环境或可执行部署命令。首个纵切片现有两篇 `editorial-review` Entry、一个 `editorial-review` Collection、分别由 Collection 与 Guide 静态消费的两套 approved/current 自有 Hero、4 份英文 WOFF2、6 份 CJK 派生 WOFF2 与可见 byline/fact-check 日期；双语术语、Source 标题 locale、CJK 字符/子集/RFN/cmap 静态门禁已闭合，正式字体已有 Windows/local 页面命中与三档布局的部分证据，但专用字体样张、慢加载/故障模式、真实键盘/200%、跨平台 fallback 和完整 M4-U5 候选预检仍未闭合。仓库已经存在 published-only release projection 纯函数，但真实 published inventory 仍为 0/0，也没有 public runner、路由/endpoint 接线或 deployable public output。首个纵切片先在 noindex 直达页完成 U5 候选预检并进入 `ready`；M5/M6 完成 6 篇 Entry、至少 2 个 Collection、全部资产和人工 `published` 决定后，必须在真实非空索引上最终关闭 U5，再确认 public origin 并进入 U4B。U4B 的一个 Entry + 一个 Collection 只是 public 构建纯技术下限，不授权远端预览；实际预览候选为 6 篇 Entry / 至少 2 个 Collection，M7 才可进入生产发布与发布后基线。没有自有域名时，可在 U4B 前单独授权建立项目身份，以确认稳定 production alias/hostname；这不授权预览或部署。任何首次项目创建、关联、预览部署和生产发布都需要用户逐次授权，并先更新本文件为真实命令。U4B 只生成包含 source revision、dirty flag、lock/source digest、public intent 和 verifier 结果的本地 verification receipt，dirty source 一律 nondeployable；M6 远端预览才把 clean committed source、验证结果与具体 deployment target 绑定为 `validated_source_identity`，复用不可变制品时还须记录完整 artifact inventory/digest。不得上传包含 non-published 路由的 review `dist/`。

当前默认禁止在 Vercel、其他最终环境或远端工作区直接修改业务代码；项目也没有可用的受控例外入口。部署、重启、排障或平台项目操作授权都不得推导出远端直接修改授权。若未来业务确需此路径，必须先在架构与本文件定义唯一入口、精确范围、身份门禁、验证、留痕和回流策略，并单独取得授权。

## 超时、中断和未知现场

未来任何远端发布、表单联调或数据操作出现超时、断连或结果不明时：停止重复执行，记录最后确认步骤，仅做只读状态核查，再根据现场事实决定继续或人工恢复。
