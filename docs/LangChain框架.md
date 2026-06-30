# 1.理论概述

## 1.1.LangChain的介绍

```python
1.概述:一套用于打通大模型与外部数据 / 工具的开发工具库。
    
2.两大版本:
  a.LangChain = LangChain for Python（原版，生态最完善）
  b.LangChain4J = LangChain for Java（Java 生态适配版）
    
3.下载地址:
  a.官网地址:
    英文: https://docs.langchain.com/oss/python/langchain/overview
    中文: https://docs.langchain.org.cn/oss/python/langchain/overview
  b.github地址: https://github.com/langchain-ai
  b.API 文档: 
    https://reference.langchain.com/python/langchain/
    https://reference.langchain.com/python/langchain/langchain/
```

![image-20260630092116](../image/image-20260630092116.png)

## 1.2.LLM大模型应用技术架构

![image-20260630095411](../image/image-20260630095411.png)

## 1.3LangChain的总体架构

```python
LangChain的架构主要包括六大核心组件:
1.Models 模型层：统一适配各类线上、本地大模型，一套代码即可切换底层 AI，不用重复编写调用逻辑。
2.Memory 记忆层：存储多轮对话历史，让 AI 记住上下文，实现连贯连续聊天。
3.Retrieval 检索层：读取私有文档构建知识库，提问时自动匹配相关资料，降低 AI 凭空编造内容的概率。
4.Chains 链路层：将检索、调模型、整理结果等多个固定步骤串联，一键自动完整执行整套流程。
5.Agents 智能体：AI 自主判断需求，自动选用搜索、计算等外部工具，无需手动设定执行步骤。
6.Callback 回调：全流程埋点记录日志、耗时与报错，用于开发调试和线上运行监控。
```

![image-20260630102612.png](../image/image-20260630102612.png)

# 2.大模型服务平台

```python
LangChain作为一个“工具”，依赖于第三方集成各种大模型。

有许多提供大模型API服务的平台，使用时只需要注册、充值并创建API-Key，之后即可使用API-Key与URL来调用平台提供的相应的模型的服务。
```

| 平台名称   | 官方访问地址                                                 | 核心定位                                                     |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| CloseAI    | https://platform.closeai-asia.com/                           | 海外大模型国内代理平台，提供 GPT、Claude 等海外主流模型的国内直连服务 |
| OpenRouter | [https://openrouter.ai/](https://link.wtturl.cn/?target=https%3A%2F%2Fopenrouter.ai%2F&scene=im&aid=497858&lang=zh) | 全球大模型聚合平台，一站式接入 300 + 全球主流闭源 / 开源大模型 |
| 阿里云百炼 | [https://bailian.console.aliyun.com/](https://link.wtturl.cn/?target=https%3A%2F%2Fbailian.console.aliyun.com%2F&scene=im&aid=497858&lang=zh) | 阿里云旗下国产大模型服务平台，以通义千问系列为核心，提供全链路 AI 开发能力 |
| 百度千帆   | [https://console.bce.baidu.com/qianfan/overview](https://link.wtturl.cn/?target=https%3A%2F%2Fconsole.bce.baidu.com%2Fqianfan%2Foverview&scene=im&aid=497858&lang=zh) | 百度旗下大模型服务平台，以文心一言系列为核心，深度适配百度生态与中文场景 |
| 硅基流动   | [https://www.siliconflow.cn/](https://link.wtturl.cn/?target=https%3A%2F%2Fwww.siliconflow.cn%2F&scene=im&aid=497858&lang=zh) | 国内开源大模型算力服务平台，主打开源大模型一键部署、低成本推理与定制化微调 |

# 3.入门案例

## 3.1.接入阿里百炼平台的通义模型

```python
登录阿里云账号，打开百炼控制台：https://bailian.console.aliyun.com/
```

### 3.1.1.获得Api-key并配置系统环境变量

#### 3.1.1.1.获得Api-key

```
1.进入密钥管理页面
左侧侧边栏找到 API - 密钥管理，点击进入。

2.创建 API Key
页面右上角点击 创建 API Key，弹窗填写密钥备注（如 “本地开发调试”），确认创建。

3.保存密钥
创建完成后页面会显示 sk- 开头的密钥字符串，立刻复制保存到本地 / 配置文件。

sk-ws-H.RXDHRED.O7gA.MEUCIQDiPlhAcIM4MIC1J0eHBBnP_V7dF8RsAqn6LzHr2BkYpvEaGgD5Qmx0SdNp7vXbM5yKtqgZcC28PLS
```

![image-20260630134046.png](../image/image-20260630134046.png)

#### 3.1.1.2.配置系统环境变量

```python
1.为什么配置系统环境变量?
  a.保护密钥：API 密钥不写进代码，上传代码不会泄露，避免被盗刷扣费
  b.全局复用：一次配置，电脑所有 Python 项目、终端都能直接读取，不用重复复制密钥
  c.切换环境方便：本地开发一套密钥，线上服务器单独配置，代码无需改动
    
2.如何配置系统环境变量?
  a.快捷键 Win+R，输入 sysdm.cpl 回车
  b.弹出窗口点【高级】→右下角【环境变量】
  c.在下方「系统变量」点击【新建】
    变量名：DASHSCOPE_API_KEY
    变量值：粘贴阿里云百炼 sk 开头密钥
  d.全部弹窗点确定保存
  e.打开终端（PowerShell）验证是否生效
    echo $env:DASHSCOPE_API_KEY
```

> 配置完如果pycharm正在使用，需要重新打开才会生效

### 3.1.2.获得模型名

```
1.顶部导航栏点击【模型】，进入【模型广场】页面
2.在精选模型区域，选择需要使用的通义模型（示例：Qwen3.7-Max / Qwen3.7-Plus），点击模型卡片进入详情页
3.在详情页找到「模型 Code」输入框，点击右侧复制按钮，复制完整模型标识（如 qwen3.7-max）

qwen3.7-plus
```

![image-20260630135520.png](../image/image-20260630135520.png)

![image-20260630135606.png](../image/image-20260630135606.png)

### 3.1.3.获得baseUrl开发地址

```python
1.顶部导航栏点击【文档】/【API 参考】
2.左侧找到「兼容 OpenAI 接口」栏目
3.页面内会标注兼容模式请求域名，复制上述地址作为 baseUrl

base_url：https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1
```

![image-20260630140056.png](../image/image-20260630140056.png)

## 3.2.安装依赖包

```python
想让当前虚拟环境以后默认走清华源，可先执行：
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
 
- 安装langchain
- 安装langchain-openai
- 安装openai
- 安装dotenv
- 安装langchain-core
- 安装langchain-deepseek

# langchain 提供核心框架（Chain, Agent, Memory, Retriever等） 
pip install langchain

# 提供OpenAI专用组件（LLM, Chat, Embeddings等），依赖 openai SDK
pip install langchain-openai
pip install openai

# 通过 python-dotenv 库读取 env 文件中的环境变量，并加载到当前运行的环境中
pip install python-dotenv

# 底层通用基础包，统一所有模型 / 组件标准接口，其他包都依赖它
pip install langchain-core

# 对接深度求索 DeepSeek 大模型，适配 LangChain 标准写法
pip install langchain-deepseek
```

## 3.3.代码实现

```python
# 1.导入依赖
import os
from langchain.chat_models import init_chat_model

# 2.实例化模型
model = init_chat_model(
    model="qwen3.7-plus", #模型名
    model_provider="openai", #用 OpenAI 标准接口协议来对接当前模型
    api_key=os.getenv("DASHSCOPE_API_KEY"), #配置在自己本地环境变量里的Api-key
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1" #baseUrl开发地址
)

# 3.调用模型
print(model.invoke("你是谁，50字内回复"))
```

# 4.动嘴编程-提示词

```python
1.提示词 = 给 AI 听的、口语化编程需求话术，靠打字说话指挥 AI 生成 / 调试代码。

2.提示词模板：

核心思路：分层结构化提示词（效果最优）
设计逻辑（教学原理）
身份定位：明确我是 Python LangChain 代码生成助手，只输出可运行完整代码；
硬性约束：指定使用init_chat_model、阿里云通义千问兼容 OpenAI 模式、固定参数；
代码规范要求：注释风格、变量命名、注释说明、代码结构分段；
输出格式限制：只给代码，附带极简解释，不冗余；
补充避坑规则：环境变量、接口地址、provider 固定值。


3.入门案例提示词:
    
【角色】你是专业LangChain Python代码生成助手，只输出完整可运行代码，附带少量行内注释与分段注释。
【需求】使用 langchain.chat_models.init_chat_model 实例化阿里云通义千问兼容OpenAI接口模型。
【强制固定参数，不可修改】
1. model名称："qwen3.7-max"
2. model_provider："openai"
3. api_key读取方式：os.getenv("DASHSCOPE_API_KEY")，注释说明密钥存本地环境变量
4. base_url固定地址：https://dashscope.aliyuncs.com/compatible-mode/v1
【代码结构要求】
1. 顶部导入os和init_chat_model
2. 分两段：第一段实例化模型，添加注释解释关键字参数；第二段调用invoke完成对话
3. invoke入参："你是谁，50字内回复"，打印.content
4. 注释清晰、代码整洁、分段换行规范
【输出要求】仅输出完整Python代码，不要多余文字，代码注释完整易懂
```

# 5.进阶案例

```python
1.要求：同时存在多种大模型产品在系统里共存使用

2.和之前接入阿里的模型一样，换别家大模型，必须改三样东西
  a.获得Api-key
  b.获得模型名
  c.获得baseUrl开发地址
    
3.直接改model="xx"就可以用别家大模型,为什么还要再配置多套共存呢？
  a.省钱、不宕机、发挥各模型优势、适配不同业务需求
```

## 5.1.接入DeepSeek大模型

```python
1.官网: https://platform.deepseek.com/usage
        
2.接入DeepSeek大模型和之前的接入阿里百炼平台的通义模型流程是一样的,具体过程这里不再赘述
  a.获得Api-key
  b.获得模型名
  C.获得baseUrl开发地址
```

## 5.2.案例提示词

```python
【角色】你是专业LangChain Python代码生成助手，只输出完整可运行代码，附带少量行内注释与分段注释。
【需求】使用 langchain.chat_models.init_chat_model 实例化阿里云通义千问兼容OpenAI接口模型。
【强制固定参数，不可修改】
1. model名称：一个py文件里定义两个model，一个是"qwen3.7-max"，另一个是deepseek-v4-pro
2. model_provider："openai"
3. 两个api_key读取方式：os.getenv("DASHSCOPE_API_KEY"),api_key=os.getenv("DEEPSEEK_API_KEY"),# 从环境变量配置中读取
4. 两个base_url固定地址：https://dashscope.aliyuncs.com/compatible-mode/v1，base_url="https://api.deepseek.com"
【代码结构要求】
1. 顶部导入os和init_chat_model
2. 分两段：第一段实例化模型，添加注释解释关键字参数；第二段调用invoke完成对话
3. invoke入参："你是谁，50字内回复"，打印.content
4. 注释清晰、代码整洁、分段换行规范
【输出要求】仅输出完整Python代码，不要多余文字，代码注释完整易懂
【其它要求】
同一个py文件里面，分别调用千问和deepseek两个模型
```

## 5.3.代码实现

```python
import os
from langchain.chat_models import init_chat_model

# ══════════════════════════════════════════════════════
# 1. 实例化两个模型（不同供应商）
# ══════════════════════════════════════════════════════

# —— 1a. 阿里云通义千问 qwen3.7-max ——
# 通过 OpenAI 兼容协议访问阿里云 DashScope 接入点
llm_qwen = init_chat_model(
    model="qwen3.7-max",                                # 通义千问最新旗舰模型
    model_provider="openai",                             # 使用 OpenAI 兼容接口
    api_key=os.getenv("DASHSCOPE_API_KEY"),                    # 密钥存本地环境变量
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",  # 阿里云接入点
    temperature=0,
)

# —— 1b. DeepSeek V4 Pro ——
# 通过 OpenAI 兼容协议访问 DeepSeek 官方 API
llm_deepseek = init_chat_model(
    model="deepseek-v4-pro",                             # DeepSeek 第四代旗舰
    model_provider="openai",                             # DeepSeek 同样兼容 OpenAI 协议
    api_key=os.getenv("DEEPSEEK_API_KEY"),                   # 从环境变量配置中读取
    base_url="https://api.deepseek.com",                 # DeepSeek 官方 API 地址
    temperature=0,
)

# ══════════════════════════════════════════════════════
# 2. 分别调用两个模型
# ══════════════════════════════════════════════════════

prompt = "你是谁，50字内回复"

print("=" * 60)
print("🤖 通义千问 qwen3.7-max 回复：")
resp_qwen = llm_qwen.invoke(prompt)
print(resp_qwen.content)

print("=" * 60)
print("🤖 DeepSeek V4 Pro 回复：")
resp_deepseek = llm_deepseek.invoke(prompt)
print(resp_deepseek.content)

print("=" * 60)

```

