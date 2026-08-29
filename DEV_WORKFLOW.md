# DEV_WORKFLOW.md

## 职责

本文件是初始化、构建、启动、验证、版本控制和发布命令的唯一来源。当前工作区包含 M2 静态应用、测试、文档、冻结的不可发布 M1 独立原型和一个本地 Git 仓库；用户已建立 `main`、M1/M2/M3/M4-U1/U2 基线提交与 `origin`。M2 历史基线为 `f258227`，M3 历史基线为 `c606f5`（`M3 completed`），当前提交基线为 `8c6d12`（`feat(pages): add M4 noindex review slice`）。M3 终验中发现的 Hero v1 手部解剖缺陷已按版本合同返修为 Hero v2，并由 Project owner 于 2026-08-29 明确验收。当前七个精确画布 master、七份 repository source rendition、两份 production record 与五份 manifest 版本记录已核验；四个逻辑资产各有唯一 approved/current，Hero v1 保留为 approved/non-current 审计历史。严格视觉 Schema、loader、validator、metadata registry、current resolver 与非默认 local master/响应式构建验证入口均保持有效；`sharp@0.35.4` 仍是项目直接依赖，三份 current responsive rendition 的 22 个目标已实际生成并解码复核。Project owner 已完成 M4-U1 合同确认、单独授权 M4-U2，并在获授权的本地 preview/浏览器评审后确认 U2 页面方向。正式字体与 U5 完整页面门禁仍未完成；U3-U5、依赖、代理 Git 写入、部署与发布未获授权。项目没有真实联调环境或发布环境。不提供不可执行的假设命令，也不把本地 build 或 preview 解释为远端预览或生产发布。

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

- Node.js 24 LTS；固定绝对路径为 `D:\Program Files\nvm\v24.16.0\node.exe`，初始精确值与当前 `.node-version` 均为 `24.16.0`，`engines.node` 限制为 `>=24.16.0 <25`。所有会话和项目命令必须显式调用该路径，不依赖 PATH、`nvm use` 或 Codex bundled runtime。
- pnpm 11；初始精确值为 `11.22.0`，当前 `packageManager` 记录 `pnpm@11.22.0`，`engines.pnpm` 限制为 `>=11.22.0 <12`，仓库只保留 `pnpm-lock.yaml`。
- Astro 7 静态模式、TypeScript strict、Entry Markdown、结构化 YAML、Content Layer、内容图校验与 Vitest；不安装 adapter、MDX、UI/CSS/动画框架、Playwright 浏览器、CMS、数据库、认证、搜索、外部服务或商业依赖。
- 当前非空仓库只允许在精确根目录手工建立最小 Astro 配置，不运行 starter/template 向导，不创建临时项目、旁路目录、worktree 或新仓库。

固定 Node 身份只读验证：

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

通过标准：命令退出成功并精确返回 `v24.16.0`。不得用无路径限定的 `node` 结果替代此门禁。

2026-08-27 的只读环境核查：公开 PATH 为 Node.js `16.20.2`、npm `8.19.4`、pnpm `11.19.0`、Corepack `0.17.0`。这些 PATH 工具不得用于本项目。用户随后固定所有会话使用 `D:\Program Files\nvm\v24.16.0\node.exe`；该目录已验证为 Node.js `24.16.0`，并自带 npm `11.13.0` 与 Corepack `0.35.0`，但没有现成的 `pnpm.cmd`。M1 临时预览使用的 Codex bundled Node.js `24.19.0` 只属于历史临时服务，不得当作项目长期运行时或借此跳过授权。

固定 Node.js `24.16.0` 的选择与只读验证已经完成，不再安装或切换其他 Node。用户于 2026-08-27 明确授权：使用该固定 Node 自带的 Corepack 提供项目固定的 pnpm `11.22.0`，下载 M2 白名单依赖，并在当前非空仓库根手工建立最小应用。授权不包含启动 dev/preview 服务、Git 写操作或发布。

执行安装前，先由文件修改建立 `.node-version`、`package.json`、Astro/TypeScript/ESLint/Prettier 配置与应用源码；不运行 starter/template。M2 初始依赖白名单固定为：运行依赖 `astro@7.2.8`；开发依赖 `@astrojs/check@0.9.10`、`@eslint/js@10.0.1`、`@types/node@24.13.3`、`eslint@10.9.1`、`eslint-plugin-astro@3.1.0`、`prettier@3.6.2`、`prettier-plugin-astro@0.14.1`、`typescript@6.0.3`、`typescript-eslint@8.68.0` 与 `vitest@4.1.11`。M3-U5 经 Project owner 单独授权后增加唯一运行依赖 `sharp@0.35.4`，用于 Astro 构建期响应式 AVIF/WebP 编码。Prettier 暂停在 `3.6.2`，因为稳定的 `prettier-plugin-astro@0.14.1` 与 Prettier `3.7+` 存在尚未进入稳定版插件的 Astro 条件内联脚本解析回归；插件发布兼容版后再独立升级。不得在安装时静默增加 adapter、MDX、UI/CSS/动画框架、Playwright、CMS、数据库、认证、搜索、外部服务或商业依赖。

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

影响：`corepack install` 只把 `packageManager` 指定的 pnpm 下载到 Corepack 用户缓存；当前机器的 pnpm 内容寻址 store 实际为 `F:\.pnpm-store\v11`，项目内只生成 `node_modules` 与唯一的 `pnpm-lock.yaml`。pnpm 11 默认的一日依赖成熟期策略因 Astro `7.2.8` 为新发布的已确认精确版本，在项目根 `pnpm-workspace.yaml` 记录 `astro@7.2.8` 的 `minimumReleaseAgeExclude`；同一文件显式记录 `allowBuilds.esbuild: false`，与 `--ignore-scripts` 的既有供应链边界一致，不授权第三方生命周期脚本。该文件不声明额外工作区包。安装不创建全局 pnpm shim，不修改系统 PATH、nvm 当前选择或其他项目。上述 PATH 调整只作用于当前 PowerShell 进程，确保 pnpm 启动的 `node`、Astro、ESLint、Vitest 与 Prettier 子进程也解析到固定目录。若根目录、固定运行时/Corepack/pnpm 精确版本、manifest 白名单或锁文件种类不符，若安装要求额外依赖/构建批准，或任一命令失败，立即停止，不改用其他 Node、pnpm、lock 或 fallback。

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

初始化必须建立 `format:check`、`lint`、`test`、`typecheck`、`build` 与聚合 `check` 的真实 script；其中 `build` 必须先执行 `astro check` 再执行 `astro build`，`check` 按格式、lint、Vitest、build 的顺序执行。所有命令都通过固定 Corepack 显式调用：

```powershell
& $mythicProjectCorepack pnpm run format:check
& $mythicProjectCorepack pnpm run lint
& $mythicProjectCorepack pnpm run test
& $mythicProjectCorepack pnpm run typecheck
& $mythicProjectCorepack pnpm run build
& $mythicProjectCorepack pnpm run check
```

`dev` 与 `preview` script 可以写入 manifest，但本轮没有服务启动授权，不执行。首次锁文件生成并通过门禁后，干净环境复现使用 `& $mythicProjectCorepack pnpm install --frozen-lockfile --ignore-scripts`；任何 manifest/lock 不一致必须失败，不允许在验证阶段静默更新锁文件。

定向测试使用同一身份门禁和进程环境，例如：

```powershell
& $mythicProjectCorepack pnpm exec vitest run tests/content/content-schemas.test.ts
```

只有获得单独服务启动授权后，才可在已经通过上述根目录、Node、PATH 子进程与 pnpm 身份门禁的同一 PowerShell 会话中运行：

```powershell
& $mythicProjectCorepack pnpm run dev -- --host 127.0.0.1
# 或按明确验收范围运行：
& $mythicProjectCorepack pnpm run preview -- --host 127.0.0.1
```

影响：命令会启动本地 HTTP 服务并持续占用端口，必须记录实际监听地址和 PID；验收完成、根目录/运行时身份变化、出现非预期外部监听或服务错误时立即 `Ctrl+C`，随后只读确认端口不再监听。本次 M2 没有获得或执行这项服务授权。

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

M4-U2 使用环境变量 `MYTHIC_CHINA_BUILD_INTENT` 表达页面构建意图。本单元唯一允许值为 `review`；缺失、`public` 或其他未知值都必须失败。`public` 只有在后续单元建立 published-only 投影与 SEO 发布门禁后才能加入允许值，不能由 `NODE_ENV`、平台 URL 或内容数量推断。

项目 scripts 通过 `scripts/run-review-astro.mjs` 只向其 Astro 子进程注入 `review`，子进程结束后变量随之退出，不修改调用者 shell、系统环境或项目配置。直接绕过该入口运行 Astro 时，页面构建意图缺失并按合同失败。该入口可以用于已授权的静态检查和构建；`dev` / `preview` script 虽保持可执行定义，但每次启动、停止或重启仍须单独授权。M4-U2 页面评审已获得并使用一次本地 preview/浏览器授权，该授权不自动延续到 U3-U5。

### M4-U2 页面、静态与浏览器验证记录

- 已实现显式 review 投影、共享页面壳、Home/Explore/Collections/Collection/两个 Entry/About 共 7 页、approved/current Hero v2 页面接线、完整 Source 展示、CSS-only Collection realm surface 与输出 verifier。
- Project owner 在 411×651 实际视口查看后反馈字号偏大、排版松散；授权范围内只调整 `src/styles/global.css`，收敛主标题、区块间距、Home 分栏、索引/About 信息轴、Collection 移动顺序和 Entry Hero 响应式尺度，未改内容、路由、组件结构或图片。
- 固定 Node/Corepack 下 `pnpm run check` 通过 Prettier、ESLint、13 个测试文件/87 项测试、`astro check`（53 个文件，0 error、0 warning、0 hint）与 7 页静态 build。产物审计确认全部页面为 `noindex, nofollow`、全部内部链接有效、无 canonical/OG/JSON-LD/Sitemap/RSS/客户端 JavaScript，并精确生成 14 个 Hero v2 AVIF/WebP 页面输出。
- `pnpm run visual:build:check` 回归通过七个 local master 与三份 current responsive rendition 的 22 个实际输出复核。
- 获单独授权后启动本地 preview，并在真实浏览器逐页复核全部 7 页的 1440×900、768×900 与 390×844 视口；另在 Project owner 当前 411×651 视口复核 Explore。未发现横向溢出或控制台错误/警告，页面保持 `noindex, nofollow` 与零客户端 JavaScript。
- Project owner 于 2026-08-29 明确确认 M4-U2 页面方向。该确认基于系统 fallback 字体，不构成正式字体、键盘全链、真实 200% 缩放、禁用 JavaScript、reduced-motion、图片失败、性能、跨平台 fallback、U5 最终视觉或发布批准。
- U1/U2 主体已由用户提交为 `8c6d12cabce11741bb83941904993f4d8831c818`；代理未执行 Git 写入、部署或发布。后续 U3-U5 与服务控制仍须逐项授权。
- 未改内容、Schema、manifest、production record、repository source、依赖或 lockfile。未来 Hero 版本切换必须同步受控页面图片 registry；不一致时构建失败，不静默回退。

## 数据库、外部服务与真实写入口

当前均不适用。项目没有数据库、表单 endpoint、邮件、分析、支付或广告配置。未来接入任一能力时必须先建立需求文档，并在本文件增加：

- 环境和实际身份校验。
- Mock/隔离测试入口。
- 真实写入影响、授权、停止条件和回查方式。
- 隐私、数据保留和删除策略对应的可执行门禁。

## 发布

当前不适用。没有托管项目、域名、预览环境或生产环境。任何首次预览部署和生产发布都需要用户逐次授权，并先更新本文件为真实命令。

## 超时、中断和未知现场

未来任何远端发布、表单联调或数据操作出现超时、断连或结果不明时：停止重复执行，记录最后确认步骤，仅做只读状态核查，再根据现场事实决定继续或人工恢复。
