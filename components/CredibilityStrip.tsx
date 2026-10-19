const featuredIn = ['ESPN', 'Forbes', 'GQ', 'Men’s Health'];

const metrics = [
  { value: '12+', label: 'years experience' },
  { value: '500+', label: 'athletes coached' },
  { value: '18', label: 'countries reached' },
  { value: '98%', label: 'client retention' },
];

export default function CredibilityStrip() {
  return (
    <section
      aria-label="Credibility and experience"
      className="border-y border-white/10 bg-[#0b0b0b] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-7 md:px-10 md:py-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="shrink-0">
            <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/45">
              As featured in
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
              {featuredIn.map((publication) => (
                <span
                  key={publication}
                  className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75"
                >
                  {publication}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden h-12 w-px bg-white/10 lg:block" aria-hidden="true" />

          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-x-6 lg:min-w-[52%]">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {metric.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
