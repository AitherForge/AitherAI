# Aither AI 🤖

Aither AI is a native-feeling AI chat app for phones, tablets, desktops, and the Electron desktop app.

## Version 4.3.0

### 🤖 AIClient2API
- Uses the OpenAI-compatible AIClient2API `/v1/chat/completions` interface.
- Uses AIClient2API `/v1/models` to discover available models.
- Default model is `gemini-2.5-flash`, with model selection in Settings.
- Supports Bearer authentication through the Aither AI Settings panel.
- Keeps conversation history locally on the device.
- Removes the previous WebLLM/WebGPU dependency from the web chat path.

AIClient2API documents the OpenAI-compatible chat endpoint and authentication options. The API expects a Bearer token, `x-api-key`, or another supported authentication method when authentication is enabled.

## Settings
- Aither Account integration.
- AI model selection.
- Local API-key storage for the configured AIClient2API endpoint.
- Force Update.
- Clear Chats.

## How it works

```text
Aither AI
   │
   ▼
AIClient2API
   │
   ▼
Configured AI provider/model
   │
   ▼
Aither AI response
```

The web app uses the AIClient2API OpenAI-compatible API. The API base is configured in `aither-api.js` and currently points at `https://aiproxy.justlikemaki.vip/v1`.

## Security note

For production, do not commit a private API key into the GitHub repository. Aither AI stores a user-entered key in that user's browser only. For a public deployment, the safer architecture is to put AIClient2API behind an Aither-controlled backend/proxy so the upstream credential is never exposed to the browser.

## GitHub Pages

The UI remains compatible with static GitHub Pages hosting, provided the configured AIClient2API endpoint permits browser CORS requests.

## Desktop

The existing Electron desktop target can use the same API client. Build it from `desktop/` with the existing project commands.

## Changelog

**4.3.0 — AIClient2API integration**
- Replaced the browser WebLLM chat engine with AIClient2API.
- Added model discovery.
- Added model selection and API-key settings.
- Kept local chats, Aither Account, mobile layout, and Force Update.
