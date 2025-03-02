# Rubber-Ducky

## Overview

The **Rubber Duck Debugging AI Tool** is designed to help developers troubleshoot their code by explaining their issues out loud. Using **speech-to-text** and **AI-powered feedback (Dolphin3.0)**, developers can receive guidance while maintaining a **MERN stack architecture**. The tool also provides a space to store problems, notes, and attempted fixes.
[Screenshot](https://i.postimg.cc/59wgtVbC/duck2.jpg)

## Features

- **Speech-to-Text Support**: Converts spoken explanations into text for processing. [Screenshot](https://i.postimg.cc/HkL9385w/duck5.jpg)
- **AI-Powered Debugging**: Dolphin3.0 provides intelligent responses and troubleshooting assistance. [Screenshot](https://i.postimg.cc/HkL9385w/duck5.jpg)
- **User Notes & Problem Tracking**: Developers can document their debugging process. [Screenshot](https://i.postimg.cc/W1f6yp6Q/duck6.jpg)
- **Secure Authentication**: JWT-based authentication ensures personalized experiences. [Screenshot](https://i.postimg.cc/9XYXVJgB/duck7.jpg)
- **MERN Stack Implementation**: Uses MongoDB, Express, React, and Node.js.

## Tech Stack

### Frontend:

- **React + TypeScript** for a dynamic and type-safe UI.
- **Tailwind CSS** for a responsive and stylish front-end [Screenshot](https://i.postimg.cc/W3ZngRZx/duck1.jpg)

### Backend:

- **Node.js + Express** to manage API routes and authentication.
- **OpenAI API Integration** for AI-powered responses.
- **Web speech API** for voice input.
- **Speech Synthesis API** to read the AI response

### Database:

- **MongoDB** for storing user data, debugging notes, and session progress.

### Authentication:

- **JWT-based authentication** to secure user sessions.
- **Bcrypt** to ensure sensitive data remains safe

## Installation

### Prerequisites:

Ensure you have the following installed:

- **Node.js**
- **MongoDB**
- **Npm**

### Steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/sbaird22/Rubber-Ducky.git
   cd RUBBER-DUCKY
   ```
2. Install dependencies:

   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:

   ```sh
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET_KEY=your_jwt_secret
   ```
4. Start the backend server and front end server:

   ```sh
   npm run build
   ```
5. Start the application

   ```sh
   npm start
   ```

## Usage

1. **Log in or Sign up** to access personalized debugging sessions.
2. **Describe your coding issue** via speech or text.
3. **Receive AI-powered guidance** from ChatGPT.
4. **Store notes** and track your debugging history.
5. You can clone the repository here: https://github.com/sbaird22/Rubber-Ducky
6. A deployed version of the application can be fond here: https://rubber-ducky-mn60.onrender.com

## License

![License](https://img.shields.io/badge/License-MIT-yellow.svg "License")
This project is licensed under the MIT License.

## Collaborators

- **Shane Baird**: Bootcamp student, developer, and collaborator.
- **Drew DeMarois**: Bootcamp student, developer, and collaborator.
- **Yosuke Kibe**: Bootcamp student, developer, and collaborator.
- **Kristy Thompson**: Bootcamp student, developer, and collaborator.
