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

export default function Template26() {
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

      <div className="w-full min-h-[calc(297mm-10mm)] rounded-[0.3rem] bg-white overflow-hidden leading-[1.65]">
        <div className="flex items-center gap-8 border-b-4 border-[#cf470c] bg-[linear-gradient(90deg,rgba(207,71,12,0.08),#fdfdfd)] px-8 py-10">
          <img
            src={
              cvData.profile?.picture
                ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                : "https://placehold.co/140x140?text=Photo"
            }
            alt="profile"
            className="h-[140px] w-[140px] rounded-[12px] border-[3px] border-[#cf470c] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/140x140?text=Photo")
            }
          />
          <div>
            <div className="mb-[0.3rem] text-[2.5rem] font-bold">
              {cvData.fullName}
            </div>
            <div className="text-[1.2rem] font-medium text-[#cf470c]">
              {cvData.current_position}
            </div>
            <p className="mt-3 max-w-[600px] text-[1rem] text-[#444]">
              {cvData.summary}
            </p>
          </div>
        </div>

        <div className="px-4 py-5">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-8">
              <Section
                title={
                  <>
                    <FiBriefcase className="mr-2" /> Experience
                  </>
                }
              >
                <div className="relative border-l-2 border-[rgba(207,71,12,0.2)] pl-4">
                  {cvData.experiences?.length
                    ? cvData.experiences.map((exp, i) => {
                        return (
                          <div key={i} className="relative mb-7">
                            <span className="absolute left-[-1.1rem] top-[5px] h-[12px] w-[12px] rounded-full bg-[#cf470c]" />
                            <div className="mb-[0.3rem] text-[0.85rem] font-medium text-[#cf470c]">
                              {exp?.dates}
                            </div>
                            <div className="text-[1rem] font-semibold">
                              {exp?.position}
                            </div>
                            <div className="text-[0.9rem] italic text-[#666]">
                              {exp?.organization}
                            </div>
                            {exp?.responsibility && (
                              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
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
              </Section>

              <div className="my-8 border-t border-[#eee]"></div>

              <Section
                title={
                  <>
                    <FiBookOpen className="mr-2" /> Education
                  </>
                }
              >
                <div className="relative border-l-2 border-[rgba(207,71,12,0.2)] pl-4">
                  {cvData.educations?.length
                    ? cvData.educations.map((edu, i) => (
                        <div key={i} className="relative mb-7">
                          <span className="absolute left-[-1.1rem] top-[5px] h-[12px] w-[12px] rounded-full bg-[#cf470c]" />
                          <div className="mb-[0.3rem] text-[0.85rem] font-medium text-[#cf470c]">
                            {edu?.dates}
                          </div>
                          <div className="text-[1rem] font-semibold">
                            {edu?.level || edu?.degree}
                          </div>
                          <div className="text-[0.9rem] italic text-[#666]">
                            {edu?.college || edu?.institution}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </Section>

              {cvData.referees?.length > 0 && (
                <>
                  <div className="my-8 border-t border-[#eee]"></div>
                  <Section title="Referees">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="mb-4 border-l-[3px] border-[#cf470c] pl-3"
                      >
                        <strong>{r?.fullName}</strong>
                        <div className="text-sm text-gray-500">
                          {r?.position}
                        </div>
                        <div>{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm">{r?.email}</div>
                      </div>
                    ))}
                  </Section>
                </>
              )}
            </div>

            {/* RIGHT */}
            <div className="col-span-4">
              <Section title="Contact">
                <div className="text-[0.92rem] leading-[1.35]">
                  <p className="mb-2.5 flex items-start gap-2 break-words">
                    <FiPhone className="mt-1" />
                    <span>{cvData.phone}</span>
                  </p>
                  <p className="mb-2.5 flex items-start gap-2 break-words">
                    <FiMail className="mt-1" />
                    <span>{cvData.email}</span>
                  </p>
                  <p className="mb-2.5 flex items-start gap-2 break-words">
                    <FiMapPin className="mt-1" />
                    <span>{cvData.location}</span>
                  </p>
                  {payload?.user?.[0]?.website && (
                    <p className="mb-2.5 flex items-start gap-2 break-words">
                      <FiGlobe className="mt-1" />
                      <span>{payload?.user?.[0]?.website}</span>
                    </p>
                  )}
                </div>
              </Section>

              <div className="my-8 border-t border-[#eee]"></div>

              <Section title="Skills">
                <div className="flex flex-wrap justify-start">
                  {cvData.knowledges?.map((k, i) => (
                    <span
                      key={i}
                      className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#cf470c] px-[0.8rem] py-[0.35rem] text-left text-[0.85rem] font-medium leading-[1.2] text-white"
                    >
                      {k?.name}
                    </span>
                  ))}
                  {cvData.softwares?.map((s, i) => (
                    <span
                      key={i}
                      className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#cf470c] px-[0.8rem] py-[0.35rem] text-left text-[0.85rem] font-medium leading-[1.2] text-white"
                    >
                      {s?.name}
                    </span>
                  ))}
                </div>
              </Section>

              {cvData.languages?.length > 0 && (
                <>
                  <div className="my-8 border-t border-[#eee]"></div>
                  <Section title="Languages">
                    <div className="flex flex-wrap justify-start">
                      {cvData.languages.map((l, i) => (
                        <span
                          key={i}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#cf470c] px-[0.8rem] py-[0.35rem] text-left text-[0.85rem] font-medium leading-[1.2] text-white"
                        >
                          {l?.name}
                        </span>
                      ))}
                    </div>
                  </Section>
                </>
              )}

              {(cvData.cultures?.length > 0 ||
                cvData.personalities?.length > 0) && (
                <>
                  <div className="my-8 border-t border-[#eee]"></div>
                  <Section title="Culture & Personality">
                    <div className="flex flex-wrap justify-start">
                      {cvData.cultures?.map((c, i) => (
                        <span
                          key={`c-${i}`}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#cf470c] px-[0.8rem] py-[0.35rem] text-left text-[0.85rem] font-medium leading-[1.2] text-white"
                        >
                          {c?.name}
                        </span>
                      ))}
                      {cvData.personalities?.map((p, i) => (
                        <span
                          key={`p-${i}`}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#cf470c] px-[0.8rem] py-[0.35rem] text-left text-[0.85rem] font-medium leading-[1.2] text-white"
                        >
                          {p?.name}
                        </span>
                      ))}
                    </div>
                  </Section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h5 className="mb-4 border-l-[5px] border-[#cf470c] pl-[0.6rem] text-[1.25rem] font-semibold text-[#cf470c]">
        {title}
      </h5>
      {children}
    </div>
  );
}
