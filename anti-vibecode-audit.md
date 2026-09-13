# Audit anti-vibecode et readiness — Clé de Voûte

> Audit complet de l’état courant — 13 septembre 2026
>
> Périmètre : checkout `C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute`, branche `main`, modifications non commitées présentes dans le worktree. L’audit couvre P0–P6, les dernières retouches de `Hero`/`Footer`, et les signaux anti-IA visibles avant la refonte P7. Aucun redesign n’est appliqué pendant cet audit.

## 1. Verdict exécutif

La base P0–P6 est fonctionnelle : installation reproductible, dépendances cohérentes, build, typecheck, lint sans erreur, contrats de publication, routes locales, sécurité npm, interactions principales et responsive validés. Les dernières retouches demandées dans le hero et le footer passent également les contrôles locaux.

Le verdict n’est pas « refonte terminée » et la production n’est pas validée pour le code local : aucun commit, push ni déploiement n’a été effectué depuis ce checkout. La lecture publique actuelle répond 200 sur l’accueil et `/mentions-legales`, mais les headers `Content-Security-Policy`, `Referrer-Policy` et `X-Content-Type-Options` ne sont pas observés. Le principal reste à traiter est désormais P7 : réduire l’effet template, rendre les preuves métier plus concrètes et documenter la provenance de l’image hero.

### Comptage des 94 contrôles

| Statut | Nombre |
|---|---:|
| PASS | 49 |
| JUSTIFIED | 17 |
| N/A | 27 |
| UNKNOWN | 1 |
| FAIL | 0 |
| **Total** | **94** |

`UNKNOWN` concerne uniquement `S18` (headers de sécurité de l’hébergement). Les choix visuels et éditoriaux encore génériques sont documentés comme dette P7 : ils ne cassent pas le fonctionnement, mais ils expliquent pourquoi le site peut encore donner une impression de site généré.

## 2. Périmètre et niveau de preuve

- Audit statique du diff, de la configuration, des scripts, des dépendances, du build et des assets.
- Reproduction locale de la chaîne CI/CD jusqu’à l’artifact `dist`.
- Parcours navigateur sur l’accueil, les mentions légales, une route inconnue, FR/EN, menu, CTA, galerie, fermeture Échap et restauration du focus.
- Responsive contrôlé aux largeurs 320, 375 et 768 px pendant cet audit, avec les contrôles 1024 et 1440 px repris de la preuve locale précédente ; aucun débordement horizontal de page n’a été observé, le débordement interne du carrousel étant intentionnel.
- Audit sécurité white-box et DAST passif limité à localhost ; aucune action intrusive.
- Vérification en lecture seule de l’URL publique existante. Aucun accès aux paramètres GitHub, DNS, Search Console ou compte propriétaire.

Les statuts signifient : `PASS` preuve directe ; `JUSTIFIED` choix volontaire et borné ; `N/A` contrôle non applicable ; `UNKNOWN` preuve externe ou décision encore manquante ; `FAIL` écart non accepté.

## 3. État du patch actuellement audité

Aucun nouveau correctif applicatif n’a été ajouté pendant cet audit. Les deux fichiers déjà modifiés dans le worktree ont été conservés puis revalidés : suppression de l’icône téléphone du hero, centrage des CTA et réduction/simplification du footer.

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

## 4. Preuves techniques

| Contrôle | Résultat |
|---|---|
| `npm ci` | PASS — 390 packages installés ; avertissement de dépréciation `glob@10.5.0` uniquement |
| `npm ls --depth=0` | PASS — aucune dépendance `invalid` ou manquante |
| `npm audit --audit-level=high` | PASS — 0 vulnérabilité |
| `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnérabilité runtime |
| `npm run lint` | PASS — 0 erreur, 7 warnings `react-refresh/only-export-components` dans le scaffold UI |
| `npm run typecheck` | PASS — `tsc -b` |
| `npm run check:assets` | PASS — 11 images raster, dimensions lisibles, chaque fichier sous 512 Ko |
| `npm run build` | PASS — Vite 8.2.2, 1 682 modules transformés |
| `npm run prepare-pages` puis `npm test` | PASS — accueil, mentions légales et 404 générés/contrôlés |
| `git diff --check` | PASS — avertissements CRLF uniquement |
| YAML du workflow | PASS — parsing Python, jobs `build` et `deploy`, déclencheurs `push`/`workflow_dispatch` |

Le workflow bloque bien sur `npm ci`, `npm audit`, lint, typecheck, assets, build, routes et tests avant l’upload Pages. Aucune publication distante n’a été lancée.

### Parcours navigateur

- Accueil : titre, description, canonical, `lang="fr"`, `main` et CSP meta présents.
- Mentions légales : route directe locale 200, titre/description/canonical propres.
- Route inconnue : fallback applicatif utile, `noindex`, sans canonical ni `og:url`.
- Menu mobile : ouverture, fermeture Échap, labels et `aria-expanded` cohérents.
- Langue : FR → EN → FR, titre et contenu traduits, état restauré.
- Galerie : filtres, ouverture du dialogue, verrouillage du scroll, fermeture Échap et restitution du focus au bouton d’origine.
- CTA : le bouton amène effectivement la section contact dans la fenêtre.
- Console : aucune erreur ni alerte relevée après le parcours.
- Responsive courant : 320/375/768 px, `scrollWidth` égal à la largeur de la page ; les contrôles 1024/1440 px restent couverts par la preuve locale précédente. Le carrousel conserve un débordement horizontal interne volontaire et contrôlé.

### État public vérifié en lecture seule

| URL | Réponse observée |
|---|---:|
| `https://bastienlopez.github.io/CleDeVoute/` | 200 |
| `https://bastienlopez.github.io/CleDeVoute/mentions-legales` | 200 |
| `https://bastienlopez.github.io/CleDeVoute/route-inconnue-audit` | 404 |
| HTTP → HTTPS | 301 vers HTTPS |

Sur l’accueil public actuel, `Strict-Transport-Security` est présent ; les headers CSP, referrer et `X-Content-Type-Options` ne le sont pas. Les balises meta du nouvel artifact sont un filet de sécurité côté document, pas l’équivalent d’un header serveur. Cette lecture publique confirme les routes, mais ne prouve pas que le dernier état local a été publié.

## 5. Sécurité

Le dépôt est une application React/Vite statique sans backend, authentification, base de données, upload ou secret client identifié. Le scan d’historique sur 3 960 277 octets avec motifs de credentials n’a trouvé aucune correspondance. Le rapport détaillé généré par `web-security-audit` est dans `.security-audit/report.md`.

Findings restants :

1. `WSA-003` — potentiel medium : les headers de sécurité dépendent de GitHub Pages et doivent être vérifiés après publication.
2. `WSA-004` — potentiel low : l’iframe Google Maps charge un tiers immédiatement. Le propriétaire l’a autorisé et le flux est documenté dans les mentions légales ; aucune correction supplémentaire n’est appliquée sans changer cette décision.

Semgrep et Trivy ne sont pas installés dans l’environnement. Ce manque de couverture est documenté dans `manque_phase.md` et ne doit pas être confondu avec un finding confirmé.

## 6. Ce qui reste visible comme “IA-like” ou trop générique

Ces points ne sont pas des bugs de fonctionnement. Ils sont toutefois les écarts les plus visibles par rapport à un site de maçonnerie réellement incarné :

1. **Hero trop générique — priorité P2.** `hero-premium.jpg` est propre techniquement, mais son image de maçon devant un mur de pierre ressemble à une image stock ou générée et n’est pas contextualisée par le chantier. Aucun crédit, source ou élément de provenance n’est présent dans le dépôt. L’audit ne conclut pas qu’elle est générée ; il conclut que son authenticité n’est pas démontrable depuis le projet.
2. **Grammaire visuelle répétitive — priorité P2.** Eyebrows en capitales, grands titres Playfair, cartes à rayons/ombres similaires, pastilles de filtre, blocs numérotés, listes de trois à cinq éléments et carrousel automatique s’additionnent. Chaque choix est défendable isolément ; leur accumulation produit un rendu de template.
3. **Copy abstrait — priorité P2.** Des formulations comme « savoir-faire », « relation de confiance », « l’objectif est simple », « à votre rythme », « large variété » ou « de la structure aux finitions » sonnent comme du remplissage marketing générique. Elles ne sont pas fausses, mais elles manquent de matière, de lieu, de technique et de résultat observable.
4. **Réalisations peu documentées — priorité P2.** Les photos sont la meilleure preuve anti-IA du site, mais les cartes donnent surtout une catégorie et un titre. Sans commune, contexte, matériau, difficulté ou résultat — lorsque ces informations sont disponibles — la galerie ressemble davantage à un composant de portfolio qu’à un historique de chantiers.
5. **Prévisualisation sociale incomplète — priorité P2 faible.** `og:title`, `og:description` et `og:url` existent, mais aucune `og:image` n’est fournie. Le propriétaire a choisi de privilégier les métadonnées texte ; c’est un choix accepté, mais les partages seront moins maîtrisés.
6. **Résidus de scaffold — priorité P3.** Le dépôt contient 49 primitives dans `src/components/ui` et un ensemble de dépendances Radix/shadcn dont une partie n’est pas atteinte par le site. Cela n’empêche pas le rendu, mais entretient l’impression de base générée et augmente la maintenance.

## 7. Points volontairement différés à la phase 7

- Architecture de page, hero, rythme des sections et densité des cartes.
- Direction artistique, palette, typographies et hiérarchie visuelle.
- Remplacement du carrousel par une galerie éditoriale de projets documentés.
- Réduction des formulations génériques et restructuration des preuves métier sans inventer de faits.
- Traitement de l’image hero : conserver après preuve de provenance, la remplacer par une photo de chantier autorisée, ou assumer explicitement son statut d’illustration.

Ces points sont des décisions de refonte, pas des corrections techniques à mélanger dans P0–P6.

## 8. Actions encore requises avant le go production définitif

1. Autoriser puis effectuer le commit/push vers `main` ; cette action n’a pas été exécutée.
2. Attendre le déploiement GitHub Pages et vérifier l’accueil, `/mentions-legales`, le fallback 404, les assets, les metadata et les URLs finales.
3. Relever les headers HTTP réels après publication et accepter/documenter la limite GitHub Pages si aucun mécanisme de configuration n’est disponible.
4. Pour P7, décider de la provenance de `hero-premium.jpg` et fournir uniquement les informations chantier réellement disponibles avant d’enrichir les cartes.
5. En option, installer Semgrep/Trivy pour une couverture supplémentaire.

La version locale est donc **GO technique conditionnel** ; elle n’est pas encore **GO anti-IA/design**. La production est **NON VALIDÉE pour le dernier état local tant que le push et le retest public ne sont pas réalisés**.

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
| P03 | Obviously synthetic or defective imagery | PASS | Aucun défaut ou artefact évident sur les photos inspectées ; le propriétaire confirme l’autorisation d’usage. La provenance détaillée du hero n’est toutefois pas documentée dans le dépôt, ce qui reste un risque de crédibilité distinct. |
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
| D05 | Shadow on nearly every object | JUSTIFIED | Ombres concentrées sur cartes et contrôles ; dette esthétique différée à P7. |
| D06 | Default three-feature-card row | JUSTIFIED | Les services ont trois puces par carte ; structure conservée jusqu’à P7. |
| D07 | Glass/blur effect as a blanket style | PASS | Aucun `backdrop-blur` ni système glassmorphism appliqué globalement ; les overlays d’image restent opaques/transparents mais contextuels. |
| D08 | Generator-default font selection | JUSTIFIED | Inter/Playfair sont cohérentes avec la marque ; réévaluation stylistique en P7. |
| D09 | Decorative full-width accent band | JUSTIFIED | Transitions de sections présentes mais liées au rythme existant ; pas de refonte avant P7. |
| D10 | Bento layout by reflex | N/A | Aucun bento layout. |
| D11 | Fake terminal window as decoration | N/A | Aucun terminal décoratif. |
| D12 | Every benefit prefixed with a green check | PASS | Les listes ne reposent pas sur des checks verts uniformes. |
| D13 | Three pricing tiers by convention | N/A | Aucun pricing. |
| D14 | No real product demonstration | JUSTIFIED | Service local sans produit logiciel ; photos de réalisations fournissent la preuve adaptée. |
| D15 | Same corner radius on everything | JUSTIFIED | Rayons répétés dans le design actuel ; amélioration réservée à P7. |
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
| L05 | Social sharing image/metadata | JUSTIFIED | OG title/description/url présents ; aucune image sociale ajoutée sans asset approuvé. |
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
| L17 | Consent control with genuine rejection where required | JUSTIFIED | Carte directe explicitement autorisée par le propriétaire et signalée ; pas d’analytics/cookies applicatifs ajoutés. |
| L18 | Analytics/measurement decision implemented | PASS | Décision actuelle : aucun analytics ni tracking. |
| L19 | Real contact channel | PASS | Téléphone, e-mail et adresse réels, liens `tel:`/`mailto:`. |
| L20 | Optimized image delivery | PASS | 11 raster sous budget, dimensions, lazy loading et decoding asynchrone. |

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

**État du code local : GO technique conditionnel pour push**, après revue humaine du diff et autorisation du propriétaire. **État production : NO-GO de validation finale** pour le dernier état local, uniquement parce que le push/déploiement et le retest HTTP public n’ont pas eu lieu. **État anti-IA/design : P7 reste nécessaire** pour traiter les six points listés en section 6 ; ce n’est pas un problème de fonctionnement P0–P6.
