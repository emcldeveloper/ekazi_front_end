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

export default function Template25() {
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
    <div className="text-start mx-auto bg-white p-[5mm] font-['Noto_Sans'] shadow-[0_0_5px_rgba(0,0,0,0.2)] text-[#111827]">
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[calc(297mm-10mm)] bg-[#F7FAFC] rounded-[0.3rem] overflow-hidden">
        <div className="relative border-b border-[rgba(17,24,39,0.08)] px-[1.8rem] pt-[1.6rem] pb-[1.2rem] bg-[radial-gradient(900px_260px_at_10%_0%,_rgba(11,114,133,0.2),_transparent_55%),radial-gradient(850px_260px_at_95%_10%,_rgba(132,94,247,0.16),_transparent_60%),linear-gradient(135deg,rgba(255,255,255,1),rgba(255,255,255,1))]">
          <div className="flex gap-4 items-center">
            <div className="min-w-0 min-[992px]:flex-[1.6]">
              <h1 className="m-0 text-[2.25rem] font-extrabold leading-[1.05] tracking-[0.2px]">
                {cvData.fullName}
              </h1>
              <div className="mt-[0.35rem] font-bold text-[#6B7280]">
                {cvData.current_position}
              </div>
              <div className="mt-3 h-[6px] w-[150px] rounded-full bg-gradient-to-r from-[#0B7285] to-[#845EF7]" />
            </div>

            <div className="mt-[0.8rem] flex items-center justify-start min-[992px]:mt-0 min-[992px]:flex-[0.9] min-[992px]:justify-end">
              <div className="h-[150px] w-[150px] rounded-full bg-gradient-to-br from-[#0B7285] to-[#845EF7] p-[5px] shadow-[0_14px_28px_rgba(17,24,39,0.14)]">
                <img
                  src={
                    cvData.profile?.picture
                      ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                      : "https://placehold.co/160x160?text=Photo"
                  }
                  alt="profile"
                  className="block h-full w-full rounded-full border-[5px] border-white bg-white object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/160x160?text=Photo")
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div
              className="min-w-0 flex-1 rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-white px-[0.8rem] py-[0.7rem] shadow-[0_8px_18px_rgba(17,24,39,0.06)]"
              title={cvData.phone || ""}
            >
              <div className="flex items-center gap-2 text-[0.85rem] font-extrabold uppercase tracking-[0.04em] text-[#111827]">
                <FiPhone className="text-[#0B7285]" /> Phone
              </div>
              <div className="mt-[0.35rem] truncate text-[0.92rem] text-[#111827]">
                {cvData.phone}
              </div>
            </div>
            <div
              className="min-w-0 flex-1 rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-white px-[0.8rem] py-[0.7rem] shadow-[0_8px_18px_rgba(17,24,39,0.06)]"
              title={cvData.email || ""}
            >
              <div className="flex items-center gap-2 text-[0.85rem] font-extrabold uppercase tracking-[0.04em] text-[#111827]">
                <FiMail className="text-[#0B7285]" /> Email
              </div>
              <div className="mt-[0.35rem] truncate text-[0.92rem] text-[#111827]">
                {cvData.email}
              </div>
            </div>
            <div
              className="min-w-0 flex-1 rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-white px-[0.8rem] py-[0.7rem] shadow-[0_8px_18px_rgba(17,24,39,0.06)]"
              title={cvData.location || ""}
            >
              <div className="flex items-center gap-2 text-[0.85rem] font-extrabold uppercase tracking-[0.04em] text-[#111827]">
                <FiMapPin className="text-[#0B7285]" /> Location
              </div>
              <div className="mt-[0.35rem] truncate text-[0.92rem] text-[#111827]">
                {cvData.location}
              </div>
            </div>
          </div>
        </div>

        <div className="px-[1.2rem] pt-[1.15rem] pb-[1.25rem]">
          <div className="grid grid-cols-12 gap-4 items-start">
            {/* LEFT */}
            <div className="col-span-4 flex flex-col gap-4">
              <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                  <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                    <FiUser className="text-[#0B7285]" /> Profile
                  </h5>
                </div>
                <div className="px-4 pt-[0.95rem] pb-4">
                  <p className="m-0 text-[0.94rem] leading-[1.6] text-[#111827] text-justify">
                    {cvData.summary}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                  <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                    <FiBriefcase className="text-[#0B7285]" /> Skills
                  </h5>
                </div>
                <div className="px-4 pt-[0.95rem] pb-4">
                  {cvData.knowledges?.map((k, i) => (
                    <span
                      key={`k-${i}`}
                      className="mr-[0.22rem] mt-[0.22rem] inline-block max-w-full whitespace-normal break-words text-left text-[0.82rem] font-extrabold leading-[1.2] text-[#0B7285] bg-[rgba(11,114,133,0.10)] border border-[rgba(11,114,133,0.22)] rounded-full px-[0.78rem] py-[0.38rem]"
                    >
                      {typeof k === "string" ? k : k?.name}
                    </span>
                  ))}
                  {cvData.softwares?.map((s, i) => (
                    <span
                      key={`s-${i}`}
                      className="mr-[0.22rem] mt-[0.22rem] inline-block max-w-full whitespace-normal break-words text-left text-[0.82rem] font-extrabold leading-[1.2] text-[#845EF7] bg-[rgba(132,94,247,0.10)] border border-[rgba(132,94,247,0.22)] rounded-full px-[0.78rem] py-[0.38rem]"
                    >
                      {typeof s === "string" ? s : s?.name}
                    </span>
                  ))}
                </div>
              </div>

              {cvData.languages?.length > 0 && (
                <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                    <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                      <FiGlobe className="text-[#0B7285]" /> Languages
                    </h5>
                  </div>
                  <div className="px-4 pt-[0.95rem] pb-4">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="mr-[0.22rem] mt-[0.22rem] inline-block max-w-full whitespace-normal break-words text-left text-[0.82rem] font-extrabold leading-[1.2] text-[#845EF7] bg-[rgba(132,94,247,0.10)] border border-[rgba(132,94,247,0.22)] rounded-full px-[0.78rem] py-[0.38rem]"
                      >
                        {typeof l === "string" ? l : l?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(cvData.cultures?.length > 0 ||
                cvData.personalities?.length > 0) && (
                <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                    <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                      Culture &amp; Personality
                    </h5>
                  </div>
                  <div className="px-4 pt-[0.95rem] pb-4">
                    {cvData.cultures?.map((c, i) => (
                      <span
                        key={`c-${i}`}
                        className="mr-[0.22rem] mt-[0.22rem] inline-block max-w-full whitespace-normal break-words text-left text-[0.82rem] font-extrabold leading-[1.2] text-[#0B7285] bg-[rgba(11,114,133,0.10)] border border-[rgba(11,114,133,0.22)] rounded-full px-[0.78rem] py-[0.38rem]"
                      >
                        {typeof c === "string" ? c : c?.name}
                      </span>
                    ))}
                    {cvData.personalities?.map((p, i) => (
                      <span
                        key={`p-${i}`}
                        className="mr-[0.22rem] mt-[0.22rem] inline-block max-w-full whitespace-normal break-words text-left text-[0.82rem] font-extrabold leading-[1.2] text-[#845EF7] bg-[rgba(132,94,247,0.10)] border border-[rgba(132,94,247,0.22)] rounded-full px-[0.78rem] py-[0.38rem]"
                      >
                        {typeof p === "string" ? p : p?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="col-span-8 flex flex-col gap-4">
              <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                  <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                    <FiBriefcase className="text-[#0B7285]" /> Experience
                  </h5>
                </div>
                <div className="px-4 pt-[0.95rem] pb-4">
                  {cvData.experiences?.length ? (
                    <div className="space-y-3">
                      {cvData.experiences.map((exp, i) => {
                        return (
                          <div
                            key={i}
                            className="relative rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-[0.95rem] shadow-[0_8px_18px_rgba(17,24,39,0.05)]"
                          >
                            <div className="absolute left-0 top-0 h-full w-[6px] rounded-l-[14px] bg-gradient-to-b from-[#0B7285] to-[#845EF7]" />
                            <div className="pl-[0.55rem]">
                              <div className="flex flex-wrap items-start justify-between gap-[0.8rem]">
                                <div className="min-w-0">
                                  <div className="m-0 font-black text-[#111827]">
                                    {exp?.position}
                                  </div>
                                  <div className="mt-[0.15rem] text-[0.88rem] italic text-[#6B7280]">
                                    {exp?.organization}
                                  </div>
                                </div>
                                <div className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#0B7285] to-[#845EF7] px-[0.6rem] py-[0.28rem] text-[0.78rem] font-black text-white">
                                  {exp?.dates}
                                </div>
                              </div>

                              {exp?.responsibility && (
                                <ul className="mt-[0.55rem] mb-0 list-disc space-y-1 pl-[1.05rem] text-[0.9rem] text-[#111827]">
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
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                  <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                    <FiBook className="text-[#0B7285]" /> Education
                  </h5>
                </div>
                <div className="px-4 pt-[0.95rem] pb-4">
                  {cvData.educations?.length ? (
                    <div className="space-y-3">
                      {cvData.educations.map((edu, i) => (
                        <div
                          key={i}
                          className="relative rounded-[14px] border border-[rgba(17,24,39,0.08)] bg-white px-4 py-[0.95rem] shadow-[0_8px_18px_rgba(17,24,39,0.05)]"
                        >
                          <div className="absolute left-0 top-0 h-full w-[6px] rounded-l-[14px] bg-gradient-to-b from-[#0B7285] to-[#845EF7]" />
                          <div className="pl-[0.55rem]">
                            <div className="flex flex-wrap items-start justify-between gap-[0.8rem]">
                              <div className="min-w-0">
                                <div className="m-0 font-black text-[#111827]">
                                  {edu?.level || edu?.degree}
                                </div>
                                <div className="mt-[0.15rem] text-[0.88rem] italic text-[#6B7280]">
                                  {edu?.college || edu?.institution}
                                </div>
                              </div>
                              <div className="whitespace-nowrap rounded-full bg-gradient-to-r from-[#0B7285] to-[#845EF7] px-[0.6rem] py-[0.28rem] text-[0.78rem] font-black text-white">
                                {edu?.dates}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {cvData.referees?.length > 0 && (
                <div className="overflow-hidden rounded-[16px] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_10px_22px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[linear-gradient(90deg,rgba(11,114,133,0.10),rgba(132,94,247,0.08))] px-4 py-[0.8rem]">
                    <h5 className="m-0 flex items-center gap-2 text-[0.92rem] font-black uppercase tracking-[0.12em] text-[#111827]">
                      Referees
                    </h5>
                  </div>
                  <div className="px-4 pt-[0.95rem] pb-4">
                    <div className="flex flex-col gap-3 min-[992px]:flex-row min-[992px]:flex-wrap">
                      {cvData.referees.map((r, i) => (
                        <div
                          key={i}
                          className="w-full rounded-[14px] border border-[rgba(17,24,39,0.10)] bg-white px-[0.9rem] py-[0.85rem] shadow-[0_6px_16px_rgba(17,24,39,0.05)] min-[992px]:max-w-[calc(50%-0.375rem)] min-[992px]:basis-[calc(50%-0.375rem)]"
                        >
                          <strong className="text-[#111827]">
                            {r?.fullName}
                          </strong>
                          <div className="text-[0.86rem] text-[#6B7280]">
                            {r?.position}
                          </div>
                          <div className="text-[0.86rem]">{r?.company}</div>
                          <div className="mt-2 text-[0.86rem]">{r?.phone}</div>
                          <div className="text-[0.86rem]">{r?.email}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
