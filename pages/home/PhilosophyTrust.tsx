import React from "react";

type PhilosophyTrustSectionProps = {
  className?: string;
  heading?: string;
  subheading?: string;
};

export default function PhilosophyTrustSection({
  className = "",
  heading = "Clubhouse Baseball is not a ranking site.",
  subheading = "We don’t score teams or fuel drama. We focus on clarity, expectations, and helping families and organizations make better decisions—before anyone commits.",
}: PhilosophyTrustSectionProps) {
  return (
    <section
      className={[
        "base w-full py-16 sm:py-20",
        "bg-field-green-500 text-white",
        className,
      ].join(" ")}
      aria-labelledby="philosophy-trust"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-[0.22em] text-white/80">
              PHILOSOPHY & TRUST
            </p>
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
          </div>

          <h2
            id="philosophy-trust"
            className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            {heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            {subheading}
          </p>

          {/* Divider line */}
          <div className="mt-8 flex justify-center">
            <div className="h-[2px] w-24 rounded-full bg-sky-blue-500" />
          </div>
        </div>

        {/* Trust pillars */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">Transparency</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Clear info about age groups, coaching approach, and tryouts—so parents
              understand what they’re stepping into.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">Better Expectations</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              The right fit happens when culture, communication, and goals are aligned—
              not when families are guessing.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">Community First</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Designed for youth baseball families, teams, and tournament directors—built
              to reduce noise, not add to it.
            </p>
          </div>
        </div>

        {/* Optional CTA row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#parents"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2B5A43] shadow-sm transition hover:bg-white/90 sm:w-auto"
          >
            Find Teams & Tryouts
          </a>

          <a
            href="#get-listed"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            List Your Organization
          </a>
        </div>
      </div>
    </section>
  );
}
