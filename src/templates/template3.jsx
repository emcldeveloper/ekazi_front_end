import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template3() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const CV_BASE = "https://api.ekazi.co.tz";
  if (isLoading) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <div className="grid grid-flow-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="text-gray-700">Loading CV</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto ">
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div className="text-start shadow-sm overflow-hidden bg-white border border-gray-200 rounded-lg font-['Outfit']">
        <div className="grid grid-cols-12">
          {/* Left */}
          <div className="col-span-4 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
            <div
              className="grid place-items-center relative py-6 min-h-[220px]"
              style={{ background: "#e6eef8" }}
            >
              <div className="w-[180px] h-[180px] rounded-xl overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,.15)] bg-white">
                <img
                  src={
                    cvData.profile?.picture
                      ? `${CV_BASE}/${cvData.profile.picture}`
                      : "https://placehold.co/500x500?text=Photo"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/500x500?text=Photo")
                  }
                />
              </div>
            </div>

            <div className="px-3 lg:px-3 py-6">
              <AsideCard title="Address" fullWidth>
                <div className="text-gray-600">{cvData.location}</div>
              </AsideCard>

              <AsideCard title="Phone" fullWidth>
                <div className="text-gray-600">{cvData.phone}</div>
              </AsideCard>

              <AsideCard title="Email" fullWidth>
                <div className="text-gray-600">{cvData.email}</div>
              </AsideCard>

              <AsideCard title="Contacts" fullWidth>
                <ul className="space-y-2">
                  <li className="grid grid-cols-[28px_1fr] items-center gap-2">
                    <span
                      className="h-7 w-7 grid place-items-center rounded-full text-white"
                      style={{ background: "#1756a5" }}
                    >
                      <FiMail />
                    </span>
                    <span className="break-words">{cvData.email}</span>
                  </li>
                  <li className="grid grid-cols-[28px_1fr] items-center gap-2">
                    <span
                      className="h-7 w-7 grid place-items-center rounded-full text-white"
                      style={{ background: "#1756a5" }}
                    >
                      <FiPhone />
                    </span>
                    <span>{cvData.phone}</span>
                  </li>
                  <li className="grid grid-cols-[28px_1fr] items-center gap-2">
                    <span
                      className="h-7 w-7 grid place-items-center rounded-full text-white"
                      style={{ background: "#1756a5" }}
                    >
                      <FiMapPin />
                    </span>
                    <span className="break-words">{cvData.location}</span>
                  </li>
                </ul>
              </AsideCard>

              <AsideCard title="Languages" fullWidth>
                {cvData.languages?.length ? (
                  <ul className="mb-0 list-disc pl-4">
                    {cvData.languages.map((l, i) => (
                      <li key={i} className="mb-1 capitalize">
                        {l?.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AsideCard>
              <AsideCard title="Skills" fullWidth>
                {cvData.knowledges?.length ? (
                  <ul className="mb-0 list-disc pl-4">
                    {cvData.knowledges.map((k, i) => (
                      <li key={i} className="mb-1 capitalize">
                        {k?.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AsideCard>

              <AsideCard title="Software" fullWidth>
                {cvData.softwares?.length ? (
                  <ul className="mb-0 list-disc pl-4">
                    {cvData.softwares.map((c, i) => (
                      <li key={i} className="mb-1 capitalize">
                        {c?.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AsideCard>

              {/* Culture Fit - without brand background */}
              <Section title="Culture Fit" accent={false}>
                {cvData.cultures?.length ? (
                  <ul className="mb-0 list-disc pl-4">
                    {cvData.cultures.map((c, i) => (
                      <li key={i} className="mb-1 capitalize">
                        {c?.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Section>

              <AsideCard title="Personality" fullWidth>
                {cvData.personalities?.length ? (
                  <ul className="mb-0 list-disc pl-4">
                    {cvData.personalities.map((p, i) => (
                      <li key={i} className="mb-1 capitalize">
                        {p?.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AsideCard>

              <AsideCard title="Referees" fullWidth>
                {cvData.referees?.length ? (
                  <div className="grid gap-3">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="border-l-[3px] border-l-[#1756a5] pl-3 py-2 bg-white"
                      >
                        <div className="font-semibold">{r.fullName}</div>
                        <div className="text-gray-500">{r.position}</div>
                        <div className="text-sm">{r.company}</div>
                        <div className="text-sm">Tel: {r.phone}</div>
                        <div className="text-sm">Email: {r.email}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </AsideCard>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-8">
            <div className="p-4 md:px-5 md:pt-4">
              {/* Header */}
              <div className="pb-3 mb-3 border-b">
                <h1 className="font-bold text-[32px] text-gray-800 mb-0.5">
                  {cvData.fullName}
                </h1>
                <div className="text-gray-500 text-lg">
                  {cvData.current_position}
                </div>
                <div className="uppercase font-bold mt-2 tracking-[.02em] text-[#1756a5]">
                  Introduction
                </div>
                <p className="mb-0 text-justify">{cvData.summary}</p>
              </div>

              {/* Work Experience */}
              <Section title="Work Experience" accent>
                {cvData.experiences?.length ? (
                  <div className="grid gap-4">
                    {cvData.experiences.map((w, i) => (
                      <div key={i} className="py-3 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
                          <div className="font-semibold">{w.organization}</div>
                          <div className="text-gray-500">{w.dates}</div>
                        </div>
                        <div className="text-gray-500">{w.position}</div>
                        {w.responsibility?.length ? (
                          <ul className="mb-0 mt-2 list-disc pl-5">
                            {w.responsibility.map((b, j) => (
                              <li key={j} className="mb-1">
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </Section>

              {/* Education - Table Layout */}
              <Section>
                <div className="border overflow-hidden rounded-lg">
                  <div
                    className="text-white font-semibold px-4 py-2 tracking-[.02em]"
                    style={{ background: "#1756a5" }}
                  >
                    Education
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left">
                        <tr className="border-b-2 border-b-[#1756a5]">
                          <th className="w-[40%] px-3 py-2">Institution</th>
                          <th className="w-[30%] px-3 py-2">Course</th>
                          <th className="w-[15%] px-3 py-2 text-center">
                            Start
                          </th>
                          <th className="w-[15%] px-3 py-2 text-center">End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cvData.educations?.length
                          ? cvData.educations.map((ed, i) => {
                              const [start, end] = String(
                                ed?.dates ? ed.dates : "",
                              )
                                .split(/[-â€“â€”]/)
                                .map((s) => s?.trim())
                                .filter(Boolean);
                              return (
                                <tr
                                  key={i}
                                  className="border-b border-gray-200 last:border-b-0"
                                  style={{
                                    background:
                                      i % 2 === 0 ? "#f5f6f7" : "#ffffff",
                                  }}
                                >
                                  <td className="px-3 py-3 align-top">
                                    {ed.college}
                                  </td>
                                  <td className="px-3 py-3 align-top">
                                    {ed.course}
                                  </td>
                                  <td className="px-3 py-3 text-center align-top">
                                    {start}
                                  </td>
                                  <td className="px-3 py-3 text-center align-top">
                                    {end}
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Utility Components */
function AsideCard({ title, children, fullWidth = false }) {
  return (
    <div className="mb-3">
      <div
        className={`px-3 py-1 rounded-full font-bold border text-white ${
          fullWidth ? "block w-full" : "inline-block"
        } shadow-[0_1px_0_rgba(0,0,0,.05)]`}
        style={{ background: "#1756a5", borderColor: "#1756a5" }}
      >
        {title}
      </div>
      <div className="pt-2 pb-0">{children}</div>
    </div>
  );
}

function Section({ title, accent = false, children }) {
  return (
    <div className="mt-3">
      <div className="grid grid-flow-col items-center gap-2 mb-2 font-bold text-[#202020] text-[1.05rem]">
        <span
          className={`px-2 py-1 rounded ${
            accent ? "text-white" : "text-gray-900"
          }`}
          style={{
            background: accent ? "#1756a5" : "#f8f9fa",
          }}
        >
          {title}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
