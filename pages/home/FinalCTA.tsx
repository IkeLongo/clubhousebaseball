import React from "react";

type FinalCTASectionProps = {
  className?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryHref?: string;
  orgHref?: string;
  tournamentHref?: string;
};

export default function FinalCTASection({
  className = "",
  eyebrow = "READY TO GET STARTED?",
  heading = "Step Inside the Clubhouse.",
  subheading = "Whether you’re a parent, an organization, or a tournament director — Clubhouse Baseball makes the next step simple.",
  primaryHref = "#parents",
  orgHref = "#get-listed",
  tournamentHref = "#promote-tournament",
}: FinalCTASectionProps) {
  return (
    <section
      className={[
        "base w-full bg-[#FAFAF7] py-16 sm:py-20",
        className,
      ].join(" ")}
      aria-labelledby="final-cta"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#2B5A43]/10 bg-white px-6 py-12 shadow-sm sm:px-10 sm:py-14">
          {/* Subtle background accents */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#7FC8E8]/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#2B5A43]/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-[0.22em] text-field-green-500">
              {eyebrow}
            </p>
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
          </div>

            <h2
              id="final-cta"
              className="mt-4 text-3xl font-semibold leading-tight text-sky-950 sm:text-4xl"
            >
              {heading}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#1F2A44]/80 sm:text-lg">
              {subheading}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={primaryHref}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#2B5A43] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234A37] sm:w-auto"
              >
                Find Teams & Tryouts
              </a>

              <a
                href={orgHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#2B5A43]/25 bg-white px-6 py-3 text-sm font-semibold text-[#2B5A43] shadow-sm transition hover:bg-[#FAFAF7] sm:w-auto"
              >
                List Your Organization
              </a>

              <a
                href={tournamentHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#7FC8E8]/50 bg-white px-6 py-3 text-sm font-semibold text-[#1F2A44] shadow-sm transition hover:bg-[#FAFAF7] sm:w-auto"
              >
                Promote a Tournament
              </a>
            </div>

            {/* Small trust line */}
            <p className="mt-6 text-xs text-[#1F2A44]/60">
              No logins required. Simple forms. We’re building this community by community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
