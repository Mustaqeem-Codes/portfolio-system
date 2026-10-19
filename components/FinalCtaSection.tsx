import Link from 'next/link';

export default function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-[#1f6feb] px-6 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/65">
          Your next level starts here
        </p>
        <h2
          id="final-cta-title"
          className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          Ready to take your business to the next level?
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          Book a private conversation to explore where focused coaching can create the
          greatest impact.
        </p>
        <Link
          href="/john-smith/contact"
          className="mt-9 inline-flex items-center justify-center bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:bg-white/85"
        >
          Book a discovery call
        </Link>
      </div>
    </section>
  );
}
