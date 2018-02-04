const { BABAJKA_BACKEND_AUTH = '', BABAJKA_BACKEND_URL = '' } = process.env;

module.exports = {
  'process.env.BABAJKA_BACKEND_URL': BABAJKA_BACKEND_URL,
  'process.env.BABAJKA_BACKEND_AUTH': BABAJKA_BACKEND_AUTH,
};
