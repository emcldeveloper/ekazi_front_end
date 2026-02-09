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

export default function Template15() {
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
        href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="shadow-lg border-0 overflow-hidden min-h-[calc(297mm-10mm)]">
        <div
          className="p-5 text-white relative [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]"
          style={{ background: "linear-gradient(135deg, #b62424, #7d0f0f)" }}
        >
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-8">
              <h1 className="font-bold mb-2">{cvData.fullName}</h1>
              <h4 className="font-light">{cvData.current_position}</h4>
              <p className="mt-3">{cvData.summary}</p>
            </div>
            <div className="col-span-4 flex justify-end">
              <div className="w-[180px] h-[180px] rotate-45 overflow-hidden border-[6px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] group">
                <img
                  src={
                    cvData.profile?.picture
                      ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                      : "https://placehold.co/200x200?text=Photo"
                  }
                  alt="profile"
                  className="w-full h-full object-cover -rotate-45 transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.1]"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/200x200?text=Photo")
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 py-3 px-4 bg-[#f9f9f9]">
          <span className="rounded-full bg-white text-gray-900 px-3 py-2 shadow-sm inline-flex items-center gap-2">
            <FiPhone /> {cvData.phone}
          </span>
          <span className="rounded-full bg-white text-gray-900 px-3 py-2 shadow-sm inline-flex items-center gap-2">
            <FiMail /> {cvData.email}
          </span>
          <span className="rounded-full bg-white text-gray-900 px-3 py-2 shadow-sm inline-flex items-center gap-2">
            <FiMapPin /> {cvData.location}
          </span>
        </div>

        <div className="p-5 bg-white">
          {cvData?.languages && (
            <SectionCard title="Languages">
              <div className="flex flex-wrap gap-2">
                {cvData.languages.map((txt, i) => (
                  <Chip key={i} label={txt?.name} />
                ))}
              </div>
            </SectionCard>
          )}

          <SectionCard title="Skills & Traits" className="skills-traits">
            <div className="grid grid-cols-4 gap-4">
              <SkillBlock title="Knowledge" icon={<FiStar />}>
                <BulletList items={cvData.knowledges} />
              </SkillBlock>

              <SkillBlock title="Software" icon={<FiCpu />}>
                <BulletList items={cvData.softwares} />
              </SkillBlock>

              <SkillBlock title="Culture" icon={<FiGlobe />}>
                <BulletList items={cvData.cultures} />
              </SkillBlock>

              <SkillBlock title="Personality" icon={<FiUser />}>
                <BulletList items={cvData.personalities} />
              </SkillBlock>
            </div>
          </SectionCard>

          <SectionCard title="Experience & Education">
            {[...(cvData.experiences ?? []), ...(cvData.educations ?? [])]
              .length ? (
              <div className="grid grid-cols-2 gap-4">
                {[
                  ...(cvData.experiences ?? []),
                  ...(cvData.educations ?? []),
                ].map((item, i) => {
                  const isExperienceItem = Boolean(
                    item?.position ||
                    item?.responsibility ||
                    item?.organization,
                  );
                  const rawTitle =
                    item?.position || item?.level || item?.degree;
                  const rawOrg =
                    item?.organization ||
                    item?.college ||
                    item?.institution ||
                    "";
                  const rawDates = item?.dates;
                  const title = isExperienceItem
                    ? sanitizeExperienceText(rawTitle)
                    : rawTitle;
                  const org = isExperienceItem
                    ? sanitizeExperienceText(rawOrg)
                    : rawOrg;
                  const dates = isExperienceItem
                    ? sanitizeExperienceText(rawDates)
                    : rawDates;

                  return (
                    <div
                      key={i}
                      className="border-0 shadow-sm p-4 border-t-[4px] border-[#b62424]"
                    >
                      <div className="font-semibold text-[#b62424]">
                        {title}
                      </div>
                      <div className="text-gray-500 text-sm">{org || ""}</div>
                      <div className="text-gray-500 text-sm mb-2">{dates}</div>
                      {item?.responsibility && (
                        <ul className="text-sm mb-0">
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
            ) : null}
          </SectionCard>

          {cvData.referees?.length > 0 && (
            <SectionCard title="Referees">
              <div className="grid grid-cols-2 gap-4">
                {cvData.referees.map((r, i) => (
                  <div key={r.id ?? i} className="border shadow-sm p-4">
                    <strong>{r.fullName}</strong>
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

function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`mb-5 ${className}`}>
      <h3 className="mb-3 pb-2 inline-block font-bold text-[#b62424] border-b-2 border-[#b62424]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SkillBlock({ title, icon, children }) {
  return (
    <div className="border-0 shadow-sm p-4 w-full h-full">
      <h6 className="font-bold mb-3 flex items-center text-[#b62424]">
        {icon} <span className="ml-2">{title}</span>
      </h6>
      <div>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="pl-2">
      {items.map((it, i) => (
        <li key={i} className="mb-1 text-sm text-gray-900">
          {it?.name || it}
        </li>
      ))}
    </ul>
  );
}

function Chip({ label }) {
  if (!label) return null;
  return (
    <span className="inline-block capitalize bg-[#b62424] text-white text-[0.85rem] py-[0.35em] px-[0.8em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-full">
      {label}
    </span>
  );
}
