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

export default function Template30() {
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
    <div className="mx-auto text-start bg-[#fdfdfd] font-['Fredoka'] text-[#222]">
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* HEADER */}
      <div className="flex items-center gap-8 border-b-[4px] border-[#dd8321] bg-white px-8 py-10 break-after-avoid">
        <img
          src={
            cvData.profile?.picture
              ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
              : "https://placehold.co/140x140?text=Photo"
          }
          alt="profile"
          className="h-[140px] w-[140px] rounded-full border-[5px] border-[#dd8321] object-cover"
          onError={(e) =>
            (e.currentTarget.src = "https://placehold.co/140x140?text=Photo")
          }
        />
        <div>
          <div className="text-[2.2rem] font-bold text-[#dd8321]">
            {cvData.fullName}
          </div>
          <div className="mb-2 text-[1.1rem] text-[#555]">
            {cvData.current_position}
          </div>
          <p className="max-w-[520px] text-[0.95rem] leading-[1.6]">
            {cvData.summary}
          </p>
        </div>
      </div>

      {/* CONTACT */}
      <div className="flex flex-wrap justify-center gap-8 border-b-2 border-[#eee] bg-white px-8 py-4 text-[0.9rem] text-[#555] break-after-avoid">
        <p className="flex items-center gap-1.5">
          <FiPhone /> {cvData.phone}
        </p>
        <p className="flex items-center gap-1.5">
          <FiMail /> {cvData.email}
        </p>
        <p className="flex items-center gap-1.5">
          <FiMapPin /> {cvData.location}
        </p>
        {payload?.user?.[0]?.website && (
          <p className="flex items-center gap-1.5">
            <FiGlobe /> {payload.user[0].website}
          </p>
        )}
      </div>

      {/* CONTENT (SINGLE FLOW) */}
      <div className="px-8 py-6">
        {/* EXPERIENCE */}
        <Section title="Experience" icon={<FiBriefcase />}>
          <Timeline items={cvData.experiences} />
        </Section>

        {/* EDUCATION */}
        <Section title="Education" icon={<FiBookOpen />}>
          <Timeline
            items={cvData.educations}
            titleKey={(e) => e.level || e.degree}
            subtitleKey={(e) => e.college || e.institution}
          />
        </Section>

        {/* SKILLS */}
        <TagSection
          title="Skills"
          items={[...(cvData.knowledges || []), ...(cvData.softwares || [])]}
        />

        {/* LANGUAGES */}
        <TagSection title="Languages" items={cvData.languages} />

        {/* CULTURE & PERSONALITY */}
        <TagSection
          title="Culture & Personality"
          items={[...(cvData.cultures || []), ...(cvData.personalities || [])]}
        />

        {/* REFEREES */}
        {cvData.referees?.length > 0 && (
          <Section title="Referees" icon={<FiUsers />}>
            {cvData.referees.map((r, i) => (
              <div
                key={i}
                className="mb-4 rounded border-l-[4px] border-[#dd8321] bg-white p-4 shadow-sm break-inside-avoid"
              >
                <strong>{r.fullName}</strong>
                <div className="italic text-[#555]">{r.position}</div>
                <div>{r.company}</div>
                <div className="text-sm">{r.phone}</div>
                <div className="text-sm">{r.email}</div>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}

/* ----------------- HELPERS ----------------- */

const Section = ({ title, icon, children }) => (
  <div className="mb-10 break-inside-avoid">
    <h4 className="mb-6 flex items-center gap-2 border-l-[4px] border-[#dd8321] pl-3 text-[1rem] font-semibold uppercase text-[#dd8321]">
      {icon} {title}
    </h4>
    {children}
  </div>
);

const Timeline = ({
  items = [],
  titleKey = (i) => i.position,
  subtitleKey = (i) => i.organization,
}) => (
  <div className="relative ml-6">
    <span className="absolute left-0 top-0 h-full w-[2px] bg-[#dd8321]" />
    {items.map((i, idx) => (
      <div key={idx} className="relative mb-8 pl-6 break-inside-avoid">
        <div className="absolute left-[-9px] top-[5px] h-[16px] w-[16px] rounded-full bg-[#dd8321]" />
        <div className="text-[0.8rem] font-semibold text-[#dd8321]">
          {i.dates}
        </div>
        <div className="font-semibold">{titleKey(i)}</div>
        <div className="italic text-[#555]">{subtitleKey(i)}</div>
        {i.responsibility && (
          <ul className="list-disc pl-5 text-sm">
            {i.responsibility.map((r, k) => (
              <li key={k}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const TagSection = ({ title, items = [] }) =>
  items.length ? (
    <Section title={title}>
      <div className="flex flex-wrap">
        {items.map((i, idx) => (
          <span
            key={idx}
            className="m-1 rounded-full bg-[#dd8321] px-4 py-1 text-sm text-white"
          >
            {i.name}
          </span>
        ))}
      </div>
    </Section>
  ) : null;
