import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const Template1 = () => {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const CV_BASE = "https://api.ekazi.co.tz";
  const BRAND = "#1756a5";
  const BRAND_DARK = "#0e3668";

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
    <div className="mx-auto grid grid-cols-1">
      <div className="grid grid-cols-12 text-start">
        {/* LEFT */}
        <div className="col-span-8 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-2">
            <h1
              className="font-bold text-2xl uppercase mb-1"
              style={{ color: BRAND_DARK }}
            >
              {cvData.fullName}
            </h1>
            <div className="text-gray-500 text-sm">
              {cvData.current_position}
            </div>
          </div>

          {/* About */}
          <section className="mb-2">
            <h2
              className="font-semibold text-lg uppercase mb-1"
              style={{ color: BRAND }}
            >
              About
            </h2>
            <p className="text-sm leading-relaxed">{cvData.summary}</p>
          </section>

          {/* Career Objective */}
          {payload?.objective?.objective && (
            <section className="mb-2">
              <h2
                className="font-semibold text-lg uppercase mb-1"
                style={{ color: BRAND }}
              >
                Career Objective
              </h2>
              <p className="text-sm leading-relaxed">
                {payload.objective.objective}
              </p>
            </section>
          )}

          {/* Experience */}
          <section className="mb-2">
            <h2
              className="text-lg font-semibold uppercase mb-1"
              style={{ color: BRAND }}
            >
              Job Experience
            </h2>

            {cvData.experiences?.map((exp, i) => (
              <div key={i} className="mb-1">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="font-bold capitalize"
                      style={{ color: BRAND_DARK }}
                    >
                      {exp.position}
                    </div>
                    <span className="self-start border px-2 py-0.5 text-xs rounded bg-gray-100">
                      {exp.dates}
                    </span>
                  </div>

                  <div>
                    <div className="text-gray-500 text-sm">
                      {exp.organization} / {exp.industry}
                    </div>
                    <div className="text-gray-400 text-xs">{exp.location}</div>
                  </div>
                </div>

                {exp.responsibility && (
                  <ul className="mt-2 ml-4 list-disc text-xs text-gray-600 space-y-1">
                    {exp.responsibility.map((r, k) => (
                      <li key={k}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-2">
            <h2
              className="font-semibold text-lg uppercase mb-1"
              style={{ color: BRAND }}
            >
              Skills & Endorsements
            </h2>

            {[
              ["Culture Fit", cvData.cultures],
              ["Personality", cvData.personalities],
              ["Software", cvData.softwares],
              ["Skills & Knowledge", cvData.knowledges],
              ["Tools", cvData.tools],
            ].map(([label, items], i) => (
              <div key={i} className="flex gap-3 mb-1 text-sm">
                <span className="font-semibold min-w-27.5">{label}:</span>
                <span className="capitalize">
                  {items
                    ?.map((i) => i?.name)
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT */}
        <div className="col-span-4 bg-gray-900 text-gray-100 p-6">
          {/* Photo */}
          <div className="flex justify-start mb-4">
            <img
              src={
                cvData.profile?.picture
                  ? `${CV_BASE}/${cvData.profile.picture}`
                  : "https://placehold.co/120x120?text=Photo"
              }
              alt="profile"
              className="border-4 border-white rounded object-cover"
              width={100}
              height={100}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x120?text=Photo")
              }
            />
          </div>

          {/* Language */}
          <section className="mb-2 text-sm">
            <h2 className="uppercase text-lg font-bold border-b border-white/25 pb-1 mb-1">
              Language
            </h2>
            <ul className="list-disc">
              {cvData.languages?.map((l, i) => (
                <li key={i} className="capitalize">
                  {l?.name}
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-2 text-sm">
            <h2 className="uppercase text-lg font-bold border-b border-white/25 pb-1 mb-1">
              Contact Me
            </h2>
            <ul className="space-y-1">
              <li>{cvData.phone}</li>
              <li>{cvData.email}</li>
              <li>{cvData.location}</li>
            </ul>
          </section>

          {/* Education */}
          <section className="mb-2 text-sm">
            <h2 className="uppercase text-lg font-bold border-b border-white/25 pb-1 mb-1">
              Education
            </h2>
            <ul className="list-disc">
              {cvData.educations?.map((edu, i) => (
                <li key={i} className="mt-1">
                  <strong>{edu.course}</strong>
                  <br />
                  {edu.college}
                  <span className="text-gray-400"> ({edu.dates})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Referees */}
          <section className="mb-2 text-sm">
            <h2 className="uppercase text-lg font-bold border-b border-white/25 pb-1 mb-1">
              Referees
            </h2>
            {cvData.referees?.map((r, i) => (
              <div key={i} className="mb-1">
                <div className="font-semibold">{r.fullName}</div>
                <div className="text-sm italic">{r.position}</div>
                <div className="text-sm">{r.company}</div>
                <div className="text-sm">{r.email}</div>
                <div className="text-sm">{r.phone}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1;
