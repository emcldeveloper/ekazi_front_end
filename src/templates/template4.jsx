import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template4() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const CV_BASE = "https://api.ekazi.co.tz";
  const BRAND = "#dc3545";
  const BRAND_DARK = "#c10d3dff";
  const PAPER = "#ffffff";
  const INK = "#1f2937";

  const cleanItem = (value) =>
    String(value || "")
      .replace(/\uFFFD/g, "")
      .replace(/^â€¢\s*/, "")
      .replace(/^•\s*/, "")
      .trim();

  if (isLoading) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <div className="grid grid-flow-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="text-gray-700">Loading CV...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-[900px] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error?.message || String(error)}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto font-['Inter']"
      style={{
        backgroundColor: PAPER,
        color: INK,
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="">
        <div>
          <div
            className="relative"
            style={{ backgroundColor: BRAND, height: 120 }}
          >
            <div className="absolute" style={{ left: 24, top: 24 }}>
              <h1
                className="m-0 font-bold text-[32px] leading-tight"
                style={{ color: "#fff", letterSpacing: ".5px" }}
              >
                {cvData.fullName}
              </h1>
              <div className="text-white/60">{cvData.currentTitle}</div>
            </div>
            <div className="absolute" style={{ right: 24, top: 10 }}>
              <img
                src={
                  cvData.profile?.picture
                    ? `${CV_BASE}/${cvData.profile.picture}`
                    : "https://placehold.co/120x120?text=Photo"
                }
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/120x120?text=Photo")
                }
                width={120}
                height={120}
                className="border border-[3px] border-white shadow"
                style={{ borderRadius: 12, objectFit: "cover" }}
                alt="profile"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* LEFT: Summary, Experience, Education */}
        <div className="col-span-8 bg-white p-4 text-start border-r border-gray-200">
          {/* Summary */}
          <div className="mb-4">
            <h3 className="text-base font-bold mb-2" style={{ color: BRAND }}>
              Summary
            </h3>
            <p
              className="text-sm text-gray-500 leading-relaxed"
              style={{ textAlign: "justify" }}
            >
              {cvData.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h3 className="text-base font-bold mb-3" style={{ color: BRAND }}>
              Experience
            </h3>
            {cvData.experiences.length ? (
              cvData.experiences.map((exp, i) => (
                <div key={exp} className="mb-3 border-0 shadow-sm bg-white">
                  <div className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-start mb-2">
                      <div>
                        <div
                          className="font-bold"
                          style={{ color: BRAND_DARK }}
                        >
                          {exp.position}
                        </div>
                        <div className="text-gray-500">{exp.organization}</div>
                        <div className="text-gray-500 text-sm">
                          {exp.location}
                        </div>
                      </div>
                      <span className="text-xs border bg-gray-50 px-2 py-1 rounded">
                        {exp.dates}
                      </span>
                    </div>
                    <ul className="mb-0 pl-4 list-disc">
                      {exp.responsibility.map((b, k) => (
                        <li
                          key={cleanItem(b)}
                          className="text-sm text-gray-500 mb-1 leading-relaxed"
                        >
                          {cleanItem(b)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">—</div>
            )}
          </div>

          {/* Education */}
          <div className="mb-3">
            <h3 className="text-base font-bold mb-2" style={{ color: BRAND }}>
              Education
            </h3>
            {cvData.educations.length ? (
              <div className="border rounded">
                {/* Table Header */}
                <div className="text-white" style={{ background: BRAND }}>
                  <div className="grid grid-cols-12 font-semibold">
                    <div
                      className="col-span-6 px-3 py-2 border-r"
                      style={{ borderColor: "rgba(255,255,255,.25)" }}
                    >
                      School/College
                    </div>
                    <div
                      className="col-span-4 px-3 py-2 border-r"
                      style={{ borderColor: "rgba(255,255,255,.25)" }}
                    >
                      Course/Degree
                    </div>
                    <div className="col-span-2 px-3 py-2">Year</div>
                  </div>
                </div>

                {/* Table Body */}
                <div>
                  {cvData.educations.map((ed, i) => {
                    return (
                      <div key={i} className="grid grid-cols-12 border-t">
                        <div className="col-span-6 px-3 py-2 border-r">
                          {ed.college}
                        </div>
                        <div className="col-span-4 px-3 py-2 border-r">
                          {ed.course}
                        </div>
                        <div className="col-span-2 px-3 py-2">{ed.dates}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">—</div>
            )}
          </div>
        </div>

        {/* RIGHT: Contact, Skills, Languages, Culture, Referees */}
        <div className="col-span-4 bg-gray-100 p-4 text-start">
          {/* Contact */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-3" style={{ color: BRAND }}>
              Contact
            </h3>
            <ul className="text-sm space-y-2">
              <li className="grid grid-cols-[16px_1fr] items-center gap-2">
                <FiMapPin />
                <span className="break-words">{cvData.location}</span>
              </li>
              <li className="grid grid-cols-[16px_1fr] items-center gap-2">
                <FiPhone />
                <span>{cvData.phone}</span>
              </li>
              <li className="grid grid-cols-[16px_1fr] items-center gap-2">
                <FiMail />
                <span className="break-words">{cvData.email}</span>
              </li>
            </ul>
          </div>

          {/* Skills & Software */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: BRAND }}>
              Skills
            </h3>
            {cvData.knowledges && (
              <ul className="list-none text-sm mb-0 space-y-1">
                {cvData.knowledges.map((k, i) => (
                  <li
                    key={k}
                    className="grid grid-cols-[10px_1fr] items-center capitalize"
                  >
                    <span style={{ color: BRAND }}>•</span>
                    {cleanItem(k.name)}
                  </li>
                ))}
              </ul>
            )}
            {cvData.softwares.length ? (
              <>
                <div
                  className="mt-3 font-semibold text-sm"
                  style={{ color: BRAND_DARK }}
                >
                  Software
                </div>
                <ul className="list-none text-sm mb-0 space-y-1">
                  {cvData.softwares.map((s, i) => (
                    <li
                      key={s}
                      className="grid grid-cols-[10px_1fr] items-center capitalize"
                    >
                      <span style={{ color: BRAND }}>•</span>
                      {cleanItem(s.name)}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {/* Languages */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: BRAND }}>
              Languages
            </h3>
            {cvData.languages.length ? (
              <ul className="list-none text-sm mb-0 space-y-1">
                {cvData.languages.map((l, i) => (
                  <li
                    key={l}
                    className="grid grid-cols-[10px_1fr] items-center capitalize"
                  >
                    <span style={{ color: BRAND }}>•</span>
                    {cleanItem(l.name)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Culture */}
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: BRAND }}>
              Culture Fit
            </h3>
            {cvData.cultures && (
              <ul className="list-none text-sm mb-0 space-y-1">
                {cvData.cultures.map((c, i) => (
                  <li
                    key={`c-${i}`}
                    className="grid grid-cols-[10px_1fr] items-center capitalize"
                  >
                    <span style={{ color: BRAND }}>•</span>
                    {cleanItem(c.name)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Referees */}
          {cvData.referees && (
            <div className="mb-2">
              <h3 className="text-sm font-bold mb-2" style={{ color: BRAND }}>
                Referees
              </h3>
              <div className="grid gap-2">
                {cvData.referees.map((r, i) => {
                  return (
                    <div
                      key={r.id ?? i}
                      className="border-l-[3px] pl-3 py-2 bg-white"
                      style={{ borderLeftColor: BRAND }}
                    >
                      <div className="font-semibold">{r.fullName}</div>
                      <div className="text-gray-500 text-sm">{r.position}</div>
                      <div className="text-sm">{r.company}</div>
                      <div className="text-sm">Tel: {r.phone}</div>
                      <div className="text-sm">Email: {r.email}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
