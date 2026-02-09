import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template12() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="ml-3 text-gray-700">Loading CV...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-[900px] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error?.message || String(error)}
        </div>
      </div>
    );

  return (
    <div className="m-auto">
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="border-0 overflow-hidden rounded-[12px] shadow-[0_3px_10px_rgba(50,72,158,0.12)]">
        <div
          className="text-white py-5 px-4"
          style={{ backgroundColor: "#32489e" }}
        >
          <div className="flex  items-center gap-4">
            <div className="">
              <img
                src={
                  cvData.profile?.picture
                    ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                className="rounded-full shadow w-[160px] h-[160px] object-cover border-[4px] border-white"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
              />
            </div>
            <div className="text-start flex-1">
              <h1 className="font-bold mb-1 tracking-[0.5px]">
                {cvData.fullName}
              </h1>
              <h4 className="font-light">{cvData.current_position}</h4>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-12 gap-4 text-start">
            {/* LEFT */}
            <div className="col-span-4">
              <CardBlock>
                <h5 className="font-bold mb-3 text-[#32489e]">Contact</h5>
                <p className="mb-2 text-[1rem]">
                  <FiPhone className="mr-2 inline" />
                  {cvData.phone}
                </p>
                <p className="mb-2 text-[1rem]">
                  <FiMail className="mr-2 inline" />
                  {cvData.email}
                </p>
                <p className="mb-0 text-[1rem]">
                  <FiMapPin className="mr-2 inline" />
                  {cvData.location}
                </p>
              </CardBlock>

              <CardBlock>
                <h5 className="font-bold mb-3 text-[#32489e]">Languages</h5>
                {cvData.languages?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((txt, i) => (
                      <Chip key={i} label={txt?.name} />
                    ))}
                  </div>
                ) : null}
              </CardBlock>

              <CardBlock>
                <h5 className="font-bold mb-3 text-[#32489e]">
                  Skills & Tools
                </h5>
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges?.map((txt, i) => (
                    <Chip key={`k-${i}`} label={txt?.name} />
                  ))}
                  {cvData.softwares?.map((txt, i) => (
                    <Chip key={`s-${i}`} label={txt?.name} />
                  ))}
                </div>
              </CardBlock>

              <CardBlock>
                <h5 className="font-bold mb-3 text-[#32489e]">
                  Culture & Personality
                </h5>
                <div className="flex flex-wrap gap-2">
                  {cvData.cultures?.map((txt, i) => (
                    <Chip key={`c-${i}`} label={txt?.name} />
                  ))}
                  {cvData.personalities?.map((txt, i) => (
                    <Chip key={`p-${i}`} label={txt?.name} />
                  ))}
                </div>
              </CardBlock>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <SectionCard title="About Me">
                <p className="[text-align:justify]">{cvData.summary}</p>
              </SectionCard>

              <SectionCard title="Experience">
                {cvData.experiences?.length
                  ? cvData.experiences.map((exp, i) => (
                      <div
                        key={i}
                        className="mb-3 shadow-sm border-l-[5px] border-[#32489e]"
                      >
                        <div className="p-3">
                          <div className="font-semibold text-[#32489e]">
                            {exp?.position}
                            {exp?.organization && (
                              <span className="text-gray-500">
                                {" "}
                                {exp.organization}
                              </span>
                            )}
                          </div>
                          <div className="text-gray-500 text-sm mb-2">
                            {exp?.dates}
                          </div>
                          {exp?.responsibility && (
                            <ul className="mb-0 text-sm">
                              {(Array.isArray(exp.responsibility)
                                ? exp.responsibility
                                : String(exp.responsibility).split("\n")
                              )
                                .map((t) => t.trim())
                                .filter(Boolean)
                                .map((t, k) => (
                                  <li key={k}>{t.replace(/^•\s*/, "")}</li>
                                ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))
                  : null}
              </SectionCard>

              <SectionCard title="Education">
                {cvData.educations?.length
                  ? cvData.educations.map((edu, i) => (
                      <div
                        key={i}
                        className="mb-3 shadow-sm border-l-[5px] border-[#32489e]"
                      >
                        <div className="p-3">
                          <div className="font-semibold text-[#32489e]">
                            {edu?.level}
                          </div>
                          <div>{edu?.college}</div>
                          <div className="text-gray-500 text-sm">
                            {edu?.dates}
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </SectionCard>

              {cvData.referees?.length > 0 && (
                <SectionCard title="Referees">
                  {cvData.referees.map((r, i) => (
                    <div
                      key={r.id ?? i}
                      className="mb-3 shadow-sm border-l-[5px] border-[#32489e]"
                    >
                      <div className="p-3">
                        <div className="font-semibold text-[#32489e]">
                          {r?.fullName}
                        </div>
                        <div className="text-gray-500">{r?.position}</div>
                        <div>{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm">{r?.email}</div>
                      </div>
                    </div>
                  ))}
                </SectionCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBlock({ children }) {
  return (
    <div className="shadow-sm border-0 mb-4">
      <div className="p-4">{children}</div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="inline-block mb-4 font-bold text-[#32489e] border-b-2 border-[#32489e] tracking-[0.5px]">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Chip({ label }) {
  if (!label) return null;
  return (
    <span className="inline-block bg-[#32489e] text-white text-[0.8rem] py-[0.3em] px-[0.6em] text-left max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] leading-[1.1] rounded-full">
      {label}
    </span>
  );
}
