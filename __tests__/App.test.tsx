/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axiosInstance from '../src/axiosInstance';
import { URLS } from '../src/constants/urls';
import { describe, it, beforeEach, expect, jest } from '@jest/globals';

jest.mock('../src/axiosInstance');

describe('Health check in App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows maintenance modal when health check fails and hides it on retry success', async () => {
    // @ts-ignore
    axiosInstance.get.mockRejectedValueOnce(new Error('Network error'));
    // @ts-ignore
    axiosInstance.get.mockResolvedValueOnce({ data: { status: 'ok' } });

    const { getByText, queryByText } = render(<App />);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(getByText('System Under Maintenance')).toBeTruthy();
    });

    // Press the Retry button
    fireEvent.press(getByText('Retry'));

    // Wait for the modal to disappear
    await waitFor(() => {
      expect(queryByText('System Under Maintenance')).toBeNull();
    });
  });
});
