# Lora 的 Vibe Coding 学习计划 V2.0
## 整合版：循序渐进的判别力建设 + 项目导向的执行结构

---

**起始日期**：2026-04-27（星期一）
**预估周期**：14 周，至 2026-08-07（星期五）
**学习节奏**：每周 4 天学习（周一至周四），周五复盘 + 缓冲，周末休息或处理公众号
**每天投入**：4-6 小时
**最终目标**：构建一款 Windows 优先、未来可迁移 macOS 的桌面阅读器 MVP，能完成「阅读 → 摘录 → AI 提问 → 块笔记整理 → 导出 Markdown 到 Obsidian」的完整工作流
**核心原则**：你是决策者，AI 是执行者。永远先理解「为什么」，再让 AI 写「怎么做」

---

## 0. 计划设计逻辑（先读这一节）

### 与原计划的关键差异

你提供的 12 周计划是个非常扎实的执行框架，但有两个调整必须做：

1. **跳过 Python**：Python 与 JavaScript 是两套独立语言。你的阅读器全程只需 JavaScript（前端 + Electron + Node 服务都是它）。先学 Python 等于学一门用不上的语言，浪费 3 周。原计划第 2-4 周的「Python 编程思维 + Obsidian 自动化」改为「JavaScript 直接入门 + 网页版阅读器原型」——同样能建立编程思维，且每一步都直接服务于阅读器项目。
2. **前置「判别能力建设」**：你最大的痛点是「看不懂 AI 给的东西」。原计划第 1 周直接进入 Git 和产品说明，跳过了基础认知建设。新计划第 1 周拆分为「Git 安全网 + 读代码训练 + AI 协作规则」三件事并行——既保留原计划的执行强度，又补上你需要的判别力地基。

### 为什么是 14 周

每周 16-24 小时 × 14 周 ≈ 220-340 小时。这是零基础学完前端基础 + 构建一个完整桌面应用 MVP 所需的合理时间。比原计划多 2 周作为现实缓冲——你会生病、有外出、有公众号截稿压力，留出 2 周不会让计划崩盘。

### 关于两岸网络环境

- **大陆期间**：主用 Cursor + DeepSeek/Gemini API。所有需要梯子的资源用 ⚠️ 标注
- **台湾期间**：可使用 Claude Code 全部资源。建议把这段时间用于阶段总结、复盘、或处理积累的复杂任务
- 计划中的具体日期假设你大部分时间在大陆。如果某周计划在台湾，可以把那周的高难度任务前置到台湾期间

### 一个重要心态提醒

这个计划写得很密。**它是地图，不是奖状**。
- 某周完不成就完不成，把当周未完成项滚到下周缓冲日处理
- 跑偏了不要废掉整个计划，调整路线即可
- 真正的失败只有一种：因为没按计划走就放弃整个计划

---

## 1. 项目边界（MVP 定义）

### V1.0 必须实现（14 周内完成）

- [ ] 桌面应用能在 Windows 上启动
- [ ] 能并排打开微信读书网页（嵌入或并列窗口均可）
- [ ] 能手动复制阅读中的文字，向 AI 提问
- [ ] AI 回答能保存到对应书籍的项目中
- [ ] 摘录、问题、AI 回答、自己的理解能进入「块编辑器」
- [ ] 块编辑器支持折叠和拖动排序
- [ ] 一本书读完后能整理所有块，导出为 Markdown
- [ ] 导出的 Markdown 由你人工检查后放入 Obsidian 归档

### V1.0 暂不追求（防止 scope creep）

- 自动抓取微信读书正文或划线
- PDF / EPUB / MOBI 阅读
- 与 Obsidian 双向同步
- 多人协作
- 商业级打包发布
- macOS 版本（Windows 验证后再做）
- 用户登录、云同步

### V1.0 之后再考虑（仅记录，不要现在做）

TypeScript 改造、自动化测试、SQLite、PDF/EPUB 解析、二维白板、Obsidian 插件、云同步、macOS 打包

---

## 2. 学习路径总览

```
Week 1（判别力 + Git）
   ↓
Week 2-3（HTML + CSS 基础 + 静态阅读器界面）
   ↓
Week 4-6（JavaScript 核心 + 纯JS阅读器原型）
   ↓
Week 7-8（React + Vite 重构 + 组件化）
   ↓
Week 9（块编辑器 + 折叠 + 拖动排序）
   ↓
Week 10（AI API 接入：Gemini + DeepSeek）
   ↓
Week 11（Electron 封装 + 微信读书嵌入）
   ↓
Week 12（写作工作台 + Obsidian Markdown 导出）
   ↓
Week 13（打包、测试、文档）
   ↓
Week 14（缓冲、总复盘、下一阶段路线）
```

---

## 3. 工作方法（每天固定执行）

### 3.1 每日学习日的标准流程（4-6 小时）

| 时长 | 内容 |
|------|------|
| 10 分钟 | 打开本计划，确认今日任务 |
| 60-90 分钟 | 阅读资料 / 看视频 |
| 120-180 分钟 | 跟 Cursor 做项目练习 |
| 30 分钟 | 用自己的话解释今天写的代码（写在学习日志里） |
| 15 分钟 | `git status` 检查变化 |
| 15 分钟 | 提交一次 Git 版本 |
| 10 分钟 | 记录今天遇到的报错、解决方式、仍不懂的问题 |

### 3.2 Cursor 提示词模板（请收藏）

每次让 Cursor 做新事情前，先发这段：

```
我是编程初学者，正在学习中。请按以下规则配合：

1. 先分析需求，告诉我你打算怎么做、修改哪些文件、每个文件的作用
2. 等我确认方向后，再开始写代码
3. 一次只做一个最小可运行版本，不要一次做太多
4. 完成后告诉我如何测试这个功能
5. 测试通过后，用初学者能理解的方式解释代码逻辑
6. 涉及任何 API Key、密码、个人文件路径时，必须先提醒我

现在的任务是：[此处描述具体任务]
```

### 3.3 出问题时的排查框架

```
Cursor，我的[功能名]出了问题，症状是：[描述你看到的现象]。

请按以下顺序帮我：
1. 不要直接改代码
2. 先告诉我最可能是哪个文件、哪一段出了问题
3. 解释你的判断依据
4. 列出 2-3 个可能的修复方案，分析利弊
5. 等我决定方案后再修改
```

### 3.4 AI 协作核心规则（贴在 Obsidian 显眼处）

1. **先计划，再修改**：不接受「直接帮我搞定」的回应
2. **小步迭代**：每次只解决一个问题，不要批量改
3. **每改必解释**：AI 必须用人话告诉你它改了什么
4. **可回滚**：每次改动前 `git commit`，搞砸了能回去
5. **你是决策者**：AI 给选项，你做选择

---

## 4. 资料索引（按使用顺序排列）

### Git / GitHub
- [Git for Windows 下载](https://git-scm.com/download/win)
- [廖雪峰 Git 教程](https://liaoxuefeng.com/books/git/introduction/index.html)（中文，无需梯子）
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)（权威参考书，免费）
- ⚠️ [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github)（大陆需梯子）
- ⚠️ [GitHub Docs 中文](https://docs.github.com/zh/get-started)

### Cursor
- [Cursor 官方文档](https://docs.cursor.com/)
- [Cursor: Working with Context](https://docs.cursor.com/en/guides/working-with-context)
- [Cursor: Working with Documentation](https://docs.cursor.com/en/guides/advanced/working-with-documentation)

### Web / 前端基础
- [MDN Web 入门](https://developer.mozilla.org/zh-CN/docs/Learn_web_development)（中文，无需梯子，权威）
- [MDN HTML 入门](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML)
- [MDN CSS 入门](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
- [MDN JavaScript 入门](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps)
- [尚硅谷 HTML/CSS 视频](https://www.bilibili.com/video/BV1XJ411X7Ud/)（B站，无需梯子）

### React / Vite / Electron
- [Node.js 下载](https://nodejs.org/en/download)
- [Vite 官方文档](https://vite.dev/guide/)
- [React 中文官方文档](https://zh-hans.react.dev/learn)
- [Electron 官网](https://www.electronjs.org/)
- [Electron Building your First App](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app)
- [Electron Web Embeds](https://www.electronjs.org/docs/latest/tutorial/web-embeds)
- [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)
- [Electron Packaging](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)
- [Electron Forge](https://www.electronforge.io/)

### AI API
- ⚠️ [Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart)（需梯子）
- ⚠️ [Gemini Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [DeepSeek API 文档](https://api-docs.deepseek.com/api/create-chat-completion)（无需梯子）
- ⚠️ [Anthropic Prompt engineering](https://docs.anthropic.com/en/docs/prompt-engineering)（建议台湾期间阅读）

### 编辑器、拖动、存储、Markdown
- [Tiptap React](https://tiptap.dev/docs/editor/getting-started/install/react)
- [dnd-kit Sortable](https://docs.dndkit.com/presets/sortable)
- [Dexie.js Documentation](https://dexie.org/docs)
- [Vite 环境变量](https://vite.dev/guide/env-and-mode)
- [Express Hello World 中文](https://expressjs.com/zh-cn/starter/hello-world.html)
- [Obsidian Markdown 语法](https://help.obsidian.md/syntax)
- [Obsidian Import Markdown](https://help.obsidian.md/import/markdown)

---

## 5. Week 1（4/27-5/1）：判别力 + Git + 产品说明

**核心目标**：建立 Git 安全网、AI 协作规则、阅读代码的基本能力、阅读器 MVP 产品说明

> 这一周与原 12 周计划差异最大。原计划直接从 Git 跳到产品说明，跳过了「读代码训练」。新计划把「逐行追问 AI 解释代码」作为前置训练，让你后面看到 AI 生成的东西不会再像看天书。

### 4/27 星期一：Git 入门 + 项目初始化

**学习时段 1（90 分钟）**：理解 Git 是什么
- 资料：[廖雪峰 Git 教程：简介](https://liaoxuefeng.com/books/git/introduction/index.html) + [Git 是什么](https://liaoxuefeng.com/books/git/what-is-git/index.html)
- ⚠️ 大陆可访问的备选：跳过 GitHub 部分，先专注本地 Git

**操作时段（120-180 分钟）**：
- [x] 下载安装 [Git for Windows](https://git-scm.com/download/win)
- [x] PowerShell 中运行 `git --version` 确认安装
- [x] 新建文件夹 `C:\Users\11461\Documents\onsidian-lab\`
- [x] 在 Cursor 中打开此文件夹
- [x] 用 Cursor 新建 `学习日志.md`，写下你的最终项目目标
- [x] 在终端运行：`git init` → `git add .` → `git commit -m "我的第一次提交"`
- [x] 让 Cursor 解释这三句话每一句在做什么

**复盘（30 分钟）**：
- 写 5 句话解释 Git 是什么、GitHub 是什么
- 提交今日所有内容到 Git

**安全提醒**：⚠️ 提交前永远要看 `git status`，确认没有把不该提交的文件（比如密钥）加进去。

---

### 4/28 星期二：Git 实操 + 测试 vault 建立

**学习时段（90 分钟）**：
- 资料：[Pro Git 中文版第 2 章](https://git-scm.com/book/zh/v2) 中「记录每次更新到仓库」和「查看提交历史」
- ⚠️ 有梯子的话：完成 [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github)

**操作时段（180 分钟）**：
- [x] 创建测试 Obsidian vault 副本（就是昨天创建的新文件夹 `C:\Users\11461\Documents\onsidian-lab\`）
- [x] **隐私安全**：⚠️ 复制 5-10 篇笔记进去，不要包含家人健康数据、未公开文章草稿等任何敏感内容
- [x] 在 Cursor 中打开 test-vault，让它生成一份「笔记结构报告」
- [x] 观察 Cursor 是怎么读你的文件的，记录在学习日志里
- [x] 练习 Git 命令：`git status`、`git add`、`git commit`、`git log`

**复盘（30 分钟）**：记录「我如何确认 AI 改了什么」

---

### 4/29 星期三：AI 协作规则 + 读代码训练

**学习时段（90 分钟）**：
- 资料：[Cursor: Working with Context](https://docs.cursor.com/en/guides/working-with-context)
- 资料：[Cursor: Working with Documentation](https://docs.cursor.com/en/guides/advanced/working-with-documentation)

**操作时段 1（90 分钟）**：写 AI 协作规则
- [x] 在 obsidian-lab 创建 `AI协作规则.md`
- [x] 把本计划第 3.2、3.3、3.4 节内容整理进去，加上你自己的补充
- [x] `git commit -m "建立AI协作规则"`

**操作时段 2（90 分钟）**：第一次「读代码」训练
- [x] 让 Cursor 生成一个简单的 HTML 页面（显示「Hello, Lora」+ 一个按钮）
- [x] **逐行**问它：
  - 这一行在做什么？
  - 如果删掉这一行，会怎么样？
  - 如果改一个字，会怎么样？
- [x] 目标：开始建立「代码每一行都有作用」的直觉

**复盘**：总结 3 个你以后会固定使用的提示词

---

### 4/30 星期四：产品说明书

**学习时段（60 分钟）**：
- ⚠️ 资料：[Anthropic Prompt engineering overview](https://docs.anthropic.com/en/docs/prompt-engineering)（如在台湾期间）
- 大陆备选：直接让 DeepSeek 教你「如何向 AI 准确描述需求」

**操作时段（180-240 分钟）**：写阅读器 MVP 产品说明
- [ ] 在 obsidian-lab 创建 `阅读器MVP产品说明.md`
- [ ] 必须包含以下章节：
  - **用户**：是谁在用这个工具
  - **输入**：这个工具会接收什么
  - **输出**：这个工具会产生什么
  - **核心流程**：用户从打开应用到关闭应用的完整路径
  - **第一版功能**：复用本计划第 1 节 V1.0 必须实现部分
  - **不做什么**：复用本计划第 1 节 V1.0 暂不追求部分
  - **验收标准**：怎么算「做完了」
- [ ] 让 Cursor 把产品说明改成更清晰的开发任务清单
- [ ] `git commit -m "完成阅读器MVP产品说明"`

**复盘**：写下「我为什么第一版不自动抓微信读书正文」

---

### 5/1 星期五：缓冲 + Week 1 复盘

- [ ] 整理本周所有 Git 命令，写成 `git-cheatsheet.md`
- [ ] 检查 `git log` 能否找到本周所有提交
- [ ] 整理 `阅读器MVP产品说明.md`，删掉不属于第一版的功能
- [ ] 补完前四天没完成的任务
- [ ] **写 Week 1 复盘**（用第 16 节模板）

**Week 1 验收**：
- [ ] Git 仓库正常运转，至少 10 次提交
- [ ] `AI协作规则.md` 已写好
- [ ] `阅读器MVP产品说明.md` 已写好
- [ ] 完成至少 1 次「逐行追问 AI 解释代码」练习
- [ ] 拥有独立 test-vault 用于实验

---

## 6. Week 2（5/4-5/8）：HTML + CSS 基础

**核心目标**：能看懂网页的三个核心文件（HTML 结构、CSS 样式、JS 行为），做出阅读器界面的静态草图

### 5/4 星期一：HTML 是什么

**学习时段（90 分钟）**：
- 资料：[MDN Web 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
- 视频补充：[尚硅谷 HTML/CSS](https://www.bilibili.com/video/BV1XJ411X7Ud/) 前 1-8 集

**操作时段**：
- [ ] 用 Cursor 创建 `book-card/index.html`
- [ ] 让 Cursor 帮你写一个显示一本书信息的页面（书名、作者、简介）
- [ ] 让 Cursor 解释每个 HTML 标签的作用
- [ ] **项目连接**：这个页面以后会变成阅读器里的「书籍卡片」
- [ ] `git commit`

---

### 5/5 星期二：CSS 让页面好看

**学习时段（60 分钟）**：
- 资料：MDN Web 入门「HTML 基础」+「CSS 基础」

**操作时段**：
- [ ] 创建 `book-card/style.css`
- [ ] 让 Cursor 把昨天的书籍卡片做出基本样式（背景色、字体、间距）
- [ ] 每改一处，让 Cursor 解释这一段 CSS 控制什么
- [ ] 自己尝试改 3 处样式，观察效果
- [ ] **不要追求漂亮，先追求结构清楚**
- [ ] `git commit`

---

### 5/6 星期三：三栏布局——阅读器的骨架

**学习时段（60 分钟）**：
- 资料：[MDN CSS 布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout)

**操作时段**：
- [ ] 新建 `reader-layout/index.html` + `reader-layout/style.css`
- [ ] 让 Cursor 帮你做一个三栏布局：
  - 左栏：书籍列表（占 20%）
  - 中栏：阅读区（占 50%）
  - 右栏：笔记/AI问答区（占 30%）
- [ ] 让 Cursor 解释 Flexbox 或 Grid 的工作原理
- [ ] **项目连接**：这就是阅读器的整体骨架
- [ ] `git commit`

---

### 5/7 星期四：JavaScript 入门——让页面动起来

**学习时段（90 分钟）**：
- 资料：[MDN JavaScript 入门](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps)

**操作时段**：
- [ ] 新建 `reader-layout/script.js`
- [ ] 让 Cursor 帮你做：点击按钮后，把输入框内容添加到笔记列表
- [ ] 重点学习：变量、数组、事件
- [ ] 让 Cursor 解释「事件」是什么
- [ ] **项目连接**：这就是未来「保存摘录/问题」的雏形
- [ ] `git commit`

---

### 5/8 星期五：复盘

- [ ] 写 `web-basic-notes.md`，用自己的话解释 HTML、CSS、JS 分别负责什么
- [ ] 让 Cursor 出 10 个前端基础问题，自己答
- [ ] 截图保存本周阅读器界面草图
- [ ] 缓冲：修复布局或按钮问题
- [ ] **写 Week 2 复盘**

**Week 2 验收**：
- [ ] 能看懂一个最小网页应用
- [ ] 拥有阅读器三栏布局静态草图
- [ ] 能解释 HTML、CSS、JS 三者的分工

---

## 7. Week 3（5/11-5/15）：JavaScript 数据结构 + 本地保存

**核心目标**：用纯 JavaScript 做出能保存数据的网页阅读器原型

### 5/11 星期一：变量、数组、对象——程序的数据

**学习时段**：
- 资料：[MDN JavaScript 入门](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps) 中变量、数组、字符串

**操作时段**：
- [ ] 设计阅读器数据结构：
  ```
  Book = { id, title, author, blocks: [] }
  Block = { id, type, content, createdAt }
  ```
- [ ] 用 JavaScript 数组写一份模拟数据：3 本书 + 每本书 5 个块
- [ ] 让 Cursor 检查字段是否适合后续导出 Markdown
- [ ] `git commit`

---

### 5/12 星期二：事件 + DOM 操作——让页面响应用户

**学习时段**：MDN JavaScript 中事件和 DOM 操作

**操作时段**：
- [ ] 给 Week 2 的网页加入按钮：「新增摘录块」「新增问题块」「新增 AI 回答块」
- [ ] 不同类型的块用不同样式
- [ ] 测试：点击按钮后，新块能显示在右栏
- [ ] `git commit`

---

### 5/13 星期三：localStorage——刷新后还在

**学习时段**：[Vite 环境变量](https://vite.dev/guide/env-and-mode)（重点看安全提示）

**操作时段**：
- [ ] 用 `localStorage` 保存笔记块
- [ ] 测试：刷新页面后还能看到之前输入的块
- [ ] **安全提醒**：⚠️ 记录「API Key 不能放入前端 bundle」——前端 localStorage 是公开的
- [ ] `git commit`

---

### 5/14 星期四：导出 Markdown

**学习时段**：[Obsidian Markdown 语法](https://help.obsidian.md/syntax)

**操作时段**：
- [ ] 写一个「导出 Markdown」按钮
- [ ] 把当前书籍的所有块导出为 Markdown 文本
- [ ] 复制导出内容到 Obsidian 测试 vault，确认格式可读
- [ ] `git commit`

---

### 5/15 星期五：复盘

- [ ] 写 `reader-web-prototype-review.md`
- [ ] 列出网页原型目前能做什么、不能做什么
- [ ] **写 Week 3 复盘**

**Week 3 验收**：
- [ ] 拥有一个可保存、可导出 Markdown 的纯 JS 网页阅读器雏形
- [ ] 理解「数据结构」「事件」「本地存储」三个概念

---

## 8. Week 4（5/18-5/22）：JavaScript 进阶 + 函数

**核心目标**：能用函数组织代码，让阅读器原型更易维护

### 5/18 星期一：函数——代码的复用单元

**操作时段**：
- [ ] 把 Week 3 的散乱代码用函数重构：
  - `createBlock(type, content)`
  - `saveToLocalStorage()`
  - `loadFromLocalStorage()`
  - `exportMarkdown(book)`
- [ ] 让 Cursor 解释「为什么要用函数」
- [ ] `git commit`

---

### 5/19 星期二：异步基础——为 AI 接入做准备

**学习时段**：MDN 中 Promise 和 async/await 章节
- 这是后续接入 AI API 必备的概念

**操作时段**：
- [ ] 让 Cursor 用一个比喻解释「同步」和「异步」
- [ ] 写一个简单的 `setTimeout` 练习，观察异步执行的顺序
- [ ] 写一个使用 `fetch` 调用免费公开 API（如天气 API）的示例
- [ ] `git commit`

---

### 5/20 星期三：错误处理

**操作时段**：
- [ ] 给阅读器原型加入错误处理（try/catch）
- [ ] 测试：localStorage 满了会发生什么？怎么提示用户？
- [ ] **理念建立**：「软件需要告诉用户哪里错了，而不是直接崩掉」
- [ ] `git commit`

---

### 5/21 星期四：模块化思维

**操作时段**：
- [ ] 让 Cursor 把 `script.js` 拆成多个模块（数据模块、UI 模块、导出模块）
- [ ] 用 ES Module 的 `import` / `export` 连接它们
- [ ] **概念建立**：这就是 React 组件化的前奏
- [ ] `git commit`

---

### 5/22 星期五：复盘 + 阶段性总结

- [ ] 写 Week 4 复盘
- [ ] **重要**：写 `phase1-summary.md`：
  - 我现在能独立写出什么样的代码
  - 我对 JavaScript 的理解
  - 阅读器原型现状（截图保存）

**Week 4 验收**：
- [ ] 能用函数组织代码
- [ ] 理解异步概念（async/await）
- [ ] 阅读器原型有 4-6 个独立函数模块

---

## 9. Week 5（5/25-5/29）：React + Vite 重构

**核心目标**：把纯 JS 阅读器升级成 React 项目

> **关键认知**：React 不是新东西，它是「用更好的方式组织 HTML + CSS + JavaScript」。你前 4 周学的所有概念，在 React 里都还在。

### 5/25 星期一：Node.js + Vite 环境搭建

**学习时段**：
- [Node.js 下载](https://nodejs.org/en/download)（安装 LTS 版本）
- [Vite Getting Started](https://vite.dev/guide/)

**操作时段**：
- [ ] 安装 Node.js
- [ ] 用 Vite 创建 React 项目：`npm create vite@latest reader-app -- --template react`
- [ ] 运行 `npm install` 和 `npm run dev`
- [ ] **概念建立**：让 Cursor 解释 `package.json`、`node_modules`、`npm` 是什么
- [ ] `git init` 并提交初始项目

---

### 5/26 星期二：组件化思维

**学习时段**：[React 快速入门](https://zh-hans.react.dev/learn) 中组件、props、条件渲染

**操作时段**：
- [ ] 把阅读器拆分为四个组件：
  - `BookSidebar`（左栏书籍列表）
  - `ReaderPane`（中栏阅读区）
  - `AIChatPane`（右栏问答区）
  - `BlockEditor`（笔记块编辑器）
- [ ] 先用假数据渲染三栏界面
- [ ] 让 Cursor 解释每个组件的职责
- [ ] `git commit`

---

### 5/27 星期三：state——React 的核心概念

**学习时段**：[React 快速入门](https://zh-hans.react.dev/learn) 中事件与 state

**操作时段**：
- [ ] 实现选择书籍、添加块、删除块
- [ ] **不接 API**，先保证状态流动正确
- [ ] 测试：切换书籍时显示对应块
- [ ] **核心概念**：让 Cursor 用比喻解释 useState 是什么
- [ ] `git commit`

---

### 5/28 星期四：恢复本地保存

**学习时段**：[Vite Env Variables](https://vite.dev/guide/env-and-mode) 安全提示

**操作时段**：
- [ ] 用 React 的 useEffect 恢复 localStorage 保存功能
- [ ] 写 `data-model.md`，正式定义 Book、Block 字段
- [ ] `git commit`

---

### 5/29 星期五：复盘

- [ ] 写 `react-week-review.md`
- [ ] 画出组件关系图（用 Markdown 列表）
- [ ] 列出「我能看懂的代码」和「我还要靠 Cursor 解释的代码」
- [ ] **写 Week 5 复盘**

**Week 5 验收**：
- [ ] React 版阅读器界面原型可运行
- [ ] 能解释「组件」「props」「state」三个概念
- [ ] 拥有清晰的数据模型文档

---

## 10. Week 6（6/1-6/5）：块编辑器 + 折叠 + 拖动排序

**核心目标**：做出第一版 Notion 式块编辑器

### 6/1 星期一：块的折叠/展开

**操作时段**：
- [ ] 为 Block 数据结构增加 `collapsed: boolean` 字段
- [ ] 实现块折叠/展开 UI
- [ ] 测试：刷新后折叠状态保持
- [ ] `git commit`

---

### 6/2 星期二：拖动排序——dnd-kit

**学习时段**：[dnd-kit Sortable](https://docs.dndkit.com/presets/sortable)

**操作时段**：
- [ ] 安装 dnd-kit：`npm install @dnd-kit/core @dnd-kit/sortable`
- [ ] 实现块上下拖动排序
- [ ] 让 Cursor 解释 `arrayMove` 和拖动结束事件
- [ ] **不要追求完美**，先让基本拖动能工作
- [ ] `git commit`

---

### 6/3 星期三：块类型分化

**操作时段**：
- [ ] 实现 4 种块类型：摘录块、问题块、AI 回答块、写作想法块
- [ ] 每种块用不同样式和图标
- [ ] 添加块时可选择类型
- [ ] `git commit`

---

### 6/4 星期四：评估存储升级（暂不实施）

**学习时段**：[Dexie.js Documentation](https://dexie.org/docs) 的 Getting Started

**操作时段**：
- [ ] 让 Cursor 评估：当前 localStorage 方案是否够用，何时该升级到 Dexie/IndexedDB？
- [ ] 写 `storage-plan.md` 记录决策（如 Cursor 判断改动过大，本周不硬迁移）
- [ ] **原则**：能不改就不改，让计划保持可控
- [ ] `git commit`

---

### 6/5 星期五：复盘

- [ ] 写 `block-editor-review.md`
- [ ] 用 10 个真实读书笔记块测试拖动排序
- [ ] 导出 Markdown，检查排序是否正确
- [ ] **写 Week 6 复盘**

**Week 6 验收**：
- [ ] 拥有可折叠、可排序、可保存的块编辑器
- [ ] 4 种块类型 UI 区分清晰

---

## 11. Week 7（6/8-6/12）：AI API 接入

**核心目标**：让阅读器能调用 Gemini 和 DeepSeek，且不泄露 API Key

> **本周是整个计划安全风险最高的一周**。请严格遵守安全清单。

### 6/8 星期一：DeepSeek API 测试（大陆主力）

**学习时段**：[DeepSeek API 文档](https://api-docs.deepseek.com/api/create-chat-completion)（无需梯子）

**操作时段**：
- [ ] 在 DeepSeek 官网申请 API Key
- [ ] **⚠️ 安全警告**：
  - **绝不**把 API Key 粘贴到 Cursor 聊天窗口
  - **绝不**把 API Key 写在前端代码里
  - **绝不**把 API Key 提交到 Git
- [ ] 在 PowerShell 设置环境变量：
  ```powershell
  [System.Environment]::SetEnvironmentVariable('DEEPSEEK_API_KEY', '你的key', 'User')
  ```
- [ ] 写一个独立 Node 脚本 `scripts/test-deepseek.js`，从环境变量读取 Key
- [ ] 测试：发送一个「把这段摘录转为卡片笔记」的请求
- [ ] 检查 `.gitignore` 是否包含 `.env` 和 `scripts/.env`
- [ ] `git commit`（确保不包含 API Key）

---

### 6/9 星期二：Gemini API 测试（备选 + 台湾期间）

⚠️ **本日任务大陆需梯子**

**学习时段**：[Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart)

**操作时段**：
- [ ] 在 Google AI Studio 申请 Gemini API Key
- [ ] 同样存入环境变量 `GEMINI_API_KEY`
- [ ] 写 `scripts/test-gemini.js`
- [ ] 测试同样的请求，对比两个模型的输出
- [ ] `git commit`

---

### 6/10 星期三：本地 API 代理服务

**学习时段**：[Express Hello World](https://expressjs.com/zh-cn/starter/hello-world.html)

**操作时段**：
- [ ] 创建本地 API 代理服务 `server/index.js`
- [ ] 让前端请求 `localhost:3001/api/ask`，由 Node 服务调用 AI
- [ ] **安全核心**：API Key 只在 Node 服务中读取，前端永远拿不到
- [ ] 实现 `/api/ask`，请求体包含摘录和问题
- [ ] `git commit`

---

### 6/11 星期四：阅读器接入 AI

**学习时段**：⚠️ [Gemini Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)（台湾期间或有梯子）

**操作时段**：
- [ ] 在 React 阅读器中接入 `/api/ask`
- [ ] 功能：输入摘录和问题 → 返回 AI 回答 → 自动保存为 AI 回答块
- [ ] 用一段真实读书摘录测试
- [ ] `git commit`

---

### 6/12 星期五：安全审查 + 复盘

- [ ] 写 `ai-api-security-review.md`
- [ ] 检查 `.gitignore` 是否包含 `.env`
- [ ] 让 Cursor 检查项目中有没有硬编码 API Key
- [ ] 缓冲：修复 API 请求失败、跨域、环境变量问题
- [ ] **写 Week 7 复盘**

**Week 7 验收**：
- [ ] 阅读器能完成「摘录 → 提问 → AI 回答 → 保存为块」闭环
- [ ] 通过安全清单全部 7 项检查（见第 18 节）

---

## 12. Week 8（6/15-6/19）：Electron 桌面应用 + 微信读书嵌入

**核心目标**：把 React 阅读器封装成 Windows 桌面应用，尝试嵌入微信读书

### 6/15 星期一：Electron 入门

**学习时段**：
- [Electron Prerequisites](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)
- [Electron Building your First App](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app)

**操作时段**：
- [ ] 创建最小 Electron 窗口
- [ ] 让 Electron 加载本地 React 构建页面或开发服务器
- [ ] **概念**：让 Cursor 解释「Electron 就是给网页套了一个桌面外壳」
- [ ] `git commit`

---

### 6/16 星期二：嵌入微信读书

**学习时段**：[Electron Web Embeds](https://www.electronjs.org/docs/latest/tutorial/web-embeds)

**操作时段**：
- [ ] 尝试在桌面应用中打开 `https://weread.qq.com/`
- [ ] **预期遇到困难**：iframe 可能被限制、登录态可能丢失。这是正常的。
- [ ] 实现左侧微信读书区域，右侧 AI/笔记区域
- [ ] **如果嵌入失败**：记录失败原因，转用「外部浏览器 + 阅读器并排」方案
- [ ] `git commit`

---

### 6/17 星期三：Electron 安全设置

**学习时段**：[Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)

**操作时段**：
- [ ] **⚠️ 安全核心**：不要给微信读书网页启用 Node.js 权限
- [ ] 检查远程网页嵌入安全设置
- [ ] 把 AI API 调用移到 Electron 主进程或本地 Node 服务中
- [ ] `git commit`

---

### 6/18 星期四：完整桌面流程测试

**学习时段**：Electron IPC（进程间通信）

**操作时段**：
- [ ] 实现完整流程：从阅读区复制文字 → 粘贴到提问区 → 调用 AI → 保存回答块
- [ ] 第一版**允许手动复制**，不做自动抓取
- [ ] 完整走一遍真实微信读书阅读场景
- [ ] `git commit`

---

### 6/19 星期五：复盘

- [ ] 写 `electron-week-review.md`
- [ ] 记录微信读书嵌入是否成功、遇到哪些限制
- [ ] **决策记录**：第一版采用嵌入还是并排方案
- [ ] **写 Week 8 复盘**

**Week 8 验收**：
- [ ] 拥有一个可运行的 Windows 桌面阅读器雏形
- [ ] 完整流程闭环至少跑通一次

---

## 13. Week 9（6/22-6/26）：写作工作台 + Obsidian Markdown 导出

**核心目标**：让一本书从阅读、提问、笔记整理进入写作草稿

### 6/22 星期一：优化 Markdown 导出模板

**学习时段**：复习 [Obsidian Markdown 语法](https://help.obsidian.md/syntax)

**操作时段**：
- [ ] 优化 Markdown 导出模板，包含：
  - 书籍信息（书名、作者、阅读日期）
  - 核心问题
  - 摘录
  - AI 回答
  - 我的理解
  - 可用于公众号的段落
- [ ] 为不同块类型设置不同 Markdown 格式
- [ ] `git commit`

---

### 6/23 星期二：整书导出

**学习时段**：[Obsidian Import Markdown](https://help.obsidian.md/import/markdown)

**操作时段**：
- [ ] 实现「导出整本书项目」功能
- [ ] 导出 `.md` 文件 + `.json` 备份文件
- [ ] 测试：把导出的 Markdown 放入测试 Obsidian vault
- [ ] **不要直接写真实 ReadingLora vault**，全程用测试 vault
- [ ] `git commit`

---

### 6/24 星期三：写作草稿区

**操作时段**：
- [ ] 添加「写作草稿区」组件
- [ ] 功能：从笔记块中选择若干块，生成公众号文章大纲
- [ ] 调用 DeepSeek/Gemini 生成大纲，但保留人工修改入口
- [ ] **核心理念**：AI 是顾问，不是决策者。大纲必须能编辑
- [ ] `git commit`

---

### 6/25 星期四：固定提示词模板

**学习时段**：⚠️ 复习 [Anthropic Prompt engineering](https://docs.anthropic.com/en/docs/prompt-engineering)（台湾期间）

**操作时段**：
- [ ] 写 3 个固定提示词模板：
  - 摘要生成
  - 卡片笔记
  - 公众号大纲
- [ ] 把提示词存入 `prompts.md` 或应用配置
- [ ] 用同一本书的 3 段摘录跑完整流程
- [ ] `git commit`

---

### 6/26 星期五：真实闭环测试

- [ ] **完成第一次真实书籍闭环测试**：
  - 微信读书阅读 → 手动摘录 → 问 AI → 保存块 → 排序整理 → 生成大纲 → 导出 Markdown → 放入 Obsidian 测试库
- [ ] 写 `workflow-test-report.md`
- [ ] **写 Week 9 复盘**

**Week 9 验收**：
- [ ] 拥有一个能服务真实阅读和写作的知识工作流 MVP
- [ ] 完成至少一次真实书籍的完整闭环

---

## 14. Week 10（6/29-7/3）：打包、测试、文档

**核心目标**：让项目可维护、可恢复、可继续迭代

### 6/29 星期一：打包 Windows 版本

**学习时段**：
- [Electron Packaging](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)
- [Electron Forge](https://www.electronforge.io/)

**操作时段**：
- [ ] 用 Electron Forge 打包 Windows 版本
- [ ] 如打包失败，保存完整报错让 Cursor 分析
- [ ] 测试：在自己电脑上安装这个 .exe，能否正常运行
- [ ] `git commit` 打包配置

---

### 6/30 星期二：安全审查

**学习时段**：复习 [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)

**操作时段**：
- [ ] 全面安全检查：
  - API Key 是否在 `.env`
  - `.env` 是否在 `.gitignore`
  - GitHub 仓库公开/私有状态
  - 远程网页权限是否最小化
  - 错误日志是否泄露敏感信息
- [ ] 让 Cursor 做一次安全审查（**只让它列问题，不直接改**）
- [ ] `git commit`

---

### 7/1 星期三：写 README

**学习时段**：⚠️ [GitHub Docs 中文](https://docs.github.com/zh/get-started)（如能访问）

**操作时段**：
- [ ] 写 `README.md`，包含：
  - 项目目标
  - 安装方式
  - 运行方式
  - API Key 配置（不要泄露你的 Key）
  - 使用流程
  - 已知限制
- [ ] 录制或截图记录完整使用流程，放入 `docs/`
- [ ] `git commit`

---

### 7/2 星期四：下一阶段路线图

**操作时段**：
- [ ] 写 `roadmap.md`，列出下一阶段可选功能：
  - PDF / EPUB / MOBI 阅读
  - Tiptap 富文本
  - 二维视觉白板
  - Obsidian 自动归档
  - 全文搜索
  - 引用管理
- [ ] 按价值和难度排序，**不要一次全做**
- [ ] 写复盘：「我现在能独立判断 AI 代码的哪些部分？」
- [ ] `git commit`

---

### 7/3 星期五：MVP 总验收

- [ ] **完整运行项目一次**
- [ ] **导出一个真实读书项目到 Markdown**，并放入 Obsidian 测试库
- [ ] 写 `mvp-acceptance-test.md` 记录验收结果
- [ ] **写 Week 10 复盘**

**Week 10 验收**：参见第 19 节真实项目验收标准

---

## 15. Week 11-14：缓冲、迭代、巩固（7/6-8/7）

**核心目标**：用 4 周缓冲时间消化 MVP，处理积压问题，准备下一轮迭代

### Week 11（7/6-7/10）：真实使用周

- 用阅读器读完一本真书（建议选最近想读的）
- 全程不写代码，只是用
- 记录所有「不爽的地方」「想加的功能」「发现的 Bug」
- 这一周的「不爽列表」会成为下一阶段的需求来源

### Week 12（7/13-7/17）：Bug 修复周

- 处理 Week 11 发现的 Bug
- 不加新功能，只修问题
- 每修一个 Bug 就 commit 一次
- 累计写 `bugfix-log.md`

### Week 13（7/20-7/24）：技术深化周

- 深入学习一个一直没真正搞懂的概念（比如 React 的 useEffect、Electron IPC）
- 让 Cursor 教你这个概念，并用阅读器代码作为案例
- 写 `deep-dive-[topic].md` 笔记

### Week 14（7/27-7/31）：总复盘 + 下一阶段规划

- 写 `14-week-review.md`：
  - 已完成 / 未完成 / 放弃的功能
  - 我现在能独立做的事
  - 我还需要 AI 完全帮忙的事
  - 下一轮 4 周迭代选定**唯一**目标（不要超过一个）
- 决定：
  - 是继续迭代这个阅读器
  - 还是用学到的能力开始另一个项目
  - 还是先用 MVP 一段时间再说

### 8/3-8/7：休整

- 不学新东西
- 写一篇公众号文章总结这 14 周的学习心得（这是绝佳的内容素材）

---

## 16. 每周复盘模板

在 Cursor 项目根目录创建 `weekly-reviews/` 文件夹，每周五填写：

```markdown
# 第 X 周复盘（YYYY-MM-DD）

## 本周完成
- [ ] 

## 本周最有价值的收获
1. 
2. 
3. 

## 本周遇到的报错
- 报错内容：
- 原因：
- 解决方法：
- 下次如何避免：

## 本周 AI 帮了什么
- 

## 哪些地方我仍然看不懂
- 

## 下周最重要的一件事
- 
```

---

## 17. 每周验收清单

- [ ] **Week 1**：Git 仓库 + AI 协作规则 + 阅读器产品说明
- [ ] **Week 2**：HTML/CSS/JS 静态阅读器界面草图
- [ ] **Week 3**：可保存、可导出 Markdown 的纯 JS 网页原型
- [ ] **Week 4**：函数化 + 异步 + 模块化的 JS 阅读器
- [ ] **Week 5**：React + Vite 阅读器界面
- [ ] **Week 6**：可折叠、可排序的块编辑器
- [ ] **Week 7**：Gemini/DeepSeek API 接入
- [ ] **Week 8**：Electron 桌面阅读器雏形
- [ ] **Week 9**：写作草稿区 + Obsidian Markdown 导出
- [ ] **Week 10**：打包测试 + README + 安全检查 + 路线图
- [ ] **Week 11-14**：真实使用 + Bug 修复 + 技术深化 + 总复盘

---

## 18. API Key 安全清单（每周自检）

- [ ] API Key 只放在 `.env` 或系统环境变量中
- [ ] `.env` 已加入 `.gitignore`
- [ ] 不把 API Key 发给 ChatGPT、Claude、Gemini、Cursor 聊天窗口
- [ ] 不把 API Key 写在 React 前端代码中
- [ ] 不把带有 API Key 的截图发给别人
- [ ] 提交 Git 前运行 `git status`，确认 `.env` 没有被提交
- [ ] 定期去 Gemini 和 DeepSeek 后台检查用量

---

## 19. 真实项目验收标准（Week 10 末必须能做到）

到第 10 周结束时，项目不需要精致，但应该能完成这个闭环：

- [ ] 打开阅读器桌面应用
- [ ] 打开或并排使用微信读书
- [ ] 阅读时手动复制一段摘录
- [ ] 在阅读器里向 AI 提问
- [ ] AI 回答自动保存为块
- [ ] 你能新增自己的理解块
- [ ] 你能折叠和拖动排序这些块
- [ ] 一本书读完后能整理成文章大纲
- [ ] 能导出 Markdown
- [ ] 能把 Markdown 放入 Obsidian 测试库
- [ ] Git 中能看到主要版本历史

---

## 20. 以后再学的内容（不要现在展开）

- TypeScript
- 自动化测试体系
- SQLite 深度使用
- PDF/EPUB/MOBI 解析
- 二维白板和卡片连线
- Obsidian 插件开发
- 云同步
- 用户账户和登录
- macOS 打包与签名

---

## 21. 心理建设——给未来某个想放弃的瞬间

如果某一天你看着报错想关掉电脑，请回到这一节：

1. **报错不是失败的信号，是学习的信号**。报错的代码是你能修的最便宜的代码——它已经告诉你哪里错了
2. **看不懂是正常的**。你才学了 X 周，怎么可能看懂业内人士学了 5 年的东西？看不懂就让 AI 解释，解释完不懂就换个比喻问
3. **你不是在学编程，你是在学「用编程解决你的问题」**。不需要会写所有代码，只需要会判断 AI 写的代码对不对
4. **每个 commit 都是进步**。哪怕这周只多了 3 个 commit，也比上周多
5. **进度落后不是失败，放弃才是**。计划落后两周？把 Week 11-14 的缓冲时间用掉。落后四周？砍掉 V1.0 的某个功能。**只要还在 commit，就不算失败**

---

*计划版本 V2.0 | 2026年4月26日*
*整合自 V1.0（40周保守版）和 12周项目版*
*为 Lora 的实际投入（每周 4 天 × 4-6 小时）定制*
