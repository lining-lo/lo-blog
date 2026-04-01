const fs = require("fs/promises");
const path = require("path");

const docsDir = path.join(__dirname, "docs");
const readmePath = path.join(__dirname, "README.md");

// 扫描目录
async function scanDocsDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const rootFiles = [];
  const subDirs = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await fs.readdir(fullPath);
      if (subFiles.length > 0) {
        subDirs.push({
          dirName: entry.name,
          files: subFiles,
        });
      }
    } else {
      rootFiles.push(entry.name);
    }
  }

  return { rootFiles, subDirs };
}

async function generateReadme() {
  try {
    const { rootFiles, subDirs } = await scanDocsDir(docsDir);

    let mdContent = `# 个人博客文档列表\n\n`;
    mdContent += `> 自动生成于 ${new Date().toLocaleString("zh-CN")}\n\n`;

    // 1. 根目录文件
    if (rootFiles.length > 0) {
      rootFiles.forEach((fileName, index) => {
        const title = fileName;
        const link = `docs/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });
      mdContent += "\n";
    }

    // 2. 子文件夹 🔥🔥🔥 这里我改了！
    for (const dir of subDirs) {
      mdContent += `## ${dir.dirName}\n\n`;

      dir.files.forEach((fileName, index) => {
        const title = fileName;
        // 原来错误： /${dir.dirName}/${fileName}
        // 现在正确： docs/${dir.dirName}/${fileName}
        const link = `docs/${dir.dirName}/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });

      mdContent += "\n";
    }

    await fs.writeFile(readmePath, mdContent, "utf8");
    console.log("✅ 生成成功！路径完全正确，GitHub 可访问");
  } catch (err) {
    console.error("❌ 生成失败:", err);
  }
}

generateReadme();
