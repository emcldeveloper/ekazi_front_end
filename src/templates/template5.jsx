import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template5() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const cvUrl = "https://api.ekazi.co.tz";

  const BRAND = "#D36314";
  const BRAND_DARK = "#8B3A0F";
  const INK = "#1f2937";
  const PAPER = "#ffffff";
  const PANEL = "#f8fafc";
  const DIVIDER = "rgba(0,0,0,.08)";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <span className="ml-3 text-gray-700">Loading CV</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-[210mm] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto font-['Nunito']"
      style={{
        backgroundColor: PAPER,
        color: INK,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div>
        <div
          className="flex items-center justify-between gap-3 px-4 pt-4 pb-2"
          style={{ borderBottom: `1px solid ${DIVIDER}` }}
        >
          <div
            className="h-5 rounded-sm"
            style={{ background: BRAND, width: 140 }}
          />
          <h1
            className="m-0 font-extrabold tracking-[.2px] text-center"
            style={{ color: INK, fontSize: "1.7em" }}
          >
            {cvData.fullName}
          </h1>
          <div
            className="h-5 rounded-sm"
            style={{ background: BRAND, width: 160 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 text-start">
        {/* LEFT */}
        <div className="col-span-8 p-4">
          {/* Profile */}
          <SectionTitle title="Profile" brand={BRAND} divider={DIVIDER} />
          <p className="text-gray-500 leading-relaxed">{cvData.summary}</p>

          {/* Career Objective (if present) */}
          {payload?.objective?.objective && (
            <>
              <SectionTitle
                title="Career Objective"
                brand={BRAND}
                divider={DIVIDER}
              />
              <p className="text-gray-500 leading-relaxed">
                {payload.objective.objective}
              </p>
            </>
          )}

          {/* Job Experience (Template1 parity) */}
          <SectionTitle
            title="Job Experience"
            brand={BRAND}
            divider={DIVIDER}
          />
          {cvData.experiences &&
            cvData.experiences.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex-1">
                    <div
                      className="font-bold capitalize"
                      style={{ color: BRAND_DARK }}
                    >
                      {exp.position}
                    </div>
                    <div className="text-gray-500">
                      {exp.organization}
                      {` / ${exp.industry}`}
                    </div>
                    <div>{exp.location}</div>
                  </div>
                  <span className="border text-gray-900 text-xs bg-white px-2 py-1 rounded self-start ">
                    {exp.dates}
                  </span>
                </div>

                {exp.responsibility && (
                  <ul className="text-sm mb-0 mt-2 pl-4 list-disc">
                    {exp.responsibility.map((b, k) => (
                      <li key={k} className="text-gray-500 leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          {/* Skills & Endorsements */}
          <SectionTitle
            title="Skills & Endorsements"
            brand={BRAND}
            divider={DIVIDER}
          />
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <div className="font-semibold">Culture Fit</div>
                <div className="text-sm text-gray-500 capitalize">
                  {cvData.cultures &&
                    cvData.cultures
                      .map((c) => c?.name)
                      .filter(Boolean)
                      .join(", ")}
                </div>
              </div>
              <div className="w-full">
                <div className="font-semibold">Personality</div>
                <div className="text-sm text-gray-500 capitalize">
                  {cvData.personalities &&
                    cvData.personalities
                      .map((p) => p.name)
                      .filter(Boolean)
                      .join(", ")}
                </div>
              </div>
              <div className="w-full ">
                <div className="font-semibold">Software</div>
                <div className="text-sm text-gray-500 capitalize">
                  {cvData.softwares &&
                    cvData.softwares
                      .map((s) => s.name)
                      .filter(Boolean)
                      .join(", ")}
                </div>
              </div>
              <div className="w-full">
                <div className="font-semibold">Skills & Knowledge</div>
                <div className="text-sm text-gray-500 capitalize">
                  {cvData.knowledges &&
                    cvData.knowledges
                      .map((k) => k.name)
                      .filter(Boolean)
                      .join(", ")}
                </div>
              </div>
            </div>
          </div>

          {/* Tools */}
          <SectionTitle title="Tools" brand={BRAND} divider={DIVIDER} />
          <div className="text-sm text-gray-500 mb-4 capitalize">
            {cvData.tools &&
              cvData.tools
                .map((t) => t.name)
                .filter(Boolean)
                .join(", ")}
          </div>

          {/* Referees */}
          <div
            className="mt-2 rounded-[10px] p-4"
            style={{ background: PANEL, border: `1px solid ${DIVIDER}` }}
          >
            <div className="flex items-center gap-2 mb-2 justify-start">
              <span
                className="inline-block h-[10px] w-[10px] rounded-full"
                style={{ background: BRAND }}
              />
              <h6 className="m-0" style={{ color: BRAND_DARK }}>
                Referees
              </h6>
            </div>
            {cvData.referees && (
              <div className="flex flex-col gap-4">
                {cvData.referees.map((r, i) => {
                  return (
                    <div key={r}>
                      <div className="font-semibold">{r.fullName}</div>
                      <div className="text-gray-500 text-sm">{r.position}</div>
                      <div className="text-sm">{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email || "â€”"}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-4 p-4">
          {/* Photo */}
          <div className="mb-3">
            <div className="p-3 flex items-center justify-center">
              <img
                src={
                  cvData.profile?.picture
                    ? `${cvUrl}/${cvData.profile.picture}`
                    : "https://placehold.co/150x180?text=Photo"
                }
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/150x180?text=Photo")
                }
                className="border"
                alt="profile"
                width={150}
                height={180}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          </div>

          {/* Contact Details */}
          <SideSection title="Contact Details" brand={BRAND} divider={DIVIDER}>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1" />
                <span className="break-all">{cvData.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <FiPhone className="mt-1" />
                <span>{cvData.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-1" />
                <span className="break-words">{cvData.email}</span>
              </li>
            </ul>
          </SideSection>

          {/* Languages */}
          <SideSection title="Languages" brand={BRAND} divider={DIVIDER}>
            {cvData.languages && (
              <ul className="list-none text-sm mb-0 space-y-1">
                {cvData.languages.map((l, i) => (
                  <li key={l} className="mb-1 capitalize">
                    {l?.name}
                  </li>
                ))}
              </ul>
            )}
          </SideSection>

          {/* Education */}
          <SideSection title="Education" brand={BRAND} divider={DIVIDER}>
            {cvData.educations && (
              <ul className="list-none text-sm mb-0 space-y-2">
                {cvData.educations.map((edu, i) => (
                  <li key={i}>
                    <div className="font-semibold capitalize">{edu.course}</div>
                    <div className="text-gray-500 capitalize">
                      {edu.college}
                    </div>
                    <div className="text-gray-500 text-sm">({edu.dates})</div>
                  </li>
                ))}
              </ul>
            )}
          </SideSection>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, brand, divider }) {
  return (
    <div className="flex items-center gap-2 mt-4 mb-1">
      <div className="font-extrabold" style={{ color: brand }}>
        {title}
      </div>
      <div className="h-[2px] flex-1" style={{ background: divider }} />
    </div>
  );
}

function SideSection({ title, children, brand, divider }) {
  return (
    <div className="mb-4">
      <div className="font-extrabold" style={{ color: brand }}>
        {title}
      </div>
      <div className="h-[2px] mb-3" style={{ background: divider }} />
      {children}
    </div>
  );
}
