import { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import moment from "moment";

const Template2 = () => {
  const cv = useRef();
  const { uuid, template } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [experiences, setExperiences] = useState([]);

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
  return (
    show && (
      <div className="">
        <div id="data" className="w-11/12 mx-auto">
          {/* Watermark Section */}
          <div className="py-3 bg-orange-400"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {candidate.subscription.length < 1 && (
              <div className="text-center">
                <img
                  src="/logo.png"
                  alt="Ekazi watermark"
                  className="mx-auto mb-2 w-48 opacity-1 sm:w-64 md:w-96"
                  style={{ height: "200px" }}
                />
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 sm:grid-cols-12 mt-8 items-center gap-4">
            {/* Profile Image */}
            <div className="col-span-4 flex justify-center sm:justify-start">
              <img
                alt="profile image"
                src={`https://api.ekazi.co.tz/${candidate.applicant_profile[0]?.picture}`}
                className="w-48 h-48 object-cover"
              />
            </div>

            {/* Candidate Info */}
            <div className="col-span-8">
              <h1 className="text-lg font-bold mt-3">
                {candidate.applicant_profile[0]?.first_name}
              </h1>
              <h1>
                {candidate.experience.length > 0 &&
                  candidate.experience[0]?.position?.position_name}
              </h1>
              <div className="space-y-1 mt-2">
                {[
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    title: "Location:",
                    value: "Dar es salaam",
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    title: "Phone:",
                    value: candidate.phone?.phone_number,
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>
                    ),
                    title: "Email:",
                    value: candidate.applicant_profile[0]?.email,
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    title: "Nationality:",
                    value: "Tanzanian",
                  },
                  {
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    title: "Gender:",
                    value: candidate.applicant_profile[0]?.gender_name,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex space-x-2 items-center">
                    <div className="text-orange-500">{item.icon}</div>
                    <div>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Summary Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">PROFESSIONAL SUMMARY</h1>
              </div>
              <div className="col-span-8">
                <p>{candidate.careers[0]?.career}</p>
                <h1 className="font-bold mt-2">Career Objective</h1>
                <p>{candidate.objective?.objective}</p>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">WORK EXPERIENCE</h1>
              </div>
              <div className="col-span-8">
                <div className="space-y-4">
                  {experiences?.length > 0 ? (
                    experiences.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-4/12">
                          <p>
                            <span className="font-bold">
                              {item.start_date
                                ? new Date(item.start_date).getFullYear()
                                : "N/A"}{" "}
                              -{" "}
                              {item.end_date
                                ? new Date(item.end_date).getFullYear()
                                : "Present"}
                            </span>
                          </p>
                          <span className="capitalize">
                            {item.employer?.region?.region_name ||
                              "Unknown Region"}
                            ,{" "}
                            {item.employer?.sub_location || "Unknown Location"}
                          </span>
                        </div>
                        <div className="w-full sm:w-8/12">
                          <div>
                            <p className="font-bold">
                              {item.employer?.employer_name ||
                                "Unknown Employer"}
                            </p>
                          </div>
                          <div className="ml-5 mt-2">
                            {item.positions?.length > 0 ? (
                              item.positions.map(
                                (positionItem, positionIndex) => (
                                  <div
                                    key={positionIndex}
                                    className="flex space-x-2"
                                  >
                                    <div className="flex flex-col items-center">
                                      <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                      <div className="h-16 w-1 bg-gray-200"></div>
                                    </div>
                                    <div className="py-0 my-0">
                                      <p className="text-orange-500 py-0 my-0">
                                        {positionItem.position?.position_name ||
                                          "Unknown Position"}
                                      </p>
                                      <i>
                                        {positionItem.employer?.employer_name ||
                                          "Unknown Employer"}
                                      </i>
                                      <p>
                                        {positionItem.start_date
                                          ? new Date(
                                              positionItem.start_date
                                            ).getFullYear()
                                          : "N/A"}{" "}
                                        -{" "}
                                        {positionItem.end_date
                                          ? positionItem.end_date === null
                                            ? "Present"
                                            : new Date(
                                                positionItem.end_date
                                              ).getFullYear()
                                          : "N/A"}
                                      </p>
                                      <p className="mt-2">
                                        <span className="font-semibold">
                                          Responsibilities:{" "}
                                        </span>
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: positionItem.responsibility,
                                          }}
                                        ></span>
                                      </p>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <p>No positions available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No work experience available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">EDUCATION</h1>
              </div>
              <div className="col-span-8">
                <div className="space-y-4">
                  {candidate?.education?.length > 0 ? (
                    candidate.education.map((item, index) => (
                      <div key={index}>
                        <p>
                          <span className="font-bold">
                            {item?.course?.course_name || "Unknown Course"}:
                          </span>{" "}
                          {item?.started
                            ? new Date(item.started).getFullYear()
                            : "N/A"}{" "}
                          -{" "}
                          {item?.ended
                            ? new Date(item.ended).getFullYear()
                            : "Present"}
                        </p>
                        <span className="text-orange-500">
                          {item?.level?.education_level || "Unknown Level"}
                        </span>
                        ,{" "}
                        <span>
                          {item?.college?.college_name || "Unknown College"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No education records available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">SKILLS</h1>
              </div>
              <div className="col-span-8">
                <div className="flex flex-wrap">
                  {candidate?.culture?.length > 0 ? (
                    candidate.culture.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border"
                      >
                        {item?.culture?.culture_name || "Unknown Culture"}
                      </div>
                    ))
                  ) : (
                    <p>No culture skills available</p>
                  )}

                  {candidate?.knowledge?.length > 0 ? (
                    candidate.knowledge.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border"
                      >
                        {item?.knowledge?.knowledge_name || "Unknown Knowledge"}
                      </div>
                    ))
                  ) : (
                    <p>No knowledge skills available</p>
                  )}

                  {candidate?.software?.length > 0 ? (
                    candidate.software.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border"
                      >
                        {item?.software?.software_name || "Unknown Software"}
                      </div>
                    ))
                  ) : (
                    <p>No software skills available</p>
                  )}

                  {candidate?.tools?.length > 0 ? (
                    candidate.tools.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border"
                      >
                        {item?.tool?.tool_name || "Unknown Tool"}
                      </div>
                    ))
                  ) : (
                    <p>No tool skills available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">LANGUAGES</h1>
              </div>
              <div className="col-span-8">
                <div className="flex flex-wrap">
                  {candidate?.language?.length > 0 ? (
                    candidate.language.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border"
                      >
                        {item?.language?.language_name || "Unknown Language"}{" "}
                        {index + 1}
                      </div>
                    ))
                  ) : (
                    <p>No language records available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Proficiency Qualification Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">PROFICIENCY QUALIFICATION</h1>
              </div>
              <div className="col-span-8">
                {candidate?.proficiency?.length > 0 ? (
                  candidate.proficiency.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-5/12">
                        <p className="font-bold">
                          {moment(item?.started || "Unknown Start").format(
                            "YYYY-MM"
                          )}
                          - {moment(item?.ended || "Present").format("YYYY-MM")}
                        </p>
                      </div>
                      <div className="w-full sm:w-7/12">
                        <p>
                          <span className="font-bold">
                            {item?.award || "Unknown Award"}
                          </span>
                        </p>
                        <p className="text-orange-500">
                          {item?.organization?.organization_name ||
                            "Unknown Organization"}
                        </p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Proficiency:</span>
                          <span>
                            {item?.proficiency?.proficiency_name ||
                              "Unknown Proficiency"}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No proficiency qualifications available</p>
                )}
              </div>
            </div>
          </div>

          {/* Trainings and Workshops Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">TRAININGS AND WORKSHOPS</h1>
              </div>
              <div className="col-span-8">
                {candidate?.training?.length > 0 ? (
                  candidate.training.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-5/12">
                        <p className="font-bold">
                          {item?.started || "Unknown Start"} -{" "}
                          {item?.ended || "Present"}
                        </p>
                      </div>
                      <div className="w-full sm:w-7/12">
                        <p className="text-orange-500">
                          {item?.institution || "Unknown institution"}
                        </p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Training:</span>
                          <span>{item?.name || "Unknown Training"}</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No training and workshop records available</p>
                )}
              </div>
            </div>
          </div>

          {/* References Section */}
          <div className="mt-8">
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 mt-2 gap-4">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">REFERENCES</h1>
              </div>
              <div className="col-span-8">
                {candidate?.referees?.length > 0 ? (
                  candidate.referees.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2"
                    >
                      <div>
                        <p>
                          <span className="font-bold">
                            {item?.first_name || "Unknown"}{" "}
                            {item?.middle_name || ""}{" "}
                            {item?.last_name || "Unknown"}
                          </span>
                        </p>
                        <p>{item?.referee_position || "Unknown Position"}</p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          {item?.phone || "N/A"}
                        </p>
                        <p>
                          <span className="font-bold">Email:</span>{" "}
                          {item?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No references available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Template2;
