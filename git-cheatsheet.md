# Git 命令速查表

日期：2026年4月27日
操作者：Lora

---

## 一、基础概念

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
# 初始化一个 Git 仓库（在当前文件夹建立版本管理）
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
# 查看当前仓库状态（哪些文件有变化）
git status

# 把文件放进暂存区（箱子）
git add 文件名.md

# 把当前文件夹所有变化都放进暂存区（包括新增、修改、删除、移动）
git add -A

# 正式存档，引号里写这次改了什么
git commit -m "这次改动的说明"

# 查看提交历史
git log

# 查看简洁版提交历史
git log --oneline
```

---

## 四、查看变化

```bash
# 查看工作区和暂存区的差异（git add 之前用）
git diff 文件名.md

# 查看文件内容（直接在终端显示）
cat 文件名.md

# PowerShell 等效命令
Get-Content 文件名.md
```

---

## 五、撤销操作

```bash
# 撤销工作区的修改（还没有 git add）
# → 还原到暂存区有的版本；暂存区为空则还原到上次 commit
git checkout -- 文件名.md

# 把已经 git add 的文件退回工作区（文件内容不变，只是退出箱子）
git reset HEAD 文件名.md

# 回退到上一个版本
git reset --hard HEAD^

# 回退到上上个版本
git reset --hard HEAD^^

# 回退到指定版本（commit id 前几位即可）
git reset --hard a1b2c3
```

---

## 六、远程仓库

```bash
# 连接远程仓库（只需做一次）
git remote add origin git@github.com:用户名/仓库名.git

# 第一次推送到远程仓库（建立追踪关系）
git push -u origin main

# 之后每次推送只需
git push

# 从远程仓库拉取最新内容
git pull

# 克隆远程仓库到本地
git clone git@github.com:用户名/仓库名.git
```

---

## 七、分支操作

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

## 八、文件夹导航（终端基础）

```bash
# 切换到某个文件夹
cd C:\Users\11461\Documents\obsidian-lab

# 回到上一级文件夹
cd ..

# 新建文件夹
mkdir 文件夹名

# 新建文件（PowerShell）
New-Item 文件名.md

# 查看当前文件夹内容
ls
```

---

## 九、今天踩过的坑

| 坑 | 原因 | 解决方法 |
|----|------|----------|
| `git add 文件名` 报错找不到文件 | 文件在子文件夹里，需要写完整路径 | `git add 子文件夹/文件名.md` 或 `git add -A` |
| `git push -u origin master` 报错 | 新版 Git 默认分支是 main 不是 master | 改成 `git push -u origin main` |
| `git diff` 没有输出 | 已经 git add 过了，diff 只看未暂存的变化 | 已 add 的用 `git diff --staged` |
| 空文件夹不出现在 git status | Git 只追踪文件，不追踪空文件夹 | 在文件夹里放一个文件再 add |
| `git log` 进入查看模式出不来 | 进入了 less 阅读器 | 按 `q` 退出 |
| SSH key 路径问题 | 不能放在项目文件夹里 | 必须放默认路径 `C:\Users\11461\.ssh\` |

---

## 十、常用流程速记

**每天学习结束时**：
```bash
git add -A
git commit -m "今日学习内容说明"
git push
```

**出问题不知道现在状态时**：
```bash
git status
git log --oneline
```

**搞砸了想回到上一个版本**：
```bash
git reset --hard HEAD^
```

---

*最后更新：2026年4月27日*
*下次遇到新命令，在这里继续补充*
