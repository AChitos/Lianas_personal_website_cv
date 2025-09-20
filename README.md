# Liana Drakopoulou — Personal Website

A clean, responsive single-page website to showcase profile, experience, education, projects, and contact details.

## Features
- Mobile-first, accessible layout with sticky navigation
- Smooth scrolling and active section highlighting
- SEO meta, Open Graph, JSON-LD, `robots.txt`, and `sitemap.xml`
- Contact form with validation and mailto fallback (optional Formspree)
- Downloadable PDF CV link

## File structure
- `index.html` — main page
- `styles.css` — styles
- `script.js` — interactions & form handling
- `assets/favicon.svg` — favicon
- `CV Drakopoulou Liana.pdf` — your existing CV (linked for download)

## Run locally
Just open `index.html` in a browser.

Optionally use a local server for best experience:

```sh
# macOS built-in Python server
python3 -m http.server 8000
```
Then visit http://localhost:8000/

## Contact form (direct submissions)
To enable direct submissions (instead of mailto), create a free endpoint at https://formspree.io and set the `FORMSPREE` constant in `script.js` to your endpoint URL.

## Deploy
You can host this anywhere static sites work: GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.

- GitHub Pages: push this folder to a repo and enable Pages (root)
- Netlify/Vercel: drag-and-drop the folder or connect the repo

## License
All content © Liana Drakopoulou. Code in this folder may be reused with attribution.
