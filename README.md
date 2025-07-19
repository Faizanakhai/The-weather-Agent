# 🌤️ The Weather Agent

A responsive React-based chat interface where users can interact with an AI-powered weather assistant to get weather updates for any city. Features multi-chat support with persistent local storage, clean UI, and mobile-first responsive design.

## ✨ Features

- 🧠 Chat with an AI weather agent in real-time
- 💬 Multiple chat sessions with unique IDs
- 💾 Chats persist using localStorage (even after page reload)
- 📱 Fully responsive UI (mobile + desktop)
- 🧭 Sidebar to view and switch between old chats
- 🆕 One-click new chat creation
- ⏱ Timestamps for all messages

## 📸 Screenshots

### Desktop View

<img src="./screenshots/desktop-view.png" width="800"/>

### Mobile View

<img src="./screenshots/mobile-view.png" width="300"/>

> Replace the image paths above with your actual screenshot files and correct file names in a /screenshots directory in the repo.

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Faizanakhai/The-weather-Agent.git
cd The-weather-Agent
npm install
npm start
```

Now visit http://localhost:3000 to interact with the app!

## 🧱 Tech Stack

- React
- Tailwind CSS
- LocalStorage
- Fetch API for backend integration

## 🗃 Folder Structure (Simplified)

```
src/
├── components/
│   ├── ChatBox.jsx
│   ├── Sidebar.jsx
│   ├── InputBox.jsx
│   └── MessageBubble.jsx
├── utils/
│   └── api.js
└── App.jsx
```

## 📦 Deployment

This app can be deployed on Vercel, Netlify, or GitHub Pages.

## 🙌 Acknowledgements

- Built as part of a Frontend Engineer assignment.
- Weather responses powered via API integration with a simulated weather agent.
