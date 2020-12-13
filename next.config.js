const ENV = require('./utils/env');

module.exports = {
  env: {
    isProd: ENV === 'production',
    isStaging: ENV === 'staging',
  },
};
