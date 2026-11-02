# Guide développeur TRCE

## 1. Prérequis

- Node.js **24 ou supérieur** (`package.json` déclare `engines.node >=24`).
- npm (le dépôt contient `package-lock.json`).
- Docker Compose pour lancer les dépendances locales.
- Git.

Le dépôt cible AdonisJS **7.6.0**. Après changement de version, consulter le [guide de mise à niveau](upgrade-adonisjs-7.6.0.md) avant de lancer `npm ci` si le lockfile n’a pas encore été régénéré.

## 2. Démarrage local

### 2.1 Récupérer et configurer le projet

```bash
npm ci
cp .env.example .env
```

Générer une clé d'application :

```bash
node ace generate:key
```

Renseigner la valeur générée dans `APP_KEY` dans `.env`.

### 2.2 Démarrer les dépendances

```bash
docker compose up -d db whodb mailpit
```

Services fournis par `docker-compose.yml` :

| Service | Port local | Utilité |
|---|---:|---|
| PostgreSQL 18 (`db`) | 5432 | Base de données |
| WhoDB (`whodb`) | 8080 | Interface d'exploration de base |
| Mailpit (`mailpit`) | 1025 SMTP / 8025 UI | Capture des e-mails en local |

Les identifiants PostgreSQL du compose local sont `trce` / `trce`, base `trce`. Ils sont réservés au développement local et ne doivent jamais être réutilisés en production.

### 2.3 Configuration locale type

Exemple de configuration locale avec PostgreSQL et Mailpit :

```dotenv
NODE_ENV=development
HOST=localhost
PORT=3333
LOG_LEVEL=debug

APP_KEY=<cle-generee-avec-node-ace-generate-key>
APP_URL=http://localhost:3333

DB_TYPE=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=trce
DB_PASSWORD=trce
DB_DATABASE=trce

SESSION_DRIVER=cookie

MAIL_MAILER=smtp
MAIL_FROM_NAME=TRCE local
MAIL_FROM_ADDRESS=trce@localhost
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
```

Le `config/database.ts` utilise PostgreSQL par défaut (`DB_TYPE` fallback `pg`). SQLite peut être sélectionné avec `DB_TYPE=sqlite` ; dans ce cas, Lucid utilise `tmp/db.sqlite3`.

Le `config/session.ts` configure les stores `cookie` et `database`. Bien que le validateur d'environnement accepte aussi la valeur `memory`, aucun store `memory` n'est déclaré dans cette configuration : rester sur `cookie` ou `database` tant que cette incohérence n'est pas traitée.

### 2.4 Migrer et démarrer

```bash
node ace migration:run
npm run dev
```

- Application : `http://localhost:3333`
- Mailpit : `http://localhost:8025`
- WhoDB : `http://localhost:8080`

## 3. Créer un administrateur

La commande `generate:admin` attend trois flags :

```bash
node ace generate:admin \
  --email=admin@example.test \
  --firstname=Admin \
  --lastname=TRCE
```

Elle génère un mot de passe temporaire aléatoire, crée un utilisateur de rôle `admin` et affiche le mot de passe dans le terminal. Celui-ci doit être transmis de façon sécurisée et changé à la première connexion.

> Attention : la commande doit être corrigée pour ne pas considérer les erreurs SQL non reconnues comme une création réussie. Ne pas l'utiliser comme procédure de provisionnement de production avant cette correction.

## 4. Commandes disponibles

```bash
npm run dev        # serveur local avec HMR
npm run build      # compilation / build de production
npm run start      # démarrage de build
npm run test       # suites Japa
npm run lint       # ESLint
npm run typecheck  # TypeScript backend et frontend
npm run format     # formatage Prettier de l'ensemble du dépôt
```

Commandes Adonis/Lucid utiles :

```bash
node ace list
node ace migration:run
node ace migration:rollback
node ace migration:status
node ace generate:key
```

## 5. Organisation du code

| Emplacement | Rôle |
|---|---|
| `app/controllers` | Adaptation HTTP, validation d'entrée, orchestration |
| `app/services` | Logique métier réutilisable |
| `app/models` | Modèles et relations Lucid |
| `app/policies` | Autorisations Bouncer |
| `app/validators` | Schémas VineJS |
| `app/transformers` | Transformation des modèles en données exposables |
| `app/middleware` | Comportements transverses HTTP |
| `database/migrations` | Évolution du schéma de données |
| `inertia/pages` | Pages React routées par Inertia |
| `inertia/components` | Composants de l'application et composants UI |
| `inertia/layouts` | Layouts authentifié et non authentifié |
| `inertia/css/app.css` | Tokens et styles globaux |
| `start/routes.ts` | Routes HTTP |
| `config` | Configuration des providers et services |

## 6. Conventions recommandées

### Backend

- Contrôleur fin : valider, autoriser, appeler un service, produire une réponse.
- Toute règle métier qui dépasse une simple opération CRUD doit vivre dans un service.
- Toute opération sur une ressource d'équipe vérifie l'appartenance à cette équipe côté serveur.
- Utiliser VineJS pour les entrées utilisateur et les payloads API.
- Utiliser Bouncer pour les autorisations explicites ; une policy déclarée mais non appelée ne protège rien.
- Utiliser des transformers/DTO pour ne pas exposer directement les modèles Lucid.
- Prévoir transactions et contraintes SQL pour les opérations multi-entités.

### Frontend

- Réutiliser les composants de `inertia/components/ui`.
- Garder les pages focalisées sur la composition et l'état d'écran.
- Extraire la logique réutilisable dans des hooks ou composants.
- Utiliser les props Inertia typées et ne pas importer un modèle backend comme type de payload d'écran.
- Prévoir les états chargement, vide, erreur, succès et disabled.

### Nommage

- `PascalCase` pour les classes et composants React.
- `camelCase` pour les fonctions, variables et propriétés TypeScript.
- fichiers backend en `snake_case.ts` selon les conventions existantes.
- routes API sous `/api/v1/...` pour les futures interfaces publiques.

## 7. Tests

AdonisJS est configuré avec Japa et trois emplacements de suites :

- `tests/unit/**/*.spec.{ts,js}` ;
- `tests/functional/**/*.spec.{ts,js}` ;
- `tests/browser/**/*.spec.{ts,js}`.

Le dépôt fourni ne contient pas encore de tests métier dans ces répertoires. À créer en priorité :

1. authentification, session et changement de mot de passe ;
2. accès admin / utilisateur aux équipes ;
3. cloisonnement entre deux équipes ;
4. création, révocation et validation d'une API Key ;
5. ingestion valide, invalide, volumineuse et non autorisée ;
6. masquage des secrets et rétention ;
7. sécurité des fonctionnalités de rejeu, si elles sont retenues.

Les tests d'autorisation doivent vérifier les refus (403/404 selon la politique retenue), pas seulement les cas positifs.

## 8. Build et livraison

Avant chaque livraison :

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

Le pipeline CI/CD cible devrait ensuite construire une image Docker immuable, scanner les dépendances et l'image, publier l'image avec un tag versionné, exécuter les migrations dans une étape maîtrisée puis déployer.

Le dépôt fourni ne contient pas de Dockerfile applicatif ni de pipeline CI/CD. Le `docker-compose.yml` est orienté dépendances de développement ; il ne constitue pas un déploiement applicatif de production.

## 9. Points d'attention connus

- Node.js 24+ requis.
- `.env.example` doit déclarer `SESSION_DRIVER`, car le schéma d'environnement le rend obligatoire.
- `SESSION_DRIVER=memory` est accepté par le schéma mais le store n'est pas configuré.
- `DB_TYPE` vaut `pg` par défaut, malgré le commentaire « SQLite connection (default) » dans `config/database.ts`.
- Les pages Users, Profile et Replays sont des placeholders.
- Les actions show/update/delete des équipes ne sont pas développées.
- L'API métier n'est pas encore déclarée.
