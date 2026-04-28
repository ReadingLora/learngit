# Git 命令速查表

日期：2026年4月28日
操作者：Lora

---

## 一、核心概念

| 名称 | 比喻 | 说明 |
|------|------|------|
| 工作区 | 桌子 | 你正在编辑的文件 |
| 暂存区 | 箱子 | git add 之后的状态 |
| 版本库 | 已寄出的快递 | git commit 之后永久存档 |
| 本地仓库 | 你电脑上的存档 | 所有提交记录都在这里 |
| 远程仓库 | GitHub 上的备份 | git push 之后同步到云端 |

---

## 二、初始化与配置

```bash
# 初始化 Git 仓库
git init

# 配置用户名和邮箱（只需做一次）
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 查看当前配置
git config --list
```

---

## 三、日常操作（最常用）

```bash
# 查看当前仓库状态
git status

# 查看简洁状态（左栏=暂存区状态，右栏=工作区状态）
git status -s

# 把指定文件放进暂存区
git add 文件名.md

# 把子文件夹里的文件放进暂存区
git add 文件夹名/文件名.md

# 把所有变化放进暂存区（新增、修改、删除、移动一次全包）
git add -A

# 正式存档
git commit -m "这次改动的说明"

# 查看提交历史
git log

# 查看简洁版提交历史
git log --oneline
```

---

## 四、git status -s 符号说明

| 显示 | 左栏（暂存区） | 右栏（工作区） | 意思 |
|------|--------------|--------------|------|
| `_M` | 无变化 | 已修改 | 工作区改了，还没 git add |
| `M_` | 已修改 | 无变化 | 已 git add，还没 commit |
| `MM` | 已修改 | 已修改 | git add 后又改了，两边都有变化 |
| `A_` | 已添加 | 无变化 | 新文件已 git add，还没 commit |
| `??` | 未追踪 | 未追踪 | 从来没有 git add 过的新文件 |

> Cursor 左栏用 `U`（Untracked）表示 `??`，含义相同

---

## 五、查看文件内容与差异

```bash
# 在终端直接显示文件内容
cat 文件名.md

# PowerShell 等效命令
Get-Content 文件名.md

# 查看工作区和暂存区的差异（git add 之前用）
git diff 文件名.md
```

---

## 六、撤销操作

```bash
# 撤销工作区的修改（还没有 git add）
# → 暂存区有内容就还原到暂存区版本；暂存区为空则还原到上次 commit
git checkout -- 文件名.md

# 把已经 git add 的文件退回工作区（内容不变，只是退出暂存区）
git reset HEAD 文件名.md

# 回退到上一个版本
git reset --hard HEAD^

# 回退到上上个版本
git reset --hard HEAD^^

# 回退到指定版本（commit id 前几位即可）
git reset --hard a1b2c3
```

---

## 七、文件操作

```bash
# 删除文件（同时从工作区和 Git 记录中移除）
git rm 文件名.md

# 强制删除（文件有未提交的修改时使用）
git rm -f 文件名.md

# 重命名文件（等于：改名 + git rm 旧名 + git add 新名，三步合一）
git mv 旧文件名.md 新文件名.md
```

---

## 八、忽略文件（.gitignore）

在项目根目录新建 `.gitignore` 文件，写入要忽略的规则：

```
# 忽略所有 .env 后缀的文件（存 API Key 用）
*.env

# 忽略 node_modules 文件夹（装 React 后自动生成，几千个文件）
node_modules/

# 忽略系统自动生成的文件
.DS_Store
Thumbs.db
```

**规则说明**：
- `文件名` → 忽略这个具体文件
- `*.后缀` → 忽略所有这个后缀的文件
- `文件夹名/` → 忽略整个文件夹
- `#` 开头 → 注释，Git 忽略这一行

> 以后 Week 5 开始 React 项目时，去 [github.com/github/gitignore](https://github.com/github/gitignore) 找 `Node.gitignore`，复制内容直接用

---

## 九、远程仓库

```bash
# 连接远程仓库（只需做一次）
git remote add origin git@github.com:用户名/仓库名.git

# 第一次推送（建立本地和远程的追踪关系）
git push -u origin main

# 之后每次推送只需
git push

# 从远程仓库拉取最新内容
git pull

# 克隆远程仓库到本地
git clone git@github.com:用户名/仓库名.git
```

> 注意：新版 Git 默认分支名是 `main`，不是 `master`。廖雪峰教程写的是旧版本，遇到 `master` 替换成 `main` 即可

---

## 十、分支操作

```bash
# 查看所有分支（* 号表示当前所在分支）
git branch

# 创建新分支
git branch 分支名

# 切换到某个分支
git checkout 分支名

# 创建并立刻切换到新分支（以上两步合并）
git checkout -b 分支名

# 把某个分支合并到当前分支
git merge 分支名

# 删除分支
git branch -d 分支名
```

---

## 十一、终端基础（文件夹导航）

```bash
# 切换到指定文件夹
cd C:\Users\11461\Documents\obsidian-lab

# 回到上一级文件夹
cd ..

# 新建文件夹
mkdir 文件夹名

# 新建文件（PowerShell）
New-Item 文件名.md

# 同时新建文件夹和文件
New-Item 文件夹名/文件名.md

# 查看当前文件夹内容
ls
```

---

## 十二、每日结束流程

```bash
git add -A
git commit -m "今日学习内容说明"
git push
```

---

## 十三、踩过的坑

| 坑 | 原因 | 解决方法 |
|----|------|----------|
| `git add 文件名` 找不到文件 | 文件在子文件夹，需要写完整路径 | `git add 子文件夹/文件名.md` 或 `git add -A` |
| `git add` 后面什么都不加 | 忘记指定文件 | 加 `-A` 或指定文件名 |
| `git push -u origin master` 报错 | 新版 Git 默认分支是 main | 改成 `git push -u origin main` |
| `git diff` 没有输出 | 已经 git add，diff 只看未暂存的变化 | 正常现象，继续 commit 即可 |
| 空文件夹不出现在 git status | Git 只追踪文件，不追踪空文件夹 | 在文件夹里放一个文件再 add |
| `git log` 进入查看模式出不来 | 进入了 less 阅读器 | 按 `q` 退出 |
| SSH key 放错位置 | 不能放在项目文件夹里 | 必须放默认路径 `C:\Users\11461\.ssh\` |
| `.gitignore` 写 `.env` 无效 | 文件名不完全匹配 | 改成 `*.env` 忽略所有该后缀文件 |
| Cursor Git 面板显示「No source control」 | Cursor 没有识别到 Git | 完全重启 Cursor，确认打开的是根目录 |

---

*最后更新：2026年4月28日*
*遇到新命令或新坑，随时更新这份文件*
