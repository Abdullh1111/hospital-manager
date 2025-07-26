import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
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
import type {AuthStackParamList} from '../navigation/AppNavigator';
import {useSignupViewModel} from '../viewmodels/useSignupViewModel';

type OtpScreenProps = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

const OtpScreen = ({route, navigation}: OtpScreenProps) => {
  const {t} = useTranslation();
  const {email, password} = route.params || {};
  const {handleSignupSubmitAfterOTP, signupLoading} =
    useSignupViewModel(navigation);

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(180); // 3 minutes
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input
      if (index < 5 && text) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };
  const handleOtpSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      if (email && password) {
        handleSignupSubmitAfterOTP(otpValue);
      } else {
        Alert.alert('Success', 'OTP verified!');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  const formattedTime = `${String(Math.floor(timer / 60)).padStart(
    1,
    '0',
  )}:${String(timer % 60).padStart(2, '0')}`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code we sent to your email address{' '}
          <Text style={styles.bold}>{`(${email})`}</Text>.
        </Text>

        <Text style={styles.timer}>{formattedTime}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref!)}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  if (otp[index] === '') {
                    if (index > 0) {
                      const newOtp = [...otp];
                      newOtp[index - 1] = '';
                      setOtp(newOtp);
                      inputRefs.current[index - 1]?.focus();
                    }
                  }
                }
              }}
              onChangeText={text => handleChange(text, index)}
              value={digit}
              returnKeyType="next"
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive OTP?</Text>
          <TouchableOpacity onPress={() => setTimer(180)}>
            <Text style={styles.resendLink}> Resend Code</Text>
          </TouchableOpacity>
        </View>

        <SubmitButton
          onPress={handleOtpSubmit}
          disabled={otp.join('').length !== 6}
          loading={signupLoading}
          style={styles.button}>
          Continue
        </SubmitButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  bold: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
  },
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
  },
  resendText: {
    color: '#999',
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
});

export default OtpScreen;
