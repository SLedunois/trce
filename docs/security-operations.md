# TRCE — Sécurité et exploitation

> Évaluation statique du dépôt fourni. Cette page décrit les contrôles visibles et les travaux nécessaires ; elle ne constitue pas une certification ni un audit dynamique.

## 1. État actuel

| Domaine | Constat dans le code | Évaluation |
|---|---|---|
| Authentification | Guard web basé sur session AdonisJS | Présent |
| Hash de mot de passe | Provider de hash AdonisJS, configuration Scrypt | Présent |
| Cookie de session | HttpOnly, Secure en production, SameSite Lax | Présent |
| CSRF | Activé pour POST/PUT/PATCH/DELETE | Présent |
| HSTS | Activé, durée configurée à 180 jours | Présent |
| X-Frame-Options | Activé avec DENY | Présent |
| X-Content-Type-Options | Activé | Présent |
| CSP | Désactivée | À traiter |
| Autorisations Bouncer | Middleware et TeamPolicy présents | Application incomplète |
| Rate limiting | Pas de mécanisme identifié dans le dépôt | À ajouter |
| API Keys | Modèle et validation absents | À concevoir |
| Audit trail | Pas de journal d'audit métier identifié | À ajouter |
| Stockage sensible | Tokens de réinitialisation enregistrés en clair | À durcir |
| Cloisonnement équipe | Jointure SQL présente, logique applicative absente | À implémenter |
| Sauvegarde / PRA | Non documentés dans le dépôt | À définir |

## 2. Corrections prioritaires

### P0 — Avant exposition à des utilisateurs

1. **Appliquer les autorisations dans les contrôleurs.** `TeamPolicy` existe, mais `TeamsController.create()` n'effectue pas de contrôle Bouncer visible. La création d'équipe ne doit pas reposer sur le seul masquage du bouton dans React.
2. **Corriger le parcours de déconnexion.** La route est `POST /logout` ; vérifier que l'action frontend envoie bien un POST et non une navigation GET.
3. **Corriger les validations de confirmation de mot de passe.** Vérifier explicitement l'égalité entre mot de passe et confirmation au serveur.
4. **Vérifier les URL signées de reset.** Une URL est générée avec le helper de signature, mais le contrôleur de lecture du lien doit aussi valider la signature, en plus de contrôler le token en base.
5. **Ajouter du rate limiting** sur login, demande de reset et endpoints futurs d'ingestion.
6. **Activer une CSP progressivement.** Commencer par Report-Only, collecter les violations, puis passer en mode bloquant après validation des sources nécessaires à Vite/React.
7. **Traiter les erreurs non prévues de `generate:admin`.** La commande ne doit pas afficher un succès si l'insertion échoue pour une autre raison qu'un e-mail déjà utilisé.

### P1 — Avant ouverture de l'API

- API keys générées avec un CSPRNG, stockées sous forme de hash, révocables et à scopes.
- Authentification distincte des sessions navigateur.
- Validation stricte des payloads, limites de taille et limites de débit.
- Autorisation systématique sur `team_id`.
- Protection contre l'injection de données dans logs et en-têtes.
- Masquage des cookies, tokens, mots de passe et données personnelles.
- Pagination et limites de requêtes pour éviter l'épuisement des ressources.
- Format d'erreurs stable qui n'expose ni stack trace ni secret.

### P2 — Avant passage à l'échelle

- Audit trail administratif et sécurité.
- Rotation de secrets et politique de durée de vie des clés.
- Sauvegardes chiffrées, restauration testée et objectifs RPO/RTO.
- Supervision base, stockage objet, files et workers.
- Gestion de rétention et suppression effective des payloads.
- Tests de charge et tests de cloisonnement multi-tenant.

## 3. Contrôles de sécurité détaillés

### 3.1 Identité et sessions

- Garder les cookies `HttpOnly`, `Secure` en production et `SameSite` adapté.
- Utiliser HTTPS partout ; le reverse proxy doit transmettre correctement le contexte sécurisé à l'application.
- Limiter les sessions inactives et invalider les sessions après changement de mot de passe lorsque le niveau de risque le justifie.
- Ajouter une limitation des tentatives de connexion par compte et par IP, sans permettre un déni de service ciblé contre un utilisateur.
- Éviter de révéler si une adresse e-mail existe dans le parcours « mot de passe oublié » ; le message générique actuel va dans le bon sens.
- Stocker les tokens de reset sous forme de hash, limiter leur durée, leur usage unique et leur invalidation.

### 3.2 Autorisations multi-équipe

- Une requête ne doit jamais décider seule de son `team_id`.
- Charger la ressource dans le périmètre d'équipe autorisé, ou vérifier explicitement l'appartenance avant accès.
- Appliquer le contrôle aux lectures, exports, suppressions et téléchargements de payloads, pas uniquement aux pages de liste.
- Distinguer le rôle global (administration de plateforme) du rôle d'équipe.
- Tester un utilisateur membre de l'équipe A qui tente de lire ou modifier une ressource de l'équipe B.

### 3.3 API Keys

- Affichage unique du secret, stockage du hash uniquement.
- Stocker un identifiant, un préfixe, un nom, les scopes, les dates d'expiration/révocation et la dernière utilisation.
- Ne jamais placer la clé dans les logs, traces, URL ou messages d'erreur.
- Révoquer immédiatement une clé compromise et tracer l'opération.
- Prévoir une politique de rotation et une procédure de réponse à compromission.

### 3.4 Données de replay

- Définir des règles de redaction dès l'ingestion.
- Ne pas capturer par défaut les en-têtes d'authentification et cookies.
- Appliquer un chiffrement en transit et au repos.
- Contrôler les téléchargements et URLs temporaires d'accès au stockage objet.
- Prévoir un effacement complet des métadonnées et objets à la fin de la rétention.
- Isoler les environnements et données selon les équipes.

### 3.5 Fonction de rejeu — si confirmée

- Worker distinct du processus web.
- Egress réseau restrictif et filtrage SSRF.
- Blocage loopback, réseaux privés, link-local, services de métadonnées et destinations non autorisées.
- Revalidation après résolution DNS et redirections.
- Timeouts, limites de taille, concurrence et budget d'exécution.
- Confirmation explicite pour les cibles présentant un risque d'effets de bord.
- Journalisation de la cible, de l'acteur et du résultat sans enregistrer de secrets.

## 4. Exploitation

### 4.1 Déploiement

Le dépôt ne contient pas encore de Dockerfile applicatif ou de pipeline de livraison. Le compose actuel démarre uniquement PostgreSQL, WhoDB et Mailpit.

Cible recommandée :

- image Node.js non-root et dépendances de production uniquement ;
- configuration par variables d'environnement / secrets manager ;
- terminaison TLS en frontal ;
- processus web stateless ;
- migration DB dans une étape contrôlée ;
- workers distincts du processus HTTP ;
- health checks séparant disponibilité HTTP et dépendances critiques.

### 4.2 Logs et métriques

À collecter :

- logs applicatifs structurés et identifiant de requête ;
- taux d'erreur HTTP et latence par endpoint ;
- taux d'authentification échouée ;
- volume et latence d'ingestion ;
- backlog et échecs de workers ;
- taille du stockage objet et progression de la rétention ;
- connexions, latence et saturation PostgreSQL.

Ne pas tracer les secrets, mots de passe, tokens de reset, API keys, cookies ni corps bruts par défaut.

### 4.3 Sauvegarde et restauration

À définir au niveau produit/exploitation :

- RPO et RTO attendus ;
- sauvegardes PostgreSQL cohérentes et tests de restauration ;
- versioning ou protection contre l'effacement accidentel du stockage objet ;
- rétention des sauvegardes et chiffrement ;
- procédures d'accès d'urgence et de rotation des secrets ;
- exercice PRA périodique.

La cohérence entre métadonnées PostgreSQL et objets S3 doit être traitée : une restauration ne doit pas créer de références vers des payloads absents ni l'inverse.

## 5. Checklist de mise en production

- [ ] `APP_KEY` forte, unique et conservée dans un gestionnaire de secrets.
- [ ] Secrets DB/SMTP non présents dans Git ni dans les images.
- [ ] HTTPS et cookies sécurisés vérifiés derrière le proxy.
- [ ] CSP testée puis activée.
- [ ] CORS limité aux origines requises.
- [ ] CSRF actif sur les routes de session.
- [ ] Policies appelées sur chaque lecture/écriture métier.
- [ ] Rate limiting configuré et partagé entre les instances.
- [ ] Tests d'accès croisé entre équipes.
- [ ] Tokens de reset stockés sous forme de hash et à usage unique.
- [ ] Journaux exempts de secrets et de données sensibles.
- [ ] Limites de taille et de débit de l'API définies.
- [ ] Sauvegarde et restauration testées.
- [ ] Health checks et alertes opérationnels.
- [ ] Tests, lint, typecheck et build exécutés en CI.
- [ ] Procédure de mise à jour, rollback et migration documentée.
