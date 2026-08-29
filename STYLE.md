# STYLE.md

## 职责

本文件保存跨需求稳定的工程、内容和命名风格。视觉 token 与页面设计放在 `docs/DESIGN.md`；架构事故边界放在 `PROJECT_RULES.md`；可执行命令放在 `DEV_WORKFLOW.md`。

## 语言与文本

1. TypeScript、组件和配置标识符使用英语。
2. 代码注释使用简洁英语；仅在非显然的业务约束、失败关闭门禁、版本或状态切换、跨模块边界等关键位置解释 why 与适用边界，不逐行复述实现，也不用注释替代清晰命名和结构。仅当规则来源需要向中文维护者解释时使用中文。
3. 公开界面、导航、SEO 文本和正文默认使用自然英语。
4. 中国专名首次出现采用“常用英文名（简体中文，拼音）”；后续使用已声明的主名称。
5. 工程与产品文档可使用中文；示例中的公开文案保持英语。
6. 文本文件统一使用 UTF-8，换行符由项目格式化工具在初始化后统一。
7. `myth`、`folklore`、`religion`、`literature` 与 `historical-legend` 不得混作同义词。

## 命名

8. 文件与 URL slug 使用小写 kebab-case；稳定内容 ID 一经发布不因栏目或标题变化而改变。
9. Astro/前端组件使用 PascalCase，函数和变量使用 camelCase，常量使用 SCREAMING_SNAKE_CASE。
10. 布尔值使用 `is`、`has`、`can`、`should` 前缀；时间使用 `At` 或 `Date` 后缀；尺寸和数量写明单位，例如 `widthPx`、`readingTimeMinutes`。
11. 视觉资产采用稳定逻辑 ID 与显式版本：逻辑 ID 为 `asset-{owner-id}-{role}-{slot-id}`，包级 brief ID 为 `brief-{owner-id}-{purpose}-v{version}`，manifest 文件为 `{asset-id}-v{version}.yml`，仓库内 source rendition 文件为 `{owner-id}-{role}-{slot-id}-v{version}-{usage}-{width}w.{ext}`，例如 `brief-zhong-kui-visual-package-v1` 与 `zhong-kui-hero-primary-v1-hero-mobile-1600w.avif`。不得使用 `final`、`latest` 或省略版本/用途的文件名代替 current 选择；Astro 在 `dist/` 生成的哈希响应式文件不是长期命名合同。
12. 禁止使用无职责语义的长期文件名：`utils.ts`、`helpers.ts`、`data.ts`、`misc.ts`、`new-*`、`final-*`、`latest-*`。共享能力必须按领域命名。
13. 新文件名表达稳定业务对象或技术职责，不使用日期和对话轮次作为长期身份。

## 内容写作

14. 在读者呈现层，每篇文章先讲故事，再解释来源；内部编辑仍先完成 claim/source 与术语核查。开场不能伪造原文引语或未有出处的历史场景。
15. 快速回答与正文必须区分“原典明确记载”“后世传统”“常见改编”和“本站艺术演绎”。
16. 历史人物传说化页面固定区分 `What history records`、`What later legends added` 与 `How the figure became sacred or supernatural`。
17. 不用 `ancient Chinese believed` 之类泛化句式代替时间、地域、文本或群体边界。
18. 外部译文和引语遵循合理引用与来源标注，不复制长段受版权保护文本。
19. 信息性图片的 caption 说明画面是什么、哪些属于艺术演绎以及来源或生成披露，alt 描述用户需要获得的信息且不堆关键词；纯装饰背景使用空 alt，并通过页面级 visual note 提供适用的 credit 与披露。

## 代码组织

20. 内容数据、渲染组件、外部服务适配和样式 token 保持职责分离。
21. 页面负责组合，组件负责可复用呈现，内容集合负责数据，adapter 负责第三方边界；页面不得直接散落第三方 endpoint 和密钥。
22. 优先使用 Astro 组件和静态 HTML；只有确需客户端状态时才引入局部岛屿组件。
23. MDX 仅用于 Markdown 无法清晰表达的受控组件，不允许文章任意执行脚本或引入依赖。
24. 导入使用项目根别名或同模块相对路径；禁止跨多个目录层级的脆弱深层导入。
25. 不使用可变全局状态保存内容、请求或用户数据；构建期数据转换保持确定性。
26. 不为未来可能的 CMS、会员或数据库提前创建空 adapter、feature flag 或兼容层。

## 数据与错误处理

27. 日期使用 ISO 8601；公开日期明确是出版、更新还是访问日期。
28. 缺失来源、失效关联 ID、未知图片授权或缺少 alt 属于构建/发布阻塞错误，不使用空字符串或默认值静默绕过。
29. 外部服务失败必须保留可定位上下文，但日志不得包含完整邮箱、表单正文、密钥或追踪参数。
30. 内容 Schema 的枚举和值域以 `docs/CONTENT_MODEL.md` 为准，不在不同层创建同义别名。

## 测试

31. 测试文件使用与目标模块相同的业务名称；测试名描述可观察行为，不描述实现细节或工单编号。
32. 内容校验至少覆盖稳定 ID 唯一、slug 唯一、引用存在、关系 ID 存在、图片 manifest 完整、已发布内容无草稿引用。
33. 页面行为至少覆盖键盘导航、移动布局、无 JavaScript 核心阅读、`prefers-reduced-motion` 和无障碍名称。
34. 自动化测试隔离真实网络、邮箱、分析、支付和表单服务；真实联调单独授权并标识。
35. 不通过放宽断言、删除用例、无条件 skip 或隐藏 fallback 让改动通过。

## 提交信息

36. Commit message 采用 Conventional Commits：`type(scope): observable result`。
37. 允许的主要类型：`feat`、`fix`、`content`、`design`、`docs`、`test`、`refactor`、`build`、`chore`。
38. 提交说明使用英语，一次提交只包含同一可验证交付单元，不混入用户既有修改。
