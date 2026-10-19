const processSteps = [
  {
    number: '01',
    title: 'Discovery call',
    description: 'We clarify where you are, what is getting in the way, and what success needs to look like.',
  },
  {
    number: '02',
    title: 'Custom roadmap',
    description: 'You leave with a focused plan built around your goals, context, and highest-leverage opportunities.',
  },
  {
    number: '03',
    title: 'Focused coaching',
    description: 'Together, we turn the plan into consistent action through practical guidance and honest feedback.',
  },
  {
    number: '04',
    title: 'Measurable results',
    description: 'We track the changes that matter so progress is visible, repeatable, and built to last.',
  },
];

export default function ProcessSection() {
  return (
    <section
      aria-labelledby="process-title"
      className="bg-[#f3f3f0] px-6 py-20 text-[#111111] md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/45">
            How it works
          </p>
          <h2
            id="process-title"
            className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
          >
            A clear path from intention to impact.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-black/60 md:text-lg">
            No guesswork and no one-size-fits-all prescription. Every step is designed
            to create clarity, momentum, and progress you can feel.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-black/15 md:mt-16 md:grid-cols-4">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="border-b border-black/15 py-8 md:min-h-72 md:border-b-0 md:border-r md:p-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="text-xs tracking-[0.2em] text-black/40">{step.number}</span>
              <h3 className="mt-10 text-2xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
