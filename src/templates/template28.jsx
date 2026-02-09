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

export default function Template28() {
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
    <div className="text-start mx-auto bg-white p-[5mm] font-['Inter'] text-[#1f2a33] shadow-[0_0_5px_rgba(0,0,0,0.2)]">
      <link
        href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[calc(297mm-10mm)] rounded-[0.3rem] bg-[#f6f8f9] overflow-hidden">
        <div className="flex flex-col justify-center items-center rounded-bl-[80px] rounded-br-[80px] bg-[linear-gradient(135deg,#146990,#0f4d5d)] px-8 pb-[6rem] pt-[4rem] text-center text-white">
          <div>
            <img
              src={
                cvData.profile?.picture
                  ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                  : "https://placehold.co/160x160?text=Photo"
              }
              alt="profile"
              className="mb-4 h-[160px] w-[160px] rounded-full border-[6px] border-[#d4af37] bg-[#eee] object-cover shadow-[0_6px_20px_rgba(0,0,0,0.3)]"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/160x160?text=Photo")
              }
            />
          </div>
          <div className="font-['Zilla_Slab'] text-[2.8rem] font-bold">
            {cvData.fullName}
          </div>
          <div className="mb-4 text-[1.2rem] opacity-90">
            {cvData.current_position}
          </div>
          <p className="mx-auto max-w-[650px] text-[1rem] opacity-95">
            {cvData.summary}
          </p>
        </div>

        <div className="relative -mt-4 pt-[1.75rem]">
          <div className="grid grid-cols-12 gap-6 px-4">
            {/* LEFT */}
            <div className="col-span-12 md:col-span-4">
              <div className="mt-3 rounded-[20px] bg-white p-8 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                  <h4 className="mb-4 border-b-2 border-[#d4af37] pb-[0.3rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                    Contact
                  </h4>

                  <div className="mt-[2px] flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[10px] border border-[rgba(20,105,144,0.25)] bg-[rgba(20,105,144,0.08)] text-[#146990]">
                        <FiPhone />
                      </span>
                      <div className="text-[0.85rem] leading-[1.2] text-[#1f2a33] break-words">
                        {cvData.phone}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[10px] border border-[rgba(20,105,144,0.25)] bg-[rgba(20,105,144,0.08)] text-[#146990]">
                        <FiMail />
                      </span>
                      <div className="text-[0.85rem] leading-[1.2] text-[#1f2a33] break-words">
                        {cvData.email}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[10px] border border-[rgba(20,105,144,0.25)] bg-[rgba(20,105,144,0.08)] text-[#146990]">
                        <FiMapPin />
                      </span>
                      <div className="text-[0.85rem] leading-[1.2] text-[#1f2a33] break-words">
                        {cvData.location}
                      </div>
                    </div>

                    {payload?.user?.[0]?.website && (
                      <div className="flex flex-col gap-1.5">
                        <span className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[10px] border border-[rgba(20,105,144,0.25)] bg-[rgba(20,105,144,0.08)] text-[#146990]">
                          <FiGlobe />
                        </span>
                        <div className="text-[0.85rem] leading-[1.2] text-[#1f2a33] break-words">
                          {payload?.user?.[0]?.website}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="mb-4 border-b-2 border-[#d4af37] pb-[0.3rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                    Skills
                  </h4>
                  <div className="flex flex-wrap">
                    {cvData.knowledges?.map((k, i) => (
                      <span
                        key={i}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-[8px] bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {k?.name}
                      </span>
                    ))}
                    {cvData.softwares?.map((s, i) => (
                      <span
                        key={i}
                        className="m-1 inline-block max-w-full whitespace-normal break-words rounded-[8px] bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                      >
                        {s?.name}
                      </span>
                    ))}
                  </div>
                </div>

                {cvData.languages?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="mb-4 border-b-2 border-[#d4af37] pb-[0.3rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                      Languages
                    </h4>
                    <div className="flex flex-wrap">
                      {cvData.languages.map((l, i) => (
                        <span
                          key={i}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
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
                  <div className="mb-8">
                    <h4 className="mb-4 border-b-2 border-[#d4af37] pb-[0.3rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                      Culture &amp; Personality
                    </h4>
                    <div className="flex flex-wrap">
                      {cvData.cultures?.map((c, i) => (
                        <span
                          key={`c-${i}`}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                        >
                          {c?.name}
                        </span>
                      ))}
                      {cvData.personalities?.map((p, i) => (
                        <span
                          key={`p-${i}`}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                        >
                          {p?.name}
                        </span>
                      ))}
                      {cvData.tools?.map((t, i) => (
                        <span
                          key={`t-${i}`}
                          className="m-1 inline-block max-w-full whitespace-normal break-words rounded-full bg-[#146990] px-[0.8rem] py-[0.35rem] text-left text-[0.8rem] font-medium leading-[1.2] text-white"
                        >
                          {t?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-12 md:col-span-8 mt-[1.35rem]">
              <div className="mb-[0.9rem] flex items-center gap-2 border-b-2 border-[#d4af37] pb-[0.35rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                <FiBriefcase /> Experience
              </div>

              {cvData.experiences?.length
                ? cvData.experiences.map((exp, i) => {
                    return (
                      <div
                        key={i}
                        className="mb-6 rounded-[20px] border-l-[5px] border-[#146990] bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                      >
                        <div className="mb-1 text-[0.85rem] font-semibold text-[#146990]">
                          {exp?.dates}
                        </div>
                        <div className="text-[1rem] font-bold text-[#146990]">
                          {exp?.position}
                        </div>
                        <div className="mb-[6px] text-[0.9rem] italic text-[#6c7a84]">
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

              <div className="mb-[0.9rem] mt-[1.25rem] flex items-center gap-2 border-b-2 border-[#d4af37] pb-[0.35rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                <FiBookOpen /> Education
              </div>

              {cvData.educations?.length
                ? cvData.educations.map((edu, i) => (
                    <div
                      key={i}
                      className="mb-6 rounded-[20px] border-l-[5px] border-[#146990] bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                    >
                      <div className="mb-1 text-[0.85rem] font-semibold text-[#146990]">
                        {edu?.dates}
                      </div>
                      <div className="text-[1rem] font-bold text-[#146990]">
                        {edu?.level || edu?.degree}
                      </div>
                      <div className="mb-[6px] text-[0.9rem] italic text-[#6c7a84]">
                        {edu?.college || edu?.institution}
                      </div>
                    </div>
                  ))
                : null}

              {cvData.referees?.length > 0 && (
                <>
                  <div className="mb-[0.9rem] mt-[1.25rem] flex items-center gap-2 border-b-2 border-[#d4af37] pb-[0.35rem] font-['Zilla_Slab'] text-[1rem] font-bold text-[#146990]">
                    <FiUsers /> Referees
                  </div>

                  {cvData.referees.map((r, i) => (
                    <div
                      key={i}
                      className="mb-6 rounded-[20px] border-l-[5px] border-[#146990] bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
                    >
                      <div className="text-[1rem] font-bold text-[#146990]">
                        {r?.fullName}
                      </div>
                      <div className="mb-[6px] text-[0.9rem] italic text-[#6c7a84]">
                        {r?.position}
                      </div>
                      <div className="mb-1">{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
