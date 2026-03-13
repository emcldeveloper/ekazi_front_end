import { useState } from "react";

import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import {
  ChevronDown,
  ChevronUp,
  CircleAlert,
  KeyRound,
  LogOut,
  Settings,
} from "lucide-react";
import { usePrimaryData } from "../../hooks/useCandidates";

export default function UserDropdown() {
  const applicant_id = localStorage.getItem("applicantId");

  // fetch primary data
  const { data: dataprimary } = usePrimaryData(applicant_id);

  const picture = dataprimary?.[0]?.picture
    ? `https://api.ekazi.co.tz/${dataprimary[0].picture}`
    : "https://api.ekazi.co.tz/uploads/picture/pre_photo.jpg";
  const username = dataprimary?.[0]?.first_name;
  const fullname = `${dataprimary?.[0]?.first_name} ${dataprimary?.[0]?.last_name}`;
  const email = dataprimary?.[0]?.user?.email;

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src={picture} alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{username}</span>

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {fullname}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>

        <div className=" flex flex-col gap-1 pt-4  pb-3 border-b border-gray-200 dark:border-gray-800">
          <div>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/jobseeker/account-settings"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <Settings />
              Account settings
            </DropdownItem>
          </div>
          <div>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/jobseeker/change-password"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <KeyRound />
              Change Password
            </DropdownItem>
          </div>
          <div>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/jobseeker/support"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <CircleAlert />
              Support
            </DropdownItem>
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogOut />
          Sign out
        </div>
      </Dropdown>
    </div>
  );
}
