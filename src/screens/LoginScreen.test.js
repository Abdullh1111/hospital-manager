import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { useLoginViewModel } from '../viewmodels/useLoginViewModel';

// Mock dependencies
jest.mock('../viewmodels/useLoginViewModel');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Test suite for the LoginScreen component.
describe('LoginScreen', () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleLogin = jest.fn();

  // This function runs before each test in the suite.
  beforeEach(() => {
    // Clears all mock function call history before each test.
    jest.clearAllMocks();
    // Mocks the return value of the useLoginViewModel hook to provide controlled data for tests.
    useLoginViewModel.mockReturnValue({
      email: 'test@example.com',
      setEmail: mockSetEmail,
      password: 'password123',
      setPassword: mockSetPassword,
      loading: false,
      error: null,
      handleLogin: mockHandleLogin,
    });
  });

  // Test case to ensure that the login screen renders with all expected input fields and buttons.
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    
    // Asserts that the email and password input fields are present.
    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    // Asserts that the login button and signup link are displayed.
    expect(getByText('login')).toBeTruthy();
    expect(getByText("dontHaveAccount signup")).toBeTruthy();
  });

  // Test case to verify that the setEmail and setPassword functions are called on input changes.
  it('calls setEmail and setPassword on input change', () => {
    const { getByPlaceholderText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);

    // Simulates typing an email and asserts that setEmail is called with the correct value.
    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');

    // Simulates typing a password and asserts that setPassword is called with the correct value.
    fireEvent.changeText(getByPlaceholderText('password'), 'password123');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  // Test case to ensure that the handleLogin function is called when the login button is pressed.
  it('calls handleLogin on login button press', () => {
    const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
    
    // Simulates a press on the login button.
    fireEvent.press(getByText('login'));
    // Asserts that the handleLogin function was called.
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  // Test case to verify that pressing the signup text navigates to the Signup screen.
  it('navigates to signup on signup text press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    // Simulates a press on the signup link.
    fireEvent.press(getByText('dontHaveAccount signup'));
    // Asserts that the navigate function was called with 'Signup' as the destination.
    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });
}); 