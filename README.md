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
   - Update the `firebaseConfig` object in `src/config/firebase.js` with your configuration

4. Run `npm start` to start the development server

## Technologies Used

- React
- Firebase Authentication
- Firestore Database
- Material-UI
- React Router
