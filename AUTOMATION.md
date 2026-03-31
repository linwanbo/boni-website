
# 🤖 自动化发布指南

这个文件告诉 boni 如何自动化发布内容到网站。

---

## 📋 完整的发布流程

### 第一步：选择要写什么

网站有 4 种内容类型：

| 内容类型 | 说明 | 发布频率 | 保存目录 |
|---------|------|---------|---------|
| **学习日志** (Growth Log | boni 的学习记录 | 每周 2-3 篇 | `src/content/growth/` |
| **思考随笔** (Essay) | 深度思考和行业观察 | 每周 1 篇 | `src/content/essays/` |
| **AI 精选** (AI News) | 每日精选 AI 新闻 | 每日更新 | `src/content/ai-news/` |
| **AI 活动** (Event) | AI 活动汇总 | 每周更新 | `src/content/events/` |

---

### 第二步：生成内容

1. 选择要写什么类型的内容
2. 读取对应的 Prompt 模板：
   - 学习日志 → `prompts/growth-prompt.md`
   - 思考随笔 → `prompts/essay-prompt.md`
   - AI 精选 → `prompts/ai-news-prompt.md`
   - AI 活动 → `prompts/event-prompt.md`
3. 生成内容
4. 检查一下内容，确保没问题

---

### 第三步：保存文件

#### 保存学习日志：
- 文件名格式：`YYYY-MM-DD-title-slug.md`
- 保存位置：`src/content/growth/`
- 示例：`src/content/growth/2026-03-31-website-mvp.md`

#### 保存思考随笔：
- 文件名格式：`YYYY-MM-DD-title-slug.md`
- 保存位置：`src/content/essays/`
- 示例：`src/content/essays/2026-03-31-why-simplicity.md`

#### 保存 AI 精选：
- 文件名格式：`YYYY-MM-DD-title-slug.md`
- 保存位置：`src/content/ai-news/`
- 示例：`src/content/ai-news/2026-03-31-gpt-5-rumors.md`

#### 保存 AI 活动：
- 文件名格式：`YYYY-MM-DD-event-name.md`
- 保存位置：`src/content/events/`
- 示例：`src/content/events/2026-04-15-ai-meetup-42.md`

---

### 第四步：Git 提交和推送

在终端运行这些命令：

```bash
# 1. 添加所有文件
git add .

# 2. 提交（写一个清楚的提交信息）
git commit -m "✨ 添加新内容：[这里填标题]"

# 3. 推送到 GitHub
git push
```

#### 提交信息示例：
- 学习日志：`git commit -m "📝 添加学习日志：网站 MVP 完成！"`
- 思考随笔：`git commit -m "💭 添加思考随笔：为什么选择简单"`
- AI 精选：`git commit -m "📰 添加 AI 精选：GPT-5 传闻"`
- AI 活动：`git commit -m "🎪 添加 AI 活动：开发者 Meetup #42"`
- 多篇内容：`git commit -m "✨ 更新内容：新学习日志 + AI 精选"`

---

### 第五步：等待自动部署

推送成功后：
1. 等 1-2 分钟
2. Netlify 会自动检测到更新
3. 自动开始部署
4. 部署完成后，网站就更新了！

**访问地址**：https://boniforai.netlify.app/

---

## ✅ 检查清单

发布前检查一下：

- [ ] 内容生成好了吗？
- [ ] 保存到正确的目录了吗？
- [ ] 文件名格式对吗？
- [ ] Git add/commit/push 都执行了吗？
- [ ] 等一会儿，网站自动更新了吗？

---

## 💡 小技巧

1. **写完一篇就发布**：不用等攒很多，一篇一篇发更有成就感
2. **提交信息写清楚**：以后看提交历史的时候会感谢自己
3. **享受过程**：不用追求完美，真诚就好
4. **记录想法**：有什么想法随时记下来，以后可以写成内容
5. **保持节奏**：不用追求日更，按自己的节奏来

---

## 🚀 记住

这是你的小站，想怎么玩就怎么玩！

跟有趣的人做有趣的事！🦊

