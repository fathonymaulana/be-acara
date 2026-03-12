<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</div>

<h1 align="center">⚙️ Acara (Back-End) ⚙️</h1>

<p align="center">
  <strong>Robust and Scalable API for the Acara Event Platform</strong>
</p>

## 🚀 Overview

Welcome to the **Acara Back-End** repository! This is the server-side application that powers the Acara platform, providing a reliable and secure API for the front-end application.

## ✨ Features

- 🔐 **Secure Auth:** JWT-based authentication and secure password handling.
- 🗄️ **Database:** MongoDB integration using Mongoose for flexible data storage.
- 📧 **Email Notifications:** Integrated with Nodemailer (SendGrid/Zoho).
- ☁️ **Media Uploads:** Seamless image uploads and management with Cloudinary.
- 📖 **API Documentation:** Auto-generated Swagger UI documentation.
- 🛠️ **Type Safety:** Built entirely with TypeScript for better code quality.

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/)
- **File Storage:** [Cloudinary](https://cloudinary.com/)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account/cluster
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fathonymaulana/be-acara.git
   ```
2. Navigate to the project directory:
   ```bash
   cd be-acara
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file based on the provided `.env.example` and fill in your credentials:

- `DATABASE_URL`
- `SECRET`
- SMTP/SendGrid credentials
- Cloudinary credentials

### Running the App

Start the development server:

```bash
npm run dev
```

To generate Swagger docs:

```bash
npm run docs
```

## 📜 License

This project is licensed under the [MIT License](LICENSE).
