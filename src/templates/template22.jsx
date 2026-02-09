import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template22() {
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
    <div className="text-start mx-auto bg-white font-['Saira_Condensed'] text-gray-900 ">
      <link
        href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="rounded-2xl bg-white">
        <div
          className="text-white p-8"
          style={{
            background: "linear-gradient(to right, #670023cc, #3a0015)",
          }}
        >
          <div className="flex flex-nowrap flex-row gap-4 items-center">
            <div className="text-center">
              <img
                src={
                  cvData.profile?.picture
                    ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                    : "https://placehold.co/140x140?text=Photo"
                }
                alt="profile"
                className="w-[140px] h-[140px] rounded-full mb-3 border-[5px] border-white object-cover shadow-[0_4px_12px_rgba(0,0,0,.3)] mx-auto"
              />
            </div>

            <div className="flex-1">
              <div className="text-2xl font-bold">{cvData.fullName}</div>
              <div className="text-base opacity-90">
                {cvData.current_position}
              </div>
              <p className="mb-2">{cvData.summary}</p>

              <div className="flex items-center gap-2">
                <ContactItem icon={<FiPhone />} value={cvData.phone} />
                <ContactItem icon={<FiMail />} value={cvData.email} />
                <ContactItem icon={<FiMapPin />} value={cvData.location} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-8">
              <Section title="Experience">
                {cvData.experiences.length > 0 && (
                  <div className="relative pl-8 mt-2">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-rose-900/30" />
                    {cvData.experiences.map((exp, i) => (
                      <div
                        key={i}
                        className={
                          i !== cvData.experiences.length - 1
                            ? "relative pb-7"
                            : "relative"
                        }
                      >
                        <div className="absolute -left-5 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-900 ring-2 ring-white shadow-[0_4px_10px_rgba(0,0,0,.12)]" />

                        <div className="font-semibold text-gray-900 break-words leading-snug">
                          {exp?.position}
                        </div>
                        <div className="text-sm text-gray-600 break-words">
                          {exp?.organization}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {exp?.dates}
                        </div>

                        {exp?.responsibility && (
                          <ul className="mt-2 pl-5 list-disc text-sm leading-relaxed text-gray-700 space-y-1 marker:text-gray-300">
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
                  <div className="relative pl-8 mt-2">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-rose-900/30" />
                    {cvData.educations.map((edu, i) => (
                      <div
                        key={i}
                        className={
                          i !== cvData.educations.length - 1
                            ? "relative pb-7"
                            : "relative"
                        }
                      >
                        <div className="absolute -left-5 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-900 ring-2 ring-white shadow-[0_4px_10px_rgba(0,0,0,.12)]" />

                        <div className="font-semibold text-gray-900 break-words leading-snug">
                          {edu?.level}
                        </div>
                        <div className="text-sm text-gray-600 break-words">
                          {edu?.college}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {edu?.dates}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            </div>

            {/* RIGHT */}
            <div className="col-span-4">
              <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges.map((k, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-rose-900/25 bg-rose-900/10 px-3 py-1 text-xs font-semibold text-rose-900 capitalize"
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
                        className="rounded-full border border-rose-900/20 bg-rose-900/5 px-3 py-1 text-xs font-semibold text-rose-900 capitalize"
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

              {cvData.referees.length > 0 && (
                <Section title="Referees">
                  <div className="flex flex-col gap-3">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 bg-slate-50 p-3"
                      >
                        <strong className="block break-words">
                          {r?.fullName}
                        </strong>
                        <div className="text-gray-500 text-sm break-words">
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
    <div className="mb-6">
      <h5 className="font-bold mb-3 uppercase tracking-wider text-rose-900 border-b-2 border-rose-900 pb-1">
        {title}
      </h5>
      {children}
    </div>
  );
}

function ContactItem({ icon, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center rounded-lg w-8 h-8 bg-white/15 border border-white/25">
        {icon}
      </span>
      <span className="text-[.92rem] break-words">{value}</span>
    </div>
  );
}
