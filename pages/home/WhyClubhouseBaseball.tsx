
type WhyClubhouseBaseballProps = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  className?: string;
};

export default function WhyClubhouseBaseball({
  eyebrow = "WHY CLUBHOUSE BASEBALL",
  heading = "Everything You Need — In One Place",
  body = `Finding the right select baseball fit shouldn’t feel like guesswork.
Today, most parents, coaches, and tournament directors rely on scattered posts, word-of-mouth, and endless scrolling.
Clubhouse Baseball brings the important details together—so everyone can make more confident decisions.`,
  className = "",
}: WhyClubhouseBaseballProps) {
  return (
    <section
      className={[
        "base w-full bg-off-white-500 text-[#1F2A44]",
        "py-14 sm:py-16 md:py-20 md:pt-32",
        className,
      ].join(" ")}
      aria-labelledby="why-clubhouse-baseball"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-[0.22em] text-field-green-500">
              {eyebrow}
            </p>
            <span className="h-px w-10 bg-sky-blue-500" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2
            id="why-clubhouse-baseball"
            className="mt-4 text-3xl font-semibold leading-tight text-gray-800 sm:text-4xl"
          >
            {heading}
          </h2>

          {/* Body */}
          <p className="mt-4 text-base leading-relaxed text-[#1F2A44]/80 sm:text-lg">
            {body}
          </p>

          {/* Divider line */}
          <div className="mt-8 flex justify-center">
            <div className="h-[2px] w-24 rounded-full bg-sky-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
