---
title: Modal messages vs UI messages
layout: layouts/post.ejs
created_at: 2025-10-16
---

# Modal messages vs UI messages
AI sdk has 2 messages format 
- [ModalMessages](https://ai-sdk.dev/docs/reference/ai-sdk-core/model-message)
- [UIMessages](https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message)

AI SDK has an official converter from UIMessages->ModalMessages = [convertToModelMessage()](https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages#converttomodelmessages) but not the other way around([github issue](https://github.com/vercel/ai/issues/4875))

- ModalMessages format is the one that is typically send to the ai modals
- UIMessages format is the one that is has all the state to display a chatbot UI. 
- recommended to store UIMessages in the DB(as per ai-sdk-v5)



### Modal messages
```json
[
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "test"
      }
    ]
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "Hello! I’ve received your message “test.” How can I assist you with operations or data at the gegreenville manufacturing plant today?\\n\\nHere are some things you might try next:\\n- Do you want to see the current status of a specific machine at the plant?\\n- Would you like to review shift performance metrics for today?\\n- Are you interested in recent downtime events or production anomalies?\\n\\nLet me know how you’d like to proceed!",
        "providerOptions": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd3c520c081958954faab81649561"
          }
        }
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "tsest"
      }
    ]
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "I’ve received your message: \\"tsest.\\" It looks like there might be a typo. How can I assist you with plant operations or machine data at gegreenville?\\n\\nHere are a few follow-up questions you might consider:\\n- Which machine or process do you want to check status or data for?\\n- Do you want a summary of today’s shift or any machine performance metrics?\\n- Are you investigating an issue—if so, can you specify which area or device?\\n\\nLet me know what you’d like to explore or if you want to test any particular monitoring feature!",
        "providerOptions": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd42040488195a3fd0f9317a6c655"
          }
        }
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "what is the weather in bangalore? "
      }
    ]
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "tool-call",
        "toolCallId": "call_DsWSbPZpKZIEgB9RfVFnCySg",
        "toolName": "weather",
        "input": {
          "location": "bangalore"
        },
        "providerOptions": {
          "openai": {
            "itemId": "fc_0e589b930a3f307e0068efd43be6dc8195934f90963465c1e6"
          }
        }
      }
    ]
  },
  {
    "role": "tool",
    "content": [
      {
        "type": "tool-result",
        "toolCallId": "call_DsWSbPZpKZIEgB9RfVFnCySg",
        "toolName": "weather",
        "output": {
          "type": "json",
          "value": {
            "location": "bangalore",
            "temperature": 64
          }
        }
      }
    ]
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "The current temperature in Bangalore is 64°F.\\n\\nWould you like to know:\\n- Why monitoring the weather might affect specific plant operations?\\n- Why temperature or weather data could impact certain machine processes or maintenance schedules?\\n- Why ambient conditions are relevant for quality or throughput in manufacturing?\\n\\nLet me know if you'd like further details or have a related question!",
        "providerOptions": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd44136348195a5c7276f5f3e72b6"
          }
        }
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "what about chennai? "
      }
    ]
  }
]
```

### UI Messages
```json
[
  {
    "parts": [
      {
        "type": "text",
        "text": "test"
      }
    ],
    "id": "a62sHqN7svpS1Bcb",
    "role": "user"
  },
  {
    "id": "PzIgeJT05dY350np",
    "role": "assistant",
    "parts": [
      {
        "type": "step-start"
      },
      {
        "type": "text",
        "text": "Hello! I’ve received your message “test.” How can I assist you with operations or data at the gegreenville manufacturing plant today?\\n\\nHere are some things you might try next:\\n- Do you want to see the current status of a specific machine at the plant?\\n- Would you like to review shift performance metrics for today?\\n- Are you interested in recent downtime events or production anomalies?\\n\\nLet me know how you’d like to proceed!",
        "providerMetadata": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd3c520c081958954faab81649561"
          }
        },
        "state": "done"
      }
    ]
  },
  {
    "parts": [
      {
        "type": "text",
        "text": "tsest"
      }
    ],
    "id": "v0eC10rjgOYkjxCd",
    "role": "user"
  },
  {
    "id": "JHmZVw59W0A6Dw5c",
    "role": "assistant",
    "parts": [
      {
        "type": "step-start"
      },
      {
        "type": "text",
        "text": "I’ve received your message: \\"tsest.\\" It looks like there might be a typo. How can I assist you with plant operations or machine data at gegreenville?\\n\\nHere are a few follow-up questions you might consider:\\n- Which machine or process do you want to check status or data for?\\n- Do you want a summary of today’s shift or any machine performance metrics?\\n- Are you investigating an issue—if so, can you specify which area or device?\\n\\nLet me know what you’d like to explore or if you want to test any particular monitoring feature!",
        "providerMetadata": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd42040488195a3fd0f9317a6c655"
          }
        },
        "state": "done"
      }
    ]
  },
  {
    "parts": [
      {
        "type": "text",
        "text": "what is the weather in bangalore? "
      }
    ],
    "id": "8pesORjGJLIVaxrp",
    "role": "user"
  },
  {
    "id": "fkFENIsHBfSddAD5",
    "role": "assistant",
    "parts": [
      {
        "type": "step-start"
      },
      {
        "type": "tool-weather",
        "toolCallId": "call_DsWSbPZpKZIEgB9RfVFnCySg",
        "state": "output-available",
        "input": {
          "location": "bangalore"
        },
        "output": {
          "location": "bangalore",
          "temperature": 64
        },
        "callProviderMetadata": {
          "openai": {
            "itemId": "fc_0e589b930a3f307e0068efd43be6dc8195934f90963465c1e6"
          }
        }
      },
      {
        "type": "step-start"
      },
      {
        "type": "text",
        "text": "The current temperature in Bangalore is 64°F.\\n\\nWould you like to know:\\n- Why monitoring the weather might affect specific plant operations?\\n- Why temperature or weather data could impact certain machine processes or maintenance schedules?\\n- Why ambient conditions are relevant for quality or throughput in manufacturing?\\n\\nLet me know if you'd like further details or have a related question!",
        "providerMetadata": {
          "openai": {
            "itemId": "msg_0e589b930a3f307e0068efd44136348195a5c7276f5f3e72b6"
          }
        },
        "state": "done"
      }
    ]
  },
  {
    "parts": [
      {
        "type": "text",
        "text": "what about chennai? "
      }
    ],
    "id": "QYCy4cjRbayUcChp",
    "role": "user"
  }
]
```