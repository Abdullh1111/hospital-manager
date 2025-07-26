import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import MainTabs from './stacks/MainTabs';

/**
 * Defines the parameters for the authentication stack, including routes for Login, Signup, ForgotPassword, and OTP.
 * - Login: The screen for users to enter their credentials.
 * - Signup: The screen for new users to create an account.
 * - ForgotPassword: The screen for users to enter their email to reset password.
 * - Otp: The screen for verifying the user's identity with a one-time password.
 *        It accepts optional email and password parameters to be used in the verification process.
 */
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: { email?: string; password?: string };
};

// RootStackParamList is a TypeScript type that defines the list of all possible routes (screens)
// and their expected parameters for the main stack navigator in this app. It is used by React Navigation
// to provide type safety and autocompletion for navigation actions and route props. Each key is the name
// of a route, and the value is the type of parameters expected by that route (undefined if none).
// The 'Auth' route uses NavigatorScreenParams to nest the AuthStackParamList.
// Usage: Pass RootStackParamList as a generic to createNativeStackNavigator, and use it for typing navigation/route props.
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        {/* The Auth stack is nested within the main navigator. */}
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 