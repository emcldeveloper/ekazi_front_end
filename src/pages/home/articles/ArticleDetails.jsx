import { useParams } from "react-router-dom";
import {
  Form,
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { useArticleBySlug, useCreateComment } from "../../../hooks/useArticles";
import MainLayout1 from "../../../layouts/MainLayout1";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import RelatedArticles from "./RelatedArticles";
import HotArticles from "./HotArticles";

const ArticleDetails = () => {
  const { slug } = useParams();

  const { data, isPending: isLoading, isError } = useArticleBySlug(slug);
  const article = data?.data;
  const articleId = article?.id;

  const { mutate, isPending } = useCreateComment(articleId);

  const { register, handleSubmit, reset } = useForm();

  const isHTML = /<\/?[a-z][\s\S]*>/i.test(article?.content);

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => reset(),
    });
  };

  if (isLoading) {
    return (
      <MainLayout1>
        <Container className="py-5 text-center">
          <Spinner animation="border" />
        </Container>
      </MainLayout1>
    );
  }

  if (isError || !article) {
    return (
      <MainLayout1>
        <Container className="py-5">
          <Alert variant="danger">Article not found</Alert>
        </Container>
      </MainLayout1>
    );
  }

  return (
    <MainLayout1>
      <Container className="py-5" s>
        <Row className="justify-content-center">
          <Col md={8} className="mb-4 md:mb-0">
            <Card className="mb-4">
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
                  <small className="text-muted mb-3">
                    {article.published_at}
                  </small>
                  <div className="d-flex align-items-center gap-2">
                    <FaEye color="#d36314" />
                    <small className="text-muted">{article.views}</small>
                  </div>
                </div>

                {/* Title */}
                <h3 className="fw-bold mb-2" style={{ color: "#d36314" }}>
                  {article.title}
                </h3>

                {/* content */}
                <div className="prose max-w-none">
                  {isHTML ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: article?.content }}
                    />
                  ) : (
                    article?.content
                      .split(/\r?\n\r?\n/)
                      .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Comments Card */}
            <Card className="p-2">
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex flex-col align-items-center justify-content-between gap-2 md:flex-row md:gap-4">
                    <Form.Group className="mb-3 w-100">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g Juma Abdul"
                        {...register("name", { required: true })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 w-100">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="example@mail.com"
                        {...register("email", { required: true })}
                      />
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3 w-100">
                    <Form.Label>Post Comment</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={5}
                      {...register("comment", { required: true })}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <h3 className="fw-bold mb-4" style={{ color: "#2E58A6" }}>
              Hot Articles
            </h3>

            <div className="d-flex flex-column gap-4">
              <HotArticles />
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default ArticleDetails;
