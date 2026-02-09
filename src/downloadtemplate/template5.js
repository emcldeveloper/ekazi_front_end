import { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Spinner from "../widgets/spinner";
import PageLoader from "../widgets/pageLoader";
import axios from "axios";

const Template4 = () => {
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
    <div>
      <div className="">
        <div ref={cv} id="data" className="px-4 sm:px-6 md:px-12 pt-8 pb-12">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {candidate.subscription.length < 1 && (
              <div style={{ textAlign: "center" }}>
                <img
                  src="/logo.png"
                  alt="Watermark"
                  className="opacity-1"
                  style={{ width: "100%", maxWidth: "550px", height: "auto" }}
                />
              </div>
            )}
            <div className="absolute text-gray-200 opacity-10 text-4xl sm:text-6xl font-bold">
              Ekazi
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* Candidate Name */}
            <h1 className="text-2xl sm:text-4xl font-bold">CURRICULUM VITAE</h1>
            <h1
              className="text-xl sm:text-3xl font-bold"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              {candidate.applicant_profile[0]?.first_name || "First Name"},{" "}
              {candidate.applicant_profile[0]?.last_name || "Last Name"}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-8">
            {/* Profile Image Section */}
            <div className="md:col-span-5 flex justify-center">
              <img
                alt="profile"
                src={`https://api.ekazi.co.tz/${
                  candidate.applicant_profile[0]?.picture ||
                  "default-profile.png"
                }`}
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-2 border-gray-300"
              />
            </div>

            {/* Candidate Information Section */}
            <div className="md:col-span-7 space-y-4">
              {[
                { title: "Location:", value: "Dar es salaam" },
                {
                  title: "Phone:",
                  value: candidate.phone?.phone_number || "Not Specified",
                },
                {
                  title: "Email:",
                  value:
                    candidate.applicant_profile[0]?.email || "Not Specified",
                },
                { title: "Nationality:", value: "Tanzanian" },
                {
                  title: "Date of birth:",
                  value: candidate.applicant_profile[0]?.dob || "Not Specified",
                },
                {
                  title: "Gender:",
                  value:
                    candidate.applicant_profile[0]?.gender_name ||
                    "Not Specified",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="font-semibold text-gray-700">
                    {item.title}
                  </div>
                  <div className="sm:col-span-2 text-gray-600">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {/* Professional Summary Section */}
            <h1
              className="font-bold text-lg mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              PROFESSIONAL SUMMARY
            </h1>
            <div className="h-[2px] bg-gray-200 mb-3"></div>
            <p className="text-gray-700 mb-4">
              {candidate.careers[0]?.career || "Not Specified"}
            </p>

            {/* Career Objective Section */}
            <h1
              className="font-bold text-lg mt-4 mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              CAREER OBJECTIVE
            </h1>
            <div className="h-[2px] bg-gray-200 mb-3"></div>
            <p className="text-gray-700">
              {candidate.objective?.objective || "Not Specified"}
            </p>
          </div>

          {/* Work Experience Section */}
          {experiences.length > 0 && (
            <div className="mt-6">
              {/* Work Experience Header */}
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                WORK EXPERIENCE
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>

              {/* Experience Items */}
              <div className="space-y-6">
                {experiences.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    {/* Employer and Location */}
                    <div className="mb-2">
                      <p
                        className="font-bold text-lg"
                        style={{ color: "rgb(46, 88, 166)" }}
                      >
                        {item.employer?.employer_name ||
                          "Employer Name Not Specified"}
                      </p>
                      <p className="text-gray-600 capitalize">
                        {item.employer?.region?.region_name ||
                          "Region Not Specified"}
                        {item.employer?.sub_location
                          ? `, ${item.employer.sub_location}`
                          : ""}
                      </p>
                    </div>

                    {/* Positions List */}
                    <ul className="list-disc list-outside ml-5 space-y-3">
                      {item.positions.map((position, posIndex) => (
                        <li key={posIndex}>
                          <div className="space-y-1">
                            {/* Position Title */}
                            <p
                              className="font-bold"
                              style={{ color: "rgb(211, 99, 20)" }}
                            >
                              {position.position?.position_name ||
                                "Position Not Specified"}
                            </p>

                            {/* Employer */}
                            <i className="text-gray-700">
                              {position.employer?.employer_name ||
                                "Employer Not Specified"}
                            </i>

                            {/* Dates */}
                            <p className="text-gray-600">
                              {new Date(position?.start_date).getFullYear()} -{" "}
                              {position?.end_date
                                ? new Date(position.end_date).getFullYear()
                                : "Present"}
                            </p>
                            <p className="mt-2">
                              <span className="font-semibold">
                                Responsibilities:{" "}
                              </span>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: position.responsibility,
                                }}
                              ></span>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Language Proficiency Section */}
          <div className="mt-6">
            <h1
              className="font-bold text-lg mb-1"
              style={{ color: "rgb(46, 88, 166)" }}
            >
              LANGUAGE PROFICIENCY
            </h1>
            <div className="h-[2px] bg-gray-200 mb-3"></div>

            {/* Language List */}
            {candidate.language.length > 0 ? (
              <div className="p-4 bg-gray-50 rounded-md text-gray-700">
                {candidate.language.map((item, index) => (
                  <span key={index}>
                    {item.language?.language_name || "Language Not Specified"}
                    {index + 1 !== candidate.language.length && ", "}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No language proficiency data available.
              </p>
            )}
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

            {/* Skills Content */}
            <div className="p-4 bg-gray-50 rounded-md text-gray-700 space-y-4">
              {/* Culture */}
              <p className="flex space-x-1">
                <span
                  className="font-bold"
                  style={{ color: "rgb(211, 99, 20)" }}
                >
                  Culture:
                </span>
                <span>
                  {candidate.culture.map((item, index) => (
                    <span key={index}>
                      {item.culture?.culture_name}
                      {index + 1 !== candidate.culture.length && ", "}
                    </span>
                  ))}
                </span>
              </p>

              {/* Personality */}
              <p className="flex space-x-1">
                <span
                  className="font-bold"
                  style={{ color: "rgb(211, 99, 20)" }}
                >
                  Personality:
                </span>
                <span>
                  {candidate.culture.map((item, index) => (
                    <span key={index}>
                      {item.culture?.culture_name}
                      {index + 1 !== candidate.culture.length && ", "}
                    </span>
                  ))}
                </span>
              </p>

              {/* Skill & Knowledge */}
              <p className="flex space-x-1 flex-wrap">
                <span
                  className="font-bold"
                  style={{ color: "rgb(211, 99, 20)" }}
                >
                  Skill & Knowledge:
                </span>
                <span>
                  {candidate.knowledge.map((item, index) => (
                    <span key={index}>
                      {item.knowledge?.knowledge_name}
                      {index + 1 !== candidate.knowledge.length && ", "}
                    </span>
                  ))}
                </span>
              </p>

              {/* Software */}
              <p className="flex space-x-1 flex-wrap">
                <span
                  className="font-bold"
                  style={{ color: "rgb(211, 99, 20)" }}
                >
                  Software:
                </span>
                <span>
                  {candidate.software.map((item, index) => (
                    <span key={index}>
                      {item.software?.software_name}
                      {index + 1 !== candidate.software.length && ", "}
                    </span>
                  ))}
                </span>
              </p>

              {/* Tools */}
              <p className="flex space-x-1">
                <span
                  className="font-bold"
                  style={{ color: "rgb(211, 99, 20)" }}
                >
                  Tools:
                </span>
                <span>
                  {candidate.tools.map((item, index) => (
                    <span key={index}>
                      {item.tool?.tool_name}
                      {index + 1 !== candidate.tools.length && ", "}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>

          {/* Education Details Section */}
          {candidate.education.length > 0 && (
            <div className="mt-6">
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                EDUCATION DETAILS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>

              {/* Education List */}
              <div className="space-y-4">
                {candidate.education.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    {/* Course Name */}
                    <p
                      className="font-bold"
                      style={{ color: "rgb(211, 99, 20)" }}
                    >
                      {item?.course?.course_name || "Course Name Not Specified"}
                    </p>

                    {/* Dates */}
                    <p className="text-gray-700">
                      {item?.started
                        ? new Date(item.started).getFullYear()
                        : "Start Date Not Specified"}{" "}
                      -{" "}
                      {item?.ended
                        ? new Date(item.ended).getFullYear()
                        : "End Date Not Specified"}
                    </p>

                    {/* Level and College */}
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <i>
                        {item?.level?.education_level || "Level Not Specified"}
                      </i>
                      <span>
                        {item?.college?.college_name ||
                          "College Name Not Specified"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Proficiency Qualification Section */}
          {candidate.proficiency.length > 0 && (
            <div className="mt-6">
              {/* Header */}
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                PROFICIENCY QUALIFICATION
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>

              {/* Proficiency List */}
              <div className="space-y-4">
                {candidate.proficiency.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    {/* Award Name */}
                    <p
                      className="font-bold"
                      style={{ color: "rgb(211, 99, 20)" }}
                    >
                      {item?.award || "Award Not Specified"}
                    </p>

                    {/* Start and End Dates */}
                    <p className="text-gray-700">
                      {item?.started
                        ? formatDate(item.started)
                        : "Start Date Not Specified"}{" "}
                      -{" "}
                      {item?.ended
                        ? formatDate(item.ended)
                        : "End Date Not Specified"}
                    </p>

                    {/* Proficiency and Organization */}
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <i>
                        {item?.proficiency?.proficiency_name ||
                          "Proficiency Not Specified"}
                      </i>
                      <p>
                        {item?.organization?.organization_name ||
                          "Organization Not Specified"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainings & Workshops Section */}
          {candidate.training.length > 0 && (
            <div className="mt-6">
              {/* Header */}
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                TRAININGS & WORKSHOPS
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>

              {/* Trainings List */}
              <div className="space-y-4">
                {candidate.training.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    {/* Training Name */}
                    <p
                      className="font-bold"
                      style={{ color: "rgb(211, 99, 20)" }}
                    >
                      {item?.name || "Training Not Specified"}
                    </p>

                    {/* Start and End Dates */}
                    <p className="text-gray-700">
                      {item?.started
                        ? formatDate(item.started)
                        : "Start Date Not Specified"}{" "}
                      -{" "}
                      {item?.ended
                        ? formatDate(item.ended)
                        : "End Date Not Specified"}
                    </p>

                    {/* Institution */}
                    <div className="flex space-x-2 text-gray-700 mt-2">
                      <p>{item?.institution || "Institution Not Specified"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referees Section */}
          {candidate.referees.length > 0 && (
            <div className="mt-6">
              {/* Header */}
              <h1
                className="font-bold text-lg mb-1"
                style={{ color: "rgb(46, 88, 166)" }}
              >
                REFEREES
              </h1>
              <div className="h-[2px] bg-gray-200 mb-3"></div>

              {/* Referees List */}
              <div className="space-y-4">
                {candidate.referees.map((referee, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-md">
                    {/* Name */}
                    <p
                      className="text-lg font-bold"
                      style={{ color: "rgb(211, 99, 20)" }}
                    >
                      {`${referee?.first_name || "First Name"} ${
                        referee?.middle_name || ""
                      } ${referee?.last_name || "Last Name"}`}
                    </p>

                    {/* Position */}
                    <p className="text-gray-700">
                      {referee?.referee_position || "Position Not Specified"}
                    </p>

                    {/* Phone */}
                    <p className="text-gray-700">
                      <span
                        className="font-semibold"
                        style={{ color: "rgb(211, 99, 20)" }}
                      >
                        Phone:
                      </span>{" "}
                      {referee?.phone || "Phone Not Specified"}
                    </p>

                    {/* Email */}
                    <p className="text-gray-700">
                      <span
                        className="font-semibold"
                        style={{ color: "rgb(211, 99, 20)" }}
                      >
                        Email:
                      </span>{" "}
                      {referee?.email || "Email Not Specified"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template4;
