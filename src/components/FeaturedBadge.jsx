import { FaUser } from "react-icons/fa";

const FeaturedBadge = () => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-yellow-900 bg-yellow-300 rounded-full shadow">
      <FaUser className="text-yellow-700 text-[10px]" />
      featured
    </span>
  );
};

export default FeaturedBadge;
