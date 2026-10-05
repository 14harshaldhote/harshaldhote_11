import { ArrowRight } from 'lucide-react';
import Section from './Section';
import { formatDate, postUrl, posts } from '../data/posts';

export default function Blog() {
  return (
    <Section id="blog" index="02" title="Blog">
      <p className="max-w-2xl text-[17px] leading-relaxed text-muted">
        Longer write-ups of things I built: what the problem was, the engineering behind it, and what I would do
        differently. Written so you don’t need to be in the field to follow along.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <a
              href={postUrl(post.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface transition-colors hover:border-ink/30"
            >
              <div className="aspect-[16/8] overflow-hidden border-b border-rule bg-paper">
                <img
                  src={post.cover}
                  alt={post.coverAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="font-mono text-xs text-muted">
                  {formatDate(post.date)} · {post.readTime}
                </p>
                <h3 className="mt-3 font-serif text-[1.75rem] leading-[1.15] text-ink md:text-[2rem]">{post.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{post.summary}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-muted">{post.tags.join(' · ')}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read the post
                    <ArrowRight size={15} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
