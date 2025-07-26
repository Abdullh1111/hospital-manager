/**
 * Redux Store Configuration
 * 
 * This file sets up the Redux store with the following features:
 * - Redux Toolkit for simplified Redux setup
 * - Redux Persist for state persistence
 * - Redux Saga for side effects
 * - Redux Logger for development debugging
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import { rootSaga } from './sagas/rootSaga';

/**
 * Root Reducer
 * Combines all feature reducers into a single reducer
 * Currently includes:
 * - auth: Authentication state management
 * - user: User data management
 */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// Initialize Redux Saga middleware
const sagaMiddleware = createSagaMiddleware();

/**
 * Redux Store Configuration
 * - reducer: The root reducer
 * - middleware: Custom middleware configuration
 *   - serializableCheck: Configure serializable state check
 *   - Added sagaMiddleware for handling side effects
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

/**
 * TypeScript Types
 * - RootState: Type for the entire Redux state
 * - AppDispatch: Type for the dispatch function
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 