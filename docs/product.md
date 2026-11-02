# TRCE — Présentation produit

> Statut : **proposition de cadrage**, à confirmer avec les utilisateurs et les cas d'usage réels.

## 1. Positionnement

L'interface actuelle présente TRCE comme un espace où une équipe peut centraliser ses « replays » et où une clé API permet d'alimenter cet espace. Le dépôt ne contient pas encore de définition détaillée de ce que recouvre un replay.

Pour structurer la suite, ce document retient l'hypothèse suivante :

**TRCE est une plateforme permettant à des équipes de capturer, centraliser, consulter et rejouer des échanges HTTP/API**, notamment pour reproduire un comportement, diagnostiquer une anomalie, comparer des réponses ou partager un scénario entre développeurs.

Cette définition est une hypothèse de conception. Elle doit être validée avant de figer le modèle de données, le format d'ingestion et le comportement exact du rejeu.

## 2. Problème adressé

Dans une équipe de développement, reproduire un incident ou un comportement d'API peut nécessiter de retrouver les paramètres d'une requête, ses en-têtes, son corps, la réponse obtenue et le contexte d'exécution. Ces éléments sont souvent répartis entre logs, outils de développement, tickets et environnements.

TRCE pourrait apporter :

- un espace partagé et organisé par équipe ;
- une ingestion automatisable depuis les applications ou outils ;
- une conservation structurée des échanges ;
- une recherche et une consultation centralisées ;
- un rejeu contrôlé, si ce comportement est confirmé dans le besoin.

## 3. Utilisateurs et rôles

### Administrateur de la plateforme

Gère les comptes, les équipes et les paramètres globaux. Le rôle `admin` existe dans le modèle `users` actuel.

### Membre d'une équipe

Accède aux données de son équipe selon ses permissions. La table de jointure `users_teams` existe déjà, mais les relations et les règles d'accès ne sont pas encore implémentées.

### Client d'ingestion

Application, SDK ou service qui transmet des données à TRCE au moyen d'une clé API. Ce client est une identité technique, distincte d'un utilisateur humain.

### Administrateur d'équipe — cible proposée

Gère les membres, les clés API, les politiques de conservation et les paramètres propres à son équipe. Ce rôle n'existe pas encore dans le modèle actuel.

## 4. Périmètre fonctionnel proposé

| Domaine | Fonctionnalité cible | État dans le dépôt |
|---|---|---|
| Identité | Connexion et déconnexion par session | Présent, corrections à prévoir |
| Identité | Mot de passe oublié / réinitialisation | Présent, durcissement à prévoir |
| Identité | Changement forcé du mot de passe temporaire | Présent |
| Utilisateurs | Consultation et administration | Page placeholder |
| Équipes | Liste des équipes | Partiellement présent |
| Équipes | Création | Présente, autorisation à sécuriser |
| Équipes | Modification, suppression, membres | Non implémentées |
| API Keys | Création, consultation, révocation, rotation | Non implémentées |
| Replays | Ingestion, stockage, recherche, détail | Non implémentés |
| Replays | Rejeu vers une cible contrôlée | Non implémenté ; besoin à confirmer |
| Exploitation | Audit, métriques, rétention et purge | Non implémentés |

## 5. Parcours utilisateur cible

### 5.1 Créer un espace de travail

1. Un administrateur crée une équipe.
2. Il renseigne son nom et invite ou associe des membres.
3. Les membres accèdent uniquement aux données de leur équipe.

### 5.2 Connecter une application

1. Un administrateur d'équipe crée une clé API.
2. TRCE affiche le secret une seule fois.
3. Le client configure la clé dans son environnement d'exécution.
4. Le client envoie les événements à l'endpoint d'ingestion.
5. TRCE authentifie la clé, détermine l'équipe, valide le payload et applique les règles de filtrage.

### 5.3 Consulter un replay

1. L'utilisateur sélectionne une équipe.
2. Il filtre les replays par période, méthode HTTP, URL, statut ou identifiant de corrélation.
3. Il ouvre un replay et consulte les métadonnées et les contenus autorisés.
4. Il peut exporter ou partager une référence, selon les permissions.

### 5.4 Rejouer un échange — à valider

1. L'utilisateur sélectionne un replay.
2. Il choisit une cible autorisée et les paramètres modifiables.
3. TRCE exécute le rejeu dans un worker isolé.
4. TRCE conserve le résultat du rejeu et permet une comparaison avec l'échange original.

Le rejeu ne doit jamais être une simple fonction qui envoie librement une URL fournie par l'utilisateur : les risques SSRF, d'exfiltration et d'effets de bord doivent être traités au niveau de l'architecture.

## 6. Objets métier à prévoir

Les objets ci-dessous sont une proposition et ne sont pas encore implémentés, à l'exception de `User` et `Team`.

- **User** : identité humaine, adresse e-mail, rôle global.
- **Team** : espace de travail et frontière de cloisonnement.
- **TeamMember** : appartenance d'un utilisateur à une équipe et rôle au sein de celle-ci.
- **ApiKey** : identité technique liée à une équipe, avec hash du secret, scopes, état, expiration et dernière utilisation.
- **Replay** : métadonnées d'un échange capturé : méthode, URL normalisée, horodatage, statut, durée, taille et identifiants de corrélation.
- **ReplayPayload** : référence vers les corps et en-têtes conservés, idéalement dans un stockage objet.
- **ReplayExecution** : tentative de rejeu, cible, statut, durée et résultat.
- **AuditEvent** : action de sécurité ou d'administration importante.

## 7. Principes produit

1. **Team-first** : toute donnée métier appartient explicitement à une équipe.
2. **API-first pour l'ingestion** : le chemin d'alimentation doit être documenté et versionné.
3. **Privacy by default** : secrets, données personnelles et corps sensibles sont masqués ou exclus par défaut.
4. **Traceability** : chaque opération importante est corrélable et auditable.
5. **Safe replay** : les exécutions sont explicites, limitées et isolées.
6. **Progressive disclosure** : les détails techniques sont accessibles sans surcharger la vue de synthèse.

## 8. Questions métier à trancher

Avant de stabiliser les contrats d'API et le schéma de données, préciser :

- Un replay représente-t-il un échange HTTP isolé, une session complète, une séquence ou un scénario ?
- Le système capture-t-il la requête et la réponse, ou seulement l'une des deux ?
- Le rejeu doit-il être natif dans TRCE ou délégué à un client/agent ?
- Les payloads binaires sont-ils acceptés ? Quelle taille maximale ?
- Quel niveau de fidélité est requis pour les headers, cookies, délais et erreurs réseau ?
- Quelles sont les durées de conservation et les contraintes de résidence des données ?
- Le produit est-il mono-tenant interne ou multi-tenant pour plusieurs organisations clientes ?
- Faut-il des utilisateurs invités, des rôles personnalisés ou du SSO à terme ?

## 9. Indicateurs de réussite possibles

- délai moyen pour retrouver un échange ;
- taux d'ingestion réussie et latence d'ingestion ;
- volume capturé et volume de stockage ;
- taux de replays exploitables ;
- temps moyen de diagnostic d'un incident ;
- nombre d'équipes et de clients d'ingestion actifs.
