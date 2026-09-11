# Points encore ouverts — phases 0 à 6

Mis à jour le 10 septembre 2026 après les corrections, la validation locale finale et l'application de la refonte UI/UX. Les réponses du propriétaire ont été appliquées et retirées de ce fichier lorsqu'elles ne bloquent plus les phases 0 à 6. Ce fichier conserve uniquement les vérifications externes encore ouvertes.

## 1. Publication de la version validée

**Statut :** à faire séparément, avec autorisation explicite de publication.

Le dépôt n'a fait l'objet d'aucun commit, push ni déploiement dans cette session. La version locale validée cible GitHub Pages, compte `BastienLOPEZ`, sous `/CleDeVoute/`.

Vérification en lecture seule du 10 septembre 2026 sur la publication existante : l'accueil répond 200, tandis que `/mentions-legales` répond encore 404. Cela confirme que l'ancienne publication n'intègre pas encore le correctif de route statique.

Contrôles à exécuter après publication :

- accueil en HTTP 200 sur l'URL publique finale ;
- `/mentions-legales` en HTTP 200 ;
- une URL inconnue servie par le fallback 404 ;
- assets principaux, notamment `logo.png`, chargés depuis `/CleDeVoute/` ;
- métadonnées et canonicals correspondant au domaine réellement publié.

## 2. En-têtes HTTP de l'hébergement

**Statut :** limitation à vérifier sur la cible publique.

Le scan local a observé l'absence de `Content-Security-Policy`, `Referrer-Policy` et `X-Content-Type-Options` comme en-têtes HTTP. Le document HTML contient des protections de secours (`CSP` et `referrer`), mais elles ne remplacent pas des en-têtes serveur.

Le même écart est observé sur l'accueil public existant. Le nouvel artifact ne peut pas être déclaré conforme côté hébergement avant son déploiement et son retest HTTP.

Après publication, vérifier les en-têtes réellement fournis par GitHub Pages. Si GitHub Pages ne permet pas de les configurer, conserver cette limite documentée ou la traiter lors d'une migration d'hébergement ultérieure. Ne pas affirmer que ces en-têtes sont actifs avant cette vérification.

## 3. Outils de couverture facultatifs

**Statut :** non bloquant pour la validation locale actuelle.

Semgrep et Trivy ne sont pas installés dans l'environnement utilisé. Le preflight sécurité, le scan statique prévu, `npm audit` et le DAST localhost ont toutefois été exécutés. Installer ces outils uniquement si une couverture complémentaire est requise lors d'un prochain audit de sécurité.

## Règle de passage

Ces points restent à traiter avant de déclarer la publication de production entièrement vérifiée. Ils ne bloquent plus la validation locale de P0 à P6 ni la refonte UI/UX de P7. Aucun autre élément fourni dans le questionnaire propriétaire ne reste bloquant pour P0 à P6 ou P7.
