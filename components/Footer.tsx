import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Shipping", href: "/#shipping" },
  { label: "Returns", href: "/#returns" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-dark/60 bg-white">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Aurora Cosmetics
          </p>
          <p className="text-sm text-slate-500">
            Mindfully curated skincare for radiant, resilient complexions.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-500">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-accent-dark/60 py-4">
        <div className="container flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Aurora Cosmetics. All rights reserved.</p>
          <p>
            Built with Next.js 14, Tailwind CSS, and Stripe test mode. Images via
            Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}
