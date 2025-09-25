# Custom Values Widget (Vite + React)

Minimal React app that calls:
`POST https://api.visquanta.com/webhook/call-custom-values-data`

## Quick start
```bash
npm i
npm run dev
```

Open http://localhost:5173/custom-values-tool/

## Build
```bash
npm run build
```
This outputs `dist/` with the correct GitHub Pages base path.

## Deploy to GitHub Pages
- Ensure `vite.config.ts` `base` matches your repo path: `/custom-values-tool/`
- In Settings → Pages, set **Build and deployment** to **GitHub Actions**.
- Create a workflow with the content from `.github/workflows/pages.yml` below.

## URL parameters
- `locationId` (optional default): `?locationId=KH4...`
- `pageSize`: number (default 10)

## Notes
- Styles are plain CSS (no Tailwind build required).
- The fetch URL is hard-coded to the VisQuanta endpoint in `src/api.ts`.
