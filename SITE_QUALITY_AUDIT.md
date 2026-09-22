# Audit qualité complet — La clé de voûte

Date de l’audit : 21 septembre 2026 — audit complet rafraîchi après relecture des skills présents dans l’environnement et revalidation sécurité/UI  
Mode : audit anti-slop/design/sécurité + vérification typographique ; aucune nouvelle modification du site pendant ce passage  
Référentiels : `anti-vibecode-slop` (94 contrôles) et `design-taste-codex` (contre-audit visuel)

## 1. Synthèse exécutive

Le dépôt contient une seule application frontend publique : le site vitrine de **La clé de voûte**, construit avec Vite, React, TypeScript et Tailwind. Aucun backend, aucune base de données, aucune authentification et aucun traitement serveur de formulaire n’ont été détectés.

Verdict actuel : **aucun bloquant P0/P1 confirmé et le défaut typographique D08 est corrigé**. `IBM Plex Sans` est maintenant utilisé pour le texte/interface et `Newsreader` pour les titres, avec une direction plus humaine et éditoriale, moins assimilable à un preset `Inter + serif premium`. Le site reste fonctionnel et techniquement cohérent pour GitHub Pages.

Le site n’est toutefois pas « totalement prouvé en production » :

- les en-têtes HTTP finaux, la redirection HTTPS et la disponibilité publique doivent être vérifiés sur l’hébergement réel ;
- la décision juridique concernant le chargement automatique de Google Maps reste une décision du responsable du site, volontairement non modifiée ;
- les droits/provenances des photos, les informations légales et la médiation doivent rester validés par le propriétaire ;
- le formulaire actuel ouvre le client mail via `mailto:` : il ne fournit donc pas de preuve de remise au serveur ni de confirmation de réception ;
- aucune optimisation SEO ne peut garantir une première position Google ou une recommandation par un LLM.
- aucun audit ne peut promettre une sécurité absolue ; les seuls points résiduels sont liés à l’hébergement, au service tiers Maps et à l’absence volontaire de backend anti-abus.

### Couverture et statuts

| Statut | Nombre | Lecture |
|---|---:|---|
| PASS | 56 | Contrôle satisfait par les preuves disponibles |
| FAIL | 0 | Aucun échec confirmé après la correction typographique |
| JUSTIFIED | 19 | Choix présent, volontaire et cohérent, avec éventuelle limite documentée |
| N/A | 16 | Contrôle non applicable à ce site statique sans backend |
| UNKNOWN | 3 | Preuve externe ou décision propriétaire manquante |
| **Total** | **94** | Tous les contrôles W/P/D/L/S sont présents |

Priorités résiduelles : **P2** pour les points à décider ou à vérifier avant une mise en production définitive ; **P3** pour les améliorations de finition et de visibilité non bloquantes.

## 2. Périmètre et méthode

### 2.1 Dépôts et sites identifiés

| Élément | Résultat |
|---|---|
| Dépôt inspecté | `C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute` |
| Applications frontend | 1 |
| Backend/API/base de données | Aucun détecté |
| Routes publiques principales | `/`, `/mentions-legales`, `/politique-confidentialite`, `/cgu`, fallback 404 |
| Hébergement actuellement configuré | GitHub Pages sous `https://bastienlopez.github.io/CleDeVoute/` |
| État Git observé | branche `main`, `index.html` et `tailwind.config.ts` modifiés pour la typographie ; rapport d’audit non suivi |
| Modification de code pendant le suivi | aucune nouvelle modification pendant cet audit ; les deux fichiers typographiques étaient déjà modifiés |
| Artefact d’audit | `SITE_QUALITY_AUDIT.md` |

### 2.2 Preuves statiques inspectées

- `package.json`, `vite.config.ts`, `site.config.json` et les scripts de contrôle ;
- `index.html` et `src/lib/language.tsx` pour les titres, descriptions, canonical, Open Graph, Twitter Cards et JSON-LD ;
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/llms-full.txt` ;
- `src/components/`, `src/pages/`, `src/data/` et `src/index.css` ;
- `public/favicon.ico`, `public/logo.png`, `public/og-image.jpg` et les photos de réalisations ;
- les pages légales et le formulaire de contact ;
- les artefacts existants sous `.security-audit/`.

### 2.3 Preuves de build et de comportement

Les contrôles locaux déjà exécutés sur l’état actuel du dépôt sont :

- `npm run typecheck` : PASS ;
- `npm run lint` : PASS ;
- `npm run build` : PASS ;
- `npm run prepare-pages` : PASS ;
- `npm test` : PASS ;
- `npm run check:links` : PASS ;
- `npm run check:assets` : PASS, 12 images raster sous 512 Ko ;
- `npm audit --omit=dev --audit-level=high` : 0 vulnérabilité signalée ;
- `git diff --check` : aucune erreur de whitespace ;
- `preflight.py` puis `run_static_scan.py` du skill `web-security-audit` : PASS ; Semgrep et Trivy non installés ;
- `run_local_dast.py` sur `http://127.0.0.1:4173/CleDeVoute/` : HTTP 200, 3 observations de headers serveur absents (CSP, Referrer-Policy, X-Content-Type-Options), sans exploit applicatif ;
- scan borné des sources/build : aucun secret détecté, aucun sink `dangerouslySetInnerHTML`/`innerHTML`/`eval`/`javascript:`, aucune requête SQL, aucun backend/API/process détecté ;
- test comportemental local : une valeur HTML inoffensive saisie dans le nom reste une valeur de champ et la soumission invalide est bloquée ; aucune messagerie n’a été ouverte ;
- audit sécurité normalisé : 0 critique, 0 haute, 1 moyenne potentielle liée aux headers, 1 basse potentielle liée au chargement de Google Maps.

Le build de production généré a également été inspecté : les placeholders `__SITE_URL__` ont disparu de `dist`, le sitemap et `robots.txt` sont présents, et les fichiers LLM sont copiés dans la sortie. Le bundle produit mesure environ 298,21 Ko brut / 88,11 Ko gzip pour le JavaScript et 30,34 Ko brut / 6,93 Ko gzip pour le CSS ; les 12 images raster passent sous 512 Ko, dont le hero à environ 289,85 Ko.

### 2.4 Rendu local vérifié

Le site compilé a été ouvert sur un serveur de preview local et vérifié à plusieurs largeurs :

| Viewport | Résultat observable |
|---|---|
| 1440 × 900 | Pas de débordement horizontal ; hero, CTA, formulaire et carrousel visibles ; navigation desktop active |
| 1024 × 900 | Pas de débordement horizontal ; grille et formulaire se contractent sans perte de contenu |
| 375 × 812 | Pas de débordement horizontal ; menu mobile, hero, CTA et champs du formulaire accessibles |

Le menu mobile a été ouvert puis utilisé pour atteindre `#contact`. Le carrousel/modal des réalisations, les contrôles de navigation et les liens légaux ont été inspectés. Aucun warning ni erreur console n’a été observé pendant ce smoke test. Le formulaire n’a pas été envoyé afin de ne pas ouvrir un client mail ou provoquer un effet externe ; seul son chemin de validation invalide a été exercé.

### 2.5 Limites de preuve

Cet audit ne prouve pas : le classement Google, l’indexation effective, les données Google Business Profile, les backlinks, la visibilité dans les réponses de moteurs ou LLM, la configuration finale des headers GitHub Pages, ni la validité juridique définitive des informations fournies par le propriétaire.

## 3. Matrice anti-vibecode complète — 94 contrôles

Statuts utilisés : `PASS`, `FAIL`, `JUSTIFIED`, `N/A`, `UNKNOWN`. `JUSTIFIED` n’est pas un échec : il signale un choix intentionnel qui reste à surveiller ou à assumer.

### A. Écriture et copy — W01 à W10

| ID | Contrôle | Statut | Preuve et conclusion |
|---|---|---|---|
| W01 | Long-dash dependency | JUSTIFIED | Les tirets longs restent limités au copyright, aux mentions structurées et à des formulations éditoriales ; ils ne constituent pas une béquille répétée dans tout le copywriting. |
| W02 | Formulaic contrast sentence | PASS | Pas de répétition visible du schéma « pas X, mais Y ». |
| W03 | Decorative emoji punctuation | PASS | Aucun emoji utilisé comme puce, icône ou décoration automatique des titres. |
| W04 | Over-structured emphasis | PASS | Les sections sont structurées mais le texte n’est pas découpé en blocs de gras sur chaque ligne. |
| W05 | Automatic groups of three | JUSTIFIED | Les groupes de trois correspondent à des étapes, réalisations ou informations réellement distinctes ; pas de slogan ternaire omniprésent. |
| W06 | Excessive hedging | PASS | Les propositions commerciales sont directes et ne cumulent pas les précautions inutiles. |
| W07 | Uniform paragraph rhythm | JUSTIFIED | Le rythme éditorial est régulier pour la lisibilité, mais les longueurs et structures de paragraphes varient entre les sections. |
| W08 | Question restatement before answer | PASS | Le hero donne directement l’activité, la zone et les actions utiles. |
| W09 | Model-signature vocabulary | JUSTIFIED | Quelques expressions de vocabulaire métier restent génériques, mais les marqueurs typiques de texte IA ne dominent pas le site. À affiner avec des détails de chantier réels si disponibles. |
| W10 | Unnaturally pristine chat-style typography | PASS | La typographie éditoriale est cohérente avec une entreprise artisanale et ne ressemble pas à une interface conversationnelle générée. |

### B. Signaux immédiats de site généré — P01 à P20

| ID | Contrôle | Statut | Preuve et conclusion |
|---|---|---|---|
| P01 | Deployment subdomain left as identity | JUSTIFIED | Le sous-domaine GitHub Pages est le choix de phase actuel, documenté dans `site.config.json`. Il devra être remplacé lors du passage au domaine de production. |
| P02 | Default purple/blue hero gradient | PASS | La palette est pierre chaude, bleu nuit et orange ; aucun dégradé violet/bleu générique. |
| P03 | Obviously synthetic or defective imagery | PASS | Les photos du hero et des réalisations sont cohérentes, sans artefacts visibles dans les rendus vérifiés. La provenance/licence reste une vérification propriétaire séparée. |
| P04 | Fabricated testimonials | PASS | Aucun témoignage, avatar, note ou recommandation inventé n’a été détecté. |
| P05 | Dead or placeholder controls | PASS | Les CTA, navigation, filtres, carrousel/modal et liens légaux ont des destinations ou comportements observables ; les tests de liens passent. |
| P06 | Scroll-reveal animation everywhere | JUSTIFIED | Pas de révélation animée généralisée. Le mouvement principal est le carrousel des réalisations, avec pause au focus/survol et désactivation via `prefers-reduced-motion`. |
| P07 | One-page-by-default information architecture | JUSTIFIED | Pour une vitrine locale simple, la page unique est proportionnée ; les pages légales sont séparées et les réalisations disposent d’un détail modal. Des pages service dédiées restent une opportunité SEO, pas un bug prouvé. |
| P08 | Text-only placeholder brand mark | PASS | Le site utilise le logo réel `public/logo.png`. |
| P09 | Missing favicon | PASS | `public/favicon.ico` est présent et référencé. |
| P10 | Gimmicky headline coloring | JUSTIFIED | Le mot « Sedan » est coloré en orange comme accent statique de marque ; il n’y a ni gradient animé ni effet premium générique. |
| P11 | Empty/template privacy page | PASS | La page de confidentialité existe et décrit le périmètre statique, le formulaire `mailto:` et les services tiers connus. La validation juridique finale reste propriétaire. |
| P12 | Empty/template terms page | PASS | `/cgu` contient une page dédiée non vide, adaptée à une vitrine ; aucune zone lorem ipsum ou placeholder visible. |
| P13 | Fake live-visitor counter | PASS | Aucun compteur de visiteurs en temps réel n’est affiché. |
| P14 | Fake customer/user count | PASS | Aucun compteur de clients/utilisateurs de type SaaS n’est affiché. |
| P15 | Unsupported performance/stat claims | JUSTIFIED | `20+`, `500+`, le brevet et le Tour de France sont des éléments fournis par le propriétaire et présentés comme preuves métier, pas comme statistiques issues d’un service tiers. Conserver les justificatifs hors dépôt si ces chiffres sont contestés. |
| P16 | Emojis used as product iconography | PASS | Les icônes viennent de `lucide-react` et les emojis ne remplacent pas l’iconographie. |
| P17 | Vague hero proposition | PASS | Le hero indique clairement la maçonnerie générale, le gros œuvre, Sedan, les publics et les services connexes. |
| P18 | Decorative handwriting font by default | PASS | Aucune police manuscrite décorative n’est utilisée dans l’interface. |
| P19 | Generator/platform badge left unintentionally | PASS | Aucun badge de builder, attribution de template ou branding de plateforme n’apparaît dans le rendu. |
| P20 | AI-copy markers repeated throughout site copy | JUSTIFIED | Le copy garde quelques formules artisanales classiques, mais l’accumulation ne franchit pas le seuil d’une voix manifestement générée. Une contextualisation supplémentaire des chantiers améliorerait encore l’authenticité. |

### C. Defaults de design générique — D01 à D24

| ID | Contrôle | Statut | Preuve et conclusion |
|---|---|---|---|
| D01 | High-saturation gradient collision | PASS | Pas de gradients saturés en collision avec la hiérarchie visuelle. |
| D02 | Floating decorative icons in page margins | PASS | Les icônes sont attachées à des contenus ou actions ; pas d’icônes flottantes en garniture de marge. |
| D03 | Unconsidered surface and contrast system | JUSTIFIED | Le système pierre claire / bleu nuit / orange est volontaire et cohérent ; les focus visibles et textes principaux restent lisibles. Un audit WCAG automatisé complet n’a pas été exécuté dans cette mission. |
| D04 | Section-by-section rainbow palette | PASS | Les couleurs sont tokenisées et limitées à des rôles sémantiques. |
| D05 | Repeated card chrome | PASS | Les cartes, bandeaux, sections et CTA n’emploient pas tous la même ombre ou le même contour décoratif. |
| D06 | Formulaic feature-section composition | JUSTIFIED | Les eyebrows sont récurrents, mais les compositions alternent timeline, lignes de services, étapes, chiffres, photos et contact. |
| D07 | Glass/blur effect as a blanket style | PASS | Aucun usage généralisé de `backdrop-filter`, blur translucide ou glassmorphism n’a été observé ; les anciennes pistes heuristiques sur des classes d’opacité étaient des faux positifs. |
| D08 | Generator-default typography | PASS | Le couple générique `Inter + Playfair Display` a été retiré. `index.html` charge désormais `IBM Plex Sans` et `Newsreader`, et `tailwind.config.ts` les affecte globalement à `sans` et `display`. Le rendu calculé confirme ces familles aux largeurs 1440, 1024 et 375 px ; la direction choisie est documentée comme humaniste/atelier pour le texte et éditoriale pour les titres. |
| D09 | Decorative full-width accent band | JUSTIFIED | Les bandes sombres séparent des groupes de contenu et portent une fonction de rythme/contraste ; elles ne sont pas de simples rubans décoratifs sans information. |
| D10 | Bento layout by reflex | PASS | Aucun bento irrégulier appliqué par mode sans hiérarchie de contenu. |
| D11 | Fake terminal window as decoration | PASS | Aucun motif terminal/code décoratif sur ce site non technique. |
| D12 | Every benefit prefixed with a green check | PASS | Les listes de bénéfices n’utilisent pas systématiquement le même check vert. |
| D13 | Three pricing tiers by convention | N/A | Le site ne vend pas de plans ou de prix en ligne. |
| D14 | No real product demonstration | PASS | Les photos de chantiers, réalisations et détails de projet montrent le travail réel attendu pour ce type de service. |
| D15 | Unmodified component-library defaults | JUSTIFIED | Tailwind, Lucide et certains contrôles familiers sont adaptés par une palette, des espacements et des compositions propres au site. Cette justification ne neutralise pas le défaut typographique distinct relevé en D08. |
| D16 | Purple-on-black default AI palette | PASS | Aucune palette purple/black de type AI SaaS. |
| D17 | Missing loading placeholders/states | N/A | Pas de flux de données asynchrone ou de mutation distante nécessitant un skeleton ; le formulaire statique expose son état d’ouverture. |
| D18 | Background glow/orb decoration | PASS | Aucun halo lumineux ou blob décoratif répété. |
| D19 | Decorative background texture by reflex | PASS | Pas de dot grid, bruit, grain ou texture papier sans fonction. |
| D20 | Default icon-library monoculture | JUSTIFIED | Lucide est utilisé de façon cohérente pour des actions et métiers distincts ; les icônes ne sont pas une collection de sparkles AI. |
| D21 | Decorative pointer/scroll gimmicks | PASS | Aucun curseur suiveur, blob ou animation de scroll spectaculaire sans fonction. |
| D22 | Misleading or decorative interaction motion | PASS | Les mouvements observés correspondent au carrousel et aux interactions ; pas de faux affordance sur des éléments non interactifs. |
| D23 | Neon-on-dark default styling | PASS | L’orange terre cuite reste une couleur de marque, pas un néon tech. |
| D24 | Generic pastel-everything styling | PASS | La palette n’est pas une accumulation de pastels indifférenciés. |

### D. Préparation au lancement — L01 à L20

| ID | Contrôle | Statut | Preuve et conclusion |
|---|---|---|---|
| L01 | Custom not-found experience | PASS | La route/fallback 404 existe, aide au retour et a été vérifiée dans le build généré. |
| L02 | Primary CTA visible early | PASS | Le hero présente rapidement « Voir les réalisations », l’appel et le contact mail. |
| L03 | Unique page titles | PASS | Les titres sont définis par route dans le template et `src/lib/language.tsx`. |
| L04 | Unique page descriptions | PASS | Les descriptions sont adaptées aux routes publiques connues. |
| L05 | Social sharing image/metadata | JUSTIFIED | OG/Twitter et `og-image.jpg` existent. L’image actuelle, portrait 1086 × 1448, est utilisable mais pas idéale pour les aperçus 1.91:1 ; amélioration P3 possible. |
| L06 | Complete favicon/app-icon baseline | PASS | Favicon présent et référencé ; le logo est également disponible comme asset public. |
| L07 | robots.txt policy | PASS | `robots.txt` autorise l’exploration des pages publiques, référence le sitemap et inclut les principaux agents de recherche/LLM explicitement choisis. |
| L08 | Sitemap | PASS | Le sitemap source est préparé avec `__SITE_URL__`, puis le build produit une URL GitHub Pages concrète sans placeholder. Il couvre la home et les pages publiques indexables. |
| L09 | Alternative text for meaningful images | PASS | Hero, logo et réalisations ont des textes alternatifs utiles ; les images décoratives ne créent pas de bruit inutile. |
| L10 | Real mobile breakpoints tested | PASS | Vérifié en 375 px, 1024 px et 1440 px : pas de scroll horizontal et contenu conservé. |
| L11 | Mobile primary action remains reachable | PASS | Les CTA du hero et le menu mobile restent accessibles sans barre fixe intrusive. |
| L12 | Loading state for async actions | PASS | Le formulaire désactive le bouton pendant l’ouverture du client mail et expose un état de statut ; la navigation et le reste du site sont synchrones. |
| L13 | Field-specific form errors | PASS | Nom, e-mail, téléphone optionnel, objet et message ont des labels persistants, `aria-invalid`, messages associés et validation ciblée. |
| L14 | Submission success/confirmation state | JUSTIFIED | Le site ne promet pas un envoi serveur : il remet explicitement la demande au client mail via `mailto:` et indique l’état d’ouverture. Une confirmation de réception nécessiterait un service backend ou formulaire tiers. |
| L15 | Real privacy disclosure | PASS | La page décrit le fonctionnement observé : site statique, formulaire mailto, absence d’analytics applicatif déclaré et Google Maps chargé. La conformité juridique finale n’est pas une preuve technique. |
| L16 | Real terms/conditions when applicable | JUSTIFIED | Une CGU existe et est adaptée à une vitrine sans compte ni vente en ligne ; la relecture par le responsable ou un professionnel du droit reste la référence. |
| L17 | Consent control with genuine rejection where required | UNKNOWN | Google Maps est volontairement chargé automatiquement à la demande du propriétaire. L’audit ne tranche pas l’obligation juridique applicable ni l’interprétation du consentement ; décision à documenter avant production selon le contexte réel. |
| L18 | Analytics/measurement decision implemented | N/A | Aucun outil d’analytics ou tracking public n’est activé ; l’absence est cohérente avec le périmètre actuel. |
| L19 | Real contact channel | PASS | Adresse, téléphone et e-mail réels sont visibles et utilisables ; le formulaire ouvre le contact e-mail. |
| L20 | Optimized image delivery | PASS | Les 12 images contrôlées sont sous 512 Ko, le build passe `check:assets`, les dimensions sont déclarées sur les images principales et le chargement est adapté au contexte. |

### E. Sécurité et protection des données — S01 à S20

| ID | Contrôle | Statut | Preuve et conclusion |
|---|---|---|---|
| S01 | No private API secrets in browser bundles | PASS | Aucun secret privé ou credential privilégié n’a été trouvé dans les sources/assets contrôlés ; l’application n’utilise pas d’API privée côté navigateur. |
| S02 | No valid secrets retained in Git history | PASS | Le contrôle historique/configuration disponible ne signale pas de secret valide ; cela reste une recherche bornée, pas une garantie cryptographique de toute l’histoire. |
| S03 | Service/admin credentials remain server-only | N/A | Aucun service backend ou credential d’administration n’est présent dans cette application. |
| S04 | Row/data-level access policies enabled and correct | N/A | Aucune base, collection ou table exposée. |
| S05 | Sensitive data protected at rest appropriately | N/A | Le site ne stocke pas de données sensibles dans un datastore applicatif. |
| S06 | Authentication verified server-side | N/A | Aucun compte ni flux authentifié. |
| S07 | Object/record authorization prevents ID swapping | N/A | Aucun objet ou endpoint de données par identifiant. |
| S08 | Privileged fields cannot be mass-assigned | N/A | Aucun endpoint de mutation ou modèle de données. |
| S09 | Session cookies hardened | N/A | Aucun cookie de session applicatif. |
| S10 | Passwords use modern password hashing | N/A | Aucun mot de passe ni authentification. |
| S11 | Login/auth abuse rate limiting | N/A | Aucun login ni endpoint d’authentification. |
| S12 | Public-form bot/abuse protection | JUSTIFIED | Le formulaire est statique, utilise une validation client, un délai minimal de 1,2 seconde et un honeypot invisible ; il n’existe pas de POST public ni de serveur à rate-limiter. Cela réduit le bruit mais ne constitue pas une protection forte contre un bot navigateur déterminé. |
| S13 | Parameterized database queries | N/A | Aucune requête SQL ou base de données. |
| S14 | Server-side input validation | N/A | Il n’existe pas de frontière serveur ; la validation actuelle est côté navigateur et ne doit pas être considérée comme une barrière si le flux change. |
| S15 | User content is safely rendered | PASS | Les données affichées sont statiques ou échappées par React ; aucun sink HTML dangereux n’a été observé. Le marqueur HTML testé dans le nom n’a pas été interprété. |
| S16 | Uploads constrained and isolated | N/A | Aucun upload utilisateur. |
| S17 | API responses expose only necessary fields | N/A | Aucun endpoint ni sérialiseur d’API. |
| S18 | Security headers configured appropriately | UNKNOWN | Le DAST local sur `127.0.0.1:4173` ne fournit pas CSP, `Referrer-Policy` et `X-Content-Type-Options` comme headers serveur ; la meta CSP/referrer apporte un durcissement partiel. Les headers finaux GitHub Pages/prod n’ont pas été prouvés dans cette mission. |
| S19 | HTTPS enforced in production | UNKNOWN | Le projet exige des URLs HTTPS dans sa configuration et cible une URL HTTPS GitHub Pages, mais une vérification réseau publique actuelle de la redirection et des headers n’a pas été réalisée ici. |
| S20 | Dependency vulnerability hygiene | PASS | `npm audit --omit=dev --audit-level=high` ne signale aucune vulnérabilité de production connue dans la preuve disponible. |

## 4. Contre-audit design avec `design-taste-codex`

Ce contre-audit vérifie la qualité visuelle et la cohérence, sans proposer de redesign automatique.

### Hiérarchie et composition

**PASS.** Le hero répond rapidement aux questions « qui, où, quoi, comment contacter » : localisation, activité, proposition, réalisation, téléphone et e-mail. La photo de chantier porte la preuve métier et les sections suivantes alternent contenu éditorial, prestations, méthode, réalisations et zone d’intervention.

### Typographie

**PASS après correction.** `IBM Plex Sans` remplace `Inter` pour le texte et l’interface ; `Newsreader` remplace `Playfair Display` pour les titres. Le couple évite le preset précédemment identifié et donne au site une voix plus humaine, structurée et éditoriale. Le rendu reste lisible et conserve la hiérarchie du hero sur desktop, tablette et mobile.

### Couleur et matière

**PASS.** Le fond pierre claire, le bleu nuit et l’orange terre cuite forment un système stable. Le rendu ne reprend pas les signes typiques d’un template AI/SaaS : pas de violet néon, glow, orb, verre flouté, gradient héroïque ou texture décorative automatique.

### Espacement et responsive

**PASS sur les viewports vérifiés.** Les règles CSS dédiées aux grands écrans, aux paliers intermédiaires et au mobile empêchent la perte de contenu observée dans les itérations précédentes. Les mesures locales montrent `scrollWidth` aligné sur la largeur utile et aucun débordement horizontal à 375, 1024 et 1440 px.

### Interactions

**PASS avec une réserve P2.** Le menu mobile, les ancres, les filtres, le carrousel et le modal sont utilisables ; Escape, flèches, focus et retour de focus sont prévus pour le modal. Le carrousel automatique est pausé au survol/focus et désactivé pour `prefers-reduced-motion`, mais il n’a pas de bouton pause/play visible dédié au tactile.

### Accessibilité observable

**PASS local, non-certification WCAG.** Les titres, labels, rôles, descriptions, états d’erreur, `aria-invalid`, focus visibles et libellés de boutons sont présents. Une certification complète demanderait notamment une mesure automatisée de contraste, une revue clavier exhaustive sur tous les états et des essais avec technologies d’assistance.

### Empreinte « site IA/template »

**Faible à modérée, sans défaut typographique bloquant après correction.** Les conventions communes restent visibles : eyebrows en capitales, titres éditoriaux, chiffres, cartes et carrousel. Les photos de chantiers, les informations locales, le logo réel, la composition non uniforme et le nouveau couple `IBM Plex Sans + Newsreader` réduisent l’empreinte de template. Le vocabulaire parfois générique et l’image sociale portrait restent des points de finition séparés.

## 5. SEO, GEO local, LLM et indexation

### Fondations actuellement présentes

- titres et descriptions par route ;
- canonical basé sur `site.config.json` ;
- Open Graph et Twitter Cards avec image ;
- JSON-LD pour l’entreprise de maçonnerie, le site et la page ;
- `robots.txt` avec sitemap et agents explicitement traités ;
- `sitemap.xml` généré avec l’URL GitHub Pages actuelle ;
- `llms.txt` et `llms-full.txt` décrivant identité, activité, zone, services, réalisations et contact ;
- données locales cohérentes : Sedan, Ardennes, adresse, téléphone, e-mail, zones d’intervention ;
- textes alternatifs sur les images significatives ;
- pages mentions légales, confidentialité, CGU et 404 ;
- contrôles buildés contre les liens internes, assets lourds et contrats SEO.

### Ce qui est optimisé

La base technique est suffisamment propre pour indexer le site après publication : les URLs générées sont HTTPS, le sitemap n’est pas bloqué par `robots.txt`, les routes légales sont découvrables, la proposition du hero est explicite et les informations locales sont répétées de manière cohérente dans le contenu, les données structurées et les fichiers LLM.

### Ce qui ne peut pas être garanti par le dépôt

Le SEO local ne se résume pas au code : la première position dépendra de la fiche Google Business Profile, de sa vérification, de la cohérence NAP sur les annuaires, des avis réels, des citations locales, de la concurrence, des backlinks, de la qualité des chantiers documentés et des signaux comportementaux. De même, `llms.txt` est un fichier d’aide éditoriale, pas un mécanisme officiel garantissant une citation par un modèle.

### Recommandations SEO/GEO non bloquantes

1. Au passage en production, remplacer une seule fois `siteUrl` puis régénérer le build ; contrôler canonical, sitemap, OG et JSON-LD dans le HTML final.
2. Créer des pages service dédiées uniquement si un contenu réel et distinct existe : maçonnerie générale, rénovation pierre, terrasses/dallages, accès extérieurs. Ne pas dupliquer le même texte sur plusieurs URLs.
3. Ajouter, lorsque le propriétaire les fournit, lieu, matériaux, contexte, difficulté et résultat pour chaque réalisation ; cela améliore la preuve locale et réduit le vocabulaire générique.
4. Préparer une image sociale 1200 × 630 ou équivalente si les aperçus LinkedIn/Facebook/X sont une priorité.
5. Après passage au domaine de production : vérifier Search Console, soumettre le sitemap de production, inspecter la home et les pages légales, puis maintenir la fiche Google Business Profile.

## 6. Findings et priorités

La matrice ne contient plus de FAIL confirmé après la correction typographique. Les éléments ci-dessous sont des décisions, preuves externes ou améliorations à traiter ; ils ne doivent pas être lus comme des vulnérabilités confirmées.

### P0 — aucun

Aucun problème critique de sécurité, perte de données, contenu trompeur majeur ou parcours principal cassé n’a été observé.

### P1 — aucun confirmé

Aucun blocage P1 n’est confirmé dans le périmètre local. Les points légaux et d’hébergement ci-dessous restent à valider par le propriétaire et l’hébergement, pas à inventer dans le code.

### P2 — à décider ou à vérifier avant production définitive

| Réf. | Statut | Constat | Preuve | Action recommandée |
|---|---|---|---|---|
| P2-01 — P06 / D22 | JUSTIFIED avec réserve | Le carrousel tourne automatiquement et ne propose pas de pause/play visible dédiée au tactile. | `src/components/Realizations.tsx`, `src/index.css` ; pause au survol/focus et `prefers-reduced-motion` observées. | Décider d’ajouter un contrôle pause/play accessible, ou de désactiver l’autoplay sur tactile. |
| P2-02 — L17 | UNKNOWN | Google Maps est chargé automatiquement, conformément au choix demandé, mais l’applicabilité du consentement dépend du contexte juridique réel. | `src/components/InterventionZone.tsx`, iframe eager ; point déjà signalé dans `.security-audit/report.md`. | Faire valider la décision par le responsable juridique/propriétaire avant production ; ne pas présenter ce rapport comme avis juridique. |
| P2-03 — S18 / S19 | UNKNOWN | Les headers finaux et la redirection HTTPS du site publié ne sont pas prouvés par un rendu local. | Le preview local manque certains headers serveur ; la configuration applicative exige HTTPS. | Tester l’URL publique de production après déploiement et configurer les headers chez l’hébergeur qui les contrôle. |
| P2-04 — L15 / L16 / photo rights | UNKNOWN propriétaire | Les textes et faits légaux sont cohérents avec le code, mais leur exactitude juridique, les droits des photos et la médiation ne sont pas vérifiables depuis le dépôt. | `src/data/company.ts`, pages légales, absence de preuve documentaire de licences. | Valider SIREN/SIRET, adresse, activité, droits/licences et informations de médiation avec le propriétaire ou son conseil. |
| P2-05 — D08 | RÉSOLU | Le couple courant `Inter` + `Playfair Display` a été remplacé par `IBM Plex Sans` + `Newsreader`. | `index.html:10`, `tailwind.config.ts:18-19`, rendu local 1440/1024/375 px et inspection `getComputedStyle`. | Conserver ce choix et revalider la typographie si une charte graphique officielle est fournie plus tard. |

### P3 — améliorations de finition et de visibilité

| Réf. | Statut | Constat | Action recommandée |
|---|---|---|---|
| P3-01 — L05 | JUSTIFIED | L’OG image existe mais est portrait (1086 × 1448), donc potentiellement mal recadrée dans certains aperçus. | Préparer une variante sociale horizontale 1200 × 630, sans retirer l’actuelle avant vérification. |
| P3-02 — W09 / P20 | JUSTIFIED | Certaines formulations restent des expressions génériques de site artisanal : savoir-faire, relation directe, accompagnement, etc. | Remplacer progressivement par des détails vérifiables de matériaux, lieux, techniques et résultats, sans inventer de chiffres. |
| P3-03 — P07 / SEO local | JUSTIFIED | Une landing page unique est adaptée à la vitrine, mais limite la couverture des requêtes service/locales longues. | Ajouter des pages dédiées seulement avec une matière éditoriale réellement différente et des liens internes utiles. |
| P3-04 — S12 | JUSTIFIED | Honeypot et validation client réduisent le bruit, mais ne peuvent pas arrêter un bot déterminé sans endpoint ou protection tierce. | Revoir ce point uniquement si un formulaire serveur ou un volume d’abus apparaît ; ne pas remettre un CAPTCHA visible par défaut. |

## 7. Ce qui est déjà bon

- Le site n’expose pas de fausses reviews, faux visiteurs, badges de plateforme ou compteurs SaaS.
- Le hero est concret, local et orienté action.
- Les photos donnent une preuve visuelle du métier au lieu de simples illustrations génériques.
- Le logo réel, la favicon et les assets optimisés sont présents.
- Les pages confidentialité, CGU, mentions légales et 404 existent.
- Le formulaire correspond au besoin demandé : nom, e-mail, téléphone optionnel, objet et message, sans CAPTCHA visible.
- Les erreurs de formulaire sont ciblées et accessibles.
- Les métadonnées SEO, le sitemap, robots, JSON-LD et fichiers LLM sont présents et cohérents avec la phase GitHub Pages.
- Les breakpoints mobiles, intermédiaires et desktop ont été réellement rendus et contrôlés sans overflow.
- Les contrôles build, typecheck, lint, tests, liens et assets passent.
- Le système de couleurs, de photos, de composition et de typographie est cohérent avec l’artisanat et ne présente plus le défaut D08 identifié lors du précédent audit.

## 8. Vérifications manuelles restantes

À faire par le propriétaire ou lors du passage en production :

1. Relire les informations de l’entreprise et de la médiation avec les documents officiels.
2. Conserver les preuves de droits/licences ou d’autorisation pour la photo hero, le logo et chaque photo de réalisation.
3. Décider juridiquement le maintien du chargement automatique de Google Maps dans le contexte d’exploitation réel.
4. Vérifier l’URL publique, HTTPS, redirections, headers, canonical, sitemap, robots, OG et JSON-LD après déploiement.
5. Tester le parcours `mailto:` sur les appareils réellement utilisés ; rappeler que le site ne confirme pas une livraison e-mail.
6. Configurer puis vérifier Google Business Profile, Search Console et les données NAP une fois le domaine final choisi.
7. Vérifier les aperçus sociaux avec l’URL publique finale.

## 9. Plan de remédiation recommandé

### Avant indexation publique

- Valider les éléments propriétaires et juridiques listés en P2-04.
- Choisir explicitement la politique Maps et conserver cette décision dans la documentation légale.
- Décider du contrôle pause/play du carrousel.
- Valider le système typographique avec une éventuelle charte officielle si elle existe ; à défaut, le nouveau couple est cohérent et vérifié.

### Au passage GitHub Pages vers le domaine de production

- Modifier uniquement `site.config.json` avec l’URL HTTPS finale.
- Régénérer les pages et vérifier l’absence de `__SITE_URL__` dans `dist`.
- Vérifier les headers et la redirection HTTPS sur l’hébergement choisi.
- Vérifier canonical, sitemap, robots, Open Graph, JSON-LD et liens légaux depuis l’URL publique.

### Après mise en ligne

- Connecter Search Console et soumettre le sitemap de production.
- Inspecter la home et les pages importantes, puis surveiller les erreurs d’indexation.
- Maintenir la fiche Google Business Profile et les informations NAP.
- Ajouter des pages service ou des cas chantier uniquement si un contenu réel et distinct est disponible.

## 10. Conclusion

La base actuelle est **fonctionnelle, typographiquement corrigée et techniquement publiable sur GitHub Pages**, sous réserve des preuves externes explicitement listées. Elle n’est pas raisonnablement décrite comme « garantie première position SEO/GEO » : le dépôt fournit les fondations techniques et éditoriales, tandis que l’indexation, la popularité locale, les droits, la conformité juridique finale et les headers de production dépendent d’actions ou de décisions hors code.

Le prochain travail utile n’est pas une nouvelle refonte globale : c’est de fermer les inconnues P2, de vérifier l’hébergement final et d’enrichir uniquement les contenus de réalisations avec des faits réels.
