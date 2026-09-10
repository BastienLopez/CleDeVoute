# Clé de Voûte

Site vitrine React/Vite pour une entreprise de maçonnerie générale et de gros œuvre.

## Prérequis

- Node.js 20.19+ (ou 22.12+) requis par Vite 8 ; le workflow utilise la dernière version Node 20 disponible
- npm

## Installation

```sh
npm ci
```

## Développement

```sh
npm run dev
```

Le serveur de développement écoute uniquement sur `localhost`.

## Vérifications locales

```sh
npm run lint
npm run typecheck
npm run check:assets
npm run build
npm run prepare-pages
npm test
npm audit --omit=dev --audit-level=high
```

`npm run prepare-pages` doit être lancé après le build. Il génère la route statique des mentions légales et le fallback 404 dans `dist`.

## Preview du build

```sh
npm run preview
```

Avec la configuration GitHub Pages actuelle, le build est servi sous `/CleDeVoute/`.

## Publication

Le workflow `.github/workflows/gh-pages.yml` installe avec `npm ci`, exécute les contrôles, construit `dist`, prépare les routes statiques puis publie l’artefact GitHub Pages. Aucun secret applicatif n’est requis par le site statique.

La migration UI/UX de phase 7 reste volontairement hors de ce socle. Les décisions et informations nécessaires aux phases 0 à 6 sont listées dans `manque_phase.md`.
