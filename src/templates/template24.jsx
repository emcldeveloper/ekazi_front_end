import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBook,
  FiUser,
} from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template24() {
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
    <div className="text-start mx-auto bg-white p-[5mm] box-border font-['Noto_Sans'] text-gray-900 shadow-[0_0_5px_rgba(0,0,0,0.2)]">
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[287mm] overflow-hidden rounded-2xl bg-white">
        <div className="relative bg-sky-600 text-white px-8 pt-12 pb-20">
          <h1 className="text-[2.6rem] font-bold mb-2 break-words">
            {cvData.fullName}
          </h1>
          <div className="text-[1.2rem] opacity-90 break-words">
            {cvData.current_position}
          </div>
          <p className="mt-4 mb-0 max-w-[70%] text-base leading-relaxed break-words">
            {cvData.summary}
          </p>
          <img
            src={
              cvData.profile?.picture
                ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                : "https://placehold.co/160x160?text=Photo"
            }
            alt="profile"
            className="absolute right-8 top-[70%] w-[160px] h-[160px] rounded-full object-cover border-[5px] border-white shadow-[0_6px_18px_rgba(0,0,0,.3)]"
            onError={(e) =>
              (e.currentTarget.src = "https://placehold.co/160x160?text=Photo")
            }
          />
        </div>

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-4">
              <Section title="Contact" icon={<FiUser />}>
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <FiPhone className="mt-1 shrink-0 text-sky-600" />
                    <span className="break-words">{cvData.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMail className="mt-1 shrink-0 text-sky-600" />
                    <span className="break-words">{cvData.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiMapPin className="mt-1 shrink-0 text-sky-600" />
                    <span className="break-words">{cvData.location}</span>
                  </div>
                  {payload?.user?.[0]?.website ? (
                    <div className="flex items-start gap-2">
                      <FiGlobe className="mt-1 shrink-0 text-sky-600" />
                      <span className="break-words">
                        {payload?.user?.[0]?.website}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Section>

              <Section title="Skills" icon={<FiBriefcase />}>
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges.map((k, i) => (
                    <span
                      key={`k-${i}`}
                      className="rounded-full border border-sky-600/20 bg-sky-600/10 px-3 py-1 text-xs font-semibold text-sky-700 capitalize"
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

              {cvData.languages && (
                <Section title="Languages" icon={<FiGlobe />}>
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-sky-600/15 bg-sky-600/5 px-3 py-1 text-xs font-semibold text-sky-700 capitalize"
                      >
                        {l?.name}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {cvData.cultures && (
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
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <Section title="Experience" icon={<FiBriefcase />}>
                {cvData.experiences &&
                  cvData.experiences.map((exp, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-sky-600 pl-4 mb-6"
                    >
                      <div className="font-semibold text-sky-700 break-words">
                        {exp?.position}
                      </div>
                      <div className="text-sm text-gray-600 italic break-words">
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
              </Section>

              <Section title="Education" icon={<FiBook />}>
                {cvData.educations &&
                  cvData.educations.map((edu, i) => (
                    <div
                      key={i}
                      className="border-l-4 border-sky-600 pl-4 mb-6"
                    >
                      <div className="font-semibold text-sky-700 break-words">
                        {edu?.level}
                      </div>
                      <div className="text-sm text-gray-600 italic break-words">
                        {edu?.college} | {edu?.dates}
                      </div>
                    </div>
                  ))}
              </Section>

              {cvData.referees && (
                <Section title="Referees">
                  <div className="flex flex-wrap gap-4">
                    {cvData.referees.map((r, i) => (
                      <div
                        key={i}
                        className="w-full md:w-[calc(50%-0.5rem)] border border-l-4 border-sky-600 bg-slate-50 p-4"
                      >
                        <strong className="block break-words">
                          {r?.fullName}
                        </strong>
                        <div className="text-gray-500 text-sm break-words">
                          {r?.position}
                        </div>
                        <div className="break-words">{r?.company}</div>
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

function Section({ title, children, icon }) {
  return (
    <div className="mb-8">
      <h5 className="flex items-center gap-2 mb-4 font-bold uppercase tracking-wide text-sky-700">
        {icon} {title}
      </h5>
      {children}
    </div>
  );
}
