import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from './HomeScreen';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    // The t function is mocked to return a specific string for the 'welcome' key, or the key itself for any other keys.
    t: (key) => key === 'welcome' ? 'Welcome to Hospital Manager' : key,
    i18n: { changeLanguage: () => new Promise(() => { }) },
  }),
}));

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  it('renders welcome text and user name', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
      user: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    expect(getByText('Welcome to Hospital Manager')).toBeTruthy();
    expect(getByText('John Doe:john.doe@example.com')).toBeTruthy();
  });

  it('renders only welcome text when user is not logged in', () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
      user: { user: null },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    expect(getByText('Welcome to Hospital Manager')).toBeTruthy();
    expect(queryByText('John Doe:john.doe@example.com')).toBeNull();
  });
});
