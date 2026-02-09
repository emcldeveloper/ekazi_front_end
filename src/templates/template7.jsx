import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiTag,
  FiGlobe,
} from "react-icons/fi";

import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const Template7 = () => {
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
      {/* Banner Header */}
      <div className="py-4 bg-white border-b-4 border-emerald-500">
        <div className="flex items-center gap-4 px-3">
          <div className="text-center md:text-left">
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
              className="w-[120px] h-[120px] rounded-full object-cover border-[5px] border-emerald-500 mx-auto md:mx-0"
              alt="Profile"
            />
          </div>

          <div>
            <div className="uppercase text-sm text-gray-500">
              {cvData.current_position}
            </div>
            <h1 className="font-bold mb-1 text-emerald-500 tracking-[.5px] text-[2.5rem]">
              {cvData.fullName}
            </h1>

            {/* Contact: email + location on ONE line (same line group) */}
            <div className="flex flex-wrap gap-3 text-sm items-center">
              <span className="inline-flex items-center gap-1">
                <FiPhone /> {cvData.phone}
              </span>

              <span className="inline-flex items-center gap-3 whitespace-nowrap">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <FiMail /> {cvData.email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiMapPin /> {cvData.location}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-12">
        {/* LEFT */}
        <div className="col-span-4 p-3 bg-slate-900">
          <div className="bg-transparent">
            <div className="p-0">
              {/* About */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiUser size={16} className="text-white" />
                  <h6 className="mb-0 text-white tracking-[.2px] text-[1rem]">
                    About
                  </h6>
                </div>
                <p className="text-sm mb-0 text-white/85">{cvData.summary}</p>
              </div>

              <div className="my-[14px] h-px bg-gradient-to-r from-white/10 to-white/5" />

              {/* Languages */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiGlobe size={16} className="text-white" />
                  <h6 className="mb-0 text-white tracking-[.2px] text-[1rem]">
                    Languages
                  </h6>
                </div>
                <ul className="text-sm pl-4 mb-0 text-white/85 list-disc">
                  {cvData.languages &&
                    cvData.languages.map((l, i) => <li key={i}>{l?.name}</li>)}
                </ul>
              </div>

              <div className="my-[14px] h-px bg-gradient-to-r from-white/10 to-white/5" />

              {/* Profile (bulleted) */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FiTag size={16} className="text-white" />
                  <h6 className="mb-0 text-white tracking-[.2px] text-[1rem]">
                    Profile
                  </h6>
                </div>

                <div className="text-sm mb-1 text-white/85">Culture Fit</div>
                <BulletList items={cvData.cultures} dark />

                <div className="text-sm mt-3 mb-1 text-white/85">
                  Personality
                </div>
                <BulletList items={cvData.personalities} dark />

                <div className="text-sm mt-3 mb-1 text-white/85">Software</div>
                <BulletList items={cvData.softwares} dark />

                <div className="text-sm mt-3 mb-1 text-white/85">Skills</div>
                <BulletList items={cvData.knowledges} dark />

                <div className="text-sm mt-3 mb-1 text-white/85">Tools</div>
                <BulletList items={cvData.tools} dark />
              </div>

              <div className="my-[14px] h-px bg-gradient-to-r from-white/10 to-white/5" />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-8 p-3">
          {/* Experience */}
          <div className="flex items-center gap-2 mb-3">
            <FiBriefcase size={18} />
            <h5 className="mb-0 text-[1.25rem]">Job Experience</h5>
            <div className="h-[3px] w-[90px] bg-emerald-500 rounded-[2px] ml-1" />
          </div>
          {cvData.experiences &&
            cvData.experiences.map((w, i) => (
              <ExpCard
                key={i}
                title={`${w.position} - ${w.organization}`}
                meta={[w.industry, w.location].filter(Boolean).join(" / ")}
                period={w.dates}
                bullets={w.responsibility}
              />
            ))}

          {/* Education */}
          <div className="flex items-center gap-2 mt-4 mb-3">
            <FiBookOpen size={18} />
            <h5 className="mb-0 text-[1.25rem]">Education</h5>
            <div className="h-[3px] w-[90px] bg-emerald-500 rounded-[2px] ml-1" />
          </div>
          {cvData.educations && (
            <div className="flex flex-wrap gap-3">
              {cvData.educations.map((ed, i) => (
                <div
                  key={i}
                  className="w-full md:w-[calc(50%-0.75rem)] shadow-sm rounded bg-white"
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h6 className="mb-1 text-emerald-700">{ed.course}</h6>
                        <div className="text-sm text-gray-500">
                          {ed.college}
                        </div>
                      </div>
                      <span className="shrink-0 border text-xs px-2 py-1 text-gray-900 bg-white rounded">
                        {ed.dates}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Referees */}
          <div className="flex items-center gap-2 mt-4 mb-3">
            <FiUser size={18} />
            <h5 className="mb-0 text-[1.25rem]">Referees</h5>
            <div className="h-[3px] w-[90px] bg-emerald-500 rounded-[2px] ml-1" />
          </div>
          {cvData.referees && (
            <div className="flex flex-wrap gap-3">
              {cvData.referees.map((r, i) => {
                return (
                  <div
                    key={i}
                    className="w-full md:w-[calc(50%-0.75rem)] shadow-sm rounded bg-white"
                  >
                    <div className="p-3">
                      <h6 className="mb-1 text-emerald-700">{r.fullName}</h6>
                      <div className="text-sm text-gray-500 mb-2">
                        {r?.position} - {r?.company}
                      </div>
                      <div className="text-sm">{r?.email}</div>
                      <div className="text-sm">{r?.phone}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="py-4">
        <div className="mx-auto w-[200px] h-2 bg-emerald-500 rounded-lg" />
      </div>
    </div>
  );
};

export default Template7;

// Reusable: Bullet list (no rectangles)
const BulletList = ({ items, dark = false }) => {
  if (!items?.length)
    return <span className={dark ? "text-white/75" : "text-gray-500"}>-</span>;

  return (
    <ul
      className={`text-sm pl-4 mb-0 list-disc mt-0.5 ${
        dark ? "text-white/85" : "text-gray-500"
      }`}
    >
      {items.map((txt, i) => (
        <li key={i} className="leading-relaxed capitalize">
          {txt?.name}
        </li>
      ))}
    </ul>
  );
};

// Experience Card
const ExpCard = ({ title, meta, period, bullets }) => (
  <div className="shadow-sm rounded bg-white mb-3">
    <div className="p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h6 className="mb-1 text-emerald-700">{title}</h6>
          <div className="text-sm text-gray-500">{meta}</div>
        </div>
        <span className="shrink-0 border text-xs px-2 py-1 text-gray-900 bg-white rounded">
          {period}
        </span>
      </div>
      {bullets?.length ? (
        <ul className="text-sm mb-0 mt-2 pl-4 list-disc">
          {bullets.map((b, i) => (
            <li key={i} className="leading-relaxed text-gray-500">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);
