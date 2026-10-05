# harshaldhote_11

Personal portfolio of Harshal Dhote, Software Engineer. Live at https://harshaldhote-11.vercel.app.

Built with React, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Updating content

Everything the site says lives in [`src/data/profile.js`](src/data/profile.js): the intro and profile card, selected work, other projects, the About text, toolkit and education.

- **Résumé:** replace `public/Harshal_Dhote_Resume.pdf` (keep the file name, or update `profile.resume`).
- **Photo:** replace `src/assets/harshal.jpg` (a square crop around 400×400 works best).
- **Diagrams:** each experience or project entry can set `diagram` to one of the keys in [`src/components/diagrams/index.js`](src/components/diagrams/index.js). Leave it out to show text only.

## Blog

Posts are listed in [`src/data/posts.js`](src/data/posts.js) and shown in the Blog section of the home page. Each post opens as its own page at `/blog/<slug>/`. To add one:

1. Write the post as a component in `src/blog/posts/`, wrapped in `PostLayout` and using the blocks in `src/blog/Prose.jsx`.
2. Add `src/blog/entry-<slug>.jsx` and `blog/<slug>/index.html` (copy an existing pair and change the names, title and description).
3. Add the page to `build.rollupOptions.input` in [`vite.config.js`](vite.config.js) and the post's details to `posts.js`.

## Theme

Colours are CSS variables in [`src/index.css`](src/index.css) (`:root` for light, `[data-theme='dark']` for dark), exposed to Tailwind as `paper`, `surface`, `ink`, `muted`, `rule` and `accent`.
