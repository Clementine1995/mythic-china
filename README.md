# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 阶段：M1 已于 2026-08-27 按用户明确决定完成并冻结为首个工程参考基线；M2 工程与内容核心已由用户提交为本地基线 `f258227`（`feat: complete M2 content foundation`）。M3-U1/U2/U3/U4/U5 已完成。M3 终验曾因 Hero v1 双手解剖缺陷重开；2026-08-29 Project owner 明确验收定向返修候选后，Hero v2 已成为 approved/current，Hero v1 保留为 approved/non-current 审计历史。当前版本化 inventory 共七个精确画布 master、七份 repository source rendition、两份真实 production record 与五份 manifest 版本记录，其中四份为 approved/current。`sharp@0.35.4` 仍是唯一新增的项目直接依赖；返修后 `visual:build:check` 已复核七个 local master，并从三份 current responsive rendition 实际生成、解码验证全部 22 个 AVIF/WebP 目标。Entry 仍为 draft，`heroAssetId` 继续通过稳定逻辑 ID 解析 Hero v2；M4 页面尚未开始。既有 M1 原型仍不可发布。
- 视觉方向：冻结时的 M1 页面外观仍未获批准；2026-08-27，用户在后续仓库外 Home 方向稿中确认“以 A 为主、C 为辅”。首个真实 Home 以 A 的现代文化展览式中性母体、图片主导的非对称策展构图为主，并以 C 的抽象雕塑、地形、路径和裁切为辅助语汇。该选择只确认 Home 概念方向，不追认旧原型，也不批准方向稿本身、最终页面、字体或 M3 资产在页面中的具体使用；这些语言如何延展到共享表现层、Collection 与 Entry 仍须在真实纵切片中设计并确认。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。
- 当前权威日期：2026-08-29。
- 下一阶段是 M4 页面、探索与 SEO，但尚未获得实施授权；进入 M4、启动 dev/preview 服务、Git 写入或发布仍须分别授权。制作方式保持 AI-assisted OpenAI ImageGen，本期不使用 ComfyUI。

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

M2/M3-U5 已建立本地静态应用、视觉资产合同和非默认生产复核链路：`Entry Markdown / 结构化 YAML + visual brief / production record / versioned manifest -> 严格 Schema -> 纯内容图与视觉资产图/文件校验 -> 显式 current resolver -> Astro 静态路由 -> dist/`。当前真实 inventory 包含一份 approved brief、两份 production record、五份 manifest 版本记录与七份 repository source rendition；四个逻辑资产各有且仅有一份 approved/current manifest，Hero v1 的两份 source 与版本记录保留为 approved/non-current 历史。默认构建会核对记录关系和全部 repository 文件 metadata，但不会读取 Git-ignored `/.local/` master。非默认 `visual:build:check` 会复核七个 local master，并通过直接依赖 `sharp@0.35.4` 按三份 current responsive buildPlan 实际生成和解码验证 22 个 AVIF/WebP 目标。钟馗 Entry 已通过 versionless `assetId` 解析 approved/current Hero v2；应用仍只生成 `/collections/chinese-underworld/`、`/explore/zhong-kui/` 与 `/explore/chinese-underworld-guide/` 三个 `noindex` debug 页面，两个 Entry 保持空正文 draft。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 继续组成冻结的 M1 独立原型，不属于应用构建输入。目标体验与内部生产仍必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。轻量出处随相关主张出现；完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前已有本地应用开发与自动验证环境，但没有已授权运行中的 dev/preview 服务、真实联调环境、数据库、托管项目或远端发布资源。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地应用、文档与原型工作区 | `F:\codex-project\mythic-china` | M2 本地基线为 `f258227`；M3-U1 开始前 HEAD、`main` 与本地 `origin/main` 对齐且工作树干净，未执行 fetch 核验远端服务器；当前有未提交的 M3-U1–U5 合同、研究、代码、视觉资产、Hero v2 返修、`sharp@0.35.4` 与锁文件改动 | 固定 Node、pnpm、构建、验证与 Git 命令见 `DEV_WORKFLOW.md` | 本地 draft 内容、一份 approved brief、两份 production record、五份 manifest 版本记录、七份 approved repository source rendition、不可发布 M1 原型与 prototype-only 图片；其中 Hero v1 为非 current 审计历史，无数据库或真实外部写入口 | M2 静态构建、自动验证、M3 合同/研究/资产门禁与工程参考评审 |

## 项目构建与运行

项目已经手工最小初始化；不使用 starter、adapter、MDX、UI/CSS/动画框架或外部服务。所有本地命令必须按 `DEV_WORKFLOW.md` 将 `D:\Program Files\nvm\v24.16.0` 置于当前进程 PATH 首位，并通过同目录 Corepack 调用 pnpm `11.22.0`；直接使用公开 PATH 的 Node/pnpm 不受支持。`dev` 与 `preview` script 虽已存在，但启动服务仍需单独授权。完整边界见 `docs/ARCHITECTURE.md` 与 `docs/CONTENT_MODEL.md`。

## 当前最小验证

工作目录：`F:\codex-project\mythic-china`

执行当前工程聚合门禁：

```powershell
$fixedRuntime = 'D:\Program Files\nvm\v24.16.0'
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:Path = "$fixedRuntime;$env:Path"
& (Join-Path $fixedRuntime 'corepack.cmd') pnpm run check
```

该命令真实覆盖 Prettier check、ESLint、Vitest、`astro check` 与静态 build。完整身份门禁、定向命令、干净安装和停止条件以 `DEV_WORKFLOW.md` 为唯一来源。

检查是否残留原模板占位符；通过标准为无输出：

```powershell
rg -n '\{\{[^}]+\}\}' .
```

检查文档中的相对 Markdown 链接；当前阶段先按 `DEV_WORKFLOW.md` 的“文档验证”执行只读核查。

## 目录说明

- `docs/PRODUCT.md`：产品需求、目标用户、MVP、指标、扩展与商业化边界。
- `docs/DESIGN.md`：项目级视觉系统、页面结构、动效和无障碍规范。
- `docs/COMPETITIVE_AUDIT.md`：直接竞品与相邻标杆的观察、可借鉴项、不采用项和 M1 比较门禁。
- `docs/ARCHITECTURE.md`：静态优先技术架构、数据边界和升级触发条件。
- `docs/CONTENT_MODEL.md`：内容分类、声明与术语记录、工具无关的视觉资产及读者反馈模型。
- `docs/REFERENCES.md`：本轮外部参考、视觉 Skill/工具采用边界与用途说明。
- `docs/requirements/`：`001` 保存 MVP/M1–M7 总合同，`002` 保存 M3 视觉资产管线的详细合同、实施单元和验收状态。
- `src/`：M2 Content Layer、纯内容图校验、语义 debug templates 与静态路由。
- `tests/`：内容 ID、Schema、内容图和 M2 架构边界 Vitest。
- `scripts/verify-runtime.mjs`：固定 Node 子进程身份门禁。
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

- `docs/PRODUCT.md`：产品事实与阶段路线的单一事实来源。
- `docs/DESIGN.md`：视觉方向与设计约束的单一事实来源。
- `docs/COMPETITIVE_AUDIT.md`：竞品定位与设计差异化的审计证据。
- `docs/ARCHITECTURE.md`：目标技术边界的单一事实来源。
- `docs/CONTENT_MODEL.md`：编辑、引用和视觉资产合同的单一事实来源。
- `docs/REFERENCES.md`：外部来源索引。

## 需求开发口径

以下任一情况必须基于 `REQUIREMENT_DEVELOPMENT.md` 在 `docs/requirements/` 建立需求文档：

- 新增页面、栏目、内容类型或用户可观察行为。
- 内容 Schema、稳定 ID、URL、引用、图片清单或商业披露字段变化。
- 引入依赖、外部服务、表单、分析、支付、数据库或发布环境。
- 需要多个实施单元、真实浏览器验收或远端发布。

## 发布口径

当前没有远端发布目标。未来发布必须使用同一个已验证源提交或不可变制品；部署、表单真实写入、分析埋点、支付和线上数据操作分别授权、分别验收。

## AI 协作口径

- 默认按可独立验证的最小单元推进。
- 事实、推断和未验证风险必须分开表达。
- 外部网页、书籍、图片或研究资料进入项目结论时，必须在正文附近标注出处，并在需要时登记到 `docs/REFERENCES.md`。
- 扩大范围、引入依赖、修改配置、启动服务、提交、推送和发布遵循 `AGENTS.md` 与 `AI_COLLABORATION.md`。
