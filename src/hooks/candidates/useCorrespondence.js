import { useState, useEffect } from "react";
import CorrespondenceService from "../../services/candidates/correspondence.service";

const ACTION_KEYWORDS = ["interview", "offer", "screening", "shortlisted"];

const useCorrespondence = (applicantId, token) => {
  const [correspondences, setCorrespondences] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  // Fetch correspondences on load or applicantId change
  useEffect(() => {
    if (!applicantId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await CorrespondenceService.getAll(applicantId, token);
        // Sort by important keywords
        const sorted = [...data].sort((a, b) => {
          const aIndex = ACTION_KEYWORDS.findIndex((kw) =>
            (a.subject + " " + (a.type || "")).toLowerCase().includes(kw)
          );
          const bIndex = ACTION_KEYWORDS.findIndex((kw) =>
            (b.subject + " " + (b.type || "")).toLowerCase().includes(kw)
          );
          const aPos = aIndex === -1 ? 99 : aIndex;
          const bPos = bIndex === -1 ? 99 : bIndex;
          if (aPos !== bPos) return aPos - bPos;
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setCorrespondences(sorted);

        if (sorted.length) {
          setActiveThread(sorted[0].id);
          await markAsRead(sorted[0].id);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [applicantId, token]);

  const activeCorrespondence = correspondences.find(
    (c) => c.id === activeThread
  );

  const filteredThreads = correspondences.filter((c) =>
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canReply =
    activeCorrespondence &&
    ACTION_KEYWORDS.some((keyword) =>
      (activeCorrespondence.subject + " " + (activeCorrespondence.type || ""))
        .toLowerCase()
        .includes(keyword)
    );

  // API calls
  const markAsRead = async (id) => {
    try {
      await CorrespondenceService.markAsRead(id, token);
      setCorrespondences((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_read: 1 } : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const reply = async (message) => {
    if (!activeCorrespondence || !message.trim()) return;
    setLoading(true);
    try {
      const data = await CorrespondenceService.reply(
        activeCorrespondence.id,
        message,
        token
      );
      alert(data.message || "Reply sent ✅");
      setReplyMessage("");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to send reply");
    }
    setLoading(false);
  };

  // Remove correspondence
  const removeCorrespondence = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      await CorrespondenceService.deleteThread(id, token);
      setCorrespondences((prev) => prev.filter((c) => c.id !== id));

      // Reset active thread if deleted
      if (activeThread === id) {
        const remaining = correspondences.filter((c) => c.id !== id);
        setActiveThread(remaining.length ? remaining[0].id : null);
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to delete correspondence");
    }
    setLoading(false);
  };

  return {
    correspondences: filteredThreads,
    activeCorrespondence,
    activeThread,
    setActiveThread,
    loading,
    searchTerm,
    setSearchTerm,
    canReply,
    replyMessage,
    setReplyMessage,
    reply, // replaces accept/reject
    removeCorrespondence,
  };
};

export default useCorrespondence;
