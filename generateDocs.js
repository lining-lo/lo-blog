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

    // 1. 根目录文件 → docs/xx.md
    if (rootFiles.length > 0) {
      rootFiles.forEach((fileName, index) => {
        const title = fileName;
        const link = `docs/${fileName}`; // 👈 根目录格式
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });
      mdContent += "\n";
    }

    // 2. 子文件夹 → /目录/xx.md
    for (const dir of subDirs) {
      mdContent += `## ${dir.dirName}\n\n`;

      dir.files.forEach((fileName, index) => {
        const title = fileName;
        const link = `/${dir.dirName}/${fileName}`; // 👈 子目录格式
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });

      mdContent += "\n";
    }

    await fs.writeFile(readmePath, mdContent, "utf8");
    console.log("✅ 生成成功！格式完全符合要求");
  } catch (err) {
    console.error("❌ 生成失败:", err);
  }
}

generateReadme();
