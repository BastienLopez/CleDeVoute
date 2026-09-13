# Points encore ouverts — phases 0 à 6

Mis à jour le 13 septembre 2026 après les corrections, la validation locale finale et l'audit complet du lot UI/UX. Les réponses du propriétaire ont été appliquées et retirées de ce fichier lorsqu'elles ne bloquent plus les phases 0 à 6. Ce fichier conserve uniquement les vérifications externes et informations de crédibilité encore ouvertes.

## 1. Publication de la version validée

**Statut :** à faire séparément, avec autorisation explicite de publication.

Le dépôt n'a fait l'objet d'aucun commit, push ni déploiement dans cette session. La version locale validée cible GitHub Pages, compte `BastienLOPEZ`, sous `/CleDeVoute/`.

Vérification en lecture seule du 13 septembre 2026 sur la publication existante : l'accueil répond 200, `/mentions-legales` répond 200 et une URL inconnue répond 404. L'URL publique de `og-image.jpg` répond encore 404 car le nouvel artifact local n'a pas été poussé ni déployé.

Contrôles à exécuter après publication :

- accueil en HTTP 200 sur l'URL publique finale ;
- `/mentions-legales` en HTTP 200 ;
- une URL inconnue servie par le fallback 404 ;
- assets principaux, notamment `logo.png`, chargés depuis `/CleDeVoute/` ;
- métadonnées et canonicals correspondant au domaine réellement publié ;
- `og-image.jpg` accessible en 200 pour les aperçus sociaux.

## 2. En-têtes HTTP de l'hébergement

**Statut :** limitation à vérifier sur la cible publique.

Le scan local a observé l'absence de `Content-Security-Policy`, `Referrer-Policy` et `X-Content-Type-Options` comme en-têtes HTTP. Le document HTML contient des protections de secours (`CSP` et `referrer`), mais elles ne remplacent pas des en-têtes serveur.

Le même écart est observé sur l'accueil public existant. Le nouvel artifact ne peut pas être déclaré conforme côté hébergement avant son déploiement et son retest HTTP.

Après publication, vérifier les en-têtes réellement fournis par GitHub Pages. Si GitHub Pages ne permet pas de les configurer, conserver cette limite documentée ou la traiter lors d'une migration d'hébergement ultérieure. Ne pas affirmer que ces en-têtes sont actifs avant cette vérification.

## 3. Outils de couverture facultatifs

**Statut :** non bloquant pour la validation locale actuelle.

Semgrep et Trivy ne sont pas installés dans l'environnement utilisé. Le preflight sécurité, le scan statique prévu, `npm audit` et le DAST localhost ont toutefois été exécutés. Installer ces outils uniquement si une couverture complémentaire est requise lors d'un prochain audit de sécurité.

## 4. Informations de crédibilité à documenter

**Statut :** non bloquant pour le fonctionnement technique ; nécessaire pour clôturer complètement l'audit éditorial.

- **Provenance de `hero-premium.jpg` :** fournir, si elle existe, la source du chantier, l'autorisation d'utilisation ou la licence de la photo. Aucune provenance ne doit être inventée.
- **Détails des réalisations :** fournir uniquement lorsque disponibles la durée, le budget et l'avis client pour chaque projet concerné. Les fiches affichent déjà les informations vérifiables et laissent ces champs absents lorsqu'ils ne sont pas validés.
- **Carte Google Maps :** le chargement automatique est rétabli comme demandé. Confirmer, si nécessaire avec le cadre juridique applicable au site, si un consentement préalable ou une solution de remplacement doit être ajouté pour ce service tiers.

## Règle de passage

Ces points restent à traiter avant de déclarer la publication de production entièrement vérifiée et l'audit éditorial totalement clôturé. Ils ne bloquent plus la validation locale de P0 à P6. Aucun autre élément fourni dans le questionnaire propriétaire ne reste bloquant pour P0 à P6.
