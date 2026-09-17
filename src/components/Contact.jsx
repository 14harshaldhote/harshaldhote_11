import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import Section from './Section';
import { profile } from '../data/profile';

const links = [
  { label: 'GitHub', detail: `/${profile.github.handle}`, url: profile.github.url, external: true },
  { label: 'LinkedIn', detail: `/in/${profile.linkedin.handle}`, url: profile.linkedin.url, external: true },
  { label: 'Résumé', detail: 'PDF, 1 page', url: profile.resume, download: true },
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard access denied; the mailto link is still there.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-rule px-3 font-mono text-xs text-muted transition-colors hover:border-ink/40 hover:text-ink"
    >
      {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <Section id="contact" index="03" title="Say hello">
      <p className="max-w-lg text-[17px] leading-relaxed text-muted">
        Have a question, a role, or a system that needs to be right? Email is the best way to reach me.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
        <a
          href={`mailto:${profile.email}`}
          className="font-serif text-[2.1rem] leading-tight text-ink underline decoration-rule decoration-1 underline-offset-[8px] transition-colors hover:decoration-accent sm:text-5xl"
        >
          {profile.email}
        </a>
        <CopyEmail />
      </div>

      <ul className="mt-12 grid gap-px border-y border-rule bg-rule sm:grid-cols-3">
        {links.map(({ label, detail, url, external, download }) => (
          <li key={label} className="bg-paper sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <a
              href={url}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              {...(download ? { download: true } : {})}
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span>
                <span className="block font-medium text-ink">{label}</span>
                <span className="mt-0.5 block font-mono text-xs text-muted">{detail}</span>
              </span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
