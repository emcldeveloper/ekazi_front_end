import { Card, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const HotestArticlesList = ({ article }) => {
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
            <FaEye />
            <small className="text-muted">{article.views}</small>
          </div>
        </div>

        {/* Title */}
        <h3 className="fw-bold mb-2">{article.title}</h3>

        {/* Industry */}
        <p className="text-muted mb-4">
          {article.content.split(" ").slice(0, 30).join(" ")}
          ...
        </p>

        {/* Spacer */}
        <div className="mt-auto">
          <Link to={`/articles/${article.slug}`}>
            <Button variant="outline-primary" className="btn-lg">
              Read Article
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotestArticlesList;
