import Link from 'next/link';

const links = [
  { label: 'About', href: '/john-smith/about' },
  { label: 'Work', href: '/john-smith/programs' },
  { label: 'Contact', href: '/john-smith/contact' },
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-6 py-5 md:px-10" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
          JS
        </Link>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-white/75 md:gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
