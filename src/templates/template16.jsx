import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const sanitizeExperienceText = (value) => {
  if (value == null) return value;
  return String(value)
    .split(/\s+/)
    .filter((part) => !["@", "?", "$"].includes(part))
    .join(" ")
    .trim();
};

export default function Template16() {
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
    <div className="m-auto text-start">
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="shadow-lg border-0 overflow-hidden min-h-[calc(297mm-10mm)]">
        <div className="flex">
          <div className="md:w-1/3 text-center text-white p-4 bg-[#007d84]">
            <div className="w-[180px] h-[220px] rounded-[16px] overflow-hidden border-[4px] border-white mx-auto shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              <img
                src={
                  cvData.profile?.picture
                    ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                    : "https://placehold.co/200x250?text=Photo"
                }
                alt="profile"
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x250?text=Photo")
                }
              />
            </div>
          </div>
          <div className="md:w-2/3 p-4 flex flex-col justify-center bg-[#f8f9fa]">
            <h1 className="font-bold mb-2 text-[#007d84]">{cvData.fullName}</h1>
            <h4 className="font-light">{cvData.current_position}</h4>
            <p className="mt-3">{cvData.summary}</p>
          </div>
        </div>

        <div className="flex">
          <div className="w-[8.333%] bg-[#007d84] shrink-0" />

          <div className="flex-1 p-4">
            <div className="grid grid-cols-12 gap-4">
              {/* LEFT */}
              <div className="col-span-4">
                <Section title="Contact" className="contact-section">
                  <p className="text-sm mb-2 break-words">
                    <FiPhone className="mr-2 inline" /> {cvData.phone}
                  </p>
                  <p className="text-sm mb-2 break-words">
                    <FiMail className="mr-2 inline" /> {cvData.email}
                  </p>
                  <p className="text-sm mb-0 break-words">
                    <FiMapPin className="mr-2 inline" /> {cvData.location}
                  </p>
                </Section>

                {cvData.languages?.length > 0 && (
                  <Section title="Languages">
                    <div className="flex flex-wrap gap-2">
                      {cvData.languages.map((txt, i) => (
                        <Chip key={i} label={txt?.name} bg="#007d84" />
                      ))}
                    </div>
                  </Section>
                )}

                <Section title="Skills">
                  <div className="flex flex-wrap gap-2">
                    {cvData.knowledges?.map((txt, i) => (
                      <Chip key={`k-${i}`} label={txt?.name} bg="#6c757d" />
                    ))}
                    {cvData.softwares?.map((txt, i) => (
                      <Chip key={`s-${i}`} label={txt?.name} bg="#212529" />
                    ))}
                  </div>
                </Section>

                {(cvData.cultures?.length > 0 ||
                  cvData.personalities?.length > 0) && (
                  <Section title="Culture & Personality">
                    <div className="flex flex-wrap gap-2">
                      {cvData.cultures.map((txt, i) => (
                        <Chip
                          key={`c-${i}`}
                          label={txt?.name}
                          bg="#0dcaf0"
                          text="#000"
                        />
                      ))}
                      {cvData.personalities.map((txt, i) => (
                        <Chip
                          key={`p-${i}`}
                          label={txt?.name}
                          bg="#ffc107"
                          text="#000"
                        />
                      ))}
                    </div>
                  </Section>
                )}
              </div>

              {/* RIGHT */}
              <div className="col-span-8">
                <Section title="Experience">
                  {cvData.experiences?.length ? (
                    <Timeline items={cvData.experiences} isExperience />
                  ) : null}
                </Section>

                <Section title="Education">
                  {cvData.educations?.length ? (
                    <Timeline items={cvData.educations} isExperience={false} />
                  ) : null}
                </Section>

                {cvData.referees?.length > 0 && (
                  <Section title="Referees">
                    <div className="flex flex-col gap-4">
                      {cvData.referees.map((r, i) => (
                        <div key={r.id ?? i} className="shadow-sm p-3">
                          <strong>{r?.fullName}</strong>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <h5 className="font-bold mb-2 text-[#007d84]">{title}</h5>
      {children}
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div>
      {items.map((item, i) => {
        const title = isExperience
          ? sanitizeExperienceText(item?.position)
          : item?.level || item?.degree;
        const org = isExperience
          ? sanitizeExperienceText(item?.organization) || ""
          : item?.college || item?.institution || "";
        const dates = isExperience
          ? sanitizeExperienceText(item?.dates)
          : item?.dates;

        return (
          <div key={i} className="mb-3 shadow-sm p-4">
            <div className="font-semibold text-[#007d84]">{title}</div>
            <div className="text-gray-500 text-sm mb-1">{org}</div>
            <div className="text-gray-500 text-sm">{dates}</div>
            {item?.responsibility && (
              <ul className="text-sm mt-2 mb-0 pl-4">
                {(Array.isArray(item.responsibility)
                  ? item.responsibility
                  : String(item.responsibility).split("\n")
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
      })}
    </div>
  );
}

function Chip({ label, bg, text = "#fff" }) {
  if (!label) return null;

  const bgClass =
    bg === "#007d84"
      ? "bg-[#007d84]"
      : bg === "#6c757d"
        ? "bg-[#6c757d]"
        : bg === "#212529"
          ? "bg-[#212529]"
          : bg === "#0dcaf0"
            ? "bg-[#0dcaf0]"
            : bg === "#ffc107"
              ? "bg-[#ffc107]"
              : "bg-[#007d84]";

  const textClass = text === "#000" ? "text-black" : "text-white";

  return (
    <span
      className={`inline-block capitalize text-[0.85rem] py-[0.35em] px-[0.8em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-full ${bgClass} ${textClass}`}
    >
      {label}
    </span>
  );
}
