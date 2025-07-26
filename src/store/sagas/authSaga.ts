/**
 * Authentication Saga
 * 
 * This saga handles authentication-related side effects:
 * - Login API calls
 * - Error handling
 * - Success/failure dispatching
 * 
 * About Generator Functions (function*):
 * - The function* syntax declares a generator function
 * - Generator functions can be paused and resumed during execution
 * - They use the yield keyword to pause execution and return a value
 * - In Redux Saga, generators are used to handle asynchronous operations
 * - Each yield statement represents a step in the async flow
 * - The function can be resumed from where it was paused
 * - This makes it easier to write and read async code in a synchronous style
 */

import {takeLatest, put, call} from 'redux-saga/effects';
import {loginRequest, loginSuccess, loginFailure} from '../slices/authSlice';

/**
 * Mock API call for authentication
 * TODO: Replace with actual API integration
 * 
 * @param email - User's email
 * @param password - User's password
 * @returns Promise resolving to user data or rejecting with error
 */
const loginApi = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email === 'a@a.com' && password === '1234') {
    return {
      email,
      token: 'mock-jwt-token',
    };
  }
  throw new Error('Invalid credentials');
};

/**
 * Handles login request
 * Generator function that:
 * 1. Takes the login action
 * 2. Extracts email and password
 * 3. Calls the login API
 * 4. Dispatches success or failure action
 * 
 * @param action - Login request action containing email and password
 */
function* handleLogin(action: ReturnType<typeof loginRequest>): Generator<any, void, any> {
  try {
    const {email, password} = action.payload;
    // yield pauses execution until the API call completes
    const response = yield call(loginApi, email, password);
    // yield pauses execution until the success action is dispatched
    yield put(loginSuccess(response));
  } catch (error) {
    // yield pauses execution until the failure action is dispatched
    yield put(loginFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

/**
 * Root authentication saga
 * Generator function that:
 * 1. Watches for login requests
 * 2. Calls handleLogin when a request is received
 * 
 * takeLatest:
 * - Cancels any previous login attempts
 * - Only processes the most recent login request
 * - Useful for preventing race conditions
 */
export function* authSaga(): Generator<any, void, any> {
  yield takeLatest(loginRequest.type, handleLogin);
} 