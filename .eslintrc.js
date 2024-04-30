module.exports = {
    root: true,
    ignorePatterns: ['**/node_modules/**', '**/coverage/**'],
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        { 
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                'no-shadow': 'off',
                'no-undef': 'off',
                'no-restricted-imports': 'off',
            }
        }
    ]
}