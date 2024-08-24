## BreadfastDemo

This is a demo project showcasing a simple social media application built with React Native, Expo, and TypeScript. The application features three main screens: a splash screen, a home screen displaying a list of posts, and a post details screen that shows detailed information about a post along with its comments. The application is wrapped by a layout component that includes a header and footer.

# Getting Started

To get started with this project, follow these steps:

# Clone the Repository

git clone https://github.com/MuhammadMitkees/BreadfastDemo.git
cd BreadfastDemo

# Install Dependencies and Run the Project

Ensure you have the latest version of Expo CLI installed, then run:

- npm install
- npx expo start

This will start the Expo development server. You can run the app on an emulator, simulator, or connected mobile device by scanning the QR code displayed in your terminal or browser.

- to run unit test:
- npm test

# Screenshots

- Splash Screen
  The splash screen is displayed when the app is first launched.
  ![Splash Screen](./assets/images/screenshots/Screenshot%202024-08-25%20000927.png)
- Home Screen
  The home screen contains a list of rendered posts.
  ![Home screen](./assets/images/screenshots/Screenshot%202024-08-24%20200102.png)
  ![Home screen](./assets/images/screenshots/Screenshot%202024-08-24%20214522.png)
- Post Details Screen
  The post details screen displays the details of a selected post along with its comments.
  ![Post details Screen](./assets/images/screenshots/Screenshot%202024-08-24%20200153.png)
  ![Post details Screen](./assets/images/screenshots/Screenshot%202024-08-24%20214447.png)

# Project Structure

The project contains the following screens:

- Splash Screen: Shown when the app is launched, providing a branding image.
- Home Screen: Displays a list of posts fetched from the server.
- Post Details Screen: Shows detailed information about a selected post, including the post content and user comments.

# Features

- Loader: A loader component is displayed while waiting for data to be fetched from the server.
- Navigation: Navigation throughout the app is based on the Expo Router, providing a smooth and intuitive user experience.
- Layout: The entire application is wrapped by a layout component from Expo, which includes a customizable header and footer.
- Unit Testing: Unit tests are implemented using the Jest library to ensure the quality and reliability of the code.
  ![unit tests succeded](./assets/images/screenshots/Screenshot%202024-08-24%20225319.png)
- TypeScript: The project is developed using TypeScript, adding static typing and enhancing code quality.
