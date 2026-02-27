import { useMemo, useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  Button,
  Row,
  Col,
  Container,
  Spinner,
} from "react-bootstrap";
import { Envelope, Trash } from "react-bootstrap-icons";
import dayjs from "dayjs";

import {
  useAllThreads,
  useDeleteThread,
} from "../../hooks/candidates/useCorrespondence";
import Swal from "sweetalert2";

const ApplicantCorrespondence = () => {
  const applicantId = localStorage.getItem("applicantId");

  // fetching all correspondences
  const { data: correspondences = [], isPending: isLoading } =
    useAllThreads(applicantId);

  // for deleting
  const { mutate: deleteThread, isPending: isDeleting } = useDeleteThread();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeThreadId, setActiveThreadId] = useState(null);

  // for searching
  const filteredThreads = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return correspondences;

    return correspondences.filter((c) => {
      const subject = (c.subject || "").toLowerCase().trim();
      return subject.includes(term);
    });
  }, [correspondences, searchTerm]);

  // Active notifications
  const activeCorrespondence = useMemo(() => {
    return correspondences.find((c) => c.id === activeThreadId);
  }, [correspondences, activeThreadId]);

  const handleDelete = async () => {
    if (!activeThreadId) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This correspondence will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteThread(activeThreadId, {
        onSuccess: () => {
          setActiveThreadId(null);
        },
      });
    }
  };

  const getStageBadge = (subject = "") => {
    const text = subject.toLowerCase();

    if (text.includes("offer")) return ["OFFER", "success"];
    if (text.includes("interview")) return ["INTERVIEW", "warning"];
    if (text.includes("screening")) return ["SCREENING", "danger"];
    if (text.includes("shortlisted")) return ["SHORTLISTED", "primary"];
    if (text.includes("applied")) return ["APPLIED", "secondary"];
    if (text.includes("employed")) return ["EMPLOYED", "success"];

    return null;
  };

  return (
    <Container fluid className="p-0">
      <Row className="">
        {/* ================= SIDEBAR ================= */}
        <Col md={4} className="border-end bg-light d-flex flex-column">
          <div className="pb-3 border-bottom bg-white">
            <h5 className="mb-4 fw-bold">Correspondences</h5>
            <Form.Control
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
            {isLoading && (
              <div className="text-center p-4">
                <Spinner animation="border" />
              </div>
            )}

            {!isLoading && filteredThreads.length === 0 && (
              <div className="text-center text-muted p-4">
                No correspondences found
              </div>
            )}

            {filteredThreads.map((c) => {
              const badge = getStageBadge(c.subject);

              return (
                <ListGroup.Item
                  key={c.id}
                  action
                  active={c.id === activeThreadId}
                  onClick={() => setActiveThreadId(c.id)}
                  className="d-flex justify-content-between align-items-center rounded"
                >
                  <div className="text-truncate">
                    {c.subject}
                    {c.messages?.length > 1 && (
                      <small className="ms-2 text-muted">
                        ({c.messages.length})
                      </small>
                    )}
                  </div>

                  {badge && (
                    <span className={`badge bg-${badge[1]}`}>{badge[0]}</span>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>

        {/* ================= CONTENT ================= */}
        <Col md={8}>
          <Card className="border-0">
            <Card.Header>
              <h5 className="mb-0">
                {activeCorrespondence?.subject || "Select a message"}
              </h5>
            </Card.Header>

            <Card.Body className="overflow-auto">
              {!activeCorrespondence ? (
                <div className="d-flex flex-column align-items-center text-muted mt-5">
                  <Envelope size={50} />
                  <p className="mt-3">Select a correspondence</p>
                </div>
              ) : (
                (activeCorrespondence.messages || []).map((m, i) => (
                  <div key={i}>
                    <p>{m.message}</p>
                    <small className="text-muted">
                      {dayjs(m.created_at).format("MMM D, YYYY h:mm A")}
                    </small>
                    <hr />
                  </div>
                ))
              )}
            </Card.Body>

            {activeCorrespondence && (
              <Card.Footer className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-danger"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="d-flex align-items-center gap-1"
                >
                  <Trash /> Delete
                </Button>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicantCorrespondence;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   ListGroup,
//   Form,
//   Button,
//   Row,
//   Col,
//   Container,
//   Modal,
// } from "react-bootstrap";
// import { Envelope, Trash, CheckCircle, XCircle } from "react-bootstrap-icons";
// import dayjs from "dayjs";
// import useCorrespondence from "../../hooks/candidates/useCorrespondence";

// const ITEMS_PER_PAGE = 5;

// const ApplicantCorrespondence = ({ applicantId, setCorrespondences }) => {
//   const {
//     correspondences,
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
//     reply,
//     removeCorrespondence,
//   } = useCorrespondence(78);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [openThreads, setOpenThreads] = useState({});

//   useEffect(() => setCurrentPage(1), [searchTerm]);

//   useEffect(() => {
//     setCorrespondences?.(correspondences);
//   }, [correspondences, setCorrespondences]);

//   const totalPages = Math.ceil(correspondences.length / ITEMS_PER_PAGE);

//   const paginatedThreads = correspondences.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );

//   const toggleThread = (id) => {
//     setOpenThreads((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleDelete = async () => {
//     if (!activeCorrespondence) return;
//     await removeCorrespondence(activeCorrespondence.id);
//     setShowDeleteModal(false);
//   };

//   const handleAccept = async () => {
//     if (!activeCorrespondence) return;
//     const message = `Your application for "${activeCorrespondence.subject}" has been accepted.`;
//     await reply(message);
//   };

//   const handleReject = async () => {
//     if (!activeCorrespondence || !rejectReason.trim()) return;
//     const message = `Your application for "${activeCorrespondence.subject}" has been rejected. Reason: ${rejectReason}`;
//     await reply(message);
//     setRejectReason("");
//     setShowRejectModal(false);
//   };

//   const getStageBadge = (subject) => {
//     const text = subject.toLowerCase();
//     if (text.includes("offer")) return ["OFFER", "success"];
//     if (text.includes("interview")) return ["INTERVIEW", "warning"];
//     if (text.includes("screening")) return ["SCREENING", "danger"];
//     if (text.includes("shortlisted")) return ["SHORTLISTED", "primary"];
//     if (text.includes("applied")) return ["APPLIED", "secondary"];
//     if (text.includes("employed")) return ["EMPLOYED", "success"];
//     return null;
//   };

//   return (
//     <Container fluid className="p-0 h-100">
//       <Row className="g-0 h-100">
//         {/* ================= SIDEBAR ================= */}
//         <Col md={3} className="border-end bg-light d-flex flex-column">
//           <div className="p-3 border-bottom bg-white">
//             <h5>Correspondences</h5>
//             <Form.Control
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
//             {paginatedThreads.map((c) => {
//               const badge = getStageBadge(c.subject);
//               const hasChildren = c.messages && c.messages.length > 1;
//               const isOpen = openThreads[c.id];

//               return (
//                 <React.Fragment key={c.id}>
//                   {/* Parent */}
//                   <ListGroup.Item
//                     action
//                     active={c.id === activeThread}
//                     onClick={() =>
//                       hasChildren ? toggleThread(c.id) : setActiveThread(c.id)
//                     }
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div className="text-truncate">
//                       {c.subject}
//                       {hasChildren && (
//                         <small className="ms-2 text-muted">
//                           ({c.messages.length})
//                         </small>
//                       )}
//                     </div>

//                     <div className="d-flex gap-1 align-items-center">
//                       {badge && (
//                         <span className={`badge bg-${badge[1]}`}>
//                           {badge[0]}
//                         </span>
//                       )}
//                       {hasChildren && (
//                         <span className="text-muted">{isOpen ? "▾" : "▸"}</span>
//                       )}
//                     </div>
//                   </ListGroup.Item>

//                   {/* Children (Thread) */}
//                   {hasChildren && isOpen && (
//                     <>
//                       {c.messages.map((m, idx) => (
//                         <ListGroup.Item
//                           key={idx}
//                           action
//                           className="ps-5 small"
//                           onClick={() => setActiveThread(c.id)}
//                         >
//                           <div className="text-truncate">
//                             {m.message.slice(0, 40)}…
//                           </div>
//                           <small className="text-muted">
//                             {dayjs(m.created_at).format("MMM D, h:mm A")}
//                           </small>
//                         </ListGroup.Item>
//                       ))}
//                     </>
//                   )}
//                 </React.Fragment>
//               );
//             })}
//           </ListGroup>
//         </Col>

//         {/* ================= CONTENT ================= */}
//         <Col md={9}>
//           <Card className="h-100 border-0">
//             <Card.Header>
//               <h5>{activeCorrespondence?.subject || "Select a message"}</h5>
//             </Card.Header>

//             <Card.Body className="overflow-auto">
//               {!activeCorrespondence ? (
//                 <div className="text-center text-muted">
//                   <Envelope size={40} />
//                 </div>
//               ) : (
//                 (activeCorrespondence.messages || [activeCorrespondence]).map(
//                   (m, i) => (
//                     <div key={i}>
//                       <p>{m.message}</p>
//                       <small className="text-muted">
//                         {dayjs(m.created_at).format("MMM D, h:mm A")}
//                       </small>
//                       <hr />
//                     </div>
//                   ),
//                 )
//               )}
//             </Card.Body>

//             {activeCorrespondence && (
//               <Card.Footer className="d-flex justify-content-end gap-2">
//                 {canReply && (
//                   <>
//                     <Button
//                       variant="outline-danger"
//                       onClick={() => setShowRejectModal(true)}
//                     >
//                       <XCircle /> Reject
//                     </Button>

//                     <Button variant="success" onClick={handleAccept}>
//                       <CheckCircle /> Accept
//                     </Button>
//                   </>
//                 )}

//                 <Button
//                   variant="danger"
//                   onClick={() => setShowDeleteModal(true)}
//                 >
//                   <Trash /> Delete
//                 </Button>
//               </Card.Footer>
//             )}
//           </Card>
//         </Col>
//       </Row>

//       {/* ================= REJECT MODAL ================= */}
//       <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Reject Application</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             value={rejectReason}
//             onChange={(e) => setRejectReason(e.target.value)}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleReject}>
//             Confirm Reject
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ================= DELETE MODAL ================= */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Correspondence</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this correspondence?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ApplicantCorrespondence;
