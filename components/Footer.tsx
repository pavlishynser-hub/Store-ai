export function Footer() {
  return (
    <footer className="border-t border-accent-dark/60 bg-white">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Aurora Beauty
          </p>
          <p className="text-sm text-slate-500">
            Авторський добір професійної доглядової косметики з доставкою по всій Україні.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span>+380 67 000 00 00</span>
          <span>support@aurorabeauty.ua</span>
        </div>
      </div>
      <div className="border-t border-accent-dark/60 py-4">
        <div className="container flex flex-col gap-2 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Aurora Beauty. Усі права захищено.</p>
          <p>
            Створено на Next.js 14 та Tailwind CSS. Зображення — Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}
