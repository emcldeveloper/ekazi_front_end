import { FaCrown, FaStar, FaGem, FaRocket, FaUser } from "react-icons/fa";

const packageStyles = {
  free: {
    label: "Free",
    icon: FaUser,
    className: "text-gray-700 bg-gray-200",
  },

  basic: {
    label: "Basic",
    icon: FaStar,
    className: "text-blue-900 bg-blue-200",
  },

  standard: {
    label: "Standard",
    icon: FaGem,
    className: "text-purple-900 bg-purple-200",
  },

  premium: {
    label: "Premium",
    icon: FaCrown,
    className: "text-yellow-900 bg-yellow-300",
  },

  enterprise: {
    label: "Enterprise",
    icon: FaRocket,
    className: "text-green-900 bg-green-200",
  },
};

const SubscriptionBadge = ({ type = "free" }) => {
  const badge = packageStyles[type] || packageStyles.free;
  const Icon = badge.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 p-2 text-xs font-semibold rounded-full shadow ${badge.className}`}
    >
      <Icon className="text-[10px]" />
      {/* {badge.label} */}
    </span>
  );
};

export default SubscriptionBadge;
