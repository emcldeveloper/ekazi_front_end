import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template27() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="ml-3 text-gray-700">Loading CV...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[900px] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="text-start mx-auto bg-white p-[5mm] font-['Rubik'] text-[#222] shadow-[0_0_5px_rgba(0,0,0,0.2)]">
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[calc(297mm-10mm)] rounded-[0.3rem] bg-[#f5f7fa] overflow-hidden">
        <div className="relative mb-[5rem] bg-[linear-gradient(135deg,#224559,#1b3340)] px-8 pb-[6rem] pt-[4rem] text-center text-white">
          <div className="mb-2 text-[2.6rem] font-bold">{cvData.fullName}</div>
          <div className="mb-4 text-[1.2rem] opacity-90">
            {cvData.current_position}
          </div>
          <p className="mx-auto max-w-[700px] text-[1rem] opacity-95">
            {cvData.summary}
          </p>
          <img
            src={
              cvData.profile?.picture
                ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                : "https://placehold.co/150x150?text=Photo"
            }
            alt="profile"
            className="absolute bottom-[-75px] left-1/2 h-[150px] w-[150px] -translate-x-1/2 rounded-full border-[5px] border-white object-cover shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/150x150?text=Photo")
            }
          />
        </div>

        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-4">
              <div className="mb-[1.2rem] rounded-[8px] bg-white px-[1.2rem] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <h4>Contact</h4>

                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[8px] border border-[rgba(34,69,89,0.25)] bg-[rgba(34,69,89,0.08)] text-[#224559]">
                      <FiPhone />
                    </span>
                    <div className="text-[0.9rem] leading-[1.25] break-words">
                      {cvData.phone}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[8px] border border-[rgba(34,69,89,0.25)] bg-[rgba(34,69,89,0.08)] text-[#224559]">
                      <FiMail />
                    </span>
                    <div className="text-[0.9rem] leading-[1.25] break-words">
                      {cvData.email}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[8px] border border-[rgba(34,69,89,0.25)] bg-[rgba(34,69,89,0.08)] text-[#224559]">
                      <FiMapPin />
                    </span>
                    <div className="text-[0.9rem] leading-[1.25] break-words">
                      {cvData.location}
                    </div>
                  </div>

                  {payload?.user?.[0]?.website && (
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[8px] border border-[rgba(34,69,89,0.25)] bg-[rgba(34,69,89,0.08)] text-[#224559]">
                        <FiGlobe />
                      </span>
                      <div className="text-[0.9rem] leading-[1.25] break-words">
                        {payload?.user?.[0]?.website}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-[1.2rem] rounded-[8px] bg-white px-[1.2rem] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <h4>Skills</h4>
                <div className="flex flex-wrap">
                  {cvData.knowledges?.map((k, i) => (
                    <span
                      key={i}
                      className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-[8px] bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                    >
                      {k?.name}
                    </span>
                  ))}
                  {cvData.softwares?.map((s, i) => (
                    <span
                      key={i}
                      className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-[8px] bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                    >
                      {s?.name}
                    </span>
                  ))}
                </div>
              </div>

              {cvData.languages?.length > 0 && (
                <div className="mb-[1.2rem] rounded-[8px] bg-white px-[1.2rem] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <h4>Languages</h4>
                  <div className="flex flex-wrap">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-full bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {l?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(cvData.cultures?.length > 0 ||
                cvData.personalities?.length > 0 ||
                cvData.tools?.length > 0) && (
                <div className="mb-[1.2rem] rounded-[8px] bg-white px-[1.2rem] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <h4>Culture &amp; Personality</h4>
                  <div className="flex flex-wrap">
                    {cvData.cultures?.map((c, i) => (
                      <span
                        key={`c-${i}`}
                        className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-full bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {c?.name}
                      </span>
                    ))}
                    {cvData.personalities?.map((p, i) => (
                      <span
                        key={`p-${i}`}
                        className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-full bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {p?.name}
                      </span>
                    ))}
                    {cvData.tools?.map((t, i) => (
                      <span
                        key={`t-${i}`}
                        className="m-[0.2rem] inline-block max-w-full whitespace-normal break-words rounded-full bg-[#224559] px-[0.7rem] py-[0.3rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {t?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <div className="mb-10">
                <h4 className="mb-4 border-b-2 border-[#224559] pb-[0.3rem] text-[1.15rem] font-semibold uppercase text-[#224559]">
                  <FiBriefcase className="mr-2" /> Experience
                </h4>
                <div className="relative ml-4">
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-[#224559]" />
                  {cvData.experiences?.length
                    ? cvData.experiences.map((exp, i) => {
                        return (
                          <div key={i} className="relative mb-8 pl-8">
                            <div className="absolute left-[-7px] top-[6px] h-[14px] w-[14px] rounded-full border-2 border-white bg-[#224559]" />
                            <div className="mb-[0.2rem] text-[0.85rem] font-medium text-[#224559]">
                              {exp?.dates}
                            </div>
                            <div className="text-[1rem] font-semibold text-[#224559]">
                              {exp?.position}
                            </div>
                            <div className="mb-[0.4rem] text-[0.9rem] italic text-[#666]">
                              {exp?.organization}
                            </div>
                            {exp?.responsibility && (
                              <ul className="list-disc space-y-1 pl-5 text-sm">
                                {(Array.isArray(exp.responsibility)
                                  ? exp.responsibility
                                  : String(exp.responsibility).split("\n")
                                )
                                  .map((t) => t.trim())
                                  .filter(Boolean)
                                  .map((t, k) => (
                                    <li key={k}>{t}</li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>

              <div className="mb-10">
                <h4 className="mb-4 border-b-2 border-[#224559] pb-[0.3rem] text-[1.15rem] font-semibold uppercase text-[#224559]">
                  <FiBookOpen className="mr-2" /> Education
                </h4>
                <div className="relative ml-4">
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-[#224559]" />
                  {cvData.educations?.length
                    ? cvData.educations.map((edu, i) => (
                        <div key={i} className="relative mb-8 pl-8">
                          <div className="absolute left-[-7px] top-[6px] h-[14px] w-[14px] rounded-full border-2 border-white bg-[#224559]" />
                          <div className="mb-[0.2rem] text-[0.85rem] font-medium text-[#224559]">
                            {edu?.dates}
                          </div>
                          <div className="text-[1rem] font-semibold text-[#224559]">
                            {edu?.level || edu?.degree}
                          </div>
                          <div className="mb-[0.4rem] text-[0.9rem] italic text-[#666]">
                            {edu?.college || edu?.institution}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>

              {cvData.referees?.length > 0 && (
                <div className="mb-10">
                  <h4 className="mb-4 border-b-2 border-[#224559] pb-[0.3rem] text-[1.15rem] font-semibold uppercase text-[#224559]">
                    Referees
                  </h4>
                  {cvData.referees.map((r, i) => (
                    <div key={i} className="relative mb-8 pl-8">
                      <div className="absolute left-[-7px] top-[6px] h-[14px] w-[14px] rounded-full border-2 border-white bg-[#224559]" />
                      <div>
                        <strong>{r?.fullName}</strong>
                      </div>
                      <div className="text-sm text-gray-500">{r?.position}</div>
                      <div>{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
