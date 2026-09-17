import { Download, Moon, Sun } from 'lucide-react';
import Monogram from './Monogram';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// 'top' is observed too, so scrolling back to the hero clears the highlight.
const observedIds = ['top', ...links.map((l) => l.id)];

export default function Header({ theme, onToggleTheme }) {
  const active = useActiveSection(observedIds);
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/80 backdrop-blur-md">
      <div className="shell flex h-14 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 rounded text-ink">
          <Monogram className="h-7 w-7" />
          <span className="text-[15px] font-medium tracking-tight">{profile.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden h-full md:block">
          <ul className="flex h-full items-center gap-1">
            {links.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative flex h-full items-center">
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`rounded px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                  </a>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            {isDark ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
          </button>
          <a
            href={profile.resume}
            download
            className="inline-flex h-9 items-center gap-2 rounded-md border border-rule px-3 text-sm text-ink transition-colors hover:border-ink/40"
          >
            <Download size={15} strokeWidth={1.75} />
            <span>Résumé</span>
          </a>
        </div>
      </div>
    </header>
  );
}
