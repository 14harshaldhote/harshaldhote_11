import { useId } from 'react';
import { Arrowhead, Box, Document, Label } from './parts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ROW = 92;
const CAPTION_Y = 158;
const BAR = { x: 104, y: 214, w: 396, h: 14 };

export default function ImportPipeline() {
  const arrow = useId();
  const accentArrow = useId();
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 520 244"
      className="mx-auto h-auto w-full max-w-[560px]"
      role="img"
      aria-label="A CSV of up to 500,000 rows is uploaded, queued in Redis, processed by Celery workers into PostgreSQL, and progress streams back to the browser over server sent events."
    >
      <defs>
        <Arrowhead id={arrow} />
        <Arrowhead id={accentArrow} className="fill-accent" />
      </defs>

      <Document x={16} y={ROW - 40} w={58} h={80} fold={12} />
      <Label x={45} y={CAPTION_Y} anchor="middle">
        csv
      </Label>

      {[
        [78, 102],
        [202, 222],
        [310, 330],
        [414, 434],
      ].map(([a, b]) => (
        <path key={a} d={`M${a} ${ROW} H${b}`} className="stroke-muted" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />
      ))}

      <Box x={104} y={ROW - 24} w={96} h={48} label="upload" sub="django api" />

      {/* queue with filled slots */}
      <rect x="224" y={ROW - 24} width="84" height="48" rx="6" className="fill-paper stroke-muted/70" strokeWidth="1.5" />
      {Array.from({ length: 5 }, (_, i) => (
        <rect
          key={i}
          x={233 + i * 14}
          y={ROW - 12}
          width="10"
          height="24"
          rx="2"
          className={i < 3 ? 'fill-muted/70' : 'fill-none stroke-muted/50'}
          strokeWidth="1.25"
        />
      ))}
      <Label x={266} y={CAPTION_Y} anchor="middle">
        redis queue
      </Label>

      {/* worker stack */}
      {[0, 1, 2].map((i) => (
        <Box key={i} x={332} y={ROW - 38 + i * 26} w={80} h={22} label={`worker ${i + 1}`} size={13} />
      ))}
      <Label x={372} y={CAPTION_Y} anchor="middle">
        celery
      </Label>

      {/* database */}
      <path d={`M438 ${ROW - 24} V${ROW + 20} A31 7 0 0 0 500 ${ROW + 20} V${ROW - 24}`} className="fill-paper stroke-muted/70" strokeWidth="1.5" />
      <ellipse cx="469" cy={ROW - 24} rx="31" ry="7" className="fill-paper stroke-muted/70" strokeWidth="1.5" />
      <Label x={469} y={CAPTION_Y} anchor="middle">
        postgres
      </Label>

      {/* progress back to the browser */}
      <path
        d={`M372 ${CAPTION_Y + 10} V${BAR.y - 8}`}
        className="stroke-accent"
        strokeWidth="2"
        strokeDasharray="4 4"
        markerEnd={`url(#${accentArrow})`}
      />
      <Label x={BAR.x} y={BAR.y - 12} tone="ink">
        live progress · sse
      </Label>
      <Label x={BAR.x + BAR.w} y={BAR.y - 12} anchor="end">
        500k rows
      </Label>
      <rect x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} rx={BAR.h / 2} className="fill-paper stroke-muted/60" strokeWidth="1.5" />
      <rect x={BAR.x} y={BAR.y} width={BAR.w * 0.64} height={BAR.h} rx={BAR.h / 2} className="fill-accent">
        {!reduced && (
          <animate attributeName="width" values={`${BAR.h};${BAR.w};${BAR.w}`} keyTimes="0;0.85;1" dur="6s" repeatCount="indefinite" />
        )}
      </rect>
    </svg>
  );
}
