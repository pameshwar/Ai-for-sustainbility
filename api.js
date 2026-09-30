const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

function getAuthHeader() {
  const token = localStorage.getItem('ecopulse_token') || 'demo-token';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'x-demo-user': 'true'
  };
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getLatestAssessment() {
    const res = await fetch(`${API_BASE}/assessment/latest`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load assessment');
    return res.json();
  },

  async triggerAudit(timeRange = '7d') {
    const res = await fetch(`${API_BASE}/assessment/generate`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ timeRange })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.details || err.error || 'Audit generation failed');
    }
    return res.json();
  },

  async getTelemetry(resourceType = '', limit = 168) {
    const url = new URL(`${API_BASE}/telemetry`);
    if (resourceType) url.searchParams.append('resource_type', resourceType);
    if (limit) url.searchParams.append('limit', limit);

    const res = await fetch(url.toString(), {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to load telemetry readings');
    return res.json();
  },

  async injectSpike(domain = 'energy_hvac') {
    const res = await fetch(`${API_BASE}/telemetry/simulate-spike`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ domain })
    });
    if (!res.ok) throw new Error('Failed to inject simulation spike');
    return res.json();
  },

  async updateActionItemStatus(id, status) {
    const res = await fetch(`${API_BASE}/action-items/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update action item status');
    return res.json();
  },

  async saveOnboarding(data) {
    const res = await fetch(`${API_BASE}/onboarding`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.details ? JSON.stringify(err.details) : err.error || 'Onboarding failed');
    }
    return res.json();
  },

  async getFacilityProfile() {
    const res = await fetch(`${API_BASE}/onboarding/profile`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to fetch facility profile');
    return res.json();
  },

  async getSustainabilityReport() {
    const res = await fetch(`${API_BASE}/reports/sustainability`, {
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Failed to fetch sustainability report');
    return res.json();
  },

  async seedDemo() {
    const res = await fetch(`${API_BASE}/seed-demo`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return res.json();
  }
};
