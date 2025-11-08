type PriceProps = {
  amount: number;
  currency?: string;
  className?: string;
};

const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: string, currency: string) {
  const key = `${locale}-${currency}`;
  if (!formatterCache.has(key)) {
    formatterCache.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
      }),
    );
  }

  return formatterCache.get(key)!;
}

export function Price({
  amount,
  currency = "UAH",
  className = "",
}: PriceProps) {
  const formatter = getFormatter("uk-UA", currency);

  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      {formatter.format(amount)}
    </span>
  );
}
