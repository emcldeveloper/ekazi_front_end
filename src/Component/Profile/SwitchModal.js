import AddEducationModal from "../../components/education/AddEducationModal";
import AddLanguageModal from "../../components/languages/AddLanguageModal";
import EditCareerProfileModal from "../../components/career/EditCareerProfileModal";
export const ModalSwitcher = ({
  activeModal,
  onClose,
  applicant,
  onSuccess,
}) => {
  const handleSuccess = () => {
    onSuccess?.(); // Notify parent of successful submission
    onClose(); // Close the modal
  };

  switch (activeModal?.toLowerCase()) {
    case "education":
      return (
        <AddEducationModal
          show={true}
          onHide={handleSuccess}
          applicant={applicant}
        />
      );
    case "languages":
      return (
        <AddLanguageModal
          show={true}
          onHide={handleSuccess}
          applicant={applicant}
        />
      );
    case "career objective":
      return (
        <EditCareerProfileModal
          isOpen={true}
          onClose={handleSuccess}
          applicant={applicant}
        />
      );
    default:
      return null;
  }
};
