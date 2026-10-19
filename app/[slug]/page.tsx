import { notFound } from 'next/navigation';
import { getCoach } from '@/lib/api';
import CanvasSequence from '@/components/hero/CanvasSequence';

export default async function CoachHome({ params }: { params: { slug: string } }) {
  const coach = await getCoach(params.slug);

  if (!coach) {
    notFound();
  }

  return (
    <main className="w-full bg-[var(--color-bg)]">
      {/* Full-bleed pinned hero */}
      <section className="relative w-full">
        <CanvasSequence coach={coach} />

        {/* Overlay Beats mapped to progress */}
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center px-8 md:px-24">
          <h1 className="text-white text-5xl md:text-8xl font-bold uppercase tracking-tighter drop-shadow-lg">
            {coach.name}
          </h1>
          <p className="text-white/90 text-xl md:text-3xl mt-4 font-light">
            {coach.role} • {coach.club}
          </p>
        </div>
      </section>

      {/* Teaser content area below pin */}
      <section className="min-h-screen p-8 md:p-24 flex items-center justify-center">
        <h2 className="text-4xl text-[var(--color-text)]">Content continues here naturally...</h2>
      </section>
    </main>
  );
}