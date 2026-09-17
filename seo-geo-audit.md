# Audit SEO + GEO — La clé de voûte

> Audit local mis à jour le 17 septembre 2026 sur le checkout `C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute`.

## Verdict

**GO technique local pour le SEO/GEO**, avec des réserves légales et de publication qui ne peuvent pas être résolues par du code seul : vérifier les informations de l'entreprise, renseigner le médiateur de la consommation choisi et contrôler le traitement Google Maps avant la mise en ligne définitive.

Le site possède maintenant :

- une URL canonique unique dans `site.config.json` ;
- un chemin Vite déduit automatiquement de cette URL, compatible avec GitHub Pages (`/CleDeVoute/`) puis avec un domaine racine (`/`) ;
- des titres, descriptions, canonical, Open Graph et Twitter metadata par route ;
- un JSON-LD local de type `GeneralContractor`, avec adresse, téléphone, SIREN, logo, image, zone, contact et prestations réellement visibles sur le site ;
- une politique de confidentialité dédiée, reliée aux mentions légales et au footer ;
- une page CGU adaptée au fonctionnement actuel de site vitrine, reliée aux pages légales et au footer ;
- un `robots.txt`, un `sitemap.xml`, un `llms.txt` et un `llms-full.txt` régénérés à chaque build ;
- un fallback 404 `noindex` sans canonical, image sociale ni JSON-LD de l'accueil ;
- des données structurées adaptées aux routes légales lors d'une navigation interne ;
- des contrôles de publication qui bloquent les tokens d'URL oubliés, les routes absentes, les liens internes manquants et les URLs absentes du sitemap.

## Contrôles réalisés

| Contrôle | Statut | Preuve |
|---|---|---|
| URL canonique configurable | PASS | `site.config.json`, `vite.config.ts`, `scripts/prepare-pages.mjs` |
| Canonical HTTPS | PASS | Le build et les contrôles refusent toute `siteUrl` qui n'est pas en `https://` |
| Passage GitHub Pages → domaine racine | PASS | Build simulé avec `VITE_SITE_URL=https://www.exemple.test/` : aucun chemin `/CleDeVoute/` résiduel dans les fichiers SEO générés |
| Title et description accueil | PASS | `index.html` + mise à jour runtime de `src/lib/language.tsx` |
| Title et description mentions légales | PASS | route statique générée et route React contrôlée |
| Politique de confidentialité | PASS | `/politique-confidentialite`, métadonnées, lien footer et route statique |
| CGU | PASS | `/cgu`, métadonnées, lien footer et route statique |
| 404 non indexable | PASS | `dist/404.html` et route inconnue runtime : `noindex`, aucun canonical/JSON-LD |
| Canonical et `og:url` | PASS | une URL par route indexable, calculée depuis le base path |
| Open Graph / Twitter | PASS | `og:title`, `og:description`, `og:image`, dimensions, alt, Twitter title/description/image |
| JSON-LD local | PASS | JSON valide ; `GeneralContractor`, `WebSite`, `WebPage`, adresse, zone, prestations |
| Robots | PASS | `dist/robots.txt` référence le sitemap et documente les crawlers de recherche/réponse |
| Sitemap | PASS | XML valide, accueil + mentions légales + politique de confidentialité + CGU, aucune 404 |
| Liens internes publiés | PASS | `scripts/check-critical-links.mjs` vérifie les cibles HTML/assets générées |
| LLM/GEO textuel | PASS | `public/llms.txt` et `public/llms-full.txt` décrivent identité, activité, zone, contact, réalisations et limites |
| Formulaire de contact | PASS | Nom, e-mail, téléphone facultatif, objet, message, validation, champ piège invisible et lien RGPD ; aucun endpoint serveur ajouté |
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
- La génération impose `https://`, mais la redirection HTTP→HTTPS et l'option « Enforce HTTPS » restent à vérifier sur l'hébergement final.
- Le médiateur de la consommation n'est pas mentionné tant que son identité et ses coordonnées ne sont pas fournies par l'entreprise ; il ne faut pas publier un nom supposé.
- La carte Google Maps est volontairement chargée automatiquement, conformément au choix produit ; le risque tiers est documenté dans les mentions légales et la politique de confidentialité, mais la conformité du consentement doit encore être arbitrée.
- Le formulaire est adapté à GitHub Pages : il prépare un e-mail via `mailto:` et ne fournit pas de stockage ni de validation serveur. Il n'impose pas de captcha visible ; le champ piège invisible limite seulement les soumissions automatisées basiques. Une migration vers un vrai endpoint nécessitera alors rate limiting, validation serveur, protection CSRF et un nouveau cadrage RGPD.

## Vérifications locales

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run check:assets` — PASS
- `npm run build` — PASS
- `npm run prepare-pages` — PASS
- `npm test` — PASS, incluant sitemap, robots, llms, JSON-LD, routes légales/CGU et tokens d'URL
- `npm run check:links` — PASS, toutes les cibles internes publiées existent
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

## Points légaux à valider par le propriétaire

Le site contient les pages et informations techniques nécessaires à un site vitrine, mais leur exactitude et les choix juridiques restent sous la responsabilité de l'entreprise :

- confirmer l'identité, l'adresse, les numéros d'immatriculation, l'hébergeur et la date de mise à jour ;
- choisir le médiateur de la consommation compétent et ajouter ses coordonnées avant de présenter le site comme entièrement conforme pour les particuliers ;
- décider, avec le responsable du site, du traitement applicable au chargement automatique de Google Maps ; cette demande a été volontairement laissée inchangée ;
- documenter la provenance et les droits d'utilisation des photographies, notamment `hero-premium.jpg`.

Repères officiels à relire avec le responsable du site : [mentions obligatoires](https://entreprendre.service-public.fr/vosdroits/F2160), [médiation de la consommation](https://www.economie.gouv.fr/mediation-conso/vous-etes-un-professionnel/choisir-un-mediateur-de-la-consommation/mediateurs-references), [information des personnes](https://cnil.fr/fr/informer-les-personnes) et [règles cookies/traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies).
