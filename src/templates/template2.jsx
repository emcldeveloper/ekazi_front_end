import { useCVData } from "../context/CVDataContext";
import { useCVNormalized } from "../hooks/useCv";

export default function Template2() {
  const { data: templateData, isLoading, error } = useCVData();
  const payload = templateData?.data;
  const cvData = useCVNormalized(payload);

  const CV_BASE = "https://api.ekazi.co.tz";
  const ACCENT = "#0ea5a4";
  const ACCENT_DARK = "#0b7e7d";

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

  // ILIYO REKEBISHWA HII HAPAAAA

  return (
    <div className="mx-auto">
      <div className="text-start">
        <div className="flex items-center p-6 pb-3 gap-4">
          <div className="shrink-0 flex items-center justify-start">
            <div
              className="w-[180px] h-[180px] overflow-hidden flex items-center justify-center shadow-[0_8px_18px_rgba(14,165,164,.35)]"
              style={{
                backgroundColor: ACCENT,
                clipPath:
                  "polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)",
              }}
            >
              <img
                src={
                  cvData.profile?.picture
                    ? `${CV_BASE}/${cvData.profile.picture}`
                    : "https://placehold.co/320x320?text=Photo"
                }
                alt="profile"
                className="w-[170px] h-[170px] object-cover rounded-[10px]"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/320x320?text=Photo")
                }
              />
            </div>
          </div>
          <div className="flex-1 text-start">
            <h1 className="text-4xl font-semibold leading-tight">
              {cvData.fullName}
            </h1>
            <div className="text-gray-500 text-lg py-2">
              {cvData.current_position}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12">
          {/* Left */}
          <div className="col-span-4 p-6 pt-3">
            <Section title="Address">{cvData.location}</Section>
            <Section title="Phone">{cvData.phone}</Section>
            <Section title="Email">{cvData.email}</Section>
            {cvData.languages && (
              <Section title="Languages">
                <div className="flex flex-wrap gap-2">
                  {cvData.languages.map((l, i) => (
                    <span
                      key={i}
                      className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
                    >
                      {l?.name}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            <Section title="Education">
              {cvData.educations &&
                cvData.educations.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <div className="font-semibold">{edu?.level}</div>
                    <div>{edu?.college}</div>
                    <div className="text-gray-500 text-xs">{edu?.dates}</div>
                  </div>
                ))}
            </Section>

            {cvData.referees && (
              <Section title="Referees">
                {cvData.referees.map((r, i) => {
                  return (
                    <div key={i} className="mb-3">
                      <div className="font-semibold">{cvData.fullName}</div>
                      <div className="text-gray-500">{r?.position}</div>
                      <div>{r?.company}</div>
                      <div className="text-sm">{r?.phone}</div>
                      <div className="text-sm">{r?.email}</div>
                    </div>
                  );
                })}
              </Section>
            )}
          </div>

          {/* Right */}
          <div className="col-span-8 p-6 pt-3 pb-0">
            <TimelineSection title="Introduction" accent={ACCENT}>
              <p className="text-justify text-sm text-gray-700">
                {cvData.summary}
              </p>
            </TimelineSection>

            <TimelineSection title="Experience" accent={ACCENT}>
              {cvData.experiences &&
                cvData.experiences.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="font-semibold">
                      {exp?.position}
                      <span className="text-gray-500">
                        {" "}
                        {exp?.organization}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs mb-2">
                      {exp?.dates}
                    </div>
                    {exp?.responsibility && (
                      <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
                        {exp.responsibility.map((t, k) => (
                          <li key={k}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </TimelineSection>

            <TimelineSection title="Skills" accent={ACCENT}>
              {cvData.knowledges && (
                <div className="mb-3">
                  <div className="font-semibold mb-1">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.knowledges.map((k, i) => (
                      <span
                        key={i}
                        className="rounded border border-[rgba(14,165,164,.35)] bg-[rgba(14,165,164,.12)] px-2 py-1 text-xs capitalize"
                        style={{ color: ACCENT_DARK }}
                      >
                        {k?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cvData.softwares && (
                <div className="mb-3">
                  <div className="font-semibold mb-1">Software</div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.softwares.map((s, i) => (
                      <span
                        key={i}
                        className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
                      >
                        {s?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cvData.cultures && (
                <div className="mb-3">
                  <div className="font-semibold mb-1">Culture Fit</div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.cultures.map((c, i) => (
                      <span
                        key={i}
                        className="rounded border border-[rgba(14,165,164,.35)] bg-[rgba(14,165,164,.12)] px-2 py-1 text-xs capitalize"
                        style={{ color: ACCENT_DARK }}
                      >
                        {c?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {cvData.personalities && (
                <div className="mb-2">
                  <div className="font-semibold mb-1">Personality</div>
                  <div className="flex flex-wrap gap-2">
                    {cvData.personalities.map((p, i) => (
                      <span
                        key={i}
                        className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
                      >
                        {p?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </TimelineSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="font-semibold mb-1 tracking-wide">{title}</div>
      <div className="text-gray-600 text-sm">{children}</div>
    </div>
  );
}

function TimelineSection({ title, children, accent }) {
  return (
    <div className="mb-4 pl-6 relative">
      <div
        className="absolute left-2 top-0 bottom-0 w-[2px]"
        style={{ background: accent }}
      />
      <div className="relative">
        <div
          className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full shadow-[0_0_0_3px_#fff]"
          style={{ background: accent }}
        />
        <h5 className="font-semibold mb-3">{title}</h5>
        <div>{children}</div>
      </div>
    </div>
  );
}

// import { useCVData } from "../context/cv-data-context";
// import { useCVNormalized } from "../hooks/useCv";

// export default function Template2() {
//   const { data: templateData, isLoading, error } = useCVData();
//   const payload = templateData?.data;
//   const cvData = useCVNormalized(payload);

//   const CV_BASE = "https://api.ekazi.co.tz";
//   const ACCENT = "#0ea5a4";
//   const ACCENT_DARK = "#0b7e7d";

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
//         <span className="ml-3 text-gray-700">Loading CV</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-[210mm] mx-auto py-4">
//         <div className="bg-red-100 text-red-700 p-3 rounded">
//           {error.message}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto grid grid-cols-1 max-w-[210mm]">
//       <div className="grid grid-cols-12 text-start">
//         <div className="col-span-12">
//           <link
//             href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
//             rel="stylesheet"
//           />
//           <div className="bg-white border border-gray-200 rounded-md shadow-sm font-['Jost']">
//             <div className="flex items-center p-6 pb-3 gap-4">
//               <div className="shrink-0 flex items-center justify-start">
//                 <div
//                   className="w-[180px] h-[180px] overflow-hidden flex items-center justify-center shadow-[0_8px_18px_rgba(14,165,164,.35)]"
//                   style={{
//                     backgroundColor: ACCENT,
//                     clipPath:
//                       "polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)",
//                   }}
//                 >
//                   <img
//                     src={
//                       cvData.profile?.picture
//                         ? `${CV_BASE}/${cvData.profile.picture}`
//                         : "https://placehold.co/320x320?text=Photo"
//                     }
//                     alt="profile"
//                     className="w-[170px] h-[170px] object-cover rounded-[10px]"
//                     onError={(e) =>
//                       (e.currentTarget.src =
//                         "https://placehold.co/320x320?text=Photo")
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="flex-1 text-start">
//                 <h1 className="text-4xl font-semibold leading-tight">
//                   {cvData.fullName}
//                 </h1>
//                 <div className="text-gray-500 text-lg py-2">
//                   {cvData.current_position}
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap">
//               <div className="w-full md:w-4/12 p-6 pt-3 bg-slate-50 border-r border-slate-200">
//                 <Section title="Address">{cvData.location}</Section>
//                 <Section title="Phone">{cvData.phone}</Section>
//                 <Section title="Email">{cvData.email}</Section>
//                 {cvData.languages && (
//                   <Section title="Languages">
//                     <div className="flex flex-wrap gap-2">
//                       {cvData.languages.map((l, i) => (
//                         <span
//                           key={i}
//                           className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
//                         >
//                           {l?.name}
//                         </span>
//                       ))}
//                     </div>
//                   </Section>
//                 )}

//                 <Section title="Education">
//                   {cvData.educations &&
//                     cvData.educations.map((edu, i) => (
//                       <div key={i} className="mb-3">
//                         <div className="font-semibold">{edu?.level}</div>
//                         <div>{edu?.college}</div>
//                         <div className="text-gray-500 text-xs">
//                           {edu?.dates}
//                         </div>
//                       </div>
//                     ))}
//                 </Section>

//                 {cvData.referees && (
//                   <Section title="Referees">
//                     {cvData.referees.map((r, i) => {
//                       return (
//                         <div key={i} className="mb-3">
//                           <div className="font-semibold">{cvData.fullName}</div>
//                           <div className="text-gray-500">{r?.position}</div>
//                           <div>{r?.company}</div>
//                           <div className="text-sm">{r?.phone}</div>
//                           <div className="text-sm">{r?.email}</div>
//                         </div>
//                       );
//                     })}
//                   </Section>
//                 )}
//               </div>

//               <div className="w-full md:w-8/12 p-6 pt-3 pb-0">
//                 <TimelineSection title="Introduction" accent={ACCENT}>
//                   <p className="text-justify text-sm text-gray-700">
//                     {cvData.summary}
//                   </p>
//                 </TimelineSection>

//                 <TimelineSection title="Experience" accent={ACCENT}>
//                   {cvData.experiences &&
//                     cvData.experiences.map((exp, i) => (
//                       <div key={i} className="mb-4">
//                         <div className="font-semibold">
//                           {exp?.position}
//                           <span className="text-gray-500">
//                             {" "}
//                             {exp?.organization}
//                           </span>
//                         </div>
//                         <div className="text-gray-500 text-xs mb-2">
//                           {exp?.dates}
//                         </div>
//                         {exp?.responsibility && (
//                           <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
//                             {exp.responsibility.map((t, k) => (
//                               <li key={k}>{t}</li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     ))}
//                 </TimelineSection>

//                 <TimelineSection title="Skills" accent={ACCENT}>
//                   {cvData.knowledges && (
//                     <div className="mb-3">
//                       <div className="font-semibold mb-1">Skills</div>
//                       <div className="flex flex-wrap gap-2">
//                         {cvData.knowledges.map((k, i) => (
//                           <span
//                             key={i}
//                             className="rounded border border-[rgba(14,165,164,.35)] bg-[rgba(14,165,164,.12)] px-2 py-1 text-xs capitalize"
//                             style={{ color: ACCENT_DARK }}
//                           >
//                             {k?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {cvData.softwares && (
//                     <div className="mb-3">
//                       <div className="font-semibold mb-1">Software</div>
//                       <div className="flex flex-wrap gap-2">
//                         {cvData.softwares.map((s, i) => (
//                           <span
//                             key={i}
//                             className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
//                           >
//                             {s?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {cvData.cultures && (
//                     <div className="mb-3">
//                       <div className="font-semibold mb-1">Culture Fit</div>
//                       <div className="flex flex-wrap gap-2">
//                         {cvData.cultures.map((c, i) => (
//                           <span
//                             key={i}
//                             className="rounded border border-[rgba(14,165,164,.35)] bg-[rgba(14,165,164,.12)] px-2 py-1 text-xs capitalize"
//                             style={{ color: ACCENT_DARK }}
//                           >
//                             {c?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {cvData.personalities && (
//                     <div className="mb-2">
//                       <div className="font-semibold mb-1">Personality</div>
//                       <div className="flex flex-wrap gap-2">
//                         {cvData.personalities.map((p, i) => (
//                           <span
//                             key={i}
//                             className="rounded border border-[rgba(17,24,39,.12)] bg-[rgba(17,24,39,.06)] px-2 py-1 text-xs text-gray-900 capitalize"
//                           >
//                             {p?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </TimelineSection>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <div className="mb-4">
//       <div className="font-semibold mb-1 tracking-wide">{title}</div>
//       <div className="text-gray-600 text-sm">{children}</div>
//     </div>
//   );
// }

// function TimelineSection({ title, children, accent }) {
//   return (
//     <div className="mb-4 pl-6 relative">
//       <div
//         className="absolute left-2 top-0 bottom-0 w-[2px]"
//         style={{ background: accent }}
//       />
//       <div className="relative">
//         <div
//           className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full shadow-[0_0_0_3px_#fff]"
//           style={{ background: accent }}
//         />
//         <h5 className="font-semibold mb-3">{title}</h5>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }
