import React from "react";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useArticleBySlug } from "../../../hooks/useArticles";
import { FaEye } from "react-icons/fa";

const SingleArticle = () => {
  const { slug } = useParams();

  const { data, isPending: isLoading } = useArticleBySlug(slug);
  const article = data?.data;

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content);

  if (isLoading) {
    return (
      <JobSeekerLayout2>
        <Card>
          <Card.Body>Loading...</Card.Body>
        </Card>
      </JobSeekerLayout2>
    );
  }

  return (
    <JobSeekerLayout2>
      <Card>
        <Card.Body>
          <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="h-96">
              {article?.featured_image && (
                <img
                  src={article?.featured_image}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5 flex flex-col">
              {/* Meta */}
              <div className="flex items-center justify-between mb-3">
                <small className="text-gray-500">{article?.published_at}</small>
                <div className="flex items-center gap-2 text-gray-500">
                  <FaEye className="text-[#d36314]" />
                  <small>{article?.views}</small>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-bold text-3xl mb-2 text-[#d36314]">
                {article?.title}
              </h2>

              {/* Content */}
              <div className="prose max-w-none">
                {isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: article?.content }} />
                ) : (
                  article?.content
                    .split(/\r?\n\r?\n/)
                    .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </JobSeekerLayout2>
  );
};

export default SingleArticle;
