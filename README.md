# Qwizzy 🎮 Quizz interactifs avec WordPress REST API

Qwizzy est une plateforme de quizz interactifs combinant **WordPress** (backend) et **React** (frontend).  
Les utilisateurs peuvent **jouer, créer et suivre leurs scores** sur des quizz validés par un administrateur.

---

## 🎯 Contexte & Objectifs

### 🌍 Contexte

🔹 **Backend WordPress** : Un site WordPress vierge utilisé uniquement pour gérer le contenu et l’authentification. <br />
🔹 **React en Frontend** : Intégration de composants React dans les pages WordPress via des blocs HTML.<br />   
🔹 **Custom Post Types avec Pods** : Gestion des quizz, questions et scores via des types de contenu personnalisés.  

### 🚀 Objectifs

✅ **Administrateurs** : Gérer tous les quizz (création, validation, suppression).
✅ **Utilisateurs non connectés** : Visualiser et jouer aux quizz.
✅ **Utilisateurs connectés** : Jouer, enregistrer leur score et créer des quizz soumis à validation.

---

## 🛠️ Fonctionnalités principales
- 🔐 **Authentification JWT** via l’API WordPress (Simple-JWT-Login)  
- 🪄 **Création et validation de quizz** (par les administrateurs)  
- ✏️ **Ajout** de quizz (par les utilisateurs connectés) 
- 🏆 **Scoreboard personnel** pour chaque joueur 

---

## 🏗️ Architecture & Fonctionnalités

### 🏛️ Backend (WordPress)
- 📡 **API REST** utilisée pour gérer les quizz et les utilisateurs  
- 🏗️ **Pods** pour structurer les types de contenu personnalisés  
- 🔐 **Gestion des rôles et permissions** via WordPress

### Frontend (React) 🖥️
- ⚛️ **Consommation de l’API WordPress** pour récupérer les quizz
- 🎨 **Modals pour l’authentification** (inscription & connexion via JWT)
- 🎮 **Affichage des questions en séquence** 
- 🏆 **Scoreboard personnel** lié au joueur

---

## 🔐 Authentification et Rôles

### 🔑 Authentification
- **JWT (JSON Web Token)** utilisé pour la connexion via **Simple-JWT-Login**.  
- **Stockage sécurisé du token** et inclusion dans les requêtes API.

### 👥 Rôles Utilisateurs
- 👑 **Administrateurs** : Gestion complète des quizz (création, validation, suppression).  
- 🔓 **Joueurs connectés** : Peuvent jouer, enregistrer leurs scores et proposer des quizz.  
- 👀 **Visiteurs** : Peuvent uniquement jouer aux quizz validés (sans enregistrement de scores).  

---

## 🎲 Gestion des quizz
- ⚛️ **Création via React** → **Enregistrement via l’API REST WordPress**.  
- 🔥 **Champs obligatoires** : **Titre, description, difficulté, image (optionnelle)**.  
- ✅ **Validation** par un administrateur avant publication. 

---

## 🎮 Expérience de jeu
- ⏳ Affichage **séquentiel** des questions.  
- ✅ Vérification des réponses avec **Fuzzball** (tolérance aux erreurs).  
- 🏆 Score basé sur **le nombre de bonnes réponses et le temps total**.  

---

## 🏆 Scoreboard
- 📊 **Chaque joueur a un historique de ses scores**, visible dans son profil.  
- 🔄 **Stockage des scores dans Pods** (via l’API REST).  

---

## 💎 Améliorations futures
✨ **Scoreboard général** avec classement et filtrage.  
📂 **Ajout de catégories** pour les quizz et les questions.  
🔍 **Recherche et filtres avancés** (catégorie, difficulté, date, etc.).  
