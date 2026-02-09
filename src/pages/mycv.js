import { useContext, useEffect, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";
import { checkIfExists } from "../controllers/apisController";
import moment from "moment";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Template1 from "../downloadtemplate/template1";
import Template2 from "../downloadtemplate/template2";
import Template3 from "../downloadtemplate/template3";
import Template4 from "../downloadtemplate/template4";
import Template5 from "../downloadtemplate/template5";
import Template6 from "../downloadtemplate/template6";
import Template7 from "../downloadtemplate/template7";
import Template8 from "../downloadtemplate/template8";
import Template9 from "../downloadtemplate/template9";
import Template10 from "../downloadtemplate/template10";
import Swal from "sweetalert2";

const MyCv = () => {
  const templates = [
    { id: 1, name: "Template 1", image: "/cv1.png", component: <Template1 /> },
    { id: 2, name: "Template 2", image: "/cv2.png", component: <Template2 /> },
    { id: 3, name: "Template 3", image: "/cv3.png", component: <Template3 /> },
    { id: 4, name: "Template 4", image: "/cv4.png", component: <Template4 /> },
    { id: 5, name: "Template 5", image: "/cv5.png", component: <Template5 /> },
    { id: 6, name: "Template 6", image: "/cv6.png", component: <Template6 /> },
    { id: 7, name: "Template 7", image: "/cv7.png", component: <Template7 /> },
    { id: 8, name: "Template 8", image: "/cv8.png", component: <Template8 /> },
    { id: 9, name: "Template 9", image: "/cv9.png", component: <Template9 /> },
    {
      id: 10,
      name: "Template 10",
      image: "/cv10.png",
      component: <Template10 />,
    },
  ];

  const [originalDetails, setOriginalDetails] = useState(null);
  const [careerObjective, setCareerObjective] = useState(
    originalDetails?.careers[0].career || ""
  );
  const [Objective, setObjective] = useState(
    originalDetails?.objective.objective || ""
  );
  const [subscription, setSubscription] = useState([]);
  const { uuid, template } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Filter subscription data based on the search term
  const filteredData = subscription.filter((sub) => {
    const applicantName = `${sub.applicant.first_name} ${sub.applicant.last_name}`;
    const cvName = sub.cv_name.toLowerCase();
    const templateNo = sub.template_no.toString();
    const created_at = sub.created_at.toString();

    return (
      applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cvName.includes(searchTerm.toLowerCase()) ||
      templateNo.includes(searchTerm.toLowerCase()) ||
      created_at.includes(searchTerm.toLowerCase())
    );
  });

  // Update your filteredData to use pagination
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    axios
      // https://api.ekazi.co.tz
      .get(`http://127.0.0.1:8000/api/applicant/mycv/${uuid}`)
      .then((response) => {
        console.log("API Response:", response);
        if (response) {
          const data = response.data.mycv;
          setSubscription(data);
          console.log("test cv sub", data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching CV Subscription data:", error.message);
      });
  }, [uuid]); // Added uuid as dependency

  const openModal = (cv) => {
    setSelectedCv(cv);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCv(null);
  };

  // Add this function to handle deletion
  const handleDeletey = (id) => {
    // Implement your delete logic here

    // Typically you would make an API call to delete the item
    // and then update your state to remove the deleted item

    axios
      .delete(`http://127.0.0.1:8000/api/applicant/deletecv/${id}`)
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: response.data.success,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
        setSubscription((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting CV:", error);
      });
  };
  const handleDelete = (id) => {
    {
      Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the item. Do you want to proceed? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `http://127.0.0.1:8000/api/applicant/deletecv/${id}`
            );

            if (response.status === 200) {
              Swal.fire({
                title: "Success!",
                text: "Data has been deleted permanently.",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
            setSubscription((prev) => prev.filter((item) => item.id !== id));
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove referee. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl sm:text-3xl">My Downloaded Cv</h1>
        </div>
      </div>

      <div className="mt-2">
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-4 py-2 w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">CV Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Template No
                </th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            {/* Inside your table body where you map through paginatedData */}
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((sub) => {
                  // Find the matching template based on template_no
                  const matchedTemplate = templates.find(
                    (t) => t.id === sub.template_no
                  );

                  return (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {matchedTemplate ? (
                          <img
                            src={matchedTemplate.image}
                            alt={`Template ${sub.template_no}`}
                            className="h-16 w-auto object-contain rounded-md" // Adjusted size for table
                          />
                        ) : (
                          <span>No image available</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {`${sub.applicant.first_name} ${sub.applicant.last_name}`}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {sub.cv_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {sub.template_no}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {/* Your action buttons */}
                        <button
                          onClick={() => openModal(sub)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No CVs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    (currentPage + 1) * itemsPerPage,
                    filteredData.length
                  )}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span>{" "}
                results
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                className={`px-4 py-2 border rounded ${
                  currentPage === 0
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={
                  (currentPage + 1) * itemsPerPage >= filteredData.length
                }
                className={`px-4 py-2 border rounded ${
                  (currentPage + 1) * itemsPerPage >= filteredData.length
                    ? "bg-gray-100 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Modal for View CV */}
        {modalOpen && selectedCv && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 h-5/6 overflow-auto">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-xl font-semibold">
                  Viewing CV - Template {selectedCv.template_no}
                </h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={closeModal}
                >
                  <i className="fas fa-times"></i> Close
                </button>
              </div>

              <div className="h-full overflow-y-auto">
                {selectedCv.template_no === 1 ? (
                  <Template1 id={selectedCv.id} />
                ) : selectedCv.template_no === 2 ? (
                  <Template2 id={selectedCv.id} />
                ) : selectedCv.template_no === 3 ? (
                  <Template3 id={selectedCv.id} />
                ) : selectedCv.template_no === 4 ? (
                  <Template4 id={selectedCv.id} />
                ) : selectedCv.template_no === 5 ? (
                  <Template5 id={selectedCv.id} />
                ) : selectedCv.template_no === 6 ? (
                  <Template6 id={selectedCv.id} />
                ) : selectedCv.template_no === 7 ? (
                  <Template7 id={selectedCv.id} />
                ) : selectedCv.template_no === 8 ? (
                  <Template8 id={selectedCv.id} />
                ) : selectedCv.template_no === 9 ? (
                  <Template9 id={selectedCv.id} />
                ) : selectedCv.template_no === 10 ? (
                  <Template10 id={selectedCv.id} />
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    Unknown Template
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCv;
