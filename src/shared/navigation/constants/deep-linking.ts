export const linking = {
  prefixes: ['https://www.residuoszero.org/'],
  config: {
    screens: {
      AuthNavigator: {
        screens: {
          EmailVerified: {
            path: 'auth/verify-email/:token?',
            initialRouteName: 'Login',
          },
          ResetPassword: {
            path: 'auth/reset-password/:token?',
          },
        },
      },
    },
  },
}
