// Building blocks for blog posts, styled to match the rest of the site.

export function H2({ children }) {
  return <h2 className="mt-14 font-serif text-[2rem] leading-tight text-ink md:text-[2.4rem]">{children}</h2>;
}

export function H3({ children }) {
  return <h3 className="mt-9 text-lg font-semibold text-ink">{children}</h3>;
}

export function P({ children }) {
  return <p className="mt-5 text-[17px] leading-8 text-ink/85">{children}</p>;
}

export function List({ items, ordered = false }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`mt-5 space-y-3 text-[17px] leading-8 text-ink/85 ${ordered ? 'list-decimal pl-6 marker:font-mono marker:text-sm marker:text-accent' : ''}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={
            ordered
              ? 'pl-1'
              : 'relative pl-5 before:absolute before:left-0 before:top-[14px] before:h-1.5 before:w-1.5 before:bg-accent'
          }
        >
          {item}
        </li>
      ))}
    </Tag>
  );
}

export function Code({ children }) {
  return <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink">{children}</code>;
}

export function Pre({ children }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-lg border border-rule bg-surface p-4 font-mono text-[13.5px] leading-6 text-ink/90">
      {children}
    </pre>
  );
}

export function Note({ title, children }) {
  return (
    <aside className="mt-8 border-l-2 border-accent bg-surface px-5 py-4">
      {title && <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">{title}</p>}
      <div className="mt-2 text-[16px] leading-7 text-ink/85">{children}</div>
    </aside>
  );
}

export function Figure({ src, alt, caption, wide = false }) {
  return (
    <figure className={`mt-9 ${wide ? 'lg:-mx-24' : ''}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg border border-rule" />
      {caption && <figcaption className="mt-3 font-mono text-[12px] leading-relaxed text-muted">{caption}</figcaption>}
    </figure>
  );
}

export function Table({ head, rows }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-ink/30">
            {head.map((h) => (
              <th key={h} className="py-2.5 pr-6 font-mono text-xs font-normal uppercase tracking-[0.08em] text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-rule align-top">
              {row.map((cell, j) => (
                <td key={j} className={`py-3 pr-6 leading-6 ${j === 0 ? 'text-ink' : 'text-ink/80'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function A({ href, children }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="text-ink underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  );
}
