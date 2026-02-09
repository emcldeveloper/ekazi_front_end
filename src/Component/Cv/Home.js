import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FaDownload, FaPen } from "react-icons/fa";

import Template1 from "../../templates/template1";
import Template2 from "../../templates/template2";
import Template3 from "../../templates/template3";
import Template4 from "../../templates/template4";
import Template5 from "../../templates/template5";
import Template6 from "../../templates/template6";
import Template7 from "../../templates/template7";
import Template8 from "../../templates/template8";
import Template9 from "../../templates/template9";
import Template10 from "../../templates/template10";
import Template11 from "../../templates/template11";
import Template12 from "../../templates/template12";
import Template13 from "../../templates/template13";
import Template14 from "../../templates/template14";
import Template15 from "../../templates/template15";
import Template17 from "../../templates/template17";
import Template18 from "../../templates/template18";
import Template19 from "../../templates/template19";
import Template20 from "../../templates/template20";
import Template21 from "../../templates/template21";
import Template22 from "../../templates/template22";
import Template23 from "../../templates/template23";
import Template24 from "../../templates/template24";
import Template25 from "../../templates/template25";
import Template26 from "../../templates/template26";
import Template27 from "../../templates/template27";
import Template28 from "../../templates/template28";
import Template29 from "../../templates/template29";
import Template30 from "../../templates/template30";

import { useCvProfile, useDownloadCv } from "../../hooks/useCv";
import { sanitizeFileName } from "../../utils/helpers";

const HomePageCv = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("My_CV");

  const applicantId = localStorage.getItem("applicantId");

  const { data: cvProfile } = useCvProfile(applicantId);
  const { mutate: downloadCv, isPending: isLoading } = useDownloadCv();

  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState(
    location.state?.template
  );
  const template = selectedTemplate;

  const templates = [
    { id: 1, component: <Template1 /> },
    { id: 2, component: <Template2 /> },
    { id: 3, component: <Template3 /> },
    { id: 4, component: <Template4 /> },
    { id: 5, component: <Template5 /> },
    { id: 6, component: <Template6 /> },
    { id: 7, component: <Template7 /> },
    { id: 8, component: <Template8 /> },
    { id: 9, component: <Template9 /> },
    { id: 10, component: <Template10 /> },
    { id: 11, component: <Template11 /> },
    { id: 12, component: <Template12 /> },
    { id: 13, component: <Template13 /> },
    { id: 14, component: <Template14 /> },
    { id: 15, component: <Template15 /> },
    { id: 17, component: <Template17 /> },
    { id: 18, component: <Template18 /> },
    { id: 19, component: <Template19 /> },
    { id: 20, component: <Template20 /> },
    { id: 21, component: <Template21 /> },
    { id: 22, component: <Template22 /> },
    { id: 23, component: <Template23 /> },
    { id: 24, component: <Template24 /> },
    { id: 25, component: <Template25 /> },
    { id: 26, component: <Template26 /> },
    { id: 27, component: <Template27 /> },
    { id: 28, component: <Template28 /> },
    { id: 29, component: <Template29 /> },
    { id: 30, component: <Template30 /> },
  ];

  const handleDownload = () => {
    const safeName = sanitizeFileName(fileName || "My_CV");

    downloadCv(
      {
        template,
        name: safeName, // sent to backend for download history
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
      }
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
                      {templates.map(
                        (item, index) =>
                          item.id === template && (
                            <div key={index}>{item.component}</div>
                          )
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

export default HomePageCv;
