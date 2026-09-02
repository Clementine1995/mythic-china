# 002 视觉资产管线与钟馗样例：开发与验收说明

## 0. 文档职责与状态

本文负责：固定 M3 工具无关 visual brief、Asset Manifest、版本与 slot、仓库内外存储、构建期校验、Web 导出和钟馗样例的业务合同。

本文不负责：M4 生产页面与 SEO 接线、M6 六篇内容及全部视觉包、在线生成服务、模型训练、托管或发布。

| 维度 | 当前状态 | 证据或阻塞项 |
| --- | --- | --- |
| 需求状态 | M3-U1/U2/U3/U4/U5 已完成 | M3 终验中 Hero v1 手部缺陷曾重开；Project owner 于 2026-08-29 验收 Hero v2，权利/人工审核、版本/current、Entry Hero 外键、local master 复核、响应式实际写出与工程回归重新闭合 |
| 实施状态 | M3 已完成 | M3 收口的一份 approved Zhong Kui brief、七个版本化 master、七份 approved repository source rendition、两份真实 production record 与五份 manifest 记录均保留。后续 Chinese Underworld Collection Hero 与 Guide Hero 沿同一合同分别独立闭合各自的两份 master、两份 source、一份 production record、一份 manifest 及所属内容绑定；当前总量为 11 个 master/11 份 source/四份 production record/七份 manifest，六个逻辑资产各有唯一 `approved + isCurrent: true`，Zhong Kui Hero v1 保留为 `approved + isCurrent: false`；直接依赖 `sharp@0.35.4` 和非默认 `visual:build:check` 保持有效 |
| 验证状态 | M3 通过 | 2026-08-29 七个 local master 的路径/尺寸/SHA-256/inventory 核验通过；三份 current responsive rendition 的 22 个 AVIF/WebP 目标全部实际生成并解码复核；完整 `pnpm run check` 通过 Prettier、ESLint、10 个测试文件/72 项测试、`astro check`（36 个文件，0 error、0 warning、0 hint）与 3 页静态 build |
| 发布状态 | 不适用 | M3 没有远端预览或生产发布目标 |

- M3 最终结论更新时间：2026-08-29；本文后续新增的跨里程碑现状只用于说明 M3 资产仍被复用，不把本需求改写为当前项目总状态。
- M3-U1 写入前基线：`f258227da1b5a73f22c87ec99722243742db0ba0`（`feat: complete M2 content foundation`）。当时只读核查中，HEAD、`main` 与本地 `origin/main` 对齐，工作树干净；当时没有执行远端 fetch，不能据此证明服务器端状态。
- 上位需求：[`001-mvp-foundation.md`](001-mvp-foundation.md)。

## 1. 结论与开发就绪判断

- 一句话结论：M3 用一个钟馗 Entry 视觉包证明 `Source / Claim -> visual brief -> 生产 master -> versioned manifest -> approved repository source rendition -> 构建期解析与阻断` 的完整链路，不把资产样例或可转换图片源解释为页面批准。
- M3 收口结论：M3 已完成；M3 范围内无阻塞项。Entry 正文、页面接线、浏览器验收、正式字体与 SEO 当时属于后续 M4，不影响 M3 关闭。
- M3 收口时的下一动作边界：没有自动延续动作；当时的 M4、dev/preview 服务、Git 写入和发布均须 Project owner 另行授权。后续授权与当前项目状态以根目录治理文档、README、对应需求、代码、测试和执行前核查为准。

### 1.1 事实、推断与风险

已确认事实：

- M3 开始前的 M2 基线只有 Entry、Collection、Source、Claim、Terminology 五类 Content Layer；当时 Entry/Collection 已有 nullable `heroAssetId`，但只校验 `visual-review` 时非空，不校验真实资产外键。
- 当前两个 Entry 与一个 Collection 的编辑形态已获阶段性接受，仍保持 `editorial-review`；钟馗 Entry、Chinese Underworld Collection 与 Guide Entry 的 `heroAssetId` 分别为 `asset-zhong-kui-hero-primary`、`asset-chinese-underworld-hero-primary` 与 `asset-chinese-underworld-guide-hero-primary`。`visual/manifests` 已有七份 approved 版本记录，其中 Zhong Kui Hero v2、Lead/OG/Social v1、Collection Hero v1 与 Guide Hero v1 为 current，Zhong Kui Hero v1 为 non-current；`src/assets/images` 已有 11 份被其唯一引用的 approved source rendition。内容 resolver 把三个稳定 Hero 逻辑 ID 分别解析到各自显式 current manifest。
- `docs/CONTENT_MODEL.md` 与本文已闭合逻辑资产、版本记录、current 选择、重复 role slot 和独立移动构图合同；M3-U3 已把 strict Schema、纯关系/文件 validator 和 resolver 接入真实 Astro build 调用链。
- Astro 当前官方 Content Loader `glob()` 支持从任意本地目录加载 YAML，并通过 `base` 与 `generateId` 固定记录身份；本项目可以从 `visual/manifests` 建立构建期集合，无需为 YAML 再增加依赖。来源：[Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/)，访问于 2026-08-28。

本需求采用的设计选择：

- M3 样例 owner 固定为 `ownerType: entry`、`ownerId: zhong-kui`；钟馗 Entry 保持 `draft`，M3 不借机补完整正文或提升内容状态。
- 逻辑 `assetId` 不含版本；一份 manifest 表示一个具体版本，并使用唯一 `manifestId`。
- current 不从最大版本号猜测；每份版本记录显式保存 `isCurrent`，允许明确回滚。
- slot 使用 `ownerType + ownerId + role + slotId`；`slotId: primary` 用于单例 Hero/Lead/OG/Social，重复 Inline 或环境图以后使用稳定语义 slot。
- 钟馗样例拆为四个逻辑资产：Hero、Lead、OG、Social。Hero 内含 desktop/mobile 两个独立构图；M3 Social 最小样例只做 1080×1350 portrait，story 只保留 Schema 值域，不作为本期交付。
- OG 样例验证 1200×630 构图与标题安全区，不冻结 M4 的字体、标题排版、metadata 或最终 SEO 输出。

未验证风险：

- 钟馗已有最小视觉 Source/Claim、approved brief 与经终审的 M3 生产资产，但这不是完整 Entry 研究、正式正文审核或 M4 页面批准；无新增 Terminology 是因为本期未引入既有 `钟馗 / Zhōng Kuí / Zhong Kui` 之外的新术语决定。
- 本期实际生成工具是 OpenAI ImageGen；没有使用 ComfyUI、模型下载、LoRA、字体烧录或馆藏图片输入。OpenAI 个人与业务条款已于 2026-08-28 从官方页面核对；2026-08-29 Project owner 确认本轮使用个人且非组织管理的账户，并确认有权为 Mythic China 生成、保存和发布输出。全部五份 manifest 按 `in-house-original` 记录 private individual 权利主体；该双方相对权利记录不构成可版权性、唯一性、不侵权或未记录第三方权利的保证。
- master 物理位置已确认在项目根 `/.local/visual-production/masters/`，由 `/.local/` 锚定 Git ignore，且不进入 Astro Content Layer、默认 build 或仓库 inventory；logical URI 使用 `project-local://mythic-china/.local/visual-production/masters/...`。当前没有独立备份，丢失时只能按生产记录重新生成。
- M3 收口时已用 Astro 公开 `imageMetadata()` API 对七份真实 WebP/PNG repository source 验证解码、格式、方向感知尺寸、SHA-256 与大小。隔离构建从三份 current responsive buildPlan 消费真实 manifest，并通过直接依赖 `sharp@0.35.4` 实际生成和解码复核全部 22 个目标变体；临时 `outDir`、图片缓存与 Vite cache 在验证后清理，不进入 manifest、默认 `dist/` 或仓库。Astro 仍可能刷新项目内 ignored `.astro/` 构建元数据；它不是发布制品或持久验证证据。在 2026-08-29 的 M3 收口时，M4 尚未把这些 buildPlan 接入生产页面，因此当时的页面级响应式选择、浏览器表现与 SEO 输出仍待后续验证；后续 M4 实现与现状以 003、README 和当前代码为准。
- 两份实际 production record 都是 Content Layer 实体并通过 manifest 双向外键及 master tuple 校验；本期未使用 ComfyUI，因此没有 workflow/model registry 实体或外键。Git-ignored local master 不成为默认 clone/CI 依赖，其七个物理文件已在生产会话单独核验并把结果写入对应 record。

### 1.2 用户已确认的实施选择

用户已于 2026-08-28 至 29 日分批确认以下选择；后续若改变，须在对应 Schema 或生产单元前修改本合同：

1. 样例为钟馗 Entry，Entry 在 M3 保持 `draft`。
2. 采用稳定逻辑 `assetId` + versioned `manifestId` + 显式 `isCurrent`。
3. 采用四个逻辑资产，Social 本期只交付 portrait。
4. Manifest 作为 Astro `assets` Content Layer collection 从 `visual/manifests/**/*.yml` 加载；visual brief 从 `visual/briefs/**/*.yml` 加载为独立 `visualBriefs` collection。
5. M3-U1–U4 初始不新增依赖；U5 首次出现 `MissingSharp` 后已停止，并由 Project owner 单独授权唯一新增直接依赖 `sharp@0.35.4`。其他依赖仍未授权，不使用隐式 transitive package 或自建二进制工具。
6. M3-U4 制作方式为 `ai-assisted`，实际生成工具为 OpenAI ImageGen；本期不使用 ComfyUI，不创建 ComfyUI workflow 或 model registry 空壳。
7. master 保存在当前项目目录的 `/.local/visual-production/masters/`，但通过 `/.local/` 整体忽略而位于 Git inventory、Content Layer 和默认 build 之外；此决定替代早期“仓库外物理目录”的未决口径。
8. 公开 credit 为 `Mythic China Editorial`。若 Project owner 确认本次使用个人且非组织管理的 OpenAI 账户，并确认有权在当前设备为本项目生成/保存/发布输出，则成品权利持有人记录为 `Mythic China project owner (private individual)`，公开仓库不保存真实姓名；若实际为组织管理账户，则必须按真实 customer/授权关系另行记录，不得沿用私人 owner。
9. 五类审核均由 `Project owner (user-confirmed)` 承担；审核身份只记录角色，不虚构真实姓名。每项 `reviewedAt` 与 notes 必须在看到最终成品后据实填写。
10. Hero 当前只确认人物与美术方向；`1672×941` anchor 不是 `3200×1800` master。任何精确画布重建、裁切或编码都必须保留原始尺寸与处理证据，不能把生成候选伪称原生 master。

上述生产决定不改写已经 approved 的 brief v1；它们进入本需求与 production record。2026-08-29 真实五项审核和成品权利结论均已记录。终验返修沿相同合同新增 Hero v2，并保留 v1 为 approved/non-current；Hero v2 与 Lead/OG/Social v1 共四份 manifest 处于 approved/current。

## 2. 背景、目标与成功标准

### 2.1 当前问题

M2 的 `heroAssetId` 只是格式合法的字符串；不存在资产记录、版本选择、文件存在性、Claim/权利、审核或无障碍闭环。继续直接生图会把临时文件名和未审事实写进长期页面。

### 2.2 目标行为

- 编辑能先建立真实证据和 visual brief，再选择工具生产。
- 每个公开图片文件都能追到逻辑资产、具体版本、owner/slot、视觉 Claim、权利与人工审核。
- 构建期能确定性选择唯一 current 版本；缺失、悬空、冲突或未批准状态不能被页面 fallback 掩盖。
- 替换资产版本只调整 manifest current 选择，不改变 Entry ID、slug、canonical URL 或 `heroAssetId` 的逻辑身份。

### 2.3 可观察成功标准

- 建立一份通过 Schema 的钟馗 visual brief，以及 Hero、Lead、OG、Social 四个逻辑资产的 versioned manifests。
- Hero 有 desktop 3200×1800 与 mobile 1600×2000 独立构图；Lead 为 2400×1600；OG 为 1200×630；Social portrait 为 1080×1350。
- 所有 approved repository source renditions 存在于 `src/assets/images/`，真实格式、尺寸、SHA-256、命名与 manifest 一致；M4 的生产响应式/hash 输出只存在于可重建的 `dist/`，M3-U5 的验证输出只存在于运行期临时目录并在结束时清理。
- `zhong-kui.heroAssetId` 最终引用 versionless Hero `assetId`，Entry 保持 `draft`。
- 正反测试覆盖 identity、owner、Claim、slot/current、状态、文件、无障碍、披露、权利与禁入物；完整 `pnpm run check` 通过。
- 样例资产通过人工文化、权利、视觉、accessibility 与适用的语言审核；实际审核人和日期有记录。

## 3. 范围与边界

### 3.1 本期交付

- M3 详细需求与权威合同同步。
- 钟馗样例需要的最小真实 Source/Claim 与必要 TerminologyRecord；只支撑视觉 verified 元素，不扩写整篇文章。
- 工具无关 visual brief Schema、Asset Manifest Schema、Content Layer loader、纯关系/文件 validator 与 resolver。
- `visual/briefs/`、`visual/manifests/`、`src/assets/images/` 的合规目录与 inventory 规则。
- 钟馗 Hero、Lead、OG、Social portrait 样例及适用的生成/编辑生产记录。
- 构建期和人工资产级验收。

### 3.2 本期不包含

- Home、Collection、Entry、Explore、About 的生产页面或共享表现层实现。
- canonical/OG metadata、Sitemap、RSS、structured data 与页面浏览器验收。
- 六篇首发内容、第二个 Collection 或批量视觉包。
- Social story、视频、LoRA 训练、在线 ComfyUI、运行时生图或自动发布。
- dev/preview 服务、浏览器自动化、外部写接口、托管、部署与发布。
- 除 U5 已单独授权的精确 `sharp@0.35.4` 直接依赖与唯一锁文件更新外，其他依赖安装或升级、已确认 `/.local/` 范围之外的仓库外目录写入、Git add/commit/push。

### 3.3 不得改变的行为

- M2 稳定 ID、slug、canonical、内容关系、Source/Claim/Terminology 证据合同与静态输出不变。
- M1 原型、prototype-only 图片和仓库外 A/C 方向稿不得升级为生产资产。
- Collection Hero 仍须表现整个中国阴间主题，不得用钟馗 Entry 角色包替代。
- 图片失败或缺少可选 slot 时只能退化为中性 surface；不能隐藏正文、导航或 Sources。

## 4. 当前事实与目标调用链

M3 开始前基线：

```text
Entry / Collection heroAssetId
  -> 只校验 ID 形式与 visual-review 非空
  -> 没有 manifest / 文件 / Claim / review 外键
```

M3-U5 当前已实现：

```text
真实 Source / Claim /（适用时）Terminology
  -> versioned visual brief
  -> 项目根 Git-ignored production master + SHA-256
  -> versioned Asset Manifest
  -> approved repository source renditions
  -> Astro Content Layer + 纯关系/文件校验
  -> 唯一 current resolver
  -> 非默认 U5 verifier 复核 master 并实际生成/解码响应式目标
```

在 M3 收口时，后续 M4 计划由生产页面消费逻辑 `assetId`，确定 `sizes`、LCP priority、浏览器裁切与正式 `dist/` 输出；该页面链路当时尚未授权或实施。后续 M4 已完成的 review 页面消费与仍未建立的 public artifact 边界以 003、README 和当前代码为准。

## 5. 最终业务与资产合同

### 5.1 身份、slot 与版本

- `assetId` 是稳定逻辑身份，格式为 `asset-{ownerId}-{role}-{slotId}`，例如 `asset-zhong-kui-hero-primary`；它进入全局稳定 ID 唯一性校验。
- `manifestId` 标识不可混淆的版本记录，格式为 `{assetId}-v{version}`；manifest 文件名、loader ID 与记录内 `manifestId` 必须一致。
- `version` 是同一 `assetId` 内从 1 开始的正整数；仓库快照必须保留从 1 到当前最大版本的连续历史，不得重复、留空洞或倒写历史。brief 的同 owner/purpose 版本遵循同一连续规则。
- `role`：`hero | lead | inline | page-atmosphere | og | social`。
- `slotId` 是小写 kebab-case 稳定语义键；本样例四项均使用 `primary`。
- 版本状态：`draft | in-review | approved | archived`。
- `isCurrent` 显式决定 resolver 选择，不按最大版本推断。同一 `assetId` 和同一 owner/role/slot 最多一个 current；被活动内容引用的逻辑资产必须恰有一个 current。
- `archived` 强制 `isCurrent: false`，并保留 former-approved 的 brief、rendition、制作、权利、无障碍与审核谱系，不能降级为空壳。历史 approved 版本可保持 `approved + isCurrent: false` 以支持明确回滚。
- approved 版本的事实、文件、Claim、权利、制作和审核字段不可原地改写；只允许在受验证切换中修改 `isCurrent`，或在明确撤回时转为 `archived`。其他变化创建新版本。

### 5.2 Owner 与内容状态

- `ownerType`：`entry | collection | global`；`ownerId` 必须使用稳定 ID。
- Entry 资产的 verified Claim 必须归属同一 Entry、列入该 Entry 的 `claimIds`，且 Claim 使用的 Source 列入该 Entry 的 `sourceIds`。
- Collection 资产的 verified Claim 只能归属该 Collection 当前成员 Entry，并已在该成员的 `claimIds` / `sourceIds` 中闭合；当前没有 Collection-owned Claim，跨成员或策展性解释须先由独立需求扩展 owner 合同。
- M3 不放行 factual global asset；global 资产只允许 `decorative + invented`，ownerId 固定为 `site-shell`。未来事实型 global 资产须先扩展 Claim owner 合同。
- Entry/Collection 的 `heroAssetId` 必须引用 versionless 逻辑资产，并分别匹配自身 owner、`role: hero`、`slotId: primary`。
- `draft | editorial-review` 内容可不引用 Hero；若填写，owner/role/slot 外键仍须合法，且须解析到一个非 archived current 版本。
- `visual-review` 必须引用 Hero；current 版本为 `in-review | approved`，brief、Claim、权利、披露和可审核 renditions 齐全。
- `ready | published` 必须解析到 current approved 版本，全部适用审核 approved，文件和哈希存在。
- `archived` 内容退出公开构建并保留发布谱系；其逻辑 `assetId` 至少保留一份 approved/archived 历史 manifest，但不要求存在 current，也不得回流公开路由。

### 5.3 Visual brief

每份 `visual/briefs/{briefId}.yml` 至少记录：

- `briefId` 使用 `brief-{ownerId}-{purpose}-v{version}`，例如 `brief-zhong-kui-visual-package-v1`；文件名、loader ID 与记录内 ID 一致，version 是从 1 开始的正整数。
- status 为 `draft | in-review | approved | archived`；approved 必须保存真实 `approvedBy`、带引号的 UTC RFC 3339 `approvedAt` 与 notes。未批准 brief 不得进入生产。
- owner 使用 `ownerType + ownerId`；`targetSlots[]` 覆盖 Hero、Lead、OG、Social，每项显式记录 role、slot、必需/可选 usage、画布尺寸与响应式构建目标，四个 manifest 引用同一包级 brief 版本。
- `primaryReferenceFamily`、period、region、medium、cultural context。
- `referenceAssets[]` 每项使用小写 kebab-case `referenceId`；同一 reference 跨 brief 版本保持 ID，保存 URL、author/organization、creator、`rightsStatus`、rights URL、适用 `licenseOrPermissionId` 与 notes。`rightsStatus` 闭合为 `research-only | public-domain | licensed | permission | unknown`；licensed/permission 必须有 identity 与 rights URL，public-domain/research-only 必须有可审核 rights URL，unknown 阻断 approved；research-only 不授予复制或衍生权。
- `visualElements.verified / inferred / invented` 每项使用小写 kebab-case `elementId`；语义未变时跨 brief 版本保持 ID。verified 为 `statement + claimIds[]`，并关联现存、非 provisional、`certainty: verified` 的 Claim；inferred 为 `statement + rationale`；invented 为 `statement`。
- composition、文字安全区、desktop/mobile 独立构图要求、导出规格和 focal point 目标。
- excluded motifs：伪汉字、错置时期/地域/宗教元素、Logo、水印、现代游戏 UI 和受保护造型。

brief 进入 approved 前，所有 verified Claim 必须通过第 5.2 节的 Entry/Source 书目链，所有 reference rights 已分类且无 unknown，批准人和时间真实存在。approved brief 不原地改写；内容变化创建新版本。brief 元素与 reference 是单一事实来源；manifest 只引用 ID 子集，不复制 statement、Claim 或 rights 字段。

brief 只有在撤回时进入 archived；归档前必须先把所有引用它的 `in-review | approved` manifest 转为 archived，因此 `in-review | approved` manifest 永远只引用 approved brief。draft manifest 可暂缺 brief，不受此句扩展。

`canonical` 不作为 Schema 键；本合同使用 `verified`，表示“有 Claim 支撑”，不表示存在唯一中国神话正典。`PROJECT_RULES.md` 中的 factual/canonical 约束按此含义执行。

### 5.4 Asset Manifest

每份 `visual/manifests/{manifestId}.yml` 至少包含：

- identity：`assetId`、`manifestId`、owner、role、slot、version、status、`isCurrent`、`briefId`。
- production masters：一个逻辑资产版本包含一个或多个 `masterRenditions`；Hero desktop/mobile 是两个独立 master。每项记录 logical URI、usage、尺寸与 SHA-256。
- repository source renditions：`repositoryRenditions[]` 明确 usage、path、format、widthPx、heightPx、SHA-256、focal point 与 `buildPlan`；每个 usage 只保存一份尺寸锁定的 Astro 构建输入，usage 不从文件名猜测。
- manifest 的 owner 必须等于 brief owner，`role + slotId` 必须唯一匹配 brief `targetSlots[]`，master/repository usage、画布与 buildPlan 必须满足该 target；`visualElementIds[]` 与 `referenceAssetIds[]` 只能选择同一 brief 中存在的元素/reference。verified Claim 并集由 brief 解析，不维护顶层 `sourceClaimIds`。
- publication rights：status 为 `pending | approved | rejected`，basis 为 `in-house-original | commission-contract | public-domain | license | permission`，并保存 `rightsHolder`、`licenseOrPermissionId`、`rightsUrl` 与 notes。参考用途权利不能替代成品公开权利。
- production method、实际 tool、record path、人工修改与条件式 workflow/model metadata。
- cultural、rights、visual、accessibility、language 五类 review 的 status、reviewedBy、reviewedAt 与 notes；status 为 `pending | approved | changes-requested | not-applicable`。前四类公开资产审核不得为 `not-applicable`；language 审核覆盖图片内文字/专名、alt 与 caption，只有这些内容均不存在时才可注明理由后使用 `not-applicable`。
- `accessibilityMode`、alt/空 alt、适用 caption、credit、AI disclosure。

M3-U3 冻结以下最小机器形状；U4 必须沿用或先修改本需求：

- `masterRenditions[]` 每项严格为 `logicalUri + usage + widthPx + heightPx + sha256`；`logicalUri` 必须是带显式 scheme、非 `file:` 且不含反斜杠的逻辑 URI，同一 manifest 内唯一。U3 不伪造其外部可达性或真实哈希，U4 必须回查。
- `repositoryRenditions[]` 每项严格为 `usage + path + format + widthPx + heightPx + sha256 + focalPoint + buildPlan`；`path` 必须是 `src/assets/images/` 下的规范 POSIX 项目相对路径，文件名固定为 `{ownerId}-{role}-{slotId}-v{version}-{usage}-{widthPx}w.{format}`。
- `production` 为 `null` 或严格对象 `method + tool + recordPath + workflow`；`recordPath` 必须是直接位于 `visual/production-records/` 的 `.yml` 文件。`workflow` 为 `null` 或 `workflowId + path + sha256 + modelRegistryIds[]`，路径只能落在 `visual/workflows/`；实际 ComfyUI 使用必须同时为 `ai-assisted` 并保存 workflow，其他方法不得携带 workflow。
- `humanEdits[]` 是唯一、非空的简短人工修改说明字符串列表，不复制完整生产日志。

每份 `visual/production-records/{productionRecordId}.yml` 由独立 `productionRecords` Content Layer collection 加载，并使用 strict Schema：

- 顶层记录 `productionRecordId`（`production-...-vN`）、`briefId`、method/tool、可空 `modelId`/`modelNotes`、`termsUrl`、rights notes、`recordedAt`、非空 `renditions[]` 与 notes。
- 每个 rendition 记录 `manifestId + usage`、实际 prompt 或 `null`、本地收到工具输出的 `receivedAt`、输入图片 kind/hash/权利说明、raw output 格式/尺寸/hash、完整 master tuple、处理工具/版本/operations 与 `verifiedAt`。若工具不返回真实生成时间，不得把接收时间伪称 `generatedAt`。
- AI-assisted record 必须有实际 tool、model notes、terms URL 与逐 rendition prompt；服务未暴露模型 ID 时使用 `modelId: null` 并如实说明，不猜模型。非 AI record 不携带 prompt 或模型 metadata。
- manifest `recordPath` 必须解析真实 record；两者 `briefId`、method、tool 一致，record 的每个 `manifestId + usage` 与 manifest master URI/尺寸/hash 一一相同，并由 record 反向指回该 manifest。
- 默认 build 不读取 `/.local/` master，也不因 clone/CI 缺少 ignored 文件失败。U4 生产会话对实际 master 做一次性目录身份、尺寸和 SHA 核验，并把结果写入 record；以后若需要重复核验，由 U5 设计非默认入口。

role 与 rendition usage 使用下列闭合矩阵；同一 manifest 内 usage 唯一，多格式、多宽度文件由 Astro 构建生成：

| role | 必需 repository/master usage | 可选 usage |
| --- | --- | --- |
| `hero` | `hero-desktop`、`hero-mobile` 各一份 | 无 |
| `lead` | `article-lead` 一份 | 无 |
| `og` | `open-graph` 一份 | 无 |
| `social` | `social-portrait` 一份 | `social-story` 一份 |
| `inline` | `inline` 一份 | 无 |
| `page-atmosphere` | `page-atmosphere` 一份 | 无 |

M3 钟馗样例的 Social 只交付 portrait；story 只保留值域。

### 5.5 条件字段与失败语义

- `informative` 必须非空 alt 与 caption；`decorative` 必须空 alt，仍需 credit、适用 AI disclosure、权利与人工审核。
- informative 资产与本期钟馗四个逻辑资产必须至少选择一个 verified visual element。只有 `decorative`、至少选择一个 invented element 且所选元素全部为 invented 的资产可以没有 Claim；此类资产不得支撑正文事实。
- `production.method`：`in-house-original | commissioned-original | public-domain-reuse | licensed-reuse | ai-assisted`。rights basis 分别为 in-house-original、commission-contract、public-domain、license/permission；ai-assisted 可使用 in-house-original、license 或 permission，并另行核对工具/模型许可。`ai-assisted` 必须有 tool、production record 和非空 AI disclosure；其他方法的 `aiDisclosure` 为 `null`。
- publication rights 进入 approved 时，除 public-domain 外 `rightsHolder` 必填；public-domain 允许 `rightsHolder: null`，但必须有可审核 `rightsUrl` 与非空 creator/source credit。commission-contract 需要 `licenseOrPermissionId`，license/permission 同时需要 identity 与 rights URL；两类 reuse 均须非空 credit。
- 实际使用 ComfyUI 时才要求 workflow ID、真实 SHA-256 与 model registry 引用；禁止 `pending` 哈希和空字段。
- `draft` manifest 可暂缺 brief，但此时 visual/reference ID 数组必须为空；`in-review | approved` 必须引用 approved brief，且 owner、target slot、usage/画布/buildPlan 与所有 visual/reference ID 都能在该 brief 中一致解析。`archived` manifest 必须保留 approved 谱系，可引用 approved 或 archived brief。
- 任何 reference `rightsStatus: unknown`、成品 publication rights 未确认、必需 review 未 approved、language review 既未 approved 也不满足带理由的 `not-applicable` 条件、verified Claim 悬空/provisional、文件缺失或哈希/尺寸不符，都不能进入 `approved`。
- 被活动内容引用的逻辑资产或必须解析的 slot 若无 current、存在多个 current 或 current archived，则构建失败；archived 内容与未被使用的历史资产不要求 current。manifest/loader/file ID 不一致、role/usage 不匹配或路径逃逸批准目录同样构建失败。
- `buildPlan` 的响应式 Web formats 固定为 `avif + webp`，candidate widths 取 `640 / 960 / 1440 / 1920` 与源宽度的非空交集，禁止 upscale；OG/social 保持第 5.6 节精确画布。页面 `sizes` 由 M4 确认，`dist/` 输出不反写 manifest。
- SHA-256 使用 64 位小写十六进制；focal point 的 x/y 均在 0–1；`approvedAt`、`reviewedAt` 使用带引号的 UTC RFC 3339 时间戳。
- 仓库内批准图片格式限定为 `.avif | .webp | .png | .jpg | .jpeg`；单个 `src/assets/images` 文件初始硬上限为 10 MiB。超过上限必须先说明原因并修改需求，不静默加入 Git。
- `src/assets/images`、`visual/briefs`、`visual/manifests` 禁止模型权重、私有参考图、探索废图和 production master；常见权重扩展名与文件签名进入仓库级禁入测试。三个 inventory 从可信项目根逐级拒绝 symlink/junction，不能借父目录或嵌套链接把仓库外文件带入 loader/validator。

### 5.6 钟馗样例资产

| 逻辑资产 | role / slot | 必需 source rendition usage / 画布 | 说明 |
| --- | --- | --- | --- |
| `asset-zhong-kui-hero-primary` | `hero / primary` | `hero-desktop` 3200×1800；`hero-mobile` 1600×2000 | 两个独立构图，不机械裁切 |
| `asset-zhong-kui-lead-primary` | `lead / primary` | `article-lead` 2400×1600 | Entry 3:2 lead |
| `asset-zhong-kui-og-primary` | `og / primary` | `open-graph` 1200×630 | 验证标题安全区；最终字体系 M4 |
| `asset-zhong-kui-social-primary` | `social / primary` | `social-portrait` 1080×1350 | 本期仅 portrait |

OG/Social 的人物与场景文字不得由生成模型烧录；若后续添加标题，只能由受控排版步骤产生，并记录字体权利与生产修改。

## 6. 目标技术与设计

- `src/content.config.ts` 已定义 `assets`、`visualBriefs` 与 `productionRecords` 三个视觉 build-time collections，分别从 manifest、brief 与 production record 目录加载；三者显式 `generateId`。
- Zod 已校验单记录与条件字段；纯 validator 负责全局 ID、owner、Claim、内容状态、slot/current、连续版本、路径、文件 metadata 和确定性错误排序。
- Resolver 已支持逻辑 `assetId` 或 owner/role/slot；显式引用与必需 slot 必须输出唯一 current，否则失败；只有可选 slot 缺失时返回 none，重复 current 仍失败。不得在模板中硬编码路径或用最大版本猜测。
- approved、尺寸锁定的 source renditions 已放在 `src/assets/images`；M3-U3 已建立确定性的本地图片 metadata registry，并校验 manifest path 能解析到对应源文件。M4 页面再由 Astro `Image/Picture` 从这些源文件生成多格式、多宽度与哈希输出；`public/` 不承接这些图片，`dist/` 输出不反写 manifest。
- visual record 与图片 inventory 已从项目根逐段检查目录身份并拒绝 symlink/junction；production record 的真实 loader 路径与双向数据外键已闭合，并对七个 master 与七份 repository source 的尺寸/hash/格式完成实际核验。publication rights、Project owner 五项人审、唯一 current 与 Entry Hero v2 解析均已闭合；ComfyUI workflow/model registry 本期不适用。
- M3 可以使用隔离测试或稳定验证脚本证明图片转换，不新增生产页面；实际页面、LCP priority、sizes 和浏览器性能属于 M4。
- 不增加客户端 JavaScript，不在构建或访问链调用生成模型。
- M3-U1–U4 没有新增依赖；U5 在内置能力报告 `MissingSharp` 后已按停止门禁说明依赖、许可、退出方式和验证收益，并获 Project owner 单独授权精确 `sharp@0.35.4`。Sharp 官方声明 Apache-2.0，用于本地构建期把尺寸锁定 source 编码为 WebP/AVIF；项目保留适用许可证告知。退出时必须先更新本需求和验证口径，再以单独授权移除直接依赖与锁记录，并选择另行批准的 Astro image service 或停止对应转换；不得静默回退到 transitive Sharp。除该唯一例外外，不新增或升级依赖。

## 7. 影响清单

| 类型 | 计划动作 | 文件或对象 | 对应验收 |
| --- | --- | --- | --- |
| 需求/文档 | 新增/修改 | 本文件、001、README、PRODUCT、CONTENT_MODEL、ARCHITECTURE、STYLE、DEV_WORKFLOW | 状态、链接、合同一致 |
| 内容证据 | 新增 | 最小 Zhong Kui Source/Claim/必要 Terminology | verified 视觉元素可追溯 |
| Asset Schema | 新增 | visual briefs、manifests、loader/types | 严格字段与条件测试 |
| 关系/文件 | 修改 | content graph、resolver、inventory | owner/Claim/slot/current/file 正反测试 |
| 内容引用 | 修改 | `zhong-kui.heroAssetId` | 指向 versionless Hero asset，Entry 保持 draft |
| 资产 | 新增 | approved Web/OG/social source renditions | 源文件尺寸、哈希、裁切与审核；响应式构建输出不入库 |
| 明确不改 | 无 | pages/templates/layouts/styles、外部服务、除 `sharp@0.35.4` 外的依赖 | M4/M5 范围未提前进入；Sharp 仅服务 U5 构建期图片验证 |

## 8. 实施拆分

### M3-U1 合同与基线收口

- 交付：本文件及上位文档同步；详细数据合同可供用户确认。
- 不交付：代码、证据记录、manifest 或图片。
- 授权：已授权并完成。
- 完成条件：文档验证通过，差异只落在声明范围；用户已明确确认合同，U1 关闭。

### M3-U2 最小研究与 visual brief

- 交付：钟馗样例所需的真实 Source/Claim/必要 Terminology、权利清单、verified/inferred/invented、排除元素与四资产规格。
- 不交付：完整 Entry 正文或内容状态提升。
- 进入条件：已满足；用户确认 U1 并明确授权公开研究和本地内容写入。
- 完成条件：已满足 U2 交付条件；交付时 brief 为 `in-review`，5 份 Source/5 份 verified Claim 闭合，4 个 reference asset 均有 public-domain/CC0 权利依据且无 unknown；该 brief 随后由项目所有者在 U3 开始时确认并记录为 approved。

### M3-U3 Schema、loader、validator 与 resolver

- 交付：严格 Schema、Content Layer collections、关系/文件校验、resolver、fixtures 与正反测试。
- 不交付：页面组件或图片生产。
- 进入条件：已满足；用户确认 U2 brief 并明确授权 U3，不新增依赖。
- 完成条件：已满足；钟馗 approved brief 通过 Schema/Claim/Source/reference 校验，brief/manifest 状态与权利、版本/current、内容 Hero、resolver、路径/metadata/禁入物均有正反测试，完整回归通过，M2 的假 asset 字符串不再能绕过外键。

### M3-U4 钟馗样例生产与审核

- 交付：四个逻辑资产的 masters 追溯、approved repository source renditions、manifests、实际生产记录和人工审核。
- 进入条件：已满足；U2/U3 完成，钟馗 brief approved，制作方式、项目内 Git-ignored master 位置与审核责任已经用户明确授权。OpenAI 工具条款核对和逐图审核属于 U4 完成门禁。
- 完成条件：每个公开文件均可闭环追溯；Entry 仍为 draft。

### M3-U5 构建与收口

- 交付：文件/尺寸/哈希/禁入物验证、完整工程门禁、资产级人工 QA、文档完成记录。
- 不交付：M4 页面或浏览器页面批准。
- 完成条件：第 9 节适用项通过，未执行项和剩余风险明确。
- 当前状态：已完成；非默认验证入口、local master 实体核验、正反测试、22 个真实 AVIF/WebP 输出复核与完整工程门禁全部通过。

### M3 终验 Hero v2 手部返修

- 触发：Project owner 在原 M3 终验中确认 Hero desktop/mobile 的钟馗双手存在明显非人手结构，M3 因视觉阻断项重开。
- 交付：只把钟馗双手定向修正为可信五指人手，保持人物身份、面部、服装、整体构图、负空间/安全区、画幅和三名小鬼的警戒/支撑/退避姿态；desktop candidate 01 与 mobile candidate 02 先展示，Project owner 明确回复“可以”后才进入 v2。
- 版本合同：新增 Hero v2 master/source/manifest/production record；Hero v1 的 master/source/manifest/production record 全部保留，只把 v1 `isCurrent` 改为 `false`，不静默覆盖。Entry 继续引用 versionless `assetId`，由 resolver 解析 v2。
- 完成条件：v2 五项审核、权利、accessibility、manifest/record 双向关系和实际文件 metadata 通过；七个 local master、三份 current responsive rendition 的 22 个输出与完整工程门禁通过。
- 当前状态：已完成；M3 重新闭合，M4 仍未开始。

## 9. 测试与验收

| 层级 | 场景 | 期望结果 | 入口 | 当前结果 |
| --- | --- | --- | --- | --- |
| 文档 | 占位符、UTF-8、相对链接、阶段状态 | 无占位符/坏编码/坏链接，M2/M3/M4/M6 一致 | `DEV_WORKFLOW.md` 文档验证 | 通过（2026-08-29） |
| 研究数据 | Source/Claim/Entry ID、字段与既有内容图 | 5 份真实 Source 与 5 份 verified Claim 可由现有 Schema/graph 加载，全部列入 draft Entry | content/visual/architecture Vitest + build | 通过 |
| Schema | identity/status/conditional/review/accessibility、role/usage/buildPlan | 严格字段与值域；非法组合、upscale 与错 usage 失败 | M3 定向 Vitest | 通过 |
| 关系 | owner、brief/element/reference、Claim/Entry/Source、heroAssetId、global/collection 规则 | 无悬空、重复事实或越权引用；未批准 brief 不能进入生产状态 | M3 graph Vitest | 通过 |
| 版本 | asset/manifest/brief version/current/slot | 从 v1 连续、唯一、可回滚，不猜最大版本 | M3 graph/resolver Vitest | 通过 |
| 文件 | source path、format、尺寸、SHA-256、命名、buildPlan、缺失/欺骗 metadata | 与 manifest 完全一致且不逃逸目录；candidate widths 不超过源宽，`dist/` 输出不入库 | M3 file Vitest/registry + `pnpm run visual:build:check` | 合成正反测试、七份真实 WebP/PNG source inventory 与七个 local master 均通过；3 份 current responsive rendition 的 22 个目标均未 upscale，并已实际生成和解码复核 |
| 仓库卫生 | 权重、master、私有参考、废图、大文件、symlink/junction | 禁入物为 0；文件不超过合同上限；链接不能越过批准目录 | architecture/runtime inventory test | 通过 |
| 人工资产 | 文化、权利、视觉、无障碍、语言、裁切 | 五类审核有身份/日期，所有适用项 approved | review records | 通过（2026-08-29；Project owner 已完成四份 current manifest 的五项审核；Hero v2 desktop/mobile 候选另经明确验收） |
| 回归 | format/lint/Vitest/Astro check/build | 固定运行时完整 `pnpm run check` 通过 | `DEV_WORKFLOW.md` | 通过（2026-08-29；10 个测试文件/72 项测试，Astro 0 error/0 warning/0 hint，3 页 build） |
| 页面/浏览器 | Home/Collection/Entry 与 SEO | 不属于 M3 | M4 | 不适用 |

## 10. 环境、数据与外部影响授权

| 动作 | 当前授权 | 影响与停止条件 |
| --- | --- | --- |
| M3-U1 本地文档修改 | 已授权并完成 | 合同已由用户确认 |
| M3-U2 研究、内容与 brief | 已授权并完成 | 只含 Source/Claim、brief、来源索引、阶段同步与必要架构边界测试 |
| M3-U3 Schema/loader/validator/resolver | 已授权并完成 | 自动资产合同与空 inventory 已通过完整工程验证，不包含生产图片 |
| M3-U4 本地生产 | 已完成 | OpenAI ImageGen、确认的 `/.local/` master 根、首份生产记录、四个 approved/current manifest、五份 approved source rendition、Entry Hero 外键、测试和文档构成首轮历史交付 |
| M3-U5 收口 | 已授权并完成 | 非默认 master/响应式构建入口、22 个实际输出复核和完整工程门禁均通过 |
| M3 终验 Hero v2 手部返修 | 已授权并完成 | 只修复 Hero 双手；候选经 Project owner 明确验收后新增 v2，保留 v1 approved/non-current 历史；七个 master、22 个 current 输出和完整门禁通过 |
| `sharp@0.35.4` 直接依赖、锁文件更新与安装 | 已授权并完成 | 只增加精确 Sharp 运行依赖；固定运行时、既有离线 store、`--ignore-scripts` 与唯一锁文件均已核验 |
| 其他依赖安装/升级 | 未授权 | 任何能力缺口先停止说明 |
| `/.local/visual-production/` 写入 | 已授权 | 仅当前项目根的 Git-ignored 本地生产存储；不删除用户文件，不视为已有备份 |
| OpenAI ImageGen 生图 | 已授权 | 包含首轮钟馗五个 rendition 及终验 Hero desktop/mobile 手部定向返修；不上传馆藏参考图，工具条款与输出权利须记录 |
| ComfyUI、模型下载或 workflow | 未授权且本期不用 | 未来如接入须建立新版本和独立授权 |
| dev/preview 或浏览器自动化 | 未授权 | M3 默认不需要服务 |
| Git add/commit/push | 未授权 | 用户逐次决定 |
| 预览/生产发布 | 未授权且 M3 不适用 | 不执行 |

## 11. 发布与门禁

不适用。M3 只形成本地可验证资产管线和样例，不创建托管项目、预览 URL、域名或生产发布身份。

## 12. 实施完成记录

- M3-U1：文档交付、验证与用户确认完成。
- M3-U2：5 份馆藏 Source、5 份 verified Claim、钟馗 Entry 关系与一份当时为 `in-review` 的包级 brief 已完成；没有必要新增 Terminology。
- M3-U3：用户确认 brief 后将其记录为 approved；严格 Schema、两类 loader、关系/文件 validator、metadata registry、目录链 inventory、显式 current resolver 与正反测试已完成。
- M3-U4：用户已确认制作方式、存储与审核责任；Hero art-direction anchor、五个精确画布 master、五份 approved repository source、一份 production record 与四份 approved/current manifest 已完成。2026-08-29 Project owner 拒绝原 Hero mobile 跪拜/合掌姿态，定向修正后的非崇拜姿态与完整安全区通过终审；个人账户、发布授权、五项审核和 Entry Hero 外键均已闭合。
- M3-U5：新增非默认 `visual:build:check`、临时 Astro verification route 与 local master verifier；五个 master 实体通过。初次 `MissingSharp` 阻塞后，Project owner 单独授权直接依赖；`sharp@0.35.4`、唯一锁文件与显式 build-script 拒绝策略已落地，22 个响应式 AVIF/WebP 目标全部实际写出并解码复核，完整工程门禁通过。验证的 `outDir`、图片缓存与 Vite cache 位于受信任 `/.local/` 临时目录并在 `finally` 清理；Astro 固定在项目根维护的 ignored `.astro/` 构建元数据不作为验证输出或完成证据。
- M3 终验 Hero v2：Project owner 以双手解剖缺陷重开 M3；ImageGen 候选在 Git-ignored review 目录先行展示，desktop candidate 01 与 mobile candidate 02 获明确验收。新增两份 v2 master、两份 v2 source、一份 v2 manifest 与第二份 production record；v1 记录和文件完整保留，仅取消 current。最终七个 master、七份 source、两份 production record、五份 manifest 版本记录与唯一 Hero current 通过自动/人工门禁。
- 已修改：研究内容、approved `visual/briefs`、U3 自动合同、U4 Git-ignored 本地生产边界、两份真实 production record、七份 approved source rendition、五份 manifest 版本记录、钟馗 Entry Hero 外键、U5 非默认构建验证入口、精确 Sharp 依赖与锁文件/供应链门禁。
- 未执行：服务、ComfyUI/模型下载、M4、Git 写入和发布。

## 13. M3 最终收口结论（2026-08-29）

- 需求状态：M3-U1/U2/U3/U4/U5 已确认并完成。
- 实施状态：钟馗 approved brief、七个版本化 production master、七份 approved repository source、两份 production record、五份 manifest 记录、publication rights、五项人工审核、Hero v2 唯一 current、Entry Hero 外键、直接 `sharp@0.35.4` 依赖和 U5 非默认验证入口均已闭合；Hero v1 审计历史完整保留。
- 验证状态：2026-08-29 固定运行时完整 `pnpm run check` 通过，含 Prettier、ESLint、10 个测试文件/72 项测试、Astro 36 个文件 0 error/0 warning/0 hint 与 3 页 build；七个 local master 通过实体复核，三份 current responsive rendition 的 22 个 AVIF/WebP 目标全部实际生成并解码复核。
- 发布状态：不适用。
- 是否可以关闭 M3：是。
- M3 收口时的下一项允许动作：没有自动延续动作；当时的 M4、服务、Git 写入和发布均未授权，必须由 Project owner 另行决定。该历史边界不覆盖后续已取得的逐项授权。
