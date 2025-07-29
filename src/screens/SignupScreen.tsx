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
import CustomSelector from '../components/CustomSelector';
import SubmitButton from '../components/SubmitButton';
import {COLORS} from '../constants/colors';
import type {AuthStackParamList} from '../navigation/AppNavigator';
import {CustomSelectorRef} from '../types/CustomSelector.interface';
import {useSignupViewModel} from '../viewmodels/useSignupViewModel';

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
    confirmPassword,
    setConfirmPassword,
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
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
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
      <View
        style={{flex: 1, position: 'relative', backgroundColor: COLORS.white}}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 30,
            paddingBottom: 120,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{flexGrow: 1}}>
          <Text style={styles.title}>
            {t('createAccount', 'Create Account')}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t('firstName', 'First Name')}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />
          <TextInput
            ref={lastNameRef}
            style={styles.input}
            placeholder={t('lastName', 'Last Name')}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder={t('email', 'Email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => genderSelectorRef.current?.openDropdown()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />
          <CustomSelector
            ref={genderSelectorRef}
            value={sex}
            onValueChange={handleSexChange}
            options={genderOptions}
            placeholder={t('selectSex', 'Select Gender')}
          />

          <TextInput
            ref={countryRef}
            style={styles.input}
            placeholder={t('country', 'Country')}
            value={country}
            onChangeText={setCountry}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current?.focus()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />

          <TextInput
            ref={cityRef}
            style={styles.input}
            placeholder={t('city', 'City')}
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => dobRef.current?.focus()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />

          <TextInput
            ref={dobRef}
            style={styles.input}
            placeholder={t('dob', 'Date of Birth')}
            value={dob}
            onChangeText={setDob}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            placeholderTextColor={COLORS.gray}
            blurOnSubmit={false}
          />

          <View style={styles.passwordInputContainer}>
            <TextInput
              ref={passwordRef}
              style={[styles.input, {paddingRight: 60, marginBottom: 0}]}
              placeholder={t('password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="password"
              placeholderTextColor={COLORS.gray}
              returnKeyType="next"
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
              }}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.showHideButtonInside}
              onPress={togglePasswordVisibility}>
              <Text style={styles.showHideButtonText}>
                {showPassword ? t('hide') : t('show')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              ref={confirmPasswordRef}
              style={[styles.input, {paddingRight: 60, marginBottom: 0}]}
              placeholder={t('confirmPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              textContentType="newPassword"
              autoComplete="password-new"
              returnKeyType={'done'}
              onSubmitEditing={isFormValid ? handleSignup : undefined}
              placeholderTextColor={COLORS.gray}
              blurOnSubmit={true}
              onLayout={e => {
                confirmPasswordLayout.current = {y: e.nativeEvent.layout.y};
              }}
              editable={true}
              enablesReturnKeyAutomatically={true}
            />
            <TouchableOpacity
              style={styles.showHideButtonInside}
              onPress={toggleConfirmPasswordVisibility}>
              <Text style={styles.showHideButtonText}>
                {showConfirmPassword ? t('hide') : t('show')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={[
            styles.buttonContainer,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              borderColor: COLORS.border,
              backgroundColor: COLORS.white,
            },
          ]}>
          <SubmitButton
            onPress={handleSignup}
            disabled={!isFormValid}
            loading={signupLoading}>
            {t('signup', 'Signup')}
          </SubmitButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

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
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
});

export default SignupScreen;
