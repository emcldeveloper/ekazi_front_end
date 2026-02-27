import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  allThreadsApi,
  deleteThreadApi,
  readThreadApi,
  replyThreadApi,
  singleThreadApi,
} from "../../services/candidates/correspondence.service";
import Swal from "sweetalert2";

export const useAllThreads = (applicantId) =>
  useQuery({
    queryKey: ["correspondences", applicantId],
    queryFn: () => allThreadsApi(applicantId),
    enabled: !!applicantId,
  });

export const useSingleThread = (threadId) =>
  useQuery({
    queryKey: ["correspondences", threadId],
    queryFn: () => singleThreadApi(threadId),
    enabled: !!threadId,
  });

export const useDeleteThread = (applicantId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteThreadApi(id),
    onSuccess: () => {
      Swal.fire("Success", "Deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["correspondences", applicantId],
      });
    },
    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to delete", "error");
    },
  });
};

export const useReplyThread = (thread_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => replyThreadApi(thread_id),
    onSuccess: () => {
      Swal.fire("Success", "Experience added successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["correspondences", thread_id],
      });
    },
  });
};

export const useReadThread = (thread_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => readThreadApi(thread_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["correspondences", thread_id],
      });
    },
  });
};

// import { useState, useEffect } from "react";
// import CorrespondenceService from "../../services/candidates/correspondence.service";

// const ACTION_KEYWORDS = ["interview", "offer", "screening", "shortlisted"];

// const useCorrespondence = (applicantId) => {
//   const [correspondences, setCorrespondences] = useState([]);
//   const [activeThread, setActiveThread] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rejectReason, setRejectReason] = useState("");
//   const [showRejectModal, setShowRejectModal] = useState(false);

//   // Fetch correspondences on load or applicantId change
//   useEffect(() => {
//     if (!applicantId) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await CorrespondenceService.getAll(applicantId);

//         // Sort by important keywords
//         const sorted = [...data].sort((a, b) => {
//           const aIndex = ACTION_KEYWORDS.findIndex((kw) =>
//             (a.subject + " " + (a.type || "")).toLowerCase().includes(kw)
//           );
//           const bIndex = ACTION_KEYWORDS.findIndex((kw) =>
//             (b.subject + " " + (b.type || "")).toLowerCase().includes(kw)
//           );
//           const aPos = aIndex === -1 ? 99 : aIndex;
//           const bPos = bIndex === -1 ? 99 : bIndex;
//           if (aPos !== bPos) return aPos - bPos;
//           return new Date(b.created_at) - new Date(a.created_at);
//         });

//         setCorrespondences(sorted);

//         if (sorted.length) {
//           setActiveThread(sorted[0].id);
//           await markAsRead(sorted[0].id);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [applicantId]);

//   const activeCorrespondence = correspondences.find(
//     (c) => c.id === activeThread
//   );

//   const filteredThreads = correspondences.filter((c) =>
//     c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const canReply =
//     activeCorrespondence &&
//     ACTION_KEYWORDS.some((keyword) =>
//       (activeCorrespondence.subject + " " + (activeCorrespondence.type || ""))
//         .toLowerCase()
//         .includes(keyword)
//     );

//   // API calls
//   const markAsRead = async (id) => {
//     try {
//       await CorrespondenceService.markAsRead(id);
//       setCorrespondences((prev) =>
//         prev.map((c) => (c.id === id ? { ...c, is_read: 1 } : c))
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

// const reply = async (message) => {
//   if (!activeCorrespondence || typeof message !== "string" || !message.trim()) return;

//   setLoading(true);
//   try {
//     // Pass both threadId and message
//     const data = await CorrespondenceService.reply(activeCorrespondence.id, message);

//     // Update state with the new message
//     setCorrespondences((prev) =>
//       prev.map((c) =>
//         c.id === activeCorrespondence.id
//           ? { ...c, messages: [...(c.messages || []), data] }
//           : c
//       )
//     );
//   } catch (error) {
//     console.error(error);
//     alert(error.message || "Failed to send reply");
//   }
//   setLoading(false);
// };

//   const removeCorrespondence = async (id) => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       await CorrespondenceService.deleteThread(id);
//       setCorrespondences((prev) => prev.filter((c) => c.id !== id));

//       if (activeThread === id) {
//         const remaining = correspondences.filter((c) => c.id !== id);
//         setActiveThread(remaining.length ? remaining[0].id : null);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.message || "Failed to delete correspondence");
//     }
//     setLoading(false);
//   };

//   return {
//     correspondences: filteredThreads,
//     activeCorrespondence,
//     activeThread,
//     setActiveThread,
//     loading,
//     searchTerm,
//     setSearchTerm,
//     canReply,
//     showRejectModal,
//     setShowRejectModal,
//     rejectReason,
//     setRejectReason,
//     reply, // send a message
//     markAsRead,
//     removeCorrespondence, // delete a thread
//   };
// };

// export default useCorrespondence;
