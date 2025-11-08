import Link from "next/link";
import { CartLink } from "./CartLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent-dark/60 bg-white/90 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-primary md:text-2xl"
        >
          Aurora Cosmetics
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-primary">
            Products
          </Link>
          <Link href="/checkout" className="transition hover:text-primary">
            Checkout
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="rounded-full border border-accent-dark px-4 py-2 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
          >
            Shop
          </Link>
          <CartLink />
        </div>
      </div>
    </header>
  );
}
