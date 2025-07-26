import axios, { InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { store } from './store';
import { URLS } from './constants/urls';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://9kcsl9ztlc.execute-api.ap-southeast-1.amazonaws.com/v1/', // Set your API base URL here
  timeout: 10000,
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.user?.user?.accessToken;
    if (token && config.headers && config.url !== URLS.register && config.url !== URLS.forgotPassword && typeof (config.headers as AxiosHeaders).set === 'function') {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// To control the number of retry attempts for a request, add the `maxRetryCount` property to the axios config object:
// Example: axiosInstance.get(url, { maxRetryCount: 5 })
// If not provided, the default retry count is 3.

// Response interceptor for retry and error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Use maxRetryCount from config, default to 3
    const maxRetryCount = config?.maxRetryCount ?? 3;
    const currentRetryCount = config.__retryCount || 0;

    // Check if we should retry based on error type
    const isTimeoutError = error.code === 'ECONNABORTED' || error.message.includes('timeout');
    const isNetworkError = !error.response;
    const status = error.response?.status;
    const isServerError = status >= 500 && status < 600;
    const shouldRetry = isTimeoutError || isNetworkError || isServerError;

    // Keeping this console log as comment to debug axios errors easily in future

    // console.log('Request error:', {
    //   url: config?.url,
    //   method: config?.method,
    //   message: error?.response?.data?.message,
    //   code: error.code,
    //   status: status,
    //   isTimeoutError,
    //   isNetworkError,
    //   isServerError,
    //   shouldRetry,
    //   currentRetryCount,
    //   maxRetryCount
    // });

    // Retry logic
    if (shouldRetry && config && currentRetryCount < maxRetryCount) {
      config.__retryCount = currentRetryCount + 1;
      // Retrying request (${config.__retryCount}/${maxRetryCount}) for URL: ${config.url}

      // Add exponential backoff delay for retries
      const delay = Math.min(1000 * Math.pow(2, currentRetryCount), 5000); // Max 5 seconds
      // Waiting ${delay}ms before retry...
      await new Promise(resolve => setTimeout(resolve, delay));

      return axiosInstance(config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 