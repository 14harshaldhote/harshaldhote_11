import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell flex flex-wrap items-center justify-between gap-3 py-8 font-mono text-xs text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="rounded hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
