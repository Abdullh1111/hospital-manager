import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import LoginScreen from '../../screens/LoginScreen';
import OtpScreen from '../../screens/OtpScreen';
import SignupScreen from '../../screens/SignupScreen';
import type {AuthStackParamList} from '../AppNavigator';

const AuthStackNavigator = createNativeStackNavigator<AuthStackParamList>();

// ✅ Extracted component
const HeaderBackButton = ({onPress}: {onPress: () => void}) => (
  <TouchableOpacity style={styles.backButtonContainer} onPress={onPress}>
    <Text style={styles.backButton}>{'<'}</Text>
  </TouchableOpacity>
);

const AuthStack = () => {
  const {t} = useTranslation();

  return (
    <AuthStackNavigator.Navigator
      screenOptions={({navigation}) => ({
        headerShown: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        ),
        headerShadowVisible: false,
      })}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{title: t('login', 'Login')}}
      />
      <AuthStackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: t('welcometoyallasystem', 'Welcome to Yalla System'),
          headerTitleAlign: 'center',
          headerTitleStyle: styles.title,
        }}
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

const styles = StyleSheet.create({
  backButtonContainer: {
    borderColor: '#AEAEAEAE',
    borderWidth: 1,
    borderRadius: 500,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  backButton: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
  },
});

export default AuthStack;
