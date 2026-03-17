import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import SubscriptionSection from "../pages/subscriptions/Subscription";
import UserDropdown from "./components/UserDropdown";
import NotificationDropdown from "./components/NotificationDropdown";
import { usePrimaryData } from "../hooks/useCandidates";
import FeaturedBadge from "../components/FeaturedBadge";

const AppHeader = () => {
  const applicant_id = localStorage.getItem("applicantId");
  const { data } = usePrimaryData(applicant_id);
  const featuredApplicant = data?.[0].applicant_featured;
  console.log(featuredApplicant);

  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/jobseeker/dashboard" },
    { name: "Find Jobs", path: "/jobseeker/jobs" },
    { name: "Employers", path: "/jobseeker/employers" },
    {
      name: "Salary Calculator",
      path: "/jobseeker/calculator",
    },
  ];

  return (
    <header className="w-full bg-[#DFE3E2] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-2">
        <div className="flex items-center justify-between h-12">
          {/* LOGO */}
          <NavLink to="/">
            <img src="/logo.png" alt="eKazi" className="w-24 md:w-28" />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-1 text-base text-decoration-none font-medium text-Blue
                     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                     after:w-0 after:bg-Orange after:transition-all
                     hover:after:w-full
                     ${isActive ? "after:w-1/2" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
            {featuredApplicant ? <></> : <SubscriptionSection />}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <UserDropdown />

            {/* MOBILE MENU */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <X size={24} className="text-Orange" />
              ) : (
                <Menu size={24} className="text-Blue" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className="text-Blue text-decoration-none font-medium"
              >
                {item.name}
              </NavLink>
            ))}
            {featuredApplicant ? <></> : <SubscriptionSection />}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
