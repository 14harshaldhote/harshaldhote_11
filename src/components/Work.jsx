import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import CaseStudy from './CaseStudy';
import { currentJob, otherWork, work } from '../data/profile';

export default function Work() {
  return (
    <Section id="work" index="01" title="Selected work">
      <p className="max-w-2xl text-[17px] leading-relaxed text-muted">
        I’m a {currentJob.role} at <span className="text-ink">{currentJob.company}</span> in {currentJob.location}, since{' '}
        {currentJob.since}. Two stories from there, and two things I built on my own.
      </p>

      <div className="mt-4 divide-y divide-rule border-b border-rule">
        {work.map((item, i) => (
          <CaseStudy key={item.title} {...item} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Also built</h3>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {otherWork.map((item) => (
            <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.description}</p>
              </div>
              <div className="flex items-center gap-5 font-mono text-xs text-muted">
                <span>{item.year}</span>
                {item.link && (
                  <a
                    href={item.link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-ink hover:text-accent"
                  >
                    {item.link.label} <ArrowUpRight size={13} strokeWidth={1.75} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
