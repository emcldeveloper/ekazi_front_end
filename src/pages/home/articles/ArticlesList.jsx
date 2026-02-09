import { Card, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticlesList = ({ article }) => {
  return (
    <Card className="shadow-sm border-0 rounded-lg">
      {/* Featured Image */}
      {article.featured_image && (
        <Card.Img
          variant="top"
          src={article.featured_image}
          alt={article.title}
          style={{ height: "auto", objectFit: "cover" }}
        />
      )}

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <small className="text-muted mb-3">{article.published_at}</small>
          <div className="d-flex align-items-center gap-2">
            <FaEye color="#d36314" />
            <small className="text-muted">{article.views}</small>
          </div>
        </div>

        {/* Title */}
        <h3 className="fw-semibold mb-2" style={{ color: "#2E58A6" }}>
          {article.title}
        </h3>

        {/* Content */}
        <div
          className="html-preview text-muted mb-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Spacer */}
        <div className="mt-auto">
          <Link to={`/articles/${article.slug}`}>
            <Button
              variant="outline-primary"
              className="btn-sm custom-btn custom-btn:hover"
            >
              Read More
            </Button>
          </Link>
        </div>
        <style>
          {`
            .custom-btn {
              color: #d36314;
              border-color: #d36314;
            }

            .custom-btn:hover {
              background-color: #d36314;
              border-color: #d36314;
              color: #fff;
            }

             .html-preview {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;   /* number of lines you want */
              overflow: hidden;
            }

            /* This part is the secret sauce most people miss */
            .html-preview * {
              margin: 0;
            }
          `}
        </style>
      </Card.Body>
    </Card>
  );
};

export default ArticlesList;
