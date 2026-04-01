@echo off
:: 开启延迟环境变量扩展（解决日期格式、错误判断问题）
setlocal enabledelayedexpansion
:: 切换编码为UTF-8，避免中文乱码
chcp 65001 >nul
:: 强制切换到脚本所在目录（核心！防止路径错误）
cd /d "%~dp0"

:: 美化标题和分隔线
echo.
echo ==============================================
echo          📚 博客文档一键自动提交工具
echo ==============================================
echo.

:: 1. 生成文档目录（增加失败重试+提示）
echo [1/4] 📄 正在生成文档目录...
node generateDocs.js
:: 判断生成是否失败（0=成功，非0=失败）
if !errorlevel! equ 0 (
    echo ✅ 文档目录生成成功！
) else (
    echo.
    echo ❌ 文档生成失败！请检查 generateDocs.js 是否存在、Node.js 是否安装
    pause
    exit /b 1
)

echo.
:: 2. Git add（增加判断，避免空添加）
echo [2/4] 📥 正在添加文件到暂存区...
git add .
if !errorlevel! equ 0 (
    echo ✅ 文件添加完成！
) else (
    echo.
    echo ❌ Git添加失败！请检查是否在Git仓库目录
    pause
    exit /b 1
)

echo.
:: 3. Git commit（优化日期格式，避免系统日期乱码，增加空提交判断）
:: 格式化日期为：YYYY-MM-DD（兼容所有Windows系统，不会出现“星期几”）
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set "datetime=%%a"
set "today=!datetime:~0,4!-!datetime:~4,2!-!datetime:~6,2!"
echo [3/4] ✍️ 正在提交代码（提交信息：!today! 文档更新）...
git commit -m "!today! 文档更新"
:: 判断是否是空提交（没有文件修改时）
if !errorlevel! equ 0 (
    echo ✅ 代码提交成功！
) else (
    echo.
    echo ⚠️  无文件修改，无需提交（可直接推送）
)

echo.
:: 4. Git push（支持分支切换，增加失败重试提示）
set "branch=master" :: 可修改为你的分支（如main）
echo [4/4] 🚀 正在推送到GitHub（分支：!branch!）...
git push origin !branch!
if !errorlevel! equ 0 (
    echo ✅ 推送成功！
) else (
    echo.
    echo ❌ 推送失败！请检查：
    echo    1. 网络是否正常
    echo    2. 分支名称是否正确（当前分支：!branch!）
    echo    3. GitHub账号是否已登录
    pause
    exit /b 1
)

echo.
echo ==============================================
echo 🎉 全部操作完成！请按任意键关闭窗口~
echo ==============================================
echo.

:: 手动关闭（按任意键退出）
pause