import React, { useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = ({ openModal }) => {
  const { uuid, template } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path === `/${uuid}/${template}` &&
        location.pathname.includes("introduction")) ||
      location.pathname.includes("professional_summary") ||
      location.pathname.includes("educations") ||
      location.pathname.includes("experiences") ||
      location.pathname.includes("skills") ||
      location.pathname.includes("Languages") ||
      location.pathname.includes("proficiency") ||
      location.pathname.includes("Training") ||
      location.pathname.includes("refrees") ||
      location.pathname.includes("complete")
    );
  };

  return (
    <div className="fixed w-full z-40">
      {/* Mobile Header with Logo and Hamburger Menu */}
      <div className="flex py-3 md:py-5 w-full bg-[#E5E4F6] justify-between items-center px-4 md:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto ml-8" />
        </div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={toggleNav} className="text-black">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-12 left-0 w-full md:w-auto bg-[#E5E4F6] md:bg-transparent p-4 md:p-0`}
        >
          {/* <a
                        onClick={openModal}
                        className={`block px-4 py-2 rounded hover:bg-blue-600 transition mb-2 md:mb-0 ${
                            location.pathname.includes('my-subscription') 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-orange-500 text-white'
                        }`}
                    >
                        Subscription
                    </a> */}
          {/* <a
                        onClick={() => navigate(`/${uuid}/${template}`)}
                        className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
                            isActive(`/${uuid}/${template}`) ? 'text-blue-600' : 'text-black'
                        }`}
                    >
                        CV Building
                    </a> */}
          <a
            onClick={() => navigate(`/${uuid}/${template}`)}
            className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
              isActive(`/${uuid}/${template}`) ? "text-blue-600" : "text-black"
            }`}
          >
            Home
          </a>
          {/* <a
                        onClick={() => { window.location.href = "https://api.ekazi.co.tz/find-job"; }}
                        className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
                    >
                        Find Job
                    </a> */}
          <a
            onClick={() => navigate(`/find-job/${uuid}/${template}`)}
            className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
          >
            Find Job
          </a>
          {/* <a
                        onClick={() => navigate(`/my-subscription/${uuid}/${template}`)}
                        className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
                            location.pathname.includes('my-subscription') ? 'text-blue-600' : 'text-black'
                        }`}
                    >
                        My Subscription
                    </a> */}
          <a
            onClick={() => navigate(`/my-subscription/${uuid}/${template}`)}
            className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
              location.pathname.includes("my-subscription")
                ? "text-blue-600"
                : "text-black"
            }`}
          >
            Employer
          </a>
          {/* <a
                        onClick={() => navigate(`/my-cv/${uuid}/${template}`)}
                        className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
                            location.pathname.includes('my-cv') ? 'text-blue-600' : 'text-black'
                        }`}
                    >
                        My CV
                    </a> */}
          <a
            onClick={() => navigate(`/my-cv/${uuid}/${template}`)}
            className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
              location.pathname.includes("my-cv")
                ? "text-blue-600"
                : "text-black"
            }`}
          >
            Salary Calculator
          </a>
          {/* <a
                        onClick={() => navigate(`/sample-template/${uuid}/${template}`)}
                        className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
                            location.pathname.includes('sample-template') ? 'text-blue-600' : 'text-black'
                        }`}
                    >
                        CV Templates
                    </a> */}
          <a
            onClick={() => navigate(`/sample-template/${uuid}/${template}`)}
            className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
              location.pathname.includes("sample-template")
                ? "text-blue-600"
                : "text-black"
            }`}
          >
            Price
          </a>
          {/* <a
                        onClick={() => navigate(`/cover-letter/${uuid}/${template}`)}
                        className={`block font-semibold hover:text-blue-600 transition py-2 md:py-0 ${
                            location.pathname.includes('cover-letter') ? 'text-blue-600' : 'text-black'
                        }`}
                    >
                        Cover Letter
                    </a> */}
          <a
            onClick={() => {
              window.location.href =
                "https://api.ekazi.co.tz/applicant/dashboard";
            }}
            className="block text-black font-semibold hover:text-blue-600 transition py-2 md:py-0"
          >
            Back to Profile
          </a>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
