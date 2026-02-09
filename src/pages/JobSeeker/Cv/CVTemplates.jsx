import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FaDownload, FaPen } from "react-icons/fa";

import { useCvProfile, useDownloadCv } from "../../../hooks/useCv";
import { sanitizeFileName } from "../../../utils/helpers";
import { TEMPLATE_MAP } from "./data/templates";

const CVTemplates = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("My_CV");

  const applicantId = localStorage.getItem("applicantId");

  const { data: cvProfile } = useCvProfile(applicantId);
  const profile = cvProfile?.data?.applicant_profile?.[0];
  const applicantName = `${profile?.first_name ?? ""}${profile?.last_name ?? ""}`;

  const { mutate: downloadCv, isPending: isLoading } = useDownloadCv();

  const location = useLocation();

  const [selectedTemplate, setSelectedTemplate] = useState(
    location.state?.template || "template1",
  );

  const SelectedTemplate = TEMPLATE_MAP[selectedTemplate];

  const handleDownload = () => {
    const safeName = sanitizeFileName(fileName || "My_CV");

    downloadCv(
      {
        template: selectedTemplate,
        name: safeName,
        applicantId: applicantId,
      },
      {
        onSuccess: (data) => {
          const fileUrl = data?.body?.link;

          if (!fileUrl) {
            alert("Failed to get download link.");
            return;
          }

          // ✅ Force download with user-defined filename
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${safeName}.pdf`;

          document.body.appendChild(link);
          link.click();
          link.remove();
        },

        onError: (error) => {
          console.error("Download failed:", error);
          alert("Failed to generate CV. Please try again.");
        },
      },
    );
  };

  return (
    <div className=" min-h-screen overflow-x-hidden  ">
      <div className="min-h-screen bg-gray-50 ">
        <div className="max-w-12xl mx-auto">
          {/* Header Section */}
          <div className="min-h-screen bg-gray-50 ">
            {/* Professional Header with Toolbar */}
            <div className="max-w-12xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              {/* Ribbon-style Toolbar */}
              <div
                className=" text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4"
                style={{ backgroundColor: "#D36314" }}
              >
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-bold">CV Dashboard</h1>
                </div>
              </div>

              {/* Document Header */}
              <div className="px-8 py-6 border-b">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Curriculum Vitae
                    </h2>
                    <p className="text-gray-600 mt-1 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Last saved: {new Date().toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                      onClick={() => navigate(`/jobseeker/introduction`)}
                      className="px-5 py-2.5 border border-blue-500 text-blue-600 font-medium rounded hover:bg-blue-50 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                    >
                      <FaPen />
                      Edit CV
                    </button>

                    <button
                      onClick={handleDownload}
                      className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 flex items-center gap-2 transition-colors w-full md:w-auto justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <FaDownload />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Content Area */}
              <div className="flex flex-col md:flex-row">
                {/* Main Document Preview */}
                <div className="flex-1 p-0">
                  <div className="max-w-4xl mx-auto  p-8 min-h-[70vh]">
                    {/* CV Preview Content Would Go Here */}
                    <div className="text-center  text-gray-400     rounded">
                      {SelectedTemplate ? (
                        <SelectedTemplate />
                      ) : (
                        <p className="text-center text-gray-400">
                          Template not found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplates;
