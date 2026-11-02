# Mise à niveau AdonisJS 7.6.0

## Objectif

Faire évoluer le cœur AdonisJS de la version verrouillée `7.0.1` vers `7.6.0`, sans changer de version majeure et sans modifier inutilement les autres dépendances directes de l’application.

## État initial

- `package.json` déclarait `@adonisjs/core: ^7.0.0`.
- `package-lock.json` verrouillait réellement `@adonisjs/core` en `7.0.1`.
- Le projet exige déjà Node.js `>=24.0.0`.
- Les paquets AdonisJS complémentaires (Auth, Bouncer, Lucid, Inertia, Session, Shield, Vite, etc.) déclarent des peer dependencies compatibles avec la branche `@adonisjs/core` 7.x.

## Changement réalisé dans les sources

`package.json` fixe désormais explicitement :

```json
{
  "dependencies": {
    "@adonisjs/core": "7.6.0"
  }
}
```

Le fichier `.nvmrc` sélectionne Node.js 24. La documentation du projet indique également la version cible.

## Changements apportés par AdonisJS 7.6.0

Les notes officielles de la version 7.6.0 (5 octobre 2026) annoncent l’ajout de codemods et de helpers pour les alias d’import et les répertoires. Aucun changement applicatif obligatoire ni codemod obligatoire n’est indiqué dans ces notes.

La mise à niveau du cœur entraîne toutefois une résolution de dépendances transitives plus récente. Le manifeste de `@adonisjs/core@7.6.0` demande notamment des versions plus récentes de `@adonisjs/ace`, `@adonisjs/application`, `@adonisjs/bodyparser`, `@adonisjs/env`, `@adonisjs/events`, `@adonisjs/fold`, `@adonisjs/hash`, `@adonisjs/http-server`, `@adonisjs/logger` et plusieurs packages Poppinss. Il faut laisser npm reconstruire le graphe complet plutôt que modifier les numéros de version dans le lockfile à la main.

## Finalisation obligatoire du lockfile

**Important :** l’environnement de génération de cette archive ne disposait pas d’accès au registre npm (`EAI_AGAIN` sur `registry.npmjs.org`). Le `package-lock.json` fourni conserve donc encore l’ancien graphe et doit être régénéré avant d’utiliser `npm ci` ou de considérer la migration comme terminée.

Depuis un environnement connecté au registre npm, à la racine du projet :

```bash
# Sélectionner Node.js 24
nvm use
node --version

# Régénérer le lockfile à partir de package.json
npm install --package-lock-only --ignore-scripts

# Vérifier que l'installation reproductible fonctionne
npm ci
```

Vérifier ensuite que le cœur installé est bien en 7.6.0 :

```bash
npm ls @adonisjs/core
node -p "require('./node_modules/@adonisjs/core/package.json').version"
```

Le second contrôle doit afficher `7.6.0`.

## Vérifications applicatives

Après régénération du lockfile et installation :

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Compléter par un test manuel des parcours suivants :

- démarrage de l’application et rendu de la page de connexion ;
- connexion, session et déconnexion ;
- demande et validation de réinitialisation du mot de passe ;
- migrations PostgreSQL ;
- envoi d’e-mail via Mailpit ;
- navigation Inertia et chargement des assets Vite.

## Retour arrière

En cas de régression, restaurer ensemble `package.json` et `package-lock.json` depuis le commit précédant la migration, puis exécuter `npm ci`. Ne restaurer qu’un seul de ces fichiers peut provoquer une divergence du graphe de dépendances.

## Références

- [AdonisJS Core – release v7.6.0](https://github.com/adonisjs/core/releases/tag/v7.6.0)
- [AdonisJS – notes de version](https://docs.adonisjs.com/releases)
- [AdonisJS v7 – prérequis Node.js 24](https://adonisjs.com/blog/v7)
