import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiTag,
} from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

const cvUrl = "https://api.ekazi.co.tz";

const Template8 = () => {
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
    <div className="mx-auto text-start ">
      {/* Header */}
      <div className="py-4 bg-white border-b-4 border-red-600">
        <div className="mx-auto max-w-[1100px] flex flex-col md:flex-row md:items-center gap-4">
          <div className="text-center md:text-left">
            <img
              alt=""
              src={
                cvData.profile?.picture
                  ? `${cvUrl}/${cvData.profile?.picture}`
                  : "https://placehold.co/120x120?text=Photo"
              }
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/120x120?text=Photo")
              }
              className="w-[120px] h-[120px] rounded-full object-cover border-[5px] border-red-600 mx-auto md:mx-0"
            />
          </div>
          <div>
            <div className="uppercase text-sm text-gray-500">
              {cvData.current_position}
            </div>
            <h2 className="font-bold mb-1 text-[2rem] text-red-700">
              {cvData.fullName}
            </h2>
            <div className="mb-2 h-[5px] w-[150px] bg-red-600 rounded-lg" />
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <FiPhone /> {cvData.phone}
              </span>
              <span className="text-gray-300">|</span>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <FiMail /> {cvData.email}
              </span>
              <span className="text-gray-300">|</span>
              <span className="inline-flex items-center gap-2">
                <FiMapPin /> {cvData.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="py-4 grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-8">
          <CardBlock>
            <SectionHeader icon={FiUser} title="About" />
            <p className="text-sm text-gray-500 mb-0">{cvData.summary}</p>
          </CardBlock>

          <CardBlock>
            <SectionHeader icon={FiBriefcase} title="Job Experience" />
            {cvData.experiences &&
              cvData.experiences.map((w, i) => (
                <TimelineItem
                  key={i}
                  title={`${w.position} - ${w.organization}`}
                  meta={[w.industry, w.location].filter(Boolean).join(" / ")}
                  period={w.dates}
                  bullets={w.responsibility}
                />
              ))}
          </CardBlock>

          <CardBlock>
            <SectionHeader icon={FiBookOpen} title="Education" />
            {cvData.educations &&
              cvData.educations.map((ed, i) => (
                <div key={i} className="mb-3">
                  <div className="font-semibold text-red-700">{ed.course}</div>
                  <div className="text-sm text-gray-500">{ed.college}</div>
                  <div className="text-sm">{ed.dates}</div>
                </div>
              ))}
          </CardBlock>

          <CardBlock>
            <SectionHeader icon={FiUser} title="Referees" />
            {cvData.referees &&
              cvData.referees.map((r, i) => {
                return (
                  <div key={i} className="mb-3">
                    <div className="font-semibold text-red-700">
                      {r.fullName}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {r?.referee_position} - {r?.company}
                    </div>
                    <div className="text-sm">{r?.email}</div>
                    <div className="text-sm">{r?.phone}</div>
                  </div>
                );
              })}
          </CardBlock>
        </div>

        {/* RIGHT */}
        <div className="col-span-4">
          <CardBlock>
            <SectionHeader icon={FiMail} title="Contact" />
            <ul className="text-sm list-none mb-0 space-y-2">
              <li className="flex items-start gap-2">
                <FiPhone className="mt-0.5 shrink-0" />
                <span className="break-words">{cvData.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-0.5 shrink-0" />
                <span className="break-words">{cvData.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0" />
                <span className="break-words">{cvData.location}</span>
              </li>
            </ul>
          </CardBlock>

          <CardBlock>
            <SectionHeader icon={FiGlobe} title="Languages" />
            <ul className="text-sm pl-4 mb-0 list-disc">
              {cvData.languages &&
                cvData.languages.map((l, i) => (
                  <li key={i} className="capitalize">
                    {l?.name}
                  </li>
                ))}
            </ul>
          </CardBlock>

          <CardBlock>
            <SectionHeader icon={FiTag} title="Skills & Culture" />
            <div className="text-sm text-gray-500 mb-1">Culture Fit</div>
            <Chips items={cvData.cultures} />
            <div className="text-sm text-gray-500 mt-3 mb-1">Personality</div>
            <Chips items={cvData.personalities} />
            <div className="text-sm text-gray-500 mt-3 mb-1">Software</div>
            <Chips items={cvData.softwares} />
            <div className="text-sm text-gray-500 mt-3 mb-1">Skills</div>
            <Chips items={cvData.knowledges} />
            <div className="text-sm text-gray-500 mt-3 mb-1">Tools</div>
            <Chips items={cvData.tools} />
          </CardBlock>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-4 text-center">
        <div className="mx-auto h-2 w-[160px] bg-red-600 rounded-lg" />
      </div>
    </div>
  );
};

export default Template8;

const CardBlock = ({ children }) => (
  <div className="bg-white shadow-sm rounded border-0 mb-4">
    <div className="p-4">{children}</div>
  </div>
);

const Chips = ({ items }) => {
  if (!items?.length) return <span className="text-gray-500">-</span>;
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {items.map((txt, i) => (
        <span
          key={i}
          className="px-2 py-1 text-sm capitalize rounded-full border border-red-600/25 bg-red-600/10 text-red-700 transition-colors duration-150"
        >
          {txt?.name}
        </span>
      ))}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-red-600 text-white ring-4 ring-red-600/15">
      {Icon ? Icon({ className: "h-[14px] w-[14px]" }) : null}
    </span>
    <h5 className="mb-0 font-semibold text-red-700 text-[1.25rem]">{title}</h5>
    <div className="flex-1 h-0.5 bg-red-600 rounded ml-1" />
  </div>
);

const TimelineItem = ({ title, meta, period, bullets }) => (
  <div className="relative mb-4 pl-8">
    <div className="absolute left-1.5 top-0 -bottom-3 w-0.5 bg-gradient-to-b from-red-600 to-red-600/15" />
    <span className="absolute left-0 top-2 h-[14px] w-[14px] bg-red-600 border-[3px] border-white rounded-full ring-4 ring-red-600/15" />
    <div className="p-3 shadow-sm rounded border border-red-600/20 bg-white">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex-1">
          <div className="font-semibold text-red-700">{title}</div>
          {meta && <div className="text-sm text-gray-500">{meta}</div>}
        </div>
        {period && (
          <span className="shrink-0 border text-sm text-gray-900 bg-white rounded px-2 py-1">
            {period}
          </span>
        )}
      </div>
      {bullets?.length ? (
        <ul className="text-sm mb-0 pl-4 text-gray-500 list-disc">
          {bullets.map((b, i) => (
            <li key={i} className="leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);
