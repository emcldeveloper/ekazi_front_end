import { useContext, useEffect, useRef, useState } from "react";
import { StepsContext } from "../layouts/mainLayout";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import axios from "axios";

const Template9 = () => {
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
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {candidate.subscription.length < 1 && ( // Render the image only if length is 1 or less
              <div className="text-center">
                <img
                  src="/logo.png" // Replace with the actual path to the watermark image
                  alt="Ekazi watermark"
                  className="mx-auto mb-2 w-48 opacity-1" // Adjust size and opacity as needed
                  style={{ width: "550px", height: "200px" }}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-12 mt-8 items-center">
            <div className="col-span-8">
              <div>
                <h1 className="text-2xl font-bold items-center justify-center flex flex-col">
                  CURRICULUM VITAE
                </h1>

                {candidate.referees.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h1 className="text-2X1 font-bold mt-3">
                      {" "}
                      {item?.first_name} {item?.middle_name} {item?.last_name}
                    </h1>
                    <p>{item?.referee_position}</p>
                    <p>
                      <span className="font-bold">Phone:</span>{" "}
                      {item?.phone || "Phone not available"}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span>{" "}
                      {item?.email || "Email not available"}
                    </p>
                  </div>
                ))}
              </div>

              <div className=" space-y-1 mt-2">
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
                    value: "Dar es Salaam",
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
                    value: candidate.phone.phone_number,
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
                    value: candidate.applicant_profile[0]?.email || "N/A",
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
                    value: candidate.applicant_profile[0]?.gender_name || "N/A",
                  },
                  ,
                ].map((item) => {
                  return (
                    <div className="flex space-x-2 items-center">
                      <div className="text-orange-500">{item.icon}</div>
                      <div>{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              {/* Left Column: Title */}
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">PROFESSIONAL SUMMARY</h1>
              </div>

              {/* Right Column: Content */}
              <div className="col-span-8">
                {/* Professional Summary Content */}
                <p>
                  {candidate.careers[0]?.career ||
                    "No professional summary available."}
                </p>

                {/* Career Objective Section */}
                <h1 className="font-bold mt-2">Career Objective</h1>
                <p>
                  {candidate.objective?.objective ||
                    "No career objective provided."}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">WORK EXPERIENCE</h1>
              </div>
              <div className="col-span-8">
                <div className="space-y-4">
                  {experiences.map((experience) => (
                    <div className="flex flex-col mb-4" key={experience.id}>
                      {/* Employer Name */}
                      <div>
                        <p>
                          <span className="font-bold">
                            {experience.employer?.employer_name ||
                              "Employer not specified"}
                          </span>
                        </p>
                      </div>

                      {/* Positions */}
                      <div className="ml-5 mt-2">
                        {experience.positions.map((position) => (
                          <div
                            className="flex space-x-2 mb-4"
                            key={position.position?.id || position.id}
                          >
                            {/* Timeline Indicator */}
                            <div className="flex flex-col items-center">
                              <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                              <div className="h-10 w-1 bg-gray-200"></div>
                            </div>

                            {/* Position Details */}
                            <div className="flex-grow">
                              {/* Position Name and Dates */}
                              <div className="flex justify-between items-center">
                                <div className="flex-1 pr-4">
                                  <p className="text-orange-500 break-words">
                                    {position.position?.position_name ||
                                      "Position not specified"}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm break-words">
                                    {new Date(
                                      position.start_date
                                    ).getFullYear()}{" "}
                                    -{" "}
                                    {position.end_date
                                      ? new Date(
                                          position.end_date
                                        ).getFullYear()
                                      : "Present"}
                                  </p>
                                </div>
                              </div>
                              {/* Location Details */}
                              <p className="text-sm text-gray-600 italic">
                                {experience.employer?.region?.region_name ||
                                  "Region not specified"}
                                ,{" "}
                                {experience.employer?.sub_location ||
                                  "Location not specified"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              <div className=" col-span-4 pr-8">
                <h1 className="font-bold text-lg">EDUCATION</h1>
              </div>
              <div className=" col-span-8">
                <div className=" space-y-4">
                  {candidate.education.map((item) => (
                    <div className="mb-4" key={item.id}>
                      {/* Course Name and Dates */}
                      <p>
                        <span className="font-bold">
                          {item.course?.course_name || "Course not specified"}:
                        </span>{" "}
                        {item.started
                          ? new Date(item.started).getFullYear()
                          : "N/A"}{" "}
                        -{" "}
                        {item.ended
                          ? new Date(item.ended).getFullYear()
                          : "Present"}
                      </p>

                      {/* Education Level and College */}
                      <p className="text-sm">
                        <span className="text-orange-500">
                          {item.level?.education_level || "Level not specified"}
                        </span>
                        ,{" "}
                        <span>
                          {item.college?.college_name ||
                            "College not specified"}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              {/* Title Section */}
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">SKILLS</h1>
              </div>

              {/* Skills List */}
              <div className="col-span-8">
                <div className="flex flex-wrap">
                  {/* Culture Skills */}
                  {candidate.culture?.map((item, index) => (
                    <div
                      key={`culture-${index}`}
                      className="py-1 px-3 mr-2 mb-2 rounded-md border bg-gray-50"
                    >
                      {item.culture?.culture_name || "No culture specified"}
                    </div>
                  ))}

                  {/* Knowledge Skills */}
                  {candidate.knowledge?.map((item, index) => (
                    <div
                      key={`knowledge-${index}`}
                      className="py-1 px-3 mr-2 mb-2 rounded-md border bg-gray-50"
                    >
                      {item.knowledge?.knowledge_name ||
                        "No knowledge specified"}
                    </div>
                  ))}

                  {/* Software Skills */}
                  {candidate.software?.map((item, index) => (
                    <div
                      key={`software-${index}`}
                      className="py-1 px-3 mr-2 mb-2 rounded-md border bg-gray-50"
                    >
                      {item.software?.software_name || "No software specified"}
                    </div>
                  ))}

                  {/* Tools Skills */}
                  {candidate.tools?.map((item, index) => (
                    <div
                      key={`tools-${index}`}
                      className="py-1 px-3 mr-2 mb-2 rounded-md border bg-gray-50"
                    >
                      {item.tool?.tool_name || "No tool specified"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              {/* Title Section */}
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">LANGUAGES</h1>
              </div>

              {/* Languages List */}
              <div className="col-span-8">
                <div className="flex flex-wrap">
                  {candidate.language?.length > 0 ? (
                    candidate.language.map((item, index) => (
                      <div
                        key={`language-${index}`}
                        className="py-1 px-3 mr-2 mb-2 rounded-md border bg-gray-50"
                      >
                        {item.language?.language_name ||
                          "No language specified"}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No languages available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {/* Header Section with Orange Line */}
            <div>
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <div className="py-[4px] bg-orange-500"></div>
                </div>
              </div>
              <div className="py-[2px] bg-gray-100"></div>
            </div>

            {/* Proficiency Qualification Section */}
            <div className="grid grid-cols-12 mt-2">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">PROFICIENCY QUALIFICATION</h1>
              </div>
              <div className="col-span-8">
                {candidate.proficiency?.length > 0 ? (
                  candidate.proficiency.map((item, index) => (
                    <div key={`proficiency-${index}`} className="flex mb-4">
                      <div className="w-4/12">
                        <p className="font-bold">
                          {item.started} - {item.ended}
                        </p>
                      </div>
                      <div className="w-8/12">
                        <p>
                          <span className="font-bold">{item.award}</span>
                        </p>
                        <p className="text-orange-500">
                          {item.organization?.organization_name}
                        </p>
                        <p className="flex space-x-2">
                          <span className="font-bold">Proficiency:</span>
                          <span>
                            {item.proficiency?.proficiency_name ||
                              "Not specified"}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    No proficiency qualifications available
                  </p>
                )}
              </div>
            </div>

            {/* Trainings and Workshops Section */}
            <div className="mt-8">
              <div className="grid grid-cols-12 mt-2">
                <div className="col-span-4 pr-8">
                  <h1 className="font-bold text-lg">TRAININGS AND WORKSHOPS</h1>
                </div>
                <div className="col-span-8">
                  {candidate.training?.length > 0 ? (
                    candidate.training.map((item, index) => (
                      <div key={`training-${index}`} className="flex mb-4">
                        <div className="w-4/12">
                          <p className="font-bold">
                            {item.started} - {item.ended}
                          </p>
                        </div>
                        <div className="w-8/12">
                          <p>
                            <span className="font-bold">{item.award}</span>
                          </p>
                          <p className="text-orange-500">
                            {item.organization?.organization_name}
                          </p>
                          <p className="flex space-x-2">
                            <span className="font-bold">Proficiency:</span>
                            <span>
                              {item.proficiency?.proficiency_name ||
                                "Not specified"}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No trainings or workshops available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-12 mt-2">
              <div className="col-span-4 pr-8">
                <h1 className="font-bold text-lg">REFERENCES</h1>
              </div>
              <div className="col-span-8">
                <div className="grid grid-cols-3 gap-4">
                  {candidate.referees?.length > 0 ? (
                    candidate.referees.map((referee, index) => (
                      <div key={referee.id || index} className="mb-4">
                        {/* Referee Name */}
                        <p className="font-bold">
                          {`${referee.first_name || ""} ${
                            referee.middle_name || ""
                          } ${referee.last_name || ""}`.trim()}
                        </p>

                        {/* Referee Position */}
                        {referee.referee_position && (
                          <p>{referee.referee_position}</p>
                        )}

                        {/* Referee Phone */}
                        {referee.phone && (
                          <p>
                            <span className="font-bold">Phone:</span>{" "}
                            {referee.phone}
                          </p>
                        )}

                        {/* Referee Email */}
                        {referee.email && (
                          <p>
                            <span className="font-bold">Email:</span>{" "}
                            {referee.email}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No referees available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Template9;
