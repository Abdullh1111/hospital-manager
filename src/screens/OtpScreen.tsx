import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';
import SubmitButton from '../components/SubmitButton';

type OtpScreenProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const OtpScreen = ({ route, navigation }: OtpScreenProps) => {
  const { t } = useTranslation();
  const { email, password } = route.params || {};

  const [otp, setOtp] = useState('');
  const otpInput = useRef<TextInput>(null);


  useEffect(() => {
    if (otp.length === 6)
      handleOtpSubmit()
  }, [otp])

  // Use signup viewmodel for signup flow
  const { handleSignupSubmitAfterOTP, signupLoading } = useSignupViewModel(navigation);

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      if (email && password) {
        // Signup flow - use the viewmodel
        handleSignupSubmitAfterOTP(otp);
      } else if (email) {
        // Forgot password flow - handle password reset
        // Here you would typically make an API call to verify OTP and reset password
        Alert.alert('Success', 'Password reset OTP verified successfully!');
      } else {
        Alert.alert(t('error', 'An error occurred'), t('invalidOtp', 'Invalid OTP. Please try again.'));
      }
    } else {
      Alert.alert(t('error', 'An error occurred'), t('invalidOtp', 'Invalid OTP. Please try again.'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t('otpVerification', 'OTP Verification')}</Text>
        <Text style={styles.subtitle}>{t('enterOtp', 'Enter the OTP sent to {{email}}', { email })}</Text>
        <TextInput
          ref={otpInput}
          placeholder="- - - - - -"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          style={styles.otpInput}
          textContentType="none"
        />
        <SubmitButton
          onPress={handleOtpSubmit}
          disabled={otp.length !== 6}
          loading={signupLoading}
          style={styles.submitBtnStyle}
        >
          {t('verify', 'Verify')}
        </SubmitButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  submitBtnStyle: {
    alignSelf: 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.description,
    marginBottom: 30,
    textAlign: 'center',
  },
  otpInput: {
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OtpScreen; 