import { useMemo, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";

/* ----------------------------------------
 * Utils
 * ------------------------------------- */
const buildEmbedUrl = (url) => {
  if (!url) return "";

  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";

    if (url.includes("youtube.com")) {
      videoId = url.split("v=")[1];
      const ampersand = videoId?.indexOf("&");
      if (ampersand !== -1) videoId = videoId.substring(0, ampersand);
    } else {
      videoId = url.split("/").pop();
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo
  if (url.includes("vimeo.com")) {
    const videoId = url.split("/").pop();
    return `https://player.vimeo.com/video/${videoId}`;
  }

  // Direct video
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return url;
  }

  return "";
};

const CvVideoCard = () => {
  /* ----------------------------------------
   * Demo applicant data (replace later)
   * ------------------------------------- */
  const applicant = {
    id: 1,
    name: "Jane Doe",
    title: "Frontend Developer CV",
    thumbnail: "https://i.ytimg.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    addedDate: "2023-01-15",
  };

  const { name, title, thumbnail, videoUrl, addedDate } = applicant;

  /* ----------------------------------------
   * Modal + form
   * ------------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: "",
      title: "",
    },
  });

  const watchedUrl = watch("url");

  const embedUrl = useMemo(() => buildEmbedUrl(watchedUrl), [watchedUrl]);

  const isPreviewReady = Boolean(embedUrl);

  /* ----------------------------------------
   * Handlers
   * ------------------------------------- */
  const handleClose = () => {
    setShowModal(false);
    setPreviewUrl("");
    reset();
  };

  const handlePreview = () => {
    if (!embedUrl) {
      alert("Please enter a valid YouTube, Vimeo, or video file URL");
      return;
    }
    setPreviewUrl(embedUrl);
  };

  const onSubmit = (data) => {
    const payload = {
      url: data.url,
      title: data.title || "My CV Video",
      previewUrl,
    };

    console.log("Saving CV video:", payload);

    // TODO: replace with React Query mutation
    handleClose();
  };

  /* ----------------------------------------
   * Render
   * ------------------------------------- */
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              <b>CV PROFILE VIDEO</b>
            </h6>

            <div className="d-flex gap-2">
              <Button
                variant="link"
                className="p-0 border-0 bg-transparent"
                onClick={() => setShowModal(true)}
              >
                <Plus size={22} className="text-muted" />
              </Button>

              <Link to={`/detail-exprience?expd=${applicant.id}`}>
                <Pencil size={18} className="text-muted" />
              </Link>
            </div>
          </div>

          <div className="mb-3 divider" />

          <div style={{ position: "relative" }}>
            <img
              src={thumbnail}
              alt="CV Preview"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                cursor: "pointer",
                borderRadius: "8px",
              }}
              onClick={() => window.open(videoUrl, "_blank")}
            >
              <FontAwesomeIcon icon={faPlayCircle} className="me-2" />
              View Full CV Video
            </div>
          </div>

          <div className="mt-3">
            <h6 className="mb-1">
              {name} – {title}
            </h6>
            <p className="text-muted mb-1">{videoUrl}</p>
            <small className="text-muted">
              Added on {moment(addedDate).format("MMM D, YYYY")}
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* ----------------------------------------
       * Add Video Modal
       * ------------------------------------- */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Add CV Video</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Video URL</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="url"
                  placeholder="YouTube, Vimeo, or direct video URL"
                  {...register("url", {
                    required: "Video URL is required",
                  })}
                  isInvalid={!!errors.url}
                  className="me-2"
                />
                <Button type="button" onClick={handlePreview}>
                  Preview
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.url?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {previewUrl && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Video Preview</Form.Label>
                  <div className="ratio ratio-16x9 rounded overflow-hidden">
                    <iframe
                      src={previewUrl}
                      title="CV video preview"
                      allowFullScreen
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a title"
                    {...register("title")}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!previewUrl}>
              Save Video
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <style>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
        }
      `}</style>
    </>
  );
};

export default CvVideoCard;
