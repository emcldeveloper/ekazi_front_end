import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const BRAND = "#009485";

export default function Template11() {
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
        href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="shadow border-0 overflow-hidden rounded-lg">
        <div className="text-center py-5 text-white bg-[#009485] rounded-t-[12px]">
          <h1 className="font-bold mb-1 text-[2.2rem] tracking-[0.5px]">
            {cvData.fullName}
          </h1>
          <h5 className="mb-3 font-light tracking-[0.5px]">
            {cvData.current_position}
          </h5>
          <div className="flex flex-wrap justify-center gap-4 mx-auto text-[0.95rem] max-w-[700px]">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <FiPhone /> {cvData.phone}
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <FiMail /> {cvData.email}
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <FiMapPin /> {cvData.location}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12">
          {/* LEFT */}
          <div
            className="col-span-4 p-4 text-start"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="flex flex-col items-center md:items-start">
              <img
                src={
                  cvData.profile?.picture
                    ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                className="mb-4 shadow-sm rounded-full w-[160px] h-[160px] object-cover border-[4px] border-[#009485]"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
              />

              <SidebarSection title="Languages">
                <SkillChips
                  items={cvData.languages}
                  bgColor={BRAND}
                  textColor="#fff"
                />
              </SidebarSection>

              <SidebarSection title="Skills">
                <SkillChips
                  items={cvData.knowledges}
                  bgColor="#0b5ed7"
                  textColor="#fff"
                />
              </SidebarSection>

              <SidebarSection title="Software">
                <SkillChips
                  items={cvData.softwares}
                  bgColor={BRAND}
                  textColor="#fff"
                />
              </SidebarSection>

              <SidebarSection title="Culture & Personality">
                <SkillChips
                  items={cvData.cultures}
                  bgColor={BRAND}
                  textColor="#fff"
                />
                <SkillChips
                  items={cvData.personalities}
                  bgColor={BRAND}
                  textColor="#fff"
                />
              </SidebarSection>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-8 p-4 bg-white">
            <Section title="About Me">
              <p className="mb-0 text-gray-500 [text-align:justify]">
                {cvData.summary}
              </p>
            </Section>

            <Section title="Experience">
              {cvData.experiences?.map((exp, i) => (
                <div key={i} className="mb-3 shadow-sm rounded-lg bg-white p-4">
                  <div className="font-semibold text-[#009485]">
                    {exp?.position}
                    <span className="text-gray-500"> — {exp.organization}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">{exp.dates}</div>
                  {exp?.responsibility && (
                    <ul className="mb-0 text-sm text-gray-500">
                      {exp.responsibility.map((t, k) => (
                        <li key={k}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </Section>

            <Section title="Education">
              {cvData.educations?.map((edu, i) => (
                <div key={i} className="mb-3 shadow-sm rounded-lg bg-white p-4">
                  <div className="font-semibold text-[#009485]">
                    {edu?.level}
                  </div>
                  <div className="text-gray-500">{edu?.college}</div>
                  <div className="text-sm text-gray-500">{edu.dates}</div>
                </div>
              ))}
            </Section>

            {cvData.referees?.length > 0 && (
              <Section title="Referees">
                {cvData.referees?.map((r, i) => {
                  return (
                    <div
                      key={r.id ?? i}
                      className="mb-3 shadow-sm rounded-lg bg-white p-4"
                    >
                      <div className="font-semibold text-[#009485]">
                        {r?.fullName}
                      </div>
                      <div className="text-gray-500 text-sm">{r?.position}</div>
                      <div className="text-sm">{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  );
                })}
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children }) {
  return (
    <div className="mb-4 w-full">
      <h6
        className="font-semibold mb-2"
        style={{ color: BRAND, letterSpacing: "0.5px" }}
      >
        {title}
      </h6>
      <div>{children}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h4
        className="inline-block mb-4 font-semibold"
        style={{
          color: BRAND,
          borderBottom: `2px solid ${BRAND}`,
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function SkillChips({ items, bgColor, textColor }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <span
          key={i}
          className="inline-block capitalize"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            fontSize: "0.85rem",
            padding: "0.4em 0.75em",
            margin: "0.2em",
            borderRadius: 999,
            maxWidth: "100%",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            textAlign: "left",
            lineHeight: 1.2,
          }}
        >
          {typeof it === "string" ? it : it?.name}
        </span>
      ))}
    </div>
  );
}
