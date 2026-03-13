import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import RegisterModal from "../pages/Auth/RegisterModal";
import LoginModal from "../pages/Auth/LoginModal";
import { useModal } from "../hooks/modal/useModal";
import { Modal } from "../components/ui/modal";

export default function AppNavbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/jobs" },
    { name: "Employers", path: "/employers" },
    { name: "CV Builder", path: "/cv-builder" },
    { name: "Salary Calculator", path: "/salary-calculator" },
    { name: "Pricing", path: "/pricelists" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <header className="w-full bg-[#DFE3E2] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <NavLink to="/">
            <img src="/logo.png" alt="eKazi" className="w-24 md:w-32" />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-base font-medium text-Blue text-decoration-none
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 
                  after:bg-Orange after:transition-all after:duration-300
                  hover:after:w-full
                  ${isActive ? "after:w-1/2" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* AUTH BUTTONS */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-Blue hover:text-Orange font-medium"
            >
              Login
            </button>

            <span className="text-gray-400">|</span>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-Blue hover:text-Orange font-medium"
            >
              Register
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? (
              <X size={28} className="text-Orange" />
            ) : (
              <Menu size={28} className="text-Blue" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className="text-Blue text-decoration-none font-medium hover:text-Orange"
              >
                {item.name}
              </NavLink>
            ))}

            <hr />

            <button
              onClick={() => {
                setShowLoginModal(true);
                setMobileMenu(false);
              }}
              className="text-left text-Blue hover:text-Orange"
            >
              Login
            </button>

            <button
              onClick={() => {
                setShowRegisterModal(true);
                setMobileMenu(false);
              }}
              className="text-left text-Blue hover:text-Orange"
            >
              Register
            </button>
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-lg font-semibold">Hello Modal</h2>
        </div>
      </Modal>

      {/* MODALS */}
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </header>
  );
}
