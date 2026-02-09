// src/services/candidates/correspondence.service.js

const API_BASE = "https://api.ekazi.co.tz/api/applicant/correspondences";

// You can replace this with a real auth token or pass it dynamically
const AUTH_TOKEN = "YOUR_TOKEN_HERE";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
};

const CorrespondenceService = {
  /**
   * Fetch correspondences for a specific applicant
   * @param {number} applicantId
   * @returns {Promise<Array>}
   */
  getAll: async (applicantId) => {
    const url = `${API_BASE}?applicant_id=${applicantId}`;
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch correspondences");
    return data.data || [];
  },

  /**
   * Mark a correspondence as read
   * @param {number} id
   */
  markAsRead: async (id) => {
    const url = `${API_BASE}/${id}/read`;
    const res = await fetch(url, { method: "POST", headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to mark as read");
    return data;
  },

  /**
   * Accept an applicant's stage (interview/offer/screening/shortlisted)
   * @param {number} id
   */
  accept: async (id) => {
    const url = `${API_BASE}/${id}/accept`;
    const res = await fetch(url, { method: "POST", headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to accept applicant");
    return data;
  },

  /**
   * Reject an applicant's stage with reason
   * @param {number} id
   * @param {string} reason
   */
  reject: async (id, reason) => {
    if (!reason || !reason.trim()) throw new Error("Reject reason is required");
    const url = `${API_BASE}/${id}/reject`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to reject applicant");
    return data;
  },

    delete: async (id) => {
    if (!id) throw new Error("Correspondence ID is required for deletion");
    const url = `${API_BASE}/${id}`;
    const res = await fetch(url, { method: "DELETE", headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete correspondence");
    return data;
  },
  
};

export default CorrespondenceService;
