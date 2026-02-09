import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCpu,
  FiStar,
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

export default function Template13() {
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
    <div className="m-auto text-start">
      <link
        href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="border-0 overflow-hidden rounded-[12px]  bg-white">
        <div className="flex items-center gap-4 bg-[#242a64] text-white py-10 px-8 rounded-t-[12px]">
          <img
            src={
              cvData.profile?.picture
                ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                : "https://placehold.co/200x200?text=Photo"
            }
            alt="profile"
            className="shadow-lg rounded-full w-[150px] h-[150px] object-cover border-[4px] border-white"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/200x200?text=Photo")
            }
          />
          <div className="text-start">
            <h1 className="mb-1 font-bold text-[2.2rem]">{cvData.fullName}</h1>
            <h4 className="mb-3 font-normal opacity-90">
              {cvData.current_position}
            </h4>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-2 bg-white/90 text-[#242a64] font-semibold rounded-full py-[0.35em] px-[0.8em]">
                <FiPhone /> {cvData.phone}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/90 text-[#242a64] font-semibold rounded-full py-[0.35em] px-[0.8em]">
                <FiMail /> {cvData.email}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/90 text-[#242a64] font-semibold rounded-full py-[0.35em] px-[0.8em]">
                <FiMapPin /> {cvData.location}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <SectionCard title="About Me">
            <p className="[text-align:justify]">{cvData.summary}</p>
          </SectionCard>

          <div className="grid grid-cols-12 gap-5">
            {/* LEFT */}
            <div className="col-span-4">
              <SectionCard title="Skills & Traits">
                <div className="flex flex-col gap-3">
                  <SkillBlock icon={<FiStar />} title="Knowledge">
                    {cvData.knowledges?.map((txt, i) => (
                      <Chip key={`k-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>

                  <SkillBlock icon={<FiCpu />} title="Software">
                    {cvData.softwares?.map((txt, i) => (
                      <Chip key={`s-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>

                  <SkillBlock icon={<FiGlobe />} title="Culture">
                    {cvData.cultures?.map((txt, i) => (
                      <Chip key={`c-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>

                  <SkillBlock icon={<FiUser />} title="Personality">
                    {cvData.personalities?.map((txt, i) => (
                      <Chip key={`p-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>

                  <SkillBlock icon={<FiGlobe />} title="Languages">
                    {cvData.languages?.map((txt, i) => (
                      <Chip key={`l-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>

                  <SkillBlock icon={<FiCpu />} title="Tools">
                    {cvData.tools?.map((txt, i) => (
                      <Chip key={`t-${i}`} label={txt?.name} />
                    ))}
                  </SkillBlock>
                </div>
              </SectionCard>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <SectionCard title="Experience">
                {cvData.experiences?.length
                  ? cvData.experiences.map((exp, i) => {
                      const position = sanitizeExperienceText(exp?.position);
                      const organization = sanitizeExperienceText(
                        exp?.organization,
                      );
                      const dates = sanitizeExperienceText(exp?.dates);

                      return (
                        <div key={i} className="flex mb-4">
                          <div className="mt-[6px] mr-4 w-[12px] h-[12px] bg-[#242a64] rounded-full" />
                          <div>
                            <div className="font-semibold text-[#242a64]">
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
                        </div>
                      );
                    })
                  : null}
              </SectionCard>

              <SectionCard title="Education">
                {cvData.educations?.length
                  ? cvData.educations.map((edu, i) => (
                      <div key={i} className="flex mb-4">
                        <div className="mt-[6px] mr-4 w-[12px] h-[12px] bg-[#242a64] rounded-full" />
                        <div>
                          <div className="font-semibold text-[#242a64]">
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
                      className="shadow-sm mb-3 p-3 border-l-[5px] border-[#242a64]"
                    >
                      <div className="font-semibold text-[#242a64]">
                        {r?.fullName}
                      </div>
                      <div className="text-gray-500 text-sm">{r?.position}</div>
                      <div>{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
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

function SectionCard({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="mb-5 text-[#242a64] font-bold border-b-2 border-[#242a64] pb-[0.3rem]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SkillBlock({ icon, title, children }) {
  return (
    <div className="border-0 shadow-[0_3px_10px_rgba(36,42,100,0.12)] p-4">
      <h6 className="flex items-center mb-3 font-bold text-[#242a64]">
        {icon} <span className="ml-2">{title}</span>
      </h6>
      <div>{children}</div>
    </div>
  );
}

function Chip({ label }) {
  if (!label) return null;
  return (
    <span className="inline-block mr-1 mb-1 capitalize bg-[#242a64] text-white text-[0.85rem] py-[0.35em] px-[0.8em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-md">
      {label}
    </span>
  );
}
