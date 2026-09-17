import Section from './Section';
import { about, education, toolkit } from '../data/profile';

export default function About() {
  return (
    <Section id="about" index="02" title="About">
      <div className="max-w-3xl space-y-5 text-[18px] leading-8 text-ink/85 md:text-[20px] md:leading-9">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Toolkit</h3>
          <dl className="mt-4 border-t border-rule">
            {toolkit.map(({ group, items }) => (
              <div key={group} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-3.5">
                <dt className="pt-0.5 text-sm text-muted">{group}</dt>
                <dd className="text-[15px] leading-6 text-ink">{items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Studied</h3>
          <ol className="mt-4 border-t border-rule">
            {education.map(({ school, degree }) => (
              <li key={school} className="border-b border-rule py-3.5">
                <p className="text-[15px] leading-6 text-ink">{degree}</p>
                <p className="text-sm text-muted">{school}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
