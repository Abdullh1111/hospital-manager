/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/wdyr';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import './src/i18n';
import { StyleSheet } from 'react-native';
import AuthInitializer from './src/components/AuthInitializer';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      {/* SafeAreaProvider is used to handle the safe area insets */}
      <SafeAreaProvider>
        <AuthInitializer>
          <AppNavigator />
        </AuthInitializer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
