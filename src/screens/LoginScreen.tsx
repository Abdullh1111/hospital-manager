import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import {COLORS} from '../constants/colors';
import {PATHS} from '../constants/paths';
import type {AuthStackParamList} from '../navigation/AppNavigator';
import {useLoginViewModel} from '../viewmodels/useLoginViewModel';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {email, setEmail, password, setPassword, loading, error, handleLogin} =
    useLoginViewModel(navigation);
  const {t} = useTranslation();
  const isFormValid = email.trim() && password.trim();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('welcomeBack', 'Welcome Back')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('email', 'Email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          editable={!loading}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={[styles.input, {paddingRight: 60, marginBottom: 0}]}
            placeholderTextColor={COLORS.gray}
            placeholder={t('password', 'Password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
            textContentType="none"
          />
          <TouchableOpacity
            style={styles.showHideButtonInside}
            onPress={() => setShowPassword(prev => !prev)}
            disabled={loading}>
            <Text style={styles.showHideButtonText}>
              {showPassword ? t('hide') : t('show')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate(PATHS.AUTH.FORGOT_PASSWORD)}>
          <Text style={styles.forgotPasswordText}>
            {t('forgotPassword', 'Forgot Password?')}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <SubmitButton
          onPress={handleLogin}
          disabled={loading || !isFormValid}
          loading={loading}>
          {t('login', 'Login')}
        </SubmitButton>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate(PATHS.AUTH.SIGNUP)}>
          <Text style={styles.signupButtonText}>
            {t('dontHaveAccount', "Don't have an account?")}{' '}
            <Text style={styles.signupLink}>{t('signup', 'Signup')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  signupButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  signupLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  passwordInputContainer: {
    marginBottom: 15,
  },
  showHideButtonInside: {
    position: 'absolute',
    right: 15,
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  showHideButtonText: {
    color: '#f4511e',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;
