import { Modal, Button, Form, Image } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import getCroppedImg from "../../utils/cropImage";
import { useSaveProfileImage } from "../../hooks/useUniversal";

const ProfileImageModals = ({
  profile,
  showProfileModal,
  setShowProfileModal,
  showCropModal,
  setShowCropModal,
  applicant_id,
}) => {
  const { handleSubmit, control, reset } = useForm();

  const { mutate: saveProfileImage, isPending: isLoading } =
    useSaveProfileImage({
      onSuccess: () => {
        Swal.fire("Success!", "Profile updated", "success");
        setShowProfileModal(false);
        reset();
      },
      onError: () => {
        Swal.fire("Error!", "Failed to update profile", "error");
      },
    });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const profileImage = profile?.picture
    ? `https://api.ekazi.co.tz/${profile.picture.replace(/^\//, "")}`
    : "https://api.ekazi.co.tz/uploads/picture/pre_photo.jpg";

  const handleUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const showCroppedImage = async () => {
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
    setShowCropModal(false);
  };

  const onSubmit = async () => {
    if (!croppedImage) {
      Swal.fire("Error!", "Please crop the image first", "error");
      return;
    }

    const blob = await fetch(croppedImage).then((r) => r.blob());
    const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("applicant_id", applicant_id);

    saveProfileImage(formData);
  };

  return (
    <>
      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Image</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Image
            src={croppedImage || profileImage}
            roundedCircle
            style={{ width: 200, height: 200, objectFit: "cover" }}
            className="mb-3"
          />

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="picture"
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleUpload(e.target.files[0]);
                  }}
                />
              )}
            />

            <div className="mt-3 d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowProfileModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={!croppedImage || isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ----------------------------------
       * Crop Modal
       * ---------------------------------- */}
      <Modal
        show={showCropModal}
        onHide={() => setShowCropModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{ height: 400, position: "relative" }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <Form.Range
            className="mt-3"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCropModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={showCroppedImage}>
            Crop & Preview
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileImageModals;
