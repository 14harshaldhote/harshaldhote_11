import { Download, Github, Linkedin, Mail } from 'lucide-react';
import portrait from '../assets/harshal-portrait.webp';
import portraitMobile from '../assets/harshal-portrait-mobile.webp';
import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="shell pb-20 pt-8 md:pb-28 md:pt-24">
      <div className="grid gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="flex animate-rise items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            {profile.role} · {profile.location}
          </p>

          {/* From md up the size follows the viewport, so the headline stays on three lines beside the portrait. */}
          <h1 className="mt-6 animate-rise font-serif text-[2.9rem] leading-[1.02] tracking-[-0.01em] text-ink [animation-delay:60ms] sm:text-6xl md:text-[length:clamp(3rem,6vw,5.4rem)]">
            Hi, I’m {profile.firstName}.
            <span className="block text-muted">
              I build backend systems that hold up to an <em className="text-accent">audit</em>.
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-rise text-[17px] leading-relaxed text-muted [animation-delay:120ms]">
            {profile.intro}
          </p>

          {/* Compact below lg so the social icons stay on the button row; if they can't, they wrap together. */}
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-1.5 [animation-delay:180ms] sm:gap-2 lg:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-85 sm:px-4 lg:px-5"
            >
              <Mail size={16} strokeWidth={1.75} />
              Get in touch
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex h-11 items-center gap-2 rounded-md border border-rule px-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 sm:px-4 lg:px-5"
            >
              <Download size={16} strokeWidth={1.75} />
              <span>
                Résumé<span className="hidden lg:inline"> (PDF)</span>
              </span>
            </a>
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-rule sm:block" />
              <a
                href={profile.github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-9 place-items-center rounded-md text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:w-10 lg:w-11"
              >
                <Github size={19} strokeWidth={1.75} />
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-9 place-items-center rounded-md text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:w-10 lg:w-11"
              >
                <Linkedin size={19} strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>

        {/* Phones: a face-centred head-and-shoulders crop, shown above the headline.
            md up: the full portrait sits on the next section's rule (negative margin cancels the section padding).
            The face is ~70% across the image, so the width/margin pairs below put it on the column's centre line.
            The photo ignores pointer events and blocks the context menu, so there is no "Save image", drag or long-press save. */}
        <div
          onContextMenu={(event) => event.preventDefault()}
          className="order-first animate-rise self-end md:order-none md:col-span-5 md:-mb-28 md:[animation-delay:240ms]"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={portrait} width="1051" height="1047" />
            <img
              src={portraitMobile}
              alt="Portrait of Harshal Dhote"
              width="560"
              height="560"
              fetchPriority="high"
              draggable={false}
              className="portrait-fade pointer-events-none mx-auto w-64 select-none [-webkit-touch-callout:none] md:-ml-[44.5%] md:w-[135%] md:max-w-none lg:-ml-[33%] lg:w-[118%]"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
