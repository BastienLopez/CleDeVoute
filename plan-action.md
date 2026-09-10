# Plan d’action — Clé de Voûte

> Plan réordonné pour être exécuté dans l’ordre.  
> Règle absolue : le site actuel reste visuellement inchangé jusqu’à la phase 7. On corrige d’abord la sécurité, les contenus, les assets, la publication, le responsive, l’accessibilité et la performance. La refonte UI/UX arrive ensuite.

## Ordre obligatoire

| Ordre | Phase | Ce qui est autorisé | Ce qui est interdit |
|---:|---|---|---|
| 0 | Audit initial | Observer, mesurer, documenter. | Modifier le produit. |
| 1 | Sécurité | Corriger dépendances, secrets, tiers et contrôles de publication. | Refaire le design. |
| 2 | Base technique | Corriger routes, CI, code mort et configuration. | Changer l’architecture visuelle. |
| 3 | Textes et contenus | Valider claims, textes, traduction, légal et metadata. | Ajouter des cartes ou réorganiser les sections. |
| 4 | Visuels et assets | Valider/remplacer les photos et optimiser les fichiers. | Repenser le hero ou l’UI. |
| 5 | Fonctionnel, responsive et accessibilité | Corriger les bugs, le clavier, le mobile et les performances du site actuel. | Refaire la structure ou la direction artistique. |
| 6 | Gate de base propre | Vérifier que tout ce qui précède est réellement terminé. | Commencer la refonte si un critère bloque. |
| 7 | Refonte UI/UX | Recomposer l’expérience complète sur la base propre. | Revenir corriger en parallèle des blockers préexistants. |
| 8 | QA finale et options | Auditer, mesurer, publier si autorisé, puis traiter les nice-to-have. | Considérer le projet fini sur une simple impression visuelle. |

## État actuel

- Phase 0 — Audit initial : **TERMINÉE** dans audit.md ; le retest de l’état courant est figé dans anti-vibecode-audit.md.
- Phase 1 — Sécurité : **TERMINÉE EN LOCAL** ; dépendances migrées, audit npm à zéro, flux tiers cadré et limites de headers publics documentées.
- Phase 2 — Base technique et publication : **TERMINÉE EN LOCAL** ; routes statiques, contrats de build, contrôle assets et CI déterministe validés. La publication n'a pas été lancée.
- Phase 3 — Textes et contenus : **TERMINÉE** ; identité, claims, textes FR/EN et metadata validés avec les réponses du propriétaire.
- Phase 4 — Visuels et assets : **TERMINÉE** ; droits confirmés, logo avec base path, dimensions et budget des 11 images contrôlés.
- Phase 5 — Fonctionnel, responsive et accessibilité : **TERMINÉE EN LOCAL** ; clavier, modal/menu, reduced motion, contraste du logo, lazy loading et cinq largeurs validés.
- Phase 6 — Gate de base propre : **PARTIELLEMENT VALIDÉE** ; il reste uniquement la preuve sur l'hébergement public et la vérification de ses headers.
- Phase 7 — Refonte UI/UX : **BLOQUÉE JUSQU’AU PASSAGE DU GATE 6**.
- Phase 8 — QA finale et options : **TODO**.
- Les décisions et justificatifs nécessaires sont regroupés dans manque_phase.md.
- Le checkout de référence est C:\Users\UTILISATEUR\Documents\GitHub\CleDeVoute.
- La baseline de production est https://bastienlopez.github.io/CleDeVoute/.

## Priorités

- P0 — bloquant : arrêt immédiat.
- P1 — critique : doit être traité avant la refonte et la publication.
- P2 — important : doit être traité avant le gate de base propre.
- P3 — amélioration : à traiter avant livraison si cela ne rouvre pas un chantier.
- P4 — optionnel : seulement après la QA finale et avec du contenu prouvé.

| Priorité | Actions | Nombre |
|---|---|---:|
| P0 | aucune confirmée dans l’audit initial | 0 |
| P1 | A01 à A05 | 5 |
| P2 | A06 à A17 | 12 |
| P3 | A18 à A24 | 7 |
| P4 | A25 à A27 | 3 |
| **Total** | **A01 à A27** | **27** |

## Règles avant refonte

Avant la phase 7, ne pas :

- changer l’ordre des sections ;
- refaire le hero ;
- remplacer la grille de services ;
- changer la palette, les typographies ou la direction artistique ;
- ajouter des pages SEO de remplissage ;
- remplacer le carrousel par une nouvelle galerie complète ;
- ajouter un formulaire, un backend, un analytics ou une dépendance sans décision explicite.

Les corrections des phases 1 à 5 doivent rester ciblées : sécurité, fiabilité, contenu, image, clavier, responsive, performance et tests. Si une correction commence à modifier la hiérarchie ou le parcours, elle est déplacée en phase 7.

# Phase 0 — Audit initial et baseline

**Statut : TERMINÉE**

L’audit complet est documenté dans audit.md. Il contient l’état de la stack, le rendu production, les preuves responsive, la matrice anti-vibecode de 94 contrôles, le diagnostic sécurité, les points à conserver et la direction recommandée.

### [A01] Figer la baseline et le registre de preuves

**Priorité :** P1  
**Phase :** 0  
**Statut initial :** DONE — audit livré  
**Fichiers concernés :** audit.md, package.json, src, public, .github/workflows/gh-pages.yml  
**Dépend de :** aucune

**Résultat attendu :**

- commit de référence et état Git conservés ;
- mesures production 375/768/1024/1440 px disponibles ;
- build, lint, typecheck, npm audit et limites de preuve documentés ;
- claims, photos, domaine et décisions juridiques séparés des faits vérifiés.

**Vérification :**

- Relire audit.md avant toute modification.
- Reprendre la même baseline après chaque phase.

# Phase 1 — Sécurité et fiabilisation

**Objectif : traiter la sécurité avant toute correction éditoriale ou visuelle.**

**Sortie obligatoire de la phase :** aucune vulnérabilité atteignable non triée, aucun secret identifié, flux tiers cadrés, et limites de headers documentées.

### [A16] Cadrer les tiers, la privacy et les headers

**Priorité :** P2  
**Phase :** 1  
**Statut :** TERMINÉE EN LOCAL — flux tiers cadré ; headers publics à vérifier après publication  
**Fichiers concernés :** src/components/InterventionZone.tsx, src/pages/MentionsLegales.tsx, index.html, configuration éventuelle du domaine/Pages  
**Dépend de :** A01

**Problème :**

Google Maps est le seul flux tiers visible. Les réponses GitHub Pages observées ne fournissent pas de CSP, Referrer-Policy, Permissions-Policy ou X-Content-Type-Options explicites, et le dépôt ne contrôle pas tous ces headers.

**Actions :**

1. Reconfirmer qu’aucun backend, endpoint, secret ou service privilégié n’est introduit.
2. Décider si Google Maps est chargé immédiatement, après action, ou remplacé par un lien/aperçu statique.
3. Aligner le comportement réel et les mentions légales ; ne pas ajouter une conclusion juridique non validée.
4. Ajouter uniquement les politiques compatibles avec les fonts, images, scripts et carte réellement utilisés.
5. Vérifier les headers du domaine final lorsque le domaine est disponible.
6. Relancer le scan source/build/historique avec un secret scanner dédié si disponible.

**Critères d’acceptation :**

- [x] Aucun secret n’est présent dans source, build, assets ou configuration publique.
- [x] Le flux Google est documenté et conforme à la décision propriétaire/juridique.
- [x] Les headers disponibles localement sont vérifiés ; les limites GitHub Pages sont écrites.
- [x] Aucune correction ne casse les ressources ou le rendu.

**Tests / vérifications :**

- Recherche bornée des sinks dangereux et des secrets sans afficher de valeur.
- Inspection réseau de la carte avant et après action.
- Vérification des headers HTTP du domaine servi.

**Risque de régression :**

- Élevé si une CSP bloque la carte, les fonts ou les assets ; tester toutes les ressources avant publication.

### [A17] Trier et corriger les dépendances vulnérables

**Priorité :** P2  
**Phase :** 1  
**Statut :** TERMINÉE — migration majeure validée et audit npm à zéro  
**Fichiers concernés :** package.json, package-lock.json, composants UI atteints, workflow  
**Dépend de :** A01

**Problème :**

npm signale 20 vulnérabilités sur l’arbre complet et 11 avec omit dev, notamment dans React Router et plusieurs transitives/outils.

**Actions :**

1. Exporter npm audit en JSON et classer chaque advisory : directe/transitive, runtime/build, atteignable/non atteignable.
2. Mettre à jour React Router et les transitives nécessaires dans un lot isolé.
3. Retirer les dépendances mortes avant de mettre à jour celles qui ne servent pas.
4. Traiter les outils build-only sans présenter leur risque comme une vulnérabilité runtime du site.
5. Documenter chaque advisory restante et sa justification.

**Critères d’acceptation :**

- [x] Les advisories high atteignables sont corrigées ou acceptées explicitement.
- [x] npm ci réussit avec le lockfile.
- [x] Les routes accueil, légal et 404 restent fonctionnelles.
- [x] Lint, typecheck et build passent après chaque lot.

**Tests / vérifications :**

- npm ci
- npm audit --json
- npm run lint
- npx tsc -b
- npm run build
- Smoke test des routes.

**Risque de régression :**

- Élevé sur router et Vite ; ne pas lancer npm audit fix global sans revue du lockfile.

## Gate sécurité

Ne pas passer à la phase 2 si l’un de ces points est faux :

- [x] A16 est validée ou les limites sont acceptées par écrit.
- [x] A17 a trié les advisories et les high atteignables.
- [x] Aucun secret n’est trouvé dans le périmètre scanné.
- [x] npm ci, lint, typecheck et build passent.

# Phase 2 — Base technique propre et publication fiable

**Objectif : réparer le socle sans changer le rendu voulu.**

### [A02] Corriger les routes statiques et le sitemap

**Priorité :** P1  
**Phase :** 2  
**Statut :** TERMINÉE EN LOCAL — routes statiques générées et testées  
**Fichiers concernés :** .github/workflows/gh-pages.yml, vite.config.ts, src/App.tsx, src/pages/MentionsLegales.tsx, public/sitemap.xml, public/robots.txt  
**Dépend de :** A16, A17

**Problème :**

Mentions légales s’affiche par fallback client mais répond HTTP 404 en accès direct alors que l’URL est dans le sitemap.

**Actions :**

1. Choisir une stratégie statique : générer la page légale dans dist/mentions-legales/index.html ou adapter la publication.
2. Conserver dist/404.html uniquement pour les routes inconnues.
3. Générer et tester le bon base path GitHub Pages.
4. Mettre à jour sitemap et robots avec les URLs réellement servies.

**Critères d’acceptation :**

- [x] /mentions-legales répond HTTP 200 en accès direct local.
- [x] La route inconnue conserve un 404 utile avec retour accueil.
- [x] Toutes les URLs du sitemap répondent avec le statut attendu localement.
- [x] Le build échoue si la route légale attendue n’est pas générée.

**Tests / vérifications :**

- npm run build.
- Requêtes HTTP directes accueil, légal et route inconnue.
- Ouverture d’un nouvel onglet directement sur la route légale.

**Risque de régression :**

- Élevé si le base path ou le fallback est mal calculé ; tester local et artifact final.

### [A04] Décider le domaine canonique

**Priorité :** P1  
**Phase :** 2  
**Statut :** TERMINÉE — GitHub Pages et `/CleDeVoute/` confirmés  
**Fichiers concernés :** index.html, vite.config.ts, public/robots.txt, public/sitemap.xml, workflow, éventuel CNAME  
**Dépend de :** A02, décision propriétaire

**Problème :**

Le site utilise bastienlopez.github.io/CleDeVoute comme canonical et identité publique, sans domaine métier confirmé.

**Actions :**

1. Obtenir le domaine réellement détenu ; ne rien inventer.
2. Choisir l’URL canonique, le base path et la stratégie de redirection.
3. Aligner canonical, OG URL, JSON-LD, robots, sitemap et README.
4. Vérifier DNS/Pages uniquement avec l’autorisation du propriétaire.

**Critères d’acceptation :**

- [x] Une URL canonique approuvée est utilisée partout.
- [x] Aucune ancienne URL ne reste dans le build ou le sitemap sans justification.
- [x] Le domaine final est documenté ; la vérification Search Console est reportée à la phase 8.

**Tests / vérifications :**

- Recherche exhaustive des URLs dans source et dist.
- Vérification HTTP/DNS de la cible lorsque le propriétaire l’a configurée.

**Risque de régression :**

- Élevé si le code bascule avant DNS/Pages ; séparer décision, code et infrastructure.

### [A18] Nettoyer le scaffold mort confirmé

**Priorité :** P3  
**Phase :** 2  
**Statut :** TERMINÉE — graphe vérifié ; le scaffold non atteint est conservé pour la phase 7  
**Fichiers concernés :** src/components/ui/*, src/components/NavLink.tsx, src/hooks/use-mobile.tsx, public/placeholder.svg, package.json  
**Dépend de :** A17, A02

**Problème :**

Le scaffold contient des primitives UI non atteintes par les routes actuelles. Une suppression massive avant la phase 7 augmenterait le risque de recréer des composants déjà disponibles pendant la refonte.

**Actions :**

1. Recalculer le graphe après A02.
2. Vérifier chaque référence directe, dynamique, de configuration et de test.
3. Isoler les fichiers non atteints et conserver le scaffold non utilisé pour la phase 7.
4. Ne supprimer un fichier que lorsqu'il n'est requis ni par le build actuel ni par le socle prévu.

**Critères d’acceptation :**

- [x] Aucun fichier supprimé n’est requis par le build ou un test.
- [x] Les providers et primitives atteints ont un consommateur identifié.
- [x] Le lockfile reste cohérent.

**Tests / vérifications :**

- Recherche de références.
- npm ci, lint, typecheck, build et smoke navigateur.

**Risque de régression :**

- Moyen : un composant apparemment mort peut devenir utile pendant la phase 7 ; confirmer avant suppression.

### [A19] Nettoyer configuration et contrats TypeScript

**Priorité :** P3  
**Phase :** 2  
**Statut :** TERMINÉE — strict TypeScript, configuration, keyframes et contrat Button corrigés  
**Fichiers concernés :** tsconfig.json, tsconfig.app.json, tailwind.config.ts, src/index.css, src/components/ui/button.tsx  
**Dépend de :** A17, A18

**Problème :**

TypeScript applicatif est non strict, les tokens CSS sont partiellement morts et la configuration Tailwind contient deux propriétés keyframes dont la première est écrasée.

**Actions :**

1. Activer strictness par paliers sur les fichiers atteints.
2. Activer noUnused sur les périmètres stabilisés.
3. Dédupliquer tokens et keyframes après inventaire des consommateurs.
4. Donner à Button un type sûr par défaut sans casser un éventuel formulaire.
5. Ne pas modifier la direction visuelle à cette phase.

**Critères d’acceptation :**

- [x] La configuration ne contient plus de clé écrasée involontairement.
- [x] Les règles TypeScript activées passent.
- [x] Un bouton hors formulaire n’est pas implicitement submit.
- [x] Les tokens conservés ont un usage ou une justification.

**Tests / vérifications :**

- npx tsc -b
- npm run lint
- npm run build
- Test des boutons existants.

**Risque de régression :**

- Moyen ; corriger les erreurs révélées, ne pas désactiver les contrôles.

### [A21] Rendre la CI déterministe

**Priorité :** P3  
**Phase :** 2  
**Statut :** TERMINÉE — installation, contrôles, routes et build bloquants en CI  
**Fichiers concernés :** .github/workflows/gh-pages.yml, package.json, README.md, tests à créer  
**Dépend de :** A02, A17-A19

**Problème :**

Le workflow autorise npm install si npm ci échoue, ignore optimize-images, masque la copie 404 et ne lance ni lint, ni typecheck, ni tests.

**Actions :**

1. Supprimer les fallbacks silencieux.
2. Ajouter npm ci, lint, typecheck, build et tests de routes/assets.
3. Ajouter un script d’optimisation seulement s’il existe réellement.
4. Vérifier les fichiers dist attendus avant le déploiement.
5. Remplacer le README template par une procédure opérationnelle.

**Critères d’acceptation :**

- [x] Un échec installation, lint, typecheck, test ou build bloque la CI.
- [x] Les routes statiques attendues sont vérifiées.
- [x] README permet d’installer, lancer, tester, builder et prévisualiser.
- [x] La CI ne prétend pas avoir optimisé les images si elle ne l’a pas fait.

**Tests / vérifications :**

- Rejouer chaque étape localement.
- Vérifier le YAML et simuler un échec sur une branche de travail.

**Risque de régression :**

- Moyen ; la CI révélera des défauts jusqu’ici masqués. Corriger les causes, pas les masquer.

## Sortie de la phase 2

- [x] Routes et sitemap cohérents.
- [x] Domaine canonique décidé ou blocker propriétaire explicite.
- [x] Scaffold mort traité sans suppression risquée du socle réutilisable.
- [x] Configuration nettoyée.
- [x] CI déterministe.
- [x] Aucun changement de layout ou d’identité visuelle introduit.

# Phase 3 — Textes, contenus, légal et SEO de base

**Objectif : corriger la vérité du contenu avant de refaire sa présentation.**

### [A03] Valider les claims commerciaux et juridiques

**Priorité :** P1  
**Phase :** 3  
**Statut :** TERMINÉE — identité et claims validés par le propriétaire  
**Fichiers concernés :** src/data/company.ts, src/components/Stats.tsx, src/components/About.tsx, src/pages/MentionsLegales.tsx, index.html, public/llms.txt  
**Dépend de :** A02, A04

**Problème :**

20+, 500+, brevet, Tour de France et plusieurs données légales sont répétées sans justificatif dans le dépôt.

**Actions :**

1. Faire valider chaque champ de company.ts.
2. Obtenir une source ou une validation propriétaire pour chaque chiffre et qualification.
3. Retirer ou reformuler tout claim non prouvé.
4. Propager la même décision dans UI, JSON-LD, llms.txt et mentions.

**Critères d’acceptation :**

- [x] Aucun chiffre ou label de qualification n’est publié sans preuve/validation.
- [x] Les données sont identiques sur toutes les surfaces.
- [x] Aucun client, témoignage, délai ou zone n’est inventé.

**Tests / vérifications :**

- Comparaison des claims source/HTML/JSON-LD/llms.txt.
- Relecture du propriétaire et validation juridique des mentions.

**Risque de régression :**

- Élevé sur la confiance ; une information absente reste absente plutôt que remplacée par une approximation.

### [A20] Réécrire le copy et la traduction

**Priorité :** P3  
**Phase :** 3  
**Statut :** TERMINÉE — textes FR/EN relus sans changement de structure  
**Fichiers concernés :** Hero.tsx, Services.tsx, About.tsx, Stats.tsx, ContactForm.tsx, src/data/*, src/lib/language.tsx, public/llms.txt  
**Dépend de :** A03

**Problème :**

Le vocabulaire est générique et les textes FR/EN sont répartis dans plusieurs composants, ce qui favorise répétition et divergence.

**Actions :**

1. Créer une source de contenu structurée par langue et section.
2. Remplacer les abstractions par faits de travaux, matériaux, méthode et zone confirmés.
3. Réduire les promesses non mesurables et les listes de remplissage.
4. Relire l’anglais séparément.
5. Vérifier que llms.txt et JSON-LD n’ajoutent aucun claim absent de la source validée.

**Critères d’acceptation :**

- [x] Chaque texte important aide une décision du visiteur.
- [x] FR et EN ont le même niveau d’exactitude.
- [x] Les marqueurs W05/W09/P20 sont réduits sans paraphrase artificielle.
- [x] Aucun changement de structure UI/UX n’est introduit ici.

**Tests / vérifications :**

- Relecture propriétaire et revue éditoriale indépendante.
- Recherche des anciennes formulations et claims retirés.

**Risque de régression :**

- Moyen ; ne pas supprimer un service réel pour raccourcir sans validation métier.

### [A14] Corriger les metadata sans refondre les pages

**Priorité :** P2  
**Phase :** 3  
**Statut :** TERMINÉE EN LOCAL — metadata par route et fallback 404 testés  
**Fichiers concernés :** index.html, src/App.tsx, src/lib/language.tsx, src/pages/MentionsLegales.tsx, public/robots.txt, public/sitemap.xml, image OG approuvée  
**Dépend de :** A02-A04, A03

**Problème :**

Title/description sont globaux, la route légale réutilise l’accueil et aucune og:image n’est déclarée.

**Actions :**

1. Définir title, description, canonical et social metadata par route indexable.
2. Choisir une stratégie claire pour FR/EN ; ne pas simuler des URLs indexables si elles n’existent pas.
3. Ajouter une image OG uniquement si un visuel approuvé est fourni ; ne pas en inventer.
4. Limiter JSON-LD aux claims validés par A03.
5. Régénérer sitemap/robots à partir des routes réellement servies.

**Critères d’acceptation :**

- [x] Accueil et mentions ont des metadata distinctes.
- [x] Aucune URL du sitemap ne renvoie 404 localement.
- [x] L'absence d'OG image est volontaire tant qu'aucun visuel approuvé n'est fourni ; URL et metadata présentes sont testées.
- [x] La stratégie linguistique est documentée.

**Tests / vérifications :**

- Inspection du HTML source de chaque route directe.
- Validation sitemap, robots, canonical, JSON-LD et OG.

**Risque de régression :**

- Moyen à élevé si les URLs changent avant le domaine ; dépend de A04.

## Sortie de la phase 3

- [x] Claims et qualifications approuvés ou retirés.
- [x] Textes FR/EN exacts et non génériques.
- [x] Metadata et JSON-LD cohérents.
- [x] Mentions et flux tiers alignés.
- [x] Aucun changement d’IA, de grille ou de direction visuelle.

# Phase 4 — Corrections visuelles limitées aux assets

**Objectif : améliorer la vérité et le poids des visuels sans refaire l’interface.**

### [A05] Auditer et approuver les photographies

**Priorité :** P1  
**Phase :** 4  
**Statut :** TERMINÉE — droits et titres confirmés par le propriétaire  
**Fichiers concernés :** public/*, src/components/Hero.tsx, src/data/realizations.ts, src/components/Realizations.tsx  
**Dépend de :** A03

**Problème :**

La provenance des photos est inconnue ; le hero paraît stock/synthétique et les réalisations ne sont pas contextualisées.

**Actions :**

1. Créer un registre auteur/licence/date/chantier pour chaque image.
2. Obtenir l’autorisation ou retirer toute image non validée.
3. Choisir un remplacement du hero dans la bibliothèque approuvée, sans changer encore sa composition.
4. Ajouter aux réalisations uniquement les informations confirmées.
5. Préparer alt et légendes exacts.

**Critères d’acceptation :**

- [x] Chaque image publiée a une preuve de droit ou une validation propriétaire.
- [x] Aucun visuel ne sert à fabriquer une preuve inexistante.
- [x] Le hero reste lisible avec l’asset approuvé.

**Tests / vérifications :**

- Inventaire des imports et inspection visuelle du build.
- Vérification des alt/légendes contre le registre.

**Risque de régression :**

- Moyen à élevé : un nouvel asset change le contraste et le poids. Mesurer avant de passer à la phase 5.

### [A15] Optimiser les assets sans toucher à la mise en page

**Priorité :** P2  
**Phase :** 4 puis 5 pour la mesure  
**Statut :** TERMINÉE — budget et dimensions contrôlés par script reproductible  
**Fichiers concernés :** public/*, src/components/Hero.tsx, src/components/Realizations.tsx, src/components/InterventionZone.tsx, package.json  
**Dépend de :** A05

**Problème :**

Les images doivent rester sous un budget contrôlable et réserver leurs dimensions pour éviter les régressions de chargement. Les assets actuels sont déjà sous le budget retenu.

**Actions :**

1. Mettre en place le contrôle reproductible `npm run check:assets` pour le budget et les dimensions.
2. Ne produire des formats modernes que si un pipeline fiable et un asset approuvé le justifient.
3. Ajouter dimensions/ratio et loading différé aux images hors premier écran.
4. Ne pas modifier la grille ou supprimer la galerie ici : la simplification UI/UX sera traitée en phase 7.
5. Mesurer le poids du build ; réserver les mesures LCP/CLS à une vérification navigateur dédiée.

**Critères d’acceptation :**

- [x] Le contrôle `check:assets` existe réellement et échoue clairement.
- [x] Les images ont des dimensions réservées.
- [x] Aucun asset lourd n’est chargé sans justification.
- [x] La qualité et les alt restent corrects.

**Tests / vérifications :**

- Analyse dist, waterfall réseau, Lighthouse/PageSpeed local.
- Mesures 375 et 1440 px.

**Risque de régression :**

- Moyen ; ne pas lazy-loader le hero ni compresser au point de rendre la preuve illisible.

## Sortie de la phase 4

- [x] Photos approuvées.
- [x] Hero et réalisations utilisent des assets autorisés.
- [x] Contrôle image reproductible.
- [x] Poids et dimensions mesurés.
- [x] Aucune nouvelle grille, palette ou hiérarchie introduite.

# Phase 5 — Fonctionnel, responsive et accessibilité du site actuel

**Objectif : rendre la baseline fiable sans lancer la refonte.**

**Règle :** corriger les défauts de comportement et d’accès ; ne pas recomposer le parcours ni remplacer l’identité.

### [A13] Corriger les défauts d’accessibilité existants

**Priorité :** P2  
**Phase :** 5  
**Statut :** TERMINÉE — clavier, focus, labels et reduced motion validés  
**Fichiers concernés :** src/pages/Index.tsx, src/components/SiteHeader.tsx, src/components/Realizations.tsx, src/index.css  
**Dépend de :** A02, A05

**Problème :**

Pas de main ni skip link ; menu et modal incomplets ; reduced motion ne couvre pas tous les effets.

**Actions :**

1. Ajouter un main et un skip link sans changer l’ordre visuel.
2. Corriger aria-controls, labels et états du menu existant.
3. Ajouter Escape/clic extérieur au menu de langue si nécessaire.
4. Implémenter focus initial, focus trap et retour focus de la modal existante.
5. Désactiver slide-up, smooth scroll et transforms non essentiels sous reduced motion.
6. Revalider contraste, alt, noms accessibles et zones tactiles.

**Critères d’acceptation :**

- [x] Le parcours actuel est réalisable au clavier.
- [x] Aucun focus ne disparaît dans menu ou modal.
- [x] Escape ferme les composants ouverts.
- [x] La version reduced motion ne dépend pas d’une animation.
- [x] Aucun changement de composition n’est introduit.

**Tests / vérifications :**

- Tab/Shift+Tab/Escape sur 375 et 1440 px.
- Axe/Lighthouse ou outil équivalent si disponible.
- Test avec prefers-reduced-motion.

**Risque de régression :**

- Moyen ; les attributs ARIA doivent rester cohérents avec le DOM réel.

### [A23] Corriger le responsive de la baseline

**Priorité :** P3  
**Phase :** 5  
**Statut :** TERMINÉE EN LOCAL — 320/375/768/1024/1440 px sans overflow  
**Fichiers concernés :** composants actuels, src/index.css, tailwind.config.ts  
**Dépend de :** A13, A15

**Problème :**

Le document ne déborde pas globalement, mais atteint 11 329 px à 375 px ; les services, filtres, carrousel et modal sont trop denses.

**Actions :**

1. Tester 320, 375, 768, 1024 et 1440 px.
2. Corriger uniquement débordements, contrôles coupés, espacements cassés, boutons hors écran et breakpoint manifestement défaillant.
3. Garder la structure et l’apparence générale ; ne pas réduire six cartes en quatre familles ici.
4. Vérifier carrousel et modal sur petits écrans.
5. Mesurer la distance jusqu’au CTA et la hauteur sans masquer du contenu.

**Critères d’acceptation :**

- [x] Aucun overflow horizontal non intentionnel.
- [x] Aucun bouton, filtre, légende ou modal n’est coupé.
- [x] Les CTA restent activables au tactile et au clavier.
- [x] Les informations existantes restent présentes.

**Tests / vérifications :**

- Captures aux cinq largeurs.
- Mesure scrollWidth/clientWidth.
- Parcours tactile et clavier avec motion réduite.

**Risque de régression :**

- Moyen ; ne pas corriger par offsets ponctuels qui casseraient desktop.

## Sortie de la phase 5

- [x] Routes, sécurité, contenu et assets des phases précédentes restent valides.
- [x] Menu/modal/clavier/reduced motion fonctionnent.
- [x] Responsive testé aux cinq largeurs.
- [x] Contact honnête et fonctionnel.
- [x] Aucun changement majeur d’UI/UX réalisé.

# Phase 6 — Gate « base propre et fonctionnelle »

**Cette phase est un arrêt obligatoire avant la refonte.**

Ne pas commencer la phase 7 tant que toutes les cases ne sont pas cochées :

### Sécurité

- [x] A16 validée.
- [x] A17 validée ou advisories restantes acceptées explicitement.
- [x] Aucun secret présent dans le périmètre scanné.
- [x] Flux Google Maps et mentions cohérents.
- [ ] Headers du domaine ou limites GitHub Pages documentés.

### Publication et technique

- [x] A02 : route légale HTTP 200 localement.
- [x] Sitemap sans URL morte localement.
- [x] A04 : domaine canonique décidé.
- [x] A18-A19 : graphe et configuration traités.
- [x] A21 : CI déterministe.

### Contenu et assets

- [x] A03 : claims validés ou retirés.
- [x] A20 : textes FR/EN relus.
- [x] A14 : metadata par route.
- [x] A05 : photos autorisées.
- [x] A15 : contrôle image et budgets mesurés.

### Fonctionnel

- [x] A13 : clavier, focus, contrastes, reduced motion.
- [x] A23 : responsive 320/375/768/1024/1440.
- [x] A12 : contact honnête.
- [x] npm ci, lint, typecheck, build et smoke tests passent.

### Décision

La seule case restant vide concerne la vérification des headers de la cible publique, qui n'est pas exécutable sans publication. Tant que cette vérification n'est pas faite ou explicitement acceptée, rester sur le site actuel ; la phase 7 ne doit pas servir à camoufler une route 404, un claim non prouvé, une image sans droit ou une régression responsive.

# Phase 7 — Refonte UI/UX complète, en dernier

**Objectif : refaire l’expérience uniquement après validation du gate.**

La refonte peut changer structure, hiérarchie, style, composants et parcours. Elle doit suivre l’art direction « atelier contemporain — précision constructive » documentée dans audit.md.

### [A06] Recomposer l’architecture autour de la preuve

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/pages/Index.tsx, src/components/*, src/data/*  
**Dépend de :** Gate phase 6

**Actions :**

1. Définir l’ordre cible : proposition locale, projet phare, prestations, méthode, réalisations, zone, contact.
2. Fusionner Stats et engagements.
3. Passer de six services à trois ou quatre familles validées.
4. Faire apparaître une preuve réelle dans le premier/deuxième écran mobile.
5. Créer une route seulement si son contenu est unique.

**Critères d’acceptation :**

- [ ] Métier, zone, preuve et action sont compris sans parcourir toute la page.
- [ ] Aucun bloc ne sert uniquement à remplir une grille.
- [ ] La page est sensiblement moins longue et plus lisible sur mobile.

**Tests / vérifications :**

- Test de compréhension à froid.
- Mesures de longueur et de position de la première preuve.

**Risque de régression :**

- Élevé : les suppressions de sections doivent préserver les informations métier validées.

### [A07] Appliquer le système visuel final

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/index.css, tailwind.config.ts, composants UI utilisés, assets de marque approuvés  
**Dépend de :** A06, A05

**Actions :**

1. Appliquer palette chaux/pierre/ardoise/terre cuite avec accent mesuré.
2. Définir typographie, grille, espacements, rayons, bordures, ombres et focus.
3. Remplacer les cartes répétitives, gradients et blur par une hiérarchie éditoriale.
4. Supprimer bounce, autoplay et hover sur éléments non interactifs.
5. Conserver une version reduced motion équivalente.

**Critères d’acceptation :**

- [ ] Le rendu n’a plus l’esthétique SaaS/template générique.
- [ ] Les surfaces ont des rôles visuels distincts.
- [ ] Les preuves restent plus fortes que la décoration.
- [ ] Aucun nouveau cliché visuel n’est introduit.

**Tests / vérifications :**

- Revue visuelle design-taste-codex.
- Contraste, clavier, responsive et reduced motion.

**Risque de régression :**

- Moyen à élevé : la palette et le type touchent toutes les sections.

### [A08] Refaire le header et la navigation

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/components/SiteHeader.tsx, src/pages/Index.tsx, src/lib/language.tsx  
**Dépend de :** A06, A07, A13

**Actions :**

1. Concevoir une navigation courte et proportionnée au nouveau contenu.
2. Intégrer le logo approuvé ou un mot-symbole explicitement validé.
3. Repenser le breakpoint sans imposer le menu mobile à tout petit desktop.
4. Garder les corrections clavier/focus de A13.
5. Décider si FR/EN reste un bouton local ou devient une stratégie d’URL.

**Critères d’acceptation :**

- [ ] Header lisible et utilisable à toutes les largeurs.
- [ ] Logo affiché conforme à la décision de marque.
- [ ] Navigation et langue ont des états accessibles.
- [ ] Les ancres pointent vers les nouvelles sections réelles.

**Tests / vérifications :**

- Parcours clavier/tactile, Escape, clic extérieur, ancres et screenshots.

**Risque de régression :**

- Moyen ; le header fixe doit rester compatible avec les ancres et le skip link.

### [A09] Reconstruire le hero

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/components/Hero.tsx, src/data/company.ts, asset hero approuvé  
**Dépend de :** A03, A05, A06, A07

**Actions :**

1. Construire une proposition locale concrète en 2–3 blocs.
2. Mettre le métier, la zone, le type de travaux et l’action au premier plan.
3. Utiliser l’image approuvée avec un overlay minimal.
4. Conserver appel et e-mail comme actions principales.
5. Supprimer br de mise en page, bounce et scale décoratif.

**Critères d’acceptation :**

- [ ] Le visiteur comprend quoi, pour qui, où et comment commencer.
- [ ] Une preuve réelle apparaît dans le premier/deuxième écran.
- [ ] Le hero reste lisible sans image ou animation.

**Tests / vérifications :**

- Test de compréhension à froid.
- Screenshots 375/768/1440, reduced motion, LCP.

**Risque de régression :**

- Élevé : hero, branding, SEO, LCP et conversion sont couplés.

### [A10] Refaire services, présentation et confiance

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/components/Services.tsx, src/components/About.tsx, src/components/Stats.tsx, src/data/*  
**Dépend de :** A03, A06, A07, A20

**Actions :**

1. Remplacer les six cartes par trois/quatre familles de besoins.
2. Donner à chaque famille un périmètre, matériau ou résultat vérifié.
3. Fusionner chiffres/engagements en preuve courte.
4. Mettre la méthode de travail au service d’une décision réelle.

**Critères d’acceptation :**

- [ ] Chaque famille est distincte et compréhensible.
- [ ] Les claims sont issus du registre approuvé.
- [ ] Le bloc de confiance n’est pas une répétition de cartes.

**Tests / vérifications :**

- Relecture métier, test de compréhension et revue anti-pattern.

**Risque de régression :**

- Moyen ; vérifier qu’aucune prestation importante ne disparaît.

### [A11] Refaire la galerie et les cas de réalisation

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** src/components/Realizations.tsx, src/data/realizations.ts, src/index.css, public/*  
**Dépend de :** A05, A06, A07, A15

**Actions :**

1. Remplacer le carrousel dupliqué/autoplay par une galerie statique éditoriale.
2. Montrer des projets uniques, avec titre, type, matière et lieu/date si autorisés.
3. Garder un filtre seulement s’il aide à choisir.
4. Réutiliser la modal uniquement avec focus complet, sinon supprimer la modal.
5. Conserver dimensions, lazy loading, alt et ratios de A15.

**Critères d’acceptation :**

- [ ] Chaque image publiée correspond à un projet approuvé.
- [ ] Une seule occurrence de chaque image est rendue.
- [ ] La galerie est compréhensible sans autoplay.
- [ ] Les cas expliquent le travail au lieu de montrer une image isolée.

**Tests / vérifications :**

- DOM image count, clavier/modal, screenshots, poids réseau et reduced motion.

**Risque de régression :**

- Moyen ; le choix d’une grille ou liste doit rester accessible et performant.

### [A12] Repenser contact et conversion

**Priorité :** P2  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** composant ContactDirect ou équivalent, Footer.tsx, src/data/company.ts  
**Dépend de :** A03, Gate phase 6

**Actions :**

1. Garder deux actions principales : appeler et écrire.
2. Ajouter un micro-brief : commune, type de travaux, état, horizon, photos disponibles.
3. Si un formulaire est demandé, définir d’abord backend, validation serveur, anti-abus, consentement, conservation et succès.
4. Replacer le contact après la preuve et en conclusion.

**Critères d’acceptation :**

- [ ] Le canal et le traitement des données sont explicites.
- [ ] Le contact est atteignable rapidement sur mobile.
- [ ] Aucun délai ou résultat commercial non prouvé n’est promis.
- [ ] Un formulaire n’existe que si son contrat serveur est validé.

**Tests / vérifications :**

- Parcours téléphone/e-mail desktop/mobile.
- Si formulaire : validation, loading, succès, double soumission, anti-abus.

**Risque de régression :**

- Élevé si un formulaire est ajouté sans décision backend/privacy.

### [A22] Refaire la fin de page sans perdre le légal

**Priorité :** P3  
**Phase :** 7  
**Statut initial :** TODO  
**Fichiers concernés :** Footer.tsx, InterventionZone.tsx, MentionsLegales.tsx  
**Dépend de :** A16, A22 phase 3, A06

**Actions :**

1. Unifier zone, contact final et lien légal.
2. Donner au footer une hiérarchie de contact claire.
3. Garder la carte statique/chargement décidé en A16.
4. Ne pas ajouter d’informations légales nouvelles sans validation.

**Critères d’acceptation :**

- [ ] Le contact final est identifiable en un regard.
- [ ] Le lien légal reste HTTP 200.
- [ ] Le footer ne contient aucun claim non validé.

**Tests / vérifications :**

- Navigation clavier, liens, route légale et inspection réseau.

**Risque de régression :**

- Faible à moyen ; surveiller la cohérence privacy/carte.

## Sortie de la phase 7

- [ ] Nouvelle IA validée.
- [ ] Nouvelle direction visuelle validée.
- [ ] Hero, services, galerie et contact reposent sur contenus approuvés.
- [ ] Le site reste utilisable à toutes les largeurs.
- [ ] Aucun pattern anti-vibecode majeur n’est conservé sans justification.

# Phase 8 — QA finale, Search Console et options

### [A24] Refaire les audits et geler la release

**Priorité :** P3  
**Phase :** 8  
**Statut initial :** TODO  
**Fichiers concernés :** repository dans le périmètre, audit.md, rapport QA  
**Dépend de :** A01-A23

**Actions :**

1. Refaire intégralement anti-vibecode-slop et recompter les 94 contrôles.
2. Refaire design-taste-codex avec screenshots et revue indépendante.
3. Refaire web-security-audit sur source, build, dépendances, tiers et headers.
4. Vérifier que les findings P1/P2 sont corrigés ou explicitement acceptés.
5. Relire le diff final comme un autre développeur.

**Critères d’acceptation :**

- [ ] Les 94 contrôles sont présents, comptés et justifiés.
- [ ] Aucun claim/photo publié n’est sans validation.
- [ ] Routes, metadata, sitemap, contact, clavier, responsive et reduced motion passent.
- [ ] Les advisories high atteignables sont traitées ou acceptées.
- [ ] Le propriétaire valide le rendu et les mentions.

**Tests / vérifications :**

- npm ci
- npm run lint
- npx tsc -b
- npm run build
- tests de routes/interactions/assets
- npm audit --json
- smoke HTTP et QA navigateur.

**Risque de régression :**

- Élevé si une exception est simplement reclassée pour faire passer la release.

### [A26] Configurer et exploiter Google Search Console

**Priorité :** P4  
**Phase :** 8  
**Statut initial :** TODO  
**Fichiers concernés :** documentation d’exploitation, domaine final, Search Console  
**Dépend de :** A04, A14, A24

**Actions :**

1. Vérifier la propriété du domaine final.
2. Soumettre le sitemap.
3. Inspecter accueil et mentions.
4. Enregistrer impressions, clics, CTR, requêtes, couverture et Core Web Vitals.
5. Suivre les 404/canonical sans ajouter d’analytics par réflexe.

**Critères d’acceptation :**

- [ ] Domaine et sitemap vérifiés dans GSC.
- [ ] URLs indexables confirmées avec le bon statut.
- [ ] Une baseline de mesure est datée et sans chiffre inventé.

**Tests / vérifications :**

- URL Inspection, rapports Pages/Sitemaps/CWV.

**Risque de régression :**

- Faible ; ne pas tirer de conclusion avant stabilisation de l’indexation.

### [A25] Ajouter des pages de cas uniquement avec matière vérifiée

**Priorité :** P4  
**Phase :** 8 après A24  
**Statut initial :** TODO  
**Fichiers concernés :** src/pages/*, src/data/*, public/sitemap.xml, metadata par route  
**Dépend de :** A03, A05, A11, A14, A24

**Actions :**

1. Sélectionner 3 à 6 projets documentés et autorisés.
2. Créer un modèle de cas sans remplir les inconnues.
3. Ajouter metadata et image sociale uniques.
4. Publier dans le sitemap uniquement après HTTP 200.

**Critères d’acceptation :**

- [ ] Chaque page apporte une preuve absente de l’accueil.
- [ ] Les lieux, dates et clients sont publiables.
- [ ] Aucune page locale/service n’est créée pour remplir le sitemap.

**Tests / vérifications :**

- Tests routes, metadata, sitemap et relecture propriétaire.

**Risque de régression :**

- Éditorial élevé si des pages minces ou des données inventées sont ajoutées.

### [A27] Ajouter une finition de marque seulement si elle est utile

**Priorité :** P4  
**Phase :** 8 après A24  
**Statut initial :** TODO  
**Fichiers concernés :** src/index.css, composants UI, assets de marque approuvés  
**Dépend de :** A07, A08, A24

**Actions :**

1. Choisir au maximum un détail distinctif : ligne, matière, focus ou app icon.
2. Le tester sans dépendance nouvelle ni mouvement obligatoire.
3. Le retirer s’il concurrence preuve, lisibilité ou contact.

**Critères d’acceptation :**

- [ ] La justification de marque est écrite.
- [ ] Aucun nouveau pattern anti-slop n’est introduit.
- [ ] Clavier, contraste et reduced motion restent équivalents.

**Tests / vérifications :**

- Revue visuelle comparative et repasse ciblée D01-D24.

**Risque de régression :**

- Faible, mais cette action ne doit jamais retarder une correction P1/P2.

# Checklist finale

## Sécurité

- [ ] Aucun secret dans source, build ou assets.
- [ ] Advisories npm atteignables triées.
- [ ] Dépendances corrigées ou acceptées avec justification.
- [ ] Flux Google Maps documenté et décision privacy validée.
- [ ] Headers du domaine final vérifiés.
- [ ] HTTPS/HSTS confirmés.

## Base technique

- [ ] Route légale HTTP 200.
- [ ] 404 utile pour les routes inconnues.
- [ ] Sitemap exact.
- [ ] Domaine canonique cohérent.
- [ ] CI déterministe.
- [ ] README opérationnel.
- [ ] Aucun fichier mort confirmé conservé sans raison.

## Textes et contenus

- [ ] Claims validés ou retirés.
- [ ] Identité légale relue.
- [ ] FR/EN cohérents.
- [ ] Aucun témoignage, client, délai ou zone inventé.
- [ ] Mentions alignées avec le runtime.
- [ ] JSON-LD limité aux faits approuvés.

## Assets et performance

- [ ] Droits/provenance des photos confirmés.
- [ ] Hero approuvé et lisible.
- [ ] Dimensions/rations réservées.
- [ ] Lazy loading justifié.
- [ ] Aucun doublon de galerie.
- [ ] Poids initial mesuré.
- [ ] LCP, CLS et INP mesurés sur le build final.

## Responsive et accessibilité

- [ ] 320 px testé.
- [ ] 375 px testé.
- [ ] 768 px testé.
- [ ] 1024 px testé.
- [ ] 1440 px testé.
- [ ] Aucun overflow non intentionnel.
- [ ] Skip link et main présents.
- [ ] Focus visible et restitué.
- [ ] Menu et modal utilisables au clavier.
- [ ] Escape fonctionne.
- [ ] Contrastes et alt vérifiés.
- [ ] prefers-reduced-motion respecté.

## Refonte UI/UX

- [ ] Gate phase 6 validé avant démarrage.
- [ ] Proposition de valeur immédiatement claire.
- [ ] Première preuve visible rapidement.
- [ ] Services non répétitifs.
- [ ] Galerie contextualisée.
- [ ] Contact évident et honnête.
- [ ] Pas d’esthétique SaaS générique.
- [ ] Pas de décoration gratuite.
- [ ] Pas de claims sans preuve.
- [ ] Direction « atelier contemporain — précision constructive » respectée.

## QA et publication

- [ ] anti-vibecode-slop repassé intégralement.
- [ ] design-taste-codex repassé.
- [ ] web-security-audit repassé.
- [ ] 94 contrôles présents et comptés.
- [ ] Lint, typecheck, build et tests passent.
- [ ] GSC configurée sur le domaine final.
- [ ] Sitemap soumis.
- [ ] Propriétaire valide le rendu, les contenus et les mentions.

## Règle d’arrêt

Après deux tentatives inefficaces sur le même blocker, arrêter les patches, reprendre les preuves, le runtime, le diff et le critère d’acceptation, puis changer de stratégie uniquement avec une information nouvelle. Ne jamais lancer la phase 7 pour contourner un problème de sécurité, de contenu, de publication ou de responsive.
