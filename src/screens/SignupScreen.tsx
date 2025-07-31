import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomInputText from '../components/CustomInputText';
import CustomSelector from '../components/CustomSelector';
import {COLORS} from '../constants/colors';
import type {AuthStackParamList} from '../navigation/AppNavigator';
import {CustomSelectorRef} from '../types/CustomSelector.interface';
import {useSignupViewModel} from '../viewmodels/useSignupViewModel';
import CustomButton from '../components/CustomButton';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen = React.memo(({navigation}: SignupScreenProps) => {
  const {t} = useTranslation();
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    sex,
    setSex,
    signupLoading,
    isFormValid,

    country,
    setCountry,
    city,
    setCity,
    dob,
    setDob,
  } = useSignupViewModel(navigation);
  const [showPassword, setShowPassword] = useState(false);

  // Memoize gender options to prevent recreation on every render
  const genderOptions = useMemo(
    () => [
      {label: t('male', 'Male'), value: 'male'},
      {label: t('female', 'Female'), value: 'female'},
    ],
    [t],
  );

  // Memoize the sex change handler
  const handleSexChange = useCallback(
    (value: string) => {
      setSex(value as 'male' | 'female' | '');
      // Focus password field after gender is selected
      setTimeout(() => {
        countryRef.current?.focus();
      }, 100);
    },
    [setSex],
  );

  // Memoize the password visibility toggles
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Input refs
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const genderSelectorRef = useRef<CustomSelectorRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const confirmPasswordLayout = useRef<{y: number} | null>(null);
  const countryRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const dobRef = useRef<TextInput>(null);
  return (
    <KeyboardAvoidingView
      style={styles.keyBoard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
      <View style={styles.rootContainer}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {t('continueWithEmail', 'Continue With Email')}
          </Text>

          <CustomInputText
            label={t('firstName', 'First Name')}
            placeholder={t('firstName', 'First Name')}
            onChangeText={setFirstName}
            value={firstName}
            onSubmitEditing={() => lastNameRef.current?.focus()}
          />

          <CustomInputText
            label={t('lastName', 'Last Name')}
            ref={lastNameRef}
            placeholder={t('lastName', 'Last Name')}
            value={lastName}
            onChangeText={setLastName}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <CustomSelector
            label={t('gender', 'Gender')}
            ref={genderSelectorRef}
            value={sex}
            onValueChange={handleSexChange}
            options={genderOptions}
            placeholder={t('selectSex', 'Select Gender')}
          />
          <CustomInputText
            label={t('country', 'Country')}
            ref={countryRef}
            placeholder={t('country', 'Country')}
            value={country}
            onChangeText={setCountry}
            onSubmitEditing={() => cityRef.current?.focus()}
          />

          <CustomInputText
            label={t('city', 'City')}
            quteText={"We'll use this to suggest nearby hospitals to you"}
            ref={cityRef}
            placeholder={t('city', 'City')}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => dobRef.current?.focus()}
          />
          <CustomInputText
            label={t('dob', 'Date of Birth')}
            ref={dobRef}
            placeholder={t('dob', '01/01/2000')}
            value={dob}
            onChangeText={setDob}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <CustomInputText
            label={t('email', 'Email')}
            ref={emailRef}
            placeholder={t('email', 'Email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => genderSelectorRef.current?.openDropdown()}
          />

          <View style={styles.passwordInputContainer}>
            <CustomInputText
              label={t('password', 'Create Password')}
              quteText={
                'Passaword must be at least 8 characters long and include uppercase letters, lowercase letters and numbers'
              }
              ref={passwordRef}
              placeholder={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="password"
              autoCapitalize="none"
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
                setTimeout(() => {
                  if (confirmPasswordLayout.current) {
                    scrollViewRef.current?.scrollTo({
                      y: confirmPasswordLayout.current.y + 60,
                      animated: true,
                    });
                  }
                }, 100);
              }}>
              <TouchableOpacity
                style={styles.showHideButtonInside}
                onPress={togglePasswordVisibility}>
                <Text style={styles.showHideButtonText}>
                  {showPassword ? t('hide') : t('show')}
                </Text>
              </TouchableOpacity>
            </CustomInputText>
          </View>
          <View>
            <CustomButton
              onPress={handleSignup}
              disabled={!isFormValid}
              loading={signupLoading}>
              {t('signup', 'Signup')}
            </CustomButton>
          </View>

          <View style={styles.linkContainer}>
            <Text>
              {t('alreadyHaveAccount', 'Already have an account?')}{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}>
                {t('login', 'Login')}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 14,
  },
  keyBoard: {
    flex: 1,
  },
  rootContainer: {flex: 1, position: 'relative', backgroundColor: COLORS.white},
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
    fontSize: 24,
    fontWeight: 600,
    paddingTop: 10,
    paddingBottom: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    marginBottom: 15,
  },
  showHideButtonInside: {
    position: 'absolute',
    right: 15,
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  showHideButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  linkContainer: {
    marginVertical: 50,
    alignItems: 'center',
    fontSize: 18,
  },

  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
