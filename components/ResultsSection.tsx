import Image from 'next/image';
import Link from 'next/link';

const caseStudies = [
  {
    image: '/sequence/john-smith/ezgif-frame-096.webp',
    result: 'From scattered effort to consistent performance',
    story:
      'A private performance client used a clearer weekly rhythm and sharper decision-making habits to bring confidence back to competition.',
    name: 'Client confidentiality protected',
    role: 'Professional athlete',
  },
  {
    image: '/sequence/john-smith/ezgif-frame-192.webp',
    result: 'From individual talent to shared standards',
    story:
      'A developing team aligned around one performance language, creating more trust, accountability, and purpose in every session.',
    name: 'Client confidentiality protected',
    role: 'Team leadership programme',
  },
];

export default function ResultsSection() {
  return (
    <section
      aria-labelledby="results-title"
      className="bg-[#0b0b0b] px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
              Results in practice
            </p>
            <h2
              id="results-title"
              className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
            >
              The work shows up where it matters.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/55 md:pb-1">
            Private work stays private. These stories reflect the kind of shift clients
            come to create.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.result} className="group border border-white/15">
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={caseStudy.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {caseStudy.result}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{caseStudy.story}</p>
                <div className="mt-8 border-t border-white/15 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                    {caseStudy.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/40">
                    {caseStudy.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/john-smith/contact"
          className="mt-10 inline-flex border-b border-white/40 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-white hover:text-white"
        >
          Talk about your outcome
        </Link>
      </div>
    </section>
  );
}
