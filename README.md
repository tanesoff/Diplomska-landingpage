# FINKI AI Assistant — landing page

A small static landing page for the FINKI AI Assistant Chrome extension.
Hosted on GitHub Pages. No build step — pure HTML, CSS, vanilla JS.

## Live

When deployed via GitHub Pages from this repo's `main` branch, the page
serves at:

```
https://tanesoff.github.io/Diplomska-landingpage/
```

## Layout

```
.
├── index.html         # all page content with data-mk / data-en attributes
├── styles.css         # FINKI brand styling (#005281)
├── script.js          # language switcher (MK ↔ EN) + small UI niceties
└── img/               # screenshots and the architecture diagram
    ├── hero-chat.png
    ├── welcome.png
    ├── button.png
    ├── admin.png
    └── architecture.png
```

## How language switching works

Every translatable element carries both `data-mk` and `data-en`
attributes. The page renders with Macedonian by default (works without
JS). When the user clicks the EN/МК toggle, `script.js` walks every
`[data-mk][data-en]` element and swaps the text. The choice is
persisted in localStorage so reloads keep the language.

## How to update the extension download

The big "Download extension" button on the page links to the latest
GitHub Release of the `Diplomska-frontend` repository:

```
https://github.com/<owner>/Diplomska-frontend/releases/latest
```

When you ship a new version of the extension:

1. Build the extension: `cd Diplomska-frontend && npm run build`
2. Zip the `dist/` folder: `zip -r finki-ai-assistant.zip dist/`
3. Create a new release on GitHub
   (`gh release create v1.0 finki-ai-assistant.zip`)
4. The "latest" link on the landing page picks up the new release
   automatically — no landing-page redeploy needed.

## Hosting on GitHub Pages

After pushing this folder to a new repository on GitHub:

1. Go to the repository **Settings → Pages**
2. Under "Source", select **Branch: `main`** and **Folder: `/ (root)`**
3. Save. The first deployment takes ~1 minute.
4. The page is live at `https://<owner>.github.io/<repo-name>/`.

No GitHub Actions needed — Pages serves the static files directly.

## Local preview

Any static-file server works. The simplest:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## License

This page is part of a diploma thesis project. Use freely for reference;
the FINKI brand colors and reference to the institution are subject to
the faculty's own brand guidelines.
