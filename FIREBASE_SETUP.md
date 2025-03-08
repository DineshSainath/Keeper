# Firebase Setup Instructions

## 1. Create a Firestore Database

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. In the left sidebar, click on "Firestore Database"
4. Click "Create database"
5. Choose "Start in production mode" and click "Next"
6. Choose a location that's close to your users and click "Enable"

## 2. Set Up Security Rules

1. In the Firestore Database section, click on the "Rules" tab
2. Replace the default rules with the following:

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

3. Click "Publish"

## 3. Create a Composite Index (if needed)

If you see an error in the console about missing indexes when trying to fetch notes, you'll need to create a composite index:

1. The error message will include a link to create the index. Click on that link.
2. Alternatively, go to the "Indexes" tab in Firestore
3. Click "Add index"
4. For "Collection ID", enter "notes"
5. Add the following fields:
   - Field path: "userId", Order: "Ascending"
   - Field path: "createdAt", Order: "Descending"
6. Click "Create index"

## 4. Enable Email/Password Authentication

1. In the left sidebar, click on "Authentication"
2. Click "Get started"
3. Click on the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable the "Email/Password" sign-in method
6. Click "Save"

## 5. Test Your Application

1. Register a new user
2. Create some notes
3. Log out and log back in to verify that your notes are saved
4. Check the Firestore Database to see your notes stored in the "notes" collection
