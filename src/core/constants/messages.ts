export const MESSAGES = {
  SUCCESS: 'Success',

  APP: { RUNNING: 'nomfy-be service is running! 🚀🚀🚀' },

  AN_ERROR_OCCURRED: 'An error occurred. Try again later! 😿',

  INCORRECT_PIN:
    'You entered an incorrect pin. Check your mail and try again! 😿',
};

export const jwtConstants = {
  secret: process.env.SECRET,
};
