module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ['./assets'],
    dependencies: {
        ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
    },
}