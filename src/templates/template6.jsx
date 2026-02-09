import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";

import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const Template6 = () => {
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
    <div className="mx-auto font-sans text-start text-gray-800">
      <div className="w-full min-h-[287mm] rounded-2xl overflow-hidden bg-slate-50">
        <div className="p-4 flex flex-col gap-4">
          {/* HEADER */}
          <div>
            <div className="shadow-sm rounded-2xl p-4 bg-white">
              <div className="flex items-center gap-4">
                <img
                  src={
                    cvData.profile?.picture
                      ? `${cvUrl}/${cvData.profile?.picture}`
                      : "https://placehold.co/140x140?text=Photo"
                  }
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/140x140?text=Photo")
                  }
                  alt="Profile"
                  className="w-[140px] h-[140px] rounded-full border-[6px] border-orange-700 object-cover shrink-0"
                />

                <div className="min-w-[240px] text-center md:text-left">
                  <div className="uppercase text-sm text-gray-500">
                    {cvData.current_position}
                  </div>
                  <h2 className="font-bold mb-1 text-[2rem] text-orange-700">
                    {cvData.fullName}
                  </h2>
                  <div className="h-[6px] w-[140px] bg-orange-700 rounded-[6px] mx-auto md:mx-0" />
                </div>
              </div>

              {/* CONTACT TILES (clean + single-line email) */}
              <div className="mt-3 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px] rounded-xl border border-orange-700/25 bg-orange-50 p-3 text-center">
                  <div className="mx-auto mb-1 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-orange-700/25 bg-orange-700/5 text-orange-700">
                    <FiPhone className="h-4 w-4" />
                  </div>
                  <div className="text-[0.9rem] text-gray-800 leading-tight">
                    {cvData.phone}
                  </div>
                </div>

                <div className="flex-1 min-w-[200px] rounded-xl border border-orange-700/25 bg-orange-50 p-3 text-center">
                  <div className="mx-auto mb-1 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-orange-700/25 bg-orange-700/5 text-orange-700">
                    <FiMail className="h-4 w-4" />
                  </div>
                  <div className="text-[0.9rem] text-gray-800 leading-tight whitespace-nowrap">
                    {cvData.email}
                  </div>
                </div>

                <div className="flex-1 min-w-[200px] rounded-xl border border-orange-700/25 bg-orange-50 p-3 text-center">
                  <div className="mx-auto mb-1 flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-orange-700/25 bg-orange-700/5 text-orange-700">
                    <FiMapPin className="h-4 w-4" />
                  </div>
                  <div className="text-[0.9rem] text-gray-800 leading-tight">
                    {cvData.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="col-span-4">
              <div className="shadow-sm rounded-2xl bg-white h-full">
                <div className="p-4">
                  <SectionTitle icon={FiUser}>About Me</SectionTitle>
                  <p className="text-gray-500 text-sm text-justify">
                    {cvData.summary}
                  </p>
                  <hr className="my-3 opacity-20" />

                  <SectionTitle icon={FiBookOpen}>
                    Skills & Profile
                  </SectionTitle>

                  {/* Culture Fit */}
                  <div className="mb-2 text-sm">
                    <div className="font-bold">Culture Fit</div>
                    {cvData.cultures &&
                      cvData.cultures.map((c, i) => (
                        <div key={i} className="text-gray-500 capitalize">
                          {c.name}
                        </div>
                      ))}
                  </div>

                  {/* Personality */}
                  <div className="mb-2 text-sm">
                    <div className="font-bold">Personality</div>
                    {cvData.personalities &&
                      cvData.personalities.map((p, i) => (
                        <div key={i} className="text-gray-500 capitalize">
                          {p?.name}
                        </div>
                      ))}
                  </div>

                  {/* Software (bullets) */}
                  <div className="mb-2 text-sm">
                    <div className="font-bold">Software</div>
                    {cvData.softwares && (
                      <ul className="pl-4 mt-1 text-gray-500 list-disc">
                        {cvData.softwares.map((s, i) => (
                          <li key={i} className="mb-1 leading-tight capitalize">
                            {s.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Skills (bullets) */}
                  <div className="mb-2 text-sm">
                    <div className="font-bold">Skills</div>
                    {cvData.knowledges && (
                      <ul className="pl-4 mt-1 text-gray-500 list-disc">
                        {cvData.knowledges.map((x, i) => (
                          <li key={i} className="mb-1 leading-tight capitalize">
                            {x?.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Tools (bullets) */}
                  <div className="text-sm">
                    <div className="font-bold">Tools</div>
                    {cvData.tools && (
                      <ul className="pl-4 mt-1 text-gray-500 list-disc">
                        {cvData.tools.map((x, i) => (
                          <li key={i} className="mb-1 leading-tight capitalize">
                            {x?.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <hr className="my-3 opacity-20" />

                  {/* Languages */}
                  <SectionTitle icon={FiGlobe}>Languages</SectionTitle>
                  <ul className="mb-0 text-sm pl-4 list-disc">
                    {cvData.languages &&
                      cvData.languages.map((language, i) => (
                        <li key={i} className="capitalize">
                          {language?.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-span-8">
              <div className="shadow-sm rounded-2xl bg-white h-full">
                <div className="p-4">
                  <SectionTitle icon={FiBriefcase}>Job Experience</SectionTitle>
                  <div className="pl-3 border-l border-gray-200">
                    {cvData.experiences &&
                      cvData.experiences.map((exp, i) => (
                        <TimelineItem
                          key={i}
                          title={`${exp.position} - ${exp.organization}`}
                          subtitle={
                            [exp.industry, exp.location && exp.location.trim()]
                              .filter(Boolean)
                              .join(" / ") || undefined
                          }
                          right={exp.dates}
                        >
                          {exp.responsibility && (
                            <ul className="text-sm mb-0 pl-4 list-disc">
                              {exp.responsibility.map((b, k) => (
                                <li key={k} className="leading-relaxed">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </TimelineItem>
                      ))}
                  </div>

                  {/* EDUCATION */}
                  <div className="mt-4">
                    <SectionTitle icon={FiBookOpen}>Education</SectionTitle>
                    <div className="overflow-x-auto">
                      <table className="w-full border text-sm">
                        <thead className="bg-orange-700 text-white">
                          <tr>
                            <th className="px-3 py-2 text-left">Institution</th>
                            <th className="px-3 py-2 text-left">Course</th>
                            <th className="px-3 py-2 text-center">Start</th>
                            <th className="px-3 py-2 text-center">End</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cvData.educations &&
                            cvData.educations.map((ed, i) => (
                              <tr
                                key={i}
                                className="odd:bg-slate-50 hover:bg-slate-100"
                              >
                                <td className="px-3 py-2 align-middle">
                                  {ed.college}
                                </td>
                                <td className="px-3 py-2 align-middle">
                                  {ed.course}
                                </td>
                                <td className="px-3 py-2 text-center align-middle">
                                  {ed.dates}
                                </td>
                                <td className="px-3 py-2 text-center align-middle">
                                  {ed.dates}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* REFEREES */}
                  <div className="mt-4">
                    <SectionTitle icon={FiUser}>Referees</SectionTitle>
                    <ul className="p-0 list-none mb-0 text-sm">
                      {cvData.referees &&
                        cvData.referees.map((r, index) => {
                          return (
                            <li key={index} className="mb-2 text-start">
                              <div className="font-semibold">{r.fullName}</div>
                              <div className="text-gray-500">
                                {r?.position} â€¢ {r?.company}
                              </div>
                              <div>{r?.email}</div>
                              <div>{r?.phone}</div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template6;

// ------- Small UI helpers -------
const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 mb-3">
    {Icon ? Icon({ className: "h-4 w-4 text-orange-700" }) : null}
    <h5 className="font-bold mb-0 text-gray-900">{children}</h5>
    <div className="h-[3px] w-[50px] bg-orange-700 rounded-[2px] ml-1" />
  </div>
);

const TimelineItem = ({ title, right, subtitle, children }) => (
  <div className="pb-3 mb-3 relative">
    <div className="flex items-start justify-between gap-2">
      <div className="pr-3 flex-1">
        <div className="font-semibold">{title}</div>
        {subtitle && <div className="text-gray-500 text-sm">{subtitle}</div>}
      </div>
      {right && (
        <span className="shrink-0 border mt-1 px-2 py-1 text-xs bg-gray-50 text-gray-900 rounded">
          {right}
        </span>
      )}
    </div>

    {children && (
      <div className="mb-0 mt-2 text-gray-500 text-sm">{children}</div>
    )}

    <span className="absolute -left-[13px] top-2 h-[10px] w-[10px] bg-orange-700 rounded-full" />
  </div>
);
