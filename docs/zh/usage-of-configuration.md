# ACOT 配置功能使用指南

ACOT（All Chat On This）允许用户连接各种 AI API，通过配置系统，您可以轻松地接入不同的大语言模型服务。本文档将详细介绍配置功能的使用方法及其背后的工作原理。

## 配置功能概述

ACOT 的配置系统设计用于灵活连接各种 AI API 服务，无论是 OpenAI、Claude、Qwen 还是其他兼容的 API。通过配置界面，您可以自定义请求和响应的结构，以适应不同 API 的特点。

## 配置项详解

### 基本设置

- **配置名称**：为您的配置命名，便于在多个配置间切换时识别。
  - 例如：`OpenAI GPT-4`、`通义千问`、`Claude 3.5`
  - 建议使用能清晰识别模型或用途的名称

- **API URL**：API 服务的端点地址，例如 `https://api.siliconflow.cn/v1/chat/completions`。

- **API Key**：访问 API 所需的认证密钥。
  - 例如：`sk-abcdefg123456789`、`qwen-abcdefg123456789`

- **API Key 放置位置**：
  - **默认认证头部**：将 API Key 放在标准的 `Authorization` 头部。
    - 例如：`Authorization: Bearer sk-abcdefg123456789`
    - 适用于：OpenAI、通义千问等多数 API
  - **自定义头部**：使用自定义的 HTTP 头部字段名发送 API Key 。
    - 例如：`X-API-Key: abcdefg123456789`
    - 适用于：某些需要特殊头部的 API 服务
  - **请求体**：将 API Key 作为请求体的一部分发送。
    - 例如：在请求体中包含 `{ "api_key": "abcdefg123456789" }`
    - 适用于：一些特殊 API 设计或自建服务

### 请求配置

- **请求模板**：这是向 API 发送的 JSON 结构模板，包含了所有必要的参数。
  - 例如（OpenAI 格式）：
  ```json
  {
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }
  ```
  - 例如（Claude 格式）：
  ```json
  {
    "model": "claude-3-opus-20240229",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }
  ```

- **消息组路径**：指定请求中存放对话消息的数组字段路径（比如 `messages`）。
  - 例如：
    - `messages`：标准格式，消息直接存在名为 "messages" 的数组中
    - `conversation.messages`：在一些自定义 API 中，消息可能嵌套在子对象中

- **角色路径**：在消息组内，指定表示发言角色的字段名（比如 `role`）。
  - 例如：
    - `role`：标准格式，如 OpenAI 和 Claude 使用的格式
    - `speaker`：一些自定义 API 可能使用不同名称表示角色

- **内容路径**：在消息组内，指定表示消息内容的字段名（比如 `content`）。
  - 例如：
    - `content`：标准格式，如 OpenAI 和 Claude 使用的格式
    - `text`：一些自定义 API 可能使用不同名称表示内容

- **用户角色值**：指定表示用户消息的角色值（比如 `user`）。
  - 例如：
    - `user`：标准值，多数 API 使用
    - `human`：某些 API 可能使用这个值（如早期的 Claude）
  
  这些角色值将直接影响请求体中的结构，例如当指定用户角色值为 `user` 时：
  ```json
  {
    "messages": [
      {"role": "user", "content": "请介绍一下你自己"}
    ]
  }
  ```
  
  如果更改用户角色值为 `human`，请求体将变为：
  ```json
  {
    "messages": [
      {"role": "human", "content": "请介绍一下你自己"}
    ]
  }
  ```

- **助手角色值**：指定表示 AI 助手消息的角色值（比如 `assistant`）。
  - 例如：
    - `assistant`：标准值，多数 API 使用
    - `bot`：某些自定义 API 可能使用这个值
    - `ai`：某些自定义 API 可能使用这个值
  
  当一个对话包含历史记录时，助手角色值的设置会影响请求体，例如当指定助手角色值为 `assistant` 时：
  ```json
  {
    "messages": [
      {"role": "user", "content": "你是谁？"},
      {"role": "assistant", "content": "我是一个AI助手。"},
      {"role": "user", "content": "你能做什么？"}
    ]
  }
  ```
  
  如果助手角色值设为 `ai`，则请求体中的历史回复会变为：
  ```json
  {
    "messages": [
      {"role": "user", "content": "你是谁？"},
      {"role": "ai", "content": "我是一个AI助手。"},
      {"role": "user", "content": "你能做什么？"}
    ]
  }
  ```

- **系统角色值**：指定表示系统提示的角色值（比如 `system`）。
  - 例如：
    - `system`：标准值，多数 API 使用
    - `instruction`：某些自定义 API 可能使用这个值
  
  系统角色通常用于设置整体指令或上下文，会影响请求体的结构，例如使用标准 `system` 角色值：
  ```json
  {
    "messages": [
      {"role": "system", "content": "你是一个专业的医疗顾问，请用专业但容易理解的语言回答用户的健康问题。"},
      {"role": "user", "content": "高血压应该注意什么？"}
    ]
  }
  ```
  
  如果系统角色值设为 `instruction`：
  ```json
  {
    "messages": [
      {"role": "instruction", "content": "你是一个专业的医疗顾问，请用专业但容易理解的语言回答用户的健康问题。"},
      {"role": "user", "content": "高血压应该注意什么？"}
    ]
  }
  ```

### 角色值与路径组合示例

为了更好地理解角色值和路径如何协同工作，以下是一些组合示例：

1. **标准 OpenAI 格式**（角色路径 `role`，用户角色值 `user`，助手角色值 `assistant`）：
```json
{
  "messages": [
    {"role": "user", "content": "什么是人工智能？"},
    {"role": "assistant", "content": "人工智能是计算机科学的一个分支..."},
    {"role": "user", "content": "它有哪些应用？"}
  ]
}
```

2. **自定义格式**（角色路径 `speaker`，用户角色值 `human`，助手角色值 `bot`）：
```json
{
  "conversation": {
    "messages": [
      {"speaker": "human", "text": "什么是人工智能？"},
      {"speaker": "bot", "text": "人工智能是计算机科学的一个分支..."},
      {"speaker": "human", "text": "它有哪些应用？"}
    ]
  }
}
```

3. **包含系统角色的示例**（系统角色值为 `system`）：
```json
{
  "messages": [
    {"role": "system", "content": "你是一个友好的AI助手。"},
    {"role": "user", "content": "你好！"},
    {"role": "assistant", "content": "你好！有什么我能帮助你的吗？"},
    {"role": "user", "content": "介绍一下你自己"}
  ]
}
```

### 响应配置

- **响应模板**：这是从 API 接收到的 JSON 结构模板，用于帮助系统理解如何解析响应。
  - 例如（OpenAI 格式）：
  ```json
  {
    "id": "chatcmpl-123456789",
    "object": "chat.completion",
    "created": 1677858242,
    "model": "gpt-4",
    "choices": [{
      "message": {
        "role": "assistant",
        "content": "你好！我能帮你什么吗？"
      },
      "finish_reason": "stop",
      "index": 0
    }]
  }
  ```
  - 例如（Claude 格式）：
  ```json
  {
    "id": "msg_01234567890",
    "type": "message",
    "role": "assistant",
    "content": [{
      "type": "text",
      "text": "你好！我能帮你什么吗？"
    }],
    "model": "claude-3-opus-20240229",
    "stop_reason": "end_turn",
    "stop_sequence": null,
    "usage": {
      "input_tokens": 5,
      "output_tokens": 15
    }
  }
  ```

- **响应文本路径**：从响应 JSON 中提取 AI 回复文本的路径（比如 `choices[0].message.content`）。
  - 例如：
    - `choices[0].message.content`：OpenAI 格式
    - `content[0].text`：Claude 格式
    - `response.answer`：某些自定义 API 可能使用的格式

- **响应思考路径**：从响应 JSON 中提取 AI 思考过程的路径（如适用）（比如 `choices[0].message.reasoning_content`）。
  - 例如：
    - `choices[0].message.reasoning_content`：通义千问格式
    - `choices[0].message.tool_calls[0].function.arguments`：OpenAI 工具调用内容
    - `thinking`：某些自定义 API 可能使用的格式

## 默认配置说明

当新用户首次使用 ACOT 时，系统会提供一个默认配置，针对 Qwen 模型 API 进行了预设：

- **API URL**: `https://api.siliconflow.cn/v1/chat/completions`
- **模型**: Qwen/QwQ-32B
- **请求结构**:
  - 消息数组位于 `messages` 字段
  - 每条消息包含 `role` 和 `content` 字段
  - 支持标准的 `user`、`assistant` 和 `system` 角色值
  - 包含其他参数如 `max_tokens`、`temperature` 等
  
- **响应结构**:
  - AI 回复内容位于 `choices[0].message.content` 字段
  - 思考过程（如适用）位于 `choices[0].message.reasoning_content` 字段

默认配置的具体示例：

```json
// 请求模板
{
  "model": "Qwen/QwQ-32B",
  "messages": [
    {"role": "user", "content": "你好"}
  ],
  "stream": false,
  "max_tokens": 512,
  "temperature": 0.7,
  "top_p": 0.7,
  "top_k": 50,
  "frequency_penalty": 0.5,
  "response_format": {"type": "text"}
}

// 响应模板
{
  "id": "0196685afb2ec3f4cdf59e1c6dd30c30",
  "object": "chat.completion",
  "created": 1745507515,
  "model": "Qwen/QwQ-32B",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "你好！很高兴认识你，有什么我能帮助你的吗？",
      "reasoning_content": "用户打招呼，我应当礼貌地回应并表示我可以提供帮助。"
    },
    "finish_reason": "stop"
  }]
}
```

## 工作原理

当您在 ACOT 中发送消息时，系统会：

1. **组装请求**：根据您的配置，将您的消息和对话历史记录插入到请求模板中。
   
   例如，假设您的历史记录有两条消息，您的请求模板将被转化为：
   ```json
   {
     "model": "Qwen/QwQ-32B",
     "messages": [
       {"role": "user", "content": "你是谁？"},
       {"role": "assistant", "content": "我是通义千问助手。"},
       {"role": "user", "content": "你能做什么？"}
     ],
     "temperature": 0.7,
     "max_tokens": 512
   }
   ```

2. **发送请求**：将组装好的请求发送到指定的 API URL。
   - 根据配置的位置，API Key 会被放置在认证头部、自定义头部或请求体中。
   
   例如，如果您选择默认认证头部，系统会添加：
   ```
   Authorization: Bearer sk-abcdefg123456789
   ```

3. **处理响应**：接收 API 返回的数据，并根据配置的路径提取 AI 的回复文本和思考过程。
   
   例如，从以下响应中提取内容：
   ```json
   {
     "choices": [{
       "message": {
         "content": "我可以回答问题、提供信息、帮助创作内容等。",
         "reasoning_content": "用户询问我的功能，我应该列出我的主要能力。"
       }
     }]
   }
   ```
   
   系统将提取 `"我可以回答问题、提供信息、帮助创作内容等。"` 作为回复内容，并可能额外存储思考过程。

4. **显示结果**：将提取的回复显示在对话界面中。

## 配置测试功能

在保存新配置前，强烈建议使用"测试连接"功能确认您的配置是否正确。系统会：

1. 向指定 API 发送一条测试消息，例如 `"Hello, nice to meet you."`
2. 检查是否收到了有效的响应。
3. 尝试从响应中提取文本，以验证路径配置是否正确。
4. 显示测试结果，包括成功/失败状态和 API 的实际响应。

例如，测试成功时的显示：
```
✓ 连接成功
响应：你好！很高兴认识你。我是一个AI助手，有什么我能帮助你的吗？
```

测试失败时的显示：
```
✗ 连接失败
错误：API Key 无效或已过期
```

## 配置可用性状态

每个配置都有一个"可用"状态指示器：

- **绿色**：表示配置已被成功测试或使用。
  例如：成功连接到 OpenAI 的 API 并获得了正确的响应。
  
- **红色**：表示配置尚未成功测试或上次使用时出现了错误。
  例如：API Key 失效，或者服务端返回了错误状态码。

当您成功使用配置发送消息或成功测试配置时，系统会自动将配置标记为"可用"。

## 最佳实践

1. **模型理解**：了解您使用的 API 服务的特性和请求/响应格式。
   - 例如：了解 GPT-4 和 GPT-3.5 的能力差异，或者了解 Claude 和 OpenAI 模型的不同优势

2. **充分测试**：在实际使用前，使用测试功能确认配置工作正常。
   - 例如：添加新配置后，先用测试功能验证连接正常，再在正式对话中使用

3. **保持多个配置**：为不同的模型或用途创建多个配置，以便快速切换。
   - 例如：为创意写作创建一个高温度值的配置，为事实查询创建一个低温度值的配置

4. **注意参数调整**：特别是 `temperature`、`max_tokens` 等参数会影响 AI 回复的创造性和长度。
   - 例如：
     - `temperature: 0.3`：更保守、更确定性的回答，适合事实查询
     - `temperature: 0.8`：更有创意的回答，适合创意写作
     - `max_tokens: 256`：短回答，适合简要信息
     - `max_tokens: 4096`：长回答，适合详细解释或创作

通过正确配置 ACOT，您可以连接各种大语言模型 API，获得更加灵活和强大的 AI 对话体验。
