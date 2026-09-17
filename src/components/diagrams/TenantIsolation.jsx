import { Label } from './parts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const lanes = [
  { x: 100, tenant: 'a' },
  { x: 260, tenant: 'b' },
  { x: 420, tenant: 'c' },
];
const bands = [
  { y: 74, label: 'rest api · jwt · oauth2 · rbac' },
  { y: 124, label: 'where tenant_id = :tenant', accent: true },
  { y: 174, label: 'redis cache' },
];
const BAND_H = 34;
const DB_TOP = 234;
const DB_BOTTOM = 282;

export default function TenantIsolation() {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 520 300"
      className="mx-auto h-auto w-full max-w-[560px]"
      role="img"
      aria-label="Each garage's requests pass through the API, a tenant scope filter and the cache, and can only reach that garage's rows in MySQL."
    >
      {/* isolation walls between lanes */}
      {[180, 340].map((x) => (
        <line key={x} x1={x} x2={x} y1="8" y2={DB_BOTTOM + 6} className="stroke-muted/50" strokeWidth="1.25" strokeDasharray="2 5" />
      ))}

      {/* request lanes */}
      {lanes.map((lane, i) => (
        <line
          key={lane.x}
          x1={lane.x}
          x2={lane.x}
          y1="46"
          y2={DB_TOP + 8}
          className={i === 0 ? 'stroke-accent' : 'stroke-muted/70'}
          strokeWidth={i === 0 ? 2 : 1.5}
        />
      ))}

      {/* tenants */}
      {lanes.map((lane, i) => (
        <g key={lane.tenant}>
          <rect
            x={lane.x - 60}
            y="10"
            width="120"
            height="36"
            rx="6"
            className={i === 0 ? 'fill-paper stroke-accent' : 'fill-paper stroke-muted/70'}
            strokeWidth={i === 0 ? 2 : 1.5}
          />
          <Label x={lane.x} y={33} anchor="middle" tone="ink">
            garage {lane.tenant}
          </Label>
        </g>
      ))}

      {/* shared layers; lanes pass underneath */}
      {bands.map((band) => (
        <g key={band.y}>
          <rect
            x="20"
            y={band.y}
            width="480"
            height={BAND_H}
            rx="6"
            className={band.accent ? 'fill-surface stroke-accent' : 'fill-surface stroke-muted/70'}
            strokeWidth={band.accent ? 2 : 1.5}
          />
          <Label x={36} y={band.y + 22} tone={band.accent ? 'accent' : 'ink'}>
            {band.label}
          </Label>
        </g>
      ))}

      {/* MySQL, with each tenant's rows kept apart */}
      <path
        d={`M20 ${DB_TOP} V${DB_BOTTOM} A240 9 0 0 0 500 ${DB_BOTTOM} V${DB_TOP}`}
        className="fill-paper stroke-muted/70"
        strokeWidth="1.5"
      />
      <rect x="21" y={DB_TOP + 9} width="158" height={DB_BOTTOM - DB_TOP - 4} className="fill-accent/10" />
      <ellipse cx="260" cy={DB_TOP} rx="240" ry="9" className="fill-paper stroke-muted/70" strokeWidth="1.5" />
      {lanes.map((lane, i) => (
        <Label key={lane.tenant} x={lane.x} y={DB_TOP + 34} anchor="middle" tone={i === 0 ? 'accent' : 'muted'}>
          mysql · {lane.tenant}
        </Label>
      ))}

      {!reduced && (
        <circle r="5" className="fill-accent">
          <animateMotion dur="3s" repeatCount="indefinite" path={`M100 46 V${DB_TOP + 14}`} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </circle>
      )}
    </svg>
  );
}
