import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template23() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

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
    <div className="text-start mx-auto bg-white font-['Marcellus'] text-gray-900 ">
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[287mm] overflow-hidden rounded-2xl bg-white">
        <div className="relative text-center pt-16 px-8 pb-24 mb-16 border-b-[6px] border-red-600">
          <div className="text-[2.8rem] font-bold text-red-600 break-words">
            {cvData.fullName}
          </div>
          <div className="text-[1.3rem] text-gray-600 mb-4 break-words">
            {cvData.current_position}
          </div>
          <p className="text-base text-gray-700 max-w-[700px] mx-auto break-words">
            {cvData.summary}
          </p>
          <img
            src={
              cvData.profile?.picture
                ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                : "https://placehold.co/160x160?text=Photo"
            }
            alt="profile"
            className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[160px] h-[160px] rounded-full object-cover border-[6px] border-white shadow-[0_6px_16px_rgba(0,0,0,.25)]"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/160x160?text=Photo")
            }
          />
        </div>

        <div className="pb-5 px-6">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <Section title="Contact">
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <FiPhone className="mt-1 shrink-0 text-red-600" />
                    <span className="break-words">{cvData.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMail className="mt-1 shrink-0 text-red-600" />
                    <span className="break-words">{cvData.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="mt-1 shrink-0 text-red-600" />
                    <span className="break-words">{cvData.location}</span>
                  </div>
                  {payload?.user?.[0]?.website ? (
                    <div className="flex items-start gap-2">
                      <FiGlobe className="mt-1 shrink-0 text-red-600" />
                      <span className="break-words">
                        {payload?.user?.[0]?.website}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Section>

              <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges.map((k, i) => (
                    <span
                      key={`k-${i}`}
                      className="rounded-full border border-red-600/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-700 capitalize"
                    >
                      {k?.name}
                    </span>
                  ))}
                  {cvData.softwares.map((s, i) => (
                    <span
                      key={`s-${i}`}
                      className="rounded-full border border-gray-900/15 bg-gray-900/5 px-3 py-1 text-xs font-semibold text-gray-800 capitalize"
                    >
                      {s?.name}
                    </span>
                  ))}
                </div>
              </Section>

              {cvData.languages.length > 0 && (
                <Section title="Languages">
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-red-600/15 bg-red-600/5 px-3 py-1 text-xs font-semibold text-red-700 capitalize"
                      >
                        {l?.name}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {(cvData.cultures.length > 0 ||
                cvData.personalities.length > 0) && (
                <Section title="Culture & Personality">
                  <div className="flex flex-wrap gap-2">
                    {cvData.cultures.map((c, i) => (
                      <span
                        key={`c-${i}`}
                        className="rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900 capitalize"
                      >
                        {c?.name}
                      </span>
                    ))}
                    {cvData.personalities.map((p, i) => (
                      <span
                        key={`p-${i}`}
                        className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 capitalize"
                      >
                        {p?.name}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Experience">
                {cvData.experiences.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {cvData.experiences.map((exp, i) => (
                      <div key={i}>
                        <div className="text-base font-semibold text-gray-900 break-words">
                          {exp?.position}
                        </div>
                        <div className="text-sm italic text-gray-600 break-words">
                          {exp?.organization} | {exp?.dates}
                        </div>
                        {exp?.responsibility && (
                          <ul className="mt-2 pl-5 list-disc text-sm text-gray-700 space-y-1">
                            {exp.responsibility.map((t, k) => (
                              <li key={k}>{t}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              <Section title="Education">
                {cvData.educations.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {cvData.educations.map((edu, i) => (
                      <div key={i}>
                        <div className="text-base font-semibold text-gray-900 break-words">
                          {edu?.level}
                        </div>
                        <div className="text-sm italic text-gray-600 break-words">
                          {edu?.college} | {edu?.dates}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              {cvData.referees.length > 0 && (
                <Section title="Referees">
                  <div className="flex flex-col gap-3">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                      >
                        <strong className="block break-words">
                          {r?.fullName}
                        </strong>
                        <div className="text-gray-600 text-sm break-words">
                          {r?.position}
                        </div>
                        <div className="text-sm break-words">{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm break-words">{r?.email}</div>
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
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6 bg-slate-50 border-l-4 border-red-600 rounded-lg shadow-sm p-6">
      <h5 className="uppercase mb-4 font-bold tracking-[2px] text-red-600 border-b border-black/10 pb-2 text-[1.1rem]">
        {title}
      </h5>
      {children}
    </div>
  );
}
