import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";

export function HowItWorksTimeline() {
  const data = [
    {
      title: "Step 1",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[#1F2A44]">
            Organizations & tournaments create listings
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2A44]/80">
            Programs share what they offer — age groups, coaching philosophy, tryout info,
            and what kind of players they’re looking for. Tournament directors can post
            event details in one place.
          </p>

          {/* Optional previews (placeholders) */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Image src="/youth-baseball-team-and-coach-on-pitch-2026-01-11-08-07-36-utc_11zon.webp" alt="Organization Profile Preview" width={400} height={112} className="h-28 w-full object-cover object-top rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
            <Image src="/baseball-coach-explaining-strategy-to-youth-team-p-2026-01-09-12-10-13-utc_11zon.webp" alt="Tournament Listing Preview" width={400} height={112} className="h-28 w-full object-cover rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[#1F2A44]">
            Parents explore what’s available
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2A44]/80">
            Families can browse organizations, compare culture and expectations,
            and find upcoming tryouts — without digging through endless posts.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Image src="/kids-baseball-tournament-with-family-audience-2026-01-05-00-23-33-utc_11zon.webp" alt="Tryouts Feed Preview" width={400} height={112} className="h-28 w-full object-cover object-bottom rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
            <Image src="/kids-baseball-team-2026-01-05-00-22-38-utc_11zon.webp" alt="Team Finder Preview" width={400} height={112} className="h-28 w-full object-cover object-bottom rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <h3 className="text-lg font-semibold text-[#1F2A44]">
            Better connections happen naturally
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2A44]/80">
            Parents reach out with more clarity, teams get better-fit inquiries,
            and tournaments reach the right organizations. Less noise. Better expectations.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Image src="/youth-baseball-team-celebrating-success-during-gol-2026-01-17-22-30-13-utc_11zon.webp" alt="Contact / Interest Form Preview" width={400} height={112} className="h-28 w-full object-cover rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
            <Image src="/ready-to-roll-2026-01-05-00-22-41-utc_11zon.webp" alt="Metrics Preview" width={400} height={112} className="h-28 w-full object-cover object-bottom rounded-xl border border-[#2B5A43]/10 bg-white shadow-sm" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#FAFAF7] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-[0.22em] text-field-green-500">
              HOW IT WORKS
            </p>
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-sky-950 sm:text-4xl">
            Simple by Design
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1F2A44]/80 sm:text-lg">
            Clubhouse Baseball helps everyone navigate select baseball with a clear, organized flow.
          </p>
        </div>

        {/* Timeline */}
        <div className="base relative mt-12 w-full overflow-clip">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
}

// export function HowItWorksTimeline() {
//   const data = [
//     {
//       title: "2024",
//       content: (
//         <div>
//           <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
//             Built and launched Aceternity UI and Aceternity UI Pro from scratch
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <img
//               src="https://assets.aceternity.com/templates/startup-1.webp"
//               alt="startup template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/templates/startup-2.webp"
//               alt="startup template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/templates/startup-3.webp"
//               alt="startup template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/templates/startup-4.webp"
//               alt="startup template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Early 2023",
//       content: (
//         <div>
//           <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
//             I usually run out of copy, but when I see content this big, I try to
//             integrate lorem ipsum.
//           </p>
//           <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
//             Lorem ipsum is for people who are too lazy to write copy. But we are
//             not. Here are some more example of beautiful designs I built.
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <img
//               src="https://assets.aceternity.com/pro/hero-sections.png"
//               alt="hero template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/features-section.png"
//               alt="feature template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/pro/bento-grids.png"
//               alt="bento template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/cards.png"
//               alt="cards template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Changelog",
//       content: (
//         <div>
//           <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
//             Deployed 5 new components on Aceternity today
//           </p>
//           <div className="mb-8">
//             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
//               ✅ Card grid component
//             </div>
//             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
//               ✅ Startup template Aceternity
//             </div>
//             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
//               ✅ Random file upload lol
//             </div>
//             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
//               ✅ Himesh Reshammiya Music CD
//             </div>
//             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
//               ✅ Salman Bhai Fan Club registrations open
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <img
//               src="https://assets.aceternity.com/pro/hero-sections.png"
//               alt="hero template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/features-section.png"
//               alt="feature template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/pro/bento-grids.png"
//               alt="bento template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//             <img
//               src="https://assets.aceternity.com/cards.png"
//               alt="cards template"
//               width={500}
//               height={500}
//               className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
//             />
//           </div>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <div className="relative w-full overflow-clip">
//       <Timeline data={data} />
//     </div>
//   );
// }