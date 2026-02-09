import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaSearch,
  FaUserTie,
  FaShieldAlt,
  FaCog,
  FaEnvelope,
  FaPen,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <Card className="shadow-sm bg-white p-3 border-0" style={{ minHeight: "100vh" }}>
      {/* Profile */}
      <div className="text-center mb-4">
        <img
          src="/default_user.jpeg"
          alt="Company Logo"
          className="rounded-circle mb-2"
          style={{ width: "80px", height: "80px" }}
        />
        <Link
          to="/employer/profile/edit"
          className="text-decoration-none small d-block mb-1 text-secondary"
        >
          <FaPen className="me-1" /> Edit Profile
        </Link>
        <div className="fw-bold">Do My Class For Me</div>
        <small className="text-muted">Welcome</small>
      </div>

      {/* Navigation */}
      <Accordion alwaysOpen flush>
        <div className="mb-2">
          <Link
            to="/employer/dashboard"
            className="d-flex align-items-center text-dark text-decoration-none p-2 rounded"
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </Link>
        </div>

        {/* Job Posting */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaBriefcase className="me-2" /> Job Posting
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/post-job" label="Post a job" />
            <SidebarLink to="/employer/jobs" label="List of jobs" />
            <SidebarLink to="/employer/jobs/active" label="Active jobs (0)" />
            <SidebarLink to="/employer/jobs/expired" label="Expired jobs (0)" />
            {/* <SidebarLink to="/employer/import-jobs" label="Import jobs" />
            <SidebarLink to="/employer/reports" label="Reports" /> */}
          </Accordion.Body>
        </Accordion.Item>

        {/* Search Resumes */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaSearch className="me-2" /> Search Resumes
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/search-resume" label="Search resume" />
            <SidebarLink to="/employer/search-applicant" label="Search applicant" />
            <SidebarLink to="/employer/resume-agents" label="Resume search agents (0)" />
            <SidebarLink to="/employer/saved-resumes" label="Saved Resumes (0)" />
          </Accordion.Body>
        </Accordion.Item>

        {/* Applicant Tracking */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaUserTie className="me-2" /> Applicant Tracking
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/applicant-tracking" label="Applicant Tracking (0)" />
            <SidebarLink to="/employer/direct-applicants" label="Direct Applicants" />
          </Accordion.Body>
        </Accordion.Item>

        {/* My Account */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaShieldAlt className="me-2" /> My Account
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/company-profile" label="Company Profile" />
            <SidebarLink to="/employer/order-history" label="Order History" />
            <SidebarLink to="/employer/manage-users" label="Manage Users (0)" />
            <SidebarLink to="/employer/change-password" label="Change Password" />
          </Accordion.Body>
        </Accordion.Item>

        {/* Resources */}
        {/* <Accordion.Item eventKey="5">
          <Accordion.Header>
            <FaCog className="me-2" /> Resources
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/forum" label="Job forum" />
            <SidebarLink to="/employer/articles" label="Articles" />
            <SidebarLink to="/employer/newsletter" label="Newsletter" />
            <SidebarLink to="/employer/contacts" label="Contact list (0)" />
            <SidebarLink to="/employer/job-fairs" label="Job fairs" />
            <SidebarLink to="/employer/assessment" label="Assessment" />
            <SidebarLink to="/employer/lms" label="LMS" />
          </Accordion.Body>
        </Accordion.Item> */}

        {/* Correspondence */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <FaEnvelope className="me-2" /> Correspondence
          </Accordion.Header>
          <Accordion.Body>
            <SidebarLink to="/employer/admin-responses" label="Response from admin (0)" />
            <SidebarLink to="/employer/jobseeker-responses" label="Jobseeker response (0)" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

// Reusable Sidebar Link component
const SidebarLink = ({ to, label }) => (
  <div className="pb-1">
    <Link to={to} className="text-decoration-none d-block ms-3 text-dark">
      {label}
    </Link>
  </div>
);

export default Sidebar;
