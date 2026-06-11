# 📚 Savoir Daily

> Une connaissance scientifique mémorable, chaque jour.

## 🌟 À propos

Savoir Daily est une application web progressive (PWA) qui génère et envoie chaque jour une connaissance scientifique extraite automatiquement d'articles de recherche récents (arXiv). L'extraction est réalisée par une IA (Groq/LLaMA 3.3-70b) qui transforme un résumé académique en une phrase courte, mémorable et accessible.

## ✨ Fonctionnalités

- 💡 **Citation du jour** — une connaissance scientifique générée automatiquement chaque matin
- 🗂️ **Historique** — toutes les citations passées consultables
- 🔔 **Notifications push** — reçois ta connaissance quotidienne sans ouvrir l'app
- 🔐 **Dashboard admin** — suivi des installations, tokens FCM et citations générées
- 📤 **Partage** — partage ou copie une citation en un tap

## 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| Frontend | Angular 17+ · Ionic · TypeScript |
| Backend | GitHub Actions (cron quotidien) |
| IA | Groq API · LLaMA 3.3-70b-versatile |
| Source de données | arXiv API |
| Base de données | Firebase Firestore |
| Notifications | Firebase Cloud Messaging (FCM) |
| Auth admin | Firebase Auth · Google Sign-In |
| Hébergement | Vercel |

## ⚙️ Architecture

```
GitHub Actions (cron 6h UTC)
        ↓
  Fetch arXiv (article récent)
        ↓
  Groq API (extraction connaissance)
        ↓
  Firestore (stockage citation)
        ↓
  FCM (push notification)
        ↓
  App Angular (affichage)
```

## 🚀 Installation locale

```bash
git clone https://github.com/pierrelionelsimo/savoir-daily.git
cd savoir-daily
npm install
ionic serve
```

## 🔧 Configuration

Crée `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  }
};
```

## 👤 Auteur

**Lionel SIMO **  
[github.com/pierrelionelsimo](https://github.com/pierrelionelsimo)

## 📄 Licence

MIT
