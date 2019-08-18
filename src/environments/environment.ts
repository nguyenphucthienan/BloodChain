// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  whitelistedDomains: ['localhost:3000'],
  blacklistedRoutes: ['localhost:3000/api/auth'],
  authTokenName: 'auth-token',
  mapApiKey: 'AIzaSyB2MsjvYImNAUWNxbWSiZGQ5TdxNaPbPcY',
  photoUrl: {
    logo: './assets/images/landing/logo.svg',
    notFound: './assets/images/pages/not-found.svg',
    defaultUser: './assets/images/users/default.png',
    rewardGift: './assets/images/rewards/gift.svg',
    rewardEthereum: './assets/images/rewards/ethereum.svg'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
