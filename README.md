# Aither AI 🤖

Aither AI is a browser-first AI chat app designed to feel fast and native on phones, tablets, desktops, and the Electron desktop app. **Users do not enter an API key, install Ollama, or configure a cloud AI provider.** The supported web AI engine runs directly on the device with WebGPU.

## Version 4.2.0

### ✨ Next-generation chat foundation
- Keeps the no-API-key, browser-first architecture.
- Keeps GitHub Pages compatibility.
- Keeps the Electron desktop target.
- Keeps local conversation history on the device.
- Keeps the existing Aither Account integration.
- Keeps mobile sidebar and safe-area support.

### 🤖 Browser AI
- Uses WebLLM with `Llama-3.2-1B-Instruct-q4f16_1-MLC`.
- Runs inference directly on the device through WebGPU.
- No user API key is requested or stored.
- No Hugging Face, Ollama, or OpenAI API dependency.
- Model loading continues to show visible progress before chat becomes available.

### 📱 Mobile-first behavior
- Touch-friendly controls.
- Slide-in sidebar with tap-outside close behavior.
- Responsive settings sheet.
- iPhone safe-area support.
- Responsive model-download panel.
- Reduced-motion support.

### 🖥️ Desktop app
- Electron desktop app in `desktop/`.
- Windows NSIS installer target.
- macOS DMG target.
- Linux AppImage target.
- Secure Electron context isolation and sandboxing.
- Desktop app keeps the browser-based, no-API-key architecture.

### ⚙️ Settings
- Aither Account integration.
- Force Update.
- Clear Chats.
- Browser AI status.
- Current version display.

## Build the desktop app

```bash
cd desktop
npm install
npm start
```

To build installers:

```bash
npm run build
```

Electron Builder creates platform-specific output in `desktop/dist/`.

## 🔐 No API key

Aither AI does **not** ask users for an API key. The model runs locally in the browser or desktop app using WebGPU.

## 🧠 How it works

```text
Aither AI Web / Desktop
          │
          ▼
       WebLLM
          │
          ▼
       WebGPU
          │
          ▼
 Llama 3.2 1B model
          │
          ▼
    User's device
```

The model is downloaded the first time it is needed. Aither AI displays download progress while it loads. The browser or desktop app may cache the model for later use.

## 🌐 GitHub Pages

The web version is designed to work as a static GitHub Pages site. Normal AI chat does not require `/api/chat` or a backend server.

## 🌍 Browser/Desktop support

WebGPU is required for the browser AI engine. Use a recent browser or desktop GPU/driver with WebGPU support. Older devices may not have enough GPU memory for the selected model.

## 📖 Changelog

**4.2.0 — Chat foundation refresh**
- Refreshed the project documentation around the current browser-first architecture.
- Preserved the no-API-key design.
- Preserved GitHub Pages and Electron targets.
- Documented the current mobile, account, settings, and WebGPU architecture.

**4.1.1 — Mobile & Polish**
- Fixed mobile sidebar state mismatch.
- Fixed mobile backdrop behavior.
- Improved responsive layouts.
- Added accessibility labels.
- Updated README.

**4.1.0 — Desktop App**
- Added Electron desktop app.
- Added Windows NSIS, macOS DMG, and Linux AppImage targets.
- Added secure preload bridge.
- Added sandboxed/context-isolated Electron configuration.
- Added desktop build instructions.

**4.0.1 — Model Download Progress**
- Added download percentage.
- Added visual download progress bar.
- Added estimated time remaining.
- Added loading status text.
- Added completion state.

**4.0.0 — Browser AI Rebuild**
- Rebuilt Aither AI around in-browser WebLLM inference.
- Removed the `/api/chat` requirement from the frontend.
- Removed the user API-key flow.
- Added WebGPU model initialization.
- Added model download/loading progress.
- Added WebGPU compatibility handling.
- Kept local conversation history.
- Kept mobile sidebar and Settings.
- Kept Force Update.
