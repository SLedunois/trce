# TRCE — Design system

> Ce document décrit les tokens et composants identifiables dans le dépôt, puis fixe des règles d'usage pour garder une interface cohérente. Les valeurs marquées « recommandation » ne sont pas toutes déjà codées.

## 1. Principes visuels

Le produit doit évoquer un outil développeur : précis, lisible, dense sans être chargé, et orienté diagnostic. L'interface existante utilise une base claire, une couleur de marque turquoise/vert, la typographie Inter et des composants sobres.

Principes :

- priorité à la lisibilité des données et des états ;
- navigation stable et prévisible ;
- densité adaptée à des tableaux et des vues techniques ;
- couleurs utilisées pour porter un sens, pas uniquement décorer ;
- mêmes composants et mêmes états dans toutes les pages ;
- responsive sans sacrifier les informations importantes.

## 2. Identité de marque

### 2.1 Logo

Les variantes SVG sont disponibles dans :

- `inertia/images/trce-logo.svg` ;
- `inertia/images/trce-logo-small.svg` ;
- `trce-logo-v3.svg` à la racine.

Le logo utilise notamment le turquoise `#00786f`, son accent `#44aca2` et un mot-symbole sombre `#1a0a2e`. Utiliser les fichiers SVG existants plutôt que reconstruire le logo en CSS ou en texte.

Règles :

- version complète dans la sidebar ouverte et sur les écrans d'authentification ;
- version compacte dans la sidebar réduite ;
- conserver les proportions et le contraste ;
- ne pas recolorer le logo à la volée sans variante de marque validée.

## 3. Couleurs

### 3.1 Tokens actuellement définis

Les valeurs ci-dessous viennent de `inertia/css/app.css`. Les valeurs OKLCH sont la source de vérité de l'implémentation.

| Token CSS | Clair | Sombre | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.148 0.004 228.8)` | Fond global |
| `--foreground` | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` | Texte principal |
| `--card` | `oklch(1 0 0)` | `oklch(0.218 0.008 223.9)` | Surface des cartes |
| `--primary` | `oklch(0.511 0.096 186.391)` | `oklch(0.437 0.078 188.216)` | Action principale / accent |
| `--primary-foreground` | `oklch(0.984 0.014 180.72)` | `oklch(0.984 0.014 180.72)` | Texte sur primaire |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Surface secondaire |
| `--muted` | `oklch(0.963 0.002 197.1)` | `oklch(0.275 0.011 216.9)` | Surface discrète |
| `--muted-foreground` | `oklch(0.56 0.021 213.5)` | `oklch(0.723 0.014 214.4)` | Texte secondaire |
| `--accent` | `oklch(0.511 0.096 186.391)` | `oklch(0.437 0.078 188.216)` | Accent interactif |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Actions/états destructifs |
| `--border` | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 10%)` | Bordures |
| `--input` | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 15%)` | Contours de champs |
| `--ring` | `oklch(0.723 0.014 214.4)` | `oklch(0.56 0.021 213.5)` | Focus |

Les tokens de sidebar (`--sidebar*`) et les cinq tokens de graphiques (`--chart-1` à `--chart-5`) sont aussi définis dans la feuille de style. Les couleurs des graphiques sont actuellement une gamme neutre, pas encore une palette catégorielle métier.

### 3.2 Couleurs de statut — convention à appliquer

Les composants d'interface doivent s'appuyer sur des couleurs sémantiques et un libellé textuel. Les couleurs ci-dessous décrivent le sens attendu ; elles ne remplacent pas les tokens CSS déjà présents.

| Statut | Sens | Présentation recommandée |
|---|---|---|
| Success | Opération terminée correctement | Vert + libellé « Succès » |
| Warning | Attention requise, action possible | Ambre + explication |
| Error | Échec ou action bloquante | Rouge + cause/action corrective |
| Info | Information neutre | Bleu ou accent discret + libellé |
| Pending | Traitement en cours | Gris/bleu neutre + indicateur de progression |
| Disabled | Fonction non disponible | Contraste atténué, sans disparaître |

Ne jamais exprimer un statut uniquement par la couleur : ajouter texte, icône ou autre indication accessible.

## 4. Typographie

### Existant

- Famille : **Inter Variable**, importée via `@fontsource-variable/inter`.
- `--font-sans` utilise Inter Variable.
- `--font-heading` pointe actuellement vers `--font-sans`.
- Les boutons utilisent `text-sm` et `font-medium`.

### Échelle recommandée

| Usage | Taille indicative | Graisse |
|---|---:|---|
| Titre de page H1 | 28–32 px | 600–700 |
| Titre de section H2 | 20–24 px | 600 |
| Titre de carte H3 | 16–18 px | 600 |
| Texte courant | 14–16 px | 400 |
| Libellé de champ | 13–14 px | 500 |
| Métadonnée / aide | 12–13 px | 400 |
| Code, IDs, tokens | Police monospace | 400–500 |

Cette échelle est une recommandation de design system. Elle doit être traduite en classes ou composants typographiques partagés pour éviter les tailles arbitraires page par page.

## 5. Espacements, dimensions et formes

### Existant

- Rayon de base : `--radius: 0.625rem` (10 px).
- Rayons dérivés : `sm = 0.6 × radius`, `md = 0.8 × radius`, `lg = radius`, `xl = 1.4 × radius`, etc.
- Bouton par défaut : hauteur Tailwind `h-9` (36 px), taille `sm` : 32 px, `lg` : 40 px.
- Bouton icône par défaut : 36 × 36 px.

### Recommandation

Utiliser une échelle d'espacement basée sur 4 px : 4, 8, 12, 16, 24, 32, 40 et 48 px. Réserver les espacements plus grands aux séparations de zones ou aux marges de page.

| Élément | Recommandation |
|---|---|
| Champ standard | Hauteur 36–40 px |
| Bouton standard | 36 px, déjà implémenté |
| Bouton important | 40 px |
| Rayon champs/boutons | Rayon `md` / `lg` existant |
| Carte | 16–24 px de padding selon densité |
| Espacement entre champs | 12–16 px |
| Espacement entre sections | 24–32 px |
| Largeur de lecture formulaire | 400–480 px maximum |

## 6. Bibliothèque de composants

Les composants locaux sont regroupés dans `inertia/components/ui`. Ils doivent être privilégiés avant l'introduction d'une nouvelle dépendance ou d'un style isolé.

| Composant disponible | Usage attendu |
|---|---|
| `Button` | Actions primaires, secondaires, discrètes, destructives et lien |
| `Card` | Regroupement d'informations cohérentes |
| `Alert` | Message contextuel durable |
| `Avatar` | Identité d'un utilisateur ou d'un membre |
| `Breadcrumb` | Repérage dans la navigation |
| `Dialog` | Confirmation et formulaires courts |
| `DropdownMenu` | Actions secondaires et menu utilisateur |
| `Empty` | État sans donnée avec explication et action pertinente |
| `Field`, `Label`, `Input` | Formulaires accessibles et homogènes |
| `PasswordInput` | Saisie de mot de passe avec visibilité contrôlable |
| `Item` | Ligne ou élément de liste |
| `PageHeader` | Titre de page et actions associées |
| `Separator` | Séparation visuelle |
| `Sheet` | Panneau latéral, notamment sur mobile |
| `Sidebar` | Navigation principale |
| `Skeleton` | Placeholder pendant un chargement |
| `Tooltip` | Information complémentaire courte |
| `Typography` | Styles typographiques partagés |
| `Messages` | Présentation des messages de formulaire |

La base UI combine Base UI React, `class-variance-authority`, Tailwind CSS et Lucide React. Le fichier `components.json` configure le style `base-vega` et les variables CSS.

## 7. Structure des pages

### 7.1 Application authentifiée

Le layout `inertia/layouts/default.tsx` assemble :

1. une sidebar de navigation ;
2. un header avec déclencheur de sidebar et breadcrumbs ;
3. une zone de contenu ;
4. des notifications toast via Sonner.

La navigation actuelle présente les entrées Replays, Teams et Users. Profile est disponible depuis le menu utilisateur.

### 7.2 Authentification

Les pages login, forgotten password et password change utilisent un layout distinct sans sidebar. Le logo est centré et le contenu est contenu dans une colonne étroite.

### 7.3 Gabarit d'une page métier — recommandé

```text
Page
├── PageHeader
│   ├── Titre + description courte
│   └── Action primaire (si autorisée)
├── Barre de filtres / recherche (si nécessaire)
├── Contenu principal
│   ├── Skeleton pendant le chargement
│   ├── Empty avec prochaine action si vide
│   ├── Liste / tableau / cartes si données
│   └── Alert si une information durable doit être visible
└── Pagination / informations de résultat
```

Une page doit conserver le même ordre de lecture et ne pas masquer les erreurs de chargement derrière un simple état vide.

## 8. Règles d'interaction

### Boutons

- Une seule action primaire dominante par zone.
- `destructive` réservé aux suppressions ou actions irréversibles.
- `outline`, `secondary` ou `ghost` pour les actions secondaires.
- Les boutons icônes seuls doivent avoir un nom accessible (`aria-label`).
- Les actions en cours doivent désactiver le contrôle ou afficher un état de chargement.

### Formulaires

- Chaque champ possède un label visible.
- L'aide et l'erreur sont associées au champ concerné.
- L'erreur est expliquée en termes compréhensibles et indique comment corriger.
- Les validations importantes sont répétées côté serveur.
- Les valeurs sensibles ne sont jamais préremplies ou renvoyées inutilement.

### Tables et listes techniques — recommandation

Pour les futures pages de replays et de clés API :

- aligner les nombres et durées ;
- utiliser une police monospace pour les identifiants techniques ;
- tronquer visuellement les chaînes longues tout en offrant un accès à la valeur complète ;
- rendre les filtres persistants dans l'URL quand cela améliore le partage ;
- proposer des états vide, erreur, chargement et aucune correspondance ;
- éviter les actions destructives directement dans une ligne sans confirmation.

## 9. Accessibilité

Objectif : viser WCAG 2.2 AA pour les parcours principaux.

- Navigation clavier complète et ordre de focus cohérent.
- Focus visible, non masqué par les overlays.
- Contraste suffisant entre texte, fond et bordures utiles.
- Labels explicites et associations `label` / champ.
- Dialogs avec focus piégé/restauré et fermeture clavier.
- Icônes décoratives masquées aux lecteurs d'écran ; icônes seules nommées.
- Statuts annoncés autrement que par la couleur.
- Respect de `prefers-reduced-motion`.
- Ne pas utiliser de placeholder comme seul label.

## 10. Responsive et densité

- Desktop : sidebar persistante, contenu exploitable en largeur, tableaux complets.
- Tablette : réduire les colonnes secondaires, conserver filtres et actions principales.
- Mobile : sidebar sous forme de sheet, actions accessibles, listes transformées en cartes si le tableau devient illisible.
- Les éléments techniques très longs doivent être tronqués ou défilables localement ; éviter le scroll horizontal global.

## 11. Dark mode

Les tokens `.dark` sont définis dans `app.css`, mais le dépôt ne montre pas encore de sélecteur utilisateur ni de persistance de préférence. Le dark mode est donc **préparé au niveau CSS**, mais son parcours utilisateur n'est pas confirmé.

Avant d'annoncer cette fonctionnalité, ajouter :

- un mécanisme de préférence (système / clair / sombre) ;
- une persistance de cette préférence ;
- la vérification de chaque composant et état ;
- des tests de contraste en clair et en sombre.

## 12. Gouvernance du design system

- Ajouter un composant UI partagé avant de dupliquer son style dans plusieurs pages.
- Utiliser les tokens sémantiques, pas des couleurs arbitraires.
- Toute nouvelle variante doit être justifiée par un cas d'usage récurrent.
- Vérifier focus, hover, disabled, loading, error, empty et responsive.
- Mettre à jour ce document lorsqu'un token ou un pattern est modifié.
