export default function Section({ id, index, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="shell py-20 md:py-28">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-xs text-accent md:text-sm">{index}</span>
          <h2 id={`${id}-title`} className="font-serif text-[2.75rem] leading-none text-ink md:text-6xl">
            {title}
          </h2>
        </div>
        <div className="mt-8 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
