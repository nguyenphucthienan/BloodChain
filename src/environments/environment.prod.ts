export const environment = {
  production: true,
  apiUrl: 'https://bloodchain.herokuapp.com/api',
  whitelistedDomains: ['bloodchain.herokuapp.com'],
  blacklistedRoutes: ['bloodchain.herokuapp.com/api/auth'],
  tokenName: {
    auth: 'auth-token',
    language: 'language-token'
  },
  mapApiKey: 'AIzaSyAIr3pEFQlaw8zbT-F7pltgLfwQCuPOvjA',
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
