import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OtpScreen from './OtpScreen';
import { Alert } from 'react-native';
import { toBeDisabled } from '@testing-library/jest-native';
expect.extend({ toBeDisabled });

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key, def, opts) => opts && opts.email ? `Enter the OTP sent to ${opts.email}` : key }),
}));

// Mock useSignupViewModel
const mockHandleSignupSubmitAfterOTP = jest.fn();
jest.mock('../viewmodels/useSignupViewModel', () => ({
  useSignupViewModel: () => ({
    handleSignupSubmitAfterOTP: mockHandleSignupSubmitAfterOTP,
    signupLoading: false,
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const navigation = { navigate: jest.fn(), goBack: jest.fn() };
const routeWithPassword = { params: { email: 'test@example.com', password: 'pass123' } };
const routeWithoutPassword = { params: { email: 'test@example.com' } };

describe('OtpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <OtpScreen navigation={navigation} route={routeWithPassword} />
    );
    expect(getByText('otpVerification')).toBeTruthy();
    expect(getByText('Enter the OTP sent to test@example.com')).toBeTruthy();
    expect(getByPlaceholderText('- - - - - -')).toBeTruthy();
    expect(getByText('verify')).toBeTruthy();
  });

  it('enables button only when 6 digits are entered', () => {
    const { getByPlaceholderText, getByText } = render(
      <OtpScreen navigation={navigation} route={routeWithPassword} />
    );
    const input = getByPlaceholderText('- - - - - -');
    const button = getByText('verify');
    expect(button).toBeDisabled();
    fireEvent.changeText(input, '12345');
    expect(button).toBeDisabled();
    fireEvent.changeText(input, '123456');
    expect(button).not.toBeDisabled();
  });

  it('calls handleSignupSubmitAfterOTP when 6 digits are entered (signup flow)', async () => {
    const { getByPlaceholderText } = render(
      <OtpScreen navigation={navigation} route={routeWithPassword} />
    );
    const input = getByPlaceholderText('- - - - - -');
    fireEvent.changeText(input, '654321');
    await waitFor(() => {
      expect(mockHandleSignupSubmitAfterOTP).toHaveBeenCalledWith('654321');
    });
  });

  it('shows alert when 6 digits are entered (forgot password flow)', async () => {
    const { getByPlaceholderText } = render(
      <OtpScreen navigation={navigation} route={routeWithoutPassword} />
    );
    const input = getByPlaceholderText('- - - - - -');
    fireEvent.changeText(input, '111111');
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Password reset OTP verified successfully!');
    });
  });
}); 