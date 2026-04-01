@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ======================================
echo          博客文档自动提交
echo ======================================
echo.

echo 1/4 正在生成文档目录...
node generateDocs.js
if errorlevel 1 (
    echo.
    echo ❌ 生成文档失败！
    pause
    exit /b 1
)

echo.
echo 2/4 正在添加文件...
git add .

echo.
echo 3/4 正在提交...
git commit -m "%date% 文档更新"

echo.
echo 4/4 正在推送到 GitHub...
git push origin master

echo.
echo ======================================
echo ✅ 全部完成！
echo ======================================
echo.

pause