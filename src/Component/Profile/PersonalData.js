import React, { useState } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileImageModals from "../../components/profile/ProfileImageModals";
import BackgroundImageModal from "../../components/profile/BackgroundImageModal";
import PersonalInfo from "../../components/profile/PersonalInfo";
import ContactModal from "../../components/profile/ContactModal";
import BasicInfoModal from "../../components/profile/BasicInfoModal";

const ProfileSection = ({ profile, address, phone }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const [showContactModal, setShowContactModal] = useState(false);
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showBgModal, setShowBgModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  return (
    <>
      <ProfileHeader
        profile={profile}
        setShowBgModal={setShowBgModal}
        setShowProfileModal={setShowProfileModal}
      />

      <ProfileImageModals
        profile={profile}
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        showCropModal={showCropModal}
        setShowCropModal={setShowCropModal}
        applicant_id={applicant_id}
      />

      <BackgroundImageModal
        profile={profile}
        showBgModal={showBgModal}
        setShowBgModal={setShowBgModal}
        applicant_id={applicant_id}
      />

      <PersonalInfo
        profile={profile}
        address={address}
        setShowContactModal={setShowContactModal}
        setShowBasicInfoModal={setShowBasicInfoModal}
      />

      <ContactModal
        profile={profile}
        address={address}
        phone={phone}
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
      />

      <BasicInfoModal
        profile={profile}
        address={address}
        phone={phone}
        show={showBasicInfoModal}
        onHide={() => setShowBasicInfoModal(false)}
      />
    </>
  );
};

export default ProfileSection;
