# Mythic China 技术架构

## 0. 状态与结论

- 状态：M2 目标架构决策已于 2026-08-27 确认，应用代码、项目运行时和依赖尚未初始化。
- 决策：**Astro 7 静态模式 + TypeScript strict + Git 内 Entry Markdown / 结构化 YAML + 构建期内容图校验 + 外部服务承接后续少量交互**。M2 不选择托管、不安装 adapter、MDX、React/Vue/Svelte、Tailwind 或商业依赖。
- 核心判断：这是内容出版物，不是先造平台。首版的复杂度应集中在内容、出处、图片和设计，而不是账号、数据库和运行时服务。
- 当前没有创建 Vercel/Cloudflare 项目、平台子域名、自有域名、DNS 记录或任何生产托管配置；纯静态 `dist/` 保持供应商中立，首次远端预览前再选择托管。
- 当前工作区已有不可发布的 M1 Home、Collection、Entry、Review Board 与字体验收原型；它们已冻结为工程参考基线，不属于应用源码。只允许参考语义阅读链、链接、响应式/无障碍骨架和表现层替换边界；用户未批准当前页面风格，不能把其视觉皮肤整份移入未来应用，也不代表目标栈已经初始化。

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
| 页面与构建 | Astro 7 静态模式 + TypeScript strict | 内容型、默认静态、可在有事实触发时局部升级 | 已确认，待初始化 |
| 内容 | Entry 使用 Markdown；Collection、Source、Claim、Terminology 使用 YAML；一对象一文件 | Git 可追踪、正文与结构化记录职责明确、避免先建 CMS | 已确认，待初始化 |
| 内容约束 | Astro Content Layer + Zod 单记录 Schema + 独立内容图校验器 | Schema 校验字段；纯函数校验器负责跨集合关系、状态矩阵、ID 与 slug | 已确认，待初始化 |
| UI | 语义模板 + Astro Components + 分层原生 CSS token | 内容合同不依赖当前视觉实现，同时避免整站客户端框架与额外 bundle | 已确认，待初始化 |
| 图片 | `src/assets` + Astro `Image/Picture` | 构建期输出 AVIF/WebP 与响应式尺寸 | 待初始化 |
| 搜索 | Pagefind（达到约 30 篇后） | 扫描构建后的静态 HTML，无搜索服务器 | 后续触发 |
| 托管 | 供应商中立的静态输出；Vercel / Cloudflare 仅为后续候选 | M2 不需要远端运行时，不让托管决定内容、URL 或应用结构 | 首次远端预览前确认 |
| 邮件 | Buttondown 等外部邮件服务候选 | 静态表单可直接交给服务，不自建邮箱库 | 待隐私与服务确认 |
| 反馈 | 外部表单或极小隔离接口 | 首版不引入账号和通用后端 | 待选择 |
| 分析 | 隐私友好页面分析；自定义事件按需 | 先回答内容问题，减少跨站追踪 | 待选择 |

Astro 的 `Image` / `Picture` 支持构建期优化、多格式和响应式尺寸；`src/` 中的图片可被处理，`public/` 中的文件会原样复制。来源：[Astro Images](https://docs.astro.build/en/guides/images/)，访问于 2026-08-26。

Collection 主题环境仍按普通公开视觉资产管理：优先使用绝对定位、带固有尺寸的响应式 `<picture>` / 图片组件承接桌面与移动资源，不把未经优化的大图塞进 CSS `url()`。只有纯装饰层可以 `aria-hidden`；背景加载或脚本失败时，中性正文阅读表面、导航和 Sources 必须完整可读。

Pagefind 在静态站构建后生成随站点部署的搜索 bundle，不需要服务器组件。来源：[Pagefind Getting Started](https://pagefind.app/docs/) 与 [Running Pagefind](https://pagefind.app/docs/running-pagefind/)，访问于 2026-08-26。

### 3.1 M2 运行时、包管理与版本策略

长期架构约束锁定受支持的大版本；精确补丁由 `package.json`、`.node-version` 与唯一锁文件记录。初始实施快照如下，均是 2026-08-27 的决策值，不是永久最新版声明：

| 项目 | 初始精确值 | 合同 |
| --- | --- | --- |
| Node.js | `24.20.0` LTS | `.node-version` 精确记录；`engines.node` 为 `>=24.20.0 <25` |
| pnpm | `11.22.0` | `packageManager` 精确记录；`engines.pnpm` 为 `>=11.22.0 <12`；只保留 `pnpm-lock.yaml` |
| Astro | `7.2.8` | `package.json` 精确记录；默认静态输出，不安装 adapter |
| TypeScript | `6.0.3` | 使用 Astro strict 基线；在 `astro check` 正式支持其程序化 API 前不采用 TypeScript 7 |

Astro 精确快照以官方 [Astro changelog 7.2.8](https://github.com/withastro/astro/blob/latest/packages/astro/CHANGELOG.md#728) 为依据；TypeScript 7 的当前限制以 Astro language tools 的 [`astro check` compatibility guard](https://github.com/withastro/astro/blob/main/packages/language-tools/language-server/src/check.ts#L1018-L1044) 为准，访问于 2026-08-27。

当前公开 PATH 的 Node.js `16.20.2` 已停止维护且不满足 Astro 的 Node.js `22.12.0+` 前提；M1 临时预览使用的 Codex bundled runtime 也不是项目运行时。M2 实施前必须另行授权安装/切换项目运行时，并验证 `node --version` 与 `pnpm --version`。Node 版本状态与 Astro 前提见 [Node.js releases](https://nodejs.org/en/about/previous-releases) 和 [Astro installation prerequisites](https://docs.astro.build/en/install-and-setup/#prerequisites)；pnpm 初始版本见 [pnpm 11.22.0 release](https://github.com/pnpm/pnpm/releases/tag/v11.22.0)，访问于 2026-08-27。

依赖安装只生成 `pnpm-lock.yaml`，不得并存 `package-lock.json` 或其他锁文件；干净环境/未来 CI 使用 `pnpm install --frozen-lockfile`，manifest 与锁文件不一致时失败，不允许验证过程静默改写依赖解析。锁文件锁定依赖解析，但不声称消除操作系统、原生构建脚本或远端环境差异。来源：[pnpm install --frozen-lockfile](https://pnpm.io/cli/install#--frozen-lockfile)，访问于 2026-08-27。

在实际安装前再次只读核对兼容性；如果决策值已不可用或存在已知阻塞，不静默换版本，而是先更新本节与需求状态。后续升级按独立批次执行完整 `check`；不自动合并 major，Astro、TypeScript、Node.js 或 pnpm major 变化必须先审阅迁移说明。

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
- 全站和 Collection 氛围图通过 Asset Manifest 的 `ownerType + ownerId + role` 解析，模板不硬编码图片路径。可选 slot 未找到资产时使用 token/中性 surface 回退；找到一个 approved 当前版本时渲染；同一 slot 解析出多个当前版本时构建失败，不在运行时猜测。
- 当前独立 HTML 原型不是可复制的应用组件或永久 CSS 基线。M2 可以参考其阅读链和已验证交互，但不得整份移植其题材文案、地府 token、背景路径或单文件样式。
- MVP 只运行一套活动品牌系统和受控栏目变体，不实现主题切换器、CSS-in-JS Theme Provider、模板插件、微前端或长期并存的 v1/v2 路由。
- 将来整体重构须在另行批准的隔离预览中完成：先保存稳定 ID、slug、canonical、证据关系和语义章节顺序快照，再替换 shell、templates、components、tokens 与主题资产。通过链接、静态输出、SEO、键盘、reduced-motion、Sources、Reader Request 和 Footer newsletter 回归后一次切换并删除旧 UI；本决策不预先创建分支、worktree 或远端预览。

### 3.4 当前非空仓库的初始化边界

当前根目录已经包含治理文档、权威合同、原型和用户 Git 历史。获得单独实施授权后，M2 只在精确的 `F:\codex-project\mythic-china` 根目录手工建立 Astro 官方 manual setup 所需的最小文件；不运行 starter/template 向导覆盖现有结构，不创建临时项目再复制，不建立旁路目录、worktree 或新仓库。来源：[Astro manual setup](https://docs.astro.build/en/install-and-setup/#manual-setup)，访问于 2026-08-27。

初始化首批只包含静态 Astro、TypeScript、Content Layer、内容图校验、Vitest、ESLint 与 Prettier 的必要依赖和配置。M2 不安装 Playwright/浏览器二进制、MDX、UI 框架、CSS 框架、动画库、CMS、数据库、认证、搜索、adapter、分析、表单或商业依赖；这些都由出现真实需求的后续里程碑决定。

## 4. 目标目录

以下是 `001-mvp-foundation` 的目标结构，不代表当前已存在：

```text
mythic-china/
├─ src/
│  ├─ content/
│  │  ├─ entries/          # 人物、异兽、地点、故事和指南
│  │  ├─ collections/      # 面向读者的主题阅读路径
│  │  ├─ sources/          # 原典、研究、译本和网页来源卡
│  │  ├─ claims/           # 高风险主张与具体证据/locator
│  │  └─ terminology/      # 语境化译法与双语审核记录
│  ├─ assets/images/       # 审核后的 Web master，不放探索废图和模型
│  ├─ components/
│  │  ├─ content/          # 来源、关系、图注、披露等编辑组件
│  │  ├─ navigation/
│  │  ├─ seo/
│  │  └─ commercial/       # 进入商业阶段后才创建
│  ├─ templates/            # Entry / Collection / Home 等语义阅读结构
│  ├─ layouts/              # 页面 shell 与 landmarks
│  ├─ pages/
│  ├─ services/            # 外部服务进入需求后才创建对应 adapter
│  ├─ styles/              # tokens、base、components 与 realm 层
│  └─ content.config.ts
├─ public/                 # favicon、robots 等无需转换的公共文件
├─ tests/
│  ├─ content/
│  ├─ architecture/
│  └─ browser/
├─ visual/
│  ├─ workflows/           # 实际使用生成工具时才保存可复用的小型工作流
│  ├─ manifests/           # approved asset sidecar
│  └─ model-registry.yml   # 名称、哈希、许可证；不含权重
├─ docs/
└─ scripts/                # 只有稳定校验入口出现后才创建
```

上图是完整 MVP 的跨里程碑目标，不是 M2 脚手架清单。带“后续才创建”含义的 `components/commercial/`、`services/`、`tests/browser/`、`visual/` 等节点在对应需求批准前不得建立；M2 只创建其第 3.4 节与 `001-mvp-foundation` M2 完成条件直接需要的路径。

私有参考图、探索废图、高分辨率母版、模型和 LoRA 权重使用仓库外工作区或对象存储。仓库仅保留公开 Web 资产、manifest，以及实际使用时有复现/权利价值的小型工作流与模型登记信息。

## 5. 内容与栏目扩展

### 5.1 核心集合

- `entries`：一个通用内容集合，通过 `entryType` 区分 figure、creature、realm、tale、guide。
- `collections`：编辑策划的主题阅读路径，保存排序后的 entry ID，以及必须指向该列表成员的可选 Featured Entry ID。
- `sources`：原典、研究、译本和外部网页的标准化来源记录。
- `claims`：高风险主张、确定性与 source/locator 的对应关系。
- `terminology`：关键中文概念在具体文本语境中的英文选择与双语审核记录。

Entry 使用 `{entryId}.md`；Collection、Source、Claim、Terminology 分别使用 `{collectionId|sourceId|claimId|termId}.yml`，一对象一文件。所有 `glob()` loader 必须显式实现 `generateId`，从规范化的相对文件名生成内部 ID；内容图校验器必须核对 loader 的 `entry.id` 与记录声明的 `entryId` / `collectionId` / `sourceId` / `claimId` / `termId` 一致。`data.slug` 只承担公开 URL，不得覆盖内部关系身份。Astro 默认 ID 可被 frontmatter/data `slug` 覆盖，因此显式 `generateId` 是本项目分离 ID 与 URL 的硬门禁。来源：[Astro custom IDs](https://docs.astro.build/en/guides/content-collections/#defining-custom-ids) 与 [`glob()` `generateId`](https://docs.astro.build/en/reference/content-loader-reference/#generateid)，访问于 2026-08-27。

Zod Schema 只负责单记录字段、枚举和局部条件；独立、无网络且可由 Vitest 直接调用的纯内容图校验器负责跨集合目标存在性、ID/slug 唯一性、Collection—Entry 状态矩阵、Featured Entry 约束、来源/Claim/术语关系和明确排序。不得依赖运行时 fallback 猜测悬空关系。Astro `getCollection()` 返回顺序不作为编辑顺序事实；所有列表按合同字段或稳定键显式排序。来源：[Astro sorting collection entries](https://docs.astro.build/en/guides/content-collections/#sorting-collection-entries)，访问于 2026-08-27。

图片最终使用独立 Asset Manifest 并由 Entry/Collection 引用，但生产 manifest 与真实视觉资产属于 M3。M2 只实现允许 draft `heroAssetId: null` 的字段/状态边界与测试 fixture，不创建假 approved 资产。字段合同见 `docs/CONTENT_MODEL.md`。

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
- 多语言未进入近期路线前，英语使用根路径；正式增加中文前再决定 `/zh/` 与 translation group，不提前复制空页面。

## 6. Ready 内容包的构建与发布数据流

本节只描述内部内容包达到 `ready` 后的 build-to-release 流程，不描述读者页面顺序，也不把构建后 QA 当成首次内容审核。

```text
已通过事实、术语、英文编辑、视觉与权利审核的内容包
  -> Schema 校验
  -> 稳定 ID、关系、主张证据、术语审核、引用和资产完整性校验
  -> Astro 静态构建
  -> 图片多格式/多尺寸转换
  -> Sitemap、RSS、结构化数据
  -> 可选 Pagefind 索引
  -> 预览部署
  -> 页面呈现 / 响应式裁切 / 移动端 / 无障碍 QA
  -> 同一源身份发布生产
```

### 6.1 托管、域名与海外交付阶段

| 阶段 | 决策 |
| --- | --- |
| 文档与本地开发 | 不创建托管或域名事实；先完成内容、视觉和静态构建验收 |
| 首次在线预览 | 另立部署需求，在 Vercel、Cloudflare 或其他静态托管候选间比较账户归属、目标地区实测、预览/回滚、数据边界、成本与退出路径；本合同不预设优先项 |
| 正式公开前 | 在品牌名与权利核查完成后购买并接入自有域名；在搜索引擎收录、公开传播和积累外链之前确定唯一 canonical 域名 |
| 出现少量动态能力 | 由后续需求先比较外部服务、Astro 官方 adapter 的隔离按需路由与独立动态表面；只有托管、安全和数据边界确认并单独授权后才接入，不因预想中的 D1、R2、KV 或 Workers 先选平台 |

Vercel 与 Cloudflare Pages 均能承接 Astro 静态输出、Git 构建和预览 URL；这些能力只证明它们可以进入后续候选比较，不构成当前选择或账户授权。来源：[Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)、[Vercel Generated URLs](https://vercel.com/docs/deployments/generated-urls)、[Astro on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) 与 [Cloudflare Pages Preview Deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)，访问于 2026-08-26。

域名注册、DNS 与托管视为三个可替换边界。自有域名可以由第三方注册商持有，再用 A/CNAME 等 DNS 记录接入 Vercel；Cloudflare Pages 的外部子域可用 CNAME 接入，但 apex 根域接入 Pages 时需要成为 Cloudflare zone 并使用 Cloudflare nameserver。更换托管时应通过 DNS 切换，不让内容 ID、canonical URL 或 Markdown 跟随平台子域变化。来源：[Vercel Adding a Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) 与 [Cloudflare Pages Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)，访问于 2026-08-26。

Vercel 与 Cloudflare 都提供全球 CDN，但节点数量或平台宣传不替代实测。上线前用首页和图片最重的文章页，从预期读者区域（至少美国东/西部与欧洲）分别测试移动/桌面、冷/暖缓存，并记录 TTFB、LCP、CLS、传输图片体积和客户端 JavaScript；上线后用真实用户数据复核第 75 百分位。来源：[Vercel CDN](https://vercel.com/docs/cdn)、[Cloudflare Global Cache](https://developers.cloudflare.com/use-cases/performance/caching/) 与 [Google Lab and Field Data](https://web.dev/articles/lab-and-field-data-differences)，访问于 2026-08-26。

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
- 高风险 claim 的 source role、locator、certainty 与关键术语双语审核状态测试。
- 已发布视觉资产的 accessibility mode、alt / 空 alt、适用的 caption、AI disclosure 与 asset manifest 测试。
- 关键页面静态构建、链接、Sitemap、RSS 与结构化数据测试。
- 桌面/移动视觉回归或截图验收。
- 键盘、焦点、减弱动效和自动化无障碍检查。
- LCP 主图、图片尺寸预留和客户端 JavaScript 预算检查。

M2 首批自动门禁固定为：Prettier check、ESLint correctness、Vitest 内容/架构测试、`astro check` 与 `astro build`。`astro build` 只转译而不执行类型检查，因此未来 `build` script 必须先运行 `astro check`，全量 `check` 再按格式、lint、测试、build 的顺序组合；不得把单独 build 成功写成类型检查通过。来源：[Astro type checking](https://docs.astro.build/en/guides/typescript/#type-checking)，访问于 2026-08-27。

Playwright、浏览器二进制与自动无障碍浏览器测试延后到 M4 出现真实 Home/Collection/Entry 纵切片后再引入；M2 不为尚不存在的生产页面承担浏览器依赖。真实安装与 script 命令只有在获得实施授权、创建对应文件前写入 `DEV_WORKFLOW.md`。

## 12. MVP 明确不做

- 全站 SSR、独立 API 服务、通用数据库或微服务。
- React/Vue 全站运行时、全局状态库和客户端路由。
- WordPress 插件体系或提前接入 Headless CMS。
- Elasticsearch、Algolia、Neo4j 和实时关系图。
- 在线 ComfyUI、访问时生图和自动内容发布。
- 账号、评论、收藏、个性化推荐和站内支付。

## 13. 待确认决策

- Vercel、Cloudflare 或其他静态托管的最终选择、账户归属、Git 发布授权和回滚流程；当前未创建任何平台项目，M2 不作托管选择。
- 自有域名的品牌/权利核查、注册商、DNS 托管、canonical 主域与接入时点；当前未购买或配置域名。
- 邮件、分析和表单提供商。
- 本地 Git 已在 `F:\codex-project\mythic-china` 初始化；用户随后建立 `main`、initial commit 与 `origin`。这些是当前版本控制事实，不代表代理获得提交、推送或发布授权；后续分支规则、提交节奏和首次预览/生产发布流程仍待确认。
- 原始图片和私有参考资料的仓库外存储位置与备份策略。
