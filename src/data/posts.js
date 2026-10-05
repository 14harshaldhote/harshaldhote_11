// Blog posts listed on the home page. Each post's text lives in src/blog/posts and is
// built as its own page at /blog/<slug>/ (see vite.config.js).
import lotusCover from '../assets/blog/lotuslab/morning.webp';
import ctCover from '../assets/blog/chest-ct/dashboard.webp';

export const posts = [
  {
    slug: 'lotuslab',
    title: 'Building a pond that runs on real weather',
    summary:
      'How LotusLab turns hourly rain, sun and heat into a living lotus pond, keeps track of every litre, and lets you scrub through months of it without waiting.',
    date: '2026-10-05',
    readTime: '9 min read',
    tags: ['Python', 'FastAPI', 'React', 'Algorithms'],
    cover: lotusCover,
    coverAlt: 'LotusLab pond scene in the morning: blue sky, sun, clouds and lotus pads on the water.',
  },
  {
    slug: 'chest-ct-classifier',
    title: 'My cancer classifier said 100%. It was wrong.',
    summary:
      'Rebuilding a chest CT classifier the honest way: finding the duplicate images behind a fake perfect score, a reproducible pipeline, and a model that shows where it looked.',
    date: '2026-10-05',
    readTime: '8 min read',
    tags: ['Deep learning', 'MLOps', 'DVC', 'MLflow'],
    cover: ctCover,
    coverAlt: 'Chest CT classifier dashboard with sample scans, a prediction with a Grad-CAM heatmap, and test-set metrics.',
  },
];

export const postUrl = (slug) => `/blog/${slug}/`;

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
