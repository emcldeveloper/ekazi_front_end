import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";
import Template1 from "../templates/template1";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "../widgets/spinner";
import Template2 from "../templates/template2";
import Template3 from "../templates/template3";
import Template4 from "../templates/template4";
import Template5 from "../templates/template5";
import Template6 from "../templates/template6";
import Template7 from "../templates/template7";
import Template8 from "../templates/template8";
import Template9 from "../templates/template9";
import Template10 from "../templates/template10";
import HideInfo from "../layouts/useHideFields";
import { FaDownload, FaEdit, FaTimes } from "react-icons/fa";

const CVModal = ({
  showModal,
  setShowModal,
  selectedTemplate,
  uuid,
  cvName,
  setCvName,
  handleSaveAndDownload,
  downloading,
}) => {
  const templates = [
    { id: 1, name: "Template 1", component: <Template1 /> },
    { id: 2, name: "Template 2", component: <Template2 /> },
    { id: 3, name: "Template 3", component: <Template3 /> },
    { id: 4, name: "Template 4", component: <Template4 /> },
    { id: 5, name: "Template 5", component: <Template5 /> },
    { id: 6, name: "Template 6", component: <Template6 /> },
    { id: 7, name: "Template 7", component: <Template7 /> },
    { id: 8, name: "Template 8", component: <Template8 /> },
    { id: 9, name: "Template 9", component: <Template9 /> },
    { id: 10, name: "Template 10", component: <Template10 /> },
  ];

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            {templates.find((t) => t.id.toString() === selectedTemplate)?.name}{" "}
            Preview
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4">
          <div className="border rounded-lg p-4 mb-4">
            {
              templates.find((t) => t.id.toString() === selectedTemplate)
                ?.component
            }
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <HideInfo uuid={uuid} template={selectedTemplate} />
            <p className="text-gray-600 mb-4">
              Your CV will be saved to your account and available for future
              downloads.
            </p>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter CV Name"
              value={cvName}
              onChange={(e) => setCvName(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAndDownload}
            disabled={downloading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
          >
            {downloading ? (
              <>
                <Spinner size="small" />
                Processing...
              </>
            ) : (
              <>
                <FaDownload />
                Save & Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [downloading, setDownloading] = useState(false);
  const { currentStep, setCurrentStep, originalDetails, candidate } =
    useContext(StepsContext);
  const { uuid, template } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cvName, setCvName] = useState("");
  const [error, setError] = useState(null);
  const [donwload, setSub] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(template || "1");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 4; // Show 4 templates per page for demonstration

  const templates = [
    { id: 1, name: "Template 1", image: "/cv1.png" },
    { id: 2, name: "Template 2", image: "/cv2.png" },
    { id: 3, name: "Template 3", image: "/cv3.png" },
    { id: 4, name: "Template 4", image: "/cv4.png" },
    { id: 5, name: "Template 5", image: "/cv5.png" },
    { id: 6, name: "Template 6", image: "/cv6.png" },
    { id: 7, name: "Template 7", image: "/cv7.png" },
    { id: 8, name: "Template 8", image: "/cv8.png" },
    { id: 9, name: "Template 9", image: "/cv9.png" },
    { id: 10, name: "Template 10", image: "/cv10.png" },
  ];

  // Calculate pagination
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    setCurrentStep(11);
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.ekazi.co.tz/api/applicant/mycv/${uuid}`)
      .then((response) => {
        if (response) {
          setSub(response.data.mycv);
        }
      })
      .catch((error) => {
        console.error("Error fetching CV Subscription data:", error.message);
      });
  }, [uuid]);

  // Template statistics calculation
  let templateCount = {};
  let uniqueTemplateCount = 0;
  let totalUsageSum = 0;

  if (Array.isArray(donwload)) {
    donwload.forEach((item) => {
      const templateNo = item.template_no;
      if (templateNo != null) {
        templateCount[templateNo] = (templateCount[templateNo] || 0) + 1;
      }
    });

    uniqueTemplateCount = Object.keys(templateCount).length;
    totalUsageSum = Object.values(templateCount).reduce(
      (sum, count) => sum + count,
      0
    );
  }

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId.toString());
    navigate(`/admin/${uuid}/${templateId}`);
  };

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleSaveAndDownload = () => {
    if (!cvName) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a CV name",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const sendToData = {
      template: selectedTemplate,
      applicant_id: uuid,
      cv_name: cvName,
    };

    setDownloading(true);
    const newTab = window.open("", "_blank");

    axios
      .post("https://api.ekazi.co.tz/api/applicant/savedCv", sendToData)
      .then((saveResponse) => {
        if (saveResponse.status === 200 && saveResponse.data.success) {
          return axios.get(
            `https://cvtemplate.ekazi.co.tz/generatePdf/?template=${selectedTemplate}&uuid=${uuid}&name=${cvName}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        }
        throw new Error(saveResponse.data.message || "Failed to save CV");
      })
      .then((generateResponse) => {
        const link = generateResponse?.data?.body?.link;
        if (link && newTab) {
          newTab.location.href = link;
        } else {
          throw new Error("Failed to generate PDF link");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "An unexpected error occurred",
          icon: "error",
          confirmButtonText: "OK",
        });
      })
      .finally(() => {
        setDownloading(false);
        setShowModal(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">CV Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Manage and customize your CV templates
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-2xl font-bold text-primary">
                  {totalUsageSum}
                </div>
                <div className="text-sm text-gray-500">Total Downloads</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-2xl font-bold text-primary">
                  {uniqueTemplateCount}
                </div>
                <div className="text-sm text-gray-500">Templates Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Template Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Choose a Template</h2>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleTemplateChange(tpl.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === tpl.id.toString()
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="bg-gray-100 h-32 flex items-center justify-center mb-2 rounded">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="h-full object-contain rounded-md"
                  />
                </div>
                <div className="text-center font-medium">{tpl.name}</div>
              </div>
            ))}
          </div>

          {/* Numbered pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === number
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Template Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {templates.find((t) => t.id.toString() === selectedTemplate)?.name}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            {/* <button
                            onClick={() => navigate(`/introduction/${uuid}/${selectedTemplate}`)}
                            className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                        >
                            <FaEdit className="mr-2" />
                            Edit Before Downloading
                        </button> */}
            <button
              onClick={handleDownloadClick}
              className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaDownload className="mr-2" />
              Preview & Download
            </button>
          </div>
        </div>
      </div>

      {/* CV Modal */}
      <CVModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedTemplate={selectedTemplate}
        uuid={uuid}
        cvName={cvName}
        setCvName={setCvName}
        handleSaveAndDownload={handleSaveAndDownload}
        downloading={downloading}
      />
    </div>
  );
};

export default AdminPage;
