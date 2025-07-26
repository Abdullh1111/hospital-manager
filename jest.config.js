module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-native-elements|react-redux/.*)',
  ],
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).{js,ts,tsx}',
  ],
};
