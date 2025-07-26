# Hospital Manager

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Project Setup

### 1. Clone the repository

First, clone the project to your local machine.

```bash
git clone git@github.com:YallaSystems/hospital-manager.git
cd hospital-manager
```

### 2. Install Dependencies

Install the project dependencies using npm.

```bash
npm install
```

### 3. Install iOS Pods

For iOS, you need to install the CocoaPods dependencies.

```bash
cd ios
pod install --repo-update
cd ..
```

## Running the Application

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### 1. Start the Metro Server

First, you will need to start **Metro**, the JavaScript bundler that ships with React Native.

```bash
# using npm
npm start

please use NPM, do not use Yarn
```

### 2. Start your Application

Let the Metro Bundler run in its own terminal. Open a new terminal from the root of your project and run the following command to start your Android or iOS app:

#### For Android

```bash
# using npm
npx react-native run-ios
```

#### For iOS

```bash
# using npm
npx react-native run-android
```

If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator.

## Testing

This project uses **Jest** for unit and component testing.

To run the tests, execute the following command from the project root:

```bash
npm run test
```

This will run Jest in watch mode, automatically re-running tests when files are changed.

## Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! 

You've successfully run and modified your React Native App.

### Now what?

- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

🚀 How to Run Fastlane
Run the following command from your platform directory:

# For iOS

cd ios && fastlane release

# For Android

cd android && fastlane release

✅ Unit Testing (Jest)
This project uses Jest for unit testing.

🔹 Run Tests

npm run test
✅ Sample Output

PASS src/screens/HomeScreen.test.js
HomeScreen
✓ renders welcome text (27 ms)

Test Suites: 1 passed, 1 total
Tests: 1 passed, 1 total
If you see a Watchman warning, you can clear it using:

watchman watch-del '/Users/rafa/Projects/hospital-manager'
watchman watch-project '/Users/rafa/Projects/hospital-manager'
