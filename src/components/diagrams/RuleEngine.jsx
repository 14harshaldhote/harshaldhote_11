import { useId } from 'react';
import { Arrowhead, Document, Label } from './parts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ROOT = { x: 146, y: 150, r: 13 };
const branches = [
  { x: 234, y: 92, r: 10 },
  { x: 234, y: 208, r: 10 },
];
const leaves = [
  { x: 318, y: 58, from: 0, outcome: 'pass' },
  { x: 318, y: 124, from: 0, outcome: 'pass' },
  { x: 318, y: 176, from: 1, outcome: 'pass' },
  { x: 318, y: 240, from: 1, outcome: 'flag' },
];
const LEAF = 8;
const REVIEW = { x: 408, y: 128, w: 100, h: 44 };
const LOOP_Y = 272;

const curve = (a, b) => `M${a.x} ${a.y} C${(a.x + b.x) / 2} ${a.y} ${(a.x + b.x) / 2} ${b.y} ${b.x} ${b.y}`;

export default function RuleEngine() {
  const arrow = useId();
  const accentArrow = useId();
  const reduced = usePrefersReducedMotion();

  const flagLeaf = leaves[3];
  const flagBranch = branches[1];
  const flagged = [
    `M84 ${ROOT.y} H${ROOT.x - ROOT.r}`,
    curve({ x: ROOT.x + ROOT.r, y: ROOT.y }, { x: flagBranch.x - flagBranch.r, y: flagBranch.y }).replace('M', 'L'),
    curve({ x: flagBranch.x + flagBranch.r, y: flagBranch.y }, { x: flagLeaf.x - LEAF, y: flagLeaf.y }).replace('M', 'L'),
  ].join(' ');

  return (
    <svg
      viewBox="0 0 520 300"
      className="mx-auto h-auto w-full max-w-[560px]"
      role="img"
      aria-label="Documents run through a decision tree of more than 150 business rules. Flagged results go to a reviewer, and the reviewer's corrections feed back into the rules."
    >
      <defs>
        <Arrowhead id={arrow} />
        <Arrowhead id={accentArrow} className="fill-accent" />
      </defs>

      <Document x={16} y={110} w={62} h={80} fold={14} />
      <Label x={47} y={214} anchor="middle">
        document
      </Label>
      <path d={`M84 ${ROOT.y} H${ROOT.x - ROOT.r - 2}`} className="stroke-muted" strokeWidth="1.5" markerEnd={`url(#${arrow})`} />

      {/* tree edges */}
      {branches.map((b, i) => (
        <path
          key={b.y}
          d={curve({ x: ROOT.x + ROOT.r, y: ROOT.y }, { x: b.x - b.r, y: b.y })}
          className={i === 1 ? 'stroke-accent' : 'stroke-muted'}
          strokeWidth={i === 1 ? 2 : 1.5}
          fill="none"
        />
      ))}
      {leaves.map((leaf) => {
        const b = branches[leaf.from];
        const hot = leaf.outcome === 'flag';
        return (
          <path
            key={leaf.y}
            d={curve({ x: b.x + b.r, y: b.y }, { x: leaf.x - LEAF, y: leaf.y })}
            className={hot ? 'stroke-accent' : 'stroke-muted'}
            strokeWidth={hot ? 2 : 1.5}
            fill="none"
          />
        );
      })}

      {/* leaves fan in to the reviewer */}
      {leaves.map((leaf) => {
        const hot = leaf.outcome === 'flag';
        return (
          <path
            key={`out-${leaf.y}`}
            d={curve({ x: 374, y: leaf.y }, { x: REVIEW.x - 3, y: REVIEW.y + REVIEW.h / 2 })}
            className={hot ? 'stroke-accent' : 'stroke-muted/40'}
            strokeWidth={hot ? 2 : 1.5}
            fill="none"
            markerEnd={hot ? `url(#${accentArrow})` : undefined}
          />
        );
      })}

      {/* feedback loop */}
      <path
        d={`M${REVIEW.x + REVIEW.w / 2} ${REVIEW.y + REVIEW.h} V${LOOP_Y} H${ROOT.x} V${ROOT.y + ROOT.r + 4}`}
        className="stroke-accent"
        strokeWidth="2"
        strokeDasharray="5 5"
        fill="none"
        markerEnd={`url(#${accentArrow})`}
      >
        {!reduced && <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.6s" repeatCount="indefinite" />}
      </path>
      <Label x={302} y={294} anchor="middle">
        corrections feed back into the rules
      </Label>

      {/* nodes */}
      <circle cx={ROOT.x} cy={ROOT.y} r={ROOT.r} className="fill-paper stroke-ink" strokeWidth="2" />
      <Label x={ROOT.x} y={ROOT.y - 40} anchor="middle" tone="ink">
        150+
      </Label>
      <Label x={ROOT.x} y={ROOT.y - 22} anchor="middle" tone="ink">
        rules
      </Label>
      {branches.map((b, i) => (
        <circle
          key={b.y}
          cx={b.x}
          cy={b.y}
          r={b.r}
          className={`fill-paper ${i === 1 ? 'stroke-accent' : 'stroke-muted'}`}
          strokeWidth={i === 1 ? 2 : 1.5}
        />
      ))}
      {leaves.map((leaf) => {
        const hot = leaf.outcome === 'flag';
        return (
          <g key={`leaf-${leaf.y}`}>
            <rect
              x={leaf.x - LEAF}
              y={leaf.y - LEAF}
              width={LEAF * 2}
              height={LEAF * 2}
              rx="3"
              className={hot ? 'fill-accent' : 'fill-paper stroke-muted'}
              strokeWidth="1.5"
            />
            <Label x={leaf.x + 14} y={leaf.y + 5} tone={hot ? 'accent' : 'muted'}>
              {leaf.outcome}
            </Label>
          </g>
        );
      })}

      <rect x={REVIEW.x} y={REVIEW.y} width={REVIEW.w} height={REVIEW.h} rx="6" className="fill-paper stroke-ink" strokeWidth="2" />
      <Label x={REVIEW.x + REVIEW.w / 2} y={REVIEW.y + REVIEW.h / 2 + 5} anchor="middle" tone="ink">
        reviewer
      </Label>

      {!reduced && (
        <circle r="5" className="fill-accent">
          <animateMotion dur="3.5s" repeatCount="indefinite" path={flagged} keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear" />
        </circle>
      )}
    </svg>
  );
}
