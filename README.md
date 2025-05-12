# InstaClone 

## 📄 Brief 
 A social media web application for sharing photos and videos, featuring post creation, comments, user authentication, real-time chat, and video calls.

---
## 📑 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---
## 🚀 Introduction

This project is a clone of Instagram developed for educational purposes. It replicates the core functionalities of a social media platform, including photo/video sharing, interactions through comments and chat, and basic communication features like video calling.

> ⚠️ This project is a personal, non-commercial clone of Instagram created for educational purposes only. It is not affiliated with or endorsed by Instagram or Meta Platforms, Inc.

---
## ✨ Features

- ✅ User authentication (login/logout)
- ✅ Create posts
- ✅ Comment on posts
- ✅ Real-time chat
- ✅ Video calling
- ✅ Responsive UI

---
## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Shu1237/Instagram_project.git

# Navigate into the project directory
cd Instagram_project

# Install dependencies 
npm install --legacy-peer-deps 
```

---
## 📦 Usage

```bash
# Start the frontend 
npm run start

# Start the backend 
npm run dev
```

Then visit `http://localhost:3000` in your browser.

---
## 📁 Project Structure

```plaintext
Instagram_project/
├── backend/
│   ├── config/
│   ├── graphql/
│   ├── middlewares/
│   ├── models/
│   │   ├── mongodb/
│   │   ├── mysql/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── signaling.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── graphql/
│   │   ├── mutations/
│   │   ├── query/
│   │   ├── subscriptions/
│   │   ├── graphql.config.js
│   ├── avatar.json
│   ├── image.json
│   ├── story.json
├── README.md
└── package.json
```

---
