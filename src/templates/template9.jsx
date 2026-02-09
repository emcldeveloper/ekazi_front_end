import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template9() {
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
    <div className="mx-auto text-start">
      <div>
        <div className="">
          {/* ===== Header ===== */}
          <div
            className="text-white"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #f59e0b)",
            }}
          >
            <div className="flex items-center p-4 gap-4">
              <div className="text-start">
                <img
                  src={
                    cvData.profile?.picture
                      ? `${cvUrl}/${cvData.profile.picture}`
                      : "https://placehold.co/200x200?text=Photo"
                  }
                  alt="profile"
                  className="h-40 rounded-full border-[3px] border-white object-cover mx-auto md:mx-0"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/200x200?text=Photo")
                  }
                />
              </div>

              <div>
                <h1 className="font-bold mb-0 text-[2.5rem] leading-[1.1]">
                  {cvData.fullName}
                </h1>
                <h5 className="font-medium opacity-75 text-[1.25rem] mt-1">
                  {cvData.current_position}
                </h5>

                <div className="mt-2 flex flex-wrap justify-start gap-2 text-sm opacity-85">
                  <span className="whitespace-nowrap">{cvData.location}</span>
                  <span>|</span>
                  <span className="whitespace-nowrap">{cvData.phone}</span>
                  <span>|</span>
                  <span className="whitespace-nowrap">{cvData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Body ===== */}
          <div className="grid grid-cols-12 gap-4 p-4">
            {/* LEFT */}
            <div className="col-span-4">
              <Section title="Profile">{cvData.summary}</Section>

              <Section title="Languages">
                {cvData.languages &&
                  cvData.languages.map((txt, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 mb-1 capitalize px-2 py-1 text-xs rounded bg-gray-600 text-white"
                    >
                      {txt.name}
                    </span>
                  ))}
              </Section>

              <Section title="Skills">
                {cvData.knowledges &&
                  cvData.knowledges.map((txt, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 mb-1 capitalize px-2 py-1 text-xs rounded bg-sky-500 text-white"
                    >
                      {txt.name}
                    </span>
                  ))}
              </Section>

              <Section title="Software">
                {cvData.softwares &&
                  cvData.softwares.map((txt, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 mb-1 capitalize px-2 py-1 text-xs rounded bg-gray-50 text-gray-900 border border-gray-300"
                    >
                      {txt.name}
                    </span>
                  ))}
              </Section>

              <Section title="Culture">
                {cvData.cultures &&
                  cvData.cultures.map((txt, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 mb-1 capitalize px-2 py-1 text-xs rounded bg-amber-400 text-white"
                    >
                      {txt.name}
                    </span>
                  ))}
              </Section>

              <Section title="Personality">
                {cvData.personalities &&
                  cvData.personalities.map((txt, i) => (
                    <span
                      key={i}
                      className="inline-block mr-1 mb-1 capitalize px-2 py-1 text-xs rounded bg-gray-900 text-white"
                    >
                      {txt.name}
                    </span>
                  ))}
              </Section>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <Section title="Experience">
                {cvData.experiences &&
                  cvData.experiences.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <h6 className="font-normal mb-0 text-base">
                        {exp?.position}
                        <span className="text-gray-500">
                          {" | " + exp.organization}
                        </span>
                      </h6>
                      <div className="text-gray-500 text-sm mb-2">
                        {exp.dates}
                      </div>
                      {exp?.responsibility && (
                        <ul className="list-disc pl-4">
                          {exp.responsibility.map((t, k) => (
                            <li key={k}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </Section>

              <Section title="Education">
                {cvData.educations &&
                  cvData.educations.map((edu, i) => (
                    <div key={i} className="mb-3">
                      <div className="font-normal">{edu?.level}</div>
                      <div>{edu?.college}</div>
                      <div className="text-gray-500 text-sm">{edu.dates}</div>
                    </div>
                  ))}
              </Section>

              {cvData.referees && (
                <Section title="Referees">
                  <div className="flex flex-wrap gap-3">
                    {cvData.referees.map((r, i) => {
                      return (
                        <div
                          key={r.id ?? i}
                          className="w-full md:w-[calc(50%-0.75rem)] h-full border p-3"
                        >
                          <h6 className="font-normal text-base">
                            {r.fullName}
                          </h6>
                          <div className="text-gray-500 text-sm">
                            {r?.position}
                          </div>
                          <div className="text-sm">{r?.company}</div>
                          <div className="text-sm">{r?.phone}</div>
                          <div className="text-sm">{r?.email}</div>
                        </div>
                      );
                    })}
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
    <div className="mb-3">
      <div className="font-bold uppercase mb-2 text-[1.25rem] tracking-[.02em]">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
