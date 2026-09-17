import { useId } from 'react';
import { Arrowhead, Box, Label } from './parts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Six checker levels climbing as a staircase from the maker to the approval stamp.
const W = 46;
const H = 34;
const levels = Array.from({ length: 6 }, (_, i) => ({ x: 128 + i * 58, y: 204 - i * 30, label: `L${i + 1}` }));
const MAKER = { x: 16, y: 204, w: 80 };
const AUDIT_Y = 272;
const STAMP = { x: 408, y: 4, w: 106, h: 32 };

export default function ApprovalFlow() {
  const arrow = useId();
  const accentArrow = useId();
  const reduced = usePrefersReducedMotion();

  const makerMid = { x: MAKER.x + MAKER.w / 2, y: MAKER.y + H / 2 };
  const top = levels[levels.length - 1];
  const route = `M${makerMid.x} ${makerMid.y} ${levels.map((l) => `H${l.x + W / 2} V${l.y + H / 2}`).join(' ')} V${STAMP.y + STAMP.h}`;

  return (
    <svg
      viewBox="0 0 520 300"
      className="mx-auto h-auto w-full max-w-[560px]"
      role="img"
      aria-label="A request moves from the maker through six checker levels, each scoped by role, to approval, and every step is written to an audit log."
    >
      <defs>
        <Arrowhead id={arrow} />
        <Arrowhead id={accentArrow} className="fill-accent" />
      </defs>

      {/* audit log rail and the drops into it */}
      <line x1="16" x2="504" y1={AUDIT_Y} y2={AUDIT_Y} className="stroke-muted/60" strokeWidth="1.5" strokeDasharray="4 5" />
      {[{ x: makerMid.x, y: MAKER.y + H }, ...levels.map((l) => ({ x: l.x + W / 2, y: l.y + H }))].map((p) => (
        <g key={p.x}>
          <line x1={p.x} x2={p.x} y1={p.y} y2={AUDIT_Y} className="stroke-muted/40" strokeWidth="1.25" strokeDasharray="1.5 4" />
          <circle cx={p.x} cy={AUDIT_Y} r="3.5" className="fill-muted" />
        </g>
      ))}
      <Label x={16} y={295}>
        audit log · every transition recorded
      </Label>

      {/* connectors */}
      <path d={`M${MAKER.x + MAKER.w} ${makerMid.y} H${levels[0].x - 2}`} className="stroke-muted" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      {levels.slice(0, -1).map((l) => (
        <path
          key={l.label}
          d={`M${l.x + W} ${l.y + H / 2} H${l.x + W + 6} V${l.y - 30 + H / 2} H${l.x + 58}`}
          className="stroke-muted"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
      <path
        d={`M${top.x + W / 2} ${top.y} V${STAMP.y + STAMP.h + 5}`}
        className="stroke-accent"
        strokeWidth="2"
        markerEnd={`url(#${accentArrow})`}
      />

      <Box x={MAKER.x} y={MAKER.y} w={MAKER.w} h={H} />
      {levels.map((l) => (
        <Box key={l.label} x={l.x} y={l.y} w={W} h={H} />
      ))}

      {!reduced && (
        <circle r="5" className="fill-accent">
          <animateMotion dur="5s" repeatCount="indefinite" path={route} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </circle>
      )}

      <Label x={makerMid.x} y={makerMid.y + 5} anchor="middle" tone="ink">
        maker
      </Label>
      {levels.map((l) => (
        <Label key={l.label} x={l.x + W / 2} y={l.y + H / 2 + 5} anchor="middle" tone="ink">
          {l.label}
        </Label>
      ))}
      <Label x={16} y={118}>
        6 checker levels,
      </Label>
      <Label x={16} y={138}>
        each scoped by role
      </Label>

      {/* approval stamp */}
      <g transform={`rotate(-4 ${STAMP.x + STAMP.w / 2} ${STAMP.y + STAMP.h / 2})`}>
        <rect x={STAMP.x} y={STAMP.y} width={STAMP.w} height={STAMP.h} rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
        <rect
          x={STAMP.x + 4}
          y={STAMP.y + 4}
          width={STAMP.w - 8}
          height={STAMP.h - 8}
          rx="2"
          className="fill-none stroke-accent/50"
          strokeWidth="1"
        />
        <Label x={STAMP.x + STAMP.w / 2} y={STAMP.y + STAMP.h / 2 + 5} anchor="middle" tone="accent">
          APPROVED
        </Label>
      </g>
    </svg>
  );
}
