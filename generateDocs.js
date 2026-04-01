const fs = require("fs/promises");
const path = require("path");

// 配置区信息
const CONFIG = {
  docsDir: path.join(__dirname, "docs"), // 文档目录
  readmePath: path.join(__dirname, "README.md"), // 输出路径
  title: "📚 个人博客文档列表", // 标题
  ignoreList: [".DS_Store", ".gitkeep", "node_modules", ".log", "tmp"], // 忽略文件
  showExtension: true, // 是否显示文件后缀
  indentSpace: 2, // 缩进空格数
};

let totalFiles = 0;

/**
 * 递归扫描目录
 */
async function scanDocsDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = { files: [], dirs: {} };

  for (const entry of entries) {
    if (CONFIG.ignoreList.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(__dirname, fullPath);

    if (entry.isDirectory()) {
      result.dirs[entry.name] = await scanDocsDir(fullPath);
    } else {
      const webLink = relativePath.replace(/\\/g, "/").replace(/ /g, "%20");
      let fileName = entry.name;
      // 是否去掉文件后缀
      if (!CONFIG.showExtension) fileName = path.parse(fileName).name;

      result.files.push({ name: fileName, link: webLink });
      totalFiles++;
    }
  }

  // 中英文智能排序
  result.files.sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  return result;
}

/**
 * 递归生成 Markdown 目录
 */
function buildMarkdown(scanResult, level = 1) {
  let content = "";
  const indent = " ".repeat(CONFIG.indentSpace * (level - 1));

  // 文件列表
  if (scanResult.files.length > 0) {
    scanResult.files.forEach((file, i) => {
      content += `${indent}${i + 1}. [${file.name}](${file.link})\n`;
    });
  }

  // 子文件夹排序 + 递归
  const dirNames = Object.keys(scanResult.dirs).sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  );

  for (const dirName of dirNames) {
    content += `\n${"#".repeat(level + 1)} 📂 ${dirName}\n\n`;
    content += buildMarkdown(scanResult.dirs[dirName], level + 1);
  }

  return content;
}

/**
 * 生成 README 主函数
 */
async function generateReadme() {
  try {
    totalFiles = 0;
    await fs.mkdir(CONFIG.docsDir, { recursive: true });
    const scanResult = await scanDocsDir(CONFIG.docsDir);
    const generateTime = new Date().toLocaleString("zh-CN");

    let mdContent = `# ${CONFIG.title}\n\n`;
    mdContent += `> ⏱ 自动生成于：${generateTime}\n`;
    mdContent += `> 📄 文档总数：**${totalFiles}** 个\n\n`;
    mdContent += buildMarkdown(scanResult);

    await fs.writeFile(CONFIG.readmePath, mdContent, "utf8");
    console.log(`\n✅ 生成成功！| 共 ${totalFiles} 个文档\n`);
  } catch (err) {
    console.error("\n❌ 生成失败：", err.message, "\n");
  }
}

generateReadme();
