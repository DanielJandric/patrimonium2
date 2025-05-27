# Guide de déploiement - Patrimonium

Ce document contient les instructions pour déployer le site Patrimonium sur votre propre environnement.

## Prérequis

- Node.js (version 16 ou supérieure)
- npm (version 7 ou supérieure)
- Environ 4 Go de RAM disponible pour la compilation

## Structure du projet

Le projet a été entièrement restructuré pour être plus moderne, sophistiqué et avant-gardiste, avec une palette de couleurs inspirée de l'option 3 (Avant-gardiste Financière) :

- Bleu-gris foncé (#2C3E50) - Couleur principale
- Orange cuivré (#D35400) - Couleur d'accent
- Gris ardoise (#7F8C8D) - Couleur secondaire
- Blanc cassé (#F5F5F5) - Arrière-plan

## Installation et déploiement

1. Décompressez l'archive `patrimonium-rebuild-src.zip` dans un dossier de votre choix
2. Ouvrez un terminal et naviguez vers ce dossier
3. Exécutez les commandes suivantes :

```bash
# Installation des dépendances
npm install

# Compilation du projet
# Note: Assurez-vous d'avoir suffisamment de mémoire disponible
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

4. Une fois la compilation terminée, le dossier `build` contiendra la version statique du site
5. Vous pouvez déployer ce dossier sur n'importe quel serveur web statique (Netlify, Vercel, GitHub Pages, etc.)

## Déploiement alternatif (si la compilation échoue)

Si vous rencontrez des problèmes de mémoire lors de la compilation, vous pouvez essayer les solutions suivantes :

1. Augmentez la mémoire allouée à Node.js :
```bash
NODE_OPTIONS="--max-old-space-size=16384" npm run build
```

2. Utilisez un service de déploiement qui compile automatiquement les projets React :
   - Netlify : Connectez votre dépôt GitHub et configurez la commande de build comme `npm run build`
   - Vercel : Similaire à Netlify, avec une détection automatique des projets React

## Structure des fichiers

- `src/App.tsx` : Composant principal avec la navigation et la structure de base
- `src/components/` : Dossier contenant tous les composants modulaires pour chaque onglet
- `src/index.css` : Styles CSS globaux avec les couleurs personnalisées
- `src/*.json` : Fichiers de données pour chaque section du site

## Personnalisation

Vous pouvez facilement personnaliser le site en modifiant les fichiers suivants :

- `src/index.css` : Pour modifier les couleurs et styles globaux
- `src/*.json` : Pour mettre à jour les données affichées dans chaque section
- `src/components/*.tsx` : Pour modifier la structure et le comportement de chaque onglet

## Fonctionnalités implémentées

- Design moderne et sophistiqué avec une palette de couleurs avant-gardiste
- Navigation responsive optimisée pour mobile et desktop
- Visualisations de données interactives pour chaque section
- Contenu informatif complet dans tous les onglets
- Animations et transitions fluides pour une expérience utilisateur améliorée
- Mode jour forcé pour une lisibilité optimale sur tous les appareils

## Contact

Si vous avez des questions ou besoin d'assistance supplémentaire, n'hésitez pas à me contacter.
