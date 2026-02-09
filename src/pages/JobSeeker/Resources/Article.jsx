import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <div className=" bg-white shadow-sm rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* Featured Image */}
      <div className="w-60">
        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold mb-1 text-[#2E58A6]">
          {article.title.split(" ").length > 8
            ? article.title.split(" ").slice(0, 6).join(" ") + "..."
            : article.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center justify-between mb-1 text-xs">
          <small className="text-gray-500">{article.published_at}</small>
          <div className="flex items-center gap-2 text-gray-500">
            <FaEye className="text-[#d36314]" />
            <small>{article.views}</small>
          </div>
        </div>

        {/* Content preview */}
        {/* <p className="text-gray-500 mb-6">
          {article.content.split(" ").slice(0, 10).join(" ")}...
        </p> */}

        {/* Button */}
        <div className="mt-auto">
          <Link
            to={`/jobseeker/articles/${article.slug}`}
            className="inline-block  text-[#d36314] text-base font-medium transition-colors duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
