const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@app': path.resolve(__dirname, 'src/app/'),
            '@processes': path.resolve(__dirname, 'src/processes/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@widgets': path.resolve(__dirname, 'src/widgets/'),
            '@features': path.resolve(__dirname, 'src/features/'),
            '@entities': path.resolve(__dirname, 'src/entities/'),
            '@shared': path.resolve(__dirname, 'src/shared/'),
  },
};
