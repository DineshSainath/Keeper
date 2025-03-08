# Keeper App

A note-taking application with user authentication and cloud storage.

## Features

- User authentication (login/register)
- Create, read, and delete notes
- Cloud storage for notes
- Responsive design

## Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up Firebase:

   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Email/Password authentication in the Authentication section
   - Create a Firestore database in the Firestore Database section
   - Set up security rules for your Firestore database:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /notes/{document=**} {
           allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
           allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
         }
       }
     }
     ```
   - Get your Firebase configuration from Project Settings > General > Your apps > Firebase SDK snippet > Config
   - Create a `.env` file in the root directory based on the `.env.example` file
   - Add your Firebase configuration values to the `.env` file:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

4. Run `npm start` to start the development server

## Security Note

- The `.env` file contains sensitive information and is excluded from version control in `.gitignore`
- Never commit your Firebase API keys or other secrets to your repository
- For production deployment, set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Technologies Used

- React
- Firebase Authentication
- Firestore Database
- Material-UI
- React Router
