const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app/'),
            '@processes': path.resolve(__dirname, 'src/processes/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@widgets': path.resolve(__dirname, 'src/widgets/'),
            '@features': path.resolve(__dirname, 'src/features/'),
            '@entities': path.resolve(__dirname, 'src/entities/'),
            '@shared': path.resolve(__dirname, 'src/shared/'),
            '@tests': path.resolve(__dirname, 'src/tests/')
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@app/(.*)$': '<rootDir>/src/app/$1',
                '^@processes/(.*)$': '<rootDir>/src/processes/$1',
                '^@pages/(.*)$': '<rootDir>/src/pages/$1',
                '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
                '^@features/(.*)$': '<rootDir>/src/features/$1',
                '^@entities/(.*)$': '<rootDir>/src/entities/$1',
                '^@shared/(.*)$': '<rootDir>/src/shared/$1',
                '^@tests/(.*)$': '<rootDir>/src/tests/$1'
            },
        },
    },
};