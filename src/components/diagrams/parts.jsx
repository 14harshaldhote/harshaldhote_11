// Shared building blocks for the hand-drawn system diagrams. Colours come from the
// theme tokens, so every diagram follows light/dark mode. Sizes are in viewBox units;
// the diagrams render at roughly 0.6–0.7× on screen, so text is set large.

export function Arrowhead({ id, className = 'fill-muted' }) {
  return (
    <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0.8 L7.5 4 L0 7.2 z" className={className} />
    </marker>
  );
}

export function Box({ x, y, w, h, label, sub, accent = false, size = 15 }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        className={accent ? 'fill-paper stroke-accent' : 'fill-paper stroke-muted/70'}
        strokeWidth={accent ? 2 : 1.5}
      />
      {label && (
        <Label x={x + w / 2} y={y + h / 2 + (sub ? -3 : 5)} anchor="middle" tone="ink" size={size}>
          {label}
        </Label>
      )}
      {sub && (
        <Label x={x + w / 2} y={y + h / 2 + 13} anchor="middle" size={12.5}>
          {sub}
        </Label>
      )}
    </g>
  );
}

const tones = { muted: 'fill-muted', ink: 'fill-ink', accent: 'fill-accent' };

export function Label({ x, y, children, anchor = 'start', tone = 'muted', size = 15 }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} className={`${tones[tone]} font-mono`}>
      {children}
    </text>
  );
}

export function Document({ x, y, w, h, fold = 12, lines = 4 }) {
  return (
    <g>
      <path
        d={`M${x} ${y} H${x + w - fold} L${x + w} ${y + fold} V${y + h} H${x} Z`}
        className="fill-paper stroke-muted/70"
        strokeWidth="1.5"
      />
      <path d={`M${x + w - fold} ${y} V${y + fold} H${x + w}`} className="stroke-muted/70" strokeWidth="1.5" fill="none" />
      {Array.from({ length: lines }, (_, i) => (
        <line
          key={i}
          x1={x + 10}
          x2={x + w - 10 - (i % 2) * 8}
          y1={y + fold + 13 + i * 12}
          y2={y + fold + 13 + i * 12}
          className="stroke-muted/50"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}
