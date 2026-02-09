import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template20() {
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
          {error?.message}
        </div>
      </div>
    );

  return (
    <div className=" m-auto text-start">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full overflow-hidden rounded-[12px] min-h-[calc(297mm-10mm)] bg-white">
        <div className="text-center bg-[#ff511a] text-white py-12 px-8 rounded-t-[12px]">
          <div className="w-[130px] h-[140px] rounded-[12px] overflow-hidden border-[4px] border-white mx-auto mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
            <img
              src={
                cvData.profile?.picture
                  ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                  : "https://placehold.co/130x140?text=Photo"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[1.9rem] font-bold">{cvData.fullName}</div>
          <div className="text-[1rem] opacity-90">
            {cvData.current_position}
          </div>
          <p className="mt-3 mb-0 opacity-95">{cvData.summary}</p>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4 px-2 md:px-4">
          {/* LEFT */}
          <div className="col-span-4">
            <CardBlock>
              <Section title="Contact">
                <div className="flex flex-col gap-4">
                  <ContactItem icon={<FiPhone />} value={cvData.phone} />
                  <ContactItem icon={<FiMail />} value={cvData.email} />
                  <ContactItem icon={<FiMapPin />} value={cvData.location} />
                  {payload?.user?.[0]?.website && (
                    <ContactItem
                      icon={<FiGlobe />}
                      value={payload?.user?.[0]?.website}
                    />
                  )}
                </div>
              </Section>
            </CardBlock>

            <CardBlock>
              <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges?.map((k, i) => (
                    <Chip
                      key={i}
                      label={typeof k === "string" ? k : k?.name}
                      bg="#ff511a"
                    />
                  ))}
                  {cvData.softwares?.map((s, i) => (
                    <Chip
                      key={i}
                      label={typeof s === "string" ? s : s?.name}
                      bg="#333"
                    />
                  ))}
                </div>
              </Section>
            </CardBlock>

            {cvData.languages?.length > 0 && (
              <CardBlock>
                <Section title="Languages">
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((l, i) => (
                      <Chip
                        key={i}
                        label={typeof l === "string" ? l : l?.name}
                        bg="#ff511a"
                      />
                    ))}
                  </div>
                </Section>
              </CardBlock>
            )}

            {(cvData.cultures?.length > 0 ||
              cvData.personalities?.length > 0) && (
              <CardBlock>
                <Section title="Culture & Personality">
                  <div className="flex flex-wrap gap-2">
                    {cvData.cultures?.map((c, i) => (
                      <Chip
                        key={i}
                        label={typeof c === "string" ? c : c?.name}
                        bg="#0dcaf0"
                        text="#000"
                      />
                    ))}
                    {cvData.personalities?.map((p, i) => (
                      <Chip
                        key={i}
                        label={typeof p === "string" ? p : p?.name}
                        bg="#ffc107"
                        text="#000"
                      />
                    ))}
                  </div>
                </Section>
              </CardBlock>
            )}
          </div>

          {/* RIGHT */}
          <div className="col-span-8">
            <CardBlock>
              <Section title="Experience">
                {cvData.experiences?.length
                  ? cvData.experiences.map((exp, i) => {
                      return (
                        <div
                          key={i}
                          className="border-l-4 border-[#ff511a] pl-4 mb-4"
                        >
                          <div className="font-semibold text-[#ff511a]">
                            {exp?.position}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {exp?.organization || ""}
                          </div>
                          <div className="text-gray-500 text-sm mb-2">
                            {exp?.dates}
                          </div>
                          {exp?.responsibility && (
                            <ul className="text-sm mb-0 pl-4">
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
              </Section>
            </CardBlock>

            <CardBlock>
              <Section title="Education">
                {cvData.educations?.length
                  ? cvData.educations.map((edu, i) => (
                      <div
                        key={i}
                        className="border-l-4 border-[#ff511a] pl-4 mb-4"
                      >
                        <div className="font-semibold text-[#ff511a]">
                          {edu?.level || edu?.degree}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {edu?.college || edu?.institution || ""}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {edu?.dates}
                        </div>
                      </div>
                    ))
                  : null}
              </Section>
            </CardBlock>

            {cvData.referees?.length > 0 && (
              <CardBlock>
                <Section title="Referees">
                  <div className="flex flex-col gap-4">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={r.id ?? i}
                        className="shadow-sm p-4 rounded-[12px]"
                      >
                        <strong className="text-[#ff511a]">
                          {r?.fullName}
                        </strong>
                        <div className="text-gray-500 text-sm">
                          {r?.position}
                        </div>
                        <div>{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm">{r?.email}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              </CardBlock>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-3">
      <h5 className="mb-3 text-[#ff511a] font-bold text-[1rem] uppercase border-b-2 border-[#ff511a] pb-1">
        {title}
      </h5>
      {children}
    </div>
  );
}

function Chip({ label, bg, text = "#fff" }) {
  if (!label) return null;

  const bgClass =
    bg === "#ff511a"
      ? "bg-[#ff511a]"
      : bg === "#333"
        ? "bg-[#333]"
        : bg === "#0dcaf0"
          ? "bg-[#0dcaf0]"
          : bg === "#ffc107"
            ? "bg-[#ffc107]"
            : "bg-[#ff511a]";

  const textClass = text === "#000" ? "text-black" : "text-white";

  return (
    <span
      className={`inline-block text-[0.8rem] py-[0.4rem] px-[0.7rem] rounded-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left max-w-full leading-[1.2] ${bgClass} ${textClass}`}
    >
      {label}
    </span>
  );
}

function ContactItem({ icon, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="inline-flex items-center justify-center rounded-lg w-[26px] h-[26px] border border-[rgba(255,81,26,0.25)] bg-[rgba(255,81,26,0.08)] text-[#ff511a]">
        {icon}
      </span>
      <div className="text-[0.9rem] leading-tight break-words">{value}</div>
    </div>
  );
}

function CardBlock({ children }) {
  return (
    <div className="shadow-sm rounded-2xl p-4 mb-4 bg-white">{children}</div>
  );
}
