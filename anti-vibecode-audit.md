# Audit anti-vibecode et readiness — Clé de Voûte

> Audit complet après corrections ciblées — 13 septembre 2026
>
> Périmètre : checkout `C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute`, branche `main`, modifications non commitées présentes dans le worktree. L’audit couvre le socle P0–P6, les corrections ciblées P7 demandées sur l’image, le contenu, la galerie, les métadonnées, le scaffold et la carte tierce, ainsi que les limites GitHub Pages.

## 1. Verdict exécutif

La base P0–P6 reste fonctionnelle et le lot de corrections demandé passe les contrôles locaux : installation reproductible, dépendances réduites au runtime réellement utilisé, build, typecheck, lint sans erreur, contrats de publication, routes locales, sécurité npm, interactions principales et responsive validés. L’image hero est optimisée, réutilisée pour le partage social, la galerie expose maintenant une fiche projet, le contenu est moins abstrait et la carte Google Maps est de nouveau chargée automatiquement.

Le verdict n’est pas « production validée » : aucun commit, push ni déploiement n’a été effectué depuis ce checkout. Les headers `Content-Security-Policy`, `Referrer-Policy` et `X-Content-Type-Options` ne peuvent pas être ajoutés par le code statique sur GitHub Pages et restent à vérifier après publication. La provenance/licence de la photo hero n’est pas documentée dans le dépôt ; aucune origine n’est inventée dans le correctif.

### Comptage des 94 contrôles

| Statut | Nombre |
|---|---:|
| PASS | 53 |
| JUSTIFIED | 12 |
| N/A | 27 |
| UNKNOWN | 2 |
| FAIL | 0 |
| **Total** | **94** |

`UNKNOWN` concerne `L17` (consentement applicable au chargement tiers automatique) et `S18` (headers de sécurité de l’hébergement). La provenance de l’image hero reste une information propriétaire non fournie ; elle est signalée comme limite de crédibilité, sans être transformée en affirmation factuelle. Les motifs visuels conservés — Playfair/Inter, repères en capitales, structure one-page et carrousel automatique — sont désormais des choix bornés ou des éléments à réévaluer si une refonte artistique supplémentaire est souhaitée.

## 2. Périmètre et niveau de preuve

- Audit statique du diff, de la configuration, des scripts, des dépendances, du build et des assets.
- Reproduction locale de la chaîne CI/CD jusqu’à l’artifact `dist`.
- Parcours navigateur sur l’accueil, les mentions légales, une route inconnue, FR/EN, menu, CTA, galerie, fermeture Échap et restauration du focus.
- Responsive contrôlé aux largeurs 320, 375, 768, 1024 et 1440 px pendant cet audit ; aucun débordement horizontal de page n’a été observé, le débordement interne du carrousel étant intentionnel. L’alignement du logo et du repère mobile a été mesuré à moins d’un pixel d’écart.
- Audit sécurité white-box et DAST passif limité à localhost ; aucune action intrusive.
- Vérification en lecture seule de l’URL publique existante. Aucun accès aux paramètres GitHub, DNS, Search Console ou compte propriétaire.

Les statuts signifient : `PASS` preuve directe ; `JUSTIFIED` choix volontaire et borné ; `N/A` contrôle non applicable ; `UNKNOWN` preuve externe ou décision encore manquante ; `FAIL` écart non accepté.

## 3. État du patch actuellement audité

Le lot courant corrige les constats demandés sans inventer de données de chantier. Les informations de durée, budget et satisfaction restent optionnelles dans le modèle et ne sont pas affichées comme des faits lorsqu’elles ne sont pas fournies.

| Correction | Fichier(s) | Validation |
|---|---|---|
| Intégration lisible du logo officiel dans la navbar | `src/components/SiteHeader.tsx` | Rendu navigateur : navbar claire, logo transparent lisible desktop/mobile |
| Respect de `prefers-reduced-motion` pour le CTA et le carrousel | `src/components/Hero.tsx`, `src/components/Realizations.tsx` | Typecheck, lint, build et revue du chemin de défilement |
| Cohérence SEO du fallback 404 côté client | `src/lib/language.tsx` | Route inconnue : `noindex`, sans `canonical` ni `og:url` après chargement |
| Cohérence SEO du fallback 404 statique | `scripts/prepare-pages.mjs`, `scripts/test-contracts.mjs` | `404.html` ne contient plus le JSON-LD de l’accueil ; contrat bloquant ajouté |
| Routes statiques légales et fallback 404 | `scripts/prepare-pages.mjs`, `scripts/test-contracts.mjs`, workflow | Contrats `dist` PASS |
| Base path, canonical et metadata par route | `vite.config.ts`, `src/App.tsx`, `src/lib/language.tsx`, `index.html` | Routes locales et metadata PASS |
| Navigation, modal, focus, clavier, lazy loading et dimensions d’images | `src/components/SiteHeader.tsx`, `src/components/Realizations.tsx`, `src/index.css`, données photos | Parcours navigateur et responsive PASS |
| CI déterministe et contrôles de publication | `.github/workflows/gh-pages.yml`, `package.json`, scripts | Reproduction locale PASS |
| Image hero optimisée et aperçu social | `src/assets/hero-premium.jpg`, `public/og-image.jpg`, `index.html`, `src/lib/language.tsx` | 289 853 octets ; `og:image` et Twitter image présentes |
| Fiches de réalisations | `src/components/Realizations.tsx`, `src/data/realizations.ts` | Modal image + repères visibles, navigation et Échap PASS |
| Réduction des résidus de scaffold | `src/App.tsx`, suppression de `src/components/ui/*`, `src/hooks/*` inutilisés, `package.json` | Dépendances runtime réduites aux packages réellement utilisés ; lint sans warning |
| Carte tierce chargée automatiquement | `src/components/InterventionZone.tsx`, `src/data/map.ts`, `src/pages/MentionsLegales.tsx` | iframe présente lorsque la section est rendue, mentions alignées |

## 4. Preuves techniques

| Contrôle | Résultat |
|---|---|
| `npm ci` | PASS — installation reproductible ; 250 packages audités après nettoyage du scaffold ; seul avertissement : `glob@10.5.0` déprécié transitivement |
| `npm ls --depth=0` | PASS — aucune dépendance `invalid` ou manquante |
| `npm audit --audit-level=high` | PASS — 0 vulnérabilité |
| `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnérabilité runtime |
| `npm run lint` | PASS — 0 erreur, 0 warning |
| `npm run typecheck` | PASS — `tsc -b` |
| `npm run check:assets` | PASS — 12 images raster, dimensions lisibles, chaque fichier sous 512 Ko |
| `npm run build` | PASS — Vite 8.2.2, 1 597 modules transformés ; JS principal 261,84 kB |
| `npm run prepare-pages` puis `npm test` | PASS — accueil, mentions légales et 404 générés/contrôlés |
| `git diff --check` | PASS — avertissements CRLF uniquement |
| YAML du workflow | PASS — parsing Python, jobs `build` et `deploy`, déclencheurs `push`/`workflow_dispatch` |

Le workflow bloque bien sur `npm ci`, `npm audit`, lint, typecheck, assets, build, routes et tests avant l’upload Pages. Aucune publication distante n’a été lancée.

### Parcours navigateur

- Accueil : titre, description, canonical, `lang="fr"`, `main`, CSP meta, `og:image` et `twitter:image` présents.
- Mentions légales : route directe locale 200, titre/description/canonical propres.
- Route inconnue : fallback applicatif utile, `noindex`, sans canonical ni `og:url`.
- Menu mobile : ouverture, fermeture Échap, labels et `aria-expanded` cohérents.
- Langue : FR → EN → FR, titre et contenu traduits, état restauré.
- Galerie : filtres, ouverture du dialogue, fiche avec intervention visible/matière, navigation suivante, verrouillage du scroll, fermeture Échap et restitution du focus au bouton d’origine.
- Carte : l’iframe Google Maps est présente lorsque la section est rendue ; le chargement tiers est documenté dans les mentions légales.
- CTA : le bouton amène effectivement la section contact dans la fenêtre.
- Console : aucune erreur ni alerte relevée après le parcours.
- Responsive courant : 320/375/768/1024/1440 px, `scrollWidth` inférieur ou égal à `window.innerWidth` ; le carrousel conserve un débordement horizontal interne volontaire et contrôlé.

### État public vérifié en lecture seule

| URL | Réponse observée |
|---|---:|
| `https://bastienlopez.github.io/CleDeVoute/` | 200 |
| `https://bastienlopez.github.io/CleDeVoute/mentions-legales` | 200 |
| `https://bastienlopez.github.io/CleDeVoute/route-inconnue-audit` | 404 |
| `https://bastienlopez.github.io/CleDeVoute/og-image.jpg` | 404 — asset local non publié |
| HTTP → HTTPS | 301 vers HTTPS |

Sur l’accueil public actuel, `Strict-Transport-Security` est présent ; les headers CSP, referrer et `X-Content-Type-Options` ne le sont pas. Les balises meta du nouvel artifact sont un filet de sécurité côté document, pas l’équivalent d’un header serveur. L’aperçu social local est bien généré, mais l’URL publique `og-image.jpg` répond encore 404 parce que le dernier état local n’a pas été poussé/déployé.

## 5. Sécurité

Le dépôt est une application React/Vite statique sans backend, authentification, base de données, upload ou secret client identifié. Le scan d’historique sur 3 960 277 octets avec motifs de credentials n’a trouvé aucune correspondance. Le rapport détaillé généré par `web-security-audit` est dans `.security-audit/report.md`.

Findings restants :

1. `WSA-003` — potentiel medium : les headers de sécurité dépendent de GitHub Pages et doivent être vérifiés après publication.
2. `WSA-004` — potentiel low résiduel : Google Maps est un tiers chargé automatiquement lorsque la section est rendue. Le risque ne disparaît qu’en supprimant entièrement l’intégration tierce ou en ajoutant un mécanisme de consentement adapté.

Semgrep et Trivy ne sont pas installés dans l’environnement. Ce manque de couverture est documenté dans `manque_phase.md` et ne doit pas être confondu avec un finding confirmé.

## 6. Ce qui a été corrigé et ce qui reste visible comme “IA-like”

Ces points ne sont pas des bugs de fonctionnement. Ils sont toutefois les écarts les plus visibles par rapport à un site de maçonnerie réellement incarné :

1. **Hero / provenance — information restante, priorité P2.** `hero-premium.jpg` est techniquement optimisée et utilisée pour le partage social. La photo a été fournie dans le projet, mais aucun crédit, source, licence ou preuve de chantier n’est documenté. L’audit ne conclut pas qu’elle est générée ; il signale uniquement que sa provenance n’est pas démontrable depuis le dépôt.
2. **Grammaire visuelle — corrigée partiellement, priorité P3 résiduelle.** Les ombres et rayons ont été réduits sur le hero et les cartes de galerie, les cartes ne flottent plus au survol et les sections ne reposent pas sur des surfaces identiques. Restent les repères en capitales, Playfair/Inter, les blocs numérotés et le carrousel automatique ; ces éléments sont fonctionnels et cohérents avec les choix précédents, mais une direction artistique encore plus singulière demanderait une décision de refonte dédiée.
3. **Copy abstrait — corrigé sur les zones signalées, priorité P3 résiduelle.** Les formulations « objectif simple », « large variété », « de la structure aux finitions » et plusieurs intitulés de preuve ont été remplacés par des formulations liées au bâti, à l’échange, aux travaux et aux techniques. Les claims factuels restent ceux déjà validés ; aucune précision de chantier n’a été inventée.
4. **Réalisations — corrigé fonctionnellement, enrichissement encore dépendant des données.** Chaque carte ouvre maintenant une fiche avec catégorie, intervention visible et description courte ; durée, budget et satisfaction ne sont affichés que si des valeurs validées sont ajoutées. Les lieux, matériaux détaillés et difficultés restent à fournir par le propriétaire pour aller plus loin.
5. **Prévisualisation sociale — corrigée.** `og:image`, dimensions, type, texte alternatif, `twitter:card=summary_large_image` et `twitter:image` pointent vers `public/og-image.jpg`, une copie optimisée de l’image hero.
6. **Résidus de scaffold — corrigés.** Les 49 primitives UI non atteintes, les providers toast/query/tooltip sans usage, les hooks morts et les dépendances runtime associées ont été supprimés. Le runtime conserve uniquement React, le routeur, Lucide et les packages nécessaires au build.
7. **Headers HTTP — non corrigeable depuis GitHub Pages.** La CSP/referrer meta reste dans l’artifact, mais le DAST confirme qu’un serveur de preview ne renvoie pas les headers HTTP. La limitation est documentée comme `S18 UNKNOWN`, sans prétendre qu’une balise meta équivaut à un header.
8. **Google Maps — comportement rétabli à la demande du propriétaire.** L’iframe est de nouveau chargée automatiquement lorsque la section est rendue. Le choix est documenté dans les mentions légales ; le risque de transmission au tiers reste explicitement signalé.

## 7. Points encore dépendants d’une information ou d’une décision propriétaire

- Provenance/licence de `hero-premium.jpg` : fournir la source ou confirmer le statut d’illustration autorisée avant publication définitive.
- Enrichissement des fiches réalisation : fournir uniquement les lieux, matériaux, durée, budget et retours client réellement validés.
- Headers HTTP : vérifier l’URL GitHub Pages après publication ; une migration/proxy sera nécessaire si ces headers sont obligatoires.
- Une refonte artistique plus radicale reste possible, mais elle n’est plus nécessaire pour les corrections techniques et anti-template traitées dans ce lot.

Ces points sont des décisions de refonte, pas des corrections techniques à mélanger dans P0–P6.

## 8. Actions encore requises avant le go production définitif

1. Autoriser puis effectuer le commit/push vers `main` ; cette action n’a pas été exécutée.
2. Attendre le déploiement GitHub Pages et vérifier l’accueil, `/mentions-legales`, le fallback 404, les assets, les metadata et les URLs finales.
3. Relever les headers HTTP réels après publication et accepter/documenter la limite GitHub Pages si aucun mécanisme de configuration n’est disponible.
4. Décider/documenter la provenance de `hero-premium.jpg` et fournir uniquement les informations chantier réellement disponibles avant d’enrichir davantage les cartes.
5. Vérifier les headers HTTP publics après publication ; si GitHub Pages ne les expose pas, accepter la limite ou migrer vers un hébergement/proxy contrôlé.
6. En option, installer Semgrep/Trivy pour une couverture supplémentaire.

La version locale est donc **GO technique conditionnel** et **GO pour revue humaine du lot de corrections**. Elle n’est pas encore **GO production** pour le dernier état local tant que le push et le retest public ne sont pas réalisés. Le seul point de crédibilité bloquant côté contenu est la provenance de l’image hero ; les métriques de projet sont correctement laissées absentes tant qu’elles ne sont pas validées.

## 9. Matrice complète — 94 contrôles

### A. Writing and copy — W01 à W10

| ID | Contrôle | Statut | Preuve / décision |
|---|---|---|---|
| W01 | Long-dash dependency | JUSTIFIED | Ponctuation longue limitée et typographique dans le légal ; pas de répétition machine dans les CTA. |
| W02 | Formulaic contrast sentence | PASS | Aucun motif de contraste artificiel récurrent identifié. |
| W03 | Decorative emoji punctuation | PASS | Aucun emoji décoratif dans le copy produit. |
| W04 | Over-structured emphasis | PASS | Titres et emphases restent sémantiquement simples. |
| W05 | Automatic groups of three | JUSTIFIED | Les listes de trois dans les services viennent du design actuel ; révision prévue en P7. |
| W06 | Excessive hedging | PASS | Pas de sur-promesse prudente ou de hedge répétitif détecté. |
| W07 | Uniform paragraph rhythm | JUSTIFIED | Rythme de cartes répétitif, connu et volontairement différé à P7. |
| W08 | Question restatement before answer | PASS | Aucun préambule de type réponse conversationnelle. |
| W09 | Model-signature vocabulary | PASS | Pas de vocabulaire d’agent ou de générateur visible. |
| W10 | Unnaturally pristine chat-style typography | PASS | Typographie marketing cohérente avec le site, sans formatage de chat. |

### B. Generated-site signals — P01 à P20

| ID | Contrôle | Statut | Preuve / décision |
|---|---|---|---|
| P01 | Deployment subdomain left as identity | JUSTIFIED | GitHub Pages `/CleDeVoute/` est la cible explicitement retenue ; aucun domaine inventé. |
| P02 | Default purple/blue hero gradient | PASS | Overlay navy/orange cohérent avec la palette ; pas de gradient violet/bleu par défaut. |
| P03 | Obviously synthetic or defective imagery | PASS | Aucun défaut ou artefact évident sur les photos inspectées ; l’image hero a été optimisée et son alternative décrit ce qui est visible. Sa source/licence n’est pas documentée dans le dépôt, ce qui reste une limite de crédibilité distincte. |
| P04 | Fabricated testimonials | N/A | Aucun témoignage ou avis publié. |
| P05 | Dead or placeholder controls | PASS | Menu, langue, CTA, filtres, flèches et galerie fonctionnent au navigateur. |
| P06 | Scroll-reveal animation everywhere | JUSTIFIED | Animations limitées au hero/carrousel et désactivées ou réduites pour `prefers-reduced-motion`. |
| P07 | One-page-by-default information architecture | JUSTIFIED | Brochure locale volontairement one-page ; architecture à réévaluer en P7. |
| P08 | Text-only placeholder brand mark | PASS | `public/logo.png` officiel utilisé avec base path et alternative textuelle. |
| P09 | Missing favicon | PASS | Favicon présent dans `index.html` et livré dans `dist`. |
| P10 | Gimmicky animated headline coloring | PASS | Aucun titre animé par couleur. |
| P11 | Empty/template privacy page | PASS | Mentions légales non vide, éditeur/hébergement/tiers documentés. |
| P12 | Empty/template terms page | N/A | Aucun tunnel marchand ou condition de vente nécessitant une page dédiée. |
| P13 | Fake live-visitor counter | N/A | Aucun compteur de visiteurs. |
| P14 | Fake customer/user count | PASS | Le claim `500+` est conservé après confirmation explicite du propriétaire. |
| P15 | Unsupported performance/stat claims | PASS | `20+`, `500+`, brevet et Tour de France conservés après validation propriétaire. |
| P16 | Emojis used as product iconography | PASS | Icônes Lucide, aucun emoji comme icône métier. |
| P17 | Vague hero proposition | PASS | Métier, gros œuvre, rénovation et zone sont identifiables dès le hero. |
| P18 | Decorative handwriting font by default | N/A | Aucune police manuscrite. |
| P19 | Generator/platform badge left unintentionally | PASS | Aucun badge de plateforme ou de générateur dans le rendu. |
| P20 | AI-copy markers repeated throughout site copy | JUSTIFIED | Quelques formulations génériques restent dans la baseline ; leur refonte est explicitement P7. |

### C. Generic design defaults — D01 à D24

| ID | Contrôle | Statut | Preuve / décision |
|---|---|---|---|
| D01 | High-saturation gradient collision | PASS | Gradients limités et rattachés aux couleurs de marque. |
| D02 | Floating decorative icons in page margins | N/A | Aucun décor flottant de marge. |
| D03 | Unconsidered pure-white canvas | JUSTIFIED | Les sections blanches alternent avec pierre/navy pour la lisibilité. |
| D04 | Section-by-section rainbow palette | PASS | Palette stable navy, orange, pierre et blanc. |
| D05 | Shadow on nearly every object | PASS | Les ombres sont limitées au header, au hero, aux contrôles et au modal ; les cartes de galerie n’ont plus d’ombre ni d’effet de flottement. |
| D06 | Default three-feature-card row | PASS | Les prestations sont des lignes éditoriales structurées ; les services n’utilisent pas une rangée de cartes clonées comme interface principale. |
| D07 | Glass/blur effect as a blanket style | PASS | Aucun `backdrop-blur` ni système glassmorphism appliqué globalement ; les overlays d’image restent opaques/transparents mais contextuels. |
| D08 | Generator-default font selection | JUSTIFIED | Inter/Playfair sont cohérentes avec la marque ; réévaluation stylistique en P7. |
| D09 | Decorative full-width accent band | JUSTIFIED | Transitions de sections présentes mais liées au rythme existant ; pas de refonte avant P7. |
| D10 | Bento layout by reflex | N/A | Aucun bento layout. |
| D11 | Fake terminal window as decoration | N/A | Aucun terminal décoratif. |
| D12 | Every benefit prefixed with a green check | PASS | Les listes ne reposent pas sur des checks verts uniformes. |
| D13 | Three pricing tiers by convention | N/A | Aucun pricing. |
| D14 | No real product demonstration | JUSTIFIED | Service local sans produit logiciel ; photos de réalisations fournissent la preuve adaptée. |
| D15 | Same corner radius on everything | PASS | Les rayons sont différenciés : surfaces éditoriales en `rounded-sm`, contrôles ronds pour les flèches/filtres et boutons de contact en `rounded-md`. |
| D16 | Purple-on-black default AI palette | PASS | Aucun violet/noir de type outil IA. |
| D17 | Missing loading placeholders/states | N/A | Aucun flux asynchrone utilisateur ; images lazy sans action bloquante. |
| D18 | Background glow/orb decoration | PASS | Aucun glow/orb décoratif. |
| D19 | Decorative dot-grid background | PASS | Aucun dot-grid. |
| D20 | Sparkle icon as universal AI symbol | PASS | Aucun sparkle utilisé comme symbole IA. |
| D21 | Bouncing scroll arrows | PASS | La flèche du CTA est statique ; aucun `animate-bounce` ou mouvement de guidage permanent n’est utilisé. |
| D22 | Hover animation on non-interactive elements | PASS | Les transforms et changements d’image repérés sont attachés aux boutons/cartes interactifs du carrousel ou aux liens. |
| D23 | Neon-on-dark default styling | PASS | Contraste navy/orange sobre, sans néon. |
| D24 | Generic pastel-everything styling | PASS | Aucun système pastel générique. |

### D. Launch readiness — L01 à L20

| ID | Contrôle | Statut | Preuve / décision |
|---|---|---|---|
| L01 | Custom not-found experience | PASS | `404.html` statique et fallback React avec retour accueil. |
| L02 | Primary CTA visible early | PASS | CTA projet et téléphone visibles dans le hero. |
| L03 | Unique page titles | PASS | Accueil, légal et 404 ont des titles distincts. |
| L04 | Unique page descriptions | PASS | Descriptions par route et fallback dédiées. |
| L05 | Social sharing image/metadata | PASS | `og:title`, `og:description`, `og:url`, `og:image`, alt/type/dimensions et Twitter image sont présents ; l’image sociale est livrée dans `public/og-image.jpg`. |
| L06 | Complete favicon/app-icon baseline | PASS | Favicon livré ; aucune PWA ou app installable n’est annoncée. |
| L07 | robots.txt policy | PASS | `public/robots.txt` aligné avec le base path. |
| L08 | Sitemap | PASS | Sitemap présent avec accueil et route légale réellement générée. |
| L09 | Alternative text for meaningful images | PASS | Alt non vides sur hero/logo/réalisations et dimensions déclarées. |
| L10 | Real mobile breakpoints tested | PASS | 320, 375 et 768 contrôlés à nouveau ; 1024 et 1440 couverts par la preuve locale précédente, sans débordement horizontal de page. |
| L11 | Mobile primary action remains reachable | PASS | CTA, téléphone et contact accessibles à 375 px. |
| L12 | Loading state for async actions | N/A | Aucun envoi ou traitement asynchrone visible. |
| L13 | Field-specific form errors | N/A | Pas de formulaire ; contact direct honnête. |
| L14 | Submission success/confirmation state | N/A | Pas de soumission. |
| L15 | Real privacy disclosure | PASS | Mentions légales et flux Google Maps documentés. |
| L16 | Real terms/conditions when applicable | JUSTIFIED | Pas de vente en ligne ni tunnel contractuel ; mentions adaptées au site vitrine. |
| L17 | Consent control with genuine rejection where required | UNKNOWN | La carte Google Maps est chargée automatiquement à la demande du propriétaire ; l’applicabilité d’un consentement préalable dépend du contexte juridique et de la configuration du fournisseur, non vérifiable ici. |
| L18 | Analytics/measurement decision implemented | PASS | Décision actuelle : aucun analytics ni tracking. |
| L19 | Real contact channel | PASS | Téléphone, e-mail et adresse réels, liens `tel:`/`mailto:`. |
| L20 | Optimized image delivery | PASS | 12 raster sous budget, dimensions, hero à 289 853 octets, lazy loading et decoding asynchrone. |

### E. Security and data protection — S01 à S20

| ID | Contrôle | Statut | Preuve / décision |
|---|---|---|---|
| S01 | No private API secrets in browser bundles | PASS | Aucun secret détecté dans source, build, assets ou configuration publique. |
| S02 | No valid secrets retained in Git history | PASS | Scan borné de l’historique : 0 match de motifs credentials. |
| S03 | Service/admin credentials remain server-only | N/A | Aucun service privilégié ni backend. |
| S04 | Row/data-level access policies enabled and correct | N/A | Aucune base de données. |
| S05 | Sensitive data protected at rest appropriately | N/A | Aucun stockage de données sensibles applicatives. |
| S06 | Authentication verified server-side | N/A | Aucune authentification. |
| S07 | Object/record authorization prevents ID swapping | N/A | Aucun objet ou endpoint de données. |
| S08 | Privileged fields cannot be mass-assigned | N/A | Aucune mutation de modèle côté serveur. |
| S09 | Session cookies hardened | N/A | Aucune session. |
| S10 | Passwords use modern password hashing | N/A | Aucun mot de passe. |
| S11 | Login/auth abuse rate limiting | N/A | Aucun login. |
| S12 | Public-form bot/abuse protection | N/A | Aucun formulaire public. |
| S13 | Parameterized database queries | N/A | Aucune requête SQL ; le scaffold non atteint est hors graphe. |
| S14 | Server-side input validation | N/A | Aucune entrée serveur. |
| S15 | User content is safely rendered | N/A | Aucun contenu utilisateur ; pas de CMS ou commentaire. |
| S16 | Uploads constrained and isolated | N/A | Aucun upload. |
| S17 | API responses expose only necessary fields | N/A | Aucune API applicative. |
| S18 | Security headers configured appropriately | UNKNOWN | Meta CSP/referrer présentes dans l’artifact ; headers HTTP publics à retester après déploiement. |
| S19 | HTTPS enforced in production | PASS | HTTP public redirige 301 vers HTTPS ; HSTS observé sur HTTPS. |
| S20 | Dependency vulnerability hygiene | PASS | `npm ci`, `npm ls` et `npm audit` passent sans vulnérabilité. |

## 10. Décision finale

**État du code local : GO technique conditionnel pour push**, après revue humaine du diff et autorisation du propriétaire. **État production : NO-GO de validation finale** pour le dernier état local, uniquement parce que le push/déploiement et le retest HTTP public n’ont pas eu lieu. **État anti-IA/design : corrections principales appliquées ; une direction artistique encore plus singulière reste optionnelle**, ce n’est pas un problème de fonctionnement P0–P6.
