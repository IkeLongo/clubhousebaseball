
import { IconChevronRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section className="hero relative flex flex-col-reverse md:flex-row min-h-screen w-full overflow-hidden bg-off-white-500">
      {/* Left: Content */}
      <div className="relative z-10 flex flex-col justify-center items-start w-full md:w-1/2 pl-20 px-6 py-12 md:py-24">
        <p className="text-sm font-semibold text-field-green-500 mb-2 uppercase tracking-wider">Step Inside the Clubhouse</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-field-green-500">A better way to find select baseball teams and sports</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl">Clubhouse Baseball brings parents, organizations, and tournaments together in one clear, trusted place — without the noise.</p>
        <div className="flex flex-col w-full max-w-xs gap-3">
          <div className="flex flex-row gap-3 justify-start">
            <button className="inline-flex rounded-lg bg-field-green-500 text-white font-semibold py-3 px-6 shadow hover:bg-field-green-600 transition whitespace-nowrap">Find Teams & Tryouts</button>
            <button className="inline-flex rounded-lg bg-off-white-500 text-field-green-500 border border-gray-200 font-semibold py-3 px-6 shadow hover:bg-field-green-600 transition whitespace-nowrap">List Your Organization</button>
          </div>
          <button className="flex items-center justify-start gap-2 rounded-lg text-field-green-500 font-semibold py-3 transition">
            Promote a Tournament
            <IconChevronRight className="w-5 h-5 text-field-green-500" />
          </button>
        </div>
      </div>
      {/* Right: Slanted Image */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          <img
            src="/players_huddling_around_baseball_coach.webp"
            alt="Clubhouse Hero"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}