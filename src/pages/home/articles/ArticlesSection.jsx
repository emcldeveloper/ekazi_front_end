import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Container,
  Spinner,
  Alert,
  Button,
  Col,
  Card,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

import { useArticles } from "../../../hooks/useArticles.js";

const ArticlesSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useArticles();

  const articles = Array.isArray(data) ? data : (data?.data ?? []);

  return (
    <section className="bg-white w-full">
      <Container className="py-10">
        <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
          Articles
        </h2>

        {/* Loading */}
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <Alert variant="danger" className="text-center">
            {error?.message || "Failed to load featured articles"}
          </Alert>
        )}

        {/* Candidate Cards */}
        {!isLoading && !isError && (
          <Row className="g-4">
            {articles.slice(0, 6).map((article) => {
              return (
                <Col md={4}>
                  <Card className="shadow-sm d-flex flex-column flex-grow-1 h-full border-0 rounded-lg">
                    {/* Featured Image */}
                    {article.featured_image && (
                      <Card.Img
                        variant="top"
                        src={article.featured_image}
                        alt={article.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}

                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <small className="text-muted mb-3">
                            {article.published_at}
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <FaEye color="#d36314" />
                          <small className="text-muted">{article.views}</small>
                        </div>
                      </div>

                      {/* Title */}
                      <h4
                        className="fw-semibold min-h-14 line-clamp-2 mb-2"
                        style={{ color: "#2E58A6" }}
                      >
                        {article?.title}
                      </h4>

                      {/* content */}
                      <div
                        className="html-preview text-muted line-clamp-3 mb-2"
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
                </Col>
              );
            })}
          </Row>
        )}

        <div className="flex justify-center my-4">
          <button
            onClick={() => navigate("/articles")}
            className="flex items-center gap-2 px-4 py-2 bg-Blue text-white rounded-lg hover:bg-blue-700 transition"
          >
            View All <ArrowRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default ArticlesSection;
