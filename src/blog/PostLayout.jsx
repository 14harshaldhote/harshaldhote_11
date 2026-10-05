import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatDate, postUrl, posts } from '../data/posts';
import { profile } from '../data/profile';

export default function PostLayout({ slug, links = [], children }) {
  const post = posts.find((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <Header home={false} />
      <main id="main">
        <article id="top" className="shell pb-20 pt-10 md:pb-28 md:pt-16">
          <div className="mx-auto max-w-[720px]">
            <a href="/#blog" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-ink">
              <ArrowLeft size={14} strokeWidth={1.75} />
              All posts
            </a>

            <header className="mt-8 border-b border-rule pb-8">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">{post.tags.join(' · ')}</p>
              <h1 className="mt-4 font-serif text-[2.6rem] leading-[1.05] text-ink md:text-[3.6rem]">{post.title}</h1>
              <p className="mt-5 text-[18px] leading-relaxed text-muted">{post.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
                <span>{profile.name}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
                {links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="text-ink underline decoration-rule underline-offset-4 hover:decoration-accent">
                    {l.label}
                  </a>
                ))}
              </div>
            </header>

            <div className="pb-4">{children}</div>

            {others.length > 0 && (
              <nav aria-label="More posts" className="mt-16 border-t border-rule pt-8">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Read next</p>
                <ul className="mt-4 space-y-4">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <a href={postUrl(p.slug)} className="group inline-flex items-baseline gap-2 font-serif text-2xl text-ink hover:text-accent">
                        {p.title}
                        <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
