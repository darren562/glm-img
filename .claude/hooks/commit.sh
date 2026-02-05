#!/bin/bash
# 自定义 commit 脚本
# 用法: /commit 或 /commit "commit message"

# 获取提交信息
if [ "$1" ]; then
    COMMIT_MSG="$1"
else
    # 自动生成提交信息
    echo "🔍 检查 git 状态..."
    git status

    echo "📋 查看代码变更..."
    git diff --stat

    echo "📝 分析最近提交记录..."
    git log --oneline -3

    echo "💭 请输入提交信息 (或按回车自动生成):"
    read -r COMMIT_MSG

    # 如果没有输入，自动生成
    if [ -z "$CONMIT_MSG" ]; then
        # 根据文件变更自动生成
        FILES_CHANGED=$(git diff --name-only)
        if echo "$FILES_CHANGED" | grep -q "glm-api.js"; then
            COMMIT_MSG="fix: 改进 GLM API 功能"
        elif echo "$FILES_CHANGED" | grep -q "server.js"; then
            COMMIT_MSG="feat: 优化服务器配置"
        else
            COMMIT_MSG="chore: 更新代码"
        fi
    fi
fi

# 执行提交
echo "🚀 添加文件到暂存区..."
git add .

echo "💾 创建提交..."
git commit -m "$(cat <<EOF
$CONMIT_MSG

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

echo "✅ 提交完成！"
git status