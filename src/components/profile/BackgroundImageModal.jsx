import { Modal, Button, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useSaveBackgroundImage } from "../../hooks/useUniversal";

const BackgroundImageModal = ({
  profile,
  showBgModal,
  setShowBgModal,
  applicant_id,
}) => {
  const { handleSubmit, control, reset } = useForm();

  const { mutate: saveBackgroundImage, isPending: isLoading } =
    useSaveBackgroundImage({
      onSuccess: () => {
        Swal.fire("Success!", "Background updated", "success");
        setShowBgModal(false);
        reset();
      },
      onError: () => {
        Swal.fire("Error!", "Failed to update background", "error");
      },
    });

  const [preview, setPreview] = useState(
    profile?.background_picture
      ? `https://api.ekazi.co.tz/${profile.background_picture.replace(
          /^\//,
          ""
        )}`
      : "https://api.ekazi.co.tz/svg/dotted.svg"
  );

  const handleFileChange = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      Swal.fire("Error!", "Invalid image format", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = ({ background_picture }) => {
    if (!background_picture) {
      Swal.fire("Error!", "Please select an image", "error");
      return;
    }

    const formData = new FormData();
    formData.append("background_picture", background_picture);
    formData.append("applicant_id", applicant_id);

    saveBackgroundImage(formData);
  };

  return (
    <Modal
      show={showBgModal}
      onHide={() => setShowBgModal(false)}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Background Image</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <Image
          src={preview}
          style={{ width: "100%", height: 150, objectFit: "cover" }}
          className="mb-3"
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="background_picture"
            control={control}
            render={({ field }) => (
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                  handleFileChange(e.target.files[0]);
                }}
              />
            )}
          />

          <div className="mt-3 d-flex justify-content-end gap-2">
            <Button
              variant="outline-secondary"
              onClick={() => setShowBgModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BackgroundImageModal;
