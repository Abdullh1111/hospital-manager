// We use type assertions (e.g., "Login" as 'Login') for each route key to ensure strong type safety throughout the app.
// This guarantees that each route value is treated as a string literal type, which helps TypeScript catch navigation errors at compile time.
// And navigation methods were throwing type mismatch errors, so we had to use type assertion

export const PATHS = {
    Auth: "Auth" as 'Auth',
    AUTH: {
        LOGIN: "Login" as 'Login',
        SIGNUP: "Signup" as 'Signup',
        FORGOT_PASSWORD: "ForgotPassword" as 'ForgotPassword',
        OTP: "Otp" as 'Otp'
    },
    Main: "Main" as 'Main',
    MAIN: {
        HomeStackScreen: "HomeStackScreen" as 'HomeStackScreen',
        HOME_STACK_SCREEN: {
            Home: "Home" as 'Home'
        },

        AppointmentsStackScreen: "AppointmentsStackScreen" as 'AppointmentsStackScreen',
        APPOINTMENT_STACK_SCREEN: {
            Appointments: "Appointments" as 'Appointments'
        },

        ProfileStackScreen: "ProfileStackScreen" as 'ProfileStackScreen',
        PROFILE_STACK_SCREEN: {
            Profile: "Profile" as 'Profile'
        }
    },
}