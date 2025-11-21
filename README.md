# 📊 BusinessFlow Pro

Une application complète de gestion d'entreprise construite avec React, TypeScript, et Tailwind CSS. Interface moderne avec support du mode sombre et multilingue (FR/EN).

🔗 **[Démo en ligne](https://businessflow-pro.netlify.app/)** | 📦 **[Repository GitHub](https://github.com/T0b0i7/BusinessFlow-Pro)**

## ✨ Fonctionnalités

- 📈 **Dashboard** - KPI en temps réel avec graphiques analytiques
- 📦 **Gestion d'inventaire** - Suivi des stocks et des produits
- 🛒 **Traitement des commandes** - Gestion complète des ventes
- 📊 **Rapports avancés** - Statistiques détaillées et visualisations
- ⚙️ **Paramètres** - Configuration flexible de l'entreprise
- 🌙 **Mode sombre** - Interface adaptable selon préférence
- 🌍 **Multilingue** - Support français et anglais
- ♿ **Accessibilité** - Conforme aux normes WCAG 2.1

## 🌐 Démo en ligne

**[Visitez BusinessFlow Pro en ligne](https://businessflow-pro.netlify.app/)**

### Identifiants de démo
- Utilisateur : Aucun (accès direct à l'application)
- Cliquez sur "Login" pour accéder au tableau de bord

## 📸 Aperçu de l'interface

### Dashboard
- Vue d'ensemble complète avec KPI
- Graphiques de revenus en temps réel
- Statistiques des commandes et clients

### Inventaire
- Liste complète des produits
- Gestion facile (ajouter, modifier, supprimer)
- Suivi des niveaux de stock

### Ventes
- Interface de traitement des commandes
- Gestion des états de commande
- Détails clients et articles

### Rapports
- Analyse des ventes par statut
- Graphiques comparatifs
- Statistiques détaillées

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
git clone https://github.com/T0b0i7/BusinessFlow-Pro.git
cd BusinessFlow-Pro
npm install
```

### Développement

```bash
npm run dev
```

L'application sera disponible à `http://localhost:3000`

### Build de production

```bash
npm run build
```

### Prévisualisation

```bash
npm run preview
```

### Déploiement sur Netlify

```bash
# Build optimisé
npm run build

# Le dossier 'dist' peut être déployé directement sur Netlify
```

## 📁 Structure du projet

```
businessflow-pro/
├── components/
│   ├── Button.tsx              # Composant bouton réutilisable
│   ├── Dashboard.tsx           # Vue tableau de bord
│   ├── Inventory.tsx           # Gestion des stocks
│   ├── Login.tsx               # Authentification
│   ├── Reports.tsx             # Rapports et statistiques
│   ├── Sales.tsx               # Gestion des commandes
│   ├── Settings.tsx            # Paramètres
│   └── Sidebar.tsx             # Navigation latérale
├── App.tsx                     # Composant principal
├── context.tsx                 # Contexte global (state management)
├── types.ts                    # Types TypeScript
├── constants.ts                # Constantes de l'application
├── translations.ts             # Traductions multilingues
├── index.tsx                   # Point d'entrée
├── index.html                  # HTML de base
├── vite.config.ts              # Configuration Vite
└── tsconfig.json               # Configuration TypeScript
```

## 🛠️ Technologies utilisées

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | ^19.2.0 | Framework UI |
| **TypeScript** | ~5.8.2 | Typage statique |
| **Tailwind CSS** | v3 | Styles et design |
| **Vite** | ^6.2.0 | Build tool |
| **Recharts** | ^3.4.1 | Visualisations de données |
| **Lucide React** | ^0.554.0 | Icônes |

## 📋 Sections principales

### Dashboard
- Vue d'ensemble des KPI (Revenus, Commandes, Clients, Stock)
- Graphiques de revenus et statistiques
- Données en temps réel

### Inventaire
- Liste complète des produits
- Gestion de l'inventaire (ajouter, modifier, supprimer)
- Suivi des niveaux de stock
- Catégorisation des produits

### Ventes
- Traitement des commandes
- Gestion des états de commande
- Détails des clients et articles

### Rapports
- Analyse des ventes par statut
- Graphiques comparatifs
- Statistiques détaillées

### Paramètres
- Configuration de l'entreprise
- Gestion des devises
- Taux de taxation
- Notifications

## 🎨 Personnalisation

### Thème
L'application supporte nativement :
- Mode clair (par défaut)
- Mode sombre (basé sur les préférences système)

### Langues
Basculez entre français et anglais depuis la barre latérale.

### Couleurs personnalisées
Modifiez les couleurs primaires dans `tailwind.config.js` :

```tailwind
primary: {
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
}
```

## 🔒 Authentification

L'application inclut une page de connexion. Utilisez n'importe quelles identifiants pour la démo.

## 💾 Données

Actuellement, l'application utilise des données mock locales. Pour intégrer une API :

1. Modifiez `context.tsx` pour faire des appels API
2. Remplacez les données mock par des appels réels
3. Implémentez la persistence en base de données

## 🚨 Accessibilité

Toutes les modifications récentes garantissent :
- ✅ Attributs ARIA appropriés
- ✅ Labels accessibles pour tous les formulaires
- ✅ Navigation au clavier complète
- ✅ Contraste de couleur conforme WCAG
- ✅ Support des lecteurs d'écran

## 🌐 Déploiement

### Configuration Netlify

Un fichier `netlify.toml` est recommandé :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Étapes de déploiement sur Netlify

1. Connectez votre repository GitHub à Netlify
2. Sélectionnez la branche `main`
3. Commande de build : `npm run build`
4. Dossier de publication : `dist`
5. Cliquez sur "Deploy"

L'application est maintenant disponible à : **https://businessflow-pro.netlify.app/**

## 🔧 Variables d'environnement

Actuellement, l'application n'utilise pas de variables d'environnement, mais vous pouvez en ajouter pour :
- URL d'API
- Clés d'authentification
- Configuration par environnement

Créez un fichier `.env.local` :

```
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key
```

## 📝 Licences

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**T0b0i7** - [GitHub](https://github.com/T0b0i7)

## 🤝 Contributions

Les contributions sont bienvenues ! N'hésitez pas à ouvrir des issues ou des pull requests.

## 📋 Roadmap

### Prochaines fonctionnalités prévues
- [ ] Intégration API backend
- [ ] Base de données persistente
- [ ] Authentification utilisateur avancée
- [ ] Export PDF des rapports
- [ ] Notifications en temps réel
- [ ] Mode collaboratif
- [ ] Historique d'audit complet

## 🐛 Bugs et problèmes

Signalez les bugs via [GitHub Issues](https://github.com/T0b0i7/BusinessFlow-Pro/issues)

---

**Dernière mise à jour :** 21 novembre 2025
**URL de déploiement :** https://businessflow-pro.netlify.app/

