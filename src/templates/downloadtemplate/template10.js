import { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";

const Template6 = () => {
  const cv = useRef();
  const { uuid, template } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const isVerified = candidate?.subscription?.verify === 1;
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // 'yyyy-mm-dd'
  };
  console.log("checjk verifcation:", isVerified);
  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`https://api.ekazi.co.tz/api/cv/cv_builder/${uuid}`)
      .then((response) => {
        if (response?.data?.data) {
          setCandidate(response.data.data); // Set the candidate data from the API response
          setShow(true); // Display the content
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid]);

  useEffect(() => {
    if (candidate != null) {
      candidate.experience.forEach((item) => {
        if (experiences.filter((e) => e.employer.id == item.employer.id) == 0) {
          item.positions = candidate.experience.filter(
            (ex) => ex.employer.id == item.employer.id
          );
          setExperiences([...experiences, item]);
        }
      });
    }
  }, [candidate, experiences]);

  return !show ? (
    <PageLoader />
  ) : candidate == null ? (
    <div className="flex justify-center items-center">
      <p className="pt-12 text-gray-300">Oops! No Content</p>
    </div>
  ) : (
    <div className="px-4 sm:px-6 lg:px-12 pt-8 pb-12">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        {candidate.subscription.length < 1 && (
          <div style={{ textAlign: "center" }}>
            <img
              src="/logo.png"
              alt="Watermark"
              className="opacity-1 w-64 h-24 sm:w-550px sm:h-200px"
            />
          </div>
        )}
        <div className="absolute text-gray-200 opacity-10 text-4xl sm:text-6xl font-bold">
          Ekazi
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-primary py-2 text-white px-4">
          {candidate.applicant_profile[0]?.first_name}{" "}
          {candidate.applicant_profile[0]?.last_name}
        </h1>
      </div>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-8">
        {/* Left Column */}
        <div className="sm:col-span-7 space-y-8">
          {/* Work Experience */}
          {experiences?.length > 0 ? (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                WORK EXPERIENCE
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <div className="space-y-6">
                {experiences.map((item, index) => (
                  <div key={index} className="p-2 rounded-md">
                    <p className="font-bold text-lg">
                      {item?.employer?.employer_name ||
                        "Employer Not Specified"}
                    </p>
                    <p className="text-gray-600 capitalize">
                      {item?.employer?.region?.region_name ||
                        "Region Not Specified"}
                      ,{" "}
                      {item?.employer?.sub_location ||
                        "Sub-location Not Specified"}
                    </p>
                    <ul className="list-disc list-outside ml-5 space-y-2">
                      {item?.positions?.length > 0 ? (
                        item.positions.map((position, posIndex) => (
                          <li key={posIndex}>
                            <p className="font-bold">
                              {position.position?.position_name ||
                                "Position Not Specified"}
                            </p>
                            <p className="text-gray-600">
                              {position?.start_date
                                ? new Date(position.start_date).getFullYear()
                                : "Start Date Not Available"}{" "}
                              -{" "}
                              {position?.end_date
                                ? new Date(position.end_date).getFullYear()
                                : "Present"}
                            </p>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-600">No positions available.</p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                WORK EXPERIENCE
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <p className="text-gray-700">No work experience available.</p>
            </div>
          )}

          {/* Education Details */}
          {candidate?.education?.length > 0 ? (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                EDUCATION DETAILS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <div className="space-y-4">
                {candidate.education.map((item, index) => (
                  <div key={index} className="p-4 rounded-md">
                    <p className="font-bold">
                      {item?.course?.course_name || "Course Name Not Available"}
                      :
                    </p>
                    <p className="text-gray-700">
                      {item?.started
                        ? new Date(item.started).getFullYear()
                        : "Start Year Not Available"}{" "}
                      -
                      {item?.ended
                        ? new Date(item.ended).getFullYear()
                        : "End Year Not Available"}
                    </p>
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <i>
                        {item?.level?.education_level ||
                          "Education Level Not Available"}
                      </i>
                      <span>
                        {item?.college?.college_name ||
                          "College Name Not Available"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                EDUCATION DETAILS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <p className="text-gray-700">No education details available.</p>
            </div>
          )}

          {/* Proficiency Qualifications */}
          {candidate?.proficiency?.length > 0 ? (
            <div className="mt-6">
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                PROFICIENCY QUALIFICATION
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <div className="space-y-4">
                {candidate.proficiency?.map((item, index) => (
                  <div key={index} className="p-4 rounded-md">
                    <p className="font-bold">
                      {item?.award || "Award Not Available"}:
                    </p>
                    <p className="text-gray-700">
                      {item?.started
                        ? formatDate(item.started)
                        : "Start Date Not Available"}{" "}
                      -
                      {item?.ended
                        ? formatDate(item.ended)
                        : "End Date Not Available"}
                    </p>
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <i>
                        {item?.proficiency?.proficiency_name ||
                          "Proficiency Name Not Available"}
                      </i>
                      <p>
                        {item?.organization?.organization_name ||
                          "Organization Name Not Available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                PROFICIENCY QUALIFICATION
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <p className="text-gray-700">
                No proficiency qualifications available.
              </p>
            </div>
          )}

          {/* Trainings & Workshops */}
          {candidate?.training?.length > 0 ? (
            <div className="mt-6">
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                TRAININGS & WORKSHOPS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <div className="space-y-4">
                {candidate.training?.map((item, index) => (
                  <div key={index} className="p-4 rounded-md">
                    <p className="font-bold">
                      {item?.name || "Award Not Available"}:
                    </p>
                    <p className="text-gray-700">
                      {item?.started
                        ? formatDate(item.started)
                        : "Start Date Not Available"}{" "}
                      -
                      {item?.ended
                        ? formatDate(item.ended)
                        : "End Date Not Available"}
                    </p>
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <p>
                        {item?.institution || "Institution Name Not Available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                TRAININGS & WORKSHOPS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <p className="text-gray-700">No trainings available.</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="sm:col-span-5 space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            {/* Profile Image Section */}
            <div className="flex-shrink-0">
              <img
                alt="profile image"
                src={
                  candidate?.applicant_profile?.[0]?.picture
                    ? `https://api.ekazi.co.tz/${candidate.applicant_profile[0].picture}`
                    : "path_to_default_image_or_placeholder.jpg"
                }
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <h1
              className="font-bold text-lg mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              PERSONAL INFORMATION
            </h1>
            {[
              { title: "Location:", value: "Dar es salaam" },
              {
                title: "Phone:",
                value: candidate.phone?.phone_number || "Not specified",
              },
              {
                title: "Email:",
                value: candidate.applicant_profile[0]?.email || "Not specified",
              },
              { title: "Nationality:", value: "Tanzanian" },
              {
                title: "Date of birth:",
                value: candidate.applicant_profile[0]?.dob || "Not specified",
              },
              {
                title: "Gender:",
                value:
                  candidate.applicant_profile[0]?.gender_name ||
                  "Not specified",
              },
              {
                title: "Marital status:",
                value:
                  candidate.applicant_profile[0]?.marital_status ||
                  "Not specified",
              },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div className="font-semibold text-gray-700">{item.title}</div>
                <div className="col-span-2 text-gray-600">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Professional Summary */}
          <div>
            <h1
              className="font-bold text-lg mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              PROFESSIONAL SUMMARY
            </h1>
            <div className="h-[2px] bg-gray-200 mb-3"></div>
            <p className="text-gray-700">
              {candidate.careers?.[0]?.career || "Not Specified"}
            </p>
          </div>

          {/* Career Objective */}
          <div>
            <h1
              className="font-bold text-lg mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              CAREER OBJECTIVE
            </h1>
            <div className="h-[2px] bg-gray-200 mb-3"></div>
            <p className="text-gray-700">
              {candidate.objective?.objective || "Not Specified"}
            </p>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h1
              className="font-bold mt-5 mb-1 text-lg"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              SKILLS
            </h1>
            <div className="h-[2px] bg-gray-100 mb-2"></div>
            <div className="p-4 rounded-md text-gray-700">
              {/* Culture Section */}
              <p className="flex space-x-1">
                <span className="font-bold">Culture:</span>
                <div className="flex space-x-1">
                  {candidate.culture?.length > 0 ? (
                    candidate.culture.map((item, index) => (
                      <p key={index}>
                        {item.culture?.culture_name}
                        {index + 1 !== candidate.culture.length && ","}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">Not Specified</p>
                  )}
                </div>
              </p>

              {/* Personality Section */}
              <p className="flex space-x-1">
                <span className="font-bold">Personality:</span>
                {candidate.culture?.length > 0 ? (
                  candidate.culture.map((item, index) => (
                    <p key={index}>
                      {item.culture?.culture_name}
                      {index + 1 !== candidate.culture.length && ","}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">Not Specified</p>
                )}
              </p>

              {/* Skill & Knowledge Section */}
              <p className="flex space-x-1 flex-wrap">
                <span className="font-bold">Skill & Knowledge:</span>
                {candidate.knowledge?.length > 0 ? (
                  candidate.knowledge.map((item, index) => (
                    <p key={index}>
                      {item.knowledge?.knowledge_name}
                      {index + 1 !== candidate.knowledge.length && ","}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">Not Specified</p>
                )}
              </p>

              {/* Software Section */}
              <p className="flex space-x-1 flex-wrap">
                <span className="font-bold">Software:</span>
                {candidate.software?.length > 0 ? (
                  candidate.software.map((item, index) => (
                    <p key={index}>
                      {item.software?.software_name}
                      {index + 1 !== candidate.software.length && ","}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">Not Specified</p>
                )}
              </p>

              {/* Tools Section */}
              <p className="flex space-x-1">
                <span className="font-bold">Tools:</span>
                {candidate.tools?.length > 0 ? (
                  candidate.tools.map((item, index) => (
                    <span key={index} className="text-gray-700">
                      {item.tool?.tool_name}
                      {index + 1 !== candidate.tools.length && ", "}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">Not Specified</p>
                )}
              </p>
            </div>
          </div>

          {/* Language Proficiency */}
          <div className="mt-6">
            <h1
              className="font-bold mt-5 mb-1 text-lg"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              LANGUAGE PROFICIENCY
            </h1>
            <div className="h-[2px] bg-gray-100 mb-2"></div>
            <div className="flex space-x-1">
              {candidate.language?.length > 0 ? (
                <div className="mt-6">
                  <div className="p-4 rounded-md text-gray-700">
                    {candidate.language.map((item, index) => (
                      <span key={index}>
                        {item.language?.language_name}
                        {index + 1 !== candidate.language.length && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Not Specified</p>
              )}
            </div>
          </div>

          {/* Referees Section */}
          {candidate.referees?.length > 0 ? (
            <div className="mt-6">
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                REFEREES
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <div className="space-y-4">
                {candidate.referees.map((referee, index) => (
                  <div key={index} className="p-4 rounded-md">
                    <p className="text-lg font-bold">
                      {referee?.first_name} {referee?.middle_name}{" "}
                      {referee?.last_name}
                    </p>
                    <p className="text-gray-700">{referee.referee_position}</p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Phone:</span>{" "}
                      {referee?.phone}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span>{" "}
                      {referee?.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                REFEREES
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>
              <p className="text-gray-700">No referees provided.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template6;
