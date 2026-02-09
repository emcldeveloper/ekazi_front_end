import { FiPhone, FiMail, FiMapPin, FiCpu, FiStar } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template17() {
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
    <div className="text-start m-auto bg-white  box-border font-['Josefin_Sans',_sans-serif]">
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="border-0 shadow-lg min-h-[calc(297mm-10mm)]">
        <div className="p-5 text-white text-center bg-[#223a83]">
          <div className="w-[160px] h-[160px] rounded-full overflow-hidden border-[5px] border-white mx-auto mb-5 shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
            <img
              src={
                cvData.profile?.picture
                  ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                  : "https://placehold.co/200x200?text=Photo"
              }
              alt="profile"
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/200x200?text=Photo")
              }
            />
          </div>
          <h1 className="font-bold mb-1">{cvData.fullName}</h1>
          <h4 className="font-light">{cvData.current_position}</h4>
          <p className="mt-3 w-3/4 mx-auto">{cvData.summary}</p>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* LEFT */}
          <div className="col-span-4 bg-[#f8f9fa] p-4">
            <SidebarSection title="Contact">
              <p>
                <FiPhone className="mr-2 inline" /> {cvData.phone}
              </p>
              <p className="break-words">
                <FiMail className="mr-2 inline" /> {cvData.email}
              </p>
              <p>
                <FiMapPin className="mr-2 inline" /> {cvData.location}
              </p>
            </SidebarSection>

            {cvData.languages
              .map((l) =>
                (l?.name || l || "")
                  .toString()
                  .replace(/^,+/, "")
                  .trim()
                  .toLowerCase()
                  .replace(/\b\w/g, (ch) => ch.toUpperCase()),
              )
              .filter(Boolean).length > 0 && (
              <SidebarSection title="Languages">
                <div className="flex flex-wrap gap-2">
                  {cvData.languages
                    .map((l) =>
                      (l?.name || l || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#223a83" />
                    ))}
                </div>
              </SidebarSection>
            )}

            <SidebarSection title="Skills">
              {cvData.knowledges
                .map((k) =>
                  (k?.name || k || "")
                    .toString()
                    .replace(/^,+/, "")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                )
                .filter(Boolean).length > 0 && (
                <SkillGroup
                  title="Knowledge"
                  icon={<FiStar />}
                  items={cvData.knowledges
                    .map((k) =>
                      (k?.name || k || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)}
                />
              )}
              {cvData.softwares
                .map((s) =>
                  (s?.name || s || "")
                    .toString()
                    .replace(/^,+/, "")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                )
                .filter(Boolean).length > 0 && (
                <SkillGroup
                  title="Software"
                  icon={<FiCpu />}
                  items={cvData.softwares
                    .map((s) =>
                      (s?.name || s || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)}
                />
              )}
            </SidebarSection>

            {(cvData.cultures
              .map((c) =>
                (c?.name || c || "")
                  .toString()
                  .replace(/^,+/, "")
                  .trim()
                  .toLowerCase()
                  .replace(/\b\w/g, (ch) => ch.toUpperCase()),
              )
              .filter(Boolean).length > 0 ||
              cvData.personalities
                .map((p) =>
                  (p?.name || p || "")
                    .toString()
                    .replace(/^,+/, "")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                )
                .filter(Boolean).length > 0) && (
              <SidebarSection title="Culture & Personality">
                <div className="flex flex-wrap gap-2">
                  {cvData.cultures
                    .map((c) =>
                      (c?.name || c || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#0dcaf0" text="#000" />
                    ))}
                  {cvData.personalities
                    .map((p) =>
                      (p?.name || p || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#ffc107" text="#000" />
                    ))}
                </div>
              </SidebarSection>
            )}
          </div>

          {/* RIGHT */}
          <div className="col-span-8 p-4">
            <MainSection title="Experience">
              {cvData.experiences?.length
                ? cvData.experiences.map((exp, i) => {
                    const position =
                      exp?.position == null
                        ? exp?.position
                        : String(exp.position)
                            .split(/\s+/)
                            .filter((part) => !["@", "?", "$"].includes(part))
                            .join(" ")
                            .trim();
                    const organization =
                      (exp?.organization == null
                        ? exp?.organization
                        : String(exp.organization)
                            .split(/\s+/)
                            .filter((part) => !["@", "?", "$"].includes(part))
                            .join(" ")
                            .trim()) || "";
                    const dates =
                      exp?.dates == null
                        ? exp?.dates
                        : String(exp.dates)
                            .split(/\s+/)
                            .filter((part) => !["@", "?", "$"].includes(part))
                            .join(" ")
                            .trim();

                    return (
                      <div
                        key={i}
                        className="mb-3 shadow-sm p-4 border-l-[4px] border-[#223a83]"
                      >
                        <div className="font-semibold text-[#223a83]">
                          {position}
                        </div>
                        <div className="text-gray-500 text-sm mb-1">
                          {organization}
                        </div>
                        <div className="text-gray-500 text-sm mb-2">
                          {dates}
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
                                <li key={k}>{t.replace(/^•\s*/, "")}</li>
                              ))}
                          </ul>
                        )}
                      </div>
                    );
                  })
                : null}
            </MainSection>

            <MainSection title="Education">
              {cvData.educations?.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead className="bg-[#223a83] text-white">
                      <tr>
                        <th className="px-3 py-2">Level</th>
                        <th className="px-3 py-2">Institution</th>
                        <th className="px-3 py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cvData.educations.map((edu, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2">
                            {edu?.level || edu?.degree}
                          </td>
                          <td className="px-3 py-2">
                            {edu?.college || edu?.institution}
                          </td>
                          <td className="px-3 py-2">{edu?.dates}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </MainSection>

            {cvData.referees?.length > 0 && (
              <MainSection title="Referees">
                <div className="flex flex-col gap-4">
                  {cvData.referees.map((r, i) => (
                    <div key={i} className="shadow-sm p-4">
                      <strong>{r?.fullName}</strong>
                      <div className="text-gray-500 text-sm">{r?.position}</div>
                      <div>{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  ))}
                </div>
              </MainSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div className="mb-4">
      <h6 className="font-bold mb-2 text-[#223a83]">{title}</h6>
      {children}
    </div>
  );
}

function MainSection({ title, children }) {
  return (
    <div className="mb-5">
      <h4 className="font-bold mb-3 text-[#223a83] border-b-2 border-[#223a83] inline-block pb-1">
        {title}
      </h4>
      {children}
    </div>
  );
}

function SkillGroup({ title, icon, items }) {
  return (
    <div className="mb-3">
      <div className="font-semibold flex items-center mb-2 text-[#223a83]">
        {icon} <span className="ml-2">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            bg={i % 2 === 0 ? "#223a83" : "#6c757d"}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, bg, text = "#fff" }) {
  if (!label) return null;

  const bgClass =
    bg === "#223a83"
      ? "bg-[#223a83]"
      : bg === "#6c757d"
        ? "bg-[#6c757d]"
        : bg === "#0dcaf0"
          ? "bg-[#0dcaf0]"
          : bg === "#ffc107"
            ? "bg-[#ffc107]"
            : "bg-[#223a83]";

  const textClass = text === "#000" ? "text-black" : "text-white";

  return (
    <span
      className={`inline-block text-[0.8rem] py-[0.35em] px-[0.7em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-full ${bgClass} ${textClass}`}
    >
      {label}
    </span>
  );
}
