# andybeardness.github.io

Static GitHub Pages site published at https://andybeardness.github.io/.
Hosts a landing page plus per-project sub-pages with **support contact** and
**privacy policy** — used as the support/privacy URLs required by App Store /
Google Play listings.

## Structure

```
/
├── index.html                  ← Root landing. Lists all projects.
├── korobochka/
│   ├── index.html              ← Support page (URL for store listings).
│   └── privacy.html            ← Privacy policy (URL for store listings).
├── formular/
│   ├── index.html
│   └── privacy.html
├── README.md
└── CLAUDE.md
```

Each project lives in its own folder. The folder name is the URL slug.

## URLs for store submissions

| Project    | Support URL                                          | Privacy URL                                                  |
|------------|------------------------------------------------------|--------------------------------------------------------------|
| Korobochka | https://andybeardness.github.io/korobochka/          | https://andybeardness.github.io/korobochka/privacy.html      |
| Formular   | https://andybeardness.github.io/formular/            | https://andybeardness.github.io/formular/privacy.html        |

## Adding a new project

1. Create a folder: `mkdir <slug>`
2. Copy `index.html` and `privacy.html` from an existing project (e.g.
   `cp korobochka/index.html <slug>/ && cp korobochka/privacy.html <slug>/`).
3. Edit the new files — replace project name, update `/korobochka/` paths to
   `/<slug>/`, fill in the privacy policy text.
4. Add a link to the new project in the root `index.html` (`.projects` block).

## Conventions

- Pure static HTML + inline CSS. No build step, no dependencies.
- Each page is self-contained — same minimal dark theme repeated inline so any
  page works in isolation.
- All pages share these CSS variables: `--bg #0f1115`, `--fg #e7eaf0`,
  `--muted #8b93a7`, `--card #171a21`, `--border #242833`, `--accent #7aa2f7`.
- Contact email: `beardness.andy.dev@gmail.com` (referenced from all pages).
- Privacy policy template assumes **no remote data collection** — adjust per
  project if that changes (analytics SDKs, accounts, cloud sync, etc.).
- Set the real "Effective date" on each privacy page before submitting to a
  store; the template ships with `TBD`.

## Deployment

GitHub Pages serves the `release` branch (current default branch) directly —
push to `release` and the site updates within ~1 minute. No CI / build action.
