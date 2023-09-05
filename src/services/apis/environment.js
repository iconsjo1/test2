export const environment = {
  production: false,
  // mock: true,
  // apiUrl: "http://104.248.132.157:4000",
  apiUrl: 'https://app.udh.sa',
  key: '2gNBG5t8rBqpkzSGFdu4C2:3b13LeJxgxnx0ELdyF0L5K',
  recaptchaSecret: '6LfDqn0UAAAAAOF7K8_U54lmRfL7M0DjUZxvRM0Z',
  recaptchaVerifyApi: 'https://www.google.com/recaptcha/api/siteverify',
  recaptchaSite: '6LfDqn0UAAAAAG_TdD-kOu5t1iUHt902vsi32LdB',
  agora: {
    appId: '',
  },
};

export const PROUDTION_HEADER = {
  headers: {
    Authorization: `ak ${environment.key}`,
  },
};
