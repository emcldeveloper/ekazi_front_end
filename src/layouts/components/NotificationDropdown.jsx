import { useEffect, useState } from "react";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { Link, useNavigate } from "react-router-dom";
import { Bell, X } from "lucide-react";
import { useAllThreads } from "../../hooks/candidates/useCorrespondence";
import dayjs from "dayjs";

export default function NotificationDropdown() {
  const applicant_id = localStorage.getItem("applicantId");

  const navigate = useNavigate();

  const { data: correspondences = [], isPending } = useAllThreads(applicant_id);

  const sortedThreads = [...correspondences].sort(
    (a, b) => new Date(b.last_message_at) - new Date(a.last_message_at),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  /* unread count */
  useEffect(() => {
    if (!Array.isArray(correspondences)) return;

    const closedCount = correspondences.filter(
      (thread) => thread.status === "closed",
    ).length;

    setUnreadCount(closedCount);
  }, [correspondences]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };
  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <Bell />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-auto w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="m-0 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notification
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {isPending && <div className="text-center py-2">Loading…</div>}

          {!isPending && correspondences.length === 0 && (
            <div className="text-center text-muted py-2">No notifications</div>
          )}

          {!isPending &&
            sortedThreads.slice(0, 5).map((thread) => {
              const lastMessage = thread.messages?.[thread.messages.length - 1];

              return (
                <div>
                  <DropdownItem
                    onItemClick={() =>
                      navigate("/jobseeker/employer-correspondence")
                    }
                    className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                  >
                    <span className="block">
                      <span className="mb-1.5 block  text-theme-sm text-gray-500 dark:text-gray-400 space-x-1">
                        <span className="font-medium block text-gray-800 dark:text-white/90">
                          {thread.subject.length > 30
                            ? thread.subject.slice(0, 30) + "…"
                            : thread.subject}
                        </span>
                        <span> {lastMessage?.message.slice(0, 20)}…</span>
                      </span>

                      <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>
                          {" "}
                          {dayjs(thread.last_message_at).format(
                            "MMM D, h:mm A",
                          )}
                        </span>
                      </span>
                    </span>
                  </DropdownItem>
                </div>
              );
            })}
        </div>
        <Link
          to="/"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
