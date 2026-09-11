# Questions de cadrage — Phase 7

> Refonte UI/UX complète de La clé de voûte — document à remplir avant toute modification de l’interface.
>
> Objectif : décider ce qui doit changer, ce qui doit rester, quels contenus sont réellement publiables et quelles limites techniques respecter. La refonte ne sera pas lancée avant réception de ce fichier rempli.

## Comment répondre

- Conserve les identifiants `Q01`, `Q02`, etc. et écris ta réponse sous chaque question.
- Si tu ne veux aucun changement, réponds `AUCUN CHANGEMENT`.
- Si tu ne connais pas encore une information, réponds `INCONNU` ; elle ne sera pas inventée dans le site.
- Pour les références visuelles, ajoute une URL, une capture ou le nom précis du site.
- Pour les photos et projets, réponds dans le tableau prévu plus bas.

## Ce qui est déjà validé — pas besoin de le revalider

- Activité : maçonnerie générale et gros œuvre à Sedan.
- Identité légale, coordonnées, adresse et informations de l’entreprise déjà confirmées.
- Claims autorisés : `20+`, `500+`, brevet de maîtrise et Tour de France.
- Services actuels : construction neuve, rénovation/réhabilitation, extension/agrandissement, gros œuvre, pierre/enduits/revêtements et aménagements extérieurs.
- Zone actuelle : Sedan et Ardennes.
- Logo officiel `public/logo.png` et photos actuelles autorisés par le propriétaire.
- Contact direct téléphone + e-mail confirmé ; aucun backend ni formulaire n’est imposé.
- Français/anglais confirmé ; la stratégie URL reste à décider ci-dessous.
- Carte Google Maps chargée directement : décision actuelle confirmée, à maintenir ou modifier explicitement ci-dessous.
- Cible technique actuelle : React/Vite/Tailwind, GitHub Pages sous `/CleDeVoute/`.
- Les corrections P0–P6, l’accessibilité de base, le responsive, les routes et la CI doivent rester préservés.

## 1. Objectif commercial et visiteurs

### Q01 — Quelle est l’action n°1 attendue du site ?

Classe les actions par ordre de priorité : appeler, envoyer un e-mail, demander un devis, demander une étude de faisabilité, consulter les réalisations, autre.

**Réponse :**consulter les réalisations puis demander un devis/ appeler

### Q02 — Qui doit être convaincu en premier ?

Particuliers, propriétaires en rénovation, personnes faisant construire, professionnels, architectes/maîtres d’œuvre, collectivités, autre. Indique une priorité si plusieurs publics sont visés.

**Réponse :** tout 

### Q03 — Quels projets veux-tu attirer davantage ?

Indique les 2 à 4 types de chantiers prioritaires. Précise ceux qui doivent être moins mis en avant ou retirés, s’il y en a.

**Réponse :** pas de prio il fait tout 

### Q04 — Quelle impression doit rester après 10 secondes ?

Décris-la en une phrase simple. Exemple : « un artisan local sérieux, spécialisé dans la rénovation en pierre, que je peux appeler directement ».

**Réponse :**un artisan local sérieux et efficace, spécialisé dans la rénovation en pierre et gros oeuvre, que je peux appeler directement

### Q05 — Y a-t-il une contrainte commerciale à ne surtout pas suggérer ?

Exemples : pas de promesse de délai, pas de prix en ligne, pas de devis gratuit, pas d’intervention hors zone, pas de clientèle professionnelle.

**Réponse :**pas de promesse de délai

## 2. Direction artistique et marque

### Q06 — Valides-tu la direction proposée ?

Direction de travail actuelle : **« atelier contemporain — précision constructive »** : matière pierre/chaux, ardoise, terre cuite, typographie sobre, composition éditoriale, peu d’effets, preuves concrètes.

Choisis : `VALIDÉE` / `À MODIFIER`, puis précise ce qui doit changer.

**Réponse :**VALIDÉE

### Q07 — Donne 3 à 5 adjectifs de ton souhaité

Exemples : artisanal, robuste, haut de gamme, chaleureux, sobre, familial, technique, patrimonial, contemporain, local.

**Réponse :** artisanal, haut de gamme, robuste

### Q08 — Donne 2 à 5 références visuelles

Sites, marques, bâtiments, magazines, photos ou captures. Pour chaque référence, indique ce que tu aimes et ce que tu ne veux pas reproduire.

**Réponse :**

### Q09 — Quelle place donner au logo ?

Le logo officiel est validé. Indique si tu veux : logo très visible, logo discret, logo seul sans mot-symbole ajouté, variante claire/foncée si elle existe, autre. Si une variante inverse existe, joins-la.

**Réponse :** logo discret comme actuellment 

### Q10 — Palette et typographies

La palette actuelle est navy/orange/pierre/blanc ; la proposition P7 ajoute chaux/ardoise/terre cuite de façon mesurée. Les polices actuelles sont Inter + Playfair Display.

- Palette : ajuster pour chaux/ardoise/terre cuite de façon mesurée.
- Typographies : `CONSERVER` 
- Couleurs à éviter absolument : couleur flashy

**Réponse :**

### Q11 — Quel niveau de changement visuel acceptes-tu ?

Choisis une option : 

- `Refonte assumée` : structure, palette, typographie et composants peuvent changer.
- `Refonte maîtrisée` : changement net mais logo, palette de base et esprit artisanal restent reconnaissables.
- `Évolution` : amélioration forte de la hiérarchie sans rupture visuelle.

**Réponse :**Refonte assumée

## 3. Architecture et contenu des sections

### Q12 — Valides-tu l’ordre de contenu proposé ?

Ordre de travail :

1. proposition locale et action ;
2. projet/preuve phare ;
3. familles de prestations ;
4. méthode de travail ;
5. réalisations ;
6. zone d’intervention ;
7. contact final et légal.

**Réponse :** garder comme actuel je pense

### Q13 — Quelles sections doivent disparaître ou fusionner ?

La proposition est de fusionner les statistiques et les engagements dans un seul bloc de confiance, puis de réduire les six cartes de services à trois ou quatre familles. Indique les sections à garder, fusionner, supprimer ou déplacer.

**Réponse :** 0 a retirer ou fusionner, garder l'ordre et les infos (reformuler si necessaire mais rien perdre)

### Q14 — Valide les familles de prestations finales

Complète ce tableau. Les familles doivent correspondre à des prestations réellement proposées.

| Famille à garder/modifier | Ce qu’elle couvre concrètement | À mettre en avant ? |
|---|---|---|
| Construction / gros œuvre |  |  |
| Rénovation / réhabilitation |  |  |
| Pierre / enduits / revêtements |  |  |
| Extérieurs / terrasses / accès |  |  |

**Réponse complémentaire :**

### Q15 — Quelle méthode de travail est vraie ?

Décris uniquement les étapes réellement pratiquées : premier contact, échange, visite, étude, devis, planification, réalisation, réception, suivi. Indique les étapes qui ne doivent pas être affichées.

**Réponse :** tout

### Q16 — Quelle preuve doit apparaître dans le premier écran mobile ?

Choisis une preuve existante : photo de chantier, projet phare, détail de matériau, qualification, zone locale, autre. Si tu veux un projet précis, donne son identifiant dans le tableau des réalisations.

**Réponse :** pas compris 

### Q17 — Les claims validés doivent-ils tous rester visibles ?

Les claims sont autorisés, mais leur place et leur importance peuvent changer. Indique : tous visibles / seulement certains / visibles mais secondaires / autre. Précise lesquels.

**Réponse :**tous visibles

## 4. Photos, réalisations et preuves de chantier

### Q18 — Registre éditorial des réalisations actuelles

Les droits des photos sont déjà confirmés. Pour construire une galerie plus crédible, complète uniquement les informations que tu autorises à publier. `Non publiable` est une réponse valable.

| ID | Photo / titre actuel | Garder ? | Type de travaux | Matériaux / geste visible | Commune | Année | Légende ou résultat autorisé |
|---|---|---|---|---|---|---|---|
| `terrasse-dallage-ensemble` | Terrasse et dallage extérieur |  |  |  |  |  |  |
| `salle-pierre-renovee` | Salle en pierre rénovée |  |  |  |  |  |  |
| `escalier-exterieur-fini` | Escalier extérieur |  |  |  |  |  |  |
| `mur-pierre-interieur` | Mur en pierre intérieur |  |  |  |  |  |  |
| `terrasse-dallage-detail` | Détail de dallage extérieur |  |  |  |  |  |  |
| `terrasse-motif-etoile` | Motif étoile dans le dallage |  |  |  |  |  |  |
| `acces-exterieur-pierre` | Accès extérieur en pierre |  |  |  |  |  |  |
| `piece-renovee-pierre` | Pièce rénovée en pierre |  |  |  |  |  |  |
| `voute-briques-apparentes` | Voûte et briques apparentes |  |  |  |  |  |  |

on garde totues les imgs actuel rangé comme actuel

### Q19 — As-tu de nouveaux visuels pour la refonte ?

Photos de chantiers, portraits, outils, détails matière, avant/après, plans ou vidéos. Pour chaque fichier, donne le chemin ou joins-le, l’usage souhaité et confirme qu’il est publiable.

**Réponse :** non 

### Q20 — Faut-il créer des pages détaillées par projet ?

Choisis : `NON, galerie sur l’accueil` / `OUI, uniquement pour les projets documentés` / `À DÉCIDER`. Une page ne sera créée que si elle apporte un contenu unique et publiable.

**Réponse :** non 

### Q21 — Quel traitement de galerie préfères-tu ?

Choisis ou combine : grille éditoriale, liste de projets, projet phare + grille secondaire, filtres par famille, aucune grille de filtres, modal d’agrandissement, pages détaillées. Indique ce qui est interdit.

**Réponse :** comme actuel par type de chantier

## 5. Contact, zone et confiance

### Q22 — Contact direct ou formulaire ?

Choisis clairement :

- `Contact direct uniquement` : téléphone et e-mail, sans données stockées par le site.
- `Formulaire plus tard` : on garde le contact direct pour P7 et on documente le formulaire comme futur chantier.
- `Formulaire maintenant` : précise le destinataire, l’hébergement/backend autorisé, les champs, la conservation, le consentement et la protection anti-abus.

**Réponse :** tel + email  comme actuel

### Q23 — Quelles informations conseiller au visiteur de préparer ?

Par exemple : commune, type de travaux, état du bâti, dimensions, photos, plans, horizon du projet. Ne conserver que ce qui aide réellement le premier échange.

**Réponse :** idée global, type de travaux etc,ca peut etre ds pro ou  particulier 

### Q24 — Zone d’intervention à afficher

On conserve `Sedan / Ardennes` comme base. Veux-tu ajouter des communes, un rayon, des secteurs précis ou une phrase de vérification au cas par cas ?

**Réponse :** non

### Q25 — Carte Google Maps

La carte est actuellement chargée directement, décision déjà autorisée. Choisis : `CONSERVER TELLE QUELLE` / `REMPLACER PAR UN LIEN OU APERÇU` / `AJOUTER UN CONSENTEMENT` / `AUTRE`.

**Réponse :**CONSERVER TELLE QUELLE

### Q26 — Analytics et mesure

La décision actuelle est aucun analytics/tracking. Choisis : `CONSERVER SANS TRACKING` / `AJOUTER UN OUTIL`, puis précise l’outil, les objectifs, le consentement et la personne qui y aura accès.

**Réponse :**`AJOUTER UN OUTIL google search console sera utiliser plus tard en prod donc deja le setup 

## 6. Navigation, langues et interactions

### Q27 — Navigation finale

Quels accès doivent rester dans la navbar ? Proposition : À propos, Prestations, Réalisations, Zone, Contact. Indique les ancres à renommer, supprimer ou ajouter.

**Réponse :** 
À propos
Prestations
Réalisations
Zone d'intervention
Contact


### Q28 — Header fixe ou non ?

Choisis : `FIXE` / `NON FIXE` / `FIXE SUR DESKTOP, NON FIXE SUR MOBILE` / `AUTRE`. Indique si un bouton contact doit rester visible pendant le scroll.

**Réponse :** FIXE SUR DESKTOP, NON FIXE SUR MOBILE

### Q29 — Stratégie FR/EN

Choisis :

- `Bouton local sans changement d’URL` ;
- `URL dédiées /fr et /en` ;
- `Français uniquement pour la refonte` ;
- `Autre`.

Si l’anglais reste publié, indique si tu valides une relecture humaine des textes avant mise en ligne.

**Réponse :** garde comme actuel

### Q30 — Niveau de motion

Choisis : `quasi statique` / `transitions discrètes` / `animation éditoriale mesurée` / `autre`. Dans tous les cas, aucune animation ne devra être obligatoire et reduced motion sera conservé.

**Réponse :**transitions discrètes

### Q31 — États interactifs à privilégier

Indique les comportements importants : menu mobile, menu langue, filtres, galerie, modal, CTA fixe, ancres, retour en haut, autre. Les états clavier/focus/accessibilité existants devront rester fonctionnels.

**Réponse :** menu mobile, menu langue, filtres, galerie, modal, CTA fixe, ancres, retour en haut

### Q32 — Priorité responsive

Quel appareil doit guider la composition initiale : mobile 375 px, mobile 390/430 px, tablette, desktop large, autre ? Indique les problèmes actuels les plus gênants sur ton téléphone ou ton écran.

**Réponse :** pc & mobile first

### Q33 — Niveau d’accessibilité attendu

Choisis : `bon niveau pratique` / `objectif WCAG 2.2 AA` / `contrainte spécifique`. Précise les besoins connus : taille de texte, contraste, clavier, lecteur d’écran, zoom, dyslexie, autre.

**Réponse :** tout public 

### Q34 — Navigateurs et appareils à couvrir

Indique les appareils réellement utilisés par tes visiteurs si tu le sais : iPhone/iPad, Android, Chrome, Safari, Firefox, Edge, anciens appareils, autre.

**Réponse :**iPhone/iPad, Android, Chrome, Safari,

## 7. SEO, pages et publication

### Q35 — Pages supplémentaires autorisées

Choisis : `accueil + mentions uniquement` / `pages de projets documentés` / `pages de services documentées` / `autre`. Aucune page de remplissage SEO ne sera créée sans contenu réel.

**Réponse :** non on reste en one page + page mentions legales

### Q36 — Domaine public

La cible actuelle est GitHub Pages `bastienlopez.github.io/CleDeVoute/`. Confirme : `ON GARDE CETTE URL` / `UN DOMAINE EXISTE`, puis donne le domaine exact sans approximation.

**Réponse :**ON GARDE CETTE URL, modif ds le futur mais GP actuel

### Q37 — Données SEO à mettre en avant

Quels mots ou zones doivent être prioritaires dans les titles/descriptions : Sedan, Ardennes, maçonnerie générale, gros œuvre, pierre, rénovation, terrasses, autre ?

**Réponse :** Sedan, Ardennes, maçonnerie générale, gros œuvre, pierre, rénovation, terrasses, batiments etc

### Q38 — Image sociale

Veux-tu fournir un visuel social dédié au format idéal 1200×630 ? `OUI, je le joins` / `NON, les metadata texte suffisent pour l’instant`.

**Réponse :** non

## 8. Contraintes techniques et validation

### Q39 — Dépendances et stack

Confirme : `React/Vite/Tailwind/shadcn conservés, aucune nouvelle dépendance` / `nouvelles dépendances autorisées`, puis précise lesquelles et pourquoi.

**Réponse :**nouvelles dépendances autorisées si necessaire

### Q40 — Backend, stockage et formulaire

Confirme : `site statique uniquement` / `backend autorisé`, puis indique où il serait hébergé et quelles données il pourrait conserver. Par défaut, aucune architecture serveur ne sera ajoutée.

**Réponse :**site statique uniquement

### Q41 — Méthode de revue souhaitée

Choisis :

- `Implémentation complète puis revue sur le navigateur` ;
- `Wireframe/structure d’abord, puis implémentation` ;
- `Une section à la fois avec validation` ;
- `Autre`.

**Réponse :**Une section à la fois avec validation

### Q42 — Critères de validation avant livraison

Ajoute tes critères obligatoires. La base proposée est : compréhension en 10 secondes, contact visible, preuve réelle dans le premier/deuxième écran mobile, page plus courte, responsive, clavier, reduced motion, routes 200, CI verte, aucune régression P0–P6.

**Réponse :** oui tout ca sauf page plus courtes, pas necessaire de reduire 
### Q43 — Ce qui est explicitement interdit

Indique tout ce que tu ne veux pas voir : formulaire, avis clients, prix, animations, vidéos, nouvelles pages, analytics, newsletter, dark mode, changement de logo, changement de palette, autre.

**Réponse :**formulaire,prix,newsletter, et truc pas actuel

### Q44 — Autorisation de modification

Après validation de ce document, confirmes-tu que je peux modifier les fichiers frontend nécessaires à la phase 7, sans commit, push ni déploiement automatique ?

**Réponse :** oui
