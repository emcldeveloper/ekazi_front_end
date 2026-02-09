import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template21() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const cvUrl = "https://api.ekazi.co.tz";

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
    <div className="text-start mx-auto bg-white p-[5mm] box-border font-['Comfortaa'] text-gray-900 shadow-[0_0_5px_rgba(0,0,0,0.2)]">
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[287mm] overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="relative overflow-hidden bg-indigo-900 text-white px-5 pt-5 pb-4 rounded-b-2xl">
          <div className="absolute -top-[60px] -right-[120px] w-[260px] h-[260px] bg-white/10 rounded-full rotate-12" />
          <div className="relative z-10 flex gap-4 items-center">
            <div className="p-2 w-[120px] h-[120px] rounded-2xl bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,.18)]">
              <div className="w-full h-full rounded-xl overflow-hidden border-[3px] border-white/80">
                <img
                  src={
                    cvData.profile?.picture
                      ? `${cvUrl}/${cvData.profile.picture}`
                      : "https://placehold.co/140x140?text=Photo"
                  }
                  alt="profile"
                  className="w-full h-full object-cover block"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/140x140?text=Photo")
                  }
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-[1.55rem] font-bold leading-tight m-0">
                {cvData.fullName}
              </h1>
              <div className="text-[.95rem] opacity-90 mt-1">
                {cvData.current_position}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <ContactTile icon={<FiPhone />} value={cvData.phone} />
                <ContactTile icon={<FiMail />} value={cvData.email} oneLine />
                <ContactTile icon={<FiMapPin />} value={cvData.location} />
              </div>

              {payload?.user?.[0]?.website ? (
                <div className="mt-2 text-xs opacity-95 flex items-start gap-1">
                  <FiGlobe className="shrink-0 mt-[2px]" />
                  <span className="break-words">
                    {payload?.user?.[0]?.website}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="grid grid-cols-12 gap-3">
            {/* LEFT */}
            <div className="col-span-4">
              <Panel title="Biography">
                <p className="text-[.82rem] leading-relaxed m-0">
                  {cvData.summary}
                </p>
              </Panel>

              {cvData.languages && (
                <Panel title="Languages">
                  <ul className="list-disc pl-4 m-0">
                    {cvData.languages.map((l, i) => (
                      <li key={i} className="text-[.82rem] mb-1">
                        {l?.name || l}
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}

              {(cvData.knowledges || cvData.softwares) && (
                <Panel title="Skills">
                  <ul className="list-disc pl-4 m-0">
                    {cvData.knowledges &&
                      cvData.knowledges
                        .map((k) => k?.name || k)
                        .filter(Boolean)
                        .map((name, i) => (
                          <li key={`k-${i}`} className="text-[.82rem] mb-1">
                            {name}
                          </li>
                        ))}
                    {cvData.softwares &&
                      cvData.softwares
                        .map((s) => s?.name || s)
                        .filter(Boolean)
                        .map((name, i) => (
                          <li key={`s-${i}`} className="text-[.82rem] mb-1">
                            {name}
                          </li>
                        ))}
                  </ul>
                </Panel>
              )}

              {cvData.cultures && (
                <Panel title="Culture">
                  <ul className="list-disc pl-4 m-0">
                    {cvData.cultures
                      .map((c) => c?.name || c)
                      .filter(Boolean)
                      .map((name, i) => (
                        <li key={i} className="text-[.82rem] mb-1">
                          {name}
                        </li>
                      ))}
                  </ul>
                </Panel>
              )}
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <Panel title="Experience">
                {cvData.experiences && (
                  <Timeline items={cvData.experiences} isExperience />
                )}
              </Panel>

              <Panel title="Education">
                {cvData.educations && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[.82rem] border">
                      <thead className="bg-indigo-900 text-white">
                        <tr>
                          <th className="px-2 py-2">Level / Degree</th>
                          <th className="px-2 py-2">Institution</th>
                          <th className="px-2 py-2">Start</th>
                          <th className="px-2 py-2">End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cvData.educations.map((edu, i) => (
                          <tr key={i}>
                            <td className="px-2 py-2">{edu?.level}</td>
                            <td className="px-2 py-2">{edu?.college}</td>
                            <td className="px-2 py-2">{edu?.dates}</td>
                            <td className="px-2 py-2">{edu?.dates}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Panel>

              {cvData.referees && (
                <Panel title="Referees">
                  <div className="flex flex-wrap gap-3">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="w-full md:w-[calc(33.333%-0.5rem)] bg-white shadow-sm rounded-2xl p-3"
                      >
                        <strong>{r?.fullName}</strong>
                        <div className="text-gray-500 text-[.78rem]">
                          {r?.position} - {r?.company}
                        </div>
                        <div className="text-[.8rem]">{r?.phone}</div>
                        <div className="text-[.8rem] break-words">
                          {r?.email}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="mb-3 shadow-sm rounded-2xl bg-white">
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-900/10 to-transparent border-b border-black/5 font-bold text-indigo-900">
        {title}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

function ContactTile({ icon, value, oneLine = false }) {
  return (
    <div className="flex items-center gap-1 text-center rounded-xl bg-white/10 border border-white/20 px-2.5 py-2">
      <span className="block mb-1">{icon}</span>
      <div
        className={`text-[.70rem] leading-tight ${
          oneLine ? "truncate" : "break-words"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-2.5 top-1 bottom-1 w-1 bg-indigo-900 rounded-full -translate-x-1/2" />
      {items.map((item, i) => (
        <div key={i} className="relative mb-4">
          <div className="absolute left-2.5 top-3 h-3 w-3 bg-white border-4 border-indigo-900 rounded-full shadow-[0_6px_14px_rgba(0,0,0,.12)] -translate-x-1/2" />
          <div className="bg-white shadow-sm rounded-2xl p-3 ml-2">
            <div className="text-[.72rem] font-semibold bg-indigo-900 text-white inline-block px-2 py-1 rounded-full mb-2">
              {item?.dates}
            </div>
            <div className="font-bold text-indigo-900 text-[.95rem]">
              {isExperience ? item?.position : item?.level}
            </div>
            <div className="text-[.78rem] text-black/60 mb-2">
              {isExperience
                ? item?.organization || ""
                : item?.college || item?.institution || ""}
            </div>
            {item?.responsibility && (
              <ul className="pl-4 text-[.80rem] text-black/70 list-disc">
                {(Array.isArray(item.responsibility)
                  ? item.responsibility
                  : String(item.responsibility).split("\n")
                )
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t, k) => (
                    <li key={k}>{t.replace(/^[\\u2022*-]\\s*/, "")}</li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
