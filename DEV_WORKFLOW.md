# DEV_WORKFLOW.md

## 职责

本文件是初始化、构建、启动、验证、版本控制和发布命令的唯一来源。当前工作区包含文档、冻结的不可发布 M1 独立原型和一个本地 Git 仓库；用户已建立 `main`、initial commit 与 `origin`。M2 技术合同已经确认，但尚无项目运行时、应用依赖、应用源码或发布环境。不提供不可执行的假设命令，也不把文档决策写成已经实施的状态。

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

应用初始化仍不适用。没有 `package.json`、锁文件、应用源码和应用配置；`prototypes/entry-reader-flow.html` 是直接评审用静态原型，不构成应用运行时。因此不得把 M2 决策确认或临时预览解释为实施开始、依赖授权或长期开发服务器。

### M2 已确认目标与实施授权门禁

已确认但尚未执行的项目环境合同：

- Node.js 24 LTS；初始精确值 `24.20.0`，未来 `.node-version` 精确记录，`engines.node` 限制为 `>=24.20.0 <25`。
- pnpm 11；初始精确值 `11.22.0`，未来 `packageManager` 记录 `pnpm@11.22.0`，`engines.pnpm` 限制为 `>=11.22.0 <12`，仓库只保留 `pnpm-lock.yaml`。
- Astro 7 静态模式、TypeScript strict、Entry Markdown、结构化 YAML、Content Layer、内容图校验与 Vitest；不安装 adapter、MDX、UI/CSS/动画框架、Playwright 浏览器、CMS、数据库、认证、搜索、外部服务或商业依赖。
- 当前非空仓库只允许在精确根目录手工建立最小 Astro 配置，不运行 starter/template 向导，不创建临时项目、旁路目录、worktree 或新仓库。

2026-08-27 的只读环境核查：公开 PATH 为 Node.js `16.20.2`、npm `8.19.4`、pnpm `11.19.0`、Corepack `0.17.0`。Node.js 16 已停止维护且不满足 Astro 7 的运行前提；现有 pnpm 也不是已确认精确值。M1 临时预览使用的 Codex bundled Node.js `24.19.0` 只属于历史临时服务，不得当作项目长期运行时或借此跳过授权。

下列动作仍需用户单独授权：安装或切换 Node.js 24.20.0、提供/切换 pnpm 11.22.0、下载应用依赖、生成 `node_modules` / `package.json` / `pnpm-lock.yaml` / 配置 / 源码 / 测试，以及启动任何 dev/preview 服务。授权后且执行安装前，必须先在本节补入当时验证过的精确初始化/安装命令、影响、停止条件和回查方式；若官方兼容信息已变化，先更新架构与需求文档，不静默换版本。

初始化后必须建立 `format:check`、`lint`、`test`、`typecheck`、`build` 与聚合 `check` 的真实 script；其中 `build` 必须先执行 `astro check` 再执行 `astro build`，`check` 还须覆盖格式、lint 与 Vitest。脚本文件不存在前，本段只是执行门禁，不是可运行命令。

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
- `Ctrl+C` 未在限定等待内结束进程，随后只读确认精确监听 PID、Node 路径与启动时间后终止该临时进程。`127.0.0.1:4173` 已无监听且 HTTP 不可达；项目仍无 `package.json`、锁文件或 `node_modules`。

`docs/requirements/001-mvp-foundation.md` 的 M2 决策合同已经确认；应用初始化仍未授权。获得实施授权后，必须在执行任何安装前把以下真实信息写入本文件：

- 已实际切换并验证的 Node.js 与包管理器身份。
- 初始化与安装命令及其状态影响。
- 开发、构建、预览、定向测试、全量测试、格式和类型检查命令。
- 本地、预览和生产环境的实际身份校验。
- 部署入口、源身份和发布后只读检查。

## 文档验证

以下命令可在当前阶段执行，均为只读检查。

### 文件清单

```powershell
rg --files -g '*.md'
```

通过标准：根目录治理文档、`docs/` 专题文档和首个需求文档全部存在。

### 原模板占位符

```powershell
rg -n '\{\{[^}]+\}\}' .
```

通过标准：无输出。

### UTF-8 严格解码

```powershell
$utf8Strict = [Text.UTF8Encoding]::new($false, $true)
$invalidUtf8Files = @()
Get-ChildItem -LiteralPath . -Recurse -File -Filter '*.md' | ForEach-Object {
  try {
    $null = $utf8Strict.GetString([IO.File]::ReadAllBytes($_.FullName))
  } catch {
    $invalidUtf8Files += $_.FullName
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
Get-ChildItem -LiteralPath . -Recurse -File -Filter '*.md' | ForEach-Object {
  $markdownFile = $_
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
- `git remote -v` 无输出，未创建远端，也未执行 push。应用运行时、依赖、托管和发布仍未初始化。
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
