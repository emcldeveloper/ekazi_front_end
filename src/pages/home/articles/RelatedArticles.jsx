import { Button, Card } from "react-bootstrap";
import { useArticles } from "../../../hooks/useArticles";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const RelatedArticles = () => {
  const { data, isPending: isLoading } = useArticles();

  const articles = Array.isArray(data) ? data : (data?.data ?? []);

  return (
    <>
      {articles.map((article) => {
        return (
          <Card
            id={article.id}
            className="d-flex flex-row mb-4 shadow-sm border-0 rounded-lg"
          >
            {/* Featured Image */}
            {article.featured_image && (
              <Card.Img
                variant="top"
                src={article.featured_image}
                alt={article.title}
                style={{ width: "180px", height: "auto", objectFit: "cover" }}
              />
            )}

            <Card.Body className="d-flex flex-column">
              {/* Title */}
              <h5 className="fw-semibold mb-2">{article.title}</h5>

              {/* Spacer */}
              <div className="mt-auto">
                <Link to={`/articles/${article.slug}`}>
                  <Button variant="link" className="m-0 p-0">
                    Read more
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default RelatedArticles;
