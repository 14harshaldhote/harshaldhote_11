import { useId } from 'react';
import { Arrowhead, Label } from './parts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Cross-section of the bowl-shaped pond. Water in on the left and top, water out on the right and bottom.
const CX = 300;
const BRIM_Y = 132;
const BOTTOM_Y = 236;
const HALF_W = 170;
const WATER_Y = 166;

// Parabola through the brim edges and the bottom centre.
const bowlY = (x) => BOTTOM_Y - (BOTTOM_Y - BRIM_Y) * ((x - CX) / HALF_W) ** 2;
const waterHalfW = HALF_W * Math.sqrt((BOTTOM_Y - WATER_Y) / (BOTTOM_Y - BRIM_Y));

function bowlPath(fromX, toX) {
  const pts = [];
  for (let x = fromX; x <= toX + 0.01; x += 6) pts.push(`${x.toFixed(1)} ${bowlY(x).toFixed(1)}`);
  return `M${pts.join(' L')}`;
}

export default function PondBudget() {
  const arrow = useId();
  const accentArrow = useId();
  const reduced = usePrefersReducedMotion();
  const wl = CX - waterHalfW;
  const wr = CX + waterHalfW;

  return (
    <svg
      viewBox="0 0 560 290"
      className="mx-auto h-auto w-full max-w-[600px]"
      role="img"
      aria-label="Cross-section of a bowl-shaped pond. Rain and runoff from the surrounding land flow in; evaporation, seepage and overflow at the spill level flow out. Every flow is written to a ledger each hour."
    >
      <defs>
        <Arrowhead id={arrow} />
        <Arrowhead id={accentArrow} className="fill-accent" />
      </defs>

      {/* ground and catchment slope */}
      <path d={`M14 96 L${CX - HALF_W} ${BRIM_Y}`} className="stroke-muted/70" strokeWidth="1.5" fill="none" />
      <path d={`M${CX + HALF_W} ${BRIM_Y} H546`} className="stroke-muted/70" strokeWidth="1.5" fill="none" />

      {/* water body */}
      <path d={`${bowlPath(wl, wr)} Z`} className="fill-ink/10" />
      <line x1={wl} x2={wr} y1={WATER_Y} y2={WATER_Y} className="stroke-accent" strokeWidth="2">
        {!reduced && (
          <animate attributeName="y1" values={`${WATER_Y};${WATER_Y - 6};${WATER_Y}`} dur="7s" repeatCount="indefinite" />
        )}
        {!reduced && (
          <animate attributeName="y2" values={`${WATER_Y};${WATER_Y - 6};${WATER_Y}`} dur="7s" repeatCount="indefinite" />
        )}
      </line>
      <path d={bowlPath(CX - HALF_W, CX + HALF_W)} className="stroke-muted" strokeWidth="1.75" fill="none" />

      {/* lotus pads */}
      {[-58, -24, 14, 46].map((dx) => (
        <ellipse key={dx} cx={CX + dx} cy={WATER_Y - 1} rx="11" ry="3.5" className="fill-ink/70" />
      ))}

      {/* spill level */}
      <line x1={CX - HALF_W} x2={CX + HALF_W} y1={BRIM_Y} y2={BRIM_Y} className="stroke-muted/60" strokeWidth="1.25" strokeDasharray="3 5" />
      <Label x={CX + HALF_W - 14} y={BRIM_Y + 16} anchor="end" size={12}>
        spill level
      </Label>

      {/* rain in */}
      {[-40, 0, 40].map((dx) => (
        <path key={dx} d={`M${CX - 60 + dx} 26 V${BRIM_Y - 14}`} className="stroke-accent" strokeWidth="1.75" markerEnd={`url(#${accentArrow})`} />
      ))}
      <Label x={CX - 60} y={18} anchor="middle" tone="ink">
        rain
      </Label>

      {/* runoff in */}
      <path d="M44 76 L112 100" className="stroke-accent" strokeWidth="1.75" markerEnd={`url(#${accentArrow})`} />
      <Label x={14} y={44} tone="ink">
        runoff
      </Label>
      <Label x={14} y={60} size={12}>
        wet soil sends more
      </Label>

      {/* evaporation out */}
      {[0, 30].map((dx) => (
        <path key={dx} d={`M${CX + 20 + dx} ${WATER_Y - 10} V36`} className="stroke-muted" strokeWidth="1.5" strokeDasharray="2 4" markerEnd={`url(#${arrow})`} />
      ))}
      <Label x={CX + 35} y={24} anchor="middle">
        evaporation
      </Label>

      {/* overflow out */}
      <path d={`M${CX + HALF_W - 6} ${BRIM_Y - 4} Q${CX + HALF_W + 30} ${BRIM_Y - 18} 520 ${BRIM_Y - 4}`} className="stroke-muted" strokeWidth="1.5" fill="none" markerEnd={`url(#${arrow})`} />
      <Label x={540} y={BRIM_Y - 22} anchor="end">
        overflow
      </Label>

      {/* seepage out */}
      <path d={`M${CX} ${BOTTOM_Y + 4} V${BOTTOM_Y + 30}`} className="stroke-muted" strokeWidth="1.5" strokeDasharray="2 4" markerEnd={`url(#${arrow})`} />
      <Label x={CX + 12} y={BOTTOM_Y + 26}>
        seepage
      </Label>

      <Label x={14} y={280} tone="ink" size={13}>
        every hour: in − out = change, written to a ledger
      </Label>
    </svg>
  );
}
