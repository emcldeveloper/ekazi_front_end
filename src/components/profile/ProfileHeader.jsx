import { Card, Button, Image } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

const ProfileHeader = ({ profile, setShowBgModal, setShowProfileModal }) => {
  const bgImage = profile?.background_picture
    ? `https://api.ekazi.co.tz/${profile.background_picture.replace(/^\//, "")}`
    : "https://api.ekazi.co.tz/svg/dotted.svg";

  const profileImage = profile?.picture
    ? `https://api.ekazi.co.tz/${profile.picture.replace(/^\//, "")}`
    : "https://api.ekazi.co.tz/uploads/picture/pre_photo.jpg";

  return (
    <div className="position-relative">
      <Card.Img src={bgImage} style={{ height: 100, objectFit: "cover" }} />

      <Button
        size="sm"
        className="position-absolute top-0 end-0 m-2"
        onClick={() => setShowBgModal(true)}
      >
        <PencilFill size={12} />
      </Button>

      <div style={{ position: "absolute", bottom: -30, left: 16 }}>
        <Image
          src={profileImage}
          roundedCircle
          style={{ width: 80, height: 80 }}
        />
        <Button
          size="sm"
          className="position-absolute bottom-0 end-0"
          onClick={() => setShowProfileModal(true)}
        >
          <PencilFill size={12} />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
