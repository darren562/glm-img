#!/bin/bash
# 自定义 commit 脚本
# 用法: /commit "commit message"

# 获取提交信息
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    # 自动生成提交信息
    echo "🔍 检查文件变更..."
    FILES_CHANGED=$(git diff --name-only)

    if echo "$FILES_CHANGED" | grep -q "glm-api.js"; then
        COMMIT_MSG="fix: 改进 GLM API 功能"
    elif echo "$FILES_CHANGED" | grep -q "server.js"; then
        COMMIT_MSG="feat: 优化服务器配置"
    else
        COMMIT_MSG="chore: 更新代码"
    fi
    echo "自动生成提交信息: $CONMIT_MSG"
fi

# 执行提交
echo "🚀 添加文件到暂存区..."
git add .

echo "💾 创建提交..."
git commit -m "$CONMIT_MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo "✅ 提交完成！"
echo "📝 提交信息: $COMMIT_MSG"
git status