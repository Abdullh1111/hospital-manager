import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import OtpScreen from '../../screens/OtpScreen';
import { useTranslation } from 'react-i18next';
import type { AuthStackParamList } from '../AppNavigator';
import { Button } from 'react-native';
/**
 * A dedicated stack navigator for the authentication flow.
 * This ensures that the authentication screens (Login, Signup, OTP) have their own navigation context,
 * separate from the main application stack.
 */
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useTranslation();
  return (
    <AuthStackNavigator.Navigator
      screenOptions={({navigation})=>({
        headerShown: true,
        headerLeft: () => (
          <Button title={t('back', 'Back')} onPress={() => navigation.goBack()} />
        ),
      })}
    >
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} options={{ title: t('login', 'Login') }} />
      <AuthStackNavigator.Screen name="Signup" component={SignupScreen} options={{ title: t('signup', 'Signup') }} />
      <AuthStackNavigator.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: t('forgotPassword', 'Forgot Password?') }} />
      <AuthStackNavigator.Screen name="Otp" component={OtpScreen} options={{ title: t('otpScreen', 'OTP Verification') }} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack; 