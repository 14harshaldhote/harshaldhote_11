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

## Theme

Colours are CSS variables in [`src/index.css`](src/index.css) (`:root` for light, `[data-theme='dark']` for dark), exposed to Tailwind as `paper`, `surface`, `ink`, `muted`, `rule` and `accent`.
