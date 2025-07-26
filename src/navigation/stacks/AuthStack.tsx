import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity} from 'react-native';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import LoginScreen from '../../screens/LoginScreen';
import OtpScreen from '../../screens/OtpScreen';
import SignupScreen from '../../screens/SignupScreen';
import type {AuthStackParamList} from '../AppNavigator';
/**
 * A dedicated stack navigator for the authentication flow.
 * This ensures that the authentication screens (Login, Signup, OTP) have their own navigation context,
 * separate from the main application stack.
 */
const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const {t} = useTranslation();
  return (
    <AuthStackNavigator.Navigator
      screenOptions={({navigation}) => ({
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {'<'}
            </Text>
          </TouchableOpacity>
        ),
      })}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{title: t('login', 'Login')}}
      />
      <AuthStackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: t('signup', 'Signup')}}
      />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{title: t('forgotPassword', 'Forgot Password?')}}
      />
      <AuthStackNavigator.Screen
        name="Otp"
        component={OtpScreen}
        options={{title: t('', '')}}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
