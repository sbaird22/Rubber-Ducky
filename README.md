# Rubber-Ducky

## Overview
The **Rubber Duck Debugging AI Tool** is designed to help developers troubleshoot their code by explaining their issues out loud. Using **speech-to-text** and **AI-powered feedback (Dolphin3.0)**, developers can receive guidance while maintaining a **MERN stack architecture**. The tool also provides a space to store problems, notes, and attempted fixes.

## Features
- **Speech-to-Text Support**: Converts spoken explanations into text for processing.
- **AI-Powered Debugging**: Dolphin3.0 provides intelligent responses and troubleshooting assistance.
- **User Notes & Problem Tracking**: Developers can document their debugging process.
- **Secure Authentication**: JWT-based authentication ensures personalized experiences.
- **MERN Stack Implementation**: Uses MongoDB, Express, React, and Node.js.

## Tech Stack
### Frontend:
- **React + TypeScript** for a dynamic and type-safe UI.
- **Speech-to-Text API** for voice input.

### Backend:
- **Node.js + Express** to manage API routes and authentication.
- **OpenAI API Integration** for AI-powered responses.

### Database:
- **MongoDB** for storing user data, debugging notes, and session progress.

### Authentication:
- **JWT-based authentication** to secure user sessions.

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

## License

This project is licensed under the MIT License.

## Collaborators

- **Shane Baird**: Bootcamp student, developer, and collaborator.  
- **Drew DeMarois**: Bootcamp student, developer, and collaborator.
- **Yosuke Kibe**: Bootcamp student, developer, and collaborator.
- **Kristy Thompson**: Bootcamp student, developer, and collaborator.