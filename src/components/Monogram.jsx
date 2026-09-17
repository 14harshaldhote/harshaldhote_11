export default function Monogram({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-ink" />
      <path
        d="M9 9v14M19 9v14M9 16h10"
        className="stroke-paper"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="22" y="20.5" width="3" height="3" className="fill-accent" />
    </svg>
  );
}
