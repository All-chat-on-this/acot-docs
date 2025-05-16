# ACOT Configuration Usage Guide

ACOT (All Chat On This) allows users to connect to various AI APIs, and through its configuration system, you can easily integrate different large language model services. This document will explain in detail how to use the configuration features and the principles behind how they work.

## Configuration Overview

ACOT's configuration system is designed to flexibly connect to various AI API services, whether OpenAI, Claude, Qwen, or other compatible APIs. Through the configuration interface, you can customize the request and response structures to adapt to the characteristics of different APIs.

## Configuration Items Explained

### Basic Settings

- **Configuration Name**: Name your configuration for easy identification when switching between multiple configurations.
  - Examples: `OpenAI GPT-4`, `Qwen`, `Claude 3.5`
  - It's recommended to use names that clearly identify the model or purpose

- **API URL**: The endpoint address of the API service, for example `https://api.siliconflow.cn/v1/chat/completions`.
  
- **API Key**: The authentication key required to access the API.
  - Examples: `sk-abcdefg123456789`, `qwen-abcdefg123456789`

- **API Key Placement**:
  - **Default Authorization Header**: Place the API key in the standard `Authorization` header.
    - Example: `Authorization: Bearer sk-abcdefg123456789`
    - Suitable for: OpenAI, Qwen, and most APIs
  - **Custom Header**: Use a custom HTTP header field name to send the API key.
    - Example: `X-API-Key: abcdefg123456789`
    - Suitable for: Some APIs requiring special headers
  - **Request Body**: Send the API key as part of the request body.
    - Example: Include `{ "api_key": "abcdefg123456789" }` in the request body
    - Suitable for: Some special API designs or self-built services

### Request Configuration

- **Request Template**: This is the JSON structure template sent to the API, containing all necessary parameters.
  - Example (OpenAI format):
  ```json
  {
    "model": "gpt-4",
    "messages": [
      {"role": "user", "content": "Hello"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }
  ```
  - Example (Claude format):
  ```json
  {
    "model": "claude-3-opus-20240229",
    "messages": [
      {"role": "user", "content": "Hello"}
    ],
    "temperature": 0.7,
    "max_tokens": 500
  }
  ```

- **Message Group Path**: Specifies the array field path in the request where conversation messages are stored (e.g., `messages`).
  - Examples:
    - `messages`: Standard format, messages directly stored in an array named "messages"
    - `conversation.messages`: In some custom APIs, messages may be nested within a sub-object

- **Role Path**: Within the message group, specifies the field name representing the speaker role (e.g., `role`).
  - Examples:
    - `role`: Standard format, as used by OpenAI and Claude
    - `speaker`: Some custom APIs may use different names to represent roles

- **Content Path**: Within the message group, specifies the field name representing the message content (e.g., `content`).
  - Examples:
    - `content`: Standard format, as used by OpenAI and Claude
    - `text`: Some custom APIs may use different names to represent content

- **User Role Value**: Specifies the role value representing user messages (e.g., `user`).
  - Examples:
    - `user`: Standard value, used by most APIs
    - `human`: Some APIs might use this value (like early versions of Claude)
  
  These role values directly affect the structure in the request body. For example, when the user role value is set to `user`:
  ```json
  {
    "messages": [
      {"role": "user", "content": "Please introduce yourself"}
    ]
  }
  ```
  
  If you change the user role value to `human`, the request body becomes:
  ```json
  {
    "messages": [
      {"role": "human", "content": "Please introduce yourself"}
    ]
  }
  ```

- **Assistant Role Value**: Specifies the role value representing AI assistant messages (e.g., `assistant`).
  - Examples:
    - `assistant`: Standard value, used by most APIs
    - `bot`: Some custom APIs may use this value
    - `ai`: Some custom APIs may use this value
  
  When a conversation includes history, the assistant role value setting affects the request body. For example, when the assistant role value is set to `assistant`:
  ```json
  {
    "messages": [
      {"role": "user", "content": "Who are you?"},
      {"role": "assistant", "content": "I am an AI assistant."},
      {"role": "user", "content": "What can you do?"}
    ]
  }
  ```
  
  If the assistant role value is set to `ai`, the historical responses in the request body change to:
  ```json
  {
    "messages": [
      {"role": "user", "content": "Who are you?"},
      {"role": "ai", "content": "I am an AI assistant."},
      {"role": "user", "content": "What can you do?"}
    ]
  }
  ```

- **System Role Value**: Specifies the role value representing system prompts (e.g., `system`).
  - Examples:
    - `system`: Standard value, used by most APIs
    - `instruction`: Some custom APIs may use this value
  
  The system role is typically used to set overall instructions or context, and it affects the structure of the request body. For example, using the standard `system` role value:
  ```json
  {
    "messages": [
      {"role": "system", "content": "You are a professional medical advisor. Please answer users' health questions using professional but easy-to-understand language."},
      {"role": "user", "content": "What should I be aware of regarding high blood pressure?"}
    ]
  }
  ```
  
  If the system role value is set to `instruction`:
  ```json
  {
    "messages": [
      {"role": "instruction", "content": "You are a professional medical advisor. Please answer users' health questions using professional but easy-to-understand language."},
      {"role": "user", "content": "What should I be aware of regarding high blood pressure?"}
    ]
  }
  ```

### Role Values and Path Combination Examples

To better understand how role values and paths work together, here are some combination examples:

1. **Standard OpenAI Format** (Role path `role`, user role value `user`, assistant role value `assistant`):
```json
{
  "messages": [
    {"role": "user", "content": "What is artificial intelligence?"},
    {"role": "assistant", "content": "Artificial intelligence is a branch of computer science..."},
    {"role": "user", "content": "What are its applications?"}
  ]
}
```

2. **Custom Format** (Role path `speaker`, user role value `human`, assistant role value `bot`):
```json
{
  "conversation": {
    "messages": [
      {"speaker": "human", "text": "What is artificial intelligence?"},
      {"speaker": "bot", "text": "Artificial intelligence is a branch of computer science..."},
      {"speaker": "human", "text": "What are its applications?"}
    ]
  }
}
```

3. **Example Including System Role** (System role value is `system`):
```json
{
  "messages": [
    {"role": "system", "content": "You are a friendly AI assistant."},
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "Hello! How can I help you?"},
    {"role": "user", "content": "Tell me about yourself"}
  ]
}
```

### Response Configuration

- **Response Template**: This is the JSON structure template received from the API, helping the system understand how to parse the response.
  - Example (OpenAI format):
  ```json
  {
    "id": "chatcmpl-123456789",
    "object": "chat.completion",
    "created": 1677858242,
    "model": "gpt-4",
    "choices": [{
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you?"
      },
      "finish_reason": "stop",
      "index": 0
    }]
  }
  ```
  - Example (Claude format):
  ```json
  {
    "id": "msg_01234567890",
    "type": "message",
    "role": "assistant",
    "content": [{
      "type": "text",
      "text": "Hello! How can I help you?"
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

- **Response Text Path**: The path to extract the AI's reply text from the response JSON (e.g., `choices[0].message.content`).
  - Examples:
    - `choices[0].message.content`: OpenAI format
    - `content[0].text`: Claude format
    - `response.answer`: Format used by some custom APIs

- **Response Thinking Path**: The path to extract the AI's thinking process from the response JSON (if applicable) (e.g., `choices[0].message.reasoning_content`).
  - Examples:
    - `choices[0].message.reasoning_content`: Qwen format
    - `choices[0].message.tool_calls[0].function.arguments`: OpenAI tool call content
    - `thinking`: Format used by some custom APIs

## Default Configuration Explanation

When a new user first uses ACOT, the system will provide a default configuration preset for the Qwen model API:

- **API URL**: `https://api.siliconflow.cn/v1/chat/completions`
- **Model**: Qwen/QwQ-32B
- **Request Structure**:
  - Message array located in the `messages` field
  - Each message contains `role` and `content` fields
  - Supports standard `user`, `assistant`, and `system` role values
  - Includes other parameters such as `max_tokens`, `temperature`, etc.
  
- **Response Structure**:
  - AI reply content located in the `choices[0].message.content` field
  - Thinking process (if applicable) located in the `choices[0].message.reasoning_content` field

Specific examples of the default configuration:

```json
// Request template
{
  "model": "Qwen/QwQ-32B",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "stream": false,
  "max_tokens": 512,
  "temperature": 0.7,
  "top_p": 0.7,
  "top_k": 50,
  "frequency_penalty": 0.5,
  "response_format": {"type": "text"}
}

// Response template
{
  "id": "0196685afb2ec3f4cdf59e1c6dd30c30",
  "object": "chat.completion",
  "created": 1745507515,
  "model": "Qwen/QwQ-32B",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! Nice to meet you. How can I help you today?",
      "reasoning_content": "The user is greeting me, so I should respond politely and offer assistance."
    },
    "finish_reason": "stop"
  }]
}
```

## Security

### API Key Storage

ACOT takes the security of your API keys seriously. Here's how we protect your credentials:

- **Encrypted Storage**: All API keys are encrypted before being stored in the database using industry-standard encryption algorithms.
- **Secure Transmission**: API keys are transmitted securely over HTTPS/TLS connections to prevent interception.
- **No Plain Text**: API keys are never stored in plain text in log files or temporary storage.
- **Local Processing**: When possible, API calls are processed directly from your device to the AI provider, minimizing exposure of your keys.
- **Key Isolation**: Each configuration's API key is stored separately, reducing the risk in case of a security incident.

When you input an API key into ACOT:
1. The key is immediately encrypted client-side before transmission
2. The encrypted key is stored securely in the database
3. The key is decrypted only when needed to make API calls
4. The decryption happens in memory and is never written to persistent storage

You can also mask your API key display in the UI using the visibility toggle, preventing casual observation.

## How It Works

When you send a message in ACOT, the system will:

1. **Assemble the Request**: Based on your configuration, insert your message and conversation history into the request template.
   
   For example, if your history has two messages, your request template will be transformed into:
   ```json
   {
     "model": "Qwen/QwQ-32B",
     "messages": [
       {"role": "user", "content": "Who are you?"},
       {"role": "assistant", "content": "I am a Qwen assistant."},
       {"role": "user", "content": "What can you do?"}
     ],
     "temperature": 0.7,
     "max_tokens": 512
   }
   ```

2. **Send the Request**: Send the assembled request to the specified API URL.
   - Depending on the configured location, the API key will be placed in the authorization header, custom header, or request body.
   
   For example, if you choose the default authorization header, the system will add:
   ```
   Authorization: Bearer sk-abcdefg123456789
   ```

3. **Process the Response**: Receive data returned from the API and extract the AI's reply text and thinking process according to the configured paths.
   
   For example, extracting content from the following response:
   ```json
   {
     "choices": [{
       "message": {
         "content": "I can answer questions, provide information, help with content creation, etc.",
         "reasoning_content": "The user is asking about my capabilities, so I should list my main functions."
       }
     }]
   }
   ```
   
   The system will extract `"I can answer questions, provide information, help with content creation, etc."` as the reply content, and may additionally store the thinking process.

4. **Display Results**: Display the extracted reply in the conversation interface.

## Configuration Testing Feature

Before saving a new configuration, it is strongly recommended to use the "Test Connection" feature to confirm whether your configuration is correct. The system will:

1. Send a test message to the specified API, such as `"Hello, nice to meet you."`
2. Check if a valid response is received.
3. Try to extract text from the response to verify if the path configuration is correct.
4. Display test results, including success/failure status and the actual API response.

For example, display when test is successful:
```
✓ Connection successful
Response: Hello! Nice to meet you. I'm an AI assistant, how can I help you?
```

Display when test fails:
```
✗ Connection failed
Error: Invalid or expired API key
```

## Configuration Availability Status

Each configuration has an "available" status indicator:

- **Green**: Indicates the configuration has been successfully tested or used.
  Example: Successfully connected to OpenAI's API and received the correct response.
  
- **Red**: Indicates the configuration has not been successfully tested or an error occurred during the last use.
  Example: API key expired, or the server returned an error status code.

When you successfully use a configuration to send a message or successfully test a configuration, the system will automatically mark the configuration as "available."

## Best Practices

1. **Understand the Model**: Understand the characteristics and request/response formats of the API service you are using.
   - Example: Understand the capability differences between GPT-4 and GPT-3.5, or understand the different advantages of Claude and OpenAI models

2. **Test Thoroughly**: Before actual use, use the testing feature to confirm that your configuration works properly.
   - Example: After adding a new configuration, first use the test feature to verify the connection is normal before using it in formal conversations

3. **Maintain Multiple Configurations**: Create multiple configurations for different models or purposes for quick switching.
   - Example: Create a configuration with a high temperature value for creative writing, and a configuration with a low temperature value for factual queries

4. **Pay Attention to Parameter Adjustments**: Parameters like `temperature`, `max_tokens`, etc., will affect the creativity and length of AI replies.
   - Examples:
     - `temperature: 0.3`: More conservative, more deterministic answers, suitable for factual queries
     - `temperature: 0.8`: More creative answers, suitable for creative writing
     - `max_tokens: 256`: Short answers, suitable for brief information
     - `max_tokens: 4096`: Long answer, suitable for detailed explanation or creation

By configuring ACOT correctly, you can connect to various large language model APIs for a more flexible and powerful AI conversation experience.