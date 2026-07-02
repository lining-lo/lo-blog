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

# 6.Model I/O大模型接口

## 6.1.基本介绍

```python
1.介绍：Model = 大模型；I/O = Input 输入 + Output 输出，全称模型输入输出统一交互层，是 LangChain 和所有大模型对话的底层标准接口。

2.作用：屏蔽阿里云、DeepSeek、GPT 等各家 API 差异，一套写法调用所有模型。

3.核心组成(Prompts 管输入、Models 管调用、Parsers 管输出)：
  a.Prompt 输入格式化(Format)
    负责格式化输入给大模型固定角色、对话模板、变量填充统一生成各家模型都能识别的消息结构  
    
  b.Models 统一调用接口(Predict)
    就是你写的 init_chat_model / ChatOpenAI，统一 invoke() / stream() 调用方法，换厂商只改参数，调用代码不变。
    
  c.Output Parser 输出解析(Parse)
    把 AI 返回的纯文本，自动转 JSON、列表、对象，方便程序读取结构化数据。
    
4.核心好处：
  a.多模型无缝切换，不用重写调用逻辑
  b.统一输入输出规范，代码复用性高
  c.自带提示词管理、结构化输出工具
  d.支持同步 invoke、异步 ainvoke、流式 stream 统一写法
```

## 6.2.Model I/O的分类

```
LangChain中将大语言模型分为以下几种，我们主要使用的是聊天对话模型
```
| 模型分类                   | 输入格式                                                     | 输出格式           | 核心特性                                                     | 业务适用场景                                                 |
| -------------------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| LLM 基础文本模型           | 纯文本字符串                                                 | 纯文本字符串       | 1.初代基础生成模型<br>2.无角色区分，不自带上下文记忆<br>3.轻量、响应速度快 | 单轮简短问答、文本摘要、文案扩写、简单指令执行               |
| ChatModel 对话模型（主流） | 结构化消息列表<br>`[SystemMessage, HumanMessage, AIMessage]` | AIMessage 对话对象 | 1.专为多轮对话设计<br>2.支持人设、历史对话上下文<br>3.兼容工具调用、Agent开发 | 智能客服、多轮深度问答、代码推理、LangChain Agent开发（当前代码使用类型） |
| Embeddings 向量模型        | 单个文本 / 文本列表                                          | 浮点数字向量数组   | 1.不生成自然语言文本<br>2.将文字转为语义向量，用于相似度计算 | RAG知识库问答、文档检索、文本聚类、内容推荐系统              |

## 6.3.Model I/O的参数

### 6.3.1.初始化必填参数

| 参数名         | 作用说明                       | 取值示例                                                     |
| -------------- | ------------------------------ | ------------------------------------------------------------ |
| model          | 指定调用的模型名称             | "qwen3.7-max"、"deepseek-v3"                                 |
| model_provider | 声明接口协议标准               | "openai"（兼容 OpenAI 接口统一填这个）                       |
| api_key        | 接口鉴权密钥，读取本地环境变量 | os.getenv("DEEPSEEK_API_KEY")                                |
| base_url       | 厂商兼容接口网关地址           | 阿里云：[https://dashscope.aliyuncs.com/compatible-mode/v1](https://link.wtturl.cn/?target=https%3A%2F%2Fdashscope.aliyuncs.com%2Fcompatible-mode%2Fv1&scene=im&aid=497858&lang=zh) |

### 6.3.2.生成控制可调参数

| 参数名            | 取值范围   | 功能说明                                              | 适用场景推荐值                      |
| ----------------- | ---------- | ----------------------------------------------------- | ----------------------------------- |
| temperature       | 0 ~ 2      | 控制回答随机创造性；值越低越严谨固定，越高越天马行空  | 代码 / 推理：0~0.3文案创作：0.7~1.2 |
| max_tokens        | 正整数     | 限制 AI 单次回复最大 token 长度，防止超长输出         | 日常对话：512 / 长文档：2048        |
| top_p             | 0 ~ 1      | 核采样，只选取概率总和前 top_p 的词汇；越小输出越规整 | 专业问答：0.2~0.4创意写作：0.8~0.9  |
| stop              | 字符串列表 | 自定义停止标记，AI 识别到该词立刻终止输出             | stop=["###","结束回答"]             |
| frequency_penalty | -2 ~ 2     | 抑制重复高频词汇，正数减少重复                        | 长文本写作：0.1~0.5                 |
| presence_penalty  | -2 ~ 2     | 鼓励引入全新词汇，正数拓展内容多样性                  | 扩写、多方案生成：0.2~0.6           |

### 6.3.3.案例演示

```python
import os
from langchain.chat_models import init_chat_model

# ====================== 1. 初始化必填参数（缺一不可） ======================
chat_model = init_chat_model(
    # 必填1：模型名称
    model="deepseek-v4-pro",
    # 必填2：接口协议类型，兼容OpenAI统一填openai
    model_provider="openai",
    # 必填3：密钥，读取系统环境变量
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    # 必填4：厂商接口地址
    base_url="https://api.deepseek.com",

    # ====================== 2. 生成控制可调参数（按需修改） ======================
    temperature=0.1,        # 低随机性，适合写代码、专业问答
    max_tokens=1024,        # 限制最大输出长度
    top_p=0.3,              # 只选用高概率文字，回答严谨
    frequency_penalty=0.2,  # 减少语句重复
    stop=["结束回答"]        # 遇到指定文字立刻停止生成
)

# 调用测试
res = chat_model.invoke("写一段读取环境变量的Python代码")
print(res.content)
```

## 6.4.Model I/O的返回

```python
1.ChatModel 调用model.invoke()返回的是 AIMessage 对象，包含多类信息。

2.返回示例：
content='我是DeepSeek，由深度求索公司创造的AI助手。纯文本模型，支持文件上传和长上下文，免费使用，可通过官网或App体验。' additional_kwargs={'refusal': None} response_metadata={'token_usage': {'completion_tokens': 121, 'prompt_tokens': 10, 'total_tokens': 131, 'completion_tokens_details': {'accepted_prediction_tokens': None, 'audio_tokens': None, 'reasoning_tokens': 86, 'rejected_prediction_tokens': None}, 'prompt_tokens_details': {'audio_tokens': None, 'cached_tokens': 0}, 'prompt_cache_hit_tokens': 0, 'prompt_cache_miss_tokens': 10}, 'model_provider': 'openai', 'model_name': 'deepseek-v4-pro', 'system_fingerprint': 'fp_9954b31ca7_prod0820_fp8_kvcache_20260402', 'id': '584b32a4-3630-4166-b048-2a13e965998c', 'finish_reason': 'stop', 'logprobs': None} id='lc_run--019f1889-75d6-7a60-850e-559d463fd1d8-0' tool_calls=[] invalid_tool_calls=[] usage_metadata={'input_tokens': 10, 'output_tokens': 121, 'total_tokens': 131, 'input_token_details': {'cache_read': 0}, 'output_token_details': {'reasoning': 86}}
```

| 字段               | 含义说明                                         | 业务用途                                           |
| ------------------ | ------------------------------------------------ | -------------------------------------------------- |
| content            | AI 输出的完整文本内容                            | 页面展示、业务回复，最常用                         |
| additional_kwargs  | 厂商额外返回扩展字段，如拒绝回答标记、引用溯源等 | 判断模型是否拒绝回答（refusal 不为空代表违规拦截） |
| response_metadata  | 模型底层请求完整元数据                           | 统计 token 消耗、记录使用模型、判断停止原因        |
| id                 | LangChain 内部消息唯一 ID                        | 日志追踪、区分多轮消息                             |
| tool_calls         | 模型工具调用列表                                 | Agent 场景，模型需要调用函数时存放工具参数         |
| invalid_tool_calls | 格式错误的工具调用                               | 调试 Agent，定位工具调用格式异常                   |
| usage_metadata     | 标准化 token 用量（LangChain 统一封装）          | 统一统计输入 / 输出 / 推理 token，跨厂商兼容       |

## 6.5.接入大模型

### 6.5.1.接入OPENAI

```
1.OPENAI 有 ChatOpenAI 和 init_chat_model 两种接入方式，两者定位、功能场景差异显著，无绝对优劣，需根据业务需求选择

2.ChatOpenAI 是 OpenAI 专属底层封装；init_chat_model 是顶层通用工厂，多模型统一适配入口。
```

| 维度         | ChatOpenAI                                      | init_chat_model                                            |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------- |
| 适配范围     | 仅原生 OpenAI                                   | OpenAI、DeepSeek、阿里云百炼、智谱等全兼容 OpenAI 接口厂商 |
| 代码改动成本 | 切换厂商必须修改导入、类名、参数结构            | 切换厂商仅修改 4 项参数，调用逻辑完全不变                  |
| 适合项目规模 | 小型脚本、单模型 Demo、仅使用 OpenAI 的极简项目 | 中大型工程、多模型共存、容灾切换、模型评测系统             |
| 代码简洁度   | 单 OpenAI 场景代码更短，无需传`model_provider`  | 多厂商场景代码高度复用，配置集中管理                       |
| 底层关系     | 基础实现单元                                    | 内部自动调用 ChatOpenAI 等各类厂商专用类                   |

#### 6.5.1.1.方式1_ChatOpenAI

```python
# 1.导入依赖
import os
from langchain_openai import ChatOpenAI

# 2.实例化模型
model = ChatOpenAI(
    model="qwen3.7-max",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

# 3.调用模型
print(model.invoke("你是谁").content)
```

#### 6.5.1.2.方式2_init_chat_model

```python
# 1.导入依赖
import os
from langchain.chat_models import init_chat_model

# 2.实例化模型
model = init_chat_model(
    model="qwen3.7-max",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 3.调用模型
print(model.invoke("你是谁").content)
```

### 6.5.2.接入DeepSeek

```python
# 1.导入依赖
import os
from langchain_deepseek import ChatDeepSeek


# 2.实例化模型
model = ChatDeepSeek(
    model="deepseek-v4-pro", 
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com", 
)

# 打印结果
print(model.invoke("你是谁").content)
```

> 也可以用 init_chat_model ，市面上所有主流大模型，全部都可以用 `init_chat_model` 接入

# 7.Ollama本地大模型部署

## 7.1.基本介绍

```python
1.介绍：Ollama 是开源、免费的本地大模型管理运行工具，类似 Docker，一键在电脑本地跑各类开源大模型，屏蔽底层复杂编译、环境、显存优化等技术细节。

2.一句话概括：不用租云端、不用付费 API，在自己 Windows/Mac/Linux 电脑离线跑各种 AI 大模型。

3.核心特点：
  a.极简一键部署
    一条命令下载、启动模型，自动做量化、GPU 加速、内存调度，不用手动转换模型文件、配置 CUDA 环境
    
  b.完全本地离线，隐私极强
    所有提问、文档数据只在本机处理，不上传第三方云端，适合企业内部资料、敏感文件分析。
    
  c.跨平台 + 自动硬件加速
    支持 Windows/macOS/Linux；自动识别 N 卡、AMD 显卡、苹果 M 系列芯片，低配电脑也能跑轻量化量化模型。
    
  d.海量开源模型全覆盖
    官方库支持：Llama3、通义 Qwen、DeepSeek、Mistral、Gemma、LLaVA 多模态看图模型等几十种主流开源模型。
    
  e.兼容标准 OpenAI 接口（开发重点）
    本地服务地址：http://localhost:11434/v1，完全复刻 OpenAI 对话 API 协议
            
  f.完整模型生命周期管理
    命令行管理本地模型：下载、查看、删除、监控运行占用资源

4.官方地址：https://ollama.com/
```

## 7.2.安装Ollama

### 7.2.1.下载安装包

```python
前往官网下载安装包：https://ollama.com/download
```

![image-20260630224843.png](../image/image-20260630224843.png)

### 7.2.2.自定义安装

```
1.确认安装包 OllamaSetup.exe 的位置（这里我存放在 D 盘 D:\）

2.D 盘新建 2 个文件夹（提前建好，不要中文 / 空格）
  程序目录：D:\Ollama（放软件本体）
  模型目录：D:\ollama_models（存放下载的大模型，重点）

3.Win+R，输入 cmd，右键以管理员身份运行
  a.切换到安装包所在 D 盘目录  ->   cd /d D:\
  b.执行自定义安装命令，指定安装到 D:\Ollama  ->   OllamaSetup.exe /DIR="D:\Ollama"
  
4.弹出安装窗口直接点 Install，等待安装完成

5.配置模型存储到 D 盘
  a.Win+R 输入 sysdm.cpl 回车，打开【系统属性】
  b.顶部切换【高级】→ 右下角【环境变量】
  c.在下方系统变量区域，点击【新建】
    变量名：OLLAMA_MODELS（必须全大写）
	变量值：D:\ollama_models
  d.所有弹窗依次点【确定】保存全部配置

6.重启 Ollama 使配置生效
  a.右下角托盘找到羊驼 Ollama 图标，右键点击 Quit Ollama 完全退出
  b.开始菜单重新打开 Ollama，启动服务

6.验证是否全部生效
  a.新开 CMD 输入  ->   where ollama  ->   输出路径开头为 D:\Ollama 即程序安装成功
  b.拉取一个小模型测试  ->   ollama pull qwen2.5:latest  ->   D:\ollama_models 内有文件即成功
```

## 7.3.Ollama常用指令

### 7.3.1.模型下载与拉取

```shell
# 拉取模型（核心下载命令）
ollama pull qwen2.5:latest

# 国内加速拉取（modelscope镜像）
ollama pull modelscope.cn/Qwen/Qwen2.5-7B-Instruct-GGUF

# 查看模型支持的所有量化版本
ollama list qwen2.5
```

### 7.3.2.本地模型管理

```shell
# 查看本机已下载全部模型
ollama list

# 删除指定模型，释放磁盘空间
ollama rm qwen3:1.7b

# 复制模型（自定义标签）
ollama cp qwen2.5:latest myqwen

# 查看模型详情（大小、参数、量化信息）
ollama show qwen2.5:latest
```

### 7.3.3.本地对话运行

```shell
# 交互式命令行对话
ollama run qwen2.5:latest

# 单次提问直接输出结果（不进入交互）
ollama run qwen2.5:latest "写一段Python冒泡排序代码"

# 退出交互对话界面
>>> /bye
```

### 7.3.4.运行监控与进程

```shell
# 查看当前正在加载/运行的模型（占用内存）
ollama ps

# 停止所有正在运行的模型，释放内存
ollama stop all

# 停止指定模型
ollama stop qwen2.5:latest
```

### 7.3.5.服务与基础信息

```shell
# 查看Ollama版本
ollama --version

# 手动启动后台服务（一般安装后自动常驻）
ollama serve

# 查看帮助文档
ollama help
```

## 7.4.整合Ollama调用本地大模型

```python
# pip install -qU langchain-ollama
# pip install -U ollama

from langchain_ollama import ChatOllama

# 设置本地模型，不使用深度思考
model = ChatOllama(base_url="http://localhost:11434", model="qwen2.5:latest", reasoning=False)
# 打印结果，
print(model.invoke("什么是LangChain，100字以内回答").content)
```

> 如果使用 init_chat_model 的方式接入则不需要安装 ollama 、langchain-ollama

# 8.Prompt提示词

## 8.1.基本介绍

```python
Prompt 指的是你发给大模型的全部输入内容，是 AI 唯一能看懂的指令 / 对话内容。

不管是一句文字、还是一堆角色消息组合，只要是丢给 model.invoke() 的输入，全都叫 Prompt。
```

## 8.2.Prompt演化历程

```python
1.Prompt 的 3 个进化阶段：纯字符串 Prompt -> 带占位符的 PromptTemplate -> 多角色消息 Prompt

2.第一代：纯字符串 Prompt（最简单）
  直接写一段话发给 AI，没有变量、没有角色。
    
  # 引号里这一整段，就是一个完整 Prompt
  res = model.invoke("用100字讲清楚什么是LangChain")
    
3.第二代：带占位符的 PromptTemplate（模板，半成品）
  模板里写 {变量} 留空，运行时填内容，模板本身不是 Prompt。
  模板半成品：你是{职业}，讲解{知识点}
  填充变量后 → 生成完整 Prompt（成品）：你是编程老师，讲解LangChain
  流程：模板填充变量 → 产出 Prompt → 调用模型

4.第三代：多角色消息 Prompt（聊天专用）
  不再只用一段文字，分成不同身份消息拼在一起，整体组合叫 Prompt。
    
  # 整个列表合在一起，才是完整对话Prompt
  prompt = [
    SystemMessage("你是Python讲师，回答简短"),
    HumanMessage("什么是Prompt？")
  ]
  model.invoke(prompt)
```

> 多角色消息 Prompt 分为 4 种角色消息
>
> 1. `SystemMessage` 系统消息：给 AI 定身份、规矩
> 2. `HumanMessage` 用户消息：我们人的提问
> 3. `AIMessage` AI 消息：上一轮 AI 回答的内容
> 4. `ToolMessage` 工具消息：调用函数后返回的结果

# 9.模型调用方法

```python
模型调用方法是把写好的 Prompt 发给本地大模型，拿到 AI 回答的函数，分为普通调用、流式调用、批处理三大类，每类都有同步、异步两种实现，带前缀 a 代表异步。
```

## 9.1.普通调用

```
一次性出完整答案
```

### 9.1.1.同步普通调用_invoke 

```python
只发 1 个问题，程序停下等 AI 全部写完，一次性把全文给你。

# 1.导入依赖
import os
from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, SystemMessage

# 2.实例化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 构建消息列表
messages = [
    SystemMessage(content="你是一个法律助手，只回答法律问题，超出范围的统一回答，非法律问题无可奉告"),
    # HumanMessage(content="简单介绍下广告法，一句话告知50字以内")
    HumanMessage(content="2+3等于几?")
]

# 3.调用模型
response = model.invoke(messages)
print(f"响应类型：{type(response)}")
# 打印结果
print(response.content)
print(response.content_blocks)
```

### 9.1.2.异步普通调用_ainvoke 

```python
发 1 个问题，程序不用等着，可以同时干别的，适合网站接口。

# 1.导入依赖
import os
from langchain.chat_models import init_chat_model
import asyncio

# 2.实例化模型
model = init_chat_model(
    model="qwen3.7-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)


async def main():
    # 异步调用一条请求
    response = await model.ainvoke("解释一下LangChain是什么，简洁回答100字以内")
    print(f"响应类型：{type(response)}")
    print(response.content_blocks)


# 4.运行异步函数
if __name__ == "__main__":
    asyncio.run(main())
```

## 9.2.流式调用

```
打字机效果，一字一字蹦出来
```

### 9.2.1.同步流式调用_stream 

```python
AI 写一点，立刻返回一点，不用等全部写完，聊天框实时展示。

# 1.导入依赖
import os
from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, SystemMessage

# 2.实例化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 构建消息列表
messages = [
    SystemMessage(content="你叫小问，是一个乐于助人的AI人工助手"),
    HumanMessage(content="你是谁")
]

# 3.流式调用大模型
response = model.stream(messages)
print(f"响应类型：{type(response)}")  # 响应类型：<class 'generator'>
# 流式打印结果
for chunk in response:
    # 刷新缓冲区 (无换行符，缓冲区未刷新，内容可能不会立即显示)
    print(chunk.content, end="", flush=True)
print("\n")
```

### 9.2.2.异步流式调用_astream 

```python
一边逐字输出，一边不阻塞程序，做网页聊天后端用。

# 1.导入依赖
import os
import asyncio
from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, SystemMessage

# 2.实例化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 构建消息列表
messages = [
    SystemMessage(content="你叫小问，是一个乐于助人的AI人工助手"),
    HumanMessage(content="你是谁")
]


# 3.异步流式调用大模型（定义异步函数）
async def async_stream_call():
    # astream 返回异步生成器，无需 await 修饰，直接赋值
    response = model.astream(messages)
    print(f"响应类型：{type(response)}")  # 响应类型：<class 'async_generator'>

    # 异步遍历异步生成器（必须使用 async for，不可用普通 for）
    async for chunk in response:
        # 刷新缓冲区，实现流式打印（无换行、即时输出）
        print(chunk.content, end="", flush=True)
    print("\n")


# 4.运行异步函数
if __name__ == "__main__":
    asyncio.run(async_stream_call())
```

## 9.3.批处理调用

```
一次性批量问好多个问题
```

### 9.3.1.同步批处理调用_batch 

```python
一次性丢一堆问题给 AI，批量一起算，适合批量文案、批量总结。

# 1.导入依赖
import os
from langchain.chat_models import init_chat_model

# 2.实例化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 问题列表
questions = [
    "什么是redis?简洁回答，字数控制在100以内",
    "Python的生成器是做什么的？简洁回答，字数控制在100以内",
    "解释一下Docker和Kubernetes的关系?简洁回答，字数控制在100以内"
]

# 批量调用大模型 model.batch()
response = model.batch(questions)
print(f"响应类型：{type(response)}")
print()
for q, r in zip(questions, response):
    print(f"问题：{q}\n回答：{r.content}\n")
```

### 9.3.2.异步批处理调用_abatch 

```python
批量提问 + 不阻塞程序，大批量数据处理用。

# 1.导入依赖
import os
import asyncio
from langchain.chat_models import init_chat_model

# 2.实例化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

questions = [
    "什么是redis?简洁回答，字数控制在100以内",
    "Python的生成器是做什么的？简洁回答，字数控制在100以内",
    "解释一下Docker和Kubernetes的关系?简洁回答，字数控制在100以内"
]


# 3.异步批量调用大模型
async def async_batch_call():
    # 调用 model.abatch() 异步批量处理请求，需用 await 修饰
    response = await model.abatch(questions)
    print(f"响应类型：{type(response)}")

    # 遍历结果并格式化输出（与原来的同步版本格式一致）
    for q, r in zip(questions, response):
        print(f"问题：{q}\n回答：{r.content}\n")


# 4.运行异步函数
if __name__ == "__main__":
    asyncio.run(async_batch_call())
```

# 10.PromptTemplate 提示词模板

## 10.1.基本介绍

```python
1.概述：带 {变量名} 占位符的文本模板，属于半成品提示词，不能直接发给大模型调用

2.作用：一套固定话术重复复用，只替换里面动态内容，不用每次手写完整 Prompt

3.和 Prompt 区别：
  a.PromptTemplate：带{变量}，半成品，不可直接 model.invoke()
  b.填充完变量、无占位符的完整文本，成品，可直接丢给模型
```

## 10.2.文本提示词模板_PromptTemplate

```python
单轮纯文字提示词模板，里面用{变量}占位，是半成品，不能直接丢给模型。
填充变量后生成完整 Prompt（成品），才能调用模型。
```

### 10.2.1.使用构造方法创建

```python
import os

from langchain.chat_models import init_chat_model
from langchain_core.prompts import PromptTemplate

model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

template = PromptTemplate(
    template="你是一个专业的{role}工程师，请回答我的问题给出回答，我的问题是：{question}",
    input_variables=['role', 'question']
)

prompt = template.format(role="python开发", question="冒泡排序怎么写,只要代码其它不要，简洁")
print(prompt) 

result = model.invoke(prompt)
print(result.content)
```

### 10.2.2.使用 from_template 静态方法创建

```python
import os
from langchain.chat_models import init_chat_model
from langchain_core.prompts import PromptTemplate

model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

template = PromptTemplate.from_template("你是一个专业的{role}工程师，请回答我的问题给出回答，"
                                        "我的问题是：{question}")

prompt = template.format(role="python开发", question="快速排序怎么写？")
print(prompt)

result = model.invoke(prompt)
print(result.content)
```

## 10.3.对话提示词模板_ChatPromptTemplate

```python
ChatPromptTemplate 专门做多轮角色对话，可以分开定义系统、用户、AI 消息，对应之前学的 SystemMessage、HumanMessage、AIMessage。
```

### 10.3.1.使用使用构造方法创建

```python
from langchain_core.prompts import ChatPromptTemplate
import os
from langchain.chat_models import init_chat_model

model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# tuple 构成的列表，格式为[(role, content)]
chatPromptTemplate = ChatPromptTemplate(
    [
        ("system", "你是一个AI开发工程师，你的名字是{name}。"),
        ("human", "你能帮我做什么?"),
        ("ai", "我能开发很多{thing}。"),
        ("human", "{user_input}"),
    ]
)

prompt = chatPromptTemplate.format_messages(
    name="小狸AI", thing="AI", user_input="7 + 5等于多少"
    )
print(prompt)

result = model.invoke(prompt)
print(result.content)
```

### 10.3.2.使用 from_messages 静态方法创建

```python
import os
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate

model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

chat_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "你是一个{role}，请回答我提出的问题"),
        ("human", "请回答:{question}")
    ]
)

prompt_value = chat_prompt.format_messages(role="老师", question="你的职业和特长")
print(prompt_value)

result = model.invoke(prompt_value)
print(result.content)
```

## 10.4.外部加载Prompt

```python
可以将 prompt 保存为 JSON 或者 YAML 等格式的文件，通过读取指定路径的格式化文件，获取相应的 prompt。这样方便对 prompt 进行管理和维护
```

### 10.4.1.外部加载_JSON

创建 prompt.json 文件

```
{
    "_type": "prompt",
    "input_variables": ["name", "what"],
    "template": "请{name}讲一个{what}的故事"
}
```

创建 PromptLoadByJson.py 文件

```python
import json
from langchain_core.prompts import PromptTemplate

# 读取prompt配置
with open("prompt.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 手动实例化PromptTemplate，完全规避beta序列化接口
template = PromptTemplate(
    input_variables=data["input_variables"],
    template=data["template"]
)

res = template.format(name="张三", what="搞笑的")
print(res)
```

### 10.4.2.外部加载_YAML

创建 prompt.yaml 文件

```yaml
_type: "prompt"
input_variables: ["name", "what"]
template: "请{name}讲一个{what}的故事"

# 提示词模板类型，团队统一模板文件规范：一律带上 _type，兼容所有加载方式，避免后期切换接口出问题。
#_type: prompt
## 动态变量列表
#input_variables:
#  - name
#  - what
## 提示词正文
#template: "请{name}讲一个{what}的故事"
```

创建 PromptLoadByYaml.py 文件

```python
from langchain_core.prompts import load_prompt

template = load_prompt("prompt.yaml", encoding="utf-8")
print(template.format(name="年轻人", what="滑稽"))
# 请年轻人讲一个滑稽的故事

#
# import yaml
# from langchain_core.prompts import PromptTemplate
#
# # 读取yaml文件，指定utf-8编码
# with open("prompt.yaml", "r", encoding="utf-8") as f:
#     prompt_config = yaml.safe_load(f)
#
# # 手动实例化标准PromptTemplate对象，彻底规避不稳定序列化接口
# prompt_template = PromptTemplate(
#     input_variables=prompt_config["input_variables"],
#     template=prompt_config["template"]
# )
# # 填充变量并打印结果
# result = prompt_template.format(name="年轻人", what="滑稽")
# print(result)
#
```

# 11.Parser输出解析器

## 11.1.基本介绍

```python
1.介绍：输出解析器 Parser 专门处理大模型返回的内容，解决 AI 输出文本杂乱、程序无法直接读取数据的问题的 LangChain 的配套工具

2.输出解析器 = 规定 AI 输出格式 + 将 AI 文本转为程序可直接读取的数据

3.两大核心功能：
  a.约束 AI 输出格式
    通过 get_format_instructions() 生成格式规则，嵌入提示词，告诉模型必须按照指定规范（JSON / 逗号列表等）返回内容
    
  b.文本转结构化数据
    通过 parse() 方法，把 AI 返回的纯文字自动转换成 Python 能直接使用的数据：字符串、字典、列表
    
```

## 11.2.输出解析器分类

| 解析器类型            | 核心作用                 | 输出类型          | 适用场景                       |
| --------------------- | ------------------------ | ----------------- | ------------------------------ |
| StrOutputParser       | 提取模型纯文本回答       | 字符串            | 仅需要自由文字，无结构化需求   |
| JsonOutputParserr     | 解析标准 JSON 文本       | 字典              | 多字段结构化数据，日常开发首选 |
| PydanticOutputParserr | 基于实体模型，带类型校验 | 字典 / 实体对象   | 对字段、数据类型有严格规范要求 |
| ListOutputParser      | 拆分文本为数组列表       | Python 列表       | 获取多条关键词、条目           |
| DatetimeOutputParser  | 解析日期时间文本         | 时间对象          | 需要提取标准时间格式数据       |
| BooleanOutputParser   | 识别真假类回答           | 布尔值 True/False | 是非判断、选择题结果提取       |

## 11.3.输出解析器两大方法

### 11.3.1.parse

```python
# 写法A（手动调用parse）
response = parser.parse(result.content)

# 写法B（invoke自动封装parse，和写法A效果一模一样）
response = parser.invoke(result)
```

### 11.3.2.get_format_instructions

```python
# 方式1：format 动态拼接
prompt = PromptTemplate.from_template("回答问题：{q}\n{format_tip}")
prompt_val = prompt.format(
    q="秦始皇功绩",
    format_tip=parser.get_format_instructions()
)

#===============================================

# 方式2：partial_variables 提前注入模板（推荐）
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

# 1. 定义输出结构
class Info(BaseModel):
    name: str
    desc: str

# 2. 初始化解析器
parser = JsonOutputParser(pydantic_object=Info)

# 3. get_format_instructions() 获取格式规则，partial_variables注入
prompt = PromptTemplate(
    template="回答问题：{q}\n输出要求：{format_tip}",
    input_variables=["q"],
    partial_variables={"format_tip": parser.get_format_instructions()}
)
```

## 11.4.常用输出解析器用法

### 11.4.1.字符串解析器_StrOutputParser

```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import os
from langchain.chat_models import init_chat_model
from loguru import logger

# 创建聊天提示模板，包含系统角色设定和用户问题输入
chat_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "你是一个{role}，请简短回答我提出的问题"),
        ("human", "请回答:{question}")
    ]
)

# 使用指定的角色和问题生成具体的提示内容
prompt = chat_prompt.invoke({"role": "AI助手", "question": "什么是LangChain，简洁回答100字以内"})
logger.info(prompt)

# 初始化聊天模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 调用模型获取回答结果
result = model.invoke(prompt)
logger.info(f"模型原始输出:\n{result}")
# 创建字符串输出解析器，用于解析模型返回的结果
parser = StrOutputParser()

# 打印解析后的结构化结果
response = parser.invoke(result)
logger.info(f"解析后的结构化结果:\n{response}")
logger.info("\n")
# 打印类型
logger.info(f"结果类型: {type(response)}")
```

### 11.4.2.Json解析器_JsonOutputParser

#### 11.4.2.1.用法1

```python
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
import os
from langchain.chat_models import init_chat_model
from loguru import logger

# 创建聊天提示模板，包含系统角色设定和用户问题输入
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}，请简短回答我提出的问题，结果返回json格式，q字段表示问题，a字段表示答案。"),
    ("human", "请回答:{question}")
])

# 使用指定的角色和问题生成具体的提示内容
prompt = chat_prompt.invoke({"role": "AI助手", "question": "什么是LangChain，简洁回答100字以内"})
logger.info(prompt)

print()

# 初始化模型
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 调用模型获取回答结果
result = model.invoke(prompt)
logger.info(f"大模型原始输出，直接返回的原始素材:\n{result}")
print()
print("*" * 60)

# 创建JSON输出解析器实例
parser = JsonOutputParser()
# 调用解析器处理结果数据，将输入转换为JSON格式的响应
response = parser.invoke(result)

print()
logger.info(f"JsonOutputParser解析后的结构化结果:\n{response}")
logger.info("\n")
# 打印类型
logger.info(f"结果类型: {type(response)}")  # <class 'dict'>
```

#### 11.4.2.2.用法2

```python
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
import os
from langchain.chat_models import init_chat_model
from loguru import logger
from pydantic import BaseModel, Field

class Person(BaseModel):
    """
    定义一个新闻结构化的数据模型类
    属性:
        time (str): 新闻发生的时间
        person (str): 新闻涉及的人物
        event (str): 发生的具体事件
    """
    time: str = Field(description="时间") #
    person: str = Field(description="人物")
    event: str = Field(description="事件")

# 创建JSON输出解析器，用于将model输出解析为Person对象
parser = JsonOutputParser(pydantic_object=Person)

# 获取格式化指令，告诉model如何输出符合要求的JSON格式
format_instructions = parser.get_format_instructions()

# 创建聊天提示模板，定义系统角色和用户输入格式
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个AI助手，你只能输出结构化JSON数据。"),
    ("human", "请生成一个关于{topic}的新闻。{format_instructions}")
])

# 格式化提示词，填入具体主题和格式化指令
prompt = chat_prompt.format_messages(
    topic="小米su7跑车", format_instructions=format_instructions)

# 记录格式化后的提示词信息
logger.info(prompt)


# 初始化大语言模型实例
model = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("aliQwen-api"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# # 调用大语言模型获取响应结果
result = model.invoke(prompt)

# 记录模型返回的结果
logger.info(f"模型原始输出:\n{result}")

# 使用解析器将模型输出解析为结构化数据
response = parser.invoke(result)
logger.info(f"解析后的结构化结果:\n{response}")

# 打印类型
logger.info(f"结果类型: {type(response)}")
```

# 12.TypedDict类型注解工具

## 12.1.基本介绍

```python
1.作用:
  a.给字典结构做类型标注，限定字典有哪些 key、每个 key 是什么类型
  b.配合 Annotated 给字段加文字说明，供大模型结构化输出识别
  c.轻量化，只做静态提示，无运行时数据校验（区别 Pydantic BaseModel）

2.导入：from typing import TypedDict, Annotated

3.基础语法:
    
  # 定义字典结构
  class Student1(TypedDict):
    name: str,
    age: int   

  # Annotated[类型, "字段描述"]：替代 Pydantic Field，给模型看注释
  class Student2(TypedDict):
    name: Annotated[str, "学生姓名"]
    age: Annotated[int, "学生年龄"]     
```

## 12.2.TypedDict VS BaseModel

| 对比项   | TypedDict                 | BaseModel                                |
| -------- | ------------------------- | ---------------------------------------- |
| 运行校验 | 无                        | 有（类型、长度、默认值）                 |
| 字段注释 | `Annotated[str, "说明"]`  | `Field(description="说明")`              |
| 返回结果 | 普通 dict                 | Pydantic 对象，需 `.model_dump()` 转字典 |
| 体积     | 轻量，仅类型提示          | 功能完整，较重                           |
| 适用场景 | 简单 JSON、快速结构化输出 | 正式业务、需要严格数据校验               |

## 12.3.使用案例

```python
import os
from typing import TypedDict, Annotated
from langchain.chat_models import init_chat_model

llm = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

class Animal(TypedDict):
    animal: Annotated[str, "动物"]
    emoji: Annotated[str, "表情"]

class AnimalList(TypedDict):
    animals: Annotated[list[Animal], "动物与表情列表"] # List<Animal>

messages = [
    {"role": "user",
     "content": "任意生成三种动物，以及他们的 emoji 表情"}
]

llm_with_structured_output = llm.with_structured_output(AnimalList)
resp = llm_with_structured_output.invoke(messages)
print(resp)

```

# 13.LCEL链式调用

## 13.1.Runnable

```python
1.介绍：Runnable 是一套统一标准接口，让提示词、模型、解析器、自定义函数拥有一模一样的调用能力，支撑 LCEL | 管道链式编程。

2.没有 Runnable 之前的痛点（各组件调用方法混乱）
  a.提示模板：.format() / .format_messages() 渲染占位符
  b.大模型：.invoke() 发起请求
  c.输出解析器：.parse() 提取、转换文本
  d.工具：.run() 执行工具逻辑

  # 传统写法（每个步骤写法不一样，参数格式不互通，复杂链路写大量临时变量。）
  # 1. 手动渲染提示词
  prompt_msg = prompt.format_messages({"topic": "AI"})
  # 2. 把渲染后的消息传给模型
  llm_out = model.invoke(prompt_msg)
  # 3. 手动取出content，再丢给parse
  result = parser.parse(llm_out.content)
    
3.Runnable 核心解决方案(标准化统一接口)

  LangChain 给所有组件（模板、模型、解析器、完整链条、自定义函数）强制实现一套完全相同的方法集合：
  invoke / stream / batch / ainvoke / astream / abatch

  # 使用 Runnable （不管你手里是提示词、模型、解析器还是整条链，调用语法完全一致）
  # 提示模板（Runnable）
  prompt.invoke({"topic": "AI"})
  # 大模型（Runnable）
  model.invoke(prompt_value)
  # 解析器（Runnable）
  parser.invoke(ai_message)
  # 拼接后的完整链路（依然是Runnable）
  chain.invoke({"question": "你好"})
```

## 13.2.LCEL

```python
1.LCEL 全称 LangChain Expression Language , LangChain 表达式语言

2.LCEL 就是用 | 管道拼接所有 Runnable，一行代码组装完整大模型业务流程，统一调用、简化代码的表达式。

3.管道 | 运行规则（A | B）
  a.先执行 A.invoke(输入)，拿到 A 的输出
  b.自动把 A 的输出作为入参，传给 B.invoke()
  c.拼接后的整体是 RunnableSequence，依然属于 Runnable，支持无限继续拼接、复用

4.解决什么痛点
  不用分步写一堆临时变量、手动传递中间结果，把多步流程声明式写成一条链

  # 老式分步写法（手动处理中间变量，代码繁琐）
  prompt_out = prompt.invoke({"topic": "编程"})
  model_out = model.invoke(prompt_out)
  result = output_parser.invoke(model_out)

  # LCEL 写法（统一调用、简化代码）
  # 三个全是 Runnable，管道串联
  chain = prompt | model | output_parser
  # 整条链也是 Runnable，统一用 invoke 执行
  result = chain.invoke({"topic": "编程"})
```

## 13.3.链式调用基础用法

```
langchain_core.runnables 下以 RunnableXXX 开头、官方稳定生产可用共 15 个，全部实现 Runnable 接口，支撑 LCEL 链式编程。
```

| 分类           | 类名                  | 核心功能简述                                 |
| -------------- | --------------------- | -------------------------------------------- |
| LCEL 高频核心  | RunnableSequence      | 生成串行链，按顺序执行，前一段输出传给后一段 |
| LCEL 高频核心  | RunnableBranch        | 条件分支，根据输入分流不同子链               |
| LCEL 高频核心  | RunnableParallel      | 并行执行多分支，同时返回多组字典结果         |
| LCEL 高频核心  | RunnableLambda        | 封装普通函数，实现自定义数据处理             |
| LCEL 高频核心  | RunnablePassthrough   | 透传输入，可扩展字典字段、保留上下文         |
| 字典操作工具   | RunnableAssign        | 给字典新增字段                               |
| 字典操作工具   | RunnablePick          | 仅提取字典指定 key，过滤多余字段             |
| 生产稳定性工具 | RunnableRetry         | 链路异常自动重试                             |
| 生产稳定性工具 | RunnableWithFallbacks | 主链路失败，自动切换兜底备用链               |
| 生产稳定性工具 | RunnableBinding       | 为下游绑定固定参数、全局配置                 |
| 生产稳定性工具 | RunnableEach          | 遍历数组，逐个执行子链                       |
| 高级拓展工具   | RunnableRouter        | 多分类复杂路由分发                           |
| 高级拓展工具   | RunnableConfig        | 承载链路全局配置（超时、追踪等）             |
| 高级拓展工具   | RunnableStream        | 统一管理流式分段输出                         |

### 13.3.1.顺序链_RunnableSequence

```python
管道A | B | C自动生成，串行依次执行，上一步输出传给下一步

from langchain_core.runnables import RunnableLambda

# 自定义函数
add1 = RunnableLambda(lambda x: x + 1)
mul2 = RunnableLambda(lambda x: x * 2)

# 顺序链
seq_chain = add1 | mul2
print(seq_chain.invoke(3)) # (3+1)*2 = 8
```

### 13.3.2.分支链_RunnableBranch

```python
条件判断分流，满足不同条件执行不同子链

from langchain_core.runnables import RunnableLambda, RunnableBranch

# 定义分支：条件, 对应执行链
branch_chain = RunnableBranch(
    (lambda x: x > 0, RunnableLambda(lambda x: f"正数：{x}")),
    (lambda x: x < 0, RunnableLambda(lambda x: f"负数：{x}")),
    # 默认分支
    RunnableLambda(lambda x: "数字等于0")
)
print(branch_chain.invoke(10))  # 正数：10
print(branch_chain.invoke(-5))  # 负数：-5
print(branch_chain.invoke(0))   # 数字等于0
```

### 13.3.3.并行链_RunnableParallel

```python
多分支同时执行，输入共享，返回包含所有分支结果的字典

from langchain_core.runnables import RunnableLambda, RunnableParallel

calc = RunnableParallel({
    "加1": RunnableLambda(lambda x: x + 1),
    "乘2": RunnableLambda(lambda x: x * 2)
})
print(calc.invoke(5))
# 输出: {'加1': 6, '乘2': 10}
```

### 13.3.4.函数链_RunnableLambda

```python
将普通 Python 函数 / 匿名函数包装成 Runnable，用于链路内数据处理

from langchain_core.runnables import RunnableLambda

# 包装普通函数
handle_text = RunnableLambda(lambda s: f"处理后的文本：{s}")
print(handle_text.invoke("你好LCEL"))
# 输出：处理后的文本：你好LCEL
```

