import React from "react";
import { Timeline } from "@/components/ui/timeline";

function PreviewPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-28 w-full items-center justify-center rounded-xl border border-[#2B5A43]/10 bg-white text-sm font-medium text-[#1F2A44]/70 shadow-sm">
      {label}
    </div>
  );
}

export default function HowItWorksTimeline() {
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
            <PreviewPlaceholder label="Organization Profile (preview)" />
            <PreviewPlaceholder label="Tournament Listing (preview)" />
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
            <PreviewPlaceholder label="Tryouts Feed (preview)" />
            <PreviewPlaceholder label="Team Finder / Filters (preview)" />
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
            <PreviewPlaceholder label="Contact / Interest Form (preview)" />
            <PreviewPlaceholder label="Metrics (views & clicks) (preview)" />
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
          <h2 className="mt-4 text-3xl font-semibold text-[#1F2A44] sm:text-4xl">
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

