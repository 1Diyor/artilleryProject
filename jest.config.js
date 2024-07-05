module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  reporters: [
    'default',
    'jest-allure'
  ],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@processes/(.*)$': '<rootDir>/src/processes/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1'
  }
};
