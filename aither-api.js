const AITHER_API_BASE_DEFAULT = 'https://aiproxy.justlikemaki.vip/v1';
const AITHER_API_BASE_STORAGE = 'aither_ai_api_base';
const AITHER_API_KEY_STORAGE = 'aither_ai_api_key';
const AITHER_MODEL_STORAGE = 'aither_ai_model';
const AITHER_REQUEST_TIMEOUT = 45000;

function cleanBaseUrl(value) {
  return String(value || AITHER_API_BASE_DEFAULT).trim().replace(/\/+$/, '').replace(/\/v1$/i, '') + '/v1';
}

function errorFromResponse(status, data) {
  const message = data?.error?.message || data?.message || data?.error || data?.detail;
  if (message) return String(message);
  if (status === 401 || status === 403) return 'Authentication failed. Check your AIClient2API API key.';
  if (status === 404) return 'AIClient2API endpoint or model was not found.';
  if (status === 429) return 'AIClient2API is rate-limiting requests. Try again in a moment.';
  if (status >= 500) return 'AIClient2API server error. Try again shortly.';
  return `AI request failed (${status}).`;
}

async function request(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AITHER_REQUEST_TIMEOUT);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
    if (!response.ok) throw new Error(errorFromResponse(response.status, data));
    return data;
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('The AI request timed out. Check your connection and try again.');
    if (error instanceof TypeError) throw new Error('Could not reach AIClient2API. Check the endpoint, CORS settings, and your connection.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

const AitherAPI = {
  get baseUrl() { return cleanBaseUrl(localStorage.getItem(AITHER_API_BASE_STORAGE)); },
  set baseUrl(value) {
    const cleaned = cleanBaseUrl(value);
    if (cleaned === AITHER_API_BASE_DEFAULT) localStorage.removeItem(AITHER_API_BASE_STORAGE);
    else localStorage.setItem(AITHER_API_BASE_STORAGE, cleaned);
  },
  get apiKey() { return localStorage.getItem(AITHER_API_KEY_STORAGE) || ''; },
  set apiKey(value) { value ? localStorage.setItem(AITHER_API_KEY_STORAGE, String(value).trim()) : localStorage.removeItem(AITHER_API_KEY_STORAGE); },
  get model() { return localStorage.getItem(AITHER_MODEL_STORAGE) || 'gemini-2.5-flash'; },
  set model(value) { value ? localStorage.setItem(AITHER_MODEL_STORAGE, String(value).trim()) : localStorage.removeItem(AITHER_MODEL_STORAGE); },
  headers(json = false) {
    const headers = {};
    if (json) headers['Content-Type'] = 'application/json';
    if (this.apiKey) headers.Authorization = `Bearer ${this.apiKey}`;
    return headers;
  },
  async models() { return request(`${this.baseUrl}/models`, { headers: this.headers() }); },
  async chat(messages, options = {}) {
    if (!Array.isArray(messages) || !messages.length) throw new Error('Aither AI needs at least one message.');
    const data = await request(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: this.headers(true),
      body: JSON.stringify({ model: options.model || this.model, messages, temperature: options.temperature ?? 0.7, max_tokens: options.maxTokens ?? 2048, stream: false })
    });
    const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? '';
    if (Array.isArray(content)) return content.map(part => typeof part === 'string' ? part : part?.text || '').join('').trim();
    return String(content).trim();
  }
};

window.AitherAPI = AitherAPI;
