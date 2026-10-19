import Link from 'next/link';

const services = [
  {
    number: '01',
    title: '1:1 Performance Coaching',
    outcome: 'Build the clarity, confidence, and consistency to perform at your highest level.',
  },
  {
    number: '02',
    title: 'Executive Leadership',
    outcome: 'Lead with more presence, make sharper decisions, and create momentum across your organization.',
  },
  {
    number: '03',
    title: 'Team Workshops',
    outcome: 'Turn talented individuals into a connected team with a shared standard for performance.',
  },
  {
    number: '04',
    title: 'The Next Level Group',
    outcome: 'Move forward with a focused peer community, practical frameworks, and accountable action.',
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-title"
      className="bg-[#111111] px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
              Ways to work together
            </p>
            <h2
              id="services-title"
              className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
            >
              Performance support built around the outcome.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/55 md:pb-1">
            Choose the level of support that meets you where you are and moves you where
            you want to go.
          </p>
        </div>

        <div className="grid border-t border-white/15 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="group border-b border-white/15 py-8 md:min-h-64 md:p-10 md:nth-[odd]:border-r"
            >
              <div className="flex h-full flex-col">
                <span className="text-xs tracking-[0.2em] text-white/40">{service.number}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-tight md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                  {service.outcome}
                </p>
                <Link
                  href="/john-smith/programs"
                  className="mt-auto inline-flex w-fit pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors group-hover:text-white"
                >
                  Learn more <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
