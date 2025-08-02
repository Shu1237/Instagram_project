# SocialWave

## 📄 Brief

A modern social media web application for sharing photos and videos, featuring post creation, comments, user authentication, real-time chat, and video calls.

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

## 🚀 Introduction

SocialWave is a custom social media platform developed for connecting people through visual content. It provides core functionalities of a modern social media platform, including photo/video sharing, interactions through comments and chat, and communication features like video calling.

> ⚠️ This is a custom social media project created for educational and demonstration purposes.

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
SocialWave_project/
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
├── ...
└── package.json
```

---
