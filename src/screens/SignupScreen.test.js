import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignupScreen from './SignupScreen';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';

// Mock dependencies
jest.mock('../viewmodels/useSignupViewModel');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Test suite for the SignupScreen component.
describe('SignupScreen', () => {
  const mockSetFirstName = jest.fn();
  const mockSetLastName = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockSetSex = jest.fn();
  const mockHandleSignup = jest.fn();

  // This function runs before each test in the suite.
  beforeEach(() => {
    // Reset mocks before each test to ensure test isolation.
    jest.clearAllMocks();
    // Mocks the return value of the useSignupViewModel hook to control its output during testing.
    useSignupViewModel.mockReturnValue({
      firstName: '',
      setFirstName: mockSetFirstName,
      lastName: '',
      setLastName: mockSetLastName,
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      confirmPassword: '',
      setConfirmPassword: mockSetConfirmPassword,
      sex: '',
      setSex: mockSetSex,
      handleSignup: mockHandleSignup,
      signupLoading: false,
    });
  });

  // Test case to ensure that the signup screen renders correctly with all input fields and the signup button.
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    // Asserts that all the necessary input fields and the signup button are displayed.
    expect(getByPlaceholderText('firstName')).toBeTruthy();
    expect(getByPlaceholderText('lastName')).toBeTruthy();
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByPlaceholderText('confirmPassword')).toBeTruthy();
    expect(getByText('signup')).toBeTruthy();
  });

  // Test case to verify that input changes call the correct setter functions from the view model.
  it('calls setters on input change', () => {
    const { getByPlaceholderText } = render(<SignupScreen navigation={jest.fn()} />);

    // Simulates typing a first name and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('firstName'), 'John');
    expect(mockSetFirstName).toHaveBeenCalledWith('John');

    // Simulates typing a last name and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('lastName'), 'Doe');
    expect(mockSetLastName).toHaveBeenCalledWith('Doe');

    // Simulates typing an email and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('email'), 'john@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('john@example.com');

    // Simulates typing a password and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('password'), 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');

    // Simulates typing a confirmation password and asserts that the corresponding setter is called.
    fireEvent.changeText(getByPlaceholderText('confirmPassword'), 'password123');
    expect(mockSetConfirmPassword).toHaveBeenCalledWith('password123');
  });

  // Test case to ensure that pressing the signup button calls the handleSignup function.
  it('calls handleSignup on signup button press', () => {
    // Mock with valid form data so the button is enabled
    useSignupViewModel.mockReturnValue({
      firstName: 'John',
      setFirstName: mockSetFirstName,
      lastName: 'Doe',
      setLastName: mockSetLastName,
      email: 'john@example.com',
      setEmail: mockSetEmail,
      password: 'password123',
      setPassword: mockSetPassword,
      confirmPassword: 'password123',
      setConfirmPassword: mockSetConfirmPassword,
      sex: 'male',
      setSex: mockSetSex,
      handleSignup: mockHandleSignup,
      signupLoading: false,
      isFormValid: true,
    });

    const { getByText } = render(<SignupScreen navigation={jest.fn()} />);
    
    // Simulates a press on the signup button.
    fireEvent.press(getByText('signup'));
    // Asserts that the handleSignup function was called.
    expect(mockHandleSignup).toHaveBeenCalled();
  });
}); 