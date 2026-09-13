# Audit SEO + GEO — La clé de voûte

> Audit local réalisé le 13 septembre 2026 sur le checkout `C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute`.

## Verdict

**GO technique local pour le SEO/GEO**, avec un point de publication à faire après le prochain déploiement : vérifier les URLs finales et inscrire le domaine dans Google Search Console et la fiche Google Business Profile.

Le site possède maintenant :

- une URL canonique unique dans `site.config.json` ;
- un chemin Vite déduit automatiquement de cette URL, compatible avec GitHub Pages (`/CleDeVoute/`) puis avec un domaine racine (`/`) ;
- des titres, descriptions, canonical, Open Graph et Twitter metadata par route ;
- un JSON-LD local de type `GeneralContractor`, avec adresse, téléphone, SIREN, logo, image, zone et prestations réellement visibles sur le site ;
- un `robots.txt`, un `sitemap.xml` et un `llms.txt` régénérés à chaque build ;
- un fallback 404 `noindex` sans canonical, image sociale ni JSON-LD de l'accueil ;
- des données structurées adaptées à la route légale lors d'une navigation interne ;
- des contrôles de publication qui bloquent les tokens d'URL oubliés, les routes absentes et les URLs manquantes du sitemap.

## Contrôles réalisés

| Contrôle | Statut | Preuve |
|---|---|---|
| URL canonique configurable | PASS | `site.config.json`, `vite.config.ts`, `scripts/prepare-pages.mjs` |
| Passage GitHub Pages → domaine racine | PASS | Build simulé avec `VITE_SITE_URL=https://www.exemple.test/` : aucun chemin `/CleDeVoute/` résiduel dans les fichiers SEO générés |
| Title et description accueil | PASS | `index.html` + mise à jour runtime de `src/lib/language.tsx` |
| Title et description mentions légales | PASS | route statique générée et route React contrôlée |
| 404 non indexable | PASS | `dist/404.html` et route inconnue runtime : `noindex`, aucun canonical/JSON-LD |
| Canonical et `og:url` | PASS | une URL par route indexable, calculée depuis le base path |
| Open Graph / Twitter | PASS | `og:title`, `og:description`, `og:image`, dimensions, alt, Twitter title/description/image |
| JSON-LD local | PASS | JSON valide ; `GeneralContractor`, `WebSite`, `WebPage`, adresse, zone, prestations |
| Robots | PASS | `dist/robots.txt` référence l'URL canonique du sitemap |
| Sitemap | PASS | XML valide, accueil + mentions légales uniquement, aucune 404 |
| LLM/GEO textuel | PASS | `public/llms.txt` décrit identité, activité, zone, contact, rubriques et limites à ne pas extrapoler |
| Signaux locaux visibles | PASS | Sedan, Ardennes, adresse, téléphone, e-mail et services présents dans le contenu rendu |
| Images | PASS | 12 images raster sous 512 Ko ; alt renseignés ; images de contenu présentes dans le HTML |
| Responsive | PASS | 375 px contrôlé, aucun débordement horizontal ; CTA accessible |
| Sécurité dépendante de l'hébergeur | UNKNOWN | GitHub Pages ne permet pas de prouver les headers HTTP finaux depuis le dépôt |

## Ce qui reste côté référencement local

Le code prépare les signaux techniques, mais il ne peut pas créer les signaux externes appartenant au propriétaire :

1. vérifier ou créer la fiche Google Business Profile avec exactement le même nom, adresse et téléphone ;
2. vérifier le domaine dans Google Search Console ;
3. soumettre `https://.../sitemap.xml` après publication ;
4. demander l'inspection de l'accueil et des mentions légales après le premier déploiement ;
5. ajouter uniquement des avis, photos, certifications ou profils sociaux réels et vérifiables.

Le balisage structuré aide les moteurs à comprendre l'entreprise, mais ne garantit ni affichage enrichi ni classement. Google recommande le JSON-LD et exige que les données décrivent réellement le contenu visible de la page ([consignes générales sur les données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [données structurées LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)).

Le sitemap est correctement présent et référencé par `robots.txt`, mais il reste un signal de découverte et non une garantie d'indexation ([documentation Google sur les sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)).

## Limites restantes

- `og-image.jpg` est fonctionnelle mais portrait (1086×1448) ; une image sociale dédiée au format paysage serait une optimisation visuelle ultérieure, pas un blocage d'indexation.
- La provenance/licence de `hero-premium.jpg` n'est pas documentée dans le dépôt ; aucune affirmation n'est ajoutée sans information du propriétaire.
- `llms.txt` est un complément éditorial pour les moteurs de réponse et assistants ; il ne remplace ni le HTML, ni le sitemap, ni les données structurées.
- Les headers HTTP finaux (`Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options`) doivent être relus après publication ; les metas HTML ne les remplacent pas.
- La carte Google Maps est volontairement chargée automatiquement, conformément au choix produit ; le risque tiers est documenté dans les mentions légales.

## Vérifications locales

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run check:assets` — PASS
- `npm run build` — PASS
- `npm run prepare-pages` — PASS
- `npm test` — PASS, incluant sitemap, robots, llms, JSON-LD, routes et tokens d'URL
- `npm audit --omit=dev --audit-level=high` — PASS, 0 vulnérabilité
- DAST passif localhost — PASS sans erreur ; headers HTTP de défense en profondeur non fournis par Vite preview
- Rendu navigateur accueil, mentions légales, 404, mobile 375 px — PASS, console sans erreur

## Préparation du passage en production

Modifier uniquement `site.config.json` :

```json
{
  "siteUrl": "https://www.domaine-final.fr/"
}
```

Puis relancer le workflow GitHub Pages. Le chemin des assets, les canonical, les URLs sociales, le sitemap, `robots.txt`, `llms.txt` et le JSON-LD seront recalculés à partir de cette valeur.
