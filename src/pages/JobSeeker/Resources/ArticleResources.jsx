import { Card, Col, Row } from "react-bootstrap";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";
import { useArticles } from "../../../hooks/useArticles";
import Article from "./Article";

const ArticleResources = () => {
  const { data, isPending: isLoading, isError, error } = useArticles();

  const articles = Array.isArray(data) ? data : (data?.data ?? []);

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
          <h4 className="font-bold mb-4">Articles</h4>

          <Row className="g-4">
            {articles.slice(0, 9).map((article) => (
              <Col xs={12} md={6}>
                <Article key={article.id} article={article} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </JobSeekerLayout2>
  );
};

export default ArticleResources;
