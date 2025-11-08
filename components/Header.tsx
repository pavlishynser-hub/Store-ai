import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent-dark/60 bg-white/90 backdrop-blur-lg">
      <div className="container flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-primary md:text-2xl"
        >
            Aurora Beauty
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-primary">
            Головна
          </Link>
          <Link href="/products" className="transition hover:text-primary">
            Каталог
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="rounded-full border border-accent-dark px-4 py-2 text-sm font-medium text-primary transition hover:-translate-y-0.5 hover:bg-accent"
          >
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </header>
  );
}
