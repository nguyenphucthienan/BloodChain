export const environment = {
  production: true,
  apiUrl: 'https://bloodchain.herokuapp.com/api',
  whitelistedDomains: ['bloodchain.herokuapp.com'],
  blacklistedRoutes: ['bloodchain.herokuapp.com/api/auth'],
  authTokenName: 'auth-token',
  mapApiKey: 'AIzaSyB2MsjvYImNAUWNxbWSiZGQ5TdxNaPbPcY',
  photoUrl: {
    logo: './assets/images/landing/logo.svg',
    notFound: './assets/images/pages/not-found.svg',
    defaultUser: './assets/images/users/default.png',
    rewardGift: './assets/images/rewards/gift.svg',
    rewardEthereum: {
      main: './assets/images/rewards/ethereum.svg',
      gold: './assets/images/rewards/gold.svg',
      silver: './assets/images/rewards/silver.svg',
      bronze: './assets/images/rewards/bronze.svg'
    }
  }
};
