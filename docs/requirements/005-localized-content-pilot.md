# 005 — 本地化内容试点

## 0. 状态

| 项目 | 当前结论 |
| --- | --- |
| 需求状态 | Project owner 于 2026-08-31 确认目标结构与试点边界 |
| 实施状态 | 未开始 |
| 验证状态 | 未执行本地化实现验收 |
| 发布状态 | 没有中文页面、中文路由或中文发布 |

当前站点仍是英语单语 review 构建：页面使用英语内容与 `lang="en"`，内容 Schema、发布投影、路由、导航和 SEO 尚不识别 locale。本文件只记录后续目标合同，不把目标写成当前实现，也不授权开发、服务操作、版本控制写入或发布。

## 1. 目标与不做

目标是在后续单独授权的实施批次中，以三个相互关联的页面验证简体中文内容生产、审核、导航与静态发布边界，同时保持英语 MVP 的交付判断独立。

本试点不做：

- 不要求全站中英文同步发布，也不把中文缺失作为英语 MVP、预览或生产发布的阻塞条件。
- 不在本轮修改代码、内容 Schema、路由、页面、字体、依赖、构建配置或测试。
- 不默认制作中英文并排的全文对照页。
- 不根据浏览器语言、IP、地理位置、Cookie 或历史选择自动重定向。
- 不以英语正文或机器翻译静默填充缺失的中文版本。
- 不为空的繁体中文路径、切换项、metadata 或 `hreflang` 制造占位内容。
- 不预建简中试点之外的完整中文站、会员、评论、CMS 或数据库能力。

## 2. 已确认的 URL 与语言结构

| Locale | 目标 URL 结构 | 当前状态 |
| --- | --- | --- |
| English | `/` 及现有英语路径 | 当前默认且唯一已实现的站点语言；不增加 `/en/` 前缀 |
| 简体中文 | `/zh-hans/` 及其下属本地化路径 | 后续三页试点目标；当前不生成 |
| 繁体中文 | `/zh-hant/` 及其下属本地化路径 | 只预留命名约定；没有获批内容时不生成 |

URL locale 段使用小写 `/zh-hans/` 与 `/zh-hant/`；未来页面的 HTML language tag 分别使用标准大小写 `zh-Hans` 与 `zh-Hant`。路径命名不等于已经决定 localized slug、目录存储或 Astro i18n 配置。

## 3. 试点范围与启动顺序

试点只包含下列三个现有逻辑对象的简体中文版本：

1. Collection：`chinese-underworld`（The Chinese Underworld）。
2. Entry：`zhong-kui`（Zhong Kui, the Demon Queller）。
3. Entry：`chinese-underworld-guide`（A Guide to the Chinese Underworld）。

启动条件与边界：

- 本地化实施必须由 Project owner 单独授权；与英语里程碑的具体排序留待该批次确认，不在本合同中设置硬前置。
- 试点不自动包含 Home、Explore、Collections index、About、newsletter、Reader Request 或其他 Entry。
- 三个逻辑对象可以分批完成；某个对象在目标 review 或 public 输出中没有符合该环境门禁的简中 counterpart 时，不生成该输出中的中文路由，也不展示指向该版本的语言切换。
- 试点完成不自动授权全站简中扩展、繁中版本、远端预览或生产发布。

## 4. 身份、内容与审核边界

不同 locale 共享同一文化对象与证据身份，但不共享未经审核的公开文案或发布状态。

### 共享身份

- Entry、Collection、Claim、Source 与逻辑 Asset 保持稳定 ID，避免把翻译版本误建成互不关联的新事实对象。
- Claim 与 Source 的证据关系、Asset 的来源与生产追溯、权利记录和不可变源文件身份可以跨 locale 复用。
- 同一张图片可以复用像素与 provenance；这不自动批准另一 locale 的替代文本、说明文字、披露或语言审核。

### 独立内容与审核

- 页面标题、摘要、正文、导航与界面文案、SEO 文案、替代文本、说明文字、披露和术语表达按 locale 独立编写与审核。
- 每个 locale 独立判断内容完整性、事实/来源映射、术语、语言质量、无障碍文案和可发布状态；一个 locale 的 `ready` 或 `published` 不得提升另一个 locale。
- 机器翻译或生成式模型输出只能作为内部草稿；公开前必须记录人工事实、术语、语言和页面语境审核。具体审核角色、记录字段与签字流程留待实施需求确认。
- 缺失或未通过审核的本地化字段必须导致该 locale 版本省略或失败关闭，不得回退显示另一种语言。

现有 `Entry.nameZh`、`Collection.titleZh`、`pinyin`、`Source.titleZh`、`Source.titleZhLang`、英语 Claim/TerminologyRecord 以及单一内容状态都不等同于中文页面版本，也不得被当作 locale 或 fallback 开关。未来数据存储形状与逐 locale 状态字段尚未决定。

## 5. 体验、路由与 SEO 目标

- 每个公开页面保持清楚的单一主要语言；默认体验不是中英文全文并排。若未来需要对照阅读，应另立需求并验证移动端、无障碍与内容维护成本。
- 在同一输出环境中真实存在且通过该环境门禁的 counterpart 之间使用普通可访问链接切换；切换不依赖客户端 JavaScript。没有符合条件的 counterpart 时省略对应入口，不展示失效、禁用或回退链接。
- 未来简中页面使用显式静态 URL；不得通过浏览器语言、IP、Cookie 或地理位置强制改写访问者请求。是否提供非强制的语言偏好记忆留待后续决定。
- 未来每个可索引 locale 页面使用自身 URL 作为 canonical；只有真实存在、内容完整且允许索引的 counterpart 才建立相互对应的 `hreflang`。
- 预留但未生成的 `/zh-hant/` 不得进入 canonical、`hreflang`、Sitemap、RSS 或导航。
- `x-default`、Sitemap/RSS 的 locale 组织方式、localized slug、切换器精确位置与文案、全站 locale 导航范围均留待实施需求确认。

当前 review 构建继续维持英语页面与 `noindex, nofollow`；本文件不要求在尚未存在的中文页面上提前输出 canonical 或 `hreflang`。

## 6. 实施前必须确认的决定

后续开发开始前，需求批次必须明确：

1. 本地化内容是独立文件、locale 目录还是结构化字段，以及稳定 ID 如何映射。
2. localized slug、尾斜杠和 counterpart URL 的生成规则。
3. 每个 locale 的 draft、review、`ready` 与 `published` 状态及失败关闭规则。
4. 简中试点需要补齐哪些全局页面、共享 UI 文案与错误/空状态，才能形成不误导的导航闭环。
5. canonical、reciprocal `hreflang`、`x-default`、Sitemap、RSS、Open Graph 与 JSON-LD 的逐页面合同。
6. 语言切换器的位置、名称、键盘顺序、当前语言表达及是否记忆非强制偏好。
7. CJK 字体、字符覆盖、换行/标点、字重、字体加载和跨平台 fallback 门禁。
8. 人工翻译、事实校对、术语校对、编辑审核和发布签字的责任人与证据格式。

不得用默认值、静默 fallback 或空壳路由跳过上述业务决定。

## 7. 后续实施的验收边界

以下是未来实施批次必须转化为测试与人工检查的目标，不表示本轮已经执行：

- 路由 inventory 只包含获批 locale 页面，没有空页面、英语正文伪装的中文页或预留繁中页。
- URL、HTML `lang`、页面文案、导航当前态和 metadata 的 locale 一致。
- counterpart 缺失或未通过当前输出环境的对应门禁时，该环境的语言切换、投影和 SEO alternate 均失败关闭；review 与 public 不互相借用资格。
- 同一逻辑对象跨 locale 维持稳定身份和证据关系，同时内容状态与文案审核互不提升。
- 可索引页面的 self-canonical 与 reciprocal `hreflang` 只覆盖真实对应版本；Sitemap/RSS 和结构化数据符合届时确认的合同。
- 语言切换在禁用 JavaScript、键盘操作、屏幕阅读顺序、200% 缩放和移动视口下仍可用。
- 简中页面通过 CJK 字符覆盖、字体 fallback、换行、标点、长标题、图片失败与性能检查。
- 每个公开简中页面都有可追溯的人工事实、术语、语言、无障碍文案与发布审核记录。
- 根治理、产品、设计、架构、内容模型、运行命令、匹配测试与稳定运行摘要同步更新。

## 8. 授权停点与关联文档

本轮授权只允许记录上述产品与架构目标，到此停在文档合同。任何代码、内容、Schema、字体、依赖、服务、Git 写操作、远端预览或发布都需要后续单独授权。

关联文档：

- [`PRODUCT.md`](../PRODUCT.md)：产品范围、路线与英语 MVP 边界。
- [`DESIGN.md`](../DESIGN.md)：导航、单页语言和切换体验目标。
- [`ARCHITECTURE.md`](../ARCHITECTURE.md)：静态路由、发布图与 SEO 架构边界。
- [`CONTENT_MODEL.md`](../CONTENT_MODEL.md)：共享身份、locale 文案与独立审核语义。
- [`REFERENCES.md`](../REFERENCES.md#multilingual-urls-and-routing)：官方 URL 与路由资料用途。
