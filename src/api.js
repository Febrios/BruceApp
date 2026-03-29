const API_BASE_URL = import.meta.env.VITE_BRUCE_API_BASE_URL || 'https://bruce-api-web.azurewebsites.net';

function getAuthHeaders() {
  if (typeof window === 'undefined') return {};

  const token = window.localStorage.getItem('bruceBasicToken');
  if (!token) return {};

  return {
    Authorization: `Basic ${token}`,
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Request failed with ${response.status}: ${text || response.statusText}`);
  }
  return response.json();
}

export async function fetchBruceInfo() {
  const res = await fetch(`${API_BASE_URL}/bruce/info`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE_URL}/health`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return handleResponse(res);
}
