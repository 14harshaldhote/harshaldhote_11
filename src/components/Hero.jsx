import { Download, Github, Linkedin, Mail } from 'lucide-react';
import photo from '../assets/harshal.jpg';
import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="shell pb-20 pt-14 md:pb-28 md:pt-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 lg:col-span-8">
          <p className="flex animate-rise items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            {profile.role} · {profile.location}
          </p>

          <h1 className="mt-6 animate-rise font-serif text-[2.9rem] leading-[1.02] tracking-[-0.01em] text-ink [animation-delay:60ms] sm:text-6xl lg:text-[5.4rem]">
            Hi, I’m {profile.firstName}.
            <span className="block text-muted">
              I build backend systems that hold up to an <em className="text-accent">audit</em>.
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-rise text-[17px] leading-relaxed text-muted [animation-delay:120ms]">
            {profile.intro}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:180ms]">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              <Mail size={16} strokeWidth={1.75} />
              Get in touch
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-md border border-rule px-5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              <Download size={16} strokeWidth={1.75} />
              Résumé (PDF)
            </a>
            <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-rule sm:block" />
            <a
              href={profile.github.url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-md text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Github size={19} strokeWidth={1.75} />
            </a>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-md text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Linkedin size={19} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <aside className="animate-rise self-end [animation-delay:240ms] md:col-span-5 lg:col-span-4">
          <div className="overflow-hidden rounded-lg border border-rule bg-surface">
            <div className="flex items-center gap-4 border-b border-rule p-5">
              <img
                src={photo}
                alt="Portrait of Harshal Dhote"
                width="64"
                height="64"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-ink">{profile.name}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">@{profile.github.handle}</p>
              </div>
            </div>
            <dl className="divide-y divide-rule text-sm">
              {profile.card.map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4 px-5 py-3">
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{term}</dt>
                  <dd className="text-right text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
