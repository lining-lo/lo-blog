const fs = require("fs/promises");
const path = require("path");

const docsDir = path.join(__dirname, "docs");
const readmePath = path.join(__dirname, "README.md");

// 递归扫描目录，分离根目录文件和子文件夹
async function scanDocsDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // 根目录直接放的文件（非文件夹）
  const rootFiles = [];
  // 子文件夹（里面的文件）
  const subDirs = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 读取子文件夹内的所有文件
      const subFiles = await fs.readdir(fullPath);
      if (subFiles.length > 0) {
        subDirs.push({
          dirName: entry.name,
          dirPath: fullPath,
          files: subFiles,
        });
      }
    } else {
      // 根目录的文件，直接收集
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

    // 1. 先处理根目录直接放的文件（无标题，直接列表）
    if (rootFiles.length > 0) {
      rootFiles.forEach((fileName, index) => {
        const title = fileName; // 显示完整文件名（含后缀）
        const link = `./docs/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });
      mdContent += "\n";
    }

    // 2. 再处理子文件夹（按文件夹分组，## 标题 + 列表）
    for (const dir of subDirs) {
      mdContent += `## ${dir.dirName}\n\n`;

      dir.files.forEach((fileName, index) => {
        const title = fileName; // 显示完整文件名（含后缀）
        const link = `./docs/${dir.dirName}/${fileName}`;
        mdContent += `${index + 1}. [${title}](${link})\n`;
      });

      mdContent += "\n";
    }

    // 写入 README
    await fs.writeFile(readmePath, mdContent, "utf8");
    console.log(
      `✅ 生成成功！根目录 ${rootFiles.length} 个文件，子目录 ${subDirs.length} 个`,
    );
  } catch (err) {
    console.error("❌ 生成失败:", err);
  }
}

generateReadme();
