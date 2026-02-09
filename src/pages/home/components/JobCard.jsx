import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DEFAULT_LOGO, IMG_BASE } from "../../../helpers/img";
// import { DEFAULT_LOGO, IMG_BASE } from "../../helpers/img";

// Slugify utility
const slugify = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const JobCard = ({ job }) => {
  const jobId = job.id;

  const toSentenceCase = (str) =>
    str
      ?.toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Extracting safer values
  const jobTitle = job.job_position?.position_name || "Job";
  const region = job.job_addresses?.[0]?.region?.region_name || "";
  const countryName = job.job_addresses?.[0]?.region?.country?.name || "";
  const safeCountry = countryName?.toLowerCase() || "";

  // Build SEO Job slug
  const jobSlug = [
    slugify(jobTitle),
    slugify(region),
    safeCountry !== "remote" ? slugify(safeCountry) : null,
    jobId,
  ]
    .filter(Boolean)
    .join("-");

  const jobUrl = `/jobs/${jobSlug}`;

  return (
    <Col md={4} className="mb-2">
      <Card style={{ backgroundColor: "#fff" }}>
        <Card.Body>
          {/* Top Row: Logo + Job Type */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div
              style={{
                width: "120px",
                height: "75px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  job.client?.logo
                    ? `${IMG_BASE}${job.client.logo}`
                    : `${DEFAULT_LOGO}`
                }
                alt={job.client?.client_name || "Company Logo"}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <Button
              className="text-white"
              style={{
                backgroundColor: "#D36314",
                border: "none",
                borderRadius: "30px",
                width: "auto",
              }}
            >
              {job.job_type?.type_name || "N/A"}
            </Button>
          </div>

          {/* Job Title + Company */}
          <div className="mb-2">
            <h6 style={{ color: "#D36314", fontSize: "13px" }}>
              <b
                style={{
                  fontSize: "15px",
                  display: "inline-block",
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  verticalAlign: "middle",
                }}
              >
                {toSentenceCase(jobTitle)}
                {job.quantity > 1 && ` (${job.quantity})`}
              </b>
            </h6>

            <h5 style={{ color: "#2E58A6", fontSize: "13px" }}>
              {job.client?.client_name || "N/A"}
            </h5>
          </div>

          {/* Job Details */}
          <div style={{ fontSize: "13px" }}>
            Job Type: {job.job_type?.type_name || "N/A"}
            <br />
            {/* Location */}
            {safeCountry === "remote" ? (
              <span>Location: Remote</span>
            ) : job.job_addresses?.length > 0 ? (
              <span>
                Location:{" "}
                {job.job_addresses[0].sub_location
                  ? `${toSentenceCase(job.job_addresses[0].sub_location)}, `
                  : ""}
                {region}
                {countryName ? `, ${countryName}` : ""}
              </span>
            ) : (
              <span>Location: N/A</span>
            )}
            <br />
            {/* Deadline */}
            <b style={{ color: "#2E58A6" }}>Deadline:</b>{" "}
            {job.dead_line
              ? new Date(job.dead_line).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
            <br />
            Industry: {job.industry?.industry_name || "N/A"}
          </div>
        </Card.Body>

        {/* Footer */}
        <Card.Footer className="bg-white">
          <Row className="text-center align-items-center">
            <Col>
              <Link
                to={jobUrl}
                state={{ job }}
                style={{
                  color: "#2E58A6",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Show
              </Link>
            </Col>

            <Col>
              <div className="d-flex align-items-center justify-content-center gap-1">
                <FaEye style={{ color: "#D36314" }} />
                <small>{job.statistic?.job_views || 0}</small>
              </div>
            </Col>

            <Col>
              <div className="d-flex align-items-center justify-content-center gap-1">
                <FaHeart style={{ color: "#D36314" }} title="Please Sign In" />
                <small>{job.statistic?.job_likes || 0}</small>
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default JobCard;

// import React from "react";
// import { Card, Button, Col } from "react-bootstrap";
// import { FaEye, FaHeart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { DEFAULT_LOGO, IMG_BASE } from "../../../helpers/img";

// // Slugify utility
// const slugify = (text) =>
//   text
//     ?.toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[\s_]+/g, "-")
//     .replace(/[^\w-]+/g, "")
//     .replace(/--+/g, "-");

// const JobCard = ({ job }) => {
//   const jobId = job.id;

//   const toSentenceCase = (str) =>
//     str
//       ?.toLowerCase()
//       .split(" ")
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(" ");

//   // Extracting safer values
//   const jobTitle = job.job_position?.position_name || "Job";
//   const region = job.job_addresses?.[0]?.region?.region_name || "";
//   const countryName = job.job_addresses?.[0]?.region?.country?.name || "";
//   const safeCountry = countryName?.toLowerCase() || "";

//   // Build SEO Job slug
//   const jobSlug = [
//     slugify(jobTitle),
//     slugify(region),
//     safeCountry !== "remote" ? slugify(safeCountry) : null,
//     jobId,
//   ]
//     .filter(Boolean)
//     .join("-");

//   const jobUrl = `/jobs/${jobSlug}`;

//   return (
//     <Col md={4} className="mb-4">
//       <Card className="px-2" style={{ backgroundColor: "#fff" }}>
//         <Card.Body>
//           {/* Top Row: Logo + Job Type */}
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <div
//               style={{
//                 width: "120px",
//                 height: "75px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <img
//                 src={
//                   job.client?.logo
//                     ? `${IMG_BASE}${job.client.logo}`
//                     : `${DEFAULT_LOGO}`
//                 }
//                 alt={job.client?.client_name || "Company Logo"}
//                 style={{
//                   maxWidth: "100%",
//                   maxHeight: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             </div>

//             <Button
//               className="text-white"
//               style={{
//                 backgroundColor: "#D36314",
//                 border: "none",
//                 borderRadius: "30px",
//                 width: "auto",
//               }}
//             >
//               {job.job_type?.type_name || "N/A"}
//             </Button>
//           </div>

//           {/* Job Title + Company */}
//           <div className="mb-2">
//             <h6 style={{ color: "#D36314", fontSize: "13px" }}>
//               <b
//                 style={{
//                   fontSize: "15px",
//                   display: "inline-block",
//                   maxWidth: "200px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap",
//                   verticalAlign: "middle",
//                 }}
//               >
//                 {toSentenceCase(jobTitle)}
//                 {job.quantity > 1 && ` (${job.quantity})`}
//               </b>
//             </h6>

//             <h5 style={{ color: "#2E58A6", fontSize: "13px" }}>
//               {job.client?.client_name || "N/A"}
//             </h5>
//           </div>

//           {/* Job Details */}
//           <div style={{ fontSize: "13px" }}>
//             Job Type: {job.job_type?.type_name || "N/A"}
//             <br />
//             {/* Location */}
//             {safeCountry === "remote" ? (
//               <span>Location: Remote</span>
//             ) : job.job_addresses?.length > 0 ? (
//               <span>
//                 Location:{" "}
//                 {job.job_addresses[0].sub_location
//                   ? `${toSentenceCase(job.job_addresses[0].sub_location)}, `
//                   : ""}
//                 {region}
//                 {countryName ? `, ${countryName}` : ""}
//               </span>
//             ) : (
//               <span>Location: N/A</span>
//             )}
//             <br />
//             {/* Deadline */}
//             <b style={{ color: "#2E58A6" }}>Deadline:</b>{" "}
//             {job.dead_line
//               ? new Date(job.dead_line).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })
//               : "N/A"}
//             <br />
//             Industry: {job.industry?.industry_name || "N/A"}
//           </div>

//           <div className="d-flex align-items-center justify-content-between mt-4">
//             <Link
//               to={jobUrl}
//               state={{ job }}
//               style={{
//                 color: "#2E58A6",
//                 textDecoration: "none",
//                 display: "block",
//               }}
//             >
//               Show
//             </Link>

//             <div className="d-flex align-items-center justify-content-center gap-1">
//               <FaEye style={{ color: "#D36314" }} />
//               <small>{job.statistic?.job_views || 0}</small>
//             </div>

//             <div className="d-flex align-items-center justify-content-center gap-1">
//               <FaHeart style={{ color: "#D36314" }} title="Please Sign In" />
//               <small>{job.statistic?.job_likes || 0}</small>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>
//     </Col>
//   );
// };

// export default JobCard;
