const fs = require("fs/promises");
const path = require("path");

// 🔧 关键：docs是根目录，所有文件都在docs里
const docsDir = path.join(__dirname, "docs");
const readmePath = path.join(__dirname, "README.md");

// 扫描目录（优化版：只保留.md/.txt，过滤系统文件）
async function scanDocsDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const rootFiles = [];
  const subDirs = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await fs.readdir(fullPath);
      // 过滤系统文件，只保留有效文件
      const validFiles = subFiles.filter(
        (file) =>
          !file.startsWith(".") &&
          (file.endsWith(".md") || file.endsWith(".txt")),
      );
      if (validFiles.length > 0) {
        subDirs.push({
          dirName: entry.name,
          files: validFiles,
        });
      }
    } else {
      // 根目录文件过滤
      if (
        !entry.name.startsWith(".") &&
        (entry.name.endsWith(".md") || entry.name.endsWith(".txt"))
      ) {
        rootFiles.push(entry.name);
      }
    }
  }

  return { rootFiles, subDirs };
}

async function generateReadme() {
  try {
    const { rootFiles, subDirs } = await scanDocsDir(docsDir);

    let mdContent = `# 个人博客文档列表\n\n`;
    mdContent += `> 自动生成于 ${new Date().toLocaleString("zh-CN")}\n\n`;

    // 1. docs根目录文件 → 路径：docs/文件名
    if (rootFiles.length > 0) {
      rootFiles.forEach((fileName, index) => {
        const title = fileName;
        const link = `docs/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });
      mdContent += "\n";
    }

    // 2. docs下的子文件夹 → 路径：docs/文件夹名/文件名 ✅ 完全匹配仓库结构
    for (const dir of subDirs) {
      mdContent += `## ${dir.dirName}\n\n`;

      dir.files.forEach((fileName, index) => {
        const title = fileName;
        // 🔧 核心修复：路径完全匹配仓库结构
        const link = `docs/${dir.dirName}/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });

      mdContent += "\n";
    }

    await fs.writeFile(readmePath, mdContent, "utf8");
    console.log("✅ 生成成功！路径100%匹配仓库结构，GitHub可直接访问");
  } catch (err) {
    console.error("❌ 生成失败:", err);
  }
}

generateReadme();
