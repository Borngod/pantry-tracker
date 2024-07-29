# Pantry Tracker

## Overview
Pantry Tracker is a pantry management application that allows users to keep track of pantry items by adding or removing items and updating their quantities. The project is built using Next.js as the frontend framework, Material UI for the UI components, and Firebase as the backend service.

## Features
- Add new pantry items
- Remove existing pantry items
- Update the quantities of pantry items
- User authentication with Firebase
- Responsive design using Material UI

## Technologies Used
- [Next.js](https://nextjs.org/) - A React framework for building server-side rendered applications.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Material UI](https://mui.com/) - A popular React UI framework for building responsive and accessible components.
- [Firebase](https://firebase.google.com/) - A platform developed by Google for creating mobile and web applications, used here for backend services such as authentication and database.

## Installation
To get started with the Pantry Tracker project, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pantry-tracker.git
   cd pantry-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication services.
   - Obtain your Firebase configuration and create a `.env.local` file in the root of your project with the following environment variables:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage
1. **Sign Up / Sign In**
   - Create a new account or sign in with your existing account using the Firebase Authentication service.

2. **Manage Pantry Items**
   - Add new items to your pantry by providing the item name and quantity.
   - Update the quantity of existing items.
   - Remove items that you no longer need.

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, feel free to create an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)

