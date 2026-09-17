import { ArrowUpRight } from 'lucide-react';
import { diagrams } from './diagrams';

export default function CaseStudy({ tag, title, summary, highlights, stack, link, diagram, figure, caption, flip = false }) {
  const Diagram = diagrams[diagram];

  return (
    <article className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
      <div className={`lg:col-span-5 ${flip ? 'lg:order-last' : ''}`}>
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">{tag}</p>
        <h3 className="mt-3 font-serif text-[2rem] leading-[1.1] text-ink md:text-[2.4rem]">{title}</h3>
        <p className="mt-5 text-[16px] leading-7 text-ink/80">{summary}</p>

        <ul className="mt-6 space-y-2.5 border-t border-rule pt-5 text-[15px] leading-6 text-muted">
          {highlights.map((item) => (
            <li
              key={item}
              className="relative pl-4 before:absolute before:left-0 before:top-[10px] before:h-1 before:w-1 before:bg-accent"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="font-mono text-xs text-muted">{stack.join(' · ')}</p>
          {link && (
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
            >
              {link.label}
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </a>
          )}
        </div>
      </div>

      {Diagram && (
        <figure className="rounded-lg border border-rule bg-surface p-3 sm:p-6 lg:col-span-7">
          <Diagram />
          <figcaption className="mt-4 border-t border-rule pt-3 font-mono text-[11.5px] leading-relaxed text-muted">
            Fig. {figure} · {caption}
          </figcaption>
        </figure>
      )}
    </article>
  );
}
