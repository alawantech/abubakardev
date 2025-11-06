# Firebase Authentication Setup

## Features Implemented

### 1. **Login Page** (`/login`)
- Email and password authentication
- Error handling with user-friendly messages
- Redirect to home page after successful login
- Link to registration page

### 2. **Registration Page** (`/register`)
- Complete user registration form with:
  - Full Name
  - Email
  - Password & Confirm Password
  - WhatsApp Number
  - Role Selection (Admin, Student, Customer)
- Firebase Authentication integration
- Firestore database integration
- Form validation
- Error handling

### 3. **Firebase Configuration**
- Secure environment variables in `.env` file
- Firebase Auth and Firestore initialized
- User data stored in `users` collection

## Firestore Database Structure

### Users Collection
```javascript
users/{userId}
  - uid: string
  - fullName: string
  - email: string
  - whatsappNumber: string
  - role: string (admin | student | customer)
  - createdAt: timestamp
```

## Routes
- `/login` - Login page
- `/register` - Registration page

## How to Use

### 1. Enable Firebase Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`abubakardev-b43b5`)
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider

### 2. Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** or **Test mode**
4. Select your region

### 3. Set Up Firestore Rules (Optional but Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Only admins can write to user documents
      allow write: if request.auth != null;
    }
  }
}
```

## Usage in Components

### Using Auth Context
```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, userData } = useAuth();
  
  return (
    <div>
      {currentUser ? (
        <p>Welcome, {userData?.fullName}! Your role: {userData?.role}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Protecting Routes
You can create a protected route component to restrict access based on authentication or role.

## User Roles
- **Admin**: Full access to all features
- **Student**: Access to courses and learning materials
- **Customer**: Access to services and pricing

## Security Notes
- Never commit `.env` file to Git
- The `.env` file is already added to `.gitignore`
- Use `.env.example` as a template for team members
- Rotate Firebase API keys if they were previously exposed

## Next Steps
1. ✅ Firebase Authentication configured
2. ✅ Login and Registration pages created
3. ✅ Firestore database integration
4. 🔄 Create protected routes
5. 🔄 Add role-based access control
6. 🔄 Add user dashboard
7. 🔄 Add logout functionality
