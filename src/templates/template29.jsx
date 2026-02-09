import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template29() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="ml-3 text-gray-700">Loading CV...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[900px] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="text-start mx-auto bg-white p-[5mm] font-['Sofia_Sans'] text-[#222] shadow-[0_0_5px_rgba(0,0,0,0.2)]">
      <link
        href="https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[calc(297mm-10mm)] rounded-[0.3rem] bg-[#f7f9fa] overflow-hidden">
        <div className="border-l-[8px] border-[#13a4a6] bg-white px-8 py-12">
          <div className="flex gap-4 items-center">
            <div className="text-center md:basis-1/4">
              <img
                src={
                  cvData.profile?.picture
                    ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                    : "https://placehold.co/150x150?text=Photo"
                }
                alt="profile"
                className="h-[150px] w-[150px] rounded-full border-[5px] border-[#13a4a6] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/150x150?text=Photo")
                }
              />
            </div>
            <div className="md:basis-3/4">
              <div className="mb-[0.4rem] text-[2.4rem] font-bold text-[#13a4a6]">
                {cvData.fullName}
              </div>
              <div className="mb-4 text-[1.2rem] font-medium text-[#555]">
                {cvData.current_position}
              </div>
              <p className="text-[1rem] leading-[1.6] text-[#222]">
                {cvData.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-[0.9rem] text-[#555]">
                <span className="inline-flex items-center gap-1">
                  <FiPhone /> {cvData.phone}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiMail /> {cvData.email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiMapPin /> {cvData.location}
                </span>
                {payload?.user?.[0]?.website && (
                  <span className="inline-flex items-center gap-1">
                    <FiGlobe /> {payload?.user?.[0]?.website}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-8">
              <div className="mb-10">
                <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                  Experience
                </h4>
                {cvData.experiences?.length
                  ? cvData.experiences.map((exp, i) => {
                      return (
                        <div
                          key={i}
                          className="mb-[1.2rem] rounded-[6px] bg-white p-[1.2rem] shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                        >
                          <div className="mb-[0.2rem] text-[0.85rem] font-semibold text-[#13a4a6]">
                            {exp?.dates}
                          </div>
                          <div className="text-[1rem] font-semibold text-[#222]">
                            {exp?.position}
                          </div>
                          <div className="mb-[0.4rem] text-[0.9rem] text-[#555]">
                            {exp?.organization}
                          </div>
                          {exp?.responsibility && (
                            <ul className="list-disc space-y-1 pl-5 text-sm">
                              {(Array.isArray(exp.responsibility)
                                ? exp.responsibility
                                : String(exp.responsibility).split("\n")
                              )
                                .map((t) => t.trim())
                                .filter(Boolean)
                                .map((t, k) => (
                                  <li key={k}>{t}</li>
                                ))}
                            </ul>
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className="mb-10">
                <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                  Education
                </h4>
                {cvData.educations?.length
                  ? cvData.educations.map((edu, i) => (
                      <div
                        key={i}
                        className="mb-[1.2rem] rounded-[6px] bg-white p-[1.2rem] shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
                      >
                        <div className="mb-[0.2rem] text-[0.85rem] font-semibold text-[#13a4a6]">
                          {edu?.dates}
                        </div>
                        <div className="text-[1rem] font-semibold text-[#222]">
                          {edu?.level || edu?.degree}
                        </div>
                        <div className="mb-[0.4rem] text-[0.9rem] text-[#555]">
                          {edu?.college || edu?.institution}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-4">
              <div className="mb-10">
                <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                  Skills
                </h4>
                <div className="flex flex-wrap">
                  {cvData.knowledges?.map((k, i) => (
                    <span
                      key={i}
                      className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                    >
                      {k?.name}
                    </span>
                  ))}
                  {cvData.softwares?.map((s, i) => (
                    <span
                      key={i}
                      className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                    >
                      {s?.name}
                    </span>
                  ))}
                </div>
              </div>

              {cvData.languages?.length > 0 && (
                <div className="mb-10">
                  <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                    Languages
                  </h4>
                  <div className="flex flex-wrap">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {l?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(cvData.cultures?.length > 0 ||
                cvData.personalities?.length > 0 ||
                cvData.tools?.length > 0) && (
                <div className="mb-10">
                  <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                    Culture &amp; Personality
                  </h4>
                  <div className="flex flex-wrap">
                    {cvData.cultures?.map((c, i) => (
                      <span
                        key={`c-${i}`}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {c?.name}
                      </span>
                    ))}
                    {cvData.personalities?.map((p, i) => (
                      <span
                        key={`p-${i}`}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {p?.name}
                      </span>
                    ))}
                    {cvData.tools?.map((t, i) => (
                      <span
                        key={`t-${i}`}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#13a4a6] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {t?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cvData.referees?.length > 0 && (
                <div className="mb-10">
                  <h4 className="mb-4 border-b-2 border-[#13a4a6] pb-[0.3rem] text-[1.1rem] font-semibold uppercase">
                    Referees
                  </h4>
                  {cvData.referees.map((r, i) => (
                    <div
                      key={i}
                      className="mb-4 rounded-[6px] bg-white p-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
                    >
                      <strong>{r?.fullName}</strong>
                      <div className="text-[0.9rem] text-[#555]">
                        {r?.position}
                      </div>
                      <div>{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
