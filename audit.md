# Audit complet — Clé de Voûte

> Audit de la baseline existante — 10 septembre 2026  
> Périmètre historique : checkout réel C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute, branche main, commit a25e9b5 (add logo)  
> Publication de référence observée : https://bastienlopez.github.io/CleDeVoute/  
> Les sections historiques ci-dessous décrivent la baseline avant les corrections P0–P6. La vérification de l’état courant et la décision de readiness sont dans `anti-vibecode-audit.md`.

## 0. Addendum — état courant après P0–P6

Le code courant a été audité et corrigé sans lancer la refonte UI/UX de phase 7. `npm ci`, `npm ls`, `npm audit`, lint, typecheck, contrôle assets, build Vite, préparation des routes Pages, tests de contrats, scan sécurité local et parcours navigateur passent. Quatre corrections de dernière passe ont été ajoutées : navbar claire intégrée à la palette pour rendre le logo officiel lisible, respect de `prefers-reduced-motion` pour les défilements programmatiques, suppression de `og:url` sur le fallback 404 côté client et retrait du JSON-LD de l’accueil dans le fallback 404 statique.

Le nouvel artifact local prépare `dist/mentions-legales/index.html` et `dist/404.html`. Aucun commit, push ou déploiement n’a été effectué. L’ancienne publication répond encore 404 sur `/mentions-legales`, et ses headers de sécurité doivent être vérifiés après publication du nouvel artifact.

Voir la [matrice anti-vibecode complète et le verdict de production](anti-vibecode-audit.md), ainsi que les [points encore ouverts](manque_phase.md).

## 1. Executive summary

Le site est fonctionnel comme brochure statique : il se charge, présente clairement une activité de maçonnerie, expose de vrais canaux de contact, possède une base SEO correcte sur l’accueil et ne contient ni backend ni authentification ni secret client identifié. Le build, le typage et le lint passent.

Il n’est toutefois pas prêt pour une refonte premium ou une publication de référence. Le problème principal n’est pas un bug isolé : c’est une accumulation de signaux de template SaaS et de contenu insuffisamment prouvé. Le visiteur voit d’abord un héros centré sur une image de chantier à provenance inconnue, puis une succession de cartes arrondies, de chiffres non sourcés, de listes de trois éléments, de gradients, de ombres et d’animations. Les réalisations authentiques arrivent trop tard et sont présentées sans contexte de chantier. Le résultat est propre techniquement, mais générique et peu incarné.

Le point technique le plus important est la route légale : le navigateur affiche MentionsLegales grâce au fallback SPA, mais une requête HTTP directe sur /mentions-legales renvoie 404. Cette URL est pourtant présente dans le sitemap. C’est une incohérence concrète entre la publication, le SEO et le comportement attendu d’un lien partagé.

### Notes de synthèse

| Axe | Note /10 | Verdict court |
|---|---:|---|
| Identité visuelle | 5 | Palette cohérente, logo disponible mais non utilisé ; expression encore générique. |
| Design | 4 | Exécution propre mais répétitive : cartes, rayons, ombres, gradients et pills omniprésents. |
| Sensation « non-IA » | 3 | Les photos de travaux aident ; le héros, les chiffres et le rythme éditorial affaiblissent fortement l’authenticité. |
| UX | 6 | Parcours simple et lisible ; trop long, trop uniforme, peu de contexte pour décider. |
| Conversion | 5 | Téléphone et e-mail sont vrais et visibles ; aucun brief projet ni formulaire réel. |
| Mobile | 5 | Pas de débordement général observé ; hauteur et densité deviennent pénalisantes à 375 px. |
| Accessibilité | 5 | Textes alternatifs et contrôles de base présents ; landmarks, focus, menu et modal incomplets. |
| Performance | 5 | Build acceptable ; 1,7 MiB d’images, 18 images chargées, pas de dimensions ni lazy loading. |
| SEO | 5 | Accueil bien amorcé ; route profonde 404 au transport, métadonnées partagées, pas d’image OG. |
| Sécurité | 7 | Surface applicative faible et pas de secret constaté ; dépendances vulnérables et headers non maîtrisés. |
| Qualité du code | 4 | TypeScript/lint/build passent ; scaffold largement inutilisé, tests absents, CI permissive. |
| Maintenabilité | 4 | Données centralisées partiellement ; conventions, documentation et périmètre de dépendances faibles. |

**Moyenne indicative : 4,8/10.** Ce score est un outil de priorisation, pas une mesure scientifique.

### Ce qui fonctionne déjà

- La proposition de métier est immédiatement identifiable : maçonnerie générale et gros œuvre.
- La palette navy/orange/ton pierre est stable, lisible et plus distinctive qu’un thème violet/bleu standard.
- src/data/company.ts centralise les coordonnées et informations légales affichées par plusieurs vues.
- Les coordonnées téléphoniques et e-mail sont utilisables : liens tel: et mailto: réels dans ContactForm.tsx et Footer.tsx.
- Les images de réalisations sont localement servies, possèdent des textes alternatifs non vides et donnent davantage de preuve que le héros.
- Le site a une page légale, un 404 applicatif, un favicon, robots.txt, sitemap.xml et llms.txt.
- Les contrôles interactifs principaux testés — menu, langue, CTA, filtres, galerie, fermeture Escape — répondent dans le navigateur.
- Aucun formulaire fictif, aucune fausse note client, aucun compteur « visiteurs en ligne » et aucun badge de générateur n’ont été trouvés.

### Ce qui doit être amélioré

- Remplacer ou documenter les contenus de confiance non prouvés : 20+, 500+, brevet, Tour de France, identité et droits des photographies.
- Faire passer les preuves réelles avant les promesses : chantiers, matériaux, zones, périmètre d’intervention, méthode et résultats.
- Réduire la longueur et la répétition de la page, surtout à 375 px.
- Donner au contact une intention claire : appeler, écrire, ou demander une étude de faisabilité avec les informations minimales utiles.
- Corriger la publication statique des routes et rendre les métadonnées propres à chaque route.
- Stabiliser menu mobile, menu de langue, modal galerie, landmarks et réduction des mouvements.
- Réduire le poids et le nombre d’images chargées, puis contrôler les dépendances réellement nécessaires.

### Ce qui doit être totalement reconstruit

- Le couple héros + première preuve : l’actuel héros est visuellement spectaculaire mais peu crédible et peu spécifique.
- L’architecture éditoriale : six cartes de services et deux groupes de quatre arguments doivent devenir une hiérarchie de décision plus courte.
- La section réalisations : le carrousel dupliqué et automatique doit devenir une galerie éditoriale de projets documentés.
- Le système de confiance : chiffres et labels doivent être conditionnés à des preuves fournies par le propriétaire.
- La couche de publication : routes statiques, métadonnées, sitemap, image sociale et contrôle CI doivent être traités ensemble.

## 2. Périmètre, méthode et niveau de preuve

### Sources examinées

- Code source, configuration, données, assets publics, workflow GitHub Actions et historique Git du checkout réel.
- Rendu de production à 1440×900, 1024×768, 768×1024 et 375×812.
- Navigation et interactions réelles : menu mobile, changement FR/EN, CTA, filtres, modal, Escape et ordre de tabulation.
- Requêtes HTTP directes sur l’accueil, la route légale et une route inconnue.
- npm run lint, npm run build, npx tsc -b, inventaire du graphe d’imports et npm audit.
- Skills appliqués : anti-vibecode-slop, design-taste-codex, web-security-audit.

### Limites explicites

- Le dossier courant initial C:\Users\UTILISATEUR\Documents\ChatGPT\Cle de voute était vide. Le repository vérifiable est le checkout GitHub ci-dessus ; aucune conclusion ne dépend d’un dossier vide.
- Le domaine métier final n’a pas été fourni. Le sous-domaine GitHub Pages observé est réel, mais son remplacement par un domaine propriétaire reste une décision à prendre.
- Les droits, l’auteur et la date des photographies ne sont pas prouvés dans le dépôt.
- Les chiffres et qualifications sont présents dans le code mais aucune pièce, registre ou attestation n’est fournie dans le dépôt.
- Aucun accès Google Search Console, aux DNS, aux paramètres GitHub Pages ou aux comptes du propriétaire n’était disponible.
- Le test de sécurité actif est resté non intrusif et limité à l’inspection du code et aux headers publics. Il ne s’agit pas d’un pentest.
- Semgrep et Trivy ne sont pas installés dans l’environnement ; npm audit est donc la seule analyse de dépendances automatisée exécutée.

### Légende

- PASS : preuve directe et comportement conforme au contrôle.
- FAIL : écart observé et action nécessaire.
- JUSTIFIED : choix acceptable dans ce contexte, avec conditions explicites.
- N/A : contrôle non applicable au produit actuel.
- UNKNOWN : preuve insuffisante ; décision ou vérification externe requise.

## 3. Preuves de baseline

### Architecture actuelle

| Élément | Constat |
|---|---|
| Stack | React 18, TypeScript, Vite 5, Tailwind CSS 3, React Router 6, Lucide, primitives shadcn/ui. |
| Runtime | Site statique GitHub Pages ; pas de serveur applicatif dans le dépôt. |
| Routes déclarées | /, /mentions-legales, puis * vers NotFound dans src/App.tsx:20-25. |
| Entrée accueil | src/pages/Index.tsx:13-23, une pile de sections sans landmark main. |
| Données métier | src/data/company.ts:2-20 ; réalisations dans src/data/realizations.ts. |
| Contact | src/components/ContactForm.tsx:10-72 ; le composant n’est pas un formulaire, mais une présentation de liens directs. |
| Dépendances | 31 dépendances directes déclarées ; une minorité est atteinte par le graphe d’imports de l’application. |
| Tests | Aucun script test dans package.json ; aucun test automatisé du dépôt. |

### Mesures du rendu publié

| Mesure | Résultat |
|---|---|
| Console navigateur | Aucune erreur ni alerte observée après rechargement. |
| 1440×900 | Hauteur document 6 105 px ; héros 900 px ; services 1 168 px ; footer 357 px. |
| 1024×768 | Navigation desktop masquée jusqu’au breakpoint xl ; menu hamburger affiché ; pas de débordement général constaté. |
| 768×1024 | H1 et CTA restent dans la fenêtre ; le carrousel crée un overflow interne intentionnel. |
| 375×812 | Hauteur document 11 329 px ; section services 3 056 px ; CTA et téléphone accessibles, mais page très longue. |
| DOM accueil | 1 H1, 6 H2, 20 H3, 27 boutons, 19 liens, 18 images, 1 iframe, 0 formulaire, 0 input. |
| Images | 18 balises d’image à l’exécution desktop, dont 9 duplications dues au second tour du carrousel ; aucune dimension HTML, loading ou decoding explicite. |
| Largeur | Aucun overflow horizontal du document n’a été observé aux largeurs testées ; l’overflow du carrousel est localisé et volontaire. |

### Requêtes de publication

| URL | Navigateur | HTTP direct | Verdict |
|---|---|---:|---|
| /CleDeVoute/ | Accueil correct | 200 | Conforme. |
| /CleDeVoute/mentions-legales | Page légale React visible | 404 | Écart critique de publication : le fallback affiche l’application mais l’URL est un 404 pour le transport et les robots. |
| /CleDeVoute/route-inconnue | 404 React avec retour accueil | 404 | Le 404 applicatif aide l’utilisateur ; le 404 HTTP est attendu pour une route inconnue. |

Headers observés sur l’accueil et les routes directes : HTTPS et HSTS présents, Access-Control-Allow-Origin: * présent. Sur les réponses échantillonnées, aucune politique CSP, Referrer-Policy, Permissions-Policy ou X-Content-Type-Options explicite n’a été observée. GitHub Pages limite la capacité à ajouter des headers serveur.

### Validation locale

| Commande | Résultat |
|---|---|
| npm run lint | PASS, 0 erreur et 7 warnings react-refresh/only-export-components dans des primitives UI. |
| npm run build | PASS, 1 695 modules transformés ; JS 373,72 kB brut / 116,36 kB gzip ; CSS 73,70 kB brut / 12,72 kB gzip. |
| npx tsc -b | PASS, aucune sortie d’erreur. |
| npm run optimize-images | FAIL attendu : script absent ; le workflow masque cet échec. |
| npm audit sur l’arbre complet | 20 vulnérabilités signalées : 0 critique, 15 hautes, 4 modérées, 1 basse. |
| npm audit --omit=dev | 11 signalements : 0 critique, 10 hauts, 1 bas ; la portée exacte doit être triée par usage et transivité, pas corrigée aveuglément. |

## 4. Constats prioritaires

Les constats ci-dessous sont les unités de décision. Le plan d’action les relie aux tâches A01 à A27.

| ID | Priorité | Statut | Preuve principale | Impact | Action |
|---|---|---|---|---|---|
| F01 | P1 | Confirmé | sitemap.xml:9 publie /mentions-legales, mais curl reçoit 404 ; gh-pages.yml:49-52 copie seulement index.html vers 404.html. | Perte de fiabilité des liens profonds, risque d’indexation incohérente. | A02 : générer une route statique légale ou changer la stratégie de publication. |
| F02 | P1 | À confirmer propriétaire | Stats.tsx:12-56, llms.txt:20-21, index.html:34-51 reprennent 20+, 500+, brevet et Tour de France sans source jointe. | Risque de preuve commerciale non fiable et de perte de confiance. | A03 : obtenir les justificatifs ou retirer les chiffres. |
| F03 | P1 | Confirmé | Canonical et publication sur bastienlopez.github.io/CleDeVoute/ dans index.html:17,22 ; le nom du dépôt est celui d’un hébergeur/personne, pas de l’entreprise. | Identité moins professionnelle et dépendance visible à l’hébergement GitHub. | A04 : décider et vérifier le domaine propriétaire avant lancement. |
| F04 | P1 | UNKNOWN | Le héros Hero.tsx:18-21 ressemble à une image stock/synthétique ; les droits et la provenance ne sont pas documentés. | La première impression peut paraître fabriquée et exposer un risque de droits. | A05 : valider les droits ou remplacer par des photos de chantier approuvées. |
| F05 | P2 | Confirmé | Héros centré, six cartes, quatre stats, quatre engagements, pills, gradients, blur, ombres et hover transforms dans Hero.tsx, Stats.tsx, About.tsx, Services.tsx, Realizations.tsx. | Sensation de landing page générée, hiérarchie faible. | A06-A07 : refondre IA et système visuel. |
| F06 | P2 | Confirmé | Accueil de 6 105 px desktop et 11 329 px à 375 px ; carrousel Realizations.tsx:98-101 dupliqué et animé. | Fatigue, preuve réelle trop tardive, compréhension lente. | A06, A10-A11, A23 : raccourcir et documenter les projets. |
| F07 | P2 | Confirmé | ContactForm.tsx:10-72 n’a ni form, ni champ, ni envoi ; le nom du fichier suggère l’inverse. | Conversion limitée mais honnête ; brief projet impossible. | A12 : assumer le contact direct ou créer un vrai backend autorisé. |
| F08 | P2 | Confirmé | Pas de main dans Index.tsx:13-23 ; menu sans aria-controls, label inchangé à l’ouverture (SiteHeader.tsx:61) ; modal sans focus trap/retour. | Navigation clavier et technologies d’assistance moins robustes. | A08, A13 : corriger sémantique, focus et motion. |
| F09 | P2 | Confirmé | Metadata principalement dans index.html:10-65 ; pas de og:image ; route légale conserve le titre accueil. | Partages et résultats de recherche moins précis. | A14 : metadata par route, image sociale et GSC. |
| F10 | P2 | Confirmé | 10 images total ≈1,73 MiB ; 18 nœuds desktop, pas de dimensions ni chargement différé sur Realizations.tsx:110. | Poids initial et CLS évitables. | A15 : pipeline d’images et budget de performance. |
| F11 | P2 | Potentiel | npm audit signale react-router-dom, @remix-run/router, postcss, glob, minimatch, nanoid, etc. ; headers applicatifs non configurables sur Pages ; carte Google tierce. | Dette de dépendances et confidentialité à cadrer, sans exploit applicatif confirmé. | A16-A17 : triage de reachability, headers/meta, carte et privacy. |
| F12 | P2 | Confirmé | CI permissive gh-pages.yml:31,36,52 ; README template ; TypeScript non strict tsconfig.app.json:18-21 ; pas de tests. | Régressions silencieuses et maintenance fragile. | A17-A21 : pipeline déterministe, nettoyage et tests. |
| F13 | P3 | Confirmé | 49 primitives UI générées, environ 37 fichiers atteignables ; variables CSS inutilisées index.css:51-66 ; double clé keyframes dans tailwind.config.ts:81-122. | Surface de maintenance et poids conceptuel disproportionnés. | A18-A19 : supprimer ou justifier le scaffold. |
| F14 | P4 | Future | Les preuves sont des photos isolées ; aucun cas client détaillé, FAQ ni page de service n’est justifié par des contenus vérifiés. | Potentiel SEO et conversion inexploité, mais création prématurée sans matière. | A25-A27 : seulement après collecte de preuves. |

### Comptage des actions du plan

Le comptage P0–P4 ci-dessous porte sur les tâches exécutables du plan, pas sur le nombre de lignes de la matrice ni sur le nombre de fichiers :

| Priorité | Actions | Nombre |
|---|---|---:|
| P0 | aucune | 0 |
| P1 | A01-A05 | 5 |
| P2 | A06-A17 | 12 |
| P3 | A18-A24 | 7 |
| P4 | A25-A27 | 3 |
| **Total** | **A01-A27** | **27** |

## 5. Stack et architecture actuelle

Le dépôt est une application Vite/React statique générée autour de primitives shadcn/ui. src/App.tsx:15-29 empile LanguageProvider, QueryClientProvider, TooltipProvider, deux toasters et BrowserRouter. Seul LanguageProvider a un comportement métier observable ; aucun hook React Query, tooltip ou toast n’est utilisé par le parcours actuel.

src/pages/Index.tsx compose directement les sections dans l’ordre suivant :

1. header fixe ;
2. héros ;
3. statistiques ;
4. présentation ;
5. services ;
6. réalisations ;
7. zone d’intervention ;
8. contact ;
9. footer.

La stratégie actuelle est raisonnable pour une petite brochure, mais le contenu n’est pas calibré pour une page aussi longue. Il faut d’abord réduire et hiérarchiser avant de créer des routes supplémentaires.

La langue FR/EN est gérée côté client dans src/lib/language.tsx:13-21 avec localStorage, document.documentElement.lang, document.title et la meta description. Le changement de langue fonctionne visuellement ; il ne change pas l’URL, le canonical, les balises hreflang, l’Open Graph ni les données structurées.

## 6. Audit anti-vibecode-slop

### Synthèse

Les écarts ne viennent pas d’un seul choix esthétique. Ils viennent de la combinaison suivante : promesse abstraite, hero stock-like, répétition de grilles, chiffres sans preuve, interface de cartes par défaut, animation décorative, marque réelle masquée et contenu de travaux sans contexte. La matrice complète des 94 contrôles se trouve en section 20.

### Écriture et contenu

- Les formulations sont grammaticalement propres, sans emojis ni ponctuation artificielle dominante.
- Les marqueurs les plus visibles sont « savoir-faire », « relation de confiance », « l’objectif est simple », « à votre rythme » et « large variété », présents dans About.tsx, Stats.tsx et les cartes de services.
- Les six services ont chacun trois features : ce n’est pas faux en soi, mais le parallélisme rigide donne une sortie de générateur.
- Les nombres 20+ et 500+ sont traités comme preuves visuelles alors que le dépôt ne fournit aucune source.
- L’absence de témoignages est saine : aucun avis, avatar ou note inventée n’a été repéré.

### Signaux de composition

- Le héros Hero.tsx:26-47 est une composition très connue : H1 serif centré, gros sous-titre, deux CTA, fond sombre et indicateur de scroll animé.
- Services.tsx:70-97 rend six cartes identiques sur trois colonnes, avec icône orange en carré arrondi, titre, texte et trois puces.
- Stats.tsx:84-96 rend quatre cartes de chiffres et About.tsx:88-98 quatre engagements supplémentaires : deux systèmes de preuves concurrents.
- Realizations.tsx:98-101 rend deux tours du même jeu desktop ; l’autoplay 30 secondes est défini dans src/index.css:177-187.
- Le logo existant public/logo.png est commenté dans SiteHeader.tsx:30-32, tandis que le mot-symbole texte est présenté comme identité finale.

### Verdict

Le site n’est pas « faux » au sens technique et rien ne prouve qu’une image est générée par IA. En revanche, il donne une impression AI/template parce qu’il privilégie les recettes de composition et les abstractions marketing aux preuves locales. La correction doit donc porter sur l’ordre de preuve, la densité, le choix des images et le contexte éditorial, pas seulement sur les couleurs.

## 7. Audit design-taste-codex

### Hiérarchie

La hiérarchie actuelle est visuellement nette mais commercialement inversée : la grande image et le titre occupent le plus d’espace, alors que la preuve tangible du travail est plus bas. Le premier écran devrait répondre simultanément à « quel métier ? », « dans quelle zone ? », « quel niveau de preuve ? » et « comment demander un échange ? ».

### Composition et rythme

- Les sections sont bien séparées par des fonds blanc, pierre et muted, mais chaque section reprend un même patron : titre centré, paragraphe centré, grille.
- Les section-transition de src/index.css:139-164 ajoutent des transitions en gradient entre les bandes sans apporter d’information.
- Le site gagnerait à alterner une colonne éditoriale, un projet documenté, un tableau de matières et un contact court, au lieu de six blocs symétriques.
- Le rayon rounded-2xl ou rounded-xl domine les cartes, photos, boutons et conteneurs ; cela uniformise tout et supprime la hiérarchie des surfaces.

### Typographie

Inter et Playfair Display sont cohérents et lisibles, mais leur association est une sélection très commune et non documentée. Le problème n’est pas de les conserver absolument : il faut décider si la typographie exprime un atelier précis ou seulement une landing page premium. Le logo, s’il est validé, doit guider le système plutôt que rester caché.

### Couleur

Le navy, l’orange et la pierre sont une base exploitable. Le risque ne vient pas de la palette, mais de la répétition de l’orange sur les badges, icônes, gradients, puces, CTA et états hover. L’orange doit redevenir un accent de décision, pas la texture de chaque composant.

### Images

Le héros est très sombre, flou et générique au regard d’une entreprise locale. Une réalisation de terrasse inspectée montre au contraire une matière et un contexte plus crédibles. Les futures images doivent être choisies pour prouver un geste, un matériau, une échelle ou un résultat, avec légende et informations de projet vérifiées.

### Interactions et motion

Le menu, la langue, les filtres et la modal ont une base fonctionnelle. Les transformations hover sur des éléments non interactifs (Stats.tsx, Services.tsx) et le scroll indicator animé ajoutent du mouvement sans renforcer la décision. prefers-reduced-motion ne neutralise pas l’animation de hero animate-slide-up, les transitions de fond et le scroll smooth.

## 8. Audit UI section par section

### Header

SiteHeader.tsx:25-76 fournit une barre fixe claire, un logo texte, cinq ancres, une langue et un contact. Points positifs : contraste et CTA visibles. Points à corriger :

- l’image de logo réelle est commentée ;
- la navigation desktop n’apparaît qu’à xl (1280 px), ce qui fait basculer une tablette/petit desktop vers le menu mobile ;
- le bouton de langue expose role="menu" sans role="menuitem" explicite sur les options ;
- aucun clic extérieur ni Escape ne ferme le menu de langue ;
- le bouton mobile conserve aria-label="Ouvrir le menu" quand il est ouvert et n’a pas aria-controls ;
- il manque un lien d’évitement vers le contenu principal.

### Navigation

Les ancres sont cohérentes avec les IDs de sections. La page n’a pas de sous-navigation ni de fil d’Ariane, ce qui est acceptable pour une brochure courte. Le problème est le volume de la destination : une ancre vers services ou réalisations arrive dans une section répétitive plutôt que sur une preuve ciblée.

### Héros

Hero.tsx:15-69 est lisible, mais l’usage de br répétés à :31 et :40 construit l’espace au lieu de laisser la composition respirer. Le texte dit le métier mais pas clairement le périmètre, le type de client, la zone précise ni la prochaine étape. Le CTA principal déclenche un scroll et le téléphone fonctionne. Le fond image, l’overlay et le centrage donnent cependant une esthétique de template.

### Statistiques

Stats.tsx:12-56,84-96 affiche 20+, 500+, brevet et Tour de France. Les deux chiffres sont les éléments les plus risqués du site : ils paraissent précis, sont répétés dans llms.txt et le JSON-LD, mais ne sont pas sourcés. Le composant est aussi visuellement très proche d’un bloc de métriques SaaS.

### Présentation

About.tsx:22-98 mélange histoire, valeurs, qualification et parcours. Le texte est générique et reprend les mêmes concepts que Stats. Une seule preuve narrative forte — qui intervient, sur quels matériaux, avec quelle manière de travailler — serait plus crédible que quatre engagements abstraits.

### Services

Services.tsx:55-97 couvre correctement les grandes familles de travaux, mais six cartes de même poids empêchent de comprendre les prestations prioritaires. Les textes anglais et français sont codés en dur dans le composant, sans système de contenu. Les icônes et puces sont cohérentes mais standardisées.

### Réalisations

Realizations.tsx:56-136 possède des filtres, une navigation clavier du carrousel et une modal. Les photos ont des alt utiles. En revanche :

- deux tours d’images sont rendus sur desktop ;
- l’autoplay est décoratif et peut nuire à l’observation ;
- les photos sont des boutons sans index ni légende de projet détaillée ;
- aucune photo n’a width, height, loading ou decoding explicites ;
- la modal ne gère pas le focus initial, le piège de focus ni le retour au bouton déclencheur ;
- les flèches placées avec des offsets négatifs peuvent devenir fragiles sur petit écran.

### Zone d’intervention

InterventionZone.tsx:9-37 rend la zone compréhensible et le lazy loading de l’iframe est un bon réflexe. L’iframe Google Maps est le seul fournisseur tiers visible. Il doit être compatible avec la décision privacy/consentement du propriétaire ; une carte statique ou un chargement après action réduirait la transmission tierce.

### Contact

ContactForm.tsx:10-72 est honnête : aucun faux formulaire n’est affiché. Le nom du fichier est trompeur et la section arrive après un long parcours. Le contenu pourrait préciser les informations à préparer pour un premier échange sans prétendre stocker une demande.

### Footer

Footer.tsx:11-74 reprend les ancres, coordonnées et lien légal. Il manque une hiérarchie de contact plus forte et une indication de disponibilité si elle est confirmée. Aucun lien externe avec target="_blank" n’a été trouvé.

### Preuve sociale

Il n’y a pas de témoignages ni de logos clients, ce qui évite l’invention. En contrepartie, les réalisations doivent porter davantage de preuve : avant/après si autorisé, matière, commune, année, périmètre de mission et résultat concret.

## 9. Audit UX et conversion

### Parcours actuel

Le parcours est un long scroll linéaire. Le visiteur peut appeler ou écrire dès le héros, puis découvre les services, la preuve photo, la zone et le contact. La logique est compréhensible, mais les éléments de confiance sont dispersés et les quatre sections de cartes créent une impression de catalogue.

### Frictions principales

1. Le héros promet une compétence mais ne démontre rien.
2. La localisation est repoussée après les réalisations.
3. Les chiffres non prouvés peuvent faire douter davantage qu’ils ne rassurent.
4. L’absence de formulaire est acceptable pour un site statique, mais l’intention « demander un devis » n’est pas qualifiée.
5. Les réalisations n’expliquent pas le chantier ; le visiteur doit interpréter seul une image.
6. Le parcours est très long sur mobile.
7. Les animations et le carrousel ajoutent de l’attention à gérer sans bénéfice de conversion prouvé.

### Conversion recommandée

Conserver deux actions primaires seulement :

- Appeler Marino avec le numéro confirmé ;
- Écrire un e-mail avec une amorce de message éventuellement préparée, sans stockage local côté site.

Ajouter autour de ces actions un micro-brief visible : commune, type de travaux, état du bâtiment, horizon souhaité et photos disponibles. Ne pas promettre un « devis sous X heures » ou un taux de conversion sans preuve.

## 10. Audit mobile et responsive

### Ce qui est validé

- Le document ne déborde pas horizontalement aux largeurs 375, 768 et 1024 testées.
- Le héros s’adapte et les CTA restent activables.
- Le menu mobile est visible sous xl.
- Les images du carrousel ont un overflow interne, pas un overflow de page généralisé.

### Problèmes

- À 375 px, la page atteint 11 329 px et les services seuls 3 056 px : six cartes empilées avec beaucoup de padding.
- Le breakpoint xl est tardif pour une navigation complète ; à 1024 px le menu mobile prend la place d’une barre desktop sans que ce soit nécessairement le meilleur choix.
- Le CTA principal du héros est plus large que le conteneur texte (x=6, largeur 349 dans la mesure observée), ce qui fonctionne mais donne une composition peu maîtrisée.
- Les filtres et les contrôles du carrousel consomment de la largeur et de la hauteur avant les images.
- Les boutons de modal en positions négatives ne sont pas une solution robuste à 375 px.
- Le scroll smooth global et les animations ne sont pas réduits correctement pour les utilisateurs sensibles au mouvement.

### Cible

À 375 px : un héros de hauteur naturelle, une preuve dans le premier ou deuxième écran, des services regroupés en 3 à 4 familles, une galerie statique en grille/liste et un contact court. Un audit de chaque section doit être réalisé à 320, 375, 768, 1024 et 1440 px après refonte.

## 11. Audit contenu et copywriting

### Exactitude

Les données affichées sont cohérentes entre company.ts, le JSON-LD et llms.txt, mais la cohérence interne ne constitue pas une preuve externe. Les éléments à faire valider sont : identité juridique, SIREN/SIRET, APE, registre, adresse, date d’inscription, 20+ années, 500+ projets, brevet, Tour de France, périmètre géographique, droits d’image et déclaration Google Maps.

### Ton

Le ton est poli et professionnel, mais interchangeable avec celui de nombreuses entreprises de travaux. Les phrases « l’objectif est simple », « relation de confiance » et « savoir-faire » doivent être remplacées par des faits observables : types de murs, pierre, terrasse, rénovation, contraintes de site, soin des finitions, interlocuteur unique — seulement si le propriétaire les confirme.

### Architecture de contenu

Le contenu doit passer de :

promesse -> métriques -> quatre engagements -> six cartes -> photos

à :

proposition locale -> preuve de travaux -> prestations prioritaires -> méthode -> zone -> contact.

La traduction anglaise doit être révisée séparément. Elle ne doit pas servir de preuve SEO locale et ne doit pas introduire de claims qui n’existent pas en français.

## 12. Audit accessibilité

### Points positifs

- Un seul H1 observé sur l’accueil.
- Les liens téléphone et e-mail sont natifs.
- Les images de réalisations ont des alt non vides et pertinents.
- Les boutons de la galerie ont des labels explicites.
- La fermeture Escape de la modal fonctionne.
- Le focus clavier atteint le logo, le menu, les CTA et les filtres.

### Écarts

- Aucun main sur l’accueil ; le contenu principal n’a pas de repère sémantique.
- Aucun skip link.
- Le bouton de menu mobile n’a pas aria-controls, son label ne décrit pas l’état ouvert et la fermeture Escape n’est pas implémentée.
- Le menu de langue a role="menu" mais pas de gestion complète du pattern menu.
- La modal n’enregistre pas le déclencheur, n’envoie pas le focus dans le dialogue et ne le restitue pas à la fermeture. Le test Escape prouve seulement la fermeture.
- Le carrousel automatique ne fournit pas une annonce d’état ni un contrôle pause explicite.
- Les mouvements animate-slide-up, hover transforms et scroll-behavior:smooth restent actifs sous prefers-reduced-motion.
- La carte Google peut transférer des données à un tiers ; le texte légal le dit, mais l’interface n’offre pas de choix de chargement.
- Le contraste devra être revalidé après toute modification de la palette orange et des overlays.

## 13. Audit performance

### Mesures

- Build : JS 373,72 kB brut / 116,36 kB gzip ; CSS 73,70 kB brut / 12,72 kB gzip.
- Images publiques : héros 1920×1080 ≈156 KiB ; neuf réalisations généralement 800×600, total images ≈1,73 MiB ; favicon ≈71 KiB.
- Le DOM desktop charge 18 images car le second tour du carrousel est rendu.
- Les réalisations n’indiquent ni dimensions, ni loading="lazy", ni decoding="async".
- Les polices Google sont préconnectées et chargées à distance dans index.html:6-9.
- Vite signale une base baseline-browser-mapping ancienne et Browserslist/caniuse-lite ancien.

### Priorité d’impact

1. Supprimer le second tour et l’autoplay du carrousel.
2. Redimensionner les assets à la taille de rendu et produire WebP/AVIF si le pipeline est maîtrisé.
3. Charger la galerie en différé avec dimensions réservées et alt maintenus.
4. Remplacer ou différer la carte Google.
5. Mesurer LCP, CLS, INP et poids réseau sur un build de production réel.
6. Mettre à jour les bases Browserslist lors d’une mise à jour contrôlée des dépendances.

## 14. Audit SEO, GEO et Search Console

### Points positifs

index.html:10-65 contient title, description, robots, canonical, Open Graph de base, Twitter card, favicon et JSON-LD GeneralContractor/WebSite. public/robots.txt autorise l’exploration et référence un sitemap. public/llms.txt rend les informations lisibles par un agent.

### Problèmes confirmés

- Le canonical, og:url et le sitemap pointent vers le sous-domaine GitHub Pages.
- La route légale du sitemap reçoit HTTP 404.
- MentionsLegales réutilise le title/description de l’accueil ; il n’y a pas de metadata par route.
- Aucune og:image n’est déclarée ; les partages sociaux auront une prévisualisation faible ou dépendante de la plateforme.
- Le changement FR/EN est client-side sur la même URL : pas de URL linguistique, hreflang ou metadata anglaise indexable.
- Le JSON-LD reprend les chiffres et qualifications non prouvés ; le structured data ne doit jamais servir à amplifier une affirmation non validée.
- public/sitemap.xml utilise des dates et priorités éditoriales sans preuve de stratégie de mise à jour.

### Google Search Console

L’exploitation recommandée est minimale et mesurable :

1. vérifier la propriété du domaine final dans Google Search Console ;
2. soumettre le sitemap final ;
3. inspecter l’URL d’accueil et la route légale après publication ;
4. suivre indexation, requêtes, impressions, clics, CTR et Core Web Vitals ;
5. ne pas installer d’analytics supplémentaire par réflexe : GSC suffit pour le besoin explicitement prévu, sauf décision documentée et consentement adapté ;
6. contrôler les erreurs 404 et les URLs canoniques après chaque changement de route.

## 15. Audit sécurité avec web-security-audit

> Cette section restitue les constats de la baseline initiale avant P0–P6. Pour les résultats retestés sur l’état courant, consulter `anti-vibecode-audit.md` et `.security-audit/report.md`.

### Surface réellement exposée

Le dépôt ne contient pas de backend, API, base de données, authentification, upload, session ou action privilégiée. Le site rend des textes et images statiques, des liens tel:/mailto: et une iframe Google Maps. Aucune valeur privée, clé API, dangerouslySetInnerHTML, innerHTML, eval ou construction de requête n’a été trouvée dans le code atteint.

### Dépendances

L’audit npm du checkout signale 20 vulnérabilités sur l’arbre complet et 11 avec --omit=dev. Les packages les plus importants sont react-router-dom/react-router et @remix-run/router côté application, puis postcss, glob, minimatch, nanoid, picomatch, lodash et brace-expansion principalement dans l’outillage ou l’arbre transitif. Le signal est réel au niveau de la chaîne de dépendances ; l’exploitabilité d’une vulnérabilité donnée dans ce site statique n’est pas démontrée. Ne pas lancer un upgrade global sans vérifier le lockfile, le build et les routes.

### Headers et tiers

HTTPS et HSTS sont observés. GitHub Pages renvoie Access-Control-Allow-Origin: * pour le contenu public. Les headers CSP, anti-MIME-sniffing, referrer et permissions ne sont pas configurables directement depuis le dépôt ; index.html peut cependant porter une meta CSP limitée si cela ne casse pas les polices, la carte et les assets. La carte Google est le seul flux tiers évident et doit rester documentée ou être chargée après action selon l’avis juridique.

### Verdict sécurité

Pas de vulnérabilité applicative confirmée dans le périmètre statique. Risques de durcissement et de supply chain à traiter : S20 est en échec, S02 et S18 restent inconnus, et la privacy de la carte doit être validée. Semgrep/Trivy manquants : ce sont des contrôles non exécutés, pas des résultats positifs.

## 16. Audit qualité du code

- Le code compile, le lint ne remonte aucune erreur et le typecheck passe.
- tsconfig.app.json:18-21 désactive strict, noUnusedLocals, noUnusedParameters et noImplicitAny. Cela facilite le scaffold mais réduit la détection précoce.
- Button dans src/components/ui/button.tsx transmet les props à button sans type par défaut ; le CTA du héros apparaît comme type="submit" hors formulaire. Ce n’est pas exploité ici, mais le primitive devrait être sûre.
- ContactForm.tsx devrait être renommé si aucun formulaire n’est prévu.
- LanguageProvider modifie title et description globaux mais ne possède pas de contrat de metadata par route.
- Les providers React Query, Tooltip, Toaster/Sonner sont montés sans usage observable dans le parcours.
- Le workflow ne lance ni lint, ni typecheck, ni tests ; il autorise npm install si npm ci échoue.
- Le script absent optimize-images est appelé puis ignoré.
- Le README reste le template de démarrage Lovable/Vite (README.md:5-14) et ne documente ni métier, ni publication, ni validation.

## 17. Dépendances

| Dépendance ou groupe | Utilité observée | Problème | Décision recommandée |
|---|---|---|---|
| react, react-dom | Runtime de l’application | Versions 18 ; pas de problème fonctionnel observé. | Conserver, mettre à jour de façon contrôlée. |
| react-router-dom | Deux routes et fallback | Audit npm signale la chaîne router ; route profonde déjà problématique au déploiement. | Mettre à jour après test, ou simplifier si génération statique adoptée. |
| lucide-react | Icônes visibles | Usage réel et cohérent. | Conserver. |
| @radix-ui/react-slot | Primitive de Button | Atteinte par le graphe. | Conserver si Button reste basé sur Radix. |
| @radix-ui/react-toast | Toaster shadcn | Monté mais aucun appel observé. | Supprimer avec le toaster si aucun feedback n’est ajouté. |
| @radix-ui/react-tooltip | Provider tooltip | Aucun Tooltip utilisé. | Supprimer provider et package si confirmé. |
| sonner | Toaster secondaire | Aucun toast observé. | Supprimer ou documenter un vrai besoin. |
| @tanstack/react-query | Provider global | Aucun hook ou appel de données. | Supprimer tant qu’aucune donnée asynchrone n’existe. |
| next-themes | Déclaré indirectement pour thèmes | Aucun ThemeProvider ni toggle ; dark tokens inactifs. | Supprimer avec la logique dark si elle n’est pas prévue. |
| react-hook-form, @hookform/resolvers, zod | Scaffolding potentiel de formulaire | Aucun formulaire ni validation. | Supprimer, ou les introduire uniquement avec un vrai contrat de soumission. |
| cmdk, date-fns, embla-carousel-react, input-otp | Primitives de scaffold | Non atteints par l’application. | Supprimer. |
| react-day-picker, react-resizable-panels, recharts, vaul | UI spécialisée de scaffold | Non atteints par l’application. | Supprimer. |
| La plupart des @radix-ui/* | Composants shadcn non utilisés | Dépendances et fichiers morts. | Supprimer après inventaire final. |
| class-variance-authority, clsx, tailwind-merge | Classes et variants réels | Usage réel. | Conserver. |
| vite, typescript, Tailwind, PostCSS, ESLint | Build et qualité | Browserslist/base mapping anciennes ; audit toolchain à trier. | Conserver, mettre à jour par lots testés. |

Versions installées observées : Vite 5.4.21, Tailwind 3.4.18, React Router DOM 6.30.2, React Query 5.90.9, Lucide 0.462.0. Les versions installées ne justifient pas à elles seules une mise à jour ; le lockfile et les advisories doivent guider A17.

## 18. Code, fichiers morts et incohérences

### Fichiers ou branches non atteints par l’application

L’analyse du graphe d’imports atteint environ 37 fichiers source sur 73. Les éléments non atteints comprennent :

- src/components/NavLink.tsx ;
- src/hooks/use-mobile.tsx ;
- src/components/ui/accordion.tsx, alert-dialog.tsx, alert.tsx, aspect-ratio.tsx, avatar.tsx, badge.tsx, breadcrumb.tsx, calendar.tsx, carousel.tsx, chart.tsx, checkbox.tsx, collapsible.tsx, command.tsx, context-menu.tsx, dialog.tsx, drawer.tsx, dropdown-menu.tsx, form.tsx, hover-card.tsx, input-otp.tsx, input.tsx, label.tsx, menubar.tsx, navigation-menu.tsx, pagination.tsx, popover.tsx, progress.tsx, radio-group.tsx, resizable.tsx, scroll-area.tsx, select.tsx, separator.tsx, sidebar.tsx, skeleton.tsx, slider.tsx, switch.tsx, table.tsx, tabs.tsx, textarea.tsx, toggle-group.tsx, toggle.tsx, ui/use-toast.ts ;
- public/placeholder.svg, sans référence trouvée ;
- public/logo.png, disponible mais non utilisé dans le header ;
- variables CSS de gradients, shadows, transitions et dark mode non consommées ou partiellement consommées dans src/index.css:51-124 ;
- la première propriété keyframes de tailwind.config.ts:81-99 est remplacée par la seconde à :106-120, ce qui rend les keyframes accordion déclarées mais perdues.

Cette liste est une candidate de nettoyage, pas une autorisation de suppression immédiate : chaque fichier doit être confirmé par le build et par l’intention de design avant A18.

### Incohérences principales

| Incohérence | Preuve | Effet |
|---|---|---|
| Logo réel vs mot-symbole texte | SiteHeader.tsx:30-32 commenté, :27 texte actif. | Marque présentée différemment de l’asset disponible. |
| ContactForm sans formulaire | ContactForm.tsx:10-72, aucun form dans le dépôt atteint. | Contrat de composant trompeur. |
| Sitemap vs HTTP | public/sitemap.xml:9, route légale HTTP 404. | Signal SEO contradictoire. |
| Claims UI vs preuves | Stats.tsx, llms.txt, JSON-LD sans document source. | Crédibilité non vérifiable. |
| UI de langue vs SEO | language.tsx:13-21 change le DOM mais pas l’URL/metadata complète. | Version anglaise peu indexable et partageable. |
| Workflow vs scripts | gh-pages.yml:36, script optimize-images absent. | Étape annoncée mais inactive. |
| TypeScript vs qualité attendue | tsconfig.app.json:18-21, strict désactivé. | Contrats moins contrôlés. |
| Scaffolding global vs usage réel | App.tsx:1-4,16-19, aucun hook associé. | Complexité et poids inutiles. |

## 19. Dette technique

### Dette de publication — prioritaire

- Le fallback SPA masque une route légale HTTP 404 et le workflow ignore une erreur de copie.
- Le sitemap et les canonical URLs dépendent d’un domaine d’hébergement qui n’est pas confirmé comme domaine final.
- Le script d’optimisation d’images appelé par la CI n’existe pas.
- Aucun test ne protège les routes directes, les metadata, les assets, les interactions ou les budgets.

### Dette d’architecture — importante

- L’accueil concentre trop de responsabilités dans une seule pile de sections et rend la preuve tardive.
- Le contrat du composant ContactForm ne correspond pas à son comportement réel.
- Le changement de langue modifie le DOM global sans stratégie d’URL ou de metadata par langue.
- Les providers React Query, Tooltip et toasters ajoutent des couches sans consommateur observable.
- Le carrousel porte à la fois navigation, autoplay, duplication DOM, responsive et modal ; cette responsabilité est trop large.

### Dette de qualité — amélioration structurante

- TypeScript applicatif est non strict et les symboles non utilisés sont explicitement tolérés.
- Le scaffold shadcn/ui et ses dépendances dépassent largement le graphe d’imports réel.
- Les tokens CSS, le dark mode et les keyframes contiennent des éléments morts ou écrasés.
- Le README est encore un template de démarrage et ne permet pas une reprise opérationnelle.
- Les données bilingues sont réparties dans les composants au lieu d’un modèle de contenu vérifiable.

### Stratégie de remboursement

Rembourser d’abord la dette qui peut rendre une URL fausse, une preuve invérifiable ou une release non reproductible (A01-A05), puis la dette de structure qui influence toutes les sections (A06-A17). Ne nettoyer le scaffold et renforcer strictness qu’après stabilisation du nouveau graphe d’imports (A18-A21). Les extensions P4 attendent la fin de la dette P1/P2.

## 20. Matrice complète des 94 contrôles — baseline initiale

> Matrice historique conservée pour comparer l’avant/après. La matrice de l’état courant, repassée après les corrections, est dans `anti-vibecode-audit.md`.

### W01-W10 — Écriture et copy

| ID | Contrôle | Statut | Emplacement / preuve | Impact et suite |
|---|---|---|---|---|
| W01 | Long-dash dependency | PASS | Pas de répétition dominante d’em dash dans le copy public. | Conserver une ponctuation française naturelle. |
| W02 | Formulaic contrast sentence | PASS | Pas de série visible de phrases « pas X, mais Y ». | Contrôle satisfaisant. |
| W03 | Decorative emoji punctuation | PASS | Aucun emoji dans l’interface ou les données de contenu. | Conserver Lucide pour l’iconographie. |
| W04 | Over-structured emphasis | PASS | Pas de blocs de texte entièrement suraccentués ; titres et labels restent distincts. | Ne pas multiplier les badges. |
| W05 | Automatic groups of three | FAIL | Six services dans Services.tsx:8-50, chacun avec exactement trois features. | Remplacer par une hiérarchie de prestations et preuves réellement différentes. |
| W06 | Excessive hedging | PASS | Pas de forte accumulation de « peut-être », « probablement », « semble ». | Contrôle satisfaisant ; rester factuel. |
| W07 | Uniform paragraph rhythm | PASS | Paragraphes courts mais de longueurs variées ; le problème principal est la répétition de sections, pas leur ponctuation. | Réécrire pour le contexte, sans artificiellement varier. |
| W08 | Question restatement before answer | PASS | Aucun bloc de réponse ne répète une question utilisateur. | Non applicable au site vitrine. |
| W09 | Model-signature vocabulary | FAIL | About.tsx:32,52, Stats.tsx:57, textes « savoir-faire », « relation de confiance », « objectif est simple ». | Remplacer les abstractions par faits, matériaux, méthode et cas vérifiés. |
| W10 | Unnaturally pristine chat-style typography | PASS | Aucun motif de bulles, labels de chat ou typographie conversationnelle artificielle. | Contrôle satisfaisant. |

### P01-P20 — Signaux immédiats de site généré

| ID | Contrôle | Statut | Emplacement / preuve | Impact et suite |
|---|---|---|---|---|
| P01 | Deployment subdomain left as identity | FAIL | Canonical et OG vers bastienlopez.github.io/CleDeVoute/ (index.html:17,22). | Décider un domaine propriétaire ; ne pas en inventer un dans le code. |
| P02 | Default purple/blue hero gradient | PASS | Héros navy/orange ; pas de gradient violet-bleu stéréotypé. | Palette actuelle réutilisable avec plus de retenue. |
| P03 | Obviously synthetic or defective imagery | FAIL | Héros Hero.tsx:18-21 visuellement stock/synthétique et très générique ; origine non prouvée. | Remplacer par image de chantier autorisée ou documenter clairement la licence. |
| P04 | Fabricated testimonials | PASS | Aucun témoignage, avatar, note ou endorsement non sourcé trouvé. | Ne rien ajouter sans source. |
| P05 | Dead or placeholder controls | PASS | CTA, téléphone, langue, filtres, modal et Escape testés ; aucun bouton mort observé. | Ajouter des tests de non-régression. |
| P06 | Scroll-reveal animation everywhere | PASS | Pas de reveal sur toutes les sections ; animation surtout hero, hover et carrousel. | Réduire quand même le mouvement décoratif. |
| P07 | One-page-by-default information architecture | JUSTIFIED | Brochure locale simple, deux routes utiles ; la page est longue mais le découpage n’est pas encore prouvé. | Raccourcir d’abord ; créer des pages seulement avec matière réelle. |
| P08 | Text-only placeholder brand mark | FAIL | public/logo.png existe mais l’image est commentée (SiteHeader.tsx:30-32), mot-symbole texte actif à :27. | Valider et intégrer le vrai asset, ou assumer une identité typographique conçue. |
| P09 | Missing favicon | PASS | index.html:66 référence public/favicon.ico. | Ajouter app/touch icon seulement si besoin réel. |
| P10 | Gimmicky animated headline coloring | PASS | H1 blanc statique ; pas de gradient animé de texte. | Contrôle satisfaisant. |
| P11 | Empty/template privacy page | PASS | La page légale est substantielle et mentionne hébergement, carte et traceurs (MentionsLegales.tsx:69,104). | Faire relire les faits ; ne pas ajouter de texte juridique inventé. |
| P12 | Empty/template terms page | N/A | Aucun tunnel marchand, paiement ou route de conditions générales. | Réévaluer si un devis/contrat en ligne apparaît. |
| P13 | Fake live-visitor counter | N/A | Aucun compteur de visiteurs en temps réel. | Ne pas en ajouter sans source réelle. |
| P14 | Fake customer/user count | N/A | Aucun compteur utilisateurs/clients ; 500+ projets relève de P15. | Ne pas transformer le chiffre en preuve client. |
| P15 | Unsupported performance/stat claims | FAIL | Stats.tsx:12-56, llms.txt:20-21, JSON-LD reprennent 20+ et 500+ sans justificatif dans le repo. | Obtenir une preuve ou supprimer les chiffres avant publication. |
| P16 | Emojis used as product iconography | PASS | Icônes Lucide dans les sections ; aucun emoji décoratif. | Conserver un système unique. |
| P17 | Vague hero proposition | FAIL | Hero.tsx:28-37 dit le métier, pas le client, la zone, le bénéfice concret ni la prochaine étape détaillée. | Réécrire le hero autour du problème local et de la preuve. |
| P18 | Decorative handwriting font by default | PASS | Aucune police manuscrite rendue ; le script du logo non utilisé n’affecte pas l’UI. | N’utiliser une signature manuscrite que si la marque la justifie. |
| P19 | Generator/platform badge left unintentionally | PASS | Aucun badge Lovable/Vite/builder visible dans le rendu. | Nettoyer aussi le README template. |
| P20 | AI-copy markers repeated throughout site copy | FAIL | Accumulation W05/W09 + structure de cartes et promesses abstraites dans plusieurs sections. | Réécriture éditoriale fondée sur preuves, pas paraphrase globale. |

### D01-D24 — Defaults de design

| ID | Contrôle | Statut | Emplacement / preuve | Impact et suite |
|---|---|---|---|---|
| D01 | High-saturation gradient collision | JUSTIFIED | Gradients orange/navy dans Hero.tsx:21,44 et Services.tsx:77, palette cohérente mais répétée. | Garder un seul accent décisionnel ; réduire les gradients décoratifs. |
| D02 | Floating decorative icons in page margins | PASS | Pas d’icônes flottantes dans les marges. | Contrôle satisfaisant. |
| D03 | Unconsidered pure-white canvas | PASS | Alternance background, stone, muted intentionnelle dans les sections. | Garder les bandes mais supprimer les transitions gratuites. |
| D04 | Section-by-section rainbow palette | PASS | Palette limitée navy/orange/pierre, sans arc-en-ciel. | Contrôle satisfaisant. |
| D05 | Shadow on nearly every object | FAIL | Card et cartes utilisent shadow-sm/lg/2xl ; images et CTA ont également des ombres. | Introduire une hiérarchie de surfaces et réserver l’ombre aux éléments importants. |
| D06 | Default three-feature-card row | FAIL | Six cartes de services en grille 3 colonnes, chacune même patron (Services.tsx:70-97). | Remplacer par 3-4 familles et une preuve par prestation. |
| D07 | Glass/blur effect as a blanket style | FAIL | Header backdrop-blur (SiteHeader.tsx:25), overlay et bouton téléphone glass (Hero.tsx:53). | Garder au maximum un traitement contextuel ; privilégier surfaces opaques. |
| D08 | Generator-default font selection | FAIL | Inter + Playfair dans index.html:9, sans rationale ; pairing très courant et logo réel ignoré. | Refaire le système typographique à partir de la marque validée. |
| D09 | Decorative full-width accent band | PASS | Transitions CSS index.css:139-164 restent des gradients fins, pas une bande de couleur pleine dominante. | Les retirer si elles n’ajoutent aucune information. |
| D10 | Bento layout by reflex | N/A | Aucun bento layout. | Ne pas l’ajouter par mode. |
| D11 | Fake terminal window as decoration | N/A | Aucun terminal décoratif. | Non applicable. |
| D12 | Every benefit prefixed with a green check | PASS | Les features utilisent des points orange (Services.tsx:91), pas des checks verts. | Contrôle satisfaisant. |
| D13 | Three pricing tiers by convention | N/A | Aucun prix ni pricing. | Non applicable au site actuel. |
| D14 | No real product demonstration | JUSTIFIED | Neuf photos de réalisations réelles sont présentes ; elles manquent toutefois de contexte. | Enrichir les cas plutôt que simuler une démo. |
| D15 | Same corner radius on everything | FAIL | rounded-xl, rounded-2xl, rounded-full sur header, boutons, cartes, images, pills et icônes. | Créer une échelle de rayons par rôle. |
| D16 | Purple-on-black default AI palette | PASS | Pas de violet/noir ; navy, pierre et orange. | Contrôle satisfaisant. |
| D17 | Missing loading placeholders/states | N/A | Pas de donnée asynchrone ni mutation métier ; iframe lazy sans parcours de chargement critique. | Revoir si formulaire/API ajoutés. |
| D18 | Background glow/orb decoration | PASS | Aucun orb ou glow abstrait identifié. | Contrôle satisfaisant. |
| D19 | Decorative dot-grid background | PASS | Aucun dot-grid. | Contrôle satisfaisant. |
| D20 | Sparkle icon as universal AI symbol | N/A | Aucun symbole sparkle/IA. | Non applicable. |
| D21 | Bouncing scroll arrows | FAIL | Indicateur animé Hero.tsx:67-69 avec animate-bounce/animate-pulse. | Supprimer ou remplacer par une indication statique utile. |
| D22 | Hover animation on non-interactive elements | FAIL | Cards/article de Stats et Cards de Services se déplacent ou pivotent au hover. | Réserver le mouvement aux éléments réellement interactifs. |
| D23 | Neon-on-dark default styling | PASS | Contraste sombre/orange mesuré, sans néon saturé. | Contrôle satisfaisant. |
| D24 | Generic pastel-everything styling | PASS | Palette plutôt minérale et contrastée. | Contrôle satisfaisant. |

### L01-L20 — Complétude et lancement

| ID | Contrôle | Statut | Emplacement / preuve | Impact et suite |
|---|---|---|---|---|
| L01 | Custom not-found experience | PASS | NotFound.tsx:4-23, rendu 404 avec retour accueil observé. | Garder le fallback applicatif tout en distinguant le transport HTTP. |
| L02 | Primary CTA visible early | PASS | CTA contact et téléphone visibles dans le premier écran desktop/mobile. | Conserver, mais clarifier la promesse. |
| L03 | Unique page titles | FAIL | La page légale conserve le title accueil observé en navigateur. | Ajouter metadata par route. |
| L04 | Unique page descriptions | FAIL | LanguageProvider ne cible qu’une description globale ; aucune description légale dédiée. | Générer description selon route et langue. |
| L05 | Social sharing image/metadata | FAIL | OG title/description présents (index.html:19-24), mais aucune og:image. | Ajouter une image sociale autorisée et tester le rendu. |
| L06 | Complete favicon/app-icon baseline | PASS | Favicon déclaré (index.html:66) et présent. | Ajouter touch icon seulement si le produit le justifie. |
| L07 | robots.txt policy | PASS | public/robots.txt:2-16 autorise l’exploration et fournit le sitemap. | Mettre à jour l’URL avec le domaine final. |
| L08 | Sitemap | FAIL | public/sitemap.xml:9 liste une URL qui renvoie HTTP 404. | Ne publier que des URLs indexables réellement servies. |
| L09 | Alternative text for meaningful images | PASS | Alt non vides sur les réalisations ; image hero en background donc décorative au DOM. | Enrichir les alt avec contexte vérifié sans keyword stuffing. |
| L10 | Real mobile breakpoints tested | PASS | 375, 768, 1024 et 1440 testés dans le navigateur. | Refaire ces mesures après refonte. |
| L11 | Mobile primary action remains reachable | PASS | CTA hero et téléphone atteints à 375 px. | Pas de sticky CTA sans preuve de besoin. |
| L12 | Loading state for async actions | N/A | Aucun formulaire, mutation ou fetch applicatif. | Requis si un backend apparaît. |
| L13 | Field-specific form errors | N/A | 0 formulaire et 0 input dans le DOM. | Requis si un vrai formulaire est autorisé. |
| L14 | Submission success/confirmation state | N/A | Aucune soumission. | Requis si un vrai formulaire est ajouté. |
| L15 | Real privacy disclosure | UNKNOWN | Mentions détaillées sur la carte (MentionsLegales.tsx:104), mais contrôleur, conservation et choix de consentement nécessitent validation propriétaire/juridique. | Faire confirmer les faits et le comportement tiers. |
| L16 | Real terms/conditions when applicable | N/A | Pas de transaction ni engagement contractuel en ligne. | Revoir avec le propriétaire si le parcours commercial change. |
| L17 | Consent control with genuine rejection where required | UNKNOWN | Carte Google tierce et traceurs possibles ; juridiction et configuration effective inconnues. | Décider click-to-load/consentement avec validation juridique. |
| L18 | Analytics/measurement decision implemented | JUSTIFIED | Aucun analytics ajouté ; l’usage futur de GSC est explicitement prévu. | Configurer GSC sur le domaine final, sans ajouter un tracker par défaut. |
| L19 | Real contact channel | PASS | company.ts:12-18, liens tel/mailto dans Contact et Footer. | Faire confirmer la disponibilité et l’adresse avant publication. |
| L20 | Optimized image delivery | FAIL | Environ 1,73 MiB, 18 images desktop, pas de dimensions/lazy/format moderne explicites. | Pipeline d’images et budget. |

### S01-S20 — Sécurité et protection des données

| ID | Contrôle | Statut | Emplacement / preuve | Impact et suite |
|---|---|---|---|---|
| S01 | No private API secrets in browser bundles | PASS | Aucun secret, env public, dangerouslySetInnerHTML, API key ou token trouvé dans la source atteinte/assets. | Refaire un scan sur le build final. |
| S02 | No valid secrets retained in Git history | UNKNOWN | Recherche bornée de motifs dans l’historique sans valeur exposée ; pas de scan exhaustif de tous formats de secrets. | Exécuter un secret scanner dédié avant publication si disponible. |
| S03 | Service/admin credentials remain server-only | N/A | Aucun service privilégié ni backend. | Requis si une API est ajoutée. |
| S04 | Row/data-level access policies enabled and correct | N/A | Pas de base de données. | Non applicable. |
| S05 | Sensitive data protected at rest appropriately | N/A | Aucune donnée utilisateur stockée. | Non applicable. |
| S06 | Authentication verified server-side | N/A | Pas d’authentification. | Non applicable. |
| S07 | Object/record authorization prevents ID swapping | N/A | Pas de ressources ou IDs utilisateur. | Non applicable. |
| S08 | Privileged fields cannot be mass-assigned | N/A | Pas d’API d’écriture. | Non applicable. |
| S09 | Session cookies hardened | N/A | Pas de session applicative ; éventuels tiers à traiter côté privacy. | Non applicable au code local. |
| S10 | Passwords use modern password hashing | N/A | Aucun mot de passe. | Non applicable. |
| S11 | Login/auth abuse rate limiting | N/A | Aucun login ou endpoint sensible. | Non applicable. |
| S12 | Public-form bot/abuse protection | N/A | Aucun formulaire public ; liens mail/tel uniquement. | Requis si formulaire ajouté. |
| S13 | Parameterized database queries | N/A | Pas de base ni requête. | Non applicable. |
| S14 | Server-side input validation | N/A | Pas d’entrée serveur. | Requis si backend ajouté. |
| S15 | User content is safely rendered | PASS | Contenu statique React échappé ; aucun sink HTML brut trouvé. | Refaire le contrôle si CMS ou contenu utilisateur apparaît. |
| S16 | Uploads constrained and isolated | N/A | Aucun upload. | Non applicable. |
| S17 | API responses expose only necessary fields | N/A | Aucune API. | Non applicable. |
| S18 | Security headers configured appropriately | UNKNOWN | HTTPS/HSTS présents ; CSP, referrer, permissions et MIME sniffing non observés dans les headers échantillonnés, contrôle serveur limité par Pages. | Ajouter le durcissement possible et vérifier les headers du domaine final. |
| S19 | HTTPS enforced in production | PASS | Production observée en HTTPS avec HSTS. | Revalider sur le domaine final. |
| S20 | Dependency vulnerability hygiene | FAIL | npm audit : 20 total/15 high/4 moderate/1 low ; --omit=dev : 11/10 high/1 low. | Triage par reachability puis mises à jour testées. |

### Comptage de la matrice

| Statut | Nombre |
|---|---:|
| PASS | 39 |
| FAIL | 21 |
| JUSTIFIED | 4 |
| N/A | 26 |
| UNKNOWN | 4 |
| **Total** | **94** |

## 21. Nouvelle direction artistique recommandée

### Concept

**Atelier contemporain — précision constructive.**

La marque doit évoquer un travail construit, local et durable, sans tomber dans le décor rustique, la fausse patine ou le chantier spectaculaire générique. Le site doit ressembler à un carnet de réalisations éditorialisé par un artisan, pas à une plateforme de services.

### Personnalité

Calme, précise, directe, matérielle, locale, professionnelle. Peu de superlatifs. Chaque promesse doit être rattachée à une photo, une matière, une méthode, une zone ou une information vérifiée.

### Références stylistiques abstraites

- revue d’architecture et carnet de matière ;
- plans, coupes et détails de construction comme langage graphique ponctuel ;
- photographie documentaire de chantier, lumière naturelle, cadrages imparfaits mais maîtrisés ;
- signalétique d’atelier contemporaine, sans textures grunge ni bois artificiel ;
- mise en page éditoriale asymétrique, avec espaces de respiration et légendes.

### Palette

| Rôle | Direction |
|---|---|
| Fond principal | Blanc cassé/chaux, pas blanc clinique partout. |
| Surface secondaire | Pierre claire très parcimonieuse. |
| Texte | Bleu ardoise très sombre, contraste stable. |
| Accent | Terre cuite/orange pour les actions et repères, pas pour tous les composants. |
| Accent secondaire | Laiton sourd ou argile, seulement pour un détail de marque. |
| Règle | 1 accent par écran ; pas de gradient décoratif par défaut. |

### Typographie

Conserver une paire serif éditoriale + sans neutre seulement si elle est assumée par la marque et testée en français. La serif sert aux titres et aux noms de projets ; la sans sert aux coordonnées, labels, boutons et légendes. Éviter une troisième police et tout script décoratif dans l’interface.

### Grille et espacements

- conteneur de lecture 1120–1200 px, avec une colonne texte plus étroite ;
- grille 12 colonnes desktop, 4 colonnes tablette, 2 colonnes mobile ;
- sections de 72–112 px desktop et 48–72 px mobile ;
- rythme vertical piloté par le contenu, pas par des br ;
- alignements à gauche pour les preuves et le contact ; centrage réservé au message d’ouverture.

### Rayons, boutons et cartes

- rayons différenciés : 2–4 px pour détails éditoriaux, 8–12 px pour surfaces importantes, pill seulement pour filtres/états ;
- boutons solides simples, hauteur tactile ≥44 px, sans scale hover systématique ;
- cartes réduites en nombre ; une carte représente un projet ou une décision, pas une décoration ;
- bordure et contraste avant ombre ; ombre uniquement pour modal ou surface élevée.

### Images

Remplacer le héros générique par une image de chantier autorisée ou une composition de deux détails réels : main, matériau, joint, mur, terrasse, outil. Chaque photo doit répondre à une question commerciale. Les cas détaillés doivent porter titre, commune si publiable, type de travaux, matière et périmètre confirmé.

### Icônes et animations

Lucide peut rester pour les repères fonctionnels, mais une icône ne doit pas remplacer une preuve. Supprimer l’autoplay et le bounce. Garder seulement transitions courtes d’état, focus clairement visibles et une animation d’entrée discrète désactivée par prefers-reduced-motion.

### Sections et hero cible

1. bandeau d’identité et contact ;
2. proposition concrète : métier, zone, types de projets, action ;
3. projet phare documenté ;
4. prestations regroupées par besoin ;
5. méthode et périmètre ;
6. sélection de réalisations ;
7. preuves de qualification seulement si vérifiées ;
8. contact direct ;
9. mentions légales.

Le héros doit montrer le métier, la zone et l’action dans 2–3 blocs typographiques maximum. Le premier projet réel doit apparaître sans imposer un scroll de plusieurs écrans.

### Navigation et responsive

Navigation courte : Accueil, Prestations, Réalisations, Zone, Contact. La langue peut rester une option secondaire ; si elle doit être indexable, elle doit obtenir une vraie stratégie d’URL. À mobile, fermer le menu après navigation, gérer Escape/clic extérieur et maintenir le focus.

### Comment éviter explicitement l’esthétique « landing page générée par IA »

- ne pas utiliser une grille de six cartes pour exprimer six idées équivalentes ;
- ne pas mettre un chiffre en avant sans document ou explication ;
- ne pas utiliser un héros de chantier générique quand une photo réelle existe ;
- ne pas répéter la même promesse sous quatre synonymes ;
- ne pas donner à chaque élément un rayon, une ombre, un gradient et une animation ;
- ne pas créer FAQ, témoignages, badges, pages SEO ou faux logos uniquement pour remplir ;
- ne pas inventer de détail local, de délai, de certification ou de client ;
- accepter des asymétries et des blancs si elles rendent la preuve plus lisible.

## 22. Structure et sitemap recommandé

### Phase de lancement minimale

| URL | Rôle | Décision |
|---|---|---|
| / | Accueil court : proposition, preuve, prestations, zone, contact. | Conserver comme page principale, réduire fortement. |
| /mentions-legales/ | Mentions et privacy réelles, route statique servie en HTTP 200. | Corriger avant sitemap. |
| /404.html | Fallback de récupération. | Conserver et tester séparément du routeur. |

### Extensions conditionnelles

- /realisations/ seulement si au moins 3 à 6 projets ont des métadonnées vérifiées ;
- /prestations/ seulement si chaque famille mérite un texte unique et une intention de recherche ;
- pages locales uniquement si la zone, les services et les preuves sont réellement distincts.

Ne pas créer de pages minces /ville/service ou une route par carte pour simuler une couverture SEO.

## 23. Sections à conserver, repenser, fusionner, supprimer, créer

### Conserver

- palette navy/orange/pierre comme base ;
- contact direct tel:/mailto: ;
- section zone, si la carte est juridiquement et techniquement cadrée ;
- page légale, favicon, robots, sitemap après correction ;
- données d’entreprise centralisées ;
- photos de réalisations approuvées et textes alternatifs.

### Repenser

- header et identité visible ;
- hero et ordre de preuve ;
- services ;
- présentation ;
- réalisations ;
- CTA et contact ;
- traduction et metadata.

### Fusionner

- Stats + engagements About en une section « repères et méthode » ;
- zone + contact en un bloc de décision final ;
- filtres + galerie en une expérience de sélection statique.

### Supprimer

- second tour du carrousel ;
- autoplay et bounce ;
- br de mise en page ;
- chiffres non validés ;
- cartes ou providers de scaffold sans usage ;
- transitions de section si elles ne servent aucune hiérarchie ;
- faux nom ContactForm si aucun formulaire n’est introduit.

### Créer

- bloc de projet phare documenté ;
- modèle de fiche réalisation ;
- méthode de travail courte ;
- image sociale et metadata par route ;
- génération statique de la route légale ;
- tests de routes, a11y clavier, images et budget ;
- registre de preuves propriétaire.

## 24. Top problèmes classés par priorité

### P0 — bloquant

**Aucun P0 confirmé.** Aucun secret exposé, backend compromis ou panne totale n’a été observé. Cela ne rend pas les claims, la route légale ou les droits photo optionnels.

### P1 — critique avant publication de la refonte

| ID | Fichiers | Problème / cause | Impact | Solution | Difficulté / risque / dépendances |
|---|---|---|---|---|---|
| F01 / A02 | gh-pages.yml:49-52, public/sitemap.xml:9, routeur | Fallback SPA unique au lieu d’une page légale statique. | SEO et liens directs incohérents. | Produire dist/mentions-legales/index.html ou retirer la route du sitemap ; tester HTTP 200. | Moyenne ; dépend du choix de publication. |
| F02 / A03 | Stats.tsx:12-56, llms.txt, index.html:26-65, company.ts | Claims précis sans preuve déposée. | Confiance et exactitude commerciale. | Justificatifs propriétaire, sinon suppression/neutralisation des claims. | Faible techniquement, bloquée par propriétaire. |
| F03 / A04 | index.html:17,22, vite.config.ts, Pages | Sous-domaine d’hébergement présenté comme identité finale. | Marque et partage moins crédibles. | Décider domaine, canonical, OG, robots, sitemap et redirections. | Moyenne ; dépend DNS/Pages. |
| F04 / A05 | Hero.tsx:18-21, public/* | Provenance hero/photo inconnue. | Impression stock/IA et risque de droits. | Audit droits, remplacement ou approbation documentée. | Faible à moyenne ; dépend assets autorisés. |

### P2 — important

| ID | Fichiers | Problème | Correction |
|---|---|---|---|
| F05 / A06-A07 | Hero, Stats, About, Services, CSS | Système visuel de template et hiérarchie répétitive. | Refonte art direction + IA preuve-first. |
| F06 / A10-A11-A23 | Index, Services, Realizations | Page trop longue et carrousel dupliqué. | Réduire familles, supprimer duplicate/autoplay, cas documentés. |
| F07 / A12 | ContactForm | Pas de formulaire réel ni qualification. | Contact direct explicite ou vrai backend autorisé, jamais faux formulaire. |
| F08 / A08-A13 | SiteHeader, Index, Realizations, CSS | Sémantique, focus, menu, modal et motion incomplets. | Landmark, skip link, focus trap/retour, Escape, reduced motion. |
| F09 / A14 | index, language, App | Metadata globale, pas d’OG image, route légale réutilisée. | SEO par route/langue et image sociale. |
| F10 / A15 | Realizations, public images | Images trop nombreuses et peu optimisées. | Formats, dimensions, lazy loading, budget et mesure. |
| F11 / A16-A17 | package, headers, map, Mentions | Advisories et limites tiers/headers. | Triage npm, durcissement disponible, carte après décision privacy. |
| F12 / A21 | workflow, tsconfig, README | CI permissive, tests absents, strict off. | Gates déterministes, tests ciblés, documentation. |

### P3 — amélioration structurante

- Retirer le scaffold UI et les dépendances non atteintes.
- Nettoyer tokens CSS, dark mode inactif et double définition des keyframes.
- Réécrire les paragraphes et traductions autour de faits locaux validés.
- Renommer les composants dont le contrat ne correspond pas au rendu.
- Formaliser une échelle de rayons, ombres, boutons et états.
- Ajouter un registre de preuves et une convention de contenu.
- Produire une baseline visuelle/axe clavier réutilisable.

### P4 — nice-to-have

- Créer des pages de cas ou de prestations seulement avec matière vérifiée.
- Exploiter les données GSC après établissement du domaine, sans ajouter d’analytics par défaut.
- Ajouter une micro-interaction de marque ou un app icon uniquement si cela sert une décision et reste sobre.

## 25. Réponses aux 18 questions explicites

### 1. Pourquoi le site donne-t-il une impression « faite par IA » ?

Parce que la composition est une somme de patrons fréquents — hero centré, image sombre, deux CTA, métriques, six cartes, quatre engagements, pills, gradients, ombres, hover et carrousel — alors que les éléments spécifiques à l’entreprise sont peu nombreux et peu contextualisés. Ce diagnostic décrit une impression visuelle, pas l’origine technique du code ni la provenance certaine des images.

### 2. Quels sont les 10 éléments qui y contribuent le plus ?

1. héros générique et très assombri ;
2. centrage symétrique et br de mise en page ;
3. 20+ et 500+ sans preuve ;
4. six cartes identiques de services ;
5. quatre cartes d’engagement qui répètent les stats ;
6. trois features exactement par service ;
7. carrousel dupliqué et autoplay ;
8. rayons/ombres/gradients appliqués partout ;
9. vocabulaire abstrait de savoir-faire/confiance ;
10. logo réel disponible mais masqué.

### 3. Quelles règles principales de anti-vibecode-slop ne sont pas respectées ?

W05, W09, P01, P03, P08, P15, P17 et P20 sont les écarts les plus importants. D05, D06, D07, D08, D15, D21 et D22 les amplifient côté design. La matrice complète distingue les 21 FAIL des choix JUSTIFIED et des contrôles N/A.

### 4. Quelles règles principales de design-taste-codex ne sont pas respectées ?

Hiérarchie de preuve insuffisante, répétition de grilles, rayon uniforme, ombres et blur trop fréquents, hero non spécifique, animation décorative et absence de composition éditoriale. La palette est exploitable ; elle n’a pas besoin d’être remplacée par une autre recette.

### 5. Quelles parties peuvent être conservées ?

Le métier et les coordonnées, la palette de départ, les liens directs, le favicon, les bases SEO de l’accueil, les alt des photos, la page légale sous réserve de validation, la zone, le 404 applicatif et les photos réellement approuvées.

### 6. Quelles parties doivent être reconstruites ?

Hero, ordre de preuve, IA des sections, système de services, galerie, contact de conversion, metadata par route, publication statique, focus/accessibilité et pipeline image.

### 7. Quelles parties doivent être supprimées ?

Second tour/autoplay du carrousel, bounce, br de composition, claims non prouvés, providers et primitives sans usage, dépendances de scaffold, tokens CSS morts et éventuellement la carte tierce si elle n’est pas nécessaire.

### 8. Quelle direction artistique est plus adaptée ?

Atelier contemporain — précision constructive : éditorial, minéral, calme, documentaire, local. Une grille de revue de projets et de matières, avec l’orange comme accent d’action et non comme décoration globale.

### 9. Comment rendre le site authentique sans tomber dans le rustique cliché ?

Utiliser des photos réelles autorisées, des légendes factuelles, des détails de matière, une typographie sobre et une mise en page éditoriale. Éviter bois, craquelures, outils en gros plan posés pour la photo, faux tampon artisanal et filtres vintage.

### 10. Comment augmenter la confiance ?

Valider les informations légales, montrer des réalisations contextualisées, préciser la zone, expliquer la méthode de premier échange et afficher les qualifications uniquement avec preuve. Les témoignages ne doivent apparaître que s’ils sont authentifiables.

### 11. Comment améliorer la conversion ?

Présenter l’action téléphone/e-mail dans le hero et la conclusion, diminuer la longueur, donner une sélection de projets compréhensibles et indiquer quelles informations préparer. Ne pas inventer de délai de réponse ou de formulaire qui stockerait des données.

### 12. Quels problèmes mobiles doivent être corrigés ?

Longueur de 11 329 px à 375 px, six cartes empilées, breakpoint xl tardif, carrousel dense, modal aux boutons déportés et mouvements non réduits. L’overflow général n’est pas le problème principal : c’est la densité et la friction.

### 13. Quels problèmes techniques corriger avant le redesign ?

Route légale HTTP 404, workflow permissif, script image absent, dépendances et scaffold inutiles, strict TypeScript désactivé, absence de tests, metadata globale et contrat ambigu de ContactForm.

### 14. Quels problèmes SEO existent ?

Canonical GitHub Pages, sitemap qui liste une URL HTTP 404, titles/descriptions non uniques, absence d’OG image, version anglaise non indexable par URL, JSON-LD amplifiant des claims à vérifier et absence de validation GSC.

### 15. Quels problèmes sécurité existent réellement ?

Aucune faille applicative critique confirmée sur cette surface statique. Le résultat réel est une dette de dépendances npm, des headers non vérifiables/limités par GitHub Pages, une carte tierce à cadrer et un scan historique de secrets non exhaustif. S20 est FAIL ; S02 et S18 restent UNKNOWN.

### 16. Quelles optimisations performance auront le plus d’impact ?

Supprimer la duplication/autoplay, réduire les dimensions et formats des images, charger la galerie en différé, réserver les dimensions, mesurer les Core Web Vitals et différer la carte Google. Ces actions ont davantage d’impact que de petites optimisations React.

### 17. Quel serait le meilleur ordre d’exécution ?

Baseline et décisions propriétaire, routes/claims/assets, nettoyage technique, IA et design system, header/hero, services/preuves, galerie, confiance/contact, responsive, accessibilité, SEO/GSC, performance, sécurité, tests, puis trois audits finaux.

### 18. Comment vérifier objectivement que le site n’est plus « AI slop like » ?

Repasser les 94 contrôles avec preuves, atteindre zéro FAIL P1/P2 non accepté, faire valider les claims et photos, mesurer le temps jusqu’à la première preuve et l’action contact, tester les cinq largeurs, vérifier le clavier/modal, comparer un budget image/JS, contrôler les routes HTTP et demander une revue humaine à l’aveugle : « quelle entreprise spécifique voyez-vous ici, et quelle preuve vous a convaincu ? ».

## 26. Checklist de sortie de la baseline initiale et frontières restantes

- [x] Repository réel identifié et état Git préservé.
- [x] Code source, configuration, assets publics et workflow inspectés.
- [x] Rendu production inspecté en desktop, tablette et mobile.
- [x] Console et interactions principales vérifiées.
- [x] Build, lint et typecheck exécutés.
- [x] Matrice complète des 94 contrôles produite.
- [x] Sécurité statique bornée exécutée sans exposer de secret.
- [x] Aucune modification applicative effectuée pendant l’audit de baseline initiale.
- [ ] Domaine propriétaire confirmé.
- [ ] Claims, identité légale et qualifications documentés par le propriétaire.
- [ ] Droits et provenance de chaque image confirmés.
- [ ] Décision privacy/consentement pour Google Maps confirmée.
- [ ] Propriété Google Search Console confirmée.
- [ ] Refonte et retest planifiés dans plan-action.md.

## 27. Verdict final de la baseline initiale

La base est exploitable, mais la bonne refonte n’est pas une couche cosmétique. Elle doit déplacer le centre de gravité du site : moins de composants marketing génériques, plus de preuves de maçonnerie ; moins de mouvement, plus de contexte ; moins de claims, plus de faits vérifiables ; moins de dépendances, plus de publication testée.

Le plan d’exécution associé est plan-action.md. Les corrections P0–P6 et la décision de readiness de l’état courant sont documentées dans anti-vibecode-audit.md.
