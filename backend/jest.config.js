export default {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', '.'],
    transform: {
      '^.+\\.js$': ['babel-jest', { configFile: './babel.config.js' }],
    },
    transformIgnorePatterns: [
      'node_modules/(?!(sequelize|@sequelize|@assemblyscript/loader)/)'
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    verbose: true,
  };