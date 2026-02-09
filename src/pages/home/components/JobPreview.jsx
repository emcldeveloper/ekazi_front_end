import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";

import MainLayout1 from "../../../layouts/MainLayout1";
import JobDetails from "./JobDetails";
import { useJobDetail, useJobIncrement } from "../../../hooks/useJobs";
import TemplateSlider from "../../JobSeeker/Cv/components/TemplateSlider";

const JobPreview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { jobSlug } = useParams();

  const jobId = jobSlug?.split("-").pop();

  const { mutate: incrementJobView } = useJobIncrement(jobId);

  const { data: jobResponse, isLoading, isError } = useJobDetail(jobId);

  const job =
    (Array.isArray(jobResponse) ? jobResponse[0] : jobResponse) || null;

  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    if (!jobId) return;

    const viewedKey = `job_viewed_${jobId}`;

    if (hasIncrementedRef.current) return;
    if (sessionStorage.getItem(viewedKey)) return;

    hasIncrementedRef.current = true;
    sessionStorage.setItem(viewedKey, "true");
    incrementJobView();
  }, [jobId, incrementJobView]);

  // 🔹 Loading UI
  if (isLoading) {
    return (
      <MainLayout1>
        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>
      </MainLayout1>
    );
  }

  // 🔹 No job found
  if (isError || !job) {
    return (
      <MainLayout1>
        <Container className="text-center mt-5">
          <h4>Job not found</h4>
        </Container>
      </MainLayout1>
    );
  }

  return (
    <MainLayout1>
      <Helmet>
        <meta
          property="og:title"
          content={job.job_position?.position_name || "Job Opportunity"}
        />
        <meta
          property="og:description"
          content={`Apply now at ${job.client?.client_name || "Ekazi"}`}
        />
        <meta
          property="og:image"
          content={
            job.client?.logo ? `https://api.ekazi.co.tz/${job.client.logo}` : ""
          }
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container className="py-4">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-black">
            {job.job_position?.position_name || "Untitled Job"}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mt-4">
          <Col md={9}>
            <JobDetails job={job} />
          </Col>

          <Col md={3}>
            <div className="mb-4">
              <TemplateSlider />
            </div>

            <Card className="h-50">
              <Card.Body className="d-flex align-items-center justify-content-center">
                Google Ad Space
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default JobPreview;
