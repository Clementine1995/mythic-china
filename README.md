# Mythic China

面向英语读者的中国神话、志怪、民间传说与传奇人物原创插画内容站；工作原则是 **Stories first. Sources always.**

## 当前状态

- 阶段：M1 已于 2026-08-27 按用户明确决定完成并冻结为首个工程参考基线；M2 的技术与内容合同已经确认，但实施仍未开始。当前已有可运行的中性 Home、`The Chinese Underworld / 中国阴间` Collection、`Zhong Kui, the Demon Queller` Entry、第二轮 Review Board、3×2 Collection 家族探针和字体验收页；它们仍是不可发布的独立原型，不是应用源码。
- 视觉方向：冻结时的 M1 页面外观仍未获批准；2026-08-27，用户在后续仓库外 Home 方向稿中确认“以 A 为主、C 为辅”。首个真实 Home 以 A 的现代文化展览式中性母体、图片主导的非对称策展构图为主，并以 C 的抽象雕塑、地形、路径和裁切为辅助语汇。该选择只确认 Home 概念方向，不追认旧原型，也不批准方向稿本身、最终页面、字体或生产视觉资产；这些语言如何延展到共享表现层、Collection 与 Entry 仍须在真实纵切片中设计并确认。
- 工作名称：`Mythic China`；目录名与未来包名使用 `mythic-china`。
- 当前权威日期：2026-08-27。
- 下一项允许动作：M2 实施仍未开始。技术合同已经确认；只有在用户另行授权 Node.js 24 项目运行时切换/安装、pnpm 依赖安装和当前仓库根的手工最小初始化后，才能写入应用源码、配置与锁文件。首个真实 Home 须按已确认的 A 主、C 辅概念方向实现，Collection 与 Entry 仍按既有三层系统单独设计，三页都须在批量制作前取得用户页面级视觉确认。不得把当前独立原型或仓库外方向稿整份移入未来应用。

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

应用尚未初始化，因此当前没有应用运行链路。`prototypes/m1-home.html`、`prototypes/m1-collection.html`、`prototypes/entry-reader-flow.html`、`prototypes/m1-review-board.html` 与 `prototypes/m1-type-specimen.html` 组成冻结的 M1 独立原型；它们可以评审目标体验和工程边界，但不是生产页面、正式内容包或 M2 应用脚手架。目标体验与内部生产必须分开理解：

- 读者阅读：`主视觉 + 故事问题 -> opening 故事入口 -> Quick Answer -> 核心故事 -> 原典写了什么 -> 后世传统与版本 -> 本站解释 -> 完整 Sources -> Related Entries -> Reader Request -> 全站 Footer`。轻量出处随相关主张出现；完整来源在正文收束后、继续探索之前列出，newsletter 只在全站 Footer 出现。
- 编辑生产：`研究问题 -> claim map 与可定位来源 -> 术语/译文审核 -> 英文叙事与视觉 brief -> 编辑/视觉审核 -> 内容 Schema 校验 -> 静态构建 -> CDN 网站`。
- 视觉生产：`有出处的视觉 brief -> 绘制/授权素材/可选 ComfyUI 辅助 -> 人工审校 -> Web/社媒导出`。
- 读者反馈：`文章页选题入口 -> 外部表单或隔离接口 -> 归并候选题 -> 编辑排期`。

## 当前运行口径

当前只有本地文档和独立原型工作区，没有应用开发、测试或生产运行环境，也没有数据库与远端资源。

| 环境或运行角色 | 固定工作区 | 代码/制品身份 | 配置入口 | 数据与外部资源 | 允许用途 |
| --- | --- | --- | --- | --- | --- |
| 本地文档与原型工作区 | `F:\codex-project\mythic-china` | 用户已建立 `main`、initial commit 与 `origin`；M1 工程参考已冻结；M2 决策已确认，应用制品尚未初始化 | Git 命令见 `DEV_WORKFLOW.md` | 本地 Markdown、不可发布的独立 HTML 原型及 prototype-only 图片；外部站点仅作只读研究 | 文档编写、只读核查、工程参考评审 |

## 项目构建与运行

当前不适用。项目尚无 `package.json`、应用源码或依赖锁文件；独立 HTML 原型不构成应用运行时，不得据此假设构建或服务命令。M2 已确认 Astro 7 静态模式、TypeScript、Node.js 24 LTS、pnpm 11、Entry Markdown 与结构化 YAML 的目标基线，完整边界见 `docs/ARCHITECTURE.md` 与 `docs/CONTENT_MODEL.md`。获得实施授权后，必须在安装前把精确命令写入 `DEV_WORKFLOW.md`；文档决策本身不代表运行时已配置或应用已初始化。

## 当前最小验证

工作目录：`F:\codex-project\mythic-china`

列出当前 Markdown 文件：

```powershell
rg --files -g '*.md'
```

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
- `docs/requirements/`：单项需求的业务合同、实施单元和验收状态。
- `prototypes/`：不可发布的静态视觉评审原型；不代表应用实现或已核准内容，工作母版与探索废图不应进入正式代码仓库。
- 应用源码、测试与稳定脚本将在 MVP 初始化需求中按已确认架构创建，不提前保留空目录。

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
