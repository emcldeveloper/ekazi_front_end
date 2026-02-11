import { useEffect, useState } from "react";
import { TEMPLATES } from "../data/templates";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../Auth/LoginModal";

const AUTH_TOKEN_KEY = "auth_token";

export default function TemplateSlider() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(AUTH_TOKEN_KEY),
  );

  const total = TEMPLATES.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/jobseeker/sample-selection");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    navigate("/jobseeker/sample-selection");
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="text-base font-bold text-gray-900 mb-2">
            Available CV Templates
          </h3>
          <div
            className="w-full overflow-hidden rounded-lg cursor-pointer mb-2"
            onClick={handleClick}
          >
            <img
              src={TEMPLATES[index].image}
              alt=""
              className="w-full h-64 object-contain transition-opacity duration-700"
            />
          </div>

          <p className="text-xs text-gray-500 mb-3 leading-snug">
            Build a professional CV in minutes — completely free. Select your
            preferred design and get started right away. Click the link to
            register or log in.
          </p>
        </Card.Body>
      </Card>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
