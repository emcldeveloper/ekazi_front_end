import api from "../../lib/axios";

export const allThreadsApi = async (applicant_id) => {
  const res = await api.get("/applicant/correspondences", {
    params: { applicant_id },
  });

  return res.data.data;
};

export const singleThreadApi = async (thread_id) => {
  const res = await api.get(`/applicant/correspondences/${thread_id}`);
  return res.data;
};

export const deleteThreadApi = async (thread_id) => {
  const res = await api.delete(`/applicant/correspondences/${thread_id}`);
  return res.data;
};

export const replyThreadApi = async ({ thread_id, message }) => {
  const res = await api.post(`/applicant/correspondences/${thread_id}/reply`, {
    message,
  });
  return res.data;
};

export const readThreadApi = async (thread_id) => {
  const res = await api.post(`/applicant/correspondences/${thread_id}/read`);
  return res.data;
};

// const API_BASE = "https://api.ekazi.co.tz/api/applicant/correspondences";

// // Replace this with a real auth token dynamically
// const AUTH_TOKEN = "YOUR_TOKEN_HERE";

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${AUTH_TOKEN}`,
// };

// const CorrespondenceService = {
//   /**
//    * Fetch all correspondence threads for an applicant
//    * @param {number} applicantId
//    * @returns {Promise<Array>}
//    */
//   getAll: async (applicantId) => {
//     if (!applicantId) throw new Error("Applicant ID is required");
//     const url = `${API_BASE}?applicant_id=${applicantId}`;
//     const res = await fetch(url, { headers });
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(data.message || "Failed to fetch correspondences");
//     return data.data || [];
//   },

//   /**
//    * Fetch a single thread with all messages
//    * @param {number} threadId
//    */
//   getThread: async (threadId) => {
//     if (!threadId) throw new Error("Thread ID is required");
//     const url = `${API_BASE}/${threadId}`;
//     const res = await fetch(url, { headers });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to fetch thread");
//     return data.data || {};
//   },

//   /**
//    * Reply to a correspondence thread
//    * @param {number} threadId
//    * @param {string} message
//    */
//   reply: async (threadId, message) => {
//     if (!threadId) throw new Error("Thread ID is required");
//     if (!message || !message.trim()) throw new Error("Message is required");
//     const url = `${API_BASE}/${threadId}/reply`;
//     const res = await fetch(url, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({ message }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to send reply");
//     return data.data;
//   },

//   /**
//    * Mark a thread as read
//    * @param {number} threadId
//    */
//   markAsRead: async (threadId) => {
//     if (!threadId) throw new Error("Thread ID is required");
//     const url = `${API_BASE}/${threadId}/read`;
//     const res = await fetch(url, { method: "POST", headers });
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(data.message || "Failed to mark thread as read");
//     return data;
//   },

//   /**
//    * Soft delete a thread (hide from applicant)
//    * @param {number} threadId
//    */
//   deleteThread: async (threadId) => {
//     if (!threadId) throw new Error("Thread ID is required");
//     const url = `${API_BASE}/${threadId}`;
//     const res = await fetch(url, { method: "DELETE", headers });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Failed to delete thread");
//     return data;
//   },
// };

// export default CorrespondenceService;
