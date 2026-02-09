import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const PLAIN_TAGS = new Set(["english and swahili", "multiculture"]);
const isPlainTag = (value) =>
  PLAIN_TAGS.has(
    String(value ?? "")
      .trim()
      .toLowerCase(),
  );

export default function Template10() {
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
      <div className="w-full min-h-[277mm] rounded-[14px] overflow-hidden shadow-[0_8px_22px_rgba(0,0,0,.10)]">
        {/* Banner */}
        <div className="py-4 bg-orange-500 text-white">
          <div className="px-6 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="mb-1 text-2xl font-bold">{cvData.fullName}</h2>
              <h5 className="mb-0 text-lg font-light">
                {cvData.current_position}
              </h5>

              <div className="mt-3 flex flex-wrap gap-4 text-sm leading-tight opacity-95">
                <div className="inline-flex items-center gap-2 min-w-0 max-w-full whitespace-nowrap">
                  <FiPhone className="shrink-0" />
                  <span className="truncate">{cvData.phone}</span>
                </div>

                <div className="inline-flex items-center gap-2 min-w-0 max-w-full whitespace-nowrap">
                  <FiMail className="shrink-0" />
                  <span className="truncate max-w-[260px]">{cvData.email}</span>
                </div>

                <div className="inline-flex items-center gap-2 min-w-0 max-w-full whitespace-nowrap">
                  <FiMapPin className="shrink-0" />
                  <span className="truncate">{cvData.location}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex justify-end">
              <img
                className="w-[108px] h-[108px] rounded-full object-cover border-[3px] border-white/95 shadow-[0_4px_14px_rgba(0,0,0,.18)] bg-white/20"
                src={
                  cvData.profile?.picture
                    ? `${cvUrl}/${cvData.profile.picture}`
                    : "https://placehold.co/200x200?text=Photo"
                }
                alt="profile"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/200x200?text=Photo")
                }
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-4">
              <div className="rounded-xl bg-white shadow-sm">
                <div className="px-4 py-3">
                  <h5 className="font-bold mb-3">About Me</h5>
                  <p className="text-sm text-gray-700 text-justify mb-0">
                    {cvData.summary}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white shadow-sm">
                <div className="px-4 py-3">
                  <h5 className="font-bold mb-3">Languages</h5>
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages?.map((txt, i) =>
                      isPlainTag(txt?.name) ? (
                        <span key={i} className="text-sm leading-tight">
                          {txt?.name}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex max-w-full rounded-full bg-orange-500 px-3 py-1 text-sm leading-tight text-white whitespace-normal break-words text-left"
                        >
                          {txt?.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white shadow-sm">
                <div className="px-4 py-3">
                  <h5 className="font-bold mb-3">Skills & Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {cvData.knowledges?.map((txt, i) =>
                      isPlainTag(txt?.name) ? (
                        <span key={i} className="text-sm leading-tight">
                          {txt?.name}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex max-w-full rounded-full bg-slate-600 px-3 py-1 text-sm leading-tight text-white whitespace-normal break-words text-left"
                        >
                          {txt?.name}
                        </span>
                      ),
                    )}
                    {cvData.softwares?.map((txt, i) =>
                      isPlainTag(txt?.name) ? (
                        <span key={i} className="text-sm leading-tight">
                          {txt?.name}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex max-w-full rounded-full bg-gray-900 px-3 py-1 text-sm leading-tight text-white whitespace-normal break-words text-left"
                        >
                          {txt?.name}
                        </span>
                      ),
                    )}
                    {cvData.cultures?.map((txt, i) =>
                      isPlainTag(txt?.name) ? (
                        <span key={i} className="text-sm leading-tight">
                          {txt?.name}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex max-w-full rounded-full bg-orange-500 px-3 py-1 text-sm leading-tight text-white whitespace-normal break-words text-left"
                        >
                          {txt?.name}
                        </span>
                      ),
                    )}
                    {cvData.personalities?.map((txt, i) =>
                      isPlainTag(txt?.name) ? (
                        <span key={i} className="text-sm leading-tight">
                          {txt?.name}
                        </span>
                      ) : (
                        <span
                          key={i}
                          className="inline-flex max-w-full rounded-full bg-sky-200 px-3 py-1 text-sm leading-tight text-sky-900 whitespace-normal break-words text-left"
                        >
                          {txt?.name}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <SectionCard title="Experience">
                {cvData.experiences?.map((exp, i) => (
                  <div
                    key={i}
                    className="mb-3 rounded-xl bg-white shadow-sm border-l-[5px] border-orange-500"
                  >
                    <div className="px-4 py-3">
                      <div className="font-semibold">
                        {exp?.position}
                        <span className="text-gray-500">
                          {" "}
                          @ {exp.organization}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {exp.dates}
                      </div>
                      <ul className="mb-0 text-sm list-disc pl-5">
                        {exp.responsibility?.map((t, k) => (
                          <li key={k}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </SectionCard>

              <SectionCard title="Education">
                {cvData.educations?.map((edu, i) => (
                  <div
                    key={i}
                    className="mb-3 rounded-xl bg-white shadow-sm border-l-[5px] border-orange-500"
                  >
                    <div className="px-4 py-3">
                      <div className="font-semibold">{edu?.level}</div>
                      <div>{edu?.college}</div>
                      <div className="text-gray-500 text-sm">{edu.dates}</div>
                    </div>
                  </div>
                ))}
              </SectionCard>

              {cvData.referees?.length ? (
                <SectionCard title="Referees">
                  {cvData.referees.map((r, i) => (
                    <div
                      key={r.id ?? i}
                      className="mb-3 rounded-xl bg-white shadow-sm border-l-[5px] border-orange-500"
                    >
                      <div className="px-4 py-3">
                        <div className="font-semibold">{r.fullName}</div>
                        <div className="text-gray-500">{r?.position}</div>
                        <div>{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm">{r?.email}</div>
                      </div>
                    </div>
                  ))}
                </SectionCard>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="mb-4">
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      {children}
    </div>
  );
}
