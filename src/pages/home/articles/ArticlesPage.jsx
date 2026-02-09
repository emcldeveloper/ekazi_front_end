import { Link } from "react-router-dom";
import { Row, Col, Container, Spinner, Alert, Button } from "react-bootstrap";

import { useArticles } from "../../../hooks/useArticles";
import MainLayout1 from "../../../layouts/MainLayout1";
import ArticlesList from "./ArticlesList";
import { useEffect, useMemo, useState } from "react";
import HotArticles from "./HotArticles";

const ArticlesPage = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useArticles();

  useEffect(() => window.scrollTo(0, 0), []);

  const articles = useMemo(() => {
    return Array.isArray(data) ? data : (data?.data ?? []);
  }, [data]);

  const filteredArticles = useMemo(() => {
    if (!search) return articles;

    return articles.filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [articles, search]);

  return (
    <MainLayout1>
      <Container className="my-5">
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
          <Row className="justify-content-center">
            <Col md={12}>
              <h1
                className="text-start font-bold mb-4"
                style={{ color: "#2E58A6" }}
              >
                Articles
              </h1>
            </Col>

            <Col md={8} className="mb-4 md:mb-0">
              <div className="mb-4">
                <input
                  type="text"
                  name=""
                  id=""
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles"
                  className="w-100 border border-gray-300"
                />
              </div>

              <div className="d-flex flex-column gap-4">
                {filteredArticles.slice(0, 9).map((article) => (
                  <ArticlesList key={article.id} article={article} />
                ))}
              </div>
            </Col>
            <Col md={4}>
              <h3 className="mb-4" style={{ color: "#2E58A6" }}>
                Hot Articles
              </h3>

              <div className="d-flex flex-column gap-4">
                <HotArticles />
              </div>
            </Col>
          </Row>
        )}

        {/* <div className="text-center mt-4">
          <Link to="/featured-jobseeker" style={{ textDecoration: "none" }}>
            <Button variant="primary" className="btn-md">
              Browse All
            </Button>
          </Link>
        </div> */}
      </Container>
    </MainLayout1>
  );
};

export default ArticlesPage;
