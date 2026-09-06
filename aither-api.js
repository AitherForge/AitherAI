const AITHER_API_BASE = 'https://aiproxy.justlikemaki.vip/v1';
const AITHER_API_KEY_STORAGE = 'aither_ai_api_key';
const AITHER_MODEL_STORAGE = 'aither_ai_model';

const AitherAPI = {
  baseUrl: AITHER_API_BASE,
  get apiKey() { return localStorage.getItem(AITHER_API_KEY_STORAGE) || ''; },
  set apiKey(value) { value ? localStorage.setItem(AITHER_API_KEY_STORAGE, value.trim()) : localStorage.removeItem(AITHER_API_KEY_STORAGE); },
  get model() { return localStorage.getItem(AITHER_MODEL_STORAGE) || 'gemini-2.5-flash'; },
  set model(value) { value ? localStorage.setItem(AITHER_MODEL_STORAGE, value.trim()) : localStorage.removeItem(AITHER_MODEL_STORAGE); },

  async models() {
    const headers = this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {};
    const r = await fetch(`${this.baseUrl}/models`, { headers });
    if (!r.ok) throw new Error(`Model request failed (${r.status})`);
    return r.json();
  },

  async chat(messages, options = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;
    const r = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: options.model || this.model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1024,
        stream: false
      })
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data?.error?.message || data?.message || `AI request failed (${r.status})`);
    return data?.choices?.[0]?.message?.content?.trim() || '';
  }
};

window.AitherAPI = AitherAPI;
