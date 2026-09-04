# DEV_WORKFLOW.md

## 职责

本文件是初始化、构建、启动、验证、版本控制和发布命令的唯一来源。当前工作区包含 M2 静态应用、测试、文档、冻结的不可发布 M1 独立原型和一个本地 Git 仓库；用户已建立 `main`、M1/M2/M3/M4-U1/U2/U3 基线提交与 `origin`。M2 历史基线为 `f258227`，M3 历史基线为 `c606f5`，M4-U2 历史基线为 `5f327b6`，M4-U3 实现基线为 `e94eaca`。M3 Hero v1 手部缺陷已按版本合同返修为 Project owner 验收的 Hero v2；当前 11 个精确画布 master、11 份 repository source rendition、四份 production record、七份 manifest 版本记录、六个 approved/current 逻辑资产及七份 current responsive rendition 的 50 个目标均有既有验证证据。经 2026-09-02 项目总检，M4 本地产品实现已完成：U1–U3、U4A public/SEO 纯基础设施、首个纵切片、Collection/Guide Hero、4 份英文与 6 份 CJK WOFF2 静态链、U5A direct-only noindex 字体样张、23 文件/279 测试、8 页/42 图/10 字体/零 XML/零客户端 JavaScript、24 个最终视口组合、12 个 Hero art-direction 组合及 Project owner 当前 8 页判断均已闭合。Project owner 随后把该完成状态提交为本地基线 `3983bee91ada4a286613ec702a8009a4f528af3f`；进入 M5 前只读复核确认工作树、暂存区和未跟踪文件均为空，本地 `main` 相对当时未 fetch 的 `origin/main`（`e2893d1`）显示 ahead 1。M5-U2 实施期间，reflog 显示 `origin/main` 于 2026-09-02 14:04:40 +0800 由外部 push 更新到 `3983bee`；本批未执行 fetch 或任何 Git 写操作，且 tracking ref 不单独证明服务器端状态。Project owner 后续把 M5-U1–U3、U4 账户准备快照与第二 Collection 决策包提交为 `3fa46d5f85c43a5278e15ca6b0630d724439acc9`；2026-09-03 四篇研究批开始时 HEAD、本地 `main` 与本地 `origin/main` tracking ref 均为该提交，工作树干净。`public` intent、runner、页面/endpoint、deployable artifact、`ready/published` 内容、远端环境和发布都不存在。真实键盘/200%、偏好/故障、本地性能与支持平台 fallback 归 M6 release-candidate gate；M7 只承接生产、live smoke、回滚、线上地区复核与 RUM/p75。原计划 M4-U4B 的接线归 M6 public artifact assembly。未来服务、内容状态提升、代理 Git 写入、Vercel 项目操作、部署与发布仍须分别授权；项目没有真实联调环境或发布环境。不提供不可执行的假设命令，也不把本地 build 或 preview 解释为远端预览或生产发布。

M5-U2 的三个 provider-neutral service/Fake 与 M5-U3 的 inert Newsletter、Reader Request、Privacy review 页面和 HTML5 DOM output oracle 已进入 `3fa46d5`；当时 review inventory 为 9 页/42 Hero/10 WOFF2/零 XML/零客户端 JavaScript。2026-09-04 的四篇证据最小物化又建立 4 个 draft Entry、5 Source、9 Claim、3 Terminology、Source 数字影像证据门禁，并通过当前 13 页 review inventory 完整门禁；这些结果与 Buttondown 审核事实同步已形成本地检查点 `9914dd3`，未 push。随后 Ten Kings 只消费已闭合的 2 Source / 3 Claim / 1 Terminology 并形成证据受限英语首稿，仍为 `draft`；其余三个新增 Entry 为空。Project owner 同日确认 Buttondown `mythic-china` 账户审核已通过，Tally Free 账户与未发布 Reader Request 草稿已准备；两者仍只是 U4 条件方向，均未接入站点、提供 action/link 或处理数据。Plausible 留 U5；项目仍没有图片、Collection 新关系、状态提升、真实 supplier transport、网络请求或 public artifact。

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

M4 使用环境变量 `MYTHIC_CHINA_BUILD_INTENT` 表达页面构建意图。当前唯一允许值仍为 `review`；缺失、`public` 或其他未知值都必须失败。M4-U3 已建立纯 published-only release 数据投影，M4-U4A 又建立纯 public/SEO builder，但它们都不是 build intent 或 deployable artifact；`public` 只有在 M6 public artifact assembly 获得真实 origin、published 内容、正式 loader 链、页面/output 接线与本地 public 技术门禁后才能另行加入，不能由 `NODE_ENV`、Vercel URL 或内容数量推断。该技术门禁不代表 M6 远端预览或 M7 生产发布资格。

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
- 新增 5 份 Source、9 份 verified Claim 与 3 份 `source-checked` Terminology；当前总 inventory 为 6 Entry / 1 Collection / 14 Source / 19 Claim / 5 Terminology，published 仍为 0/0。
- Source Schema 新增必填 `usesDigitalImageEvidence`；值为 `true` 时 `rightsStatus` 与 `rightsUrl` 同时必填。9 份既有 Source 已按当前 Claim/Terminology locator 是否依赖数字页图、IIIF canvas 或对象图像显式迁移；`false` 不等于网页无图，权利对也不授予 Asset 复用。
- 明确排除 CText/Giles Painted Skin Source、`孽鬼` Terminology、尚无实际册页的任/张 Source，以及《促织》跨见证、作者归属、FC-08–FC-10、“首次增写”与起源 Claim。
- 四个 draft 经既有动态路由增加四个 direct-only noindex review 页面；页面模板未改。`font-specimen-policy.mjs` 与 `verify-m4-u2-output.mjs` 已把当前精确清单扩为 13 HTML，六个 Entry 各保留一个 inactive Reader Request；Hero 仍为 42、WOFF2 仍为 10、XML 与客户端 JavaScript 仍为 0。Explore/Collections 固定候选架不变。
- 匹配验证：定向 3 个文件/35 项测试通过；最终完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 build 与 output verifier。实际输出为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript；13 页各一个 inactive Newsletter，六个 Entry 各一个匹配稳定 ID 的 inactive Reader Request。29 份 Markdown 的严格 UTF-8、相对链接与原模板占位符检查通过，授权范围文本无尾随空白，`git diff --check` 无 whitespace error（仅 Windows LF→CRLF 提示）。

本批未运行 dev/preview/browser 或非默认 `visual:build:check`；未修改图片、manifest 或 master。四个新增页面没有真实浏览器、键盘或缩放证据，完整工程通过不替代这些后续人工门禁。

### 2026-09-04 证据检查点与 Ten Kings 单篇内容纵切片

Project owner 接受“先提交当前证据批，再完成一篇纵切片”的建议。执行前只读复核确认此前工作树恰为四个已授权批次的 48 条路径；固定运行时完整 `pnpm run check`、暂存 diff 范围与 `git diff --cached --check` 通过后，证据批已提交为本地 `9914dd304467118b2c32f7f8ac192cc00344fb92`（`feat: materialize four-entry evidence checkpoint`）。该提交没有 fetch 或 push；提交后 `main` 相对本地 `origin/main` tracking ref 显示 ahead 1。

- 后续只修改 `src/content/entries/ten-kings.md` 与直接负责当前内容状态的权威/领域文档。Ten Kings 标题收窄为 `The Ten Kings: Dates, Records, and Judgment`，只绑定 2 Source / 3 verified Claim / 1 `source-checked` Terminology，形成两段 opening、110 词摘要和四节正文；`lastFactCheckedAt` 为 `2026-09-04`，状态保持 `draft`。
- 文本把 S.3961 对象/数字序列与 CBETA 时间节点/记录机制分别限定，不声称 earliest、普遍日程、超自然实在、历史使用、现实行政制度逐项复制、形成史、跨见证重建或 rebirth。
- 初次完整检查正确拦截英语语言上下文中的中文及当前 hash-locked `zh-Hans` 内容字符集未覆盖的 `十王`。本批未扩展字符集、字体文件、manifest 或字体哈希；可见文本保持英语，`nameZh` / `pinyin` 保持空值，中文形式与拼音留在现有 `source-checked` Terminology 等待双语审核。
- 修正后完整 `pnpm run check` 通过 Prettier、ESLint、25 个测试文件/321 项测试、Astro 81 个文件零诊断、13 页静态 review build 与 output verifier；输出仍为 42 Hero、10 个 hash-locked WOFF2、0 XML、0 客户端 JavaScript。
- 本批没有修改 Schema、测试、图片、Collection/`relatedEntryIds`、状态、外部服务或配置，没有启动服务、提交外部数据、fetch/push、建立 public artifact、部署或发布。Project owner 通过 Ten Kings 首稿并授权本地提交后，该纵切片与相关状态文档已进入当前 HEAD；提交后工作树与暂存区应保持为空。

## 数据库、外部服务与真实写入口

站点运行期当前均不适用。外部已有审核已通过的 Buttondown 账户和 Tally Free 未发布草稿，但项目没有数据库、表单 endpoint、邮件、分析、支付、广告配置或任何可执行外部写入口。未来接入任一能力时必须先建立需求文档，并在本文件增加：

- 环境和实际身份校验。
- Mock/隔离测试入口。
- 真实写入影响、授权、停止条件和回查方式。
- 隐私、数据保留和删除策略对应的可执行门禁。

标准构建、自动化验证和未来静态站部署不拥有数据库、消息系统、缓存或对象存储的生命周期；除非后续架构与本文件明确纳入受控入口，否则不得创建、重建、重启、清空、迁移或轮换这些资源及其凭据。

## 发布

### 证据物化检查点时的交接

Vercel 已被选为未来静态托管目标，Project owner 当前明确不购买自定义域名；项目仍没有稳定 production alias/hostname、真实 origin、预览/生产环境或可执行部署命令。M4 的 noindex 本地产品实现与当时 8 页人工判断已完成；M5-U2 provider-neutral 合同/Fake 及 M5-U3 的 9 页 inert review UI/Privacy 历史基线也已完成。本轮四个 draft Entry 将当前 review 合同扩为 13 页，并物化 5 Source、9 Claim 与 3 Terminology，但 published inventory 仍为 0/0，`public` intent、runner、路由/endpoint、deployable output 和远端环境均不存在。Project owner 于 2026-09-04 确认 Buttondown 账户审核已通过，Tally Free 草稿仍未发布；M5-U4 仍未完成，其下一停点须按 `docs/requirements/006-external-interactions.md` 分别授权 Buttondown 账户级配置与真实 action 核查、合成订阅联调，以及 Tally 发布、精确 hosted link、合成数据写入、回查和删除。M6 的第二 Collection 方向、3+3 路径、Liaozhai 任 2016 主/张 2011 对校路线、《促织》青柯亭单见证路线、四篇 claim map/证据账本及最小证据物化均已完成；下一内容停点须另行授权取得任/张实际册页，或把已物化证据写入 Entry 消费清单并进入逐篇正文/翻译/术语审核。M6 后续仍须完成 6 篇正文、至少 2 个 Collection、关系、全部资产和人工 `published` 决定，并在单独授权下建立 Vercel 项目身份、确认稳定 production hostname 作为阶段性 origin，generated preview/commit URL 不得成为 canonical。随后才实施 public artifact assembly，并从另行授权的 clean committed source 重建同一最终 artifact，执行 output verifier、真实键盘/200%、偏好、字体/图片故障、支持平台、最终视觉/目标读者与本地性能 QA，生成 clean-source verification receipt。dirty source 只允许 nondeployable 诊断记录；M6 远端预览和 M7 生产/live smoke/RUM 仍逐次授权。任何首次项目创建、关联、预览部署和生产发布都必须先把真实命令、身份与回滚写入本文件；不得上传包含 non-published 路由的 review `dist/`。

### 当前交接

上述证据批已形成本地检查点 `9914dd3`；Ten Kings 又完成并获 Project owner 通过单篇证据受限首稿，现已进入当前本地 HEAD，但状态仍为 `draft`，published inventory 仍为 0/0。当前 `main` 相对未 fetch 的本地 `origin/main` tracking ref ahead 2，两次本地提交均未 push。下一内容停点须另行选择 Ten Kings 双语审校、取得任/张实际册页，或其余三篇的逐篇写作；图片、第二 Collection/`entryIds`、状态、public artifact 与发布仍各自受独立门禁。M5-U4、Vercel、最终 clean-source QA、远端预览和 M7 生产边界均未改变。

当前默认禁止在 Vercel、其他最终环境或远端工作区直接修改业务代码；项目也没有可用的受控例外入口。部署、重启、排障或平台项目操作授权都不得推导出远端直接修改授权。若未来业务确需此路径，必须先在架构与本文件定义唯一入口、精确范围、身份门禁、验证、留痕和回流策略，并单独取得授权。

## 超时、中断和未知现场

未来任何远端发布、表单联调或数据操作出现超时、断连或结果不明时：停止重复执行，记录最后确认步骤，仅做只读状态核查，再根据现场事实决定继续或人工恢复。
