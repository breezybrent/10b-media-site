# 10b.media

The official site for 10b media — a video studio in Brooklyn.

## Stack

Plain HTML, CSS, and one small Node static server. No framework, no build step,
no dependencies. `npm start` is the whole thing.

```
public/          the site
  index.html
  styles.css
  main.js        progressive enhancement only — the page works without it
  favicon.svg
server.js        static file server (node:http only)
railway.json     Nixpacks build + start command
```

## Local development

```bash
npm start          # serves on :3000
PORT=4173 npm start  # or pick a port
```

## Deploy

Railway watches the GitHub repo and rebuilds on every push to the default branch.
`PORT` is injected by the platform; `server.js` reads it.

## Notes

- `server.js` resolves paths inside `public/` only and rejects traversal.
- Unknown paths fall back to `index.html` with a 404 status.
- The site is fully responsive and honors `prefers-color-scheme` and
  `prefers-reduced-motion`.