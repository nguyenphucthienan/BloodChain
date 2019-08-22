// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  whitelistedDomains: ['localhost:3000'],
  blacklistedRoutes: ['localhost:3000/api/auth'],
  tokenName: {
    auth: 'auth-token',
    language: 'language-token'
  },
  mapApiKey: 'AIzaSyB2MsjvYImNAUWNxbWSiZGQ5TdxNaPbPcY',
  photoUrl: {
    logo: './assets/images/landing/logo.svg',
    notFound: './assets/images/pages/not-found.svg',
    defaultUser: './assets/images/users/default.png',
    language: {
      english: './assets/images/languages/english.png',
      vietnamese: './assets/images/languages/vietnamese.png',
    },
    rewardGift: './assets/images/rewards/gift.svg',
    rewardEthereum: {
      main: './assets/images/rewards/ethereum.svg',
      gold: './assets/images/rewards/gold.svg',
      silver: './assets/images/rewards/silver.svg',
      bronze: './assets/images/rewards/bronze.svg'
    }
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
