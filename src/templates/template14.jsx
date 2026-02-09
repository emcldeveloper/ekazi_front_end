import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiStar,
  FiCpu,
  FiGlobe,
  FiUser,
} from "react-icons/fi";
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

export default function Template14() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
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
    <div className="m-auto text-start">
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className=" rounded-[12px]">
        <div className="flex items-center justify-between p-4 md:p-5 bg-[#ff6601] text-white rounded-t-[12px]">
          <div className="text-start pr-4 flex-1">
            <h1 className="font-bold mb-1">{cvData.fullName}</h1>
            <h4 className="font-normal mb-3">{cvData.current_position}</h4>
            <p className="mb-0">{cvData.summary}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="overflow-hidden w-[180px] h-[180px] [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)] border-[5px] border-white shadow-[0_6px_20px_rgba(0,0,0,0.25)]">
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
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 py-3 bg-white text-[0.95rem] border-t border-[#eee] border-b-2 border-b-[#ff6601]">
          <span className="inline-flex items-center gap-2">
            <FiPhone /> {cvData.phone}
          </span>
          <span className="inline-flex items-center gap-2">
            <FiMail /> {cvData.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <FiMapPin /> {cvData.location}
          </span>
        </div>

        <div className="p-4 md:p-5 bg-white">
          <SectionCard title="Skills & Traits">
            <div className="grid grid-cols-2 gap-4">
              <SkillCard title="Knowledge" icon={<FiStar />}>
                {cvData.knowledges?.map((txt, i) => (
                  <Chip key={`k-${i}`} label={txt?.name} />
                ))}
              </SkillCard>

              <SkillCard title="Software" icon={<FiCpu />}>
                {cvData.softwares?.map((txt, i) => (
                  <Chip key={`s-${i}`} label={txt?.name} />
                ))}
              </SkillCard>

              <SkillCard title="Culture" icon={<FiGlobe />}>
                {cvData.cultures?.map((txt, i) => (
                  <Chip key={`c-${i}`} label={txt?.name} />
                ))}
              </SkillCard>

              <SkillCard title="Personality" icon={<FiUser />}>
                {cvData.personalities?.map((txt, i) => (
                  <Chip key={`p-${i}`} label={txt?.name} />
                ))}
              </SkillCard>

              <SkillCard title="Languages" icon={<FiGlobe />}>
                {cvData.languages?.map((txt, i) => (
                  <Chip key={`l-${i}`} label={txt?.name} />
                ))}
              </SkillCard>

              <SkillCard title="Tools" icon={<FiCpu />}>
                {cvData.tools?.map((txt, i) => (
                  <Chip key={`t-${i}`} label={txt?.name} />
                ))}
              </SkillCard>
            </div>
          </SectionCard>

          <div className="mt-4 grid grid-cols-2 gap-6">
            {/* LEFT */}
            <SectionCard title="Experience">
              {cvData.experiences?.length
                ? cvData.experiences.map((exp, i) => {
                    const position = sanitizeExperienceText(exp?.position);
                    const organization = sanitizeExperienceText(
                      exp?.organization,
                    );
                    const dates = sanitizeExperienceText(exp?.dates);

                    return (
                      <div key={i} className="mb-3">
                        <div className="font-semibold text-[#ff6601]">
                          {position}
                          {organization && (
                            <span className="text-gray-500">
                              {" "}
                              {organization}
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-sm mb-2">
                          {dates}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mb-0 text-sm text-gray-500">
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
            </SectionCard>

            {/* RIGHT */}
            <SectionCard title="Education">
              {cvData.educations?.length
                ? cvData.educations.map((edu, i) => (
                    <div key={i} className="mb-3">
                      <div className="font-semibold text-[#ff6601]">
                        {edu?.level}
                      </div>
                      <div>{edu?.college}</div>
                      <div className="text-gray-500 text-sm">{edu?.dates}</div>
                    </div>
                  ))
                : null}
            </SectionCard>
          </div>

          {cvData.referees?.length > 0 && (
            <SectionCard title="Referees">
              <div className="grid grid-cols-2 gap-4">
                {cvData.referees.map((r, i) => (
                  <div
                    key={r.id ?? i}
                    className="shadow-sm p-3 border-l-[4px] border-[#ff6601] rounded-[8px]"
                  >
                    <strong className="text-[#ff6601]">{r?.fullName}</strong>
                    <div className="text-gray-500 text-sm">{r?.position}</div>
                    <div>{r?.company}</div>
                    <div className="text-sm">{r?.phone}</div>
                    <div className="text-sm">{r?.email}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-[#ff6601] font-bold border-b-2 border-[#ff6601] pb-[0.3rem]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SkillCard({ title, icon, children }) {
  return (
    <div className="shadow-sm p-4 rounded-[8px]">
      <h6 className="flex items-center mb-3 font-bold text-[#ff6601]">
        {icon}
        <span className="ml-2 underline decoration-[#ffb36b] decoration-[2px] underline-offset-[4px]">
          {title}
        </span>
      </h6>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ label }) {
  if (!label) return null;
  return (
    <span className="inline-block capitalize bg-[#ff6601] text-white text-[0.85rem] py-[0.35em] px-[0.8em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-full">
      {label}
    </span>
  );
}
