import Image from 'next/image';
import Link from 'next/link';

const credentials = [
  { label: 'Current role', value: 'Head Coach, FC Example' },
  { label: 'Experience', value: '12+ years in performance coaching' },
  { label: 'Clients', value: 'Professional, collegiate & emerging athletes' },
];

export default function AboutCoachSection() {
  return (
    <section
      aria-labelledby="about-coach-title"
      className="bg-[#f3f3f0] px-6 py-20 text-[#111111] md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#d9d9d4]">
          <Image
            src="/sequence/john-smith/ezgif-frame-001.webp"
            alt="John Smith standing on a football pitch"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">John Smith</p>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/45">
            About the coach
          </p>
          <h2
            id="about-coach-title"
            className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
          >
            The person behind the performance.
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-base leading-relaxed text-black/65 md:text-lg">
            <p>
              John believes great performance is built long before the moment arrives:
              through clear thinking, consistent habits, and training that respects the
              whole person.
            </p>
            <p>
              His approach combines high-performance standards with practical guidance,
              helping athletes find more confidence, control, and longevity in their game.
            </p>
          </div>

          <dl className="mt-9 grid gap-5 border-y border-black/10 py-6 sm:grid-cols-3 sm:gap-6">
            {credentials.map((credential) => (
              <div key={credential.label}>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                  {credential.label}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-snug text-black/80">
                  {credential.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/john-smith/about"
            className="mt-8 inline-flex border-b border-black/40 pb-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:border-black"
          >
            Read the full story
          </Link>
        </div>
      </div>
    </section>
  );
}
