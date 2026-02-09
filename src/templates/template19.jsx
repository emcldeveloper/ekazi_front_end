import { FiPhone, FiMail, FiMapPin, FiUser, FiGlobe } from "react-icons/fi";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template19() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex items-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="ml-3 text-gray-700">Loading CV...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-[900px] mx-auto py-4">
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error?.message}
        </div>
      </div>
    );

  return (
    <div className="text-start m-auto bg-white p-[5mm] font-['Red_Hat_Display',_sans-serif] shadow-[0_0_5px_rgba(0,0,0,0.2)] text-[#222]">
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full overflow-hidden min-h-[calc(297mm-10mm)] bg-white">
        <div className="text-white bg-[#0c2b3b] py-12 px-10 rounded-b-[40px]">
          <div className="flex items-center gap-4">
            <div className="md:w-2/3">
              <div className="text-[2.4rem] font-bold mb-1">
                {cvData.fullName}
              </div>
              <div className="text-[1.2rem] opacity-90 mb-4">
                {cvData.current_position}
              </div>
              <p className="mb-0 max-w-[600px]">{cvData.summary}</p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <div className="mx-auto md:ml-auto w-[180px] h-[210px] rounded-[16px] overflow-hidden border-[5px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                <img
                  src={
                    cvData.profile?.picture
                      ? `https://api.ekazi.co.tz/${cvData.profile.picture}`
                      : "https://placehold.co/170x200?text=Photo"
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4 px-3 md:px-5 pb-5">
          {/* LEFT */}
          <div className="col-span-4">
            <CardBlock>
              <Section title="Contact" icon={<FiPhone />}>
                <div className="flex flex-col gap-4">
                  <ContactItem icon={<FiPhone />} value={cvData.phone} />
                  <ContactItem icon={<FiMail />} value={cvData.email} />
                  <ContactItem icon={<FiMapPin />} value={cvData.location} />
                  {payload?.user?.[0]?.website && (
                    <ContactItem
                      icon={<FiGlobe />}
                      value={payload?.user?.[0]?.website}
                    />
                  )}
                </div>
              </Section>
            </CardBlock>

            <CardBlock>
              <Section title="Skills" icon={<FiUser />}>
                <div className="flex flex-wrap gap-2">
                  {cvData.knowledges
                    .map((k) =>
                      (k?.name || k || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#6c757d" />
                    ))}
                  {cvData.softwares
                    .map((s) =>
                      (s?.name || s || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#212529" />
                    ))}
                  {cvData.tools
                    .map((t) =>
                      (t?.name || t || "")
                        .toString()
                        .replace(/^,+/, "")
                        .trim()
                        .toLowerCase()
                        .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                    )
                    .filter(Boolean)
                    .map((txt, i) => (
                      <Chip key={i} label={txt} bg="#6c757d" />
                    ))}
                </div>
              </Section>
            </CardBlock>

            {cvData.languages
              .map((l) =>
                (l?.name || l || "")
                  .toString()
                  .replace(/^,+/, "")
                  .trim()
                  .toLowerCase()
                  .replace(/\b\w/g, (ch) => ch.toUpperCase()),
              )
              .filter(Boolean).length > 0 && (
              <CardBlock>
                <Section title="Languages">
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages
                      .map((l) =>
                        (l?.name || l || "")
                          .toString()
                          .replace(/^,+/, "")
                          .trim()
                          .toLowerCase()
                          .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                      )
                      .filter(Boolean)
                      .map((txt, i) => (
                        <Chip key={i} label={txt} bg="#0c2b3b" />
                      ))}
                  </div>
                </Section>
              </CardBlock>
            )}

            {(cvData.cultures
              .map((c) =>
                (c?.name || c || "")
                  .toString()
                  .replace(/^,+/, "")
                  .trim()
                  .toLowerCase()
                  .replace(/\b\w/g, (ch) => ch.toUpperCase()),
              )
              .filter(Boolean).length > 0 ||
              cvData.personalities
                .map((p) =>
                  (p?.name || p || "")
                    .toString()
                    .replace(/^,+/, "")
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                )
                .filter(Boolean).length > 0) && (
              <CardBlock>
                <Section title="Culture & Personality">
                  <div className="flex flex-wrap gap-2">
                    {cvData.cultures
                      .map((c) =>
                        (c?.name || c || "")
                          .toString()
                          .replace(/^,+/, "")
                          .trim()
                          .toLowerCase()
                          .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                      )
                      .filter(Boolean)
                      .map((txt, i) => (
                        <Chip key={i} label={txt} bg="#0dcaf0" text="#000" />
                      ))}
                    {cvData.personalities
                      .map((p) =>
                        (p?.name || p || "")
                          .toString()
                          .replace(/^,+/, "")
                          .trim()
                          .toLowerCase()
                          .replace(/\b\w/g, (ch) => ch.toUpperCase()),
                      )
                      .filter(Boolean)
                      .map((txt, i) => (
                        <Chip key={i} label={txt} bg="#ffc107" text="#000" />
                      ))}
                  </div>
                </Section>
              </CardBlock>
            )}
          </div>

          {/* RIGHT */}
          <div className="col-span-8">
            <CardBlock>
              <Section title="Profile">
                <p>{cvData.summary}</p>
              </Section>
            </CardBlock>

            <CardBlock>
              <Section title="Experience">
                {cvData.experiences?.length ? (
                  <Timeline items={cvData.experiences} isExperience />
                ) : null}
              </Section>
            </CardBlock>

            <CardBlock>
              <Section title="Education">
                {cvData.educations?.length ? (
                  <Timeline items={cvData.educations} isExperience={false} />
                ) : null}
              </Section>
            </CardBlock>

            {cvData.referees?.length > 0 && (
              <CardBlock>
                <Section title="Referees">
                  <div className="flex flex-col gap-4">
                    {cvData.referees.map((r, i) => (
                      <div key={r.id ?? i} className="shadow-sm rounded-lg p-4">
                        <strong className="text-[#0c2b3b]">
                          {r?.fullName}
                        </strong>
                        <div className="text-gray-500 text-sm">
                          {r?.position}
                        </div>
                        <div>{r?.company}</div>
                        <div className="text-sm">{r?.phone}</div>
                        <div className="text-sm">{r?.email}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              </CardBlock>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, icon }) {
  return (
    <div className="mb-3">
      <h5 className="flex items-center gap-2 mb-3 text-[#0c2b3b] font-bold uppercase text-[1rem] border-b-2 border-[#0c2b3b] pb-1">
        {icon} {title}
      </h5>
      {children}
    </div>
  );
}

function Timeline({ items, isExperience }) {
  return (
    <div className="border-l-4 border-[#0c2b3b] ml-3 pl-4">
      {items.map((item, i) => {
        const title = isExperience
          ? item?.position == null
            ? item?.position
            : String(item.position)
                .split(/\s+/)
                .filter((part) => !["@", "?", "$"].includes(part))
                .join(" ")
                .trim()
          : item?.level || item?.degree;
        const org = isExperience
          ? (item?.organization == null
              ? item?.organization
              : String(item.organization)
                  .split(/\s+/)
                  .filter((part) => !["@", "?", "$"].includes(part))
                  .join(" ")
                  .trim()) || ""
          : item?.college || item?.institution || "";
        const dates = isExperience
          ? item?.dates == null
            ? item?.dates
            : String(item.dates)
                .split(/\s+/)
                .filter((part) => !["@", "?", "$"].includes(part))
                .join(" ")
                .trim()
          : item?.dates;

        return (
          <div key={i} className="relative mb-5">
            <div className="absolute w-[14px] h-[14px] rounded-full bg-[#0c2b3b] -left-[23px] top-[4px]" />
            <div className="font-semibold text-[#0c2b3b]">{title}</div>
            <div className="text-gray-500 text-sm mb-1">{org}</div>
            <div className="text-gray-500 text-sm">{dates}</div>
            {item?.responsibility && (
              <ul className="text-sm mt-2 mb-0 pl-4">
                {(Array.isArray(item.responsibility)
                  ? item.responsibility
                  : String(item.responsibility).split("\n")
                )
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((t, k) => (
                    <li key={k}>{t.replace(/^•\s*/, "")}</li>
                  ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Chip({ label, bg, text = "#fff" }) {
  if (!label) return null;

  const bgClass =
    bg === "#0c2b3b"
      ? "bg-[#0c2b3b]"
      : bg === "#6c757d"
        ? "bg-[#6c757d]"
        : bg === "#212529"
          ? "bg-[#212529]"
          : bg === "#0dcaf0"
            ? "bg-[#0dcaf0]"
            : bg === "#ffc107"
              ? "bg-[#ffc107]"
              : "bg-[#0c2b3b]";

  const textClass = text === "#000" ? "text-black" : "text-white";

  return (
    <span
      className={`inline-block text-[0.85rem] py-[0.35em] px-[0.8em] max-w-full whitespace-normal [overflow-wrap:anywhere] [word-break:break-word] text-left leading-[1.2] rounded-full ${bgClass} ${textClass}`}
    >
      {label}
    </span>
  );
}

function ContactItem({ icon, value }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="inline-flex items-center justify-center rounded-lg w-[26px] h-[26px] border border-[rgba(12,43,59,0.15)] bg-[rgba(12,43,59,0.04)] text-[#0c2b3b]">
        {icon}
      </span>
      <div className="text-[0.95rem] leading-tight break-words">{value}</div>
    </div>
  );
}

function CardBlock({ children }) {
  return (
    <div className="shadow-sm rounded-2xl p-4 mb-4 bg-white">{children}</div>
  );
}
