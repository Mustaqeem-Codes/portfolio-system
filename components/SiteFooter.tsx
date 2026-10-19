import Link from 'next/link';

const navigation = [
  { label: 'About', href: '/john-smith/about' },
  { label: 'Programs', href: '/john-smith/programs' },
  { label: 'Contact', href: '/john-smith/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#080808] px-6 py-16 text-white md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-16">
          <div>
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em]">
              JS
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Performance, leadership, and a modern approach to the game.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/45">
              Available by appointment
            </p>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/45">Explore</h2>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/45">Stay connected</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Receive occasional notes on performance, leadership, and doing your best work.
            </p>
            <form action="/john-smith/contact" method="get" className="mt-5 flex max-w-sm">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Your email"
                required
                className="min-w-0 flex-1 border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/60"
              />
              <button
                type="submit"
                className="border border-l-0 border-white/20 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[10px] uppercase tracking-[0.16em] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 John Smith. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
