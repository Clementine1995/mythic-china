# Mythic China 技术架构

## 0. 状态与结论

- 状态：M2 目标架构已于 2026-08-27 在当前项目根完成本地实施与自动验证，并由用户提交为 M2 历史基线 `f258227`。M3-U1–U5 已完成。M3-U4/M3-U5 的首轮历史交付为一份 production record、四份 approved/current manifest、五份 repository source 与五个 local master；终验发现 Hero v1 手部缺陷后，Project owner 于 2026-08-29 验收 Hero v2。随后 Chinese Underworld Collection Hero 与 Guide Hero 分别沿既有合同闭合各自的两份 exact-canvas master、两份 repository source、一份 production record、一份 approved/current manifest 与所属页面绑定。当前版本化 inventory 为四份 production record、七份 manifest 记录、11 份 repository source 与 11 个 Git-ignored local master；六个逻辑资产各有唯一 approved/current，Zhong Kui Hero v1 保留为 approved/non-current。`sharp@0.35.4` 非默认验证入口已完成 11 个 master 复核和七份 current responsive rendition 的 50 个 AVIF/WebP 目标实际生成与解码验证。M4-U4A 已建立供应商中立的 HTTPS origin 校验合同、公共身份、最小 inventory 门禁、SEO 与 release artifact 纯函数，但尚未接入 public build；外部服务、托管项目与发布仍未实施。
- M4 边界：经 2026-09-02 项目总检，M4 本地页面、探索投影、U4A 纯基础设施、U5A 样张、最终三档基础矩阵及当前 8 页人工视觉判断已完成。M4 不产生 deployable public artifact；原计划 U4B 的 public runner/output 接线与最终平台 QA 迁入 M6，生产与发布后验证保留给 M7。
- 决策：**Astro 7 静态模式 + TypeScript strict + Git 内 Entry Markdown / 结构化 YAML + 构建期内容图校验 + 外部服务承接后续少量交互**。M2 不选择托管、不安装 adapter、MDX、React/Vue/Svelte、Tailwind 或商业依赖。
- 核心判断：这是内容出版物，不是先造平台。首版的复杂度应集中在内容、出处、图片和设计，而不是账号、数据库和运行时服务。
- Project owner 于 2026-08-30 选择 Vercel 作为未来静态托管目标；当前没有创建 Vercel 项目、稳定 production alias/hostname、自有域名、DNS 记录或任何生产托管配置。纯静态 `dist/` 与 SEO 核心保持供应商中立，托管选择不等于账户、配置、部署或发布授权。
- 当前工作区已有不可发布的 M1 Home、Collection、Entry、Review Board 与字体验收原型；它们已冻结为工程参考基线，不属于应用源码。只允许参考语义阅读链、链接、响应式/无障碍骨架和表现层替换边界；用户未批准这些 M1 原型的视觉皮肤，不能把其表现整份移入未来应用。M4-U2 先确认当时系统 fallback 字体下的页面方向；正式英/CJK 字体、最终样张与 8 页三档基础矩阵随后已完成，Project owner 于 2026-09-02 明确通过当前全部 8 个页面。真实键盘、200%、偏好/故障、支持平台与本地性能仍未验证，归 M6 release-candidate gate；M7 只承接生产与 live/RUM 基线。原型本身不作为目标栈初始化证据，实际初始化状态以现有 M2 源码、配置和锁文件为准。

Astro 默认将页面预渲染为静态 HTML，并允许未来只把个别路由改为按需渲染，因此适合“静态核心、局部动态升级”的路线。来源：[Astro On-demand Rendering](https://docs.astro.build/en/guides/on-demand-rendering/)，访问于 2026-08-27。

## 1. 架构原则

1. 静态优先：正文、来源和导航在构建期生成，不依赖客户端 JavaScript。
2. 内容优先：内容模型是核心合同，页面和栏目从模型查询生成。
3. 栏目可配置：增加新板块主要是增加 topic/collection 和展示配置，不复制系统。
4. 稳定身份：内容 ID、来源 ID、资产 ID 与 URL 不随导航变化。
5. 动态隔离：订阅、选题、分析、支付和广告分别通过边界组件或 adapter 接入。
6. 资产分级：视觉生产原始资料、Web 交付资产和社媒导出物分开管理；ComfyUI 等工具只在实际使用时进入生产记录。
7. 先验证后升级：只有真实维护成本或用户需求触发，才增加 CMS、数据库、认证或付费权限。
8. 表现层可替换：内容、证据关系、稳定身份与 URL 是长期合同；页面壳层、组件表现、CSS、动效和栏目美术资产是可以整体重构的实现层。

## 2. 目标系统图

```text
已通过事实、术语、英文编辑、视觉与权利审核的 ready 内容包
           |
           v
Entry Markdown + Collection / Source / Claim / Terminology YAML + approved Asset Manifests
           |
           v
Astro Content Collections + Schema / 引用 / 关系校验
           |
           v
Astro 静态页面 + 响应式图片 + SEO / Sitemap / RSS
           |
           v
Pagefind 静态索引（内容量达到触发条件后）
           |
           v
静态托管 / CDN

隔离的外部边界：
  Newsletter | Reader Request | Analytics | Future Commerce
```

本图描述进入构建系统的数据依赖，不代表读者阅读顺序，也不替代 `CONTENT_MODEL.md` 的内部编辑生产门禁。

Astro Content Collections 可以通过 Content Layer loader 为 Markdown 与结构化数据定义集合、Schema 和类型化查询入口。M2 只采用内置 `glob()` loader，不安装 MDX 集成。来源：[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) 与 [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/)，访问于 2026-08-27。

## 3. 已确认技术栈

| 层 | MVP 推荐 | 选择原因 | 当前状态 |
| --- | --- | --- | --- |
| 页面与构建 | Astro 7 静态模式 + TypeScript strict | 内容型、默认静态、可在有事实触发时局部升级 | M4 review 已实施原 7 个内容/功能页与一个 direct-only type specimen，共 8 个 `noindex, nofollow` 页面；public intent 尚未开放 |
| 内容 | Entry 使用 Markdown；Collection、Source、Claim、Terminology 使用 YAML；一对象一文件 | Git 可追踪、正文与结构化记录职责明确、避免先建 CMS | M2 Schema 与 2 Entry + 1 Collection draft 已实施 |
| 内容约束 | Astro Content Layer + Zod 单记录 Schema + 独立内容图校验器 | Schema 校验字段；纯函数校验器负责跨集合关系、状态矩阵、ID 与 slug | M2 已实施并由 Vitest/build 覆盖 |
| UI | 语义模板 + Astro Components + 分层原生 CSS token | 内容合同不依赖当前视觉实现，同时避免整站客户端框架与额外 bundle | M4 共享表现层、六类页面、样张与当前页面判断已完成；M6 最终 public artifact QA 未开始 |
| 图片 | `src/assets/images` 保存尺寸锁定的 approved source renditions；Astro `Image/Picture` 消费 | M4 构建期生成 AVIF/WebP、多宽度与哈希输出，`dist/` 不反写 manifest | review 页面生成 Zhong Kui v2、Collection v1 与 Guide v1 共 42 个唯一 Hero AVIF/WebP；非默认入口验证 50 个 current 响应式目标 |
| 字体 | `src/assets/fonts` 保存版本化 WOFF2/许可证/FONTLOG/字符集/hash inventory；中央 CSS alias/token + URL registry 消费；`fontkitten` 在默认 Node 门禁读取 WOFF2 name/cmap，`parse5` 按 HTML5 树语义读取实际语言继承 | 自托管且保持上游替换不影响模板/内容；`?no-inline` 让英文 preload 永远指向真实文件，CJK 仅按窄 `unicode-range` 命中 | 4 份英文 WOFF2 与 SC/TC × 400/500/600 六份派生 WOFF2 已接线；CJK 静态字符/RFN/cmap 与当前页面效果已通过，慢/阻断、实际 fallback 与支持平台终验留 M6 |
| 搜索 | Pagefind（达到约 30 篇后） | 扫描构建后的静态 HTML，无搜索服务器 | 后续触发 |
| 托管 | 供应商中立的静态输出；未来静态托管选用 Vercel | 静态 Astro 无需 adapter，且托管不决定内容、URL 或应用结构 | 方向已确认；项目、域名、origin、配置与部署均未建立 |
| 邮件 | Buttondown 等外部邮件服务候选 | 静态表单可直接交给服务，不自建邮箱库 | 待隐私与服务确认 |
| 反馈 | 外部表单或极小隔离接口 | 首版不引入账号和通用后端 | 待选择 |
| 分析 | 隐私友好页面分析；自定义事件按需 | 先回答内容问题，减少跨站追踪 | 待选择 |

CJK 生产链是显式离线边界：`cjk-character-sets.json -> 固定 Source Han Sans 2.005R commit/input SHA -> 隔离 fontTools/Brotli 实例化与子集 -> RFN-safe internal names + OFL/FONTLOG -> 6 WOFF2 -> fonts.css exact unicode-range -> fontkitten source/dist cmap -> parse5 rendered HTML lang/content gate`。生成器与固定 requirements 落在 `scripts/`；隔离 Python 环境、已安装依赖及两份各约 36 MB 的上游 SC/TC TTF 只存在于 Git-ignored `.local/font-production/`，不是 clone、CI 或默认 `pnpm check` 的运行依赖。生成器拒绝不匹配的 Python/fontTools/Brotli 版本，已落库 WOFF2 的 SHA-256 把受控生成结果与默认 Node 门禁绑定。字符新增必须先更新受审输入并重建，不允许自动扫描文档/原型或使用完整 CJK range。HTML 语言门禁遍历 HTML5 解析后的真实树，不用正则或 XML 式手写栈猜测浏览器的隐式闭合、表格 foster parenting 与实体解码。

Astro 的 `Image` / `Picture` 支持构建期优化、多格式和响应式尺寸；`src/` 中的图片可被处理，`public/` 中的文件会原样复制。来源：[Astro Images](https://docs.astro.build/en/guides/images/)，访问于 2026-08-26。

字体不进入 `public/`，也不复用视觉 manifest。`src/styles/fonts.css` 是上游文件到项目内部 family alias 的唯一 CSS 映射；业务样式只使用 role token。`src/typography/font-assets.ts` 只导出稳定 preload 角色，输出 verifier 从 `font-assets.json` 的 hash/preload policy 反查构建产物，不硬编码具体上游文件名。替换字体只改字体文件、inventory、alias 与 registry；若 metrics 实测发生变化，再显式更新对应 override 并重跑浏览器门禁。

Collection 主题环境仍按普通公开视觉资产管理：优先使用绝对定位、带固有尺寸的响应式 `<picture>` / 图片组件承接桌面与移动资源，不把未经优化的大图塞进 CSS `url()`。只有纯装饰层可以 `aria-hidden`；背景加载或脚本失败时，中性正文阅读表面、导航和 Sources 必须完整可读。

Pagefind 在静态站构建后生成随站点部署的搜索 bundle，不需要服务器组件。来源：[Pagefind Getting Started](https://pagefind.app/docs/) 与 [Running Pagefind](https://pagefind.app/docs/running-pagefind/)，访问于 2026-08-26。

### 3.1 M2 运行时、包管理与版本策略

长期架构约束由 `package.json` 的 engine 范围定义；`.node-version` 记录本地开发基线的精确补丁，唯一锁文件固定依赖解析。初始实施快照如下，均是 2026-08-27 的决策值，不是永久最新版声明：

| 项目 | 初始精确值 | 合同 |
| --- | --- | --- |
| Node.js | `24.16.0` LTS | 本机工作流固定调用 `D:\Program Files\nvm\v24.16.0\node.exe`，`.node-version` 精确记录 `24.16.0`；package scripts 只校验 `engines.node` 的 `>=24.16.0 <25`，不比较机器路径，干净 clone/CI/托管环境使用其受控安装 |
| pnpm | `11.22.0` | `packageManager` 精确记录；`engines.pnpm` 为 `>=11.22.0 <12`；只保留 `pnpm-lock.yaml` |
| Astro | `7.2.8` | `package.json` 精确记录；默认静态输出，不安装 adapter |
| Sharp | `0.35.4` | M3-U5 在 `MissingSharp` 后经 Project owner 单独授权为直接依赖；只提供构建期图片转换，不进入浏览器运行时 |
| TypeScript | `6.0.3` | 使用 Astro strict 基线；在 `astro check` 正式支持其程序化 API 前不采用 TypeScript 7 |

Astro 精确快照以官方 [Astro changelog 7.2.8](https://github.com/withastro/astro/blob/latest/packages/astro/CHANGELOG.md#728) 为依据；TypeScript 7 的当前限制以 Astro language tools 的 [`astro check` compatibility guard](https://github.com/withastro/astro/blob/main/packages/language-tools/language-server/src/check.ts#L1018-L1044) 为准，访问于 2026-08-27。

当前公开 PATH 的 Node.js `16.20.2` 已停止维护且不满足 Astro 的 Node.js `22.12.0+` 前提，因此不得用于本项目；M1 临时预览使用的 Codex bundled runtime 也不是本地项目基线。用户已于 2026-08-27 固定本机工作流使用 `D:\Program Files\nvm\v24.16.0\node.exe`，验证返回 `v24.16.0`；M2 已通过同目录 Corepack `0.35.0` 提供 pnpm `11.22.0` 并完成安装。后续本机命令必须先把该目录置于当前进程 PATH 首位，再显式调用同目录 Corepack；`scripts/verify-runtime.mjs` 负责拒绝不满足 `>=24.16.0 <25` 的子进程版本，但不把开发机路径带入 CI 或托管构建。Node 版本状态与 Astro 前提见 [Node.js releases](https://nodejs.org/en/about/previous-releases) 和 [Astro installation prerequisites](https://docs.astro.build/en/install-and-setup/#prerequisites)；pnpm 初始版本见 [pnpm 11.22.0 release](https://github.com/pnpm/pnpm/releases/tag/v11.22.0)，访问于 2026-08-27。

依赖安装只生成 `pnpm-lock.yaml`，不得并存 `package-lock.json` 或其他锁文件；干净环境/未来 CI 使用 `pnpm install --frozen-lockfile --ignore-scripts`，manifest 与锁文件不一致时失败，不允许验证过程静默改写依赖解析或执行第三方安装脚本。锁文件锁定依赖解析，但不声称消除操作系统或远端环境差异。来源：[pnpm install --frozen-lockfile](https://pnpm.io/cli/install#--frozen-lockfile)，访问于 2026-08-27。

首次实际安装前已再次只读核对兼容性并按上表完成精确安装；后续若决策值不可用或出现已知阻塞，不静默换版本，而是先更新本节与需求状态。后续升级按独立批次执行完整 `check`；不自动合并 major，Astro、TypeScript、Node.js 或 pnpm major 变化必须先审阅迁移说明。

### 3.2 Astro 与 Next.js App Router 比较

| 维度 | Astro 静态优先 | Next.js App Router + static export |
| --- | --- | --- |
| 当前产品匹配 | 面向内容型网站，默认输出静态 HTML、默认不向浏览器发送 JavaScript；Content Collections 直接承接 M2 的 Markdown/YAML Schema 与构建期查询 | 可以为每个路由生成静态 HTML，也支持本地 MDX，但整体围绕 React/App Router 组织 |
| 图片 | 本地图片可在构建期生成优化格式、尺寸与响应式标记 | 静态导出不能使用 `next/image` 默认图片优化 loader，需使用自定义 loader 或输出未优化图片 |
| 静态模式边界 | 静态动态路由必须在构建期列出；需要请求数据的路由通过 adapter 单独改为按需渲染 | 未提供 `generateStaticParams()` 的动态路由、依赖请求的 Route Handler、cookies、ISR、Draft Mode、Server Actions、默认图片优化等不能用于 static export |
| 后端升级 | 添加官方 adapter，并仅对表单、会员等必要页面设置 `prerender = false`；其余正文继续静态 | 移除 `output: 'export'`、改用具备 Next.js 运行时的托管后，才能启用上述动态能力 |
| 当前结论 | **采用** | **不作为 MVP 默认栈；满足下述触发条件后重评** |

Astro 官方将“内容驱动、默认零 JavaScript”列为核心设计，并允许通过 adapter 只把个别页面或 endpoint 改为按需渲染。Next.js 官方说明 static export 可作为起点，但其不支持需要服务器或请求时动态逻辑的功能。来源：[Why Astro](https://docs.astro.build/en/concepts/why-astro/)、[Astro On-demand Rendering](https://docs.astro.build/en/guides/on-demand-rendering/)、[Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports) 与 [Next.js MDX](https://nextjs.org/docs/app/guides/mdx/)，访问于 2026-08-26。

只有出现已验证事实时才重评 Next.js：多数产品路由近期都需要请求时身份、权限或个性化；产品主体转成需要跨页面客户端状态的 React 交互应用/管理后台；或团队形成了明确可复用的 Next.js 技术资产。联盟链接、赞助、外部托管结账、newsletter、选题表单或少量 webhook/API 都不是切换框架的理由，应先保持静态内容核心，并比较 Astro 的隔离动态路由或独立账户/商业表面。Next.js 是届时的候选，不是预先承诺的迁移终点。

### 3.3 可替换表现层合同

长期合同与可替换实现按下列边界分开：

```text
Entry Markdown + typed YAML records
  -> Entry / Collection / Home 等语义模板
  -> shared components + semantic tokens
  -> approved realm overrides + theme assets
```

- Markdown 不选择 CSS class、栅格、颜色、断点、动画、裁切位置或 `DarkHeroV2` 一类实现名。M2 不安装或使用 MDX；只有普通 Markdown 无法表达且已经重复出现的编辑语义需求，才能通过后续需求评估受控组件语法。
- `layouts` 负责页面 shell 与 landmarks，`templates` 负责读者语义结构，`components` 负责可替换表现，`styles` 负责 `reset -> tokens -> base -> components -> realm` 的最小层级。栏目只能覆盖既有 `--realm-*`，内容文件不保存 token 名。
- 全站和 Collection 氛围图通过 Asset Manifest 的 `ownerType + ownerId + role + slotId` 解析，或由内容中的逻辑 `assetId` 解析；模板不硬编码 manifest 版本或图片路径。可选 slot 未找到资产时使用 token/中性 surface 回退；活动内容要求的资产必须解析到唯一 current 且满足内容状态门禁的版本；同一 slot 解析出多个 current 时构建失败，不按最大版本或文件名猜测。
- 当前独立 HTML 原型不是可复制的应用组件或永久 CSS 基线。M2 可以参考其阅读链和已验证交互，但不得整份移植其题材文案、地府 token、背景路径或单文件样式。
- MVP 只运行一套活动品牌系统和受控栏目变体，不实现主题切换器、CSS-in-JS Theme Provider、模板插件、微前端或长期并存的 v1/v2 路由。
- 将来整体重构须在另行批准的隔离预览中完成：先保存稳定 ID、slug、canonical、证据关系和语义章节顺序快照，再替换 shell、templates、components、tokens 与主题资产。通过链接、静态输出、SEO、键盘、reduced-motion、Sources、Reader Request 和 Footer newsletter 回归后一次切换并删除旧 UI；本决策不预先创建分支、worktree 或远端预览。

### 3.4 当前非空仓库的初始化边界

当前根目录已经包含治理文档、权威合同、原型和用户 Git 历史。获得用户单独实施授权后，M2 已只在精确的 `F:\codex-project\mythic-china` 根目录手工建立 Astro 官方 manual setup 所需的最小文件；没有运行 starter/template 向导，没有创建临时项目、旁路目录、worktree、分支或新仓库。来源：[Astro manual setup](https://docs.astro.build/en/install-and-setup/#manual-setup)，访问于 2026-08-27。

初始化首批只包含静态 Astro、TypeScript、Content Layer、内容图校验、Vitest、ESLint 与 Prettier 的必要依赖和配置。M2 未安装 Playwright/浏览器二进制、MDX、UI 框架、CSS 框架、动画库、CMS、数据库、认证、搜索、adapter、分析、表单或商业依赖；这些都由出现真实需求的后续里程碑决定。pnpm 11 因默认一日发布成熟期为已确认的当天版 `astro@7.2.8` 自动生成 `minimumReleaseAgeExclude`，该配置只保留根包，不扩大依赖或工作区范围。

## 4. 目标目录

以下是 `001-mvp-foundation` 的跨里程碑目标结构；M2 直接需要的 `src/content`、`layouts`、`templates`、两个动态路由、内容/架构测试和固定运行时脚本已经存在，其余标注的后续目录仍只是目标：

```text
mythic-china/
├─ src/
│  ├─ content/
│  │  ├─ entries/          # 人物、异兽、地点、故事和指南
│  │  ├─ collections/      # 面向读者的主题阅读路径
│  │  ├─ sources/          # 原典、研究、译本和网页来源卡
│  │  ├─ claims/           # 高风险主张与具体证据/locator
│  │  └─ terminology/      # 语境化译法与双语审核记录
│  ├─ assets/images/       # 审核且尺寸锁定的 Astro 图片源 rendition
│  ├─ components/
│  │  ├─ content/          # 来源、关系、图注、披露等编辑组件
│  │  ├─ navigation/
│  │  ├─ seo/
│  │  └─ commercial/       # 进入商业阶段后才创建
│  ├─ templates/            # Entry / Collection / Home 等语义阅读结构
│  ├─ layouts/              # 页面 shell 与 landmarks
│  ├─ pages/
│  ├─ services/            # 外部服务进入需求后才创建对应 adapter
│  ├─ assets/fonts/        # 版本化 WOFF2、许可证与 hash inventory
│  ├─ styles/              # font alias、tokens、base、components 与 realm 层
│  ├─ typography/          # 稳定 preload 角色到构建资产 URL 的 registry
│  └─ content.config.ts
├─ public/                 # favicon、robots 等无需转换的公共文件
├─ tests/
│  ├─ content/
│  ├─ architecture/
│  └─ browser/
├─ visual/
│  ├─ briefs/              # versioned visual brief YAML
│  ├─ manifests/           # versioned Asset Manifest YAML
│  ├─ production-records/  # 仅在记录适合入库时创建
│  ├─ workflows/           # 使用 ComfyUI/经批准的可复用本地工作流时才保存
│  └─ model-registry.yml   # 本地管理且可稳定登记模型包时创建；不含权重
├─ docs/
└─ scripts/                # 只有稳定校验入口出现后才创建
```

上图是完整 MVP 的跨里程碑目标，不是一次性脚手架清单。带“后续才创建”含义的 `components/commercial/`、`services/`、`tests/browser/` 等节点在对应需求批准前不得建立；M3-U4 已为 `visual/production-records` 建立真实记录、Schema/loader 与双向关系门禁。当前七份 manifest 版本记录和 11 份 repository source rendition 均保留；六个逻辑资产各有一份 approved/current，Zhong Kui Hero v1 的 manifest 与两份 source 作为 approved/non-current 历史存在。workflow/model registry 本期不用。

私有参考图、探索废图、高分辨率母版、模型和 LoRA 权重必须位于 Git inventory 之外。本期获授权的物理根是项目内 `/.local/visual-production/`，由锚定的 `/.local/` ignore 隔离；以后可迁到对象存储。仓库仅保留公开 Web source rendition、manifest 和有追溯价值的小型生产记录；默认 build 不读取 `.local`。

## 5. 内容与栏目扩展

### 5.1 核心集合

- `entries`：一个通用内容集合，通过 `entryType` 区分 figure、creature、realm、tale、guide。
- `collections`：编辑策划的主题阅读路径，保存排序后的 entry ID，以及必须指向该列表成员的可选 Featured Entry ID。
- `sources`：原典、研究、译本和外部网页的标准化来源记录。
- `claims`：高风险主张、确定性与 source/locator 的对应关系。
- `terminology`：关键中文概念在具体文本语境中的英文选择与双语审核记录。

M3-U3 已新增 `assets` 与 `visualBriefs` 两个 build-time collection；M3-U4 再新增 `productionRecords`，从 `visual/production-records/**/*.yml` 加载 versioned 生产记录。三者都显式 `generateId`，且 production record 与 manifest 做双向 brief/method/tool/master tuple 校验。Astro 内置 `glob()` 可通过 `base` 从项目内任意本地目录加载 YAML，因此本实现没有为 YAML 再引入依赖。来源：[Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/)，访问于 2026-08-28。

M3-U3 已建立确定性的本地图片 metadata registry：按规范化项目相对路径扫描 `src/assets/images`，计算 SHA-256 与大小，并通过 Astro 的公开 `imageMetadata()` API 提取真实格式和方向感知尺寸；坏文件转为稳定校验问题，不用首个异常中止 inventory。纯 validator 再把 `repositoryRenditions[].path` 映射到 registry，校验批准目录、命名、扩展名、真实格式、尺寸、哈希、10 MiB 上限、孤儿/重复文件与禁入签名。visual record 和图片 inventory 从可信项目根逐段拒绝父级/嵌套 symlink 或 junction，避免 Astro glob 或文件扫描跟随仓库外目标。M4 只能从该 registry 把源文件交给 Astro 图片组件；多格式、多宽度和哈希文件名属于 `dist/` 可重建输出，不作为 repository rendition 写回 manifest。来源：[Astro Assets API](https://docs.astro.build/en/reference/modules/astro-assets/)，访问于 2026-08-28。

M3-U4 已让 production record 成为真实 Content Layer，并要求 manifest 路径解析、record 反向 manifest 解析，以及 brief/method/tool/master URI/尺寸/hash 一致。默认构建刻意不读取 `/.local/`，避免新 clone/CI 依赖未跟踪 master；生产会话已核验 master 实体并把证据写入 record。真实 WebP/PNG source 已通过 metadata/file 门禁；Project owner 已分别确认对应 ImageGen 账户、publication rights 与最终五类审核。M3-U5 另建非默认入口，首轮核验五个 local master 并用临时 Astro route 消费 manifest buildPlan。Hero v2 返修沿同一版本合同新增两份 master、两份 source、一份 manifest 与一份 production record，并只把 Hero v1 `isCurrent` 置为 `false`；版本 resolver 无需内容层迁移即可让 Entry 解析 v2。M3 收口时非默认入口核验七个 local master，并从三份 current responsive rendition 实际生成、解码复核 22 个 AVIF/WebP 目标。后续 Chinese Underworld Collection Hero 与 Guide Hero 继续沿相同合同各新增两份 master、两份 source、一份 manifest 与一份 production record；当前非默认入口核验 11 个 local master，并从七份 current responsive rendition 实际生成、解码复核 50 个目标，默认 build/CI 边界不变。验证的 `outDir`、图片缓存与 Vite cache 位于受信任 `/.local/` 临时目录并在结束时删除；Astro 固定在项目根维护的 ignored `.astro/` 构建元数据可能刷新，但不属于发布制品或持久证据。ComfyUI workflow/model registry 因本期未使用且托管 ImageGen 未暴露稳定模型包身份而不创建。

Entry 使用 `{entryId}.md`；Collection、Source、Claim、Terminology 分别使用 `{collectionId|sourceId|claimId|termId}.yml`，一对象一文件。所有 `glob()` loader 必须显式实现 `generateId`，从规范化的相对文件名生成内部 ID；内容图校验器必须核对 loader 的 `entry.id` 与记录声明的 `entryId` / `collectionId` / `sourceId` / `claimId` / `termId` 一致。`data.slug` 只承担公开 URL，不得覆盖内部关系身份。Astro 默认 ID 可被 frontmatter/data `slug` 覆盖，因此显式 `generateId` 是本项目分离 ID 与 URL 的硬门禁。来源：[Astro custom IDs](https://docs.astro.build/en/guides/content-collections/#defining-custom-ids) 与 [`glob()` `generateId`](https://docs.astro.build/en/reference/content-loader-reference/#generateid)，访问于 2026-08-27。

Zod Schema 只负责单记录字段、枚举和局部条件；独立、无网络且可由 Vitest 直接调用的纯内容图校验器负责跨集合目标存在性、ID/slug 唯一性、Collection—Entry 状态矩阵、Featured Entry 约束、来源/Claim/术语关系、Claim `evidenceContext` 与 Source 类型/role 矩阵、Entry earliest Claim/Source 成对精确绑定和明确排序。Source 的 `titleZh` / `titleZhLang` 在 Schema 中成对，generic `zh` 表示 script 未核定；内容图拒绝 `ready | published | archived` Entry 引用这类未核定标题，不能从 `Source.language` 或字符外形推断 Hans/Hant。校验器先对 loader 记录副本按稳定身份排序，再生成确定性错误；不得依赖运行时 fallback 或 Content Layer 返回顺序猜测关系。Astro `getCollection()` 返回顺序不作为编辑顺序事实；所有列表按合同字段或稳定键显式排序。来源：[Astro sorting collection entries](https://docs.astro.build/en/guides/content-collections/#sorting-collection-entries)，访问于 2026-08-27。

图片最终使用独立 Asset Manifest 并由 Entry/Collection 引用；内容字段保存 versionless 逻辑 `assetId`，构建期再解析显式 current manifest 版本。M3-U3 已让任何非空 `heroAssetId` 通过 owner/hero/primary、current、状态与历史门禁解析真实 manifest，不再接受只有格式合法的假资产字符串。当前两个 Entry 与一个 Collection 的编辑形态已获 Project owner 阶段性接受，仍保持 `editorial-review`；钟馗 Entry 的 `heroAssetId` 已绑定 `asset-zhong-kui-hero-primary` 并解析到 approved/current Hero v2，Chinese Underworld Collection 已绑定 `asset-chinese-underworld-hero-primary` 并解析自己的 approved/current Hero v1，Guide Entry 已绑定 `asset-chinese-underworld-guide-hero-primary` 并解析自己的 approved/current Hero v1。三者均消费同一 generic resolver；上述 Collection/Guide Hero 资产绑定批次没有新增路由、模板、组件、CSS、Schema 或 resolver 分支。资产绑定没有提升内容状态，也不替代 M6 最终 public artifact 的语言、字体、故障、平台与发布门禁。字段合同见 `docs/CONTENT_MODEL.md`，详细实施合同见 `docs/requirements/002-visual-asset-pipeline.md` 与 `docs/requirements/004-first-vertical-slice-candidate.md`。

### 5.2 新栏目如何增加

```text
新增 topic 或 collection 配置
  -> 查询既有 entries
  -> 选择已存在的栏目页面模板
  -> 增加导航入口（只有内容密度足够时）
```

例如增加“山海经异兽”只需要创建 collection、topic 与内容，不增加新数据库或独立应用。只有某类内容出现真正不同的字段、编辑流程和页面行为时，才通过需求文档评估独立 Schema。

### 5.3 URL 原则

- Entry canonical 固定为 `/explore/{slug}/`；Collection canonical 固定为 `/collections/{slug}/`。M2 的动态静态路由只从 `data.slug` 生成参数，内部关系只使用稳定 ID。
- 内容 URL 使用稳定 slug，不嵌入易变的 Collection 或栏目层级。
- collection、topic 和 search 是筛选/策展入口；内容换栏目不更改 canonical URL。
- 上述现有 canonical 是英语根路径合同，不迁移到 `/en/`。未来简体中文试点使用 `/zh-hans/` 前缀；`/zh-hant/` 只保留为未来繁体中文命名空间，当前不得生成空页面、导航入口或发布型 metadata。
- 每个 locale 页面由 Astro 显式静态生成；不得根据 `Accept-Language`、IP、Cookie 或地理位置自动重定向，也不得在 `/zh-hans/` 下静默渲染英语正文。locale 数据存储、localized slug、逐 locale 状态和 translation mapping 的精确形状留给独立实施批次，不提前增加字段或目录。
- 语言切换使用真实 counterpart 的普通链接；只有目标页面在同一输出环境实际存在并通过该环境的对应门禁时才输出。未来 indexable 对页各自 self-canonical，并只为真实、可索引且互相对应的版本输出 reciprocal `hreflang`；`x-default`、Sitemap/RSS 和更大页面范围在实施批次冻结。目标依据见 [`005-localized-content-pilot.md`](requirements/005-localized-content-pilot.md)，当前代码仍是英语单 locale。

## 6. Ready 内容包的构建与发布数据流

本节区分内容包状态、完整 inventory 的发布决定、deployable public output 与组装后的 release QA；不描述读者页面顺序，也不把构建后 QA 当成首次内容审核。

```text
M4 本地产品实现完成
  -> M5 外部交互详细需求与隔离边界（不以内容 ready 为进入条件）
  -> M6 已通过事实、术语、英文编辑、视觉与权利审核的内容包
  -> Schema 校验
  -> 稳定 ID、关系、主张证据、术语审核、引用和资产完整性校验
  -> ready（内容包完备，不进入 release/index，也不消费平台 QA）
  -> 6 篇 Entry / 至少 2 个 Collection / 全部资产与关系
  -> Project owner 显式 published 决定（进入 public artifact 的资格，不等于部署）
  -> 真实 origin + M6 public artifact assembly 实现
  -> Project owner 单独授权 clean commit
  -> 从 clean revision 重新构建 public artifact / Sitemap / RSS / JSON-LD
  -> output verifier + 自动、键盘/缩放/偏好、故障、字体/跨平台、视觉/目标读者与本地性能 QA
  -> local clean-source verification receipt
  -> M6 受保护远端预览 + validated_source_identity
  -> M7 同一已验证源身份发布生产 + 只读发布后基线
```

### 6.1 托管、域名与海外交付阶段

| 阶段 | 决策 |
| --- | --- |
| 文档与本地开发 | 不创建托管或域名事实；先完成内容、视觉和静态构建验收 |
| 首次在线预览 | M4 noindex 本地实现已经完成。M5 边界冻结后，由 M6 完成 6 篇内容、至少 2 个合集页、全部资产与人工 published 决定，确认 origin 并完成 public artifact assembly 实现。实现稳定后须由 Project owner 单独授权形成 clean committed source，再从该 revision 重新构建同一真实非空 artifact，完成 output verifier、可访问性、故障、字体/跨平台、视觉/目标读者与本地性能 QA，生成 clean-source receipt。dirty source 只能产生 nondeployable 诊断记录，提交后不得复用。没有自有域名时，可在 M6 单独授权建立 Project owner 控制的 Vercel 项目身份以确认稳定 production alias/hostname，但不得借此部署 review 输出。完整本地 public 候选通过后再另立远端预览授权，并验收账户归属、保护策略、目标地区实测、回滚、成本与退出路径 |
| 正式公开前 | 明确配置唯一 `MYTHIC_CHINA_SITE_ORIGIN`。没有自有域名时，可以在 Project owner 确认后使用稳定的 Vercel production alias/hostname 作为阶段性 origin；每次部署变化的 generated/branch URL 永远不能作为 canonical。未来切换自有域名必须另立迁移与 canonical 决策 |
| 出现少量动态能力 | 由后续需求先比较外部服务、Astro 官方 adapter 的隔离按需路由与独立动态表面；只有托管、安全和数据边界确认并单独授权后才接入，不因预想中的 D1、R2、KV 或 Workers 先选平台 |

Vercel 已被选择为未来静态托管目标。Astro 静态项目可以在 Vercel 零配置部署，只有使用服务端渲染或平台运行时能力时才需要 adapter；本项目当前不新增 adapter。Vercel 为每次 deployment 生成可变 URL，并另提供 production domain 变量；由于该变量在 Preview 环境也存在，build intent 与 canonical 都不得从 Vercel 环境自动猜测，必须由后续 public runner 显式读取并校验项目自有的 `MYTHIC_CHINA_SITE_ORIGIN`。来源：[Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)、[Vercel Generated URLs](https://vercel.com/docs/deployments/generated-urls) 与 [Vercel System Environment Variables](https://vercel.com/docs/environment-variables/system-environment-variables)，访问于 2026-08-30。

域名注册、DNS 与托管仍是三个可替换边界。自有域名可以由第三方注册商持有，再用 DNS 接入 Vercel；更换托管或从阶段性 production alias/hostname 切换自有域名时，应通过显式迁移决策调整 origin，不让内容 ID、Markdown 或 slug 跟随平台变化。来源：[Vercel Adding a Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)，访问于 2026-08-30。

Vercel 与 Cloudflare 都提供全球 CDN，但节点数量或平台宣传不替代实测。M6 受保护预览建立后、M7 生产前，用首页和图片最重的文章页从预期读者区域（至少美国东/西部与欧洲）分别测试移动/桌面、冷/暖缓存，并记录 TTFB、LCP、CLS、传输图片体积和客户端 JavaScript；M7 上线后再用真实用户数据复核第 75 百分位。来源：[Vercel CDN](https://vercel.com/docs/cdn)、[Cloudflare Global Cache](https://developers.cloudflare.com/use-cases/performance/caching/) 与 [Google Lab and Field Data](https://web.dev/articles/lab-and-field-data-differences)，访问于 2026-08-26。

### 6.2 M4 public 纯基础设施与 M6 制品边界

- `MYTHIC_CHINA_SITE_ORIGIN` 是未来 public 构建唯一允许的显式 origin 名称。M4-U4A 的纯校验只接受真实 HTTPS origin，拒绝缺失值、路径、query、fragment、credential、port、IP、localhost 与保留示例域；当前没有 runner 读取该变量，也没有真实值。
- Publisher 固定为 `Mythic China / Organization`，author 固定为 `Mythic China Editorial / Organization`；两者可见身份页均为 `/about/`，并分别使用 `#publisher` 与 `#editorial` 锚点。当前不输出 `og:image`，避免借用不匹配的钟馗资产。
- `src/site/public-release.ts` 只在 published Entry 和 Collection 各至少一项时返回 public 投影；`src/site/seo.ts` 只构造内存中的 canonical、Open Graph 与 JSON-LD view model；`src/site/release-artifacts.ts` 只在 fixture 中构造 published-only Sitemap/RSS 字符串。三者均假定输入已经通过现有 Schema/内容图门禁，并另有完整 synthetic validated content graph fixture。
- M6 public artifact runner 必须从正式 loader 进入 Schema、content graph、visual graph/file inventory 与 approved/current resolver，再形成 published projection；不得 raw-load 内容后直接调用这些纯 builder 绕过正式校验链。
- 当前 M4-U4A 纯基础设施与 M6 public artifact assembly 合同只覆盖英语根路径；已确认但未实施的简中试点不改变英语 published inventory、public build 或发布资格。未来本地化实施必须扩展正式 loader、内容图、SEO builder、Layout/Header、Sitemap 与 output verifier 后再开放 locale 页面，不能只复制路由或拼接 `hreflang`。
- M4-U4A 当时没有改变 `readBuildIntent()`、`SiteLayout`、六类页面、Astro endpoint 或默认输出；后续候选任务只为 `SiteLayout` 增加英文自托管字体 preload，CJK 明确不 preload，也不接入 public metadata/endpoint。M4-U5A 又新增仅显式 review intent 可构建、只允许直达的 `/review/type-specimen/`；它不进入 Header/Footer、Home、review candidate、release/public projection 或 SEO/artifact builder。`public` intent 继续失败；当前 review `dist/` 为 8 个 noindex 页面、42 个 Hero 图片、10 个哈希 WOFF2、零 XML 与零客户端 JavaScript。原 7 页继续精确匹配真实 CJK content set，样张独立匹配生产 pinyin 语言、DESIGN 冻结混排行、65/36 required 与 `测`/`測` fallback-only set，不能反向放宽内容字符集；HTML/CSS oracle 另锁定 family/weight/style、head/robots/discovery 与 direct-only 等价 URL。Collection 与 Guide 自有 Hero、双语术语、四条馆藏标题 locale 以及 CJK 字符/子集/RFN/cmap 静态门禁已完成；Explore/Collections 的 release 列表保持真实 published 空状态，另有只从固定 Home Collection 与其 `entryIds` 派生、明确标注 `Not published` 的 review-only 候选架。2026-09-02 最终样张和页面实现已在 8 页 × 三档 24 个组合与四条 Hero 页 12 个组合通过基础浏览器矩阵，Project owner 随后明确通过全部 8 个页面；这关闭 M4 本地实现，不产生 public artifact。
- 真实键盘/200%/偏好、慢/阻断加载、图片失败、受控性能与支持平台 fallback 仍须在可控环境完成，不写成已通过。M5 外部交互边界冻结后，由 M6 完成 6 篇 Entry / 至少 2 个 Collection 与全部资产并作出人工 published 决定，确认真实 origin，接入 public runner、页面 metadata、XML routes 与独立 public verifier；再对该同一最终 public artifact 执行完整 release-candidate QA。
- M6 public artifact assembly 实现稳定后，须由 Project owner 单独授权形成 clean committed source，并从该 revision 重新构建 artifact、运行 verifier 与完整 QA，最后生成绑定 clean source revision、lock/source digest、public intent、verifier/QA 结果和 `dirty: false` 的 verification receipt。dirty source 只允许 nondeployable 诊断记录；提交后必须重建、重验并重发 receipt，不能“洗白”旧证据。M6 远端预览再把该 clean committed source、验证结果与具体 deployment target 绑定为 `validated_source_identity`；若复用不可变制品，receipt 还必须包含完整 artifact inventory/digest。pending 发布 QA、早期 M4 页面证据或 dirty-worktree `dist/` 均不得代替发布资格。一个 Entry + 一个 Collection 是纯技术 fail-closed 下限，不替代 M6 的 6 篇 Entry / 至少 2 个 Collection 预览候选或 M7 生产发布与发布后基线验收。最终 QA 后若发生实质内容、状态、模板、CSS、字体、Hero、manifest、origin、metadata、runner 或 XML 变化，按影响范围重跑对应证据。
- Review/public output 必须允许普通外部 citation anchor，但所有页面子资源必须来自单斜杠根相对本地 URL 并精确闭合到实际 emitted inventory；远端或 protocol-relative `src`/`srcset`/`poster`/`data`/资源型 `href`、远端 CSS `url()`/`@import`、缺失本地目标、`base`、`iframe`、`object`、`embed`、form 与 meta refresh 均由 output policy/verifier 阻断，不能绕开 Asset Manifest、权利、hash、性能和隐私门禁。语义壳 oracle 只遍历浏览器活跃 HTML5 树，安全资源扫描可以进入并拒绝 template 等非活跃 surface；两者不得用同一种原文本搜索替代。构建输出根和每个条目以 `lstat` fail-closed，symlink/junction 与未知类型不属于可发布 inventory。

## 7. 动态能力边界

Astro 保持静态输出时不承接请求时状态。任何需要 secrets、写入、cookie、会话或权限判断的能力，都必须放在外部服务或添加 adapter 后的按需路由、Action / endpoint 中；页面与内容模型只依赖 `services/` 中的窄接口。添加 adapter 后可用 `prerender = false` 只升级必要路由，其余文章仍在构建期生成。来源：[Astro On-demand Rendering](https://docs.astro.build/en/guides/on-demand-rendering/)、[Astro Actions](https://docs.astro.build/en/guides/actions/) 与 [Astro Sessions](https://docs.astro.build/en/guides/sessions/)，访问于 2026-08-26。

### 7.1 Newsletter

订阅表单只在全站 Footer 的一个固定 slot 中渲染，不在每篇文章末尾重复放置 newsletter 模块。Footer 负责显示同意文本和提交入口；邮箱直接进入选定邮件服务，网站仓库不保存订阅者列表。服务替换时只修改一个 Newsletter adapter/form 组件。文章末尾的 Reader Request 属于独立反馈入口，不得隐式订阅邮件。

### 7.2 Reader Request

MVP 请求：

```text
pageId + requestedTopic + email + emailConsent + createdAt
```

- 默认不要求登录。
- `email` 与 `emailConsent` 为可选字段且必须成对出现。
- 防垃圾、速率限制、保留期限和导出/删除能力必须在服务选择需求中确认。
- 页面不直接暴露密钥；外部 endpoint 或 server function 位于单一边界。

### 7.3 Analytics

只采集回答产品问题所需的信息。首轮事件概念：

- `related_story_click`
- `newsletter_submit`
- `suggestion_submit`
- `outbound_recommendation_click`

事件不得携带完整建议文本、邮箱或其他个人信息。自定义事件是否可用取决于最终分析服务，未确认前不把概念事件写成已实现接口。

M5 详细需求必须明确 Web Vitals/RUM 的责任归属：由同一隐私友好分析 adapter 提供，或明确延后到 M7 独立实施。M7 若把真实流量 p75 作为完成门禁，M5/M7 合同必须先冻结采集指标、字段、同意依据、保留期限、退出/删除路径与第三方域名，不能到生产发布后才补数据源。

### 7.4 Future Commerce

商业化只是后期演进边界，不是 M2 需求。第一阶段若经后续需求批准，优先使用外部商品/支付页；静态内容站只承载产品说明、紧邻入口的披露和外链。只有确实需要登录、购买身份和访问控制时，才增加认证、支付 webhook、会话和数据存储，并重新比较 Astro 局部动态、独立账户应用与 Next.js。

Cloudflare Pages Functions 是未来可选的轻量 server-side 边界，可处理表单或中间件而无需独立服务器；是否采用必须由后续需求确认。来源：[Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)，访问于 2026-08-26。

## 8. 商业化扩展点

M2 不创建商业字段、组件、adapter、服务、事件或空目录。这里冻结的是替换边界，而不是待填空壳：

- 后续独立需求可引入供应商中立的内部 `productId` / `offerId` 与显式 disclosure 记录；支付供应商 ID、checkout URL、价格同步和跟踪参数只存在于商业 adapter/配置中，不成为内容 ID、slug 或 Markdown 正文。
- Sources、研究书目和编辑推荐与商业关系分离；佣金或赞助不改变来源权重，披露必须紧邻对应商业入口。
- 外部托管结账不改变 Astro 静态核心。静态 HTML 不得用 CSS/客户端 JavaScript 隐藏来伪装安全付费墙；真正的权益校验必须进入有服务端授权的独立需求。
- 只有商业需求被批准并有真实渲染入口时，才创建目标目录中标注的 `components/commercial/` 与对应 adapter；没有入口就没有空实现。

## 9. 升级触发条件

| 观察到的事实 | 才执行的升级 |
| --- | --- |
| 内容达到约 30 篇，浏览路径和浏览器查找明显不足 | 增加 Pagefind 搜索和结构化筛选 |
| 原始图片导致 Git 或构建成本明显上升 | 母版迁至对象存储；评估图片 CDN，Web 交付仍由 manifest 管理 |
| 出现第二位持续作者，Git/Markdown 审稿成为稳定阻力 | 评估 Git 型或 Headless CMS；页面继续消费同一内容加载合同 |
| 外部表单无法处理建议归并、统计或通知 | 增加极小的 Astro 按需 Action/endpoint 或独立 Reader Request API/存储 |
| 付费内容需要真正访问控制 | 先定义认证、支付 webhook、会话和授权存储边界；再比较 Astro 局部动态与 Next.js |
| Pagefind 无法支持经过验证的复杂查询需求 | 再评估托管搜索，不预建 Elasticsearch/Algolia |
| 关系图成为核心产品并需实时编辑 | 先生成静态 JSON；仍不够时再评估专门数据层 |
| 会员/登录态成为近期核心，或多数路由需要个性化、权限判断或实时数据 | 正式重评 Next.js App Router、Astro 全/局部按需渲染或独立应用边界 |
| 产品主体转为 React 交互应用或管理后台 | 重评 Next.js；内容站可继续作为独立静态边界 |

## 10. 安全、隐私与权利

- 密钥仅放托管平台的受控环境变量，不进入客户端或仓库。
- 外部脚本使用白名单；新增脚本必须记录目的、数据、域名、退出方式和性能影响。
- 表单设置服务端验证、长度限制、速率限制与垃圾防护；页面端验证不能替代服务端边界。
- 不在日志和分析事件记录邮箱、完整建议文本、提示词或内部资产路径。
- 现代译本、当代画作、博物馆图片和游戏造型分别核对版权/许可证；“传说属于公共领域”不等于其现代呈现可复用。

## 11. 质量门禁

MVP 至少建立：

- 内容 Schema、枚举、稳定 ID 与 slug 唯一性测试。
- source、related ID 与 collection 引用完整性测试。
- 高风险 claim 的 evidence context、Source 类型/role、locator、certainty、earliest Claim/Source 精确绑定与关键术语双语审核状态测试。
- 已发布视觉资产的 accessibility mode、alt / 空 alt、适用的 caption、AI disclosure 与 asset manifest 测试。
- 关键页面静态构建、链接、Sitemap、RSS 与结构化数据测试。
- 桌面/移动视觉回归或截图验收。
- 键盘、焦点、减弱动效和自动化无障碍检查。
- LCP 主图、图片尺寸预留和客户端 JavaScript 预算检查。

M2 首批自动门禁固定为：Prettier check、ESLint correctness、Vitest 内容/架构测试、`astro check` 与 `astro build`。`build` script 已先运行 `astro check` 再运行 `astro build`，聚合 `check` 按格式、lint、测试、类型/内容检查、build 顺序执行；不得把单独 build 成功写成类型检查通过。历史 M2 审计基线是 2026-08-28 的 4 个测试文件/41 项测试、Astro 0 error / 0 warning / 0 hint 与 3 页静态输出；Hero v2 返修后于 2026-08-29 的历史结果为 10 个测试文件/72 项测试、Astro 检查 36 个文件且零诊断、静态输出 3 页，非默认 `visual:build:check` 另复核七个 local master 和三份 current responsive rendition 的 22 个响应式图片目标。当前聚合结果以 `DEV_WORKFLOW.md` 最新完成记录为准。来源：[Astro type checking](https://docs.astro.build/en/guides/typescript/#type-checking)，访问于 2026-08-27。

M4 已完成获授权的本地基础浏览器矩阵；M6 最终 public artifact 的键盘、缩放、偏好、故障、平台与性能检查仍需要单独的服务/浏览器授权。当前不引入 Playwright、`tests/browser` 或浏览器二进制；任何自动浏览器依赖仍须独立的架构、依赖和验证授权。M2 真实安装、定向验证、聚合门禁和 dev/preview 服务命令均记录在 `DEV_WORKFLOW.md`。

## 12. MVP 明确不做

- 全站 SSR、独立 API 服务、通用数据库或微服务。
- React/Vue 全站运行时、全局状态库和客户端路由。
- WordPress 插件体系或提前接入 Headless CMS。
- Elasticsearch、Algolia、Neo4j 和实时关系图。
- 在线 ComfyUI、访问时生图和自动内容发布。
- 账号、评论、收藏、个性化推荐和站内支付。

## 13. 待确认决策

- Vercel 已选为未来静态托管目标；仍待确认账户/项目归属、稳定 production alias/hostname、预览保护、Git 发布授权、回滚和退出路径。经 Project owner 确认后，该 alias/hostname 的 HTTPS origin 才能写入 `MYTHIC_CHINA_SITE_ORIGIN`。当前未创建任何平台项目。
- 自有域名的品牌/权利核查、注册商、DNS 托管、canonical 主域与接入时点；当前未购买或配置域名。
- 邮件、分析和表单提供商。
- 本地 Git 已在 `F:\codex-project\mythic-china` 初始化；用户随后建立 `main`、M1/M2 提交与 `origin`。M3-U1 开始前，本地 HEAD、`main` 与本地 `origin/main` 对齐到 `f258227da1b5a73f22c87ec99722243742db0ba0`，工作树干净；本次未执行 fetch，因此不证明服务器端分支状态。这些事实不代表代理获得 add、commit、push 或发布授权；后续版本控制和首次预览/生产发布仍须逐次确认。
- 本期 master 位置已确认为项目根 `/.local/visual-production/masters/`；当前没有独立备份，丢失时按 production record 重新生成。私有参考资料本期不上传 ImageGen，也不写入仓库；长期对象存储与备份策略仍待后续确认。
