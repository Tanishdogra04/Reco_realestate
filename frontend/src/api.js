const API_BASE = '/api';

// ── Properties ────────────────────────────────────────────────────────────────
export async function fetchProperties(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/properties${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}

export async function fetchPropertyById(id) {
  const res = await fetch(`${API_BASE}/properties/${id}`);
  if (!res.ok) throw new Error('Failed to fetch property details');
  return res.json();
}

export async function createProperty(data, token) {
  const res = await fetch(`${API_BASE}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to create property');
  return json;
}

export async function updateProperty(id, data, token) {
  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to update property');
  return json;
}

export async function deleteProperty(id, token) {
  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to delete property');
  return json;
}

// ── Admin Auth ────────────────────────────────────────────────────────────────
export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}

// ── User Auth ────────────────────────────────────────────────────────────────
export async function userSignup(data) {
  const res = await fetch(`${API_BASE}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Signup failed');
  return json;
}

export async function userLogin(email, password) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Login failed');
  return json;
}

export async function requestSignupOTP(data) {
  const res = await fetch(`${API_BASE}/users/signup-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Verification request failed');
  return json;
}

export async function verifySignupOTP(data) {
  const res = await fetch(`${API_BASE}/users/signup-verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Verification failed');
  return json;
}

export async function updateUserProfile(data, token) {
  const res = await fetch(`${API_BASE}/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Profile update failed');
  return json;
}

export async function toggleSaveProperty(id, token) {
  const res = await fetch(`${API_BASE}/users/profile/toggle-save/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to toggle save');
  return json;
}

export async function fetchSavedProperties(token) {
  const res = await fetch(`${API_BASE}/users/profile/saved-properties`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Failed to fetch saved properties');
  return json;
}
