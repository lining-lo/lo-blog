@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo ==============================================
echo          📚 博客文档一键自动提交工具
echo ==============================================
echo.

echo [1/4] 📄 正在生成文档目录...
node generateDocs.js
if !errorlevel! equ 0 (
    echo ✅ 文档目录生成成功！
) else (
    echo.
    echo ❌ 文档生成失败！
    pause
    exit /b 1
)

echo.
echo [2/4] 📥 正在添加文件到暂存区...
git add .
if !errorlevel! equ 0 (
    echo ✅ 文件添加完成！
) else (
    echo.
    echo ❌ Git 添加失败！
    pause
    exit /b 1
)

echo.
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set "datetime=%%a"
set "today=!datetime:~0,4!-!datetime:~4,2!-!datetime:~6,2!"
echo [3/4] ✍️ 正在提交代码（信息：!today! 文档更新）...
git commit -m "!today! 文档更新"
if !errorlevel! equ 0 (
    echo ✅ 代码提交成功！
) else (
    echo.
    echo ⚠️  无文件修改，无需提交
)

echo.
set "branch=master"
echo [4/4] 🚀 正在推送到 GitHub（分支：!branch!）...
git push origin !branch!
if !errorlevel! equ 0 (
    echo ✅ 推送成功！
) else (
    echo.
    echo ❌ 推送失败！请检查网络/分支/登录状态
    pause
    exit /b 1
)

echo.
echo ==============================================
echo 🎉 全部操作完成！请按任意键关闭窗口~
echo ==============================================
echo.

pause