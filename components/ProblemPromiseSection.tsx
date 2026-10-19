import Link from 'next/link';

export default function ProblemPromiseSection() {
  return (
    <section
      aria-labelledby="problem-promise-title"
      className="bg-[#0b0b0b] px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
          The shift
        </p>
        <h2
          id="problem-promise-title"
          className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
        >
          Stop guessing. Start moving forward with a plan that performs.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
          When growth stalls, burnout sets in, or every next step feels unclear, I help
          you turn the noise into focused action, stronger decisions, and measurable
          momentum.
        </p>
        <Link
          href="/john-smith/contact"
          className="mt-9 inline-flex items-center justify-center border border-white/35 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Start the conversation
        </Link>
      </div>
    </section>
  );
}
