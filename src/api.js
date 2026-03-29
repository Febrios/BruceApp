const API_BASE_URL = import.meta.env.VITE_BRUCE_API_BASE_URL || 'https://bruce-api-web.azurewebsites.net';

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Request failed with ${response.status}: ${text || response.statusText}`);
  }
  return response.json();
}

export async function fetchBruceInfo() {
  const res = await fetch(`${API_BASE_URL}/bruce/info`);
  return handleResponse(res);
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(res);
}
