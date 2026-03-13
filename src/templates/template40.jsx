import {
  FaBriefcase,
  FaEnvelope,
  FaGlobe,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTools,
  FaUserTie,
} from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template40() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const CV_BASE = "https://api.ekazi.co.tz";
  const PRIMARY = "#ff8a00";
  const DARK = "#1f2937";
  const DARKER = "#111827";

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        <span className="ml-3 text-gray-700">Loading CV</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[210mm] py-4">
        <div className="rounded bg-red-100 p-3 text-red-700">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
        rel="stylesheet"
      />

      <div
        className="mx-auto max-w-[210mm] bg-white shadow-2xl"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-8 pb-0 pt-8"
            style={{
              background: `linear-gradient(135deg, ${DARKER} 0%, ${DARK} 100%)`,
            }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex shrink-0 items-center justify-center">
                <div
                  className="relative h-[170px] w-[170px] overflow-hidden rounded-full border-[8px] shadow-lg"
                  style={{
                    borderColor: PRIMARY,
                    boxShadow: "0 12px 30px rgba(0,0,0,.28)",
                  }}
                >
                  <img
                    src={
                      cvData.profile?.picture
                        ? `${CV_BASE}/${cvData.profile.picture}`
                        : "https://placehold.co/320x320?text=Photo"
                    }
                    alt="profile"
                    className="h-full w-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/320x320?text=Photo")
                    }
                  />
                </div>
              </div>

              <div className="flex-1 pb-6 text-start text-white">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-300">
                  About Me
                </div>

                <h1 className="text-[34px] font-semibold leading-tight">
                  {cvData.fullName}
                </h1>

                <div
                  className="mt-2 inline-block text-lg font-normal"
                  style={{ color: PRIMARY }}
                >
                  {cvData.current_position}
                </div>

                <div className="mt-4 h-[2px] w-full bg-white/20">
                  <div
                    className="h-full"
                    style={{ width: "120px", backgroundColor: PRIMARY }}
                  />
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-300">
                  {cvData.summary}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 bg-white/10 px-4 py-4 text-white md:grid-cols-3">
              <ContactItem
                label="Phone"
                value={cvData.phone}
                icon={FaPhoneAlt}
              />
              <ContactItem
                label="Email"
                value={cvData.email}
                icon={FaEnvelope}
              />
              <ContactItem
                label="Address"
                value={cvData.location}
                icon={FaMapMarkerAlt}
              />
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 bg-[#f5f5f5] px-6 py-8 md:col-span-4">
              {cvData.languages?.length > 0 && (
                <SidebarSection
                  title="Languages"
                  color={PRIMARY}
                  icon={FaGlobe}
                >
                  <div className="flex flex-wrap gap-2">
                    {cvData.languages.map((l, i) => (
                      <span
                        key={i}
                        className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs capitalize text-gray-900"
                      >
                        {l?.name}
                      </span>
                    ))}
                  </div>
                </SidebarSection>
              )}

              <SidebarSection
                title="Education"
                color={PRIMARY}
                icon={FaGraduationCap}
              >
                {cvData.educations?.map((edu, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="font-semibold text-gray-900">
                      {edu?.level}
                    </div>
                    <div className="text-sm text-gray-600">{edu?.college}</div>
                    <div className="text-xs text-gray-500">{edu?.dates}</div>
                  </div>
                ))}
              </SidebarSection>

              {cvData.referees?.length > 0 && (
                <SidebarSection
                  title="Referees"
                  color={PRIMARY}
                  icon={FaUserTie}
                >
                  {cvData.referees.map((r, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="font-semibold text-gray-900">
                        {cvData.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{r?.position}</div>
                      <div className="text-sm text-gray-600">{r?.company}</div>
                      <div className="text-sm text-gray-600">{r?.phone}</div>
                      <div className="text-sm text-gray-600">{r?.email}</div>
                    </div>
                  ))}
                </SidebarSection>
              )}
            </div>

            <div className="col-span-12 bg-white px-6 py-8 md:col-span-8">
              <MainSection
                title="Experience"
                color={PRIMARY}
                icon={FaBriefcase}
              >
                {cvData.experiences?.map((exp, i) => (
                  <div key={i} className="relative mb-4 pl-8 last:mb-0">
                    <div
                      className="absolute left-0 top-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: PRIMARY }}
                    />
                    <div className="absolute left-[5px] top-5 h-full w-[2px] bg-gray-200 last:hidden" />

                    <div className="font-semibold text-gray-900">
                      {exp?.position}
                      <span className="text-gray-500">
                        {" "}
                        {exp?.organization}
                      </span>
                    </div>

                    <div className="mb-2 text-xs text-gray-500">
                      {exp?.dates}
                    </div>

                    {exp?.responsibility?.length > 0 && (
                      <ul className="list-disc space-y-1 pl-4 text-sm text-gray-700">
                        {exp.responsibility.map((t, k) => (
                          <li key={k}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </MainSection>

              <MainSection title="Skills" color={PRIMARY} icon={FaTools}>
                {cvData.knowledges?.length > 0 && (
                  <div className="mb-3">
                    <div className="mb-1 font-semibold text-gray-900">
                      Skills
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {cvData.knowledges.map((k, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <IoMdCheckmarkCircle
                            style={{ color: PRIMARY }}
                            className="text-lg"
                          />
                          <span>{k?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.softwares?.length > 0 && (
                  <div className="mb-3">
                    <div className="mb-1 font-semibold text-gray-900">
                      Software
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cvData.softwares.map((s, i) => (
                        <span
                          key={i}
                          className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs capitalize text-gray-900"
                        >
                          {s?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.cultures?.length > 0 && (
                  <div className="mb-3">
                    <div className="mb-1 font-semibold text-gray-900">
                      Culture Fit
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cvData.cultures.map((c, i) => (
                        <span
                          key={i}
                          className="rounded border px-2 py-1 text-xs capitalize"
                          style={{
                            borderColor: `${PRIMARY}59`,
                            backgroundColor: `${PRIMARY}1F`,
                            color: PRIMARY,
                          }}
                        >
                          {c?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.personalities?.length > 0 && (
                  <div className="mb-2">
                    <div className="mb-1 font-semibold text-gray-900">
                      Personality
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cvData.personalities.map((p, i) => (
                        <span
                          key={i}
                          className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs capitalize text-gray-900"
                        >
                          {p?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </MainSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactItem({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
        <Icon className="text-sm" />
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-gray-300">
          {label}
        </div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

function SidebarSection({ title, children, color, icon: Icon }) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {Icon ? <Icon className="text-base" /> : "•"}
        </div>

        <h3 className="text-base font-semibold leading-tight text-gray-900">
          {title}
        </h3>
      </div>

      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
}

function MainSection({ title, children, color, icon: Icon }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {Icon ? <Icon className="text-base" /> : "•"}
        </div>

        <div className="flex-1 rounded-r-full bg-gray-100 px-4 py-2">
          <h3 className="text-base font-semibold leading-tight text-gray-900">
            {title}
          </h3>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
