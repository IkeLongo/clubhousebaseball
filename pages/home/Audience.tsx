import { ExpandableCardOnClick } from "@/components/ui/cards/expandable-card";

export default function Audience() {
  return (
    <section
      className="base w-full bg-off-white-500 py-16 sm:py-20"
      aria-labelledby="who-its-for"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-[0.22em] text-field-green-500">
              WHO IT’S FOR
            </p>
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
          </div>

          <h2
            id="who-its-for"
            className="mt-4 text-3xl font-semibold text-gray-800 sm:text-4xl"
          >
            Built for Everyone Involved
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#1F2A44]/80 sm:text-lg">
            Clubhouse Baseball supports families, organizations, and tournament
            directors by bringing clarity and structure to the select baseball
            process.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-12">
          <ExpandableCardOnClick />
        </div>

        {/* Divider line */}
        <div className="mt-8 flex justify-center">
          <div className="h-[2px] w-24 rounded-full bg-sky-blue-500" />
        </div>
      </div>
    </section>
  );
}
