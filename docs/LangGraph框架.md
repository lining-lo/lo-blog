# 1.LangGraph概述

```python
1.LangGraph 是基于 LangChain 构建的、面向智能体多轮交互 / 状态持久化 / 分支并行执行的图结构工作流框架

2.LangGraph = LangChain + 图编排 + 状态机

3.官网：https://docs.langchain.org.cn/oss/python/langgraph/overview

4.LangGraph 基于 LangChain 构建，无论图结构多复杂，单独每个任务执行链路仍然是线性的；它是 LangChain 工作流的高级编排工具，其中“高级”之处就是能按照图结构来编排工作流（区别）
    
5.为什么需要 LangGraph
  原生线性 Chain 太死板，无法优雅地处理循环和条件分支，不适合复杂任务
  纯自由式裸 Agent 太自由，像个黑箱，难以控制、调试和保证稳定性

  LangGraph 就是用来同时解决两个痛点：
  用图结构弥补 Chain 的死板
  用固定节点 + 全局状态 + 路由约束，给 Agent 套上可控的流程枷锁

6.LangGraph 四大核心
  a.State 状态: 全局共享仓库，存所有上下文数据，全程不变、所有节点共用
  b.Node 节点: 具体干活的单元（LLM 推理、调用工具、业务处理）
  c.Edge 边: 控制流程怎么走：固定跳转 / 条件分支 / 循环回流
  d.Graph 图: 把 状态 + 节点 + 边 组装起来，变成可运行的完整工作流

7.使用 LangGraph 标准完整流程：
  a.定义状态类 State
  LangGraph 是状态机，必须先定义存储流转数据的状态（TypedDict /pydantic BaseModel）

  b.初始化 StateGraph 实例（传入状态类），构建状态图 --> StateGraph (State)
    
  c.添加图节点 add_node ()

  d.定义边
  普通直线边 add_edge ()
  条件分支边 add_conditional_edges () —— 复杂图必备
    
  e.指定入口节点 add_edge (START, "节点名") 或者 set_entry_point ()
  START 是图内置起始标记，add_edge (START, "节点名") 等价于 set_entry_point ("节点名")
  用 START/END 全局常量替代 set_entry_point

  f.指定出口节点 add_edge ("xxx 节点", END) 或者 set_finish_point ()
  流程走到末尾节点无下游边时，会自动终止，可选
  END 是图内置终止标记，节点指向 END 代表流程结束，不用额外配置出口

  g.编译图 compile ()

  h.传入初始状态，执行 / 调用工作流
  invoke () 方法只接收状态字典作为核心参数
    
8.LangGraph的技术架构如下： 
```

![image-20260705211614.png](../image/image-20260705211614.png)

# 2.入门案例

## 2.1.基础版本

```python
# pip install grandalf

from typing import TypedDict
from langgraph.graph import StateGraph, START, END
import uuid


# 1．定义State对象
class HelloState(TypedDict):
    name: str
    greeting: str


# 2.定义节点Node(就是干活的函数)
def greet(helloState: HelloState) -> dict:
    name = helloState["name"]
    return {"greeting": f"你好,{name}"}
    # return helloState


def add_emoji(helloState: HelloState) -> dict:
    greeting = helloState["greeting"]
    return {"greeting": greeting + "  。。。😄"}


# 3.构建图graph
graph = StateGraph(HelloState)

graph.add_node("greeting", greet)
graph.add_node("add_emoji", add_emoji)

graph.add_edge(START, "greeting")
graph.add_edge("greeting", "add_emoji")
graph.add_edge("add_emoji", END)

# 4.编译图
app = graph.compile()

# 5.运行
# invoke()方法只接收状态字典作为核心参数
result = app.invoke({"name": "z3"})
print(result)
print()
print(result["greeting"])

# 6 打印图的边和节点信息
# 6.1 打印图的ascii可视化结构
print(app.get_graph().print_ascii())
print("=" * 50)

# 6.2 打印图的Mermaid代码可视化结构并通过https://www.processon.com/mermaid编辑器查看
print(app.get_graph().draw_mermaid())
print("=" * 50)

# 6.3 生成 PNG并写入文件 ，一般需要开启科学上网
png_bytes = app.get_graph().draw_mermaid_png(max_retries=2, retry_delay=2.0)
output_path = "langgraph" + str(uuid.uuid4())[:8] + ".png"
with open(output_path, "wb") as f:
    f.write(png_bytes)
print(f"图片已生成：{output_path}")
```

## 2.2.加一点业务

```python
from langgraph.constants import START, END
from langgraph.graph import StateGraph
 
    
def addition(state):
    print(f'加法节点收到的初始值:{state}')
    return {"x": state["x"] + 1}

def subtraction(state):
    print(f'减法节点收到的初始值:{state}')
    return {"x": state["x"] - 2}


graph = StateGraph(dict)
# 向图构建器中添加节点
# 添加加法运算节点和减法运算节点到构建器中
graph.add_node("addition", addition)
graph.add_node("subtraction", subtraction)

# 定义节点之间的执行顺序 edges
# 设置节点间的依赖关系，形成执行流程图
graph.add_edge(START, "addition")
graph.add_edge("addition", "subtraction")
graph.add_edge("subtraction", END)
# 打印图的边和节点信息
#print("打印图的边信息:\n",graph.edges)
print()
#print("打印图的节点信息:\n",graph.nodes)

# 编译图构建器生成计算图
app = graph.compile()
# invoke()方法只接收状态字典作为核心参数，定义一个初始状态字典，包含键值对"x": 5
initial_state={"x": 5}
# 调用graph对象的invoke方法，传入初始状态，执行图计算流程
result= app.invoke(initial_state)
print(f"最后的结果是:{result}")

# 打印图的可视化结构
print(app.get_graph().print_ascii())
print()
# 打印图的可视化结构，生成更加美观的Mermaid 代码，通过processon 编辑器查看
print(app.get_graph().draw_mermaid())
```

## 2.3.加上大模型调用

```python
import uuid
from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
import os
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage


# 定义状态（State） 存储对话消息
class AtguiguState(TypedDict):
    # messages 是一个消息列表，Annotated + add_messages 表示支持自动追加消息
    messages: Annotated[List, add_messages]  # string.append


# 定义大模型
llm = init_chat_model(
    model="qwen-plus",
    model_provider="openai",
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)


# 定义节点函数，节点：调用大模型，并把回复加入到 state["messages"] 里
def model_node(state: AtguiguState):
    reply = llm.invoke(state["messages"])  # 输入历史消息，调用模型
    return {"messages": [reply]}  # 返回新消息，自动加到 state


# 构建图结构
graph = StateGraph(AtguiguState)  # 初始化图，指定 State 类型

graph.add_node("model", model_node)  # 添加一个节点，名字叫 "model"

graph.add_edge(START, "model")  # 从 START 到 "model"
graph.add_edge("model", END)  # 从 "model" 到 END

# 编译
app = graph.compile()

# 运行
# result = app.invoke({"messages": [HumanMessage(content="请用一句话解释什么是 LangGraph。")]})
result = app.invoke({"messages": "请用一句话解释什么是 LangGraph。"})
print(result)
# 打印模型的最后一条回复
print("模型回答：", result["messages"][-1].content)

print()
# 打印图的ascii可视化结构
print(app.get_graph().print_ascii())
print("=" * 50)

# 打印图的Mermaid代码可视化结构并通过https://www.processon.com/mermaid编辑器查看
print(app.get_graph().draw_mermaid())
print("="*50)

# 生成 PNG并写入文件
png_bytes = app.get_graph().draw_mermaid_png()
output_path = "langgraph" + str(uuid.uuid4())[:8] + ".png"
with open(output_path, "wb") as f:
 f.write(png_bytes)
print(f"图片已生成：{output_path}")
```

