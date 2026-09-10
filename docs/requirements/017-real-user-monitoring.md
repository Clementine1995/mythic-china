# 017 真实访问性能监测：开发与验收说明

## 0. 职责与状态

版本检查点（2026-09-10）：owner 已明确授权将本地 RUM 与技术验收/GoatCounter 准备提交一次，具体执行和身份核对见 [DEV_WORKFLOW](../../DEV_WORKFLOW.md#分析与技术验收本地检查点2026-09-10)。此后 Git 提交不改变本文实施时的诊断范围或发布状态；RUM 仍为 null 配置，没有真实账户、数据库或采集。

本文负责 006 第 5.5 节 RUM 的本地实现及后续接通条件，不负责其他三地区浏览器、真机、读者研究或发布验收。

| 维度 | 当前状态 | 依据 |
| --- | --- | --- |
| 需求 | 已确认本地实施 | 2026-09-10 owner 要求实施 RUM，随后明确尚无 Cloudflare 账户，先完成本地实现 |
| 实施 | 本地代码完成 | web-vitals 客户端、独立 Worker/D1 与隔离测试；真实配置后置 |
| 验证 | 本地自动化通过 | 41 文件/690 测试、Astro 128 文件零诊断、public → review 构建与输出门禁 |
| 发布 | 未发布 | 无账户、真实 endpoint、数据库或生产采集 |

基线为 `29b3d953588d5f9dcb7b37d426a99a8760f22310` 加既有技术验收文档与 Entry Hero sizes 未提交修改；这些改动保留。线上身份仍以发布回执为准，本地实施不改写旧证据。

## 1. 目标、范围与授权

本地开发就绪：是。实现 Google web-vitals 的 LCP、INP、CLS 采集、严格接收、乱序去重、固定窗口 p75、保留清理和失败关闭。新增精确锁定的 `web-vitals@6.2.1` 是本次实现的唯一运行依赖；库不加载远程脚本、不自行上传数据。Cloudflare 是未来接收处理方，网络层仍可能处理 IP 与请求头，应用代码不保存这些信息。

不增加页面/设备分析、用户画像、Cookie、浏览器存储、通用后端、仪表盘、账号或通知。Worker 与 D1 仅用于性能测量，正文继续静态。当前授权只用于本地源代码、依赖锁定、默认关闭配置和离线验证；不创建 Cloudflare 资源、接受条款、真实写库、启动服务、提交、推送或部署。

退出策略为关闭客户端构建接线和接收开关，验证零请求，再按精确授权删除活动测量及核对供应商恢复/备份处理。没有账户时不编造 endpoint、数据库 ID 或发布配置。

## 2. 数据与统计合同

- 每次请求只含 `name`（LCP/INP/CLS）、有限非负 `value`、随机 UUIDv4 `measurementId` 和正整数 `sequence`；最大请求体 512 bytes，拒绝额外字段。LCP/INP 单位为 ms，CLS 为分值。不发送库原始 ID（含时间信息）、navigationId、entries、URL、referrer 或 attribution。
- 同一库指标实例只在内存映射到一个随机 ID；重复数值不重复发送，新回调增加序号。BFCache 新实例得到新随机 ID。服务端只接受更高序号，允许数值降低；不把缺失 INP/浏览器不支持变成零。
- 客户端仅在已配置的 public 构建、真实正式 origin、已发布路径、固定采集日期内运行。`navigator.webdriver`、DNT/GPC、含 `rum=off` 的查询或片段均禁发；维护/自动化先使用此禁发入口。后续加载与每次发送重新检查。不能把 CORS/webdriver 当作真人身份验证。
- 样本为指标实例，不是独立读者。窗口预先选为 UTC 00:00 开始的连续 14 个完整自然日；仅在 `[start, end)` 接收，以首次接收归窗。截止后拒绝更新，SQL 写入也重查窗口是否已封存，防止跨截止的在途请求倒改结果。
- 每指标去重 `n >= 50` 才给出 nearest-rank p75（排序第 `ceil(0.75*n)` 项），不足返回明确缺样和 null，绝不补零。每个窗口封存一次，后续只读同一聚合快照。
- 每小时维护：清理按首次接收已满 30 天的活动数据（准时执行时延迟最多约一小时）；冻结到期窗口。维护间隔超过 2 小时、维护时发现窗内接收开关关闭、已知数据库失败将窗口标为不完整；窗口不能因此报告通过。首次数据库查询失败可能无法写入失效标记，两次维护间短暂停用也可能无自动留痕；这些情况、平台未执行请求和未知机器人均需实际平台错误/维护记录核查。因此有足够样本的本地计算结果仍标记“需要运行复核”，不自动宣布 Beta 达标。
- HTTP 204 只表示请求已处理；重复、乱序或数据库截止排除不产生新样本。`n` 仅取数据库去重统计，不能从发送次数或 204 次数推算。
- Worker 不输出原始正文、请求头或异常细节；关闭持久日志/invocation logs、禁用 Tail/Logpush 是未来部署硬条件。活动清理不等于供应商即时物理删除；D1 Free Time Travel 另有恢复期限，实际账户需复核。

## 3. 实现边界与顺序

1. `src/rum/contract.ts`、`configuration.ts`、`collector.ts`、`bootstrap.ts`、`web-vitals.ts`：字段、默认关闭配置、环境门禁、唯一发送及延迟自托管库加载。`astro.config.mjs` 与 `SiteLayout.astro` 仅在配置非空的 public 构建接线。当前 off 不增加 JS/预加载或 RUM meta。
2. `workers/rum/schema.sql`、`store.ts`、`worker.ts`：独立 D1 最小表、条件 upsert、SQL 聚合、冻结与清理；仅 POST `/vitals`，无公开数据/管理写接口。开窗由受信任运维调用，不能由访客触发。
3. `tests/rum/`：注入 Fake callbacks/fetch，使用 Node 内存 SQLite 执行真实 SQL，零网络/无持久数据库；补窄架构允许项。当前输出 verifier 保持拒绝未审 RUM bundle，不能改配置绕过发布门禁。
4. README、ARCHITECTURE、006/011、DEV_WORKFLOW 与 Privacy 同步本地实现、未启用和真实联调停点；源内容、图片、字体及其追溯不变。

## 4. 验证与完成标准

定向验证默认 off/review/preview/未知路径/维护/自动化/偏好禁发；严格字段/大体积/失败；重复和乱序、BFCache ID 重置；14 天和截止竞争；49/50 样本、p75、缺样、快照不可变、清理和维护中断。完整 check 与 public → review 构建须通过，off public 库存保持唯一既有 analytics 脚本且其摘要不变。命令只见 DEV_WORKFLOW。

本地实现完成不等于启用或取得 RUM 数据。后续需实际账户 Free 计划、DPA/处理地区/必要 consent、最小网络传输、维护禁发/退出清理、Worker 运行兼容与 quota 拒绝证据；再冻结真实日期、endpoint、public bundle 白名单及启用 Privacy，经具体发布授权接通。当前没有可部署身份或真实采样窗口。

## 5. 外部依据

2026-09-10 核对：[Google web-vitals v6.2.1](https://github.com/GoogleChrome/web-vitals/releases/tag/v6.2.1)、[库接口及生命周期](https://github.com/GoogleChrome/web-vitals)、[D1 prepare/batch 事务](https://developers.cloudflare.com/d1/worker-api/d1-database/)、[Cron](https://developers.cloudflare.com/workers/configuration/cron-triggers/)。价格、隐私和退出依据继续见 006 第 5.5.1 节；它们不证明实际账户已配置。

## 6. 实施记录

2026-09-10 本地实现完成。新增 35 项 RUM 测试覆盖字段裁剪、默认关闭/preview/自动化/维护/隐私偏好、单次初始化、重复/乱序/BFCache、传输/观察器异常、49/50/51/100 样本、缺失指标、SQL 截止竞争、封存、30 天删除和维护回滚。独立只读审查发现观察器部分注册失败后仍可能发送，已将失败锁扩至初始化全程，并补回归；另补 429 后停止发送测试。最终完整 check 41 文件/690 项通过，Astro 128 文件零 error/warning/hint。

显式 origin 的 public 构建与返回 review 构建均通过。public 仍为 13 HTML、2 XML、robots、112 Hero、10 字体、原唯一 `page.Di-gmpYO.js`，合计 140 文件；原脚本 SHA256 和 VM 离线执行验证通过，未产生 RUM meta/入口/chunk。与原冻结上传包逐文件比较，仅六篇 Entry 的既有 sizes 修改及本批 Privacy 不同，其余 133 文件字节相同；review 14 页仍零客户端 JS。

内容/资产配套：未改文化内容、引用、manifest、图片、字体、alt/图注/AI 披露；本批公开披露只新增 RUM 未启用计划。构建诊断通过，关键注释只解释延迟加载、失败关闭、随机实例、数据库截止及封存先于清理；匹配测试已通过。不适用视觉资产生产，未运行服务/浏览器或真实 Worker，未验收浏览器实际 Web Vitals 事件、Cloudflare runtime/配额/网络与条款；本地 SQLite/Fake 不替代这些证据。

依赖只新增 web-vitals 6.2.1，无传递依赖或其他包升级，registry integrity 与锁文件一致，未运行安装脚本。原技术验收文档与 Hero sizes 修改保留。源码与文档未暂存、提交、推送或发布；无 Cloudflare 账户/资源/调度和真实测量数据。

文档收尾通过 38 份 Markdown 严格 UTF-8、100 个相对链接、当前修改范围占位符/旧状态检查与 diff 空白检查；链接检查排除 fenced/inline code，不把 PowerShell 类型转换当链接。暂存区为空。

本地实施单元可关闭；线上 RUM 与 Beta 验收保持开放。下一项是账户准备后核对 Free 计划与处理条件，实例化接收端、D1、日志/调度/开窗/退出入口，完成受控真实联调，再准备精确启用制品和逐次发布。无需为了继续其他本地工作先注册账户。
